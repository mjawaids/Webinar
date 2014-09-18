var app = angular.module("AdminSignin", ['ngCookies']);

app.controller("SigninController", ['$http', '$cookieStore', '$window', function ($http, $cookieStore, $window) {
    this.valid = 1;
    var form = this;
    var credentials = null;

    $http.get('data/admin.json').success(function (data) {
        credentials = data;
    });

    this.signin = function () {
        if (form.email == credentials[0].email && form.password == credentials[1].password) {
            $cookieStore.put('signin', true);
            $window.location.assign("index.html");
        } else {
            form.valid = 0;
        }
    };
} ]);