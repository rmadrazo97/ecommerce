function saveCategories() {
    console.log('Getting Categories...');
    var url = apiUrl + "action=list&object=categories";
    $.ajax({
        url: url,
        type: "GET",
        success: function (data, status, xhr) {
            if (data.success) {
                console.log(data);

                // *Save categories in local storage
                localStorage.setItem('categories', JSON.stringify(data.categories));
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


function getCategories() {
    $('#index-categoriesRow').empty();
    console.log('Getting Categories...');

    const folder = 'Categories/';
    categoriesList.forEach(function (category, index) {
        let url = imgUrl + folder + category.image;
        let toAppend = '<div class="col d-block col-6 col-md-3 col-sm-6 pt-1 pb-1 catCol" onclick="location.href=&#39;category.html?category=' + category.id + '&#39;;">' +
            '<img class="d-block img-responsive center-block" src="' + url + '" width="100%" /></div>';
        $('#index-categoriesRow').append(toAppend)
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
    console.log('subcat: ' + subcategoryUrl);

    const folder = 'SubCategories/';
    $.ajax({
        url: subcategoryUrl,
        type: "GET",
        success: function (data, status, xhr) {
            if (data.success) {
                console.log(data);

                console.log('length:' + data.sub_categories.length);

                //* Insert "Subcategorias" title if there are categories
                if (data.sub_categories.length > 0) {
                    let titleToAppend = '<h1 class="ml-2">Sub Categorías</h1>';
                    $('#category-subcategoriesTitle').append(titleToAppend);
                } else {
                    $('#category-subcategoriesTitle').empty()
                }

                //? Add all content related to the subcategories. Can this be optimized? 
                data.sub_categories.forEach(function (subcategory, index) {
                    let noSpaceName = subcategory.name.replace(/ /g, "");; //? Remove whitespaces from subcategory name to use it as a ID
                    //* Add each subcategory card below banner
                    let url = imgUrl + folder + subcategory.imagen;
                    let toAppend = '<div class="col d-block col-6 col-md-3 col-sm-6 pt-1 pb-1 catCol" id="categoryCard" onclick="autoScrollTo(`' + noSpaceName + 'Anchor`)">' + //TODO: add onclick function for anchor
                        '<img class="d-block img-responsive center-block" src="' + url + '" width="100%" /></div>';
                    $('#category-subcategoriesRow').append(toAppend)

                    //* Add each subcategory horizontalScroll without products
                    var productsUrl = apiUrl + "action=list&object=products&subcategory=" + subcategory.id;
                    console.log('GET productos... ' + productsUrl)
                    $.ajax({
                        url: productsUrl,
                        type: "GET",
                        success: function (data, status, xhr) {
                            if (data.success) {

                                //TODO: if (data.products.length > 0) {
                                let horizontalSection = '<section class="clean-block clean-info pl-0 pr-0 pt-4" id="' + noSpaceName + 'Anchor">' +
                                    '<div class="row mb-2">' +
                                    '<div class="col">' +
                                    '<h4 class="text-left d-inline-block float-left" style="margin-left: 2vw;">' + subcategory.name + '</h4><a class="float-right mr-2 mt-2" data-toggle="modal" data-target="#catModal"><i class="fas fa-shopping-bag mr-2"></i><p class="d-inline-block">Ver más</p></a></div>' +
                                    '</div>' +
                                    // added padding left to solve problems on desktop
                                    // 
                                    '<section class="text-center d-lg-flex justify-content-sm-start justify-content-md-start justify-content-lg-start justify-content-xl-start horitzontalScroll" style="align-items: baseline;">';
                                data.products.forEach(function (product, index) {
                                    let productToAppend = '<a href="#" class="a-productContainer">' + //TODO: Add product link
                                        '<div class="horitzontalScrollContent mr-3 ml-2" style="width: 225px;">' +
                                        '<div class="row">' +
                                        '<div class="col text-center"><img class="border rounded no-border" src="' + product.main_image + '" width="170px" /></div>' +
                                        '</div>' +
                                        '<div class="row">' +
                                        '<div class="col text-center">' +
                                        '<h1 class="d-inline-block" style="font-family: Montserrat, sans-serif;font-size: 15px;color: #47729d;">' + product.name + '</h1>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="row">' +
                                        '<div class="col text-center">' +
                                        '<h1 class="d-inline-block" style="font-family: Montserrat, sans-serif;font-size: 17px;color: #47729d;">' + product.units + '</h1>' +
                                        '<h1 class="d-inline-block float-none ml-3" style="font-family: Montserrat, sans-serif;font-size: 17px;color: #4354a3;">Q' + product.price + '</h1>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</a>';
                                    horizontalSection += productToAppend;
                                });
                                horizontalSection = horizontalSection + '</section>' +
                                    '</section>';
                                $('#subcategories-horizontalScrollWrapper').append(horizontalSection);
                                //TODO: }


                            } //success 
                            else {
                                console.log('status: ' + status);
                            } //else success					
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            console.log('error:' + thrownError);

                        },
                        beforeSend: function (request) { // Set JWT header
                            // mandar Token de autenticacion
                            request.setRequestHeader('Authorization', 'Bearer ' + token);
                        }
                    });

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


function autoScrollTo(el) {
    console.log('autoscroll...to ' + el);

    var top = $("#" + el).offset().top - 48; //? -48 is the offset difference so the Scroll stops at the beginning of the subcategory name
    $("html, body").animate({ scrollTop: top }, 1000);
}

let todo = '<section class="clean-block clean-info pl-0 pr-0 pt-4">' +
    '<div class="row mb-2">' +
    '<div class="col">' +
    '<h4 class="text-left d-inline-block float-left" style="margin-left: 2vw;">Destacados</h4><a class="float-right mr-2 mt-2" data-toggle="modal" data-target="#catModal"><i class="fas fa-shopping-bag mr-2"></i><p class="d-inline-block">Ver más</p></a></div>' +
    '</div>' +
    '<section class="text-center d-lg-flex justify-content-lg-center horitzontalScroll">' +
    '<a href="#">' +
    '<div class="horitzontalScrollContent mr-3 ml-2" style="width: 225px;">' +
    '<div class="row">' +
    '<div class="col text-center"><img class="border rounded no-border" src="0018517_limon-agrio-con-semilla_550.png" width="170px" /></div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col text-center">' +
    '<h1 class="d-inline-block" style="font-family: Montserrat, sans-serif;font-size: 15px;color: #47729d;">Red de limónes de 24 unidades</h1>' +
    '</div>' +
    '</div>' +
    '<div class="row">' +
    '<div class="col text-center">' +
    '<h1 class="d-inline-block" style="font-family: Montserrat, sans-serif;font-size: 17px;color: #47729d;">Limón</h1>' +
    '<h1 class="d-inline-block float-none ml-3" style="font-family: Montserrat, sans-serif;font-size: 17px;color: #4354a3;">Q25.00</h1>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</a>' +
    '</section>' +
    '</section>';

