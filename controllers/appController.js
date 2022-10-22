const Image = require('../models/Image');
const User = require('../models/User');
const Album = require('../models/Album');

const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { src: '', author: '', createdAt: '' };

    return errors;
}

module.exports.newimage_get = (req, res) => {
    res.render('newimage', {pageTitle: 'New Image'});
}

module.exports.newimage_post = async (req, res) => {
    const { src, author, createdAt, commentAuthor, commentCreatedAt, comment } = req.body;
    
    try {
        const image = await Image.create({
            "src" : src,
            "author" : author,
            "createdAt" : createdAt,
            "comments": [
                {
                    "commentAuthor" : commentAuthor,
                    "commentCreatedAt" : commentCreatedAt,
                    "comment" : comment

                }
            ],
            "album": '-'

         });
      
        res.status(201).json({ image: image._id });
    }
    catch (err) {
       // const errors = handleErrors(err);
        res.status(400).json({/* errors */});
    }
}


module.exports.images_get = (req, res) => {
    Image.
         find().
         then( (result) => {
             //res.send(result);
             res.render('images',{images: result,pageTitle: 'Images'})
         }).
         catch((err) => {
             console.log(err);
         })
   //  res.render('images');
     
 }

 module.exports.images_getOne = (req, res) => {
    let albums = []

    Album.find({}).
        then( (res) => {
            res.forEach(elem => {
                
                albums.push(elem); 
            })
        }).
        catch((err) => {
            console.log(err);
        })
   
    Image.
        findById(req.params.id)
        .then( (result) => {
            //res.send(result);
            res.render('image-details',{image: result, albums: albums,pageTitle: 'Image details'})
        }).
        catch((err) => {
            console.log(err);
        })
    
}
module.exports.albums_getOne = async (req, res) => {
    
    try{
        const album = await Album.findById(req.params.id)
        const images = await Image.find({album: album.title})
        res.render('album-details',{images: images, album: album,pageTitle: 'Album details'})

    }catch{
        res.status(404).send({error: 'error'})
    }
   
}



 module.exports.albums_get = (req, res) => {
    Album.
         find().
         then( (result) => {
             //res.send(result);
             res.render('albums',{albums: result, pageTitle: 'Albums'})
         }).
         catch((err) => {
             console.log(err);
         })
   //  res.render('images');
     
 }

 module.exports.newalbum_get = (req, res) => {
     
    res.render('newalbum',{pageTitle: 'New Album'});
}

module.exports.newalbum_post = async (req, res) => {
    const { title, description } = req.body;
    console.log(title, description)
    try {
        const album = await Album.create({
            "title" : title,
            "description" : description
         });
      
        res.status(201).json({ album: album._id });
    }
    catch (err) {
       // const errors = handleErrors(err);
        res.status(400).json({/* errors */});
    }
}


module.exports.update_image_album_post = async (req, res) => {
    const { objId, album } = req.body;
   
    const image = await Image.findOne({"_id": `${objId}`});
     
  
    try {
        
       const image = await Image.updateOne(
            { "_id" : `${objId}` },
            { $set: { "album" : album } })
      
        res.status(201).json({ image: `${objId}` });
    }
    catch (err) {
       // const errors = handleErrors(err);
        res.status(400).json({});
    }
    
}



module.exports.addcomment_post = async (req, res) => {
    const { objId, comments } = req.body;
    let allComments = []
    allComments.push(comments[0])
    const image = await Image.findOne({"_id": `${objId}`});
    
    
    
    image.comments.forEach((item) => {
        allComments.push(item)
        //console.log(image.comments)
    })
  
    try {
        
       const image = await Image.updateOne(
            { "_id" : `${objId}` },
            { $set: { "comments" : allComments } })
      
        res.status(201).json({ image: `${objId}` });
    }
    catch (err) {
       // const errors = handleErrors(err);
        res.status(400).json({});
    }
    
}

module.exports.images_deleteOne = async (req, res) => {
    const image = Image.findById(req.params.id);
    
    try{
        await image.remove(); 
        res.redirect('/images');
    }
    catch {
       res.status(404).send({ error: "Image is not found"})
    }

}

module.exports.albums_deleteOne = async (req, res) => {
    const album = Album.findById(req.params.id);
    
    try{
        await album.remove(); 
        res.redirect('/albums');
    }
    catch {
       res.status(404).send({ error: "Album is not found"})
    }

}