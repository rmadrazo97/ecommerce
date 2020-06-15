// Custome theme code

if ($('.clean-gallery').length > 0) {
   baguetteBox.run('.clean-gallery', { animation: 'slideIn'});
}

if ($('.clean-product').length > 0) {
    $(window).on("load",function() {
        $('.sp-wrap').smoothproducts();
    });
}

// adjusting categories marginptop to nav-bar's height
var heightSlider = $('.navbar').height();
$('#categories').css({ paddingTop : heightSlider + 15 + 'px' });


