const { default: axios } = require('axios')
const { Router } = require('express');
const { Videogame, Genre, Op } = require('../db.js');
const { randomId } = require('../functions/functions')
const { API_KEY } = process.env;

// Middleware para hacer request a la API.
const apiReq = async (req, res, next) => {
  // Pregunto si ya esta almacenada.
  try {
    const gamesInDb = await Videogame.findAll()
    if(gamesInDb.length) return next(); 
    allGamesArr = [];
  
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
        // Creo un videojuego con los datos que envia el usuario.
        allGamesArr.forEach( async g => {
          const vidG = await Videogame.create({
            code: `API_${g.id}`,
            name: g.name,
            released: g.release_date,
            rating: g.rating,
            background_image: g.bg_img,
            platforms: g.platforms,
            created_by_user: false
          });
          
          const gensFound = g.genres.map( async g => {
            return await Genre.findOne({
              where: {
                name: g.name
              },
              attributes: ['id']
            })
          })
    
          const gensFoundId = await Promise.all(gensFound)
    
          const gensId = gensFoundId.map( g => {
            return g.id
          }) 
          
          await vidG.addGenres(gensId);
        });
        next()
  } catch (error) {
    next(error)
  }
}

const router = Router();

router.use(apiReq);

let allGamesArr = []; // Aca esta almacenada la respuesta de la API

router.get('/', async (req, res) => {
  let { name } = req.query;

  try {
    const allGames = await Videogame.findAll({
      include: 'Genres'
    });

    res.json(allGames)
  } catch (error) {
    res.status(404).json(error.message);
  }
  
});

router.get('/rating', async (req, res) => {
  let gamesRated = allGamesArr.filter(game  => game.rating >= 4.5)

  let gamesRatedDb = await Videogame.findAll({
    where: {rating:{[Op.gte]: 4.5} }
  })

  let allGames = [...gamesRated, ...gamesRatedDb]

  res.send(allGames)
});

router.post('/', async (req, res) => {
  let { name, description_raw, release_date, rating, genres, platforms } = req.body;

  const newId = Math.floor(Math.random()*3000000000000000)

  
  try {
    // Creo un videojuego con los datos que envia el usuario.
    const vidG = await Videogame.create({
      code: `USER_${newId}`,
      name,
      description_raw,
      release_date,
      rating,
      platforms,
      created_by_user: true
    });
    
    // Le agrego los generos que envio el usuario.
    await vidG.addGenres(genres);
    // Respondo con el Videojuego creado.
    res.send(vidG);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

router.get('/:id', async (req, res) => {
  let { id } = req.params;

  try {
    // Si es por DB
    if(id.slice(0, 4) === 'USER') {
    let gameFound = await Videogame.findByPk(id,{
      include: [{
        model: Genre,
      }]
    });

    if(!gameFound) return res.status(404).send('No existe el juego');

    return res.status(200).json(gameFound)
    }

    // Si es por API
    id = parseInt(id.slice(4))

    let gameFound = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)

    
    gameFound.data.platforms = gameFound.data.platforms.map( p => {
      return p.platform.name
    })
    
    if(gameFound) return res.status(200).json(gameFound.data);

  } catch (error) {
    console.error(error);
    res.status(400).send('No existe el juego.')
  }
 

});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  
  try {
    await Videogame.destroy({
      where: {code:id}
    })

    res.status(200).send('Game successfully deleted!')
  } catch (error) {
    res.status(404).json(error.message);
  }
})

router.put('/', async (req, res) => {
  const { code ,name, description, release_date, rating, plataforms, genres } = req.body;

  try {
    const gameToUpdate = await Videogame.findByPk(code, {include: Genre});
    const genresToRemove = gameToUpdate.Genres.map(type => type.dataValues.id);
    
    await gameToUpdate.removeGenres(genresToRemove);
    await gameToUpdate.addGenres(genres);
    await gameToUpdate.set({
      name, 
      description, 
      release_date,
      rating, 
      plataforms
    })

    await gameToUpdate.save();

  res.status(200).send('Videogame successfully updated')
  } catch (error) {
  res.status(404).send(error)
  }
})

module.exports = {
  videogamesMiddleware: router,
}