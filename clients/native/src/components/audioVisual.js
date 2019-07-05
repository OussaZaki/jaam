import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import Wave from 'react-native-waveview';

export class AudioVisual extends React.Component {
  componentDidUpdate() {
    if (this.props.animated) {
      this._waveRect.startAnim();
    }
  }
  render() {
    return (
      <View style={_styles.container} >
        <TouchableHighlight onPress={() => {
          // Stop Animation
          this._waveRect && this._waveRect.stopAnim();
        }}>
          <Wave
            ref={ref => this._waveRect = ref}
            style={_styles.wave}
            H={30}
            waveParams={[
              // d89b00, f0ad00
              // B36100, F08200
              { A: 40, T: 400, fill: '#B36100' },
              { A: 50, T: 450, fill: '#F08200' },
              { A: 40, T: 500, fill: '#fff' }
            ]}
            animated={false}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFBE00',
    height: '100%',
    paddingTop: 10,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end'
  },
  wave: {
    width: '100%',
    height: 100,
    overflow: 'hidden',
    backgroundColor: '#FFBE00',
  },
  waveBall: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
  }
});

