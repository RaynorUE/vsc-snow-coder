declare interface SNRecord {
    sys_id: string,
    name: string,
}

declare interface SNAppFile extends SNRecord{
    sys_scope: string,
    sys_package: string,
    active?: boolean
}