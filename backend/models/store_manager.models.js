const mongoose=require('mongoose');
const store_manager=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    inventoryDetails:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'inventory'
    }]
});
export default mongoose.model('store_manager',store_manager);