import "../app/globals.css";

import { GetServerSideProps } from "next";

export default function Home({ hello }: { hello: string }) {
  return <div className="bg-red-200">{hello}</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      hello: "ok",
    },
  };
};
