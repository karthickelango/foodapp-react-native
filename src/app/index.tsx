import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../components/button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '../provider/AuthProvider';
import { supabase } from '../lib/supabase';
import Colors from '../constants/Colors';

const index = () => {
  const { session, loading, profile } = useAuth()
  if (loading) {
    return <ActivityIndicator />
  }
  if (!session) {
    return <Redirect href={'/sign_in'} />
  }

  return (
          <>
            {
              session.user.user_metadata.user_role == 'ADMIN' ? 
                <Redirect href={'/(admin)'} />
                :
                <Redirect href={'/(user)'} />
            }
          </>
  );
};

const styles = StyleSheet.create({
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
export default index;