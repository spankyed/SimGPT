
import WorldState from "./config/world-state";

export default function createWorld(): World {
  const initState = WorldState;
  const world = {
    entities: new Map<EntityId, Entity>(),
    systems: new Set<System>(),
  };


  
  return {
    entities: [],
    components: new Map(),
    systems: [],
    eventHandlers: new Map(),
  };
}

