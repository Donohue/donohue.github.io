---
layout: post
title:  "Dark Mode for Web"
date:   "2019-10-15"
excerpt_separator: <!--more-->
---

Since the launch of dark mode on iOS 13 and Android 10, I found myself [wanting dark mode for web](https://twitter.com/bthdonohue/status/1175854494820651008). Dark mode is ideal for night time phone use, but it's really jarring to open a link in a dark mode app and be blinded by the white backgrounds of the web.

Fortunately, Apple launched [Dark Mode Support in WebKit](https://webkit.org/blog/8840/dark-mode-support-in-webkit/) in May of this year, and most major browsers now support the [`prefers-color-scheme` media query](https://caniuse.com/#feat=prefers-color-scheme) to customize CSS for dark mode...

<!--more-->

## Implementing Dark Mode in CSS

To implement dark mode on your site, first make variables for colors used in CSS properties:

```
:root {
    --background-color: white;
    --text-color: black;
}
```

Next, use the variables in your CSS properties. Keep the color values for browsers without support for variables:

```
body {
    background-color: white;
    background-color: var(--background-color);
    color: black;
    color: var(--text-color);
}
```

Lastly, customize the colors for dark mode using the `prefers-color-scheme` media query:

```
@media (prefers-color-scheme:dark) {
    :root {
        --background-color: rgb(17, 17, 17);
        --text-color: rgb(170, 170, 170);
    }
}
```

And that's all you need for basic dark mode support for your website.

## Dimming Images

As part of dark mode support, it's a nice touch to dim your images (especially for night time readers):

```
:root {
    --image-opacity: 1;
}

@media (prefers-color-scheme:dark) {
    :root {
        --image-opacity: 0.8;
    }
}

img {
    transition: all 200ms ease-out;
    opacity: var(--image-opacity);
}
```

Lastly, make the image full brightness when someone hovers on desktop or taps on mobile:

```
img:hover, img:active {
    opacity: 1;
}
```

## Dark Mode on This Blog

I took the approach above to enable dark mode on this blog. Try it by enabling dark mode on your computer or mobile device. This blog is open source on GitHub so you can view [the full CSS changes](https://github.com/Donohue/donohue.github.io/commit/68ada5cbc9bd1c36ac0c1412a54764eaafdfed30) made to enable dark mode support.

In dark mode, test the image dimming below:

![](/img/glacier.jpg)
