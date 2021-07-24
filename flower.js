let LivingCreature  = require("./livingcreature.js")

module.exports = class Flower extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 8;
        this.multiply = 0;
    }

    chooseCell(ch){
        this.getNewCoordinates()
        return super.chooseCell(ch)
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[ Math.floor(Math.random() * emptyCells.length) ] ;

        

        if (newCell && this.multiply >= 3 && this.energy>16) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 7;

            var newFlower = new Flower(newX, newY);
            flowerArr.push(newFlower);
            this.multiply = 0;
            this.energy = 8
        }
    }
    move() {
        this.energy--
        var emptyCells = this.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = this.chooseCell(6)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in WhaterArr) {
                if (this.x == WhaterArr[i].x && this.y == WhaterArr[i].y) {

                    WhaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in flowerArr) {
            if (this.x == flowerArr[i].x && this.y == flowerArr[i].y) {
                flowerArr.splice(i, 1);
                break;
            }
        }
    }
}