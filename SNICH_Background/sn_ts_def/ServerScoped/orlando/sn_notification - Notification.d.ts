declare namespace sn_notification - Notification {

	/** 
	 * This class requires the Messaging Notification plugin (com.glide.notification.messaging) and an integration with a third-party messaging application such as Slack or Teams. Use these methods in an action script in the Message Actions [messaging_observer_handler] table.  
	 *   
	 * Use the sn_notification namespace to access the Messaging API.
	 * 
	 */
	class Messaging {
	
		/**
		 *
		 * Sends a custom message to a third-party application in response to a messaging event. For example, you can send a custom welcome message to a Slack channel when the Now Actions application installs.
		 *
		 * Use this method in an action script in the Message Actions [messaging_observer_handler] table.
		 *
		 * @param {GlideRecord} messagingApplication Third-party application to send a message to from the Messaging Entities [messaging_application] table.
		 * @param {string} recipient Recipient of the message. When the instance receives an inbound message, you can send a response to a Slack channel, Team, or individual user ID found in the inbound payload.
		 * @param {GlideRecord} messagingContent Message content to send from the Messaging Contents [messaging_content] table.
		 * @param {GlideRecord} target Record used to define dynamic field values in the message. Table must match the Target table field in the Messaging Contents record. If the Messaging Contents record does not use a target table, set the value to null.
		 *
		 * @returns {void} Method does not return a value
		 */
		send(messagingApplication: GlideRecord, recipient: string, messagingContent: GlideRecord, target: GlideRecord): void
		
	}
	
}