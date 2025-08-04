import {Schema, model} from "mongoose"

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const adminSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const courseSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    adminId: {type: Schema.Types.ObjectId, ref:'Admin'}
})

const purchaseSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    adminId: {type: Schema.Types.ObjectId, ref: 'Admin'},
    paid: {type: Boolean, requried: true, default:false},
    courseId: {type: Schema.Types.ObjectId, ref: 'Course'}
})



export const userModel = model('User', userSchema);
export const adminModel = model('Admin', adminSchema);
export const courseModel = model('Course', courseSchema);
export const purchaseModel = model('Purchase', purchaseSchema);