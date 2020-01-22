import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import * as Progress from 'react-native-progress';
import { getTimeProgress } from "../core/utils/getTimeProgress";

export class GameTimer extends React.Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        this.stopTimer();
      }
    }, 10);
  };

  // Trigger game over from the gameTimer, using the onFinish prop.
  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
    this.props.onFinish();
  };

  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart
      });
    }
  };

  adjustTimer = (minutes = 1) => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      this.setState({ timerTime: timerTime + (60000 * minutes) });
    }
  };

  componentWillMount = () => {
    this.adjustTimer(this.props.time);
  };

  componentDidMount = () => {
    this.startTimer();
  }

  // Game over is triggered by the parent component.
  // So we need to clean up anyway.
  componentWillUnmount = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  }

  render() {
    return (
      <View style={styles.timer}>
        <Progress.Bar
          progress={getTimeProgress(this.state.timerTime, this.state.timerStart)}
          width={null}
          borderRadius={0}
          borderWidth={0}
          useNativeDriver={true}
          color={"#FFBE00"}
          unfilledColor={"#505050"}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timer: {
    justifyContent: 'center',
    alignSelf: 'stretch'
  }
});
