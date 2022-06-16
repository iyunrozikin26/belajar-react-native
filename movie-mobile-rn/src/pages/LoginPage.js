import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Modal } from "react-native";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Login } from "../stores/creators/userCreator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RegisterPage from "./RegisterPage";
import axios from "axios";

export default function LoginPage({ navigation }) {
    const dispatch = useDispatch();
    const [user, setUserLogin] = useState({
        email: "",
        password: "",
    });

    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:8080/users",
        })
            .then(({ data }) => {
                console.log(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const openRegister = () => {
        setOpen(true);
    };

    const submitLogin = async () => {
        try {
            const userLogin = await dispatch(Login(user));
            console.log(userLogin.data);
            const { access_token } = userLogin.data;
            await AsyncStorage.setItem("access_token", access_token);
            const storage = await AsyncStorage.getItem("access_token");
            if (storage) navigation.navigate("Home");
        } catch (error) {
            console.log(error);
        }
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
                    <Text style={{ color: "yellow" }} onPress={openRegister}>
                        Register
                    </Text>
                </Text>
            </View>
            <Modal animationType="fade" transparent={false} visible={open ? true : false}>
                <RegisterPage setOpen={setOpen} />
            </Modal>
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
