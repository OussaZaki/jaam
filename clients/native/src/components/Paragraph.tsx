import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const styles = StyleSheet.create({
    paragraph: {
        fontFamily: "Roboto-Regular",
        color: "white",
        fontSize: 16,
    }
})

type ParagraphProps = TextProps & {
    text: string;
}

export const Paragraph: React.SFC<ParagraphProps> = props => (
    <Text style={styles.paragraph} {...props}>
        {props.text}
    </Text>
)

export default Paragraph;