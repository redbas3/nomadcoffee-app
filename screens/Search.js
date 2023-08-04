import { useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components";
import DismissKeyboard from "../components/DismissKeyboard";
import { useForm } from "react-hook-form";
import { gql, useLazyQuery } from "@apollo/client";
import { ActivityIndicator } from "react-native";
import CoffeeBoxSmall from "../components/CoffeeBoxSmall";

const SEARCH_COFFEESHOPS = gql`
  query SearchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
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
    }
  }
`;

const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 10px;
`;

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Search({ navigation }) {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { setValue, register, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] =
    useLazyQuery(SEARCH_COFFEESHOPS);

  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", { required: true, minLength: 3 });
  }, []);

  const renderItem = ({ item: photo }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: photo.photos[0].file }}
        style={{ width: width / numColumns, height: width / numColumns }}
      />
    </TouchableOpacity>
  );

  const renderCoffeeShop = ({ item: coffeeShop }) => {
    return (
      <TouchableOpacity>
        <CoffeeBoxSmall
          width={width / numColumns}
          key={`coffeeShop_${coffeeShop.id}`}
          coffeeShop={coffeeShop}
          readMode={0}
        />
      </TouchableOpacity>
    );
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShops !== undefined ? (
          data?.searchCoffeeShops?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              style={{
                flex: 1,
                backgroundColor: "black",
                width: "100%",
                marginTop: 10,
              }}
              numColumns={numColumns}
              data={data?.searchCoffeeShops}
              keyExtractor={(photo) => "" + photo.id}
              renderItem={renderCoffeeShop}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
