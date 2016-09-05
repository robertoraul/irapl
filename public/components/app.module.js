/**
 * Created by rcard on 05/09/2016.
 */

angular.module('irapl.core', [
    // Angular modules
    // 3rs-party modules
    'ui.router',
    'ui.bootstrap',
    'chart.js',
    'angular-loading-bar',
    'barcode',
    'lodash',
    // Cross-app modules
    'blocks.httpInterceptor',
    'irapl.common'
]);
angular.module('irapl', [
    'irapl.core',
    'irapl.home',
    'irapl.logs',

]);

