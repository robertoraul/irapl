/**
 * Created by rcard on 05/09/2016.
 */
angular.module('blocks.httpInterceptor', []).factory('httpInterceptor', ['$q', '$injector', function ($q, $injector) {
    return {
        responseError: response => {
            var $uibModal = $injector.get('$uibModal');
            if (response.status != 401) {
                $uibModal.open({
                    templateUrl: 'errorModal.html',
                    resolve: {
                        message: () => response.data.message || response.data,
                        traceId: () => response.data ? response.data.traceId : null
                    },
                    controllerAs: '$ctrl',
                    controller: ['$uibModalInstance', 'message', 'traceId', function ($uibModalInstance, message, traceId) {
                        var $ctrl = this;
                        $ctrl.message = message;
                        $ctrl.traceId = traceId;
                        $ctrl.close = $uibModalInstance.close;
                    }]
                });
            }
            return $q.reject(response);
        }
    };
}]);