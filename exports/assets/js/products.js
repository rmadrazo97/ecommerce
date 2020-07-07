function openProductModal(e) {
    let productId = e.id;
    $('#catModal').modal('hide');

    console.log(productId);
    var url = apiUrl + "action=view&object=products&id=" + productId;
    $.ajax({
        url: url,
        type: "GET",
        success: function (data, status, xhr) {
            if (data.success) {
                console.log(data.products)

                $('#modalProductTitle').text(data.products.name);
                $('#productName').text(data.products.name);
                $('#productPrice').text('Q ' + data.products.price);
                $('#productDescription').text(data.products.desc)
                $('#productImagesContainer').empty();

                //TODO: A forEach is necessary if there is going to be more than 1 image
                let imagesToAppend = '<div class="gallery">' +
                    '<div class="sp-wrap sp-selected sp-non-touch" style="display: inline-block;">' +
                    '<div class="sp-large" style="overflow: hidden; height: auto; width: auto;">' +
                    //! Big image - Don't change
                    //? Only change if you want to change the default selected image
                    '<a href="' + data.products.main_image + '" class="sp-current-big">' +
                    '<img src="' + data.products.main_image + '" />' +
                    '</a>' +
                    //! End of big image
                    '</div>' +
                    '<div class="sp-thumbs sp-tb-active">' +
                    '<a href="' + data.products.main_image + '" style="background-image:url(' + data.products.main_image + ')" class="sp-current">' +
                    '</a>' +
                    //? To add new images insert a new <a> in here                    
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('#productImagesContainer').append(imagesToAppend);

                $('#productoModal').modal();
            } //success 
            else {

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

/*
<div id="productImagesContainer" class="sp-wrap sp-non-touch" style="display: inline-block;">
    <div class="sp-large" style="overflow: hidden; height: auto; width: auto;">
        <a href="/tech/image1.jpg" class="sp-current-big">
            <img src="http://192.168.56.1:8000/tech/image1.jpg">
        </a>
    </div>
        <div class="sp-thumbs sp-tb-active">
            <a href="/tech/image1.jpg" style="background-image:url(/tech/image1.jpg)" class="sp-current"></a>
            <a href="/tech/image1.jpg" style="background-image:url(/tech/image1.jpg)" class=""></a>
            <a href="/tech/image1.jpg" style="background-image:url(/tech/image1.jpg)" class=""></a>
        </div>
    </div>
*/

/*
<div class="col-md-6" id="productImagesContainer">
    <div class="gallery">
        <div id="productImagesContainer" class="sp-wrap">
            <a href="tech/image1.jpg">
                <img class="img-fluid d-block mx-auto" src="tech/image1.jpg" />
            </a>
            <a href="tech/image1.jpg">
                <img class="img-fluid d-block mx-auto" src="tech/image1.jpg" />
            </a>
            <a href="tech/image1.jpg">
                <img class="img-fluid d-block mx-auto" src="tech/image1.jpg" />
            </a>
        </div>
    </div>
</div>
*/

/*
<div class="gallery">
    <div class="sp-wrap sp-selected sp-non-touch" style="display: inline-block;">
        <div class="sp-large" style="overflow: hidden; height: auto; width: auto;">
            <a href="/tech/image1.jpg" class="sp-current-big">
                <img src="http://192.168.56.1:8000/tech/image1.jpg" />
            </a>
        </div>
        <div class="sp-thumbs sp-tb-active">
            <a href="https://res.cloudinary.com/laplaza-on-gt/image/upload/v1593394050/products/ANT-MuyNoble-4Pack_hichis.png" style="background-image:url(https://res.cloudinary.com/laplaza-on-gt/image/upload/v1593394050/products/ANT-MuyNoble-4Pack_hichis.png
                )" class="">
            </a>
            <a href="/tech/image1.jpg" style="background-image:url(/tech/image1.jpg)" class="sp-current">
            </a>
            <a href="/tech/image1.jpg" style="background-image:url(/tech/image1.jpg)" class="">
            </a>
        </div>
    </div>
</div>
*/
