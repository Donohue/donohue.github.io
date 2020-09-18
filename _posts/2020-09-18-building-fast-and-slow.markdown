---
layout: post
title:  "Building Fast and Slow"
date:   "2020-09-18"
excerpt_separator: <!--more-->
---

When building products, there's a tension between building something quickly versus building something high quality. In order to build good products, it's important to balance velocity with quality. At certain phases it's appropriate to build it "quick and dirty", in others it's important to take time to create polished, high quality experiences. I've seen a number of cases where people struggle to create this balance, which produces low quality products. Here's when I think it's good to build fast and slow...

<!--more-->

## Building Fast

### Hypothesis Validation

Every product or feature starts with a hypothesis. The goal for anyone building products should be to validate that hypothesis quickly. Ideally, hypotheses should be validated not by writing software, but by listening to customers, leveraging surveys, or running no-code experiments (e.g. create a signup landing page and purchase search ads to drive traffic, measure traffic/conversion/etc).

If you need to write software to validate your hypothesis, you should write the least amount of software possible and start testing quickly. As [Reid Hoffman says](https://twitter.com/reidhoffman/status/847142924240379904?lang=en), "if you're not embarrassed by your first product, you launched too late." Generally, this is referred to as Minimum Viable Product/Feature, but more than that, you should be in the mentality that any product and code is throwaway before hypothesis validation. Quality expectation should only be high enough to validate the hypothesis. Going further, the quality bar should be relatively low as customers will jump through hoops to use a product they want.

### Cutting Scope Upfront

When building products, there are often opportunities to cut scope that will let you validate a hypothesis more quickly. Sometimes that means sacrificing 10% of a design to reduce the engineering effort by 90%. Sometimes it's appropriate to [do things that don't scale](http://paulgraham.com/ds.html) in order to move more quickly to validate your hypothesis.

At Pinterest, I led the small team that launched Board Sections. We built and shipped that feature to 100% within 100 days, which may have set a Pinterest record for a feature of that size. Building that feature to support hundreds of millions of people required changing some of our older, legacy storage systems. The process of implementing that change took me about two months. Rather than building for scale up front, I implemented an initial solution using a more modern storage system that we knew wouldn't scale. This allowed us to get a working prototype together in 2 weeks, and launch to a set of 20,000 beta testers in the first month. After validating the hypothesis on iOS, we were able to pull in Android and Web engineers to build on those platforms while implementing the scaled solution. As a result, we were able to launch on all platforms within 100 days from first lines of code.

In the above example, we were able to build faster by parallelizing _hypothesis validation_, _product iteration_, and _building for scale_. It would not be conventional wisdom to remove scaling considerations from scope, but leveraging past experience, we were able to cut that scope early to move more quickly. Knowing where to cut scope can be tricky, and typically comes from trial & error.

### Pitfall: Software Forks

I've seen teams move more quickly by completely forking a piece of software to create new features or functionality. Examples of software forks could be building a forked business profile even though the underlying user models are the same, or creating a fork to support mWeb. While this approach is great at shipping the project quickly, it creates long-term debt and overhead that makes the team move more slowly over time.

As the original and forked software evolve, they tend to diverge in terms of features, design, and overall quality. Eventually the maintenance overhead for the fork and original software become untenable, and the inevitable unification project is undertaken in order to reduce the overhead.

Software forks are a great way to move quickly, but they result in future overhead that slows teams down over the long-term. Refactors and rewrites are inevitable parts of working on a software team. That said, I'm convinced that software forks without the intention to eliminate the original version slow everything down long-term, and should be generally avoided.

## Building Slow

### Scrutinizing Inputs

Given that engineering is both the most expensive part of building a product and typically a company's most constrained resource, it's critical to slow down and spend more time scrutinizing inputs before building. For product engineering projects, the inputs are largely the _hypothesis_ and the _design_.

Though we need to move quickly to validate hypothesis, I've found that teams often don't take enough time _scrutinizing the hypothesis_ before execution. The hypothesis is both the cheapest part of the product development process, and the most important in terms of building a successful product. No matter how good the design or technology might be, the product will never be worth using if it doesn't fulfill the hypothesis around a customer need. Spending a week or two debating the merits of a hypothesis may feel like a long time, but it's much less painful/expensive than executing on a bad hypothesis and learning that during execution.

Similarly, I've found that too often engineering teams move too quickly on receiving designs. The worst time to debug a design is in the middle of writing the software for it and running into edge cases. When receiving a design, it's worthwhile for engineers to take at least an hour or two on their own to think through the execution of the design, and start debugging the edge cases like they would for user input. Engineers can debug a lot of these edge cases leveraging past experience, and save a lot of execution time down the road. I'd much rather see engineers and designers take up to two weeks to finalize designs than to dive into the engineering process without a properly debugged design.

### Polishing Pixels and Animations

After testing your product and validating your hypothesis, it's time to slow down and put all of the finishing touches on the product. Polish is the painstaking work of making every pixel perfect, every animation smooth, every interaction easy, and the entire product seamless. It's not necessary or useful to do this ahead of hypothesis validation since no amount of polish will make a product good if it's not already useful.

That said, if you're not going to spend the time to really focus on the polish and quality of your product after validating your hypothesis and before shipping, what is the point of building products in the first place? The ultimate goal should be high-quality products that are smooth, easy to use, and that people love. The pursuit of those qualities are worth the time invested.

### Scoping Exercises

In working with larger teams, there sometimes isn't enough rigor put into the scoping process. Scoping exercises for software projects are flawed in that they are both chronically underestimated and tend to expand to fill the time given. Given how inaccurate scoping exercises can be, I've seen people skip or limit their scoping exercise.

While scoping is difficult and often inaccurate, spending extra time on scoping exercises typically results in a better outcome than the alternative: shipping sub-par projects on tight deadlines. The most common mistake I've seen in scoping exercises is estimating only the time for code completion, and excluding the time for iteration, analysis, bug fixes, and (most importantly) the final polish needed to ship great products.

After accounting for all those phases of the project, it's then worth adding a 30% padding to your estimate to account for the unknown issues that will inevitably arise. I've yet to regret adding that padding or felt that I had sandbagged my estimates in adding it.

## Building Fast and Slow

Whenever I've seen teams build bad products, it's because they built fast and slow at the wrong times. They were too fast moving from initial plan to engineering execution, too slow in validating their hypothesis, or over-engineered solutions to problems that customers don't have. Before execution is the time to be slow and deliberate with hypothesis and design, which are more inexpensively changed than the software. During execution, it's important to move incredibly quickly toward hypothesis validation, cut scope upfront where possible, and find the right corners to cut. Lastly, before shipping is the time to slow down to ensure the final product is high quality.
