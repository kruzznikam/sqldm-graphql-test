/* eslint-disable react-hooks/exhaustive-deps */
import gql from "graphql-tag";
import useInfiniteGQLQuery from '../hooks/useInfiniteGQLQuery';
import './Main.css';
import InfiniteScroll from "react-infinite-scroller";

const GET_CHARACTERS = gql`
  query($page: Int) {
    locations (page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        dimension
        created
      }
    }
  }
`;

const MainInfinite = () => {

  const {data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error} = useInfiniteGQLQuery('locations', GET_CHARACTERS);

  if (isLoading) return <div>loading.....</div>
  if (isError) return <div>{error}.....</div>

  const loadMore = () => {
    if (!isFetching) fetchNextPage();
  }

  return (
    <>
      <InfiniteScroll
        hasMore={hasNextPage}
        loadMore ={loadMore}
        loader = {<p>loading.....</p>}
      >
        {data.pages.map((page) => {
          return page.locations.results.map((location) => {
            return (
              <div key={location.id}>
                <h1>{location.name}</h1>
                <h3>{location.type}</h3>
              </div>
            )
          })
        })}
      </InfiniteScroll>
    </>
  );
};

export default MainInfinite;