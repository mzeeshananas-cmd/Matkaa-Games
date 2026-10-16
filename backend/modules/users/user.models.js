import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			maxlength: 254,
		},
		passwordResetTokenHash: { type: String, select: false },
		passwordResetExpiresAt: { type: Date, select: false },
		passwordHash: {
			type: String,
			required: true,
			select: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
