import React from 'react';
import Header from './header';
import TransactionList from './transaction-list';
import Summary from './summary';

const Page = () => (
  <main>
    <Header title="Blockchain Explorer" />
    <Summary />
    <TransactionList />
  </main>
);

export default Page;
