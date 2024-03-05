//Taskları yarattığımız component olacak.
import {useState} from "react";

function TaskCreate({onCreate, createListTask, taskformUpdate, onUpdate}) {
//TODO: 
    //burada propsu alıyoruz parametre olarak , title ve taskDesc
    //değerlerini app.js de console'a yazdırmak için.

    const [title, setTitle] = useState(createListTask ? createListTask.title : '') //Bu kısım başlık altındaki ınput girilecek ve setlenecek kısım.
    
    //camel case  yapısına uyumalı- bacekend gibi -->  setTaskDesc
    // burada Task giriniz ! kısmını setlemek için oluştruduğumuz bir state.
    const [taskDesc, setTaskDesc] = useState(createListTask ? createListTask.taskDesc : '')


    // const temp = title.split(" ","-"); --> bak buna bi

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
            onUpdate(createListTask.id, title, taskDesc);
          } else {
            onCreate(title, taskDesc);
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
            <div className="task-ShowChange">
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
               <input 
                value={title}
                onChange={handleChange} 
                className="form-ınput "/>
               
               <label>Task Giriniz !</label>
               <textarea 
                value={taskDesc}
                onChange={handleTaskChange} 
                className="form-ınput form-text" /> 
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