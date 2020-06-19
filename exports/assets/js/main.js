// ------------------------------------------
// ------------ GLOBAL VARIABLES ------------
// ------------------------------------------
// API URLS

// Not Secure URL
const apiURL_unsecure = 'http://apps.gm.on.gt:12080/ecom/api/?'

// secure (SSL) API URL for GET Methods
const apiUrl = 'https://927d1d30.us-south.apigw.appdomain.cloud/laplaza/?';


// Secure (SSL) URL for POST Methods
const postUrl = 'https://927d1d30.us-south.apigw.appdomain.cloud/laplaza/';

// Optimized image base URL
const imgUrl = 'https://res.cloudinary.com/laplaza-on-gt/image/upload/c_scale,w_450/v1592327005/'
const bannerUrl = 'https://res.cloudinary.com/laplaza-on-gt/image/upload/c_scale,w_1000/v1592327005/'

// Session Variables
// getting token from session
let token = localStorage.getItem('token');

// gettin user from session
let email = localStorage.getItem('email');

// getting userID from session
let userID = localStorage.getItem('userID');


// Global data persistence
let categoriesList = JSON.parse(localStorage.getItem('categories'));

// ----------------------------------------------
// ------------ GLOBAL VARIABLES END ------------
// ----------------------------------------------

// document ready functions
// --- When document is ready
$(document).ready(function () {

    console.log("ready!");

    anonymousLogin();

    // checking current site
    if (window.location.pathname == "/") {
        console.log('estoy en home');
        loadNavBar();
        getCategories();
    } else if (window.location.pathname == "/category.html") {
        console.log('estoy en una categoria');
        loadNavBar();
        getSubcategories();
    }


});



// hard coded login for anonymous users
// Anonymous login funtion
function anonymousLogin() {
    var password;

    email = 'Admin',
        password = '123123';

    var data = "username=" + email + "&password=" + password;
    data += '&action=login';

    $.post(apiUrl, data, function (data) {
        console.log('success: ', data);
        token = data.JWT;

        // funciones iniciales


        // Guardamos a local storage
        // Correo
        localStorage.setItem("email", email);
        // Guardando token
        localStorage.setItem("token", token);
        // userId
        localStorage.setItem("userID", data.userid);

        console.log('Token:', token);


    }).fail(function (xhr, status, error) {
        token = ''; //not logged in token = none
        localStorage.setItem('token', token);
        $('#loginError-toast').toast('show');
        console.log('error desde login');
    });

}


// Funciones Genericas

function getGenerico() {
    let key = '1';
    console.log('GET Generico...');
    var url = apiUrl + "action=list&object=<<tablename>>&<<key>>=" + key;
    $.ajax({
        url: url,
        type: "GET",
        success: function (data, status, xhr) {
            if (data.success) {


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

// POST generico
// usamos post para agregar o editar
function editPost(id, name) {
    $.ajax({

        url: postUrl,
        type: "POST",
        data: {

            action: 'add', // 'edit'
            object: '<<tablename>>',
            // fields... 
            id: id,
            name: name

        },
        success: function (data, status, xhr) {
            if (data.success) {



            } //success 
            else {
                console.log('Error' + data[0]);
            } //else success
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('Error!')
        },
        beforeSend: function (request) { // Set JWT header
            request.setRequestHeader('Authorization', 'Bearer ' + token);
        }
    });
}