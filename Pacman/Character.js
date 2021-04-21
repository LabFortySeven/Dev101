

class Character {

    constructor(x, y, map) {
        this.x = x;
        this.y = y;
        this.map = map;
    }

    moveUp(){
        let points = 0;
        const newPos = this.map[this.y - 1][this.x];
        if ( newPos === MapTiles.Dot) {
            points = 5;
        }
        if ( newPos !== MapTiles.Wall) {
            this.y--; 
        }
        return points;
    }

    moveDown(){
        let points = 0;
        const newPos = this.map[this.y + 1][this.x];
        if ( newPos === MapTiles.Dot) {
            points = 5;
        }
        if (this.map[this.y + 1][this.x] !== MapTiles.Wall) {
            this.y++;
        }
        return points;
    }

    moveLeft(){
        let points = 0;
        const newPos = this.map[this.y][this.x - 1];
        if ( newPos === MapTiles.Dot) {
            points = 5;
        }
        if (this.map[this.y][this.x - 1] !== MapTiles.Wall) {
            this.x--;
        }
        return points;
    }

    moveRight(){
        let points = 0;
        const newPos = this.map[this.y][this.x + 1];
        if ( newPos === MapTiles.Dot) {
            points = 5;
        }
        if (this.map[this.y][this.x + 1] !== MapTiles.Wall) {
            this.x++;
        }
        return points;
    }

}