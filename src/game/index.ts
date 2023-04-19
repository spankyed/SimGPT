
import { useEffect, useRef, useState } from "react";
// import * as BABYLON from "babylonjs";
import {
  Scene,
  Engine,
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  SceneLoader,
  AbstractMesh,
  GlowLayer,
  LightGizmo,
  GizmoManager,
  Light,
  Color3,
  DirectionalLight,
  PointLight,
  SpotLight,
  ShadowGenerator,
  AssetsManager,
  IShadowLight,
} from "@babylonjs/core";

import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders";
// import  "babylon-navigation-mesh";
import * as Navigation from "babylon-navigation-mesh";

let box: any;

const onSceneReady = async (scene: Scene) => {
  // This creates and positions a free camera (non-mesh)
  const cameraPosition = new Vector3(94, 43, -37.2);
  // const cameraPosition = new Vector3(65, 22, -51);
  const cameraTarget   = new Vector3(100, 21, -60);
  const camera = new FreeCamera("camera1", cameraPosition, scene);

  // This targets the camera to scene origin
  camera.setTarget(cameraTarget);

  window.scene = scene;

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  const dinnerLampPos   = new Vector3(74.76, 18.19, -46.84);
  
  // const lightDining = new SpotLight(
  //   "light", 
  //   dinnerLampPos, 
  //   new Vector3(0, -1, 0), 
  //   Math.PI,
  //   10,
  //   scene
  //   ) as Light;

  //   lightDining.intensity = 200;

  const spotLight = new SpotLight(
    "spotLight",
    dinnerLampPos,
    new Vector3(0, -1, 0),
    Math.PI,
    10,
    scene
  );

  spotLight.intensity = 100;

  // createGizmos(lightDining, scene);
  createGizmos(spotLight, scene);

  scene.shadowsEnabled = true;

  await loadMeshes(scene, () => enableShadows(spotLight, scene));
  scene.debugLayer.show();

  // const gizmoManager = new GizmoManager(scene);

  // gizmoManager.attachToMesh(scene.meshes[0]);

  // gizmoManager.usePointerToAttachGizmos = false;

  const navmesh = scene.getMeshByName("Navmesh");
  // const navigation = setupNavigation(navmesh);
  // console.log('navigation: ', navigation);

  // const path = getPath(navigation, playerPos, destination);
};

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: any) => {
  // if (box !== undefined) {
  //   const deltaTimeInMillis = scene.getEngine().getDeltaTime();

  //   const rpm = 10;
  //   box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  // }
};


function enableShadows(light: IShadowLight, scene: Scene){
  console.log('scene.meshes: ', scene.meshes);
  light.shadowEnabled = true;
  light.shadowMinZ = 1;
  // light.shadowMaxZ = 10;

  const shadowGen = new ShadowGenerator(1024, light);
  shadowGen.bias = 0.0005;
  // const shadowGen = new ShadowGenerator(2048, light);
  shadowGen.useBlurCloseExponentialShadowMap = true;

  scene.meshes.map((mesh) => {
    console.log('mesh: ', mesh);
    // debugger
    shadowGen.addShadowCaster(mesh);
    mesh.receiveShadows = true;
  });

}


function loadMeshes1(scene: any, callback?: any) {
  const files = {
    root: "./assets/",
    house: "house_low_A_roofed.babylon",
    player: "ej_A_2.glb",
    navmesh: "navmesh_A.babylon",
  }

  const assetsManager = new AssetsManager(scene);
  const meshTask = assetsManager.addMeshTask("main_task", "", "./assets/", "house_low_A_roofed.babylon");
  meshTask.onSuccess = function (task) {
    task.loadedMeshes.forEach((mesh: any) => {
      mesh.position = new Vector3(0, 0, 0);
    });
    callback()
  };
  assetsManager.load();
}

async function loadMeshes(scene: any, callback?: any) {
  const files = {
    root: "./assets/",
    house: "house_a_min.babylon",
    player: "ej_A_2.glb",
    nav: "nav_a_min.babylon",
  }
  // const assetsManager = new AssetsManager(scene);
  // ! async blocking
  const { meshes: playerMeshes } = await SceneLoader.ImportMeshAsync(
    "",
    files.root,
    files.player,
    scene
  );

  playerMeshes.forEach((mesh: any) => {
    const playerPosition = new Vector3(50, 0, 0);
    mesh.position = playerPosition;
  });


  await SceneLoader.ImportMeshAsync(
    "",
    files.root,
    files.nav,
    scene
  );

  const { meshes } = await SceneLoader.ImportMeshAsync(
    "",
    files.root,
    files.house,
    // "LightingScene.glb"
    scene
  );

  meshes.forEach((mesh: any) => {
    mesh.position = new Vector3(0, 0, 0);
  });
  callback()
}

function createGizmos(customLight: Light, scene: Scene): void {
  const lightGizmo = new LightGizmo();
  lightGizmo.scaleRatio = 2;
  lightGizmo.light = customLight;

  const gizmoManager = new GizmoManager(scene);
  gizmoManager.positionGizmoEnabled = true;
  gizmoManager.rotationGizmoEnabled = true;
  gizmoManager.usePointerToAttachGizmos = false;
  gizmoManager.attachToMesh(lightGizmo.attachedMesh);
}

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


export {
  onSceneReady,
  onRender,
}