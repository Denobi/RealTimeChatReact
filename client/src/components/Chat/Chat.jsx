import React, { useRef, useState, useEffect } from 'react'


export default function Chat({ socket }) {
  const messageRef = useRef();
  const userRef = useRef();

  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState([]);

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList((current) => [...current, data])
    })

    return () => socket.off('receive_message');

  }, [socket])

  useEffect(() => {
    socket.on('get_username', data => {
      setUsername((current) => [current, data])
    })

    return () => socket.off('get_username');

  }, [socket])

  const handleSubmit = () => {
    const message = messageRef.current.value
    if (!message.trim()) return

    socket.emit('message', message);
    clearInput()



  }
  const initPage = () => {
    const userNames = useEffect.current.value()

    socket.on('get_username', userNames);
  }

  const clearInput = () => {
    messageRef.current.value = '';
  }

  return (
    <div id='chatDiv'>
      <div className="menuArea">
        <h3>Seja Bem-Vindo(a) </h3>
          {
            username.map((author) =>(
              <p key={author}>{author.author}</p>
            ))
          }
        
      </div>
      <div className="optsGeral">
        <div className="inputArea" >
          <h1>CHAT</h1>

          <input type="text" ref={messageRef} placeholder='Mensagem' />
          <button onClick={() => handleSubmit()}>ENVIAR</button>
        </div>
        <div className='chatText'>

          {
            messageList.map((message, index) => (
              <p key={index}>{message.author}: {message.text}</p>
            ))
          }
        </div>
      </div>
    </div>
  )
}
