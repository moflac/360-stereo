AFRAME.registerComponent('play-sound', {
      schema: {
        src: {type: 'string'}
      },
      init: function () {
        var audio = document.querySelector(this.data.src);
		
        this.el.addEventListener('click', playIfFree);
        //this.el.addEventListener('mouseenter', playIfFree);

        function playIfFree () {
			var sounds = document.getElementsByTagName('audio');
			for(i=0; i<sounds.length; i++) sounds[i].pause();   // stop all currently playing sounds

			audio.currentTime = 0;
			audio.play();
        } 
		
      }
	  
 });