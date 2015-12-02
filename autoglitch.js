(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.autoglitch = factory();
  }
}(this, function () {

  var timeout_id;

  function initAutoglitch(){

    if(typeof glitch === 'undefined'){
      throw new Error('you must include glitch-canvas');
    }

    var autoglitch_images = document.getElementsByClassName('autoglitch');
    var i;
    for(i = 0; i < autoglitch_images.length; i++){
      var autoglitch_image = autoglitch_images[i];
      if(autoglitch_image.complete){
        initAutoglitchImage(autoglitch_image);
      } else {
        autoglitch_image.onload = function(){
          initAutoglitchImage(autoglitch_image);
        };
      }
    }
  }

  function initAutoglitchImage(autoglitch_image){
    // if there are no height/width attributes set (vs css)
    // we need to ensure they are set or it will never render to canvas correctly
    // (unrelated to this code)
    if(!autoglitch_image.getAttribute('width')){
      autoglitch_image.setAttribute('width',autoglitch_image.width);
    }
    if(!autoglitch_image.getAttribute('height')){
      autoglitch_image.setAttribute('height',autoglitch_image.height);
    }

    var canvas_replacement = generateCanvasReplacement(autoglitch_image);
    autoglitch_image.style.display = 'none';
    autoglitch_image.parentNode.appendChild(canvas_replacement);
    autoGlitch(autoglitch_image, canvas_replacement, autoglitch_image.dataset);
  }

  function generateCanvasReplacement(image_el){
    var canvas = document.createElement("canvas");
    canvas.width = image_el.getAttribute('width');
    canvas.height = image_el.getAttribute('height');
    return canvas;
  }

  function transformOpts(opts){
    var amount = opts.amount ||
      Math.round(Math.random() * (opts.maxamount || 99 ) - (opts.minamount || 0 ) + (opts.minquality || 0));
    var seed = opts.seed ||
      Math.round(Math.random() * (opts.maxseed || 99 ) - (opts.minseed || 0 ) + (opts.minquality || 0));
    var quality = opts.quality ||
      Math.round(Math.random() * (opts.maxquality || 99 ) - (opts.minquality || 0 ) + (opts.minquality || 0));
    var iterations = opts.iterations ||
      Math.round(Math.random() * (opts.maxiterations || 99 ) - (opts.miniterations || 0 ) + (opts.miniterations || 0));

    return { amount: amount, seed: seed, iterations: iterations, quality: quality };
  }

  function autoGlitch(image, canvas, opts){
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, image.width, image.height);
    var image_data = ctx.getImageData( 0, 0, canvas.clientWidth, canvas.clientHeight );
    var sleep = opts.delay ||
      Math.round(Math.random() * ((opts.maxdelay || 1000) - (opts.mindelay || 50)) + (opts.mindelay || 50));

    glitch(
      image_data,
      transformOpts(opts),
      function(image_data){
        ctx.putImageData(image_data, 0, 0);
      }
    );

    timeout_id = setTimeout(function(){
      autoGlitch(image, canvas, opts);
    }, sleep);
  }

  function getTimeoutId(){
      return timeout_id;
  }

  return {
    init: initAutoglitch,
    timeout: getTimeoutId
  }

}));
