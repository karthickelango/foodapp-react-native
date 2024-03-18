import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/src/lib/supabase';
import { isLoading } from 'expo-font';
import { RadioButton } from 'react-native-paper';


const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [loading, setLoading] = useState(false)
  const [accountRole, setAccountRole] = useState('USER');
  // signup
  const handelSignUp = async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: email, password: password, options: {
        data: {
          full_name: username,
          user_role: accountRole
        }
      }
    })
    if (error) {
      Alert.alert(error.message)
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />
      <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.label}>Create account as:</Text>
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={role => setAccountRole(role)} value={accountRole}>
          <View style={styles.radioButton}>
            <RadioButton value="USER" />
            <Text style={{marginRight: 20}}>User</Text>
            <RadioButton value="ADMIN" />
            <Text>Admin</Text>
          </View>
        </RadioButton.Group>
      </View>
      <TextInput
        value={username}
        onChangeText={setUserName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        style={styles.input}
        secureTextEntry
      />

      <Button onPress={() => handelSignUp()} disabled={loading} text={loading ? "Signing up..." : "Sign up"} />
      <View style={styles.message}>
        <Text>Already have an account? <Link href="/(auth)/sign_in" style={styles.textButton}>Sign in</Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  message: {
    alignItems: 'center'
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 20
  }
});

export default SignUpScreen;