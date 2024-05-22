class Character extends MovableObject {
    height = 300;
    y = 130;

    constructor() {
        // mit super wird die Funtion der übergeordneten Klasse (=MoveableObject) aufgerufen
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
    }

    jump() {

    }
}