module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    })
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Blog)
    }
  
    return Comment
  }
  
  