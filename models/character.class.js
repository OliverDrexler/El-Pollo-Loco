class Character extends MovableObject {
    height = 300;
    y = 130;
    speed = 6;
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    world; //hiermit können wir auf die Variablen aus World zugreifen, u.a. auch auf keyboard
    walking_sound = new Audio('../audio/running.mp3');

    constructor() {
        // mit super wird die Funtion der übergeordneten Klasse (=MoveableObject) aufgerufen
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {
        // movement
        setInterval(() => {
            let isWalking = false;
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                isWalking = true;
            }
            if (this.world.keyboard.LEFT && this.x > 0) { // this.x > 0 prevents character from walking further left when canvas ends
                this.x -= this.speed;
                this.otherDirection = true;
                isWalking = true;
            }
            this.world.camera_x = -this.x + 100; // Positioning of character 100px further right
    
            if (isWalking) {
                if (this.walking_sound.paused) {
                    this.walking_sound.currentTime = 0;
                    this.walking_sound.play();
                }
            } else {
                if (!this.walking_sound.paused) {
                    this.walking_sound.pause();
                    this.walking_sound.currentTime = 0;
                }
            }
        }, 1000 / 60);

        // walk animation
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT ) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 80);
    }

    jump() {

    }
}