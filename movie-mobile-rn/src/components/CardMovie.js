import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableHighlight } from "react-native";
import { useDispatch } from "react-redux";
import { getSingleMovie } from "../stores/creators/movieCreator";

const CardMovie = ({ item, genre }) => {
    // const dispatch = useDispatch();
    // console.log(item);
    const openPopup = (movieId) => {
        // dispatch(getSingleMovie(movieId));
    };

    // console.log(genre)
    // console.log(movies.movies.filter(mov=> {
    //     return mov.GenreId == genre
    // }))

    return (
        // <View>
        //     <Text>INI Card</Text>
        // </View>
        // <ScrollView style={styles.moviesContainer}>
        //     {movies.movies
        //         .filter((mov) => {
        //             if (genre) return mov.GenreId == genre;
        //             return mov;
        //         })
        //         .map((item) => {
        //             return (
        // <TouchableHighlight onPress={() => openPopup(item.id)} key={item.id}>
        <View style={styles.movie}>
            <Image
                source={{ uri: item.imgUrl }}
                style={{
                    width: 200,
                    height: 300,
                    marginHorizontal: "auto",
                    justifyContent: "center",
                }}
                resizeMode="cover"
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
        </View>
        // </TouchableHighlight>
        //             );
        //         })}
        // </ScrollView>
    );
};

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
    moviesContainer: {
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

export default CardMovie;
