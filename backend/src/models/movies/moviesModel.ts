import mongoose from 'mongoose';
import { ISchemaTypeOptions } from '../types';
import { FORM_FIELD_TYPES } from '../../utils/constants/form-field-types';
import { validateForm } from '../../utils/security/validator/formValidator';

export interface IMovie {
   _id?: mongoose.Schema.Types.ObjectId;
   name: string;
   year_of_release: number;
   producer_id: mongoose.Schema.Types.ObjectId;
   actor_ids: mongoose.Schema.Types.ObjectId[];
   plot: string;
   avatar?: string;
   images?: string[];
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
         field_type: FORM_FIELD_TYPES.ID_LIST,
      },
   ],
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', field_type: FORM_FIELD_TYPES.ID },
   createdAt: { type: Date, default: Date.now, field_type: FORM_FIELD_TYPES.DATE },
   updatedAt: { type: Date, default: Date.now, field_type: FORM_FIELD_TYPES.DATE },
   plot: { type: String, required: true, field_type: FORM_FIELD_TYPES.TEXTAREA },
   avatar: { type: String, field_type: FORM_FIELD_TYPES.URL },
   images: [{ type: String, field_type: FORM_FIELD_TYPES.URL_LIST }],
};

const MovieSchema = new mongoose.Schema<IMovie>(MovieSchemaObject, { timestamps: true });

const Movie = mongoose.model<IMovie>('Movie', MovieSchema);

export const validateMovie = (movie: Partial<IMovie>, isNew = false) => {
   return validateForm(movie, MovieSchemaObject, isNew);
};
export default Movie;
