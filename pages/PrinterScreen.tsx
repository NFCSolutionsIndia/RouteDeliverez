import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StarPRNT } from 'react-native-star-prnt-fork';
import { BleManager } from 'react-native-ble-plx';
// import CardView from 'react-native-cardview';

const PrinterScreen = (): React.JSX.Element => {
  const [printers, setPrinters] = useState<any[]>([]);
  const [showList, setShowList] = useState(false);
  const navigation = useNavigation();
  const manager = new BleManager();

  const EmulationPrinter = 'EscPosMobile';

  const goBack = () => navigation.goBack();
  const goHome = () => navigation.navigate('Home' as never);

  const discovery = async () => {
    try {
      Alert.alert('Searching...', 'Looking for nearby printers');
      const devices = await StarPRNT.portDiscovery('Bluetooth');
      console.log('Printers found:', devices);
      setPrinters(devices);
      setShowList(true);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not discover printers');
    }
  };

  const connectAndPrint = async (item: any) => {
    try {
      console.log('Connecting to printer:', item.portName);
      const connected = await StarPRNT.connect(item.portName, EmulationPrinter, false);
      console.log('Connected:', connected);

      if (connected) {
        await printSample(item.portName);
      } else {
        Alert.alert('Connection failed', 'Unable to connect to printer');
      }
    } catch (error) {
      console.error('Printer connection error:', error);
      Alert.alert('Error', 'Failed to connect to printer');
    }
  };

  const printSample = async (portName: string) => {
    try {
      const commands = [
        { append: '\r\n----------------------------------------' },
        { append: '\r\n           ROUTE DELIVEREZ TEST BILL' },
        { append: '\r\n----------------------------------------' },
        { append: '\r\nDate: ' + new Date().toLocaleString() },
        { append: '\r\nInvoice #: INV-00123' },
        { append: '\r\nCustomer: Demo Store' },
        { append: '\r\n----------------------------------------' },
        { append: '\r\nItem              Qty   Price   Total' },
        { append: '\r\n----------------------------------------' },
        { append: '\r\nProduct A          2   10.00   20.00' },
        { append: '\r\nProduct B          1   15.00   15.00' },
        { append: '\r\n----------------------------------------' },
        { append: '\r\nSubtotal:                  35.00' },
        { append: '\r\nTax (5%):                   1.75' },
        { append: '\r\nTotal:                     36.75' },
        { append: '\r\n----------------------------------------' },
        { append: '\r\nThank you for shopping!' },
        { appendCutPaper: StarPRNT.CutPaperAction.FullCut },
      ];

      console.log('Sending commands to printer...');
      const result = await StarPRNT.print(EmulationPrinter, commands, `BT:${portName}`);
      console.log('Print success:', result);

      await StarPRNT.disconnect();
      Alert.alert('Success', 'Receipt printed successfully!');
    } catch (error) {
      console.error('Print error:', error);
      Alert.alert('Error', 'Printing failed');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          height: 60,
          backgroundColor: '#1976D2',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>Printer Screen</Text>
      </View>

      {!showList ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={discovery}
            style={{
              backgroundColor: '#1976D2',
              paddingHorizontal: 30,
              paddingVertical: 12,
              borderRadius: 6,
            }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Discover Printers</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={printers}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => connectAndPrint(item)}>
          
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
                  {item.modelName || 'Unknown Printer'}
                </Text>
                <Text style={{ color: '#666', marginTop: 4 }}>
                  Port: {item.portName}
                </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default PrinterScreen;
