import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';

export default function HomeScreen({ route, navigation }) {
  const { user } = useUser();

  useEffect(() => {
    if (route.params?.resetNavigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [route]);

  return (
    <>
      <StatusBar style='light'></StatusBar>
      <View style={styles.container}>
        <Text>
          Welcome, {user.firstName} {user.lastName}
        </Text>
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
