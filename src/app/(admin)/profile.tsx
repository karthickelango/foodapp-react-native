import { View, Text, StyleSheet, NativeModules } from 'react-native'
import Button from '@/src/components/button'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/provider/AuthProvider'
import Colors from '@/src/constants/Colors'
import { Avatar, Card, IconButton } from 'react-native-paper';


const ProfileScreen = () => {
  const { session } = useAuth()

  const handelSignOut = async () => {
    const response = await supabase.auth.signOut()
    NativeModules.DevSettings.reload();
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
    // <View>
    //   <Text>Name: {session?.user.user_metadata.full_name}</Text>
    //   <Text>Role: {session?.user.user_metadata.user_role}</Text>
    //   <Button text='Sign out' onPress={() => handelSignOut()}></Button>
    // </View>
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