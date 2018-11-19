---
layout: post
title:  "Bookmarklets are Dead"
date:   2014-10-23
excerpt_separator: <!--more-->
---

… we just don’t know it yet.


![](/img/posts/1*oEzJGP6rR1dOUw4bEmQHLA.gif)

I first encountered the Content Security Policy HTTP header earlier this year when one of our users reported the [Instapaper](https://www.instapaper.com) bookmarklet wasn’t working on GitHub. Triggering the bookmarklet, and inspecting element on the page revealed the problem...

<!--more-->

<pre>Refused to load the script ‘https://www.instapaper.com/j/redacted?u=https%3A%2F%2Fgithub.com%2Fcocoapods%2Fcocoapods&t=1414077850205' because it violates the following Content Security Policy directive: “script-src assets-cdn.github.com collector-cdn.github.com”.</pre>

A cursory glance at the Content Security Policy specification revealed the problems. Proposed as a solution to a suite of cross-site scripting (XSS) vulnerabilities, Content Security Policy allows web authors to specify the origin hosts of web content, this includes:

*   JavaScript (script-src)
*   AJAX Calls (connect-src)
*   CSS (style-src)
*   Fonts (font-src)
*   Frames (frame-src)
*   Images (image-src)
*   Video & Audio (media-src)
*   Flash (object-src)

The crux of the issue for bookmarklets is that web authors can control the origin of the JavaScript, network calls, and CSS, all of which are necessary for any non-trivial bookmarklet. The W3C specification for Content Security Policy 1.0 has a specific clause to protect end-users from this type of authoritarian control:

> Enforcing a CSP policy should not interfere with the operation of user-supplied scripts such as third-party user-agent add-ons and JavaScript bookmarklets.  
> — [W3C Content Security Policy 1.0, Section 3.3](http://www.w3.org/TR/CSP/#processing-model) November 15th, 2012

The above clause treats browser extensions and bookmarklets as trusted components of the browser ecosystem, and intentionally prevents web authors from blocking the functionality provided by components specifically added and initiated by an end-user.

[Some have contended](https://www.w3.org/Bugs/Public/show_bug.cgi?id=23357#c0) that bookmarklets and add-ons can not be trusted and can be compromised by privilege escalation or other security vulnerabilities unrelated to cross-site scripting. These hypothetical, compromised add-ons could effectively negate any benefit of enforcing a Content Security Policy. As a result, the working draft of Content Security Policy 1.1 has been altered to:

> Note: User agents may allow users to modify or bypass policy enforcement through user preferences, bookmarklets, third-party additions to the user agent, and other such mechanisms.  
> — [W3C Content Security Policy 1.1 (Working Draft) Section 5](http://www.w3.org/TR/CSP2/#processing-model)  
> July 3rd, 2014

The altered language significantly weakened the stance that browsers should bypass Content Security Policy for user-supplied add-ons, and suggests that providing the capability for users or add-ons to modify the Content Security Policy is optional. And it is.

Content Security Policy is currently being enforced by all major browsers, and is used by major websites like [GitHub](http://github.com), [Twitter](http://twitter.com), and [Medium](http://medium.com). Support for modifying Content Security Policy is non-existent for users, tenuous for browser extensions, and impossible for bookmarklets. The end result is, unfortunately, an all too familiar story: we’ve sacrificed end-user freedom for the promise of additional security.

One of the HTML5 Design Principles, Priority of Constituencies, defines the course of action to take in the event of a conflict between stakeholders:

> In case of conflict, consider users over authors over implementors over specifiers over theoretical purity. In other words costs or difficulties to the user should be given more weight than costs to authors; which in turn should be given more weight than costs to implementors; which should be given more weight than costs to authors of the spec itself, which should be given more weight than those proposing changes for theoretical reasons alone. Of course, it is preferred to make things better for multiple constituencies at once.  
> — [HTML5 Design Principles Section 3.2](http://www.w3.org/TR/html-design-principles/#priority-of-constituencies)

The ultimate catch-22 of the new Content Security Policy wording is that it’s intended to benefit the users, by providing additional security from hypothetical malicious add-ons on websites that enforce a Content Security Policy. In the end the bookmarklet has been relegated obsolete by the change, a casualty of one clause in one section of one web specification, and end-users and developers are the ones who will mourn its demise. The path to hell is paved with good intentions.

So what can we do? Well the deadline for comments on the working draft of Content Security Policy 1.1 was August 14th, 2014\. Major browsers are enforcing Content Security Policy with varying strictness, the trend is that more web authors will start enforcing Content Security Policy, and there’s no user-based recourse for changing it.

I’d probably try to do more about it, but I’m too busy rewriting Instapaper’s bookmarklet into extensions for every major browser.

**RIP Bookmarklet _(1995—2014_**)

_Thanks to_ [_Rodion_](http://twitter.com/loversmademen)_,_ [_Frank_](http://twitter.com/fjania)_,_ [_Paul_](https://twitter.com/mephaust)_,_ [_Mike_](http://twitter.com/myoung)_, and_ [_Kevin_](https://twitter.com/gooeyblob) _for reading drafts of this post._

_Sources & Further Reading:_

1.  [_An Introduction to Content Security Policy_](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)
2.  [_CSP to the Rescue: Leveraging the Browser for Security_](https://blog.twitter.com/2013/csp-to-the-rescue-leveraging-the-browser-for-security)
3.  [_Content Security Policy 1.0_](http://www.w3.org/TR/CSP)
4.  [_Content Security Policy 1.1_](http://www.w3.org/TR/CSP2)
5.  [_Subverting CSP policies for browser add-ons (extensions)_](https://www.w3.org/Bugs/Public/show_bug.cgi?id=23357#c0)
6.  [_CSP 1.1: Remove note about extensions._](https://github.com/w3c/webappsec/commit/cbfaa8edfadebf21a9c7428242c12e45934d8c55)
7.  [_CSP 1.1: Add non-normative language for extensions_](https://github.com/w3c/webappsec/commit/73963d509b20513a6f42b1e0839715aca8b578b0)
8.  [_[CSP] Request to amend bookmarklet/extensions sentence in CSP1.1_](http://lists.w3.org/Archives/Public/public-webappsec/2014Jul/0061.html)
9.  [_Removal of the note about extensions_](http://lists.w3.org/Archives/Public/public-webappsec/2014Feb/0098.html)
10.  [_CSP Formal Objection_](http://lists.w3.org/Archives/Public/public-webappsec/2014Feb/0006.html)
11.  [_The Priority of Constituencies_](http://www.schemehostport.com/2011/10/priority-of-constituencies.html)
12.  [_HTML5 Design Principles_](http://www.w3.org/TR/html-design-principles)
