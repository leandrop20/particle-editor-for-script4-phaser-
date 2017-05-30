const OPTIONS = [
	{ id: 'positionX', min: 0, max: 400, step: 1},
	{ id: 'positionY', min: 0, max: 500, step: 1},
	{ id: 'positionVarX', min: 0, max: 1000, step: 1},
	{ id: 'positionVarY', min: 0, max: 1000, step: 1},
	{ id: 'angle', min: 0, max: 360, step: 1},
	{ id: 'angleVar', min: 0, max: 360, step: 1},
	{ id: 'speed', min: 0, max: 500, step: 1},
	{ id: 'speedVar', min: 0, max: 500, step: 1},
	{ id: 'life', min: 0, max: 10, step: 0.1},
	{ id: 'lifeVar', min: 0, max: 10, step: 0.1},
	{ id: 'count', min: 0, max: 300, step: 1},
	{ id: 'duration', min: 0, max: 10, step: 0.1},
	{ id: 'rate', min: 0, max: 1, step: 0.01},

	{ id: 'velRotate', min: 0, max: 100, step: 1},
	{ id: 'velRotateVar', min: 0, max: 100, step: 1},
	{ id: 'rotate', min: 0, max: 100, step: 1},
	{ id: 'rotateVar', min: 0, max: 100, step: 1},
	{ id: 'startScale', min: 0, max: 2, step: 0.01},
	{ id: 'startScaleVar', min: 0, max: 2, step: 0.01},
	{ id: 'endScale', min: 0, max: 2, step: 0.01},
	{ id: 'endScaleVar', min: 0, max: 2, step: 0.01},
	{ id: 'accelAngle', min: -500, max: 500, step: 1},
	{ id: 'accelAngleVar', min: -500, max: 500, step: 1},
	{ id: 'accelSpeed', min: -500, max: 500, step: 1},
	{ id: 'accelSpeedVar', min: -500, max: 500, step: 1},

	{ id: 'startColorR', min: 0, max: 255, step: 1},
	{ id: 'startColorG', min: 0, max: 255, step: 1},
	{ id: 'startColorB', min: 0, max: 255, step: 1},
	{ id: 'startAlpha', min: 0, max: 1, step: 0.01},
	{ id: 'endColorR', min: 0, max: 255, step: 1},
	{ id: 'endColorG', min: 0, max: 255, step: 1},
	{ id: 'endColorB', min: 0, max: 255, step: 1},
	{ id: 'endAlpha', min: 0, max: 1, step: 0.01}
];

class Root extends Sprite
{

	constructor()
	{
		super();
		document.getElementById('title').textContent = "Particle Editor for Script4 (Phaser) v0.1 Beta";
		this.game.stage.backgroundColor = "0x000000";
		var _this = this;
		this.idExternalTexture = 0;

		this.loadSettings(core.cache.getJSON('particleSettings'));

		this.particle = new PDParticleSystem('particle');
		this.particle.x = Script4.width*0.5;
		this.particle.y = Script4.height*0.5;
		this.addChild(this.particle);
		this.particle.start(0);

		$('input').change(function(e) { _this.onDrag({ target:e.target, value:e.value.newValue, obj:_this }); });
		$('select').change(function(e) { _this.onDrag({ target:e.target, value:$(e.target).val(), obj:_this }); });
		$('#btExport').click(function(e) { _this.exportJson(_this.particle); });
		$('#btImport').click(function(e) { _this.importJson(_this); });
		$('#btLoadTexture').click(function(e) { _this.importTexture(_this); });
		$('#btTextureDefault').click(function(e) { _this.particle.texture = 'particle'; });
	}

