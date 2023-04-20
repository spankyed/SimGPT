/**
 * ECS manager class
 * @class
 */
export default class ECS {
  constructor() {
    this.entities = [];
    this.systems = [];
    this.updateCounter = 0;
    this.lastUpdate = performance.now();
  }
  getEntityById(id) {
    for (let i = 0; i < this.entities.length; ++i) {
      const entity = this.entities[i];
      if (entity.id === id) {
        return entity;
      }
    }
    return null;
  }
  getEntityByMesh(mesh) {
    for (let i = 0; i < this.entities.length; ++i) {
      const entity = this.entities[i];
      if (entity.mesh.id === mesh.id) {
        return entity;
      }
    }
    return false;
}
  addEntity(entity) {
    this.entities.push(entity);
    entity.ecs = this;
    // iterate over all systems to setup valid systems
    for (let i = 0; i < this.systems.length; ++i) {
      const system = this.systems[i];
      if (system.test(entity)) {
        system.addEntity(entity);
      }
    }
  }
  removeEntity(entity) {
    const index = this.entities.indexOf(entity);
    // if the entity is not found do nothing
    if (index !== -1) {
      entity.dispose();
      //fastSplice(this.entities, index, 1);
    }
    return entity;
  }
  getSystem(name) {
    for (let i = 0; i < this.systems.length; ++i) {
      const system = this.systems[i];
      if (system.name === name) {
        return system;
      }
    }
    return null;
  }
addSystem(system) {
    this.systems.push(system);
    //system.initialize();
    //iterate over all entities to eventually add system
    for (let i = 0; i < this.entities.length; ++i) {
      const entity = this.entities[i];
      if (system.test(entity)) {
          system.addEntity(entity);
      }
    }
  }
  removeSystem(system) {
    const index = this.systems.indexOf(system);
    if (index !== -1) {
      //fastSplice(this.systems, index, 1);
      system.dispose();
    }
  }
  update() {
    const now = performance.now();
    const elapsed = now - this.lastUpdate;

    // update each entity
    for (let i = 0; i < this.entities.length; ++i) {
      const entity = this.entities[i];
      for (let j = 0; j < entity.systems.length; ++j) {
        const system = entity.systems[j];

        if (this.updateCounter % system.frequency > 0 || !system.enable) {
          continue;
        }
        system.update(entity, elapsed);
      }
    }
    this.updateCounter += 1;
    this.lastUpdate = now;
  }
}

// expose!
//ECS.Entity = Entity;
//ECS.System = System;
//ECS.uid = uid;
