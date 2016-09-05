angular.module('gpss.signIn').component('passwordRecovery', {
    templateUrl: 'components/signIn/passwordRecovery.component.html',
    controller: ['$http', '$location', '$window', function ($http, $location, $window) {
        var $ctrl = this;
        $ctrl.recover = () =>
            $http.post('/public-api/passwordRecovery', {username: $ctrl.username}).then(
                () => {
                    $window.alert('Se le ha enviado un mail con su nueva password.');
                    $location('/');
                },
                () => $window.alert('Usuario no encontrado.')
            );
    }]
});
