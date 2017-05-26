class Root
{
	preload()
	{
		this.load.
		this.load.image('particle', 'assets/images/particle.png');
	}

	create()
	{
		this.stage.disableVisibilityChange = true;

		// var emitter = new Particle('particle');
		// var group = this.add.group();
		// group.addChild(emitter);

		// emitter.start();
		// emitter.position.set(this.world.centerX, this.world.centerY);
	}
}

class Main extends Phaser.Game
{
	constructor()
	{
		super(400, 500, Phaser.AUTO, 'phaserStage');
		this.state.add('Root', new Root);
		this.state.start('Root');
	}

	create()
	{
		// this.emitter.position.x = this.world.centerX;//position.x
		// this.emitter.position.y = this.world.centerY;//position.y
		// this.emitter.width = 0;//positionVar.x
		// this.emitter.height = 0;//positionVar.y

		// this.emitter.gravity = 0;

		// this.emitter.lifespan = 1000;
		// this.emitter.maxParticles = 70;

		// this.emitter.setXSpeed(0, 0);
		// this.emitter.setYSpeed(0, 100);

		// this.emitter.angle = 90 * Math.PI;

		// this.emitter.minParticleSpeed.set(Math.cos(360*Math.PI), Math.sin(360*Math.PI));

		// function(angle, speed) {
        // this.velocity.x = Math.cos(angle) * speed;
        // this.velocity.y = Math.sin(angle) * speed;
    	// }

    	// this.emitter.minParticleSpeed.x = Math.cos(45) * 100;
    	// this.emitter.minParticleSpeed.y = Math.sin(45) * 100;
		
		// this.emitter.minParticleSpeed.setTo(-100, -100);
		// this.emitter.maxParticleSpeed.setTo(100, 100);

		// this.emitter.minParticleScale = 0.0;
		// this.emitter.maxParticleScale = 1.0;

		// this.emitter.minParticleAlpha = 0.0;
		// this.emitter.maxParticleAlpha = 1.0;

		// this.emitter.minRotation = -360;
		// this.emitter.maxRotation = 360;

		// this.emitter.on = true;
		// var t = this.emitter;
		// this.time.events.add(2000, function() { t.on = false; console.log('entrou?'); });

		// this.emitter.makeParticles('particle');
		// this.emitter.start(false, 2000, 100, 20);
		// this.emitter.flow();
	}
}
var game = new Main();