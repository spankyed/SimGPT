import { Scene } from '@babylonjs/core';
import { createEntity, addComponent } from '~/game/ecs/world/utils';
import { World } from '~/game/ecs/world/utils/types';
import { setLight } from '~/game/scene/config';

interface LightTags {
  light: {
    type: string;
    args: any[];
    options: {
      [key: string]: any;
    };
  }; // light constructor args
}

export function light(world: World, tags: LightTags) {
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

  const sceneLight = setLight(world.scene, tags.light);

  if (sceneLight) {
    addComponent(world, light, 'light', sceneLight);
  }
  
  return light;
}
