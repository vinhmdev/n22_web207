app.controller('faq', function ($scope) {
    $scope.noiDung = '';
    $scope.btnSendMail = function () {
        var url = 
                'https://mail.google.com/mail/u/0/?view=cm&to=vinhlmpc01238@fpt.edu.vn' +
                '&su=' + encodeURI('Hỏi đáp | Online Traing') +
                '&body=' + encodeURI($scope.noiDung);
        window.open(url, '_blank', 'height=400,width=500');
    };
});