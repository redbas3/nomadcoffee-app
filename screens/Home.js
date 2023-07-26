import { View, Text, ScrollView } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import CoffeeBox from "../components/CoffeeBox";

export const COFFEESHOPS_QUERY = gql`
  query SeeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      error
      totalPages
      coffeeShops {
        name
        photos {
          id
          url
        }
        id
        categories {
          id
          name
        }
        user {
          id
          name
        }
      }
    }
  }
`;

export default function Home({ navigation }) {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(COFFEESHOPS_QUERY, {
    variables: { page: page },
  });

  let coffeeShops = [];
  if (!loading) {
    coffeeShops = data.seeCoffeeShops.coffeeShops;
    // coffeeShops = data.seeCoffeeShops;
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      {!loading
        ? coffeeShops.map((coffeeShop) => (
            <CoffeeBox
              key={`coffeeShop_${coffeeShop.id}`}
              coffeeShop={coffeeShop}
              readMode={0}
            />
          ))
        : null}
    </ScrollView>
  );
}
