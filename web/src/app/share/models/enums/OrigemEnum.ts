// import {EnumClass} from "@app/share/models/utility/Enum";
//
// export enum OrigemEnum {
//     ORIGEM_VENDA = 1,
//     ORIGEM_DELIVERY = 2,
//     ORIGEM_MESA = 3
// }
//
// export class OrigemEnumImpl implements EnumClass<OrigemEnum, number> {
//
//     constructor(public role: OrigemEnum = OrigemEnum.ORIGEM_VENDA) {
//     }
//
//     public getAllValues(): OrigemEnum[] {
//         return [
//             OrigemEnum.ORIGEM_VENDA,
//             OrigemEnum.ORIGEM_DELIVERY,
//             OrigemEnum.ORIGEM_MESA,
//         ];
//     }
//
//     public getId(): number {
//         return this.role;
//     }
//
//     public asString(): string {
//         switch (this.role) {
//             case OrigemEnum.ORIGEM_VENDA:
//                 return "Venda";
//             case OrigemEnum.ORIGEM_DELIVERY:
//                 return "Delivery";
//             case OrigemEnum.ORIGEM_MESA:
//                 return "Mesa";
//             default:
//                 return new OrigemEnumImpl().asString()
//         }
//     }
// }
