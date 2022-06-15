import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./src/stores/store";

import HomePage from "./src/pages/HomePage";
import LoginPage from "./src/pages/LoginPage";
import RegisterPage from "./src/pages/RegisterPage";
import HomeScreen from "./src/pages/HomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Home" activeColor="#f0edf6" inactiveColor="#3e2465" barStyle={{ paddingBottom: 48 }}>
                    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Tab.Screen name="Profile" component={LoginPage} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="Register" component={RegisterPage} tabBarShowLabel={true} /> */}
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
