var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var wrong = "wrong";

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // nextSequence();
    checkAnswer(userClickedPattern.length - 1)
});

$(document).keypress(function(){
  if (started === false){
  $("#level-title").text("Level " + level)
  nextSequence();
  started = true;
  }
});

function playSound(name){
  var audio = new Audio('sounds/'+ name +'.mp3');
      audio.play();

}

function nextSequence() {
  userClickedPattern = [];
  level++
  $("#level-title").text("Level " + level)
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColours[randomNumber] ;
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
      // console.log(gamePattern);

}

function startOver(){
  $("#level-title").text("Game Over, Press Any Key to Restart")
  $('body').addClass("game-over");
  var delayInMilliseconds = 200; //1 second

  setTimeout(function() {
    $('body').removeClass("game-over");
  }, delayInMilliseconds);
  playSound(wrong)

  $(document).keypress(function() {
      location.reload();
  });

}


function animatePress(currentColour){
  $('#'+ currentColour).addClass("pressed");

  var delayInMilliseconds = 100; //1 second

  setTimeout(function() {
    $('#'+ currentColour).removeClass("pressed");
  }, delayInMilliseconds);

}

function checkAnswer(currentLevel){

 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  if(userClickedPattern.length === gamePattern.length ){
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }
}else {
    startOver();
}



}
