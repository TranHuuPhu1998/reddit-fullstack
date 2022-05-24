import { Button, Stack } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";
import Layout from "../components/Layout";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import { GetPostDocument } from "../generated/graphql";
// import Link from "next/link";

const Home = () => {
  const { t } = useTranslation();
  // const { data, loading } = useGetPostQuery();
  const changeLanguage = async (lang: string) => {
    await setLanguage(lang);
  };

  return (
    <Layout>
      <Stack spacing={4} direction="row" align="center">
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => changeLanguage("en")}
        >
          {t("common:en")}
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => changeLanguage("de")}
        >
          {t("common:de")}
        </Button>
        {/* <Text>{t("common:title")}</Text>
      <Link href="/create-post">Create post</Link> */}
      </Stack>
    </Layout>
  );
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GetPostDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Home;
