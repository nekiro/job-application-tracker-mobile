import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { Button } from 'react-native-paper';

export default function HomeScreen({ route, navigation }) {
  const { user, setUser } = useUser();

  useEffect(() => {
    if (route.params?.resetNavigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }

    if (!user) {
      navigation.navigate('Login');
    }
  }, [route]);

  const logOut = () => {
    setUser(null);
    navigation.navigate('Login');
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <StatusBar style='light'></StatusBar>
      <View style={styles.container}>
        <Text>
          Welcome, {user.firstName} {user.lastName}
        </Text>
        <Button mode='contained' dark={true} onPress={logOut}>
          Logout
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
