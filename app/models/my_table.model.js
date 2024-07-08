module.exports = (sequelize, Sequelize) => {
    const my_table = sequelize.define("my_table", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        country_code: {
            type: Sequelize.STRING
        },
        balance: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });
    return my_table;
};
