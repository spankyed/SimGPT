import { useEffect, useRef } from "react";
import './chat.css'

export default ({}: any) => {

  const mockMessages = [
    { user: true, text: "Hello, how are you?" },
    { user: false, text: "Hi, I'm fine, thanks!" },
    { user: true, text: "Nice to hear that" },
    { user: true, text: "Hello, how are you?" },
    { user: false, text: "Hi, I'm fine, thanks!" },
    { user: true, text: "Nice to hear that" },
    { user: true, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    { user: false, text: "Hi, I'm fine, thanks!" },
    { user: true, text: "Nice to hear that" },
  ];

  return (
    <>
      <div className="chat">
        <div className="chat-window">
        {
        mockMessages.map((message, i) => 
          <div className={ message.user ? "messages" : "messages dark" } key={i}>
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
