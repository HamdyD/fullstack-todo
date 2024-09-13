import { useTaskStore } from "../store/taskStore";
import { TaskT } from "../types/task";
import { Box, Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";

import EditModal from "./EditModal";

type TaskCardProps = {
  task: TaskT;
  onEditClick: (task: TaskT) => void;
  editingTask: TaskT | null;
  newName: string;
  setNewName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  onUpdate: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const TaskCard = ({
  task,
  onEditClick,
  editingTask,
  newName,
  setNewName,
  description,
  setDescription,
  onUpdate,
  isOpen,
  onClose,
}: TaskCardProps) => {
  const { removeTask, fetchTasks } = useTaskStore();
  return (
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
  );
};

export default TaskCard;
