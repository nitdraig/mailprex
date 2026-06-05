import { SendMailprexResult } from "./core";
type ApiResponse = {
    data: SendMailprexResult | null;
    loading: boolean;
    error: string | null;
};
export type UseMailprexFormOptions<T extends Record<string, string>> = {
    url: string;
    webName: string;
    emailDestiny: string;
    formToken: string;
    initialFields: T;
    captchaToken?: string;
};
export declare function useMailprexForm<T extends Record<string, string>>({ url, webName, emailDestiny, formToken, initialFields, captchaToken, }: UseMailprexFormOptions<T>): {
    fields: T;
    setField: (name: keyof T, value: string) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<SendMailprexResult>;
    response: ApiResponse;
};
export {};
