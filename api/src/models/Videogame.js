const { DataTypes, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    code:{
      type: STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_raw: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    background_image: {
      type: DataTypes.STRING,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: false,
    },
    created_by_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },{
    timestamps: false,
  });
};

// URL Datatype.STRING,