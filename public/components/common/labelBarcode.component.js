angular.module('gpss.common').component('labelBarcode', {
    templateUrl: 'components/common/labelBarcode.component.html',
    bindings: {
        label: '=label'
    },
    controller: ['_', function (_) {
        var $ctrl = this;
        $ctrl.getBarcodeString = code => _.padStart(code, 7, 0);

        $ctrl.barcodeOptions = {
            width: 1.6,
            height: 30,
            fontSize: 10,
            displayValue: true
        };
    }]
});
