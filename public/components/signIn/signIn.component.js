angular.module('gpss.signIn').component('signIn', {
    templateUrl: 'components/signIn/signIn.component.html',
    controller: ['$http', '$window', function ($http, $window) {
        var $ctrl = this;
        $ctrl.signin = () => {
            $ctrl.working = true;
            $ctrl.invalidLogin = $ctrl.hasError = false;

            if (!$ctrl.username && !$ctrl.password) {
                return;
            }

            $http.post('/public-api/sign-in', {username: $ctrl.username, password: $ctrl.password}).then(
                () => {
                    $ctrl.working = false;
                    $window.location = '/';
                },
                response => {
                    if (response.status == 403) {
                        $ctrl.invalidLogin = true;
                    } else {
                        $ctrl.hasError = true;
                    }
                    $ctrl.working = false;
                });
        };
    }]
});
