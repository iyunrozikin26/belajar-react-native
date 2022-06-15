import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getSingleMovie, setSingleMovie } from "../stores/creators/movieCreator";
import CardMovie from "../components/CardMovie";
import DetailsMovie from "../components/DetailsMovie";

export default function MovieList({ setOpen, movies }) {
    const dispatch = useDispatch();
    const { selected } = useSelector((state) => state.movieReducer);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerSubTitle} onPress={() => setOpen(false)}>
                    {" "}
                    Back{" "}
                </Text>
                <Text style={styles.headerTitle}>Now Playing</Text>
            </View>
            <CardMovie movies={movies} />

            <Modal animationType="fade" transparent={false} visible={typeof selected.title != "undefined" ? true : false}>
                <DetailsMovie selected={selected} />
            </Modal>
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
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: "Regular",
        // marginRight: 30,
        color: "yellow",
    },
    headerSubTitle: {
        fontSize: 13,
        marginRight: 50,
        // fontFamily: "Regular",
        fontFamily: "Bold",
        color: "yellow",
    },
    title: {
        color: "#FFF",
        fontSize: 27,
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
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 8,
        marginBottom: 30,
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
    popUp: {
        padding: 20,
        flex: "row",
    },
    popTitle: {
        fontSize: 30,
        fontWeight: "800",
        marginBottom: 5,
    },
    closeBtn: {
        padding: 20,
        fontSize: 30,
        fontWeight: "900",
        backgroundColor: "#2484C4",
        alignItems: "center",
    },
});
