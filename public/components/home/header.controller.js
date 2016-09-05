angular.module('gpss.home').controller('HeaderController', ['$scope', '$location', function ($scope, $location) {
    var vm = this;
    vm.open = false;
    $scope.$on('$locationChangeSuccess', () => vm.location = $location.path());
}]);
