angular.module('gpss.home').component('changePassword', {
    templateUrl: 'components/home/changePassword.component.html',
    controller: ['$http', '$location', function ($http, $location) {
        var $ctrl = this;
        $ctrl.change = () => {
            if ($ctrl.password != $ctrl.passwordRetry) {
                return;
            }
            $http.post('/api/users/changePassword', {
                currentPassword: $ctrl.currentPassword,
                password: $ctrl.password
            }).then(() =>
                $location.path('/')
            );
        };
    }]
});