	loadSettings(jsonData)
	{
		for (var key in jsonData) {
			if (key == 'startColor') {
				var dataR = getById('startColorR');var dataG = getById('startColorG');var dataB = getById('startColorB');
				$('#startColorR').slider({ min:dataR.min, max:dataR.max, value: jsonData[key][0] });
				$('#startColorG').slider({ min:dataG.min, max:dataG.max, value: jsonData[key][1] });
				$('#startColorB').slider({ min:dataB.min, max:dataB.max, value: jsonData[key][2] });
			} else if (key == 'endColor') {
				var dataR = getById('endColorR');var dataG = getById('endColorG');var dataB = getById('endColorB');
				$('#endColorR').slider({ min:dataR.min, max:dataR.max, value: jsonData[key][0] });
				$('#endColorG').slider({ min:dataG.min, max:dataG.max, value: jsonData[key][1] });
				$('#endColorB').slider({ min:dataB.min, max:dataB.max, value: jsonData[key][2] });
			} else if (key == 'blendMode') {
				$('#blendMode').val(jsonData[key]);
			} else {
				var data = getById(key);
				$('#' + key).slider({ min:data.min, max:data.max, value:jsonData[key] });
			}
		}
		function getById(id) { for(var i=0;i<OPTIONS.length;i++) { if (id==OPTIONS[i].id) { return OPTIONS[i]; } } }
	}

	onDrag(e)
	{
		switch (e.target.id) {
			case 'positionX': e.obj.particle.position.x = e.value; break;
			case 'positionY': e.obj.particle.position.y = e.value; break;
			case 'positionVarX': e.obj.particle.positionVar.x = e.value; break;
			case 'positionVarY': e.obj.particle.positionVar.y = e.value; break;
			case 'angle': e.obj.particle.angle = ((e.value/180)*Math.PI)-Math.PI; break;
			case 'angleVar': e.obj.particle.angleVar = ((e.value/360)*Math.PI); break;
			case 'speed': e.obj.particle.speed = e.value; break;
			case 'speedVar': e.obj.particle.speedVar = e.value; break;
			case 'life': e.obj.particle.life = e.value; break;
			case 'lifeVar': e.obj.particle.lifeVar = e.value; break;
			case 'count': e.obj.particle.count = e.value; break;
			// case 'duration': e.obj.particle.duration = e.value; break;
			case 'rate': e.obj.particle.rate = e.value; break;
			// case 'velRotate': e.obj.particle.velRotate = e.value; break;
			// case 'velRotateVar': e.obj.particle.velRotateVar = e.value; break;
			case 'rotate': e.obj.particle.rotate = e.value; break;
			case 'rotateVar': e.obj.particle.rotateVar = e.value; break;
			case 'startScale': e.obj.particle.startScale = e.value; break;
			case 'startScaleVar': e.obj.particle.startScaleVar = e.value; break;
			case 'endScale': e.obj.particle.endScale = e.value; break;
			case 'endScaleVar': e.obj.particle.endScaleVar = e.value; break;
			case 'accelAngle': e.obj.particle.accelAngle = e.value; break;
			case 'accelAngleVar': e.obj.particle.accelAngleVar = e.value; break;
			case 'accelSpeed': e.obj.particle.accelSpeed = e.value; break;
			case 'accelSpeedVar': e.obj.particle.accelSpeedVar = e.value; break;
			case 'startColorR': e.obj.particle.startColor[0] = e.value; break;
			case 'startColorG': e.obj.particle.startColor[1] = e.value; break;
			case 'startColorB': e.obj.particle.startColor[2] = e.value; break;
			case 'startAlpha': e.obj.particle.startAlpha = e.value; break;
			case 'endColorR': e.obj.particle.endColor[0] = e.value; break;
			case 'endColorG': e.obj.particle.endColor[1] = e.value; break;
			case 'endColorB': e.obj.particle.endColor[2] = e.value; break;
			case 'endAlpha': e.obj.particle.endAlpha = e.value; break;
			case 'blendMode': e.obj.particle.blendMode = e.value; break;
		}
	}

