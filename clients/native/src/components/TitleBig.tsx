import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const styles = StyleSheet.create({
    titleBig: {
        fontFamily: "Roboto-Black",
        color: "white",
        fontSize: 58,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        flexShrink: 1
    }
})

type TitleBigProps = TextProps & {
    text: string;
}

export const TitleBig: React.SFC<TitleBigProps> = props => (
    <Text style={styles.titleBig} {...props}>
        {props.text}
    </Text>
)

export default TitleBig;