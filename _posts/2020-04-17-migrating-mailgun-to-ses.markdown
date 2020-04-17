---
layout: post
title:  "Migrating from Mailgun to SES"
date:   "2020-04-17"
excerpt_separator: <!--more-->
---

While sheltered in place, I finally had the time to do something I've been meaning to do for years: migrate Instapaper's email service from Mailgun to Amazon's Simple Email Service (SES).

In 2018, Mailgun changed their email pricing from volume-based to tier-based and, as a result, the cost of sending the [Instapaper Weekly](https://blog.instapaper.com/post/74088929566) nearly doubled. Shortly after the price change, we disabled the Weekly email while taking the steps toward making Instapaper GDPR compliant, but it's remained off because it was prohibitively expensive to continue operating the email.

After a few weeks of work, we are almost entirely migrated onto SES. As a result, we finally re-enabled the Weekly email after an almost 2 year hiatus! I [open sourced several tools](https://github.com/Instapaper/ses-tools) we used for the integration, and I'll share the steps we took for the migration below...

<!--more-->

## Migrating an Internal Use Case

All errors from the Instapaper servers get emailed directly to me. In the past, we've had fancier ways of handling errors, but I've found that getting them emailed directly to me is a cheap, easy, and efficient way to get visibility.

After verifying our internal email address for errors in Simple Email Service, I applied for a limit increase to allow me to send 20,000 emails per day which more than covers the volume. I then modified some functions as follows:

```
def deliver_exception(traceback, extra='', server=''):
    subject = "[Instapaper %s] Exception: %s" % (server, traceback[-1])
    deliver(sender=config.INTERNAL_EMAIL_ADDRESS,
            recipient=config.EXCEPTION_EMAIL_ADDRESS,
            subject=subject,
            text="\n".join([extra] + traceback),
            use_mailgun=False)

def _deliver_email(sender, recipient, subject, text=None,
                   html=None, attachments=None, tag=None,
                   campaign=None, use_mailgun=True):
    if use_mailgun:
        _deliver_mailgun_email(
            sender, recipient, subject, text=text,
            html=html, attachments=attachments, tag=tag,
            campaign=campaign)
    else:
        ses.send_email(sender, recipient, subject,
                       text=text, html=html)
```

In the above, we added a `use_mailgun` keyword argument to determine whether to send to Mailgun or SES, then set the argument to `False` for exception emails.

## Handling Bounces and Complaints

In order to send to any email address, not just a verified email address, you need to both verify a domain and handle bounce events. SES allows you to send email events (e.g. Bounce, Complaint, Delivery, etc.) to a Simple Notification Service topic, which can then send messages to Simple Queue Service to be consumed by your application:

![](/img/posts/ses-to-instapaper.png)

We never previously tracked bounced emails directly in Instapaper since Mailgun stores bounced emails and prevents duplicate sends to permanently bounced addresses. Storing the bounce information is a bit of extra overhead for Instapaper to track, but ultimately more efficient and the bounce information can be used elsewhere. First step is to store the bounced information in a user's email settings:

```
ALTER TABLE email_settings ADD COLUMN bounced TINYINT(1) DEFAULT 0, ALGORITHM=INPLACE, LOCK=NONE;
```

Next we add the `bounced` column to our object model. Lastly, I created the SQS queue workers to read the SES events, and store the bounced information with a user's email settings. We open sourced the [SQS worker](https://github.com/Instapaper/ses-tools/blob/master/workers/sqs_worker.py) and [task](https://github.com/Instapaper/ses-tools/blob/master/workers/sqs_tasks.py) we implemented to process bounce and complaints events on GitHub if you're interested in the full code.

## Reducing Bounce Rate

In the reputation dashboard, SES tracks your bounce rate and complaint rate, and has the following notice about bounce rates:

> We expect our senders' bounce rates to remain below 5%. Senders with a bounce rate exceeding 10% risk a sending Pause.

After reviewing our sending metrics in Mailgun, I determined our bounce rate was roughly 15%, and is largely driven by our welcome email. Investigating further, I determined that 15% of our new user signups are SEO spammers that are trying to use Instapaper to game Google for traffic.

We did at one point allow Instapaper public profiles to be indexed by Google, however, after determining that spammers were abusing it we disabled all public profiles for indexing. Nevertheless, spammers seem to think that its still a viable spam vector, and our bounce rate is pretty high as a result.

The strategy for reducing bounce rate was to detect the spam signups and automatically mark those accounts as bounced. We used a number of strategies in order to do this with high confidence. Having said that, fighting spammers is funamentally an adversarial game, so I'm hesitant to outline all of the approaches here, but I will share one.

For high value email domains (e.g. gmail.com), we integrated Mailgun's email validation service to help us determine if those accounts were legitimate. While this service is also expensive ($1.20 for 100 validations) and our long-term goal is to migrate off of Mailgun completely, this seemed to be a worthwhile effort in order to ensure a low bounce rate.

After testing a variety of approaches, we were able to get the bounce rate down to 2% within Mailgun, and can now migrate our first external email.

## Migrating the Welcome Email

I chose the welcome email for the first public use case because it would allow us to process bounces immediately on sign up via our integration from SES=>SNS=>SQS=>Instapaper. The migration itself was pretty straightforward. First, I added a `use_mailgun` flag to our `Message` object, defaulted to True:

```
class Message(object):
    def __init__(self, subject):
        self.subject = subject
        self.sender = None
        self.recipient = None
        self.html = None
        self.text = None
        self.attachments = None
        self.tag = None
        self.campaign = None
        self.use_mailgun = True
```

Then when creating the welcome email, we just set the `use_mailgun` flag to `False`:

```
@email
def welcome_email(user):
    message = Message("Welcome to Instapaper!")
    message.sender = config.SUPPORT_EMAIL_SENDER
    message.recipient = user.email
    message.text = tornado_mailer.render('welcome.txt')
    message.html = tornado_mailer.render('welcome.html')
    message.use_mailgun = False
    return message
```

Ultimately, these fields get passed to the `_deliver_email` function defined above, and sends via Simple Email Service.

## Backfilling Bounces

With the welcome email migrated to SES, we are receiving bounce events and storing the bounce flag for all new sign ups. However, all email bounces from the past 5 years were still in Mailgun. In order to ensure that we do not resend to those bounced emails on SES, we needed to export that historical data from Mailgun and run a backfill to mark those emails as bounced. Here’s the simple backfill script we used:

```
with open(sys.argv[1]) as f:
    reader = csv.reader(f)
    for row in reader:
        email = row[4].strip()
        user = User.query.filter_by(email=email).first()
        if not user:
            continue
        mail_settings = MailSettings.get_or_create(user)
        mail_settings.set_bounced()
```

Mailgun stored 1.3M bounced email addresses from the prior 5 years, and the above script completed in just under 24 hours.

## Return of the Weekly

To ensure that there weren't additional bounced addresses in the Weekly, I decided to re-enable it to run on Mailgun in order to collect the new bounces without affecting our SES bounce rate. After re-enabling the Weekly on April 5th, I was able to pull the latest bounce export, and mark another 250K bounced emails using the backfill script above.

I also learned that the Weekly email list had grown to over 3 million addresses, which would have made it even more cost prohibitive to operate over the past few years without this migration. I estimate the cost of sending this test run to be $2,500 based on our current Mailgun plan.

Of the 3M emails we sent out, about 1.2M were ratelimited by a handful of domains like outlook.com, live.com, and hotmail.com due to unknown IP reputation issues. In order to better understand how the lack of IP reputation affected our delivery rate, I decided to test run the Weekly again on Mailgun for April 12th (despite being pained by the cost). The rate limiting dropped by 40% to about 700K of these soft bounces.

While we do have dedicated IP addresses in SES and there is an "IP warm-up" feature, I expect these soft bounces to spike again as we migrate the Weekly to SES, but it's good to know that they should decrease over time as we build up reputation on the new IP addresses.

## Migrating Kindle Sends

Instapaper has long offered the ability to package up your most recent articles as an ebook and have them delivered to your Kindle. With a Kindle account, you receive an email address where you can send attachments to be added to your Kindle. Instapaper runs scheduled jobs to compile parsed articles and images into ebooks, then email them as attachments to a user's Kindle email address.

In order to migrate this functionality, I needed to build in the ability to pass attachments to SES, and deliver the email attachments using their `SendRawEmail` API:

```
def format_email(sender, recipient, subject,
                 text=None, html=None, attachments=None):
    msg = MIMEMultipart('mixed')
    msg['From'] = sender
    msg['To'] = recipient
    msg['Subject'] = subject

    msg_body = MIMEMultipart('alternative')
    if text:
        text_msg = MIMEText(text, 'plain', 'utf-8')
        msg_body.attach(text_msg)
    if html:
        html_msg = MIMEText(html, 'html', 'utf-8')
        msg_body.attach(html_msg)
    msg.attach(msg_body)

    attachments = attachments or []
    for filename, data in attachments:
        attachment_msg = MIMEApplication(data)
        attachment_msg.add_header('Content-Disposition', 'attachment', filename=filename)
        msg.attach(attachment_msg)

    return msg.as_string()

def send_email(sender, recipient, subject,
               text=None, html=None, tag=None,
               attachments=None):
    client = boto3.client('ses')
    formatted_email = format_email(
        sender, recipient, subject, text=text, html=html, attachments=attachments)
    tags = [{'Name': 'campaign', 'Value': tag}] if tag else []

    client.send_raw_email(
        Source=sender,
        Destinations=[recipient],
        RawMessage={'Data': formatted_email},
        Tags=tags)
```

The [SES wrapper](https://github.com/Instapaper/ses-tools/blob/master/ses.py) above is available on GitHub.

SES has an email limit of 10MB versus Mailgun's 25MB. I added some logging to verify that a small portion of Kindle sends are over 10MB. In order to ensure that Kindle is being sent properly, I decided to perform the migration to SES as follows:

```
def send_mobi(sender, recipient, mobi_filename, mobi_data):
    """Send a mobi file to the user"""
    message = tornado_mailer.Message('Kindle delivery')
    message.sender = sender
    message.recipient = recipient
    message.attachments = [(mobi_filename, mobi_data)]
    message.tracking = False
    # SES total email limit is 10MB
    message.use_mailgun = len(mobi_data) / pow(1024.0, 2) > 9.5
    return message
```

Note that SES limit is 10MB for the total email, including all the headers, text, and attachment. I'm using 9.5MB as the limit for sending to SES to account for this extra space.

## Completing the Migration

To complete the migration for most use cases, we just need to set the `use_mailgun` flag to `False` by default. While the goal is to move off of Mailgun completely, there are a few remaining pieces of functionality that Mailgun is still powering:

1. Email validation: It is likely we will keep email validation, but seek a service with a volume-based pricing model.
2. Kindle sends over 10MB: We need to investigate a good solution here, I'm considering just sending these over SMTP directly from Instapaper servers rather than an email provider.
3. Inbound email saves: Instapaper provides every user with a unique @instapaper.com address where they can send links to save for later. Migrating this functionality to SES would work similarly as the bounce events we set up before:
![](/img/posts/ses-to-instapaper.png)
After setting up the receipt rule to receive emails with SES, we need to migrate our MX records to point at an Amazon SMTP server.

## Email Logs

As part of customer support, we sometimes look into email logs to check if emails were sent to the customer (e.g. forgot password emails, Kindle sends). Mailgun offers this logging out of the box in their customer dashboard.

With SES you can get similar functionality with a bit of additional work. SES allows you to create "Configuration Sets" that publish email events (e.g. Send, Delivery, Bounce, Complaint) to either CloudWatch, Simple Notification Service, or Kinesis Firehose. From Kinesis Firehose delivery stream you can create a destination to AWS-hosted Elasticsearch, which is a powerful document search service:

![](/img/posts/ses-to-elasticsearch.png)

Once the data is in Elasticsearch, you can use Kibana as a frontend to query it. I open sourced the [SES Elasticsearch wrapper](https://github.com/Instapaper/ses-tools/blob/master/search/ses_search.py) to make querying easier, and a [test script that counts events based on different inputs](https://github.com/Instapaper/ses-tools/blob/master/search/ses_event_count.py).

In order to get the data to flow into Kinesis, you just need to send the email with the appropriate configuration set:

```
client.send_raw_email(
    Source=sender,
    Destinations=[recipient],
    RawMessage={'Data': formatted_email},
    Tags=tags,
    ConfigurationSetName=configuration)
```

## Pricing

After it's all said and done, we estimate that our total cost for...

* 12M emails per month
* 3 dedicated IP addresses
* Hosted Elasticsearch with 350GB storage

... will be about $1,500 per month, which is roughly 40% cheaper than Mailgun.

## Learnings

While SES is a powerful service, it's also far more complicated to configure than Mailgun. Mailgun offers a lot of convenient functionality like automatically handling bounces/suppressions, easier email attachment support, and out-of-the-box logging. Additionally, it was fairly cheap to use Mailgun with a moderate email load. Without the Weekly email, it cost us $363 per month to send ~500k emails with 2 dedicated IP addresses.

With that said, their move to tier-based pricing makes it more costly to operate at larger volumes. It seems that the goal of Mailgun's pricing changes is to maximize their value per customer by increasing cost at larger scale. On the other hand, AWS trends to reduce cost over time in order to gain market share. I'm confident that over time if SES prices do change they will drop, not increase.

The savings here definitely feel small, about $1,000 monthly. However, for a modestly profitable service like Instapaper, cost control is the key to long-term success. Seemingly small savings add up and make it possible for us to [fulfill our commitment](https://blog.instapaper.com/post/176732408411) to ensure Instapaper is a product that withstands the test of time.
