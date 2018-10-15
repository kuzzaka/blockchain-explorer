import React from 'react';
import Head from 'next/head';
import WithLayout from '../components/with-layout';
import Page from '../components/page';

export default () => (
  <WithLayout>
    <Head>
      <title>Blockchain explorer</title>
    </Head>
    <Page />
  </WithLayout>
);
