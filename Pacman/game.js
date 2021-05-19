console.log("Pacman started!")

class GameBoard {
    constructor(){

        this.playerHandle = prompt("Please enter your username", "Name");
        document.getElementById("user").value = this.playerHandle;
        this.board = document.getElementById("board");
        // 1 = empty background, 2 = dot, 3 = wall, 4 = pacman, 5 = ghost
        
        //TODO:Update map array using enum
        this.map = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
            [1,5,3,3,3,1,3,1,3,3,3,3,3,5,1], 
            [1,3,1,1,3,1,3,1,3,1,1,1,1,3,1], 
            [1,3,1,3,3,3,3,3,3,3,3,3,1,3,1], 
            [1,3,3,3,3,1,3,1,3,1,3,3,3,3,1], 
            [1,3,1,1,3,1,1,1,1,1,3,1,1,3,1], 
            [1,3,3,1,3,3,3,3,3,3,3,1,3,3,1], 
            [1,1,3,1,3,1,1,3,1,1,3,1,3,1,1], 
            [1,3,3,1,3,3,3,3,3,3,3,1,3,3,1], 
            [1,3,1,1,3,1,1,1,1,1,3,1,3,3,1], 
            [1,3,3,3,3,1,3,1,3,1,3,3,3,3,1], 
            [1,3,1,3,3,3,3,4,3,3,3,3,1,3,1], 
            [1,3,1,3,1,1,3,1,3,1,1,1,3,3,1], 
            [1,5,3,3,3,3,3,3,3,3,3,3,3,5,1], 
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ];


        this.score = 0;

        //create a pacman
        this.pacman = new Pacman(7,11,this.map);

        //create 4 ghosts
        this.clyde = new Ghost(1,1,this.map);
        this.blinky = new Ghost(1,13,this.map);
        this.pinky = new Ghost(13,1,this.map);
        this.inky = new Ghost(13,13,this.map);

        document.addEventListener('keydown', this.handleKeyboardEvent.bind(this));
    }

    handleKeyboardEvent(event){
        
        //empty the previous position of pacman
        this.map[this.pacman.y][this.pacman.x] = MapTiles.Empty;

        //move pacman
        const keyPressed = event.code;
        console.log(event.code);
        switch (keyPressed) {
            case "ArrowUp":
                //call pacman's move up method
                this.score += this.pacman.moveUp();
                break;
            case "ArrowDown":
                //call pacman's move down method
                this.score += this.pacman.moveDown();
                break;
            case "ArrowLeft":
                //call pacman's move left method
                this.score += this.pacman.moveLeft();
                break;
            case "ArrowRight":
                //call pacman's move right method
                this.score += this.pacman.moveRight();
                break;
            default:
                break;
        }

        //update the new position of pacman
        this.map[this.pacman.y][this.pacman.x] = MapTiles.Pacman;

        //update the score to submit 
        document.getElementById("scoreToSubmit").value = this.score;
    }

    update(){
        //empty previous positions of ghost
        this.map[this.clyde.y][this.clyde.x] = MapTiles.Dot;
        this.map[this.blinky.y][this.blinky.x] = MapTiles.Dot;
        this.map[this.inky.y][this.inky.x] = MapTiles.Dot;
        this.map[this.pinky.y][this.pinky.x] = MapTiles.Dot;
        //move ghosts
        this.clyde.move();
        this.blinky.move();
        this.inky.move();
        this.pinky.move();
        //update new ghost positions
        this.map[this.clyde.y][this.clyde.x] = MapTiles.Ghost;
        this.map[this.blinky.y][this.blinky.x] = MapTiles.Ghost;
        this.map[this.inky.y][this.inky.x] = MapTiles.Ghost;
        this.map[this.pinky.y][this.pinky.x] = MapTiles.Ghost;

        this.drawBoard();
    }

    drawBoard(){
        document.getElementById("score").innerText = this.score;
        this.board.innerHTML = "";
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = this.map[y][x];
                switch (tile) {
                    case MapTiles.Empty:
                        this.board.innerHTML += "<div class='tile background'></div>"
                        break;
                    case MapTiles.Dot:
                        this.board.innerHTML += "<div class='tile dot'></div>"
                        break;
                    case MapTiles.Wall:
                        this.board.innerHTML += "<div class='tile wall'></div>"
                        break;
                    case MapTiles.Pacman:
                        this.board.innerHTML += "<div class='tile pacman'></div>"
                        break;
                    case MapTiles.Ghost:
                        this.board.innerHTML += "<div class='tile ghost'></div>"
                        break;
                    default:
                        break;
                }
            }
            this.board.innerHTML += "<br>";
        }
        setTimeout(this.update.bind(this),1000)
    }

}

let gameBoard = new GameBoard();
gameBoard.drawBoard();