package com.chat_app.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat_app.Model.roomEntity;
import com.chat_app.Service.ChatService;


@RestController
@RequestMapping("api/rooms")
public class RoomController {

    @Autowired
    private ChatService service;


    //create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody roomEntity room){
        if(service.roomExist(room.getRoomId())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Room aleady exist");
        }
        roomEntity createdRoom = service.createRoom(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRoom);
    }

    //get room
    @GetMapping("/{roomId}")
    public ResponseEntity<?> getRoom(@PathVariable String roomId){
            roomEntity room = service.getRoomById(roomId);
            if(room == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found");
            }

            return ResponseEntity.status(HttpStatus.FOUND).body(room);

    }


    //get message by id
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<?> getMessages(@PathVariable String roomId){
        roomEntity room = service.getRoomById(roomId);
        
        if(room == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Message Not Found");
        }

        return  ResponseEntity.status(HttpStatus.OK).body(room.getMessages());
    }

}
