/* eslint-disable react-hooks/exhaustive-deps */
import gql from "graphql-tag";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [isInfiniteScrolingOn, setIsInfiniteScrolingOn] = useState(false);
  const buttonRef = useRef();
  const [characterData, setCharacterData] = useState([]);

  const {data, isLoading, error, isFetching, status} = useGQLQuery(['characters', page], GET_CHARACTERS, { page });

  const scrollHandler = useCallback(() => {
    if (buttonRef.current.getBoundingClientRect().top <= window.innerHeight) {
      if (isInfiniteScrolingOn) setPage(page => page+1);
    }
  }, [isInfiniteScrolingOn]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, [scrollHandler]);

  useEffect(() => {
    if (data?.characters?.results) {
      if (isInfiniteScrolingOn) {
        const newArry = [...characterData, ...data.characters.results];
        const uniqueChar = [...new Map(newArry.map((item) => [item.id, item])).values()]
      setCharacterData(uniqueChar);
      } else setCharacterData(data.characters.results);
    }
  }, [data, isInfiniteScrolingOn]);

  if (isLoading) return <div>loading.....</div>
  if (error) return <div>error.....</div>
  return (
      <div>
      {characterData.map(character => (
        <div key={character.id}>
          <p>{character.name}</p>
          <img src={character.image} alt={`${character.name}`} />
          <p>Location -&gt; {character.location.name}    {character.location.type}</p>
        </div>
      ))}
      <button id='button' ref={buttonRef}>{status}</button>
      <div className="navFixed">
        <label>Infinite Scroling</label>
        <input type='checkbox' checked={isInfiniteScrolingOn} onChange={(event) => {setIsInfiniteScrolingOn(event.target.checked)}}/> <br />
        <button
          onClick={() => setPage(prevState => Math.max(prevState - 1, 0))}
          disabled={page === 1 || isInfiniteScrolingOn}
        >
          Previous Page
        </button>
        <button onClick={() => setPage(prevState => prevState + 1)} disabled={isInfiniteScrolingOn}>
          Next Page
        </button>
        {isFetching ? <span>Fetching...</span> : null}
        <p>Previous Page {data.characters.info.prev || 0}</p>
        <p>Current Page {page}</p>
        <p>Next Page {data.characters.info.next || 0}</p>
        <p>Total Pages {data.characters.info.pages}</p>
        <p>Total Count {data.characters.info.count}</p>
      </div>
    </div>
  );
};

export default Main;