app.controller('profile', function ($scope, $http) {
    document.cookie.split('; ').forEach(item => {
        if (item.startsWith('Username')){
            $scope.usernameRp = (item.substring(item.indexOf('=') + 1));
            
        }
    });
  
    $scope.messRp = '';


    $http.get('http://localhost:3000/user?username='+$scope.usernameRp)
        .then(
            response => {
                console.log(response.data)
                var dataResponse = response.data;

                var userObj = dataResponse[0];
                $scope.passRp = userObj.password;
                $scope.fnameRp = userObj.fullname;
                $scope.emailRp = userObj.email;
                $scope.birthday = new Date(userObj.birthday);
                $scope.gender = userObj.gender;
            },
            error => {
                alert('Không thể kết nối đến cơ sỡ dữ liệu');
            }
        );


    $scope.update = function () {
        var user = $scope.usernameRp;
        var pass = $scope.passRp;

        var fname = $scope.fnameRp;
        var email = $scope.emailRp;
        var birthday = $scope.birthday;
        var gender = $scope.gender;

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
                userObj.fullname = fname;
                userObj.email = email;
<<<<<<< Updated upstream
                userObj.birthday = birthday.toLocaleDateString('ja-JP'); // định dạng ngày nhật bản (yyyy/MM/dd)
                userObj.gender = (gender == 'true') ? true : false;

=======
                userObj.phone = phone;
                userObj.gender = gender;
>>>>>>> Stashed changes
                $http.put('http://localhost:3000/user/'+userObj.id, userObj)
                .then (
                    response => {
                        window.location = window.location;
                    },
                    error => {
                        alert('Không thể kết nối đến cơ sỡ dữ liệu');
                    }
                )
            },
            error => {
                alert('Không thể kết nối đến cơ sỡ dữ liệu');
            }
        );
    }
});