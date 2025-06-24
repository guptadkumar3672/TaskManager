import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useTasks} from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import AddTask from '../components/AddTask';
import LoadingIndicator from '../components/LoadingIndicator';

const AllTasks: React.FC = () => {
  const {tasks, loading, handleAddTask, handleToggleTask, handleDeleteTask} =
    useTasks();

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <AddTask onAdd={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TaskItem
            task={item}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks found. Add a new task!</Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  listContent: {
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default AllTasks;
