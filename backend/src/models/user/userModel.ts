import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { FORM_FIELD_TYPES } from '../../utils/constants/form-field-types';
import { ISchemaTypeOptions } from '../types';
import { validateForm } from '../../utils/security/validator/formValidator';

export interface IUser {
   _id?: mongoose.Types.ObjectId; // Use mongoose.Types.ObjectId for compatibility
   name: string;
   email: string;
   password: string;
   createdAt?: Date;
}

// Extend the Mongoose Document to include the comparePassword method
export interface IUserDocument extends Document, Omit<IUser, '_id'> {
   comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchemaObject: Record<keyof Omit<IUser, '_id'>, ISchemaTypeOptions> = {
   name: { type: String, required: true, trim: true, field_type: FORM_FIELD_TYPES.STRING, minLength: 3, maxLength: 50 },
   email: { type: String, required: true, unique: true, field_type: FORM_FIELD_TYPES.EMAIL },
   password: { type: String, required: true, field_type: FORM_FIELD_TYPES.PASSWORD },
   createdAt: { type: Date, default: Date.now, field_type: FORM_FIELD_TYPES.DATE },
};

const UserSchema = new mongoose.Schema<IUserDocument>(UserSchemaObject, { timestamps: true });

// Encrypt password before saving if updated
UserSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

// Define the comparePassword method
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
   return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUserDocument>('User', UserSchema);

export const validateUser = (user: Partial<IUser>, isNew = false) => {
   return validateForm(user, UserSchemaObject, isNew);
};

export default User;
