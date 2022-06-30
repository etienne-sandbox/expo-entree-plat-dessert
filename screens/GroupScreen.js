import { useEffect, useRef, useState } from "react";
import { Text, View, TextInput, TouchableHighlight, StyleSheet, ScrollView, Alert } from "react-native";
import { NumInput } from "../components/NumInput";
import { useStore } from "../logic/store";
import Feather from "@expo/vector-icons/Feather";
import colors from "tailwindcss/colors";

export function GroupScreen({ route, navigation }) {
  const group = useStore((state) => state.groups.find((group) => group.id === route.params.groupId));

  const setGroupName = useStore((state) => state.setGroupName);
  const setGroupPeople = useStore((state) => state.setGroupPeople);
  const setGroupFood = useStore((state) => state.setGroupFood);
  const deleteGroup = useStore((state) => state.deleteGroup);

  const [editingName, setEditingName] = useState(group.name);

  useEffect(() => {
    navigation.setParams({ groupId: group.id, name: group.name });
    setEditingName(group.name);
  }, [group.name]);

  const inputRef = useRef(null);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: "stretch", paddingTop: 10 }}>
        <Text style={styles.label}>Nom</Text>
        <View style={{ flexDirection: "row", alignItems: "stretch", padding: 10 }}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={editingName}
            onChangeText={setEditingName}
            onBlur={() => {
              setGroupName(group.id, editingName);
            }}
          />
          {editingName !== group.name && (
            <TouchableHighlight
              onPress={() => {
                setGroupName(group.id, editingName);
                if (inputRef.current) {
                  inputRef.current.blur();
                }
              }}
              style={styles.checkButton}
            >
              <Feather name="check" size={24} />
            </TouchableHighlight>
          )}
        </View>
        <Text style={styles.label}>Personnes</Text>
        <NumInput
          value={group.people.adults}
          labelPlural="adultes"
          labelSingular="adulte"
          onChange={(v) => setGroupPeople(group.id, "adults", v)}
        />
        <NumInput
          value={group.people.children}
          labelPlural="enfants"
          labelSingular="enfant"
          min={0}
          onChange={(v) => setGroupPeople(group.id, "children", v)}
        />

        <Text style={styles.label}>Nourriture</Text>
        <NumInput
          color="teal"
          value={group.food.starter}
          labelPlural="entrées"
          labelSingular="entrée"
          min={0}
          onChange={(v) => setGroupFood(group.id, "starter", v)}
        />
        <NumInput
          color="teal"
          value={group.food.dish}
          labelPlural="plats"
          labelSingular="plat"
          onChange={(v) => setGroupFood(group.id, "dish", v)}
          min={0}
        />
        <NumInput
          color="teal"
          value={group.food.dessert}
          labelPlural="desserts"
          labelSingular="dessert"
          onChange={(v) => setGroupFood(group.id, "dessert", v)}
          min={0}
        />
        <NumInput
          color="teal"
          value={group.food.drink}
          labelPlural="boissons"
          labelSingular="boisson"
          onChange={(v) => setGroupFood(group.id, "drink", v)}
          min={0}
        />
        <TouchableHighlight
          style={styles.deleteButton}
          underlayColor={colors.red[500]}
          onPress={() => {
            Alert.alert("Supprimer le groupe", "Êtes-vous sûr de vouloir supprimer ce groupe ?", [
              { text: "Annuler", style: "cancel" },
              {
                text: "Supprimer",
                onPress: () => {
                  navigation.goBack();
                  deleteGroup(group.id);
                },
              },
            ]);
          }}
        >
          <Text
            style={{
              padding: 10,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Supprimer
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 15,
    marginTop: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 5,
    fontSize: 20,
    flex: 1,
    height: 50,
    backgroundColor: colors.orange[50],
    borderRadius: 5,
    borderColor: colors.orange[200],
    borderWidth: 2,
  },
  checkButton: {
    padding: 10,
    fontSize: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.orange[100],
    borderColor: colors.orange[400],
    borderRadius: 5,
    borderWidth: 2,
  },
  deleteButton: {
    backgroundColor: colors.red[100],
    borderColor: colors.red[400],
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: 10,
    marginTop: 20,
  },
});
