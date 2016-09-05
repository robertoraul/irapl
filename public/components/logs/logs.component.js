angular.module('gpss.logs').component('logs', {
    templateUrl: 'components/logs/logs.component.html',
    controller: ['logsService', function (logsService) {
        var $ctrl = this;
        $ctrl.refresh = () => logsService.fetch().then(logs => $ctrl.logs = logs);
        $ctrl.refresh();
    }]
});
