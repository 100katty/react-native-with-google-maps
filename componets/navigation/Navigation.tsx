import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../pages/MapScreen';
import { PermissionsScreen } from '../pages/PermissionsScreen';
import { PermissionContext } from '../context/PermissionContext';
import { LoadingScreen } from '../pages/LoadingScreen';

const Stack = createStackNavigator();

export const Navigation = () => {
  const { permissions } = useContext(PermissionContext);
  if (permissions.locationStatus === 'denied') {
    return <LoadingScreen />
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      {
        (permissions.locationStatus === 'granted')
          ? <Stack.Screen name="MapScreen" component={MapScreen} />
          : < Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      }

    </Stack.Navigator>
  );
};
