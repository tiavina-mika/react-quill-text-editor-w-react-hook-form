import { FC } from "react";

import { Box, FormHelperText, InputLabel } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { isString } from "@utils/utils";

import ReactQuill from "react-quill";

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
          <ReactQuill theme="snow" value={value} onChange={onChange} />;
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
