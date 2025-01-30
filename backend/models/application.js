const applicationModel = (sequelize, DataTypes) => {
    const Application = sequelize.define("Application", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
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
      },
      linkedinProfile: {
        type: DataTypes.STRING,
      },
      startupName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortDescription: {
        type: DataTypes.STRING,
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
  
export default applicationModel;
  
  