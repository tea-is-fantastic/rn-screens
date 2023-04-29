import React from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { useFormikContext } from 'formik';
import {
  Localized,
  OutlineButton,
  OutlineInput,
  OutlineSelect,
  selectifyOptions,
} from '@tisf/rn-ui';
import { ReactFC, validFormikSubmit } from '@tisf/rn-providers';

const provinceOptions = selectifyOptions([
  'Sindh',
  'Punjab',
  'Balochistan',
  'Khyber Pakhtunkhwa',
  'Islamabad Capital Territory',
  'Azad Jammu and Kashmir',
  'Gilgit-Baltistan',
]);

export const submitStr = new Localized('Submit', 'جمع کریں');
const addressStr = new Localized('Address', 'پتہ');
const stateStr = new Localized('Province', 'صوبہ');
const phoneNumberStr = new Localized('Contact (Optional)', 'فون نمبر');
const areaStr = new Localized('Area', 'علاقہ');
const cityStr = new Localized('City', 'شہر');

export const AddressForm: ReactFC = ({ children }) => {
  const ctx = useFormikContext<any>();
  const { isSubmitting } = ctx;

  const addressLine = React.useRef<TextInput>(null);
  const area = React.useRef<TextInput>(null);
  const city = React.useRef<TextInput>(null);
  const note = React.useRef<TextInput>(null);

  const _submit = async () => {
    await validFormikSubmit(ctx);
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'white',
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        pointerEvents="box-only"
        contentContainerStyle={{
          width: '100%',
          paddingVertical: 16,
          paddingHorizontal: 10,
        }}
      >
        {children}
        <OutlineInput
          title={addressStr}
          name="addressLine"
          mode="light"
          ref={addressLine}
          icon="address-card"
          InputProps={{
            onSubmitEditing: () => area.current?.focus(),
            returnKeyType: 'next',
          }}
        />
        <OutlineInput
          title={areaStr}
          name="area"
          mode="light"
          ref={area}
          icon="archway"
          InputProps={{
            onSubmitEditing: () => city.current?.focus(),
            returnKeyType: 'next',
          }}
        />
        <OutlineInput
          title={cityStr}
          name="city"
          mode="light"
          ref={city}
          icon="city"
        />
        <OutlineSelect
          title={stateStr}
          items={provinceOptions}
          name="state"
          mode="light"
          icon="flag"
        />
        <View style={{ position: 'relative' }}>
          <OutlineInput
            title={phoneNumberStr}
            name="phoneNumber"
            mode="light"
            icon="mobile-android-alt"
            InputProps={{
              onSubmitEditing: () => note.current?.focus(),
              returnKeyType: 'next',
            }}
          />
        </View>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <OutlineButton
            mode="light"
            text={submitStr}
            submitting={isSubmitting}
            onClick={_submit}
          />
        </View>
      </ScrollView>
    </View>
  );
};
