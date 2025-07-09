import {Component} from "@angular/core";
import {ModalEditor} from "@app/share/founding-files/base-piece";
import {Address} from "@app/share/models/Address";
import {StateService} from "@app/share/services/state.service";
import {State} from "@app/share/models/State";
import {FormControl, Validators} from "@angular/forms";
import {AddressService} from "@app/share/services/address.service";
import {City} from "@app/share/models/City";
import {object} from "underscore";


@Component({
    standalone: false,
    selector: 'address-editor',
    templateUrl: 'addressEditor.component.html',
    styleUrl: 'addressEditor.component.scss',
})
export class AddressEditorComponent extends ModalEditor<Address> {

    selectedState: number = -1;

    states: Map<number, State> = new Map();

    cities: Map<number, City> = new Map();

    constructor(private stateService: StateService, private addressService: AddressService) {
        super();
    }

    ngOnInit(): void {
        this.object = Address.adapt(this.object)
        this.form = this.object.toFormGroup()
        this.form.setControl("cityId", new FormControl(-1, [Validators.required]));
        this.form.setControl("stateId", new FormControl(-1, [Validators.required]));

        this.httpUtils.httpService.showLoader()
        this.stateService.list().subscribe({
            next: (res) => {
                this.httpUtils.httpService.hideLoader()
                if (res.isOk(true)) {
                    res.result.forEach((state) => {
                        this.states.set(state.id, state)
                        state.cities.forEach((city) => {
                            this.cities.set(city.id, city)
                        })
                    })
                }
            },
            error: _ => this.httpUtils.httpService.hideLoader()
        })

        this.triggerSearch(this.object.postalCode)
        if (this.form.controls.postalCode.value != null) {
            this.triggerSearch(this.form.controls.postalCode.value);
        }

        this.form.controls.postalCode.valueChanges.subscribe((v) => {
            this.triggerSearch(v.toString())
        })
    }

    triggerSearch(s: string) {
        let format = s.replace(/[^0-9]/g, "");
        if (format.length != 8) {
            this.form.controls['street'].enable()
            this.form.controls['district'].enable()
            this.form.controls['cityId'].enable()
            this.form.controls['stateId'].enable()
            return
        }

        this.addressService.httpService.showLoader()
        this.addressService.getCEP(format).subscribe({
            next: (res) => {
                this.addressService.httpService.hideLoader()
                if (res.isOk(true)) {
                    this.selectedState = res.result.city.state.id
                    this.form.patchValue({ stateId: res.result.city.state.id });
                    this.form.patchValue({ cityId: res.result.city.id });
                    this.form.patchValue({ street: res.result.street });
                    this.form.patchValue({ district: res.result.district });

                    this.form.get('street')?.disable()
                    this.form.get('district')?.disable()
                    this.form.get("cityId")?.disable()
                    this.form.get("stateId")?.disable()
                }
            },
            error: _ => this.httpUtils.httpService.hideLoader()
        });
    }

    beforeSave(address: Address): Promise<Address> {
        address.city = this.cities.get(parseInt(this.form.controls["cityId"].value)) ?? new City()
        address.city.state = this.states.get(this.selectedState) ?? new State()
        address.city.state.cities = []
        return new Promise(resolve => resolve(address))
    }

    getZeroObject(): Address {
        return new Address();
    }

    protected readonly Array = Array;
}
