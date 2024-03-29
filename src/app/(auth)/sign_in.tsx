import { View, Text, TextInput, StyleSheet, Alert, ImageBackground, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../../components/button';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/src/lib/supabase';
import landingImg from '../../../assets/images/restaurant_bk.png'

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)


  // signup
  const handelSignIn = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword(
        { email, password }
      )
      if (error) {
        Alert.alert(error.message)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <SafeAreaView style={styles.container} >
        <ImageBackground source={landingImg} resizeMode="cover" style={styles.image}>
          <View style={styles.p20}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.header}>Sign in</Text>
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

            <Button style={styles.button} onPress={() => handelSignIn()} disabled={loading} text={loading ? "Signing in..." : "Sign in"} />
            <View style={styles.message}>
              <Text>Don't have an account? <Link href="/(auth)/sign_up" style={styles.textButton}>Sign up</Link>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  p20: {
    padding: 20
  },
  image: {
    flex: 1,
    justifyContent: 'center',
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
    fontWeight: 'bold',
    color: Colors.light.tint,
  },
  message: {
    alignItems: 'center'
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 20
  },
});
export default SignInScreen;