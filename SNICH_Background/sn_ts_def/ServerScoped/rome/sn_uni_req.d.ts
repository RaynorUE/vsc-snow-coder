declare namespace sn_uni_req {

	/** 
	 * The UniversalRequestUtilsSNC API requires the Universal Request (com.snc.universal_request) plugin and is provided within the `sn_uni_req` namespace.
	 * 
	 * For information, refer to [Universal Request](https://docs.servicenow.com/bundle/rome-employee-service-management/page/product/universal-request/concept/ur-landing-limitedaccess.html).
	 * 
	 */
	class UniversalRequestUtilsSNC {
	
		/**
		 *
		 * Creates a universal request and returns the sys_id of the newly created universal request record.
		 *
		 * This method is called using the UniversalRequestUtils prototype in the sn_uni_req namespace. For example, `sn_uni_req.UniversalRequestUtils().createUniversalRequest(<copyFields>)`.
		 *
		 * @param {{[fieldName: string]: string}} copyFields JSON object containing field names and values to set on a new record in the Universal Requests [universal_request] table.
		 * 
		 * Provide details by field name and field value in the format `{ '<field_name>': '<field_value>' }`. The following fields are considered the most useful details to assign to a primary ticket.
		 * 
		 *     
		 *     {
		 *       'assignment_group': 'String',
		 *       'assigned_to': 'String',
		 *       'contact_type': 'String',
		 *       'description': 'String',
		 *       'opened_by': 'String',
		 *       'opened_for': 'String',
		 *       'priority': 'String',
		 *       'restricted': Boolean,
		 *       'short_description': 'String'
		 *     };
		 * 
		 * Other fields not listed might be eligible for your use case. For a list of table fields and related fields in the system, view the [data dictionary](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/managing-data/concept/c_DataDictionaryTables.html).
		 * 
		 * Note: Do not include the primary_ticket or sys_id fields in the copyFields JSON object.
		 * @param {string} copyFields.assignment_group Optional. Sys_id of the group assigned to the resource. Located in the Group [sys_user_group] table.
		 * 
		 * Default: Default assignment group is set per assignment rules.
		 * @param {string} copyFields.contact_type Optional. Method by which the resource was initially reported.
		 * 
		 * Possible values:
		 * 
		 * *   chat
		 * *   email
		 * *   phone
		 * *   social
		 * *   web
		 * 
		 * Maximum length: 40
		 * @param {string} copyFields.description Optional. Detailed description of the problem associated with the resource.
		 * 
		 * Maximum length: 4,000
		 * @param {string} copyFields.opened_by Optional. Sys_id of the person that initially opened the resource. Located in the User [sys_user] table.
		 * @param {string} copyFields.opened_for Optional. Required for HR Service Delivery cases. The sys_id of the user for whom the resource was opened.
		 * @param {string} copyFields.priority Optional. Priority of the resource. Specified as a number.
		 * 
		 * Possible values:
		 * 
		 * *   1: Critical
		 * *   2: High
		 * *   3: Moderate
		 * *   4: Low
		 * 
		 * Default: 3
		 * @param {boolean} copyFields.restricted Optional. Flag that indicates if the universal request has restricted access. Refer to [Universal Request roles and groups](https://docs.servicenow.com/bundle/rome-employee-service-management/page/product/universal-request/concept/ur-roles.html).
		 * 
		 * Valid values:
		 * 
		 * *   true: Universal request is only accessible to users with the `sn_uni_req.sensitiveinfo_agent` role. Users with this role have permissions to view sensitive information, such as payroll details.
		 * *   false: Universal request access is unrestricted.
		 * 
		 * Default: false
		 * @param {string} copyFields.short_description Concise description of the resource.
		 * 
		 * Maximum length: 160
		 *
		 * @returns {string} Sys_id of the newly created universal request record.
		 */
		createUniversalRequest(copyFields: {[fieldName: string]: string}): string
		
	}
	
}