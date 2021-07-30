declare namespace sn_discovery {

	/** 
	 */
	class DiscoveryAPI {
	
		/**
		 *
		 * Discovers a specified IPv4 address.
		 *
		 * A MID Server is selected automatically, based on the IP address provided or the application specified.
		 *
		 * @param {string} application Optional. Application configured for the MID Server.
		 * 
		 * To define a source parameter but not an application parameter, use "NULL" as the place holder.
		 * 
		 * Default: Discovery
		 * @param {string} ipAddress IP address to discover.
		 * @param {string} source Optional. Source of the Discovery. This same value appears in the optional Source field in the Discovery Status record, which indicates how the Discovery was triggered.
		 * 
		 * Default: Discovery_API
		 *
		 * @returns {string} Discovery status record sys_id.
		 * 
		 * The following exceptions can be thrown during MID Server selection:
		 * 
		 * *   NoSuitableMidServerFoundException: No appropriate MID Server available for this Discovery
		 * *   BadArgumentException: Invalid argument detected during MID Server selection
		 */
		discoverIpAddress(application: string, ipAddress: string, source: string): string
		
		/**
		 *
		 * Used to return a summary of a configuration item's Discovery status given the specific status sys_id and IPv4 address.
		 *
		 * The following exceptions can be thrown:
		 * 		 * 
		 * 		 * *   DiscoveryStatusNotFoundException: Displays this message: Discovery Status with sys id '<invalid value>' does not exist
		 * 		 * *   DiscoveryDeviceHistoryNotFoundException: Device History with Discovery Status sys id '<invalid value>' and ipAddress '<invalid value>' does not exist
		 * 		 * *   IllegalArgumentException (invalid input arguments): This argument exception prevents input values from being null.
		 * 		 *     *   Discovery Status sys id can not be null
		 * 		 *     *   ipAddress can not be null
		 * 		 * *   IllegalArgumentException (values stored in database): This argument exception prevents erroneous data from being returned to the caller in the case of bad attribute values.
		 * 		 *     *   Discovery Status 'state' property can not be null
		 * 		 *     *   Device history 'source' property can not be null
		 * 		 *     *   Device history 'issues' property is not an integer: <invalid value>
		 * 		 *     *   Device history 'issues' property can not be less than 0: <invalid value>
		 *
		 * @param {string} ipAddress The IPv4 address that was scanned.
		 * @param {string} discoveryStatusSysId The sys_id of the Discovery status record for the IP address that was scanned.
		 *
		 * @returns {any[]} JavaScript array of immutable [ReportCiStatusOutputJS](dev.do#!/reference/api/quebec/server/sn_discovery-namespace/c_ReportCiStatusOutputJSScopedAPI "The ReportCiStatusOutputJS methods are getters that return specific object properties for the DiscoveryAPI reportCiIpAddressStatus method and then convert the information into a JSON string.") objects.
		 */
		reportCiIpAddressStatus(ipAddress: string, discoveryStatusSysId: string): any[]
		
		/**
		 *
		 * Used to return a summary of a CI Discovery status given a specific Discovery Status sys_id.
		 *
		 * The following exceptions can be thrown:
		 * 		 * 
		 * 		 * *   DiscoveryStatusNotFoundException: Discovery Status with sys id '<invalid value>' does not exist
		 * 		 * *   DiscoveryDeviceHistoryNotFoundException: Device History with Discovery Status sys id '<invalid value>' and ipAddress '<invalid value>' does not exist
		 * 		 * *   IllegalArgumentException (invalid input arguments): This argument exception prevents input values from being null.
		 * 		 *     *   Discovery Status sys id can not be null
		 * 		 *     *   ipAddress can not be null
		 * 		 * *   IllegalArgumentException (values stored in database): This argument exception imposes post conditions on database access values.
		 * 		 *     *   Discovery Status 'state' property can not be null
		 * 		 *     *   Device history 'source' property can not be null
		 * 		 *     *   Device history 'issues' property is not an integer: <invalid value>
		 * 		 *     *   Device history 'issues' property can not be less than 0: <invalid value>
		 *
		 * @param {string} sys_id The sys_id of a Discovery status record.
		 *
		 * @returns {any[]} JavaScript array of immutable [ReportCiStatusOutputJS](dev.do#!/reference/api/quebec/server/sn_discovery-namespace/c_ReportCiStatusOutputJSScopedAPI "The ReportCiStatusOutputJS methods are getters that return specific object properties for the DiscoveryAPI reportCiIpAddressStatus method and then convert the information into a JSON string.") objects.
		 */
		reportCiStatus(sys_id: string): any[]
		
	}
	
	/** 
	 */
	class ReportCiStatusOutputJS {
	
		/**
		 *
		 * Used to return the state of the scanned CI.
		 *
		 * This is a calculated field based on the last_state field in discovery_device_history table and the state field in the discovery_status table.
		 *
		 *
		 * @returns {string} The three possible states returned by this method are:
		 * 
		 * *   Processing: Discovery is still processing the request.
		 * *   Successful: A CI was created or updated.
		 * *   NotSuccessful: A CI was not created or updated, and the Discovery status was Completed or Cancelled.
		 */
		getCiOperationStatus(): string
		
		/**
		 *
		 * Used to return the value in the cmdb_ci field from the discovery_device_history table for the CI being scanned.
		 *
		 *
		 * @returns {string} Sys_id of the CI created or updated. This value can be null in the case of intermediate results before a CI is created.
		 */
		getCmdbCI(): string
		
		/**
		 *
		 * Used to return the value from the State field in the Discovery Status [discovery_status] table.
		 *
		 * The values returned by this method are used to calculate the value returned by the [getCiOperationStatus()](dev.do#!/reference/api/quebec/server/sn_discovery-namespace/c_ReportCiStatusOutputJSScopedAPI#r_RepCiStatOutgetCiOperationStatus "Used to return the state of the scanned CI.") method
		 *
		 *
		 * @returns {string} The possible states returned by this method are:
		 * 
		 * *   Starting
		 * *   Active
		 * *   Complete
		 * *   Cancelled
		 */
		getDiscoveryState(): string
		
		/**
		 *
		 * Used to return the value from the source field in the discovery_device_history table for the CI being scanned.
		 *
		 *
		 * @returns {string} The IP address of the CI being scanned.
		 */
		getIpAddress(): string
		
		/**
		 *
		 * Used to return the value from the issues field in the discovery_device_history table for the CI being scanned.
		 *
		 *
		 * @returns {number} Number of issues in this Discovery for this CI.
		 */
		getIssues(): number
		
		/**
		 *
		 * Used to return the value from the issues_link field in the discovery_device_history table for the CI being scanned.
		 *
		 *
		 * @returns {string} The issues_link field from the discovery_device_history table.
		 * 
		 * This value may be null or an anchor tag defining a hyperlink to a page that provides the list of issues associated with the Discovery Status and CI (IP address).
		 */
		getIssuesLink(): string
		
		/**
		 *
		 * Used to serialized the ReportCiStatusOutputJS object.
		 *
		 * This method throws the IllegalArgumentException exception, Cannot serialize object, e when the method is unable to serialize the object. The e is the exception object, which provides the exception message and trace.
		 *
		 *
		 * @returns {string} Serialized instance of the ReportCiStatusOutputJS object into a JSON string.
		 */
		toJson(): string
		
	}
	
}