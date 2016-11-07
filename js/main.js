function main() {

	var mode = 'square';

	$('#toolbar li').click(function (event) {
		mode = $(this).attr('mode');

		$('#toolbar li.active').removeClass('active');
		$(this).addClass('active');
		
		console.log(mode);
	})

	var canvas = new fabric.Canvas('canvas', {
		width: 500,
		height: 500,
	});

	var rect = new fabric.Rect({
		left: 100,
		top: 100,
		fill: 'blue',
		width: 20,
		height: 20,
		angle: 45,
		selectable: false
	});

	var circle = new fabric.Circle({
	  radius: 20, fill: 'green', left: 100, top: 100
	});

	var triangle = new fabric.Triangle({
	  width: 20, height: 30, fill: 'blue', left: 50, top: 50
	});

	var imgElement = document.getElementById('my-image');
	imgElement
		.addEventListener('load', function() {

			var imgInstance = new fabric.Image(imgElement, {
			  left: 10,
			  top: 10,
			  angle: 30,
			  opacity: 0.85
			});
			canvas.add(imgInstance);

		 }, false);
	
	
	canvas.add(circle, triangle);
	canvas.add(rect);
	canvas.renderAll();
}


$(document).ready(main);