import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";

const stats: NextPage = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-8 bg-danube-200 ">
      <h1 className="text">stats</h1>
    </main>
  );
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
