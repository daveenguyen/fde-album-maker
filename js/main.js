function main() {

	var canvas = new fabric.Canvas('canvas', {
		width: 500,
		height: 500,
	});

	function addSquare() {
		var square = new fabric.Rect({
			left: 100,
			top: 100,
			fill: 'red',
			width: 20,
			height: 20,
			angle: 45
		});

		canvas.add(square);
	}

	function addCircle() {
		var circle = new fabric.Circle({
		  radius: 20, fill: 'green', left: 100, top: 100
		});

		canvas.add(circle);
	}

	function addTriangle() {
		var triangle = new fabric.Triangle({
			width: 20, height: 30, fill: 'blue', left: 50, top: 50
		});

		canvas.add(triangle);
	}

	function addText() {
		var text = new fabric.Text('Hello world', {
			left: 100,
			top: 100,
			fill: '#f55',
			angle: 15
		});

		canvas.add(text);
	}

	function addImage() {
		var url = './img/img.png';
		fabric.Image.fromURL(url, function(oImg) {
			oImg.scaleToHeight(canvas.getHeight());
			canvas.add(oImg);
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
			canvas.renderAll();
		}
	}

	function moveToFront() {
		if (canvas.getActiveGroup()) {
			canvas.getActiveGroup().forEachObject(function(o) {
				canvas.bringToFront(o);
				canvas.renderAll();
			});
			canvas.renderAll();
		} else if (canvas.getActiveObject()) {
			canvas.bringToFront(canvas.getActiveObject());
			canvas.renderAll();
		}
	}

	function moveForward() {
		if (canvas.getActiveGroup()) {
			canvas.getActiveGroup().forEachObject(function(o) {
				canvas.bringForward(o);
				canvas.renderAll();
			});
			canvas.renderAll();
		} else if (canvas.getActiveObject()) {
			canvas.bringForward(canvas.getActiveObject());
			canvas.renderAll();
		}
	}

	function moveBackwards() {
		if (canvas.getActiveGroup()) {
			canvas.getActiveGroup().forEachObject(function(o) {
				canvas.sendBackwards(o);
				canvas.renderAll();
			});
			canvas.renderAll();
		} else if (canvas.getActiveObject()) {
			canvas.sendBackwards(canvas.getActiveObject());
			canvas.renderAll();
		}
	}
	function moveToBack() {
		if (canvas.getActiveGroup()) {
			canvas.getActiveGroup().forEachObject(function(o) {
				canvas.sendToBack(o);
				canvas.renderAll();
			});
			canvas.renderAll();
		} else if (canvas.getActiveObject()) {
			canvas.sendToBack(canvas.getActiveObject());
			canvas.renderAll();
		}
	}



	function changeMode(mode) {
		switch(mode) {
			case 'square':
				addSquare();
				break;
			case 'circle':
				addCircle();
				break;
			case 'triangle':
				addTriangle();
				break;
			case 'text':
				addText();
				break;
			case 'image':
				addImage();
				break;
			default:
				break;
		}
	}

	function performAction(action) {
		switch(action) {
			case 'delete':
				deleteSelected();
				break;
			case 'front':
				moveToFront();
				break;
			case 'forward':
				moveForward();
				break;
			case 'backwards':
				moveBackwards();
				break;
			case 'back':
				moveToBack();
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

			if (selectedObj.get('type') === 'text') {
				$('#obj-text').val(selectedObj.getText());
			}
		}
	})

	$('#obj-text').change(function (e) {
		if (canvas.getActiveObject().get('type') === 'text') {
			var selectedObj = canvas.getActiveObject();
			selectedObj.set('text', this.value);
			canvas.renderAll();
		}
	})

	$('#obj-color').change(function (e) {
		if (canvas.getActiveObject()) {
			var selectedObj = canvas.getActiveObject();
			var color = this.value;
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

	canvas.renderAll();
}

$(document).ready(main);
