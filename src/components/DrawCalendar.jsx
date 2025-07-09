import { useState } from 'react'

function DrawCalendar({items}) {
  const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  return (<>
  {items.map((item, index) => {
    return <div key={index} className="week">
      {index > 0 ? (<div>{dayOfWeek[index-1]}</div>) : (<div></div>)}
      {item.map((innerItem, innerIndex) => {
          return index > 0 ? (
            <div className="hour"></div>) : (
              innerIndex > 0 ? (
              <div className="hour word">{`${innerIndex}:00`}</div>) : (<></>)
            )
      })}
    </div>
  })}</>)
}

export default DrawCalendar