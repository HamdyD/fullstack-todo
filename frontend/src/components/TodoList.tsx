import { Box, Button, Center, Heading, useDisclosure } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTaskStore } from "../store/taskStore";

import { TaskT } from "../types/task";
import TaskCard from "./TaskCard";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [newName, setNewName] = useState("");
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { createTask, editTask, fetchTasks, tasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const onSubmit = () => {
    if (!task.trim()) {
      return;
    }
    createTask({ name: task });
    setTask("");
  };

  const onEditClick = (task: TaskT) => {
    setEditingTask(task);
    setNewName(task.name);
    setDescription(task.description);
    onOpen();
  };

  const onUpdate = async () => {
    await editTask(editingTask._id, {
      name: newName,
      description: description,
    });
    await fetchTasks();
    onClose();
  };

  return (
    <Box>
      <Heading marginBottom="4">Now is better than never</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent from reloading the page
          onSubmit();
        }}
      >
        <Center marginBottom="4">
          <Input
            placeholder="Enter a task ..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            backgroundColor="white"
          />
          <Button type="submit" colorScheme="blue" marginLeft="2">
            Submit
          </Button>
        </Center>
      </form>
      {tasks.map((task) => (
        <TaskCard
          task={task}
          onEditClick={onEditClick}
          editingTask={editingTask}
          newName={newName}
          setNewName={setNewName}
          description={description}
          setDescription={setDescription}
          onUpdate={onUpdate}
          isOpen={isOpen}
          onClose={onClose}
        />
      ))}
    </Box>
  );
};

export default TodoList;
