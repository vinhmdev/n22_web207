app.controller('lgCtrl', function ($scope, $routeParams, $http) {
    // hiện thông tin nhớ tài khoản
    document.cookie.split('; ').filter(item => {
        if (item.startsWith('User')){
            $scope.user = item.substring(item.indexOf('=') + 1);
            return true;
        }
        if (item.startsWith('Pass')){
            $scope.pass = item.substring(item.indexOf('='));
            return true;
        }
        return false;
    });

    // giá trị thông báo mặc định
    $scope.mess = '';

    // nút đăng nhập
    $scope.login = function (){
        var user = $scope.user;
        var pass = $scope.pass;
        $http.get('http://localhost:3000/user?username='+user+'&password='+pass)
        .then(
            response => {
                var dataResponse = response.data;

                if(dataResponse.length == 0){
                    $scope.mess = 'Sai tài khoản hoặc mật khẩu';
                    return;
                }

                var age = new Date();
                age.setTime(age.getTime() + (1000 * 60 * 60 * 24));
                document.cookie = 'LoginId=' + dataResponse[0].id + ';expires=' + age + ';path=/';

                if ($scope.remember) {
                    document.cookie = 'User=' + dataResponse[0].username + ';expires=' + age + ';path=/';
                    document.cookie = 'Pass=' + dataResponse[0].password + ';expires=' + age + ';path=/';
                } else {
                    document.cookie = 'User=null;expires=' + new Date(0) + ';path=/';
                    document.cookie = 'Pass=null;expires=' + new Date(0) + ';path=/';
                }
                document.location = '/';
            },
            error => {
                $scope.mess = 'Không thể kết nối đến cơ sỡ dữ liệu';
            }
        );
        
    };
});