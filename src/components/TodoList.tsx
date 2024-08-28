import { useState } from "react";
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