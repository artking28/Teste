package org.tokio.teste.arthur.domain.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import org.tokio.teste.arthur.domain.dto.UserDTO;
import org.tokio.teste.arthur.domain.interfaces.IAbstractEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends AbstractObject implements IAbstractEntity<User, UserDTO> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "createdAt", nullable = false)
    private Date createdAt = new Date();

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "darkTheme", nullable = false)
    private Boolean darkTheme = false;

    @Column(name = "language", nullable = false)
    private String language = "pt";

    @Column(name = "kind", nullable = false)
    private String kind;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "father_id")
    private User father;

    @OneToMany(mappedBy = "father", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> children = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Address> addresses  = new ArrayList<>();

    public User() {
    }

    public User(Long id) {
        this.id = id;
    }

    public UserDTO toDTO() {
        UserDTO ret = new UserDTO();
        ret.setId(this.id);
        ret.setName(this.getName());
        ret.setNickname(this.getNickname());
        ret.setEmail(this.getEmail());
        ret.setKind(this.getKind());
        ret.setCreatedAt(this.getCreatedAt());
        ret.setDarkTheme(this.getDarkTheme());
        ret.setEmail(this.getEmail());
        ret.setPassword(this.getPassword());
        ret.setLanguage(this.getLanguage());
        ret.setUuidCheck(getUuidCheck());
        ret.setCheckAccessControl(getCheckAccessControl());
        if(this.children != null) {
            ret.setChildren(this.children.stream().map(User::toDTO).toList());
        }
        if(this.addresses != null) {
            ret.setAddresses(this.addresses.stream().map(Address::toDTO).toList());
        }
        if(this.getFather() != null) {
            ret.setFather(this.getFather().toDTO());
        }
        return ret;
    }

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> thisClass = Hibernate.getClass(this);
        Class<?> otherClass = Hibernate.getClass(o);
        if (!thisClass.equals(otherClass)) return false;
        User other = (User) o;
        return id != null && id.equals(other.id);
    }

    @Override
    public final int hashCode() {
        return Objects.hashCode(getId());
    }
}
