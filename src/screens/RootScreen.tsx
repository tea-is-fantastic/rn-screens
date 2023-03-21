import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import { ContainedButton, Subtitle, CoverWithContent, OutlinedButton, ImageSource } from '@tisf/rn-providers';
import { useNavigation } from '@react-navigation/native';

interface IRootScreen {
  image: ImageSource[];
  logo: ImageSource;
  line1: string;
  line2: string;
  onboard?: boolean;
}

export const createRootScreen = ({image, logo, line1, line2, onboard}: IRootScreen) => {
  return () => {
    const navigation = useNavigation<any>();
    return (
      <CoverWithContent
        image={image}
      >
        <View>
          <ImageBackground
            resizeMode='contain'
            style={styles.image}
            source={logo}
          />
          <Subtitle>{line1}{'\n'}{line2}</Subtitle>
        </View>
        <View>
          <View style={styles.buttonPad}>
            <ContainedButton onPress={() => navigation.navigate('MobileScreen')}>
              Let's Go
            </ContainedButton>
          </View>
          {onboard && <View style={styles.buttonPad}>
            <OutlinedButton onPress={() => navigation.navigate('OnboardScreen')}>
              Let Me See First
            </OutlinedButton>
          </View>}
        </View>
      </CoverWithContent>
    );
  };
};

const styles = StyleSheet.create({
  image: {
    height: 60,
    marginBottom: 30,
    // aspectRatio: 4,
    // color: '#ffbe2e',
  },
  buttonPad: {paddingVertical: 10},
});
