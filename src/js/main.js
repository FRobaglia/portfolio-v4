/* start of horizontal scroll */

var horizontals = document.querySelectorAll(".horizontal");

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

/* end of horizontal scroll */


window.addEventListener("load", function(event) {
  
  let paragraphs = document.querySelectorAll('p');
  document.querySelector('.title').style.transform = 'translateY(0px) scale(1)';
  setTimeout(() => {
    document.querySelector('.subtitle').style.transform = 'translateY(0px) scale(1)';
  }, 500);
  setTimeout(() => {
    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i];
      p.style.opacity= '1';
      p.style.transform= 'scale(1)';
    }
  }, 1500);
  setTimeout(() => {
    document.querySelector('.scroll').style.opacity = '1';
  }, 2100);
});