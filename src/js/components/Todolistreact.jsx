import React from "react";
import { useState, useEffect } from "react";

export const Todolistreact = () => {
    
    const baseurl = 'https://playground.4geeks.com/todo';
    const user = 'Lucas';

    const [ newTask, setNewTask ] = useState ('');
    const [ editTask, setEditTask ] = useState('');
    const [ editCompleted, setEditCompleted ] = useState('');

    const [ toDos, setToDos] = useState ([]);                          
    const [ editToDo, setEditToDo ] = useState ({});
    const [ isEdit, setIsEdit ] = useState(false);
    
    const handleNewTask = (event) => {setNewTask(event.target.value)};
    const handleEditTask = (event) => {setEditTask(event.target.value)}
    const handleEditCompleted = (event) => {setEditCompleted(event.target.checked)}

    const handleDeleteTask = async (deletedTask) => {
        const url = `${baseurl}/todos/${deletedTask.id}`
        const options = {
            method: 'DELETE'
        };
        const response = await fetch(url, options)
        if(!response.ok) {
            console.log('error', response.status, response.statusText)
            if (response.status == 404) {
                console.log('Por favor crea el usuario', user);
            }
            if (response.status == 400) {
                console.log('Haz lo necesario para solventar este error');
            }
            return
        }
        
        console.log("Tarea eliminada");
        getToDos();
    }

    const handleSubmit = async (event) => {  
        event.preventDefault()
        const dataToSend = {
            label: newTask,
            is_done: false
        }
        const url = `${baseurl}/todos/${user}`
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            }, 
            body: JSON.stringify(dataToSend)
        };
        const response = await fetch(url, options)
        if (!response.ok) {
            console.log('Error', response.status)
            return
        }
        const data = await response.json()
        console.log(data);
        
        if (newTask.trim() === '') return;        
        setNewTask('');
        getToDos();
    };

    const handleSubmitEdit = async (event) =>  {
        event.preventDefault()
        const dataToSend = {
            label: editTask,
            is_done: editCompleted
        }
        const url = `${baseurl}/todos/${editToDo.id}`
        const options = {
            method: 'PUT',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch (url, options)
        if (!response.ok) {
            console.log('error', response.status, response.statusText)
            if (response.status == 404) {
                console.log('Por favor crea el usuario', user);
            }
            if (response.status == 400) {
                console.log('Haz lo necesario para solventar este error');
            }
            return
        }
        const data = await response.json()
        console.log(data);
        getToDos();
        setIsEdit (false)
    }

    const handleEdit = (modifiedTask) =>  {
        setIsEdit (true)
        setEditToDo (modifiedTask)
        setEditTask (modifiedTask.label)
        setEditCompleted (modifiedTask.is_done)
        console.log(modifiedTask);
    }

    const getToDos = async () => {
        const url = `${baseurl}/users/${user}`
        const options = {
            method: 'GET'
        };
        const response = await fetch(url, options)
        if(!response.ok) {
            console.log('error', response.status, response.statusText)
            if (response.status == 404) {
                console.log('Por favor crea el usuario', user);
            }
            if (response.status == 400) {
                console.log('Haz lo necesario para solventar este error');
            }
            return
        }
        const data = await response.json()
        console.log(data);
        setToDos(data.todos)
    }

    useEffect(() => {
        getToDos()     
    }, [])

    return (
        <div className="container text-start">
            <h1 className="text-center mt-10 quicksand-light text-primary display-1">todos</h1>
            <div className="col-10 col-sm-8 col-md-6 col-lg-4 m-auto">
                
                { isEdit ? 
                    <form onSubmit={handleSubmitEdit}>
                        {/* Formulario edit task */}
                        <div className="container p-3 bg-body-tertiary rounded-3">
                            <div className="text-start mb-3">
                                <label htmlFor="exampleInputPassword" className="form-label text-primary"><small>Edit task</small></label>
                                <input type="text" className="form-control mb-2" id="exampleInputPassword" placeholder="Pending" value={editTask} onChange={handleEditTask}/>
                            </div>
                            <div className="text-start mb-3">
                                <input type="checkbox" className="form-check-input me-2" id="checkDefault" value="" checked={editCompleted} onChange={handleEditCompleted} />
                                <label htmlFor="checkDefault" className="form-check-label text-dark"><small>Completed</small></label>
                            </div>
                            <div className="text-start">
                                <button type="submit" className="btn btn-primary me-2">Submit</button>
                                <button onClick={() => setIsEdit(false)} type="reset" className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </form>
                : 
                    <form onSubmit={handleSubmit}>
                        {/* Formulario add task */}
                        <div className="container text-start mb-3 p-3 bg-body-tertiary rounded-3">
                            <label htmlFor="exampleTask" className="form-label text-primary"><small>Add task</small></label>
                            <input type="text" className="form-control mb-2" id="exampleTask" placeholder="New task" 
                            value={newTask} onChange={handleNewTask}/>            
                        </div>
                    </form>
                }
                
                
                
                <hr />
                <h5 className="text-primary ms-2">List</h5>
                        <ul className="list-group">
                           {toDos.map((item) => {
                                return (
                                <li key={item.id} className="hidden-icon list-group-item d-flex justify-content-between">
                                    <div>
                                        {item.is_done ? 
                                        <i className="fa-solid fa-check text-success me-1"></i>
                                        :
                                        <i className="fa-solid fa-x text-danger me-1"></i>
                                        }
                                        {item.label}
                                    </div>
                                    <div>
                                        <span onClick={() => handleEdit(item)}>
                                            <i className="fa-solid fa-pen-to-square text-primary me-1"></i>
                                        </span>
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