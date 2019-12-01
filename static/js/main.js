(function () {

  var bv = new Bideo();
 
  bv.init({
    // Video element
    videoEl: document.querySelector('video'),

    // Container element
    container: document.querySelector('body'),

    // Resize
    resize: true,


     autoplay: true,

    isMobile: window.matchMedia('(max-width: 768px)').matches,

    playButton: document.querySelector('#play'),
    //pauseButton: document.querySelector('#pause'),

    // Array of objects containing the src and type
    // of different video formats to add
    src: [
      {
        src: 'night.mp4',
        type: 'video/mp4'
      },
      {
        src: 'night.webm',
        type: 'video/webm;codecs="vp8, vorbis"'
      }
    ],

    // What to do once video loads (initial frame)
   // onLoad: function () { 
    //  document.querySelector('#video').style.display = 'none';
   // }
  });
}());
 