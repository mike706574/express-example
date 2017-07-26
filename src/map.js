const db = new Map();

function vals(map) {
  return Array.from(map.values());
}

export function getAnimals(params) {
  return new Promise((resolve, reject) => {
    let animals = vals(db);
    if(params.name) {
      animals = animals.filter(animal => animal.name.includes(params.name));
    }
    resolve({status: 'ok', animals: animals});
  });
}

export function getAnimal(name) {
  return new Promise((resolve, reject) => {
    if(!name) {
      resolve({status: 'badRequest', message: 'No name provided.'});
    }
    if(db.has(name)) {
      resolve({status: 'ok', animal: db.get(name)});
    }
    resolve({status: 'notFound'});
  });
}

export function addAnimal(animal) {
  return new Promise((resolve, reject) => {
    if(!animal){
      resolve({status: 'badRequest', message: 'No animal provided.'});
    }
    if(db.has(animal.name)) {
      resolve({status: 'alreadyExists', animal: animal});
    }
    db.set(animal.name, animal);
    resolve({status: 'created', animal: animal});
  });
}

export function clearAnimals() {
  return new Promise((resolve, reject) => {
    db.clear();
    resolve({status: 'cleared'});
  });
}
