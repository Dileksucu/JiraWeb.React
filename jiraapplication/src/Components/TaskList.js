import TaskShow from "./TaskShow";

//Burası taskları listelediğimiz component olacak.

function TaskList({createListTask,deletedTask,onUpdateForm}) {
//TaskList içi app.js de oluşturulmuş "props ismi - TaskList" , "değişken ismi - tasks" .
//createListTask - bu props da artık bütün tasklarım olacak bunu ekrana yazdırmam lazım.
//return içinde map() fonksiyonunu dönüyoruz bu sayede gelen bütün taskları ekrana basmış olucaz.
   
   return <div className="task-list">
    {createListTask.map((task,index)=>{
      return <TaskShow 
      key={index} 
      temp={task} 
      onDelete={deletedTask}
      onUpdate={onUpdateForm}
       />
      // onDelete propsunun amacı task cartının id'sini almak.
      //deltedTask ile bir üst componentten çağırıcaz o yüzden function parametresi olarak geçiyoruz.
    })}
    </div>;
}
 
export default TaskList;