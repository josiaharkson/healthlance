import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { FullScreenLoader } from "../components/general/IsLoading";

const Assist = dynamic(() => import("../components/Assist.component"), {
  loading: () => <FullScreenLoader />,
});

function Index() {
  return (
    <>
      <Head>
        <title>Welcome | Homepage</title>
      </Head>
      <Assist />
    </>
  );
}

export default Index;
