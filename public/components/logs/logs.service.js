angular.module('gpss.logs').factory('logsService', ['$http', function ($http) {
    return {
        fetch: () => $http.get('/api/logs/').then(response => response.data),
        fetchSync: () => $http.get('/api/logs/sync').then(response => response.data)
    };
}]);
