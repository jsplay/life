/**
 * Created by Jay Dee on 14/04/15.
 */

var MAX_WIDTH = 50;
var MAX_HEIGHT = 40;
var myTimer, t;
// the main grid
var grid = [];
// the changes grid
var changes = [];
var iterations;
var colors = ["#f1f1f1","#e5e5e5","#dcdcdc","#d1d1d1","#c5c5c5","#bdbdbd","#b5b5b5","#aaaaaa","#9d9d9d","#929292","#898989","#858585","#2E578C"];
// how many times the cell was visited
// according to these visits, changing the colors of the cell
var visited = [];

var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

for (var i = 0; i <= MAX_HEIGHT+1; i++)
{
    grid[i] = [];
    changes[i] = [];
    visited[i] = [];
    for (var j = 0; j <= MAX_WIDTH+1; j++) {
        grid[i][j] = 0;
        changes[i][j] = 0;
    }
}

initGrid();

// ------------------------ initGrid ----------------------------
function initGrid()
{
    for (var i = 1; i <= MAX_HEIGHT; i++)
    {
        for (var j = 1; j <= MAX_WIDTH; j++)
        {
            if (Math.random() > 0.86)
            {
                grid[i][j] = 1;
                changes[i][j] = 1;
                visited[i][j] = 1;
                context.fillStyle = colors[12];
                context.beginPath();
                context.arc(i*20,j*20,5,0,2*Math.PI);
                context.fill();
            } else {
                grid[i][j] = 0;
                changes[i][j] = 0;
                visited[i][j] = 0;
                context.fillStyle = colors[0];
                context.beginPath();
                context.arc(i*20,j*20,5,0,2*Math.PI);
                context.fill();
            }
        }
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
            var counterLiveCells = 0;

            // checking neighbors
            for (var k = -1; k <= 1; k++) {
                for (var l = -1; l <= 1; l++) {
                    if (grid[i+k][j+l] > 0) {
                        counterLiveCells++;
                    }
                }
            }

            if (grid[i][j] > 0) {
                counterLiveCells--;
                // rule 1, live cell becomes dead
                if (counterLiveCells < 2 || counterLiveCells > 3) {
                    changes[i][j] = 0;
                    visited[i][j]++;
                }
                // rule 1, live cell remains alive
                if (counterLiveCells == 2 || counterLiveCells == 3) {
                    changes[i][j] = 12;
                    visited[i][j]++;
                }
            } else {
                // rule 3, dead cell becomes alive
                if (counterLiveCells == 3) {
                    changes[i][j] = 12;
                }
            }
        }
    }

    // Clearing the field
    context.fillStyle = "#FFFFFF";
    context.rect(0,0,1000,1100);
    context.fill();

    // Drawing the field
    for (var i = 1; i <= MAX_HEIGHT; i++)
    {
        for (var j = 1; j <= MAX_WIDTH; j++)
        {
            /*if (visited[i][j] < 12) {
                context.fillStyle = colors[changes[i][j]+visited[i][j]];
            } else {
                context.fillStyle = colors[changes[i][j]];
            }*/
            context.fillStyle = colors[changes[i][j]];
            context.beginPath();
            context.arc(i*20,j*20,5,0,2*Math.PI);
            context.fill();

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