declare namespace sn_ws {

	/** 
	 * Note: You cannot instantiate objects of this type. Objects of this type are created automatically and are accessible only in scripted REST API resource scripts.
	 * 
	 */
	class RESTAPIRequest {
	
		/**
		 *
		 * Returns the value of a specific header from the web service request.
		 *
		 * @param {string} header The name of the header, such as accept or content-type.
		 *
		 * @returns {string} The value of the specified header.
		 */
		getHeader(header: string): string
		
		/**
		 *
		 * Get the content types specified in the request Accept header.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} An array of string values where each string is a content type, such as application/json.
		 */
		getSupportedResponseContentTypes(): {[fieldName: string]: string}
		
	}
	
	/** 
	 * The format of a RESTAPIRequestBody object may be JSON or XML, depending on the content-type header value from the request.
	 * 
	 * Note: You cannot instantiate objects of this type. Objects of this type are created automatically and are accessible only in scripted REST API resource scripts.
	 * 
	 *   
	 *   
	 * Single entry example-request-body in JSON format.
	 * 
	 *     {
	 *      "name": "user1",
	 *      "id": 1234,
	 *      "roles": [
	 *       {
	 *        "name": "admin"
	 *       },
	 *       {
	 *        "name": "itil"
	 *       }
	 *      ]
	 *     }
	 * 
	 *   
	 *   
	 * Multiple entry example-request-body in JSON format.
	 * 
	 *     [{
	 *      "name": "user1",
	 *      "id": 1234,
	 *      "roles": [
	 *       {
	 *        "name": "admin"
	 *       },
	 *       {
	 *        "name": "itil"
	 *       }
	 *      ]
	 *     },{
	 *      "name": "user2",
	 *      "id":9876,
	 *      "roles": [
	 *       {
	 *        "name":"admin"
	 *       }
	 *      ]
	 *     }]
	 * 
	 *   
	 *   
	 * Important: If the request body format is not of a json or xml subtype, use only the request body dataStream field to access the request body. Using request body data, dataString, nextEntry(), or hasNext() with a non-json or non-xml format results in a 500 error response.
	 * 
	 */
	class RESTAPIRequestBody {
	
		/**
		 *
		 * Determines if there are additional entries in the request body.
		 *
		 * Use this method with the nextEntry() method to iterate over multiple request body entries.
		 *
		 *
		 * @returns {boolean} Flag indicating whether there are additional entries in the request body.
		 * 
		 * Possible values:
		 * 
		 * *   true: Additional entries are available. As nextEntry() is called, hasNext() continues to be true until the last matching record is loaded.
		 * *   false: No additional entries.
		 */
		hasNext(): boolean
		
		/**
		 *
		 * Retrieve one entry from the request body as a script object.
		 *
		 * Use this method with the hasNext() method to iterate over multiple request body entries.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} A single entry from the request body.
		 */
		nextEntry(): {[fieldName: string]: string}
		
	}
	
	/** 
	 * Note: You cannot instantiate objects of this type. Objects of this type are created automatically and are accessible only in scripted REST API resource scripts.
	 * 
	 */
	class RESTAPIResponse {
	
		/**
		 *
		 * Returns the ResponseStreamWriter for this response, allowing you to write directly to the response stream.
		 *
		 * Set the content type and status code using the setHeaders and setStatus functions prior to calling the getStreamWriter function.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The ResponseStreamWriter for this response. You can use this object to write directly to the response stream.
		 */
		getStreamWriter(): {[fieldName: string]: string}
		
