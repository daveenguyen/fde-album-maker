function main() {

	var canvas = new fabric.Canvas('canvas', {
		width: 500,
		height: 500,
	});

	var square = new fabric.Rect({
		left: 100,
		top: 100,
		fill: 'blue',
		width: 20,
		height: 20,
		angle: 45
	});

	var circle = new fabric.Circle({
	  radius: 20, fill: 'green', left: 100, top: 100
	});

	var triangle = new fabric.Triangle({
	  width: 20, height: 30, fill: 'blue', left: 50, top: 50
	});

	var imgElement = document.getElementById('my-image');
	
	var mode = 'square';

	function changeMode(mode) {
		switch(mode) {
			case 'square':
				canvas.add(square);
				break;
			case 'circle':
				canvas.add(circle);
				break;
			case 'triangle':
				canvas.add(triangle);
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