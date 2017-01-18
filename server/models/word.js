import mongoose from 'mongoose';
const wordSchema = new mongoose.Schema({
	english: {type: String, required: true},
	french: {type: String, required: true}
});

export default mongoose.model('Word', wordSchema);