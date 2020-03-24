import React, { useState, useEffect } from "react"
import {HappyWords} from "./HappyWords"
import moment from "moment"
import {Like} from "./Like"

export const App = () => {
const [thoughts, setThoughts] = useState([])
const [happyWords, setHappyWords] = useState([])
const fetchUrl = "https://technigo-thoughts.herokuapp.com/"



const handleSubmit = event => {
  event.preventDefault();
  fetch(fetchUrl, { 
    method: 'POST', 
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: happyWords })
  })
    .then((res) => res.json())
    .then((newThought) => {
      setThoughts((thoughts) => [newThought, thoughts])
      window.location.reload()
    })
  
}

  useEffect(() => {
    fetch(fetchUrl)
    .then(res => res.json())
    .then(json=> 
    setThoughts(json)
    )
  },[]);

 /*  WHY??? */
const onThoughtLiked = (likedThoughtId) => {
    const updatedThoughts = thoughts.map((thought) => {
      if (thought._id === likedThoughtId) {
        thought.hearts += 1
      }
      return thought
    })
    setThoughts(updatedThoughts)
  }

  return (
    <div className="WrapperDiv">
      <form className="FormDiv" onSubmit ={handleSubmit}>
        
          <HappyWords happyWords={happyWords} setHappyWords={setHappyWords}/>
         
      </form>
    <div>
      <ul>
         {thoughts.map(thought => (
              <li className="HappyThoughtsCard"> 
               <p className=" thought-txt"> {thought.message}</p>
               <p className="thought-time">{moment(thought.createdAt).fromNow()}</p>
              <p className="thought-hearts"> <span aria-hidden="true">X</span> {thought.hearts} <span className ="visually-hidden">likes</span></p>
             <Like key={thought._id}
          thought={thought}
          onThoughtLiked={onThoughtLiked}/>
          
              </li>
         ))};
         </ul>

         
    </div>
    </div>

    
  )
}
