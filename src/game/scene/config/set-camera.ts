
import {
  Scene,
  FreeCamera,
  Vector3,
} from "@babylonjs/core";

export function setCamera(scene: Scene) {
  const cameraPosition = new Vector3(94, 43, -37.2);
  const cameraTarget   = new Vector3(100, 21, -60);
  const camera = new FreeCamera("camera1", cameraPosition, scene);
  camera.setTarget(cameraTarget);
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
}
