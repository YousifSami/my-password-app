import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth } from '../config/firebase';

export default function Home() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState<{ title: string; username: string; password: string }[]>(
    []
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/login');
    } catch (error: any) {
      console.error('Logout error:', error.message);
    }
  };

  const handleAdd = () => {
    if (!title || !username || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setEntries([...entries, { title, username, password }]);
    setTitle('');
    setUsername('');
    setPassword('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 My Vault</Text>
      <Text style={styles.subtitle}>Store your credentials securely.</Text>

      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDetail}>👤 {item.username}</Text>
            <Text style={styles.cardDetail}>🔑 {item.password}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: '#94a3b8', marginTop: 20 }}>No passwords added yet.</Text>
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Add Password Modal */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Password Entry</Text>
            <TextInput
              placeholder="Title (e.g. Gmail)"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              placeholder="Username/Email"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalBtn} onPress={handleAdd}>
                <Text style={styles.modalBtnText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#38bdf8',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    color: '#f1f5f9',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  cardDetail: {
    color: '#94a3b8',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#38bdf8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#38bdf8',
  },
  logoutText: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    color: '#38bdf8',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#334155',
    color: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    flex: 1,
    backgroundColor: '#38bdf8',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalBtnText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
