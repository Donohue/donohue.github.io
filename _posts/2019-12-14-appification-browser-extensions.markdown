---
layout: post
title:  "Appification of Browser Extensions"
date:   "2019-12-14"
excerpt_separator: <!--more-->
---

<img style="width: 256px !important; display: block;" src="/img/appstoreicon.png"/>

With Safari 13 launch in September 2019, Safari deprecated the old-style Safari Extensions in favor of Safari App Extensions. The newer extensions are bundled within a macOS app, and are closer in spirit to iOS app extensions then they are to traditional browser extensions.

Before this change, Safari Browser Extensions were fairly similar in structure to all modern browser extensions. More specifically, all modern browser extensions are comprised of  a "background script" and "content scripts", with communication between the two parts happening via messages over a JavaScript-to-JavaScript bridge. The "background script" can access local storage, extension settings, or a web service that interacts with the extension, and the "content scripts" have access to all of the content on the webpages the extension has access to.

With Safari App Extensions, the "background script" is now written in native code, either Objective-C or Swift. There's some implications here for browser extension developers...

<!--more-->

1. "Background script" code can no longer be re-used between Safari and other browser extensions.
2. Safari extensions can no longer utilize cookie-based authentication to interact with the extension's web service.
3. The developer needs to manage user login state in the extension separately from the service's website.
4. Any interaction between a Safari App Extension and a web service needs to happen via some API-based authentication mechanism, like OAuth.
5. APIs using cookie-based authentication need to be duplicated for OAuth-based authentication to support both Safari and other browser extensions.

All other modern browsers (Chrome/Firefox/Edge/Opera) are converging on the Chrome/Chromium extension format as the de-facto standard for browser extensions. These browsers make up for [85% of desktop market share](https://gs.statcounter.com/browser-market-share/desktop/worldwide). While packaging and distributing extensions into each browser extension store is somewhat burdensome, it's far less time consuming than re-writing a browser extension for Safari, which comprises less than 10% of desktop market share.

## Apple Perspective

From Apple's perspective, I understand why this makes sense:

1. Safari extension distribution has always been awkward, in both the self-hosted and the extension gallery models.
2. The legacy Safari Extension Gallery seemed like it was always a second-class citizen behind the App Store(s).
3. iOS extension model is already extremely successful, why not leverage the same setup for macOS too?
4. Apple is more focused on reusability between iOS and macOS than they are reusability and interoperability with other browser extensions.

## Developer Perspective

From a developer perspective, it means making a one-off effort to write an extension specifically for Safari. For simple extensions that only leverage content scripts, this is really not a big issue. However, for more complicated extensions that require user accounts and interaction with a web service, it really means making a dedicated effort to support the new Safari App Extension with custom software for both client-side and server-side interactions. Given Safari's relatively low desktop browser market share, it's tough to justify the effort unless browser extensions are a critical part of the business.

## Appification of Browser Extensions

I've been viewing the latest changes to Safari's extension model as part of a broader trend.

In 1995, as part of the original JavaScript specification, bookmarklets were created to allow end-users to run JavaScript on webpages. They were adopted uniformly into all browsers supporting JavaScript.

In 2014, I wrote about how [Content Security Policy killed bookmarklets](/2014/10/23/bookmarklets-are-dead.html), which required developers to individually build, package, and distribute browser extensions into each browser's extension store. 

In 2019, while most browsers are adopting the Chrome browser extension standard, Safari is charting its own path forward with Safari App Extensions. I understand why, but to me it represents a continued appification of browser extensions at a time when all other modern browsers are converging on Chromium extensions.

