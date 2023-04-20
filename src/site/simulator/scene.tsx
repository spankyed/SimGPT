import { memo, useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import CreateGame, { GameContext } from "../../game/main";

export default memo(({ antialias, engineOptions, adaptToDeviceRatio, onSceneReady, onRender, sceneOptions, ...rest } : any) => {
  const reactCanvas = useRef(null);

  const prepare = (context: GameContext) => {
    const { scene, engine } = context;

    const gameService = CreateGame(onRender);

    gameService.send('PREPARE', context);

    if (typeof onSceneReady === "function") onSceneReady(scene, engine);

    window.scene = scene;
    window.gameService = gameService;
  };

  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;
    
    // set up basic engine and scene
    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);

    if (scene.isReady()) {
      prepare({ scene, engine });
    } else {
      scene.onReadyObservable.addOnce((scene) => prepare({ scene, engine }));
    }

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener("resize", resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener("resize", resize);
      }
    };
  }, [antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady]);

  return (
    <>
      <canvas ref={reactCanvas} {...rest} />
    </>
  );
});
