import { Color3, Scene } from "@babylonjs/core";

export function setFog(scene){
	// scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
	// scene.fogDensity = 0.01;
	// scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
	// scene.fogEnabled = true;

	scene.fogMode = Scene.FOGMODE_LINEAR;
	// scene.fogMode = Scene.FOGMODE_EXP;
	scene.fogColor = Color3.Black();
	// scene.fogColor = new Color3(0.9, 0.9, 0.85);
	scene.fogDensity = 0.02;
	scene.fogStart = 90;
	scene.fogEnd = 250;
	scene.fogEnabled = true;
}