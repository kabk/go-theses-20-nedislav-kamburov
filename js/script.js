document.addEventListener('DOMContentLoaded', ready);
function ready() {
  playVideosInViewport();
  returnToTopBtn();
}

function playVideosInViewport() {
  let videos = document.querySelectorAll('iframe');
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
      // if (video.src.includes('?')) {
      //   //TODO: add an alert or notification to enable Flash?! for Chrome to work,
      //   // Safari also needs to allow Autoplay.
      //   video.src += '&autoplay=1';
      // } else {
      //   video.src += '?&autoplay=1';
      // }
    } else {
      console.log('stop');
      video.pause();
      // video.src = video.src.replace('&autoplay=1', '');
    }
  });
};

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
