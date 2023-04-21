
import {
  Scene,
  GizmoManager,
  Light,
  LightGizmo,
} from "@babylonjs/core";

export function setGizmos(customLight: Light, scene: Scene): void {
  const lightGizmo = new LightGizmo();
  lightGizmo.scaleRatio = 2;
  lightGizmo.light = customLight;

  const gizmoManager = new GizmoManager(scene);
  gizmoManager.positionGizmoEnabled = true;
  gizmoManager.rotationGizmoEnabled = true;
  gizmoManager.usePointerToAttachGizmos = true;
  // gizmoManager.usePointerToAttachGizmos = false;
  gizmoManager.attachToMesh(lightGizmo.attachedMesh);
}

