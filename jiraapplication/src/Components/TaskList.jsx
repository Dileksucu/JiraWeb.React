import TaskShow from '../Components/TaskShow';

import {useContext } from 'react';
import TaskContext from '../Context/task'

//Burası taskları listelediğimiz component olacak.

function TaskList() {
//TaskList içi app.js de oluşturulmuş "props ismi - TaskList" , "değişken ismi - tasks" .
//createListTask - bu props da artık bütün tasklarım olacak bunu ekrana yazdırmam lazım.
//return içinde map() fonksiyonunu dönüyoruz bu sayede gelen bütün taskları ekrana basmış olucaz.

//  console.log(createListTask);
  
  const{task} = useContext(TaskContext);
  
  return <div className="task-list">
    {task?.map((task,index)=>{
      return <TaskShow 
      key={index} 
      task={task} 
      />
      // onDelete={deletedTask}
      // onUpdate={onUpdateForm}
      
      // onDelete propsunun amacı task cartının id'sini almak.
      //deltedTask ile bir üst componentten çağırıcaz o yüzden function parametresi olarak geçiyoruz.
    })}
    </div>;
}
 
export default TaskList;