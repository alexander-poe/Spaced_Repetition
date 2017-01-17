import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
	score: {type: Number, required: true},
	questions: {type: Array, required: true}
})

export default mongoose.model('User', userSchema);