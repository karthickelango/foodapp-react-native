import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import { useOrderDetails } from '@/src/api/orders';
import { useUpdateOrderSubscription } from '@/src/api/orders/subscription';
import FoodStatus from '@/src/components/FoodStatus';


const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: order, isLoading, error } = useOrderDetails(id)
  useUpdateOrderSubscription(id)

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch</Text>
  }

  return (
    <>
      <View style={styles.container}>
        <Stack.Screen options={{ title: `Order #${order.id}` }} />
        <OrderListItem order={order} />
        <FlatList
          data={order.order_items}
          renderItem={({ item }) => <OrderItemListItem item={item} />}
          contentContainerStyle={{ gap: 10 }}
        />
        <FoodStatus order={order} />
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
    backgroundColor: '#FFF'
  },
});

export default OrderDetailScreen;