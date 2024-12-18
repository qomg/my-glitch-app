const canvas = document.getElementsByTagName("canvas")[0];
canvas.setAttribute("width", window.outerWidth);
canvas.setAttribute("height", window.innerHeight);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(0,0,0,.2)";
ctx.lineWidth = 1;

let circleCount = 0;
const owlBounds = {};

const owlImage = new Image();
owlImage.src =
  "https://cdn.glitch.global/222ce9c9-1ce1-4ef7-8f5c-b417e5f7f107/restoftheowl.png";

// ACTION: drawing
const draw = function (e) {
  // set initial bounds if a new "circle"
  if (!owlBounds.top) {
    owlBounds.top = e.pageY;
    owlBounds.bottom = e.pageY;
    owlBounds.left = e.pageX;
    owlBounds.right = e.pageX;
  } else {
    // set new bounds
    owlBounds.top = owlBounds.top > e.pageY ? e.pageY : owlBounds.top;
    owlBounds.bottom = owlBounds.bottom < e.pageY ? e.pageY : owlBounds.bottom;
    owlBounds.left = owlBounds.left > e.pageX ? e.pageX : owlBounds.left;
    owlBounds.right = owlBounds.right < e.pageX ? e.pageX : owlBounds.right;
  }

  // draw
  ctx.fillRect(e.pageX, e.pageY, 5, 5);
};

// ACTION: start drawing
const startDraw = function(e) {
  draw(e);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchmove", draw);
}

// ACTION: stop drawing
const endDraw = function(e) {
  canvas.removeEventListener("mousemove", draw);
  canvas.removeEventListener("touchmove", draw);
  circleCount++;

  if (circleCount == 2) {
    // draw the rest of the owl
    ctx.drawImage(
      owlImage,
      owlBounds.left,
      owlBounds.top,
      owlBounds.right - owlBounds.left,
      owlBounds.bottom - owlBounds.top
    );

    // reset for more owls
    circleCount = 0;
    for (let boundary in owlBounds) delete owlBounds[boundary];
  }
}

// EVENT: start drawing
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('touchstart', startDraw);

// EVENT: stop drawing
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('touchend', endDraw);