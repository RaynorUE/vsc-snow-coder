declare namespace sn_cmdb - CMDB {

	/** 
	 * When using this class in a scoped application, use the sn_cmdb namespace identifier.
	 * 
	 */
	class IdentificationEngine {
	
		/**
		 *
		 * Insert or update configuration items and non-cmdb configuration items, classes not extending from cmdb_ci, in the CMDB based on identification and reconciliation rules. Use this API instead of updating the CMDB directly.
		 *
		 * @param {string} input Input payload. A JSON formatted string of configuration items to add or update.
		 * 
		 * "input": { 
		 *  "items": [Array],
		 *  "referenceItems": [Array],
		 *  "relations": [Array]
		 * }
		 * @param {{[fieldName: string]: string}} input.items Array of objects that define the items to add or update.
		 * 
		 * "items": [
		 *   { 
		 *      "className": "String",
		 *      "internal_id": "String",
		 *      "lookup": [Array},
		 *      "related": [Array],
		 *      "settings": {Object},
		 *      "sys_object_source_info": {Object}, 
		 *      "values": {Object} 
		 *   }
		 * ]
		 * @param {string} input.items.className Class/table name, sys_class_name, of the CI to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_ci_linux or cmdb_ci_win_server.
		 * @param {string} input.items.internal_id Optional. Unique item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.lookup Identifies the top-level item containing the lookup (lookup-based identification). These records are used to identify the configuration item based on a lookup table that has a reference back to cmdb_ci.
		 * 
		 * "lookup": [
		 *   {
		 *    "className": "String",
		 *    "internal_id": "String",
		 *    "sys_object_source_info": {Object},
		 *    "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.lookup.className Class/table name, sys_class_name, of the CI to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_ci_linux or cmdb_ci_win_server.
		 * @param {string} input.items.lookup.internal_id Optional. Unique item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.lookup.sys_object_source_info Optional. Defines a unique CI identifier.
		 * 
		 * "sys_object_source_info": {  
		 *   "source_feed": "String",
		 *   "source_name": "String", 
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.lookup.sys_object_source_info.source_feed Optional. If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.lookup.sys_object_source_info.source_name Optional. The data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.lookup.sys_object_source_info.source_native_key Optional. Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.lookup.sys_object_source_info.source_recency_timestamp Optional. UTC date/time that the item was scanned in the form.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.lookup.values Optional. Field information for the CI as name-value pairs, where the name is the field name. When updating reference fields, the value must be the referenced sys_id. The parameters in this object may be different for each item.
		 * @param {{[fieldName: string]: string}} input.items.related Reference to the top-level item that contains the related list. Rules in the cmdb_related_entry define what type of records can be in this array. These records are used to add items based on a related table that has a reference to the CI that is being identified. The related table may or may not extend cmdb_ci. These records are not used to identify the configuration item.
		 * 
		 * "related": [
		 *   {
		 *     "className": "String",
		 *     "internal_id": "String",
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.related.className Class/table name, sys_class_name, of the CI to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_ci_linux or cmdb_ci_win_server.
		 * @param {{[fieldName: string]: string}} input.items.related.sys_object_source_info Optional. Defines a unique CI identifier.
		 * 
		 * "sys_object_source_info": {  
		 *   "source_feed": "String",
		 *   "source_name": "String", 
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.related.sys_object_source_info.source_native_key Optional. Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.related.sys_object_source_info.source_name Optional. The data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.related.sys_object_source_info.source_feed Optional. If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.related.sys_object_source_info.source_recency_timestamp Optional. UTC date/time that the item was scanned in the form.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {string} input.items.related.internal_id Optional. Unique item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.related.values Optional. Field information for the CI as name-value pairs, where the name is the field name. When updating reference fields, the value must be the referenced sys_id. The parameters in this object may be different for each item.
		 * @param {{[fieldName: string]: string}} input.items.settings Optional. Parameters that define the types of updates that are permitted.
		 * 
		 * "settings": { 
		 *   "updateWithoutDowngrade": "String",
		 *   "updateWithoutSwitch": "String", 
		 *   "updateWithoutUpgrade": "String"
		 * }
		 * @param {string} input.items.settings.updateWithoutDowngrade Optional. Flag that indicates whether update and downgrade are both permitted for this item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but downgrade is not permitted.
		 * *   false: Both item update and downgrade are permitted.
		 * 
		 * Default: false
		 * @param {string} input.items.settings.updateWithoutSwitch Optional. Flag that indicates whether the item can be updated and the class switched.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but class switching is not permitted.
		 * *   false: Both item update and class switching are permitted.
		 * 
		 * Default: false
		 * @param {string} input.items.settings.updateWithoutUpgrade Optional. Flag that indicates whether update and upgrade are both permitted for this item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but upgrade is not permitted.
		 * *   false: Both item update and upgrade are permitted.
		 * 
		 * Default: false
		 * @param {{[fieldName: string]: string}} input.items.sys_object_source_info Optional. Defines a unique CI identifier.
		 * 
		 * "sys_object_source_info": {  
		 *   "source_feed": "String",
		 *   "source_name": "String", 
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.sys_object_source_info.source_feed Optional. If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.sys_object_source_info.source_name Optional. The data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.sys_object_source_info.source_native_key Optional. Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.sys_object_source_info.source_recency_timestamp Optional. UTC date/time that the item was scanned in the form.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.values Optional. Field information for the CI as name-value pairs, where the name is the field name. When updating reference fields, the value must be the referenced sys_id. The parameters in this object may be different for each item.
		 * @param {{[fieldName: string]: string}} input.relations Optional. Array of objects that specify relationships between items in the input payload.
		 * 
		 * This array can be in one of two formats.
		 * 
		 * The first format uses item indexes. You can only use this format to specify relations between top-level items (main items).
		 * 
		 * "relations": [
		 *   { 
		 *     "child": Number,
		 *     "parent": Number, 
		 *     "type": "String" 
		 *   }
		 * ]
		 * 
		 * Use the second format to specify relationships that include non top-level items (related or lookup items).
		 * 
		 * "relations": [
		 *   { 
		 *     "child_id": "String",
		 *     "parent_id": "String", 
		 *     "type": "String" 
		 *   } 
		 * ]
		 * 
		 * If the relationship is between top-level items, you can use either format. You must use the second format when using internal_ids.
		 * @param {number} input.relations.child Optional. Integer index of the child item in the items array.
		 * @param {string} input.relations.child_id Optional. internal_id of the child item in the relation.
		 * @param {number} input.relations.parent Optional. Integer index of the parent item in the items array.
		 * @param {string} input.relations.parent_id Optional. internal_id of the parent item in the relation (item.related or item.lookup item).
		 * @param {string} input.relations.type Optional. Relationship type. This value must be one of the name field values in the CI Relationship Type [cmdb_rel_type] table.
		 * @param {{[fieldName: string]: string}} input.referenceItems Optional. Array of objects that define references between items in the input payload.
		 * 
		 * "referenceItems": [
		 *   { 
		 *     "referenced": "String", 
		 *     "referencedBy": "String", 
		 *     "referenceField": "String" 
		 *   }
		 * ]
		 * @param {string} input.referenceItems.referenced Optional. internal_id of the item referenced by the referencedBy item.
		 * @param {string} input.referenceItems.referencedBy Optional. internal_id of the item that has a reference to the referenced item.
		 * @param {string} input.referenceItems.referenceField Optional. Name of the reference field in the referencedBy item’s class/table.
		 * @param {string} source Optional. The data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 *
		 * @returns {any} Sys_id of the relationship CI created or updated.
		 * 
		 * Data type: String
		 */
		createOrUpdateCI(input: string, source: string): any
		
		/**
		 *
		 * Insert or update configuration items and non-cmdb configuration items, classes not extending from cmdb_ci, in the CMDB based on identification and reconciliation rules. Use this API instead of updating the CMDB directly.
		 *
		 * In addition to providing the functionality of the createOrUpdateCI() method, this method also supports:
		 * 		 * 
		 * 		 * *   Handling partial payloads
		 * 		 * *   Handling partial commits
		 * 		 * *   Removing duplicates items within a payload
		 * 		 * *   Generating output summaries
		 * 		 * 
		 * 		 * For additional information on IRE and more detailed explanations of the data used by this method, see [Identification and Reconciliation (IRE)](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/configuration-management/concept/ire.html).
		 * 		 * 
		 * 		 * Note: Use this API instead of updating the CMDB directly.
		 *
		 * @param {string} input Input payload. A JSON formatted string of configuration items to add or update.
		 * 
		 * "input": { 
		 *  "items": [Array],
		 *  "referenceItems": [Array],
		 *  "relations": [Array]
		 * }
		 * @param {{[fieldName: string]: string}} input.items Array of objects that define the items to add or update.
		 * 
		 * "items": [
		 *   { 
		 *      "className": "String",
		 *      "internal_id": "String",
		 *      "lookup": [Array},
		 *      "related": [Array],
		 *      "settings": {Object},
		 *      "sys_object_source_info": {Object}, 
		 *      "values": {Object} 
		 *   }
		 * ]
		 * @param {string} input.items.className Class/table name, sys_class_name, of the CI to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_ci_linux or cmdb_ci_win_server.
		 * @param {string} input.items.internal_id Optional. Unique item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.lookup Identifies the top-level item containing the lookup (lookup-based identification). These records are used to identify the configuration item based on a lookup table that has a reference back to cmdb_ci.
		 * 
		 * "lookup": [
		 *   {
		 *    "className": "String",
		 *    "internal_id": "String",
		 *    "sys_object_source_info": {Object},
		 *    "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.lookup.className Class/table name, sys_class_name, of the CI to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_ci_linux or cmdb_ci_win_server.
		 * @param {string} input.items.lookup.internal_id Optional. Unique lookup item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.lookup.sys_object_source_info Optional. Defines a unique CI identifier.
		 * 
		 * "sys_object_source_info": {  
		 *   "source_feed": "String",
		 *   "source_name": "String", 
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.lookup.sys_object_source_info. source_feed Optional. If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.lookup.sys_object_source_info. source_name Optional. The data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.lookup.sys_object_source_info. source_native_key Optional. Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.lookup.sys_object_source_info. source_recency_timestamp Optional. UTC date/time that the item was scanned in the form.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.lookup.values Optional. Field information for the CI as name-value pairs, where the name is the field name. When updating reference fields, the value must be the referenced sys_id. The parameters in this object may be different for each item.
		 * @param {{[fieldName: string]: string}} input.items.related Reference to the top-level item that contains the related list. Rules in the cmdb_related_entry define what type of records can be in this array. These records are used to add items based on a related table that has a reference to the CI that is being identified. The related table may or may not extend cmdb_ci. These records are not used to identify the configuration item.
		 * 
		 * "related": [
		 *   {
		 *     "className": "String",
		 *     "internal_id": "String",
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.related.className Class/table name, sys_class_name, of the CI to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_ci_linux or cmdb_ci_win_server.
		 * @param {string} input.items.related.internal_id Optional. Unique related item identifier for the associated payload
		 * @param {{[fieldName: string]: string}} input.items.related.sys_object_source_info Optional. Defines a unique CI identifier.
		 * 
		 * "sys_object_source_info": {  
		 *   "source_feed": "String",
		 *   "source_name": "String", 
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.related.sys_object_source_info. source_feed Optional. If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.related.sys_object_source_info. source_name Optional. The data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.related.sys_object_source_info. source_native_key Optional. Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.related.sys_object_source_info. source_recency_timestamp Optional. UTC date/time that the item was scanned in the form.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.related.values Optional. Field information for the CI as name-value pairs, where the name is the field name. When updating reference fields, the value must be the referenced sys_id. The parameters in this object may be different for each item.
		 * @param {{[fieldName: string]: string}} input.items.settings Optional. Parameters that define the types of updates that are permitted.
		 * 
		 * "settings": { 
		 *   "updateWithoutDowngrade": "String",
		 *   "updateWithoutSwitch": "String", 
		 *   "updateWithoutUpgrade": "String"
		 * }
		 * @param {string} input.items.settings.updateWithoutDowngrade Optional. Flag that indicates whether update and downgrade are both permitted for this item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but downgrade is not permitted.
		 * *   false: Both item update and downgrade are permitted.
		 * 
		 * Default: false
		 * @param {string} input.items.settings.updateWithoutSwitch Optional. Flag that indicates whether the item can be updated and the class switched.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but class switching is not permitted.
		 * *   false: Both item update and class switching are permitted.
		 * 
		 * Default: false
		 * @param {string} input.items.settings.updateWithoutUpgrade Optional. Flag that indicates whether update and upgrade are both permitted for this item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but upgrade is not permitted.
		 * *   false: Both item update and upgrade are permitted.
		 * 
		 * Default: false
		 * @param {{[fieldName: string]: string}} input.items.sys_object_source_info Optional. Defines a unique CI identifier.
		 * 
		 * "sys_object_source_info": {  
		 *   "source_feed": "String",
		 *   "source_name": "String", 
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.sys_object_source_info.source_feed Optional. If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.sys_object_source_info.source_name Optional. The data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.sys_object_source_info.source_native_key Optional. Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.sys_object_source_info.source_recency_timestamp Optional. UTC date/time that the item was scanned in the form.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.values Optional. Field information for the CI as name-value pairs, where the name is the field name. When updating reference fields, the value must be the referenced sys_id. The parameters in this object may be different for each item.
		 * @param {{[fieldName: string]: string}} input.referenceItems Optional. Array of objects that define references between items in the input payload.
		 * 
		 * "referenceItems": [
		 *   { 
		 *     "referenced": "String", 
		 *     "referencedBy": "String", 
		 *     "referenceField": "String" 
		 *   }
		 * ]
		 * @param {string} input.referenceItems.referenced Optional. internal_id of the item referenced by the referencedBy item.
		 * @param {string} input.referenceItems.referencedBy Optional. internal_id of the item that has a reference to the referenced item.
		 * @param {string} input.referenceItems.referenceField Optional. Name of the reference field in the referencedBy item’s class/table.
		 * @param {{[fieldName: string]: string}} input.relations Optional. Array of objects that specify relationships between items in the input payload.
		 * 
		 * This array can be in one of two formats.
		 * 
		 * The first format uses item indexes. You can only use this format to specify relations between top-level items (main items).
		 * 
		 * "relations": [
		 *   { 
		 *     "child": Number,
		 *     "parent": Number, 
		 *     "type": "String" 
		 *   }
		 * ]
		 * 
		 * Use the second format to specify relationships that include non top-level items (related or lookup items).
		 * 
		 * "relations": [
		 *   { 
		 *     "child_id": "String",
		 *     "parent_id": "String", 
		 *     "type": "String" 
		 *   } 
		 * ]
		 * 
		 * If the relationship is between top-level items, you can use either format. You must use the second format when using internal_ids.
		 * @param {number} input.relations.child Optional. Integer index of the child item in the items array.
		 * @param {string} input.relations.child_id Optional. internal_id of the child item in the relation.
		 * @param {number} input.relations.parent Optional. Integer index of the parent item in the items array.
		 * @param {string} input.relations.parent_id Optional. internal_id of the parent item in the relation (item.related or item.lookup item).
		 * @param {string} input.relations.type Optional. Relationship type. This value must be one of the name field values in the CI Relationship Type [cmdb_rel_type] table.
		 * @param {{[fieldName: string]: string}} options Optional, but {} or null must be passed-in. Options to enable or disable features.
		 * 
		 * Note: By default or if partial_payloads is set to true, both partial_commits and deduplicate_payloads are enabled, even if they are set to false, as those features are essential for partial payloads functionality.
		 * 
		 * "options": { 
		 *   "deduplicate_payloads": "Boolean", 
		 *   "partial_commits": "Boolean",
		 *   "partial_payloads": "Boolean",
		 *   "generate_summary": "Boolean" 
		 * }
		 * @param {boolean} options.deduplicate_payloads Optional. Flag that indicates whether de-duplicate payload support is enabled. De-duplicate payload tells IRE whether to ignore or merge duplicate items.
		 * 
		 * Valid values:
		 * 
		 * *   true: Ignore duplicate items.
		 * *   false: Merge duplicates items.
		 * 
		 * Default: true
		 * @param {boolean} options.partial_commits Optional. Flag that indicates whether partial commits support is enabled. For additional information on partial commits, see [Enhanced IRE features](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/configuration-management/concept/ire.html).
		 * 
		 * Valid values:
		 * 
		 * *   true: Partial commits enabled.
		 * *   false: Partial commits disabled.
		 * 
		 * Default: true
		 * @param {boolean} options.partial_payloads Optional. Flag that indicates whether partial payload support is enabled. For additional information on partial payloads, see [Enhanced IRE features](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/configuration-management/concept/ire.html) and [Create an IRE data source rule](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/configuration-management/task/create-ire-data-source-rule.html).
		 * 
		 * Valid values:
		 * 
		 * *   true: Partial payload enabled.
		 * *   false: Partial payload disabled.
		 * 
		 * Default: true
		 * @param {boolean} options.generate_summary Optional. Flag that indicates whether the summary contains extended information such as the following:
		 * 
		 * Valid values:
		 * 
		 * *   true: Include extended information in the summary.
		 * *   false: Do not include extended information in the summary.
		 * 
		 * Default: false
		 * @param {string} source Optional. Identifies the data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 *
		 * @returns {any} Number of items that generated a warning when processed.
		 * 
		 * Data type: Number
		 */
		createOrUpdateCIEnhanced(input: string, options: {[fieldName: string]: string}, source: string): any
		
		/**
		 *
		 * Determines the operation (insert/update) to perform with the specified payload without committing the operation in the database.
		 *
		 * This works just like createOrUpdateCI(), but does not commit the result.
		 *
		 * @param {string} jsonString A JSON formatted string of configuration items to be added or updated. Each input string is in the format  'items: [{}], relations:[{}]', where each item within the items and relations lists contains name-value pairs.
		 * 
		 * The possible name-value pairs within the items list are:
		 * 
		 * *   className - the sys_class_name of the CI to be created or updated.
		 * *   values:{} - the field information for the CI as name-value pairs, where the name is the field name.
		 * *   lookup:[{}] - a list of records with each item having name-value pairs like the items list.
		 * 
		 * The possible name-value pairs within the relations list are:
		 * 
		 * *   parent - index of the parent item in the dependency relation
		 * *   child - index of the child item in the dependency relation
		 * *   type - the relationship type. This is one of the name field values from the cmdb_rel_type table.
		 *
		 * @returns {string} A JSON formatted string that is a list of results. Each result string is in the format  'items: [{}], relations:[{}]', where each item within the items and relations lists contains name-value pairs.
		 * 
		 * The possible name-value pairs within the items list are:
		 * 
		 * *   className- the sys_class_name for the CI that was updated or created.
		 * *   operation, which is one of INSERT, UPDATE, UPDATE_WITH_UPGRADE, UPDATE_WITH_DOWNGRADE, UPDATE_WITH_SWITCH, DELETE, NO_CHANGE
		 * *   sysId - the sys_id of the CI that was updated or created.
		 * *   relatedSysIds - a list of sys_id values of CIs used during lookup based identification.
		 * *   identifierEntrySysId - sys_id of identifier entry used during matching.
		 * *   errors - a list of errors in the format of (error, message string), where error can be ABANDONED, INVALID_INPUT_DATA, IDENTIFICATION_RULE_MISSING, IDENTIFICATION_RULE_FOR_LOOKUP_MISSING, NO_LOOKUP_RULES_FOR_DEPENDENT_CI, NO_CLASS_NAME_FOR_INDEPENDENT_CI, MISSING_DEPENDENCY, MULTIPLE_DEPENDENCIES, MULTIPLE_DUPLICATE_RECORDS, RELATION_CHAIN_ENDS_AT_QUALIFIER, QUALIFICATION_LOOP, TYPE_CONFLICT_IN_QUALIFICATION, MULTI_MATCH, REQUIRED_ATTRIBUTE_EMPTY, RECLASSIFICATION_NOT_ALLOWED
		 * *   duplicateIndices - a list of indexes of items that are duplicates of the current item.
		 * *   identificationAttempts - a list of attempts in the format of (attributes, identiferName, attemptResult, searchOnTable) where
		 *     *   attributes - the attributes of identifier entry used during identification
		 *     *   identiferName - the CI identifier to which this identifier entry belongs
		 *     *   attemptResult - one of SKIPPED, NO_MATCH, MATCHED, MULTI_MATCH
		 *     *   searchOnTable - the table searched during the identification process.
		 * 
		 * The possible name-value pairs within the relations list are:
		 * 
		 * *   className - the relationship CI's class name and is always cmdb_rel_ci
		 * *   operation - one of INSERT, UPDATE, NO_CHANGE
		 * *   sysId - the sys_id of the relationship CI inserted or updated
		 */
		identifyCI(jsonString: string): string
		
		/**
		 *
		 * Runs an identification audit against the specified configuration item (CI) to detect duplicates.
		 *
		 * If duplicates are found, duplication tasks are created. Only use this method on CI types with independent identification rules.
		 *
		 * @param {GlideRecord} gr The CI on which to run the audit to detect duplicates. The CI must have independent identification rules.
		 *
		 * @returns {void} Method does not return a value
		 */
		runIdentificationAudit(gr: GlideRecord): void
		
	}
	
}