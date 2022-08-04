import { StyleSheet, Text, ImageBackground, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import IconTextInput from '../components/IconTextInput';
import loginBg from '../assets/images/login-bg.jpg';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../hooks/useUser';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/sign-in', values);
      setUser({
        token: { value: res.data.token, expiresAt: res.data.expiresAt },
        ...res.data.user,
      });
      navigation.navigate('Home', { resetNavigation: true });
    } catch (err) {
      Alert.alert("Email and/or password doesn't match.");
    }

    setLoading(false);
  };

  return (
    <>
      <StatusBar style='light'></StatusBar>
      <ImageBackground source={loginBg} blurRadius={7}>
        <LinearGradient
          colors={['#15D1F11a', '#785AEC1a']}
          style={styles.gradient}
        >
          <Text style={styles.header}>Sign in</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount={true}
          >
            {({ handleChange, handleSubmit, values, errors, isValid }) => (
              <>
                <IconTextInput
                  icon='account'
                  placeholder='Email address'
                  style={{ width: '70%' }}
                  keyboardType='email-address'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  warningMessage={errors.email}
                />
                <IconTextInput
                  icon='lock'
                  placeholder='Password'
                  style={{ width: '70%' }}
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  warningMessage={errors.password}
                />
                <Button
                  mode='contained'
                  dark={true}
                  style={styles.button}
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={!isValid}
                >
                  Sign in
                </Button>
              </>
            )}
          </Formik>

          <Text style={styles.bottomText}>Don't have an account?</Text>
          <Text
            style={{ color: 'cyan', fontSize: 16 }}
            onPress={() => navigation.navigate('Register')}
          >
            Sign up now!
          </Text>
        </LinearGradient>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 30,
  },
  bottomText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 30,
    fontSize: 14,
  },
  input: {
    color: 'white',
    borderRadius: 5,
    width: '70%',
    marginTop: 15,
    height: 30,
  },
  button: {
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
