import { useState } from 'react';
import TaskCreate from '../Components/TaskCreate';

import {useContext } from 'react';
import TaskContext from '../Context/task'

function TaskShow({task}) {
    //taskların oluşacağı cartlardaki değerleri burada basıyoruz.

    const{deleteTaskById,updateTaskById} = useContext(TaskContext);
   
    const [update, setUpdate] = useState(false);

    const handleDeleteClick=()=>{
        //bu propsu tasklist'e kullanıcaz çünkü oradan alıyoruz task bilgilerini.
        // onDelete(temp.id) --> bunun yerine contexteki fonskiyonu kullandık.
        deleteTaskById(task.id);
        //Bu propsu function parametresi olarak veriyoruz ki 
        //üst componentte yani TaskList'den erişmek için parametre olarak verdik.
    }

    const handleUpdateClick=()=>{
        setUpdate(!update); //true ise click butonuna bastığında düzenle
    }


  const handleUpdateSubmit =(id, updatedTitle, updatedTaskDesc)=>{
    setUpdate(false);
    // onUpdate(id, updatedTitle, updatedTaskDesc);
    updateTaskById(id,updatedTitle,updatedTaskDesc);
  }

  // console.log(temp);

    return (
  <div className="task-show ">
   {update ? 
    (<TaskCreate 
        task={task} 
        taskformUpdate={true} 
        onUpdate={handleUpdateSubmit}
       />)
        
  :(
    <div>
    <h4 className="task-title">Göreviniz</h4>
    <p>{task.title}</p>

    <h4 className ="task-title">Yapılacaklar</h4>
    <p>{task.taskDesc}</p>
    
     <div>
       <button className="task-delete" onClick={handleDeleteClick}>
        Sil
       </button>

        <button className="task-update" onClick={handleUpdateClick}>
        Güncelle
        </button>
    
     </div>

    </div>
   )}
     </div>
     );
   
}

export default TaskShow;