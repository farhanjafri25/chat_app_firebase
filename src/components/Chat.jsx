import React from 'react';
import Cam from '../pages/img/cam.png';
import Add from '../pages/img/add.png';
import More from '../pages/img/more.png';
import Messages from './Messages';
import Input from './Input';
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';

const Chat = () => {

  const {data} = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className='chatInfo'> 
      <span>{data.user?.displayName }</span>  
        <div className="chatIcons">
            <img src={Cam} alt=''/>
            <img src={Add} alt=''/>
            <img src={More} alt=''/>
        </div>
      </div>
      <Messages/>
      <Input/> 
    </div>
  )
}

export default Chat
