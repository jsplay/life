/**
 * Created by Jay Dee on 14/04/15.
 */

var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 1000;
var MAX_WIDTH = 90;
var MAX_HEIGHT = 80;
var DOT_SIZE = 3;

var myTimer;
// the main grid
var grid = [];
// the changes grid
var changes = [];
// iterations counter
var iterations;
// should be removed in version 1.2
var colors = ["#f1f1f1","#e5e5e5","#dcdcdc","#d1d1d1","#c5c5c5","#bdbdbd","#b5b5b5","#aaaaaa","#9d9d9d","#929292","#898989","#858585","#2E578C"];
// dot objects store here
var objects = [];

var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");

function dot() {
    this.active = false;
    this.color = 0xf9f9f9;
    this.oldcolor = 0xf9f9f9;
}

initGrid();
drawGrid();

// ---------------------- FUNCTIONS -------------------------
function initGrid() {
    for (var i = 0; i <= MAX_HEIGHT+1; i++)
    {
        grid[i] = [];
        changes[i] = [];
        objects[i] = [];
        for (var j = 0; j <= MAX_WIDTH+1; j++) {
            grid[i][j] = 0;
            changes[i][j] = 0;
            objects[i][j] = new dot();
        }
    }
}

function drawGrid()
{
    for (var i = 1; i <= MAX_HEIGHT; i++)
    {
        for (var j = 1; j <= MAX_WIDTH; j++)
        {
            if (Math.random() > 0.86)
            {
                // live cell
                grid[i][j] = 1;
                changes[i][j] = 1;
                objects[i][j].active = true;
                objects[i][j].color = 0x2E578C;
                context.fillStyle = "#2E578C";
            }
            else {
                // dead cell
                grid[i][j] = 0;
                changes[i][j] = 0;
                objects[i][j].active = false;
                context.fillStyle = "#f9f9f9";
            }
            context.beginPath();
            context.arc(i*DOT_SIZE*4,j*DOT_SIZE*4,DOT_SIZE,0,2*Math.PI);
            context.fill();
        }
    }
    iterations = 1;
}

function nextStep() {
    for (var i = 1; i <= MAX_HEIGHT; i++)
    {
        for (var j = 1; j <= MAX_WIDTH; j++)
        {
            var counterLiveCells = 0;
            
            // checking neighbors (this includes the center dot as well)
            for (var k = -1; k <= 1; k++) {
                for (var l = -1; l <= 1; l++) {
                    if (objects[i+k][j+l].active == true) {
                        counterLiveCells++;
                    }
                }
            }
            
            if (grid[i][j] > 0) {
                // minus center dot
                counterLiveCells--;
                // rule 1, live cell becomes dead
                if (counterLiveCells < 2 || counterLiveCells > 3) {
                    changes[i][j] = 0;
                }
                // rule 2, live cell remains alive
                if (counterLiveCells == 2 || counterLiveCells == 3) {
                    changes[i][j] = 1;
                }
            } else {
                // rule 3, dead cell becomes alive
                if (counterLiveCells == 3) {
                    changes[i][j] = 2;
                }
            }
        }
    }

    // Clearing the field
    context.fillStyle = "#FFFFFF";
    context.rect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    context.fill();

    // Drawing the field
    for (var i = 1; i <= MAX_HEIGHT; i++)
    {
        for (var j = 1; j <= MAX_WIDTH; j++)
        {
            if (changes[i][j] == 0) {
                objects[i][j].color = objects[i][j].oldcolor;
                objects[i][j].active = false;
            }
            else if (changes[i][j] == 1) {
                objects[i][j].color = 0x2E578C;
                objects[i][j].active = true;
            }
            else if (changes[i][j] == 2) {
                objects[i][j].color -= 0x040404;
                objects[i][j].oldcolor = objects[i][j].color;
                objects[i][j].color = 0x2E578C;
                objects[i][j].active = true;
            }
            
            context.fillStyle = "#" + objects[i][j].color.toString(16);
            context.beginPath();
            context.arc(i*DOT_SIZE*4,j*DOT_SIZE*4,DOT_SIZE,0,2*Math.PI);
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