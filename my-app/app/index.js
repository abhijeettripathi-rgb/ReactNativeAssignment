// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import axios from 'axios';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Define API endpoint and initial user index
const API_ENDPOINT = 'https://random-data-api.com/api/users/random_user?size=80';
let currentUserIndex = 0;

// Main App Component
const App = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  // Fetch user data from the API
  const fetchUserData = async (index) => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setUserData(response.data[index]);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch initial user data on component mount
  useEffect(() => {
    fetchUserData(currentUserIndex);
  }, []);

  // Function to navigate to the next user
  const goToNextUser = () => {
    currentUserIndex = Math.min(currentUserIndex + 1, 79);
    fetchUserData(currentUserIndex);
  };

  // Function to navigate to the previous user
  const goToPreviousUser = () => {
    currentUserIndex = Math.max(currentUserIndex - 1, 0);
    fetchUserData(currentUserIndex);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userData ? (
        <UserDetails userData={userData} />
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Previous" onPress={goToPreviousUser} />
        <Button title="Next" onPress={goToNextUser} />
      </View>
    </View>
  );
};

// UserDetails Component
const UserDetails = ({ userData }) => {
  return (
    <View>
      <Image source={{ uri: userData.avatar }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      <Text>ID: {userData.id}</Text>
      <Text>UID: {userData.uid}</Text>
      <Text>Password: {userData.password}</Text>
      <Text>First Name: {userData.first_name}</Text>
      <Text>Last Name: {userData.last_name}</Text>
      <Text>Username: {userData.username}</Text>
      <Text>Email: {userData.email}</Text>
    </View>
  );
};

// Create a stack navigator
const AppNavigator = createStackNavigator(
  {
    Home: App,
  },
  {
    initialRouteName: 'Home',
  }
);

// Create the app container
export default createAppContainer(AppNavigator);
