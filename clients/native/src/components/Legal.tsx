import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const styles = StyleSheet.create({
    paragraph: {
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        color: "#F2F2F2",
        fontSize: 14,
        lineHeight: 20,
        paddingRight: 20,
        letterSpacing: 0.3,
    }
})

type LegalProps = TextProps & {
    text?: string;
}

export const Legal: React.SFC<LegalProps> = ({
    text, children
}) => (
        <Text style={styles.paragraph}>
            {text ? text
            : children}
        </Text>
    )

export default Legal;