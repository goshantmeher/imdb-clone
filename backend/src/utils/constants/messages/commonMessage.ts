const genericMessages = {
   SOMETHING_WENT_WRONG: 'Something went wrong!',
   DUPLICATE_GENERIC_MESSAGE: '{1} field with same data already exist',
   NOT_FOUND: 'No data found',
   NO_FORM_DATA_PROVIDED: 'No form data provided',
};

const forbiddenMessages = {
   NOT_AUTHORIZED_TO_DO_ACTION: 'You are not authorized to perform this action',
   VALIDATION_ERROR_EMPTY_REQUEST_BODY: 'Request body is empty',
   VALIDATION_ERROR_EMPTY_QUERY_PARAMS: 'Query params are empty',
};

const validationMessages = {
   VALIDATION_FAILED: 'Validation failed',
   VALIDATION_SUCCESS: 'Validation success',
   FIELD_REQUIRED: '{1} field is required',
   INVALID_STRING: '{1} is not a valid string',
   MIN_LENGTH: '{1} should be at least {2} characters long',
   MAX_LENGTH: '{1} should be at most {2} characters long',
   INVALID_EMAIL: '{1} is not a valid email',
   INVALID_PASSWORD: 'Password length should be at least {1} characters long',
   INVALID_NUMBER: '{1} is not a valid number',
   INVALID_DATE: '{1} is not a valid date',
   INVALID_OBJECT_ID: '{1} is not a valid id',
   INVALID_FIELD_TYPE: '{1} is not a valid field type',
};

const COMMON_MESSAGES = {
   ...genericMessages,
   ...validationMessages,
   ...forbiddenMessages,
};
export default COMMON_MESSAGES;
