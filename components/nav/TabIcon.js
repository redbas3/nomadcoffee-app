import { Ionicons } from "@expo/vector-icons";

export default function TabIcon({ focused, iconName, color }) {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={26}
    />
  );
}
