---
 layout: post
 title: ProcessingJS
 permalink: proccessingJS
---

Proof that I can integrate [ProcessingJS](http://www.processingjs.org) and jekyll easily.

Below is an interesting thing with circles.
Controls are:

r: Each ring has a random growth rate  
space: clear screen  
s: save image  

One major downside of using processingJS instead of p5.js is the inability to resize the canvas. But I think this is at least partially compensated by the fact that I can just use my original processing sketch instead of porting it to javascript.
<canvas data-processing-sources="/assets/files/shouldaPutARingOnIt.pde"></canvas>
