import { Scene, Vector3 } from '@babylonjs/core';
import { createEntity, addComponent } from '../world/utils';
import { World } from '../world/utils/types';
import { setCamera, setDataProps } from '~/game/scene/config';
import { mesh } from '../system/mesh';

interface CameraTags {
  camera: {
    type: string;
    args: any[];
    options: {
      [key: string]: any;
    };
  }
}

export function camera(world: World, tags: CameraTags) {
  const camera = createEntity(world);

  // const canvas = world.scene.getEngine().getRenderingCanvas();
  // tags.camera.options.attachControl = [canvas, true]
  // const sceneCamera = setCamera(world.scene, tags.camera.type, tags.camera.args);

  // if (sceneCamera) {
  // }

  addComponent(world, camera, 'camera', false);
  addComponent(world, camera, 'init', tags.camera);
  
  return camera;
}
