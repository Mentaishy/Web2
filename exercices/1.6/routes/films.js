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

// Create a films.
router.post('/', (req, res) => {
    const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
    const link = req?.body?.content?.trim().length !== 0 ? req.body.link : undefined;
    const duration =
        typeof req?.body?.duration !== 'number' || req.body.duration < 0
            ? undefined
            : req.body.duration;
    const budget =
        typeof req?.body?.budget !== 'number' || req.body.budget < 0
            ? undefined
            : req.body.budget;

    console.log('POST /films');

    if (!title || !link || !duration || !budget) return res.sendStatus(400); // bad practise (will be improved in exercise 1.5)

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = { id: nextId, title, link, duration, budget };

    films.push(newFilm);

    return res.json(newFilm);
});

// Delete a films from the menu based on its id
router.delete('/:id', (req, res) => {
    console.log(`DELETE /films/${req.params.id}`);

    const foundIndexFilms = films.findIndex(films => films.id == req.params.id);

    if (foundIndexFilms < 0) return res.sendStatus(404);

    const itemsRemovedFromMenu = films.splice(foundIndexFilms, 1);
    const itemRemoved = itemsRemovedFromMenu[0];

    res.json(itemRemoved);
});

// Update a films based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);

    const title = req?.body?.title;
    const link = req?.body?.link;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;

    console.log('PATCH / films');

    if (
        !req.body ||
        (title !== undefined && !title.trim()) ||
        (link !== undefined && !link.trim()) ||
        (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
        (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
      )
        return res.sendStatus(400);

    const foundIndexFilms = films.findIndex(films => films.id == req.params.id);

    if (foundIndexFilms < 0) return res.sendStatus(404);

    const updatedFilms = { ...films[foundIndexFilms], ...req.body };

    films[foundIndexFilms] = updatedFilms;

    res.json(updatedFilms);
});

// UPDATE or CREATE a films based on its id and all values for its parameters
router.put('/:id', (req, res) => {
    console.log(`PPUT /films/${req.params.id}`);

    const title = req?.body?.title;
    const link = req?.body?.link;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;

    console.log('PATCH / films');

    if (
        !req.body ||
        (title !== undefined && !title.trim()) ||
        (link !== undefined && !link.trim()) ||
        (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
        (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
      )
        return res.sendStatus(400);

    const foundIndexFilms = films.findIndex(films => films.id == req.params.id);

    if (foundIndexFilms < 0) {
        const newFilm = { id, title, link, duration, budget };
        films.push(newFilm);
        return res.json(newFilm);
      }

    if (foundIndexFilms < 0) return res.sendStatus(404);

    const updatedFilms = { ...films[foundIndexFilms], ...req.body };

    films[foundIndexFilms] = updatedFilms;

    res.json(updatedFilms);
});



module.exports = router;