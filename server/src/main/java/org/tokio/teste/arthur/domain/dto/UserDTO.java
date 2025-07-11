package org.tokio.teste.arthur.domain.dto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import org.tokio.teste.arthur.domain.entity.AbstractObject;
import org.tokio.teste.arthur.domain.entity.Address;
import org.tokio.teste.arthur.domain.entity.User;
import org.tokio.teste.arthur.domain.interfaces.IAbstractDTO;
import org.tokio.teste.arthur.utils.LoginResponseDTO;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class UserDTO extends AbstractObject implements IAbstractDTO<User> {

    private Long id;

    private UUID uuid;

    private String name;

    private String nickname;

    private String email;

    private String password;

    private Boolean darkTheme = false;

    private String language = "pt";

    private String kind;

    private Date createdAt = new Date();

    private List<UserDTO> children = new ArrayList<>();

    private List<AddressDTO> addresses = new ArrayList<>();

    @Override
    public User toEntity() {
        User ret = new User();
        ret.setId(this.id);
        ret.setUuid(this.uuid);
        ret.setName(this.getName());
        ret.setNickname(this.getNickname());
        ret.setEmail(this.getEmail());
        ret.setPassword(this.getPassword());
        ret.setDarkTheme(this.getDarkTheme());
        ret.setKind(this.getKind());
        ret.setCreatedAt(this.getCreatedAt());
        ret.setLanguage(this.getLanguage());
        ret.setUuidCheck(getUuidCheck());
        ret.setCheckAccessControl(getCheckAccessControl());
        if(this.children != null) {
            var c = this.children.stream().map(UserDTO::toEntity).toList();
            c.forEach((u) -> u.setFather(null));
            ret.setChildren(c);
        }
        if(this.addresses != null) {
            ret.setAddresses(this.addresses.stream().map(AddressDTO::toEntity).toList());
        }
        return ret;
    }

    public LoginResponseDTO toLoginResponseDTO(String token) {
        LoginResponseDTO ret = new LoginResponseDTO();
        ret.setToken(token);
        ret.setName(this.name);
        ret.setEmail(this.email);
        ret.setNickname(this.nickname);
        ret.setLanguage(this.language);
        ret.setDark(this.darkTheme);
        ret.setKind(this.kind);
        ret.setLoginAt(new Date());
        return ret;
    }
}
