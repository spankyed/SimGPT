import { Scene } from '@babylonjs/core';
import { World } from '../utils/ecs';

interface LightTags {

}

export function light(world: World, scene: Scene, tags: CharacterTags = {}) {
  const light = createEntity(world);
  
  // world.addComponent(light, 'needs', {
  //   hunger: 100,
  //   energy: 100,
  //   hygiene: 100,
  //   social: 100,
  //   fun: 100
  // });

  // world.addComponent(light, 'behavior', {
  //   current: 'idle',
  //   target: null
  // });
  
  addComponent(world, light, 'mesh', {
    current: 'idle',
    target: null
  });
  
  return light;
}
