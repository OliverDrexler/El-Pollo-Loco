class Cloud extends MovableObject {
y = 20; // bei Wolken dynamisch, daher hier definiert

constructor() {
    super().loadImage('../img/5_background/layers/4_clouds/1.png');

    this.x = Math.random() * 700; 
    this.width = 500;
    this.height = 300;
}

}