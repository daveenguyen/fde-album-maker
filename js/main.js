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

	function addTriangle() {
		var triangle = new fabric.Triangle({
			width: 20, height: 30, fill: 'blue', left: 50, top: 50
		});

		canvas.add(triangle);
	}

	function deleteSelected() {
		if (canvas.getActiveGroup() !== null) {
			canvas.getActiveGroup().forEachObject(function(o) {
				o.remove();
			});
			canvas.discardActiveGroup();
			canvas.renderAll();
		} else if (canvas.getActiveObject() !== null) {
			canvas.getActiveObject().remove();
			canvas.renderAll();
		}
	}


	var imgElement = document.getElementById('my-image');

	var mode;

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
			case 'delete':
				deleteSelected();
				break;
			default:
				break;
		}
	}

	$('#toolbar li').click(function (event) {
		mode = $(this).attr('mode');

		$('#toolbar li.active').removeClass('active');
		$(this).addClass('active');
		changeMode(mode);
	})
	
	canvas.renderAll();
}


$(document).ready(main);