import {
  Box,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { GetAllPostDocument, useGetAllPostQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

export const limit = 3;

const Index = () => {
  const { data, loading } = useGetAllPostQuery();

  return (
    <Layout>
      {loading ? (
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner />
        </Flex>
      ) : (
        <Stack spacing={8}>
          {data?.posts?.map((post: any) => (
            <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
              <Box flex={1}>
                <NextLink href={`/post/${post.id}`}>
                  <Link>
                    <Heading fontSize="xl">{post.title}</Heading>
                  </Link>
                </NextLink>
                <Text>posted by {post.user.username}</Text>
                <Flex align="center">
                  <Text mt={4}>{post.textSnippet}</Text>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const apolloClient = initializeApollo({ headers: context.req.headers });

  await apolloClient.query({
    query: GetAllPostDocument,
    variables: {
      limit,
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default Index;
