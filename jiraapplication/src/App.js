import './App.css';
import TaskCreate from './Components/TaskCreate';
import TaskList from './Components/TaskList';

import {useEffect,useContext } from 'react';
import TaskContext from './Context/task'

function App() {

//Get işlemi ile taskları page de tuttuk.

const{fetchTask} = useContext(TaskContext);

//task context dosyasından geliyor.
  useEffect(() =>  {
    fetchTask();
  }, [])

  // console.log(task);

  //Context yapısındaki amacımız zaten süreçleri props ile yönetmemekti ondan dolayı propsları sildik.
  return (
    <div className="App">
      <TaskCreate/>
      <h2>Görevler</h2>
      <TaskList />
    </div>
  );
}

export default App;
