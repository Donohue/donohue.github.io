---
layout: post
title:  "Hotdog or Cheeseburger Image Classifier"
date:   "2025-02-05"
excerpt_separator: <!--more-->
---

One of my goals this year is to teach myself Machine Learning.

I had the opportunity to work with a lot of ML engineers at Pinterest and DoorDash. Other than helping to define the problem, providing the inputs, and fetching the outputs, the whole process of building, training, and deploying models has been a black box to me.

It feels like it's only going to become more important to understand how to build and deploy ML models over time.

My previous efforts to teach myself ML were mired in setbacks around the foundations. At some point during my Computer Science undergrad, I took courses in linear algebra and statistics, but haven't used either extensively since final exams.

This time I came across [Practical Deep Learning for Coders](https://course.fast.ai/), which has been really helpful in terms of getting exposed to the concepts without being bogged down trying to teach myself all the math fundamentals to achieve the goal of training and deploying models.

As part of [lesson 2](https://course.fast.ai/Lessons/lesson2.html), the material teaches how to train an image classifier, deploy to HuggingFace, and embed directly on a website. I trained this image classifier to identify images of hotdogs or cheeseburgers, which it does reasonably well. You can try it below:

<div class="image_classifier_demo">
    <div>
        <div predict="examples/cheeseburger.jpg" class="image_classifier_demo_image" style="background-image: url('https://github.com/Donohue/hotdog_or_cheeseburger/blob/main/examples/cheeseburger.jpg?raw=true');"></div>
        <div predict="examples/hotdog.jpg" class="image_classifier_demo_image" style="background-image: url('https://github.com/Donohue/hotdog_or_cheeseburger/blob/main/examples/hotdog.jpg?raw=true');"></div>
        <div predict="examples/pizza.jpg" class="image_classifier_demo_image" style="background-image: url('https://github.com/Donohue/hotdog_or_cheeseburger/blob/main/examples/pizza.jpg?raw=true');"></div>
    </div>
    <div id="image_classifier_label"></div>
    <div id="image_classifier_confidence_hotdog" class="image_classifier_confidence"></div>
    <div id="image_classifier_confidence_cheeseburger" class="image_classifier_confidence"></div>
</div>

As you can see, the model works with high confidence when provided images that are either hot dogs or cheeseburgers.

The pizza result predicts hotdog with lower confidence, which is also acceptable. I did try uploading a variety of other images, including a picture of a coffee cup that was predicted to be 100% cheeseburgers, so the model is pretty far from perfect.

You can upload your own images on [HuggingFace Spaces](https://huggingface.co/spaces/bthdonohue/hotdog_or_cheeseburger). The code is available on [GitHub](https://github.com/Donohue/hotdog_or_cheeseburger) and [HuggingFace Spaces](https://huggingface.co/spaces/bthdonohue/hotdog_or_cheeseburger/tree/main).

<script type="text/javascript" src="/js/image_classifier.js"></script>
