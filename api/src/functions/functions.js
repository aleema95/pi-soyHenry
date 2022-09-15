const { Videogame } = require('../db.js');

function randomId(){

  const newId = Math.floor(Math.random()*300000000000000000000)

  //const VideogameExist = await Videogame.findByPk(newId)
  return newId
}


module.exports = {
  randomId
}