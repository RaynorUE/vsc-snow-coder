declare namespace sn_cmdbgroup {

	/** 
	 * The CMDBGroupAPI is a scoped static class. To use the class you must include the namespace identifier sn_cmdbgroup before the CMDBGroupAPI object. For example:
	 * 
	 *     var response = sn_cmdbgroup.CMDBGroupAPI.getManualCIList(groupSysId, false);
	 * 
	 *   
	 *   
	 * To access this API you must have the itil or asset role.
	 * 
	 */
	class CMDBGroupAPI {
	
		/**
		 *
		 * Returns all configuration items (CIs) for the specified group. The results include all manual CIs and the list of CIs from the query builder's saved query.
		 *
		 * @param {string} groupId Sys_id of the Configuration Management Database (CMDB) group.
		 * @param {boolean} requireCompleteSet Optional, but must be passed if requireAllQueryNodesCis is passed.
		 * 
		 * Flag that indicates whether an empty string is returned if any CIs are filtered out by access control list (ACL) restrictions.
		 * 
		 * Valid values:
		 * 
		 * *   true: Return empty string.
		 * *   false: Don't return value.
		 * 
		 * Default: false
		 * @param {boolean} requireAllQueryNodesCis Optional. Flag that indicates whether to return CIs from all CMDB classes of the query.
		 * 
		 * Valid values:
		 * 
		 * *   true: Return CIs from all columns.
		 * *   false: Only return CIs from the starting node of the query builder query.
		 * 
		 * Default: false
		 *
		 * @returns {{[fieldName: string]: string}} Flag that indicates whether the method completed successfully.
		 * 
		 * Possible values:
		 * 
		 * *   true: Success
		 * *   false: Error
		 */
		getAllCI(groupId: string, requireCompleteSet: boolean, requireAllQueryNodesCis: boolean): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns all configuration items (CIs) returned from all saved query builders' query IDs for the specified group.
		 *
		 * @param {string} groupId Sys_id of the Configuration Management Database (CMDB) group.
		 * @param {boolean} requireCompleteSet Optional, but must be passed if requireAllQueryNodesCis is passed.
		 * 
		 * Flag that indicates whether an empty string is returned if any CIs are filtered out by access control list (ACL) restrictions.
		 * 
		 * Valid values:
		 * 
		 * *   true: Return empty string.
		 * *   false: Don't return value.
		 * 
		 * Default: false
		 * @param {boolean} requireAllQueryNodesCis Optional. Flag that indicates whether to return CIs from all CMDB classes of the query.
		 * 
		 * Valid values:
		 * 
		 * *   true: Return CIs from all columns.
		 * *   false: Only return CIs from the starting node of the query builder query.
		 * 
		 * Default: false
		 *
		 * @returns {{[fieldName: string]: string}} Flag that indicates whether the method completed successfully.
		 * 
		 * Possible values:
		 * 
		 * *   true: Success
		 * *   false: Error
		 */
		getAllCIFromQueryBuilder(groupId: string, requireCompleteSet: boolean, requireAllQueryNodesCis: boolean): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the CMDB group's manual CI list.
		 *
		 * @param {string} groupId The sysId of the CMDB group.
		 * @param {boolean} requireCompleteSet When true, returns an error string if any CIs are filtered out by ACL restrictions.
		 *
		 * @returns {string} A JSON formated string in the format
		 * 
		 *     { 'result':false, 
		 *     'errors':[ {'message':'Group does not exist',
		 *                 'error':'GROUP_SYS_ID_IS_NOT_FOUND'},
		 *      { } // another error if it exists 
		 *      ], 
		 *     'partialCIListDueToACLFlag':false,
		 *     'idList':['sys_id_1', 'sys_id2'] }
		 * 
		 * Where
		 * 
		 * *   result - a boolean flag. When true the method was successful.
		 * *   errors - a list of errors with a message and error code.
		 * *   partialCIListDueToACLFlag -  a Boolean flag. When true, the idList is incomplete due to an ACL restriction. When false, the idList is complete.
		 * *   idList - an array of cmdb_ci sys_ids
		 * 
		 * When not successful, returns one of the errors GROUP_SYS_ID_IS_NOT_FOUND, GROUP_SYS_ID_IS_EMPTY, FAIL_TO_INSERT_GROUP_CI_PAIR, FAIL_TO_INSERT_GROUP_QUERY_ID_PAIR, CI_CAN_NOT_FOUND, SAVED_QUERY_ID_NOT_FOUND, ERROR_DURING_QUERY_BUILDER_PROCESS_QUERY, TIMEOUT_DURING_QUERY_BUILDER_PROCESS_QUERY, NOT_COMPLETE_DURING_QUERY_BUILDER_PROCESS_QUERY, MAX_LIMIT_DURING_QUERY_BUILDER_PROCESS_QUERY, GROUP_API_TIMEOUT, EXCEPTION_FROM_EXECUTE_QUERY, SOME_CI_NOT_VISIBLE_DUE_TO_SECURITY_CONSTRAINT
		 */
		getManualCIList(groupId: string, requireCompleteSet: boolean): string
		
		/**
		 *
		 * Returns the query builder's query IDs for the specified CMDB group.
		 *
		 * @param {string} groupId The sysId of the CMDB group.
		 * @param {boolean} requireCompleteSet When true, returns an empty string if any CIs are filtered out by ACL restrictions.
		 *
		 * @returns {string} A JSON formated string in the format
		 * 
		 *     { 'result':false, 
		 *     'errors':[ {'message':'Group does not exist',
		 *                 'error':'GROUP_SYS_ID_IS_NOT_FOUND'},
		 *      { } // another error if it exists 
		 *      ], 
		 *     'partialCIListDueToACLFlag':false,
		 *     'idList':['sys_id_1', 'sys_id2'] }
		 * 
		 * Where
		 * 
		 * *   result - a boolean flag. When true the method was successful.
		 * *   errors - a list of errors with a message and error code.
		 * *   partialCIListDueToACLFlag -  a Boolean flag. When true, the idList is incomplete due to an ACL restriction. When false, the idList is complete.
		 * *   idList - an array of cmdb_ci sys_ids
		 * 
		 * When not successful, returns one of the errors GROUP_SYS_ID_IS_NOT_FOUND, GROUP_SYS_ID_IS_EMPTY, FAIL_TO_INSERT_GROUP_CI_PAIR, FAIL_TO_INSERT_GROUP_QUERY_ID_PAIR, CI_CAN_NOT_FOUND, SAVED_QUERY_ID_NOT_FOUND, ERROR_DURING_QUERY_BUILDER_PROCESS_QUERY, TIMEOUT_DURING_QUERY_BUILDER_PROCESS_QUERY, NOT_COMPLETE_DURING_QUERY_BUILDER_PROCESS_QUERY, MAX_LIMIT_DURING_QUERY_BUILDER_PROCESS_QUERY, GROUP_API_TIMEOUT, EXCEPTION_FROM_EXECUTE_QUERY, SOME_CI_NOT_VISIBLE_DUE_TO_SECURITY_CONSTRAINT
		 */
		getSavedQueryIdList(groupId: string, requireCompleteSet: boolean): string
		
		/**
		 *
		 * Sets the manual CI list for the specified group. The existing manual CI list is overwritten. CI sysIds not found in the cmdb_ci table are ignored.
		 *
		 * @param {string} groupId The sysId of the CMDB group.
		 * @param {string} ciSysIds Comma separated list of CI sysIds.
		 *
		 * @returns {string} A JSON formated string in the format
		 * 
		 *     { 'result':false, 
		 *     'errors':[ {'message':'Group does not exist',
		 *                 'error':'GROUP_SYS_ID_IS_NOT_FOUND'},
		 *      { } // another error if it exists 
		 *      ], 
		 *     'partialCIListDueToACLFlag':false,
		 *     'idList':['sys_id_1', 'sys_id2'] }
		 * 
		 * Where
		 * 
		 * *   result - a boolean flag. When true the method was successful.
		 * *   errors - a list of errors with a message and error code.
		 * *   partialCIListDueToACLFlag -  a Boolean flag. When true, the idList is incomplete due to an ACL restriction. When false, the idList is complete.
		 * *   idList - an array of cmdb_ci sys_ids
		 * 
		 * When not successful, returns one of the errors GROUP_SYS_ID_IS_NOT_FOUND, GROUP_SYS_ID_IS_EMPTY, FAIL_TO_INSERT_GROUP_CI_PAIR, FAIL_TO_INSERT_GROUP_QUERY_ID_PAIR, CI_CAN_NOT_FOUND, SAVED_QUERY_ID_NOT_FOUND, ERROR_DURING_QUERY_BUILDER_PROCESS_QUERY, TIMEOUT_DURING_QUERY_BUILDER_PROCESS_QUERY, NOT_COMPLETE_DURING_QUERY_BUILDER_PROCESS_QUERY, MAX_LIMIT_DURING_QUERY_BUILDER_PROCESS_QUERY, GROUP_API_TIMEOUT, EXCEPTION_FROM_EXECUTE_QUERY, SOME_CI_NOT_VISIBLE_DUE_TO_SECURITY_CONSTRAINT
		 */
		setManualCIList(groupId: string, ciSysIds: string): string
		
		/**
		 *
		 * Sets the saved query ID list for the specified group. The existing query ID list is overwritten. Query sysIds not found in the qb_saved_query table are ignored.
		 *
		 * @param {string} groupId The sysId of the CMDB group.
		 * @param {string} queryIds Comma separated list of saved query sysIds.
		 *
		 * @returns {string} A JSON formated string in the format
		 * 
		 *     { 'result':false, 
		 *     'errors':[ {'message':'Group does not exist',
		 *                 'error':'GROUP_SYS_ID_IS_NOT_FOUND'},
		 *      { } // another error if it exists 
		 *      ], 
		 *     'partialCIListDueToACLFlag':false,
		 *     'idList':['sys_id_1', 'sys_id2'] }
		 * 
		 * Where
		 * 
		 * *   result - a boolean flag. When true the method was successful.
		 * *   errors - a list of errors with a message and error code.
		 * *   partialCIListDueToACLFlag -  a Boolean flag. When true, the idList is incomplete due to an ACL restriction. When false, the idList is complete.
		 * *   idList - an array of cmdb_ci sys_ids
		 * 
		 * When not successful, returns one of the errors GROUP_SYS_ID_IS_NOT_FOUND, GROUP_SYS_ID_IS_EMPTY, FAIL_TO_INSERT_GROUP_CI_PAIR, FAIL_TO_INSERT_GROUP_QUERY_ID_PAIR, CI_CAN_NOT_FOUND, SAVED_QUERY_ID_NOT_FOUND, ERROR_DURING_QUERY_BUILDER_PROCESS_QUERY, TIMEOUT_DURING_QUERY_BUILDER_PROCESS_QUERY, NOT_COMPLETE_DURING_QUERY_BUILDER_PROCESS_QUERY, MAX_LIMIT_DURING_QUERY_BUILDER_PROCESS_QUERY, GROUP_API_TIMEOUT, EXCEPTION_FROM_EXECUTE_QUERY, SOME_CI_NOT_VISIBLE_DUE_TO_SECURITY_CONSTRAINT
		 */
		setSavedQueryIdList(groupId: string, queryIds: string): string
		
	}
	
}