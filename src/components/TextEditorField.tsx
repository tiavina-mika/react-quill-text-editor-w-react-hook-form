import { FC } from "react";

import { Box, FormHelperText, InputLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

import ReactQuill from "react-quill";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }]
];

type Props = {
  name: string;
  label?: string;
  helperText?: string;
};

const TextEditorField: FC<Props> = ({ name, label, helperText }) => {
  // hooks
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Box>
          {label && (
            <InputLabel sx={{ mb: 0.8, color: "#000" }}>{label}</InputLabel>
          )}
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={{ toolbar: toolbarOptions }}
          />
          ;
          {errors[name] && (
            <FormHelperText error>{(errors as any)[name]}</FormHelperText>
          )}
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </Box>
      )}
    />
  );
};

export default TextEditorField;
