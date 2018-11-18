---
layout: post
title:  "Making Instapaper Free"
date:   2014-10-09
excerpt_separator: <!--more-->
---

![](/img/posts/1*inshWfY7-6f8e0-Fq3bdFA.jpeg)

Toward the end of January 2014, [Andrew McLaughlin](https://twitter.com/mcandrew) (CEO Digg & Instapaper), [John Borthwick](https://twitter.com/borthwick) (CEO betaworks), and I had our first meeting since my promotion from lead iOS developer to General Manager of Instapaper to discuss the company’s roadmap. Since joining the Instapaper team in June 2013, I had advocated internally to eliminate Instapaper’s paid download and, instead, focus on adding value to the subscription. At the time, Instapaper’s subscription was priced at $1 per month, and the primary feature offered was full-text search.

<!--more-->

I put together a few slides for the meeting to give some structure & narrative to my argument for going free, and it’s interesting to view those through the looking glass of the past year.

![](/img/posts/1*gxWeUtSkNfKuarnh2jqb_Q.jpeg)

<figcaption class="imageCaption">iPhone App Revenue by Source (via TechCrunch)</figcaption>

Revenue from the iOS App Store is shifting away from paid-up-front applications to free applications with in-app purchases. The above chart shows a breakdown of revenues by source from the App Store, and it’s fairly easy to see where the growth in revenue is coming from. It’s definitely not app downloads.

The major issue with this breakdown is that it includes revenue from games, which are a major anomaly compared to other categories in the App Store.

![](/img/posts/1*EG9ANHoUacLHwkPqtg2eSw.jpeg)
<figcaption class="imageCaption">Growth in Freemium (via AppAnnie)</figcaption>

It’s tough to find vertical-focused analysis of App Store revenue, but the above slide separates revenue growth into “Games” and “Apps Excluding Games.” The data surrounding growth in games is huge (~125% YOY) and, given the huge growth in revenue for mobile games, I’m really excited for fellow betaworks company [Dots](http://weplaydots.com). Perhaps less obvious, though, is that sometime in 2013, revenue from “other” mobile apps saw an inflection point between paid downloads and in-app purchases. 2013 marked the first time in the history of the App Store that in-app purchases generated more revenue than paid downloads.

![](/img/posts/1*G3aDyaE4SSC7V-dDFOUo3g.jpeg)
<figcaption class="imageCaption">Top Grossing in News (via iTunes)</figcaption>

In an attempt to analyze revenue solely from the News category of the App Store, I did an analysis of the top grossing apps in the News category at the time. Of the twenty-two top grossing iPhone apps, 68% were free applications with in-app purchases. Looking only at the fifteen free apps in the twenty-two top grossing, 80% were Newsstand applications. The major difference between Newsstand apps and regular apps is that Newsstand apps all monetize on subscriptions from renewable in-app purchases. One possible conclusion here is that recurring revenue from renewable in-app purchases is driving the majority of grossing sales in the News category of the App Store.

![](/img/posts/1*rck5HzcUrohg9DmYzD6UbQ.jpeg)
<figcaption class="imageCaption">2012–2013 Monthly Downloads (source: AppFigures)</figcaption>

This is the most damning chart for any argument to keep Instapaper as a paid application. You can see a nose dive in Instapaper’s app downloads immediately following the launch of Pocket. [Marco Arment](http://twitter.com/marcoarment), founder of Instapaper, wrote a great blog post titled [Underscore Price Dynamics](http://www.marco.org/2013/09/28/underscore-price-dynamics) back in September 2013, which brings up a lot of important points about the state of paid applications:

1.  Almost everyone, when presented with a paid-up-front app, will first seek a free alternative.
2.  Customers hate the current method of paid “upgrades” (pulling the previous version from the store and putting up a new, separate paid-up-front app).
3.  These objections don’t apply nearly as much to in-app purchase.

What’s interesting to me from the above chart is the orange line, which represents Instapaper app updates. While the blue line shows a steep and steady decline of growth in app downloads, the orange line shows the size of Instapaper’s install base, which is significant. Unfortunately, there’s no great path to a paid upgrade if an app developer launches an update with a bunch of great features.

The only options for monetizing an existing install base are advertising (i.e. Facebook), creating a “new” app and converting your existing install base to purchase the “new” app (i.e. Tweetbot), or offering some type of subscription or consumable via in-app purchase (i.e. Evernote).

![](/img/posts/1*NzcDd1e8zThtSvIJK6Hcjw.jpeg)
<figcaption class="imageCaption">Feature Rubic for Instapaper’s 2014 Roadmap</figcaption>

At the time, there were a lot of ideas floating around for Instapaper’s direction and which features to prioritize. In the interest of moving toward a more sustainable business, I advocated that we focus on adding as much value to our existing subscription model, with a short-term focus on features that fit the following criteria:

1.  **User Demand.** We should be prioritizing the features our users are asking for.
2.  **Competitive Advantage.** I wanted to make sure we were leapfrogging the competition, not chasing them.
3.  **Subscription Value.** Potential for including the feature in the subscription package.

![](/img/posts/1*UYlcTD8xEeEtQ-hxH9SkLQ.jpeg)
<figcaption class="imageCaption">Instapaper Premium proposal</figcaption>

[Justin Van Slembrouck](http://twitter.com/jvanslem) (designer Digg & Instapaper) and I had previously discussed focusing on features for Instapaper’s subscription, and eventually increasing the price of the subscription and going free. Justin suggested that if we do that, we should rethink “Instapaper Subscription” and rebrand it to reflect to value of the new offering. We kicked around a few names, but settled on [Instapaper Premium](http://instapaper.com/premium), which just felt right. Instapaper Premium launched in September and contained a majority of the features from January’s proposal slide.

At the end of the meeting, we all agreed that this was the direction we needed to take to create a sustainable business for Instapaper. Months later at WWDC, I was able to catch up with Marco, and his response to our plan with Instapaper Premium was, “I think, ultimately, Instapaper will be the most successful as a freemium service.” Even though I advocated this decision and had the blessing of the betaworks higher-ups and Instapaper’s founder, making Instapaper free made me nervous. Revenue from paid downloads still made up a significant percentage of Instapaper’s quarterly revenue, but I knew we needed to forego short-term vanity metrics in the interest of creating a lasting, sustainable business. We owe that much to our users.

Within three weeks of launching Instapaper Premium, 4% of our subscribers have purchased at the new price point. As a way to show our appreciation for our existing subscribers, we grandfathered all of them at the previous price point ($1 per month), and it was great to see some support emails from people that wanted to cancel their original subscription in favor of purchasing Instapaper Premium at the new price point.

Our major challenge moving forward will be replacing revenue from app downloads with Instapaper Premium subscriptions, and growing the business beyond the revenue we’ve foregone. To do so, we’ve been executing a dead-simple strategy: implement the features our customers are asking for. You could practically recreate our roadmap by aggregating requests coming into Instapaper support and sorting by descending frequency. From highlights to text-to-speech, it’s worked incredibly well so far!

I’d love to hear your thoughts in the comments, or on [Twitter](http://twitter.com/bthdonohue)!

_Thanks to_ [_Aaron_](https://twitter.com/catzo)_,_ [_Andrew_](http://twitter.com/andrewdumont)_,_ [_Rodion_](http://twitter.com/loversmademen)_, and_ [_Suman_](https://twitter.com/_roySD) _for reading drafts of this post._
