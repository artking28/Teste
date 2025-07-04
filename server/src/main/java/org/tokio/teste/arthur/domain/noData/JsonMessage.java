package org.tokio.teste.arthur.domain.noData;

import org.tokio.teste.arthur.domain.enums.ResponseCodeEnum;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


public class JsonMessage implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    public ResponseCodeEnum type;

    public int timeout = 0;

    public String message;

    public List<Object> args = new ArrayList<>();

    public JsonMessage(String message, ResponseCodeEnum type){
        this.message = message;
        this.type = type;
    }

    public JsonMessage(String message, ResponseCodeEnum type, Map<String, Object> params){
        this.message = message;
        this.type = type;
        args.add(params);
    }

    public boolean equals(Object object){
        if((object instanceof JsonMessage one)){
            if(one.message == null ? this.message == null : this.message.equals(one.message)){
                return one.args == null ? this.args == null : this.args.equals(one.args);
            }
        }
        return false;
    }
}
