---
date: "2024-09-03 1735"
title: "Bye bye, jQuery!!!!"
author: old_fart
layout: update_post
style: updates
---
This w3sitey page loaded very quickly, didn't it? That's becuase we're dedicated to bringing you the megamighty best experience to you peeps, and that includes the pages of your very favourite w3sitey loading faster than a speeding bullet!!!!!! (And you know that's fast becuase it's not just a bullet, but it's a *speeding* bullet!!!!! So even if it wasn't being fired from a gun, and had just been lying on a table, it would still be speeding!!!! In fact, it might the table that's speeding with the bullet on it!!!!! Either way, it's still speeding!!!!! It'll need to watch out for the cops trying to pull it over tho!!!!!!! Erm, where was I?!?!?!)

Anyway, you see all these young people complaining about the w3siteys these days [being wasteful and memory-hogging slow pieces of shengis](https://medium.com/@fulalas/web-crap-has-taken-control-71c459df6e62)!!!!!!! We at SDHQ of course agree wiv dis!!! That's why we are working on optimising all elements of our website!!!! So the first thing we did [when we took over](/updates/were-forked.html) the [repository](https://github.com/theseniordads/theseniordads.github.io) for the sitey, was look to get rid of all the bloaty bits!!!!!

One definate candidate was the use of **jQuery** in the site- it was fine in 1995 when we last hosted the w3sitey on another server, but in 2024 ordinary Javascript can do the same things that we were using jQuery for in 1995!!!! We were only really using jQuery for **a)** the odd bits and bobs, and **b)** the picture gallery in [GFX](/gfx/)!!!! We also noticed references to the **Bootstrap** framework, and we were wondering what that was all about as we definately didn't use Bootstrap in our website!!!!!

## So, we.........

* Refactored the site Javascript into vanilla javascript, using the modern document selectors instead of the jQuery versh!!!!!
* Removed references to Bootstrap!!!!
* Changed the GFX gallery to [one that doesn't use jQuery](https://fslightbox.com/)!!!!!!
* Removed jQuery!!!!!!

What with jQuery (3 files), Bootstrap (2 files) and the old Gallery (1 extra file) gone, that's **5 less files** to load on nearly every page. And the site Javascript is now [minified](/assets/js/main.min.js)!!!! And the [CSS](/assets/main.css)!!! And each page HTML is compressed!!!! The page that we found took the most memory was [here](/features/citizen/v1/), and it took up a whopping **342 Kilobytes of memory**!!!! (Wooo, how profilgate!!!!!)

That means you could theoretically browse this w3sitey on a half-meg Atari STFM!!!!! Dunno if there's any modern browsers on it tho.
