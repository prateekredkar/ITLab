function password_show_hide() {
    var x = document.getElementById("password");
    var show_eye = document.getElementById("show_eye");
    var hide_eye = document.getElementById("hide_eye");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
        x.type = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
    } else {
        x.type = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";
    }
}

function validatePass(str) {
    if (str.match(/[a-z]/g) && str.match(
            /[A-Z]/g) && str.match(
            /[0-9]/g) && str.match(
            /[^a-zA-Z\d]/g))
        return true;
    else
        return false;
}















// function show_hide_password(target) {
//     var input = document.getElementById('password-input');
//     if (input.getAttribute('type') == 'password') {
//         target.classList.add('view');
//         input.setAttribute('type', 'text');
//     } else {
//         target.classList.remove('view');
//         input.setAttribute('type', 'password');
//     }
//     return false;
// }