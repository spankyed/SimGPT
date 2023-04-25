import { setDataProps } from "~/game/scene/config";
import { createEntity, addComponent } from "~/game/ecs/world/utils";
import { Vector3 } from "@babylonjs/core";
import { World } from "~/game/ecs/world/utils/types";

interface CharacterTags {
  mesh?: string;
  position?: [number, number, number];
}

export function character(world: World, tags: CharacterTags = {}) {
  const character = createEntity(world);

  const mesh = world.scene.getMeshByName(tags.mesh || '');

  if (mesh){
    setDataProps(mesh, {
      position: new Vector3(...(tags.position || [0, 0, 0])),
    })

    
    addComponent(world, character, 'mesh', mesh);
  }
  
  // world.addComponent(character, 'needs', {
  //   hunger: 100,
  //   energy: 100,
  //   hygiene: 100,
  //   social: 100,
  //   fun: 100
  // });

  // world.addComponent(character, 'behavior', {
  //   current: 'idle',
  //   target: null
  // });
  


  // consider returning a destroy function
  
  return character;
}

// function old (meshes, particleSystems, skeletons){
//   let player = meshes[0];
//   player.position = new BABYLON.Vector3(0, .05, 0);
//   player.isPickable = false; 
//   // skeleton for animation
//   let skeleton = skeletons[0];
//   skeleton.enableBlending(0.05);
//   player.skeleton = skeleton;
//   // collider for navigation
//   let box = BABYLON.MeshBuilder.CreateBox("box", {height: 5}, scene);
//   box.isPickable = false;  
//   box.checkCollision = true;
//   box.visibility = 0.0;
//   box.position = player.position.clone();
//   player.parent = box;

//   this.mesh = player; //set entity.mesh
//   this.skeleton = skeleton; //set entity.skeleton
// }
