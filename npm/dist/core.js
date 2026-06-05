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
exports.createDefaultFormData = exports.defaultMailprexFields = exports.sendMailprex = void 0;
const DEFAULT_FIELDS = [
    "fullname",
    "email",
    "message",
    "phone",
    "service",
];
function sendMailprex(options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const fetchFn = (_a = options.fetchImpl) !== null && _a !== void 0 ? _a : fetch;
        const payload = Object.assign(Object.assign(Object.assign({}, options.fields), { webName: options.webName, emailDestiny: options.emailDestiny, formToken: options.formToken }), (options.captchaToken ? { captchaToken: options.captchaToken } : {}));
        try {
            const response = yield fetchFn(options.url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            let data = null;
            try {
                data = yield response.json();
            }
            catch (_b) {
                data = null;
            }
            if (!response.ok) {
                const message = typeof data === "object" &&
                    data !== null &&
                    "message" in data &&
                    typeof data.message === "string"
                    ? data.message
                    : `Request failed with status ${response.status}`;
                return { ok: false, status: response.status, data, error: message };
            }
            return { ok: true, status: response.status, data };
        }
        catch (error) {
            return {
                ok: false,
                status: 0,
                error: error instanceof Error ? error.message : "Network error",
            };
        }
    });
}
exports.sendMailprex = sendMailprex;
exports.defaultMailprexFields = DEFAULT_FIELDS;
function createDefaultFormData() {
    return {
        fullname: "",
        email: "",
        message: "",
        phone: "",
        service: "",
    };
}
exports.createDefaultFormData = createDefaultFormData;
