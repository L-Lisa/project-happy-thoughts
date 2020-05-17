import React, { useState, useEffect } from "react"
import { HappyWords } from "./HappyWords"
import moment from "moment"
import { Like } from "./Like"

export const App = () => {
  const [thoughts, setThoughts] = useState([])
  const [happyWords, setHappyWords] = useState([])
  const fetchUrl = "http://localhost:8080/"
  /* const fetchUrl = "https://technigo-thoughts.herokuapp.com/" */


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
      .then(json =>
        setThoughts(json)
      )
  }, []);


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
      <form className="FormDiv" onSubmit={handleSubmit}>

        <HappyWords happyWords={happyWords} setHappyWords={setHappyWords} />

      </form>
      <div>     {/* I wanted this to be a component but just could not get it to work, if you have time id love some words on what i should have done. what are the props that need to be passed. Im lost!! */}
        <ul>
          {thoughts.map(thought => (
            <li className="HappyThoughtsCard">
              <p className=" Thought-txt"> {thought.message}</p>

              <div className="BottomSection">
                <div className="Left">
                  <Like key={thought._id}
                    thought={thought}
                    onThoughtLiked={onThoughtLiked} />
                  <p className="number-hearts"> <span aria-hidden="true">X</span> {thought.hearts} <span className="visually-hidden">likes</span></p>
                </div>
                <div className="Right">
                  <p className="Thought-time">{moment(thought.createdAt).fromNow()}</p>
                </div>
              </div>
            </li>
          ))};
         </ul>
      </div>
    </div>
  )
}
