class Chicken extends MovableObject {
   
    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); // mit super wird die Funtion der übergeordneten Klasse (=MoveableObject) aufgerufen
    }
}