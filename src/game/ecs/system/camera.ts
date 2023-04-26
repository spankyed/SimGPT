import { FreeCamera, Vector3 } from '@babylonjs/core';
import { EntityRefs, System, World } from '~/game/ecs/world/utils/types';
import { setCamera } from '~/game/scene/config';

export function cameraSystem(): System {
  return {
    name: 'camera',
    requirements: ['camera'],
    entityRefs: new Set<string>(),
    events: {},
    create: (world: World, entityRefs: EntityRefs) => {
      // console.log('entityRefs: ', entityRefs);
      const id = [...entityRefs][0];
      // console.log('id: ', id);
      const camEntity = world.entities.get(id);
      const init = camEntity?.get('init') as { args:  [...any], options: any, type: string };

      const sceneCamera = setCamera(world.scene, init);
      const canvas = world.scene.getEngine().getRenderingCanvas();
      console.log('canvas: ', {canvas, sceneCamera});
      sceneCamera.attachControl(canvas, true);
      camEntity?.set('camera', sceneCamera);
      canvas?.focus();
    },
    update: (world: World, entity: Entity) => {
      // set camera info (higher level events) for interface to display
    }
  }
}
