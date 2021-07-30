declare namespace sn_uni_task {

	/** 
	 * With the ServiceNow Universal Task application, agents can create tasks for employees. For example, agents can ask for additional information or request an action to resolve a parent ticket or request. Universal tasks are available for any ticket type that extends the Task [task] table.  
	 *   
	 * Using this API you can change the state of active universal tasks to "Complete" or "Cancelled", obtain all active universal tasks for a specified parent task, check whether a parent universal task has any children, and apply templates to a universal task record. You can use these methods in scripts and in the Visable condition builders on the Tab configuration form to manage the data that appears on the Universal Task tab. For additional information, see [Add a Task tab on the Standard Ticket page](https://docs.servicenow.com/bundle/rome-employee-service-management/page/product/universal-task/task/config-stdtktpage-for-ut.html).  
	 *   
	 * ![Tab Configuration conditional builder example](app_store_portal_api_reference_scoped_rome_app-store_dev_portal_API_reference_UniversalTaskUtils_image_tab_config-method-imp.png)  
	 *   
	 * You can use this API in both scoped and global applications. The Universal Task application (sn_uni_task) must be installed on the associated instance to have access to this API. You must always specify the `sn_uni_task` namespace when calling methods in this API.  
	 *   
	 * For additional information on the Universal Task application, see [Universal Task](https://docs.servicenow.com/bundle/rome-employee-service-management/page/product/universal-task/concept/universal-task-landing.html).
	 * 
	 */
	class UniversalTaskUtils {
	
		/**
		 *
		 * Applies the specified universal task template to the specified universal task record.
		 *
		 * Before you can use this method, there must be universal task templates configured in your instance. For details, see [Universal Task templates](https://docs.servicenow.com/bundle/rome-employee-service-management/page/product/universal-task/concept/ut-task-template-landing.html).
		 *
		 * @param {string} templateSysId Sys_id of universal task template to apply to the specified universal task record. Located in the Universal Task Template [sn_uni_task_template] table.
		 * @param {GlideRecord} uniTaskGr GlideRecord of the universal task record to which to apply the template.
		 *
		 * @returns {void} Any errors are written to the system log.
		 */
		applyTemplate(templateSysId: string, uniTaskGr: GlideRecord): void
		
		/**
		 *
		 * Returns the active child task records, in the form of a GlideRecord, for the specified parent ticket.
		 *
		 * You can then use the GlideRecord API, [scoped](https://docs.servicenow.com/bundle/rome-application-development/page/app-store/dev_portal/API_reference/glideRecordScoped/concept/c_GlideRecordScopedAPI.html) or [global](https://docs.servicenow.com/bundle/rome-application-development/page/app-store/dev_portal/API_reference/GlideRecord/concept/c_GlideRecordAPI.html) depending on the calling application's scope, to access the returned data, such as using the getRowCount() method to count active tasks.
		 *
		 * @param {string} parentSysId Sys_id of the parent ticket whose active child tickets to return.
		 *
		 * @returns {GlideRecord} GlideRecord that contains all active child task records for the specified parent task.
		 */
		getActiveChildTasks(parentSysId: string): GlideRecord
		
		/**
		 *
		 * Checks whether the specified parent ticket has any universal tasks that are in the work-in progress or complete state.
		 *
		 * You can use this method to determine whether to show the Universal Task tab to a requester in a standard ticket configuration only if there are tasks that are work-in progress or complete.
		 *
		 * @param {GlideRecord} current GlideRecord of the parent ticket to check.
		 *
		 * @returns {string} If universal tasks are associated with the parent ticket, the sys_id of the parent ticket; otherwise null.
		 * 
		 * Data type: String
		 */
		hasTasksToShow(current: GlideRecord): string
		
		/**
		 *
		 * Changes the state of all active universal tasks under the specified parent ticket to "Cancelled".
		 *
		 * @param {string} parentSysId Sys_id of the parent ticket whose active child universal tasks' state should be changed to "Cancelled".
		 *
		 * @returns {void} 
		 */
		markActiveChildTasksCancelled(parentSysId: string): void
		
		/**
		 *
		 * Changes the state of all active child universal tasks associated with the specified parent ticket to "Complete".
		 *
		 * @param {string} parentSysId Sys_id of the parent ticket whose active child universal tasks' state should be changed to "Complete".
		 *
		 * @returns {void} 
		 */
		markActiveChildTasksCompleted(parentSysId: string): void
		
	}
	
}