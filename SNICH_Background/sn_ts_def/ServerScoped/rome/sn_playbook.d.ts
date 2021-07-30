declare namespace sn_playbook {

	/** 
	 * The PlaybookExperience API requires the Playbook Experience Core plugin (com.glide.playbook_experience.config) and is provided within the sn_playbook namespace.  
	 *   
	 * This API requires at least one playbook in the Process Definition [sys_pd_process_definition] table. To use this API, you must have the roles required to view and cancel a running process in Process Automation Designer. For more information, see [Process Automation Designer](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/process-automation-designer/concept/process-automation-designer.html).
	 * 
	 */
	class PlaybookExperience {
	
		/**
		 *
		 * Cancels playbook executions for a given parent record.
		 *
		 * @param {GlideRecord} parentRecord The parent record to cancel playbook executions for. The parent record can be any record that has playbook executions, such as an interaction record or an onboarding case record.
		 * @param {string} cancellationReason The reason for cancelling the playbook executions.
		 * @param {string} scopedName Optional. The scoped name of the playbook to cancel. The scoped name is from the Process Definition [sys_pd_process_definition] table in the format `scope.name`. If provided, only executions of this playbook are cancelled for the given parent record. If not provided, all executions of all playbooks are cancelled for the given parent record.
		 * @param {string} playbookExperienceId Optional. Sys_id of the playbook experience record in the Playbook Experience [sys_playbook_experience] table to use for the cancellation. Use this parameter if you’ve defined custom activity state mappings. See [Playbook activity state mapping](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/workspace/concept/playbook-activity-state-mapping.html#playbook-activity-state-mapping).
		 * 
		 * Default: Sys_id of the Global Playbook Experience record.
		 *
		 * @returns {any} List of the skipped playbook executions. Each playbook execution is an object in the array. For descriptions of the object properties, see the canceledPlaybookContext array.
		 * 
		 * Data type: Array
		 * 
		 *     "skippedPlaybookContext": [
		 *         {
		 *           "can_read": Boolean,
		 *           "canceled_by": "String",
		 *           "cancellation_reason": "String",
		 *           "errors": [Array],
		 *           "parent_record": "String",
		 *           "parent_table": "String",
		 *           "playbook_id": "String",
		 *           "playbook_table": "String",
		 *           "scoped_name": "String",
		 *           "state": {Object},
		 *           "sys_id": "String",
		 *           "title": "String"   
		 *         }
		 *     ]
		 */
		cancelPlaybooksByParentRecord(parentRecord: GlideRecord, cancellationReason: string, scopedName: string, playbookExperienceId: string): any
		
		/**
		 *
		 * Gets a list of playbook executions for a given parent record.
		 *
		 * @param {GlideRecord} parentRecord The parent record to get playbook executions for. The parent record can be any record that can have playbook executions, such as an interaction record or an onboarding case record.
		 *
		 * @returns {any} The label of the playbook execution from the Process Executions [sys_pd_context] table.
		 * 
		 * Data type: String
		 */
		getPlaybooksForParentRecord(parentRecord: GlideRecord): any
		
		/**
		 *
		 * Checks whether a parent record has playbook executions.
		 *
		 * @param {GlideRecord} parentRecord The parent record to check for playbook executions. The parent record can be any record that can have playbook executions, such as an interaction record or an onboarding case record.
		 * @param {string} scopedName Optional. The scoped name of the playbook to check for. The scoped name is from the Process Definition [sys_pd_process_definition] table in the format `scope.name`. If provided, only executions of this playbook are checked for. If not provided, executions of all playbooks are checked for.
		 *
		 * @returns {boolean} Flag that indicates whether the parent record has playbook executions.
		 * 
		 * Valid values:
		 * 
		 * *   true: Parent record has playbook executions.
		 * *   false: Parent record doesn't have playbook executions.
		 */
		parentRecordContainsPlaybook(parentRecord: GlideRecord, scopedName: string): boolean
		
		/**
		 *
		 * Initiates a playbook for a parent record.
		 *
		 * @param {string} scopedName The scoped name of the playbook to initiate. The scoped name is from the Process Definition [sys_pd_process_definition] table in the format `scope.name`.
		 * @param {GlideRecord} parentRecord The parent record to initiate a playbook for. The parent record can be any record that can have playbook executions, such as an interaction record or an onboarding case record.
		 *
		 * @returns {string} Sys_id of the playbook execution from the Process Executions [sys_pd_context] table that was created for the parent record. Null if a playbook execution wasn't successfully created.
		 */
		triggerPlaybook(scopedName: string, parentRecord: GlideRecord): string
		
	}
	
}