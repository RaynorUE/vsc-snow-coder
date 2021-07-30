declare namespace sn_cmdb {

	/** 
	 * When using this class in a scoped application, use the sn_cmdb namespace identifier.
	 * 
	 */
	class IdentificationEngine {
	
		/**
		 *
		 * Inserts or updates configuration items and non-Configuration Management Database (CMDB) configuration items (classes not extending from cmdb_ci) in the CMDB based on identification and reconciliation rules. Use this API instead of updating the CMDB directly.
		 *
		 * @param {string} input Required. Input payload. A JSON formatted string of configuration items to add or update.
		 * 
		 * "input" { 
		 *  "items": [Array],
		 *  "referenceItems": [Array],
		 *  "relations": [Array]
		 * }
		 * @param {{[fieldName: string]: string}} input.items Array of objects that define the items to add or update.
		 * 
		 * "items": [
		 *   { 
		 *     "className": "String", 
		 *     "internal_id": "String", 
		 *     "lookup": [Array],
		 *     "related": [Array],
		 *     "settings": {Object},
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.className Required. Class/table name, sys_class_name, of the configuration item (CI) to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_ci_linux_server or cmdb_ci_win_server.
		 * @param {string} input.items.internal_id Unique item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.lookup Identifies the top-level item containing the lookup (lookup-based identification). These records are used to identify the configuration item based on a lookup table that has a reference back to cmdb_ci.
		 * 
		 * For example:
		 * 
		 * "lookup": [
		 *   {
		 *     "className": "String",
		 *     "internal_id": "String",
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.lookup.className Required. Class/table name, sys_class_name, of the configuration item (CI) to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_serial_number or cmdb_ci_network_adapter.
		 * @param {string} input.items.lookup.internal_id Unique item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.lookup.sys_object_source_info Unique CI identifier for a specific source.
		 * 
		 * "sys_object_source_info": { 
		 *   "source_feed": "String",
		 *   "source_name": "String",  
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.lookup.sys_object_source_info.source_feed If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.lookup.sys_object_source_info.source_name Data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.lookup.sys_object_source_info.source_native_key Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.lookup.sys_object_source_info.source_recency_timestamp UTC date and time that the item was scanned.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.lookup.values Fields to create or update for this related item as name/value pairs, where the name is the field name. For a reference field, the value must be the referenced sys_id.
		 * 
		 * Field names and types depend on the fields selected by the user, such as:
		 * 
		 * "values": {
		 *   "host_name": "String",
		 *   "ip_address": "String",
		 *   "name": "String",
		 *   "os_name": "String",
		 *   "sys_class_name": "String"
		 * }
		 * @param {{[fieldName: string]: string}} input.items.related Reference to the top-level item that contains the related list. Rules in the Related Entry [cmdb_related_entry] define what type of records can be in this array. These records are used to add items based on a related table that has a reference to the CI that is being identified.
		 * 
		 * The related table may or may not extend cmdb_ci. These records are not used to identify the configuration item.
		 * 
		 * "related" [
		 *   {
		 *     "className": "String",
		 *     "internal_id": "String",
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.related.className Required. Class/table name, sys_class_name, of the configuration item (CI) to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_software_instance or cmdb_key_value.
		 * @param {string} input.items.related.internal_id Unique item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.related.sys_object_source_info Unique CI identifier for a specific source.
		 * 
		 * "sys_object_source_info": { 
		 *   "source_feed": "String",
		 *   "source_name": "String",  
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.related.sys_object_source_info.source_feed If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.related.sys_object_source_info.source_name Data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.related.sys_object_source_info.source_native_key Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.related.sys_object_source_info.source_recency_timestamp UTC date and time that the item was scanned.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.related.values Fields to create or update for this related item as name/value pairs, where the name is the field name. For a reference field, the value must be the referenced sys_id.
		 * 
		 * Field names and types depend on the fields selected by the user, such as:
		 * 
		 * "values": {
		 *   "host_name": "String",
		 *   "ip_address": "String",
		 *   "name": "String",
		 *   "os_name": "String",
		 *   "sys_class_name": "String"
		 * }
		 * @param {{[fieldName: string]: string}} input.items.settings Parameters that define the types of updates that are permitted.
		 * 
		 * "settings": { 
		 *   "skipReclassificationRestrictionRules": Boolean, 
		 *   "updateWithoutDowngrade": Boolean, 
		 *   "updateWithoutSwitch": Boolean,
		 *   "updateWithoutUpgrade": Boolean
		 * }
		 * @param {boolean} input.items.settings.skipReclassificationRestrictionRules Flag that indicates whether IRE should not run the Reclassification Restriction rule that matches the class for the payload item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Skip running the rule.
		 * *   false: Run the rule.
		 * 
		 * Default: false
		 * @param {boolean} input.items.settings.updateWithoutDowngrade Flag that indicates whether update and downgrade are both permitted for this item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but downgrade is not permitted.
		 * *   false: Both item update and downgrade are permitted.
		 * 
		 * Default: false
		 * @param {boolean} input.items.settings.updateWithoutUpgrade Flag that indicates whether update and upgrade are both permitted for this item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but upgrade is not permitted.
		 * *   false: Both item update and upgrade are permitted.
		 * 
		 * Default: false
		 * @param {boolean} input.items.settings.updateWithoutSwitch Flag that indicates whether the item can be updated and the class switched.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but class switching is not permitted.
		 * *   false: Both item update and class switching are permitted.
		 * 
		 * Default: false
		 * @param {{[fieldName: string]: string}} input.items.sys_object_source_info Unique CI identifier for a specific source.
		 * 
		 * "sys_object_source_info": { 
		 *   "source_feed": "String",
		 *   "source_name": "String",  
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.sys_object_source_info.source_feed If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.sys_object_source_info.source_name Data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.sys_object_source_info.source_native_key Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.sys_object_source_info.source_recency_timestamp UTC date and time that the item was scanned.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.values Fields to create or update for this related item as name/value pairs, where the name is the field name. For a reference field, the value must be the referenced sys_id.
		 * 
		 * Field names and types depend on the fields selected by the user, such as:
		 * 
		 * "values": {
		 *   "host_name": "String",
		 *   "ip_address": "String",
		 *   "name": "String",
		 *   "os_name": "String",
		 *   "sys_class_name": "String"
		 * }
		 * @param {{[fieldName: string]: string}} input.referenceItems Array of objects that define references between items in the input payload.
		 * 
		 * "referenceItems": [
		 *   { 
		 *     "referenced": "String", 
		 *     "referencedBy": "String", 
		 *     "referenceField": "String" 
		 *   }
		 * ]
		 * @param {string} input.referenceItems.referenced The internal_id defined for the item being referenced by another item.
		 * @param {string} input.referenceItems.referencedBy The internal_id defined for the item that references another item.
		 * @param {string} input.referenceItems.referenceField Name of the reference field in the class/table for the referencedBy item.
		 * @param {{[fieldName: string]: string}} input.relations Array of objects that specify relationships between items in the input payload.
		 * 
		 * An object in this array can use either of two formats.
		 * 
		 * *   The object can define a relationship between two top-level items (only) using parent and child name-value pairs, with values representing item indexes from the payload items array.
		 *     
		 *     "relations": [
		 *       {
		 *         "child": Number,
		 *         "parent": Number,
		 *         "sys_rel_source_info": {Object},
		 *         "type": "String"
		 *       }
		 *     ]
		 *     
		 * *   The object can define a relationship between any two items, including top-level, related, or lookup items, using parent_id and child_id key/value pairs, with values representing internal_id values defined for those items.
		 *     
		 *     "relations": [
		 *       {
		 *         "child_id": "String",
		 *         "parent_id": "String",
		 *         "sys_rel_source_info": {Object},
		 *         "type": "String"
		 *       }
		 *     ]
		 * @param {number} input.relations.child Integer index of the CI object in the items array that represents the child in the relationship (items, items.related, or items.lookup.)
		 * @param {string} input.relations.child_id The internal_id of the child item in the relation (items, items.related, or items.lookup.)
		 * @param {number} input.relations.parent Integer index of the parent item in the items array (items, items.related, or items.lookup.)
		 * @param {string} input.relations.parent_id The internal_id of the parent item in the relation (items, items.related, or items.lookup.)
		 * @param {{[fieldName: string]: string}} input.relations.sys_rel_source_info Discovery source information for the relationship. For non-dependency relationships, this information is saved in the Relationship Sources [sys_rel_source] table (not persisted for identifyCIEnhanced() or identifyCI() methods.)
		 * 
		 * Data type: Object
		 * 
		 * "sys_rel_source_info": { 
		 *   "source_name": "String", 
		 *   "source_feed": "String" 
		 * }
		 * @param {string} input.relations.sys_rel_source_info.source_name Discovery source name.
		 * 
		 * Default: Discovery source passed in the API method parameter.
		 * @param {string} input.relations.sys_rel_source_info.source_feed Any string that is a sub-discovery/scan within the discovery source.
		 * 
		 * Default: ‘UNKNOWN’ is stored in the source_feed column when creating a record in sys_rel_source table.
		 * @param {string} input.relations.type Type of relationship that exists between the parent and child items. This must be a name field value from the CI Relationship Type [cmdb_rel_type] table.
		 * @param {string} source Identifies the data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the cmdb_ci table.
		 *
		 * @returns {any} Sys_id of the dependent relationship CI.
		 * 
		 * Data type: String
		 */
		createOrUpdateCI(input: string, source: string): any
		
		/**
		 *
		 * Inserts or updates configuration items and non-Configuration Management Database (CMDB) configuration items (classes not extending from cmdb_ci) in the CMDB based on identification and reconciliation rules. Use this API instead of updating the CMDB directly.
		 *
		 * In addition to providing the functionality of the createOrUpdateCI() method, this method also supports:
		 * 		 * 
		 * 		 * *   Handling partial payloads
		 * 		 * *   Handling partial commits
		 * 		 * *   Removing duplicate items within a payload
		 * 		 * *   Generating output summaries
		 * 		 * 
		 * 		 * For additional information on IRE and more detailed explanations of the data used by this method, see [Identification and Reconciliation (IRE)](https://docs.servicenow.com/bundle/quebec-servicenow-platform/page/product/configuration-management/concept/ire.html).
		 *
		 * @param {string} input Required. Input payload. A JSON formatted string of configuration items to add or update.
		 * 
		 * "input" { 
		 *  "items": [Array],
		 *  "referenceItems": [Array],
		 *  "relations": [Array]
		 * }
		 * @param {{[fieldName: string]: string}} input.items Array of objects that define the items to add or update.
		 * 
		 * "items": [
		 *   { 
		 *     "className": "String", 
		 *     "internal_id": "String", 
		 *     "lookup": [Array],
		 *     "related": [Array],
		 *     "settings": {Object},
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.className Required. Class/table name, sys_class_name, of the configuration item (CI) to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_ci_linux_server or cmdb_ci_win_server.
		 * @param {string} input.items.internal_id Unique item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.lookup Identifies the top-level item containing the lookup (lookup-based identification). These records are used to identify the configuration item based on a lookup table that has a reference back to cmdb_ci.
		 * 
		 * For example:
		 * 
		 * "lookup": [
		 *   {
		 *     "className": "String",
		 *     "internal_id": "String",
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.lookup.className Required. Class/table name, sys_class_name, of the configuration item (CI) to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_serial_number or cmdb_ci_network_adapter.
		 * @param {string} input.items.lookup.internal_id Unique lookup item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.lookup.sys_object_source_info Defines a unique CI identifier for a specific data source. Different sources may have different name-value pairs for the same CI.
		 * 
		 * "sys_object_source_info": { 
		 *   "source_feed": "String",
		 *   "source_name": "String",  
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.lookup.sys_object_source_info.source_feed If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.lookup.sys_object_source_info.source_name Data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.lookup.sys_object_source_info.source_native_key Unique key-id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.lookup.sys_object_source_info.source_recency_timestamp UTC date/time that the item was scanned.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.lookup.values Field information for the CI as name-value pairs, where the name is the field name. When updating reference fields, the value must be the referenced sys_id.
		 * 
		 * Field names and types depend on the fields selected by the user, such as:
		 * 
		 * "values": {
		 *   "serial_number": "String",
		 *   "serial_number_type": "String",
		 *   "valid": "String",
		 *   "ip_address": "String",
		 *   "mac_address": "String"
		 * }
		 * @param {{[fieldName: string]: string}} input.items.related Reference to the top-level item that contains the related list. Rules in the Related Entry [cmdb_related_entry] define what type of records can be in this array. These records are used to add items based on a related table that has a reference to the CI that is being identified.
		 * 
		 * The related table may or may not extend cmdb_ci. These records are not used to identify the configuration item.
		 * 
		 * "related" [
		 *   {
		 *     "className": "String",
		 *     "internal_id": "String",
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.related.className Required. Class/table name, sys_class_name, of the configuration item (CI) to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_software_instance or cmdb_key_value.
		 * @param {string} input.items.related.internal_id Unique identifier for this related item in this payload. Can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.related.sys_object_source_info Object that makes up a unique CI identifier for a specified data source. Different sources may have different name-value pairs for the same CI.
		 * 
		 * "sys_object_source_info": { 
		 *   "source_feed": "String",
		 *   "source_name": "String",  
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.related.sys_object_source_info.source_feed If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.related.sys_object_source_info.source_name Identifies the data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.related.sys_object_source_info.source_native_key Unique key/ID from the source for the related item.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.related.sys_object_source_info.source_recency_timestamp UTC date and time that the item was scanned.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.related.values Fields to create or update for this related item as name/value pairs, where the name is the field name. For a reference field, the value must be the referenced sys_id.
		 * 
		 * Field names and types depend on the fields selected by the user, such as:
		 * 
		 * "values": {
		 *   "host_name": "String",
		 *   "ip_address": "String",
		 *   "name": "String",
		 *   "os_name": "String",
		 *   "sys_class_name": "String"
		 * }
		 * @param {{[fieldName: string]: string}} input.items.settings Parameters that define the types of updates that are permitted.
		 * 
		 * "settings": { 
		 *   "skipReclassificationRestrictionRules": Boolean, 
		 *   "updateWithoutDowngrade": Boolean, 
		 *   "updateWithoutSwitch": Boolean,
		 *   "updateWithoutUpgrade": Boolean
		 * }
		 * @param {boolean} input.items.settings.skipReclassificationRestrictionRules Flag that indicates whether IRE should not run the Reclassification Restriction rule that matches the class for the payload item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Skip running the rule.
		 * *   false: Run the rule.
		 * 
		 * Default: false
		 * @param {boolean} input.items.settings.updateWithoutDowngrade Flag that indicates whether update and downgrade are both permitted for this item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but downgrade is not permitted.
		 * *   false: Both item update and downgrade are permitted.
		 * 
		 * Default: false
		 * @param {boolean} input.items.settings.updateWithoutSwitch Flag that indicates whether the item can be updated and the class switched.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but class switching is not permitted.
		 * *   false: Both item update and class switching are permitted.
		 * 
		 * Default: false
		 * @param {boolean} input.items.settings.updateWithoutUpgrade Flag that indicates whether update and upgrade are both permitted for this item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but upgrade is not permitted.
		 * *   false: Both item update and upgrade are permitted.
		 * 
		 * Default: false
		 * @param {{[fieldName: string]: string}} input.items.sys_object_source_info Unique CI identifier for a specific source.
		 * 
		 * "sys_object_source_info": { 
		 *   "source_feed": "String",
		 *   "source_name": "String",  
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.sys_object_source_info.source_feed If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.sys_object_source_info.source_name Data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.sys_object_source_info.source_native_key Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.sys_object_source_info.source_recency_timestamp UTC date and time that the item was scanned.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.values Fields to create or update for this related item as name/value pairs, where the name is the field name. For a reference field, the value must be the referenced sys_id.
		 * 
		 * Field names and types depend on the fields selected by the user, such as:
		 * 
		 * "values": {
		 *   "host_name": "String",
		 *   "ip_address": "String",
		 *   "name": "String",
		 *   "os_name": "String",
		 *   "sys_class_name": "String"
		 * }
		 * @param {{[fieldName: string]: string}} input.referenceItems Array of objects that define references between items in the input payload.
		 * 
		 * "referenceItems": [
		 *   { 
		 *     "referenced": "String", 
		 *     "referencedBy": "String", 
		 *     "referenceField": "String" 
		 *   }
		 * ]
		 * @param {string} input.referenceItems.referenced The internal_id defined for the item being referenced by another item.
		 * @param {string} input.referenceItems.referencedBy The internal_id defined for the item that references another item.
		 * @param {string} input.referenceItems.referenceField Name of the reference field in the class/table for the referencedBy item.
		 * @param {{[fieldName: string]: string}} input.relations Array of objects that specify relationships between items in the input payload.
		 * 
		 * An object in this array can use either of two formats.
		 * 
		 * *   The object can define a relationship between two top-level items (only) using parent and child name-value pairs, with values representing item indexes from the payload items array.
		 *     
		 *     "relations": [
		 *       {
		 *         "child": Number,
		 *         "parent": Number,
		 *         "sys_rel_source_info": {Object},
		 *         "type": "String"
		 *       }
		 *     ]
		 *     
		 * *   The object can define a relationship between any two items, including top-level, related, or lookup items, using parent_id and child_id key/value pairs, with values representing internal_id values defined for those items.
		 *     
		 *     "relations": [
		 *       {
		 *         "child_id": "String",
		 *         "parent_id": "String",
		 *         "sys_rel_source_info": {Object},
		 *         "type": "String"
		 *       }
		 *     ]
		 * @param {number} input.relations.child Integer index of the CI object in the items array that represents the child in the relationship (items, items.related, or items.lookup.)
		 * @param {string} input.relations.child_id The internal_id of the child item in the relation (items, items.related, or items.lookup.)
		 * @param {number} input.relations.parent Integer index of the parent item in the items array (items, items.related, or items.lookup.)
		 * @param {string} input.relations.parent_id The internal_id of the parent item in the relation (items, items.related, or items.lookup.)
		 * @param {{[fieldName: string]: string}} input.relations.sys_rel_source_info Discovery source information for the relationship. For non-dependency relationships, this information is saved in the Relationship Sources [sys_rel_source] table (not persisted for identifyCIEnhanced() or identifyCI() methods.)
		 * 
		 * Data type: Object
		 * 
		 * "sys_rel_source_info": { 
		 *   "source_name": "String", 
		 *   "source_feed": "String" 
		 * }
		 * @param {string} input.relations.sys_rel_source_info.source_name Discovery source name.
		 * 
		 * Default: Discovery source passed in the API method parameter.
		 * @param {string} input.relations.sys_rel_source_info.source_feed Any string that is a sub-discovery/scan within the discovery source.
		 * 
		 * Default: ‘UNKNOWN’ is stored in the source_feed column when creating a record in sys_rel_source table.
		 * @param {string} input.relations.type Type of relationship that exists between the parent and child items. This must be a name field value from the CI Relationship Type [cmdb_rel_type] table.
		 * @param {{[fieldName: string]: string}} options Optional, but {} or null must be passed-in. Options to enable or disable features.
		 * 
		 * Note: By default or if partial_payloads is set to true, both partial_commits and deduplicate_payloads are enabled, even if they are set to false, as those features are essential for partial payloads functionality.
		 * 
		 * "options": { 
		 *  "deduplicate_payloads": "Boolean",
		 *  "generate_summary": "Boolean", 
		 *  "partial_commits": "Boolean", 
		 *  "partial_payloads": "Boolean"
		 * }
		 * @param {boolean} options.deduplicate_payloads Flag that indicates whether duplicate items are merged or considered errors.
		 * 
		 * Valid values:
		 * 
		 * *   true: Merge duplicate items.
		 * *   false: Consider duplicate items as errors.
		 * 
		 * Default: true
		 * @param {boolean} options.generate_summary Flag that indicates whether the returned results contain summary information. For the details of the returned summary information, see <String>.summary in the return results table.
		 * 
		 * Valid values:
		 * 
		 * *   true: Include summary information.
		 * *   false: Do not include summary information.
		 * 
		 * Default: false
		 * @param {boolean} options.partial_commits Flag that indicates whether partial commit support is enabled. For additional information on partial commits, see [Enhanced IRE features](https://docs.servicenow.com/bundle/quebec-servicenow-platform/page/product/configuration-management/concept/ire.html).
		 * 
		 * Valid values:
		 * 
		 * *   true: Partial commit enabled.
		 * *   false: Partial commit disabled.
		 * 
		 * Default: true
		 * @param {boolean} options.partial_payloads Flag that indicates whether partial payload support is enabled. For additional information on partial payloads, see [Enhanced IRE features](https://docs.servicenow.com/bundle/quebec-servicenow-platform/page/product/configuration-management/concept/ire.html) and [Create an IRE data source rule](https://docs.servicenow.com/bundle/quebec-servicenow-platform/page/product/configuration-management/task/create-ire-data-source-rule.html).
		 * 
		 * Valid values:
		 * 
		 * *   true: Partial payload enabled.
		 * *   false: Partial payload disabled.
		 * 
		 * Default: true
		 * @param {string} source Data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
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
		 * *   className - Sys_class_name of the CI to be created or updated.
		 * *   values:{} - Field information for the CI as name-value pairs, where the name is the field name.
		 * *   lookup:[{}] - List of records with each item having name-value pairs like the items list.
		 * 
		 * The possible name-value pairs within the relations list are:
		 * 
		 * *   parent - Index of the parent item in the dependency relation
		 * *   child - Index of the child item in the dependency relation
		 * *   type - Relationship type. This is one of the name field values from the cmdb_rel_type table.
		 *
		 * @returns {string} A JSON formatted string that is a list of results. Each result string is in the format  'items: [{}], relations:[{}]', where each item within the items and relations lists contains name-value pairs.
		 * 
		 * The possible name-value pairs within the items list are:
		 * 
		 * *   className - Sys_class_name for the CI that was updated or created.
		 * *   operation - Operation to perform, which is one of the following:
		 *     *   DELETE
		 *     *   INSERT
		 *     *   NO_CHANGE
		 *     *   UPDATE
		 *     *   UPDATE_WITH_DOWNGRADE
		 *     *   UPDATE_WITH_SWITCH
		 *     *   UPDATE_WITH_UPGRADE
		 * *   sysId - Sys_id of the CI that was updated or created.
		 * *   relatedSysIds - List of sys_id values of CIs used during lookup based identification.
		 * *   identifierEntrySysId - Sys_id of identifier entry used during matching.
		 * *   errors - List of errors in the format of (error, message string)
		 * *   duplicateIndices - List of indexes of items that are duplicates of the current item.
		 * *   identificationAttempts - List of attempts in the format of (attributes, identiferName, attemptResult, searchOnTable) where
		 *     *   attributes - Attributes of identifier entry used during identification
		 *     *   identiferName - CI identifier to which this identifier entry belongs
		 *     *   attemptResult - One of SKIPPED, NO_MATCH, MATCHED, MULTI_MATCH
		 *     *   searchOnTable - Table searched during the identification process.
		 * 
		 * The possible name-value pairs within the relations list are:
		 * 
		 * *   className - Relationship CI's class name and is always cmdb_rel_ci
		 * *   operation - Type of operation: INSERT, UPDATE, NO_CHANGE
		 * *   sysId - Sys_id of the relationship CI inserted or updated
		 */
		identifyCI(jsonString: string): string
		
		/**
		 *
		 * Determines the Configuration Management Database (CMDB) operation (insert/update) to perform with the specified payload (request body), without committing the operations in the database.
		 *
		 * Use this method to simulate submission of a payload.
		 * 		 * 
		 * 		 * This method is similar to the [IdentificationEngine - identifyCI(String jsonString)](dev.do#!/reference/api/quebec/server/sn_cmdb-namespace/IdentificationEngineScopedAPI#IESS-identifyCI_S "Determines the operation (insert/update) to perform with the specified payload without committing the operation in the database.") method, however it also supports the following functionality:
		 * 		 * 
		 * 		 * *   Partial payloads
		 * 		 *     *   In case of an item having a warning or error, indicates if an item operation is INSERT_AS_PARTIAL or INSERT_INCOMPLETE.
		 * 		 *     *   Returns the sys_ids of partial payloads that were merged with existing partial payloads.
		 * 		 * *   Supports payload deduplicate feature.
		 * 		 * *   Generates a summary.
		 *
		 * @param {string} input Required. Input payload. A JSON formatted string of configuration items to add or update.
		 * 
		 * "input" { 
		 *  "items": [Array],
		 *  "referenceItems": [Array],
		 *  "relations": [Array]
		 * }
		 * @param {{[fieldName: string]: string}} input.items Array of objects that define the items to add or update.
		 * 
		 * "items": [
		 *   { 
		 *     "className": "String", 
		 *     "internal_id": "String", 
		 *     "lookup": [Array],
		 *     "related": [Array],
		 *     "settings": {Object},
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.className Required. Class/table name, sys_class_name, of the configuration item (CI) to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_ci_linux_server or cmdb_ci_win_server.
		 * @param {string} input.items.internal_id Unique item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.lookup Identifies the top-level item containing the lookup (lookup-based identification). These records are used to identify the configuration item based on a lookup table that has a reference back to cmdb_ci.
		 * 
		 * For example:
		 * 
		 * "lookup": [
		 *   {
		 *     "className": "String",
		 *     "internal_id": "String",
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.lookup.className Required. Class/table name, sys_class_name, of the configuration item (CI) to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_serial_number or cmdb_ci_network_adapter.
		 * @param {string} input.items.lookup.internal_id Unique lookup item identifier for the associated payload.
		 * 
		 * This can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.lookup.sys_object_source_info Defines a unique CI identifier for a specific data source. Different sources may have different name-value pairs for the same CI.
		 * 
		 * "sys_object_source_info": { 
		 *   "source_feed": "String",
		 *   "source_name": "String",  
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.lookup.sys_object_source_info.source_feed If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.lookup.sys_object_source_info.source_name Data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.lookup.sys_object_source_info.source_native_key Unique key-id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.lookup.sys_object_source_info.source_recency_timestamp UTC date/time that the item was scanned.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.lookup.values Field information for the CI as name-value pairs, where the name is the field name. When updating reference fields, the value must be the referenced sys_id.
		 * 
		 * Field names and types depend on the fields selected by the user, such as:
		 * 
		 * "values": {
		 *   "serial_number": "String",
		 *   "serial_number_type": "String",
		 *   "valid": "String",
		 *   "ip_address": "String",
		 *   "mac_address": "String"
		 * }
		 * @param {{[fieldName: string]: string}} input.items.related Reference to the top-level item that contains the related list. Rules in the Related Entry [cmdb_related_entry] define what type of records can be in this array. These records are used to add items based on a related table that has a reference to the CI that is being identified.
		 * 
		 * The related table may or may not extend cmdb_ci. These records are not used to identify the configuration item.
		 * 
		 * "related" [
		 *   {
		 *     "className": "String",
		 *     "internal_id": "String",
		 *     "sys_object_source_info": {Object},
		 *     "values": {Object}
		 *   }
		 * ]
		 * @param {string} input.items.related.className Required. Class/table name, sys_class_name, of the configuration item (CI) to create or update.
		 * 
		 * This value can be any CMDB class/table, such as cmdb_software_instance or cmdb_key_value.
		 * @param {string} input.items.related.internal_id Unique identifier for this related item in this payload. Can be any value, but must be unique within the payload.
		 * @param {{[fieldName: string]: string}} input.items.related.sys_object_source_info Object that makes up a unique CI identifier for a specified data source. Different sources may have different name-value pairs for the same CI.
		 * 
		 * "sys_object_source_info": { 
		 *   "source_feed": "String",
		 *   "source_name": "String",  
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.related.sys_object_source_info.source_feed If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.related.sys_object_source_info.source_name Identifies the data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.related.sys_object_source_info.source_native_key Unique key/ID from the source for the related item.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.related.sys_object_source_info.source_recency_timestamp UTC date and time that the item was scanned.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.related.values Fields to create or update for this related item as name/value pairs, where the name is the field name. For a reference field, the value must be the referenced sys_id.
		 * 
		 * Field names and types depend on the fields selected by the user, such as:
		 * 
		 * "values": {
		 *   "host_name": "String",
		 *   "ip_address": "String",
		 *   "name": "String",
		 *   "os_name": "String",
		 *   "sys_class_name": "String"
		 * }
		 * @param {{[fieldName: string]: string}} input.items.settings Parameters that define the types of updates that are permitted.
		 * 
		 * "settings": { 
		 *   "skipReclassificationRestrictionRules": Boolean, 
		 *   "updateWithoutDowngrade": Boolean, 
		 *   "updateWithoutSwitch": Boolean,
		 *   "updateWithoutUpgrade": Boolean
		 * }
		 * @param {boolean} input.items.settings.skipReclassificationRestrictionRules Flag that indicates whether IRE should not run the Reclassification Restriction rule that matches the class for the payload item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Skip running the rule.
		 * *   false: Run the rule.
		 * 
		 * Default: false
		 * @param {boolean} input.items.settings.updateWithoutDowngrade Flag that indicates whether update and downgrade are both permitted for this item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but downgrade is not permitted.
		 * *   false: Both item update and downgrade are permitted.
		 * 
		 * Default: false
		 * @param {boolean} input.items.settings.updateWithoutSwitch Flag that indicates whether the item can be updated and the class switched.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but class switching is not permitted.
		 * *   false: Both item update and class switching are permitted.
		 * 
		 * Default: false
		 * @param {boolean} input.items.settings.updateWithoutUpgrade Flag that indicates whether update and upgrade are both permitted for this item.
		 * 
		 * Valid values:
		 * 
		 * *   true: Update the item but upgrade is not permitted.
		 * *   false: Both item update and upgrade are permitted.
		 * 
		 * Default: false
		 * @param {{[fieldName: string]: string}} input.items.sys_object_source_info Unique CI identifier for a specific source.
		 * 
		 * "sys_object_source_info": { 
		 *   "source_feed": "String",
		 *   "source_name": "String",  
		 *   "source_native_key": "String",
		 *   "source_recency_timestamp": "String"
		 * }
		 * @param {string} input.items.sys_object_source_info.source_feed If the source can have multiple feeds, use this field to provide the name of the feed sending this item.
		 * 
		 * The data source generates this feed name. It can be any string that uniquely identifies the source feed.
		 * @param {string} input.items.sys_object_source_info.source_name Data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 * @param {string} input.items.sys_object_source_info.source_native_key Unique key/id for the item from the source.
		 * 
		 * The data source generates this key. It can be any string that is unique to the item.
		 * @param {string} input.items.sys_object_source_info.source_recency_timestamp UTC date and time that the item was scanned.
		 * 
		 * Format: YYYY-MM-DD hh:mm:ss
		 * @param {{[fieldName: string]: string}} input.items.values Fields to create or update for this related item as name/value pairs, where the name is the field name. For a reference field, the value must be the referenced sys_id.
		 * 
		 * Field names and types depend on the fields selected by the user, such as:
		 * 
		 * "values": {
		 *   "host_name": "String",
		 *   "ip_address": "String",
		 *   "name": "String",
		 *   "os_name": "String",
		 *   "sys_class_name": "String"
		 * }
		 * @param {{[fieldName: string]: string}} input.referenceItems Array of objects that define references between items in the input payload.
		 * 
		 * "referenceItems": [
		 *   { 
		 *     "referenced": "String", 
		 *     "referencedBy": "String", 
		 *     "referenceField": "String" 
		 *   }
		 * ]
		 * @param {string} input.referenceItems.referenced The internal_id defined for the item being referenced by another item.
		 * @param {string} input.referenceItems.referencedBy The internal_id defined for the item that references another item.
		 * @param {string} input.referenceItems.referenceField Name of the reference field in the class/table for the referencedBy item.
		 * @param {{[fieldName: string]: string}} input.relations Array of objects that specify relationships between items in the input payload.
		 * 
		 * An object in this array can use either of two formats.
		 * 
		 * *   The object can define a relationship between two top-level items (only) using parent and child name-value pairs, with values representing item indexes from the payload items array.
		 *     
		 *     "relations": [
		 *       {
		 *         "child": Number,
		 *         "parent": Number,
		 *         "sys_rel_source_info": {Object},
		 *         "type": "String"
		 *       }
		 *     ]
		 *     
		 * *   The object can define a relationship between any two items, including top-level, related, or lookup items, using parent_id and child_id key/value pairs, with values representing internal_id values defined for those items.
		 *     
		 *     "relations": [
		 *       {
		 *         "child_id": "String",
		 *         "parent_id": "String",
		 *         "sys_rel_source_info": {Object},
		 *         "type": "String"
		 *       }
		 *     ]
		 * @param {number} input.relations.child Integer index of the CI object in the items array that represents the child in the relationship (items, items.related, or items.lookup.)
		 * @param {string} input.relations.child_id The internal_id of the child item in the relation (items, items.related, or items.lookup.)
		 * @param {number} input.relations.parent Integer index of the parent item in the items array (items, items.related, or items.lookup.)
		 * @param {string} input.relations.parent_id The internal_id of the parent item in the relation (items, items.related, or items.lookup.)
		 * @param {{[fieldName: string]: string}} input.relations.sys_rel_source_info Discovery source information for the relationship. For non-dependency relationships, this information is saved in the Relationship Sources [sys_rel_source] table (not persisted for identifyCIEnhanced() or identifyCI() methods.)
		 * 
		 * Data type: Object
		 * 
		 * "sys_rel_source_info": { 
		 *   "source_name": "String", 
		 *   "source_feed": "String" 
		 * }
		 * @param {string} input.relations.sys_rel_source_info.source_name Discovery source name.
		 * 
		 * Default: Discovery source passed in the API method parameter.
		 * @param {string} input.relations.sys_rel_source_info.source_feed Any string that is a sub-discovery/scan within the discovery source.
		 * 
		 * Default: ‘UNKNOWN’ is stored in the source_feed column when creating a record in sys_rel_source table.
		 * @param {string} input.relations.type Type of relationship that exists between the parent and child items. This must be a name field value from the CI Relationship Type [cmdb_rel_type] table.
		 * @param {{[fieldName: string]: string}} options Optional, but {} or null must be passed-in. Options to enable or disable features.
		 * 
		 * Note: By default or if partial_payloads is set to true, both partial_commits and deduplicate_payloads are enabled, even if they are set to false, as those features are essential for partial payloads functionality.
		 * 
		 * "options": { 
		 *  "deduplicate_payloads": "Boolean",
		 *  "generate_summary": "Boolean", 
		 *  "partial_commits": "Boolean", 
		 *  "partial_payloads": "Boolean"
		 * }
		 * @param {boolean} options.deduplicate_payloads Flag that indicates whether duplicate items are merged or considered errors.
		 * 
		 * Valid values:
		 * 
		 * *   true: Merge duplicate items.
		 * *   false: Consider duplicate items as errors.
		 * 
		 * Default: true
		 * @param {boolean} options.generate_summary Flag that indicates whether the returned results contain summary information. For the details of the returned summary information, see <String>.summary in the return results table.
		 * 
		 * Valid values:
		 * 
		 * *   true: Include summary information.
		 * *   false: Do not include summary information.
		 * 
		 * Default: false
		 * @param {boolean} options.partial_commits Flag that indicates whether partial commit support is enabled. For additional information on partial commits, see [Enhanced IRE features](https://docs.servicenow.com/bundle/quebec-servicenow-platform/page/product/configuration-management/concept/ire.html).
		 * 
		 * Valid values:
		 * 
		 * *   true: Partial commit enabled.
		 * *   false: Partial commit disabled.
		 * 
		 * Default: true
		 * @param {boolean} options.partial_payloads Flag that indicates whether partial payload support is enabled. For additional information on partial payloads, see [Enhanced IRE features](https://docs.servicenow.com/bundle/quebec-servicenow-platform/page/product/configuration-management/concept/ire.html) and [Create an IRE data source rule](https://docs.servicenow.com/bundle/quebec-servicenow-platform/page/product/configuration-management/task/create-ire-data-source-rule.html).
		 * 
		 * Valid values:
		 * 
		 * *   true: Partial payload enabled.
		 * *   false: Partial payload disabled.
		 * 
		 * Default: true
		 * @param {string} source Data source of the CI information. This value must be one of the choice values defined for the discovery_source field of the Configuration Item [cmdb_ci] table.
		 *
		 * @returns {any} Number of items that generated a warning when processed.
		 * 
		 * Data type: Number
		 */
		identifyCIEnhanced(input: string, options: {[fieldName: string]: string}, source: string): any
		
		/**
		 *
		 * Runs an identification audit against the specified configuration item (CI) to detect duplicates.
		 *
		 * If duplicates are found, duplication tasks are created. Only use this method on CI types with independent identification rules.
		 *
		 * @param {GlideRecord} now_GR CI on which to run the audit to detect duplicates. The CI must have independent identification rules.
		 *
		 * @returns {void} Method does not return a value
		 */
		runIdentificationAudit(now_GR: GlideRecord): void
		
	}
	
}