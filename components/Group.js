import { Text, TouchableHighlight, View } from "react-native";
import colors from "tailwindcss/colors";

export function Group({ group, onPress }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        borderRadius: 5,
      }}
      underlayColor={colors.blue[500]}
    >
      <View
        style={{
          backgroundColor: colors.blue[500],
          borderColor: colors.blue[700],
          borderWidth: 2,
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingVertical: 5,
          color: colors.white,
        }}
      >
        <Text style={{ fontSize: 23, fontWeight: "700", color: colors.white, marginBottom: 2 }}>{group.name}</Text>
        <Text style={{ color: colors.slate[200], marginBottom: 2 }}>
          {group.people.adults} adultes, {group.people.children} enfants
        </Text>
        <Text style={{ color: colors.slate[200] }}>
          {group.food.starter} entrées, {group.food.dish} plats, {group.food.dessert} desserts, {group.food.drink} boissons
        </Text>
      </View>
    </TouchableHighlight>
  );
}
