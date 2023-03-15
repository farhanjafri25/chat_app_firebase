import React from 'react'
import { useState, useContext } from 'react';
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where, updateDoc, getDoc } from "firebase/firestore";
import { db  } from '../firebase';
import { AuthContext } from '../Context/AuthContext';
import { ChatContext } from '../Context/ChatContext';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false); 
  const {currentUser} = useContext(AuthContext); 
  const {dispatch} = useContext(ChatContext)

  const handleSearch = async ()=> {

    const q = query(collection(db, "users"), where("displayName", "==", username));     
    try{
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc)=> {
      setUser(doc.data( ))
    })
  } catch(error){
    setErr(true); 
  }
  }

  const handleKey = (e) =>{
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async ()=> {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
    const res = await getDoc(doc(db, "chats", combinedId));
    if(!res.exists()){
      await setDoc(doc(db, "chats", combinedId), {messages: []});
      await updateDoc(doc(db, "userChats", currentUser.uid),{
        [combinedId+".userInfo"]: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
        },
        [combinedId+".date"]: serverTimestamp()
      });
 
      await updateDoc(doc(db, "userChats", user.uid),{
        [combinedId+".userInfo"]: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL
        },
        [combinedId+".date"]: serverTimestamp()
      });
    }
    const handleSelect = (u)=>{
      dispatch({type: "CHANGE_USER", payload: u})
  }
    }catch (error) {}
  setUser(null);
  setUsername(""); 
  };

  return (
    <div className='search '>
        <div className='searchForm' >
        <input type='text' placeholder='find a user' onKeyDown={handleKey} onChange={e => setUsername(e.target.value)}
        value={username}/>
        </div>
        {err && <span>User not found</span>}
        {user &&  <div className='userChat' onClick={handleSelect}>
            <img src={user.photoURL} alt='' />
            <div className='userChatInfo'>
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}

export default Search