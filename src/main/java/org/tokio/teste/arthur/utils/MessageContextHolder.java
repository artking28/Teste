package org.tokio.teste.arthur.utils;

import org.tokio.teste.arthur.domain.noData.JsonMessage;

import java.util.ArrayList;
import java.util.List;

public class MessageContextHolder {

    private static final ThreadLocal<List<JsonMessage>> messageThreadLocal = new ThreadLocal<>();

    public static void setMessages(List<JsonMessage> messages) {
        messageThreadLocal.set(messages);
    }

    public static List<JsonMessage> getMessages() {
        return messageThreadLocal.get();
    }

    public static void clear() {
        messageThreadLocal.remove();
    }

    public static void addMessage(JsonMessage message){
        List<JsonMessage> messages = messageThreadLocal.get();
        if(messages==null){
            messages = new ArrayList<>();
            MessageContextHolder.setMessages(messages);
        }
        messages.add(message);
    }
}
