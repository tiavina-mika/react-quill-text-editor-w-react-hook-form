import { FC, Fragment, SyntheticEvent, useState } from "react";

import { Box, FormHelperText, InputLabel, Tab, Tabs } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

import parseHtml from "html-react-parser";
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
  const [tab, setTab] = useState<"editor" | "preview">("editor");
  const [editorValue, setEditorValue] = useState<string>("");

  // hooks
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const handleTabChange = (_: SyntheticEvent, value: "editor" | "preview") =>
    setTab(value);

  return (
    <>
      {label && (
        <InputLabel sx={{ mb: 0.8, color: "#000" }}>{label}</InputLabel>
      )}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <Tab label="Editor" value="editor" sx={{ textTransform: "inherit" }} />
        <Tab
          label="Preview"
          value="preview"
          sx={{ textTransform: "inherit" }}
        />
      </Tabs>

      {/* editor tab */}
      {tab === "editor" && (
        <Controller
          control={control}
          name={name}
          render={({ field: { value, onChange } }) => (
            <Box>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={(value) => {
                  onChange(value);
                  setEditorValue(value);
                }}
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
      )}

      {tab === "preview" && parseHtml(editorValue)}
    </>
  );
};

export default TextEditorField;
