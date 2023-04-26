
import "@babylonjs/inspector";
import "@babylonjs/core/Debug/debugLayer";
import { AbstractAssetTask, Scene, Vector3 } from "@babylonjs/core";
import { loadAssets, setFog, setSkybox } from "./config";
import AssetsSchema from "./assets";

const prepareScene = async (scene: Scene, callback: Function) => {
  loadAssets(AssetsSchema, scene, (tasks: AbstractAssetTask[]) => {
    callback();
    console.log("All assets loaded");
  });

  // setFog(scene);

  setSkybox(scene);

  // setCamera(scene, PositionSchema.mainCamera);

  scene.debugLayer.show();
};

export {
  prepareScene,
}
