
import {
  Scene,
  AssetsManager,
  AbstractAssetTask,
} from "@babylonjs/core";
// import "@babylonjs/loaders";
import { AssetDictionary } from "../assets";

export function loadAssets(scheme: AssetDictionary, scene: Scene, callback: (tasks: AbstractAssetTask[]) => void) {
  const assetsManager = new AssetsManager(scene);

  Object.values(scheme).forEach((asset) => {
    const { name, root, fileName } = asset;

    const task = assetsManager.addMeshTask(name + '_task', "", root, fileName); // can pick which meshes to load (2nd param is array of names)
  });
  
  assetsManager.onFinish = callback

  console.log('Loading assets', );

  assetsManager.load();

  return assetsManager;
}

