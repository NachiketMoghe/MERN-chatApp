import mongoose from 'mongoose';
const messagesSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: {type: Date, default: Date.now()},
    sent: Boolean
});

export default mongoose.model("messagecontents", messagesSchema);