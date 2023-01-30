// const posX = 0;
// const posY = 0;
const PLAYER_IMAGE_SCALE = 1.5;
const PLAYER_IMAGE_WIDTH = 34 * PLAYER_IMAGE_SCALE;
const PLAYER_IMAGE_HEIGHT = 34 * PLAYER_IMAGE_SCALE;
const PLAYER_RADIUS = (Math.min(PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT) / 2);
const PLAYER_IMAGE_ROTATION_OFFSET = -1.6

const PLAYER_FLYING_SPEED = 25;

const PLAYER_BB_DIMENSION = Math.min(PLAYER_IMAGE_HEIGHT, PLAYER_IMAGE_WIDTH);
const PLAYER_BC_RADIUS = 75;
const PLAYER_VULNERABLE_RADIUS_SCALE = 1.5;
const PLAYER_MAX_VELOCITY_Y = 200
const PLAYER_SPEED_UP_TIMER = 10

class Bird extends GameObject {
    constructor(posX, posY) {
        super(posX, posY,
            "Assets/Birds/Yellow Bird/Yellow_Bird_Sprite.png",
            0, 0,
            PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT,
            1, 1,
            PLAYER_IMAGE_SCALE, false, false, 0);

        //TODO better animator construction
        this.animator = new AnimatorRotate(this.asset,0,0,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT,3,0.12,PLAYER_IMAGE_SCALE)
        //TODO adding animation list

        this.alive = true
        this.heal_currentCooldown = 0;

        this.velocity = 0
        this.acceleration = 15


        this.flyingSpeed = PLAYER_FLYING_SPEED
        this.angle = 0;

        this.playerCollion_World_R = new BoundingBox(
            posX,
            posY,
            PLAYER_BB_DIMENSION ,
            PLAYER_BB_DIMENSION);
        this.bottom = ((1024 - 340 )/2)
        this.timer = 0
    };

    update() {

        if(this.timer > PLAYER_SPEED_UP_TIMER) {
            this.timer = 0
            this.flyingSpeed = this.flyingSpeed * 1.125
        } else {
            this.timer += GAME_ENGINE.clockTick
        }


        if(this.alive == false) {
            this.posX = this.posX //Keep the current X position
            this.velocity += this.acceleration * GAME_ENGINE.clockTick
            this.posY += this.velocity
            if(this.angle <= 1.2) {
                this.angle += 0.01
                if(this.posY >= this.bottom) {
                    this.angle = 0
                }
            }

            //this.angle = 0.04
            console.log("DEAD")
        } else {

            if (GAME_ENGINE.single_click || GAME_ENGINE.space) {

                this.angle = -0.8
                this.velocity = 1000 * this.acceleration * GAME_ENGINE.clockTick
                this.posY -= this.velocity;
                this.velocity = 0



            } else {
                if(this.angle  < 0) {
                    this.angle += 0.02
                }
                this.velocity += this.acceleration * GAME_ENGINE.clockTick
                this.posY += this.velocity

            }
            GAME_ENGINE.single_click = false
            GAME_ENGINE.space = false


            this.posX += this.flyingSpeed * this.acceleration * GAME_ENGINE.clockTick;
        }

        //CHecking for bounds
        if(this.posY >= this.bottom){
            this.posY = this.bottom
        }
        if(this.posY <= -450){
            this.posY = -450
        }

        //
        this.updateCollision()
        this.checkCollisions()


    }

    printCoordinates() {
        console.log("Player Position: x = " + this.posX + " y =" + this.posY)
    }
    printMouseCoordinates() {
        console.log("Mouse Position: x = " + GAME_ENGINE.getMouseWorldPosX() + " y =" + GAME_ENGINE.getMouseWorldPosY())
    }

    draw() {

        this.animator.drawFrame(this.posX, this.posY, this.angle + PLAYER_IMAGE_ROTATION_OFFSET)

        this.playerCollion_World_R.drawBoundingBox()

    }

    updateCollision() {
        this.playerCollion_World_R.x = this.posX - (this.playerCollion_World_R.width/ 2)
        this.playerCollion_World_R.y = this.posY - (this.playerCollion_World_R.height/ 2)
    }

    checkCollisions() {
        this.playerCollion_World_R.updateSides();

        GAME_ENGINE.entities.forEach((entity) => {
            if (entity instanceof Base) {
                entity.bb.updateSides();
                if(this.playerCollion_World_R.collide(entity.bb)) {
                    this.alive = false
                }
            } else if (entity instanceof Pipe) {
                if(this.playerCollion_World_R.collide(entity.bb)) {
                    this.alive = false
                }
            }
        })
    }

}
