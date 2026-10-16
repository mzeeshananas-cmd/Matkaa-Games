import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
			index: true,
		},
		phone: {
			type: String,
			trim: true,
			maxlength: 30,
			default: '',
		},
		country: {
			type: String,
			required: true,
			trim: true,
			uppercase: true,
			maxlength: 2,
		},
		messengerUsername: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		messenger: {
			type: String,
			enum: ['Telegram', 'WhatsApp', 'Skype', 'Discord'],
			default: 'Telegram',
		},
		language: {
			type: String,
			trim: true,
			uppercase: true,
			default: 'EN',
			maxlength: 5,
		},
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const Partner = mongoose.models.Partner || mongoose.model('Partner', partnerSchema);

export default Partner;
