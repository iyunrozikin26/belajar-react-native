import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import store from "./src/stores/store";
import client from "./src/config/apolloClient";

import LoginPage from "./src/pages/LoginPage";
import HomeScreen from "./src/pages/HomeScreen";
import ProfileScreen from "./src/pages/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Profile" activeColor="#f0edf6" inactiveColor="#3e2465" barStyle={{ paddingBottom: 48 }}>
                    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Tab.Screen name="Profile" component={LoginPage} options={{ headerShown: false }} />
                </Tab.Navigator>
            </NavigationContainer>
        </ApolloProvider>
    );
}
