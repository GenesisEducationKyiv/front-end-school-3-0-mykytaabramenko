import Modal from "../../common/Modal.jsx";
import TrackForm from "../TrackForm/TrackForm.jsx";
import useCreateTrackMutation from "../../../hooks/useCreateTrackMutation.js";

export function CreateModal() {
  const createMutation = useCreateTrackMutation();

  function handleSubmit(values) {
    return createMutation.mutate(values);
  }

  return (
    <Modal header={"Create track"}>
      <TrackForm
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isLoading}
      />
    </Modal>
  );
}

export default CreateModal;
