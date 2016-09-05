angular.module('gpss.common').filter('branchPermission', ['branchPermissionsEnum', function (branchPermissionsEnum) {
    return input => {
        if (input === branchPermissionsEnum.CAN_READ) {
            return 'Puede ver Stock';
        }
        if (input === branchPermissionsEnum.CAN_WRITE) {
            return 'Pertenece al sector';
        }
        return input;
    };
}]);
