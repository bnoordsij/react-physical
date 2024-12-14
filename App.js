import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const screenWidth = Dimensions.get('window').width;
  // const dotPosition = (data.x + 1) * (screenWidth / 2);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);  // Update data every 100 milliseconds

    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });

    return () => subscription.remove();
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.text}>X: {Math.round(data.x.toFixed(2) * 90)}</Text>
        <Text style={styles.text}>Y: {Math.round(data.y.toFixed(2) * 90)}</Text>
        <Text style={styles.text}>Z: {Math.round(data.z.toFixed(2) * 90)}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
  },
});
