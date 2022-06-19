import { useInfiniteQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

const useInfiniteGQLQuery = (key, query) => {
  const endpoint = 'https://rickandmortyapi.com/graphql';
  const headers = {
    headers: {
      authorization: `Bearer my_token`,
    }
  }
  const graphQLClient = new GraphQLClient(endpoint, headers);
  const fetchData = async (variables) => await graphQLClient.request(query, variables);

  return useInfiniteQuery(
    key,
    ({ pageParam = {page : 1} }) => fetchData(pageParam),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastData) => (lastData.locations.info.next ? {page: lastData.locations.info.next} : undefined),
    }
  );
}

export default useInfiniteGQLQuery;