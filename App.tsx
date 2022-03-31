import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './componets/navigation/Navigation';
import { PermissionProvider } from './componets/context/PermissionContext';

const AppState = ({ children }: any) => {
  return (
    <PermissionProvider>
      {children}
    </PermissionProvider>)
};
const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
