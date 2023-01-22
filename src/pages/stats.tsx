/* eslint-disable react-hooks/rules-of-hooks */
import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

const stats: NextPage = () => {
  const { data: session } = useSession();

  if (session)
    return (
      <main className="flex h-screen flex-col items-center justify-center gap-8 bg-danube-200 ">
        <h1 className="text">stats</h1>
      </main>
    );
  return <p>Must be signed in</p>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default stats;
