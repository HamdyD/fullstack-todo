import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  newName: string;
  setNewName: (name: string) => void;
  onUpdate: () => void;
};

const EditModal = ({
  isOpen,
  onClose,
  newName,
  setNewName,
  onUpdate,
}: EditModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backgroundColor="blackAlpha.200" />
      <ModalContent>
        <ModalHeader>Edit task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={onUpdate}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
