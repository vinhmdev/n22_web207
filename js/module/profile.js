app.controller('profile', function ($scope, $http) {
    document.cookie.split('; ').forEach(item => {
        if (item.startsWith('Username')){
            $scope.usernameRp = (item.substring(item.indexOf('=') + 1));
            
        }
    });
  
    $scope.messRp = '';

    $scope.update = function () {
      

        var user = $scope.usernameRp;
        var pass = $scope.passRp;
        var fname = $scope.fnameRp;
        var email = $scope.emailRp;
        var phone = $scope.phoneRp;

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
            },
            error => {
                alert('Không thể kết nối đến cơ sỡ dữ liệu');
            }
        );
    }
});