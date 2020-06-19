function getCategories() {
    $('#index-categoriesRow').empty();
    console.log('Getting Categories...');
    var url = apiUrl + "action=list&object=categories";
    const folder = 'Categories/';
    $.ajax({
        url: url,
        type: "GET",
        success: function (data, status, xhr) {
            if (data.success) {
                console.log(data);

                // *Save categories in local storage
                localStorage.setItem('categories', JSON.stringify(data.categories));

                data.categories.forEach(function (category, index) {
                    let url = imgUrl + folder + category.image;
                    let toAppend = '<div class="col d-block col-6 col-md-3 col-sm-6 pt-1 pb-1 catCol" onclick="location.href=&#39;category.html?category=' + category.id + '&#39;;">' +
                        '<img class="d-block img-responsive center-block" src="' + url + '" width="100%" /></div>';
                    $('#index-categoriesRow').append(toAppend)
                });

                ;
            } //success 
            else {
                anonymousLogin();
            } //else success					
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error:" + thrownError);

        },
        beforeSend: function (request) { // Set JWT header
            // mandar Token de autenticacion
            request.setRequestHeader('Authorization', 'Bearer ' + token);
        }
    });
}

function getSubcategories() {
    $('#category-subcategoriesRow').empty();
    $('#category-bannerContainer').empty();

    console.log('GET Subcategories...');

    const queryString = window.location.search;
    console.log("query string: " + queryString);
    const urlParams = new URLSearchParams(queryString);
    const categoryID = urlParams.get('category')
    console.log("category id: " + categoryID);

    //* Insert portada image     
    const chosenCategory = categoriesList.find((category) => category.id === categoryID)
    const bannerFolder = 'Banners/';
    let finalBannerUrl = bannerUrl + bannerFolder + chosenCategory.portada;
    let toAppend = '<img class="shadow-lg" src="' + finalBannerUrl + '" style="width: 95%; border-radius: 15px;" />';
    $('#category-bannerContainer').append(toAppend);


    var subcategoryUrl = apiUrl + "action=list&object=sub_categories&category=" + categoryID;
    const subcategoryFolder = 'SubCategories/';
    $.ajax({
        url: subcategoryUrl,
        type: "GET",
        success: function (data, status, xhr) {
            if (data.success) {
                console.log(data);


                if (data.sub_categories.length > 0) {
                    let titleToAppend = '<h1 class="ml-2">Sub Categorías</h1>';
                    $('#category-subcategoriesTitle').append(titleToAppend);
                } else {
                    $('#category-subcategoriesTitle').empty()
                }




                //* Insert subcategory images
                data.sub_categories.forEach(function (subcategory, index) {
                    let url = imgUrl + subcategoryFolder + subcategory.imagen;
                    let toAppend = '<div class="col d-block col-6 col-md-3 col-sm-6 pt-1 pb-1 catCol" onclick="#">' +
                        '<img class="d-block img-responsive center-block" src="' + url + '" width="100%" /></div>';
                    $('#category-subcategoriesRow').append(toAppend)
                });

            } //success 
            else {
                anonymousLogin();
            } //else success					
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error:" + thrownError);

        },
        beforeSend: function (request) { // Set JWT header
            // mandar Token de autenticacion
            request.setRequestHeader('Authorization', 'Bearer ' + token);
        }
    });
}