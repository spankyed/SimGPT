import { Scene } from "@babylonjs/core";
import { WorldState } from "./world-state";
import { setLight } from "../../../scene/config/set-light";


export default function mapSceneToEntities(scene: Scene, state: WorldState) {
  const { entities: rawEntities } = state;

  const { meshes, lights, cameras } = scene;

  for (const entity of rawEntities) {
    if (entity.mesh) {
      entity.mesh = scene.getMeshByName(entity.mesh) || null;
    }
    if (entity.light) {
      entity.light = scene.getLightByName(entity.light) || null;
      const { spotLight } = setLight(scene);
      // setGizmos(spotLight, scene);
    }
    if (entity.camera) {
      entity.camera = scene.getCameraByName(entity.camera) || null;
      setCamera(scene, PositionSchema.mainCamera);

    }
  }
}
