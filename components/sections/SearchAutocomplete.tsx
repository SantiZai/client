"use client";

import { algoliasearch } from "algoliasearch";
import { useEffect } from "react";
import { SearchBox } from "react-instantsearch";
import {InstantSearchNext} from "react-instantsearch-nextjs";

const searchClient = algoliasearch(
  "8IJKLV99DI",
  "02085a5bfac16ef9582caaedd0f74559"
);

// Fetch and index objects in Algolia
const processRecords = async () => {
  const datasetRequest = await fetch('https://dashboard.algolia.com/sample_datasets/movie.json');
  const objects = await datasetRequest.json();
  return searchClient.saveObjects({ indexName: 'movies_index', objects });
};


const SearchAutocomplete = () => {
    useEffect(() => {
        processRecords()
      .then(() => console.log('Successfully indexed objects!'))
      .catch((err) => console.error(err));
    }, [])
  return (
    <div>
        {/* <InstantSearchNext
      searchClient={searchClient}
      indexName="locations"
    >
      <SearchBox />
    </InstantSearchNext> */}
    </div>
  );
};

export default SearchAutocomplete;
