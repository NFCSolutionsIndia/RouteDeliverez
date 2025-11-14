import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login after delay
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Text style={styles.logoText1}>ROUTE</Text>
      <Text style={styles.logoText2}>DeliverEz</Text>
      <Text style={styles.subtitle}>Powered by nfcsolutions</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText1: {
    fontSize: 38,
    fontWeight: '700',
    color: '#3A4AE1',
  },
  logoText2: {
    fontSize: 38,
    fontWeight: '700',
    color: '#F9B000',
    marginTop: -5,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    position: 'absolute',
    bottom: 60,
  },
});
