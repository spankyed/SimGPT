import { Scene } from '@babylonjs/core';
import { World } from '../utils/ecs';

interface CameraTags {

}

export function camera(world: World, scene: Scene, tags: CharacterTags = {}) {
  const camera = createEntity(world);

  if (entity.mesh) {
    entity.mesh = scene.getMeshByName(entity.mesh) || null;
  }
  // world.addComponent(camera, 'needs', {
  //   hunger: 100,
  //   energy: 100,
  //   hygiene: 100,
  //   social: 100,
  //   fun: 100
  // });

  // world.addComponent(camera, 'behavior', {
  //   current: 'idle',
  //   target: null
  // });
  
  addComponent(world, camera, 'mesh', {
    current: 'idle',
    target: null
  });
  
  return camera;
}
