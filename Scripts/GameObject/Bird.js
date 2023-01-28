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
        this.acceleration = 12


        this.sprintRest = false;
        this.angle = 0;

        this.playerCollion_World_R = new BoundingBox(
            posX,
            posY,
            PLAYER_BB_DIMENSION ,
            PLAYER_BB_DIMENSION);
    };

    update() {

        if (GAME_ENGINE.left_click || GAME_ENGINE.key_up) {

            this.angle = -0.8
            this.velocity = 12 + this.acceleration * GAME_ENGINE.clockTick
            this.posY -= this.velocity;
            this.velocity = 0


        } else {
            if(this.angle  < 0) {
                this.angle += 0.02
            }
            this.velocity += this.acceleration * GAME_ENGINE.clockTick
            this.posY += this.velocity

        }


        this.posX += PLAYER_FLYING_SPEED * 9.8 * GAME_ENGINE.clockTick;
        this.bottom = ((1024 - 340 )/2)
        if(this.posY >= this.bottom){
            this.posY = this.bottom
        }
        if(this.posY <= -450){
            this.posY = -450
        }


        // if(GAME_ENGINE.left_click) {
        //     // console.log("MOUSE CLICK DETECTED!!!")
        //     //console.log(GAME_ENGINE.click)
        //     this.currentGun.shoot(GAME_ENGINE.camera.player.posX,GAME_ENGINE.camera.player.posY, this.angle)
        // }
        // if (GAME_ENGINE.key_reload) {
        //     this.currentGun.reload();
        //     // console.log("TACITICAL RELOADING")
        //     // this.printCoordinates()
        // }

        //Gun
        // this.currentGun.update()
        //
        // //Heal
        //
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

    mouseRotationHandler() {
        if (GAME_ENGINE.mouse == null) return(0); //Catches exception start of Engine
        var dx = (GAME_ENGINE.getMouseWorldPosX()) - (this.posX); //282/2 Accounting for difference in center of thing.
        var dy = (GAME_ENGINE.getMouseWorldPosY()) - (this.posY);
        //this.printMouseCoordinates()

        return (Math.atan2(dy, dx));
    }

    //TODO No animations possible, only rotates
    draw() {
        // var tempCanvas = document.createElement("canvas")
        // tempCanvas.width = Math.sqrt(Math.pow(Math.max(this.width, this.height), 2) * 2) //Offscreen canvas square that fits old asset
        // tempCanvas.height = tempCanvas.width
        // var tempCtx = tempCanvas.getContext("2d")
        // var myOffset = tempCanvas.width/2 - this.width/2
        //
        // if (GAME_ENGINE.options.debugging == true) {
        //     tempCtx.strokeStyle = "black"
        //     tempCtx.strokeRect(0, 0, tempCanvas.height, tempCanvas.width)
        // }
        //
        // tempCtx.save();
        // tempCtx.translate(this.width / 2 + myOffset, this.height / 2 + myOffset) //Find mid (Squares ONLY)
        // tempCtx.rotate(this.angle + -1.6 + (Math.PI) / 2)
        // tempCtx.translate (-(this.width / 2), -(this.height / 2));
        // tempCtx.drawImage(this.asset, 0, 0, PLAYER_IMAGE_WIDTH, PLAYER_IMAGE_HEIGHT);
        // tempCtx.restore();
        //
        // GAME_ENGINE.ctx.drawImage(tempCanvas, this.posX - (tempCanvas.width/2) - GAME_ENGINE.camera.posX,
        //                                       this.posY - (tempCanvas.height/2) - GAME_ENGINE.camera.posY);
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
                this.playerCollion_World_R.collide(entity.bb);
            } else if (entity instanceof Pipe) {
                this.playerCollion_World_R.collide(entity.bb);
            }
        })
    }

    takeDamage(damage) {
        this.hp -= damage
        if (this.hp <= 0) {
            this.alive = false
        }

        //reset heal cooldown
        this.heal_currentCooldown = this.PLAYER_HEAL_COOLDOWN;
    }

    healHandler() {
        if (this.heal_currentCooldown <= 0) {
            if (this.hp <= PLAYER_HP_MAX)
                this.hp += PLAYER_HEAL_POINTS * GAME_ENGINE.clockTick;
        } else {
            this.heal_currentCooldown -= GAME_ENGINE.clockTick;
        }
    }

}
