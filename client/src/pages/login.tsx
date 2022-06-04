import {
  Box,
  Button,
  Spinner,
  Flex,
  useToast,
  Heading,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import {
  LoginInput,
  MeDocument,
  MeQuery,
  useLoginMutation,
} from '../generated/graphql';
import { mapFieldErrors } from '../helpers/mapFieldErrors';
import { useCheckAuth } from '../utils/useCheckAuth';
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';

const Login = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: authData, loading: authLoading } = useCheckAuth();

  const initialValues: LoginInput = { usernameOrEmail: '', password: '' };

  const [loginUser, { loading: _loginUserLoading, error }] = useLoginMutation();

  const toast = useToast();

  const onLoginSubmit = async (
    values: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>,
  ) => {
    const response = await loginUser({
      variables: {
        loginInput: values,
      },
      update(cache, { data }) {
        if (data?.login.success) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: data.login.user },
          });
        }
        // const meData = cache.readQuery({ query: MeDocument });
      },
    });

    if (response.data?.login.errors) {
      setErrors(mapFieldErrors(response.data.login.errors));
    } else if (response.data?.login.user) {
      // register successfully
      toast({
        title: t('common:welcome'),
        description: `${response.data.login.user.username}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      router.push('/home');
    }
  };

  return (
    <>
      <NextSeo
        title="Reddit | Login"
        description="This Login page for all users to login"
        canonical="https://www.canonicalurl.ie/"
        openGraph={{
          url: 'https://www.canonicalurl.ie/',
          title: 'Open Graph Title',
          description: 'Open Graph Description',
        }}
      />
      <Heading alignItems="center" mb={4}>
        SEO Login Page
      </Heading>
      {authLoading || (!authLoading && authData?.me) ? (
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner />
        </Flex>
      ) : (
        <Wrapper size="small">
          {error && <p>{t('Failed to login. Internal server error.')}</p>}
          <Formik initialValues={initialValues} onSubmit={onLoginSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="usernameOrEmail"
                  placeholder="Username or Email"
                  label={t('common:username-or-email')}
                  type="text"
                />
                <Box mt={4}>
                  <InputField
                    name="password"
                    placeholder="Password"
                    label={t('common:password')}
                    type="password"
                  />
                </Box>

                <Flex mt={2}>
                  <NextLink href="/forgot-password">
                    <a>{t('common:forgot-password')}</a>
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
                  {t('common:login')}
                </Button>
              </Form>
            )}
          </Formik>
        </Wrapper>
      )}
    </>
  );
};

export default Login;

// commit 3
