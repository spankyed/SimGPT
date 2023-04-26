
import {
  Scene,
  FreeCamera,
  Vector3,
  ArcRotateCamera,
  // ArcFollowCamera,
} from "@babylonjs/core";
import { setDataProps } from ".";

export function setCameras(scene: Scene, options: any = {}) {
  const { position, target } = options;
  const camera = new FreeCamera("camera1", position, scene); // demo camera
  camera.setTarget(target);
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);
}

export function setCameras2(scene: Scene, options: any = {}) {
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

const cameraTypes = {
  freeCamera: (scene, ...args) => new FreeCamera(args[0], args[1], scene),
  arcRotateCamera: (scene, ...args) => new ArcRotateCamera(
    args[0],
    args[1],
    args[2],
    args[3],
    args[4],
    scene
  ),
}

export function setCamera<T>(scene: Scene, camera: { type: string, args: any[], options: any }, ) {
  const { type, args } = camera;
  const toVector3 = (args: any) => {
    return args.map((arg: any) => {
      if (Array.isArray(arg) && arg.length === 3) {
        return new Vector3(...arg);
      }
      return arg;
    })
  }

  const objToVector3 = (obj: any) => {
    return Object.keys(obj).reduce((acc, key) => {
      if (Array.isArray(obj[key]) && obj[key].length === 3) {
        acc[key] = new Vector3(...obj[key]);
      }
      return acc;
    }, obj)
  }
  
  console.log('cameraTypes: ', cameraTypes, type, args);
  const cam = cameraTypes[type](scene, ...toVector3(args));

  setDataProps(cam, objToVector3(camera.options))

  return cam;
}

