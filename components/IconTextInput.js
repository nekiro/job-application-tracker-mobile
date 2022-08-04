import { Alert, View, TextInput, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function IconTextInput(props) {
  return (
    <View {...props} style={{ ...props.style, ...styles.container }}>
      {props.icon && (
        <Icon name={props.icon} size={25} style={{ paddingLeft: 5 }} />
      )}
      <TextInput
        {...props}
        placeholderTextColor='#0000009b'
        style={styles.input}
      />
      {props.warningMessage && (
        <Icon
          name={'alert-box-outline'}
          color='red'
          size={25}
          style={{ paddingRight: 5 }}
          onPress={() => Alert.alert(props.warningMessage)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    flex: 1,
    marginLeft: 5,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
});
