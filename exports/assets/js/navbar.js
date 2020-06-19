function loadNavBar() {
    $('#categories').empty();


    const buscar = '<a class="d-lg-flex align-items-lg-center mt-1" href="#" style="color: white;">' +
        '   <div class="d-lg-flex horitzontalScrollContent mr-3 ml-2">' +
        '     <div class="row" style="display: none;">' +
        '         <div class="col text-center"><i class="fa fa-trophy"></i></div>' +
        '     </div>' +
        '     <div class="row">' +
        '         <div class="col text-center">' +
        '             <h1 class="d-inline-block" style="font-family: Montserrat, sans-serif;font-size: 18px;">Búscar</h1>' +
        '         </div>' +
        '     </div>' +
        '</div>' +
        '</a>';
    $('#categories').append(buscar);
    const ofertas = '<a class="d-lg-flex align-items-lg-center mt-1" href="#" style="color: white;">' +
        '<div class="d-lg-flex horitzontalScrollContent mr-3 ml-2">' +
        '   <div class="row" style="display: none;">' +
        '         <div class="col text-center"><i class="fa fa-trophy"></i></div>' +
        '   </div>' +
        '   <div class="row">' +
        '         <div class="col text-center">' +
        '             <h1 class="d-inline-block" style="font-family: Montserrat, sans-serif;font-size: 18px;">Ofertas</h1>' +
        '         </div>' +
        '   </div>' +
        '</div>' +
        '</a>';
    $('#categories').append(ofertas);


    if (categoriesList) {
        categoriesList.forEach(category => {
            console.log(category);
            let toAppend = '<a class="d-lg-flex align-items-lg-center mt-1" href="#" style="color: white;">' +
                ' <div class="d-lg-flex horitzontalScrollContent mr-3 ml-2">' +
                '   <div class="row" style="display: none;">' +
                '         <div class="col text-center"><i class="fa fa-trophy"></i></div>' +
                '   </div>' +
                '   <div class="row">' +
                '         <div class="col text-center">' +
                '             <h1 class="d-inline-block" style="font-family: Montserrat, sans-serif;font-size: 18px;">' + category.name + '</h1>' +
                '         </div>' +
                '   </div>' +
                ' </div>' +
                '</a>'
            $('#categories').append(toAppend);
        });
    } else {
        window.location("/")
    }

    const text = '<a class="d-lg-flex align-items-lg-center mt-1" href="#" style="color: white;">' +
        + ' <div class="d-lg-flex horitzontalScrollContent mr-3 ml-2">' +
        + '   <div class="row" style="display: none;">' +
        + '         <div class="col text-center"><i class="fa fa-trophy"></i></div>' +
        + '   </div>' +
        + '   <div class="row">' +
        + '         <div class="col text-center">' +
        + '             <h1 class="d-inline-block" style="font-family: Montserrat, sans-serif;font-size: 18px;">Búscar</h1>' +
        + '         </div>' +
        + '   </div>+'
        + ' </div>' +
        + '</a>'
}