
const { User } = require('../models')

const userController = {
    //Get all User
    getAllUsers(req, res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //get singleUser
    getSingleUser({ params}, res){
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate('friends')
        .select('-__v')
        .then(dbUserData => {if (!dbUserData){res.status(404).json({message: 'no user with that ID'})}res.json(dbUserData)} )
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
  //add user
  addUser( {body }, res){
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .cath(err => res.json(err));
  },

    //update user by id
  updateUser({params, body}, res) {
    User.findOneAndUpdate({_id: params.id}, body,{
        new: true,
        runValidators: true
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  //delete user
  deleteUser({params}, res) {
    User.findOneAndDelete({_id: params.id })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  },
    
};

module.exports = userController;