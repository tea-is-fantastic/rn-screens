import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import { useNavigation } from '@react-navigation/native';
import { CustomStatusBar, LocalStorage, ImageSource } from '@tisf/rn-providers';

export interface IOnboardingSlides {
  title?: string;
  text?: string;
  image?: ImageSource;
}

interface IOnboardingFull extends IOnboardingSlides {
  backgroundColor: string,
  key: string;
}

const slides: IOnboardingFull[] = [
  {
    key: 'one',
    backgroundColor: '#678FB4',
  },
  {
    key: 'two',
    backgroundColor: '#ff9100',
  },
  {
    key: 'three',
    backgroundColor: '#65B0B4',
  },
  {
    key: 'four',
    backgroundColor: '#9B90BC',
  },
  {
    key: 'five',
    backgroundColor: '#22bcb5',
  },
  {
    key: 'six',
    backgroundColor: '#FF8A80',
  },
];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});

const _renderItem: AppIntroSlider['_renderItem'] = ({ item }) => {
  return (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <CustomStatusBar backgroundColor='transparent' />
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

export const createOnboardScreen = (props: IOnboardingSlides[]): React.FC => {
  const data = slides.map((s, i) => {
    const x = props[i];
    if (x) {
      s.title = x.title;
      s.image = x.image;
      s.text = x.text;
    }
    return s;
  });
  return () => {
    const navigation = useNavigation<any>();

    const _onDone = React.useCallback(() => {
      LocalStorage.set('onboarding', true);
      navigation.replace('HomeScreen');
    }, []);

    return (
      <AppIntroSlider renderItem={_renderItem} data={data} onDone={_onDone} />
    );
  };
};
