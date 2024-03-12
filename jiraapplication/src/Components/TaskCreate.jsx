//Taskları yarattığımız component olacak.
import {useState} from "react";

import { useContext } from "react";
import TaskContext from "../Context/task";

function TaskCreate({task, taskformUpdate,onUpdate}) {

const{updateTaskById,createTask}=useContext(TaskContext);

//TODO: 
    //burada propsu alıyoruz parametre olarak , title ve taskDesc
    //değerlerini app.js de console'a yazdırmak için.
    const [title, setTitle] = useState(task ? task.title : '') //Bu kısım başlık altındaki ınput girilecek ve setlenecek kısım.
    
    //camel case  yapısına uyumalı- bacekend gibi -->  setTaskDesc
    // burada Task giriniz ! kısmını setlemek için oluştruduğumuz bir state.
    const [taskDesc, setTaskDesc] = useState(task ? task.taskDesc : '')

    //Validation için oluşturdum bu stateleri 
    const [erorrTitle, setErorrTitle] = useState("")
    const [description, setDescription] = useState("")


  //TODO: BU KISIMA BİR BAK !
    //"onChange={handleChange}"- OnChange bir even'tir ve 
    //bu şekilde vermemizin sebebi ınput kısmına girdiğimiz değeri value olarak göstermesini sağlamak.
    const handleChange=(event)=>(
        setTitle(event.target.value)
        //burada onChange olduğunda buton value olarak set etmiş oluyoruz. 
    );

    //Burası da task giriniz kısmının altında bulunan  textarea içerisidir.
    //girdiğimiz string değeri value olarak console da görmemize yarar.
    //her setlendiğinde yani değiştiğinde value, console da günceleme yapamamıza yardımcı olur 
    const handleTaskChange=(event)=>{
        setTaskDesc(event.target.value)
    };
    
    //Button onClick olduğunda sayfa yenilenmesin.
    const handleSubmit=(event)=>{
        event.preventDefault()
        // button'a tıkladığım da sayfa yenilenmesini istemediğim de bu methodu kullanıyorum.
        
        //taskformUpdate true olduğunda bu kısmı al .
        if (taskformUpdate) {
            // onUpdate(createListTask.id, title, taskDesc);
            onUpdate(task.id, title, taskDesc);

          } else {
            if(title =="" && taskDesc==""){
                setErorrTitle("bu alan boş bırakılamaz!");
                setDescription("bu alan boş bırakılamaz!")
                // alert(); //Boş stringse hata döndürmesi için kullandık.
                //hata mesajı için hook gibi validation işlemleri yapmak için kütüphaneler var kullanabilirsin. 
            }
            else{
                // onCreate(title, taskDesc); --> eski task kalsın yeni maplemeye gerek yok , onCreate fonskiyonuna bakabilirsin.
                 createTask(title,taskDesc);
            }
        }
        //onCreate-props ismi olacak ,burada girdiğimiz değerleri göndermemiz lazım 
        //bundan dolayı props üzerinden app.js'deki TaskCreate.js kısmına gönderiyorum. 

        setTitle(''); //burada ise onCreate'den sonra , title kısmını boşaltıyoruz
        setTaskDesc(''); //burada ise onCreate'den sonra , task açıklama kısmını boşaltıyoruz.
        
        //TODO: 
        //Burada asıl amaç button click olduğunda ilk önce onCreate ile verileri console al sonra içlerini boşalt !! 
    };

    return (

        <div>
        {taskformUpdate ? (
            <div>
            <form className="task-form" >
               <label>Başlığı Düzenleyiniz</label>
               <input 
                value={title}
                onChange={handleChange} 
                className="form-ınput "/>
            

               <label>Taskı Düzenleyiniz!</label>
               <textarea 
                value={taskDesc}
                onChange={handleTaskChange} 
                className="form-ınput form-text task-formUpdateText" /> 
             
               {/* bu ınput yazımı uzun textlerde kullanılıyor  */}
       
               <button className="button task-button" onClick={handleSubmit}> 
               Düzenleyiniz 
               </button>
       
            </form>
           </div> 
        ) 
        :(
            <div >
            <h2>Lütfen Task Ekleyiniz !</h2>
            <form className="task-form" >
               <label>Başlık</label>
               <input style={{border: erorrTitle != "" &&  "1px solid red"}}
                value={title}
                onChange={handleChange} 
                className="form-ınput "/>
                <span style={{color:"red"}}>{erorrTitle == "" ? " " : erorrTitle} </span>
               
               <label>Task Giriniz !</label>
               <textarea 
                value={taskDesc}
                onChange={handleTaskChange} 
                className="form-ınput form-text" /> 
                <span style= {{color:"red" }}>{description == "" ? "" : description} </span>
               {/* bu ınput yazımı uzun textlerde kullanılıyor  */}
       
               <button className="button" onClick={handleSubmit}> 
               Oluştur 
               </button>
       
            </form>
           </div> 
        ) 
    }
        
        </div>

    );
}

export default TaskCreate ;