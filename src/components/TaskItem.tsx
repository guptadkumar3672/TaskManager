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
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: task.completed ? '#4CAF50' : '#888',
              borderRadius: 12,
            }}
          />
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
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default TaskItem;
