import { doc, onSnapshot } from 'firebase/firestore';
import React,{useContext, useState} from 'react'
import { useEffect } from 'react';
import { ChatContext } from '../Context/ChatContext';
import { db } from '../firebase';
import Message from './Message'

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const {data} = useContext(ChatContext);

  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return ()=>{
      unSub()
    }
  },[data.chatId])
  return (
    <div className='messages'>
      {messages.map((m)=>{
        <Message message={m} key = {m.id}/>
      })}    
    </div>
  )
}
