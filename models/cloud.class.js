class Cloud extends MovableObject {
// Werte bei Wolken nicht dynamisch, daher hier definiert
y = 20; 
height = 350;
width = 500;

constructor() {
    super().loadImage('../img/5_background/layers/4_clouds/1.png');

    this.x = Math.random() * 700; 

    this.startMoving();
}

startMoving() {
    setInterval(() => {
        this.moveLeft();
    }, 80);
}

moveLeft() {
    this.x -= 0.5;
}

}