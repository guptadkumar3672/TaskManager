import React from 'react';
import {Image} from 'react-native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Images from '../assets/images';

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({task, onToggle, onDelete}) => {
  return (
    <View style={styles.container}>
      <View style={styles.taskInfo}>
        <TouchableOpacity onPress={() => onToggle(task.id, !task.completed)}>
          {task.completed ? (
            <Image
              source={Images.checked}
              style={{height: 23, width: 23}}
              resizeMode="contain"
              tintColor={'#5F12AA'}
            />
          ) : (
            <Image
              source={Images.clock}
              style={{height: 18, width: 18}}
              resizeMode="contain"
              tintColor={'#5F12AA'}
            />
          )}
        </TouchableOpacity>
        <Text style={[styles.taskText, task.completed && styles.completedTask]}>
          {task.title}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(task.id)}>
        <Image
          source={Images.delete}
          style={{height: 28, width: 28}}
          resizeMode="contain"
          tintColor={'#5F12AA'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#5F12AA',
    marginBottom: 15,
     shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 15,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default TaskItem;
