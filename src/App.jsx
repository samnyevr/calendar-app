import { useState } from 'react'
import DrawCalendar from './components/DrawCalendar.jsx';
import './App.css'
import * as Helpers from './functions/helpers.js'

let nextId = 0;

function App() {

  // define the form action when submitted start and end time of the event
  async function formAction(formData) {
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    setTimes({
      ...times,
      startDates: [
        ...times.startDates,
        { id: nextId++, date: formData.get("startdate"), day: new Date(formData.get("startdate")).getDay()}
      ],
      startTimes: [
        ...times.startTimes,
        { id: nextId++, time: formData.get("starttime")}
      ],
      endDates: [
        ...times.endDates,
        { id: nextId++, date: formData.get("enddate"), day: new Date(formData.get("enddate")).getDay()}
      ],
      endTimes: [
        ...times.endTimes,
        { id: nextId++, time: formData.get("endtime")}
      ],
      tasks: [
        ...times.tasks,
        { id: nextId++, task: formData.get("task")}
      ],
      categories: [
        ...times.categories,
        { id: nextId++, category: formData.get('category')}
      ]
    })

    const timeData = JSON.parse(localStorage.getItem("calendar-app"))

    // Placing time data into localstorage for future retrieval
    if(!timeData) {
      localStorage.setItem("calendar-app", JSON.stringify([{
        startdate: formData.get("startdate"),
        starttime: formData.get("starttime"),
        enddate: formData.get("enddate"),
        endtime: formData.get("endtime"),
        task: formData.get("task"),
        category: formData.get("category")
      }]));
    } else {
      let obj = [...timeData, {
        startdate: formData.get("startdate"),
        starttime: formData.get("starttime"),
        enddate: formData.get("enddate"),
        endtime: formData.get("endtime"),
        task: formData.get("task"),
        category: formData.get("category")
      }]
      localStorage.setItem("calendar-app", JSON.stringify(obj))
    }
  }

  function initializeTimeVariable() {
    const timeData = JSON.parse(localStorage.getItem("calendar-app"))

    let obj = {
      startDates: [],
      startTimes: [],
      endDates: [],
      endTimes: [],
      tasks: [],
      categories: []
    }

    if(!timeData) return obj

    for(let i = 0; i < timeData.length; i++) {
      obj["startDates"].push({id: i, date: timeData[i].startdate, day: new Date(timeData[i].startdate).getDay()})
      obj["startTimes"].push({id: i, time: timeData[i].starttime})
      obj["endDates"].push({id: i, date: timeData[i].enddate, day: new Date(timeData[i].enddate).getDay()})
      obj["endTimes"].push({id: i, time: timeData[i].endtime})
      obj["tasks"].push({id: i, task: timeData[i].task})
      obj["categories"].push({id: i, category: timeData[i].category})
      nextId++
    }

    return obj
  }

  function initializeTimeVariable2() {
    const timeData = JSON.parse(localStorage.getItem("calendar-app"))
    let obj = {
      end: {
        dateTime: []
      },
      start: {
        dateTime: []
      },
      summary: []
    }

  }

  const [times, setTimes] = useState(initializeTimeVariable)

  const [events, setEvents] = useState(initializeTimeVariable2)

  return (
    <>
    <form className="block" action={formAction}>
      <h2>Form Submit</h2>
      <br></br>
      <label>
        Date
        <input type="date" name="startdate"></input>
      </label>
      <label>
        Start Time
        <input type="time" name="starttime" />
      </label>
      <label>
        Date
        <input type="date" name="enddate"></input>
      </label>
      <label>
        End Time
        <input type="time" name="endtime" />
      </label>
      <label>
        Task
        <input type="text" name="task" />
      </label>
      <label>
        Cateogry
        <input type="text" name="category" />
      </label>
      <button type="submit">Submit</button>
    </form>
    <div className="block">
      <h2>Form Output</h2>
      <div className="startDate">
        <h3>Start Date</h3>
        <ol>
          {times.startDates.map(date => (
            <li key={date.id}>{date.date}</li>
          ))}
        </ol>
      </div>
      <div className="startTime">
        <h3>Start Time</h3>
        <ol>
          {times.startTimes.map(time => (
            <li key={time.id}>{time.time}</li>
          ))}
        </ol>
      </div>
      <div className="endDate">
        <h3>End Date</h3>
        <ol>
          {times.endDates.map(date => (
            <li key={date.id}>{date.date}</li>
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
    <div className="block">
      <h2>Functionalities</h2>
      <button onClick={() => {
        localStorage.removeItem("calendar-app")
        let obj = {
          startDates: [],
          startTimes: [],
          endDates: [],
          endTimes: []
        }
        setTimes(obj)
        }}>Delete Data</button>
      <button onClick={() => {
        Helpers.download(localStorage.getItem("calendar-app"), "export.json", "text/plain")
      }
      }>
        Download Data
      </button>
    </div>
    <div className="formVisual block">
      <h2>Form Visual</h2>
        <div className="calendar">
          <DrawCalendar />
        </div>
    </div>
    </>
  )
}

export default App
