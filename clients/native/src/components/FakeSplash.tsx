import React from 'react';
import { View, ImageBackground } from 'react-native';

type FakeSplahProps = {
    loadCallback: () => void;
    imageUrl: string;
}

export const FakeSplah: React.SFC<FakeSplahProps> = ({ loadCallback, imageUrl }) => (
    <View style={{ flex: 1 }}>
        <ImageBackground
            source={require(imageUrl)}
            style={{ width: '100%', height: '100%' }}
            onLoad={loadCallback || null}
        />
    </View>
)

export default FakeSplah;