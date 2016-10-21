var randomNumber;
var guesses;
var cnt;
var wins = 0;
var losses = 0;
var finished = false;
var handicap = 0;
var quit = false;
var previousDiff;
var currentDiff;
var allGuesses = [];
var won = false;

function _(id) {
    return document.getElementById(id);
}

function reset() {
    if (finished == false) {
        losses++;
        handicap += 2;
        console.log(handicap);
    } else {
        finished = false;
        handicap = 0;
    }
    allGuesses = [];
    previousDiff = currentDiff;
    if (won != true) {
      _("previousMode").innerHTML = "The previous mode was " + previousDiff + ".<br/>Selecting the same difficulty again<br/>will add bonus guesses.";
    }
    _("selectDifficulty").innerHTML = "Select Difficulty";
    _("difficulty").style.display = "inline";
    _("greeting").innerHTML = "";
    _("guess").style.display = "none";
    _("submit").style.display = "none";
    _("reset").style.display = "none";
    _("difficulty").value = "none";
    _("wins").innerHTML = "wins: " + wins;
    _("losses").innerHTML = "losses: " + losses;
    _("handicap").innerHTML = "Bonus guesses: " + handicap;
    won = false;
    cnt = 0;
    guesses = 0;
}

_("guess").style.display = "none";
_("submit").style.display = "none";
_("reset").style.display = "none";
_("wins").innerHTML = "wins: " + wins;
_("losses").innerHTML = "losses: " + losses;
_("handicap").innerHTML = "Bonus guesses: " + handicap;
cnt = 0;
guesses = 0;

function getDifficulty(diff) {
    var num;
    var top;
    var diffMessage;
    currentDiff = diff;

    switch (diff) {

        case "easy":
            num = 100;
            diffMessage = "Easy mode: 1-100";
            break;
        case "medium":
            num = 1000;
            diffMessage = "Medium mode: 1-1,000";
            break;
        case "hard":
            num = 10000;
            diffMessage = "Hard mode: 1-10,000";
            break;
        case "veryHard":
            num = 100000;
            diffMessage = "Very Hard mode: 1-100,000";
            break;
    }

    top = num;

    while (num > 1) {
        num = Math.ceil(num / 2);
        cnt++;
    }

    if (previousDiff == diff) {
        guesses = cnt + handicap;
    } else {
        guesses = cnt;
        handicap = 0;
    }

    _("previousMode").innerHTML = "";
    _("previousMode").style.borderCollapse = "collapse";
    _("selectDifficulty").innerHTML = "";
    _("difficulty").style.display = "none";
    _("greeting").innerHTML = diffMessage + "<br/><br/>You have " + guesses + " guesses remaining.";
    randomNumber = Math.floor(Math.random() * top) + 1;
    _("handicap").innerHTML = "handicap: " + handicap;
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
            allGuesses.push(userInput + "(h)");
            _("history").innerHTML = "Previous guesses: <br/>" + allGuesses;
            _("guess").value = "";
        } else if (userInput == randomNumber) {
            _("greeting").innerHTML = "CONGRATULATIONS YOU GUESSED THE NUMBER!!<br/>It took you " + (cnt - guesses) + " tries."
            _("submit").style.display = "none";
            _("reset").style.display = "none";
            _("guess").style.display = "none";
            _("history").innerHTML = "";
            _("guess").value = "";
            won = true;
            finished = true;
            wins++;
            _("wins").innerHTML = "wins: " + wins;
            setTimeout(function() {
                reset();
            }, 5000);
        } else {
            _("greeting").innerHTML = "Your guess was too low.<br/><br/>You have " + guesses + " guesses remaining.";
            allGuesses.push(userInput + "(l)")
            _("history").innerHTML = "Previous guesses: <br/>" + allGuesses;
            _("guess").value = "";
        }
    } else {
        _("greeting").innerHTML = "Sorry but you ran out of guesses.<br/>The number you were failed to guess was " + randomNumber;
        _("submit").style.display = "none";
        _("guess").style.display = "none";
        _("reset").style.display = "none";
        losses++;
        _("losses").innerHTML = "losses: " + losses;
        finished = true;
        setTimeout(function() {
            reset()
        }, 5000);
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
