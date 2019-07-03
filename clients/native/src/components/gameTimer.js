import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

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

  formatTime = () => {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return {
      seconds,
      minutes,
      hours
    }
  }

  componentWillMount = () => {
    this.adjustTimer(this.props.time);
  };

  componentDidMount = () => {
    this.startTimer();
  }

  componentWillUnmount = () => {
    this.stopTimer();
  }

  render() {
    const {
      seconds,
      minutes,
      hours
    } = this.formatTime();

    return (
      <View style={styles.timer}>
        <Text>{hours} : {minutes} : {seconds}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
