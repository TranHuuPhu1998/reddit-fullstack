import { Formik, Form, FormikHelpers } from "formik";
import { Button, Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { RegisterInput, useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { mapFieldErrors } from "../helpers/mapFieldErrors";
import { useCheckAuth } from "../utils/useCheckAuth";
import useTranslation from "next-translate/useTranslation";

const Register = () => {
  const router = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  const { data: authData, loading: authLoading } = useCheckAuth();

  const initialValues: RegisterInput = {
    username: "",
    email: "",
    password: "",
  };

  const [registerUser, { loading: _registerUserLoading, error }] =
    useRegisterMutation();

  const onRegisterSubmit = async (
    values: RegisterInput,
    { setErrors }: FormikHelpers<RegisterInput>
  ) => {
    const response = await registerUser({
      variables: {
        registerInput: values,
      },
    });
    if (response.data?.register.errors) {
      setErrors(mapFieldErrors(response.data.register.errors));
    } else if (response.data?.register.user) {
      // register successfully
      toast({
        title: "Welcome",
        description: `${response.data.register.user.username}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    }
  };

  return (
    <>
      {authLoading || (!authLoading && authData?.me) ? (
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner />
        </Flex>
      ) : (
        <Wrapper size="small">
          {error && <p>{t("Failed to register. Please try again.")}</p>}
          <Formik initialValues={initialValues} onSubmit={onRegisterSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="username"
                  placeholder="Username"
                  label={t("common:username")}
                  type="text"
                  isRequired={true}
                />
                <Box mt={4}>
                  <InputField
                    name="email"
                    placeholder="Email"
                    label={t("common:email")}
                    type="text"
                    isRequired={true}
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="Password"
                    label={t("common:password")}
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
                  {t("common:register")}
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
