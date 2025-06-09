import { Controller, useForm } from "react-hook-form";
import { Box, Button, FormHelperText } from "@mui/material";
import FileUploadButton from "./FileUploadButton.jsx";
import useUploadTrackMutation from "../../../hooks/useUploadTrackMutation.js";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function UploadTrackForm({ trackId }) {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const mutation = useUploadTrackMutation(trackId);

  const onSubmit = (data) => {
    const file = data.file[0];
    const formData = { data: file };
    mutation.mutate(formData);
  };

  function handleValidateFile(files) {
    const file = files?.[0];
    if (!file) return "Please select a file.";
    if (!file.type.startsWith("audio/")) {
      return "Only audio files are allowed.";
    }
    if (file.size > MAX_FILE_SIZE) return "Max allowed size is 10MB.";
    return true;
  }

  const selectedFileList = watch("file", []);
  const selectedFile = selectedFileList.length > 0 ? selectedFileList[0] : null;

  const isDisabledButton = mutation.isLoading || !selectedFile || !!errors.file;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="upload-form"
    >
      <Controller
        name="file"
        control={control}
        rules={{
          required: "Please select a file.",
          validate: handleValidateFile,
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <FileUploadButton
              fileName={field.value?.[0]?.name}
              onFileSelected={(file) => field.onChange([file])}
              data-testid="upload-input"
            />
            {error && (
              <FormHelperText error data-testid="error-file">
                {error.message}
              </FormHelperText>
            )}
          </>
        )}
      />

      <Box mt={2} textAlign="right">
        <Button
          type="submit"
          variant="contained"
          disabled={isDisabledButton}
          data-testid="submit-button"
        >
          {mutation.isLoading ? "Uploading…" : "Upload"}
        </Button>
      </Box>
    </Box>
  );
}

export default UploadTrackForm;
