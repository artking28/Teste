package org.tokio.teste.arthur.domain.enums;

public enum ActionEnum {
    READ(1),
    CREATE(2),
    UPDATE(3),
    DELETE( 4);

    public final Integer code;

    ActionEnum(Integer code){
        this.code = code;
    }
}
