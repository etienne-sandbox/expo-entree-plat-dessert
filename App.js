import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GroupScreen } from "./screens/GroupScreen";
import { HomeScreen } from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Group"
          component={GroupScreen}
          options={({ route }) => ({ animation: "slide_from_bottom", title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
