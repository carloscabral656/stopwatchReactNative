import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      lastTime: null,
      btnInitPauseLabel: 'VAI',
    };

    this.timer = null;
    this.start = this.start.bind(this);
    this.clear = this.clear.bind(this);
  }

  start() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;

      this.setState({
        btnInitPauseLabel: 'RETOMAR',
      });
    } else {
      this.timer = setInterval(() => {
        this.setState({time: this.state.time + 0.1});
      }, 100);

      this.setState({
        btnInitPauseLabel: 'PARAR',
      });
    }
  }

  clear() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({
      lastTime: this.state.time.toFixed(1),
      time: 0,
      btnInitPauseLabel: 'VAI',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./src/cronometro.png')}
          style={styles.stopwatch}
        />
        <Text style={styles.timer}>{this.state.time.toFixed(1)}</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={this.start}>
            <Text style={styles.btnText}>{this.state.btnInitPauseLabel}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={this.clear}>
            <Text style={styles.btnText}>LIMPAR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lastTimeArea}>
          <Text style={styles.lastTimeText}>
            {this.state.lastTime > 0
              ? `Último tempo: ${this.state.lastTime} s`
              : ''}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    marginTop: -160,
    color: 'white',
    fontSize: 65,
    fontWeight: 'bold',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 70,
    height: 40,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  lastTimeArea: {
    marginTop: 40,
  },
  lastTimeText: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#fff',
  },
});

export default App;
