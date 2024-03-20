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
        
        // TODO socket io for real time

        // saving the message and conversation to database
        // will run in parallel
        await Promise.all([newMessage.save(), conversation.save()]);

        res.status(201).json({newMessage});
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({error: "Internal Server Error!"});
    }
};

export const getMessage = async (req, res) => {
    try {
        const {id: toChat_UserID} = req.params;
        const senderID = req.user._id;
        //console.log(toChat_UserID);
        const conversation = await Conversation.findOne({
            participants: {$all: [senderID, toChat_UserID]},
        }).populate("messages");

        if(!conversation) return res.status(200).json([]);

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({error: "Internal Server Error!"});
    }
}