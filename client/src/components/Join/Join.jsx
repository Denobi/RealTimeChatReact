import React, {useRef} from 'react';
import io from 'socket.io-client';


export default function Join({setChatVisibility, setSocket}) {
    const usernameRef = useRef();

    const handleSubmit =async ()=>{
        const username = usernameRef.current.value;
        if(!username.trim())return
        const socket = await io.connect('http://localhost:3001');
        socket.emit('set_username', username)
        setChatVisibility(true);
        setSocket(socket);
    }
  return (
    <div>
      <h1>JOIN</h1>
      <input type="text" ref={usernameRef} placeholder='Nome de Usuario'   
        onKeyDown={(e) => { 
                        if (e.key === "Enter") { 
                            handleSubmit()
                        } 
                    }} />
      <button onClick={() => handleSubmit()} >ENTRAR</button>
    </div>
  )
}
