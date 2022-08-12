import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { API_URL } from '@env';
axios.defaults.baseURL = API_URL;
import { UserContextWrapper } from './hooks/useUser';

import LoginScreen from './views/login';
import RegisterScreen from './views/register';
import HomeScreen from './views/home';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <React.StrictMode>
      <UserContextWrapper>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Register' component={RegisterScreen} />
              <Stack.Screen name='Home' component={HomeScreen} />
            </Stack.Navigator>
          </PaperProvider>
        </NavigationContainer>
      </UserContextWrapper>
    </React.StrictMode>
  );
}
