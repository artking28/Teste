package org.tokio.teste.arthur.domain.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.tokio.teste.arthur.domain.enums.ResponseCodeEnum;
import org.tokio.teste.arthur.domain.noData.JsonMessage;

import java.util.*;

@EqualsAndHashCode(callSuper = true)
@ResponseStatus(HttpStatus.CONFLICT)
@Data
public class BusinessRuleException extends Exception implements IBaseException {

    private List<JsonMessage> messages = new ArrayList<>();

    public BusinessRuleException(String message, ResponseCodeEnum responseCodeEnum) {
        this.messages.add(new JsonMessage(message, responseCodeEnum));
    }

    public BusinessRuleException(JsonMessage ...messages) {
        this.messages.addAll(List.of(messages));
    }

    public void addMessage(String message, ResponseCodeEnum type) {
        addMessages(new JsonMessage(message, type));
    }

    public void addMessage(String message, ResponseCodeEnum type, Map<String, Object> parameters) {
        addMessages(new JsonMessage(message, type, parameters));
    }

    public void addMessages(JsonMessage...messages) {
        this.messages.addAll(List.of(messages));
    }

}
