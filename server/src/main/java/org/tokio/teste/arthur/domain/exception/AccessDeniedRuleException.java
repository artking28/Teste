package org.tokio.teste.arthur.domain.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.tokio.teste.arthur.domain.enums.ActionPermissionEnum;

@EqualsAndHashCode(callSuper = true)
@Data
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class AccessDeniedRuleException extends RuntimeException {

    private ActionPermissionEnum permission;

    public AccessDeniedRuleException(ActionPermissionEnum permission){
        super();
        this.permission = permission;
    }
}
