function TaskShow({temp, onDelete}) {
    //taskların oluşacağı cartlardaki değerleri burada basıyoruz.
   
    const handleDeleteClick=()=>{
        //bu propsu tasklist'e kullanıcaz çünkü oradan alıyoruz task bilgilerini.
        onDelete(temp.id)
        //Bu propsu function parametresi olarak veriyoruz ki 
        //üst componentte yani TaskList'den erişmek için parametre olarak verdik.
    }

    console.log(temp);
    return <div className="task-show">
        <h4 className="task-title">Göreviniz</h4>
        <p>{temp.title}</p>

        <h4 className ="task-title">Yapılacaklar</h4>
        <p>{temp.taskDesc}</p>
        
    <div>

        <button className="task-delete" onClick={handleDeleteClick}>
            Sil
        </button>

        <button className="task-update">
            Güncelle
        </button>
        
    </div>

    </div>;
}

export default TaskShow;