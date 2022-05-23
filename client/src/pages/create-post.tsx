import { useCheckAuth } from "../utils/useCheckAuth";
import { Flex, Spinner, Box, Button, useToast } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { Formik, Form } from "formik";
import InputField from "../components/InputField";
import NextLink from "next/link";
import { CreatePostInput, useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const CreatePost = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const toast = useToast();
  const { data: authData, loading: authLoading } = useCheckAuth();
  const [createPostAction, { loading: _postLoading }] = useCreatePostMutation();
  const initialValues = { title: "", text: "" };

  const onCreatePostSubmit = async (values: CreatePostInput) => {
    const response = await createPostAction({
      variables: { createPostInput: values },
    });
    if (response.data?.createPost.success) {
      // post successfully
      toast({
        title: "Created post successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
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
                  colorScheme="teal"
                  isLoading={isSubmitting}
                >
                  {t("common:create-post")}
                </Button>
                <NextLink href="/">
                  <Button>{t("common:Go back to Homepage")}</Button>
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
