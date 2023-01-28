const TIME_TO_SPAWN = 2
class Spawner {
    constructor() {
        this.spawnDensity = 200
        this.minimunGap = 100
        this.maximumGap = 200
        this.updateCooldown = TIME_TO_SPAWN

    }
    trySpawning() {
        if(this.updateCooldown > 0) {
            this.updateCooldown -= GAME_ENGINE.clockTick
        } else {
            //vertical_Bottom[300 : -98]
            //vertical_Bottom[300 : -98]
            var randomBottom = Math.random() * (900 - 500) + 500;
            var randomGap = Math.random() * (this.maximumGap - this.minimunGap) - this.minimunGap;
            console.log("Random bottom: " + (randomBottom))
            console.log("Random GAP: " + (randomBottom - randomGap))
            var topPipe = new Pipe(GAME_ENGINE.camera.player.posX + 500, -1*randomBottom, true)//{ -500 : -900}
            var bottomPipe = new Pipe(GAME_ENGINE.camera.player.posX + 500, randomBottom - randomGap-900) //{-100 : 320}
            GAME_ENGINE.addEntity(topPipe)
            GAME_ENGINE.addEntity(bottomPipe)
            this.updateCooldown = TIME_TO_SPAWN
        }
    }

    update() {
        this.trySpawning()
    }
    draw() {

    }

}