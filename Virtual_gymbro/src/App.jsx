import React, { useState, useEffect } from 'react';
import './App.css';
import Homepage from './components/homepage';
import Inputform from './components/input';
import Daypage from './components/Daypage';
import WeekPage from './components/Weekpage';
import ExPage from './components/expage';
import PdfUploader from './components/inputpdf';
import { getExerciseByName } from './hooks/handleEx'

function App() {
  const weekday = [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ];
  const [planner, setPlanner] = useState(() => {
    try {
      const savedPlanner = localStorage.getItem('planner');
      const parsedPlanner = savedPlanner ? JSON.parse(savedPlanner) : null;
      return Array.isArray(parsedPlanner) ? parsedPlanner : null;
    } catch {
      return null;
    }
  });
  const [number, setNumber] = useState(() => planner?.length || 3);
  const [exnum, setExnum] = useState(() => planner
    ? planner.map(day => Math.max(day.exercises?.length || 0, 1))
    : Array(3).fill(1));
  const [curday,setCurday]=useState(() => {
    const today = new Date().getDay();
    return weekday[today === 0 ? 6 : today - 1];
  })
  const [doneinweek,setDoneinweek]=useState([])
  const [seeWeek,setSeeWeek]=useState(false)
  const [selectDate,setSelectDate]=useState(null)
  const [seedetails,setseedetails]=useState(false)
  const [log, setLog] = useState([]);
  const [pageex, setPageex] = useState(null);
  const [popup, setpopup] = useState(false);
  const [entry, setEntry] = useState(() => planner ? null : "manual");
  const [oninput, setOninput] = useState(() => !planner);

  const setmanual=()=>{
    setEntry("manual")
    setpopup(false)
    setOninput(true)
    console.log("Manual entry selected");
  }

  const setpdf=()=>{
    setEntry("pdf")
    setpopup(false)
    setOninput(true)
    console.log("PDF entry selected");
  }

  const settext=()=>{
    setEntry("text")
    setpopup(false)
    setOninput(true)
    console.log("Text entry selected");
  }

  const pop = () => {
    setpopup(true)
    
  }

  const closePopup1 = () => {
    setpopup(false);
  }

  const backToHomepage = () => {
    setOninput(false);
    setEntry(null);
  }

  const editPlanner = () => {
    setNumber(planner.length);
    setExnum(planner.map(day => Math.max(day.exercises?.length || 0, 1)));
    setEntry("manual");
    setOninput(true);
  }

  const removePlanner = () => {
    if (!window.confirm("Remove your current planner from this browser?")) return;
    setPlanner(null);
    setSelectDate(null);
    setSeeWeek(false);
    setPageex(null);
    setseedetails(false);
    setEntry(null);
    setOninput(false);
  }

  const back=()=>{
    setSeeWeek((prev)=>!prev)
    if(selectDate){
      setSelectDate(null)
    }
  }

  // const newPlan=()=>{
  //   localStorage.removeItem('planner')
  // }

  const increase = (index) => {
    setExnum(prev => {
      const newArr = [...prev];
      newArr[index] = newArr[index] + 1;
      return newArr;
    });
  };

  const decrease = (index) => {
    setExnum(prev => {
      const newArr = [...prev];
      if (newArr[index] > 1) {
        newArr[index] = newArr[index] - 1;
      }
      return newArr;
    });
  };

  const done=(ex)=>{
    setDoneinweek(
      (prev)=>[...prev,ex]
    )
  } 

  const choose=(day)=>{
    setSelectDate(day)
    setSeeWeek((prev)=>!prev)
  }

  const seedetail=(ex)=>{
    setseedetails(prev=>!prev)
    setPageex({ ...ex, log: ex.log || [] });
  }

  const onbackpage=()=>{
    setseedetails(prev=>!prev)
    setPageex(null)
  }

  const updateDays = (e) => {                                      
    const dayCount = parseInt(e.target.value);
    setNumber(dayCount);
    setExnum(Array(dayCount).fill(1));
  };
   const addLog = (e, ex) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get('date') || new Date().toLocaleDateString();
    const setCount = Number(ex.set || ex.exobject?.set || 1);

    const newEntries = [];
    for (let i = 0; i < setCount; i++) {
      const weight = formData.get(`weight-${i}`) || '';
      const reps = formData.get(`repsOrTime-${i}`);
      if (!reps) continue;
      if (ex.exobject?.equipment?.toLowerCase() !== 'body only' && !weight) continue;
      newEntries.push({
        date,
        weight,
        repsOrTime: reps,
        set: i + 1
      });
    }

    if (newEntries.length === 0) return;

    setLog(prev => [...prev, ...newEntries]);

    const updatedPlanner = planner.map(day => ({
      ...day,
      exercises: day.exercises.map(exercise => {
        if (exercise.name === ex.name) {
          return {
            ...exercise,
            log: [...(exercise.log || []), ...newEntries]
          };
        }
        return exercise;
      })
    }));

    setPlanner(updatedPlanner);
    setPageex(prev => {
      if (!prev || prev.name !== ex.name) return prev;
      return {
        ...prev,
        log: [...(prev.log || []), ...newEntries]
      };
    });
  };

  const handleplanner =(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPlanner = [];

    for (let i = 0; i < number; i++) {
      const day = weekday[i];
      const exercises = [];
      for (let j = 0; j < exnum[i]; j++) {
        const name = formData.get(`day${i}-exercise${j}-name`);
        const set = parseInt(formData.get(`day${i}-exercise${j}-set`));
        const exobject = getExerciseByName(name);
        const previousExercise = planner
          ?.find(existingDay => existingDay.day === day)
          ?.exercises.find(exercise => exercise.name === name);
        exercises.push({name,exobject, set, ...(previousExercise?.log ? { log: previousExercise.log } : {})});
      }
      newPlanner.push({ day, exercises });
    }
    console.log("New Planner:", newPlanner);
    setPlanner(newPlanner);
    setOninput(false);
    setEntry(null);
  };

  useEffect(() => {
    if (planner) {
      localStorage.setItem('planner', JSON.stringify(planner));
    } else {
      localStorage.removeItem('planner');
    }
  }, [planner]);

  return (
    <>
    {
      planner && !oninput?
      (
      <div>
        {
          seeWeek?
          (<WeekPage days={weekday} curday={curday} choosedate={choose}/>)
          :
          (
            pageex?
            (<ExPage exercise={pageex} addlog={addLog} date={selectDate?selectDate:curday} onBackpage={onbackpage}/>)
            :
            <Daypage planner={planner.find(p => p.day === (selectDate?selectDate:curday))} done={done} day={selectDate?selectDate:curday} onBack={back} seedetails={seedetail}/>
          )
        }
        <div className="flex justify-center gap-3 mt-1">
          <button onClick={editPlanner} className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200">
            Edit Planner
          </button>
          <button onClick={removePlanner} className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200">
            Remove Plan
          </button>
        </div>
      </div>
        )
      :(
        oninput?
        (entry&&
          <Inputform 
        number={number} 
        exnum={exnum} 
        initialPlanner={planner}
        weekday={weekday} 
        increase={increase} 
        decrease={decrease} 
        handleplanner={handleplanner} 
        updateDays={updateDays} 
        onBack={backToHomepage}
      />)
        :
        <Homepage popup={popup} onAddPlanner={() => pop() } closePopup1={closePopup1} setmanual={setmanual} setpdf={setpdf} settext={settext} />
      
      )
    }
      
    </>
  );
}

export default App;
