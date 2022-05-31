import { useCheckAuth } from '../utils/useCheckAuth';
import {
  Flex,
  Spinner,
  Box,
  Button,
  useToast,
  Heading,
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import { Formik, Form } from 'formik';
import InputField from '../components/InputField';
import NextLink from 'next/link';
import { CreatePostInput, useCreatePostMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { NextSeo } from 'next-seo';

const CreatePost = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toast = useToast();
  const { data: authData, loading: authLoading } = useCheckAuth();
  const [createPostAction, { loading: _postLoading }] = useCreatePostMutation();
  const initialValues = { title: '', text: '' };

  const onCreatePostSubmit = async (values: CreatePostInput) => {
    const response = await createPostAction({
      variables: { createPostInput: values },
      update(cache, { data }) {
        cache.modify({
          fields: {
            posts(existing) {
              if (data?.createPost.success && data.createPost.post) {
                // Post:new_id
                const newPostRef = cache.identify(data.createPost.post);

                const newPostsAfterCreation = {
                  ...existing,
                  totalCount: existing.totalCount + 1,
                  paginatedPosts: [
                    { __ref: newPostRef },
                    ...existing.paginatedPosts, // [{__ref: 'Post:1'}, {__ref: 'Post:2'}]
                  ],
                };

                return newPostsAfterCreation;
              }
            },
          },
        });
      },
    });
    if (response.data?.createPost.success) {
      // post successfully
      toast({
        title: 'Created post successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/');
    }
  };

  if (authLoading || (!authLoading && !authData?.me)) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Spinner />
      </Flex>
    );
  } else {
    return (
      <Layout>
        <NextSeo
          title="Reddit | Create Post"
          description="This create post for all users to login"
          canonical="https://www.canonicalurl.ie/"
          openGraph={{
            url: 'https://www.canonicalurl.ie/',
            title: 'Open Graph Title',
            description: 'Open Graph Description',
          }}
        />
        <Heading alignItems="center" mb={4}>
          SEO Create Post
        </Heading>
        <Formik initialValues={initialValues} onSubmit={onCreatePostSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="title"
                placeholder="Title"
                label="Title"
                type="text"
              />
              <Box mt={4}>
                <InputField
                  textarea
                  name="text"
                  placeholder="Text"
                  label="Text"
                  type="textarea"
                />
              </Box>
              <Flex justifyContent="space-between" alignItems="center" mt={4}>
                <Button
                  type="submit"
                  backgroundColor="#2c3133"
                  color="white"
                  size="lg"
                  isLoading={isSubmitting}
                >
                  {t('common:create-post')}
                </Button>
                <NextLink href="/">
                  <Button>{t('common:Go back to Homepage')}</Button>
                </NextLink>
              </Flex>
            </Form>
          )}
        </Formik>
      </Layout>
    );
  }
};

export default CreatePost;
