import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../App';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

    const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    // Here you could add validation / API call
    navigation.replace('Home'); // navigates & removes login from stack
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText1}>ROUTE</Text>
        <Text style={styles.logoText2}>DeliverEz</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        <Text style={styles.signInTitle}>Sign In</Text>
        <Text style={styles.subTitle}>
          Enter username and password to securely access the account.
        </Text>

        {/* Username Field */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />

        {/* Password Field */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}>
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Remember me + Forgot Password */}
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.rememberContainer}>
            <View
              style={[
                styles.checkbox,
                rememberMe && { backgroundColor: '#4b6ef6' },
              ]}
            />
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>Sign In</Text>
          <Icon name="send-outline" size={18} color="#fff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>Powered by nfcsolutions</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  logoContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  logoText1: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3A4AE1',
  },
  logoText2: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F9B000',
    marginLeft: 5,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  signInTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  subTitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 25,
    marginTop: 6,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#000',
    marginBottom: 18,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingRight: 10,
    marginBottom: 20,
  },
  eyeButton: {
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    marginRight: 8,
  },
  rememberText: {
    color: '#333',
    fontSize: 14,
  },
  forgotText: {
    color: '#4b6ef6',
    fontWeight: '500',
    fontSize: 14,
  },
  signInButton: {
    flexDirection: 'row',
    backgroundColor: '#4b6ef6',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 35,
    fontSize: 13,
    color: '#aaa',
  },
});
