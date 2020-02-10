import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import List from "../components/List";
import TitlePrimary from '../components/TitlePrimary';
import TitleBar from '../components/TitleBar';
import Loader from '../components/Loader';
import Paragraph from '../components/Paragraph';

const PLAYLISTS = [
    {
        id: "001",
        label: "Hip Hop 2019"
    },
    {
        id: "002",
        label: "Soul lounge"
    },
    {
        id: "003",
        label: "Indie Rock"
    },
    {
        id: "004",
        label: "Indie Rock"
    }
]

const PlaylistsScreen: React.SFC = (sa) => {
    const [isLoading, setIsLoading] = useState(false);
    const onPress = (key: string, clickArea: number) => {
        console.log(key, clickArea);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TitlePrimary text={"Pick \na Playlist."}></TitlePrimary>
                <TitleBar />
            </View>
            <View style={styles.playlists}>
                {isLoading
                    ? <View style={styles.loader}>
                        <Paragraph center text={"Stay awesome while \nwe fetch your playlists."}/>
                        <Loader active/>
                    </ View>
                    : <List
                        items={PLAYLISTS}
                        onSelect={onPress}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        marginTop: 40,
        marginHorizontal: 20
    },
    header: {
        marginVertical: 36,
        justifyContent: 'center'
    },
    playlists: {
        alignSelf: 'stretch'
    },
    loader: {
        marginTop: "20%",
        textAlign: "center"
    }
});

export default PlaylistsScreen;
