import { IUser } from "@/types/user.types";
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Omit<IUser, "_id">, Document {
  comparePass(candidatePassword: string): boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Minimum 6 characters are required"],
    },
    mobile: {
      type: String,
      minlength: [10, "Minimum 10 characters are required"],
      maxlength: [10, "Maximum 10 characters are required"],
    },
  
  },
  { timestamps: true },
);

userSchema.pre("save", function (): void {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePass = function (candidatePassword: string): boolean {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
