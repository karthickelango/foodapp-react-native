import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
import { Tables } from '../database.types';
import LottieView from 'lottie-react-native';
import Cooking from '../../assets/anime/cooking.json'
import Waiting from '../../assets/anime/wait.json'
import Delivering from '../../assets/anime/delivery.json'


type OrderListItemProps = {
  order: Tables<'orders'>;
};

const FoodStatus = ({ order }: OrderListItemProps) => {
  return (
    <>
      {
        order.status === 'New' &&
        <>
          <LottieView source={Waiting} autoPlay loop style={{ flexGrow: 1, position: 'relative', top: -150 }} />
          <Text style={styles.statusText}>Waiting for restaurant to confirm the order.</Text>
        </>
      }
      {
        order.status === 'Cooking' &&
        <>
          <LottieView source={Cooking} autoPlay loop style={{ flexGrow: 1, position: 'relative', top: -50 }} />
          <Text style={styles.statusText}>Food is being cooked.</Text>
        </>

      }
      {
        order.status === 'Delivering' &&
        <>
          <LottieView source={Delivering} autoPlay loop style={{ flexGrow: 1, position: 'relative', top: -100 }} />
          <Text style={styles.statusText}>Food is being delivered.</Text>
        </>
      }
      {
        order.status === 'Delivered' &&
        <>
          <LottieView source={Delivering} autoPlay loop style={{ flexGrow: 1, position: 'relative', top: -100 }} />
          <Text style={styles.statusText}>Have a great meal.</Text>
        </>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    position: 'relative',
    top: -100,
    padding: 20
  }
});

export default FoodStatus;