import React, { useState, useEffect } from 'react';
import { View ,Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
const image = {
uri:"https://img.freepik.com/free-vector/page-found-with-people-connecting-plug-concept-illustration_114360-1888.jpg?t=st=1719414552~exp=1719418152~hmac=62ae86d621d34704344cdbd5d652357d87f8762030e4f9695ffff1ee6dba2cd0&w=740"

}
const NoConnexion = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isConnected) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>BTracker</Text>
          <Image source={image}/>
          <ActivityIndicator color="red" size={30} />
          <Text style={styles.text}>BTracker</Text>
          <Text style={styles.text}>BTracker</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"100vh",
    backgroundColor: '#072d4c',
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 48,
    color: '#072d4c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default NoConnexion;
