declare namespace sn_cc - Connection and Credential {

	/** 
	 * You can use this API in scoped applications, or within the global scope. In scoped scripts, use the sn_cc namespace identifier.  
	 *   
	 * For more information on connections and credentials, see [Credentials and connection information](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/credentials/reference/r-credentials.html).  
	 *   
	 * This function retrieves connection attribute information identified by the given connection and credential alias.  
	 *   
	 * 
	 *     var provider = new sn_cc.ConnectionInfoProvider();
	 *     
	 *     // get a jdbc connection in the current domain with the alias ID
	 *     //     "6219afbf9f03320021dd7501942e70fc"
	 *     var connectionInfo = provider.getConnectionInfo("6219afbf9f03320021dd7501942e70fc");
	 *     if (connectionInfo != null) {
	 *       // get data map
	 *       var datamap = connectionInfo.getDataMap();
	 *       gs.info(datamap["name"]);
	 *       gs.info(datamap["connection_url"]);
	 *     
	 *       // get the same values using getAttribute
	 *       gs.info(connectionInfo.getAttribute("name"));
	 *       gs.info(connectionInfo.getAttribute("connection_url"));
	 *     
	 *       // get credential attributes
	 *       gs.info(connectionInfo.getCredentialAttribute("user_name"));
	 *       gs.info(connectionInfo.getCredentialAttribute("password")); 
	 *     
	 *       // get extended attributes
	 *       var extendedAttributes = connectionInfo.getExtendedAttributes();  
	 *       gs.info(extendedAttributes["name1"]);
	 *      }
	 *     
	 *      // get a jdbc connection in the ACME domain with the alias ID
	 *      //      "cd5923ff9f03320021dd7501942e70bb"
	 *      connectionInfo = provider.getConnectionInfoByDomain("cd5923ff9f03320021dd7501942e70bb",
	 *             "c90d4b084a362312013398f051272c0d");
	 *      if (connectionInfo != null) {
	 *        // get data map
	 *        var datamap = connectionInfo.getDataMap();
	 *        gs.info(datamap["name"]);
	 *      }
	 * 
	 */
	class ConnectionInfo {
	
		/**
		 *
		 * Returns the value of a ConnectionInfo attribute with the specified property name.
		 *
		 * @param {string} name Name of a ConnectionInfo object property.
		 *
		 * @returns {string} Value of a specified ConnectionInfo property.
		 */
		getAttribute(name: string): string
		
