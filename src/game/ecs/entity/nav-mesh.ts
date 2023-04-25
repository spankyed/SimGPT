import { World } from "../world/utils/types";

interface NavMeshTags {
  mesh?: string;

}

export function navMesh(world: World, tags: NavMeshTags = {}) {
  const nav_mesh = createEntity(world);
  
  const mesh = world.scene.getMeshByName('Navmesh');

  if (mesh){
    mesh.isVisible = false;
    // mesh.isPickable = false;
    // mesh.material = new BABYLON.StandardMaterial('navmesh-material', world.scene);
    // mesh.material.alpha = 0.5;
    // mesh.material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    // mesh.material.backFaceCulling = false;
    addComponent(world, nav_mesh, 'mesh', mesh);
  }

  addComponent(world, nav_mesh, 'navMesh', mesh);

  return nav_mesh;
}
