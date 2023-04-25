
import {
  Scene,
  SpotLight,
  Vector3,
  HemisphericLight,
  Light,
} from "@babylonjs/core";
import { setShadows } from "./set-shadows";
import { setDataProps } from "./set-data-props";

// interface LightTypes {
//   [key: string]: typeof Light;
// }

// args should be result from instantiated lightTypes
// export function setLight<T>(type: string, args: Parameters<T extends (...args: any[]) => any>, options: any = {}) {
  
// }
// type ConstructorArgs<T> = T extends new (...args: infer U) => any ? U : never
// export function setLight<T>(type: string, args: ConstructorArgs<typeof T>, options: any = {}) {

const lightTypes = {
  hemispheric: HemisphericLight,
  spot: SpotLight,
}

export function setLight<T>(scene: Scene, type: string, args: any[], options: any = {}) {
  const light = new lightTypes[type](...args, scene);

  setDataProps(light, options)

  return light;
}


// createGizmos(lightDining, scene);
// setShadows(spotLight, scene)

// // create hemispheric light, aiming 0,1,0 - to the sky (non-mesh)
// setLight('hemispheric', ["light", new Vector3(0, 1, 0), scene], { intensity: .7 })

// // create spotlight
// const dinnerLampPos   = new Vector3(74.76, 18.19, -46.84);
// setLight('spot', [
//   "spotLight",
//   dinnerLampPos,
//   new Vector3(0, -1, 0),
//   Math.PI,
//   10,
//   scene
// ], {
//   intensity: 100
// })
