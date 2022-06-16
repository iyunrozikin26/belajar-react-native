import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Modal } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getAllMovies } from "../stores/creators/movieCreator";
import MovieList from "./MovieList";
import axios from "axios";

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const { movies, genres } = useSelector((state) => state.movieReducer);

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getGenres());
    }, []);
    

    const openMovie = (genre) => {
        setOpen(true);
        dispatch(getAllMovies(genre));
    };

    return (
        <View style={styles.container}>
            <StatusBar style={false} />
            <Text style={styles.title}>Hack-Movies</Text>
            <ScrollView style={styles.movies}>
                {genres.map((item, i) => {
                    return (
                        <TouchableHighlight onPress={() => openMovie(item.id)} key={i}>
                            <View style={styles.movie}>
                                <Text style={styles.movieTitle}>{item.name.toUpperCase()}</Text>
                            </View>
                        </TouchableHighlight>
                    );
                })}
            </ScrollView>
            <Modal animationType="fade" transparent={false} visible={open ? true : false}>
                <ScrollView style={styles.moviesModal}>
                    <MovieList movies={movies} setOpen={setOpen} />
                </ScrollView>
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
        paddingTop: 40,
        paddingHorizontal: 20,
        height: "100%",
    },
    title: {
        color: "yellow",
        fontSize: 27,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 30,
    },
    movies: {
        flex: 1,
        width: "70%",
    },
    moviesModal: {
        flex: 1,
        width: "100%",
    },
    movie: {
        flex: 1,
        width: "100%",
        marginBottom: 20,
    },
    movieTitle: {
        borderRadius: 20,
        color: "#FFF",
        fontSize: "18",
        fontWeight: "700",
        padding: 18,
        backgroundColor: "#445565",
        textAlign: "center",
    },
});
