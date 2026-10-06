---
layout: post
title:  "Markdown Pain Points"
date:   "2026-10-05"
---
For the past few years, I've been writing exclusively in markdown across a few different use cases:

- Personal Blog [^1]
- [Instapaper Blog](https://blog.instapaper.com/)
- [Instapaper Docs](https://instapaper.com/docs)
- Work & personal notes

I mostly use [Obsidian](https://obsidian.md/) for writing and managing markdown files. Particularly across blogging & docs projects, I've run into some frequent pain points with sharing & collaboration.

Before publishing blog posts, I often will seek edits & feedback from coworkers, peers and, more often than not, my wife. The process of gathering those edits & feedback is somewhat comical:

- Render the markdown as HTML
- Copy the HTML
- Paste into Google Docs/Notion
- Share with collaborators
- Discuss comments & suggested edits
- Carefully merge approvals back into markdown
- Proof read the rendered HTML again
- Publish, typically via git

There's a similar, albeit different pain point, with [Instapaper Docs](https://instapaper.com/docs) help center which is just a collection of markdown files in folders. As the product evolves, the documentation becomes out of date, and Instapaper support will reach out to the engineering team to make edits to the Doc center.

This is ultimately really inefficient, but without access to git (or even much familiarity with markdown) this is the norm.

## Explored Solutions

We have tried using [Obsidian Sync](https://obsidian.md/sync) as a way to sync our markdown files across different user computers. While it works, it doesn't give the rich collaboration tools needed in the markdown space.

We also tried [Relay.md](https://relay.md/), an Obsidian plugin for syncing and collaboration. This is what we are currently using to sync an Instapaper Docs folder within a cloned git repository with the development team. When changes are made, they show up in the engineering teams git checkout, and they can be easily committed from there without manually making the edits.

## Opportunity

I've seen a number of people asking for [Google Docs for markdown](https://x.com/___frye/status/2090561358094037004) or a [collaborative markdown editor + git integration](https://x.com/dwr/status/2067592837890265384), and it seems at least a few other people feel a similar pain point.

The bull case for this opportunity is that agents are making markdown mainstream because they're a token efficient way to exchange ideas with humans, and that over time Docs-like use cases get eaten by markdown. In that world, the collaboration opportunity is fairly large (i.e. Notion/Google Docs).

The bear case is that agents will mostly be generating markdown, editing markdown, and in many cases reading/consuming markdown for people themselves. There might be some opportunity for collaboration, but it's for a subset of markdown writers rather than the quickly growing group of markdown readers.

[Let me know what you think.](mailto:brian@bthdonohue.com?subject=[Markdown])

[^1]: This one!
