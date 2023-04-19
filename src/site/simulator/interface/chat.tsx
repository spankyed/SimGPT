import { useEffect, useRef } from "react";
import './chat.css'

export default ({}: any) => {

  const mockMessages = [
    { user: true, text: "Hello, how are you?" },
    { user: false, text: "Hi, I'm fine, thanks!" },
    { user: true, text: "Nice to hear that" },
  ];

  return (
    <>
      <div className="chat">
        <div className="chat-window">
        {
        mockMessages.map((message, i) => 
          <div className={ message.user ? "container" : "container dark" }>
            <img src={ message.user ? "https://www.w3schools.com//w3images/avatar_g2.jpg" : "https://www.w3schools.com//w3images/bandmember.jpg" } alt="Avatar" className={ message.user ? "right" : "" }/>
            <p>{message.text}</p>
          </div> 
        )
        }
        </div>
        <div className="chat-footer clearfix">
          <div className="input-wrapper">
            <input className="chat-input" id="chat" placeholder="Type here..." autoComplete="off"
                // onkeyup={e => (e.keyCode === 13 ? add(e) : null)}
              />
          </div>
        </div>
      </div>	
    </>
  );
}
