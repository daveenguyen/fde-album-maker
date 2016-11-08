function main() {

	var canvas = new fabric.Canvas('canvas', {
		width: 500,
		height: 500,
	});

	function addShape(shape) {
		var shapeObj;
		switch (shape) {
			case 'square':
				shapeObj = new fabric.Rect({
					width: 100,
					height: 100,
					fill: 'red'
				});
				break;
			case 'circle':
				shapeObj = new fabric.Circle({
					radius: 100,
					fill: 'green'
				});
				break;
			case 'triangle':
				shapeObj = new fabric.Triangle({
					width: 100,
					height: 100,
					fill: 'blue'
				});
				break;
			default:
				shapeObj = new fabric.Rect({
					width: 100,
					height: 100,
					fill: 'red'
				});
				break;
		}

		canvas.add(shapeObj);
		canvas.setActiveObject(shapeObj);
	}

	function addText() {
		var text = new fabric.Text('Hello world', {
			fill: '#f55'
		});

		canvas.add(text);
		canvas.setActiveObject(text);
	}

	function addImage(url) {
		fabric.Image.fromURL(url, function(oImg) {
			oImg.scaleToHeight(canvas.getHeight());
			canvas.add(oImg);
			canvas.setActiveObject(oImg);
		});
	}

	function deleteSelected() {
		if (canvas.getActiveGroup()) {
			canvas.getActiveGroup().forEachObject(function(o) {
				o.remove();
			});
			canvas.discardActiveGroup();
			canvas.renderAll();
		} else if (canvas.getActiveObject()) {
			canvas.getActiveObject().remove();
		}
	}

	var vaporlinks = [
		'http://i.imgur.com/lTO9Plf.png',
		'https://levels.io/wp-content/uploads/2015/10/tumblr_nv2cqhOJPL1ufh7yno1_1280.png',
		'https://levels.io/wp-content/uploads/2015/10/tumblr_nv2cqhOJPL1ufh7yno1_1280.png',
		'http://www.imgbase.info/images/safe-wallpapers/digital_art/1_miscellaneous_digital_art/55905_1_miscellaneous_digital_art_vaporwave.jpg',
		'http://neologisms.blogs.wm.edu/files/2016/03/vaporwave-1.jpg',
		'https://levels.io/wp-content/uploads/2015/10/374ff939767463b4a196cdc217d042dd.jpg'
	];

	function addVaporwaveBg() {
		var imgUrl = vaporlinks[Math.floor(Math.random()*vaporlinks.length)];
		addImage(imgUrl);
	}

	function changeMode(mode) {
		switch(mode) {
			case 'square':
				addShape('square');
				break;
			case 'circle':
				addShape('circle');
				break;
			case 'triangle':
				addShape('triangle');
				break;
			case 'text':
				addText();
				break;
			case 'image':
				addImage('./img/img.png');
				break;
			case 'vaporize':
				addVaporwaveBg();
				break;
			default:
				break;
		}
	}

	function changeObjectLayer(direction) {
		var changeLayer = function(obj) {
			switch (direction) {
				case 'front':
					canvas.bringToFront(obj);
					break;
				case 'forward':
					canvas.bringForward(obj);
					break;
				case 'back':
					canvas.sendToBack(obj);
					break;
				case 'backwards':
					canvas.sendBackwards(obj);
					break;
				default:
					canvas.bringToFront(obj);
					break;
			}
		}

		if (canvas.getActiveGroup()) {
			canvas.getActiveGroup().forEachObject(function(o) {
				changeLayer(o);
				canvas.discardActiveGroup();
			});
			canvas.renderAll();
		} else if (canvas.getActiveObject()) {
			changeLayer(canvas.getActiveObject());
			canvas.discardActiveObject();
			canvas.renderAll();
		}
	}

	function performAction(action) {
		switch(action) {
			case 'delete':
				deleteSelected();
				break;
			case 'front':
				changeObjectLayer('front');
				break;
			case 'forward':
				changeObjectLayer('forward');
				break;
			case 'backwards':
				changeObjectLayer('backwards');
				break;
			case 'back':
				changeObjectLayer('back');
				break;
			default:
				break;
		}
	}

	canvas.on('object:selected', function(e) {
		var selectedObj = canvas.getActiveObject();
		if (selectedObj) {
			var color = '#' + new fabric.Color(selectedObj.getFill()).toHex();
			$('#obj-color').val(color);

			switch(selectedObj.get('type')) {
				case 'text':
					$('#input-label').text('Text');
					if ($('#input-wrapper').hasClass('invisible')) $('#input-wrapper').removeClass('invisible');
					$('#obj-text').val(selectedObj.getText());
					break;
				case 'image':
					$('#input-label').text('URL');
					if ($('#input-wrapper').hasClass('invisible')) $('#input-wrapper').removeClass('invisible');
					$('#obj-text').val('');
					break;
				default:
					if (!$('#input-wrapper').hasClass('invisible')) $('#input-wrapper').addClass('invisible');
					break;
			}
		}
	})

	$('#obj-text').change(function (e) {
		if (canvas.getActiveObject().get('type') === 'text') {
			var selectedObj = canvas.getActiveObject();
			selectedObj.set('text', $(this).val());
			canvas.renderAll();
		} else if (canvas.getActiveObject().get('type') === 'image') {
			var selectedObj = canvas.getActiveObject();
			selectedObj.remove();
			addImage($(this).val());
		}
	})

	$('#obj-text').keyup(function (e) {
		$(this).change();
	})

	$('#obj-color').change(function (e) {
		if (canvas.getActiveObject()) {
			var selectedObj = canvas.getActiveObject();
			var color = $(this).val();
			selectedObj.set('fill', color);
			canvas.renderAll();
		}
	})

	$('.navbar-left li').click(function (e) {
		e.preventDefault();

		$('.navbar-left li.active').removeClass('active');
		$(this).addClass('active');

		var mode = $(this).attr('mode');
		changeMode(mode);
	});

	$('.navbar-right li').click(function (e) {
		e.preventDefault();

		var action = $(this).attr('action');
		performAction(action);
	});
}

$(document).ready(main);
