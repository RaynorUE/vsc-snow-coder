declare namespace sn_connect - Connect {

	/** 
	 * To use this class in a scoped application, use the sn_connect namespace identifier. The Connect Scriptable APIs plugin (ID: com.glide.connect.scriptable) should be enabled to access the Conversation API.
	 * 
	 */
	class Conversation {
	
		/**
		 *
		 * Add a user to a conversation.
		 *
		 * @param {string} sysID The sys_ID of the user you want to add to a conversation.
		 *
		 * @returns {void} Method does not return a value
		 */
		addSubscriber(sysID: string): void
		
		/**
		 *
		 * Create a Connect conversation.
		 *
		 * @param {string} name Create a conversation with a specific name.
		 * @param {string} type Include a specific conversation type. The type is determined by the type choice list. The base system includes the following type options:
		 * 
		 * *   connect
		 * *   support
		 * *   group
		 * *   peer
		 * *   qanda
		 * *   team
		 *
		 * @returns {{[fieldName: string]: string}} Scriptable Conversation
		 */
		create(name: string, type: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Get an existing Connect conversation by sys_id.
		 *
		 * @param {string} sysID The sys_id of the conversation record.
		 *
		 * @returns {{[fieldName: string]: string}} Conversation object
		 */
		get(sysID: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Remove a user from a conversation.
		 *
		 * @param {string} SysID The sys_id of the user you want to remove from a conversation.
		 *
		 * @returns {void} Method does not return a value
		 */
		removeSubscriber(SysID: string): void
		
		/**
		 *
		 * Send a message to a conversation.
		 *
		 * @param {string} Body The main text of the message.
		 * @param {string} Field The field you want the message to appear as. Only use this option if adding a message to a record conversation. Choose from work_notes, comments, or system. Using the field system treats the message as a system message.
		 *
		 * @returns {void} Method does not return a value
		 */
		sendMessage(Body: string, Field: string): void
		
	}
	
	/** 
	 * To use this class in a scoped application, use the sn_connect namespace identifier. The Connect Scriptable APIs plugin (ID: com.glide.connect.scriptable) should be enabled to access the Queue API.
	 * 
	 */
	class Queue {
	
		/**
		 *
		 * Retrieves a specified chat queue.
		 *
		 * @param {string} SysID Sys_id of a queue from the Chat Queue [chat_queue] table.
		 *
		 * @returns {{[fieldName: string]: string}} Returns a conversation queue object.
		 */
		get(SysID: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds the current user to an existing Connect Support chat queue and posts the specified question.
		 *
		 * Before calling this method, you must call the [Scoped Queue - get(String sysID)](dev.do#!/reference/api/orlando/server/sn_connect-namespace/QueueScopedAPI#queue-get-string "Retrieves a specified chat queue.") method to retrieve the chat queue to which to attach the current user.
		 *
		 * @param {string} Question Question to add to the chat queue.
		 *
		 * @returns {{[fieldName: string]: string}} GlideRecord object for the Chat Queue Entry.
		 */
		join(Question: string): {[fieldName: string]: string}
		
	}
	
}