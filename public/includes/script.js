/*
 $(function () {
	 
	//get params from form
	var sx = $('#X');
	var sy = $('#Y');
	var iter = $('#iterations');
	var ex = -1;
	var ey = -1;
	var width = 0;
	var height = 0;
	
	//user pressd Get button
    $('#getPic').click(function (e) {
        e.preventDefault();	
		
		//url for get request
		var $fullUrl = '/api/server/' +sx.val()+ '/' +ex+ '/' +sy.val()+ '/' +ey+ '/' +iter.val()+ '/' +width+ '/' +height
		console.log($fullUrl)
		
		//validation - make sure user typed all fields
		if ((!sx.val()) || (!sy.val()) || (!iter.val()))
		{
			alert('please fill in all fields');
			return false;
		}
	
		//validation-ok, get the pic
        else
		{
			//get pic
			$.ajax({
				type: 'GET',
				url: $fullUrl,
				success: function () {
					alert('success getting pic');
				},
				error: function () {
					alert('error getting pic');
				}
			});
		}
	});
	
	//if user pressed zoom-in or out

	//if user cliked on reset button
	$('#reset').click(function (e) {
		
	});
});
*/
var vars = [];
var sx = 0, ex = 1, sy = 2, ey = 3, iter = 4, w = 5, h = 6;

 $(function () {
 	vars[sx]= -1;
	 vars[ex] = 1;
	 vars[sy]= -1;
	 vars[ey] = 1;
	 vars[iter]= iterations;
	 vars[w] = width;
	 vars[h] = height;
	 updateImage();

	 $('#back').click(function (e) {
		 vars[sx] -= 0.1*(vars[ex] - vars[sx]);
		 vars[ex] -= 0.1*(vars[ex] - vars[sx]);
		 updateImage();
	});

	 $('#forward').click(function (e) {
		 vars[sx] += 0.1*(vars[ex] - vars[sx]);
		 vars[ex] += 0.1*(vars[ex] - vars[sx]);
		 
		 updateImage();
	 });

	 $('#up').click(function (e) {
		 vars[sy] -= 0.1*(vars[ey] - vars[sy]);
		 vars[ey] -= 0.1*(vars[ey] - vars[sy]);
		 updateImage();
	 });

	 $('#down').click(function (e) {
		 vars[sy] += 0.1*(vars[ey] - vars[sy]);
		 vars[ey] += 0.1*(vars[ey] - vars[sy]);
		 updateImage();
	 });

	 $('#zoomin').click(function (e) {
		 vars[sx] += 0.1*(vars[ex] - vars[sx]);
		 vars[ex] -= 0.1*(vars[ex] - vars[sx]);

		 vars[sy] += 0.1*(vars[ey] - vars[sy]);
		 vars[ey] -= 0.1*(vars[ey] - vars[sy]);
		updateImage();
	 });

	 $('#zoomout').click(function (e) {
		 vars[sx] -= 0.1*(vars[ex] - vars[sx]);
		 vars[ex] += 0.1*(vars[ex] - vars[sx]);

		 vars[sy] -= 0.1*(vars[ey] - vars[sy]);
		 vars[ey] += 0.1*(vars[ey] - vars[sy]);
		 updateImage();
	 });
 });

 
//form validation
 $(function () {
	 
	//get params from form
	var sx = $('#xParts');
	var sy = $('#yParts');
	var iter = $('#iterations');
	
	//user pressd Get button
    $('#getPic').click(function (e) {
        e.preventDefault();			
		if ((!sx.val()) || (!sy.val()) || (!iter.val()))
		{
			alert('please fill in all fields');
			return false;
		}
	});

});

function genUri(){
	return '/' + vars.join('/');
}

function updateImage(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			var arrayBuffer = this.response;
			var bytes = new Uint8Array(arrayBuffer);
			var blob        = new Blob([bytes.buffer]);

			var reader = new FileReader();
			reader.onload = function(e) {
				document.getElementById('mandelbrot').src = e.target.result;
			};
			reader.readAsDataURL(blob);
		}
	}
	xhr.open('GET', genUri());
	xhr.responseType = 'arraybuffer';
	xhr.send();
}

