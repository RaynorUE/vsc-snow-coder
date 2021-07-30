declare namespace sn_hr_core - Human Resources Core {

	/** 
	 * The hr_Utils API requires the HR core plugin (com.sn_hr_core).
	 * 
	 */
	class hr_Utils {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Gets the Sys ID of the active primary job for a provided user.
		 *
		 * @param {string} userID Sys ID of the HR user from the User [sys_user] table assigned an active or future job in which Primary is true.
		 *
		 * @returns {string} If present and active, Sys ID of the primary job from the Jobs [sn_hr_core_job] table, null otherwise.
		 */
		getPrimaryJob(userID: string): string
		
		/**
		 *
		 * Switches the primary job of a user.
		 *
		 * @param {string} userId Sys ID of HR user from the Users [sys_user] table.
		 * @param {string} jobId Job Sys ID from the Jobs [sn_hr_core_job] table.
		 *
		 * @returns {string} Encoded JSON with message and status, error otherwise.
		 */
		switchPrimaryJob(userId: string, jobId: string): string
		
	}
	
}