import {createContext} from "react";
import {useState} from 'react';
import axios from "axios";

const TaskContext = createContext(); //Context oluşturdum; componentleri birbiri içerisinde kullanmak için ortak bir createContext kullandım.

function Provider({children}) {

const [task, setTask] = useState([])  //array oluşturma sebebim taskları tutmak istemem bu state de.

    //TODO:
   //Benim 2 tane taskım var mesela,3.sünü set etmek istiyorum.
   // bu durumda task set etmek için, Spread operatörünü kullanıcaz burada.
   //var olan taskları tutarak temp gibi , üstüne 3.taskı eklicez.

//post

const createTask = async (title,taskDesc)=>{
   //Axios ile apiye post işlemi isteği atıyoruz.
   //İlk önce oluşturduğum task bilgilerini backende post etmem lazım yani verileri kaydetmem lazım.
   const response =  await axios.post('http://localhost:8000/task',{
     title, //title:title 
     taskDesc //taskDesc:taskDesc 
     //http://localhost:3000/task --> proje portu ile server portu aynı portta kullanılmaz.
   })
   console.log(response) //Burada async-await kullanıcaz ki bekledikten sonra console.log yapsın.
 
   //arrray oluşturdum , ...task --> eskileri alır buraya kopyalar bunu spread operatörü ile sağladım.
   //yeni taskın title ve taskDesc kısmını ekle .
   const createdTask= [
      ...task, //Burada eski taskları alıyoruz (... -> spread operatörü ile). süslü parantezden sonra yeni bir task eklmek için dinamik sist. oluşturuyoruz.
      response.data  
   ];
      setTask(createdTask);
      // console.log(title,taskDesc);
   //Bu sayede console da çıktı olarak; başlık ve task açıklama kısmını aldık.
  };

//Burada yapılan post işlemi ile json şeklinde kaydettiğim verileri sayfada render ettiğimde kullanmak için get ile axios çağrısıni ayni url'e yapıyoruz . 
//Bu sayede render edildiğinde oluşturulan task kartlar gitmemiş olur. Tasklar her render da gelir sayfaya.
//Burada get ile verileri sayfada tutyoruz - kısaca.
const fetchTask = async() =>{ 
await axios.get('http://localhost:8000/task')
.then((response)=>{
  console.log(response)
  setTask(response.data)})
 //then-catch pattern bakmalısın  (try-catch gibi mantığı )
 // then kullanımı, servisten gelen isteği almak için then kullanılabilir. İsteğin tamamlandığı ve işlendiği alan.
 //İstek başarılıysa then , değilse catch düşer mesela.
}
 
  const deleteTaskById = (id) =>{
   //Server'a eğer sil işlemi yapılırsa delete isteği at server'a.
     axios.delete(`http://localhost:8000/task/${id}`) //Json server da url bu şekilde olması gerekiyor , id'li
   
    // console.log(id); //id nasıl geliyor burada görmek için logladım.
   
   //TODO: Silme işlemi - anladım bir daha bakmalısın !
   //eşleşmeyen cart idleri için.
   const mismatchedTaskİd= task.filter((task) =>{
     return task.id !== id ; 
     // yukarıda tıkladığım id yi gönderiyorum, mesela 2 taskım var birine tıklıyorum ve onun idsi geliyor
     //aşağıda ise filtreleme yaparak bu id ile eşleşmeyen task cartının arrayda kalmasını istiyorum, bundan dolayı setliyorum array'e.
     //setTask ile array'e setliyorum . diğer task da arrayden çıkarılmış oluyor.
    });
    //click yaptığım task id'si ile silmek istenilen aynı id ise sil diyorum
     setTask(mismatchedTaskİd);
  };
 
  
 //Update buttonu form işlemleri için yazıldı.
  const updateTaskById = (id, updatedTitle, updatedTaskDesc) => {
   axios.put(`http://localhost:8000/task/${id}`,{
     title:updatedTitle,
     taskDesc:updatedTaskDesc,
   }); //Json server da url bu şekilde olması gerekiyor , id'li
 
   const updatedTasks = task.map((task) => {
     if (task.id === id) {
       return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
     }
     return task;
   });
   setTask(updatedTasks);
 };

 //Değişken içerisine aldık methodları bu değerleri de value içesine verdik . (value içerisinde neden verdik ?)
 const sharedValuesAndMethods={
    task, // array 
    //alt kıısmdakiler de fonksiyonlarım.
    createTask,
    fetchTask, // get api isteğini buraya aldım. 
    deleteTaskById,
    updateTaskById
 }
    return (
        <TaskContext.Provider value={sharedValuesAndMethods}>
        {children}
        </TaskContext.Provider>
        /*bu propsu kullanıcaz erişmek için*/
    );
}

export {Provider}; //dış dünyaya açıyoruz export ederek , diğer componentlerin de erişmesi için.

export default TaskContext;