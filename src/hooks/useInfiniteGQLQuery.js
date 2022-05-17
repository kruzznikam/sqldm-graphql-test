import { useInfiniteQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

const useInfiniteGQLQuery = (key, query, variables) => {
  const endpoint = 'https://rickandmortyapi.com/graphql';
  const headers = {
    headers: {
      authorization: `Bearer my_token`,
    }
  }
  const graphQLClient = new GraphQLClient(endpoint, headers);
  const fetchData = async () => await graphQLClient.request(query, variables);

  return useInfiniteQuery(key, fetchData, {keepPreviousData: true, refetchOnWindowFocus: false});
}

export default useInfiniteGQLQuery;