package com.chat_app.Model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "room")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class roomEntity {

    @Id
    private String id;
    private String roomId;
    private List<Message> messages;


}
