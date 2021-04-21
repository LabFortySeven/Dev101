class Ghost extends Character{

    constructor(x, y, map){
        super(x, y, map);

        this.isFrightened = false;
    }

    move(){
        //pick a random direction to move
        const dir = Math.floor(Math.random() * 5);

        switch (dir) {
            case 1:
                this.moveUp();
                break;
            case 2:
                this.moveDown();
                break;
            case 3:
                this.moveLeft();
                break;
            case 4:
                this.moveRight();
                break;
        
            default:
                break;
        }
    }

}