const BRICK_SCALE = 1.5
const BRICK_IMAGE_WIDTH = 52 * BRICK_SCALE
const BRICK_IMAGE_HEIGHT = 320 * BRICK_SCALE
const TIME_TO_DISAPPEAR = 10


class Pipe extends GameObject {
    constructor(posX, posY, flippedY) {
        if(flippedY) {
            super(posX, posY, "Assets/Obsticals/Green Pipe/pipe-green -flipped.jpg",
                0, 0,
                BRICK_IMAGE_WIDTH, BRICK_IMAGE_HEIGHT,
                1, 1,
                BRICK_SCALE,
                false, false,
                0);
        } else {
            super(posX, posY, "Assets/Obsticals/Green Pipe/pipe-green.png",
                0, 0,
                BRICK_IMAGE_WIDTH, BRICK_IMAGE_HEIGHT,
                1, 1,
                BRICK_SCALE,
                false, false,
                0);
        }
        this.bb = new BoundingBox(posX, posY, BRICK_IMAGE_WIDTH, BRICK_IMAGE_HEIGHT)
        this.timer = TIME_TO_DISAPPEAR
    }

    update() {
        if(TIME_TO_DISAPPEAR > 0) {
            this.timer -= GAME_ENGINE.clockTick
        }else {
            this.removeFromWorld = true
        }
        //Implement the rotation into panzer
        super.update();
    }

    draw() {
        super.draw();
        this.bb.drawBoundingBox()
    }

}