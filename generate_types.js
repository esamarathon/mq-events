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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
function generate() {
    return __awaiter(this, void 0, void 0, function () {
        var dirs, index, _i, dirs_1, dir, subIndex, files, _a, files_1, file, name_1, ts, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    dirs = fs_1.readdirSync('./definitions', { withFileTypes: true }).filter(function (d) { return d.isDirectory(); });
                    index = [];
                    _i = 0, dirs_1 = dirs;
                    _b.label = 1;
                case 1:
                    if (!(_i < dirs_1.length)) return [3 /*break*/, 7];
                    dir = dirs_1[_i];
                    fs_1.mkdirSync("./types/" + dir.name, { recursive: true });
                    subIndex = [];
                    files = fs_1.readdirSync("./definitions/" + dir.name);
                    _a = 0, files_1 = files;
                    _b.label = 2;
                case 2:
                    if (!(_a < files_1.length)) return [3 /*break*/, 5];
                    file = files_1[_a];
                    name_1 = file.replace(/.json$/, '');
                    console.log(dir.name + "/" + name_1);
                    return [4 /*yield*/, json_schema_to_typescript_1.compileFromFile("./definitions/" + dir.name + "/" + name_1 + ".json", {
                            cwd: '.'
                        })];
                case 3:
                    ts = _b.sent();
                    fs_1.writeFileSync("./types/" + dir.name + "/" + name_1 + ".d.ts", ts);
                    subIndex.push("export * from './" + name_1 + "';");
                    _b.label = 4;
                case 4:
                    _a++;
                    return [3 /*break*/, 2];
                case 5:
                    fs_1.writeFileSync("./types/" + dir.name + "/index.d.ts", subIndex.join('\n') + "\n");
                    index.push("export * as " + dir.name + " from './" + dir.name + "';");
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7:
                    fs_1.writeFileSync("./types/index.d.ts", index.join('\n') + "\n");
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _b.sent();
                    console.log(err_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
generate();
