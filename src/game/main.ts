import { assign, interpret, Machine } from 'xstate';
import { Scene, Engine } from '@babylonjs/core';
import { Sender } from 'xstate/lib/types';
import { prepareScene } from './scene/prepare';


export interface GameContext {
  scene?: Scene;
  engine?: Engine;
  // ecs?: Engine;
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
  | { type: 'RUN' };

export const gameMachine = Machine<GameContext, GameStateSchema, GameEvent>(
  {
    id: 'game',
    initial: 'loading',
    context: {
      scene: undefined,
      engine: undefined,
      // ecs: null,
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
              callback({ type: 'RUN' });
            });
          },
        },
        on: {
          RUN: 'running',
        },
      },
      running: {
        entry: ({ engine, scene}) => {
          engine?.runRenderLoop(() => {
            // if (typeof onRender === "function") onRender(scene);
            scene?.render();
          });

          console.log('Running')
        },
        // activities: 'checkIfActive',
        // on TICK update ecs
      },
    },
  },
  {
    // guards: {
    //   isAllOrdersCompleted: ({ data, result }) =>
    //   data.orders.length === result.currentOrder,
    //   isTimeout: context => context.remainingTime <= 0,
    // },
  }
);

export type GameService = ReturnType<typeof createGame>;

export default function createGame(onRender: any) {
  const gameService = interpret(gameMachine).start();
  return gameService;
}

