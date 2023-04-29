import React, { ReactNode } from 'react';
import type { FormikConfig } from 'formik';
import { Formik } from 'formik';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Schema } from 'yup';
import * as yup from 'yup';
import { ScrollView, View } from 'react-native';
import { CustomStatusBar, GMapAddress } from '@tisf/rn-ui';
import { AddressForm } from './AddressForm';

export interface IAddressParent {
  formik?: Partial<FormikConfig<any>>;
}

const schema: Schema = yup.object().shape({
  addressLine1: yup.string().required().label('Address Line 1'),
  addressLine2: yup.string().label('Address Line 2'),
  area: yup.string().required().label('Area'),
  state: yup.string().required().label('Province'),
  phoneNumber: yup
    .string()
    .matches(/03\d{9}/g, 'Invalid Phone. Format 03339078601')
    .optional()
    .label('Phone Number'),
});

export const createSimpleAddressScreen = (
  { formik }: IAddressParent,
  children?: ReactNode
): React.FC<NativeStackScreenProps<any>> => {
  const { initialValues, validationSchema, ...formikProps } = formik || {};
  return ({ route, navigation }) => {
    const { params } = route;

    const finalSchema = validationSchema && schema.concat(validationSchema);

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          formikHelpers.setSubmitting(true);
          params?.onSelect(values);
          navigation.goBack();
        }}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={finalSchema}
        {...formikProps}
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <CustomStatusBar backgroundColor="transparent" />
          <View style={{ flex: 4 }}>
            <GMapAddress address={params?.address} />
          </View>
          <View style={{ flex: 5 }}>
            <AddressForm>{children}</AddressForm>
          </View>
        </ScrollView>
      </Formik>
    );
  };
};
