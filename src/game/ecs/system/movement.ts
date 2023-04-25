import { Navigation, setupNavigation } from 'src/game/scene/config/set-navigation';
import { World } from '../utils/ecs';
import { Entity } from '../world/config/world-state';
import { Scene, Vector3 } from '@babylonjs/core';
// import { WorldEvent } from '../world/utils/types';

export function movement() {
  let navigation: Navigation | null = null;

  return {
    name: 'movement',
    requirements: [],
    entities: [],
    create: (world: World) => {
      // const navEntity = findFirst('Navmesh', world);
      navigation = setupNavigation(world.scene.getMeshByName('Navmesh'));
    },
    // move to clicked coordinates then stop entity
    update: (world: World, entity: Entity) => {
      // const path = entity.get('path');
      const hasPath = entity.path && entity.path.length > 0;

      if (!hasPath) {
        const path = getPath(navigation, entity.mesh.position, entity.destination);

        world.send('SET_PATH', { entity, path });

        if (path.length > 0) {
          world.send('SET_DESTINATION', { entity, destination: path[0] });
        }
      } else {
        const events = getMoveEvents(entity);

        events.forEach(([name, data]) => world.send(name, data));
      }
    },
    events: {
      // ! should not have side effects, only update component state
      'SET_PATH': () => {},
      'SET_DESTINATION': () => {},
      // 'USER_SET_DESTINATION': () => {},
      'STOP_NAVIGATION': () => {
        // animation system should also listen for this event
      },
    },
  }
}

function getPath(navigation, start: Vector3, end: Vector3) {
  let group = navigation.getGroup('level', start);
  let path = navigation.findPath(start, end, 'level', group) || [];
  
  return path || [];
}

function getMoveEvents(entity) {
  const { mesh, destination, path } = entity.navigation;
  const events: any[] = [];

  if (destination) {
    let moveVector = destination.subtract(mesh.parent.position); // parent position is being changed, not entity

    if (moveVector.length() > 0.1) {
      moveVector = moveVector.normalize(); // get unit vector
      moveVector = moveVector.scale(0.05); // speed scaler

      // mesh.parent.moveWithCollisions(moveVector);//move entity
      events.push(['MOVE_TO', { entity, moveVector }])  
    } else if (path.length > 0) {
      const [last, ...newPath] = path;

      events.push(['SET_PATH', { entity, destination: newPath[0] }])  

      if (newPath[0]) {
        // entity.destination = entity.path[0];
        events.push(['SET_DESTINATION', { entity, destination: newPath[0] }])  
      } else {
        // entity.moving = false;
        // entity.path = null; //noclip if path remains defined
        // entity.destination = null; 
        events.push(['STOP_NAVIGATION', { entity }])  
      }
    }
    //two lines below redundant?
    let moveVectorNormalized = moveVector.normalize();
    let finalMoveVector = moveVectorNormalized.scale(1); // speed scalar

    let v1 = new Vector3(0,0,1);
    let v2 = moveVectorNormalized;

    //cosθ = a ⋅ b  ⋅/⋅  |a||b|
    let productVector = Vector3.Dot(v1, v2);
    let productLength = v1.length() * v2.length();
    let angle = Math.acos(productVector / productLength);

    // rotate avatar; should only do if entity needs to rotate
    if (!isNaN(angle)) {
      if (moveVectorNormalized.x < 0) angle = angle * -1;
      // calculate both angles in degrees
      let angleDegrees = Math.round(angle * 180/Math.PI);
      let playerRotationDegress = Math.round(mesh.rotation.y * 180/Math.PI);

      // calculate the delta
      let deltaDegrees = playerRotationDegress - angleDegrees;

      // check what direction to turn to take the shortest turn
      if (deltaDegrees > 180){
        deltaDegrees = deltaDegrees - 360;
      } else if (deltaDegrees < -180){
        deltaDegrees = deltaDegrees + 360;
      }

      let rotationSpeed = Math.round(Math.abs(deltaDegrees)/8);
      let by180 = rotationSpeed * Math.PI/180;

      let newRotationY = deltaDegrees > 0
        ? mesh.rotation.y - by180
        : mesh.rotation.y + by180;

      if (deltaDegrees > 0 && newRotationY < -Math.PI){
        // mesh.rotation.y = Math.PI;
        events.push(['TRANSFORM', { entity, rotation: { y: Math.PI }}])  
      }

      if (deltaDegrees < 0 && newRotationY > Math.PI){
        // mesh.rotation.y = -Math.PI;
        events.push(['TRANSFORM', { entity, rotation: { y: -Math.PI }}])  
      }

      events.push(['TRANSFORM', { entity, rotation: { y: newRotationY }}])  

      // if  (deltaDegrees > 0){
      //   // mesh.rotation.y -= rotationSpeed * Math.PI/180;
      //   const newRotationY = mesh.rotation.y - rotationSpeed * Math.PI/180;
      //   events.push(['TRANSFORM', { entity, rotation: { y: newRotationY }}])  

      //   if (newRotationY < -Math.PI){
      //     // mesh.rotation.y = Math.PI;
      //     events.push(['TRANSFORM', { entity, rotation: { y: Math.PI }}])  
      //   }
      // }
      // if (deltaDegrees < 0 ) {
      //   // mesh.rotation.y += rotationSpeed * Math.PI / 180;
      //   const newRotationY = mesh.rotation.y + rotationSpeed * Math.PI/180;
      //   events.push(['TRANSFORM', { entity, rotation: { y: newRotationY }}])  

      //   if (newRotationY > Math.PI){
      //     // mesh.rotation.y = -Math.PI;
      //     events.push(['TRANSFORM', { entity, rotation: { y: -Math.PI }}])  
      //   }
      // } 
    } else {
      console.log('You shouldnt be here..');
    }
  } else {
      debugger;
      console.error('No destination to move to');
  }

  return events;
}