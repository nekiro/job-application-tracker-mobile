import { View, Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import loginBg from '../assets/images/login-bg.jpg';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import IconTextInput from '../components/IconTextInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  fullName: Yup.string(),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email Address is required'),
  password: Yup.string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

export default function RegisterScreen({ navigation }) {
  const onSubmit = async (values) => {
    try {
      const names = values.fullName.split(' ');
      await axios.post('/auth/sign-up', {
        firstName: names[0],
        lastName: names[1],
        email: values.email,
        password: values.password,
      });

      navigation.navigate('Login');
      Alert.alert('Signed up successfully, please login now.');
    } catch (err) {
      Alert.alert('Unable to sign up at this time.');
    }
  };

  return (
    <>
      <StatusBar style='light'></StatusBar>
      <ImageBackground source={loginBg} blurRadius={7}>
        <LinearGradient
          colors={['#15D1F11a', '#785AEC1a']}
          style={styles.gradient}
        >
          <Text style={styles.header}>Sign up</Text>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              password: '',
              repeatPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount={true}
          >
            {({ handleChange, handleSubmit, values, errors, isValid }) => (
              <>
                <IconTextInput
                  placeholder='Full name'
                  style={{ width: '70%' }}
                  onChangeText={handleChange('fullName')}
                  value={values.fullName}
                  warningMessage={errors.fullName}
                />
                <IconTextInput
                  placeholder='Email address'
                  style={{ width: '70%' }}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  keyboardType='email-address'
                  warningMessage={errors.email}
                />
                <IconTextInput
                  placeholder='Password'
                  secureTextEntry={true}
                  style={{ width: '70%' }}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  warningMessage={errors.password}
                />
                <IconTextInput
                  placeholder='Repeat password'
                  secureTextEntry={true}
                  style={{ width: '70%' }}
                  onChangeText={handleChange('repeatPassword')}
                  value={values.repeatPassword}
                  warningMessage={errors.repeatPassword}
                />

                <Button
                  mode='contained'
                  dark={true}
                  style={styles.button}
                  onPress={handleSubmit}
                  //loading={loading}
                  disabled={!isValid}
                >
                  Sign up
                </Button>
              </>
            )}
          </Formik>
          <Text style={styles.bottomText}>Have an account?</Text>
          <Text
            style={{ color: 'cyan', fontSize: 16 }}
            onPress={() => navigation.navigate('Login')}
          >
            Sign in now!
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
