declare interface SNTableAPIResponse<T> {
    result: T
}

declare interface SNTableStatsResponse {
    result: [{
        stats: {
            count: number
        },
        groupby_fields: SNRecordAggregateField[]
    }]
}

declare interface SNRecord {
    sys_id: string,
}
declare interface SNRecordAggregate {
    sys_id: SNRecordAggregateField,
}

declare interface SNAppFile extends SNRecord {
    sys_scope: string,
    sys_package: string,
    active?: boolean,
    name: string,

}

declare interface sys_package extends SNRecordAggregate {
    name: SNRecordAggregateField,
    version: SNRecordAggregateField,
    source: SNRecordAggregateField,
    sys_class_name: SNRecordAggregateField
}

declare interface sys_db_object extends SNRecordAggregate {
    name: SNRecordAggregateField,
    label: SNRecordAggregateField,
    sys_scope: SNRecordAggregateField,
    "sys_scope.scope": SNRecordAggregateField,
    "sys_package.source": SNRecordAggregateField,
    sys_package: SNRecordAggregateField,
}

declare interface sys_dictionary extends SNRecordAggregate {
    name: SNRecordAggregateField,
    internal_type: SNRecordAggregateField,
    column_label: SNRecordAggregateField,
    element: SNRecordAggregateField,
}

declare interface SNAPIFieldDVAll {
    value: string,
    display_value?: string
}

declare interface SNRecordAggregateField extends SNAPIFieldDVAll {
    field: string,
}