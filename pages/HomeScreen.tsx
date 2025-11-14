import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ Add this
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {

   const navigation = useNavigation<HomeScreenNavigationProp>();
  
    const handlePrint = () => {
      // Here you could add validation / API call
      navigation.navigate('Print'); // navigates & removes login from stack
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 10 }}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.userName}>Cameron Williamson</Text>
              <View style={styles.contactRow}>
                <Icon name="mail-outline" size={14} color="#fff" />
                <Text style={styles.contactText}>cwilliamson@gmail.com</Text>
              </View>
              <View style={styles.contactRow}>
                <Icon name="call-outline" size={14} color="#fff" />
                <Text style={styles.contactText}>1-800-985-5990</Text>
              </View>
            </View>
            <View style={styles.iconCircle}>
              <Icon name="arrow-forward-outline" size={20} color="#0a8455" />
            </View>
          </View>
        </View>

        {/* Manage Orders */}
        <View style={styles.section}>
          <Text style={styles.manageText}>Manage —</Text>
          <Text style={styles.orderText}>
            Your <Text style={styles.orderHighlight}>Orders</Text> Easily
          </Text>

          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/9068/9068649.png' }}
            style={styles.manageIcon}
          />
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.card}onPress={handlePrint} >
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Icon name="add-circle-outline" size={22} color="#0a8455" />
              <Text style={styles.cardText}>Create Order</Text>
            </View>
            <Icon name="chevron-forward-outline" size={18} color="#aaa" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Icon name="cube-outline" size={22} color="#0a8455" />
              <Text style={styles.cardText}>Order History</Text>
            </View>
            <Icon name="chevron-forward-outline" size={18} color="#aaa" />
          </View>
        </TouchableOpacity>

        {/* Bottom Illustration */}
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/12187/12187220.png' }}
          style={styles.footerImage}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // ✅ ensures no overlap
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  headerCard: {
    backgroundColor: '#0a8455',
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
  },
  welcomeText: {
    color: '#c3f5da',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  contactText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 6,
  },
  iconCircle: {
    backgroundColor: '#fff',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginTop: 30,
  },
  manageText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  orderText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  orderHighlight: {
    color: '#0a8455',
    fontWeight: '700',
  },
  manageIcon: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: 0,
    top: -10,
    opacity: 0.2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginTop: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  footerImage: {
    width: '100%',
    height: 120,
    marginTop: 40,
  },
});

export default HomeScreen;
