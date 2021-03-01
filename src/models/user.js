import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      minlength: [6, "User's name must have at least 6 characters"],
    },
    password: {
      required: true,
      type: String,
      minlength: [8, "User's password must have at least 8 characters"],
    },
    email: {
      required: true,
      type: String,
      validate: {
        validator: function (email) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email
          );
        },
      },
    },
    isActive: {
      default: true,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  const hashPass = bcrypt.hash(this.password, salt);
  this.password = hashPass;
  next();
});

const User = mongoose.model('user', UserSchema);

export default User;
