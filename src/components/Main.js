import gql from "graphql-tag";
import { useState } from "react";
import { useGQLQuery } from "../hooks/useGQLQuery";
import './Main.css';

const GET_CHARACTERS = gql`
  query($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        location {
          name
          type
        }
      }
      info {
        count
        pages
        next 
        prev
      }
    }
  }
`;

const Main = () => {
  const [page, setPage] = useState(1);

  const {data, isLoading, error, isFetching} = useGQLQuery(['characters', page], GET_CHARACTERS, { page });
  if (isLoading) return <div>loading.....</div>
  if (error) return <div>error.....</div>
  return (
      <div>
      {data.characters.results.map(character => (
        <div key={character.id}>
          <p>{character.name}</p>
          <img src={character.image} alt={`${character.name}`} />
          <p>Location -&gt; {character.location.name}    {character.location.type}</p>
        </div>
      ))}
      <div className="navFixed">
        <span>Current Page {page}</span>
        <button
          onClick={() => setPage(prevState => Math.max(prevState - 1, 0))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button onClick={() => setPage(prevState => prevState + 1)}>
          Next Page
        </button>
        {isFetching ? <span>Fetching...</span> : null}
        <p>Previous Page {data.characters.info.prev || 0}</p>
        <p>Next Page {data.characters.info.next || 0}</p>
        <p>Total Pages {data.characters.info.pages}</p>
        <p>Total Count {data.characters.info.count}</p>
      </div>
    </div>
  );
};

export default Main;