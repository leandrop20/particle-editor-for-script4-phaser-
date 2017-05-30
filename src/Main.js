class Main extends Script4
{
	static get imports() { return [
		'src/Assets',
		'src/Root'
		//IMPORT YOUR CLASSES HERE!
	]; };

	constructor()
	{
		super(Root, 400, 500, null, 'phaserStage');
		this.setShowStats = true;
		this.start();
	}
}