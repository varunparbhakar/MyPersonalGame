const GAME_ENGINE = new GameEngine();
const ASSET_MANAGER = new AssetManager();

//Load Assets
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Heroes/Player.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Zombies/Zombie_PNG.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Boss/Panzer_Soldat.png");
ASSET_MANAGER.queueDownload("Assets/Images/Items/Bullets/Bullet.png");
ASSET_MANAGER.queueDownload("Assets/Background/Day/background-day.png");
ASSET_MANAGER.queueDownload("Assets/Birds/Yellow Bird/Yellow_Bird_Sprite.png");
ASSET_MANAGER.queueDownload("Assets/Obsticals/Green Pipe/pipe-green.png");
ASSET_MANAGER.queueDownload("Assets/Obsticals/Green Pipe/pipe-green -flipped.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Zombies/Animations/Walking/ZombieWalking.png");
ASSET_MANAGER.queueDownload("Assets/Images/Characters/Zombies/Animations/Attacking/AttackingSpriteSheet.png")
ASSET_MANAGER.queueDownload("Assets/Background/Base/base.png")



ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	GAME_ENGINE.options.debugging = false;

	//Load Objects
	GAME_ENGINE.addEntity(new SceneManager());

	GAME_ENGINE.init(ctx);
	GAME_ENGINE.start();
});
