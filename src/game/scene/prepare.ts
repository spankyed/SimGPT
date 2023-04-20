
import "@babylonjs/inspector";
import "@babylonjs/core/Debug/debugLayer";
import { AbstractAssetTask, Scene } from "@babylonjs/core";
import { setCamera, setLights, setGizmos, setShadows, loadAssets, setSkybox } from "./config";
import AssetsSchema from "./assets";

const prepareScene = async (scene: Scene, callback: Function) => {
  loadAssets(AssetsSchema, scene, (tasks: AbstractAssetTask[]) => {
    const { spotLight } = setLights(scene);
    setGizmos(spotLight, scene);
    setShadows(spotLight, scene)
    // setPositions(PositionSchema, scene)
    callback(tasks);
    console.log("All assets loaded");
  });

  // setSkybox(scene);

  setCamera(scene);

  scene.debugLayer.show();

  // const navmesh = scene.getMeshByName("Navmesh");
  // const navigation = setupNavigation(navmesh);
  // console.log('navigation: ', navigation);

  // const path = getPath(navigation, playerPos, destination);
};

/**
 * Will run on every frame render.
 */

export {
  prepareScene,
}