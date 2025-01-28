const { Sequelize } = require("sequelize")
const UserModel = require("./user")
const BlogModel = require("./blog")
const CommentModel = require("./comment")

const sequelize = new Sequelize(process.env.DATABASE_URL || "postgres://user:password@localhost:5432/linkup_db", {
  dialect: "postgres",
})

const User = UserModel(sequelize, Sequelize)
const Blog = BlogModel(sequelize, Sequelize)
const Comment = CommentModel(sequelize, Sequelize)

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Blog.hasMany(Comment)
Comment.belongsTo(Blog)

module.exports = {
  sequelize,
  User,
  Blog,
  Comment,
}

