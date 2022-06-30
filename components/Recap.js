import { StyleSheet, Text, View } from "react-native";
import colors from "tailwindcss/colors";
import { useStore } from "../logic/store";

export function Recap({}) {
  const groups = useStore((state) => state.groups);

  const totalAdults = groups.reduce((acc, group) => acc + group.people.adults, 0);
  const totalChildren = groups.reduce((acc, group) => acc + group.people.children, 0);

  const totalStarter = groups.reduce((acc, group) => acc + group.food.starter, 0);
  const totalDish = groups.reduce((acc, group) => acc + group.food.dish, 0);
  const totalDessert = groups.reduce((acc, group) => acc + group.food.dessert, 0);
  const totalDrink = groups.reduce((acc, group) => acc + group.food.drink, 0);

  const totalPeople = totalAdults + totalChildren;

  return (
    <View style={{ marginTop: 5 }}>
      <Text style={styles.rowLabel}>Personnes</Text>
      <View style={styles.row}>
        <Item labelSingular="personne" labelPlural="personnes" value={totalPeople} />
        <Item labelSingular="adulte" labelPlural="adultes" value={totalAdults} />
        <Item labelSingular="enfant" labelPlural="enfants" value={totalChildren} />
      </View>
      <Text style={styles.rowLabel}>Nourriture</Text>
      <View style={styles.row}>
        <Item labelSingular="entrée" labelPlural="entrées" value={totalStarter} color={totalStarter >= totalPeople ? "blue" : "red"} />
        <Item labelSingular="plat" labelPlural="plats" value={totalDish} color={totalDish >= totalPeople ? "blue" : "red"} />
        <Item labelSingular="dessert" labelPlural="desserts" value={totalDessert} color={totalDessert >= totalPeople ? "blue" : "red"} />
        <Item labelSingular="boisson" labelPlural="boissons" value={totalDrink} color={totalDrink >= totalPeople ? "blue" : "red"} />
      </View>
    </View>
  );
}

function Item({ labelSingular, labelPlural, value, color = "slate" }) {
  return (
    <View style={[styles.item, { backgroundColor: colors[color][200] }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{value === 1 ? labelSingular : labelPlural}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 5,
    marginHorizontal: -5,
  },
  item: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  value: {
    fontSize: 30,
    fontWeight: "900",
  },
  label: {
    textTransform: "uppercase",
    fontSize: 10,
  },
  rowLabel: {
    marginLeft: 3,
    marginTop: 5,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
  },
});
