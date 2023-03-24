import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormikContext } from 'formik';
import { loginGoogle, loginFacebook } from '@tisf/rn-providers';
import { BelowText, ContainedButton, CustomStatusBar, OutlinedButton,
  PhoneNumberInput, Title, UrduSubtitle, OrLogin
} from '@tisf/rn-ui';
import type { IMobileScreen } from './index';

const MobileChild: React.FC<IMobileScreen> = ({ countries, social }) => {
  const { submitForm, isSubmitting } = useFormikContext();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'never'}>
      <SafeAreaView edges={['top', 'bottom']}>
        <Title>Enter your Mobile Number</Title>
        <UrduSubtitle>اپنا موبائل نمبر درج کریں</UrduSubtitle>
        <View style={styles.getStartedContainer}>
          <View style={{ marginBottom: 30 }}>
            <PhoneNumberInput countries={countries} />
          </View>

          <View style={{ marginBottom: 30, alignSelf: 'stretch' }}>
            <ContainedButton
              onPress={async () => {
                await submitForm();
              }}
              iconType='light'
              loading={isSubmitting}
              icon='sign-in'>
              Continue
            </ContainedButton>
          </View>

          {social && <>
            <OrLogin />

            <View style={{ marginBottom: 30, flexDirection: 'row', alignSelf: 'stretch' }}>
              <View style={{ marginRight: 8, flex: 1 }}>
                <OutlinedButton
                  onPress={async () => {
                    try {
                      const d = await loginGoogle();
                      console.log(d);
                    } catch (e) {
                      console.log(e);
                    }
                    // navigation.navigate('RegisterScreen');
                  }}
                  icon='google'
                  textColor='#de5246'>
                  Google
                </OutlinedButton>
              </View>
              <View style={{ marginLeft: 8, flex: 1 }}>
                <OutlinedButton
                  onPress={async () => {
                    try {
                      const d = await loginFacebook();
                      console.log(d);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  textColor='#4267B2'
                  icon='facebook'>
                  Facebook
                </OutlinedButton>
              </View>
            </View>
          </>}
          <BelowText>
            By continuing, you agree to the Terms & Conditions and Privacy Policy.
          </BelowText>
        </View>
        <CustomStatusBar
          backgroundColor='transparent'
          barStyle='dark-content'
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default MobileChild;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingBottom: 60,
  },
  title: {
    marginBottom: 15,
    // fontSize: 20,
    // lineHeight: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'urdu',
    textAlign: 'center',
    marginBottom: 30,
  },
  getStartedContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  getStartedText: {
    textAlign: 'center',
  },
  button: {
    height: 50,
  },
  buttonContent: {
    height: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});
