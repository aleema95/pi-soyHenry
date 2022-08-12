const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    code:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_raw: {
      type: DataTypes.TEXT,
      allowNull: false
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
      defaultValue: "../../img/videogame.png"
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
      allowNull: false,
    }
  },{
    timestamps: false,
  });
};

// URL Datatype.STRING,