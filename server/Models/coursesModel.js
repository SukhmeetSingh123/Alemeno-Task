const mongoose = require('mongoose');
const {Schema}=mongoose;
const coursesSchema = new Schema({
  name:{
    type:String
  },
  instructor:{
    type:String
  },
  description:{
    type:String
  },
  enrollmentStatus:{
    type:String
  },
  thumbnail:{
    type:String
  },
  duration:{
    type:String
  },
  schedule:{
    type:String
  },
  location:{
    type:String
  },
  likes:{
    type:Number
  },
  prerequisites:{
    type:[String]
  },
  syllabus:{
    type:[Object]
  }

})

module.exports = mongoose.model('Course', coursesSchema)