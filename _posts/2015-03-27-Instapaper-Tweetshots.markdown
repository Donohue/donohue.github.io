---
layout: post
title:  "Instapaper Tweetshots"
date:   2015-03-27
excerpt_separator: <!--more-->
---

_In 72 hours…_

![](/img/posts/1*-2jI1O1zfICbk6TjP5kHbg.png)

It’s amazing how a (somewhat) slight product change can define a whole new set of behaviors. On October 29th 2013, Twitter launched inline image previews directly in the timeline, allowing users to view images without clicking through a link. In the one year since inline images launched, there has been a trend of sharing screenshots of text (usually from mobile devices) to Twitter, which allows the user to share specific parts of an article without exceeding the 140 character limit...

<!--more-->

At betaworks, we’ve been curious about this trend since it began and, by now, it has become pretty hard to miss if you’re working in technology. Some of the most prominent [journalists](https://twitter.com/fmanjoo/status/535050216689659906) and [venture capitalists](https://twitter.com/cdixon/status/535245781000011776) have been tweeting text shots, and with good reason. Look at the engagement difference between these two tweets about the same article:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Nikola Tesla predicted the iPhone - &quot;A man will be able to carry one in his vest pocket” <a href="http://t.co/ADlkH1HpWR">http://t.co/ADlkH1HpWR</a></p>&mdash; Chris Dixon (@cdixon) <a href="https://twitter.com/cdixon/status/535199015282155520?ref_src=twsrc%5Etfw">November 19, 2014</a></blockquote>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Nikola Tesla predicting today back in 1926 <a href="http://t.co/5Air6JEULu">pic.twitter.com/5Air6JEULu</a></p>&mdash; Chris Dixon (@cdixon) <a href="https://twitter.com/cdixon/status/535245781000011776?ref_src=twsrc%5Etfw">November 20, 2014</a></blockquote>

### Sunday, February 22nd

I received a brief email from [John Borthwick](http://twitter.com/borthwick) (CEO at betaworks):

> Could we add a share from Instapaper where I share an image of a highlight (however long it is) and we figure out the URL formatting etc. to make it clear that its an image of a highlight from Instapaper. Sharing would be to Twitter and Instagram.

I had spoken with Instapaper designers Justin Van Slembrouck and Aaron Kapor in the past about doing this, but the priority was always lower than some other, more pressing task. However, with the rise of tweet shots, [apps](http://oneshot.link/) being made to assist in the creation of those screenshots, and an imminent [Instapaper iOS release](http://blog.instapaper.com/post/114681736471), it made sense to take a day or so to try and build a tweet shot feature for Instapaper.

We started by looking at existing behaviors and identifying some obvious issues with the current process:

*   It’s cumbersome: Creating a tweet shot takes about 10 steps.
*   Hard to read: At times, the original image is too large for Twitter, and the results are tiny font sizes, weird line heights, and too many or too few characters per line.
*   Not glanceable: Tweet shots often do not fit within the Twitter image preview, which is further complicated by the fact that the image previews are slightly different on desktop and mobile.
*   Clutters the camera roll: Because all of the existing solutions required a screenshot before image processing, the person’s camera roll becomes cluttered with screenshots.

With the above in mind, we set out to make sure of the following for Instapaper tweet shots:

*   Beautiful typography with an emphasis on readability that, whenever possible, wouldn’t require expanding the image.
*   No screenshots cluttering your camera roll.
*   No more than three taps to send to keep things really easy.

### Monday, February 23rd

The first thing we nailed down was the three-tap send, which could actually be done in just two taps by users that had already created a highlight of the text they wanted to share:

![](/img/posts/1*-2jI1O1zfICbk6TjP5kHbg.png)

We were able to achieve three-tap tweet shots by doing the following:

*   The image is generated programmatically when you tap the “Tweet Shot” button. The app sets up the aspect ratio and type properties automatically rather than have the user crop and adjust a screenshot.
*   No “preview” version of the image. You’ll get a little thumbnail preview before you hit the “Post” button on the Twitter share sheet, but that’s it.
*   Use Instapaper’s built-in customization to generate the image using the current font and background color.

### Tuesday, February 24th

After some trial and error, we managed to finalize the layout of our tweet shots with the text in the user’s current font and article metadata & attribution in HelveticaNeue:

<figure name="1235" id="1235" class="graf graf--figure graf--iframe graf-after--p">

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="http://t.co/TilgAdhU9Y">pic.twitter.com/TilgAdhU9Y</a></p>&mdash; Test (@briantestuser) <a href="https://twitter.com/briantestuser/status/570286183676284928?ref_src=twsrc%5Etfw">February 24, 2015</a></blockquote>

</figure>

Then, we started working through some edge cases…

_What happens if you only select one sentence?_

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="http://t.co/T0DtXvvjsc">http://t.co/T0DtXvvjsc</a><br>But beyond these small technicalities <a href="http://t.co/7hKLiu0ujl">pic.twitter.com/7hKLiu0ujl</a></p>&mdash; Test (@briantestuser) <a href="https://twitter.com/briantestuser/status/570306016719581184?ref_src=twsrc%5Etfw">February 24, 2015</a></blockquote>

<figcaption class="imageCaption">Not quite right…</figcaption>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="http://t.co/T0DtXvvjsc">http://t.co/T0DtXvvjsc</a><br>But beyond these small technicalities <a href="http://t.co/N0tOu1XRPf">pic.twitter.com/N0tOu1XRPf</a></p>&mdash; Test (@briantestuser) <a href="https://twitter.com/briantestuser/status/570308996957118466?ref_src=twsrc%5Etfw">February 24, 2015</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<figcaption class="imageCaption">That’s better, also testing long titles!</figcaption>

_What happens if I choose a very long selection?_

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Such wall of text <a href="http://t.co/FQzQg4YZ6b">pic.twitter.com/FQzQg4YZ6b</a></p>&mdash; Test (@briantestuser) <a href="https://twitter.com/briantestuser/status/570352136850055168?ref_src=twsrc%5Etfw">February 24, 2015</a></blockquote>

<figcaption class="imageCaption">The line height is pretty bad here, but we’ll get to that later…</figcaption>

Lastly, we started testing a ton of different font and background combinations to determine if there were any weird edge cases:

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr">:-) <a href="http://t.co/O4y7JwdhC6">http://t.co/O4y7JwdhC6</a> <a href="http://t.co/bVkRQBcaOi">pic.twitter.com/bVkRQBcaOi</a></p>&mdash; Test (@briantestuser) <a href="https://twitter.com/briantestuser/status/570369948884692992?ref_src=twsrc%5Etfw">February 24, 2015</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<figcaption class="imageCaption">Lyon on White</figcaption>

<blockquote class="twitter-tweet" data-lang="en"><p lang="und" dir="ltr"><a href="http://t.co/wifywAbJ2C">pic.twitter.com/wifywAbJ2C</a></p>&mdash; Test (@briantestuser) <a href="https://twitter.com/briantestuser/status/570315518743351296?ref_src=twsrc%5Etfw">February 24, 2015</a></blockquote>

<figcaption class="imageCaption">Ideal Sans on Sepia</figcaption>

### Wednesday, February 25th

With the broad strokes finished, our designer Aaron and I embarked on the painstaking task of going through every font in Instapaper and adjusting line heights & font size to make sure the images were perfectly set. After we completed all of the typography tweaks, I went through each of Instapaper’s 14 fonts, took screenshots for one sentence, two sentences, and a paragraph, and collected the generated image, the inline desktop view, and the inline mobile view for each screenshot in each font.

Once I collected all of the images, I sent them to Aaron for a final review. You can find the deliverable I sent him [here if you’re interested](https://www.dropbox.com/s/vfu2fage1dzdkpm/TweetShots%20%2B%20Mobile.zip?dl=0).

### Thursday, February 26th

We shipped the release version of Instapaper 6.2 to our TestFlight testers (tweet shots were one of four major features in this release) and, after a week, submitted to the App Store for review. Here are a few of the earliest tweet shots from Instapaper testers:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Testing <a href="https://twitter.com/instapaper?ref_src=twsrc%5Etfw">@instapaper</a> tweetshots. This makes my life much easier.  <a href="http://t.co/LJGrPues1K">http://t.co/LJGrPues1K</a> <a href="http://t.co/yYRjU7yY92">pic.twitter.com/yYRjU7yY92</a></p>&mdash; ryan (@internetryan) <a href="https://twitter.com/internetryan/status/571003787986522112?ref_src=twsrc%5Etfw">February 26, 2015</a></blockquote>

<figcaption class="imageCaption">FS Me on White</figcaption>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Thank you <a href="https://twitter.com/bthdonohue?ref_src=twsrc%5Etfw">@bthdonohue</a>! This is a real treat.<br>cc <a href="https://twitter.com/mgsiegler?ref_src=twsrc%5Etfw">@mgsiegler</a>  <a href="http://t.co/na8KErtqc7">http://t.co/na8KErtqc7</a> <a href="http://t.co/UcMEJvkhl7">pic.twitter.com/UcMEJvkhl7</a></p>&mdash; Joe Caiati (@JoeCaiati) <a href="https://twitter.com/JoeCaiati/status/571003777370750976?ref_src=twsrc%5Etfw">February 26, 2015</a></blockquote>

<figcaption class="imageCaption">Proxima Nova on White</figcaption>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">.<a href="https://twitter.com/bthdonohue?ref_src=twsrc%5Etfw">@bthdonohue</a> the tweetshot have really a great design. I love them.<br><br>Here is an example. Love <a href="https://twitter.com/instapaper?ref_src=twsrc%5Etfw">@instapaper</a>. <a href="http://t.co/0gWk5eX1ML">pic.twitter.com/0gWk5eX1ML</a></p>&mdash; Daniel H. (@dahanbn) <a href="https://twitter.com/dahanbn/status/571029207377162241?ref_src=twsrc%5Etfw">February 26, 2015</a></blockquote>

<figcaption class="imageCaption">Lyon on Black</figcaption>

Daniel H., whose tweet is featured above, did something pretty interesting with Instapaper’s tweet shots. In reply to the above tweet, I wrote:

> [_@dahanbn_](https://twitter.com/dahanbn) _yes they are very handsome, lends itself to our strengths: simplicity & beautiful typography._

Daniel then saved that tweet to Instapaper, and created a tweet shot of my reply:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Even possible to tweetshot tweets via <a href="https://twitter.com/instapaper?ref_src=twsrc%5Etfw">@instapaper</a>. Well done, <a href="https://twitter.com/bthdonohue?ref_src=twsrc%5Etfw">@bthdonohue</a>!  <a href="https://t.co/KSSAQMOFkn">https://t.co/KSSAQMOFkn</a> <a href="http://t.co/Isylq9HD2D">pic.twitter.com/Isylq9HD2D</a></p>&mdash; Daniel H. (@dahanbn) <a href="https://twitter.com/dahanbn/status/571031104079208449?ref_src=twsrc%5Etfw">February 26, 2015</a></blockquote>

Twitter recently reintroduced embedded tweets in the timeline, but as far as I can tell, this is a totally original use of tweet shots, and it’s always really exciting to see someone use your product in a way that wasn’t explicitly intended.

Also, it looks amazing inline:

![](/img/posts/1*CG7FWCSV6xTdENdMjkYMtA.png)

