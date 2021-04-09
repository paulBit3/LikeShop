import mongoose from 'mongoose';


/* generate a new mongoose schema
our device schema definition object */

//function schema object
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    deviceId : String,
    platform : String
});

const Device = mongoose.model('Device', deviceSchema);

export {Device}