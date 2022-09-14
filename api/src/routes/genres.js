const { Router } = require('express');
const { default: axios } = require('axios')
const { Genre } = require('../db.js');
const { API_KEY } = process.env;

const genresReq = async (req, res, next) => {
  let find = await Genre.findAll();

  if(find.length) return next();
  
  let apiRequest = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  
  allGenresArr = apiRequest.data.results.map( genre => {
    return {
      name: genre.name,
      bg_img: genre.image_background,
    }
  });

  allGenresArr.forEach( async (genre) => {
    await Genre.create({
      name: genre.name,
    })
  });
  
  next();
} 

const router = Router();
router.use(genresReq);

let allGenresArr = [];

router.get('/', async (req, res) => {

  try {
    let genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    res.send(404).json(error.message)
  }
  
});



module.exports = router;