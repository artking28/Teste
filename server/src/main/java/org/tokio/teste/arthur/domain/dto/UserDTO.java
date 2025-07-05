package org.tokio.teste.arthur.domain.dto;

import lombok.Getter;
import lombok.Setter;
import org.tokio.teste.arthur.domain.entity.AbstractObject;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.interfaces.IAbstractDTO;

import java.util.Date;

@Getter
@Setter
public class UserDTO extends AbstractObject implements IAbstractDTO<User> {

    private Long id;

    private String name;

    private String nickname;

    private String email;

    private String password;

    private String language;

    private String kind;

    private Date createdAt = new Date();


    @Override
    public User toEntity() {
        User ret = new User();
        ret.setId(this.id);
        ret.setName(this.getName());
        ret.setNickname(this.getNickname());
        ret.setEmail(this.getEmail());
        ret.setPassword(this.getPassword());
        ret.setKind(this.getKind());
        ret.setCreatedAt(this.getCreatedAt());
        ret.setLanguage(this.getLanguage());
        ret.setUuidCheck(getUuidCheck());
        ret.setCheckAccessControl(getCheckAccessControl());
        return ret;
    }
}
