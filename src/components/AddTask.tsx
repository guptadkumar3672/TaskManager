import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

type AddTaskProps = {
  onAdd: (title: string) => void;
};

const AddTask = ({onAdd}: AddTaskProps) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle) {
      onAdd(trimmedTitle);
      setTaskTitle('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Add a new task..."
        value={taskTitle}
        onChangeText={setTaskTitle}
        onSubmitEditing={handleAddTask}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTask}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#5F12AA',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddTask;
