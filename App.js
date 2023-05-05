import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const App = () => {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setTime(time => time + 10);
    }, 10);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const lap = () => {
    setLaps(laps => [...laps, time]);
  };

  const reset = () => {
    setTime(0);
    setLaps([]);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60000);
    const secs = Math.floor((time % 60000) / 1000);
    const msecs = Math.floor((time % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${msecs.toString().padStart(2, '0')}`;
  };

  return (
    <View>
      <Text>{formatTime(time)}</Text>
      <Button title={intervalRef.current ? 'Stop' : 'Start'} onPress={intervalRef.current ? stop : start} />
      <Button title="Lap" onPress={lap} disabled={!intervalRef.current} />
      <Button title="Reset" onPress={reset} />
      {laps.map((lapTime, index) => (
        <Text key={index}>{`Lap ${index + 1}: ${formatTime(lapTime)}`}</Text>
      ))}
    </View>
  );
};

export default App;
