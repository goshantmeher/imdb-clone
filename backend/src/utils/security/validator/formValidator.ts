import mongoose from 'mongoose';
import { ISchemaTypeOptions } from '../../../models/types';
import ERROR_CONSTANTS from '../../constants/error-constants';
import { FORM_FIELD_TYPES } from '../../constants/form-field-types';
import { getMessage } from '../../constants/message-constants';

interface IValidateFormResult {
   message: string;
   code: number;
   Description: string;
   errors?: Record<string, string>[];
}
export const validateForm = (form: Record<string, any>, schema: Record<string, ISchemaTypeOptions>, isNew = false): IValidateFormResult => {
   const formKeys = Object.keys(form);
   const newForm: Record<string, any> = {};
   for (const key in schema) {
      if (formKeys.includes(key)) {
         newForm[key] = form[key];
      }
   }

   if (Object.keys(newForm).length === 0) {
      return {
         ...ERROR_CONSTANTS.VALIDATION_ERROR,
         message: getMessage('NO_FORM_DATA_PROVIDED'),
      };
   }
   const errors: Record<string, string>[] = [];
   for (const key in schema) {
      if (isNew && schema[key].required && !newForm[key]) {
         errors.push({
            field: key,
            message: getMessage('FIELD_REQUIRED', [key]),
         });
         continue;
      }
      if (!newForm[key]) {
         continue;
      }
      const fieldValidationResult = validateFormData(newForm[key], key, schema);
      if (fieldValidationResult) {
         errors.push(fieldValidationResult);
      }
   }
   if (errors.length > 0) {
      return {
         ...ERROR_CONSTANTS.VALIDATION_ERROR,
         message: getMessage('VALIDATION_FAILED'),
         errors,
      };
   } else {
      return {
         ...ERROR_CONSTANTS.OK,
         message: getMessage('VALIDATION_SUCCESS'),
      };
   }
};

const validateFormData = (fieldValue: unknown, fieldKey: string, schema: Record<string, ISchemaTypeOptions>) => {
   const fieldSchema = schema[fieldKey];
   switch (fieldSchema.field_type) {
      case FORM_FIELD_TYPES.NUMBER:
         if (typeof fieldValue !== 'number' || isNaN(fieldValue)) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_NUMBER', [fieldKey]),
            };
         }
         break;
      case FORM_FIELD_TYPES.TEXTAREA:
         if (typeof fieldValue !== 'string' || fieldValue.length < 1) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_STRING', [fieldKey]),
            };
         }
         break;
      case FORM_FIELD_TYPES.STRING:
         const stringRegex = /^[a-zA-Z0-9_ ]+$/;
         if (typeof fieldValue !== 'string' || !stringRegex.test(fieldValue)) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_STRING', [fieldKey]),
            };
         }
         if (fieldSchema.minLength && fieldValue.length < fieldSchema.minLength) {
            return {
               field: fieldKey,
               message: getMessage('MIN_LENGTH', [fieldKey, `${fieldSchema.minLength}`]),
            };
         }
         if (fieldSchema.maxLength && fieldValue.length > fieldSchema.maxLength) {
            return {
               field: fieldKey,
               message: getMessage('MAX_LENGTH', [fieldKey, `${fieldSchema.maxLength}`]),
            };
         }

         break;
      case FORM_FIELD_TYPES.EMAIL:
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (typeof fieldValue !== 'string' || !emailRegex.test(fieldValue)) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_EMAIL', [fieldKey]),
            };
         }
         break;
      case FORM_FIELD_TYPES.PASSWORD:
         const passwordRegex = /^[A-Za-z\d]{8,}$/;
         if (typeof fieldValue !== 'string' || !passwordRegex.test(fieldValue)) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_PASSWORD', ['8']),
            };
         }
         break;
      case FORM_FIELD_TYPES.DATE:
         if (typeof fieldValue !== 'string' || isNaN(Date.parse(fieldValue))) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_DATE', [fieldKey]),
            };
         }
         break;
      case FORM_FIELD_TYPES.ID:
         if (typeof fieldValue !== 'string' || !mongoose.Types.ObjectId.isValid(fieldValue)) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_OBJECT_ID', [fieldKey]),
            };
         }
         break;
      case FORM_FIELD_TYPES.STRING_LIST:
         if (!Array.isArray(fieldValue)) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_STRING_LIST', [fieldKey]),
            };
         }
         if (schema[fieldKey].stringList) {
            const invalidValues = fieldValue.filter(value => !schema[fieldKey].stringList?.includes(value));
            if (invalidValues.length > 0) {
               return {
                  field: fieldKey,
                  message: getMessage('INVALID_LIST_VALUE', [fieldKey, schema[fieldKey].stringList.join(', ')]),
               };
            }
         }

         break;
      case FORM_FIELD_TYPES.URL:
         const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
         if (typeof fieldValue !== 'string' || !urlRegex.test(fieldValue)) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_URL', [fieldKey]),
            };
         }
         break;
      case FORM_FIELD_TYPES.URL_LIST:
         if (!Array.isArray(fieldValue)) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_URL_LIST', [fieldKey]),
            };
         }
         const invalidUrls = fieldValue.filter(url => !urlRegex.test(url));
         if (invalidUrls.length > 0) {
            return {
               field: fieldKey,
               message: getMessage('INVALID_URL_LIST', [fieldKey]),
            };
         }
         break;
      default:
         return {
            field: fieldKey,
            message: getMessage('INVALID_FIELD_TYPE', [fieldKey]),
         };
   }
   return undefined;
};
