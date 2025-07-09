import { useState } from 'react'
import DrawCalendar from './components/DrawCalendar.jsx';
import './App.css'

let nextId = 0;

function App() {

  // define the form action when submitted start and end time of the event
  async function formAction(formData) {
    setStartTimes([
      ...startTimes, 
      { id: nextId++, time: formData.get("starttime") }
    ])
    setEndTimes([
      ...endTimes, 
      { id: nextId++, time: formData.get("endtime") }
    ])

    setTimes({
      ...times,
      startTimes: [
        ...times.startTimes,
        { id: nextId++, time: formData.get("starttime")}
      ],
      endTimes: [
        ...times.endTimes,
        { id: nextId++, time: formData.get("endtime")}
      ]
    })

    const timeData = JSON.parse(localStorage.getItem("calendar-app"))

    // Placing time data into localstorage for future retrieval
    if(!timeData) {
      localStorage.setItem("calendar-app", JSON.stringify([{
        starttime: formData.get("starttime"),
        endtime: formData.get("endtime")
      }]));
    } else {
      let obj = [...timeData, {
        starttime: formData.get("starttime"),
        endtime: formData.get("endtime")
      }]
      localStorage.setItem("calendar-app", JSON.stringify(obj))
    }
  }

  function initializeTimeVariable() {
    const timeData = JSON.parse(localStorage.getItem("calendar-app"))

    if(!timeData) return {startTimes,endTimes}

    let obj = {
      startTimes: [],
      endTimes: []
    }

    for(let i = 0; i < timeData.length; i++) {
      obj["startTimes"].push({id: i, time: timeData[i].starttime})
      obj["endTimes"].push({id: i, time: timeData[i].endtime})
      nextId++
    }

    return obj
  }

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

  // Initialize the state with the result of the initializer function
  const [items, setItems] = useState(createInitialArray);

  // Initialize the state of the start and end time
  const [startTimes, setStartTimes] = useState([])
  const [endTimes, setEndTimes] = useState([])

  const [times, setTimes] = useState(initializeTimeVariable)

  return (
    <>
    <form action={formAction}>
      <h2>Form Submit</h2>
      <br></br>
      <label>
        Start Time
        <input type="time" name="starttime" />
      </label>
      <label>
        End Time
        <input type="time" name="endtime" />
      </label>
      <button type="submit">Submit</button>
    </form>
    <div className="block">
      <h2>Form Output</h2>
      <div className="startTime">
        <h3>Start Time</h3>
        <ol>
          {times.startTimes.map(time => (
            <li key={time.id}>{time.time}</li>
          ))}
        </ol>
      </div>
      <div className="endTime">
        <h3>End Time</h3>
        <ol>
          {times.endTimes.map(time => (
            <li key={time.id}>{time.time}</li>
          ))}
        </ol>
      </div>
    </div>
    <div className="formVisual">
      <h2>Form Visual</h2>
        <div className="calendar">
          <DrawCalendar items={items}/>
        </div>
    </div>
    </>
  )
}

export default App
