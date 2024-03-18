import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import orders from '../../../../../assets/data/orders';
import OrderListItem from '../../../../components/OrderListItem';
import { Stack } from 'expo-router';
import { useAdminOrderList } from '@/src/api/orders';
import { View } from '@/src/components/Themed';

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({ archived: true })
  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch</Text>
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Archived' }} />
      {
        orders?.length > 0 ?
          <FlatList
            data={orders}
            contentContainerStyle={{ gap: 10, padding: 10 }}
            renderItem={({ item }) => <OrderListItem order={item} />}
          /> :
          <View style={styles.container}>
            <Text>No Archived order's to show</Text>
          </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  },
});