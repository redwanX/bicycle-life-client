import React from 'react'

const Review = (pros) => {
  const {ratings,desc,name}=pros.review
  return (
  <div class="own-card w-96 bg-base-100 shadow-xl">
  <div class="own-card-body">
    <h2 class="own-card-title">{ratings}</h2>
    <p>{desc}</p>
    <div class="own-card-actions justify-end">
      <button class="own-btn own-btn-primary">{name}</button>
    </div>
  </div>
</div>
  )
}

export default Review