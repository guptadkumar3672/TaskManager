import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Images from '../assets/images';

type TaskItemProps = {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
};

const TaskItem = ({task, onToggle, onDelete}: TaskItemProps) => {
  const handleToggle = () => onToggle(task.id, !task.completed);
  const handleDelete = () => onDelete(task.id);

  return (
    <View style={styles.taskContainer}>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleToggle}>
          <Image
            source={task.completed ? Images.checked : Images.clock}
            style={task.completed ? styles.checkedIcon : styles.uncheckedIcon}
            tintColor="#5F12AA"
          />
        </TouchableOpacity>

        <Text style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
      </View>

      <TouchableOpacity onPress={handleDelete}>
        <Image
          source={Images.delete}
          style={styles.deleteIcon}
          tintColor="#5F12AA"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#5F12AA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 15,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  checkedIcon: {
    height: 23,
    width: 23,
  },
  uncheckedIcon: {
    height: 18,
    width: 18,
  },
  deleteIcon: {
    height: 28,
    width: 28,
  },
});

export default TaskItem;
