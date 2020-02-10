import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import SpotifyIcon from './SpotifyIcon';
import { Loader } from './Loader';
import { Colors } from './Colors';
import { Fonts } from './Fonts';

const styles = StyleSheet.create({
    spotifyButton: {
        backgroundColor: Colors.light,
        width: "100%",
        paddingVertical: 13,
        paddingHorizontal: 20,
        marginBottom: 16,
        flexDirection: 'row'
    },
    label: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        textAlign: "center",
        letterSpacing: 0.7,
        lineHeight: 22,
        paddingLeft: 22,
        flex: 2
    },
    loader: {
        flex: 2
    }
})

type SpotifyButtonProps = TouchableOpacityProps & {
    isLoading: boolean;
    label: string;
}

export const SpotifyButton: React.SFC<SpotifyButtonProps> = ({ onPress, isLoading, label }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <View style={styles.spotifyButton}>
            {
                (isLoading)
                    ? <View style={styles.loader}><Loader active/></ View>
                    : <Text style={styles.label}>{label}</Text>
            }
            <SpotifyIcon />
        </View>
    </TouchableOpacity>
)

export default SpotifyButton;