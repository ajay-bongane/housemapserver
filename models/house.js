const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/HouseMaps',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true    
    }
);

const houseSchema = new mongoose.Schema(
    {
        name:String,
        pass:String,
        houseMap:Object,
        updatedOn:{type:Date, default:Date.now}
    },
    {
        collection:'houses'
    }
);

module.exports = mongoose.model('houses', houseSchema);