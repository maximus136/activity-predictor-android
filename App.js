import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivityRecognition from './react-native-activity-recognition';

export default class App extends React.Component {
  unsubscribe = null;
  state = { mostProbableActivity: [] };

  componentDidMount() {
    this.unsubscribe = ActivityRecognition.subscribe(detectedActivities => {
      const mostProbableActivity = detectedActivities.sorted;
      this.setState({
        mostProbableActivity
      });
    });
    const detectionIntervalMillis = 1000;
    ActivityRecognition.start(detectionIntervalMillis);
  }
  componentWillUnmount() {
    // Stop activity detection and remove the listener
    ActivityRecognition.stop();
    this.unsubscribe();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.mostProbableActivity.length > 0 ? (
          this.state.mostProbableActivity.map((activity, i) => (
            <View style={styles.subContainer}>
              <Text style={styles.type}>Activity: {activity.type.replace(/_/g, ' ')}</Text>
              <Text style={i === 0 ? styles.highConfidence : styles.confidence}>Confidence: {activity.confidence}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.text}>Activity: Unknown</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  type: {
    color: '#fff'
  },
  highConfidence: {
    color: '#26ad28'
  },
  confidence: {
    color: '#c92412'
  },
  subContainer: {
    marginTop: 10,
    marginLeft: 10,
    textAlign: 'center',
    width: 200
  }
});
