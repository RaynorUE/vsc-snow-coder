declare namespace sn_auth - OAuth {

	/** 
	 * Generate outbound signing requests using these APIs in the following order:
	 * 
	 * 1.  HttpRequestData: Build the API request.
	 * 2.  AuthCredential: Create a credential object or update an existing one. Use the credential to sign the request through the RequestAuthAPI class.
	 * 3.  RequestAuthAPI: Sign the request and return an HttpRequestAuthedData object.
	 * 4.  HttpRequestAuthedData: Get information about the signed request.
	 * 5.  GlideHTTPRequest: Send the signed request.
	 * 
	 *   
	 *   
	 * Before using these APIs, you must [configure an authentication algorithm](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/credentials/task/configure-authentication-algorithm.html) to sign the request and associate it with the credential used to authenticate the request.  
	 *   
	 * You can create an empty AuthCredential object, instantiate an existing AuthCredential object, or use the StandardCredentialsProvider class to instantiate an AuthCredential object using a Credential record from the Credentials [discovery_credentials] table. If you create an empty AuthCredential object, use the setAttribute() method to add properties to the object.  
	 *   
	 * See the following example to instantiate an AuthCredential using StandardCredentialsProvider:
	 * 
	 *     // Return an AuthCredential object using a Credential sys_id
	 *     var credential = new sn_cc.StandardCredentialsProvider().getAuthCredentialByID("5b61c16f73533300f662cff8faf6a74b");
	 * 
	 *   
	 *   
	 * Use the AuthCredential API in scoped scripts with the sn_auth namespace identifier.
	 * 
	 */
	class AuthCredential {
	
		/**
		 *
		 * @param {{[fieldName: string]: string}} authCredential Optional. Include this parameter to update an existing AuthCredential object.
		 *
		 */
		constructor(authCredential: {[fieldName: string]: string})
		
		/**
		 *
		 * Returns the value of an AuthCredential attribute.
		 *
		 * @param {string} key Key of the attribute to return the value for. If you created an empty AuthCredential object, you must use the setAttribute() method to add properties to the object. If you used a credential record to instantiate the AuthCredential object, pass a field name from the Credential [discovery_credentials] table to access the value.
		 *
		 * @returns {void} Method does not return a value
		 */
		getAttribute(key: string): void
		
		/**
		 *
		 * Sets an attribute for an AuthCredential object.
		 *
		 * @param {string} key Name of the attribute to set. If you created an empty AuthCredential object, you must use the this method to add properties to the object. If you used a credential record to instantiate the AuthCredential object, pass a field name from the Credential [discovery_credentials] table to set the value.
		 * @param {string} value Value of the attribute.
		 *
		 * @returns {void} Method does not return a value
		 */
		setAttribute(key: string, value: string): void
		
	}
	
	/** 
	 * This API can be used in global and scoped scripts. In scoped scripts us the sn_auth namespace identifier.
	 * 
	 */
	class GlideOAuthClient {
	
		/**
		 *
		 * Retrieves the token for the client. You can use the token to check the expiration date and perform a token renewal.
		 *
		 * @param {string} OAuthEntityName The OAuth entity.
		 * @param {string} requestor The request.
		 *
		 * @returns {ScopedGlideOAuthToken} The token for the client.
		 */
		getToken(OAuthEntityName: string, requestor: string): ScopedGlideOAuthToken
		
		/**
		 *
		 * Retrieves the token for the client, with the request parameters encoded in JSON format.
		 *
		 * @param {string} clientName The client name.
		 * @param {string} jsonString The JSON string for the client.
		 *
		 * @returns {GlideOAuthClientResponse} The token for the client.
		 */
		requestToken(clientName: string, jsonString: string): GlideOAuthClientResponse
		
		/**
		 *
		 * Retrieves the token for the client, with the client name and the request set into a GlideOAuthClientResponse object.
		 *
		 * @param {string} clientName The client name.
		 * @param {{[fieldName: string]: string}} request The request.
		 *
		 * @returns {GlideOAuthClientResponse} The token for the client.
		 */
		requestTokenByRequest(clientName: string, request: {[fieldName: string]: string}): GlideOAuthClientResponse
		
		/**
		 *
		 * Revokes the access or refresh token for the client, with the request and optional header parameters set into a GlideOAuthClientRequest object.
		 *
		 * @param {string} clientName The client name.
		 * @param {string} accessToken The access token.
		 * @param {string} refreshToken The refresh token.
		 * @param {{[fieldName: string]: string}} request The request.
		 *
		 * @returns {GlideOAuthClientResponse} The token for the client.
		 */
		revokeToken(clientName: string, accessToken: string, refreshToken: string, request: {[fieldName: string]: string}): GlideOAuthClientResponse
		
	}
	
	/** 
	 * This API can be used in global and scoped scripts. In scoped scripts us the sn_auth namespace identifier.
	 * 
	 */
	class GlideOAuthClientRequest {
	
		/**
		 *
		 * Retrieves the grant type.
		 *
		 *
		 * @returns {string} The grant type.
		 */
		getGrantType(): string
		
		/**
		 *
		 * Retrieves the HTTP headers for the string you provide.
		 *
		 * @param {string} name The name of the parameter.
		 *
		 * @returns {string} The string map with the HTTP headers.
		 */
		getHeader(name: string): string
		
		/**
		 *
		 * Retrieves the HTTP headers.
		 *
		 *
		 * @returns {string} The string map with the HTTP headers.
		 */
		getHeaders(): string
		
		/**
		 *
		 * Retrieves the parameters for the parameter name you provide.
		 *
		 * @param {string} name The parameter name for which you want the parameters.
		 *
		 * @returns {string} The parameters.
		 */
		getParameter(name: string): string
		
		/**
		 *
		 * Retrieves the password.
		 *
		 *
		 * @returns {string} The password.
		 */
		getPassword(): string
		
		/**
		 *
		 * Retrieves the refresh token.
		 *
		 *
		 * @returns {string} The refresh token.
		 */
		getRefreshToken(): string
		
		/**
		 *
		 * Retrieves the scope.
		 *
		 *
		 * @returns {string} The scope.
		 */
		getScope(): string
		
		/**
		 *
		 * Retrieves the user name.
		 *
		 *
		 * @returns {string} The user name.
		 */
		getUserName(): string
		
		/**
		 *
		 * Sets the grant type for the string you provide.
		 *
		 * Note: You only need to set the grant type if it is not already defined in the OAuth provider profile.
		 *
		 * @param {string} name The grant type.
		 *
		 * @returns {void} Method does not return a value
		 */
		setGrantType(name: string): void
		
		/**
		 *
		 * Retrieves the HTTP headers for the string you provide.
		 *
		 * @param {string} name The name of the parameter.
		 * @param {string} value The value of the parameter.
		 *
		 * @returns {void} Method does not return a value
		 */
		setHead(name: string, value: string): void
		
		/**
		 *
		 * Sets the parameters for the name:value pair of strings you provide.
		 *
		 * @param {string} name The parameter name for which you want the parameters.
		 * @param {string} value The value of the parameter.
		 *
		 * @returns {void} Method does not return a value
		 */
		setParameter(name: string, value: string): void
		
		/**
		 *
		 * Sets the password with the string you provide.
		 *
		 * @param {string} password The user name.
		 *
		 * @returns {void} Method does not return a value
		 */
		setPassword(password: string): void
		
		/**
		 *
		 * Sets the refresh token with the string you provide.
		 *
		 * @param {string} refreshToken The refresh token.
		 *
		 * @returns {void} Method does not return a value
		 */
		setRefreshToken(refreshToken: string): void
		
		/**
		 *
		 * Sets the scope for the string you provide.
		 *
		 * Note: You only need to set the scope if it is not already defined in the OAuth provider.
		 *
		 * @param {string} scope The scope.
		 *
		 * @returns {void} Method does not return a value
		 */
		setScope(scope: string): void
		
		/**
		 *
		 * Sets the user name with the string you provide.
		 *
		 * @param {string} userName The user name.
		 *
		 * @returns {void} Method does not return a value
		 */
		setUserName(userName: string): void
		
	}
	
	/** 
	 * This API can be used in global and scoped scripts. In scoped scripts us the sn_auth namespace identifier.
	 * 
	 */
	class GlideOAuthClientResponse {
	
		/**
		 *
		 * Retrieves all of the response information, including instance information.
		 *
		 *
		 * @returns {string} The response information.
		 */
		getBody(): string
		
		/**
		 *
		 * Retrieves the HTTP response content header from an external OAuth provider.
		 *
		 *
		 * @returns {string} The HTTP response header.
		 */
		getContentType(): string
		
		/**
		 *
		 * Retrieves the error message if authentication is not successful.
		 *
		 *
		 * @returns {string} The error message.
		 */
		getErrorMessage(): string
		
		/**
		 *
		 * Retrieves the HTTP response code from the external OAuth provider.
		 *
		 *
		 * @returns {string} The HTTP response code.
		 */
		getResponseCode(): string
		
		/**
		 *
		 * Retrieves the error message if authentication is not successful.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The response content.
		 */
		getResponseParameters(): {[fieldName: string]: string}
		
		/**
		 *
		 * Retrieves the refresh token.
		 *
		 *
		 * @returns {GlideOAuthToken} The refresh token.
		 */
		getToken(): GlideOAuthToken
		
	}
	
	/** 
	 * This API can be used in global and scoped scripts. In scoped scripts use the sn_auth namespace identifier.
	 * 
	 */
	class GlideOAuthToken {
	
		/**
		 *
		 * Retrieves the access token associated with the GlideOAuthToken object.
		 *
		 *
		 * @returns {string} Access token.
		 */
		getAccessToken(): string
		
		/**
		 *
		 * Deprecated. Retrieves the sys_id of the token ID associated with the GlideOAuthToken object.
		 *
		 *
		 * @returns {string} Sys_id of the access token.
		 */
		getAccessTokenSysID(): string
		
		/**
		 *
		 * Retrieves the lifespan of the access token associated with the GlideOAuthToken object.
		 *
		 *
		 * @returns {number} Lifespan of the token.
		 * 
		 * Unit: Seconds
		 */
		getExpiresIn(): number
		
		/**
		 *
		 * Refreshes the token associated with the GlideOAuthToken object.
		 *
		 *
		 * @returns {string} Refreshed token.
		 */
		getRefreshToken(): string
		
		/**
		 *
		 * Deprecated. Retrieves the sys_id of the refresh token.
		 *
		 *
		 * @returns {string} Sys_id of the refresh token.
		 */
		getRefreshTokenSysID(): string
		
		/**
		 *
		 * Retrieves the token scope, which is the amount of access granted by the access token.
		 *
		 *
		 * @returns {string} Scope of the access token.
		 */
		getScope(): string
		
	}
	
	/** 
	 * Generate outbound signing requests using these APIs in the following order:
	 * 
	 * 1.  HttpRequestData: Build the API request.
	 * 2.  AuthCredential: Create a credential object or update an existing one. Use the credential to sign the request through the RequestAuthAPI class.
	 * 3.  RequestAuthAPI: Sign the request and return an HttpRequestAuthedData object.
	 * 4.  HttpRequestAuthedData: Get information about the signed request.
	 * 5.  GlideHTTPRequest: Send the signed request.
	 * 
	 *   
	 *   
	 * Before using these APIs, you must [configure an authentication algorithm](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/credentials/task/configure-authentication-algorithm.html) to sign the request and associate it with the credential used to authenticate the request.  
	 *   
	 * Use this API in scoped scripts with the sn_auth namespace identifier. You can instantiate this class using the constructor, or you can return an HttpRequestAuthedData object from the generateAuth() method in the RequestAuthAPI class.
	 * 
	 */
	class HttpRequestAuthedData {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Adds a header to the HttpRequestAuthedData object.
		 *
		 * @param {string} key Name of the HTTP header.
		 * @param {string} value Value of the HTTP Header.
		 *
		 * @returns {void} Method does not return a value
		 */
		addHeader(key: string, value: string): void
		
		/**
		 *
		 * Adds a query parameter to the HttpRequestAuthedData object.
		 *
		 * @param {string} key Name of the query parameter.
		 * @param {string} value Value of the query parameter.
		 *
		 * @returns {void} Method does not return a value
		 */
		addQueryParam(key: string, value: string): void
		
		/**
		 *
		 * Returns whether the signature is applied to the request in the header or as a query parameter.
		 *
		 * By default, the system applies the signature to the header. You can apply the signature as a query parameter using the setDirective() API.
		 *
		 *
		 * @returns {string} Whether the signature is applied to the header or as a query parameter.
		 * 
		 * Values include:
		 * 
		 * *   HEADER: The signature is applied to the request header.
		 * *   QUERY: The signature is applied as a query parameter.
		 */
		getDirective(): string
		
		/**
		 *
		 * Returns an object containing the headers that were included when the request was signed.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Key-value pairs that define all of the headers included when the request was signed. Each key-value pair includes these parts:
		 * 
		 * *   key: String. Name of the header.
		 * *   value: String. Value of the header.
		 */
		getHeaderMap(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns an object containing the query parameters included when the request was signed.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Key-value pairs that define the query parameters included when the request was signed. Each key-value pair includes these parts:
		 * 
		 * *   key: String. Name of the query parameter.
		 * *   value: String. Value of the query parameter.
		 */
		getQueryMap(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the status of the request signing.
		 *
		 *
		 * @returns {string} The status of the request signing.
		 * 
		 * Possible values:
		 * 
		 * *   SUCCESS: The system successfully signed the request.
		 * *   FAIL: The system failed to sign the request.
		 * *   SKIPPED: The system skipped signing because the information was incomplete.
		 */
		getStatus(): string
		
		/**
		 *
		 * Returns a detailed message about the request signing. If the request signing fails, this method returns the error message.
		 *
		 *
		 * @returns {string} Message about the request signing. If the request signing fails, returns one of these error messages:
		 * 
		 * *   credential is not valid: Check the AuthCredential object you used to sign the request. Make sure an authentication algorithm is associated with the credential. For more information, see [Configure an authentication algorithm](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/credentials/task/configure-authentication-algorithm.html).
		 * *   Request data is empty. Request auth is skipped: Check the HttpRequestData object because required information may be missing.
		 * *   Can't find script includes scope: Verify that the authentication algorithm record and associated script includes used to sign the request are in the correct scope.
		 */
		getStatusMessage(): string
		
		/**
		 *
		 * Defines whether to apply the signature to the signed request in the header or as a query parameter.
		 *
		 * @param {string} directive Whether to apply the signature to the header or as a query parameter of the signed request.
		 * 
		 * Values include:
		 * 
		 * *   query: Applies signature as a query parameter.
		 * *   header: Applies signature to the request header.
		 *
		 * @returns {void} Method does not return a value
		 */
		setDirective(directive: string): void
		
		/**
		 *
		 * Sets the status of the request signing.
		 *
		 * @param {string} status The status of the request signing.
		 * 
		 * Possible values:
		 * 
		 * *   success: The system successfully signed the request.
		 * *   fail: The system failed to sign the request.
		 * *   skipped: The system skipped signing because the information was incomplete.
		 *
		 * @returns {void} Method does not return a value
		 */
		setStatus(status: string): void
		
		/**
		 *
		 * Sets a status message for the request signing.
		 *
		 * @param {string} statusMessage Message to set for the request signing status.
		 *
		 * @returns {void} Method does not return a value
		 */
		setStatusMessage(statusMessage: string): void
		
	}
	
	/** 
	 * Generate outbound signing requests using these APIs in the following order:
	 * 
	 * 1.  HttpRequestData: Build the API request.
	 * 2.  AuthCredential: Create a credential object or update an existing one. Use the credential to sign the request through the RequestAuthAPI class.
	 * 3.  RequestAuthAPI: Sign the request and return an HttpRequestAuthedData object.
	 * 4.  HttpRequestAuthedData: Get information about the signed request.
	 * 5.  GlideHTTPRequest: Send the signed request.
	 * 
	 *   
	 *   
	 * Before using these APIs, you must [configure an authentication algorithm](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/credentials/task/configure-authentication-algorithm.html) to sign the request and associate it with the credential used to authenticate the request.  
	 *   
	 * Use this API in scoped scripts with the sn_auth namespace identifier. You can instantiate this class using the constructor, or you can return an HttpRequestData object from the getHttpRequestData() method in the RequestAuthAPI class.
	 * 
	 */
	class HttpRequestData {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Adds a header to the HttpRequestData object.
		 *
		 * @param {string} key Name of the HTTP header.
		 * @param {string} value Value of the HTTP Header.
		 *
		 * @returns {void} Method does not return a value
		 */
		addHeader(key: string, value: string): void
		
		/**
		 *
		 * Adds a query parameter to the HttpRequestData object.
		 *
		 * @param {string} key Name of the query parameter.
		 * @param {string} value Value of the query parameter.
		 *
		 * @returns {void} Method does not return a value
		 */
		addQueryParam(key: string, value: string): void
		
		/**
		 *
		 * Removes a header from the HttpRequestData object.
		 *
		 * @param {string} key Name of the HTTP header to remove.
		 *
		 * @returns {void} Method does not return a value
		 */
		deleteHeader(key: string): void
		
		/**
		 *
		 * Returns the sys_id of the Connection & Credential alias associated with the IntegrationHub REST step.
		 *
		 * You can pass the sys_id to the ConnectionInfoProvider API to retrieve information about the connection.
		 * 		 * 
		 * 		 * Note: You can only use this method in an IntegrationHub REST step. For more information, see [REST step](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/administer/flow-designer/reference/rest-request-action-designer-2.html).
		 *
		 *
		 * @returns {string} Sys_id of the alias record from the Connection & Credential Aliases [sys_alias] table associated with the request.
		 */
		getConnectionAliasID(): string
		
		/**
		 *
		 * Returns the value of a connection attribute associated with the Connection & Credential alias associated with IntegrationHub REST step.
		 *
		 * Note: You can only use this method in an IntegrationHub REST step. For more information, see [REST step](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/administer/flow-designer/reference/rest-request-action-designer-2.html).
		 * 		 * 
		 * 		 * For more information about connection attributes, see [Create connection attributes for IntegrationHub](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/credentials/task/create-connection-attributes.html).
		 *
		 * @param {string} name Name of the connection attribute.
		 *
		 * @returns {string} Value of the connection attribute.
		 */
		getConnectionExtendedAttribute(name: string): string
		
		/**
		 *
		 * Returns the content of the request in the HttpRequestData object.
		 *
		 *
		 * @returns {string} Content of the request.
		 */
		getContent(): string
		
		/**
		 *
		 * Returns the date when the request was signed.
		 *
		 *
		 * @returns {number} The difference between January 1, 1970 UTC and when the request was signed.
		 * 
		 * Unit: Milliseconds
		 */
		getDate(): number
		
		/**
		 *
		 * Returns whether the signature is applied to the request in the header or as a query parameter.
		 *
		 * By default, the system applies the signature to the header. You can apply the signature as a query parameter using the setDirective() API.
		 *
		 *
		 * @returns {string} Whether the signature is applied to the header or as a query parameter.
		 * 
		 * Values include:
		 * 
		 * *   HEADER: The signature is applied to the request header.
		 * *   QUERY: The signature is applied as a query parameter.
		 */
		getDirective(): string
		
		/**
		 *
		 * Returns the endpoint set for the request.
		 *
		 *
		 * @returns {string} Endpoint set for the request.
		 */
		getEndpoint(): string
		
		/**
		 *
		 * Returns the time in seconds before the signature expires starting when the request was signed using the generateAuth() method in the RequestAuthAPI class.
		 *
		 * The expiration is commonly set by the third-party service you are sending the request to, which overrides any value set by the setExpiry() method. For example, if the expiration is set to 900 seconds by the third-party service and you use the setExpiry() method to set the expiration to 300 seconds, the getExpiry() method returns 900 seconds.
		 *
		 *
		 * @returns {number} Time before the signature expires.
		 * 
		 * Unit: Seconds
		 */
		getExpiry(): number
		
		/**
		 *
		 * Returns the value associated with the given HTTP header.
		 *
		 * @param {string} key Name of HTTP header.
		 *
		 * @returns {string} Value of the given HTTP header.
		 */
		getHeader(key: string): string
		
		/**
		 *
		 * Returns an object containing the headers included in the request.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Key-value pairs that define all of the headers associated with the request.
		 * 
		 * Each key-value pair includes these parts:
		 * 
		 * *   Key: String. Name of the header.
		 * *   Value: String. Value of the header.
		 */
		getHeaderMap(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the host used in the request.
		 *
		 *
		 * @returns {string} Host used in the request.
		 */
		getHost(): string
		
		/**
		 *
		 * Returns the HTTP method used in the request.
		 *
		 *
		 * @returns {string} HTTP method used in the request.
		 */
		getHttpMethod(): string
		
		/**
		 *
		 * Returns the value of the specified query parameter.
		 *
		 * @param {string} key Name of the query parameter to get the value of.
		 *
		 * @returns {string} Value of the query parameter.
		 */
		getQueryParam(key: string): string
		
		/**
		 *
		 * Returns an object containing the query parameters included in the request.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Key-value pairs that define the query parameters associated with the request.
		 * 
		 * Each key-value pair includes these parts:
		 * 
		 * *   Key: String. Name of the query parameter.
		 * *   Value: String. Value of the query parameter.
		 */
		getQueryParamMap(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the region for the request that will be used in signing.
		 *
		 *
		 * @returns {string} Name of the region.
		 */
		getRegion(): string
		
		/**
		 *
		 * Returns the service defined in the request.
		 *
		 *
		 * @returns {string} Service defined in the request.
		 */
		getService(): string
		
		/**
		 *
		 * Defines the content to send in the request.
		 *
		 * Note: This method is not supported in script includes or MID server scripts.
		 *
		 * @param {string} content Content to send in the request.
		 *
		 * @returns {void} Method does not return a value
		 */
		setContent(content: string): void
		
		/**
		 *
		 * Defines the date of the request used for signing.
		 *
		 * Use this method only when testing whether the signature is created correctly based on a time stamp. In production, the signing request uses the time that you generated the signature; manually setting this value may cause the signing request to fail.
		 *
		 * @param {number} date The difference between January 1, 1970 UTC and the date used to sign the request.
		 * 
		 * Unit: Milliseconds
		 *
		 * @returns {void} Method does not return a value
		 */
		setDate(date: number): void
		
		/**
		 *
		 * Defines whether to apply the signature to the request in a header or as a query parameter.
		 *
		 * @param {string} directive Whether to apply the signature to the header or as a query parameter.
		 * 
		 * Values include:
		 * 
		 * *   query: Applies signature as a query parameter.
		 * *   header: Applies signature to the request header.
		 * 
		 * Default: header
		 *
		 * @returns {void} Method does not return a value
		 */
		setDirective(directive: string): void
		
		/**
		 *
		 * Defines the endpoint to send the request to.
		 *
		 * @param {string} endpoint Endpoint to send the request to. The endpoint can include query parameters, path, and version.
		 *
		 * @returns {void} Method does not return a value
		 */
		setEndpoint(endpoint: string): void
		
		/**
		 *
		 * Sets the amount of time before the signature expires starting when the request is signed using the generateAuth() method in the RequestAuthAPI class.
		 *
		 * The expiration is commonly set by the third-party service you are sending the request to, which overrides any value set by the setExpiry() method. For example, if the expiration is set to 900 seconds by the third-party service and you use the setExpiry() method to set the expiration to 300 seconds, the getExpiry() method returns 900 seconds.
		 *
		 * @param {number} expiry Amount of time before the signature expires.
		 * 
		 * Unit: Seconds
		 *
		 * @returns {void} Method does not return a value
		 */
		setExpiry(expiry: number): void
		
		/**
		 *
		 * Defines the host used in the request.
		 *
		 * @param {string} host Name of the HTTP request host.
		 *
		 * @returns {void} Method does not return a value
		 */
		setHost(host: string): void
		
		/**
		 *
		 * Sets the HTTP method to use in the request.
		 *
		 * @param {string} httpMethod HTTP method to use in the request.
		 *
		 * @returns {void} Method does not return a value
		 */
		setHttpMethod(httpMethod: string): void
		
		/**
		 *
		 * Defines the region to use for the request in signing.
		 *
		 * @param {string} region The region to use to sign the request. Available values are determined by the third-party API's requirements.
		 *
		 * @returns {void} Method does not return a value
		 */
		setRegion(region: string): void
		
		/**
		 *
		 * Defines the service for the request.
		 *
		 * @param {string} service The service for the request.
		 *
		 * @returns {void} Method does not return a value
		 */
		setService(service: string): void
		
	}
	
	/** 
	 * Generate outbound signing requests using these APIs in the following order:
	 * 
	 * 1.  HttpRequestData: Build the API request.
	 * 2.  AuthCredential: Create a credential object or update an existing one. Use the credential to sign the request through the RequestAuthAPI class.
	 * 3.  RequestAuthAPI: Sign the request and return an HttpRequestAuthedData object.
	 * 4.  HttpRequestAuthedData: Get information about the signed request.
	 * 5.  GlideHTTPRequest: Send the signed request.
	 * 
	 *   
	 *   
	 * Before using these APIs, you must [configure an authentication algorithm](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/product/credentials/task/configure-authentication-algorithm.html) to sign the request and associate it with the credential used to authenticate the request.  
	 *   
	 * Use this API in scoped scripts with the sn_auth namespace identifier.
	 * 
	 */
	class RequestAuthAPI {
	
		/**
		 *
		 * @param {{[fieldName: string]: string}} data HttpRequestData object that contains the unsigned REST request. Use the HttpRequestData class to build this object. See [HttpRequestData API](https://developer.servicenow.com/go_to_api.do?ID=HttpRequestDataAPI&v=orlando).
		 * @param {{[fieldName: string]: string}} credential Object that represents a record from the Credentials [discovery_credentials] table. Retrieve this object using the AuthCredential class. See [AuthCredential API](https://developer.servicenow.com/go_to_api.do?ID=AuthCredentialAPI&v=orlando).
		 *
		 */
		constructor(data: {[fieldName: string]: string}, credential: {[fieldName: string]: string})
		
		/**
		 *
		 * Signs the HttpRequestData object and returns an HttpRequestAuthedData object to use to send in the REST request.
		 *
		 *
		 * @returns {HttpRequestAuthedData} Object. Data to use to obtain information about the signed result. Use the methods in the HttpRequestAuthedData class to interact with the signed result. See [HttpRequestAuthedData API](https://developer.servicenow.com/go_to_api.do?ID=HttpRequestAuthedDataAPI&v=orlando).
		 */
		generateAuth(): HttpRequestAuthedData
		
		/**
		 *
		 * Returns the credential record used to sign the request.
		 *
		 *
		 * @returns {AuthCredential} Object. Data to use to obtain information about the credential record used to sign the request. Use the methods in the AuthCredential class to interact with the credential. See [AuthCredential API](https://developer.servicenow.com/go_to_api.do?ID=AuthCredentialAPI&v=orlando).
		 */
		getAuthCredential(): AuthCredential
		
		/**
		 *
		 * Returns the HttpRequestData object that was used to instantiate the RequestAuthAPI class.
		 *
		 *
		 * @returns {HttpRequestData} Object. Contains the unsigned REST request. Use the methods in the HttpRequestData class to interact with the request. See [HttpRequestData API](https://developer.servicenow.com/go_to_api.do?ID=HttpRequestDataAPI&v=orlando).
		 */
		getHttpRequestData(): HttpRequestData
		
		/**
		 *
		 * Generates a temporary, limited privilege token that you can use to provide trusted users with temporary security credentials to control third-party resources.
		 *
		 * To use this method, the third-party service must include an API or SDK that processes and manages limited access tokens.
		 *
		 *
		 * @returns {void} Method does not return a value
		 */
		resetAuthCredential(): void
		
	}
	
}