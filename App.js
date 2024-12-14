import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);  // Update data every 100 milliseconds

    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });

    return () => subscription.remove();
  }, []);

  return (
      <View style={styles.container}>
        <Text style={styles.text}>X: {data.x.toFixed(2)}</Text>
        <Text style={styles.text}>Y: {data.y.toFixed(2)}</Text>
        <Text style={styles.text}>Z: {data.z.toFixed(2)}</Text>
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
