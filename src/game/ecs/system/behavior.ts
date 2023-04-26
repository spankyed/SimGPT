import { System, World } from '~/game/ecs/world/utils/types';

export function behavior(): System {
  return {
    name: 'behavior',
    requirements: [],
    entityRefs: new Set<string>(),
    events: {},
    create: ()=>{},
    update: (world: World, entity: Entity) => {
      // set behavior info (higher level events) for interface to display
    }
  }
}
