import { System, World } from '~/game/ecs/world/utils/types';

export function interactions(): System {
  return {
    name: 'interactions',
    requirements: [],
    entities: new Set<string>(),
    events: {},
    update: (world: World, entity: Entity) => {
      const interactions = world.getComponent(entity, 'interactions');
      const actions = interactions.actions;
      const behavior = world.getComponent(entity, 'behavior');
      const current = behavior.current;
      const target = behavior.target;
      const action = actions.find((action) => action.behavior === current);
      if (action) {
        const targetEntity = world.getEntity(target);
        const targetBehavior = world.getComponent(targetEntity, 'behavior');
        targetBehavior.current = action.behavior;
      }
    }
  }
}
