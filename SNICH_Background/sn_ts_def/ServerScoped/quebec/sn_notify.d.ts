declare namespace sn_notify {

	/** 
	 * Access the scoped Notify class and its associated methods from the sn_notify namespace.
	 * 
	 */
	class Notify {
	
		/**
		 *
		 * Calls the specified E.164-compliant telephone number.
		 *
		 * @param {string} notifyPhoneNumber Notify phone number from which to make the call. When you initiate a call, the outgoing call workflow for the number group associated with this number runs. Ensure this workflow includes a join conference call activity to connect the user to the conference call.
		 * @param {string} toPhoneNumber Phone number to call. Called numbers are added to the conference call.
		 * @param {GlideRecord} conferenceCall Optional. If this parameter is passed in, the callers identified in the toPhoneNumber parameter are automatically joined into the conference call identified by this record.
		 * 
		 * GlideRecord for the Notify Call [notify_call] table which identifies the conference call record. This record is automatically added to the outgoing call workflow scratchpad as the workflow.scratchpad.conference_call variable.
		 * @param {string} userSysId Optional. Unique identifier (sys_id) of the user associated with the call.
		 * @param {string} groupSysId Optional. Unique identifier (sys_id) of the group associated with the call.
		 * @param {GlideRecord} sourceRecord Optional. Source record that prompted this call.
		 *
		 * @returns {void} Method does not return a value
		 */
		call(notifyPhoneNumber: string, toPhoneNumber: string, conferenceCall: GlideRecord, userSysId: string, groupSysId: string, sourceRecord: GlideRecord): void
		
		/**
		 *
		 * Creates a new conference call GlideRecord.
		 *
		 * @param {GlideRecord} sourceRecord Optional. Record that initiated the request to create the conference call. Used to populate the source and table fields on notify_conference_call record.
		 *
		 * @returns {GlideRecord} New Notify conference call [notify_conference_call] record.
		 */
		conferenceCall(sourceRecord: GlideRecord): GlideRecord
		
		/**
		 *
		 * Resumes a call after it was put in a queue (on hold).
		 *
		 * Use this method to resume calls that were put in a queue with the queueCall() method.
		 *
		 * @param {GlideRecord} callRecord GlideRecord object on the Notify Call [notify_call] table with the held call you want to resume.
		 *
		 * @returns {void} Method does not return a value
		 */
		dequeueCall(callRecord: GlideRecord): void
		
		/**
		 *
		 * Forwards the specified call to a different call recipient.
		 *
		 * @param {{[fieldName: string]: string}} call Notify call record or the telephony provider call ID, of the call to be forwarded.
		 * @param {{[fieldName: string]: string}} destination Notify phone number record or an E.164-compliant phone number, of the caller to which to forward the call.
		 * @param {string} dtmf Dual Tone - Multi Frequency (DTMF) code to send upon call connection.
		 *
		 * @returns {void} Method does not return a value
		 */
		forwardCall(call: {[fieldName: string]: string}, destination: {[fieldName: string]: string}, dtmf: string): void
		
		/**
		 *
		 * Returns a list of client sessions that are available to receive calls.
		 *
		 * @param {string} notifyNumber Valid Notify phone number.
		 *
		 * @returns {{[fieldName: string]: string}} GlideRecord from the notify_client_session table for the specified phone number.
		 * 
		 * Returns "0" if there are no available client sessions.
		 */
		getAvailableClients(notifyNumber: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns all phone numbers and short codes available to Notify.
		 *
		 *
		 * @returns {any[]} List of NotifyPhoneNumber objects, each object representing one phone number available to Notify.
		 */
		getPhoneNumbers(): any[]
		
		/**
		 *
		 * Returns all short codes available to Notify.
		 *
		 *
		 * @returns {void} Method does not return a value
		 */
		getShortCodes(): void
		
		/**
		 *
		 * Returns client tokens for any active telephony drivers for use in WebRTC or mobile clients.
		 *
		 * This method uses the currently logged-in user record as the client.
		 *
		 * @param {GlideRecord} record GlideRecord to use to identify the Notify client, such as a group record or a user record.
		 *
		 * @returns {string} Web RTC tokens for the supported drivers, as a JSON string with the following format: {driverName1: “token1”, driverName2: “token2”}, such as "TwilioDirect":"eyJhxxxx.eyJleHAiOiIxxxx.7fejxxx_mbLxxx"
		 */
		getTokens(record: GlideRecord): string
		
		/**
		 *
		 * Returns the maximum amount of time that a client session stays active for a specified telephony driver before automatically timing out.
		 *
		 * @param {string} owner Name of the telephony driver for which to retrieve the session length.
		 * 
		 * Valid values:
		 * 
		 * *   Twilio: for the old driver
		 * *   TwilioDirect: for the new driver
		 *
		 * @returns {number} Maximum length of the session (in seconds).
		 * 
		 * Default: 1800 seconds
		 */
		getTokenTTL(owner: string): number
		
		/**
		 *
		 * Determines whether the specified phone number has the specified capability.
		 *
		 * The telephony driver associated with the phone number contains a list of all of the capabilities of the phone.
		 * 		 * 
		 * 		 * Note: In the base system, the Notify JS driver only has 'show_speakers' as a capability; this can be modified.
		 *
		 * @param {string} notifyPhoneNumber Phone number for which to check for the specified capability.
		 * @param {string} capability Capability to detect. The string text must be an exact match to what is in the phone.
		 *
		 * @returns {boolean} Flag that indicates whether the specified phone has the specified capability.
		 * 
		 * *   true: phone has the capability
		 * *   false: phone does not have the capability
		 */
		hasCapability(notifyPhoneNumber: string, capability: string): boolean
		
		/**
		 *
		 * Removes the specified caller from the current Notify conference call.
		 *
		 * @param {GlideRecord} participant GlideRecord object containing the Notify Participant [notify_participant] record of the caller to remove from the conference call.
		 *
		 * @returns {void} Method does not return a value
		 */
		kick(participant: GlideRecord): void
		
		/**
		 *
		 * Performs one or more activities on an active Notify phone call.
		 *
		 * Use this method to change the behavior of a call. For example, transferring a call, playing audio, or forcing a hangup.
		 * 		 * 
		 * 		 * Note: The scoped implementation of this method only supports custom Notify activities. Unlike the global implementation, it does not provide a NotifyAction API. For details on how to create a custom Notify activity, see [Notify workflow activities](https://docs.servicenow.com/bundle/quebec-servicenow-platform/page/administer/workflow-activities/concept/c_NotifyActivities.html).
		 *
		 * @param {GlideRecord} callRecord Notify Call [notify_call] record of the call for which to apply the actions.
		 * @param {{[fieldName: string]: string}} notifyAction NotifyAction object describing one or more activities to perform on the call.
		 *
		 * @returns {void} Method does not return a value
		 */
		modifyCall(callRecord: GlideRecord, notifyAction: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Mutes the specified conference call participant.
		 *
		 * @param {GlideRecord} participantRecord GlideRecord from the notify_participant table for the participant to mute.
		 *
		 * @returns {void} Method does not return a value
		 */
		mute(participantRecord: GlideRecord): void
		
		/**
		 *
		 * Puts the specified call into a queue (on hold).
		 *
		 * Resume a queued call using the dequeueCall() method.
		 *
		 * @param {GlideRecord} callRecord GlideRecord object of the Notify Call record (notify_call table) to put on hold.
		 *
		 * @returns {void} Method does not return a value
		 */
		queueCall(callRecord: GlideRecord): void
		
		/**
		 *
		 * Sends a specified SMS message to the specified list of Notify clients (phone numbers).
		 *
		 * @param {{[fieldName: string]: string}} notifyPhoneNumber Phone number from which the SMS message is being sent.
		 * @param {string} toPhoneNumbers Comma separated list phone numbers to which to send the SMS message.
		 * 
		 * Format: E.164-compliant
		 * @param {string} messageBody SMS text to send.
		 * @param {GlideRecord} source Source record that prompted this SMS message, such as an incident.
		 *
		 * @returns {string} Null
		 */
		sendBulkSMS(notifyPhoneNumber: {[fieldName: string]: string}, toPhoneNumbers: string, messageBody: string, source: GlideRecord): string
		
		/**
		 *
		 * Sends an SMS text message to an E.164-compliant phone number.
		 *
		 * This method creates a new record on the Notify Message [notify_message] table and associates it with the source record.
		 *
		 * @param {{[fieldName: string]: string}} notifyPhoneNumber Notify phone number or short code to which to send this SMS message.
		 * @param {string} toPhoneNumber E.164-compliant phone number to which to send the SMS message.
		 * @param {string} messageBody SMS text message.
		 * @param {GlideRecord} source Source record that prompted this SMS message, such as an incident.
		 *
		 * @returns {string} Unique message SID; stored in the Notify Message [notify_message] record as message_id.
		 */
		sendSMS(notifyPhoneNumber: {[fieldName: string]: string}, toPhoneNumber: string, messageBody: string, source: GlideRecord): string
		
		/**
		 *
		 * Unmutes the specified conference call participant.
		 *
		 * @param {GlideRecord} participantRecord GlideRecord from the notify_participant table for the participant to unmute.
		 *
		 * @returns {void} Method does not return a value
		 */
		unmute(participantRecord: GlideRecord): void
		
	}
	
	/** 
	 * Access the scoped NotifyPhoneNumber API and its associated methods in the sn_notify namespace.
	 * 
	 */
	class NotifyPhoneNumber {
	
		/**
		 *
		 * Returns the international dialing code for a Notify phone number.
		 *
		 *
		 * @returns {string} International phone code for a country.
		 */
		getDialCode(): string
		
		/**
		 *
		 * Returns the ID of this phone number as defined by the telephony provider.
		 *
		 *
		 * @returns {string} Identifier of the number within the telephony provider.
		 */
		getID(): string
		
		/**
		 *
		 * Returns the numerical phone number for the current Notify caller.
		 *
		 *
		 * @returns {string} E.164-compliant phone number.
		 */
		getNumber(): string
		
		/**
		 *
		 * Returns the telephony provider associated with this phone number.
		 *
		 *
		 * @returns {string} Telephony provider associated with the number: Twilio.
		 */
		getOwner(): string
		
		/**
		 *
		 * Returns the country associated with the phone number.
		 *
		 *
		 * @returns {string} Name of the country to which the phone number belongs.
		 */
		getTerritory(): string
		
		/**
		 *
		 * Determines if the Notify phone number supports conference calls.
		 *
		 *
		 * @returns {boolean} Value that indicates whether the Notify phone number supports conference calling.
		 * 
		 * *   true: phone number does support conference calling
		 * *   false: phone number does not support conference calling
		 */
		supportsConferenceCall(): boolean
		
		/**
		 *
		 * Determines if the Notify phone number supports receiving phone calls.
		 *
		 *
		 * @returns {boolean} Value that indicates whether the Notify phone number supports incoming phone calls.
		 * 
		 * *   true: phone number does support incoming phone calls
		 * *   false: phone number does not support incoming phone calls
		 */
		supportsIncomingPhoneCall(): boolean
		
		/**
		 *
		 * Determines if the Notify phone number supports receiving SMS messages.
		 *
		 *
		 * @returns {boolean} Value that indicates whether the Notify phone number supports incoming SMS messages.
		 * 
		 * *   true: phone number does support incoming SMS messages
		 * *   false: phone number does not support incoming SMS messages
		 */
		supportsIncomingSMS(): boolean
		
		/**
		 *
		 * Determines if the Notify phone number supports initiating phone calls.
		 *
		 *
		 * @returns {boolean} Value that indicates whether the Notify phone number supports initiating outgoing phone calls.
		 * 
		 * *   true: phone number does support initiating outgoing phone calls
		 * *   false: phone number does not support initiating outgoing phone calls
		 */
		supportsOutgoingPhoneCall(): boolean
		
		/**
		 *
		 * Determines if the Notify phone number supports sending SMS messages.
		 *
		 *
		 * @returns {boolean} Value that indicates whether the Notify phone number supports sending SMS messages.
		 * 
		 * *   true: phone number does support sending SMS messages
		 * *   false: phone number does not support sending SMS messages
		 */
		supportsOutgoingSMS(): boolean
		
		/**
		 *
		 * Determines if the Notify phone number supports recording phone calls.
		 *
		 *
		 * @returns {boolean} Value that indicates whether the Notify phone number supports recording phone calls.
		 * 
		 * *   true: phone number does support recording phone calls
		 * *   false: phone number does not support recording phone calls
		 */
		supportsRecording(): boolean
		
		/**
		 *
		 * Determines if the Notify phone number supports calls to a browser, such as in a WebRTC implementation.
		 *
		 *
		 * @returns {boolean} Value that indicates whether the Notify phone number supports browser-to-browser (WebRTC) calls.
		 * 
		 * *   true: phone number does support browser-to-browser (WebRTC) calls
		 * *   false: phone number does not support browser-to-browser (WebRTC) calls
		 */
		supportsWebRTC(): boolean
		
	}
	
}