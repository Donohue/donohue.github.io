---
layout: post
title:  "Microservices are Technical Debt"
date:   "2024-09-26"
excerpt_separator: <!--more-->
---

[Matt Ranney](https://www.linkedin.com/in/mranney/), a Principal Engineer at DoorDash, recently gave an interview called [Microservices are Technical Debt](https://www.youtube.com/watch?v=LcJKxPXYudE). I had the opportunity to work with Matt at DoorDash, and we had a lot of conversations on this topic [^1].

Are microservices technical debt?

I was strongly in the less-but-better-microservices camp at DoorDash. Like many things, there's a balance to be struck. Microservices [^2] are critical to any web-scale system. That said, when you start to *microservice all the things* you tend to trade one set of problems for another, and they are not necessarily an easier set of problems to deal with [^3].

The thing I liked most about the statement *Microservices are Technical Debt* is that it's provocative enough to start the right conversation. I do agree that a microservices-only architecture likely introduces more challenges and technical debt than it's worth.

[^1]: Occasionally over several beers :-)
[^2]: Maybe we should just call them "services"?
[^3]: For instance you might take your monolith spaghetti code and turn it into distributed systems spaghetti instead. The former is a lot easier to fix and work with, IMO.
