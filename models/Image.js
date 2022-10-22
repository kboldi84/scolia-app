const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    commentAuthor: {
        type: String
         
    },
    comment: {
        type: String
    },
    commentCreatedAt: {
        type: String
    }

})
 
 
 

const imageSchema = new mongoose.Schema({
    src: {
        type: String,
        required: [true, 'Please add an reference'],
        lowercase: true,
    },
    author: {
        type: String,
        required: [true, 'Please enter an name']
    },
    createdAt: {
        type: String,
        required: [true, 'Please enter an date']
    },
    album: {
        type: String 
    },
    comments: [commentSchema]
})



//fire a function after doc saved to db
imageSchema.post('save', function(doc, next){
    console.log('new image was saved', doc);
    next();
});

const Image = mongoose.model('image', imageSchema);
 

module.exports = Image;
 