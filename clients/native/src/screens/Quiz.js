import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { getSelectedPlaylist } from "../core/playlists/selectors";
import { quizState } from "../core/quiz/selectors";
import { quizGenerator } from "../core/quiz/quizManager";

import { GameTimer } from "../components/gameTimer";
import { AudioVisual } from "../components/audioVisual";

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
    console.log(this.state.currentQuestion.answer);
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
        <TouchableOpacity
          key={`answer_${index + 1}`}
          style={styles.option}
          onPress={() => answerCallback(option)}>
          <Text style={styles.optionText} numberOfLines={1}>{`${index + 1}. ${option}`}</Text>
        </TouchableOpacity>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.visual}>
          <View style={styles.header}>
            <Text style={styles.score} onPress={this._onBack}>{"<-"}</Text>
            <Text style={styles.score}>Score: {this.state.score}</Text>
          </View>
          <Text style={styles.playlistTitle}>{this.props.playlist.name}</Text>
          <AudioVisual animated={!this.state.isLoading} />
        </View>

        <View style={styles.questionContainer}>
          {!this.state.isLoading
            ? <View>
              <Text style={styles.question}>{this.state.currentQuestion.question}</Text>
              <View style={styles.questionBar}></View>
            </View>
            : <View>
              <Text style={styles.preparing}>Preparing your quiz...</Text>
            </View>
          }
        </View>
        <View style={styles.timer}>
          {!this.state.isLoading && <GameTimer time={2} onFinish={this._gameOver} />}
        </View>

        <View style={styles.optionsContainer}>
          {this.state.isLoading
            ? <ActivityIndicator size="large" color="#fff" />
            : this._renderOptions(this.state.currentQuestion.options, this._onAnswer)
          }
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
  visual: {
    backgroundColor: '#FFBE00', //#FFD800, #FFC30B, #FFBE00
    alignSelf: 'stretch',
    alignItems: 'center',
    height: "30%",
  },
  header: {
    marginHorizontal: 10,
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  score: {
    fontSize: 16,
    fontWeight: "500"
  },
  playlistTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "600",
  },
  visualization: {
    marginTop: 30
  },
  questionContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    height: "25%",
  },
  question: {
    fontSize: 38,
    fontWeight: "700",
    color: "#080808"
  },
  questionBar: {
    backgroundColor: "#080808",
    width: 40,
    height: 6,
    marginTop: 12,
  },
  preparing: {
    fontSize: 20,
    fontWeight: "500",
    color: "#080808",
    alignSelf: 'center'
  },
  optionsContainer: {
    backgroundColor: '#080808',
    justifyContent: 'center',
    alignItems: 'center',
    height: "45%"
  },
  option: {
    backgroundColor: "#000",
    alignItems: 'flex-start',
    marginVertical: 4,
    width: '80%',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e4e4e4'
  },
  optionText: {
    color: '#e4e4e4',
    fontSize: 18,
    fontWeight: "500"
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
