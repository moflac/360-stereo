/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    targetl: {type: 'selector'},
	targetr: {type: 'selector'},
    srcl: {type: 'string'},
	srcr: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      data.targetl.emit('set-image-fade');
	  data.targetr.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.targetl.setAttribute('material', 'src', data.srcl);
		data.targetr.setAttribute('material', 'src', data.srcr);
      }, data.dur);
	  
    });
	
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEll = this.data.targetl;
	var targetElr = this.data.targetr;

    // Only set up once.
    if (targetEll.dataset.setImageFadeSetup) { return; }
    targetEll.dataset.setImageFadeSetup = true;
	
	if (targetElr.dataset.setImageFadeSetup) { return; }
    targetElr.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEll.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
	
	targetElr.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
});
