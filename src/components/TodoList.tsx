/* Objectif

Développer une application de liste de tâches simple en utilisant React.js. L'application permettra aux utilisateurs d'ajouter, de supprimer et de marquer des tâches comme terminées.

 

Fonctionnalités

  1. Ajouter une Tâche

L'utilisateur peut entrer du texte dans le champ et cliquer sur le bouton pour ajouter la tâche à la liste. La tâche doit apparaître avec une case à cocher (non coché).

  2. Marquer comme Terminé

L'utilisateur peut cocher une case pour marquer une tâche comme terminée. La tâche marquée doit être visuellement distinguée (par exemple, en rayant le texte ou en changeant la couleur).

  3. Supprimer une Tâche

L'utilisateur peut supprimer une tâche en cliquant sur un bouton ou une icône à côté de chaque tâche.

  4. Gestion des Tâches

Les tâches doivent être stockées dans l'état local de l'application et mises à jour en conséquence.

  */


import React, { useState } from "react";

// Définition de l'interface pour les tâches
interface ITodo {
    id: number;
    text: string;
    isDone: boolean;
}
// Définition de la fonctionnalité d'ajout de tâche
const TodoList = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);

    // Fonctionnalité d'ajout de tâche
    const handleAddTodo = (text: string) => {
        const newTodo: ITodo = {
            id: Math.random(),
            text,
            isDone: false,
        };
        setTodos([...todos, newTodo]);

        // reset du champ de texte
        (document.querySelector("input[name='text']") as HTMLInputElement).value = "";
    };


    // Fonctionnalité de marquage de tâche comme terminée
    const handleToggleTodo = (id: number) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isDone: !todo.isDone,
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };


    // Fonctionnalité de suppression de tâche
    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.isDone}
                            onChange={() => handleToggleTodo(todo.id)}
                        />
                        <span
                            style={{
                                textDecoration: todo.isDone ? "line-through" : "none",
                            }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => handleDeleteTodo(todo.id)}>X</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={(e) => {
                e.preventDefault();
                const textElement = (e.target as HTMLFormElement).elements.namedItem("text");
                if (textElement && (textElement as HTMLInputElement).value) {
                    const text = (textElement as HTMLInputElement).value;
                    handleAddTodo(text);
                } else {
                    // Gérer le cas où l'élément n'existe pas ou est null
                    console.error("L'élément de texte n'a pas été trouvé ou est null");
                }
            }}>
                {/* Assurez-vous que le formulaire contient un élément avec le nom "text" */}
                <input type="text" name="text" />
                <button type="submit">Ajouter</button>
            </form>


        </div>

    );
};

export default TodoList;