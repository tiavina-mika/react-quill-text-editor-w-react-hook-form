import { FC, SyntheticEvent, useState } from "react";

import { Box, FormHelperText, InputLabel, Tab, Tabs } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import parseHtml from "html-react-parser";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
import "../styles/text-editor.css";

// ----------- load fonts ----------- //
const Font = Quill.import("formats/font");
Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"];
Quill.register(Font, true);

const colors = ["#e60000", "#9933ff", "#00ff00"];

// ----------- toolbar ----------- //
const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  [{ color: colors }, { background: colors }], // dropdown with defaults from theme
  [{ font: Font.whitelist }],
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
      {/* ----------- label ----------- */}
      {label && (
        <InputLabel sx={{ mb: 0.8, color: "#000" }}>{label}</InputLabel>
      )}

      {/* ----------- tabs ----------- */}
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

      {/* ----------- editor tab ----------- */}
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

      {/* ----------- preview tab ----------- */}
      {tab === "preview" && parseHtml(editorValue)}
    </>
  );
};

export default TextEditorField;
