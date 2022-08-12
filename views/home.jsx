import { Text, StyleSheet, SafeAreaView, useCallback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from '../hooks/useUser';
import { Button } from 'react-native-paper';
import axios from 'axios';
import SectionCarousel from '../components/SectionCarousel';

export default function HomeScreen({ route, navigation }) {
  const { user, setUser } = useUser();
  const [categories, setCategories] = useState([]);
  const controller = new AbortController();

  useEffect(() => {
    if (route.params?.resetNavigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }

    const fetchCategories = async () => {
      try {
        const res = await axios.get(`/users/${user.id}/categories`, {
          headers: {
            Authorization: `Bearer ${user.token.value}`,
          },
          signal: controller.signal,
        });

        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, []);

  const logout = () => {
    setUser(null);
    navigation.navigate('Login');
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <StatusBar style='dark'></StatusBar>
      <SafeAreaView style={styles.container}>
        <Text>
          Welcome, {user.firstName} {user.lastName}
        </Text>
        <Button mode='contained' dark={true} onPress={logout}>
          Logout
        </Button>
        <SectionCarousel
          containerCustomStyle={{ marginTop: 50, flexGrow: 1 }}
          data={categories}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
