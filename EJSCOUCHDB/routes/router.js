var express = require("express");
var router = express.Router();
const axios = require('axios').default;
const DB_URL = "http://root:root@localhost:5984/movies/"; // Naam verandere naar jouw DB
const DB_VIEWS = "_design/views/_view/"; //Om views op te halen (KEY NIET VERGETEN MEE TE GEVEN!)

router.use(function timeLog(req, res, next) {
  console.log("Time: ", new Date().toLocaleString());
  next();
});

//Automatisch redirecten naar /api/search/actors
router.get("/", (req, res) => {
  res.redirect("/api/search/actors");
});

router.get("/api/search/actors", (req, res) => {
  return res.render("searchactors.ejs", {
    actors: [
      []
    ],
    notFound: false
  })
})

router.get("/api/search/movies", (req, res) => {
  return res.render("searchmovies.ejs", {
    movies: [
      []
    ],
    notFound: false
  })
})

//Zoeken naar films van een acteur MOVIES zitten in een array die zich bevindt in een andere array dus [[]]
router.post("/api/search/movies", async (req, res) => {
  axios.get(`${DB_URL}${DB_VIEWS}search-actor?key="${req.body.actor.toLowerCase()}"`) //Key meegegeven aan de view genaamd search-movie
    .then((response) => {
      let array = response.data.rows.map(x => x.value);
      let movies = array[0];

      if (movies) {
        console.log(array)
        return res.render("searchmovies.ejs", {
          movies: array,
          notFound: false
        })

      } else {
        return res.render("searchmovies.ejs", {
          movies: [[]],
          notFound: true
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
    });
});



//Zoeken naar de acteurs van een film. ACTORS zitten in een array die zich bevindt in een andere array dus [[]]
router.post("/api/search/actors", async (req, res) => {
  axios.get(`${DB_URL}${DB_VIEWS}search-movie?key="${req.body.movie.toLowerCase()}"`) //Key meegegeven aan de view genaamd search-movie
    .then((response) => {
      let array = response.data.rows.map(x => x.value);
      let actors = array[0];

      if (actors) {
        return res.render("searchactors.ejs", {
          actors: array,
          notFound: false
        })

      } else {
        return res.render("searchactors.ejs", {
          actors: [[]],
          notFound: true
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
    });
});


//Zoeken naar de films van een acteur
router.post("/api/search/actor")

/*
router.get("/api/:title", (req, res) => {
  let id = parseInt(req.params.id); //ID parsen naar integer en dan gebruiken om te zoeken naar specifieke document
  db.collection("testcollection")
    .find({ title: new RegExp(req.params.title, 'i') }) //Zoeken naar documents waarvan bepaalde key in een object een value bevat.
    .toArray((err, result) => {
      if (err)
        return res
          .status(404)
          .send(`No documents found that contain: ${req.params.id}!`);
      return res.json(result);
    });
});*/

module.exports = router;