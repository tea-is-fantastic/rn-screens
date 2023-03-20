import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useFormikContext} from 'formik';
import {useOtpCtx} from './OtpParent';
import { useThemeStore, FirebaseModel, formatPhone,
  useFirebaseStore, OtpSixInput, OtpFourInput } from '@tisf/rn-providers';
import type { IOtpScreen } from './index';

const uri = 'data:image/jpeg;base64,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';

const OtpChild: React.FC<IOtpScreen> = ({digits= 6}) => {
  const {firebase} = useOtpCtx();
  const {isSubmitting} = useFormikContext<FirebaseModel>();
  const timer = useFirebaseStore(s => s.timer);
  const sendFunc = useFirebaseStore(s => s.send);
  const send = React.useMemo(sendFunc, [timer, sendFunc]);
  const phoneNumber = useFirebaseStore(s => s.phoneNumber);
  const primaryColorHex = useThemeStore().palette.primaryColor;

  const formatted = React.useMemo(() => {
    return formatPhone(phoneNumber);
  }, [phoneNumber]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'never'}>
      <View style={{marginBottom: 15}}>
        <Image
          style={styles.icon}
          source={{ uri }}
        />
      </View>

      <Text variant="titleLarge" style={styles.title}>
        We Just Texted You
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Please enter the {digits}-digit verification code we just sent to {formatted}.{' '}
        Please note that delivery can take a few minutes.
      </Text>
      <View style={styles.getStartedContainer}>
        <View style={{marginBottom: 15}}>
          {digits == 4 ? <OtpFourInput /> : <OtpSixInput />}
        </View>

        {timer >= 0 && (
          <View style={{marginBottom: 30}}>
            {send ? (
              <Text
                variant="titleLarge"
                onPress={() => firebase?.sendCode(true)}
                style={[
                  styles.getStartedText,
                  {color: primaryColorHex, fontWeight: 'bold'},
                ]}>
                Resend
              </Text>
            ) : (
              <Text variant="bodyMedium" style={styles.getStartedText}>
                Resend in {timer}s
              </Text>
            )}
          </View>
        )}

        {isSubmitting && (
          <View>
            <ActivityIndicator animating={true} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default OtpChild;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
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
    // fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  getStartedContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  getStartedText: {
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
