// logout function
function logout() {
    // clearing token
    localStorage.clear();
    // redirecting to login page
    window.location = "/";
}