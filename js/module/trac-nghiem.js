app.controller('trng', function ($scope, $routeParams, $http, $interval) {
    var startTest = new Date(); //

    var isNotLogin = true;

    document.cookie.split('; ').filter(item => {
        if (item.startsWith('LoginId')){
            $scope.isLogin = (item.substring(item.indexOf('=') + 1));
            isNotLogin = false;
        }
    });

    if (isNotLogin) {
        alert('Vui lòng đăng nhập để sử dụng dịch vụ');
        window.location = '/#!dang-nhap'
    }

    $scope.dongHo = 0;
    $interval(() => {
        $scope.dongHo++;
    }, 1000);


    $scope.title = 'Error'
    var idMonHoc = $routeParams.idMonHoc;
    $scope.questions = [];
    $scope.stt = 0;
    $scope.quest = {};

    $http.get('http://localhost:3000/subjects/'+idMonHoc)
    .then (
        response => {
            $scope.title = response.data.name;
        },
        error => {
            alert('Không thể kết nối đến cơ sỡ dữ liệu');
        }
    );

    $http.get('http://localhost:3000/'+idMonHoc+'?_sort=id&_order=asc')
    .then (
        response => {
            $scope.questions = response.data;
            $scope.quest = $scope.questions[$scope.stt];
        },
        error => {
            alert('Không thể kết nối đến cơ sỡ dữ liệu');
        }
    );

    $scope.nextQuest = function () {
        $scope.ched = false;
        if (++$scope.stt >= $scope.questions.length) {
            $scope.stt = $scope.questions.length - 1;
            alert('Đang ở câu cuối cùng');
        }
        $scope.quest = $scope.questions[$scope.stt];
    };
    $scope.prevQuest = function () {
        $scope.ched = false;
        if (--$scope.stt < 0) {
            $scope.stt = 0;
            alert('Đang ở câu đầu tiên');
        }
        $scope.quest = $scope.questions[$scope.stt];
    };
    $scope.rework = function (stt) {
        $scope.ched = false;
        $scope.stt = parseInt(stt);
        $scope.quest = $scope.questions[$scope.stt];
    };

    var pickAns = [];
    $scope.pickShow = [];

    $scope.pick = function (answerId) {

        $scope.ched = true;
        var pickResult = angular.copy($scope.quest);
        pickResult.pick_answer_id = answerId;
        var isNotDuplicate = true;
        pickAns = pickAns.map(item => {
            if (item.id == pickResult.id){
                item = pickResult;
                isNotDuplicate = false;
            }
            return item;
        });

        if (isNotDuplicate){
            pickAns.push(pickResult);
        }

        $scope.pickShow = angular.copy(pickAns);

        for (var i = 0; i < $scope.pickShow.length; i++){
            $scope.pickShow[i].pick_answer = $scope.pickShow[i].answers.filter(item => {
                return item.id == $scope.pickShow[i].pick_answer_id;
            })[0];

            $scope.pickShow[i].stt = i;
        }
    };

    $scope.finishTest = function () {
        if (pickAns.length == 0){
            alert('Bạn chưa trả lời câu hỏi nào');
            return;
        }
        var histo = {
            idUser: $scope.isLogin,
            idSubject: idMonHoc,
            histo : pickAns,
            start: startTest,
            end: new Date()
        };
        $http.post('http://localhost:3000/histo', histo).
        then (
            response => {
                window.location = '/#!lich-su';
            },
            error => {
                alert('Không thể kết nối đến cơ sở dữ liệu');
            }
        );
    };

});