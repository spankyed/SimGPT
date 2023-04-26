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
      factory: 'character',
      position: [42.5, 0, -25],
      mesh: '__root__',
    },
    // navigation mesh
    // {
    //   id: 'nav-mesh',
    //   factory: 'navMesh',
    //   mesh: 'navMesh',
    // },
    // cameras
    // {
    //   id: 'camera-character',
    //   factory: 'camera',
    //   // main camera true?
    //   camera: {
    //     type: 'arcRotateCamera',
    //     args: [
    //       'character-camera',
    //       0,
    //       0,
    //       10,
    //       [0, 0, 0],
    //       // scene appended
    //     ],
    //     options: {
    //       // limit rotation angle
    //       lowerBetaLimit: 0.9,
    //       upperBetaLimit: Math.PI / 2,
    //       // limit zoom distance
    //       lowerRadiusLimit: 3,
    //       upperRadiusLimit: 25,
    //       // limit zoom speed
    //       wheelDeltaPercentage: 0.005,
    //       // limit rotation speed
    //       inertia: 0.6,
    //       // set input keys
    //       // keysUp: [87],
    //       // keysDown: [83],
    //       // keysLeft: [65],
    //       // keysRight: [68],
    //     },
    //   }
    // },
    {
      id: 'camera-free',
      type: 'camera',
      factory: 'camera',
      // main camera true?
      camera: {
        type: 'freeCamera',
        args: [
          'free-camera',
          [14.6, 75, -101],
        ],
        options: {
          target: [33.4, 52.6, -76.4],
        },
      }
    },
    // lights
    {
      id: 'dining-room-light',
      factory: 'light',
      light: {
        type: 'spot',
        args: [
          'dining-room-light',
          [74.76, 18.19, -46.84],
          [0, -1, 0],
          Math.PI,
          10,
          // scene appended
        ],
        options: {
          intensity: 100,
        }
      }
    },
    {
      id: 'hemispheric-light',
      factory: 'light',
      light: {
        type: 'hemispheric',
        args: ["light", [0, 1, 0]],
        options: {
          intensity: .7,
        }
      }
    },
  ]
}