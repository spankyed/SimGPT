var createScene = function () {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'sphere' shape.
  var box = BABYLON.MeshBuilder.CreateBox("box", {size:2}, scene);
  box.rotationQuaternion = new BABYLON.Quaternion();
  // Move the sphere upward 1/2 its height
  box.position.y = 1;

  // Our built-in 'ground' shape.
  var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

  const world = new World([box])

  const frameInterpolator = new FrameInterpolator();

  const inter = new PositionOrientationInterpolation(box.position, box.rotationQuaternion)
  frameInterpolator.addInterpolation(inter)

  let startTime = performance.now()	
  let accumulator = 0
  let simulationSpeedFactor = 1//Not required, but a cool way to speed up/down a simulation in order to dynamically adjust an input buffer in a networked simulation, as used by Overwatch
scene.registerBeforeRender(()=>{
      const now = performance.now()
  const delta = (now-startTime)/1000
  startTime = now
  accumulator += delta <= 0.4 ? delta : 0.4
  while (accumulator >= 0.016*simulationSpeedFactor) {
    accumulator -= 0.016
    world.update(0.016)
          frameInterpolator.updateFixed(0.016)
  }
      const alpha = accumulator/0.016
      //frameInterpolator.update(alpha)
})


  return scene;
};


class World{
  constructor(meshes){
      this.meshes = meshes
      this.tick = 0
  }
  update(dt){
      this.tick++
      this.meshes.forEach(mesh => {
          mesh.position.x = Math.sin(this.tick*dt*3)*3
          mesh.position.z = Math.cos(this.tick*dt*3)*3
          mesh.rotate(BABYLON.Axis.Y, dt*5, BABYLON.Space.LOCAL)
      })
  }
}


class FrameInterpolator {
  constructor(){
      this.interpolations = new Set()
  }

  addInterpolation(interpolation){
      this.interpolations.add(interpolation)
  }

  updateFixed(dt){
      this.interpolations.forEach(interpolation => {
          if(interpolation.remove){
              this.interpolations.delete(interpolation)
              return
          }
          interpolation.updateFixed(dt)
      })
  }

  update(alpha){
      this.interpolations.forEach(interpolation => {
          if(interpolation.remove){
              this.interpolations.delete(interpolation)
              return
          }
          interpolation.update(alpha)
      })
  }
}



class PositionOrientationInterpolation{
  constructor(pos1, rot1){
      this.interpolatedPosition = pos1
      this.interpolatedOrientation = rot1
      this.previousPosition = pos1.clone()
      this.currentPosition = pos1.clone()
      this.previousOrientation = rot1.clone()
      this.currentOrientation = rot1.clone()
  }

  updateFixed(dt){
      this.previousPosition.copyFrom(this.currentPosition)
      this.previousOrientation.copyFrom(this.currentOrientation)
      this.currentPosition.copyFrom(this.interpolatedPosition)
      this.currentOrientation.copyFrom(this.interpolatedOrientation)
  }

  update(alpha){
      BABYLON.Vector3.LerpToRef(this.previousPosition, this.currentPosition, alpha, this.interpolatedPosition)
      BABYLON.Quaternion.SlerpToRef(this.previousOrientation, this.currentOrientation, alpha, this.interpolatedOrientation)
  }
}