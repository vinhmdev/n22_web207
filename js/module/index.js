var app = angular.module('myApp', ['ngRoute']);
app.config($routeProvider => {
    $routeProvider
    .when('/trang-chu', {templateUrl : './mon-hoc.html'})
    .when('/gioi-thieu', {templateUrl : './gioi-thieu.html'})
    .when('/lien-he', {templateUrl : './lien-he.html'})
    .when('/hoi-dap', {
        templateUrl : './hoi-dap.html',
        controller : 'faq'
    })
    .when('/gop-y', {
        templateUrl : './gop-y.html',
        controller : 'agr'
    })
    .when('/dang-ky', {
        templateUrl : './dang-ky.html',
        controller: 'sgUp'
    })
    .when('/dang-nhap', {
        templateUrl : './dang-nhap.html',
        controller: 'lgCtrl'
    })
    .when('/quen-mat-khau', {templateUrl : './quen-mat-khau.html'})
    .when('/doi-mat-khau', {
        templateUrl : './doi-mat-khau.html',
        controller : 'repas'
    })
    .when('/sua-tai-khoan', {templateUrl : './sua-tai-khoan.html'})
    .when('/trac-nghiem/:idMonHoc', {
        templateUrl :  './trac-nghiem.html',
        controller : 'trng'
    })
    .when('/lich-su', {
        templateUrl :  './histo.html',
        controller : 'histo'
    })
    .otherwise({templateUrl: './mon-hoc.html'});
});

app.controller('myCtrl', ($scope, $http) => {
    //Kiểm tra đăng nhập hay chưa
    $scope.username = '';
    $scope.isLogin = '';
    document.cookie.split('; ').forEach(item => {
        if (item.startsWith('Username')){
            $scope.username = (item.substring(item.indexOf('=') + 1));
        }
        if (item.startsWith('LoginId')){
            $scope.isLogin = (item.substring(item.indexOf('=') + 1));
        }
    });
    
    $scope.logout = function () {
        document.cookie = 'LoginId=null;expires=' + new Date(0) + ';path=/';
        // document.cookie = 'User=null;expires=' + new Date(0) + ';path=/';
        // document.cookie = 'Pass=null;expires=' + new Date(0) + ';path=/';
        document.cookie = 'Username=null;expires=' + new Date(0) + ';path=/';
        document.location = '/';
    };

    $http.get('http://localhost:3000/subjects').then(
        response => {
            $scope.asideA = response.data;
        },
        error => {
            alert('Không thể kết nối đến cơ sỡ dữ liệu');
        }
    );
});