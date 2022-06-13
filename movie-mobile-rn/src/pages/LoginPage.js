import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from "react-native";

export default function LoginPage({ navigation }) {
    const usersUrl = "https://movie-deploy-server.herokuapp.com/users";

    const [user, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const submitLogin = () => {
        console.log("ini button login");
        axios({
            method: "post",
            url: usersUrl + "/login",
            data: user,
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.inputBox}
                onChangeText={(text) => {
                    setUserLogin({
                        ...user,
                        email: text,
                    });
                }}
                name="email"
                placeholder="email@gmail.com"
                keyboardType="text"
                value={user.email}
            />
            <TextInput
                style={styles.inputBox}
                onChangeText={(text) => {
                    setUserLogin({
                        ...user,
                        password: text,
                    });
                }}
                name="password"
                placeholder="******"
                keyboardType="password"
                value={user.password}
            />
            <Button title="LOGIN" color="#841584" onPress={submitLogin} />
            <View>
                <Text style={styles.register}>
                    don't have an account?{" "}
                    <Text style={{ color: "yellow" }} onPress={() => navigation.navigate("Register")}>
                        Register
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#223343",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    title: {
        color: "#FFF",
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 20,
    },

    inputBox: {
        fontSize: 15,
        fontWeight: "00",
        padding: 15,
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 8,
        marginBottom: 15,
    },
    boxSubmit: {
        width: "50%",
        fontSize: 20,
        backgroundColor: "#841584",
        fontWeight: "700",
    },

    register: {
        color: "#FFF",
        fontSize: "18",
        fontWeight: "700",
        padding: 10,
        // backgroundColor: "#445565",
    },
});
