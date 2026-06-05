export type SendMailprexFieldValue = string | number | boolean;
export type SendMailprexOptions = {
    url: string;
    formToken: string;
    webName: string;
    emailDestiny: string;
    fields: Record<string, SendMailprexFieldValue>;
    captchaToken?: string;
    fetchImpl?: typeof fetch;
};
export type SendMailprexResult = {
    ok: boolean;
    status: number;
    data?: unknown;
    error?: string;
};
export declare function sendMailprex(options: SendMailprexOptions): Promise<SendMailprexResult>;
export declare const defaultMailprexFields: readonly ["fullname", "email", "message", "phone", "service"];
export type DefaultFormData = {
    fullname: string;
    email: string;
    message: string;
    phone: string;
    service: string;
};
export declare function createDefaultFormData(): DefaultFormData;
