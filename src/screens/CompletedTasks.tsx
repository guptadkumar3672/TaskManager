import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useTasks} from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import LoadingIndicator from '../components/LoadingIndicator';

const CompletedTasks: React.FC = () => {
  const {tasks, loading} = useTasks();
  const completedTasks = tasks.filter(task => task.completed);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TaskItem task={item} onToggle={() => {}} onDelete={() => {}} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No completed tasks yet!</Text>
        }
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

export default CompletedTasks;
