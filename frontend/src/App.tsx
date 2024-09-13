import TodoList from "./components/TodoList";
import { Box } from "@chakra-ui/react";

const App = () => {
  return (
    <Box minHeight="100vh" backgroundColor="blue.50" padding="16">
      <TodoList />
    </Box>
  );
};

export default App;
