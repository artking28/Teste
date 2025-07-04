package org.tokio.teste.arthur.domain.noData;

import lombok.Data;
import org.tokio.teste.arthur.domain.enums.ResponseCodeEnum;

import java.util.ArrayList;
import java.util.List;

@Data
public class GenericResponse {

    private Object result = null;

    private Boolean success = true;

    private List<JsonMessage> messages = new ArrayList<>();

    public GenericResponse(){
    }

    public GenericResponse(boolean success){
        this.success = success;
    }

    public GenericResponse(boolean success, String mensagem, ResponseCodeEnum type){
        this.success = success;
        messages.add(new JsonMessage(mensagem, type));
    }

    public GenericResponse(Object result) {
        this.success = true;
        this.result = result;
    }

    public void addMessage(JsonMessage jsonMessage){
        messages.add(jsonMessage);
    }
}
