angular.module('gpss.common').directive('select', [function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        scope: false,
        link: function ($scope, $element, $attrs, ngModel) {
            if (!ngModel) {
                return;
            }
            $element.bind('keyup', () => $element.triggerHandler('change'));
        }
    };
}]);
