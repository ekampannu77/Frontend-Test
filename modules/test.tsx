'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './test.module.css';

// Your Test Starts Here

type Priority = 'Low' | 'Medium' | 'High';
type Filter = 'All' | 'Active' | 'Completed';

interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}

export default function TaskManager(): JSX.Element {
  // Load tasks from localStorage on first render (lazy initializer avoids SSR issues)
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('tasks');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [filter, setFilter] = useState<Filter>('All');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  // editingId tracks which task (if any) is currently being edited inline
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPriority, setEditPriority] = useState<Priority>('Medium');
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    // Reject empty or whitespace-only titles
    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    setError('');
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    // Prepend so the newest task is at the top before sorting
    setTasks(prev => [newTask, ...prev]);
    setTitle('');
    setPriority('Medium');
    inputRef.current?.focus();
  };

  // Allow submitting with the Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask();
  };

  const toggleComplete = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditPriority(task.priority);
  };

  const saveEdit = (id: string) => {
    if (!editTitle.trim()) return;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title: editTitle.trim(), priority: editPriority } : t));
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  // Apply status filter, then search filter, then sort so active tasks appear above completed ones
  const filtered = tasks
    .filter(t => {
      if (filter === 'Active') return !t.completed;
      if (filter === 'Completed') return t.completed;
      return true;
    })
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      // Active tasks come first; within each group, newest (higher createdAt) first
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return b.createdAt - a.createdAt;
    });

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Task Manager</h2>

        <input
          className={styles.search}
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search tasks"
        />

        <div className={styles.addRow}>
          <input
            ref={inputRef}
            className={styles.titleInput}
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={e => { setTitle(e.target.value); if (error) setError(''); }}
            onKeyDown={handleKeyDown}
            aria-label="New task title"
            aria-describedby={error ? 'task-error' : undefined}
          />
          <select
            className={styles.select}
            value={priority}
            onChange={e => setPriority(e.target.value as Priority)}
            aria-label="Task priority"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button className={styles.addBtn} onClick={addTask} aria-label="Add task">
            Add Task
          </button>
        </div>
        {error && <p id="task-error" className={styles.error} role="alert">{error}</p>}

        <div className={styles.filters} role="group" aria-label="Filter tasks">
          {(['All', 'Active', 'Completed'] as Filter[]).map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className={styles.taskList} aria-label="Task list">
          {filtered.length === 0 && (
            <li className={styles.empty}>No tasks found.</li>
          )}
          {filtered.map(task => (
            <li key={task.id} className={`${styles.taskItem} ${task.completed ? styles.completedItem : ''}`}>
              {editingId === task.id ? (
                <div className={styles.editRow}>
                  <input
                    className={styles.titleInput}
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') saveEdit(task.id); if (e.key === 'Escape') cancelEdit(); }}
                    aria-label="Edit task title"
                    autoFocus
                  />
                  <select
                    className={styles.select}
                    value={editPriority}
                    onChange={e => setEditPriority(e.target.value as Priority)}
                    aria-label="Edit task priority"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <button className={styles.saveBtn} onClick={() => saveEdit(task.id)}>Save</button>
                  <button className={styles.cancelBtn} onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div className={styles.taskContent}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    aria-label={`Mark "${task.title}" as ${task.completed ? 'active' : 'complete'}`}
                  />
                  <span className={`${styles.taskTitle} ${task.completed ? styles.strikethrough : ''}`}>
                    {task.title}
                  </span>
                  <span className={`${styles.badge} ${styles[`priority${task.priority}`]}`}>
                    {task.priority}
                  </span>
                  <button className={styles.editBtn} onClick={() => startEdit(task)} aria-label={`Edit "${task.title}"`}>
                    Edit
                  </button>
                  <button className={styles.deleteBtn} onClick={() => deleteTask(task.id)} aria-label={`Delete "${task.title}"`}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
