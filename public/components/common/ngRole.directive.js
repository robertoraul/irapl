angular.module('gpss.common').directive('ngRole', ['_', 'sessionService', 'branchPermissionsEnum', 'userPermissionsEnum', function (_, sessionService, branchPermissionsEnum, userPermissionsEnum) {
    return {
        restrict: 'A',
        scope: {
            ngRole: '<'
        },
        link: function ($scope, $element) {
            if (!$scope.ngRole) {
                throw new Error('ngRole: A role is required!');
            }
            sessionService.getCurrent().then(user => {
                var userPermission = user.permissions[0];

                if (userPermission == userPermissionsEnum.ADMIN) {
                    return;
                }
                $scope.$watch('ngRole', role => {
                    if (role.branch) {
                        var isAllowed = _.some(user.branches, {
                            branch: role.branch,
                            permission: role.permission || branchPermissionsEnum.CAN_WRITE
                        });

                        if (isAllowed) {
                            $element.show();
                            return;
                        }
                    } else if (role.permission && role.permission == userPermission) {
                        $element.show();
                        return;
                    }

                    $element.hide();
                });
            });
        }
    };
}]);
