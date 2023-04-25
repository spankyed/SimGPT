// import { World, EntityId, TagMap, System, Value, WorldEvent, Tag } from "./types";
import { Scene } from '@babylonjs/core';

export type EntityId = string;
export type Tag = string;
export type Value = any;
export type Pair = [EntityId, Tag, EntityId];
export type Data = { [key: string]: any; };
export type EventHandler = (world: World, data: Data) => void;
export type TagMap = Map<Tag, Value>; // hierarchy parent/child: https://github.com/SanderMertens/ecs-faq#how-to-1

export interface System {
  name: string;
  requirements: (Tag | Pair)[];
  entities: Set<EntityId>;
  create: (world: World) => any;
  update: (world: World, entity: EntityId) => void;
  events?: { [eventName: string]: EventHandler };
}

export interface World {
  scene: Scene;
  entities: Map<EntityId, TagMap>;
  systems: Set<System>;
  eventQueue: WorldEvent[];
}

export interface WorldEvent {
  name: string;
  data: Data;
}


function createEntity(world: World): EntityId {
  // generate random id
  const randomID = Math.random().toString(36).substr(2, 9);
  const id = randomID;

  world.entities.set(id, new Map<Tag, Value>());
  return id;
}

function destroyEntity(world: World, id: EntityId): void {
  world.entities.delete(id);

  for (const system of world.systems) {
    system.entities.delete(id);
  }
}

function addComponent<T>(world: World, id: EntityId, tag: Tag, value: T): void {
  addTag(world, id, tag, value);
}

function removeComponent(world: World, id: EntityId, tag: Tag): void {
  removeTag(world, id, tag);
}

function addPair(world: World, id: EntityId, tag: Tag, targetId: EntityId): void {
  addTag(world, id, tag, targetId);
}

function removePair(world: World, id: EntityId, pairTag: Tag): void {
  removeTag(world, id, pairTag);
}

function addTag(world: World, id: EntityId, tag: Tag, value: Value): void {
  const entity = world.entities.get(id);

  if (!entity) return;

  entity.set(tag, value);
  updateMatchedEntities(world, id);
}

function removeTag(world: World, id: EntityId, tag: Tag): void {
  const entity = world.entities.get(id);

  if (!entity) return;

  entity.delete(tag);
  updateMatchedEntities(world, id, true);
}

function updateMatchedEntities(world: World, id: EntityId, remove?: boolean): void {
  for (const system of world.systems) {
    const requirements = system.requirements;

    if (remove && system.entities.has(id)) {
      system.entities.delete(id);
    } else if (requirementsMatchEntity(requirements, world.entities.get(id))) {
      system.entities.add(id);
    }  
  }
}

function requirementsMatchEntity(requirements: any[], entityTags: TagMap | undefined): boolean {
  if (!entityTags) return false;

  for (const requirement of requirements) {
    if (typeof requirement === 'string' && !entityTags.has(requirement)) {
      return false;
    } 
    // else if (typeof requirement === 'object') {
    //   const [relationshipTag, targetRequirement] = Object.entries(requirement)[0];
    //   const targetEntityID = entityTags.get(relationshipTag);

    //   if (!targetEntityID || !requirementsMatchEntity([targetRequirement], targetEntityID)) {
    //     return false;
    //   }
    // }
  }

  return true;
}

function registerSystem(world: World, system: System): void {
  world.systems.add(system);

  for (const id of world.entities.keys()) {
    if (requirementsMatchEntity(system.requirements, world.entities.get(id))) {
      system.entities.add(id);
    }
  }

  return system.create(world);
}

function sendEvent(world: World, name: string, data: Data) {
  world.eventQueue.push({ name, data });
}

function update(world: World): void {
  const eventsToProcess = world.eventQueue;
  world.eventQueue = [];

  for (const system of world.systems) {
    for (const event of eventsToProcess) {
      const eventHandler = system.events?.[event.name];
      if (eventHandler) {
        eventHandler(world, event.data);
      }
    }
    
    for (const entity of system.entities) {
      system.update(world, entity);
    }
  }
}

export {
  createEntity,
  destroyEntity,
  registerSystem,
  update,
  addTag,
  removeTag,
  addComponent,
  removeComponent,
  addPair,
  removePair,
  sendEvent,
};
