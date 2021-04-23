app.controller('histo', function ($scope, $http) {
    $scope.histoShow = [];
    $scope.infes = [];
    $scope.lengthPage = 1;
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

    $http.get('http://localhost:3000/histo?idUser=' + $scope.isLogin + '&_sort=start&_order=desc')
    .then(
        response => {
            response.data.forEach(item => {
                let detalT = (new Date(item.end).getTime() - new Date(item.start).getTime()) / 1000;

                var info = {
                    start: item.start,
                    end: item.end,
                    detalTime : detalT
                };
                $http.get('http://localhost:3000/subjects/'+item.idSubject)
                .then(
                    rs => {
                        info.nameSubject = rs.data.name;
                        $scope.infes.push(angular.copy(info));
                    }
                );

                var listData = [];
                item.histo.forEach(itemHisto => {
                    var showData = {
                        note: ''
                    };
                    showData.id = itemHisto.id;
                    showData.quest = itemHisto.text;
                    showData.myAnswer = itemHisto.answers.reduce((non, itemAnswers) => {
                        if (itemAnswers.id == itemHisto.pick_answer_id){
                            return itemAnswers.text;
                        }
                        return non;
                    }, '');
                    showData.status = itemHisto.answer_id == itemHisto.pick_answer_id;
                    if (!showData.status) {
                        showData.note = itemHisto.answers.reduce((non, itemAnswers) => {
                            if (itemAnswers.id == itemHisto.answer_id){
                                return itemAnswers.text;
                            }
                            return non;
                        }, '');
                    }
                    listData.push(angular.copy(showData));
                });
                $scope.histoShow.push(angular.copy(listData));
                $scope.lengthPage = $scope.histoShow.length;
            });
        },
        error => {
            alert('Không thể kết nối đến cơ sở dữ liệu');
        }
    );
});