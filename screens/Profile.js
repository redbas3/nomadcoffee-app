import { View, Text, TouchableOpacity } from "react-native";
import { logUserOut, usernameVar } from "../apollo";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";

export const COFFEESHOPS_QUERY = gql`
  query SeeProfile($username: String!) {
    seeProfile(username: $username) {
      email
      username
      name
    }
  }
`;

export default function Profile({ navigation: { setOptions } }) {
  const username = useReactiveVar(usernameVar);
  const { loading, error, data } = useQuery(COFFEESHOPS_QUERY, {
    variables: { username: username },
  });

  const LogoutButton = () => {
    return (
      <TouchableOpacity onPress={logUserOut}>
        <Ionicons name="log-out-outline" color="white" size={20} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setOptions({
      headerRight: () => <LogoutButton />,
    });
  }, []);

  let email = "";
  let name = "";
  if (!loading) {
    email = data?.seeProfile?.email;
    name = data?.seeProfile?.name;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        padding: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
        email: {email}
      </Text>
      <Text style={{ color: "white", fontSize: 20 }}>name: {name}</Text>
    </View>
  );
}
