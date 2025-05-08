import React, { useEffect, useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTasksFound from "./NoTasksFound";
import SearchBox from "./SearchBox";
import TaskAddSection from "./TaskAddSection";
import TaskList from "./TaskList";

const TaskSection = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description:
      "I want to learn React so well that I can make it do whatever I want.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };

  // Master task list
  const [allTasks, setAllTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    try {
      const parsed = savedTasks ? JSON.parse(savedTasks) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [defaultTask];
    } catch {
      return [defaultTask];
    }
  });

  // Displayed task list
  const [tasks, setTasks] = useState(() => sortByPriority(allTasks));
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    setTasks(sortByPriority(allTasks));
  }, [allTasks]);

  function sortByPriority(tasksArray) {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return [...tasksArray].sort(
      (a, b) => (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4)
    );
  }

  function handleAddEditTask(newTask, isAdd) {
    const updatedTasks = isAdd
      ? [...allTasks, newTask]
      : allTasks.map((task) => (task.id === newTask.id ? newTask : task));

    setAllTasks(updatedTasks);
    handleCloseClick();
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleDeleteTask(taskId) {
    const updatedTasks = allTasks.filter((task) => task.id !== taskId);
    setAllTasks(updatedTasks);
  }

  function handleDeleteAll() {
    setAllTasks([]);
  }

  function handleFavorite(taskId) {
    const updatedTasks = allTasks.map((task) =>
      task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
    );
    setAllTasks(updatedTasks);
  }

  function handleSearch(searchTerm) {
    if (!searchTerm.trim()) {
      setTasks(sortByPriority(allTasks));
      return;
    }

    const filtered = allTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks(sortByPriority(filtered));
  }

  return (
    <section className="mt-20 mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}

      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchBox onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAddSection
            onAddClick={() => setShowAddModal(true)}
            onDeleteALL={handleDeleteAll}
          />

          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <NoTasksFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskSection;
