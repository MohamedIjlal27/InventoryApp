import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Content, Body } from 'native-base';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth_key = await AsyncStorage.getItem('auth_key');
        console.log('authkey', auth_key);
        const data = await fetch('http://chouhanaryan.pythonanywhere.com/auth/users/me/', {
          method: "GET",
          headers: {
            "Authorization": `Token ${auth_key}`,
          },
        });
        console.log('okStatus', data.ok);
        if (data.ok) {
          setTimeout(() => navigation.dispatch(StackActions.replace('Drawer')), 1000);
        } else {
          setTimeout(() => navigation.dispatch(StackActions.replace('LoginScreen')), 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Content>
        <Body style={styles.container}>
          <Image
            style={{
              width: 374,
              height: 300,
              justifyContent: 'center',
              marginVertical: 40,
              resizeMode: 'cover',
            }}
            source={require('../Images/store-inventory-logo.jpg')}
          />
        </Body>
      </Content>
    </Container>
  );
}

const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    color: '#122E40',
    fontWeight: 'bold',
    marginTop: 65,
    lineHeight: 50,
    // marginBottom: 10,
    // marginBottom: 10,
  },
});
