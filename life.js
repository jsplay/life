/**
 * Created by Anton on 14/04/15.
 */

var MAX_HEIGHT = 50;
var MAX_WIDTH = 50;
var myTimer;

function showChecks() {
    for (var i = 1; i <= MAX_HEIGHT; i++) {
        for (var j=1; j<= MAX_WIDTH; j++) {
            newcheck = document.createElement('input');
            newcheck.type = 'checkbox';
            newcheck.id = 'check_'+i+'_'+j;
            if (Math.random() > 0.86)
            {
                newcheck.checked = true;
                newcheck.disabled = false;
            } else {
                newcheck.checked = false;
                newcheck.disabled = true;
            }
            document.body.appendChild(newcheck);
        }
        newdiv = document.createElement('div');
        newdiv.className = 'block';
        document.body.appendChild(newdiv);
    }
}

function nextStep() {
    // First writing
    var grid = [];

    for (var i = 1; i <= MAX_HEIGHT; i++)
    {
        grid[i] = [];
        for (var j = 1; j <= MAX_WIDTH; j++) {
            counterLiveCells = 0;
            check = document.getElementById('check_'+i+'_'+j);

            // checking neighbors
            // right neighbor
            if (j > 2) {
                if (document.getElementById('check_'+i+'_'+(j-1)).checked == true) {
                    counterLiveCells++;
                }
            }
            // left neighbor
            if (j < MAX_WIDTH) {
                if (document.getElementById('check_'+i+'_'+(j+1)).checked == true) {
                    counterLiveCells++;
                }
            }

            // previous row neighbors
            if (i > 2) {
                if (document.getElementById('check_'+(i-1)+'_'+j).checked == true) {
                    counterLiveCells++;
                }
                if (j > 2) {
                    if (document.getElementById('check_'+(i-1)+'_'+(j-1)).checked == true) {
                        counterLiveCells++;
                    }
                }
                if (j < 40) {
                    if (document.getElementById('check_'+(i-1)+'_'+(j+1)).checked == true) {
                        counterLiveCells++;
                    }
                }
            }

            // next row neighbors
            if (i < MAX_HEIGHT) {
                if (document.getElementById('check_'+(i+1)+'_'+j).checked == true) {
                    counterLiveCells++;
                }
                if (j > 2) {
                    if (document.getElementById('check_'+(i+1)+'_'+(j-1)).checked == true) {
                        counterLiveCells++;
                    }
                }
                if (j < MAX_WIDTH) {
                    if (document.getElementById('check_'+(i+1)+'_'+(j+1)).checked == true) {
                        counterLiveCells++;
                    }
                }
            }

            if (check.checked == true) {
                // rule 1, live cell becomes dead
                if (counterLiveCells < 2 || counterLiveCells > 3) {
                    grid[i][j] = false;
                }
                // rule 1, live cell remains live
                if (counterLiveCells == 2 || counterLiveCells == 3) {
                    grid[i][j] = true;
                }
            } else {
                // rule 3, dead cell becomes alive
                if (counterLiveCells == 3) {
                    grid[i][j] = true;
                }
            }
        }
    }

    // Переносим данные из архива на поле
    for (var i = 1; i <= MAX_HEIGHT; i++) {
        for (var j = 1; j <= MAX_WIDTH; j++) {
            document.getElementById('check_'+i+'_'+j).checked = grid[i][j];
            if (grid[i][j] == true) {
                if (document.getElementById('check_'+i+'_'+j).disabled == true) {
                    document.getElementById('check_'+i+'_'+j).disabled = false;
                }
            }
        }
    }

}


function runGame() {
    myTimer = setInterval(function(){ nextStep() }, 100);
}

function stopGame() {
    clearTimeout(myTimer)
}