const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String
         
    },
    description: {
        type: String
    }
})
 
//fire a function after doc saved to db
albumSchema.post('save', function(doc, next){
    console.log('new album was saved', doc);
    next();
});


const Album = mongoose.model('album', albumSchema);

module.exports = Album;