package org.tokio.teste.arthur.domain.dto;

import lombok.Getter;
import lombok.Setter;
import org.tokio.teste.arthur.domain.entity.AbstractObject;
import org.tokio.teste.arthur.domain.entity.Address;
import org.tokio.teste.arthur.domain.interfaces.IAbstractDTO;


@Getter
@Setter
public class AddressDTO extends AbstractObject implements IAbstractDTO<Address> {

    private Long id;

    private String name;

    private Short number;

    private String addition;

    private String street;

    private String city;

    private String state;

    private String district;

    private String postalCode;

    private Boolean active;

    private UserDTO user;

    @Override
    public Address toEntity() {
        Address ret = new Address();
        ret.setId(this.getId());
        ret.setName(this.getName());
        ret.setNumber(this.getNumber());
        ret.setAddition(this.getAddition());
        ret.setStreet(this.getStreet());
        ret.setCity(this.getCity());
        ret.setState(this.getState());
        ret.setDistrict(this.getDistrict());
        ret.setPostalCode(this.getPostalCode());
        ret.setActive(this.getActive());
        ret.setUser(this.getUser().toEntity());
        ret.setUuidCheck(getUuidCheck());
        ret.setCheckAccessControl(getCheckAccessControl());
        return ret;
    }
}
