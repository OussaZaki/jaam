import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Video from "react-native-video";
import TitleBig from '../components/TitleBig';
import Legal from '../components/Legal';
import Link from '../components/Link';
import SpotifyButton from '../components/SpotifyButton';

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    wrapper: {
        height: "100%",
        alignItems: "flex-start",
        flexDirection: "column",
        marginHorizontal: 20,
    },
    spacer: {
        flex: 4
    },
    content: {
        flex: 6
    },
    description: {
        color: "white",
        fontSize: 24,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        fontWeight: "500"
    },
    footer: {
        flex: 2,
        width: "100%"
    }
});

const LoginScreen: React.SFC = () => {
    const [isAppReady, setIsAppReady] = useState(false);
    useEffect(() => {
        console.log('Hiding')
        if (isAppReady) {
            SplashScreen.hide();
        }
    }, [isAppReady]);

    const onPress = () => {
        setIsAppReady(!isAppReady);
    }
    // const _bootstrap = async () => {
    //     // Bootsrap what needs to be bootsrapped.
    // };

    return (
        <View>
            <Video
                source={require("../../assets/jaam-splash-video.mp4")}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                resizeMode={"stretch"}
                onReadyForDisplay={() => setIsAppReady(true)}
                rate={1.0}
                ignoreSilentSwitch={"obey"}
            />
            <View style={styles.wrapper}>
                <View style={styles.spacer} />
                <View style={styles.content}>
                    <TitleBig text={'Welcome \nto Jaam.'} />
                </View>
                <View style={styles.footer}>
                    <SpotifyButton isLoading={!isAppReady} label={"Log in with Spotify"} onPress={onPress}/>
                    <Legal>
                        <Text>By logging in I accept the </Text>
                        <Link text={"Jaam's Terms "} />
                        <Text>and confirm that I have read the </Text>
                        <Link text={"Jaam's Privacy Notice"} />
                        <Text>.</Text>
                    </Legal>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen;
