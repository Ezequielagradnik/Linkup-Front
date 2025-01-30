import { Sequelize } from "sequelize"
import UserModel from "./user.js"
import BlogModel from "./blog.js"
import CommentModel from "./comment.js"
import ApplicationModel from "./application.js"

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: process.env.NODE_ENV === "development" ? console.log : false,
})

const User = UserModel(sequelize, Sequelize)
const Blog = BlogModel(sequelize, Sequelize)
const Comment = CommentModel(sequelize, Sequelize)
const Application = ApplicationModel(sequelize, Sequelize)

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Blog.hasMany(Comment)
Comment.belongsTo(Blog)

export { sequelize, User, Blog, Comment, Application }

