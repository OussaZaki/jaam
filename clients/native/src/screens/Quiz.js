import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getSelectedPlaylist } from "../core/playlists/selectors";
import { quizState } from "../core/quiz/selectors";
import { quizGenerator } from "../core/quiz/quizManager";
import { delay } from "../core/utils/delay";

import { GameTimer } from "../components/gameTimer";
import { AudioVisual } from "../components/audioVisual";

const MESSAGES_LENGTH = 8;
const WRONG_MESSAGES = [
  "Wrong :)",
  "You can do better.",
  "Is this even your playlist?",
  "Seriously? you suck!",
  "You're disappointing me",
  "Facepalm",
  "Shame.",
  "Sigh..."
];

const CORRECT_MESSAGES = [
  "Correct :)",
  "You are good.",
  "You know your shit?",
  "Seriously? you rock!",
  "I'm surprised!",
  "Applauds",
  "Damn.",
  "Such an MVP"
];

class Quiz extends React.Component {
  state = {
    score: 0,
    correctStreak: 0,
    maxStreak: 0,
    wrongStreak: 0,
    quizStatus: "",
    currentQuestion: null,
    qz: null,
    isLoading: true,
    startTime: null
  }

  async componentWillMount() {
    if (this.state.isLoading && this.props.quiz) {
      await delay(1000);
      this._initQuiz();
    }
  }

  componentDidUpdate() {
    if (this.state.isLoading && this.props.quiz) {
      this._initQuiz();
    }
  }

  _initQuiz = () => {
    const qz = quizGenerator(this.props.quiz);
    const currentQuestion = qz.next().value;

    this.setState({
      qz,
      currentQuestion,
      isLoading: false,
      startTime: Date.now()
    });
    currentQuestion.audio.sound.playAsync();
  }

  _onAnswer = (answer) => {
    this.state.currentQuestion.audio.sound.stopAsync();
    if (answer === this.state.currentQuestion.answer) {
      this.setState({
        score: this.state.score + 1,
        correctStreak: this.state.correctStreak + 1,
        maxStreak: Math.max(this.state.correctStreak + 1, this.state.maxStreak),
        wrongStreak: 0,
        quizStatus: CORRECT_MESSAGES[this.state.correctStreak % MESSAGES_LENGTH],
      });
    } else {
      this.setState({
        correctStreak: 0,
        quizStatus: WRONG_MESSAGES[this.state.wrongStreak % MESSAGES_LENGTH],
        wrongStreak: this.state.wrongStreak + 1
      });
    }

    let levelUp = false;
    // if (this.state.streak > 2)
    //   levelUp = true;

    const question = this.state.qz.next(levelUp).value;
    if (!question) {
      this._gameOver();
      return;
    }

    question.audio.sound.playAsync();
    this.setState({ currentQuestion: question });
  }

  _gameOver = (timeOut = false) => {
    this.state.currentQuestion.audio.sound.stopAsync();
    this.props.navigation.navigate("Score", {
      isTimeOut: timeOut,
      score: this.state.score,
      correctStreak: this.state.maxStreak,
      totalTime: Date.now() - this.state.startTime
    });
  }

  _onBack = () => {
    this.state.currentQuestion.audio.sound.stopAsync();
    this.props.navigation.navigate("Playlists");
  }

  _onPause = () => {
    this.setState({
      quizStatus: "Lol play! there ain't no pause here."
    });
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
    const quizTime = this.props.navigation.getParam('quizTime', 0);

    return (
      <View style={styles.container}>
        <View style={styles.visual}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="arrow-left" size={24} onPress={this._onBack} />
            <Text style={styles.playlistTitle} numberOfLines={1}>{this.props.playlist && this.props.playlist.name}</Text>
            <MaterialCommunityIcons name="pause" size={24} onPress={this._onPause} />
          </View>
          <Text style={styles.quizStatus}>{this.state.quizStatus}</Text>
          <AudioVisual animated={!this.state.isLoading} />
        </View>

        <View style={styles.questionContainer}>
          {!this.state.isLoading
            ? <Text style={styles.question}>{this.state.currentQuestion &&this.state.currentQuestion.question}</Text>
            : <Text style={styles.question}>Preparing your quiz...</Text>
          }
          <View style={styles.questionBar}></View>
        </View>
        <View style={styles.timer}>
          {(!this.state.isLoading && quizTime !== 0) && <GameTimer time={quizTime} onFinish={this._gameOver} />}
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
    marginHorizontal: "2%",
    marginTop: "8%",
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  playlistTitle: {
    fontSize: 20,
    fontWeight: "600",
    width: "70%",
  },
  quizStatus: {
    color: "#080808",
    marginTop: "5%",
    marginHorizontal: 24,
    fontSize: 18,
    fontWeight: "600"
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
