app.controller('agr', function ($scope) { //agree
    $scope.noiDung = '';
    $scope.btnSendMail = function () {
        var url = 
                'https://mail.google.com/mail/u/0/?view=cm&to=vinhlmpc01238@fpt.edu.vn' +
                '&su=' + encodeURI('Gớp ý | Online Traing') +
                '&body=' + encodeURI($scope.noiDung);
        window.open(url, '_blank', 'height=400,width=500');
    };
});