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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var dotenv = require("dotenv");
var axios_1 = require("axios");
dotenv.config();
var app = express();
var API_KEY = process.env.API_KEY;
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var address, geoUrl, geoResponse, locationData, lat, lon, weatherUrl, weatherResponse, data, cityName, temperature, sunsetTime, message, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = req.query.address;
                geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=".concat(address, "&appid=").concat(API_KEY);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, axios_1.default.get(geoUrl)];
            case 2:
                geoResponse = _a.sent();
                locationData = geoResponse.data[0];
                lat = locationData.lat;
                lon = locationData.lon;
                weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&appid=").concat(API_KEY, "&units=metric");
                return [4 /*yield*/, axios_1.default.get(weatherUrl)];
            case 3:
                weatherResponse = _a.sent();
                data = weatherResponse.data;
                cityName = data.name;
                temperature = data.main.temp;
                sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
                message = "City Name: ".concat(cityName, "<br>Temperature: ").concat(temperature, "\u00B0C<br>Sunset Time: ").concat(sunsetTime);
                res.send("<html><body><div id='container'><h1>".concat(message, "</h1></div></body></html>"));
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).send('An error occurred');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
var port2 = process.env.PORT || 3000;
app.listen(port2, function () {
    console.log("Example app listening on port ".concat(port2));
});
