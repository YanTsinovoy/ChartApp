/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { observer } from 'mobx-react';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView, StyleSheet, View
} from 'react-native';
import { ChartContainer } from './src/components/ChartContainer';
import { ErrorView } from './src/components/ErrorView';
import { Header } from './src/components/Header';
import { SelectDayPanel } from './src/components/SelectDayPanel';
import chartStore from './src/store/index';


const App = observer(() => {
  const { isLoading, error } = chartStore;
  return (
    <SafeAreaView style={styles.main}>
      <Header />
      <View style={styles.chart}>
        {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <ChartContainer />}
      </View>
      <SelectDayPanel />
      {!!error && <ErrorView text={error}/>}
    </SafeAreaView>
  );
});

export default App;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
  },
  chart: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 400
  }
})
