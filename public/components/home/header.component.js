angular.module('gpss.home').component('header', {
    templateUrl: 'components/home/header.component.html',
    controller: ['$scope', '$location', 'branchEnum', 'branchPermissionsEnum', 'userPermissionsEnum', function ($scope, $location, branchEnum, branchPermissionsEnum, userPermissionsEnum) {
        var $ctrl = this;

        $ctrl.branchEnum = branchEnum;
        $ctrl.branchPermissionsEnum = branchPermissionsEnum;
        $ctrl.userPermissionsEnum = userPermissionsEnum;

        $ctrl.collapsed = true;
        $scope.$on('$locationChangeSuccess', () => $ctrl.location = $location.path());
    }]
});
