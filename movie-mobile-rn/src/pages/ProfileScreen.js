import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, View, Image, Text, Button, ScrollView, TouchableHighlight } from "react-native";
import { TextInput } from "react-native-paper";
import { GET_USER } from "../queries/userQuery";

const ProfileScreen = ({ setAccessToken, userId }) => {
    const closePopup = () => {
        setAccessToken(false);
    };

    const {
        loading,
        error,
        data: user,
    } = useQuery(GET_USER, {
        variables: { userId: `${userId}` },
    });

    if (loading) return <Text style={styles.title}>Loading...</Text>;
    if (error) return <Text style={styles.title}>{error}</Text>;

    return (
        <View style={styles.container}>
            <ScrollView style={styles.movies}>
                <Text style={styles.title}>Profile</Text>
                <View style={styles.popUp}>
                    <Image
                        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Alberto_conversi_profile_pic.jpg" }}
                        style={{
                            width: 100,
                            height: 100,
                            marginHorizontal: "auto",
                            justifyContent: "center",
                            borderRadius: 50,
                            marginBottom: 30,
                        }}
                        resizeMode="cover"
                    />
                    <View style={styles.closeBtn}>
                        <Text style={styles.popTitle}>{user.user.email}</Text>
                    </View>
                    <View style={styles.closeBtn}>
                        <Text style={styles.popTitle}>
                            {user.user.firstName} {user.user.lastName}
                        </Text>
                    </View>
                    <TextInput style={styles.searchBox} value={user.user.address} />
                    <TextInput style={styles.searchBox} value={user.user.phoneNumber} />
                    <TouchableHighlight style={styles.closeBtn} onPress={closePopup}>
                        <Text style={styles.titleLogOut}>Logout</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: "row",
        backgroundColor: "#223343",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 60,
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
    titleLogOut: {
        color: "#FFF",
        fontSize: 15,
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
        // padding: 10,
        width: "100%",
        alignItems: "center",
        textAlign: "center",
        // backgroundColor: "#FFF",
        backgroundColor: "#2484C4",

        borderRadius: 40,
        marginBottom: 15,
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
        marginBottom: 5,
        fontSize: 30,
        fontWeight: "800",
    },
    closeBtn: {
        padding: 20,
        fontSize: 30,
        width: "auto",
        // fontWeight: "900",
        backgroundColor: "#2484C4",
        alignItems: "center",
        borderRadius: 40,
        marginBottom: 20,
    },
});

export default ProfileScreen;
