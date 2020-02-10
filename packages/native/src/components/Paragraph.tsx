import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Fonts } from './Fonts';
import { Colors } from './Colors';

type StyleProps = {
    center?: boolean;
}

const getStyles = (style: StyleProps) => StyleSheet.create({
    paragraph: {
        fontFamily: Fonts.main,
        color: Colors.info,
        fontSize: 16,
        paddingBottom: 40,
        lineHeight: 24,
        ...(style.center && { textAlign: "center" })
    }
})

type ParagraphProps = StyleProps & TextProps & {
    text: string;
}

export const Paragraph: React.SFC<ParagraphProps> = props => {
    const styles = getStyles(props);

    return (
        <Text style={styles.paragraph} {...props}>
            {props.text}
        </Text>
    )
}

export default Paragraph;