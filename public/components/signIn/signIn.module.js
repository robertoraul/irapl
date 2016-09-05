angular.module('gpss.signIn', [
    // Angular modules
    // 3rs-party modules
    'ui.router',
    // Cross-app modules
    'blocks.httpInterceptor',
    'gpss.common'
]).config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('signIn', {
            abstract: true,
            url: '/',
            template: '<ui-view/>'
        })
        .state('signIn.index', {
            url: '',
            template: '<sign-in/>'
        })
        .state('signIn.passwordRecovery', {
            url: 'passwordRecovery',
            template: '<password-recovery/>'
        });
}]);
