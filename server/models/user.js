import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
	accessToken: {type: String},
	googleId: {type: String},
	name: {type: String},
	score: {type: Number, required: true},
	questions: {type: Array, required: true}
})

export default mongoose.model('User', userSchema);