	importJson(_this)
	{
		function loading(evt) {
            var reader = new FileReader();
            reader.onload = function(e) {
            	var data = JSON.parse(e.target.result);
                _this.loadSettings(data);
                for (var key in data) {
                	if (key == 'startColor') {
                		_this.onDrag({ target:document.getElementById('startColorR'), value:data['startColor'][0], obj:_this });
                		_this.onDrag({ target:document.getElementById('startColorG'), value:data['startColor'][1], obj:_this });
                		_this.onDrag({ target:document.getElementById('startColorB'), value:data['startColor'][2], obj:_this });
                	} else if (key == 'endColor') {
                		_this.onDrag({ target:document.getElementById('endColorR'), value:data['endColor'][0], obj:_this });
                		_this.onDrag({ target:document.getElementById('endColorG'), value:data['endColor'][1], obj:_this });
                		_this.onDrag({ target:document.getElementById('endColorB'), value:data['endColor'][2], obj:_this });
                	} else {
                		_this.onDrag({ target:document.getElementById(key), value:data[key], obj:_this });
                	}
                }
            }
            reader.readAsBinaryString(evt.target.files[0]);
        }
        var input = document.createElement('input');
        input.type = 'file';
        input.id = 'file';
        input.style.display = 'none';
        input.click();
        document.body.appendChild(input);
        input.addEventListener('change', loading, false);
	}

	exportJson(particle)
	{
		var objExport = {
			positionX: particle.position.x, positionY: particle.position.y,
			positionVarX: particle.positionVar.x, positionVarY: particle.positionVar.y,
			angle: Math.floor(((particle.angle/Math.PI)*180)+180), angleVar: Math.floor(((particle.angleVar/Math.PI)*360)),
			speed: particle.speed, speedVar: particle.speedVar,
			life: particle.life, lifeVar: particle.lifeVar,
			count: particle.count,
			duration: particle.duration,
			rate: particle.rate,
			velRotate: particle.velRotate, velRotateVar: particle.velRotateVar,
			rotate: particle.rotate, rotateVar: particle.velRotateVar,
			startScale: particle.startScale, startScaleVar: particle.startScaleVar,
			endScale: particle.endScale, endScaleVar: particle.endScaleVar,
			accelAngle: particle.accelAngle, accelAngleVar: particle.accelAngleVar,
			accelSpeed: particle.accelSpeed, accelSpeedVar: particle.accelSpeedVar,
			startColor: particle.startColor, endColor: particle.endColor,
			startAlpha: particle.startAlpha, endAlpha: particle.endAlpha,
			blendMode: particle.blendMode
		};

		var blob = new Blob([JSON.stringify(objExport)]);
        var send = document.createElement("a");
        send.href = window.URL.createObjectURL(blob);
        send.download = 'particleSettings.json';
        send.click();
	}

	importTexture(_this)
	{
		function loading2(evt) {
            var reader = new FileReader();
            reader.onload = function(evt) {
                var img = document.createElement('img');
                var dataURL = evt.target;
                var mimeType = dataURL.result.split(",")[0].split(":")[1].split(";")[0];
                if (mimeType != 'image/png') {
                    //Error
                } else {
                    img.src = dataURL.result;
                    if (img.width <= 100 && img.height <= 100) {
                    	var loaderTexture = new Phaser.Loader(_this.game);
                    	_this.idExternalTexture++;
                    	loaderTexture.image('newTexture' + _this.idExternalTexture, dataURL.result);
                    	loaderTexture.onLoadComplete.addOnce(onLoaded);
                    	loaderTexture.start();
                    	function onLoaded(e)
                    	{
                    		_this.particle.texture = 'newTexture' + _this.idExternalTexture;
                    		document.body.removeChild(input);
                    	}
                    }
                }
            }
            reader.readAsDataURL(evt.target.files[0]);
        }
        var input = document.createElement('input');
        input.type = 'file';
        input.id = 'file2';
        input.style.display = 'none';
        input.click();
        document.body.appendChild(input);
        document.getElementById('file2').addEventListener('change', loading2, false);
	}
}