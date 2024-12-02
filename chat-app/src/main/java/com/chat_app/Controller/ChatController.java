package com.chat_app.Controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;

import com.chat_app.Model.Message;
import com.chat_app.Model.roomEntity;
import com.chat_app.Service.ChatService;
import com.chat_app.payload.MessageRequest;

@Component
public class ChatController {

    @Autowired
    private ChatService service;

    @SuppressWarnings("null")
    @MessageMapping("/sendmessages/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
            @DestinationVariable String roomId,
            MessageRequest req
    ) {
        // Check if the room exists
        roomEntity room = service.getRoomById(roomId);
        
        
        // Create and populate a Message object
        Message mess = new Message();
        mess.setSenderId(req.getSender());
        mess.setContent(req.getContent());
        mess.setTimestamp(LocalDateTime.now());


        if (room == null) {
            room.getMessages().add(mess);
            service.save(room);
        }
        return mess; 
    }
}
