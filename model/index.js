/**
 * Created by rcard on 05/09/2016.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var model = module.exports;
model.enums = {
    userPermission: {
        ADMIN: 'admin',
        USER_ADMIN: 'user_admin',
        USER: 'user'
    }/*,
    branchPermission: {
        CAN_READ: 'canRead',
        CAN_WRITE: 'canWrite'
    },
    transferState: {
        IN_PROGRESS: 'inProgress',
        DONE: 'done',
        REJECTED: 'rejected'
    },
    labelMailingStatus: {
        READY: 'ready',
        IN_MAILING: 'inMailing',
        REJECTED: 'rejected'
    },
    subscriptionStateEnum: {
        FINISHED: 'finished',
        ACTIVE: 'active',
        FUTURE: 'future',
        CANCELED: 'canceled'
    },
    pendingDeliveriesStateEnum: {
        SEND_TO_ADDRESS: 'sendToAddress',
        INDIVIDUAL_RETIREMENT: 'individualRetirement'
    }*/
};

model.User = mongoose.model('User', new Schema({
    // _id is the username
    _id: {type: String},
    password: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    disabled: Boolean,
    permissions: [{type: String, ref: model.enums.userPermission}],
    branches: [{
        branch: {type: ObjectId, ref: 'Branch'},
        permission: {type: String, ref: model.enums.branchPermission}
    }]
}, {collection: 'users', timestamps: true}));
/*
model.Customer = mongoose.model('Customer', new Schema({
    company: {type: String},
    cuit: {type: String},
    telephone: {type: String, required: true},
    name: {type: String, required: true},
    jobTitle: {type: String},
    email: {type: String, required: true},
    address: {
        street: {type: String, required: true},
        streetNumber: {type: Number, required: true},
        floor: {type: String},
        office: {type: String},
        zipCode: {type: String, required: true},
        country: {type: String, required: true},
        state: {type: String, required: true},
        city: {type: String, required: true}
    },
    subscribers: [{type: ObjectId, ref: 'Subscriber'}]
}, {collection: 'customers', timestamps: true}));

model.Subscriber = mongoose.model('Subscriber', new Schema({
    customer: {type: ObjectId, ref: 'Customer', required: true},
    name: {type: String, required: true},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
    jobTitle: {type: String},
    address: {
        street: {type: String, required: true},
        streetNumber: {type: Number, required: true},
        floor: {type: String},
        office: {type: String},
        zipCode: {type: String, required: true},
        country: {type: String, required: true},
        state: {type: String, required: true},
        city: {type: String, required: true}
    },
    deleted: {type: Boolean}
}, {collection: 'subscribers', timestamps: true}));

model.Publication = mongoose.model('Publication', new Schema({
    name: {type: String, required: true},
    comments: {type: String},
    labelName: {type: String},
    isbn: {type: String},
    issn: {type: String},
    isMagazine: {type: Boolean},
    frequency: {type: Number},
    deleted: {type: Boolean},
    hasPrintVersion: {type: Boolean},
    labelAbbreviation: {type: String},
    cancellationDate: {type: Date},
    idMotive: {type: Number}
}, {collection: 'publications', timestamps: true}));

model.Book = mongoose.model('Book', new Schema({
    publication: {type: ObjectId, ref: 'Publication', required: true},
    publicationName: {type: String, required: true},
    magazine: {type: Number},
    magazineName: {type: String},
    disabled: {type: Boolean},
    cancellationDate: {type: Date},
    idMotive: {type: Number}
}, {collection: 'books', timestamps: true}));

model.Branch = mongoose.model('Branch', new Schema({
    name: {type: String},
    place: {type: String}
}, {collection: 'branches', timestamps: true}));

model.Stock = mongoose.model('Stock', new Schema({
    branch: {type: ObjectId, ref: 'Branch', required: true},
    book: {type: ObjectId, ref: 'Book', required: true},
    quantity: {type: Number, required: true}
}, {collection: 'stocks', timestamps: true}));

model.StockTransfer = mongoose.model('StockTransfer', new Schema({
    originBranch: {type: ObjectId, ref: 'Branch', required: true},
    destinationBranch: {type: ObjectId, ref: 'Branch', required: true},
    book: {type: ObjectId, ref: 'Book'},
    label: {type: ObjectId, ref: 'Label'},
    quantity: {type: Number},
    state: {
        type: String,
        required: true,
        enum: _.values(model.enums.transferState),
        default: model.enums.transferState.IN_PROGRESS
    },
    comments: {type: String}
}, {collection: 'stockTransfers', timestamps: true}));

model.Dispatch = mongoose.model('Dispatch', new Schema({
    originBranch: {type: ObjectId, ref: 'Branch', required: true},
    destinationBranch: {type: ObjectId, ref: 'Branch', required: true},
    items: [{
        book: {type: ObjectId, ref: 'Book'},
        quantity: {type: Number},
        label: {type: ObjectId, ref: 'Label'}
    }],
    number: {type: Number, default: 1, required: true}
}, {collection: 'dispatches', timestamps: true}));

model.Subscription = mongoose.model('Subscription', new Schema({
    customer: {type: ObjectId, ref: 'Customer', required: true},
    subscriber: {type: ObjectId, ref: 'Subscriber', required: true},
    combo: {type: ObjectId, ref: 'Combo', required: true},
    startDate: {type: Date, required: true},
    deleted: {type: Boolean},
    endDate: {type: Date, required: true},
    cancellationDate: {type: Date},
    idMotive: {type: Number}
}, {collection: 'subscriptions', timestamps: true}));

model.Combo = mongoose.model('Combo', new Schema({
    name: {type: String},
    publications: [{
        publication: {type: ObjectId, ref: 'Publication', required: true},
        publicationName: {type: String},
        includePrintVersion: {type: Boolean}
    }],
    deleted: {type: Boolean}
}, {collection: 'combos', timestamps: true}));

model.PendingDelivery = mongoose.model('PendingDelivery', new Schema({
    book: {type: ObjectId, ref: 'Book', required: true},
    label: {type: ObjectId, ref: 'Label'},
    sale: {type: ObjectId, ref: 'Sale'},
    subscription: {type: ObjectId, ref: 'Subscription', required: true},
    combo: {type: ObjectId, ref: 'Combo', required: true},
    noShipping: {type: Boolean},
    cancellationDate: {type: Date},
    idMotive: {type: Number}
}, {collection: 'pendingDeliveries', timestamps: true}));

model.Label = mongoose.model('Label', new Schema({
    pendingDeliveries: [{type: ObjectId, ref: 'PendingDelivery', required: true}],
    subscriber: {type: ObjectId, ref: 'Subscriber', required: true},
    branch: {type: ObjectId, ref: 'Branch'},
    code: {type: Number, required: true},
    status: {
        type: String,
        required: true,
        enum: _.values(model.enums.labelMailingStatus),
        default: model.enums.labelMailingStatus.READY
    },
    deleted: {type: Boolean},
    mailingDate: {type: Date}
}, {collection: 'labels', timestamps: true}));

model.LabelPrintJob = mongoose.model('LabelPrintJob', new Schema({
    label: {type: ObjectId, ref: 'Label', required: true},
    printed: {type: Boolean},
    deleted: {type: Boolean}
}, {collection: 'labelPrintJobs', timestamps: true}));

model.Sale = mongoose.model('Sale', new Schema({
    bill: {type: String},
    items: [{
        book: {type: ObjectId, ref: 'Book'},
        quantity: {type: Number},
        pendingDelivery: {type: ObjectId, ref: 'PendingDelivery'}
    }]
}, {collection: 'sales', timestamps: true}));

model.StockHistory = mongoose.model('StockHistory', new Schema({
    user: {type: String, ref: 'User'},
    branch: {type: ObjectId, ref: 'Branch'},
    book: {type: ObjectId, ref: 'Book'},
    quantity: {type: Number},
    idMotive: {type: Number}
}, {collection: 'history.stocks', timestamps: true}));

model.Code = mongoose.model('Code', new Schema({
    code: {type: Number, required: true},
    description: {type: String, required: true},
    deleted: {type: Boolean}
}, {collection: 'codes', timestamps: true}));

model.Grouper = mongoose.model('Grouper', new Schema({
    name: {type: String, required: true},
    codes: [{type: ObjectId, ref: 'Code'}],
    deleted: {type: Boolean}
}, {collection: 'groupers', timestamps: true}));
*/
model.Error = mongoose.model('Error', new Schema({}, {collection: 'logs.errors'}));
