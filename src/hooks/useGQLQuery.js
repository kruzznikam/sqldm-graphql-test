import { useQuery } from "react-query";
import { GraphQLClient } from "graphql-request";

export const useGQLQuery = (key, query, variables) => {
  const endpoint = 'https://rickandmortyapi.com/graphql';
  const headers = {
    headers: {
      authorization: `Bearer my_token`,
    }
  }
  const graphQLClient = new GraphQLClient(endpoint, headers);
  const fetchData = async () => await graphQLClient.request(query, variables);

  return useQuery(key, fetchData, {keepPreviousData: true});
}