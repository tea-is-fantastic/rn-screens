import React, { ComponentType } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5ProIcon from 'react-native-vector-icons/FontAwesome5Pro';
import { CustomStatusBar } from '@tisf/rn-ui';

const Tab = createBottomTabNavigator();

interface ITabItem {
  name: string;
  icon: string;
  Component: ComponentType;
}

interface ITabScreen {
  tabs: ITabItem[];
  header?: boolean;
}

export const createTabScreen = ({ tabs, header }: ITabScreen) => {
  return () => (
    <>
      <Tab.Navigator
        screenOptions={{ headerShown: !!header }}
        backBehavior="none"
      >
        {tabs.map(({ name, icon, Component }, i) => (
          <Tab.Screen
            name={`${name}Tab`}
            key={i}
            component={Component}
            options={{
              tabBarLabel: name,
              title: name,
              tabBarIcon: ({ size, color }) => (
                <FontAwesome5ProIcon
                  light
                  name={icon}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        ))}
      </Tab.Navigator>
      <CustomStatusBar
        barStyle="dark-content"
        backgroundColor={header ? 'white' : undefined}
      />
    </>
  );
};
