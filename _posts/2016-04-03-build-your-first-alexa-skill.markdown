---
layout: post
title:  "Build your First Alexa Skill"
date:   2016-04-13
excerpt_separator: <!--more-->
---


<div class="clearfix">
<div class="alexa_container container">
<div class="block" id="alexa" title="Alexa" alt="Alexa" href="/"></div>
</div>
</div>

Last night [betaworks](https://medium.com/u/5e777814cf5f) and Amazon hosted the first [NYC Amazon Alexa Meetup](http://www.meetup.com/NYC-Amazon-Alexa-Meetup/events/229608635/) to bring Alexa owners and enthusiasts together to build their first Alexa Skill. For the uninitiated, the Amazon Alexa service is the speech recognition and voice synthesis engine that powers the [Echo](http://www.amazon.com/gp/product/B00X4WHP5E?tag=googhydr-20&hvadid=84472872905&hvpos=1t1&hvexid=&hvnetw=g&hvrand=2174594906047924354&hvpone=&hvptwo=&hvqmt=b&hvdev=c&ref=pd_sl_202q10xm53_b), [Dot](https://www.amazon.com/b?node=14047587011&tag=googhydr-20&hvadid=81095120102&hvpos=1t1&hvexid=&hvnetw=g&hvrand=8212341339556957137&hvpone=&hvptwo=&hvqmt=e&hvdev=c&ref=pd_sl_1bxrunqc4w_e), and [Tap](http://www.amazon.com/dp/B00VXS8E8S?tag=googhydr-20&hvadid=81487265582&hvpos=1t1&hvexid=&hvnetw=g&hvrand=13692627767376112535&hvpone=&hvptwo=&hvqmt=e&hvdev=c&ref=pd_sl_69izw251ac_e). The Alexa Skills Kit allows third-parties to create their own Alexa Skills that will then work with any Alexa-enabled devices...

<!--more-->

We had 45 people attend the [meetup](http://www.meetup.com/NYC-Amazon-Alexa-Meetup/events/229608635/), a majority of whom owned an Echo. The crowd was a good mix of professional developers, hobbyist developers, and those with little-to-no coding experience. My co-organizer [Amit Jotwani](https://medium.com/u/d538bce230c1), an evangelist for the Alexa Voice Service, gave an overview on the Alexa service and ecosystem, and afterwards I walked everyone through the steps to create their own skill.

At the end of the meetup we had 27 skills built, and a handful of people were able to customize their skills to create useful apps for themselves. One person with no prior coding experience went from “Hello, World!” at 8PM to publishing the skill for “Certification” (Amazon review) by midnight, which is incredible!

I wanted to provide the slides with a bit of color here so other Alexa enthusiasts would be able to build their own skills, no coding experience required. Here it goes:

![](/img/posts/1*E3155-o18xfC9hVHCriTbQ.png)

<figcaption class="imageCaption">This is the first Alexa Skill I built to track the number of days since I quit smoking. It’s been 322 days. Here’s a video of it in action: [https://twitter.com/bthdonohue/status/705834787236409346](https://twitter.com/bthdonohue/status/705834787236409346)</figcaption>

Each Alexa skill is comprised of an “Invocation Name” which you can think of as your app name, a set of “Intents” and the phrases that map to each intent, and the software that can detect the intent and return an appropriate result.

![](/img/posts/1*BzP-MbBpdiNouIdHIL02Cg.png)

<figcaption class="imageCaption">We used everyone’s last names during the meetup because we all used the same Amazon account which was linked to the same testing Amazon Echo.</figcaption>

The skill we’re going to build is going to be an adaptation of the classic “Hello, World!” program.

![](/img/posts/1*24YIKOd6a88tep2No3j2bA.png)

Building your first skill will comprise of four steps. First we’re going to copy the “Hello, World!” code into Amazon Lambda, which will be responsible for running the code. Next we’re going to set up our skill in the Amazon Alexa Skills Developer Portal, and link our lambda function to that skill. Then we’re going to test using the Amazon service simulator and on an Alexa-enabled device. Lastly, we’ll walk through the steps of customizing your skill to your needs.

![](/img/posts/1*yfcCpuXFFdiZN35T5CLP5g.png)

I put together a list of resources at [https://bit.ly/alexaskill](https://bit.ly/alexaskill), which is a public Instapaper folder I set up to make sharing the list of links easy. The slides will refer to each of these links. I’d recommend having this open in a tab so you can refer back to the links easily.

### Step 1

![](/img/posts/1*xp0LoXq9DA80M2jQDZwkEA.png)

![](/img/posts/1*_FESNc05l3WFlfdrPwa3Cw.png)

Here’s link 1 for convenience: [https://console.aws.amazon.com/lambda/home?region=us-east-1#/create?step=2](https://console.aws.amazon.com/lambda/home?region=us-east-1#/create?step=2)

![](/img/posts/1*JVW4EmIx2xKnx6aYXqoJMg.png)

<figcaption class="imageCaption">You should arrive here after signing up. If not, just click link 1 again.</figcaption>

Enter the name of your Lambda function. It’s not very important what the name is but it needs to be unique, you can just use “HelloWorld”. In the top right it should say “N. Virginia”. If that’s not the case please select “US-East (N. Virginia)” from the dropdown.

![](/img/posts/1*TCQhZoLBJtDKdrpMBLxyUA.png)

Here’s link 2 for convenience: [https://github.com/Donohue/alexa/blob/master/src/index.js](https://github.com/Donohue/alexa/blob/master/src/index.js)

![](/img/posts/1*tVBGkuBWAk-wis-PAk07rg.png)

Back in Lambda, you’re going to scroll down a bit and paste the code you copied from GitHub into the large text box under “Lambda function code”.

![](/img/posts/1*gXwTF9sNj_7L-45d8haE8A.png)

Scroll down a bit further to the “Lambda function handler and role” section. You’re going to want to set the role to “lambda\_basic\_execution”. It’s important to note that if this is your first time using Lambda, you’ll have to create the “lambda\_basic\_execution” role. You can do that by selecting the first option “\* Basic Execution” and clicking the blue button on the next page. After you take that step, you should be able to select “lambda\_basic\_execution”.

![](/img/posts/1*C36HxbtFT3lF9pFmv3JmDQ.png)

After setting the role, you can just click the blue “Next” button then the blue “Creation Function” button on the next page. We’re almost done, I promise.

![](/img/posts/1*ODl11jN3VwGhgVAlw1kjlA.png)

Once you’ve created the function, click on the “Event Sources” tab, then click the blue “Add event source” link, then select “Alexa Skills Kit” from the modal dropdown.

Please note if you’ve never signed up for the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list), you’ll have to do that first before the “Alexa Skills Kit” will appear from the Event Sources dropdown. Please also make sure you use the same Amazon account as the one you’re using for AWS and your Echo.

#### Step 1 Done

![](/img/posts/1*WXBkb3sWDvcw6ifyzvrItQ.gif)

Keep the Amazon Lambda tab open though, we’ll need to come back to it!

### Step 2

![](/img/posts/1*fLVUygy4wQszmxRPS5PWHA.png)

![](/img/posts/1*hGmDXfH3F2mKH6gIkCPZXA.png)

Here’s link 3 for convenience: [https://developer.amazon.com/edw/home.html#/skills/list](https://developer.amazon.com/edw/home.html#/skills/list)

![](/img/posts/1*MqUtpDDSsBTUuysjBier_A.png)

Click the yellow “Get Started >” button under “Alexa Skills Kit”, then the yellow “Add a New Skill” button on the next page.

![](/img/posts/1*7S6kAmf6jLZ7_8RaOZhs4Q.png)

The name of your Amazon Alexa skill must be unique for your account, and the invocation name is what you’ll use to activate the skill. “Alexa, tell \<invocation name\> to say Hello, World”. We used everyone’s last names at the meetup since we were using the same account. You can use “Hello World” if you’re lacking in creativity. Click the yellow “Next” button when you’re ready!

![](/img/posts/1*iXt3o6KxIZ-wdrRfi4aHpA.png)

Here is where we’re going to tell the skill which intents we support, and what type of words will trigger each intent. Get ready for some copy and pasting.

![](/img/posts/1*Di-Zf3m1N0AWiHKXIpuqPg.png)

Here’s link 4: [https://github.com/Donohue/alexa/blob/master/speechAssets/IntentSchema.json](https://github.com/Donohue/alexa/blob/master/speechAssets/IntentSchema.json)

![](/img/posts/1*eBNZPWCWbasqh7H64sAGWQ.png)

![](/img/posts/1*ob0OlUPBdm8svBKhUFCdnA.png)

Here’s link 5: [https://github.com/Donohue/alexa/blob/master/speechAssets/SampleUtterances.txt](https://github.com/Donohue/alexa/blob/master/speechAssets/SampleUtterances.txt)

![](/img/posts/1*DFmTpNRTDYFaox3JqVGnQw.png)

Click the yellow “Next” button after you’ve pasted the Sample Utterances.

![](/img/posts/1*HKEFi0ievrGYBnoG0jBNMA.png)

Change the radio button from “HTTPS” to “Lambda ARN” and select the “No” radio button under Account Linking. Now we’ll have to go and grab the Lambda Amazon Resource Name (ARN) from our Lambda tab. You still have that open, right?

![](/img/posts/1*yodxeQKrYjxxh26txdKtKg.png)

The ARN is on the top right of the Lambda function page. I have it selected in the image above. You’ll want to copy the selection as I have it above.

![](/img/posts/1*iJHo8qnBQb__hbQL0ro7lA.png)

Paste the ARN into the text field, and press “Next”.

#### Step 2 Done

![](/img/posts/1*npQAFDyVe3nr1v8x3MCW7A.gif)

### Step 3: Amazon Skills Test

![](/img/posts/1*EQPNZwXv_8QO6_cvs3kiXA.png)

![](/img/posts/1*web80Yh6h15z3Psxa2VL3g.png)

After you click “Next” on the “Configuration” tab, you should be on the “Test” tab. Under the “Service Simulator” portion you’ll be able to enter a sample utterance to trigger your skill. For the “Hello, World” example you should type “say hello world”, and on the right you should see the output from the Lambda function you created: “Hello, World!”

![](/img/posts/1*XC3Eqp55G1VIXV5IAx3KBQ.png)

If you got the correct output using the Service Simulator, try it on the Amazon Echo. We were using everyone’s “last name” at the meetup, but you should use the invocation name you set in step 2c.

> Alexa, tell Hello World to say Hello World

#### Step 3 Done

![](/img/posts/1*dsYNwEAIA57WXUbAMmYxLQ.gif)

Congrats, you just created your first Alexa skill! 👏👏

### Step 4: Customize

![](/img/posts/1*8tYf2HJDh9k-0F43bn-oLA.png)

![](/img/posts/1*DWJUFWqGUSxekLk9xOf7BQ.png)

Go back to “Interaction Model” tab in the Alexa Skill Developer portal, and edit the words on the right of “TestIntent” with the words you would like to say to Alexa. An example might be “who is the coolest person on earth”, and you’d say “Alexa, ask <invocation name> who is the coolest person on earth?” Next we’ll customize the output.

![](/img/posts/1*12QfN7P6jHdXpSBo0WEJ1w.png)

#### Step 4 Done

![](/img/posts/1*KdfqphskuVljnRPIgB3q8w.gif)

If you have any questions you should feel free to reach out to me on [Twitter](https://twitter.com/bthdonohue) or via email to [brian@bthdonohue.com](mailto:brian@bthdonohue.com). If you’re in the NYC area you should definitely sign up for the [NYC Amazon Alexa Meetup](http://www.meetup.com/NYC-Amazon-Alexa-Meetup/) and come to the next event!

– Brian
