let express = require("express")
let app = express()
let server = require('http').Server(app)
let io = require("socket.io")(server)
let fs = require("fs")

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html")
})
server.listen(3000)

matrix = [];
Grass = require("./grass.js")
GrassEater = require("./grasseaster.js")
Preditor = require("./predator.js")
Fire = require("./fire.js")
Stone = require("./stone.js")
Whater = require("./whater.js")
Flower = require("./flower.js")

weather = "amar"
setInterval(function () {
    if (weather == "amar") {
        weather = "ashun"
    }
    else if (weather == "ashun") {
        weather = "dzmer"
    }
    else if (weather == "dzmer") {
        weather = "garun"
    }
    else if (weather == "garun") {
        weather = "amar"
    }

    io.sockets.emit("send weather", weather)
}, 4000)








function generator(matLen, gr, grEat, pr, fr, st, wahter, flower) {


    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < fr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < st; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < wahter; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
    for (let i = 0; i < flower; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 7;

        }
    }
    io.sockets.emit('send matrix', matrix)

    return matrix;
}

matrix = generator(20, 20, 10, 12, 12, 7, 10, 7);



grassArr = [];
grassEaterArr = []
predatorArr = []
fireArr = []
stoneArr = []
WhaterArr = []
flowerArr = []





function CreatObject(matrix) {


    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr1 = new Grass(x, y);
                grassArr.push(gr1);
            } else if (matrix[y][x] == 2) {
                var gr2 = new GrassEater(x, y);
                grassEaterArr.push(gr2);
            }
            else if (matrix[y][x] == 3) {
                var gr2 = new Preditor(x, y);
                predatorArr.push(gr2)
            }
            else if (matrix[y][x] == 4) {
                var gr2 = new Fire(x, y);
                fireArr.push(gr2)
            }
            else if (matrix[y][x] == 5) {
                var gr2 = new Stone(x, y);
                stoneArr.push(gr2)
            }
            else if (matrix[y][x] == 6) {
                var gr2 = new Whater(x, y);
                WhaterArr.push(gr2)
            }
            else if (matrix[y][x] == 7) {
                var gr2 = new Flower(x, y);
                flowerArr.push(gr2)
            }
        }
    }


    io.sockets.emit('send matrix', matrix)


}

function game() {

    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (var i in predatorArr) {
        predatorArr[i].mul()
        predatorArr[i].eat()
    }
    for (var i in fireArr) {
        fireArr[i].mul()
        fireArr[i].eat()
    }
    for (var i in stoneArr) {
        stoneArr[i].mul()
        stoneArr[i].die()
    }
    for (var i in WhaterArr) {
        WhaterArr[i].mul()
        WhaterArr[i].eat()
    }
    for (var i in flowerArr) {
        flowerArr[i].mul()
        flowerArr[i].eat()
    }

    io.sockets.emit('send matrix', matrix)



}


function addGrass() {
    for (var i = 0; i < 20; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            grassArr.push(new Grass(x, y, 1))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrasseater() {
    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addPredator() {
    for (var i = 0; i < 12; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Preditor(x, y, 3))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addFire() {
    for (var i = 0; i < 12; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            fireArr.push(new Fire(x, y, 4))
        }
    }
    io.sockets.emit("send matrix", matrix);
}







setInterval(game, 1000)



let flag = true

io.on("connection", function (socket) {
    if (flag) {
        CreatObject(matrix)
        flag = false
    }
    socket.on("grass", addGrass)
    socket.on("grasseater", addGrasseater)
    socket.on("predator", addPredator)
    socket.on("fire", addFire)




})




var statics = {};

setInterval(function () {
    statics.grass = grassArr.length
    statics.grassEaster = grassEaterArr.length
    statics.predator = predatorArr.length
    statics.fire = fireArr.length
    statics.stone = stoneArr.length
    statics.whater = WhaterArr.length
    statics.flower = flowerArr.length

    const dir = "staticts.json"
    var log = fs.writeFileSync(dir,
        JSON.stringify(statics))

}, 1000)



