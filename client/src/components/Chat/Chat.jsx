import React, { useRef, useState, useEffect } from 'react'

export default function Chat({socket}) {
  const messageRef = useRef();

  const [messageList,setMessageList ] = useState([]);

  useEffect(()=>{
    socket.on('receive_message', data =>{
      setMessageList((current)=>[...current, data])
    })

    return ()=>socket.off('receive_message');

  },[socket])

  const handleSubmit = ()=>{
    const message = messageRef.current.value 
    if(!message.trim())return

    socket.emit('message', message);



  }

  const clearInput = () =>{
    messageRef.current.value='';
  }

  // const onPlayed =  messageList.map((message,index)=>(
  //     return(message.author);
  //   ))
  

  return (
    <div id='chatDiv'>
      <div className="inputArea" >
        <h1>CHAT</h1>
        {
         
        }
        
        <input type="text" ref={messageRef} placeholder='Mensagem' />
        <button onClick={()=>handleSubmit()}>ENVIAR</button>
      </div>
      <div id='chatText'>
        
        {
          messageList.map((message,index)=>(
            <p key={index}>{message.author}: {message.text}</p>
          ))
        }
      </div>
    </div>
  )
}
