export type WorldState = {
  entities: Entity[];
};

export type Entity = {
  id: string;
  type?: string; // anonymous entity
  [key: string]: any;
};

// Initial world state
export default {
  entities: [
    // characters
    {
      id: 'dj',
      type: 'character',
      position: [42.5, 0, -25],
      mesh: '__root__',
    },
    // navigation mesh
    {
      id: 'nav-mesh',
      type: 'navMesh',
      mesh: 'navMesh',
    },
    // cameras
    {
      id: 'camera-1',
      type: 'camera',
      camera: 'camera1',
      target: [33.4, 52.6, -76.4],
      position: [14.6, 75, -101],
    },
    // lights
    {
      id: 'dining-room-light',
      type: 'light',
      light: {
        type: 'spot',
        args: [
          'dining-room-light',
          [74.76, 18.19, -46.84],
          [0, -1, 0],
          Math.PI,
          10,
        ],
        options: {
          intensity: 100,
        }
      }
    },
    {
      id: 'hemispheric-light',
      type: 'light',
      light: {
        type: 'spot',
        args: ["light", [0, 1, 0]],
        options: {
          intensity: .7,
        }
      }
    },
  ]
}
