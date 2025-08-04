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
    vedioUrl: {type: [String], required: true},
    thumbnailUrl: {type:[String]},
    uploadData: {type: Date, default: () => Date.now() + 7*24*60*60*1000},
    fees: {type: Number, required: true},
    description: {type: String},
    adminId: {type: Schema.Types.ObjectId, ref:'Admin'}
})


const threadSchema = new Schema({
    title: {type: String, required: true},
    imageUrl: {type: String},
    description: {type: String}
})

const threadCommentsSchema = new Schema({
    thread: {type: Schema.Types.ObjectId, ref:"Thread", required: true},
    comments: {type:[String]}
}) 

const VediosCommentsSchema = new Schema({
    vedio: {type: Schema.Types.ObjectId, ref:"Course", required: true},
    comments: {type:[String]}
}) 


const purchaseSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    adminId: {type: Schema.Types.ObjectId, ref: 'Admin'},
    ispaid: {type: Boolean, requried: true, default:false},
    courseId: {type: Schema.Types.ObjectId, ref: 'Course'}
})

export const userModel = model('User', userSchema);
export const adminModel = model('Admin', adminSchema);
export const courseModel = model('Course', courseSchema);
export const threadModel = model('Thread', threadSchema);
export const threadCommentsModel = model('ThreadComments', threadCommentsSchema);
export const vedioCommentsModel = model('VedioComments', VediosCommentsSchema);
export const purchaseModel = model('Purchase', purchaseSchema);