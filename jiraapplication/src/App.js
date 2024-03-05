import './App.css';
import TaskCreate from './Components/TaskCreate';
import TaskList from './Components/TaskList.js'
import { useState } from 'react';

function App() {
  
  const [task, setTask] = useState([])  //array oluşturma sebebim taskları tutmak istemem bu state de.

//TODO:
//Benim 2 tane taskım var mesela,3.sünü set etmek istiyorum.
// bu durumda task set etmek için, Spread operatörünü kullanıcaz burada.
//var olan taskları tutarak temp gibi , üstüne 3.taskı eklicez.

 const createTask = (title,taskDesc)=>{
  //arrray oluşturdum , ...task --> eskileri alır buraya kopyalar bunu spread operatörü ile sağladım.
  //yeni taskın title ve taskDesc kısmını ekle .
  const createdTask=[
    ...task,{ //Burada eski taskları alıyoruz (... -> spread operatörü ile). süslü parantezden sonra yeni bir task eklmek için dinamik sist. oluşturuyoruz.
      id: Math.round(Math.random()*999999), //id veriyoruz tasklara , id'ye göre atama işlemi yapıcaz çünkü id ile taskları belirlemek için.
      title,
      taskDesc
    },
  ];
  // console.log(title,taskDesc);
  //Bu sayede console da çıktı olarak; başlık ve task açıklama kısmını aldık.
    setTask(createdTask);
 };

 //Delete buttonu işlemi için yazıldı.
 const deleteTaskById = (id) =>{
  // console.log(id); //id nasıl geliyor burada görmek için logladım.
  
  //TODO: Silme işlemi - anladım bir daha bakmalısın !
  //eşleşmeyen cart idleri için.
  const mismatchedTaskİd= task.filter((task) =>{
    return task.id !== id; 
    // yukarıda tıkladığım id yi gönderiyorum, mesela 2 taskım var birine tıklıyorum ve onun idsi geliyor
    //aşağıda ise filtreleme yaparak bu id ile eşleşmeyen task cartının arrayda kalmasını istiyorum, bundan dolayı setliyorum array'e.
    //setTask ile array'e setliyorum . diğer task da arrayden çıkarılmış oluyor.
   })

   //click yaptığım task id'si ile silmek istenilen aynı id ise sil diyorum
    setTask(mismatchedTaskİd);
 };

 
//Update buttonu form işlemleri için yazıldı.
 const updateTaskById = (id, updatedTitle, updatedTaskDesc) => {
  const updatedTasks = task.map((task) => {
    if (task.id === id) {
      return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
    }
    return task;
  });
  setTask(updatedTasks);
};



  return (
    <div className="App">
      <TaskCreate onCreate={createTask}/>
      <h2>Görevler</h2>
      <TaskList 
      createListTask={task} 
      deletedTask={deleteTaskById} 
      onUpdateForm={updateTaskById}
      
      />
    </div>
  );
}

export default App;
