import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Signup from './src/screen/signup/index'

export default function App() {
  return (
    <View style={styles.container}>
      <Signup />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDCF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    height: 300,
    width: 300,
    borderWidth: 1,
    backgroundColor: 'black',

  }
});
