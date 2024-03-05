import { useState } from 'react';
import TaskCreate from './TaskCreate';


function TaskShow({temp, onDelete,onUpdate}) {
    //taskların oluşacağı cartlardaki değerleri burada basıyoruz.
   
    const [update, setUpdate] = useState(false);

    const handleDeleteClick=()=>{
        //bu propsu tasklist'e kullanıcaz çünkü oradan alıyoruz task bilgilerini.
        onDelete(temp.id)
        //Bu propsu function parametresi olarak veriyoruz ki 
        //üst componentte yani TaskList'den erişmek için parametre olarak verdik.
    }

    const handleUpdateClick=()=>{
        setUpdate(!update); //true ise click butonuna bastığında düzenle
    }


  const handleUpdateSubmit =(id, updatedTitle, updatedTaskDesc)=>{
    setUpdate(false);
    onUpdate(id, updatedTitle, updatedTaskDesc);
  }

  console.log(temp);

    return (
  <div className="task-show ">
   {update ? 
    (<TaskCreate 
        createListTask={temp} 
        taskformUpdate={true} 
        onUpdate={handleUpdateSubmit}/>)
        
  :(

    <div>
    <h4 className="task-title">Göreviniz</h4>
    <p>{temp.title}</p>

    <h4 className ="task-title">Yapılacaklar</h4>
    <p>{temp.taskDesc}</p>
    
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
     </div>);
   
}

export default TaskShow;