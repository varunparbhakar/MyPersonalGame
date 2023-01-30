
const UPDATE_COUNTER = 10
class Spawner {
    constructor() {
        this.spawnDensity = 200
        this.minimunGap = 1100
        this.maximumGap = 1250
        this.TIME_TO_SPAWN_PIPE = 2
        this.updateCooldown = 0
        this.reducetime = 0

    }
    trySpawning() {
        if(this.updateCooldown < this.TIME_TO_SPAWN_PIPE) {
            this.updateCooldown += GAME_ENGINE.clockTick
        } else {
            var randomBottom = Math.random() * (320 - 100) + 100;

            var randomGap = Math.abs(Math.random() * (this.maximumGap - this.minimunGap) + this.minimunGap);
            var bottomPipeY =  randomBottom
            var topPipe = new Pipe(GAME_ENGINE.camera.player.posX + 500, bottomPipeY - randomGap, true)//{ -500 : -900}
            var bottomPipe = new Pipe(GAME_ENGINE.camera.player.posX + 500,  bottomPipeY) //{-100 : 320}
            GAME_ENGINE.addEntity(topPipe)
            GAME_ENGINE.addEntity(bottomPipe)

            if(this.reducetime < UPDATE_COUNTER) {
                this.reducetime += GAME_ENGINE.clockTick
            } else {
                this.TIME_TO_SPAWN_PIPE = this.TIME_TO_SPAWN_PIPE* 0.9
                this.reducetime = 0
            }

            this.updateCooldown = 0
        }
    }

    update() {
        this.trySpawning()

    }
    draw() {

    }

}