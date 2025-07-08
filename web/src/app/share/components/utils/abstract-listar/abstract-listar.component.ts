import {AfterContentInit, AfterViewInit, Directive, inject, OnInit, ViewChild} from "@angular/core";
import { BasePiece } from "@app/share/founding-files/base-piece";
import { IRootService } from "@app/share/IService.service";
import {Indexable} from "@app/share/models/utility/Indexable";
import {firstValueFrom, Observable} from "rxjs";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {GlobalsVars} from "@app/share/globalsVars";
import Utils from "@app/share/utils";
import {ModalObject, ModalSummoner} from "@app/share/modal-summoner";
import { GenericResponse } from "@app/share/models/generic-response";
import {DataUtil} from "@app/share/models/utility/DataUtil";
import {Err, None, Some} from "@app/share/models/utility/Result";
import Swal from "sweetalert2";
import {Color} from "@app/share/models/utility/Color";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


type Proc = (...args: any) => any;

type Constructor<T> = new () => T

abstract class IAbstractListarComponent<T extends Indexable<T>> {

    public abstract getTableColumns(): string[];

    public abstract allowButtons(): boolean;

    public abstract allowSelection(): boolean;

    public abstract beforeEdit(obj: T): T | null;

    public abstract getEditModalConfig(): ModalObject;

    public abstract beforeDelete(obj: T): boolean;

    public abstract additionalButtons(): Button[];
}

export class Button {

    constructor(
        public label: string = 'button',
        public f: Proc = () => {
        },
        public applyToMany: boolean = false) {
    }
}


@Directive()
export class AbstractListarComponent<T extends Indexable<T>> extends BasePiece implements OnInit, AfterViewInit, IAbstractListarComponent<T> {

    private _liveAnnouncer = inject(LiveAnnouncer);

    @ViewChild(MatSort) sort: MatSort;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    data: T[] = []

    dataSource: MatTableDataSource<T>;

    additionalButtonsVec: Button[]

    floatingButtonsVec: Button[]

    translatedWords: Map<string, string> = new Map<string, string>()

    refreshTable: Observable<any>;

    constructor(private zeroValueObj: Constructor<T>, private service: IRootService<T>) {
        super();
        // this.httpUtils.httpService
        //     .get<any>(`https://jsonplaceholder.typicode.com/users`)
        //     .subscribe((res) => {
        //         this.data = res
        //     })

        this.additionalButtonsVec = this.additionalButtons()
        this.floatingButtonsVec = this.additionalButtons().filter((b) => b.applyToMany)
    }

    async ngOnInit() {

        const originalWords: string[] = [
            "areYouSure",
            "youCannotRevertThisAction",
            "success.entity.removed",
            "success.entity.saved",
            "success",
            "yes",
            "error",
            "cancel"
        ]
        this.translatedWords = await Utils.bulkTranslate(originalWords, this.translateService);
    }

    ngAfterViewInit() {
        this.list()
    }

    getClassName(upper: boolean = false): string {
        if(upper) {
            return this.zeroValueObj.name
        }
        let ret = this.zeroValueObj.name
        return ret[0] + ret.substring(1)
    }

    public getDefaultListObservable(): Observable<GenericResponse<T[]>> {
        return this.service.list()
    }

    public getEditModalConfig(): ModalObject {
        throw new Error("Method not implemented.");
    }

    public additionalButtons(): Button[] {
        return []
    }

    public beforeEdit(obj: T): T | null {
        return null
    }

    public beforeDelete(obj: T): boolean {
        return true
    }

    public allowButtons(): boolean {
        return true
    }

    public allowSelection(): boolean {
        return true
    }

    public getTableColumns(): string[] {
        return ['id', 'name', 'email']
    }

    list() {
        this.httpUtils.httpService.showLoader();
        this.getDefaultListObservable().subscribe({
            next: (res) => {
                this.httpUtils.httpService.hideLoader();
                if (res.isOk(true)) {
                    this.defineNewData(res.result)
                }

            }, error: (_) => this.httpUtils.httpService.hideLoader()
        })
    }

