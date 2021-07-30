declare namespace sn_sms_pref {

	/** 
	 * This API is implemented as the script include SMSPreferenceHandlerSNC and resides in the sn_sms_pref namespace. To use this API you must install the Notify plugin (com.snc.notify) which requires a separate subscription. You can activate this plugin if you have the admin role.
	 * 
	 */
	class SMSPreferenceHandler {
	
		/**
		 *
		 * @param {string} provider Name of the telephony service provider.
		 *
		 */
		constructor(provider: string)
		
		/**
		 *
		 * Returns the preferences configuration record for the current telephony service provider.
		 *
		 * The method queries all preference configuration records from the SMS Preference Configuration [sn_sms_pref_configuration] table for the current telephony service provider, sorts the results by the Order field (lowest to highest), and then returns the first record.
		 *
		 *
		 * @returns {GlideRecord} Preference configuration record for the current telephony service provider. If no record exists, then null.
		 */
		getConfig(): GlideRecord
		
	}
	
}