		/**
		 *
		 * Sets the body content to send in the web service response.
		 *
		 * @param {{[fieldName: string]: string}} body The response body, as a JavaScript object.
		 * 
		 * The body content is automatically serialized to JSON or XML depending on the value of the Accept header passed in the request.
		 *
		 * @returns {void} Method does not return a value
		 */
		setBody(body: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Assigns a value to the Content-Type header in the web service response.
		 *
		 * You must set a response content type before writing the response. The content type is set automatically for string responses, based on the request Accept header value.
		 * 		 * 
		 * 		 * Setting an invalid content type causes the response to default to JSON. Failing to set a content type results in a status code 500 error when sending a binary response.
		 * 		 * 
		 * 		 * See the [W3 Content-Type header documentation](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17) for more information about this header.
		 *
		 * @param {string} contentType The content type of the response body, such as application/json.
		 *
		 * @returns {void} Method does not return a value
		 */
		setContentType(contentType: string): void
		
		/**
		 *
		 * Configures the REST response to return an error.
		 *
		 * @param {{[fieldName: string]: string}} error Error object.
		 *
		 * @returns {void} Method does not return a value
		 */
		setError(error: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Assign a value to a REST service response header.
		 *
		 * @param {string} header The header you want to set.
		 * @param {string} value The value to assign the specified header.
		 *
		 * @returns {void} Method does not return a value
		 */
		setHeader(header: string, value: string): void
		
		/**
		 *
		 * Sets the headers for the web service response.
		 *
		 * @param {{[fieldName: string]: string}} headers A JavaScript object listing each header and the value to assign that header.
		 *
		 * @returns {void} Method does not return a value
		 */
		setHeaders(headers: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Assigns a value to the Location header in the web service response.
		 *
		 * See the [W3 Location header documentation](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.30) for more information about this header.
		 *
		 *
		 * @returns {void} Method does not return a value
		 */
		setLocation(): void
		
		/**
		 *
		 * Sets the status code number for the web service response.
		 *
		 * @param {number} status The status code to send in the response, such as 200 to indicate success. Passing a non-numerical value, such as a string, causes the status code to default to 0.
		 *
		 * @returns {void} Method does not return a value
		 */
		setStatus(status: number): void
		
	}
	
	/** 
	 * Use RESTAPIResponseStream methods to build web service APIs in the [Scripted REST API](https://docs.servicenow.com/bundle/paris-application-development/page/integrate/custom-web-services/concept/c_CustomWebServices.html) feature.
	 * 
	 * Note: You cannot instantiate objects of this type. Objects of this type are created automatically and are accessible only in scripted REST API resource scripts.
	 * 
	 */
	class RESTAPIResponseStream {
	
		/**
		 *
		 * Write an input stream to the response stream.
		 *
		 * You must set the content type and status code before calling the writeStream() method or the response will fail. You cannot modify these values after calling the writeStream() method.
		 * 		 * 
		 * 		 * Note:
		 * 		 * 
		 * 		 * It is the responsibility of the script author to obtain the stream from a third-party service.
		 *
		 * @param {{[fieldName: string]: string}} stream An attachment or a response stream from a third-party service.
		 *
		 * @returns {void} Method does not return a value
		 */
		writeStream(stream: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Write string data to the response stream.
		 *
		 * You must set the content type and status code before calling the writeString() method or the response will fail. You cannot modify these values after calling the writeString() method.
		 *
		 * @param {string} data The string to add to the response data.
		 *
		 * @returns {void} Method does not return a value
		 */
		writeString(data: string): void
		
	}
	
	/** 
	 * Use the RESTResponseV2 API to manage the response returned by the REST provider.  
	 *   
	 * You can use this API in scoped applications, or within the global scope.
	 * 
	 */
	class RESTMessageV2 {
	
		/**
		 *
		 * @param {string} name The name of the REST message record.
		 * @param {string} methodName The name of the HTTP method to use, such as GET/get or PUT/put - case insensitive.
		 *
		 */
		constructor(name: string, methodName: string)
		
		/**
		 *
		 * Send the REST message to the endpoint.
		 *
		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The response returned by the REST provider.
		 */
		execute(): {[fieldName: string]: string}
		
		/**
		 *
		 * Send the REST message to the endpoint asynchronously. The instance does not wait for a response from the web service provider when making asynchronous calls.
		 *
		 * In the following example, replace REST_message_record with the name of the REST message record from your instance. When using executeAsync, consider processing the response body in a separate business rule to take advantage of the asynchronous call.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The response returned by the REST provider.
		 */
		executeAsync(): {[fieldName: string]: string}
		
		/**
		 *
		 * Get the URL of the endpoint for the REST message.
		 *
		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 *
		 * @returns {string} The URL of the REST web service provider.
		 */
		getEndpoint(): string
		
		/**
		 *
		 * Get the content of the REST message body.
		 *
		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 *
		 * @returns {string} the REST message body.
		 */
		getRequestBody(): string
		
		/**
		 *
		 * Get the value for an HTTP header specified in the REST message.
		 *
		 * By default, this method cannot return the value for a header set automatically by the system. To grant this method access to all headers, set the property glide.http.log_debug to true.
		 * 		 * 
		 * 		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {string} headerName The request header you want to get the value for.
		 *
		 * @returns {string} The value of the specified header.
		 */
		getRequestHeader(headerName: string): string
		
		/**
		 *
		 * Get HTTP headers that were set by the REST client and the associated values.
		 *
		 * This method does not return headers set automatically by the system. To configure this method to return all headers, set the property glide.http.log_debug to true.
		 * 		 * 
		 * 		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} An Object that maps the name of each header to the associated value.
		 */
		getRequestHeaders(): {[fieldName: string]: string}
		
		/**
		 *
		 * Configures the REST message to save the returned response body as an attachment record.
		 *
		 * When you use this function with a REST message that is sent through a MID server, the MID server user must have any roles required to read and write attachment records, as well as any roles required to read and write records on the table specified in the tableName parameter.
		 * 		 * 
		 * 		 * The response body does not need to be a binary file to be saved as an attachment. Response bodies using text formats, such as JSON or XML can also be saved. If the instance fails to save the attachment, call getErrorMessage() on the related RESTResponseV2 object for error details.
		 *
		 * @param {string} tableName Specify the table that contains the record you want to attach the saved file to.
		 * @param {string} recordSysId Specify the sys_id of the record you want to attach the saved file to.
		 * @param {string} fileName Specify the file name to give to the saved file.
		 *
		 * @returns {void} Method does not return a value
		 */
		saveResponseBodyAsAttachment(tableName: string, recordSysId: string, fileName: string): void
		
		/**
		 *
		 * Configure the REST message to save the returned response body as an encrypted attachment record.
		 *
		 * When you use this function with a REST message that is sent through a MID server, the MID server user must have any roles required to read and write attachment records, as well as any roles required to read and write records on the table specified in the tableName parameter.
		 * 		 * 
		 * 		 * The response body does not need to be a binary file to be saved as an attachment. Response bodies using text formats, such as JSON or XML can also be saved. If the instance fails to save the attachment, call getErrorMessage() on the related RESTResponseV2 object for error details.
		 *
		 * @param {string} tableName Specify the table that contains the record you want to attach the saved file to.
		 * @param {string} recordSysId Specify the sys_id of the record you want to attach the saved file to.
		 * @param {string} fileName Specify the file name to give to the saved file.
		 * @param {string} encryptContext Specify the sys_id of an encryption context. The saved file is encrypted using this context.
		 *
		 * @returns {void} Method does not return a value
		 */
		saveResponseBodyAsAttachment(tableName: string, recordSysId: string, fileName: string, encryptContext: string): void
		
		/**
		 *
		 * Set the credentials for the REST message using an existing basic auth or OAuth 2.0 profile.
		 *
		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {string} type The type of authentication profile to use. Valid values are 'basic' to use basic authentication, or 'oauth2' to use OAuth 2.0.
		 * @param {string} profileId The sys_id of an authentication profile record. When using basic auth, specify the sys_id of a Basic Auth Configuration [sys_auth_profile_basic] record. When using OAuth 2.0, specify the sys_id of a OAuth Entity Profile [oauth_entity_profile] record.
		 *
		 * @returns {void} Method does not return a value
		 */
		setAuthenticationProfile(type: string, profileId: string): void
		
		/**
		 *
		 * Sets basic authentication headers for the REST message.
		 *
		 * Setting security values using this method overrides basic authentication values defined for the REST message record.
		 * 		 * 
		 * 		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {string} userName The username you want to use to authenticate the REST message.
		 * @param {string} userPass The password for the specified user.
		 *
		 * @returns {void} Method does not return a value
		 */
		setBasicAuth(userName: string, userPass: string): void
		
		/**
		 *
		 * Associate outbound requests and the resulting response record in the ECC queue. This method only applies to REST messages sent through a MID Server.
		 *
		 * The correlator provided populates the Agent correlator field on the ECC queue record for the response. Provide a unique correlator for each outbound request to associate the correct results in the ECC queue with the request when designing asynchronous automation through a MID Server.
		 * 		 * 
		 * 		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {string} correlator A unique identifier
		 *
		 * @returns {void} Method does not return a value
		 */
		setEccCorrelator(correlator: string): void
		
		/**
		 *
		 * Override a value from the database by writing to the REST message payload. This method only applies to REST messages sent through a MID Server.
		 *
		 * Use this method when a value from the REST message in the database is invalid, such as when the endpoint URL is longer than the maximum REST endpoint field length. You can set only the endpoint URL using this method by passing source as the name parameter.
		 * 		 * 
		 * 		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {string} name The name of the parameter, such as source.
		 * @param {string} value The value to assign to the specified parameter.
		 *
		 * @returns {void} Method does not return a value
		 */
		setEccParameter(name: string, value: string): void
		
		/**
		 *
		 * Set the endpoint for the REST message.
		 *
		 * By default, the REST message uses the endpoint specified in the REST message record. Use this method to override this default. You must call this method when using the [RESTMessageV2 - RESTMessageV2()](dev.do#!/reference/api/paris/server/sn_ws-namespace/c_RESTMessageV2API#r_RMV2-RESTMessageV2 "Instantiates an empty RESTMessageV2 object.") constructor with no parameters.
		 *
		 * @param {string} endpoint The URL of the REST provider you want to interface with.
		 *
		 * @returns {void} Method does not return a value
		 */
		setEndpoint(endpoint: string): void
		
		/**
		 *
		 * The HTTP method this REST message performs, such as GET or PUT.
		 *
		 * You must set an HTTP method when using the [RESTMessageV2 - RESTMessageV2()](dev.do#!/reference/api/paris/server/sn_ws-namespace/c_RESTMessageV2API#r_RMV2-RESTMessageV2 "Instantiates an empty RESTMessageV2 object.") constructor with no parameters.
		 *
		 * @param {string} method The HTTP method to perform.
		 *
		 * @returns {void} Method does not return a value
		 */
		setHttpMethod(method: string): void
		
		/**
		 *
		 * Set the amount of time the REST message waits for a response from the web service provider before the request times out.
		 *
		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {number} timeoutMs The amount of time, in milliseconds, before the call to the REST provider times out.
		 *
		 * @returns {void} Method does not return a value
		 */
		setHttpTimeout(timeoutMs: number): void
		
		/**
		 *
		 * Set the log level for this message and the corresponding response.
		 *
		 * Setting a log level using the RESTMessageV2 API overrides the log level configured on the REST message record. This log level may not apply if the endpoint domain is blacklisted, or if the property glide.outbound_http_log.override is true. To view outbound web service logs, navigate to System Logs > Outbound HTTP Requests.
		 *
		 * @param {string} level The log level. Valid values are basic, elevated, and all.
		 *
		 * @returns {void} Method does not return a value
		 */
		setLogLevel(level: string): void
		
		/**
		 *
		 * Configure the REST message to communicate through a MID Server.
		 *
		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {string} midServer The name of the MID Server to use. Your instance must have an active MID Server with the specified name.
		 *
		 * @returns {void} Method does not return a value
		 */
		setMIDServer(midServer: string): void
		
		/**
		 *
		 * Set the mutual authentication protocol profile for the REST message.
		 *
		 * Setting a protocol profile using this method overrides the protocol profile selected for the REST message record.
		 * 		 * 
		 * 		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {string} profileName The Name of the protocol profile to use for mutual authentication.
		 *
		 * @returns {void} Method does not return a value
		 */
		setMutualAuth(profileName: string): void
		
		/**
		 *
		 * Append a parameter to the end of the request URL with the form name=value.
		 *
		 * For example, the code setQueryParameter("sysparm_query","active=true^ORDERBYnumber^ORDERBYDESCcategory"); appends the text sysparm_query=active=true^ORDERBYnumber^ORDERBYDESCcategory to the request URL.
		 *
		 * @param {string} name The name of the URL parameter to pass.
		 * @param {string} value The value to assign the URL parameter.
		 *
		 * @returns {void} Method does not return a value
		 */
		setQueryParameter(name: string, value: string): void
		
		/**
		 *
		 * Set the body content to send to the web service provider when using PUT or POST HTTP methods.
		 *
		 * When you set the body content using this method, variables in the body are not substituted for parameters from the REST message function record. You must explicitly define all values within the REST message body.
		 *
		 * @param {string} body The request body to send.
		 *
		 * @returns {void} Method does not return a value
		 */
		setRequestBody(body: string): void
		
		/**
		 *
		 * Sets the request body using an existing attachment record.
		 *
		 * When you use this function with a REST message that is sent through a MID server, the MID server user must have any roles required to read attachment records.
		 *
		 * @param {string} attachmentSysId The sys_id of the Attachment [sys_attachment] record you want to send in this REST message.
		 *
		 * @returns {void} Method does not return a value
		 */
		setRequestBodyFromAttachment(attachmentSysId: string): void
		
		/**
		 *
		 * Set an HTTP header in the REST message to the specified value.
		 *
		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {string} name The name of the header.
		 * @param {string} value The value to assign to the specified header.
		 *
		 * @returns {void} Method does not return a value
		 */
		setRequestHeader(name: string, value: string): void
		
		/**
		 *
		 * Override the default requestor profile for the REST message in order to retrieve an OAuth access token associated with a different requestor.
		 *
		 * This method applies only to REST messages configured to use OAuth 2.0 authentication. This method is optional and is unnecessary in most configurations.
		 *
		 * @param {string} requestorContext 
		 * @param {string} requestorId 
		 *
		 * @returns {void} Method does not return a value
		 */
		setRequestorProfile(requestorContext: string, requestorId: string): void
		
		/**
		 *
		 * Set a REST message function variable with the specified name from the REST message record to the specified value.
		 *
		 * XML reserved characters in the value are converted to the equivalent escaped characters. Use setStringParameterNoEscape to set a variable without escaping XML reserved characters.
		 * 		 * 
		 * 		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {string} name The name of the REST message variable. This parameter must be defined in the REST message record before you can assign a value to it.
		 * @param {string} value The value to assign the variable.
		 *
		 * @returns {void} Method does not return a value
		 */
		setStringParameter(name: string, value: string): void
		
		/**
		 *
		 * Set a REST message function variable with the specified name from the REST message record to the specified value.
		 *
		 * This method is equivalent to setStringParameter but does not escape XML reserved characters.
		 * 		 * 
		 * 		 * In the following example, replace REST_message_record with the name of the REST message record from your instance.
		 *
		 * @param {string} name The name of the REST message variable. This parameter must be defined in the REST message record before you can assign a value to it.
		 * @param {string} value The value to assign the variable.
		 *
		 * @returns {void} Method does not return a value
		 */
		setStringParameterNoEscape(name: string, value: string): void
		
	}
	
	/** 
	 * A RESTResponseV2 object is returned by the RESTMessageV2 methods execute() and executeAsync().  
	 *   
	 * You can use this API in scoped applications, or within the global scope.
	 * 
	 */
	class RESTResponseV2 {
	
		/**
		 *
		 * Returns all headers contained in the response, including any duplicate headers.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} List of headers contained in the response. Each header is represented as a GlideHTTPHeader object which contains the header name and value.
		 */
		getAllHeaders(): {[fieldName: string]: string}
		
		/**
		 *
		 * Get the content of the REST response body.
		 *
		 * Use this function when you want to get the request body as text content. Do not use this method when saving the response as a binary attachment. If a RESTMessageV2 object called the saveResponseBodyAsAttachment(...) function, using getBody() on the associated RESTResponseV2 object will cause an error. When saving the response as an attachment, if the outbound REST message fails, call getErrorMessage() on the response to retrieve the body content.
		 *
		 *
		 * @returns {string} The REST response body.
		 */
		getBody(): string
		
		/**
		 *
		 * Returns all cookies included in the response.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Array of strings representing cookies. Iterate through the array to perform operations on each cookie.
		 */
		getCookies(): {[fieldName: string]: string}
		
		/**
		 *
		 * Get the numeric error code if there was an error during the REST transaction.
		 *
		 * This error code is specific to the Now Platform, it is not an HTTP error code. Provide this error code if you require assistance from ServiceNow Customer Support
		 *
		 *
		 * @returns {number} The numeric error code, such as 1 for socket timeout.
		 */
		getErrorCode(): number
		
		/**
		 *
		 * Get the error message if there was an error during the REST transaction.
		 *
		 *
		 * @returns {string} The error message.
		 */
		getErrorMessage(): string
		
		/**
		 *
		 * Get the value for a specified header.
		 *
		 * @param {string} name The name of the header that you want the value for, such as Set-Cookie.
		 *
		 * @returns {string} The value of the specified header.
		 */
		getHeader(name: string): string
		
		/**
		 *
		 * Get all headers returned in the REST response and the associated values.
		 *
		 * Note: If a header is present more than once in the response, such as a Set-Cookie header, this function returns only the last of the duplicate headers. To return all headers including duplicates, use the getAllHeaders() function.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} An Object that maps the name of each header to the associated value.
		 */
		getHeaders(): {[fieldName: string]: string}
		
		/**
		 *
		 * Get the fully-resolved query sent to the REST endpoint..
		 *
		 * This query contains the endpoint URL as well as any values assigned to variables in the REST message. Use this method only with responses to direct requests. This method is not supported for requests sent asynchronously, or requests sent using a MID server.
		 *
		 *
		 * @returns {string} The fully-resolved query.
		 */
		getQueryString(): string
		
		/**
		 *
		 * Get the sys_id value of the attachment created from the response body content.
		 *
		 * If the RESTMessageV2 object associated with this response called the saveResponseBodyAsAttachment(...) function, use getResponseAttachmentSysid() to get the sys_id of the created attachment record. Use this function when you want to perform additional operations with the new attachment record.
		 *
		 *
		 * @returns {string} The sys_id of the new attachment record.
		 */
		getResponseAttachmentSysid(): string
		
		/**
		 *
		 * Get the numeric HTTP status code returned by the REST provider.
		 *
		 *
		 * @returns {number} The numeric status code returned by the REST provider, such as 200 for a successful response.
		 */
		getStatusCode(): number
		
		/**
		 *
		 * Indicate if there was an error during the REST transaction.
		 *
		 *
		 * @returns {boolean} Returns true if there was an error, false if there was no error.
		 */
		haveError(): boolean
		
		/**
		 *
		 * Set the amount of time the instance waits for a response from the web service provider.
		 *
		 * This method overrides the property glide.rest.outbound.ecc_response.timeout for this REST response.
		 *
		 * @param {number} timeoutSecs The amount of time, in seconds, to wait for this response.
		 *
		 * @returns {void} Method does not return a value
		 */
		waitForResponse(timeoutSecs: number): void
		
	}
	
	/** 
	 * Use the SOAPResponseV2 API to manage the response returned by the SOAP provider.  
	 *   
	 * You can use this API in scoped applications, or within the global scope.  
	 *   
	 * See also:
	 * 
	 * *   [Direct SOAPMessageV2 example](https://docs.servicenow.com/bundle/paris-application-development/page/app-store/dev_portal/API_reference/SOAPMessageV2/reference/r_DirectSOAPMessageV2Example.html)
	 * *   [Recordless SOAPMessageV2 example](https://docs.servicenow.com/bundle/paris-application-development/page/app-store/dev_portal/API_reference/SOAPMessageV2/reference/r_RecordlessSOAPMessageV2Example.html)
	 * *   [Asynchronous SOAPMessageV2 example](https://docs.servicenow.com/bundle/paris-application-development/page/app-store/dev_portal/API_reference/SOAPMessageV2/reference/r_AsyncronousSOAPMessageV2Example.html)
	 * *   [SOAPMessageV2 MID server example](https://docs.servicenow.com/bundle/paris-application-development/page/app-store/dev_portal/API_reference/SOAPMessageV2/reference/r_SOAPMessageV2MIDServerExample.html)
	 * 
	 */
	class SOAPMessageV2 {
	
		/**
		 *
		 * @param {string} soapMessage The SOAP message record you want to use as the base for this object.
		 * @param {string} soapFunction The SOAP function you want to execute. Available SOAP functions depend on the WSDL supplied by the web service provider.
		 *
		 */
		constructor(soapMessage: string, soapFunction: string)
		
		/**
		 *
		 * Send the SOAP message to the endpoint.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The response returned by the SOAP provider.
		 */
		execute(): {[fieldName: string]: string}
		
		/**
		 *
		 * Send the SOAP message to the ECC queue.
		 *
		 * SOAP messages in the ECC queue are processed by the SOAPClient business rule.
		 * 		 * 
		 * 		 * By default, this business rule does not run asynchronously. To configure this business rule to run asynchronously, set the When value to Async and add current.update() to the end of the Script. The instance does not wait for a response from the web service provider when sending a message through the ECC queue.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The response returned by the SOAP provider.
		 * 
		 * Note: Attempting to use the SOAP response object before the response has been processed may result in a timeout error.
		 */
		executeAsync(): {[fieldName: string]: string}
		
		/**
		 *
		 * Get the endpoint for the SOAP message.
		 *
		 *
		 * @returns {string} The URL of the SOAP web service provider.
		 */
		getEndpoint(): string
		
		/**
		 *
		 * Returns the content of the SOAP message body.
		 *
		 * Note: Before calling the getRequestBody() method, you must call the [execute()](dev.do#!/reference/api/paris/server/sn_ws-namespace/c_SOAPMessageV2API#r_SMV2-execute "Send the SOAP message to the endpoint.") method to obtain the response object.
		 *
		 *
		 * @returns {string} SOAP message body.
		 */
		getRequestBody(): string
		
		/**
		 *
		 * Get the value for an HTTP header specified by the SOAP client.
		 *
		 * By default, this method cannot return the value for a header set automatically by the system. To grant this method access to all headers, set the property glide.http.log_debug to true.
		 *
		 * @param {string} headerName The request header you want to get the value for.
		 *
		 * @returns {string} The value of the specified header.
		 */
		getRequestHeader(headerName: string): string
		
		/**
		 *
		 * Get HTTP headers that were set by the SOAP client and the associated values.
		 *
		 * This method does not return headers set automatically by the system. To configure this method to return all headers, set the property glide.http.log_debug to true.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} An Object that maps the name of each header to the associated value.
		 */
		getRequestHeaders(): {[fieldName: string]: string}
		
		/**
		 *
		 * Set basic authentication headers for the SOAP message.
		 *
		 * Setting basic authentication headers using this method overrides basic authentication values defined in the SOAP message record.
		 *
		 * @param {string} userName The username to use when authenticating the SOAP message.
		 * @param {string} userPass The password for the specified user.
		 *
		 * @returns {void} Method does not return a value
		 */
		setBasicAuth(userName: string, userPass: string): void
		
		/**
		 *
		 * Associate outbound requests and the resulting response record in the ECC queue.
		 *
		 * This method only applies to SOAP messages sent through a MID Server. The correlator provided populates the Agent correlator field on the ECC queue record for the response. Provide a unique correlator for each outbound request to associate the correct results in the ECC queue with the request when designing asynchronous automation through a MID Server.
		 *
		 * @param {string} correlator A unique identifier.
		 *
		 * @returns {void} Method does not return a value
		 */
		setEccCorrelator(correlator: string): void
		
		/**
		 *
		 * Override a value from the database by writing to the SOAP message payload.
		 *
		 * This method only applies to SOAP messages sent through a MID Server. Use this method when a value from the SOAP message in the database is invalid, such as when the endpoint URL is longer than the maximum SOAP endpoint field length.
		 * 		 * 
		 * 		 * These are valid values for the name parameter.
		 * 		 * 
		 * 		 * *   source: the endpoint URL.
		 * 		 * *   name: the SOAP message function to run.
		 *
		 * @param {string} name The name of the ECC parameter.
		 * @param {string} value The value to assign to the specified ECC parameter.
		 *
		 * @returns {void} Method does not return a value
		 */
		setEccParameter(name: string, value: string): void
		
		/**
		 *
		 * Set the endpoint for the SOAP message.
		 *
		 * By default, the SOAP message uses the endpoint specified in the SOAP message record. Use this method to override the default. You must call this method when using the [SOAPMessageV2()](dev.do#!/reference/api/paris/server/sn_ws-namespace/c_SOAPMessageV2API#r_SMV2-SOAPMessageV2 "Instantiates an empty SOAPMessageV2 object.") constructor with no parameters.
		 *
		 * @param {string} endpoint The URL of the SOAP web service provider you want to interface with.
		 *
		 * @returns {void} Method does not return a value
		 */
		setEndpoint(endpoint: string): void
		
		/**
		 *
		 * Set the amount of time the SOAP message waits for a response from the web service provider before the request times out.
		 *
		 * @param {number} timeoutMs The amount of time to wait for a response from the web service provider, in milliseconds.
		 *
		 * @returns {void} Method does not return a value
		 */
		setHttpTimeout(timeoutMs: number): void
		
		/**
		 *
		 * Sets the log level for this message and the corresponding response.
		 *
		 * Setting a log level using the SOAPMessageV2 API overrides the log level configured on the SOAP message record. This log level may not apply if the endpoint domain is blacklisted, or if the property glide.outbound_http_log.override is true. To view outbound web service logs, navigate to System Logs > Outbound HTTP Requests.
		 *
		 * @param {string} level The log level. Valid values are basic, elevated, and all.
		 *
		 * @returns {void} Method does not return a value
		 */
		setLogLevel(level: string): void
		
		/**
		 *
		 * Configure the SOAP message to be sent through a MID Server.
		 *
		 * By default, the SOAP message uses the MID Server specified in the SOAP message function record. Use this method to override the default.
		 *
		 * @param {string} midServerName The name of the MID Server you want to send the SOAP message through. Your instance must have an active MID Server with the specified name.
		 *
		 * @returns {void} Method does not return a value
		 */
		setMIDServer(midServerName: string): void
		
		/**
		 *
		 * Set the mutual authentication protocol profile for the SOAP message.
		 *
		 * Setting a protocol profile using this method overrides the protocol profile selected for the SOAP message record.
		 *
		 * @param {string} profileName The name of the protocol profile to use for mutual authentication.
		 *
		 * @returns {void} Method does not return a value
		 */
		setMutualAuth(profileName: string): void
		
		/**
		 *
		 * Set the body content to send to the web service provider.
		 *
		 * When you set the body content using this method, variables in the body are not substituted for parameters from the SOAP message function record. You must explicitly define all values within the SOAP message body.
		 *
		 * @param {string} requestBody The body of the SOAP message.
		 *
		 * @returns {void} Method does not return a value
		 */
		setRequestBody(requestBody: string): void
		
		/**
		 *
		 * Set an HTTP header in the SOAP message to the specified value.
		 *
		 * @param {string} headerName The name of the header.
		 * @param {string} headerValue The value to assign to the specified header.
		 *
		 * @returns {void} Method does not return a value
		 */
		setRequestHeader(headerName: string, headerValue: string): void
		
		/**
		 *
		 * Define the SOAP action this SOAP message performs.
		 *
		 * The WSDL for your web service provider lists SOAP actions you can perform. You must call this method when using the [SOAPMessageV2()](dev.do#!/reference/api/paris/server/sn_ws-namespace/c_SOAPMessageV2API#r_SMV2-SOAPMessageV2 "Instantiates an empty SOAPMessageV2 object.") constructor with no parameters.
		 *
		 * @param {string} soapAction The SOAP action this SOAP message performs.
		 *
		 * @returns {void} Method does not return a value
		 */
		setSOAPAction(soapAction: string): void
		
		/**
		 *
		 * Set a variable with the specified name from the SOAP message record to the specified value.
		 *
		 * XML reserved characters in the value are converted to the equivalent escaped characters.
		 *
		 * @param {string} name The name of the SOAP message variable.
		 * @param {string} value The value to assign to the specified variable.
		 *
		 * @returns {void} Method does not return a value
		 */
		setStringParameter(name: string, value: string): void
		
		/**
		 *
		 * Set a variable with the specified name from the SOAP message record to the specified value.
		 *
		 * This method is equivalent to setStringParameter but does not escape XML reserved characters.
		 *
		 * @param {string} name The name of the SOAP message variable.
		 * @param {string} value The value to assign to the specified variable.
		 *
		 * @returns {void} Method does not return a value
		 */
		setStringParameterNoEscape(name: string, value: string): void
		
		/**
		 *
		 * Sets web service security values for the SOAP message.
		 *
		 * Setting security values using this method overwrites web service security values defined for the SOAP message record.
		 *
		 * @param {string} keystoreId The sys_id of the Java or PKCS12 key store to use.
		 * @param {string} keystoreAlias The alias that identifies the public and private keys.
		 * @param {string} keystorePassword The password assigned to the key store record.
		 * @param {string} certificateId The sys_id of the trusted server certificate.
		 *
		 * @returns {void} Method does not return a value
		 */
		setWSSecurity(keystoreId: string, keystoreAlias: string, keystorePassword: string, certificateId: string): void
		
	}
	
	/** 
	 * A SOAPResponseV2 object is returned by the SOAPMessageV2 methods execute() and executeAsync().  
	 *   
	 * You can use this API in scoped applications, or within the global scope.  
	 *   
	 * See also:
	 * 
	 * *   [Direct SOAPMessageV2 example](https://docs.servicenow.com/bundle/paris-application-development/page/app-store/dev_portal/API_reference/SOAPMessageV2/reference/r_DirectSOAPMessageV2Example.html)
	 * *   [Recordless SOAPMessageV2 example](https://docs.servicenow.com/bundle/paris-application-development/page/app-store/dev_portal/API_reference/SOAPMessageV2/reference/r_RecordlessSOAPMessageV2Example.html)
	 * *   [Asynchronous SOAPMessageV2 example](https://docs.servicenow.com/bundle/paris-application-development/page/app-store/dev_portal/API_reference/SOAPMessageV2/reference/r_AsyncronousSOAPMessageV2Example.html)
	 * *   [SOAPMessageV2 MID server example](https://docs.servicenow.com/bundle/paris-application-development/page/app-store/dev_portal/API_reference/SOAPMessageV2/reference/r_SOAPMessageV2MIDServerExample.html)
	 * 
	 */
	class SOAPResponseV2 {
	
		/**
		 *
		 * Return all headers contained in the response, including any duplicate headers.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The list of headers contained in the response. Each header is represented as a GlideHTTPHeader object which contains the header name and value.
		 */
		getAllHeaders(): {[fieldName: string]: string}
		
		/**
		 *
		 * Get the content of the SOAP response body.
		 *
		 *
		 * @returns {string} The SOAP response body.
		 */
		getBody(): string
		
		/**
		 *
		 * Returns all cookies included in the response.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Array of strings representing cookies. Iterate through the array to perform operations on each cookie.
		 */
		getCookies(): {[fieldName: string]: string}
		
		/**
		 *
		 * Get the numeric error code if there was an error during the SOAP transaction.
		 *
		 * This error code is specific to the Now Platform, it is not an HTTP error code. Provide this error code if you require assistance from Customer Service and Support.
		 *
		 *
		 * @returns {number} The numeric error code, such as 1 for a socket timeout.
		 */
		getErrorCode(): number
		
		/**
		 *
		 * Get the error message if there was an error during the SOAP transaction.
		 *
		 *
		 * @returns {string} The error message.
		 */
		getErrorMessage(): string
		
		/**
		 *
		 * Get the value for a specified HTTP header.
		 *
		 * @param {string} name The name of the header that you want the value for, such as Set-Cookie.
		 *
		 * @returns {string} The value of the specified header.
		 */
		getHeader(name: string): string
		
		/**
		 *
		 * Get all HTTP headers returned in the SOAP response and the associated values.
		 *
		 * Note: If a header is present more than once in the response, such as a Set-Cookie header, this function returns only the last of the duplicate headers. To return all headers including duplicates, use the getAllHeaders() function.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} An Object that maps the name of each header to the associated value.
		 */
		getHeaders(): {[fieldName: string]: string}
		
		/**
		 *
		 * Get the numeric HTTP status code returned by the SOAP provider.
		 *
		 *
		 * @returns {number} The numeric status code returned by the SOAP provider, such as 200 for a successful response.
		 */
		getStatusCode(): number
		
		/**
		 *
		 * Indicate if there was an error during the SOAP transaction.
		 *
		 *
		 * @returns {boolean} Returns true if there was an error, false if there was no error.
		 */
		haveError(): boolean
		
		/**
		 *
		 * Set the amount of time the instance waits for a response from the web service provider.
		 *
		 * This method overrides the property glide.soap.outbound.ecc_response.timeout for this SOAP response.
		 *
		 * @param {number} timeoutSecs The amount of time, in seconds, to wait for this response.
		 *
		 * @returns {void} Method does not return a value
		 */
		waitForResponse(timeoutSecs: number): void
		
	}
	
}
declare class RESTResponse extends RESTResponseV2{}