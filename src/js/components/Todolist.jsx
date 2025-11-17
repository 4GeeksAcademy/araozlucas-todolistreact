import React from "react";
import { useState } from "react";

export const Todolist = () => {
    
    const [ newTask, setNewTask ] = useState ('');
    const [ editTask, setEditTask ] = useState('');
    const [ editCompleted, setEditCompleted ] = useState('');

    const [ toDos, setToDos] = useState ([   {id: 1, todo: 'tarea 1'},
                                            {id: 2, todo: 'tarea 2'},
                                            {id: 3, todo: 'tarea 3'} ]);                          
    const [ editToDo, setEditToDo ] = useState ({});
    const [ isEdit, setIsEdit ] = useState(false);
    const handleNewTask = (event) => {setNewTask(event.target.value)};

    const handleDeleteTask = (deletedTask) => {
        setToDos(toDos.filter(item => item.id != deletedTask.id))
    }

    const handleSubmit = (event) => {
    // Tienes que agregar la tarea al array de toDos    
        event.preventDefault()
        const dataToSend = {id: toDos.length + 1, todo : newTask};
        if (newTask.trim() === '') return;
        setToDos([...toDos, dataToSend]);
        setNewTask('');
        console.log(dataToSend);
    };

    return (
        <div className="container text-start">
            <h1 className="text-center mt-10 quicksand-light text-primary display-1">todos</h1>
            <div className="col-10 col-sm-8 col-md-6 col-lg-4 m-auto">
                
                {/* Form Agregar Tarea */}
                <form onSubmit={handleSubmit}>
                    <div className="container text-start mb-3 p-3 bg-body-tertiary rounded-3">
                        <label htmlFor="exampleTask" className="form-label text-primary"><small>Add task</small></label>
                        <input type="text" className="form-control mb-2" id="exampleTask" placeholder="New task" 
                        value={newTask} onChange={handleNewTask}/>            
                    </div>
                </form>

                {/* Form Editar Tarea */}
                <form >
                    <div className="container p-3 bg-body-tertiary rounded-3">
                        <div className="text-start mb-3">
                            <label htmlFor="exampleInputPassword" className="form-label text-primary"><small>Edit task</small></label>
                            <input type="text" className="form-control mb-2" id="exampleInputPassword" aria-describedby="emailHelp" placeholder="Pending"/>
                        </div>
                        <div className="text-start mb-3">
                            <input type="checkbox" className="form-check-input me-2" id="checkDefault" value=""/>
                            <label htmlFor="checkDefault" className="form-check-label text-dark"><small>Completed</small></label>
                        </div>
                        <div className="text-start">
                            <button type="button" className="btn btn-primary me-2">Submit</button>
                            <button type="button" className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </form>
                
                <hr />
                <h5 className="text-primary ms-2">List</h5>
                        <ul className="list-group">
                           {toDos.map((item, index) => {
                                return (
                                <li key={index} className="hidden-icon list-group-item d-flex justify-content-between">
                                    <div>
                                        <i className="fa-solid fa-check text-success me-1"></i>
                                        <i className="fa-solid fa-x text-danger me-1"></i>
                                        {item.todo}
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-pen-to-square text-primary me-1"></i>
                                        <span onClick={() => handleDeleteTask(item)}>
                                            <i className="fa-solid fa-trash text-danger"></i>
                                        </span>
                                    </div>
                                </li>
                                )
                            })}

                            <li className="list-group-item bg-light text-secondary">
                              <small><i> {toDos.length == 0 ? 'None' : toDos.length} pending items</i></small>
                            </li>
                        </ul>
            </div>
        </div>
    );
};