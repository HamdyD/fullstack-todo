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
  description: string;
  setDescription: (description: string) => void;
  onUpdate: () => void;
};

const EditModal = ({
  isOpen,
  onClose,
  newName,
  setNewName,
  description,
  setDescription,
  onUpdate,
}: EditModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backgroundColor="blackAlpha.200" />
      <ModalContent>
        <ModalHeader>Edit task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl marginBottom="4">
            <FormLabel>Name</FormLabel>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button marginRight="2" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onUpdate} colorScheme="blue">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
