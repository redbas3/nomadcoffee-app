import { FlatList, RefreshControl } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import CoffeeBox from "../components/CoffeeBox";

export const COFFEESHOPS_QUERY = gql`
  query SeeCoffeeShopsFeed($offset: Int!) {
    seeCoffeeShopsFeed(offset: $offset) {
      id
      name
      categories {
        id
        name
      }
      photos {
        id
        url
      }
      user {
        id
        name
      }
    }
  }
`;

export default function Home({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch, fetchMore } = useQuery(COFFEESHOPS_QUERY, {
    variables: { offset: 0 },
  });

  let coffeeShops = [];
  if (!loading) {
    coffeeShops = data.seeCoffeeShopsFeed;
  }

  const renderCoffeeShop = ({ item: coffeeShop }) => {
    return (
      <CoffeeBox
        key={`coffeeShop_${coffeeShop.id}`}
        coffeeShop={coffeeShop}
        readMode={0}
      />
    );
  };

  const refresh = async () => {
    console.log("refresh start");
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: "black",
        width: "100%",
      }}
      onEndReachedThreshold={0.05}
      onEndReached={() =>
        fetchMore({
          variables: {
            offset: coffeeShops?.length,
          },
        })
      }
      refreshControl={
        <RefreshControl
          isRefreshing={refreshing}
          onRefresh={refreshing}
          colors={["white"]} // for android
          tintColor={"white"} // for ios
        />
      }
      showsVerticalScrollIndicator={false}
      data={coffeeShops}
      keyExtractor={(item) => item.id}
      renderItem={renderCoffeeShop}
    ></FlatList>
  );
}
