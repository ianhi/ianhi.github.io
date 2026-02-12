---
layout: ../layouts/BaseLayout.astro
title: Web Server Instrument Control
prose: true
---

# Web Server Instrument Control

Want to control scientific instruments from a nice gui. The easiest way to make nice guis (or at least where the most effort has been expended of late) is in a webbrowser. This has extra benefit of being very cross platform.

Downside is that parts of this are confusing and we are introducing a layer of communication between instrument control code and - e.g. just to update a plot we need to serialize data and send it over to the frontend. Something that wouldn't be as much of an issue with something like pyqt. Also I couldn't find any solid tutorials for what I want to do. The closest thing to what I'm envisioning is probably octoprint, although that is a big and complex application.

Test case:

Arduino recording temperature data and also some relays attached to a heater.

I should be able to:
1. see a plot of the temperature data
    - use the matplotlib webagg
2. set the target temperature and have PID circuit control
3. turn something on and off with button.

I'm going to go with sanic for this. because:

1. it's flask-like so pretty simple
2. adds async on top of flask which I think is good for communication with the arduino
    - although pyserial-asyncio may not yet be mature
3. I think that websockets are the correct way to handle this - i.e. new data is coming from the server all the time and the frontend should be updated when it does.

I'd also like to create a front the subjectively looks nice to me. well styled buttons and text.

I'm also curious if there's a use case for including a more complex frontend framework such as vue.js, svelte, or react for slicker interactivity on the frontend. Though this use case may not really warrant that.

other questions:
1. Sliders with ipywidgets or not worth it?
    - [ipywidgets embedding docs](https://ipywidgets.readthedocs.io/en/latest/embedding.html#using-jupyter-widgets-controls-in-web-contexts)
2. matplotlib webagg or some other plotting library?
3. what about something like bokeh/panel?
4. make v pretty with something like [this codepen](https://codepen.io/ederdiaz/pen/NBPWZp)
5. expose more generally and add password protection?

other resources:
basic sliders: [w3schools range slider](https://www.w3schools.com/howto/howto_js_rangeslider.asp)

maybe actually good tutorials:

- [Plant monitor sensor to front end](https://create.arduino.cc/projecthub/murthysiddhant/plant-monitor-sensor-to-front-end-c1f715)
- [Controlling Arduino with python based web API](https://www.instructables.com/Controlling-Arduino-with-python-based-web-API-No-p/)
- [Twilio real-time media stream with websockets](https://www.twilio.com/docs/voice/tutorials/consume-real-time-media-stream-using-websockets-python-and-flask)

## Downsides of web approach

All these tutorials and frameworks for that matter are really fundamentally for making websites that may have an arbitrary number of users (e.g. benchmarks are about number of people served etc). but that's not really what we're designing for here, we want single user fast and responsive. For this there's probably no beat a desktop framework where this is the design intent, but unclear (before having made this) if the ease of gui creation should outweigh that. Also this allows for easier control than the nightmare that often can happen with remote desktop etc.

big time follow up:

micromanager on the web via pymmcore-plus. No more remote desktop shenanigans! Although do have to maybe contend with firewall stuff. Could also run into issues with sanic because that doesn't really support windows.

## Do we even need a server?

What about just a website and local script running a websocket - none of this webframework stuff and allowing for http etc

Just follow pure websocket tutorial: [websockets docs](https://websockets.readthedocs.io/en/stable/intro/tutorial1.html)

Am I accidentally just building [idom](https://github.com/idom-team/idom)? Kinda seems like it.

I guess kinda not. That's what I'd be doing if I was making it so that you just created things in python, but I'm leaning more into being open to writing my own js/ts + html + css. I think this is more complicated and probably only worth it if you want to make more complex things on the frontend or have interactivity that lives purely there.

Am I accidentally reinventing ipywidgets? Kinda.. but the kernel comm infrastructure is built to support lots of things - like many clients and requires jupyter kernel on the server side which isn't really what we need. ipywidgets is a really good thing to learn from though. Also don't need the many views that backbone has. (this is all mostly pre-supposing a single user - multiple people controlling an instrument is maybe a bit more of a nightmare...)

What about something like [noduino](http://sbstjn.github.io/noduino/index.html)? Nice styling and good idea - but abandoned for many years.

But maybe the real thing to do is go as serverless as possible and use the [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API).

Very cool thing for this use case - but an example of google trying to own the web via chrome and make chrome into an OS itself. Firefox will never support this: [Mozilla standards positions](https://mozilla.github.io/standards-positions/#webserial) while the basis of my investigations is that browsers are sort of the new OS - I'm against building something that will only work on chrome.

Although reading [the discussion](https://github.com/mozilla/standards-positions/issues/336) I'm less convinced - well still convinced that this is a tough issue. From mozilla's perspective I think it makes sense.

brython??? python in browser - can control browser apis?
