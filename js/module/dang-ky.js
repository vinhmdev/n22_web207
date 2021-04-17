app.controller('sgUp', function ($scope, $http) {
    $scope.account = {
        username: '',
        password: '',
        email: '',
        fullname: '',
        birthday: '',
        gender: '',
        schoolfee: 0,
        marks: 0
    };

    $scope.er = {username : ''};
    
    $scope.signUp = function () {
        new Promise((resolve, reject) => {
            resolve($http.get('http://localhost:3000/user?username='+$scope.account.username));
        })
        .then(response => {
            if (response.data.length != 0) {
                $scope.er.username = 'Tài khoản đã tồn tại';
                return true; // có tài khoản
            }
            $scope.er.username = '';
            return false; // không có tài khoản
        })
        .then(response => {
            if (response){
                return;
            }
            var sendData = angular.copy($scope.account);
            sendData.birthday = $scope.account.birthday.toLocaleDateString('ja-JP'); // định dạng ngày nhật bản (yyyy/MM/dd)
            sendData.gender = ($scope.account.gender == 'true') ? true : false;
            $http.post('http://localhost:3000/user', sendData).then(
                response => {
                    window.location = '/';
                },
                error => {
                    alert('Không thể kết nối cơ sở dữ liệu');
                }
            )
        });
    }
});