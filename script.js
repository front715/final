var socket = io()
var matrix = [];
var grassEaterArr = []

side = 30;


function setup() {
    frameRate(15);
    
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}


weather = "amar"

socket.on("send weather", function(data) {
    weather = data
})





function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(weather == "amar") {
                    fill("green");
                    rect(x * side, y * side, side, side);
                }
                else if(weather == "dzmer") {
                    fill("white");
                    rect(x * side, y * side, side, side);
                }
                else if(weather == "ashun") {
                    fill("orange");
                    rect(x * side, y * side, side, side);
                }
                else if(weather == "garun") {
                    fill("#32a852");
                    rect(x * side, y * side, side, side);
                }
            }
            else if (matrix[y][x] == 0) {
                fill("gray");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("grey");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 7) {
                fill("pink");
                rect(x * side, y * side, side, side);
            }


        }
    }
}



function addGrass() {
    socket.emit('grass')
}
function addGrasseater() {
    socket.emit('grasseater')
}
function addPredator() {
    socket.emit('predator')
}

function addFire() {
    socket.emit('fire')
}


setInterval(function () {
    socket.on("send matrix", nkarel)
},1000)

