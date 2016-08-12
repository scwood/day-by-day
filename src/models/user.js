import mongoose from 'mongoose';
import { compareSync, hashSync } from 'bcrypt-nodejs';

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  entries: [{
    date: Date,
    text: String,
  }],
});

UserSchema.pre('save', hashPasswordIfModified);
UserSchema.methods.comparePassword = comparePassword;

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

export default mongoose.model('User', UserSchema);
