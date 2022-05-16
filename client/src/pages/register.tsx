import { Formik, Form } from "formik";
import { Button, Box, Flex, Spinner } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";

const Register = () => {
  //   const router = useRouter();

  //   const { data: authData, loading: authLoading } = useCheckAuth();

  const initialValues: any = {
    username: "",
    email: "",
    password: "",
  };

  //   const [registerUser, { loading: _registerUserLoading, error }] = useRegisterMutation();

  //   const toast = useToast();

  return (
    <>
      {false ? (
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner />
        </Flex>
      ) : (
        <Wrapper size="small">
          {<p>Failed to register. Internal server error</p>}
          <Formik
            initialValues={initialValues}
            onSubmit={() => console.log("oke")}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="username"
                  placeholder="Username"
                  label="Username"
                  type="text"
                  isRequired={true}
                />
                <Box mt={4}>
                  <InputField
                    name="email"
                    placeholder="Email"
                    label="Email"
                    type="text"
                    isRequired={true}
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                    isRequired={true}
                  />
                </Box>
                <Button
                  type="submit"
                  colorScheme="teal"
                  mt={4}
                  isLoading={isSubmitting}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Wrapper>
      )}
    </>
  );
};

export default Register;
