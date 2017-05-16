class Main
{
	constructor()
	{
		return new Phaser.Game(400, 500, Phaser.AUTO, 'phaserStage', { preload: this.preload, create: this.create });
	}

	preload()
	{
		this.load.image('particle', 'assets/images/particle.png');
	}

	create()
	{
		this.emitter = this.add.emitter(0, 0);//insert 0 , 0 how default
		this.emitter.position.x = this.world.centerX;//position.x
		this.emitter.position.y = this.world.centerY;//position.y
		this.emitter.width = 200;//positionVar.x
		this.emitter.height = 200;//positionVar.y

		this.emitter.gravity = new Phaser.Point(0, 0);

		// this.emitter.lifespan = 1;
		this.emitter.maxParticles = 200;
		// this.emitter.frequency = 250;
		
		// this.emitter.minRotation = -360;
		// this.emitter.minParticleAlpha = 1;
		// this.emitter.minParticleScale = 1;
		// this.emitter.minParticleSpeed = new Phaser.Point(-200, -200);

		// this.emitter.maxRotation = 360;
		// this.emitter.maxParticleAlpha = 1;
		// this.emitter.maxParticleScale = 1;
		// this.emitter.maxParticleSpeed = new Phaser.Point(200, 200);

		this.emitter.makeParticles('particle');
		this.emitter.start(false, 3000, 20);
	}
}
new Main();