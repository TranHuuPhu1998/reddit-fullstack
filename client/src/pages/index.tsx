<<<<<<< HEAD
import { NetworkStatus } from '@apollo/client';
=======
import { NetworkStatus } from "@apollo/client";
>>>>>>> 230b2f5 (coding)
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
<<<<<<< HEAD
} from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import NextLink from 'next/link';
import { GetAllPostDocument, useGetAllPostQuery } from '../generated/graphql';
import { addApolloState, initializeApollo } from '../lib/apolloClient';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

const PostEditDeleteButtons = dynamic(
  () => import('../components/PostEditDeleteButtons'),
);
=======
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import Layout from "../components/Layout";
import PostEditDeleteButtons from "../components/PostEditDeleteButtons";
import { GetAllPostDocument, useGetAllPostQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
>>>>>>> 230b2f5 (coding)

export const limit = 3;

const Index = () => {
  const { data, loading, fetchMore, networkStatus } = useGetAllPostQuery({
    variables: {
      limit,
    },
    // component nao render boi cai Posts query, se rerender khi networkStatus thay doi, tuc la fetchMore
    notifyOnNetworkStatusChange: true,
  });

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const loadMorePosts = () => {
    fetchMore({ variables: { cursor: data?.posts?.cursor } });
  };

  return (
    <Layout>
      {loading && !loadingMorePosts ? (
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner />
        </Flex>
      ) : (
        <Stack spacing={8}>
          {data?.posts?.paginatedPosts?.map((post: any) => (
            <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
              <Box flex={1}>
                <NextLink href={`/post/${post.id}`}>
                  <a>{post.title}</a>
                </NextLink>
                <Text>posted by {post.user.username}</Text>
                <Flex align="center">
                  <Text mt={4}>{post.textSnippet}</Text>
                  <Box ml="auto">
                    <PostEditDeleteButtons />
                  </Box>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data?.posts?.hasMore && (
        <Flex>
          <Button
            m="auto"
            my={8}
            isLoading={loadingMorePosts}
            onClick={loadMorePosts}
          >
            {loadingMorePosts ? "Loading" : "Show more"}
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
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
