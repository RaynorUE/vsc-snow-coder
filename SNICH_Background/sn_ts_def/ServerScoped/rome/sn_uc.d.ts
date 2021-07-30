declare namespace sn_uc {

	/** 
	 * To use this class in a scoped application, use the sn_uc namespace identifier. The User Criteria Scoped API plugin (ID: com.glideapp.user_criteria.scoped.api) should be enabled to access the UserCriteria API.
	 * 
	 */
	class UserCriteria {
	
		/**
		 *
		 * @param {string} sys_id sys_id of the user criteria.
		 *
		 */
		constructor(sys_id: string)
		
		/**
		 *
		 * Creates a user criteria with specified values in the user_criteria table. Values specified in columnValues override the values provided via setters.
		 *
		 * @param {{[fieldName: string]: string}} columnValues Key and value pairs for a column and its value.
		 * @param {boolean} standardUpdate Set to true to enable the running of engines and workflow.
		 *
		 * @returns {string} sys_id of the created user criteria.
		 */
		create(columnValues: {[fieldName: string]: string}, standardUpdate: boolean): string
		
		/**
		 *
		 * Deletes the current user criteria.
		 *
		 *
		 * @returns {boolean} If true, the user criteria is deleted.
		 * 
		 * If false, no user criteria is found to delete.
		 */
		deleteRecord(): boolean
		
		/**
		 *
		 * Displays the mapping for the attribute and value pairs of the catalog item.
		 *
		 * @param {string} columns Array of catalog item attributes.
		 *
		 * @returns {{[fieldName: string]: string}} Mapping for the attribute and value pairs of the catalog item.
		 */
		read(columns: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Specifies if the user criteria is active.
		 *
		 * @param {boolean} active If true, the user criteria is active.
		 * 
		 * If false, the user criteria is inactive.
		 *
		 * @returns {void} Method does not return a value
		 */
		setActive(active: boolean): void
		
		/**
		 *
		 * Specifies if the user criteria has an advanced script.
		 *
		 * @param {boolean} advanced If true, the user criteria has an advanced script.
		 * 
		 * If false, the user criteria does not have an advanced script.
		 *
		 * @returns {void} Method does not return a value
		 */
		setAdvanced(advanced: boolean): void
		
		/**
		 *
		 * Sets the company property for the user criteria.
		 *
		 * @param {string} companies Comma-separated list of the company sys_ids to be set for the user criteria.
		 *
		 * @returns {void} Method does not return a value
		 */
		setCompanies(companies: string): void
		
		/**
		 *
		 * Sets the department property for the user criteria.
		 *
		 * @param {string} departments Comma-separated list of the department sys_ids to be set for the user criteria.
		 *
		 * @returns {void} Method does not return a value
		 */
		setDepartments(departments: string): void
		
		/**
		 *
		 * Sets the group property for the user criteria.
		 *
		 * @param {string} groups Comma-separated list of the group sys_ids to be set for the user criteria.
		 *
		 * @returns {void} Method does not return a value
		 */
		setGroups(groups: string): void
		
		/**
		 *
		 * Sets the location property for the user criteria.
		 *
		 * @param {string} locations Comma-separated list of the location sys_ids to be set for the user criteria.
		 *
		 * @returns {void} Method does not return a value
		 */
		setLocations(locations: string): void
		
		/**
		 *
		 * Sets the match_all property for the user criteria.
		 *
		 *
		 * @returns {void} Method does not return a value
		 */
		setMatchAll(): void
		
		/**
		 *
		 * Sets the name property for the user criteria.
		 *
		 * @param {string} name Name of the user criteria.
		 *
		 * @returns {void} Method does not return a value
		 */
		setName(name: string): void
		
		/**
		 *
		 * Sets the role property for the user criteria.
		 *
		 * @param {string} roles Comma-separated list of the role sys_ids to be set for the user criteria.
		 *
		 * @returns {void} Method does not return a value
		 */
		setRoles(roles: string): void
		
		/**
		 *
		 * Sets the script for the user criteria.
		 *
		 * @param {string} script Script to be set for the advanced user criteria.
		 *
		 * @returns {void} Method does not return a value
		 */
		setScript(script: string): void
		
		/**
		 *
		 * Sets the user property for the user criteria.
		 *
		 * @param {string} users Comma-separated list of the user sys_ids to be set for the user criteria.
		 *
		 * @returns {void} Method does not return a value
		 */
		setUsers(users: string): void
		
		/**
		 *
		 * Updates the current catalog item with the specified values.
		 *
		 * @param {{[fieldName: string]: string}} columnValues Mapping for the column name and the value pairs.
		 * @param {string} reason Reason for updating the catalog item.
		 *
		 * @returns {string} Returns the sys_id of the created user criteria.
		 */
		update(columnValues: {[fieldName: string]: string}, reason: string): string
		
	}
	
}