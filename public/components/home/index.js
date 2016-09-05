angular.module('irapl.home', ['irapl.core']).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('home', {
            abstract: true,
            url: '/',
            template: '<ui-view/>'
        })
        .state('home.index', {
            url: '',
            template: '<home/>'
        })
        .state('home.changePassword', {
            url: '/changePassword',
            template: '<change-password>'
        });
}]);
