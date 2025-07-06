package org.tokio.teste.arthur.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.tokio.teste.arthur.domain.dto.AddressDTO;
import org.tokio.teste.arthur.domain.interfaces.IAbstractEntity;

import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "address")
public class Address extends AbstractObject implements IAbstractEntity<Address, AddressDTO> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "number", nullable = false)
    private Short number;

    @Column(name = "addition", nullable = false)
    private String addition;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "district", nullable = false)
    private String district;

    @Column(name = "postalCode", nullable = false)
    private String postalCode;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

    @Override
    public AddressDTO toDTO() {
        AddressDTO ret = new AddressDTO();
        ret.setId(this.getId());
        ret.setName(this.getName());
        ret.setNumber(this.getNumber());
        ret.setAddition(this.getAddition());
        ret.setCity(this.getCity());
        ret.setState(this.getState());
        ret.setStreet(this.getStreet());
        ret.setDistrict(this.getDistrict());
        ret.setPostalCode(this.getPostalCode());
        ret.setUuidCheck(getUuidCheck());
        ret.setCheckAccessControl(getCheckAccessControl());
        if(ret.getUser() != null) {
            ret.setUser(this.getUser().toDTO());
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
        Address other = (Address) o;
        return id != null && id.equals(other.id);
    }

    @Override
    public final int hashCode() {
        return Objects.hashCode(getId());
    }
}
