const { Router } = require('express');
const { default: axios } = require('axios')
const { Genero } = require('../db.js');
const { API_KEY } = process.env;

const genresReq = async (req, res, next) => {
  let find = await Genero.findAll();

  if(find.length) return next();
  
  let apiRequest = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
  
  allGenresArr = apiRequest.data.results.map( genre => {
    return {
      name: genre.name,
      bg_img: genre.image_background,
    }
  });

  allGenresArr.forEach( async (genre) => {
    await Genero.create({
      name: genre.name,
    })
  });
  
  next();
} 

const router = Router();
router.use(genresReq);

let allGenresArr = [];

router.get('/', async (req, res) => {
  console.log(allGenresArr.length);

  try {
    let genres = await Genero.findAll();
    res.status(200).json(genres);
  } catch (error) {
    res.send(404).json(error.message)
  }
  
});



module.exports = router;