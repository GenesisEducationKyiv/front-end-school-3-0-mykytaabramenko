import Modal from "../../common/Modal";
import TrackForm from "../TrackForm/TrackForm";
import useCreateTrackMutation from "../../../hooks/tracks/useCreateTrackMutation";

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
