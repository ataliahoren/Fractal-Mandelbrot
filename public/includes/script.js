var vars = [];
var sx = 0, ex = 1, sy = 2, ey = 3, iter = 4, w = 5, h = 6;

 $(function () {
 	vars[sx]= -1;
	 vars[ex] = 1;
	 vars[sy]= -1;
	 vars[ey] = 1;
	 vars[iter]= 200;
	 vars[w] = 500;
	 vars[h] = 500;
	 updateImage();
	 
	//get params from form
	var sxForm = $('#xParts');
	var syForm = $('#yParts');
	var iterForm = $('#iterations');
	 
	//user pressd Get button
    $('#getPic').click(function (e) {
        e.preventDefault();			
		if ((!sxForm.val()) || (!syForm.val()) || (!iterForm.val()))
		{
			alert('please fill in all fields');
			return false;
		}
		else 
		{
			vars[iter]= iterForm.val();
			vars[w] = syForm.val();
			vars[h] = sxForm.val();
			updateImage();		
			console.log("im done");
		}
	});

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

