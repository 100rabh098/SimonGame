var buttonColours=["blue","green","red","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

//to take Input from user

$(document).keypress(function(){
  if(!started){
     nextSequence();
     started=true;
  }
});

$(".btn").click(function(){
   var userChosenColor=this.id;

   userClickedPattern.push(userChosenColor);

   animatePress(userChosenColor);
   playSound(userChosenColor)

   checkAnswer(userClickedPattern.length -1);
   
});

//Main game functions ////////////////////////

function checkAnswer(lengthtomatch){
   if(userClickedPattern[lengthtomatch]===gamePattern[lengthtomatch]){
        if(userClickedPattern.length === gamePattern.length){
          setTimeout( function() { nextSequence() },1000 );
        }
   }

   else{
       playSound("wrong");
       $("body").addClass("game-over");

       startOver();

       setTimeout(function(){
        $("body").removeClass("game-over");
       },100);
   }
}

function nextSequence(){

  userClickedPattern=[];
  level++;
  $("h1").text("Current Level: "+level);

  var num= Math.floor(Math.random() *4); 
  var next= buttonColours[num];

  animatePress(next);
  playSound(next);

  gamePattern.push(next);
}



function startOver(){

  $("h1").text("Game Over, Press Any Key to Restart");
   started=false;
   level=0;
   gamePattern=[];
   userClickedPattern=[];
}

//////////////////////////////////////////////

//to animate and play sound in game

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();
}