    defineNewData(content: T[]) {
        this.data = content
        this.dataSource = new MatTableDataSource(this.data)
        const inter = setInterval(() => {
            if(this.sort && this.paginator) {
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator
                clearInterval(inter);
            }
        }, 200)
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
                case 'createdAt': return new Date(item["createdAt"]);
                default: return item[property];
            }
        };
    }

    edit(obj: T | null): void {
        const conf = this.getEditModalConfig()
        conf.data = new DataUtil<T>(obj)

        let pos = -1
        if (obj != null) {
            pos = this.data.indexOf(obj)
            if (pos < 0) {
                return
            }

            const newObj = this.beforeEdit(obj) ?? obj
            // if (newObj) {
            //     this.data[pos] = newObj
            // }
            conf.data = new DataUtil<T>(newObj)
        }

        conf.emitter.subscribe((result) => {
            switch (result.constructor) {
                case (Some):
                    const someObj = <Some<T>>result;

                    this.httpUtils.httpService.showLoader()
                    this.service.save(someObj.value).subscribe({
                        next: (res) => {
                            this.httpUtils.httpService.hideLoader()
                            if (res.isOk(false)) {

                                this.toastrService.success(
                                    this.translatedWords.get("success.entity.saved"),
                                    this.translatedWords.get("success")
                                );

                                this.list()
                            }
                        },
                        error: (_) => {
                            this.httpUtils.httpService.hideLoader()
                            conf.data = new DataUtil<T>(someObj.value)
                            ModalSummoner.openFromModalObject(conf)
                        }
                    })
                    break
                case (None):
                    const noneObj = <None> result;
                    if(obj && noneObj.msg == "delete") {
                        const n = this.data.indexOf(obj)
                        if (n < 0 || !this.beforeDelete(obj)) {
                            return
                        }

                        this.list()
                    }
                    break
                case (Err):
                    let err = <Err>result;

                    firstValueFrom(this.translateService.get("error")).then((translatedTitle: string) => {
                        this.toastrService.error(err.msg, translatedTitle)
                    });

                    this.edit(err.value)
                    break
            }
        })

        ModalSummoner.openFromModalObject(conf)
    }

    async delete(obj: T): Promise<void> {
        const n = this.data.indexOf(obj)
        if (n < 0 || !this.beforeDelete(obj)) {
            return
        }

        let okDelete: boolean = false;
        await Swal.fire<boolean>({
            title: this.translatedWords.get('areYouSure'),
            text: this.translatedWords.get('youCannotRevertThisAction'),
            icon: 'warning',
            iconColor: Color.YELLOW.toString(),
            reverseButtons: true,
            showConfirmButton: true,
            showCancelButton: true,
            customClass: {
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn'
            },
            background: Color.WHITE.toString(),
        }).then((result) => {
            okDelete = result.isConfirmed
        })

        if(!okDelete) {
            return
        }

        this.httpUtils.httpService.showLoader()
        this.service.deleteById(obj.getId()).subscribe({
            next: (res) => {
                this.httpUtils.httpService.hideLoader()
                if (res.isOk(false)) {
                    this.toastrService.success(
                        this.translatedWords.get("success.entity.removed"),
                        this.translatedWords.get("success")
                    )
                    let temp = structuredClone(this.data)
                    temp.splice(n, 1)
                    this.data = temp
                }
            },
            error: (_) => this.httpUtils.httpService.hideLoader()
        })
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            console.log(`Sorted ${sortState.direction} ending`);
        } else {
            console.log('Sorting cleared')
        }
    }

    public get getTableColumnsAddons(): () => string[] {
        return () => {
            let columns = [...this.getTableColumns()];
            if (this.allowButtons() && !columns.includes("Buttons")) columns.push("Buttons");
            return columns
        }
    }

    public get getValue(): (item: any, key: string) => string {
        return (item: any, key: string) => {
            const datePatterns = ["createdAt", "updatedAt", "deletedAt"];
            if (datePatterns.includes(key)) {
                return new Date(item[key]).toLocaleString('pt-BR');
            }
            return item[key];
        }
    }
}
