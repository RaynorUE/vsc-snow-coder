declare namespace sn_interaction - Interaction {

	/** 
	 * This class requires the Interaction Logging, Routing, and Queueing plugin (com.glide.interaction).  
	 *   
	 * 
	 * Note: This method has been deprecated.
	 * 
	 *   
	 *   
	 * To use this class in a scoped API, use the sn_interaction namespace identifier.
	 * 
	 */
	class Interaction {
	
		/**
		 *
		 * Accept a new interaction.
		 *
		 * Accepting a transfer only works for pending transfers. Find any pending transfers in the Interaction Agent Transfer [interaction_agent_transfer] table.
		 *
		 *
		 * @returns {boolean} Returns true if the transfer is accepted.
		 */
		accept(): boolean
		
		/**
		 *
		 * Create an interaction.
		 *
		 * @param {{[fieldName: string]: string}} options Field values for an interaction record. The channel field with the channel sys_id and channel metadata are required.
		 * 
		 * If a queue is not included in the parameter, the system returns Interaction b2c0a3af202a1300964f959e0488de75 has no queue specified... running queue matching rules.
		 *
		 * @returns {{[fieldName: string]: string}} Interaction
		 */
		create(options: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Get an interaction record.
		 *
		 * @param {GlideRecord} interaction Interaction record from the interaction table [interaction] that is retrieved from the system.
		 *
		 * @returns {{[fieldName: string]: string}} Interaction
		 */
		getInteraction(interaction: GlideRecord): {[fieldName: string]: string}
		
		/**
		 *
		 * Transfer an interaction record to an agent using the sys_id for the agent.
		 *
		 * When an interaction is transferred from one agent to another, the interaction needs to be accepted or rejected using GlideRecord APIs. Use the GlideRecord API to change the state of the interaction and update. For more information, see the GlideRecord - update method.
		 * 		 * 
		 * 		 * Note: This method has been deprecated.
		 *
		 * @param {string} SysID The sys_id of the user you want to transfer an interaction record to.
		 *
		 * @returns {void} Method does not return a value
		 */
		transferToAgent(SysID: string): void
		
		/**
		 *
		 * Transfer an interaction record to an interaction queue.
		 *
		 * Transferring an interaction from one queue to another closes the original interaction and creates an interaction in the new queue.
		 * 		 * 
		 * 		 * Note: This method has been deprecated.
		 *
		 * @param {string} SysID The sys_id of the interaction queue you want to transfer the interaction record to.
		 *
		 * @returns {void} Method does not return a value
		 */
		transferToQueue(SysID: string): void
		
	}
	
	/** 
	 * Note: This API has been deprecated, use the Queue and Agent APIs instead.
	 * 
	 *   
	 *   
	 * This class requires the Interaction Logging, Routing, and Queueing plugin (com.glide.interaction).  
	 *   
	 * To use this class in a scoped API, use the sn_interaction namespace identifier.
	 * 
	 */
	class InteractionQueue {
	
		/**
		 *
		 * Assign the next interaction in a queue to the current user.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Interaction
		 */
		acceptNext(): {[fieldName: string]: string}
		
		/**
		 *
		 * Get an existing interaction queue by sys_id.
		 *
		 * @param {GlideRecord} queue Queue from the interaction_queue table.
		 *
		 * @returns {{[fieldName: string]: string}} Interaction Queue
		 */
		get(queue: GlideRecord): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns a list of agents who are online and assigned to a particular queue.
		 *
		 * Note: This API has been deprecated, use the Agent API instead.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} List of available agents by sys_id.
		 */
		getAvailableAgents(): {[fieldName: string]: string}
		
		/**
		 *
		 * Check if a user is an agent for a queue.
		 *
		 * @param {GlideRecord} queue Sys ID for a queue in the interaction_queue table.
		 *
		 * @returns {boolean} Returns either true or false
		 */
		isAgentFor(queue: GlideRecord): boolean
		
		/**
		 *
		 * Find out whether the queue is in schedule.
		 *
		 *
		 * @returns {any} InteractionQueue
		 */
		isInSchedule(): any
		
	}
	
}