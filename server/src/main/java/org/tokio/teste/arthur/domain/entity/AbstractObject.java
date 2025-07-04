package org.tokio.teste.arthur.domain.entity;

import jakarta.persistence.Transient;
import lombok.Data;
import java.util.UUID;

@Data
public abstract class AbstractObject {

    @Transient
    private String uuidCheck = UUID.randomUUID().toString();

    @Transient
    private Boolean checkAccessControl = true;

    public void setUuidCheck(String uuidCheck) {
        if (uuidCheck != null) {
            this.uuidCheck = uuidCheck;
        }
    }
}
