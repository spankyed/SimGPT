
import "@babylonjs/inspector";
import "@babylonjs/core/Debug/debugLayer";
import { AbstractAssetTask, Scene, Vector3 } from "@babylonjs/core";
import { setCamera, setLights, setGizmos, setShadows, loadAssets, setSkybox, setPositions } from "./config";
import AssetsSchema from "./assets";

const PositionSchema = {
  player: {
    meshName: "__root__",
    position: new Vector3(42.5, 0, -25),
  },
  mainCamera: {
    target: new Vector3(33.4, 52.6, -76.4),
    position: new Vector3(14.6, 75, -101),
  },
}

const prepareScene = async (scene: Scene, callback: Function) => {
  loadAssets(AssetsSchema, scene, (tasks: AbstractAssetTask[]) => {
    const { spotLight } = setLights(scene);
    // setGizmos(spotLight, scene);
    setShadows(spotLight, scene)
    setPositions(PositionSchema, scene)
    callback(tasks);
    console.log("All assets loaded");
  });

  // setSkybox(scene);

  setCamera(scene, PositionSchema.mainCamera);

  // scene.debugLayer.show();

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