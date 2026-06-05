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
exports.useMailprexForm = void 0;
const react_1 = require("react");
const core_1 = require("./core");
function useMailprexForm({ url, webName, emailDestiny, formToken, initialFields, captchaToken, }) {
    const [fields, setFields] = (0, react_1.useState)(initialFields);
    const [response, setResponse] = (0, react_1.useState)({
        data: null,
        loading: false,
        error: null,
    });
    const handleChange = (0, react_1.useCallback)((e) => {
        const { name, value } = e.target;
        setFields((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    }, []);
    const setField = (0, react_1.useCallback)((name, value) => {
        setFields((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    }, []);
    const handleSubmit = (0, react_1.useCallback)((e) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        e.preventDefault();
        setResponse({ data: null, loading: true, error: null });
        const result = yield (0, core_1.sendMailprex)({
            url,
            webName,
            emailDestiny,
            formToken,
            fields,
            captchaToken,
        });
        setResponse({
            data: result,
            loading: false,
            error: result.ok ? null : (_a = result.error) !== null && _a !== void 0 ? _a : "Request failed",
        });
        return result;
    }), [url, webName, emailDestiny, formToken, fields, captchaToken]);
    return (0, react_1.useMemo)(() => ({
        fields,
        setField,
        handleChange,
        handleSubmit,
        response,
    }), [fields, setField, handleChange, handleSubmit, response]);
}
exports.useMailprexForm = useMailprexForm;
