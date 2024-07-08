const db = require("../models");
const my_table = db.my_table;

exports.all = (req, res) => {
    my_table.findAll({
        where: {}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured."
            });
        });
};

