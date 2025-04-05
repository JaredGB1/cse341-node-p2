const ObjectId= require('mongodb').ObjectId;

const mongodb=require('../database/connect');

const getSingle=async (req, res) => {
  // #swagger.tags=[Posts]
  try
  {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid post id to get a post.');
      }
      const userId= new ObjectId(req.params.id);
      const result= await mongodb.getDB().db().collection('posts').find({ _id: userId }).toArray();
      if (result.length === 0) {
        return res.status(404).json({ message: 'No post found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
  }
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "An error occurred while getting the post", error: error.message });
  }
  };

const getAll= async (req, res) => {
  // #swagger.tags=[Posts]
  try
  {
    const result= await mongodb.getDB().db().collection('posts').find().toArray();
    if (result.length === 0) {
        return res.status(404).json({ message: 'No posts found' });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
  }
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: "An error occurred while getting the posts", error: error.message });
  }
 
  };
  
const createPost= async (req,res) => 
  {
    // #swagger.tags=[Posts]
    try
    {
        const user=
        {
            username: req.body.username,
            title: req.body.title,
            description: req.body.description,
            content: req.body.content
        }
        const response= await mongodb.getDB().db().collection('posts').insertOne(user);
        if(response.acknowledged > 0)
          {
            res.status(204).send();
          }
        else
          {
            res.status(500).json(response.error || "Some error occur while adding the post");
          }
    }
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: "An error occurred while adding the post", error: error.message });
    }
    
  }

const updatePost= async (req,res) =>
  {
    // #swagger.tags=[Posts]
    try
    {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid user id to update a post.');
        }
    
        const userId= new ObjectId(req.params.id);
        const user=
        {
            username: req.body.username,
            title: req.body.title,
            description: req.body.description,
            content: req.body.content
        }
        const response= await mongodb.getDB().db().collection('posts').replaceOne({ _id: userId }, user);
        if(response.modifiedCount > 0)
          {
            res.status(204).send();
          }
        else
          {
            res.status(500).json(response.error || "Some error occur while updating the post");
          }
    }
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the post", error: error.message });
    }
    
  }
  
const deletePost= async (req,res) =>
  {
    // #swagger.tags=[Posts]
    try
    {
        if (!ObjectId.isValid(req.params.id)) 
        {
            res.status(400).json('Must use a valid contact id to delete a post.');
        }
    
        const userId= new ObjectId(req.params.id);
        const response = await mongodb.getDB().db().collection('posts').deleteOne({ _id: userId });

        if(response.deletedCount > 0)
          {
            res.status(204).send();
          }
        else
          {
            res.status(500).json(response.error || "Some error occur while deleting the post");
          }
    }
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting the post", error: error.message });
    }

  }

module.exports = {
    getSingle,
    getAll,
    createPost,
    updatePost,
    deletePost
    
};