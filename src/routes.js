import { Router } from 'express';
import { error } from './util';

const routes = Router();

const animals = new Map();

routes.get('/', (req, res) => {
  res.render('index', { title: 'Animals' });
});

routes.get('/api/animals/:name', (req, res) => {
  const { name } = req.params;

  if(name == null) {
    error(res, 400, 'No name provided.');
  }
  else if(animals.has(name)) {
    console.log(`Found ${name}`);
    const animal = animals.get(name);
    res.status(200)
      .format({
        html: function() {
          res.send('<p>' + animal.name + '</p>');
        },
        text: function() {
          res.send(animal.name);
        },
        json: function() {
          res.json(animal);
        }
      });
  }
  else {
    error(res, 404, `Found no animal named ${name}.`);
  }
});

routes.post('/api/animals', (req, res) => {
  if(req.body) {
    const animal = req.body,
          { name } = animal;
    if(animals.has(name)) {
      error(res, 409, `${name} already exists.`);
    }

    animals.set(name, animal);
    res.status(201).send(animal);
  }
  else {
    error(res, 400, 'No body provided.');
  }
});

export default routes;
