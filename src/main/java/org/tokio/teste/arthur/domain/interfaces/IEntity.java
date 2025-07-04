package org.tokio.teste.arthur.domain.interfaces;

public interface IEntity {

    Long getId();

    void setId(Long id);

    String getUuidCheck();

    void setUuidCheck(String uuidCheck);

    Boolean getCheckAccessControl();

    void setCheckAccessControl(Boolean validateAccessControl);

}
