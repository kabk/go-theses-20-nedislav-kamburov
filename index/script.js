document.addEventListener('DOMContentLoaded', ready);
function ready() {
  scrollActivateImages();
  returnToTopBtn();
}

function scrollActivateImages() {
  let links = document.querySelectorAll('.link');
  let trigger = window.innerWidth * 0.4;

  links.forEach(link => {
    const number = link.dataset.refnum;
    let visualContent = document.querySelectorAll(
      `*[data-visual-ref-num='${number}']`
    );

    window.addEventListener('scroll', e => {
      let topPos = link.getBoundingClientRect().top;

      if (topPos < trigger) {
        //TODO: set it to happen only once
        visualContent.forEach(visualItem => {
          link.parentNode.insertBefore(visualItem, link.nextSibling);
          visualItem.style.display = 'block';
          link.style.color = 'red';
        });
      } else {
        link.style.color = 'blue';
      }
    });
  });
}

function returnToTopBtn() {
  let btn = document.querySelector('#return-btn');
  let lastScrollTop = pageYOffset || document.scrollTop;

  window.addEventListener(
    'scroll',
    function() {
      // if (scrollTop == undefined) scrollTop == 0;
      let st = window.pageYOffset || document.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
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
