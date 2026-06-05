"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMailprexForm = exports.useMailprex = exports.defaultMailprexFields = exports.createDefaultFormData = exports.sendMailprex = void 0;
var core_1 = require("./core");
Object.defineProperty(exports, "sendMailprex", { enumerable: true, get: function () { return core_1.sendMailprex; } });
Object.defineProperty(exports, "createDefaultFormData", { enumerable: true, get: function () { return core_1.createDefaultFormData; } });
Object.defineProperty(exports, "defaultMailprexFields", { enumerable: true, get: function () { return core_1.defaultMailprexFields; } });
var useMailprex_1 = require("./useMailprex");
Object.defineProperty(exports, "useMailprex", { enumerable: true, get: function () { return __importDefault(useMailprex_1).default; } });
var useMailprexForm_1 = require("./useMailprexForm");
Object.defineProperty(exports, "useMailprexForm", { enumerable: true, get: function () { return useMailprexForm_1.useMailprexForm; } });
