import { System, World } from '~/game/ecs/world/utils/types';

export function userInterface(): System {
  return {
    name: 'userInterface',
    requirements: [],
    entities: new Set<string>(),
    events: {},
    update: (world: World, entity: Entity) => {
      // show events for characters at top of screen
    }
  }
}
