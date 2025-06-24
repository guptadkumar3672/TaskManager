import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {TaskProvider} from './src/context/TaskContext';
import AllTasks from './src/screens/AllTasks';
import CompletedTasks from './src/screens/CompletedTasks';
import Images from './src/assets/images';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconSource;

              if (route.name == 'All Tasks') {
                iconSource = Images.grid;
              } else {
                iconSource = Images.list;
              }

              return (
                <Image
                  source={iconSource}
                  style={[styles.tabIcon, {tintColor: color}]}
                />
              );
            },
            tabBarActiveTintColor: '#5F12AA',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen name="All Tasks" component={AllTasks} />
          <Tab.Screen name="Completed Tasks" component={CompletedTasks} />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </TaskProvider>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default App;
