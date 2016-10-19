var randomNumber; 
var guesses = 10;

function _(id) {
  return document.getElementById(id);
}

function reset() {
  guesses = 10;
  _("greeting").innerHTML = "I'm thinking of a number between 1 and 100<br/>can you guess what it is?<br/><br/>You have " + guesses + " guesses remaining.";
  randomNumber = Math.floor(Math.random() * 100) + 1;
  _("guess").value = "";
  _("submit").style.display = "inline";
  _("guess").style.display = "inline";
}

window.onload = function greet() {
  _("greeting").innerHTML = "I'm thinking of a number between 1 and 100<br/>can you guess what it is?<br/><br/>You have " + guesses + " guesses remaining.";
  randomNumber = Math.floor(Math.random() * 100) + 1;
  _("guess").value = "";
}

function submit() {
  if (guesses > 1) {
    var userInput = _("guess").value;
    guesses--;
    if (userInput > randomNumber) {
      _("greeting").innerHTML = "Your guess was too high.<br/><br/>You have " + guesses + " guesses remaining.";
      _("guess").innerHTML = "";
    } else if (userInput == randomNumber) {
      _("greeting").innerHTML = "CONGRATULATIONS YOU GUESSED THE NUMBER!!<br/>It took you " + (10 - guesses) + " trys."
      _("submit").style.display = "none";
    } else {
      _("greeting").innerHTML = "Your guess was too low.<br/><br/>You have " + guesses + " guesses remaining.";
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
