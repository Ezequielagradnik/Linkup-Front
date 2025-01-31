export default (sequelize, DataTypes) => {
    const Application = sequelize.define("Application", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 100], // password length between 6 and 100 characters
        },
      },
      linkedinProfile: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      startupName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      shortDescription: {
        type: DataTypes.STRING(500), // Limit to 500 characters
      },
      problemSolved: {
        type: DataTypes.TEXT,
      },
      sector: {
        type: DataTypes.STRING,
      },
      stage: {
        type: DataTypes.ENUM("idea", "mvp", "market", "scaling"),
      },
      hasInvestment: {
        type: DataTypes.BOOLEAN,
      },
      seekingInvestment: {
        type: DataTypes.BOOLEAN,
      },
      hasCustomers: {
        type: DataTypes.BOOLEAN,
      },
      customersDetails: {
        type: DataTypes.TEXT,
      },
      links: {
        type: DataTypes.STRING,
      },
      founderContact: {
        type: DataTypes.STRING,
      },
      whyJoinLinkUp: {
        type: DataTypes.TEXT,
      },
      howHeardAboutLinkUp: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        defaultValue: "pending",
      },
    })
  
    return Application
  }
  
  