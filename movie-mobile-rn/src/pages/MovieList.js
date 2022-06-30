import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, ScrollView, TouchableHighlight } from "react-native";
import { useSelector } from "react-redux";

import { GET_ALL_MOVIES, SELECTED_MOVIE } from "../queries/movieQuery";
import { useQuery } from "@apollo/client";

import CardMovie from "../components/CardMovie";
import DetailsMovie from "../components/DetailsMovie";

export default function MovieList({ genre, setOpen }) {
    // const { selected } = useSelector((state) => state.movieReducer);
    const [selected, selectMovie] = useState({});

    const { loading: loadingAll, error: errorAll, data: movies } = useQuery(GET_ALL_MOVIES);
    const openPopup = (movie) => {
        selectMovie(movie);
    };
    // console.log(selected);

    if (loadingAll) return <Text style={styles.title}>Loading...</Text>;
    if (errorAll) return <Text style={styles.title}>{error}</Text>;
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerSubTitle} onPress={() => setOpen(false)}>
                    {" "}
                    Back{" "}
                </Text>
                <Text style={styles.headerTitle}>Now Playing</Text>
            </View>
            <ScrollView style={styles.moviesContainer}>
                {movies.movies
                    .filter((mov) => {
                        if (genre) return mov.GenreId == genre;
                        return mov;
                    })
                    .map((item, i) => {
                        return (
                            <TouchableHighlight onPress={() => openPopup(item)} key={i}>
                                <CardMovie item={item} genre={genre} />
                            </TouchableHighlight>
                        );
                    })}
            </ScrollView>

            <Modal animationType="fade" transparent={false} visible={typeof selected.title != "undefined" ? true : false}>
                <DetailsMovie selected={selected} selectMovie={selectMovie} />
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
