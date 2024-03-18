import { View, Text, StyleSheet } from 'react-native'
import Button from '@/src/components/button'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/provider/AuthProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link } from 'expo-router'
import Colors from '@/src/constants/Colors'

const ProfileScreen = () => {
  const { profile } = useAuth()

  const handelSignOut = async () => {
    const response = await supabase.auth.signOut()
  }

  return (
    <View>
      <Text>{profile?.full_name}</Text>
      <Button text='Sign out' onPress={() => handelSignOut()}></Button>
      <Link href="/" style={styles.textButton}>
        Back to home
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default ProfileScreen