import CELEBRITY_MESSAGES from './messages/celebrityMessages';
import COMMON_MESSAGES from './messages/commonMessage';
import MOVIE_MESSAGES from './messages/movieMessages';
import USER_MESSAGES from './messages/userMessages';

const MESSAGE_CONSTANTS = {
   ...COMMON_MESSAGES,
   ...USER_MESSAGES,
   ...CELEBRITY_MESSAGES,
   ...MOVIE_MESSAGES,
};

export type TMessageConstants = keyof typeof MESSAGE_CONSTANTS;

const getMessage = (message_constant: TMessageConstants, args?: string[]) => {
   try {
      let message = '';
      if (!args || args.length === 0) message = MESSAGE_CONSTANTS[message_constant] as string;

      if (!message) {
         if (args && args?.length > 0) {
            message = message = MESSAGE_CONSTANTS[message_constant] as string;
         } else message = message_constant || MESSAGE_CONSTANTS['SOMETHING_WENT_WRONG'];
      }

      return processDynamicStringWithArgs(message, args);
   } catch (error) {
      return message_constant;
   }
};

export const processDynamicStringWithArgs = (message: string, args?: string[]) => {
   if (args && args.length > 1 && !message.includes('{2}')) {
      message = message.replace('{1}', `${args.join(', ')}`);
   } else if (args && args.length > 0) {
      args.forEach((arg, index) => {
         message = message.replace(`{${index + 1}}`, arg);
      });
   }
   return message;
};

export { MESSAGE_CONSTANTS, getMessage };
