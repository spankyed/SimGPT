
import {
	Scene,
	Color3,
	CubeTexture,
	MeshBuilder,
	StandardMaterial,
	Texture,
} from "@babylonjs/core";

export function setSkybox(scene: Scene) {
	var skybox = MeshBuilder.CreateBox("skyBox", { size:1000.0 }, scene);
	var skyboxMaterial = new StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new CubeTexture("assets/textures/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
	skyboxMaterial.specularColor = new Color3(0, 0, 0);
	skybox.material = skyboxMaterial;			
}
