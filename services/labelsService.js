var model = global.app.model,
    _ = require('lodash');

const BRANCH_ID = global.app.config.branches.labelGeneration;

function getLabelCode() {
    return model.Label.findOne({code: {$exists: true}}, {code: 1}, {sort: {code: -1}}).exec().then(
        value => {
            if (value) {
                return value.code;
            }
            return 0;
        }
    );
}

function removeStock(label) {
    return model.PendingDelivery.find({_id: {$in: label.pendingDeliveries}}).exec().then(
        pendingDeliveries => model.Stock.find({
            branch: BRANCH_ID,
            book: {
                $in: _.map(pendingDeliveries, 'book')
            }
        }).exec()
    ).then(
        stocks => {
            if (_.some(stocks, stock => stock.quantity < 1)) {
                return Promise.reject('Unable to create the Label due insufficient stock.');
            }
            return Promise.all(_.map(stocks, stock => {
                stock.quantity--;
                return stock.save();
            }));
        }
    );
}

function updatePendingDeliveries(label) {
    return model.PendingDelivery.update(
        {_id: {$in: label.pendingDeliveries}},
        {$set: {label: label._id}},
        {multi: true}
    ).exec();
}

function createPrintJob(label) {
    var labelPrintJob = new model.LabelPrintJob({label: label._id});
    return labelPrintJob.save();
}

module.exports.createLabel = label =>
    Promise.all([
        getLabelCode(),
        removeStock(label)
    ]).then(
        values => {
            label.code = values[0] + 1;
            return label.save()
                .then(
                    () => updatePendingDeliveries(label)
                ).then(
                    () => createPrintJob(label)
                );
        }
    );
