import { Router } from 'express';

const routes = Router();

const animals = new Map([['whale', {home: 'ocean',
                                    size: 'huge'}],
                         ['lion', {home: 'jungle',
                                   size: 'big'}],
                         ['giraffe', {home: 'savannah',
                                      size: 'big'}]]);

routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' });
});

routes.get('/animals/:name', (req, res, next) => {
  const { name } = req.params;

  if(name == null) {
    res.status(400)
      .send('No name provided.');
  }
  else if(animals.has(name)) {
    res.status(200)
      .send(animals.get(name));
  }
  else {
    res.status(404)
      .send(`Found no animal named ${name}.`);
  }
});

export default routes;
