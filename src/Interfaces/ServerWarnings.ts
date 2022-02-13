import { MemberWarning } from "./MemberWarning";

export interface ServerWarnings {
    amount: number;
    data: { id: [MemberWarning] }
}