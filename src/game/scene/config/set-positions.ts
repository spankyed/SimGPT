
import {
  Scene,
} from "@babylonjs/core";

export function setPositions(schema: any, scene: Scene) {
  // for each schema value, find the mesh by meshName and set the position
  Object.values(schema).forEach((asset: any) => {
    const { meshName, position } = asset;
    if (!meshName) return;
    const mesh = scene.getMeshByName(meshName);
    if (mesh) mesh.position = position;
  });
}
