import React, { useState, useEffect, useRef } from "react";
import TodosItem from "../../Components/TodosItem/index";
import styles from './index.module.scss';
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import Button from "../../Components/Button/index";
import CustomInput from "../../Components/CustomInput";
import BaseToast from "../../Components/BaseToast";
import LoadingComponent from "../../Components/LoadingComponent";


const Main = () => {

    document.title = "You todos";

    const { email } = useAuth();
    const [todoList, setTodoList] = useState([]);
    const [todoValue, setTodoValue] = useState('');
    const [isToastShown, setIsToastShown] = useState(false);
    const [toastStatus, setToastStatus] = useState('');
    const [toastValue, setToastValue] = useState('');
    const [updatedData, setUpdatedData] = useState('')
    const [loading, setLoading] = useState(false)


    const closeToastTimer = useRef();

    const getTodo = async (loaded) => {
        const serverError = 'error';
        const valueBad = 'Server error';
        try {
            const data = await axios.get(`https://todos-80as.onrender.com/todosList`)
                .then(res => setTodoList(res.data))
        } catch (error) {
            setToastStatus(serverError)
            setToastValue(valueBad)
            showToast();
            console.log(error.response.data)
        }
        setLoading(loaded)
    }



    const todoCreate = async (e, todo) => {
        e.preventDefault();
        const createSuccess = 'success';
        const valueSuccess = 'Task added';
        const createBad = 'error';
        const valueBad = 'Error added';

        try {
            const data = await axios.post("https://todos-80as.onrender.com/todosList", {
                creatorEmail: email,
                case: todo,
                todoStatus: false
            })
            setToastStatus(createSuccess)
            setToastValue(valueSuccess)
            showToast();
        } catch (error) {
            setToastStatus(createBad)
            setToastValue(valueBad)
            showToast();
            console.error(error)
        }
        setTodoValue('');
    }
    const todoUpdate = async (e, id, todo, status) => {
        e.preventDefault();
        const updateSuccess = 'Case updated';
        const updateOk = 'success';
        const updateBad = 'error';
        const valueBad = 'Update error';

        try {
            const data = await axios.put(`https://todos-80as.onrender.com/todosList/${id}`, {
                creatorEmail: email,
                case: todo,
                todoStatus: status
            })
            setToastStatus(updateOk)
            setToastValue(updateSuccess)
            showToast();
        } catch (error) {
            setToastStatus(updateBad)
            setToastValue(valueBad)
            showToast();
        }
    }
    const todoChangeStatus = async (e, id, todo, status) => {
        e.preventDefault();
        const updateSuccess = 'Case updated';
        const updateOk = 'success';
        const updateBad = 'error';
        const valueBad = 'Update error';

        if (status === true) {
            try {
                const data = await axios.put(`https://todos-80as.onrender.com/todosList/${id}`, {
                    creatorEmail: email,
                    case: todo,
                    todoStatus: false
                })
                setToastStatus(updateOk)
                setToastValue(updateSuccess)
                showToast();
            } catch (error) {
                setToastStatus(updateBad)
                setToastValue(valueBad)
                showToast();
            }
        } else {
            try {
                const data = await axios.put(`https://todos-80as.onrender.com/todosList/${id}`, {
                    creatorEmail: email,
                    case: todo,
                    todoStatus: true
                })
                setToastStatus(updateOk)
                setToastValue(updateSuccess)
                showToast();
            } catch (error) {
                setToastStatus(updateBad)
                setToastValue(valueBad)
                showToast();
            }
        }
    }
    const deleteTodo = async (e, id) => {
        e.preventDefault();
        const todoDeleted = 'Todo deleted';
        const deleteOk = 'success';
        const deleteBad = 'error';
        const valueBad = 'Error delete';

        try {
            const data = await axios.delete(`https://todos-80as.onrender.com/todosList/${id}`);
            setToastStatus(deleteOk)
            setToastValue(todoDeleted)
            showToast();
        } catch (error) {
            setToastStatus(deleteBad)
            setToastValue(valueBad)
            showToast();
        }
    }
    useEffect(() => {
        getTodo(true)
    }, [todoList])
    useEffect(() => {
        setTodoList
    }, [])


    const showToast = () => {
        setIsToastShown(true);
        closeToastTimer.current = window.setTimeout(hideToast, 3000)
    }
    const hideToast = () => {
        setIsToastShown(false)
    }
    const filtredTodo = todoList.filter(item => item.creatorEmail === email);


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {
                    loading ?
                        <>
                            <div className={styles.create_todo}>
                                <form>
                                    <CustomInput
                                        placeholder="You todos =)"
                                        type="text"
                                        value={todoValue}
                                        onChange={(e) => setTodoValue(e.target.value)}
                                    />
                                    <Button
                                        iconName="plus"
                                        color="primary"
                                        size="icon_only"
                                        onClick={(e) => todoCreate(e, todoValue)}
                                    />
                                </form>
                            </div>
                            {filtredTodo.length <= 0 ?
                                <>
                                    <div className={styles.warning}>
                                        <p>{`You don't have any entries yet =)`}</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className={styles.todos_container}>
                                        {
                                            filtredTodo.map((item) => (
                                                <TodosItem
                                                    key={item.id}
                                                    statusTodos={item.todoStatus}
                                                    todos={item.case}
                                                    deleteTodo={(e) => deleteTodo(e, item.id)}
                                                    compliteTodo={(e) => todoChangeStatus(e, item.id, item.case, item.todoStatus)}
                                                    update={(e) => todoUpdate(e, item.id, updatedData, item.todoStatus)}
                                                    textAreaValue={updatedData}
                                                    onChangeText={(e) => setUpdatedData(e.target.value)}
                                                />
                                            ))
                                        }
                                    </div>
                                </>
                            }
                        </>
                        :
                        <LoadingComponent />
                }
            </div>
            {
                isToastShown && <BaseToast type={toastStatus} value={toastValue} onClick={hideToast} />
            }
        </div>
    )
}

export default Main;