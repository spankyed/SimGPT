
import {
  Scene,
  SpotLight,
  Vector3,
  HemisphericLight,
} from "@babylonjs/core";
import { setShadows } from "./set-shadows";

export function setLight(scene: Scene) {
  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;
  const dinnerLampPos   = new Vector3(74.76, 18.19, -46.84);
  // const lightDining = new SpotLight(
  //   "light", 
  //   dinnerLampPos, 
  //   new Vector3(0, -1, 0), 
  //   Math.PI,
  //   10,
  //   scene
  //   ) as Light;

  //   lightDining.intensity = 200;
  const spotLight = new SpotLight(
    "spotLight",
    dinnerLampPos,
    new Vector3(0, -1, 0),
    Math.PI,
    10,
    scene
  );
  spotLight.intensity = 100;
  // createGizmos(lightDining, scene);

  setShadows(spotLight, scene)
  
  return { spotLight}
}