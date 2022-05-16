import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  textarea?: boolean;
  isRequired?: boolean;
}

const InputField = ({ isRequired, textarea, ...props }: InputFieldProps) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      {textarea ? (
        <Textarea
          {...field}
          {...props}
          id={field.name}
          isInvalid={!!error}
          errorBorderColor="crimson"
        />
      ) : (
        <Input
          {...field}
          {...props}
          id={field.name}
          isInvalid={!!error}
          errorBorderColor="crimson"
        />
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
