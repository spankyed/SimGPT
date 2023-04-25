
import {
  Scene,
  FreeCamera,
  Vector3,
  ArcRotateCamera,
  ArcFollowCamera,
} from "@babylonjs/core";

export function setCamera(scene: Scene, options: any = {}) {
  const { position, target } = options;
  const camera = new FreeCamera("camera1", position, scene); // demo camera
  camera.setTarget(target);
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
}


export function setCameras(scene: Scene, options: any = {}) {
  const { position, target } = options;
  // Create a new camera
  var camera = new ArcRotateCamera("camera", 0, 0, 10, Vector3.Zero(), scene);
  // var camera = new ArcFollowCamera("camera", 0, 0, 10, Vector3.Zero(), scene);

  // var camera = new ArcRotateCamera("arcCamera",
  // Tools.ToRadians(45),
  // Tools.ToRadians(45),
  // 10.0, camTarget, scene);

  // limit rotation angle
  camera.lowerBetaLimit = 0.9;
  camera.upperBetaLimit = Math.PI / 2;
  // limit zoom distance
  camera.lowerRadiusLimit = 3;
  camera.upperRadiusLimit = 25;
  // limit zoom speed
  camera.wheelDeltaPercentage=.005;
  // limit rotation speed
  camera.inertia = 0.6
  // set input keys
  camera.keysUp.push(87);
  camera.keysDown.push(83);
  camera.keysLeft.push(65);
  camera.keysRight.push(68);


  // camera.lockedTarget = targetMesh; 

  // camera.zoomOn(mesh)
}
