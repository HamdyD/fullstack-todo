import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTaskStore } from "../store/taskStore";
import EditModal from "./EditModal";
import { TaskT } from "../types/task";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [newName, setNewName] = useState("");
  const [description, setDescription] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { createTask, editTask, fetchTasks, removeTask, tasks } =
    useTaskStore();

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
    <Box margin="4">
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
          />
          <Button type="submit" colorScheme="blue" marginLeft="2">
            Submit
          </Button>
        </Center>
      </form>
      {tasks.map((task) => (
        <Card key={task._id} marginBottom="2" backgroundColor="gray.50">
          <CardBody>
            <Flex justifyContent="space-between">
              <Flex direction="column">
                <Text>{task.name}</Text>
                <Text size="small" color="gray.500">
                  {task.description}
                </Text>
              </Flex>
              <Box>
                <Button
                  marginRight="2"
                  colorScheme="green"
                  onClick={async () => {
                    await removeTask(task._id);
                    await fetchTasks();
                  }}
                >
                  Done
                </Button>
                <Button onClick={() => onEditClick(task)}>Edit</Button>
                {editingTask ? (
                  <EditModal
                    isOpen={isOpen}
                    onClose={onClose}
                    newName={newName}
                    setNewName={setNewName}
                    description={description}
                    setDescription={setDescription}
                    onUpdate={onUpdate}
                  />
                ) : null}
              </Box>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </Box>
  );
};

export default TodoList;
