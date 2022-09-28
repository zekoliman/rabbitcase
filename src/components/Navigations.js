import React, {useState} from 'react';
import HomePage from '../screens/HomePage';
import Videos from '../screens/Videos';
import LoginPage from '../screens/LoginPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

const Navigations = () => {
  const [login, setLogin] = useState();
  
  const checkLogin = async () => {
    const isLogin = await AsyncStorage.getItem('remember');
    setLogin(isLogin);
  };

  useEffect(() => {
    checkLogin();
  });
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {login ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomePage}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Videos" component={Videos} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{headerShown: false}}
            />
              <Stack.Screen
              name="Home"
              component={HomePage}
              options={{headerShown: false}}
            />
                        <Stack.Screen name="Videos" component={Videos} />

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
