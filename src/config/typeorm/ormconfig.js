"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const config_1 = require("@nestjs/config");
const path = require("path");
exports.ormConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        try {
            const option = {
                type: configService.get('DB_TYPE'),
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                database: configService.get('DB_DATABASE'),
                password: configService.get('DB_PASSWORD'),
                entities: [path.join(__dirname, '../../app/**/*.entity.{ts,js}')],
                synchronize: true,
            };
            return option;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
};
//# sourceMappingURL=ormconfig.js.map