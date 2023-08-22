import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppNavigation from './navigation/AppNavigation';
//import AppNavigation from './navigation/AppNavigation';

export default function App() {
  return (
    <AppNavigation />
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',//along horizontalprimary axis
    justifyContent: "center", //along horizontalprimary axis
    //position:"relative"
  },
});
