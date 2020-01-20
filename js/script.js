document.addEventListener('DOMContentLoaded', ready);
function ready() {
  // playVideosInViewport();
  videoJS();
  returnToTopBtn();
}

function videoJS() {
  var player = videojs('player');

  player.ready(function() {
    var promise = player.play();

    if (promise !== undefined) {
      promise
        .then(function() {
          console.log('play');
          // Autoplay started!
        })
        .catch(function(error) {
          console.log('nope' + error);
          // Autoplay was prevented.
        });
    }
  });
}

function playVideosInViewport() {
  let videosEmbedded = document.querySelectorAll('video');
  let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };
  let observer = new IntersectionObserver(turnVideosOn, options);

  videosEmbedded.forEach(video => {
    observer.observe(video);
  });
}

let turnVideosOn = (entries, observer) => {
  entries.forEach(entry => {
    let video = entry.target;

    if (entry.isIntersecting) {
      console.log('play');
      video.play();
    } else {
      console.log('stop');
      video.pause();
    }
  });
};

function openMenu() {
  let menuBtn = document.getElementById('menu');
  let chapters_list = document.getElementsByClassName('chapters-list')[0];

  menuBtn.addEventListener('click', () => {
    if (chapters_list.style.display === 'none') {
      chapters_list.style.display = 'block';
    } else {
      chapters_list.style.display = 'none';
    }
  });
}

function returnToTopBtn() {
  let btn = document.querySelector('#return-btn');
  let lastScrollTop = pageYOffset || document.scrollTop;

  window.addEventListener(
    'scroll',
    function() {
      let st = window.pageYOffset || document.scrollTop;
      if (st > lastScrollTop) {
        btn.style.opacity = '0';
      } else {
        btn.style.opacity = '1';
        this.setTimeout(() => {
          btn.style.opacity = '0';
        }, 5000);
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    },
    false
  );
}
