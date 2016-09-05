/**
 * Created by rcard on 05/09/2016.
 */
angular.module('irapl').run(['$rootScope', '$log', function ($rootScope, $log) {
    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => $log.error(error)
    );
}]).run(['$http', '$window', 'sessionService', function ($http, $window, sessionService) {
    sessionService.getCurrent().then(
        user => $http.defaults.headers.common.Authorization = `Basic ${$window.btoa(user._id + ':' + user.password)}`
    );
}]).run(['uibDatepickerPopupConfig', function (uibDatepickerPopupConfig) {
    uibDatepickerPopupConfig.currentText = 'Hoy';
    uibDatepickerPopupConfig.clearText = 'Borrar';
    uibDatepickerPopupConfig.closeText = 'Cerrar';
}]);