		/**
		 *
		 * Returns the value of credential attributes for a specified connection.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Key-value pair map of credential attributes.
		 */
		getCredentialAttribute(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the connection attributes as a collection of key-value pairs.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Key-value pair map of connection attributes.
		 */
		getDataMap(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the extended attributes as a collection of key-value pairs.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Key-value pair map of extended attributes.
		 */
		getExtendedAttributes(): {[fieldName: string]: string}
		
	}
	
	/** 
	 * You can use this API in scoped applications, or within the global scope. In scoped scripts, use the sn_cc namespace identifier.  
	 *   
	 * This function retrieves connection information identified by the given connection alias.  
	 *   
	 * 
	 *     var provider = new sn_cc.ConnectionInfoProvider();
	 *     
	 *     // get a jdbc connection in the current domain with the alias ID
	 *     //     "6219afbf9f03320021dd7501942e70fc"
	 *     var connectionInfo = provider.getConnectionInfo("6219afbf9f03320021dd7501942e70fc");
	 *     if (connectionInfo != null) {
	 *       // get data map
	 *       var datamap = connectionInfo.getDataMap();
	 *       gs.info(datamap["name"]);
	 *       gs.info(datamap["connection_url"]);
	 *     
	 *       // get the same values using getAttribute
	 *       gs.info(connectionInfo.getAttribute("name"));
	 *       gs.info(connectionInfo.getAttribute("connection_url"));
	 *     
	 *       // get credential attributes
	 *       gs.info(connectionInfo.getCredentialAttribute("user_name"));
	 *       gs.info(connectionInfo.getCredentialAttribute("password")); 
	 *     
	 *       // get extended attributes
	 *       var extendedAttributes = connectionInfo.getExtendedAttributes();  
	 *       gs.info(extendedAttributes["name1"]);
	 *      }
	 *     
	 *      // get a jdbc connection in the ACME domain with the alias ID
	 *      //      "cd5923ff9f03320021dd7501942e70bb"
	 *      connectionInfo = provider.getConnectionInfoByDomain("cd5923ff9f03320021dd7501942e70bb",
	 *             "c90d4b084a362312013398f051272c0d");
	 *      if (connectionInfo != null) {
	 *        // get data map
	 *        var datamap = connectionInfo.getDataMap();
	 *        gs.info(datamap["name"]);
	 *      }
	 * 
	 */
	class ConnectionInfoProvider {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * This function retrieves a ConnectionInfo object identified by the given aliasID in the current domain.
		 *
		 * @param {string} aliasID The sys_id of a connection alias.
		 *
		 * @returns {ConnectionInfo} Information about the connection.
		 */
		getConnectionInfo(aliasID: string): ConnectionInfo
		
		/**
		 *
		 * This function retrieves a ConnectionInfo object identified by the given aliasID for a specific domain.
		 *
		 * @param {string} aliasID The sys_id of a connection alias.
		 * @param {string} domainID The sys_id of a domain or global.
		 *
		 * @returns {ConnectionInfo} Connection information.
		 */
		getConnectionInfoByDomain(aliasID: string, domainID: string): ConnectionInfo
		
	}
	
	/** 
	 * You can use this API in scoped applications, or within the global scope. In scoped scripts, use the sn_cc namespace identifier.  
	 *   
	 * This API provides methods to retrieve credential information by sys_id and by specified credential attributes.  
	 *   
	 * 
	 *     //Get a single credential
	 *     
	 *     var provider = new sn_cc.StandardCredentialsProvider();
	 *     var credential = provider.getCredentialByID("f43c6d40a0a0b5700c77f9bf387afe3");
	 *     var userName = credential.getAttribute("user_name");
	 *     var password = credential.getAttribute("password");
	 *     //using getAttribute for new keys in extended tables, for example 
	 *     //cloud management credential has the "user_public_key" attribute
	 *     var userPublicKey = credential.getAttribute("user_public_key");
	 *     
	 *     //Get a list of SSH credentials
	 *     
	 *     var provider = new sn_cc.StandardCredentialsProvider();
	 *     var credentials = provider.getCredentials(["ssh"]);
	 *     for (var i = 0; i < credentials.length; i++) {
	 *       var credential = credentials[i];
	 *       gs.info(credential.getAttribute("name"));
	 *     }
	 * 
	 */
	class StandardCredentialsProvider {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Returns the credential record object identified by the specified sys_id.
		 *
		 * @param {string} sys_id Sys_id of the credential record. Located in the Credentials [discovery_credentials] table.
		 *
		 * @returns {StandardCredential} Credential record object.
		 */
		getCredentialByID(sys_id: string): StandardCredential
		
		/**
		 *
		 * Returns an array of all credentials that match the specified types and tags.
		 *
		 * @param {string} tags Optional. Comma-separated list of tag names. For example, "ssh, jdbc".
		 * 
		 * Examples of valid calls:
		 * 
		 * *   var credentials = provider.getCredentials(null, null);
		 * *   var credentials = provider.getCredentials(["ssh"], "");
		 * *   var credentials = provider.getCredentials(new ArrayList<String>(), "ssh,admin");
		 * @param {{[fieldName: string]: string}} types Optional. Credential type names. For example, ["ssh", "windows"]
		 * 
		 * Note: If types is null or empty, any match returns a credential. If types is specified, the credentials whose type matches one of the types is returned.
		 *
		 * @returns {StandardCredential} Credential record object.
		 */
		getCredentials(tags: string, types: {[fieldName: string]: string}): StandardCredential
		
	}
	
}