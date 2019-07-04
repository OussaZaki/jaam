import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

import { getSelectedPlaylist } from "../core/playlists/selectors";
import { quizState } from "../core/quiz/selectors";
import { quizGenerator } from "../core/quiz/quizManager";

import { GameTimer } from "../components/gameTimer";

class Quiz extends React.Component {
  state = {
    score: 0,
    streak: 0,
    currentQuestion: null,
    qz: null,
    isLoading: true
  }

  componentDidUpdate() {
    if (this.state.isLoading && this.props.quiz) {
      this.setState({ isLoading: false });
      this._initQuiz();
    }
  }

  _initQuiz = () => {
    const qz = quizGenerator(this.props.quiz);
    const currentQuestion = qz.next().value;

    this.setState({
      qz,
      currentQuestion
    });
  }

  _onAnswer = (answer) => {
    if (answer === this.state.currentQuestion.answer) {
      this.setState({
        score: this.state.score + 1,
        streak: this.state.streak + 1
      });
    } else {
      this.setState({
        streak: 0
      });
    }

    let levelUp = false;
    // if (this.state.streak > 2)
    //   levelUp = true;

    const question = this.state.qz.next(levelUp).value;
    if (!question) {
      // TODO: recap the quiz and prepare score data.
      this._gameOver();
      return;
    }

    this.setState({ currentQuestion: question });
  }

  _gameOver = () => {
    this.props.navigation.navigate("Score");
  }

  _onBack = () => {
    this.props.navigation.navigate("Playlists");
  }

  _renderOptions = (options, answerCallback) => {
    return options.map((option, index) => {
      return (
        <View key={`answer_${index}`}>
          <TouchableOpacity onPress={() => answerCallback(option)}>
            <Text style={styles.option}>{option}</Text>
          </TouchableOpacity>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.visual}>
          <View style={styles.header}>
            <Button
              onPress={this._onBack}
              title="Back"
              color="#000"
              accessibilityLabel="Go Back"
            />
            <Text>Score: {this.state.score}</Text>
          </View>
          <Text>Here goes the music visualizations!!</Text>
          <Text>Playlist Name: {this.props.playlist.name}</Text>
        </View>
        <View style={styles.timer}>
          {this.state.isLoading
            ? <Text>Preparing your quiz...</Text>
            : <GameTimer time={2} onFinish={this._gameOver} />
          }
        </View>

        <View style={styles.question}>
          <Text>{!this.state.isLoading && this.state.currentQuestion.question}</Text>
          <Text>{!this.state.isLoading && this.state.currentQuestion.answer}</Text>
        </View>

        <View style={styles.answer}>
          {!this.state.isLoading && this._renderOptions(this.state.currentQuestion.options, this._onAnswer)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  visual: {
    backgroundColor: '#FFBE00', //#FFD800, #FFC30B, #FFBE00
    justifyContent: 'center',
    alignItems: 'center',
    height: "30%",
  },
  timer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "5%"
  },
  question: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "20%"
  },
  answer: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    height: "45%"
  },
  option: {
    color: '#fff'
  }
});

const mapStateToProps = state => ({
  playlist: getSelectedPlaylist(state),
  quiz: quizState(state),
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
