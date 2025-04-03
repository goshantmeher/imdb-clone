const ERROR_CONSTANTS = {
   OK: {
      code: 200,
      message: 'OK',
      Description: 'Response to a successful REST API action. The HTTP method can be GET, POST, PUT, PATCH or DELETE.',
   },
   CREATED: {
      code: 201,
      message: 'Created',
      Description:
         'The request has been fulfilled and resource created. A URI for the created resource is returned in the Location header.',
   },
   ACCEPTED: {
      code: 202,
      message: 'Accepted',
      Description: 'The request has been accepted for processing, but the processing has not been completed.',
   },
   NO_CONTENT: {
      code: 204,
      message: 'No Content',
      Description: 'The server successfully processed the request, but is not returning any content.',
   },
   MOVED_PERMANENTLY: {
      code: 301,
      message: 'Moved Permanently',
      Description: 'The request has been moved to a new URI',
   },
   BAD_REQUEST: {
      code: 400,
      message: 'Bad Request',
      Description: 'The request could not be understood by the server due to malformed syntax.',
   },
   UNAUTHORIZED: {
      code: 401,
      message: 'Unauthorized',
      Description: 'The client is not authorized to make this request.',
   },
   PAYMENT_REQUIRED: {
      code: 402,
      message: 'Payment Required',
      Description: 'The server requires payment of the client.',
   },
   FORBIDDEN: {
      code: 403,
      message: 'Forbidden',
      Description: 'The server is refusing to respond to the request.',
   },
   DATA_EXIST: {
      code: 403,
      message: 'Data Exist',
      Description: 'The server is refusing to respond to the request.',
   },
   NOT_FOUND: {
      code: 404,
      message: 'Not Found',
      Description: 'The requested resource could not be found but may be available again in the future',
   },
   METHOD_NOT_ALLOWED: {
      code: 405,
      message: 'Method Not Allowed',
      Description: 'The error for an unexpected HTTP method. For exampl the REST API is expecting HTTP GET HTTP POST HTTP PUT is used.',
   },
   NOT_ACCEPTABLE: {
      code: 406,
      message: 'Not Acceptable',
      Description: 'The requested resource is only capable of generating content not acceptable according to the Accept',
   },
   PAYLOAD_TOO_LARGE: {
      code: 413,
      message: 'Payload Too Large',
      Description: 'The request entity is larger than the server is willing or able to process',
   },
   UNSUPPORTED_MEDIA_TYPE: {
      code: 415,
      message: 'Unsupported Media Type',
      Description: 'The format of the requested data is not supported by the server.',
   },
   VALIDATION_ERROR: {
      code: 422,
      message: 'Validation Error',
      Description: 'The request is not valid and cannot be processed.',
   },
   TOO_MANY_REQUESTS: {
      code: 429,
      message: 'Too Many Requests',
      Description: 'The user has sent too many requests in a given amount of time.',
   },
   INTERNAL_SERVER_ERROR: {
      code: 500,
      message: 'Oops! Something went wrong. Please try again later.',
      Description: 'The server encountered an unexpected condition which prevented it from fulfilling the request',
   },
   NOT_IMPLEMENTED: {
      code: 501,
      message: 'Not Implemented',
      Description: 'The server does not support the functionality required to fulfill the request',
   },
   BAD_GATEWAY: {
      code: 502,
      message: 'Bad Gateway',
      Description: 'The server is acting as a gateway or proxy and received an invalid response',
   },
   SERVICE_UNAVAILABLE: {
      code: 503,
      message: 'Service Unavailable',
      Description: 'The server is currently unavailable',
   },
   SERVICE_TOO_BUSY: {
      code: 503,
      message: 'Server Too Busy',
      Description: 'The server is currently processing too many request',
   },
   USER_NOT_FOUND: {
      code: 404,
      message: 'User Not Found',
      Description: 'The request has been accepted for processing, but the processing has not been completed.',
   },
};

export default ERROR_CONSTANTS;
