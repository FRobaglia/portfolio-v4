/* start of horizontal scroll & other scroll events*/

let timer = null;
let screenPositions = [];

let horizontals = document.querySelectorAll(".horizontal");

horizontals.forEach(function(horizontal) {
  var inner = horizontal.querySelector(".horizontal__inner");

  // When the user scroll and an animation frame is available
  window.addEventListener("scroll", function() {
    window.requestAnimationFrame(function() {
      // The distance to scroll inside the horizontal element
      // is its height - the window's height
      var toGo = horizontal.offsetHeight - window.innerHeight;

      // The scroll position inside the element
      // is the scroll position - the element's distance from the top
      var position = window.scrollY - horizontal.offsetTop;

      // The progression between 0 & 1 is the scroll position
      // inside the element divided by the distance to scroll
      var progression = position / toGo;

      // If progression is between 0 & 1 that means we are viewing
      // the section so fix it
      if (progression > 0 && progression < 1) {
        horizontal.classList.add("horizontal--isFixed");
      } else {
        // Don't fix it
        horizontal.classList.remove("horizontal--isFixed");
      }

      // If the progression is above 1 that means the
      // section has been completly scrolled
      if (progression >= 1) {
        horizontal.classList.add("horizontal--isScrolled");
      } else {
        horizontal.classList.remove("horizontal--isScrolled");
      }

      // Set the translation for the element
      setTranslateX(inner, progression);

      /* lock scroll on the closest project */

      let wh = window.innerHeight;
      let horizontalWidth = horizontal.offsetHeight - wh;
      screenPositions = [wh, wh + horizontalWidth / 2, wh + horizontalWidth];

      if (timer !== null) {
        // user is currently scrolling
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        // user just stopped scrolling
        if (
          (window.scrollY > window.innerHeight ||
            window.innerHeight - window.scrollY < 200) &&
          window.scrollY < wh + horizontalWidth
        ) {
          // if we are in the horizontal section or almost on it, move the scroll to the closest project
          let closestScreen = getClosestScreen(window.scrollY);
          document.documentElement.scrollTop = document.body.scrollTop = closestScreen;
        }
      }, 220);
    });
  });
});

function setTranslateX(element, progression) {
  // Limit the progression factor between 0 & 1
  if (progression > 1) {
    progression = 1;
  } else if (progression < 0) {
    progression = 0;
  }

  // The size to move is the element width minus the window width
  var toMove = element.offsetWidth - window.innerWidth;

  // The transform factor is the size to move multiplied by the progression
  var transform = -1 * toMove * progression + "px";
  element.style.transform = "translateX(" + transform + ")";
}

function getClosestScreen(scrollPosition) {
  // gets the closest number of scrollPosition in the array screenPositions
  return screenPositions.reduce(function(prev, curr) {
    return Math.abs(curr - scrollPosition) < Math.abs(prev - scrollPosition)
      ? curr
      : prev;
  });
}

/* end of horizontal scroll */

let homeParagraphs = document.querySelectorAll(".home p");

let animations = () => {
  document.querySelector(".title").classList.add('is-transitioned')
  setTimeout(() => {
    document.querySelector(".subtitle").classList.add('is-transitioned');
  }, 500);
  setTimeout(() => {
    homeParagraphs.forEach(paragraph => {
      paragraph.classList.add('is-transitioned')
    });
  }, 1500);
  setTimeout(() => {
    document.querySelector(".scroll").style.opacity = "1";
  }, 2200);
};

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(animations, 300);
})

/* darkmode */

let darkMode = false;

document.querySelector(".name").addEventListener("click", function() {
  if (!darkMode) {
    document.documentElement.style.setProperty("--black", "#eee");
    document.documentElement.style.setProperty("--white", "#222");
    document.documentElement.style.setProperty("--grey", "#ddd");
  } else {
    document.documentElement.style.setProperty("--black", "#222");
    document.documentElement.style.setProperty("--white", "#eee");
    document.documentElement.style.setProperty("--grey", "#555");
  }
  darkMode = !darkMode;
});

/* projects animation on click */


let projectLinks = document.querySelectorAll('.img-container')
let projectLinksButtons = document.querySelectorAll('.discover');



for (let i = 0; i < projectLinks.length; i++) {
  const project = projectLinks[i];
  project.addEventListener('click', () => {
    document.documentElement.scrollTop = document.body.scrollTop = screenPositions[i];
    project.parentElement.parentElement.classList.add('is-clicked');
  })
}
for (let i = 0; i < projectLinksButtons.length; i++) {
  const project = projectLinksButtons[i];
  project.addEventListener('click', () => {
    document.documentElement.scrollTop = document.body.scrollTop = screenPositions[i];
    project.parentElement.parentElement.classList.add('is-clicked');
  })
}