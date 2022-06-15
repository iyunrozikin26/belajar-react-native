import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from "react-native";
import MovieList from "./MovieList";

export default function HomePage({ navigation }) {
    const Genres = ["All", "Action", "Comedy", "Horror"];
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.navbar}>
                <Text style={styles.title}>Hack-Movies</Text>
                <Text style={styles.titleLogin} onPress={() => navigation.navigate("Login")}>
                    Login
                </Text>
            </View>
            <ScrollView style={styles.movies}>
                {Genres.map((item, i) => {
                    return (
                        <TouchableHighlight onPress={() => openPopup(i)} key={i}>
                            <View style={styles.movie}>
                                <Text style={styles.movieTitle}>{item}</Text>
                            </View>
                        </TouchableHighlight>
                    );
                })}
            </ScrollView>
            {/* <MovieList /> */}
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
        height: "100%",
    },
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        color: "#FFF",
        fontSize: 27,
        fontWeight: "700",
        textAlign: "center",
        marginRight: 30,
    },
    titleLogin: {
        color: "yellow",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
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
        padding: 15,
        backgroundColor: "#445565",
        textAlign: "center",
    },
});
