import Wrapper from '../components/Wrapper';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import { Box, Button, Flex, Spinner, Link, Heading } from '@chakra-ui/react';
import {
  ForgotPasswordInput,
  useForgotPasswordMutation,
} from '../generated/graphql';
import { useCheckAuth } from '../utils/useCheckAuth';
import NextLink from 'next/link';
import { NextSeo } from 'next-seo';

const ForgotPassword = () => {
  const { data: authData, loading: authLoading } = useCheckAuth();

  const initialValues = { email: '' };

  const [forgotPassword, { loading, data }] = useForgotPasswordMutation();

  const onForgotPasswordSubmit = async (values: ForgotPasswordInput) => {
    await forgotPassword({ variables: { forgotPasswordInput: values } });
  };

  if (authLoading || (!authLoading && authData?.me)) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Spinner />
      </Flex>
    );
  } else
    return (
      <Wrapper size="small">
        <NextSeo
          title="Reddit | Forgot Password"
          description="This forgot password for all users to login"
          canonical="https://www.canonicalurl.ie/"
          openGraph={{
            url: 'https://www.canonicalurl.ie/',
            title: 'Open Graph Title',
            description: 'Open Graph Description',
          }}
        />
        <Heading alignItems="center" mb={4}>
          SEO Forgot Password
        </Heading>
        <Formik initialValues={initialValues} onSubmit={onForgotPasswordSubmit}>
          {({ isSubmitting }) =>
            !loading && data ? (
              <Box>Please check your inbox</Box>
            ) : (
              <Form>
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                />

                <Flex mt={2}>
                  <NextLink href="/login">
                    <Link ml="auto">Back to Login</Link>
                  </NextLink>
                </Flex>

                <Button
                  type="submit"
                  backgroundColor="#2c3133"
                  color="white"
                  size="lg"
                  mt={4}
                  isLoading={isSubmitting}
                >
                  Send Reset Password Email
                </Button>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    );
};

export default ForgotPassword;
