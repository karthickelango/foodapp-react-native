import { View, Text, StyleSheet } from 'react-native'
import Button from '@/src/components/button'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/provider/AuthProvider'
import Colors from '@/src/constants/Colors'
import { Avatar, Card, IconButton } from 'react-native-paper';

const ProfileScreen = () => {
  const { session } = useAuth()
  const handelSignOut = async () => {
    try {
      const response = await supabase.auth.signOut()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <Card.Title
        title={session?.user.user_metadata.full_name}
        subtitle={session?.user.user_metadata.user_role}
        left={(props) => <Avatar.Icon {...props} icon="camera" />}
      />
      <Button text='Sign out' onPress={() => handelSignOut()}></Button>
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
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
});

export default ProfileScreen