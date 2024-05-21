class Chicken extends MovableObject {
   
    constructor() {
        // mit super wird die Funtion der übergeordneten Klasse (=MoveableObject) aufgerufen
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png'); 

        // setzen der x-Achse für die Chicken (zufälliger Wert (Einheit Pixel) + 500, beginnend 200px rechts vom linken Rand)
        this.x = 200 + Math.random() * 500;
    }
}