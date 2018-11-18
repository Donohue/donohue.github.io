---
layout: post
title:  "Hacking TestFlight Invites"
date:   2015-01-14
excerpt_separator: <!--more-->
---

![](/img/posts/1*YUI77blROymvCU5Mz6aBBw.png)

Beta distribution on iOS has always been a pain in the ass. At the end of 2010, TestFlight launched a solution that made iOS beta distribution considerably less painful. TestFlight provided a platform that allowed developers to manage a set of beta testers, upload beta versions of their apps, distribute those betas to the testers, and manage feedback from beta testers. TestFlight was a godsend for iOS developers...

<!--more-->

Even with TestFlight, beta distribution on iOS was far from perfect. It was still cumbersome to manage testers’ devices properly, and developers were still subject to Apple’s 100 device per year limit. Apple obviously understood that beta distribution was still an area that needed lots of improvement because they acquired TestFlight in early 2014, and launched an official TestFlight integration in October 2014.

We beta tested [Instapaper 6.1](https://itunes.apple.com/us/app/instapaper/id288545208?mt=8) using Apple’s TestFlight integration, and it’s incredibly well done. The new integration solves a lot of the pain points that the original TestFlight couldn’t address. Developers no longer have to manage a list of tester’s iOS devices, the 100 device limit was changed to a 1,000 user limit, and the entire process is more streamlined and straightforward. However, the old TestFlight did one thing much better than the new TestFlight integration: user invites.

![](/img/posts/1*-Ya9nGBr3u88GkXY1BFq1A.png)

<figcaption class="imageCaption">Old TestFlight recruitment page</figcaption>

With the old TestFlight you could manually add users via email, but TestFlight also gave you a URL that you could share anywhere in order to recruit beta testers for your app. With the new TestFlight you only have the option to add testers via email, or bulk inviting testers by uploading a CSV file with email addresses.

![](/img/posts/1*sQweFCSCxSn_9B3VkKJtnA.png)

<figcaption class="imageCaption">New TestFlight invite page</figcaption>

Munging CSV files and manually entering email addresses is a hassle, and a big step back from the days of “Want to beta test? Sign up [here](https://testflightapp.com/join/4e94d263e2fcc0a131cd4cc715a402b1-MjE5ODU4/)!” I wanted to make recruiting beta testers for [Instapaper](https://www.instapaper.com) easy again by allowing people to visit a URL, sign up for beta testing, and have their information automatically entered into Apple’s new TestFlight solution.

### Research & Implementation

So I started by adding a tester in iTunes Connect and inspecting the page’s network requests to find the API call & payload Apple is expecting when adding a new tester to TestFlight:

![](/img/posts/1*3Y9GiwA184_V_EixxTF_EA.png)

Pretty straightforward. The next step was to figure out how to programmatically login to iTunes Connect, and manage the authorization cookies in the above request. Luckily, that problem had already been solved! I found a [great script](https://github.com/kirbyt/appdailysales/blob/master/appdailysales.py) written by [Kirby Turner](https://twitter.com/kirbyt) that programmatically downloaded app sales data from iTunes Connect by first logging the user in, and then performing the necessary web requests. Jackpot!

### Making it Usable

Once I modified the appdailysales.py script to successfully add a new user to TestFlight, I basically just needed to set up a page for Instapaper users to submit their email address & name (optional), and integrate my testflight_invite.py script into our code base. I’m pretty happy with the result:

![](/img/posts/1*yJZH-GZ3T3d34jYI68sHJg.png)

I’ve put the [code up on GitHub](https://github.com/Donohue/testflight_invite) in case you’re interested in playing with it or scaffolding your own TestFlight invite page.

Oh! One more thing! If you want to help beta test Instapaper on iOS you can [sign up here](https://www.instapaper.com/testflight)!

_Edit:_ Within 5 hours we had 326 beta testers signup and the invite page is now closed!
