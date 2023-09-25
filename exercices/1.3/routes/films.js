var express = require('express');
var router = express.Router();

const films = [
    {
      id: 1,
      title: 'Star Wars: The Phantom Menace (Episode I)',
      duration: 136,
      budget: '115',
      link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_I_%E2%80%93_The_Phantom_Menace',
    },
    {
      id: 2,
      title: 'Star Wars: Episode II – Attack of the Clones',
      duration: 142,
      budget: 115,
      link: 'https://en.wikipedia.org/wiki/Star_Wars:_Episode_II_%E2%80%93_Attack_of_the_Clones',
    },
    {
      id: 3,
      title: "Zack Snyder's Justice League",
      duration: 242,
      budget: 70,
      link: 'https://en.wikipedia.org/wiki/Zack_Snyder%27s_Justice_League',
    },
  ];

  /* Read all films from the menu
   GET /films?minimum-duration=value : order by minimum duration
*/
router.get('/', (req, res, next) => {
    const orderByMinDuration =
      req?.query
        ? Number(req.query['minimum-duration'])
        : undefined;
    let orderedMenu;
    console.log(`order by ${orderByMinDuration ?? 'not requested'}`);
    if (orderByMinDuration)
      orderedMenu = films.filter((films) => films.duration >= orderByMinDuration);
  
    console.log('GET /films');
    res.json(orderedMenu ?? films);
  });

  // Read films identified by an id in the menu
router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);
  
    const indexOfFilmsFound = films.findIndex((films) => films.id == req.params.id);
  
    if (indexOfFilmsFound < 0) return res.sendStatus(404);
  
    res.json(films[indexOfFilmsFound]);
  });

module.exports = router;