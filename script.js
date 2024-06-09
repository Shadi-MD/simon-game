let colorArray = ["blue", "green", "red", "yellow"];

let gamePattern = [];
let userPattern = [];

var level = 0;
var started = false;

let noteElem = $(".note");

$(document).keydown(function () {
  if (!started) {
    noteElem.text(`level ${level}`);
    nextSequnce();
    started = true;
  }
});

$(".box").click(function () {
  var userChosenColour = $(this).attr("id");
  userPattern.push(userChosenColour);

  palySound(userChosenColour);
  animatedPress(userChosenColour);
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (gamePattern.length == userPattern.length) {
      setTimeout(function () {
        nextSequnce();
      }, 1000);
    }
  } else {
    palySound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    noteElem.text('"Game Over, Press Any Key to Restart"');
    startOver();
  }
}
function nextSequnce() {
  userPattern = [];

  level++;
  noteElem.text(`level ${level}`);

  var randomNumber = Math.floor(Math.random() * 4);
  let randomColor = colorArray[randomNumber];
  gamePattern.push(randomColor);


  $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  palySound(randomColor);
}

function palySound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatedPress(color) {
  $(`#${color}`).addClass("active");

  setTimeout(function () {
    $(`#${color}`).removeClass("active");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
