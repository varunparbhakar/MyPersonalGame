/**
 * (WARNING) All World-based drawing to render canvas must subtract by this (GAME_ENGINE.camera) posX & posY.
 */
class SceneManager {
    //TODO Round Manager
    //TODO Scoreboard

    constructor() {
        //Camera
        GAME_ENGINE.camera = this;
        this.posX = 0;
        this.posY = 0;

        //Player
        this.player = new Bird(0,0);
        GAME_ENGINE.addEntity(new Sky(this.posX,this.posY));

        var sp = new Spawner(0,0)
        GAME_ENGINE.addEntity(sp)
        GAME_ENGINE.addEntity(new Base(0,0));
        // var posy = (-500 ) // 950
        var posyx = -98
        // GAME_ENGINE.addEntity(new Pipe(200, posy, true));
        // GAME_ENGINE.addEntity(new Pipe(300, posy, true));
        // GAME_ENGINE.addEntity(new Pipe(400, posy, true));
        // GAME_ENGINE.addEntity(new Pipe(600, posy, true));
        // GAME_ENGINE.addEntity(new Pipe(800, posy, true));
        // GAME_ENGINE.addEntity(new Pipe(1000, posy, true));
        // GAME_ENGINE.addEntity(new Pipe(1200, posy, true));
        // GAME_ENGINE.addEntity(new Pipe(1500, posy, true));
        // GAME_ENGINE.addEntity(new Pipe(200, posyx));
        // GAME_ENGINE.addEntity(new Pipe(300, posyx));
        // GAME_ENGINE.addEntity(new Pipe(400, posyx));
        // GAME_ENGINE.addEntity(new Pipe(600, posyx));
        // GAME_ENGINE.addEntity(new Pipe(800, posyx));
        // GAME_ENGINE.addEntity(new Pipe(1000, posyx));
        // GAME_ENGINE.addEntity(new Pipe(1200, posyx));
        // GAME_ENGINE.addEntity(new Pipe(1500, posyx));
        GAME_ENGINE.addEntity(this.player)

    }

    /**
     * Moves Camera to midpoint between Player World Pos & Mouse World Pos
     */
    update() {
        //Moved Up and Left by (GAME_ENGINE.ctx.canvas.[width/height] / 2) for centering
        this.posX = ((this.player.posX - (GAME_ENGINE.ctx.canvas.width / 2) + 100))
        this.posY = -500
    }

    draw() {

    }
}