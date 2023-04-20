
import {
  Scene,
  IShadowLight,
  ShadowGenerator,
} from "@babylonjs/core";

export function setShadows(light: IShadowLight, scene: Scene){
  console.log('scene.meshes: ', scene.meshes);
  scene.shadowsEnabled = true;
  light.shadowEnabled = true;
  light.shadowMinZ = 1;
  // light.shadowMaxZ = 10;

  const shadowGen = new ShadowGenerator(1024, light);
  shadowGen.bias = 0.0005;
  // const shadowGen = new ShadowGenerator(2048, light);
  shadowGen.useBlurCloseExponentialShadowMap = true;

  scene.meshes.map((mesh) => {
    // console.log('mesh: ', mesh);
    shadowGen.addShadowCaster(mesh);
    mesh.receiveShadows = true;
  });
}