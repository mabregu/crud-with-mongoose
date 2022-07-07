const Db = require('../lib/mongodb');

let db = new Db();

const userControllers = {
    getAllUsers: (req, res) => {
        let users = db.getAll('users');
        
        users.then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
    },
    getUser: (req, res) => {
        let id = req.params.id;
        let user = db.getOne('users', id);
        
        user.then(user => {
            res.send({
                message: 'Get user',
                user: user
            });
        })
        .catch(err => {
            res.send({
                message: 'Error',
                error: err
            });
        });
    },
    createUser: (req, res) => {
        let user = req.body;
        
        if (!user.role) {
            user.role = 'user';
        }
        
        let result = db.create('users', user);
        
        result.then(result => {
            res.send({
                message: 'User created',
                id: result.insertedId
            });
        })
        .catch(error => {
            res.send({
                message: 'Error creating user',
                error: error
            });
        });
    },
    updateUser: (req, res) => {
        let id = req.params.id;
        let user = req.body;
        let result = db.update('users', id, user);
        
        result.then(result => {
            if (result.result.nModified === 1) {
                res.send({
                    message: 'User updated'
                });
            } else {
                res.send({
                    message: 'User not found'
                });
            }
        })
        .catch(error => {
            res.send({
                message: 'Error updating user',
                error: error
            });
        });
    },
    deleteUser: (req, res) => {
        let id = req.params.id;
        let result = db.delete('users', id);
        
        result.then(result => {
            if (result.deletedCount === 1) {
                res.send({
                    message: 'User deleted'
                });
            } else {
                res.send({
                    message: 'User not found'
                });
            }
        })
        .catch(error => {
            res.send({
                message: 'Error deleting user',
                error: error
            });
        });
    }
}

module.exports = userControllers;