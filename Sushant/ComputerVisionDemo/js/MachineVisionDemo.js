$(document).ready(function(){

	// Accepted File Types for Image Upload
	window.acceptedMimes = ["image/png", "image/jpeg"];

	// Function that Uploads Image on Drop/Click
	function uploadData(formdata){
		$(".table-container").hide();
		$(".globalOverlay").css("display", "flex");
		// TODO: This snippet receives some dummy data from JSON file, please modify it according to your needs
		jQuery.ajax({
	        url: 'ServerResponse.json?timestamp='+(new Date()).getTime(), // DUMMY Endpoint
	        type: 'get', // TODO: Please change it to POST in order to upload image genuinely
	        data: formdata,
	        contentType: false,
	        processData: false,
	        dataType: 'json',
	        success: function(response){
	            // console.log(response);
	            generateTable(response);
	        },
	        error: function(response, status, error){
	            console.log(error);
	        }
	    });
	}

	function getDataByImage(image_id){
		$(".table-container").hide();
		$(".globalOverlay").css("display", "flex");
		// TODO: This snippet receives some dummy data from JSON file, please modify it according to your needs
		jQuery.ajax({
	        url: 'ServerResponse.json?timestamp='+(new Date()).getTime(), // DUMMY Endpoint
	        type: 'get',
	        data: {image_id: image_id},
	        contentType: false,
	        processData: false,
	        dataType: 'json',
	        success: function(response){
	            // console.log(response);
	            generateTable(response);
	        },
	        error: function(response, status, error){
	            console.log(error);
	        }
	    });
	}

	// Show the table with Confusion Data
	function generateTable(jsonData){
		$tbody = "";
		Object.keys(jsonData).forEach(function(key) {
			$tbody += "<tr>";
		    $tbody += "  <th scope=\"row\">"+ key +"</th>";
		    $tbody += "  <td>"+ jsonData[key] +"</td>";
		    $tbody += "</tr>";
		});

		$(".table-container").find("tbody").html($tbody);
		$(".table-container").show();
		$(".globalOverlay").hide();
	}




	$('.image-uploader .upload-box').on('click', function(e){
		$('#imageInput').click();
	});

	// preventing page from redirecting
	$("html").on("dragover", function(e) {
		e.preventDefault();
		e.stopPropagation();
		$("#uploadArea").text("Drop here to upload");
	});

	$("html").on("drop", function(e) { 
		e.preventDefault(); 
		e.stopPropagation(); 
		$("#uploadArea").text($("#uploadArea").data('text'));
	});

    $('#uploadArea').on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("#uploadArea").text($("#uploadArea").data('text'));

        // Handle the file
        var file = e.originalEvent.dataTransfer.files;

        if (file.length > 0){ // If a real file has been dropped
			var fd = new FormData();
	        var singleFile = file[0];
	        // Validate file type against Mimes
	        if (window.acceptedMimes.indexOf(singleFile.type) > -1){
				fd.append('file', singleFile);
	        	uploadData(fd);
	        }
        }
    });

    $("#imageInput").change(function(){
        var file = $('#imageInput')[0].files[0];
        console.log(file);

        // Validate file type against Mimes
        if (window.acceptedMimes.indexOf(file.type) > -1){
        	var fd = new FormData();
			fd.append('file', file);
        	uploadData(fd);
        }
    });

    $(".imageContainer img").on('click', function(e){
    	var image_id = $(this).data('imageid');
    	getDataByImage(image_id);
    })
});