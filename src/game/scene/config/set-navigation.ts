
// import {
//   Scene,
//   FreeCamera,
//   Vector3,
// } from "@babylonjs/core";
// import  "babylon-navigation-mesh";
import * as Navigation from "babylon-navigation-mesh";

export interface Navigation {
  buildNodes: Function;
  setZoneData: Function;
  getGroup: Function;
  findPath: Function;
}

export function setupNavigation(navMesh: any) {
  console.log('Navigation: ', Navigation);
  let navigation = new Navigation() as Navigation;
  let zoneNodes = navigation.buildNodes(navMesh);
  navigation.setZoneData('level', zoneNodes);
  return navigation;
}

export function getPath(navigation: any, points: any) {
  let group = navigation.getGroup('level', points.start);
  let path = navigation.findPath(points.start, points.destination, 'level', group) || [];
  return path;
}
