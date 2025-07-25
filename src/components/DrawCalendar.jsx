import { useState } from 'react'

function DrawCalendar() {
  const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  // Initialize the state with the result of the initializer function
  const [items, setItems] = useState(createInitialArray);

  // Define a function that generates the initial array
  function createInitialArray() {
    const day = 7;
    const time = 24;
    const data = [];
    for (let i = 0; i <= day; i++) {
        data[i] = []; // Initialize each row as an empty array
        for (let j = 0; j <= time; j++) {
            data[i][j] = i * time + j + 1; // Example: populate with sequential numbers
        }
    }
    return data;
  };

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