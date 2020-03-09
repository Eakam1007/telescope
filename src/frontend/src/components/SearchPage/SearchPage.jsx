import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import Header from '../Header';
import SearchBar from '../SearchBar';

const SearchPage = () => {
  const SEARCH_QUERY = gql`
    query testQuery {
      getPosts(page: 0, perPage: 5) {
        title
      }
    }
  `;

  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  let queryResults;

  const [executeSearch, { data }] = useLazyQuery(SEARCH_QUERY, {
    onCompleted: () => {
      queryResults = data.getPosts;
    },
  });

  useEffect(() => {
    setResults([...results, queryResults]);
    console.log(results);
  }, queryResults);

  function onClickHandler() {
    executeSearch();
  }

  return (
    <div>
      <Header />
      <div
        style={{
          height: '12vh',
        }}
      ></div>
      <SearchBar onClickHandler={onClickHandler} searchText={searchText} />
    </div>
  );
};

export default SearchPage;
