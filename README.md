autoglitch
==========

an animator and basic wrapper for [glitch-canvas](https://github.com/snorpey/glitch-canvas)

check out the example here: http://abeering.github.io/autoglitch/

I love glitch aesthetic and I can across @snorpey's [glitch-canvas](https://github.com/snorpey/glitch-canvas) library which glitches images by interpreting them through canvas as jpegs and futzing with the bytes.

autoglitch is a library which both dynamically animates the glitch using client-machine randomness (which is so much cooler than a gif) and also allows for easy and direct replacement of images on pages by simple adding the `autoglitch` class.

Usage
-------

Most simply you can just apply the autoglitch class to an image.

```html
<img src="foo.png" class="autoglitch" />
```

You can set a number of settings for both the randomness and the animation using data attributes in the image.

```html
<img src="foo.png" class="autoglitch"
  data-maxdelay="1000" data-maxiterations="10" />
```

Example
-------

I've put together a small example which briefly describes the options and allows you to play with animation a bit.

http://abeering.github.io/autoglitch/

Options
-------

```
(min|max)delay - the amount of time in milliseconds between image updates
(min|max)amount - impacts how much the image bytes will be corrupted
(min|max)seed - impacts the pixels which will be glitched
(min|max)quality - the quality of the image read from the canvas
(min|max)iterations - the number of times the corruption will be ran
```

Tips
----

- if you want the context of the image to be viewable most of the time, lowering the iterations option is a good start

License
-------

[MIT License](http://opensource.org/licenses/MIT)
