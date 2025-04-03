import mongoose from 'mongoose';
import { ISchemaTypeOptions } from '../types';
import { FORM_FIELD_TYPES } from '../../utils/constants/form-field-types';

const ACTOR_ROLES = ['Actor', 'Producer'];

export interface ICelebrity {
   _id?: mongoose.Schema.Types.ObjectId;
   name: string;
   dob: Date;
   bio?: string;
   roles: (typeof ACTOR_ROLES)[number][];
   createdBy?: mongoose.Schema.Types.ObjectId;
   createdAt?: Date;
   updatedAt?: Date;
}

const CelebritySchemaObject: Record<keyof ICelebrity, ISchemaTypeOptions> = {
   _id: { type: mongoose.Schema.Types.ObjectId, auto: true, field_type: FORM_FIELD_TYPES.ID },
   name: { type: String, required: true, field_type: FORM_FIELD_TYPES.STRING },
   dob: { type: Date, required: true, field_type: FORM_FIELD_TYPES.DATE },
   bio: { type: String, field_type: FORM_FIELD_TYPES.STRING },
   roles: {
      type: [String],
      enum: ACTOR_ROLES,
      required: true,
      field_type: FORM_FIELD_TYPES.STRING_LIST,
   },
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', field_type: FORM_FIELD_TYPES.ID },
   createdAt: { type: Date, default: Date.now, field_type: FORM_FIELD_TYPES.DATE },
   updatedAt: { type: Date, default: Date.now, field_type: FORM_FIELD_TYPES.DATE },
};

const CelebritySchema = new mongoose.Schema(CelebritySchemaObject, { timestamps: true });

module.exports = mongoose.model('Celebrity', CelebritySchema);
