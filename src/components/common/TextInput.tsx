import type { TextFieldProps } from "@mui/material/TextField";
import { TextField } from "@mui/material";

export function TextInput(props: Omit<TextFieldProps, "fullWidth" | "margin">) {
  return <TextField fullWidth margin="normal" {...props} />;
}

export default TextInput;
