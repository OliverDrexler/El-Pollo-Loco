class Character extends MovableObject {
    height = 300;
    y = 20; // y = 130;
    speed = 6;
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ]
    world; //hiermit können wir auf die Variablen aus World zugreifen, u.a. auch auf keyboard
    walking_sound = new Audio('../audio/running.mp3');

    constructor() {
        // mit super wird die Funtion der übergeordneten Klasse (=MoveableObject) aufgerufen
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    }

    animate() {
        // movement
        setInterval(() => {
            let isWalking = false;

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                isWalking = true;
            }

            if (this.world.keyboard.LEFT && this.x > 0) { // this.x > 0 prevents character from walking further left when canvas ends
                this.moveLeft();
                this.otherDirection = true;
                isWalking = true;
            }

            //console.log('this.speed_y', this.speed_y)

            if (this.world.keyboard.UP && !this.isAboveGround()) { // keyboard up & is NOT above ground
                this.jump();
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

        // walk & jump animation
        setInterval(() => {

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT ) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
                
            } 
        }, 80);
    }

}