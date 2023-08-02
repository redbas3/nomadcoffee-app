import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

const TOKEN = "token";
const USERNAME = "username";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const usernameVar = makeVar("");

export const logUserIn = async (token, username) => {
  await AsyncStorage.setItem(TOKEN, token);
  await AsyncStorage.setItem(USERNAME, username);

  tokenVar(token);
  usernameVar(username);
  isLoggedInVar(true);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.removeItem(USERNAME);

  isLoggedInVar(false);
  tokenVar("");
  usernameVar("");
};

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeCoffeeShopsFeed: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;
