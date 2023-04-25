import { assign, interpret, Machine } from 'xstate';
import { Scene, Engine } from '@babylonjs/core';
import { Sender } from 'xstate/lib/types';
import { prepareScene } from './scene/prepare';
import createWorld from './ecs/world/create';

export interface GameContext {
  scene?: Scene;
  engine?: Engine;
  world?: any;
}

interface GameStateSchema {
  states: {
    loading: {};
    preparing: {};
    running: {};
  };
}

export type GameEvent =
  | { type: 'PREPARE'; scene: Scene; engine: Engine; } 
  | { type: 'RUN', world: any };

export type GameService = ReturnType<typeof createGame>;

export default function createGame(onRender: any) {
  const gameMachine = Machine<GameContext, GameStateSchema, GameEvent>(
    {
      id: 'game',
      initial: 'loading',
      context: {
        scene: undefined,
        engine: undefined,
        world: null,
      },
      states: {
        loading: {
          on: {
            PREPARE: {
              actions: assign({
                scene: (_, event) => event.scene,
                engine: (_, event) => event.engine,
              }),
              target: 'preparing',
            },
          },
        },
        preparing: {
          invoke: {
            id: 'prepare',
            src: ({ scene }: GameContext) => (callback: Sender<GameEvent>) => {
              console.log('Preparing scene');
          
              prepareScene(scene!, () => {
                // const { meshes, lights, cameras} = context;
                const world = createWorld(scene);
                callback({ type: 'RUN', world });
              });
              
            },
          },
          on: {
            RUN: {
              actions: assign({
                world: (_, event) => event.world,
              }),
              target: 'running',
            },
          },
        },
        running: {
          entry: ({ engine, scene, world}) => {
            engine?.runRenderLoop(() => {
              onRender?.(scene);
              world.update();
              scene?.render();
            });
  
            console.log('Running')
          },
          // activities: 'checkIfActive',
          // on TICK update world
        },
      },
    },
    {
      // guards: {
      //   sceneDefined: (_, { scene, engine }) => (scene && engine),
      //   isAllOrdersCompleted: ({ data, result }) =>
      //   data.orders.length === result.currentOrder,
      //   isTimeout: context => context.remainingTime <= 0,
      // },
    }
  );

  const gameService = interpret(gameMachine).start();

  return gameService;
}

