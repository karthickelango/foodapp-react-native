import { View, Text } from 'react-native'
import Button from '@/src/components/button'
import { supabase } from '@/src/lib/supabase'

const ProfileScreen = () => {
  return (
    <View>
      <Text>profile</Text>
      <Button text='Sign out' onPress={async () => await supabase.auth.signOut()}></Button>
    </View>
  )
}

export default ProfileScreen