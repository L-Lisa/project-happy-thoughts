import React from 'react'


export const Like = ({ thought, onThoughtLiked, _id }) => {


  const sendLike = `https://happy-happy-api.herokuapp.com/${thought._id}/like`
  const handleClick = () => {
    fetch(sendLike, {
      method: "POST",
      body: "",
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      onThoughtLiked(thought._id)
    })
  }

  return (
    <button
      onClick={handleClick}
      className={thought.hearts > 0 ? 'Liked' : 'Unliked'} >
      <span aria-label="click to like">{`❤️`}
      </span></button>
  )
}
