declare namespace sn_hw - HistoryWalker {

	/** 
	 * It supports the ability to return a GlideRecord to a previous update count (walked GlideRecord) with the appropriate GlideElements populated. After the walked GlideRecord is retrieved, the API provides the ability to move forward and backward the update numbers navigating through its historical updates.  
	 *   
	 * To use this class in scoped and global applications, use the sn_hw namespace identifier. The History Walker plugin (com.glide.history_walker) that is enabled by default is required to access the HistoryWalker API.
	 * 
	 * Note: For offline updates, the HistoryWalker API is initiated automatically and the only two methods that you can use are: walkTo() (the input argument for this method can only be zero) and walkForward(). Other available methods cannot be invoked for offline updates.
	 * 
	 *   
	 *   
	 * The HistoryWalker API provides two ways to retrieve the audit data:
	 * 
	 * *   Using History Set: A History Set entry is created (if not available or not up to date) from the data in the Sys Audit [sys_audit] table for the record that you are going to walk through. The History Set table contains records (History Lines) with the actual changes to field values that occurred. Methods of the HistoryWalker API retrieve the history data from the generated History Lines, instead of querying the sys_audit table.
	 * *   Using Sys Audit table: In this case, the HistoryWalker API extracts data directly querying the sys_audit table.
	 * 
	 *   
	 *   
	 * By default, it populates the data to support the changes(), changesFrom(), and changesTo() methods in the walked record, as well as provides record and field level security. Additionally, it can enable journal fields and variables to be also populated in the walked GlideRecord when walking through the updates.  
	 *   
	 * This API enables you to:  
	 *   
	 * *   Apply the appropriate history/audit data to get an existing GlideRecord to the state it was in a specific update count.
	 * *   Instruct the HistoryWalker API to use sys_audit table instead of sys_history_set/sys_history_line tables to retrieve its data.
	 * *   Turn off row-level access control.
	 * *   Turn off field-level access control.
	 * *   Turn off retrieval and processing of “changes” data.
	 * *   Enable journal fields.
	 * *   Enable variables.
	 * 
	 */
	class HistoryWalker {
	
		/**
		 *
		 * @param {string} tableName Name of table containing the record to retrieve.
		 * @param {string} sydId sys_id of the record to retrieve.
		 * @param {boolean} useAudit *   If set to true, uses audit data to retrieve historic date.
		 * *   If set to false, uses history set to retrieve historic date.
		 *
		 */
		constructor(tableName: string, sydId: string, useAudit: boolean)
		
		/**
		 *
		 * Gets the update number of the current walked glide record.
		 *
		 *
		 * @returns {number} Current update number or, -1 if record is not found
		 */
		getUpdateNumber(): number
		
		/**
		 *
		 * Gets the record filled with the history/audit data after walking to an update number.
		 *
		 *
		 * @returns {GlideRecord} The walked GlideRecord.
		 */
		getWalkedRecord(): GlideRecord
		
		/**
		 *
		 * Returns a copy of the record filled with the history/audit data after walking to an update number.
		 *
		 * Note: The getWalkedRecord() API might modify the obtained walkedRecord after walking to another update number. The getWalkedRecordCopy() API gets a clone to the walked record to prevent that.
		 *
		 *
		 * @returns {GlideRecord} A copy of the walked GlideRecord.
		 */
		getWalkedRecordCopy(): GlideRecord
		
		/**
		 *
		 * Specifies if the record-level read access is applied on the record when retrieving from the database.
		 *
		 *
		 * @returns {boolean} Returns true if field level security is enabled, else returns false.
		 */
		isFieldLevelSecurity(): boolean
		
		/**
		 *
		 * Specifies if the record-level read access is applied on the record when retrieving from the database.
		 *
		 *
		 * @returns {boolean} Returns true if the record-level security is enabled, else returns false.
		 */
		isRecordLevelSecurity(): boolean
		
		/**
		 *
		 * Specifies if any of the methods that walk the record from one update to another, support the “changes” data for each element.
		 *
		 *
		 * @returns {boolean} Returns true if the changes support is enabled, else returns false.
		 */
		isWithChanges(): boolean
		
		/**
		 *
		 * Specifies if journal type fields are populated from the historical values.
		 *
		 *
		 * @returns {boolean} Returns true if journal fields are populated, else returns false.
		 */
		isWithJournalFields(): boolean
		
		/**
		 *
		 * Specifies if values are set for variables that are recorded in the history.
		 *
		 *
		 * @returns {boolean} Returns true if including values for variables, else returns false.
		 */
		isWithVariables(): boolean
		
		/**
		 *
		 * Sets the field-level read access on each element before setting the historical value of that element in the GlideRecord. If the field-level security is enabled, it prevents the API to populate the fields of the walked record that the user of the API does not have access to.
		 *
		 * @param {boolean} fieldLevelSecurity If set to true, field-level security is enabled. The default value is true.
		 *
		 * @returns {void} Method does not return a value
		 */
		setFieldLevelSecurity(fieldLevelSecurity: boolean): void
		
		/**
		 *
		 * Sets the record-level read access on the record when retrieving from the database. The record-level security prevents the API to retrieve the walked record if the user of the API does not have access to the GlideRecord.
		 *
		 * @param {boolean} recordLevelSecurity If set to true, record-level read access security is enabled. The default value is true.
		 *
		 * @returns {void} Method does not return a value
		 */
		setRecordLevelSecurity(recordLevelSecurity: boolean): void
		
		/**
		 *
		 * Sets the “changes” data support for each element for a method that walks the record from one update to another.
		 *
		 * @param {boolean} withChanges If set to true, the “changes” data is supported for each element. The default value is true.
		 *
		 * @returns {void} Method does not return a value
		 */
		setWithChanges(withChanges: boolean): void
		
		/**
		 *
		 * Specifies if journal type fields are populated from the historical values.
		 *
		 * @param {boolean} withJournalFields If set to true, include journal-type fields. Th default value is false.
		 *
		 * @returns {void} Method does not return a value
		 */
		setWithJournalFields(withJournalFields: boolean): void
		
		/**
		 *
		 * Specifies if variables are populated from the historical values.
		 *
		 * @param {boolean} withVariables If set to true, values are populated for variables. The default value is false.
		 *
		 * @returns {void} Method does not return a value
		 */
		setWithVariables(withVariables: boolean): void
		
		/**
		 *
		 * Applies the appropriate history/audit data to get a walked GlideRecord to the state when it was one update number backward. If the previous update count is missing from the history/audit data, it will walk to the previous available update count.
		 *
		 *
		 * @returns {boolean} Returns true if walking to the specified update number was possible. Else, returns false, for example if already walked to the update number 0.
		 */
		walkBackward(): boolean
		
		/**
		 *
		 * Applies the appropriate history/audit data to get a walked GlideRecord to the state when it was one update number forward. If next update count is missing from the history/audit data, it will walk to the next available update count.
		 *
		 *
		 * @returns {boolean} Returns true if walking to the specified update number was possible. Else, returns false, for example if already walked to the GlideRecord update count.
		 */
		walkForward(): boolean
		
		/**
		 *
		 * Applies the appropriate history/audit data to get a GlideRecord to the state it was in a specific update count. Use getWalkedRecord() or getWalkedRecordCopy() after walking to an update number to retrieve the “walked” GlideRecord.
		 *
		 * @param {number} updateCount The update number to walk to.
		 *
		 * @returns {boolean} true if walking to the specified update number was possible, false otherwise, for example if the requested update is greater than the update count of the GlideRecord, or if there is no history/audit data of the requested update number
		 */
		walkTo(updateCount: number): boolean
		
	}
	
}