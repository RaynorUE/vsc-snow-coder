declare namespace sn_hr_le {

	/** 
	 * Lifecycle event activity sets represent different stages in the lifecycle event process. You must define when the activity set is triggered, such as immediately upon creation of the lifecycle event case or after the completion of another activity set. Each activity set is associated with a single lifecycle event.  
	 *   
	 * The hr_ActivitySet API requires the HR Lifecycle Events plugin (com.sn_hr_lifecycle_events).  
	 *   
	 * See also [Lifecycle event case management](https://docs.servicenow.com/bundle/rome-application-development/page/product/human-resources/concept/hr-lifecycle-event-case-management.html).
	 * 
	 */
	class hr_ActivitySet {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Creates a lifecycle event case based on a specified HR service.
		 *
		 * @param {string} hrService Sys ID of HR service in the HR Services [sn_hr_core_service] table to be assigned to the lifecycle event case.
		 * @param {{[fieldName: string]: string}} caseValues Key-value pairs containing a value for each case field.
		 * @param {string} caseValues.subject_person Sys ID of subject person's name in the User [sys_user] table.
		 * @param {string} caseValues.opened_for Sys ID of case opened for subject person in the Users [sys_user] table.
		 * @param {string} caseValues.subject_person_job Sys ID of subject person's Business title in the Jobs [sn_hr_core_job] table.
		 * @param {string} caseValues.location Sys ID of subject person's location in HR profile in the Locations [cmn_location] table.
		 * @param {string} caseValues.department Sys ID of subject person's department in HR profile in the Departments [cmn_department] table.
		 * @param {string} caseValues.subject_person_hr_profile Sys ID of subject person's HR profile in the HR Profiles [sn_hr_core_profile] table.
		 * @param {string} caseValues.short_description Case description.
		 * @param {number} caseValues.state Number representing uniquely-defined custom case state.
		 *
		 * @returns {string} Sys ID of the created case in the HR Lifecycle Events Cases [sn_hr_le_case] table.
		 */
		createLECaseByService(hrService: string, caseValues: {[fieldName: string]: string}): string
		
		/**
		 *
		 * Checks for a case matching the specified combination of subject person user, HR service, and job.
		 *
		 * @param {string} spUser Sys ID of subject person user in the Users [sys_user] table.
		 * @param {string} hrService Sys ID of HR service in the HR Services [sn_hr_core_service] table.
		 * @param {string} jobId Sys ID of subject user's job title in the HR Services [sn_hr_core_service] table.
		 *
		 * @returns {boolean} True if matching case exists, false otherwise.
		 */
		hasActiveCaseByService(spUser: string, hrService: string, jobId: string): boolean
		
	}
	
	/** 
	 * The hr_ActivityUtils script include requires the HR Lifecycle Events plugin (com.sn_hr_lifecycle_events).
	 * 
	 */
	class hr_ActivityUtils {
	
		/**
		 *
		 * Creates a case from a record producer and service. This method is intended to be called as-is to create a producer and does not require supplying data.
		 *
		 * The following variables can be configured in a record producer to provide additional capabilities as follows:
		 * 		 * 
		 * 		 * *   `job` – References sn_hr_core_job and maps to subject_person_job in an HR case
		 * 		 * *   `opened_for` – References sys_user and maps opened_for in an HR case
		 * 		 * *   `concurrent_job` – If the record producer includes this variable (by activating checkbox) and parameters have job information, creates a new job in sn_hr_core_job table
		 *
		 * @param {GlideRecord} current GlideRecord for case to be created.
		 * @param {{[fieldName: string]: string}} producer Comma-separated key value pair containing data as questions and answers that are automatically provided when a user submits an answer to a record producer question.
		 * @param {string} cat_item.sys_id Looks up the HR service of case being created and variable names to populate the description.
		 *
		 * @returns {{[fieldName: string]: string}} New case in related table, varies by product.
		 */
		createCaseFromProducer(current: GlideRecord, producer: {[fieldName: string]: string}): {[fieldName: string]: string}
		
	}
	
}