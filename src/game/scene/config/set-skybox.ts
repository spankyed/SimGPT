
import {
	Scene,
	Color3,
	CubeTexture,
	MeshBuilder,
	StandardMaterial,
	Texture,
} from "@babylonjs/core";

export function setSkybox(scene: Scene) {
	let skybox = MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
	let skyboxMaterial = new StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new CubeTexture("assets/textures/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
	skyboxMaterial.specularColor = new Color3(0, 0, 0);
	skybox.material = skyboxMaterial;			
}

function matrix(scene: Scene) {
	// diameter = size of skybox
	// https://www.babylonjs-playground.com/#WF90TC#1

	let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 900, segments: 32}, scene);

	let _blue_skin = new BABYLON.StandardMaterial("blue_skin");
	_blue_skin.alpha = 1.0;
	_blue_skin.emissiveColor = BABYLON.Color3.Blue();
	_blue_skin.backFaceCulling = false;
	_blue_skin.wireframe = true;
    
	sphere.material = _blue_skin;		
}
