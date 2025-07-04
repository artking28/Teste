package org.tokio.teste.arthur.domain.exception;

import org.tokio.teste.arthur.domain.enums.ResponseCodeEnum;
import org.tokio.teste.arthur.domain.noData.JsonMessage;

import java.util.List;
import java.util.Map;

public interface IBaseException {

    void addMessage(String message, ResponseCodeEnum type);

    void addMessage(String message, ResponseCodeEnum type, Map<String, Object> parameters);

    void addMessages(JsonMessage...messages);

    List<JsonMessage> getMessages();
}
