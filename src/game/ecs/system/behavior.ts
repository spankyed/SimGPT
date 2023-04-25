import { System } from "../world/utils";

export function interactions(): System {
  return {
    requirements: [],
    entities: [],
    events: {},
    update: (world: World, entity: Entity) => {
      // set behavior info (higher level events) for interface to display
    }
  }
}
