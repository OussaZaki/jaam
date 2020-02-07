import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Fonts } from './Fonts';
import { Colors } from './Colors';

const styles = StyleSheet.create({
    paragraph: {
        fontFamily: Fonts.main,
        color: Colors.light,
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