import { Router } from 'express';
import { error } from './util';

const routes = Router();

const animals = new Map();

routes.get('/', (req, res) => {
  res.render('index', { title: 'Animals' });
});

function vals(map) {
  return Array.from(map.values());
}

routes.get('/api/animals', (req, res) => {
  let {name} = req.query;

  if(name) {
    res.status(200)
      .json(vals(animals).filter(animal => animal.name.includes(name)));
  }
  else {
    res.status(200).json(vals(animals));
  }
});

routes.get('/api/animals/:name', (req, res) => {
  const {name} = req.params;

  if(name == null) {
    error(res, 400, 'No name provided.');
  }
  else if(animals.has(name)) {
    const animal = animals.get(name);
    res.status(200)
      .format({html: () => res.send('<p>' + animal.name + '</p>'),
               text: () => res.send(animal.name),
               json: () => res.json(animal)});
  }
  else {
    error(res, 404, `Found no animal named ${name}.`);
  }
});

routes.post('/api/animals', (req, res) => {
  if(req.body) {
    const animal = req.body;
    if(animals.has(animal.name)) {
      error(res, 409, `${animal.name} already exists.`);
    }

    animals.set(animal.name, animal);
    res.status(201).send(animal);
  }
  else {
    error(res, 400, 'No body provided.');
  }
});

routes.delete('/api/animals', (req, res) => {
  animals.clear();
  res.status(204).send();
});

export default routes;
