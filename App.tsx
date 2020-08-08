import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './src/routes/Route'

export default class App extends Component {

  render() {
    return (
      <Router />
    );
  }
}

const styles = StyleSheet.create({
 
});
