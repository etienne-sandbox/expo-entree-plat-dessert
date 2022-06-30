import { Text, View } from "react-native";
import colors from "tailwindcss/colors";

export function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          fontWeight: "900",
          fontSize: 30,
          marginBottom: 4,
          color: colors.blue[800],
        }}
      >
        Entrée / Plat / Dessert
      </Text>
    </View>
  );
}
