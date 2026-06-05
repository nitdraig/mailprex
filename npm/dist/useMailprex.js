"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const core_1 = require("./core");
/** @deprecated Use `useMailprexForm` for custom fields or keep this for v1 compatibility */
const useMailprex = ({ url, webName, emailDestiny, formToken, captchaToken, }) => {
    const [formData, setFormData] = (0, react_1.useState)((0, core_1.createDefaultFormData)());
    const [response, setResponse] = (0, react_1.useState)({
        data: null,
        loading: false,
        error: null,
    });
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        setResponse({ data: null, loading: true, error: null });
        const result = yield (0, core_1.sendMailprex)({
            url,
            webName,
            emailDestiny,
            formToken,
            fields: formData,
            captchaToken,
        });
        setResponse({
            data: result.ok ? result.data : null,
            loading: false,
            error: result.ok ? null : (_a = result.error) !== null && _a !== void 0 ? _a : "Request failed",
        });
    });
    return { formData, handleChange, handleSubmit, response };
};
exports.default = useMailprex;
