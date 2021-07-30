declare namespace sn_agent {

	/** 
	 * This API requires the Agent Client Collector Framework (sn_agent) store application and is provided within the sn_agent namespace. For more information, refer to [Agent Client Collector](https://docs.servicenow.com/bundle/quebec-it-operations-management/page/product/agent-client-collector/concept/acc-landing-page.html).
	 * 
	 * For the REST API solution, refer to [Agent Client Collector API](https://developer.servicenow.com/go_to_api.do?ID=agnt_clnt_cll-api&v=quebec).
	 * 
	 * This API includes methods that enable the following:
	 * 
	 * *   Getting extensive information of one or more agents.
	 * *   Submitting a request to grab an agent log and retrieving information about the request progress.
	 * *   Starting or stopping data collection.
	 * *   Restarting an agent.
	 * *   Running discovery on an agent.
	 * 
	 */
	class AccAgentsAPI {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Checks the status of a grab log request.
		 *
		 * Run the [submitGrabLogRequest()](dev.do#!/reference/api/quebec/server/sn_agent-namespace/AccAgentsAPIAPIScoped#AccA-submitGrabLogRequest_S "Requests the log of a specified agent with alive/up status.") method to get a request ID.
		 *
		 * @param {string} requestId Sys_id of a request in the Agent Client Collector Requests [sn_agent_request] table.
		 *
		 * @returns {{[fieldName: string]: string}} Information describing the status.
		 */
		checkGrabLogRequestProgress(requestId: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Gets the information of a specified agent.
		 *
		 * To get a list of agent IDs:
		 * 		 * 
		 * 		 * *   Run the getAgentsList() method.
		 * 		 * *   Check the Agent ID column of the Agent Client Collectors [sn_agent_cmdb_ci_agent] table.
		 * 		 * *   Run the [Agent Client Collector GET list](dev.do#!/reference/api/quebec/server/agnt_clnt_cll-api#agnt_clnt_cll-GET-list "Gets a list of agents with related information.") REST API.
		 *
		 * @param {string} agentID Unique ID of an agent listed in the Agent ID column of the Agent Client Collectors [sn_agent_cmdb_ci_agent] table.
		 *
		 * @returns {any} Version of Agent Client Collector the agent is running.
		 * 
		 * Data type: String
		 */
		getAgent(agentID: string): any
		
		/**
		 *
		 * Gets a list of agents with related information.
		 *
		 * @param {string} encodedQuery Encoded query string in standard Glide format. See [Encoded query strings](https://docs.servicenow.com/bundle/quebec-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html).
		 * @param {number} limit Optional. Restricts results to a maximum number of agents. Use null or undefined for both if they are not required.
		 * 
		 * Default/Max: 20,000
		 *
		 * @returns {{[fieldName: string]: string}} Version of Agent Client Collector the agent is running.
		 * 
		 * Data type: String
		 */
		getAgentsList(encodedQuery: string, limit: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Restarts a specified agent with alive/up status.
		 *
		 * If Agent Client Collector performance issues occur, you can restart the agent. Manual restart is supported in the following environments:
		 * 		 * 
		 * 		 * *   Linux-based agents using systemd
		 * 		 * *   Windows agents
		 * 		 * 
		 * 		 * To get a list of agent IDs:
		 * 		 * 
		 * 		 * *   Run the getAgentsList() method.
		 * 		 * *   Check the Agent ID column of the Agent Client Collectors [sn_agent_cmdb_ci_agent] table.
		 * 		 * *   Run the [Agent Client Collector GET list](dev.do#!/reference/api/quebec/server/agnt_clnt_cll-api#agnt_clnt_cll-GET-list "Gets a list of agents with related information.") REST API.
		 *
		 * @param {string} agentID Unique ID of an agent listed in the Agent ID column of the Agent Client Collectors [sn_agent_cmdb_ci_agent] table.
		 *
		 * @returns {string} Error message if applicable, null otherwise.
		 */
		restartAgent(agentID: string): string
		
		/**
		 *
		 * Runs a discovery check to locate CIs related to an agent. The specified agent must be in alive/up status.
		 *
		 * To get a list of agent IDs:
		 * 		 * 
		 * 		 * *   Run the getAgentsList() method.
		 * 		 * *   Check the Agent ID column of the Agent Client Collectors [sn_agent_cmdb_ci_agent] table.
		 * 		 * *   Run the [Agent Client Collector GET list](dev.do#!/reference/api/quebec/server/agnt_clnt_cll-api#agnt_clnt_cll-GET-list "Gets a list of agents with related information.") REST API.
		 *
		 * @param {string} agentID Unique ID of an agent listed in the Agent ID column of the Agent Client Collectors [sn_agent_cmdb_ci_agent] table.
		 *
		 * @returns {string} Error message if applicable, null otherwise. For example, Agent With ID: <agentID> Is Not Up: no thrown error.
		 */
		runDiscovery(agentID: string): string
		
		/**
		 *
		 * Set the given data collection status (true/false if enabled or not) for a specified agent.
		 *
		 * To get a list of agent IDs:
		 * 		 * 
		 * 		 * *   Run the getAgentsList() method.
		 * 		 * *   Check the Agent ID column of the Agent Client Collectors [sn_agent_cmdb_ci_agent] table.
		 * 		 * *   Run the [Agent Client Collector GET list](dev.do#!/reference/api/quebec/server/agnt_clnt_cll-api#agnt_clnt_cll-GET-list "Gets a list of agents with related information.") REST API.
		 *
		 * @param {string} agentID Unique ID of an agent listed in the Agent ID column of the Agent Client Collectors [sn_agent_cmdb_ci_agent] table.
		 * @param {boolean} status Flag that indicates whether data collection is enabled for the agent.
		 * 
		 * Valid values:
		 * 
		 * *   true: Enables data collection for this agent.
		 * *   false: Disables data collection for this agent.
		 * 
		 * Default: true
		 *
		 * @returns {string} Error message if applicable, null otherwise. For example, Agent With ID: <agentID> Is Not Up: no thrown error.
		 */
		setDataCollectionStatus(agentID: string, status: boolean): string
		
		/**
		 *
		 * Requests the log of a specified agent with alive/up status.
		 *
		 * Note: To retrieve the log and check its progress, pass the request ID returned to the checkGrabLogRequestProgress() method.
		 *
		 * @param {string} agentID Unique ID of an agent listed in the Agent ID column of the Agent Client Collectors [sn_agent_cmdb_ci_agent] table.
		 *
		 * @returns {{[fieldName: string]: string}} Sys_id of a request in the Agent Client Collector Requests [sn_agent_request] table.
		 * 
		 * You can use this ID to get the status of the request using GET /agents/{request_id}/.
		 * 
		 * Data type: String
		 */
		submitGrabLogRequest(agentID: string): {[fieldName: string]: string}
		
	}
	
}