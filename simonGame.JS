var power = "off";
var strict = "off";
var running = false;
var memoryA = [];
var memoryACounter = 0;
var userArray = [];
var userArrayCounter = 0;
var levelUp = 1;
var colorOp;
var runMemory;
var matchingArrays = true;
var tempo;

function colorButton(id, color) {
    this.id = id;
    this.color = color;
}

var gre = new colorButton(4, "gre");
var red = new colorButton(1, "red");
var yel = new colorButton(3, "yel");
var blu = new colorButton(2, "blu");

$(".switch").on("change",function(){
  if (power == "off") {
    $("#strict-btn").css("visibility", "visible");
    $("#start-btn").css("visibility", "visible");
    $("#count-display").css("opacity", "1");
    power = "on";
  }
  else if (power == "on") {
     $("#start-btn").css("background", "#00796B");
    $("#strict-btn").css("visibility", "hidden");
    $("#start-btn").css("visibility", "hidden");
    $("#count-display").css("opacity", "0.3");
    power = "off";
    strict = "off";
    running = false;
    memoryA = [];
    userArray = [];
    levelUp = 1;
    $("#count-display").html("0");
    memoryACounter = 0;
    userArrayCounter = 0;
    matchingArrays = true;
    clearInterval(runMemory);
    $(".allButton").css("pointer-events", "none");
  }
}); 


$("#strict-btn").on("click", function() {
  if (power == "on" && running == false) {
    if (strict == "off") {
      $("#strict-btn").css("background", "#2196F3");
      strict = "on";
    }
    else if (strict == "on") {
      $("#strict-btn").css("background", "#00796B");
      strict = "off";
    }
  }
});


$("#start-btn").on("click", function() {
  if (power == "on") {
    $("#start-btn").css("background", "#2196F3");
    running = true;
    userArray = [];
    memoryA = [];
    memoryACounter = 0;
    userArrayCounter = 0;
    levelUp = 1;
    $("#count-display").html("0");
    matchingArrays = true;
    clearInterval(runMemory);
    $(".allButton").css("pointer-events", "none");
    newMemory();
    console.log(memoryA);
    setTimeout(function() {runMemory = setInterval(playMemory, 1000);}, 1000);
  }
});



$("div[id*='button']").on("click", function() {
  if (power == "on" && running) {
    if (event.which == 1) {
      $("#sound" + this.id).get(0).cloneNode().play();
      userArray.push(this.id.slice(6, 9));
      userArrayCounter++;
      
      for (i = 0; i < userArray.length; i++) {
        if (memoryA[i] != userArray[i]) {
          matchingArrays = false;
        }
      }
      if (!matchingArrays) {
        $("#count-display").html("!!");
        $("#soundbuttonWrong").get(0).play();
        userArray = [];
        memoryACounter = 0;
        userArrayCounter = 0;
        matchingArrays = true;
        $(".allButton").css("pointer-events", "none");
        if (strict == "on") {
          memoryA = [];
          levelUp = 1;
          newMemory();
          console.log(memoryA);
          setTimeout(function() {runMemory = setInterval(playMemory, tempo);}, 1000);
        }
        else {
          setTimeout(function() {runMemory = setInterval(playMemory, tempo);}, 1000);
        }
      }
      else {
        if (userArrayCounter == memoryACounter) {
          if (matchingArrays) {
            if (levelUp == 15) {
              win();
            }
            else {
              userArray = [];
              memoryACounter = 0;
              userArrayCounter = 0;
              newMemory();
              levelUp++;

              switch(levelUp) {
                case 1:
                case 2:
                case 3:
                case 4:
                  tempo = 1000;
                    break;
                case 5:
                  tempo = 700;
                  break;
                case 9:
                  tempo = 500;
                  break;
                case 13:
                  tempo = 300;
                  break;
              }
              setTimeout(function() {runMemory = setInterval(playMemory, tempo);}, 1000);
              $(".allButton").css("pointer-events", "none");
            }
          }
        }
      }
    }
  }
});


function newMemory() {
  var temp = Math.floor((Math.random() * 4) + 1);
  switch(temp) {
    case 1:
      memoryA.push("Red");
      break;
    case 2:
      memoryA.push("Blu");
      break;
    case 3:
      memoryA.push("Yel");
      break;
    case 4:
      memoryA.push("Gre");
      break;
  }
}

function playMemory() {
  $("#count-display").html(levelUp);
  colorOp = memoryA[memoryACounter];
  $("#soundbutton" + colorOp).get(0).cloneNode().play();
  $("#button" + colorOp).addClass("activated");
  setTimeout(function() {$("#button" + colorOp).removeClass("activated");}, 250);
  memoryACounter++;
  if (memoryACounter == memoryA.length) {
    clearInterval(runMemory);
    $(".allButton").css("pointer-events", "auto");
  }
}

function win() {
  $("#count-display").html("WIN");
  $("#buttonGre").addClass("activated");
  setTimeout(function() {$("#buttonGre").removeClass("activated");}, 250);
  setTimeout(function() {$("#buttonRed").addClass("activated");}, 250);
  setTimeout(function() {$("#buttonRed").removeClass("activated");}, 500);
  setTimeout(function() {$("#buttonYel").addClass("activated");}, 500);
  setTimeout(function() {$("#buttonYel").removeClass("activated");}, 750);
  setTimeout(function() {$("#buttonBlu").addClass("activated");}, 750);
  setTimeout(function() {$("#buttonBlu").removeClass("activated");}, 1000);
  
  setTimeout(function() {$("#buttonGre").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonRed").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonYel").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonBlu").addClass("activated");}, 1250);
  setTimeout(function() {$("#buttonGre").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonRed").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonYel").removeClass("activated");}, 1500);
  setTimeout(function() {$("#buttonBlu").removeClass("activated");}, 1500);
  
  setTimeout(function() {$("#buttonGre").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonRed").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonYel").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonBlu").addClass("activated");}, 1750);
  setTimeout(function() {$("#buttonGre").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonRed").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonYel").removeClass("activated");}, 2000);
  setTimeout(function() {$("#buttonBlu").removeClass("activated");}, 2000);
  
  setTimeout(function() {
    userArray = [];
    memoryA = [];
    memoryA = 0;
    userArrayCounter = 0;
    levelUp = 1;
    $("#count-display").html("--");
    matchingArrays = true;
    clearInterval(runMemory);
    $(".allButton").css("pointer-events", "none");
    newMemory();
    console.log(memoryA);
    setTimeout(function() {runMemory = setInterval(playMemory, 1000);}, 1000);
  }, 3000);
}
