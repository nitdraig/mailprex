import { DefaultFormData } from "./core";
type ApiResponse<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
};
type UseMailprexProps = {
    url: string;
    webName: string;
    emailDestiny: string;
    formToken: string;
    captchaToken?: string;
};
/** @deprecated Use `useMailprexForm` for custom fields or keep this for v1 compatibility */
declare const useMailprex: ({ url, webName, emailDestiny, formToken, captchaToken, }: UseMailprexProps) => {
    formData: DefaultFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    response: ApiResponse<unknown>;
};
export default useMailprex;
