import React from 'react';
import { View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
}

export default App;
