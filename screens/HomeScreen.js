import { Text, View, TouchableHighlight, FlatList, StyleSheet, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "../logic/store";
import { Group } from "../components/Group";
import { Recap } from "../components/Recap";
import { Header } from "../components/Header";
import colors from "tailwindcss/colors";
import { Fragment } from "react";

export function HomeScreen({ navigation }) {
  const groups = useStore((state) => state.groups);

  const addGroup = useStore((state) => state.addGroup);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 15 }}>
          <Header />
          <Recap />
          <Text style={styles.rowLabel}>Groupes</Text>
          <View style={{ flex: 1, marginTop: 5 }}>
            <ScrollView>
              {groups.length === 0 ? (
                <View style={{ minHeight: 100, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>Aucun groupe</Text>
                </View>
              ) : (
                groups.map((group, index) => (
                  <Fragment key={group.id}>
                    {index > 0 && <View style={{ height: 10 }} />}
                    <Group
                      group={group}
                      onPress={() => {
                        navigation.navigate("Group", { groupId: group.id, name: group.name });
                      }}
                    />
                  </Fragment>
                ))
              )}
              <TouchableHighlight
                style={styles.addButton}
                underlayColor={colors.blue[500]}
                onPress={() => {
                  const groupId = addGroup();
                  navigation.navigate("Group", { groupId, name: "Nouveau groupe" });
                }}
              >
                <Text style={{ padding: 10, fontSize: 20, textAlign: "center" }}>Ajouter un groupe</Text>
              </TouchableHighlight>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: colors.blue[100],
    borderColor: colors.blue[400],
    borderRadius: 5,
    borderWidth: 2,
    marginTop: 10,
  },
  rowLabel: {
    marginLeft: 3,
    marginTop: 5,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "600",
  },
});
