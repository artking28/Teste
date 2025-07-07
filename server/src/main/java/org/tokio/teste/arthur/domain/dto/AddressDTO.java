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

    private String district;

    private String postalCode;

    private Boolean active;

    private CityDTO city;

    private UserDTO user;

    @Override
    public Address toEntity() {
        Address ret = new Address();
        ret.setId(this.getId());
        ret.setName(this.getName());
        ret.setNumber(this.getNumber());
        ret.setAddition(this.getAddition());
        ret.setStreet(this.getStreet());
        ret.setDistrict(this.getDistrict());
        ret.setPostalCode(this.getPostalCode());
        ret.setUuidCheck(getUuidCheck());
        ret.setCheckAccessControl(getCheckAccessControl());
        if(this.getCity() != null) {
            ret.setCity(this.getCity().toEntity());
        }
//        if(this.getUser() != null) {
//            ret.setUser(this.getUser().toEntity());
//        }
        return ret;
    }
}
