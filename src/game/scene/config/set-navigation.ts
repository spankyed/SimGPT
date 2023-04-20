
// import {
//   Scene,
//   FreeCamera,
//   Vector3,
// } from "@babylonjs/core";
// import  "babylon-navigation-mesh";
import * as Navigation from "babylon-navigation-mesh";

function setupNavigation(navMesh: any) {
  console.log('Navigation: ', Navigation);
  let navigation = new Navigation();
  let zoneNodes = navigation.buildNodes(navMesh);
  navigation.setZoneData('level', zoneNodes);
  return navigation;
}

function getPath(navigation: any, points: any) {
  let group = navigation.getGroup('level', points.start);
  let path = navigation.findPath(points.start, points.destination, 'level', group) || [];
  return path;
}
