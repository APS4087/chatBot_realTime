import Conversation from "../models/conversations.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverID} = req.params;
        const senderID = req.user._id;   //  can use req.user because of middleware 
        
        let conversation = await Conversation.findOne({
            participants: {$all : [senderID, receiverID]},
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderID, receiverID],
            });
        }

        const newMessage = new Message({
            senderID,
            receiverID,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // saving the message and conversation to database
        // will run in parallel
        await Promise.all([newMessage.save(), conversation.save()]);

        res.status(201).json({newMessage});
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal Server Error!"});
    }
};

export default sendMessage;