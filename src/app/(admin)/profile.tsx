import { View, Text } from 'react-native'
import Button from '@/src/components/button'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/provider/AuthProvider'

const ProfileScreen = () => {
  const {profile} = useAuth()

  const handelSignOut = async () => {
    const response = await supabase.auth.signOut()
  }

  return (
    <View>
      <Text>{profile?.username}</Text>
      <Text>{profile?.group}</Text>
      <Text>Profile</Text>
      <Button text='Sign out' onPress={() => handelSignOut()}></Button>
    </View>
  )
}

export default ProfileScreen