
import { EntityId, System, TagMap, World } from "./utils/types";
import WorldState from "./config/world-state";
import Entities from "../entity";
import Systems from "../system";
import { registerSystem, update } from "./utils";

export default function createWorld(scene): World {
  const world: World = {
    scene,
    entities: new Map<EntityId, TagMap>(),
    systems: new Set<System>(),
    eventQueue: [],
    update: () => update(world),
  };

  const defaultEntities = WorldState.entities;
  const systemFactories = Systems;

  // create entities
  defaultEntities.forEach(entity => {
    const entityFactory = Entities[entity.factory];

    if (entityFactory) {
      entityFactory(world, entity);
    }
  });

  // register systems
  systemFactories.forEach(system => {
    registerSystem(world, system());
  });

  return world;
}
