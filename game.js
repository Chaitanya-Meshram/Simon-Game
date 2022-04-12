
var buttonColours = ["green", "blue", "red", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


// starting the game
$(document).on("keypress", function() {
  if (started === false) {
    started = true;
    nextSequence();
  }
})


// generating game pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}



// user input pattern
$(".btn").on("click", function(event) {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  $("#" + userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})


// checking correct pattern
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();

  }
}

// restarting the game
function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}





// sound play
function playSound(name) {
  var audio = new Audio(name + '.mp3');
  audio.play();
}

// animate press after clicked-on
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
