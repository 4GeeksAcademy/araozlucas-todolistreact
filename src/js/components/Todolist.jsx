import React from "react";
import { useState } from "react";

export const Todolist = () => {
    
    const [task, setTask] = useState ('');
    const [toDos, setToDos] = useState ([   {id: 1, todo: 'tarea 1'},
                                            {id: 2, todo: 'tarea 2'},
                                            {id: 3, todo: 'tarea 3'} ]);                                 
    
    const handleTask = (event) => {setTask(event.target.value)};

    const handleDeleteTask = (deletedTask) => {
        setToDos(toDos.filter(item => item.id != deletedTask.id))
    }

    const handleSubmit = (event) => {
    // Tienes que agregar la tarea al array de toDos    
        event.preventDefault()
        const dataToSend = {id: toDos.length + 1, todo : task};
        if (task.trim() === '') return;
        setToDos([...toDos, dataToSend]);
        setTask('');
        console.log(dataToSend);
    };

    return (
        <div className="container text-start">
            <h1 className="text-center mt-10 quicksand-light text-danger display-1">todos</h1>
            <div className="col-10 col-sm-8 col-md-6 col-lg-4 m-auto">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <label htmlFor="exampleInputTask" className="form-label"></label>
                                <input type="text" className="form-control" id="exampleTask" aria-describedby="emailHelp" placeholder="New task" 
                                value={task} onChange={handleTask}/>
                            </li>                            
                            
                           {toDos.map((item, index) => {
                                return (
                                <li key={index} className="hidden-icon list-group-item d-flex justify-content-between">
                                    {item.todo}
                                    <span onClick={() => handleDeleteTask(item)}>
                                        <i className="fa-solid fa-x text-danger"/>
                                    </span>
                                </li>
                                )
                            })}

                            <li className="list-group-item bg-light text-secondary">
                              <small><i> {toDos.length == 0 ? 'None' : toDos.length} pending items</i></small>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
};