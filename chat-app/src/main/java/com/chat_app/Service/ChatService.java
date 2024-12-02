package com.chat_app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat_app.Model.roomEntity;
import com.chat_app.Repository.RoomRepo;

@Service
public class ChatService {


    @Autowired
    private RoomRepo repo;

    public List<roomEntity> getAllRooms(){
        return repo.findAll();
    }

    public roomEntity getRoomById(String roomId){
        return repo.findByRoomId(roomId).orElse(null);
    }


    public roomEntity createRoom(roomEntity room){
        return repo.save(room);
    }

    public boolean roomExist(String roomId) {
       return repo.findByRoomId(roomId).isPresent();
    }

    public roomEntity save(roomEntity room) {
        return repo.save(room);
    }

    

    
}
