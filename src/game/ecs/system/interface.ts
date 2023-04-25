import { System } from "../world/utils";

export function interactions(): System {
  return {
    requirements: [],
    entities: [],
    events: {},
    update: (world: World, entity: Entity) => {
      // show events for characters at top of screen
    }
  }
}
