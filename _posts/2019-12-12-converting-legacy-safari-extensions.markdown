---
layout: post
title:  "Converting Legacy Safari Extensions"
date:   "2019-12-12"
excerpt_separator: <!--more-->
---

In the process of converting Instapaper's Safari App Extension, I found Apple's documentation on [Converting a Legacy Safari Extension to a Safari App Extension](https://developer.apple.com/documentation/safariservices/safari_app_extensions/converting_a_legacy_safari_extension_to_a_safari_app_extension?language=objc#see-also) to be pretty limited and unclear. Outside of the most simple of Safari Extensions, there is no great upgrade or conversion path from the legacy extensions to the new extensions. From the documentation:

> If you already have a Legacy Safari Extension and you want to convert it to a Safari App Extension, you’ll need to modify parts of it and completely rewrite others.

What's missing from the documentation is what exactly you would need to modify or completely rewrite, which I hope to outline a bit more clearly...

<!--more-->

## Legacy Safari Extension Architecture

<figure>
<img src="/img/extensionsdiagram.png"/>
<figcaption>
Image from the Legacy <a href="https://developer.apple.com/library/archive/documentation/Tools/Conceptual/SafariExtensionGuide/ExtensionsOverview/ExtensionsOverview.html#//apple_ref/doc/uid/TP40009977-CH15-SW1">Safari Extensions Development Guide</a>
</figcaption>
</figure>

Legacy Safari extensions were entirely written in JavaScript, HTML, and CSS, and divided into two main parts. `Global.html` is a background page that largely contains JavaScript running in the background, separate from the webpages. The background JavaScript can interact with your web service (without dreaded CORS/CSP concerns), local storage, or Safari settings. The content JavaScript is injected directly on the webpages and has full access to the webpage content, but cannot easily interact with your web service, or access extension-specific storage or settings.

Communication between `Global.html` and content scripts is done via message passing over a Javascript-to-Javascript bridge. From within the webpage you can interact with the web content, from `Global.html` you can interact with your service or other extension-specific storage and settings, and any information needed between the two happens over the bridge. This is essentially the architecture of browser extensions for all modern web browsers, which allows for a lot of reusability (95%+) of browser extension code.

## Safari App Extension Architecture

<figure>
<img src="/img/safariappextension.png"/>
<figcaption>Safari App Extension Architecture</figcaption>
</figure>

The new Safari App Extensions have a similar architecture as before, with background logic that has access to the service, storage, etc, and the content scripts that have access to the webpages. However, the main differentiator is that the background logic, formerly contained in `Global.html`, is now written in Objective-C or Swift.

There are a couple of implications to this change:

1. `Global.html` JavaScript can no longer be re-used between Safari and other browser extensions.
2. Safari extensions can no longer utilize cookie-based authentication to interact with the extension's web service.
3. The developer needs to manage user login state in the extension separately from the service's website.
4. Any interaction between a Safari App Extension and a web service needs to happen via some API-based authentication mechanism, like OAuth.
5. APIs using cookie-based authentication need to be duplicated for OAuth-based authentication to support both Safari and other browser extensions.

The approach I took to achieve this for Instapaper was as follows:

1. Set up an OAuth consumer for the macOS app and Safari App Extension.
2. Manage user login state in the containing macOS app.
3. Store the login credentials in `NSUserDefaults` in a shared group that can be accessed between the macOS app and its extensions.
4. Re-write the `Global.html` JavaScript into Objective-C.
5. Create duplicate OAuth-based APIs for interacting with the Safari App Extension.

## App Review

There were a few rejections from App Review for a couple of items you may not be aware of unless you have submitted a macOS app before:

**Menu Item to Reopen Window after Its Closed**

If a user closes your Mac app, you either need to add a menu item to repon the window, or to exit the application. To have the application exit when you close the window just add the following to your AppDelegate:

```
- (BOOL)applicationShouldTerminateAfterLastWindowClosed:(NSApplication *)theApplication {
    return YES;
}
```

**Dark Mode Support**

Your app either needs to support dark mode, or you can explicitly opt-out of dark mode by adding the following to your ViewController:

```
self.view.appearance = [NSAppearance appearanceNamed:NSAppearanceNameAqua];
```
