angular.module('gpss').controller('FooterController', ['sessionService', function (sessionService) {
    var vm = this;
    sessionService.getCurrent().then(user => {
        vm.user = user;
        vm.role = user.permissions[0];
    });
}]);
