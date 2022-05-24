import { Box, Flex, Heading, Link, Button, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import useTranslation from "next-translate/useTranslation";
const Navbar = () => {
  const { t } = useTranslation();
  const { data, loading: useMeQueryLoading } = useMeQuery();
  const [logout, { loading: useLogoutMutationLoading }] = useLogoutMutation();
  const toast = useToast();
  const router = useRouter();

  const logoutUser = async () => {
    const response = await logout({
      update(cache, { data }) {
        if (data?.logout) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: null },
          });
        }
      },
    });
    if (!response.data?.logout) {
      toast({
        title: "Logout failed",
        status: "error",
        isClosable: true,
      });
    } else if (response.data?.logout) {
      toast({
        title: "Logout success",
        status: "success",
        isClosable: true,
      });
      router.push("/login");
    }
  };

  let body;

  if (useMeQueryLoading) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>{t("common:login")}</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>{t("common:register")}</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <NextLink href="/create-post">
          <Button mr={4}>{t("common:create-post")}</Button>
        </NextLink>
        <Button onClick={logoutUser} isLoading={useLogoutMutationLoading}>
          {t("common:logout")}
        </Button>
      </Flex>
    );
  }

  return (
    <Box bg="tan" p={4}>
      <Flex maxW={800} justifyContent="space-between" align="center" m="auto">
        <NextLink href="/">
          <Heading>{t("common:reddit")}</Heading>
        </NextLink>
        <Box>{body}</Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
