/**
 * Created by Jay Dee on 14/04/15.
 */

var MAX_WIDTH = 50;
var MAX_HEIGHT = 40;
var myTimer, t;
var grid = [];
var changes = [];
var iterations;

for (var i = 0; i <= MAX_HEIGHT+1; i++)
{
    grid[i] = [];
    changes[i] = [];
    for (var j = 0; j <= MAX_WIDTH+1; j++) {
        grid[i][j] = false;
        changes[i][j] = false;
    }
}

function showChecks()
{
    for (var i = 1; i <= MAX_HEIGHT; i++)
    {
        for (var j = 1; j <= MAX_WIDTH; j++)
        {
            newcheck = document.createElement('input');
            newcheck.type = 'checkbox';
            newcheck.id = 'check_'+i+'_'+j;
            if (Math.random() > 0.86)
            {
                grid[i][j] = true;
                changes[i][j] = true;
                newcheck.checked = true;
                newcheck.disabled = false;
            } else {
                grid[i][j] = false;
                changes[i][j] = false
                newcheck.checked = false;
                newcheck.disabled = true;
            }
            document.body.appendChild(newcheck);
        }
        newline = document.createElement('br');
        document.body.appendChild(newline);
    }
    iterations = 1;
}

function nextStep() {
    // First writing
    var t;

    for (var i = 1; i <= MAX_HEIGHT; i++)
    {
        for (var j = 1; j <= MAX_WIDTH; j++)
        {
            counterLiveCells = 0;

            // checking neighbors
            for (var k = -1; k <= 1; k++) {
                for (var l = -1; l <= 1; l++) {
                    t = grid[i+k][j+l] ? 1 : 0;
                    counterLiveCells += t;
                }
            }
            t = grid[i][j] ? 1 : 0;
            counterLiveCells -= t;

            if (grid[i][j] == true) {
                // rule 1, live cell becomes dead
                if (counterLiveCells < 2 || counterLiveCells > 3) {
                    changes[i][j] = false;
                }
                // rule 1, live cell remains alive
                if (counterLiveCells == 2 || counterLiveCells == 3) {
                    changes[i][j] = true;
                }
            } else {
                // rule 3, dead cell becomes alive
                if (counterLiveCells == 3) {
                    changes[i][j] = true;
                }
            }
        }
    }

    // Переносим данные из архива на поле
    for (var i = 1; i <= MAX_HEIGHT; i++)
    {
        for (var j = 1; j <= MAX_WIDTH; j++)
        {
            document.getElementById('check_'+i+'_'+j).checked = changes[i][j];
            if (changes[i][j] == true) {
                document.getElementById('check_'+i+'_'+j).disabled = false;
            }
            grid[i][j] = changes[i][j];
        }
    }

    iterations++;
    document.getElementById("iterCounter").value = iterations;
}


function runGame() {
    myTimer = setInterval(function(){ nextStep() }, 100);
}

function stopGame() {
    clearTimeout(myTimer)
}