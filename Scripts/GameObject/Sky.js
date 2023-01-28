const SKY_SCALE = 2
const SKY_IMAGE_WIDTH = 288 * SKY_SCALE
const SKY_IMAGE_HEIGHT = 512  * SKY_SCALE
class Sky extends GameObject {
    constructor(posX, posY) {

        super(posX, posY, "Assets/Background/Day/background-day.png", 0, 0, SKY_IMAGE_WIDTH, SKY_IMAGE_HEIGHT, 1, 1, SKY_SCALE, false, false, 0);
    }

    update() {
        this.posX = GAME_ENGINE.camera.posX
        this.posY = GAME_ENGINE.camera.posY
        super.update();

    }

    draw() {
        super.draw();

    }

}