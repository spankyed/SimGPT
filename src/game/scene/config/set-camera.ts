
import {
  Scene,
  FreeCamera,
  Vector3,
} from "@babylonjs/core";

export function setCamera(scene: Scene, options: any = {}) {
  const { position, target } = options;
  const camera = new FreeCamera("camera1", position, scene);
  camera.setTarget(target);
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
}
