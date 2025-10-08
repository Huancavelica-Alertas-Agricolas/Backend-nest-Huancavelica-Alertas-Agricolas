"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
const common_1 = require("@nestjs/common");
let CustomLogger = class CustomLogger {
    constructor(context) {
        this.context = context;
    }
    setContext(context) {
        this.context = context;
    }
    log(message, context) {
        this.printMessage('LOG', message, context);
    }
    error(message, trace, context) {
        this.printMessage('ERROR', message, { ...context, trace });
    }
    warn(message, context) {
        this.printMessage('WARN', message, context);
    }
    debug(message, context) {
        if (process.env.NODE_ENV === 'development') {
            this.printMessage('DEBUG', message, context);
        }
    }
    verbose(message, context) {
        if (process.env.NODE_ENV === 'development') {
            this.printMessage('VERBOSE', message, context);
        }
    }
    printMessage(level, message, context) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            context: this.context,
            ...context,
        };
        if (process.env.NODE_ENV === 'production') {
            console.log(JSON.stringify(logEntry));
        }
        else {
            console.log(`[${timestamp}] [${level}] ${this.context ? `[${this.context}] ` : ''}${message}`);
            if (context && Object.keys(context).length > 0) {
                console.log('Context:', JSON.stringify(context, null, 2));
            }
        }
    }
};
exports.CustomLogger = CustomLogger;
exports.CustomLogger = CustomLogger = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], CustomLogger);
//# sourceMappingURL=logger.service.js.map