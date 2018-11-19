---
layout: post
title:  "Medium to Jekyll Conversion Tool"
date:   "2018-11-18"
excerpt_separator: <!--more-->
---

This past weekend I was working on setting up a Jekyll blog and importing my Medium posts to it. The process was fairly tedious since you need to...

1. Convert Medium posts to Markdown
2. Download the images from the Medium post
3. Replace the image URLs in the post to URLs on your Jekyll blog
4. Strip extraneous information from the Medium posts (title, footer, etc)
5. Add the Jekyll frontmatter to the markdown

In order to help with this process, I wrote a [Medium to Jekyll conversion tool](https://github.com/Donohue/medium-to-jekyll) that automates this entire process:

```
python medium_to_jekyll.py <path-to-Medium-posts-directory> <path-to-Jekyll-root-directory>
```

The script does the following...

<!--more-->

1. Iterate through all .html files in the Medium exported posts directory.
2. Download the source images in the `img` tags from Medium posts and output them to an `img/` directory in the Jekyll root directory.
3. Updates all of the image sources in your blog post from Medium CDN URLs to the absolute path of your Jekyll directory (e.g. /img/filename.jpg)
4. Strips unnecessary HTML from the Medium posts (header, footer, CSS, etc.)
5. Converts the HTML into Markdown (using [markdownify](https://github.com/matthewwithanm/python-markdownify))
6. Formats the Jekyll frontmatter and prepends it to the converted Markdown.
7. Writes the Markdown files into the Jekyll `_posts/` directory with the proper formatting.

Hopefully this will save you some time if you&rsquo;re trying to import your Medium posts into a Jekyll blog.
