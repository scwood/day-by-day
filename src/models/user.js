import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcrypt-nodejs';

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  emailSchedule: String,
  entries: [{
    date: Date,
    text: String,
  }],
});

function hashPasswordIfModified(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = hashSync(this.password);
  return next();
}

function comparePassword(password) {
  return compareSync(password, this.password);
}

UserSchema.pre('save', hashPasswordIfModified);
UserSchema.methods.comparePassword = comparePassword;


export default mongoose.model('User', UserSchema);
