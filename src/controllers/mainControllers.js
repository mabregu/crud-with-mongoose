const mainControllers = {
    index: (req, res) => {
        res.send({
            message: 'Hello World!'
        });
    }
}

module.exports = mainControllers;