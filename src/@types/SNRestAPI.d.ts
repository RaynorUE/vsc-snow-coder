declare interface SNTableAPIResponse<T> {
    result: T
}

declare interface SNTableStatsResponse {
    result: [{
        stats: {
            count: number
        },
        groupby_fields: [SNStatsGroupByField]
    }]
}

declare interface SNRecord {
    sys_id: string,
}

declare interface SNAppFile extends SNRecord {
    sys_scope: string,
    sys_package: string,
    active?: boolean,
    name: string,

}

declare interface sys_db_object extends SNRecord {
    name: SNAPIFieldDVAll,
    label: SNAPIFieldDVAll,
    sys_scope: SNAPIFieldDVAll,
    "sys_scope.scope": SNAPIFieldDVAll,
    "sys_package.source": SNAPIFieldDVAll,
    sys_package: SNAPIFieldDVAll,
}

declare interface sys_dictionary extends SNRecord {
    name: SNAPIFieldDVAll,
    internal_type: SNAPIFieldDVAll,
    column_label: SNAPIFieldDVAll,
    element: SNAPIFieldDVAll,
}

declare interface SNAPIFieldDVAll {
    value: string,
    display_value?: string
}

declare interface SNStatsGroupByField extends SNAPIFieldDVAll {
    field: string,
}