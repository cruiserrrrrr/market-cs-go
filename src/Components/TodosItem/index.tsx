import React from 'react';
import Button from '../Button';
import styles from './index.module.scss';

interface ITodosItem {
    todos: string;
    compliteTodo: (e) => void;
    deleteTodo: (e) => void;
    update: (e) => void;
    statusTodos: boolean;
    textAreaValue: string;
    onChangeText: (e) => void;
}

const TodosItem = (props: ITodosItem) => {

    const { todos, compliteTodo, deleteTodo, statusTodos, update, onChangeText } = props;

    return (
        <div className={`${styles.wrapper} ${statusTodos ? styles.status_complited : styles.status_unfulfilled}`}>
            <div className={styles.container}>
                <textarea className={styles.content} defaultValue={todos} onChange={onChangeText} />
            </div>
            <div className={styles.buttons_container}>
                {statusTodos ?
                    <Button iconName="close" color="green" size="icon_only" onClick={compliteTodo} />
                    :
                    <Button iconName="check_mark" color="green" size="icon_only" onClick={compliteTodo} />
                }
                <Button iconName="close" color="red" size="icon_only" onClick={deleteTodo} />
                <Button iconName="update" color="green" size="icon_only" onClick={update} />
            </div>
        </div>
    )
}

export default TodosItem;