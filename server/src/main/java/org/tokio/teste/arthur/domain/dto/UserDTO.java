package org.tokio.teste.arthur.domain.dto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.tokio.teste.arthur.domain.entity.AbstractObject;
import org.tokio.teste.arthur.domain.entity.Address;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.interfaces.IAbstractDTO;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class UserDTO extends AbstractObject implements IAbstractDTO<User> {

    private Long id;

    private String name;

    private String nickname;

    private String email;

    private String password;

    private Boolean darkTheme;

    private String language;

    private String kind;

    private Date createdAt = new Date();

    private UserDTO father;

    private List<UserDTO> children = new ArrayList<>();

    private List<AddressDTO> addresses = new ArrayList<>();

    @Override
    public User toEntity() {
        User ret = new User();
        ret.setId(this.id);
        ret.setName(this.getName());
        ret.setNickname(this.getNickname());
        ret.setEmail(this.getEmail());
        ret.setPassword(this.getPassword());
        ret.setDarkTheme(this.getDarkTheme());
        ret.setKind(this.getKind());
        ret.setCreatedAt(this.getCreatedAt());
        ret.setLanguage(this.getLanguage());
        ret.setFather(this.getFather().toEntity());
        ret.setChildren(this.getChildren().parallelStream().map(UserDTO::toEntity).toList());
        ret.setAddresses(getAddresses().parallelStream().map(AddressDTO::toEntity).toList());;
        ret.setUuidCheck(getUuidCheck());
        ret.setCheckAccessControl(getCheckAccessControl());
        return ret;
    }
}
