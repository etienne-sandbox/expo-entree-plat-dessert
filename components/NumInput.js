import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import colors from "tailwindcss/colors";

export function NumInput({ value, onChange, labelSingular, labelPlural, min = 1, max = Infinity, color = "blue" }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <TouchableHighlight
        style={[styles.button, { opacity: value > min ? 1 : 0.5, backgroundColor: colors[color][200], borderColor: colors[color][400] }]}
        onPress={() => {
          if (value > min) {
            onChange(value - 1);
          }
        }}
        underlayColor={colors[color][500]}
      >
        <Feather name="minus" size={26} color={colors.slate[800]} />
      </TouchableHighlight>
      <Text style={{ flex: 1, marginHorizontal: 10, textAlign: "center", fontSize: 20, opacity: value === 0 ? 0.4 : 1 }}>
        <Text style={{ fontWeight: "900" }}>{value}</Text> {value === 1 ? labelSingular : labelPlural}
      </Text>
      <TouchableHighlight
        style={[styles.button, { backgroundColor: colors[color][200], borderColor: colors[color][400] }]}
        underlayColor={colors[color][500]}
        onPress={() => {
          if (value < max) {
            onChange(value + 1);
          }
        }}
      >
        <Feather name="plus" size={26} color={colors.slate[800]} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
  },
});
