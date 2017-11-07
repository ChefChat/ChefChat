
var anime = require("anime");
var react = require("react");

var imageMotion = anime({
  targets: '.menuItem',
  translateX: '70vw',
  scale: 1.5,
  easing: 'easeOutBounce',
  delay: kickBall.duration + 100,
  autoplay: false
});

menuItem.addEventListener('onmouseover', function(e) {
  e.preventDefault();
  imageMotion.play();
});

 