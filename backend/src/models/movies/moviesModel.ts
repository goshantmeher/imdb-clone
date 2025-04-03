import mongoose from 'mongoose';
import { ISchemaTypeOptions } from '../types';
import { FORM_FIELD_TYPES } from '../../utils/constants/form-field-types';

export interface IMovie {
   _id?: mongoose.Schema.Types.ObjectId;
   name: string;
   year_of_release: number;
   producer_id: mongoose.Schema.Types.ObjectId;
   actor_ids: mongoose.Schema.Types.ObjectId[];
   plot: string;
   poster_url?: string;
   createdBy?: mongoose.Schema.Types.ObjectId;
   createdAt?: Date;
   updatedAt?: Date;
}

const MovieSchemaObject: Record<keyof IMovie, ISchemaTypeOptions> = {
   _id: { type: mongoose.Schema.Types.ObjectId, auto: true, field_type: FORM_FIELD_TYPES.ID },
   name: { type: String, required: true, field_type: FORM_FIELD_TYPES.STRING },
   year_of_release: { type: Number, required: true, field_type: FORM_FIELD_TYPES.NUMBER },
   producer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Celebrity',
      required: true,
      field_type: FORM_FIELD_TYPES.ID,
   },
   actor_ids: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Celebrity',
         required: true,
         field_type: FORM_FIELD_TYPES.ID,
      },
   ],
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', field_type: FORM_FIELD_TYPES.ID },
   createdAt: { type: Date, default: Date.now, field_type: FORM_FIELD_TYPES.DATE },
   updatedAt: { type: Date, default: Date.now, field_type: FORM_FIELD_TYPES.DATE },
   plot: { type: String, required: true, field_type: FORM_FIELD_TYPES.STRING },
   poster_url: { type: String, field_type: FORM_FIELD_TYPES.URL },
};

const MovieSchema = new mongoose.Schema<IMovie>(MovieSchemaObject, { timestamps: true });

module.exports = mongoose.model<IMovie>('Movie', MovieSchema);
