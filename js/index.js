var randomNumber;
var guesses;
var cnt;

function _(id) {
  return document.getElementById(id);
}

function reset() {
  _("selectDifficulty").innerHTML = "Select Difficulty";
  _("difficulty").style.display = "inline";
  _("greeting").innerHTML = "";
  _("guess").style.display = "none";
  _("submit").style.display = "none";
  _("reset").style.display = "none";
  _("difficulty").value = "none";
  cnt = 0;
  guesses = 0;
}

window.onload = function greet() {
  _("guess").style.display = "none";
  _("submit").style.display = "none";
  _("reset").style.display = "none";
  cnt = 0;
  guesses = 0;
}

function getDifficulty(diff) {
  var num;
  var top;
  
  switch (diff) {

   case "easy":
      num = 100;
      break;
    case "medium":
      num = 1000;
      break;
    case "hard":
      num = 10000;
      break;
    case "veryHard":
      num = 100000;
      break;
  }

  top = num;
  
  while (num > 1) {
    num = Math.ceil(num / 2);
    cnt++;
  }
  
  guesses = cnt;

  _("selectDifficulty").innerHTML = "";
  _("difficulty").style.display = "none";
  _("greeting").innerHTML = "I'm thinking of a number between 1 and " + top + "<br/>can you guess what it is?<br/><br/>You have " + guesses + " guesses remaining.";
  randomNumber = Math.floor(Math.random() * top) + 1;
  _("guess").style.display = "inline";
  _("submit").style.display = "inline";
  _("reset").style.display = "inline";
  _("guess").value = "";
}

function submit() {
  if (guesses !== 1) {
    var userInput = _("guess").value;
    guesses--;
    if (userInput > randomNumber) {
      _("greeting").innerHTML = "Your guess was too high.<br/><br/>You have " + guesses + " guesses remaining.";
      _("guess").value = "";
    } else if (userInput == randomNumber) {
      _("greeting").innerHTML = "CONGRATULATIONS YOU GUESSED THE NUMBER!!<br/>It took you " + (cnt - guesses) + " trys."
      _("submit").style.display = "none";
      _("guess").style.display = "none";
      _("guess").value = "";
    } else {
      _("greeting").innerHTML = "Your guess was too low.<br/><br/>You have " + guesses + " guesses remaining.";
      _("guess").value = "";
    }
  } else {
    _("greeting").innerHTML = "Sorry but you ran out of guesses.<br/>The number you were failed to guess was " + randomNumber;
    _("submit").style.display = "none";
    _("guess").style.display = "none";
  }
}


_("guess").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    _("submit").click();
  }
});

_("difficulty").addEventListener("change", function() {
  getDifficulty(_("difficulty").value);
});
