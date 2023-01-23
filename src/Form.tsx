import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import TextEditorField from "./components/TextEditorField";

const schema = z.object({
  content: z.string().min(1, "Content required")
});

const Form = () => {
  const form = useForm({
    mode: "onChange",
    // defaultValues,
    resolver: zodResolver(schema)
  });

  const { handleSubmit } = form;

  const onSubmit = (values) => console.log("values", values);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextEditorField name="content" label="Content" />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default Form;
