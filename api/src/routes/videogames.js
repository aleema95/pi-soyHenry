const { default: axios } = require('axios')
const { Router } = require('express');
const { Videogame, Genero, Op } = require('../db.js');
const { API_KEY } = process.env;

// Middleware para hacer request a la API.
const apiReq = async (req, res, next) => {
  // Pregunto si ya esta almacenada.
  if(allGamesArr.length) return next(); 

  // Si no lo esta hago la primera request.
  let nextReq = `https://api.rawg.io/api/games?key=${API_KEY}`;

    //Luego hago un loop hasta que llegue a 100 resultados.
    for (let i = 0; i < 100; i = i + 20) {
 //Pido .next del resultado de la API.
        let games = await axios.get(nextReq);

        // Pusheo todo a "allGamesArr".
        
        allGamesArr = [...allGamesArr, ...games?.data?.results?.map(game => {
          let plataformas = game.platforms.map(p => p.platform.name)
          return {
            id: game.id,
            name: game.name,
            bg_img: game.background_image,
            genres: game.genres,
            //description: game.name,
            release_date: game.released,
            rating: game.rating,
            platforms: plataformas,
          }
        })];
        // Cambiamos la URL a la siguiente.
        nextReq = games.data.next;
      
    }

    next();
}

const router = Router();

router.use(apiReq);

let allGamesArr = []; // Aca esta almacenada la respuesta de la API

router.get('/', async (req, res) => {
  let { name } = req.query;

  try {  
    // "Limpio" la data de la API a solo lo que necesito.
    let reqData = allGamesArr.map( game => {
      return {
        id: game.id,
        name: game.name,
        bg_img: game.bg_img,
        rating: game.rating,
        genres: game.genres,
      }
    });

    // Busco todos los de la DB.
    let req_db_data = await Videogame.findAll({include: Genero});

    // "Limpio" la data, a solo lo que necesito.
    req_db_data = req_db_data.map( game => {
    return {
      id: game.code,
      name: game.name,
      rating: game.rating,
      genres: game.Generos
    }
    })

    // Concateno DB y API requests.
    reqData = [...reqData, ...req_db_data];

    // Pregunto si recibo nombre por query.
    console.log(name);
    if (name) {
      let filteredGames = reqData.filter(game => game.name.toLowerCase().includes(name.toLowerCase())).slice(0, 15);  
      if(!filteredGames.length) return res.status(404).send('No se encontraron juegos con ese nombre.'); //throw new Error('No se encontraron juegos con ese nombre.')
          console.log(filteredGames);
      return res.json(filteredGames);
    }
  
    //Si no recibo nombre, respondo toda la API + DB.
    res.status(200).json(reqData);  
    
  } catch (error) {
    res.status(404).json(error.message);
  }       
});

router.post('/', async (req, res) => {
  let { name, description, release_date, rating, genres, platforms } = req.body;

  try {
    // Creo un videojuego con los datos que envia el usuario.
    const vidG = await Videogame.create({
      name,
      description,
      release_date,
      rating,
      platforms
    });

    // Le agrego los generos que envio el usuario.
    await vidG.addGeneros(genres);
    // Respondo con el Videojuego creado.

    res.json(vidG);
  } catch (error) {
    res.status(200).send(error);
  }
});

router.get('/:id', async (req, res) => {
  let { id } = req.params;

  // Si es por DB
  if(id.split("-").length === 5) {
   let gameFound = await Videogame.findByPk(id,{
    include: [{
      model: Genero,
    }]
   });

   if(!gameFound) return res.status(404).send('No existe el juego');

   return res.status(200).json(gameFound)
  }

  // Si es por API
  id = parseInt(id)

  let gameFound = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
  console.log(gameFound);

  if(gameFound) return res.status(200).json(gameFound.data);

  res.status(404).send('No existe el juego.');

});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  
  try {
    await Videogame.destroy({
      where: {code:id}
    })

    res.status(200).send('Game successfully deleted!')
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res) => {
  const { code ,name, description, release_date, rating, plataforms } = req.body;
  console.log(req.body);

  try {
   const gameToUpdate = await Videogame.update({
    name,
    description,
    release_date,
    rating,
    plataforms
   },{
    where: {code: {[Op.eq]: code}}
   })

  const findGame = await Videogame.findByPk(code);

    res.status(200).send('todo ok')
  } catch (error) {
    console.log(error);
    res.status(404).send('Game not found.')
  }
})

module.exports = {
  videogamesMiddleware: router,
}