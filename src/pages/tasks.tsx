/* eslint-disable react-hooks/rules-of-hooks */
import type { GetServerSidePropsContext, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";

const tasks: NextPage = () => {
  const { data: session } = useSession();

  if (session)
    return (
      <main className="flex h-screen flex-col items-center justify-center gap-8 bg-danube-200">
        <div className="mt-8 h-4/5 w-4/5 max-w-5xl rounded-xl bg-white px-6 pt-4 pb-8 shadow-lg shadow-black/50 xl:mt-0">
          <div className="flex h-10 items-center justify-between">
            <h1 className="text-2xl font-bold text-danube-900">Your tasks</h1>
            <button className="rounded-lg bg-danube-500 px-4 py-2 font-semibold text-white">
              Add task
            </button>
          </div>
          <div className="mt-10 h-5/6 w-full overflow-x-hidden overflow-y-scroll px-4 text-lg">
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
            Learn Next
            <br />
          </div>
        </div>
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

export default tasks;
