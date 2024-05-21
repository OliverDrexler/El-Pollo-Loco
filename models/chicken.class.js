class Chicken extends MovableObject {
   
    constructor() {
        // mit super wird die Funtion der übergeordneten Klasse (=MoveableObject) aufgerufen
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); 

        // // Zahl zwischen 200 & 700
        this.x = 200 + Math.random() * 500;
    }
}