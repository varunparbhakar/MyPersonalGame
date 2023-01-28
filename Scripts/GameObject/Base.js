const BASE_SCALE = 2
const BASE_IMAGE_WIDTH = 336 * SKY_SCALE
const BASE_IMAGE_HEIGHT = 112  * SKY_SCALE
class Base extends GameObject {
    constructor(posX, posY) {
        super(posX, posY, "Assets/Background/Base/base.png", 0, 0, BASE_IMAGE_WIDTH, BASE_IMAGE_HEIGHT, 1, 1, BASE_SCALE, false, false, 0);
        this.bb = new BoundingBox(posX, posY, BASE_IMAGE_WIDTH, BASE_IMAGE_HEIGHT)
    }

    update() {
        this.posX = GAME_ENGINE.camera.posX
        this.posY = GAME_ENGINE.camera.posY + 850
        this.bb.x = GAME_ENGINE.camera.posX
        this.bb.y = GAME_ENGINE.camera.posY + 850
        super.update();

    }

    draw() {
        super.draw();
        this.bb.drawBoundingBox()
    }

}