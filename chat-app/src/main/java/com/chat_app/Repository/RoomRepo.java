package com.chat_app.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.chat_app.Model.roomEntity;



public interface RoomRepo extends MongoRepository<roomEntity, String> {
    Optional<roomEntity> findByRoomId(String roomId);
}
