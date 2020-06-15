
function getCategories() {
	
    console.log('Getting Categories...');
    var url = apiUrl + "action=list&object=categories";
    $.ajax({
        url: url,
        type: "GET",
        success: function (data, status, xhr) {
            if (data.success) {
                console.log(data);

            } //success 
            else {
                anonymousLogin();
            } //else success					
        },
        error: function (xhr, ajaxOptions, thrownError) {


        },
        beforeSend: function (request) { // Set JWT header
        	// mandar Token de autenticacion
            request.setRequestHeader('Authorization', 'Bearer ' + token);
        }
    });
}