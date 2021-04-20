app.controller('repas', function ($scope, $http) {
    document.cookie.split('; ').forEach(item => {
        if (item.startsWith('Username')){
            $scope.usernameRp = (item.substring(item.indexOf('=') + 1));
        }
    });
    $scope.newpass1Rp = '';
    $scope.newpass2Rp = '';
    $scope.passRp = '';
    $scope.messRp = '';

    $scope.updatePs = function () {
        $scope.messRp = '';
        if ($scope.newpass1Rp.trim().length == 0){
            $scope.messRp = 'Vui lòng nhập vào mật khẩu mới';
            return;
        }

        if ($scope.newpass1Rp != $scope.newpass2Rp){
            $scope.messRp = 'Mật khẩu mới không khớp';
            return;
        }

        var user = $scope.usernameRp;
        var pass = $scope.passRp;

        $http.get('http://localhost:3000/user?username='+user+'&password='+pass)
        .then(
            response => {
                console.log(response.data)
                var dataResponse = response.data;

                if(dataResponse.length == 0){
                    $scope.messRp = 'Sai tài khoản hoặc mật khẩu';
                    return;
                }

                var userObj = response.data[0];
                userObj.password = $scope.newpass1Rp;

                $http.put('http://localhost:3000/user/'+userObj.id, userObj)
                .then(
                    response => {
                        document.cookie = 'LoginId=null;expires=' + new Date(0) + ';path=/';
                        document.cookie = 'User=null;expires=' + new Date(0) + ';path=/';
                        document.cookie = 'Pass=null;expires=' + new Date(0) + ';path=/';
                        document.cookie = 'Username=null;expires=' + new Date(0) + ';path=/';
                        window.location = "/#!dang-nhap";
                    },
                    error => {
                        console.log(error);
                        alert('Không thể kết nối đến cơ sỡ dữ liệu');
                    }
                );
            },
            error => {
                alert('Không thể kết nối đến cơ sỡ dữ liệu');
            }
        );
    }
});