"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChannelEnumAlertService1760212001000 = void 0;
class UpdateChannelEnumAlertService1760212001000 {
    constructor() {
        this.name = 'UpdateChannelEnumAlertService1760212001000';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."alert_channels_channel_enum_new" AS ENUM('telegram','gmail','sms')`);
        await queryRunner.query(`ALTER TABLE "alert_channels" ALTER COLUMN "channel" TYPE "public"."alert_channels_channel_enum_new" USING channel::text::"public"."alert_channels_channel_enum_new"`);
        await queryRunner.query(`DROP TYPE IF EXISTS "public"."alert_channels_channel_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."alert_channels_channel_enum_new" RENAME TO "alert_channels_channel_enum"`);
    }
    async down(queryRunner) {
    }
}
exports.UpdateChannelEnumAlertService1760212001000 = UpdateChannelEnumAlertService1760212001000;
//# sourceMappingURL=1760212001000-update_channel_enum_alert_service.js.map