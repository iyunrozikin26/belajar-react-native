import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight } from "react-native";
import { useDispatch } from "react-redux";
import { getSingleMovie, setSingleMovie } from "../stores/creators/movieCreator";

const DetailsMovie = ({ selected, selectMovie }) => {
    // const dispatch = useDispatch();
    const [Author, setAuthor] = useState(selected.user);
    const closePopup = () => {
        selectMovie({});
        setAuthor({});
        // dispatch(setSingleMovie({}));
    };

    return (
        <ScrollView style={styles.movies}>
            <View style={styles.popUp}>
                <Image
                    source={{ uri: selected.imgUrl }}
                    style={{
                        width: 100,
                        height: 140,
                        marginHorizontal: "auto",
                        justifyContent: "center",
                    }}
                    resizeMode="cover"
                />
                <Text style={styles.popTitle}>{selected.title}</Text>
                <Text style={{ marginBottom: 15 }}>Rating: {selected.rating}</Text>
                <Text style={{ marginBottom: 15, justifyContent: "space-evenly" }}>{selected.synopsis}</Text>
                <Text style={{ marginBottom: 15 }}>createdBy: {Author.email}</Text>
                <TouchableHighlight style={styles.closeBtn} onPress={closePopup}>
                    <Text>Back</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
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

export default DetailsMovie;
