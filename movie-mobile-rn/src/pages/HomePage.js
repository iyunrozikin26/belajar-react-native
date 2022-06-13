import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from "react-native";

export default function HomePage({ navigation }) {
    const moviesUrl = "https://movie-deploy-server.herokuapp.com/movies";
    const usersUrl = "https://movie-deploy-server.herokuapp.com/users";

    const [state, setState] = useState({
        s: "Enter a movie...",
        movies: [],
        selected: {},
    });

    useEffect(() => {
        axios({
            method: "get",
            url: moviesUrl,
        })
            .then(({ data }) => {
                setState((prevState) => {
                    return { ...prevState, movies: data.rows };
                });
            })
            .catch((err) => console.log(err));
    }, []);

    const search = () => {
        // axios({
        //     method: "get",
        //     url: moviesUrl,
        // })
        //     .then(({ data }) => {
        //         setState((prevState) => {
        //             return { ...prevState, movies: data };
        //         });
        //     })
        //     .catch((err) => console.log(err));
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.navbar}>
                <Text style={styles.title}>Hack-Movies</Text>
                <Text style={styles.titleLogin} onPress={() => navigation.navigate("Login")}>
                    Login
                </Text>
            </View>
            <TextInput
                style={styles.searchBox}
                onChangeText={(text) =>
                    setState((prevState) => {
                        return { ...prevState, s: text };
                    })
                }
                onSubmitEditing={search}
                value={state.s}
            />
            <ScrollView style={styles.movies}>
                {state.movies.map((item) => {
                    return (
                        <View style={styles.movie} key={item.id}>
                            <Image
                                source={{ uri: item.imgUrl }}
                                style={{
                                    width: 250,
                                    height: 400,
                                    marginHorizontal: "auto",
                                    justifyContent: "center",
                                }}
                                resizeMode="cover"
                            />
                            <Text style={styles.movieTitle}>{item.title}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: "row",
        backgroundColor: "#223343",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    navbar: {
        flex: "row",
        marginBottom: 20,
    },
    title: {
        color: "#FFF",
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
    },
    titleLogin: {
        color: "yellow",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
    },
    searchBox: {
        fontSize: 15,
        fontWeight: "500",
        padding: 10,
        width: "80%",
        backgroundColor: "#FFF",
        borderRadius: 8,
        marginBottom: 40,
    },
    movies: {
        flex: 1,
    },
    movie: {
        flex: 1,
        width: "100%",
        marginBottom: 20,
    },
    movieTitle: {
        color: "#FFF",
        fontSize: "18",
        fontWeight: "700",
        padding: 20,
        backgroundColor: "#445565",
        textAlign: "center",
    },
});
