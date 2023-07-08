import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Head from 'next/head';
import { Form, FormControl } from 'react-bootstrap';

export default function SearchBar() {
  const [searchBar, setSearchBar] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setSearchBar(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchBar !== '') {
      router.push(`/searchbar/${searchBar}`);
    }
    setSearchBar('');
  };

  return (
    <>
      <Head>
        <title>Search Results</title>
      </Head>
      <Form className="searchbar" onSubmit={handleSubmit}>
        <FormControl type="text" placeholder="Search" onChange={handleChange} value={searchBar} style={{ width: '300px' }} />
      </Form>
    </>
  );
}
