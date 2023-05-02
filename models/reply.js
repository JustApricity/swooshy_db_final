'use strict';
const moment = require('moment');
const {
    Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reply extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Reply.init({
        user_name: DataTypes.STRING,
        body: DataTypes.STRING,
        commented_on: DataTypes.DATE,
        animal_id: DataTypes.INTEGER,
        parent_comment_id: DataTypes.INTEGER,
        commentedAgo: {
            type: DataTypes.VIRTUAL,
            get() {
                let commentedOn = moment(this.commented_on);
                let now = moment();
                return moment.duration(commentedOn.diff(now)).humanize(true);
            }
        }
    }, {
        sequelize,
        modelName: 'Reply',
        timestamps: false,
        tableName: 'swooshy_comments',
        defaultScope: {
            where: {
                parent_comment_id: {
                    [Op.ne]: null
                }
            }
        }
    });
    return Reply;
};