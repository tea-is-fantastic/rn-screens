import React from 'react';
import {Text, View} from 'react-native';

export const createTestScreen = ({name}: {name: string}) => {
  return () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'transparent',
      }}
    >
      <Text>{name} Screen</Text>
    </View>
  );
};
