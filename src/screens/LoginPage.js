import {SafeAreaView, Button, TextInput, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const LoginPage = () => {
  const [nick, setNick] = useState();
  const [pw, setPw] = useState();
  const [user, setUser] = useState();
  const navigation = useNavigation();
  const handleLogin = async () => {
    console.log(nick.name);
    if (nick.name == user.username && pw.name == user.password) {
      await AsyncStorage.setItem('remember', JSON.stringify(true));
      navigation.navigate('Home');
    } else {
      alert('Yanlis, Tekrar Deneyin');
    }
  };
  const fetchUsers = async () => {
    const data = await fetch(
      'https://628ddf77368687f3e70af605.mockapi.io/users/1',
    );
    return setUser(await data.json());
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Kullanici Adi"
        autoCapitalize="none"
        type="text"
        onChangeText={value =>
          setNick({
            ...nick,
            name: value,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Sifre"
        secureTextEntry={true}
        autoCapitalize="none"
        onChangeText={value =>
          setPw({
            ...pw,
            name: value,
          })
        }
      />

      <Button onPress={() => handleLogin()} title="Giris Yap" />
      <Text>Kullanici Adi : rabbit</Text>
      <Text>Parola : rabbit2022</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 15,
    padding: 15,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default LoginPage;
