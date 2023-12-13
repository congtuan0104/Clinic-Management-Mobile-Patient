import { View, Text } from "react-native";
import React from "react";
import { Button, FormControl, Input, Modal } from "native-base";

const UploadImageModal = (props: any) => {
  const { showModal, setShowModal, onPressCamera, onPressUploadImageGallery } =
    props;
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Chọn ảnh</Modal.Header>
        <Modal.Body>
          <Button.Group space={2} justifyContent="center">
            <Button onPress={onPressCamera}>Camera</Button>
            <Button onPress={onPressUploadImageGallery}>Ảnh của bạn</Button>
          </Button.Group>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default UploadImageModal;
