import { snDefaultTables } from ".";

declare interface tablePreferencesV1 {
    tables: snTableConfigV1[]
}


interface snTableConfigV1 {
    name: string;
    label: string;
    display_field: string;
    fields: Array<snTableFieldV1>;
    children: Array<snTableConfigV1>;
    additional_display_fields: Array<string>;
}

interface snTableFieldV1 {
    table: string;
    name: string;
    label: string;
    extention: string;
}