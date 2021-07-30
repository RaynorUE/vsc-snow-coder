declare namespace sn_notification {

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
	
	/** 
	 * A notification destination is somewhere that a notification can be delivered to, such as a specific email address or phone number. This API is based on notifications from the Notification [sys_notification] table. Notifications are sent through channels such as email or Workspace. A channel can be used to send notifications to multiple types of destinations. For example, an email channel could send notifications to both personal email and work email destinations. Destination types are listed in the Notification Destination Type [sys_notif_destination_type] table.  
	 *   
	 * A user can update their own notification preferences, and an admin can update notification preferences for any user. User notification preferences control which destinations will receive which notifications.  
	 *   
	 * Use this API with the [Preferences](dev.do#!/reference/api/quebec/server/sn_notification-namespace/PreferencesBothAPI "The Preferences API gets notification destinations for a user.") API. Before calling any methods in this class, you must call the Preferences.getDestinations() or Preferences.getDestinationsByChannel() methods to instantiate a PreferenceDestination object.  
	 *   
	 * This class uses the sn_notification namespace identifier.
	 * 
	 */
	class PreferenceDestination {
	
		/**
		 *
		 * Returns the channel that is used to send notifications to the destination.
		 *
		 *
		 * @returns {GlideRecord} GlideRecord from the Notification Channel [sys_notification_channel] table for the channel that is used to send notifications to the destination.
		 */
		getChannel(): GlideRecord
		
		/**
		 *
		 * Returns the identifier for the destination.
		 *
		 *
		 * @returns {string} The identifier for the destination. For example, an email address, push application install token, or sys_id.
		 */
		getDeliverTo(): string
		
		/**
		 *
		 * Returns the type of destination, such as personal email or work email.
		 *
		 *
		 * @returns {GlideRecord} GlideRecord from the Notification Destination Type [sys_notif_destination_type] table for the destination type.
		 */
		getDestinationType(): GlideRecord
		
		/**
		 *
		 * Checks if the destination has permission to receive a notification.
		 *
		 * @param {GlideRecord} notification Optional. Specify a notification to check if the destination has permission to receive that notification. An exception is thrown if the notification doesn't exist or if the notification isn't readable by the destination's user. If no notification is specified, this method checks if the destination has permission to receive any notifications.
		 *
		 * @returns {boolean} Flag that indicates whether the destination has permission to receive a notification.
		 * 
		 * Valid values:
		 * 
		 * *   true: The destination has permission receive a notification.
		 * *   false: The destination doesn't have permission to receive a notification.
		 */
		isActive(notification: GlideRecord): boolean
		
		/**
		 *
		 * Checks if a notification overrides a user's preferences for the destination.
		 *
		 * @param {GlideRecord} notification Specify a notification to check if it overrides user preferences for the destination. The notification should be a GlideRecord from the Notification [sys_notification] table.
		 *
		 * @returns {boolean} Flag that indicates whether the notification overrides user preferences for the destination.
		 * 
		 * Valid values:
		 * 
		 * *   true: User preferences for the destination are ignored for this notification.
		 * *   false: The destination receives or doesn't receive the notification according to the user preference.
		 */
		isOverriden(notification: GlideRecord): boolean
		
		/**
		 *
		 * Sets the user preference for a destination to receive or not receive notifications.
		 *
		 * The isOverriden() method can be called first to check if the user preference will be ignored, but it is not required.
		 *
		 * @param {GlideRecord} notification Optional. If a notification is specified, the user preference is set for the destination to receive or not receive that notification. The notification should be a GlideRecord from the Notification [sys_notification] table. If no notification is specified, the user preference is set for the destination to receive or not receive all notifications.
		 * @param {boolean} active Flag that indicates whether the destination has permission to receive a notification.
		 * 
		 * Valid values:
		 * 
		 * *   true: The destination has permission receive a notification.
		 * *   false: The destination doesn't have permission to receive a notification.
		 *
		 * @returns {void} 
		 */
		setActive(notification: GlideRecord, active: boolean): void
		
	}
	
	/** 
	 * A notification destination is somewhere that a notification can be delivered to, such as a specific email address or phone number. This API is based on notifications from the Notification [sys_notification] table. Notifications are sent through channels such as email or Workspace. A channel can be used to send notifications to multiple types of destinations. For example, an email channel could send notifications to both personal email and work email destinations. Destination types are listed in the Notification Destination Type [sys_notif_destination_type] table.  
	 *   
	 * This API is used with the [PreferenceDestination](dev.do#!/reference/api/quebec/server/sn_notification-namespace/PreferenceDestinationBothAPI "The PreferenceDestination API updates user notification preferences.") API to update user notification preferences.  
	 *   
	 * This class uses the sn_notification namespace identifier.
	 * 
	 */
	class Preferences {
	
		/**
		 *
		 * @param {GlideRecord} recipient GlideRecord from the User [sys_user] table for the user that you want to get notification destinations for.
		 *
		 */
		constructor(recipient: GlideRecord)
		
		/**
		 *
		 * Returns a user's notification destinations.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Array of [PreferenceDestination](dev.do#!/reference/api/quebec/server/sn_notification-namespace/PreferenceDestinationBothAPI "The PreferenceDestination API updates user notification preferences.") objects. If the user doesn't have any destinations, the array is empty.
		 */
		getDestinations(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns a user's notification destinations that use a specified channel.
		 *
		 * @param {GlideRecord} channel GlideRecord from the Notification Channel [sys_notification_channel] table for the channel you want to filter on.
		 *
		 * @returns {{[fieldName: string]: string}} Array of [PreferenceDestination](dev.do#!/reference/api/quebec/server/sn_notification-namespace/PreferenceDestinationBothAPI "The PreferenceDestination API updates user notification preferences.") objects. If the user doesn't have any notification destinations that use the channel or if the channel doesn't exist, the array is empty.
		 */
		getDestinationsByChannel(channel: GlideRecord): {[fieldName: string]: string}
		
	}
	
}