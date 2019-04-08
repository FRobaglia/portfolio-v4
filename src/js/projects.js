let cursor = {
  DOM: document.querySelector(".cursor"),
  pos: 0,
  lastPos: 0
};

let hovers = document.querySelectorAll('[data-cursor~="hover"]');

document.addEventListener("mousemove", function(e) {
  cursor.pos = e.clientY;
  cursor.DOM.style.left = -14 + e.clientX + "px";
  cursor.DOM.style.top = -14 + e.clientY + cursor.lastPos + "px";
});


document.addEventListener("mouseout", function() {
  cursor.DOM.classList.remove("is-visible");
});

document.addEventListener("mouseover", function() {
  cursor.DOM.classList.add("is-visible");
});

window.addEventListener("scroll", function() {
  cursor.lastPos = window.scrollY;
  cursor.DOM.style.top = -14 + cursor.lastPos + cursor.pos + "px";
});

for (let i = 0; i < hovers.length; i++) {
  const hoverEl = hovers[i];
  hoverEl.addEventListener("mouseover", function() {
    cursor.DOM.classList.add("is-hovering");
  });
  hoverEl.addEventListener("mouseout", function() {
    cursor.DOM.classList.remove("is-hovering");
  });
}


let paragraphs = document.querySelectorAll('p');

paragraphs.forEach(p => {
  setTimeout(() => {
    p.classList.add('is-visible');
  }, 600);
});