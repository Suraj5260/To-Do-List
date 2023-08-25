import { useEffect, useState } from "react";
import "./index.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
	// Hooks

	const [todos, setTodos] = useState(() => {
		const localValue = localStorage.getItem("ITEMS");
		if (localValue == null) return [];

		return JSON.parse(localValue);
	});

	useEffect(() => {
		localStorage.setItem("ITEMS", JSON.stringify(todos));
	}, [todos]);

	// Helper Functions

	function addTodo(title) {
		setTodos([
			...todos,
			{ id: crypto.randomUUID(), title, completed: false },
		]);
	}

	function toggleTodo(id, completed) {
		setTodos((currentTodos) => {
			return currentTodos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, completed };
				}
				return todo;
			});
		});
	}

	function deleteTodo(id) {
		setTodos((currentTodo) => {
			return currentTodo.filter((todo) => todo.id != id);
		});
	}

	// JSX

	return (
		<>
			<NewTodoForm onSubmit={addTodo} />
			<h1 className="header">Todo List</h1>
			<TodoList
				todos={todos}
				toggleTodo={toggleTodo}
				deleteTodo={deleteTodo}
			/>
		</>
	);
}
