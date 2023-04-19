import { useEffect, useRef, useState } from "react";
import Chat from "./chat";
import './interface.css'

export default ({}: any) => {
  return (
    <>
      <div className="interface">

        <Help/>

        <Chat />

      </div>	
    </>
  );
}

function Help () {
  const [showHelp, toggleHelp] = useState(false);

  const help = () => {
    toggleHelp(!showHelp);
  }


  return (
    <>
      <div className="help">
        <div className="help-button">
          <button onClick={help}>Help</button>
        </div>
        {/* <div className="help-window">
          <p>Help content here</p>
        </div> */}
      </div>
    </>
  );
}