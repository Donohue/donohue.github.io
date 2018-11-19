---
layout: post
title:  "Instapaper Fragmentions"
date:   2014-05-13
categories: instapaper highlights
excerpt_separator: <!--more-->
---

When we built automatic sharing for Instapaper highlights, the team had several discussions about how to properly share a highlight link to another service. Here are two solutions we came up with:

1.  A page on Instapaper that showed the highlight, who shared it, and the original link to the article.
2.  A page on Instapaper that embedded the original article in a full screen iframe, highlighted the correct text, and scrolled to the highlight.

We knew neither of those solutions were great…

<!--more-->

As the launch got closer we were planning on punting on any special highlight link, and just share a link to the original article.


Two weeks before the big launch, [Borthwick](http://twitter.com/borthwick) sent me a link to a recently published article titled “[Fragmentions](https://medium.com/p/41ef2be9953f)”.

#### Fragmentions

[Kevin Marks](https://twitter.com/kevinmarks)’ article about fragmentions is excellent, and I definitely recommend reading it. Here is the TL;DR summary of it:

*   A fragmention references text in a webpage by appending the text to the end of the page’s URL.
*   Fragmentions are appended to the URL after a double number sign (“##”).
*   When a web page or browser detects a fragmention, it should highlight the corresponding text and scroll to it in the webpage. This behavior is similar to searching for text on a webpage.
*   An example fragmention: [http://epeus.blogspot.com/2003_02_01_archive.html##annotate+the+web](http://epeus.blogspot.com/2003_02_01_archive.html##annotate+the+web)

It’s an extremely elegant solution to the problem that we wrestled with when implementing highlight sharing in Instapaper: How do we link to a particular piece of text in a webpage? Kevin has proposed this as a web standard, and worked with [Jonathan Neal](https://twitter.com/jon_neal) to create a [script](https://github.com/chapmanu/fragmentions/blob/master/fragmention.js) that sites can use to support fragmentions.

#### Implementing Fragmentions in Instapaper

Fragmentions not only offer a much more elegant solution to referencing text in a webpage, but do so in a way that was _much_ easier to implement than the solutions our team had initially proposed. Here’s a GitHub gist that shows the function from our Highlight class that generates the fragmention for a highlight: [https://gist.github.com/Donohue/46b8f719f4d37f379f9f](https://gist.github.com/Donohue/46b8f719f4d37f379f9f)

Just 8 lines of code to build a fragmention URL! When a highlight is created in Instapaper, and the user has automatic sharing enabled, the fragmention URL is posted to the appropriate services.

We also quietly rolled out an update to Instapaper’s [Chrome](https://chrome.google.com/webstore/detail/instapaper/ldjkgaaoikpmhmkelcgkgacicjfbofhh?hl=en-GB) and [Safari](http://www.instapaper.com/static/files/instapaper.safariextz) extensions that will detect fragmentions, highlight the text in the article, and scroll to the text in the page. The implementation is beautiful, simple, and seamless!

#### The Poet’s Problem

When creating a fragmention or a highlight, there’s a possibility that the text occurs more than once within the document. For instance in Edgar Allan Poe’s “[The Raven,](http://www.heise.de/ix/raven/Literature/Lore/TheRaven.html)” the phrase “Quoth the raven” appears five times.

In a follow-up to his initial fragmentions post, entitled [Fragmentions for Poets](https://medium.com/p/fb8b535eb1f8), Kevin outlines this problem and discusses solutions. The solution he recommends is to simply add more text in the fragmention such that the reference becomes unique. For instance “Quoth the raven” would become “I implore!’ Quoth the raven”.

Jonathan Neal has solved the problem by implementing an “[nth-occurrence” solution](http://indiewebcamp.com/irc/2014-04-22/line/1398233800). Essentially you can append “++” and a number to a fragmention that will reference a particular occurrence of the text. For example…

[http://www.heise.de/ix/raven/Literature/Lore/TheRaven.html##Quoth+the+raven++4](http://www.heise.de/ix/raven/Literature/Lore/TheRaven.html##Quoth+the+raven++4)

… would reference the 5th and last mention of “Quoth the raven”.

Interestingly enough, I entertained both of these solutions back in January when I started focusing on highlights for Instapaper. Do we try to clip additional text around the highlight to ensure we are highlighting the correct occurrence, or do we reference the nth-occurrence of that text in the document?

It seemed cleaner and more deterministic to implement the nth-occurrence solution for Instapaper, and as such we are adopting Jonathan’s solution for the Poet’s Problem in our fragmention implementations.

#### [Things Done Changed](https://www.youtube.com/watch?v=rdciOXroU9o&feature=kp)

Another problem Kevin has responded to is what happens if the text changes as a result of an edit. It’s an extremely interesting problem, and one that we’ve discussed internally at [betaworks](http://betaworks.com/).

Thinking about the problem in an abstract nature: What do we do with metadata when the data it references has changed? I’m not sure if this has been researched, but it would probably make for an interesting dissertation.

In Instapaper if we have a highlight that we cannot find in the article we silently fail and expect the user to handle that edge case. I think about this similarly to broken links on the web: If a link breaks, it’s up to the people that have linked to it to change those links, otherwise it remains broken. Similarly, if a highlight cannot be found in the document, it’s the user’s job to delete their old highlight and create a new one.

#### Closing Thoughts

Fragmentions, at least from Instapaper, are not always perfect. I’ve seen some instances where a website will use smart quotes (“…”) and the fragmention will have regular old quotes, which will fail to match. Also some services like Facebook, which parses canonical URLs, strip fragmentions altogether.

Having said that, fragmentions are an excellent and simple solution to referencing text in a webpage, and it’s a solution that Instapaper plans to implement and support even more robustly in the future.

