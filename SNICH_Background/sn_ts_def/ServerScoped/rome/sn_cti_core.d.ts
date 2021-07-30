declare namespace sn_cti_core {

	/** 
	 * You use CTIOperationRequest objects to pass information between a message transformer and an operation handler within the Cloud Call Center framework.  
	 *   
	 * Typically, a message transformer is responsible for parsing an incoming CTI-specific payload and setting the payload data on an associated CTIOperationRequest object. An operation handler is then responsible for getting the information from the CTIOperationRequest object and using the data to process the requested operation.  
	 *   
	 * The ServiceNow base system provides working operation handlers and message transformers that enable connection to Amazon Connect. When building contact flows within Amazon Connect, there are two integration points between Amazon services and a ServiceNow instance:
	 * 
	 * *   Amazon Web Services (AWS) Lambda Proxy (Invoke AWS Lambda function)
	 * *   AWS Lex Bot (Get Customer Input)
	 * 
	 * You can find the available operation handlers and message transformers for these integration points in the Operation Handlers [sn_cti_operation_handler] and Provider Message Transformer [sn_cti_provider_msg_transormer] tables.  
	 *   
	 * A payload is passed into a ServiceNow instance from an external source, such as from a computer telephony integration (CTI) provider that is making an operation request. When a request is received, a message transformer parses the payload and uses the CTIOperationRequest set methods to set payload values, such as the operation handler name, onto an operation and contact-specific CTIOperationRequest object.  
	 *   
	 * For example, the following message transformer script parses the passed in JSON payload and sets the values required by the associated operation handler on the CTIOperationRequest object.  
	 *   
	 * 
	 *     {	
	 *       try {
	 *         var jsonPayload = httpRequest.body.data;
	 *         if (jsonPayload) {
	 *     	var event = jsonPayload.event;
	 *     	if (event) {
	 *     	  var details = event.Details;
	 *     	  if (details) {					
	 *     	    operationRequest.setOperationName(details.Parameters['sn_operation']);
	 *     	    var contactData = details.ContactData;
	 *     	    if(contactData) {
	 *     		// Call id should be surfaced in openframe call log so it can be tied to transcription later
	 *     		operationRequest.setParameter('contact.call_id', contactData.ContactId);
	 *     		for(var ck in contactData.CustomerEndpoint) {
	 *     		  operationRequest.setParameter('contact.' + ck, contactData.CustomerEndpoint[ck]);
	 *     	       }
	 *     	       operationRequest.setParameter('contact.id', contactData.ContactId);
	 *     	       operationRequest.setParameter('contact.phone', contactData.CustomerEndpoint.Address);
	 *     	    }
	 *     	    var parameters = details.Parameters;
	 *     	    if (parameters) {
	 *     		for (var pk in parameters) {
	 *     		  switch(pk) {
	 *     		    case 'interactionId':
	 *     			operationRequest.setInteractionSysId(parameters[pk]);
	 *     			break;
	 *     		    case 'authToken':
	 *     			operationRequest.setAuthToken(parameters[pk]);
	 *     			break;
	 *     		    case 'language':
	 *     			operationRequest.setLanguage(parameters[pk]);
	 *     			break;
	 *     								
	 *     		    default:
	 *     			operationRequest.setParameter(pk, parameters[pk]);
	 *     		 }						
	 *                 }
	 *               }					
	 *             }
	 *           }
	 *         }
	 *       } catch(e) {
	 *     		ctx.setError(e);
	 *       }
	 *     })(httpRequest, operationRequest, ctx);
	 * 
	 *   
	 *   
	 * After the message transformer finishes parsing the passed in payload, the Cloud Call Center framework instantiates the specified operation handler. The operating handler uses the CTIOperationResponse API get methods to obtain the information that it needs from the associated CTIOperationRequest object to process the requested operation.  
	 *   
	 * For example, the following operation handler script stores values that were set on the CTIOperationRequest object in the interaction record associated with the call.  
	 *   
	 * 
	 *     (function( request, /*CTIOperationResponse*/ response, ctx) {
	 *       // Returns the sys_id of the interaction record.
	 *       var interactionSysId = request.getInteractionSysId();
	 *       var number = request.getParameter('number');
	 *       var addComment = request.getParameter('add_comment');
	 *       addComment = addComment ? addComment.toLowerCase() : addComment;
	 *       addComment = 'yes' === addComment || 'true' === addComment || '1' === addComment;
	 *       var workNotes = request.getParameter('work_notes');
	 *       var message = gs.getMessage('Thankyou');
	 *       var interactionGr = request.getInteractionRecord();
	 *       var openedFor = interactionGr ? interactionGr.getValue('opened_for') : null;
	 *       if (openedFor && number && addComment && workNotes) {
	 *         var now_GR = new GlideRecordSecure('incident');
	 *         now_GR.addQuery('caller_id', openedFor);
	 *         now_GR.addQuery('number', number);
	 *         now_GR.query();
	 *         if (now_GR.next()) {
	 *           now_GR.work_notes += workNotes;
	 *           now_GR.update();
	 *           message = now_GR.getMessage('Your comment was added');
	 *         }
	 *       }
	 *       response.setStatusCode(200);
	 *       response.setMessage(message);
	 *     })(request, response, ctx);
	 * 
	 *   
	 *   
	 * For additional information on creating operation handlers, see [Configure a contact flow for an automated caller interaction](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/cloud-call-center/task/establish-automated-bot-interactions.html).  
	 *   
	 * This API runs in the sn_cti_core namespace. Before you are able to access the CTIOperationRequest API, the Cloud Call Center Core (sn_cti_core) plugin must be activated. For information on activating the Cloud Call Center, see [Install Cloud Call Center applications](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/cloud-call-center/task/install-ccc-apps.html).  
	 *   
	 * For additional information on the Cloud Call Center, see [Cloud Call Center](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/cloud-call-center/concept/cloud-call-center-overview.html).
	 * 
	 */
	class CTIOperationRequest {
	
		/**
		 *
		 * @param {string} origin Optional. Origin of the request. Usually the name of the computer telephony integrator provider.
		 * 
		 * Default: null
		 *
		 */
		constructor(origin: string)
		
		/**
		 *
		 * Returns the authentication token set on the associated CTIOperationRequest object.
		 *
		 * This token is used by the Cloud Call Center framework to authenticate the current Cloud Call Center user before executing the requested operation handler if the handler's auth_required flag is set to true. The auth_required flag is a field in the Operation Handler [sn_cti_operation_handler] table. The life of an authentication token should be for the life of the call session, but is determined by the CTI provider.
		 * 		 * 
		 * 		 * You can define whatever authentication/authorization handling required by your implementation by creating your own authentication operation handler. Regardless of how the authentication token is generated, the message translator must pass the token back in the CTI payload. Additionally, the CTI provider must store this authentication token locally and pass it in each operation request that requires authentication.
		 * 		 * 
		 * 		 * If using the instance provided authenticate operation handler, the handler initiates the creation of the authentication token based on a four-digit user-entered pin. It then sets the authentication token in the sessionAttributes object of the CTIOperationResponse object. The associated message transformer translates the sessionAttributes object into the CTI-specific payload and then sends it to the CTI provider.
		 * 		 * 
		 * 		 * Note: If the authentication token is not passed, all requests to execute operation handlers with the auth_required flag set will fail. If you do not use authentication, you do not need to maintain authentication tokens.
		 * 		 * 
		 * 		 * The ServiceNow base system provides working operation handlers and message transformers that enable connection to Amazon Connect. When building contact flows within Amazon Connect, there are two integration points between Amazon services and a ServiceNow instance:
		 * 		 * 
		 * 		 * *   Amazon Web Services (AWS) Lambda Proxy (Invoke AWS Lambda function)
		 * 		 * *   AWS Lex Bot (Get Customer Input)
		 * 		 * 
		 * 		 * You can find the available operation handlers and message transformers for these integration points in the Operation Handlers [sn_cti_operation_handler] and Provider Message Transformer [sn_cti_provider_msg_transormer] tables.
		 *
		 *
		 * @returns {string} The authentication token associated with the current Cloud Call Center user.
		 */
		getAuthToken(): string
		
		/**
		 *
		 * Returns the interaction GlideRecord associated with the operation request.
		 *
		 * An interaction represents a customer request for assistance made through a chat, phone call, or in-person. Interactions can be routed to queues for assignment or assigned to agents directly. Interaction records are stored in the Interaction [interaction] table and can contain any type of data that describes service account interactions with a customer for a specific session.
		 * 		 * 
		 * 		 * Interaction records are associated with a CTIOperationRequest object through the [CTIOperationRequest - setInteractionSysId(String Id)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setInteractionSysId_S&v=rome) method. This method is typically called by the message transformer and must be called prior to calling the getInteractionRecord() method.
		 *
		 *
		 * @returns {GlideRecord} Interaction GlideRecord object associated with the current CTIOperationRequest object. If the interaction record sys_id has not been set on the CTIOperationRequest object, returns null.
		 */
		getInteractionRecord(): GlideRecord
		
		/**
		 *
		 * Returns the sys_id of the interaction record associated with the current CTIOperationRequest object.
		 *
		 * The [CTIOperationRequest - setInteractionSysId(String Id)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setInteractionSysId_S&v=rome) method must have been called prior to calling this method.
		 *
		 *
		 * @returns {string} The sys_id of the interaction record set on the current CTIOperationRequest object.
		 * 
		 * If the sys_id was not set on the associated CTIOperationRequest object, the method returns null.
		 */
		getInteractionSysId(): string
		
		/**
		 *
		 * Returns the ISO 639.1 language code that was set on the current CTIOperationRequest object.
		 *
		 * Using the customer preferred language enables you to use platform-provided internationalization and localization capabilities to customize messages and other communications with the associated caller.
		 * 		 * 
		 * 		 * Typically an operation handler calls the getLanguage() method and the message transformer sets the language on the CTIOperationRequest object by calling the [CTIOperationRequest - setLanguage(String languageCode)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setLanguage_S&v=rome) method.
		 *
		 *
		 * @returns {string} The ISO 639.1 language code set on the current CTIOperationRequest object. If the language code is not set, returns en.
		 */
		getLanguage(): string
		
		/**
		 *
		 * Returns the major version of the computer telephony integrator (CTI) software set on the current CTIOperationRequest object.
		 *
		 * Use this method if the CTI providers connected to your ServiceNow instance are running multiple versions of their software, as different software versions may require different processing behavior. If the processing behavior is only slightly different between the software versions, it may make sense to have only a single operation handler. You can then handle the processing differences by just checking the version of software making the request and process the request/data within your operation handler. If the required processing is significantly different between versions, it may be more effective to use multiple operation handlers.
		 * 		 * 
		 * 		 * Typically the message transformer sets the software version on the CTIOperationRequest object by calling the [CTIOperationRequest - setMajorVersion(Number majorVersion)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setMajorVersion_N&v=rome) method and an operation handler then consumes the set value using this method. You can also get/set the minor version value of a provider's software using the [CTIOperationRequest - getMinorVersion()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getMinorVersion&v=rome) and [CTIOperationRequest - setMinorVersion(Number minorVersion)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setMinorVersion_N&v=rome) methods.
		 *
		 *
		 * @returns {number} Major version number of the CTI software.
		 * 
		 * If the major version was never set, returns 1.
		 */
		getMajorVersion(): number
		
		/**
		 *
		 * Returns the minor version of the computer telephony integrator (CTI) software associated with a CTIOperationRequest object.
		 *
		 * Use this method if the CTI providers connected to your ServiceNow instance are running multiple versions of their software, as different software versions may require different processing behavior. If the processing behavior is only slightly different between the software versions, it may make sense to have only a single operation handler. You can then handle the processing differences by just checking the version of software making the request and process the request/data within your operation handler. If the required processing is significantly different between versions, it may be more effective to use multiple operation handlers.
		 * 		 * 
		 * 		 * Typically the message transformer sets the software version on the CTIOperationRequest object by calling the [CTIOperationRequest - setMinorVersion(Number minorVersion)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setMinorVersion_N&v=rome)[CTIOperationRequest - setMinorVersion(Number minorVersion)](dev.do#!/reference/api/rome/server/ "Sets the minor version of the computer telephony integrator (CTI) provider software making the request on the associated CTIOperationRequest object.") method and an operation handler then consumes the set value using this method. You can also get/set the major version value of a provider's software using the [CTIOperationRequest - getMajorVersion()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getMajorVersion&v=rome)[CTIOperationRequest - getMajorVersion()](dev.do#!/reference/api/rome/server/sn_cti_core-namespace/CTIOperationRequestAPI#CTIOpReq-getMajorVersion "Returns the major version of the computer telephony integrator (CTI) software set on the current CTIOperationRequest object.") and [CTIOperationRequest - setMajorVersion(Number majorVersion)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setMajorVersion_N&v=rome)[CTIOperationRequest - setMajorVersion(Number majorVersion)](dev.do#!/reference/api/rome/server/ "Sets the major version of the computer telephony integrator (CTI) provider software making the request on the associated CTIOperationRequest object.") methods.
		 *
		 *
		 * @returns {number} Minor version number of the CTI software.
		 * 
		 * If the minor version was never set, returns 0.
		 */
		getMinorVersion(): number
		
		/**
		 *
		 * Returns the name of the operation that the computer telephony integration (CTI) provider is requesting to execute.
		 *
		 * The operation name determines the operation handler that is used to process a request. Typically the message transformer sets the operation name on the CTIOperationRequest object using the [CTIOperationRequest - setOperationName(String name)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setOperationName_S&v=rome) method.
		 * 		 * 
		 * 		 * Note: The getOperationName() method does not instantiate the associated operation handler. This is done by the Cloud Call Center framework. This method simply returns the associated operation handler name.
		 * 		 * 
		 * 		 * Note: For Amazon Connect Lex Bot implementations, intent names are appended with a five letter suffix as different Amazon intents cannot have the same intent name. In the Cloud Call Center framework, the intent name equals the operation handler name. An operation handler can either be specific for an intent, having an operation handler name that includes this suffix (myOperation_SUFFX), or it can be generic and used by multiple CTI providers or different use cases, such as using the same handler for processing an HR request and a helpdesk request (myOperation).
		 *
		 *
		 * @returns {string} The name of the operation that the CTI provider is requesting to execute. If the operation name is not set, returns null.
		 */
		getOperationName(): string
		
		/**
		 *
		 * Returns the substep operation handler name set on the current CTIOperationRequest object.
		 *
		 * Use substeps to perform actions such as initialization and validation before processing an operation. Unlike operation handlers that are meant to be generic and used by all CTI providers, substeps are CTI provider specific and use terminology and naming conventions that are specific to the CTI provider.
		 * 		 * 
		 * 		 * The Cloud Call Center framework performs the following steps to locate the required operation handler and any associated substep operation handlers.
		 * 		 * 
		 * 		 * Note: For Amazon Connect Lex Bot implementations, intent names are appended with a five letter suffix as different Amazon intents cannot have the same intent name. In the Cloud Call Center framework, the intent name equals the operation handler name. An operation handler can either be specific for an intent, having an operation handler name that includes this suffix (myOperation_SUFFX), or it can be generic and used by multiple CTI providers or different use cases, such as using the same handler for processing an HR request and a helpdesk request (myOperation).
		 * 		 * 
		 * 		 * 1.  Tries to locate the operation handler associated with the request.
		 * 		 *     *   First checks for an operation handler called `myOperation_SUFFX`.
		 * 		 *     *   If not found, checks for the operation handler `myOperation`. If not found, errors out.
		 * 		 * 2.  If the handler is found, checks the auth_required flag on the operation handler. If set, it checks that a valid authentication token (obtained through the getAuthToken() method) is present on the request. If present and valid, continue processing, else throw an error.
		 * 		 * 3.  Looks up the operation handler for the passed in substep. For this example let's assume `subStepName=SubStep`.
		 * 		 *     *   First checks for an operation handler named `myOperation_SUFFX.SubStep`. If found, executes the handler.
		 * 		 *     *   If not found, checks for the handler `myOperation.SubStep`. If found executes the handler.
		 * 		 *     *   If not found, checks if a `subStepNotFoundBehavior` was set on the request object.
		 * 		 *     *   If set, executes the behavior, otherwise, errors out.
		 * 		 * 4.  Executes the primary operation handler (`myOpersation_SUFFX` or `myOperation`.)
		 * 		 * 
		 * 		 * Typically the message transformer sets the substep name on the CTIOperationRequest object using the [CTIOperationRequest - setOperationSubStepName(String name)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setOperationSubStepName_S&v=rome) method. You can override this behavior if you are creating your own transformer by calling the [CTIOperationRequest - setSubStepNotFoundBehaviour(Object behaviour)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setSubStepNotFoundBehav_O&v=rome) method.
		 *
		 *
		 * @returns {string} The name of the substep operation handler set on the CTIOperationRequest object. If it does not exist, returns null.
		 */
		getOperationSubStepName(): string
		
		/**
		 *
		 * Returns the value of a specified key previously set on the current CTIOperationRequest object.
		 *
		 * Using the get/set parameter methods enables the passing of virtually any string or number value between a message transformer and an operation handler. The parameter object can contain zero or more key/value pairs of data that directly correlate to the current operation request. The operation handler determines what key/value pairs are required as it consumes these values. Typically the message transformer sets these parameters on the CTIOperationRequest object by calling the [CTIOperationRequest - setParameter(String key, Object value)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setParameter_S_O&v=rome) method and the operation handler consumes them using this method.
		 *
		 * @param {string} key The name of the key value to return.
		 *
		 * @returns {string} Value of the specified key. If no such key exists, returns null.
		 */
		getParameter(key: string): string
		
		/**
		 *
		 * Returns the key-value pairs for all parameters that were previously set on the current CTIOperationRequest object.
		 *
		 * Using the get/set parameter methods enables the passing of virtually any string or number value between a message transformer and an operation handler. The parameter object can contain zero or more key/value pairs of data that directly correlate to the current operation request. The operation handler determines what key/value pairs are required as it consumes these values. Typically the message transformer sets these parameters on the CTIOperationRequest object by calling the [CTIOperationRequest - setParameter(String key, Object value)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setParameter_S_O&v=rome) method and the operation handler consumes them using this method.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} A map of key-value pairs that were previously set on the CTIOperationRequest object. This key-value pairs are free-form and defined by the needs of the operation handler. The returned values are either Strings or Numbers.
		 */
		getParameters(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the value of a specified session attribute key set on the current CTIOperationRequest object.
		 *
		 * Using the get/set session attribute methods enables the passing of virtually any string or number value between a message transformer and an operation handler. The sessionAttribute object can contain zero or more key/value pairs of data that are valid for the duration of a computer telephony integration provider defined session, such as the contact's phone number. Session attributes can also be accessed within a contact flow. The operation handler determines what session attribute key/value pairs are needed as it consumes these values. Typically the message transformer sets these attributes on the CTIOperationRequest object by calling the [CTIOperationRequest - setSessionAttribute(String key, Object value)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setSessionAttribute_S_O&v=rome) method. Session attributes are different than parameters in that they persist for the life of the session (such as the entire call) and should be passed back by the CTI provider with each operation request within that call session.
		 *
		 * @param {string} key The name of the key value to return.
		 *
		 * @returns {string} Value of the specified key. If no such key exists, returns null.
		 */
		getSessionAttribute(key: string): string
		
		/**
		 *
		 * Returns a key-value pair map of all session attributes set on the current CTIOperationRequest object.
		 *
		 * Using the get/set session attribute methods enables the passing of virtually any string or number value between a message transformer and an operation handler. The sessionAttribute object can contain zero or more key/value pairs of data that are valid for the duration of a computer telephony integration provider defined session, such as the contact's phone number. Session attributes can also be accessed within a contact flow. The operation handler determines what session attribute key/value pairs are needed as it consumes these values. Typically the message transformer sets these attributes on the CTIOperationRequest object by calling the [CTIOperationRequest - setSessionAttribute(String key, Object value)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setSessionAttribute_S_O&v=rome) method. Session attributes are different than parameters in that they persist for the life of the session (such as the entire call) and should be passed back by the CTI provider with each operation request within that call session.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} A map of session attribute key-value pairs that were set on the associated CTIOperationResponse object. This map is free-form and defined by the needs of the operation handler.
		 */
		getSessionAttributes(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the handling behavior for a subsep when a substep's operation handler is not found.
		 *
		 * Use substeps to perform actions such as initialization and validation before processing an operation. Unlike operation handlers that are meant to be generic and used by all CTI providers, substeps are CTI provider specific and use terminology and naming conventions that are specific to the CTI provider.
		 * 		 * 
		 * 		 * If the requested substep operation handler cannot be found by the Cloud Call Center framework, it attempts to use the "step not found behavior". This behavior is typically set by the message transformer when an operation is initially requested.
		 *
		 *
		 * @returns {OperationNotFoundBehaviours} The behavior/handling to perform when an operation handler cannot be found for the operation/substep combination (<operation_name>.SubStep>). If not defined, returns null.
		 * 
		 * Possible values:
		 * 
		 * *   OperationNotFoundBehaviours.ThrowError: Throw an error.
		 * *   OperationNotFoundBehaviours.PassThrough: Do not perform any further processing on the request, just return.
		 * *   OperationNotFoundBehaviours.RouteToOperation: Use the parent operation handler <operation_name>.
		 */
		getSubStepNotFoundBehaviour(): OperationNotFoundBehaviours
		
		/**
		 *
		 * Sets an authentication token on the current CTIOperationRequest object.
		 *
		 * This token is used by the Cloud Call Center framework to authenticate the current Cloud Call Center user before executing the requested operation handler if the handler's auth_required flag is set to true. The auth_required flag is a field in the Operation Handler [sn_cti_operation_handler] table. The life of an authentication token should be for the life of the call session, but is determined by the CTI provider.
		 * 		 * 
		 * 		 * You can define whatever authentication/authorization handling required by your implementation by creating your own authentication operation handler. Regardless of how the authentication token is generated, the message translator must pass the token back in the CTI payload. Additionally, the CTI provider must store this authentication token locally and pass it in each operation request that requires authentication.
		 * 		 * 
		 * 		 * If using the instance provided authenticate operation handler, the handler initiates the creation of the authentication token based on a four-digit user-entered pin. It then sets the authentication token in the sessionAttributes object of the CTIOperationResponse object. The associated message transformer translates the sessionAttributes object into the CTI-specific payload and then sends it to the CTI provider.
		 * 		 * 
		 * 		 * Note: If the authentication token is not passed, all requests to execute operation handlers with the auth_required flag set will fail. If you do not use authentication, you do not need to maintain authentication tokens.
		 * 		 * 
		 * 		 * The ServiceNow base system provides working operation handlers and message transformers that enable connection to Amazon Connect. When building contact flows within Amazon Connect, there are two integration points between Amazon services and a ServiceNow instance:
		 * 		 * 
		 * 		 * *   Amazon Web Services (AWS) Lambda Proxy (Invoke AWS Lambda function)
		 * 		 * *   AWS Lex Bot (Get Customer Input)
		 * 		 * 
		 * 		 * You can find the available operation handlers and message transformers for these integration points in the Operation Handlers [sn_cti_operation_handler] and Provider Message Transformer [sn_cti_provider_msg_transormer] tables.
		 *
		 * @param {string} id The authentication token for the associated Cloud Call Center user.
		 *
		 * @returns {void} Method does not return a value
		 */
		setAuthToken(id: string): void
		
		/**
		 *
		 * Sets the sys_id of the interaction record associated with the operation request on the current CTIOperationRequest object.
		 *
		 * If you want to maintain contact interaction information within a contact-specific interaction record, the interaction record sys_id must be maintained for the entire Cloud Call Center call session.
		 * 		 * 
		 * 		 * Typically, an operation handler creates an interaction record when a new contact call is initiated. It then sets the interaction record sys_id and table name on the associated CTIOperationResponse object as session attributes using the [CTIOperationRequest - setSessionAttribute(String key, Object value)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-setSessionAttribute_S_O&v=rome) method. The associated method transformer then translates this information into the computer telephony integration (CTI) provider payload and sends it back to the CTI provider.
		 * 		 * 
		 * 		 * The CTI provider must store the interaction record sys_id for the contact session locally. Each time the CTI provider interacts with the Cloud Call Center for this contact session, it must pass back the corresponding interaction record sys_id in its payload. The receiving message transformer then parses the payload and uses the CTIOperationRequest - setInteractionSysId() method to set the interaction record sys_id on the associated CTIOperationtRequest object.
		 * 		 * 
		 * 		 * The [CTIOperationRequest - getInteractionRecord()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getInteractionRecord&v=rome) method uses this sys_id to obtain the correct interaction record for the contact session. Interaction records are located in the Interaction [interaction] table. For additional information on interaction records, see
		 *
		 * @param {string} sys_id The sys_id of the interaction record to associate with the request.
		 *
		 * @returns {void} Method does not return a value
		 */
		setInteractionSysId(sys_id: string): void
		
		/**
		 *
		 * Sets the ISO 639.1 language code to use when processing the associated operation on a CTIOperationRequest object.
		 *
		 * Using the customer preferred language enables you to use platform-provided internationalization and localization capabilities to customize messages and other communications with the associated caller. Typically the message transformer sets the language on the CTIOperationRequest object.
		 *
		 * @param {string} languageCode The ISO 639.1 language code to use when processing the associated operation.
		 *
		 * @returns {void} Method does not return a value
		 */
		setLanguage(languageCode: string): void
		
		/**
		 *
		 * Sets the major version of the computer telephony integrator (CTI) provider software making the request on the associated CTIOperationRequest object.
		 *
		 * Use this method if the CTI providers connected to your ServiceNow instance are running multiple versions of their software, as different software versions may require different processing behavior. If the processing behavior is only slightly different between the software versions, it may make sense to have only a single operation handler. You can then handle the processing differences by just checking the version of software making the request and process the request/data within your operation handler. If the required processing is significantly different between versions, it may be more effective to use multiple operation handlers.
		 * 		 * 
		 * 		 * Typically the message transformer sets the software version on the CTIOperationRequest object by calling this method and an operation handler then consumes the set value using the [CTIOperationRequest - getMajorVersion()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getMajorVersion&v=rome) method. You can also get/set the minor version value of a provider's software using the [CTIOperationRequest - getMinorVersion()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getMinorVersion&v=rome) and [CTIOperationRequest - setMinorVersion(Number minorVersion)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setMinorVersion_N&v=rome) methods.
		 *
		 * @param {number} majorVersion Major version of the CTI provider software making the operation request.
		 * 
		 * If this value was not previously set, returns 1.
		 *
		 * @returns {void} Method does not return a value
		 */
		setMajorVersion(majorVersion: number): void
		
		/**
		 *
		 * Sets the minor version of the computer telephony integrator (CTI) provider software making the request on the associated CTIOperationRequest object.
		 *
		 * Use this method if the CTI providers connected to your ServiceNow instance are running multiple versions of their software, as different software versions may require different processing behavior. If the processing behavior is only slightly different between the software versions, it may make sense to have only a single operation handler. You can then handle the processing differences by just checking the version of software making the request and process the request/data within your operation handler. If the required processing is significantly different between versions, it may be more effective to use multiple operation handlers.
		 * 		 * 
		 * 		 * Typically the message transformer sets the software version on the CTIOperationRequest object by calling this method and an operation handler then consumes the set value using the [CTIOperationRequest - getMinorVersion()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getMinorVersion&v=rome) method. You can also get/set the major version value of a provider's software using the [CTIOperationRequest - getMajorVersion()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getMajorVersion&v=rome) and [CTIOperationRequest - setMajorVersion(Number majorVersion)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setMajorVersion_N&v=rome) methods.
		 *
		 * @param {number} minorVersion Minor version of the CTI provider software making the operation request.
		 * 
		 * If this value was not previously set, returns 0.
		 *
		 * @returns {void} Method does not return a value
		 */
		setMinorVersion(minorVersion: number): void
		
		/**
		 *
		 * Sets the name of the operation that the computer telephony integration (CTI) provider is attempting to execute on the current CTIOperationRequest object.
		 *
		 * The operation name determines the operation handler that is used to process the request. Call this method from the associated message transformer.
		 * 		 * 
		 * 		 * Note: For Amazon Connect Lex Bot implementations, intent names are appended with a five letter suffix as different Amazon intents cannot have the same intent name. In the Cloud Call Center framework, the intent name equals the operation handler name. An operation handler can either be specific for an intent, having an operation handler name that includes this suffix (myOperation_SUFFX), or it can be generic and used by multiple CTI providers or different use cases, such as using the same handler for processing an HR request and a helpdesk request (myOperation).
		 *
		 * @param {string} name The name of the operation that the CTI provider is currently attempting to execute.
		 * 
		 * This name must be the same as the name of the operation handler to use to process the request. If it is not, an error is thrown. You can locate the available operation handlers in the Operation Handler [sn_cti_operation_handler] table.
		 *
		 * @returns {void} Method does not return a value
		 */
		setOperationName(name: string): void
		
		/**
		 *
		 * Sets the operation substep name on the current CTIOperationRequest object.
		 *
		 * Use substeps to perform actions such as initialization and validation before processing an operation. Unlike operation handlers that are meant to be generic and used by all CTI providers, substeps are CTI provider specific and use terminology and naming conventions that are specific to the CTI provider.
		 * 		 * 
		 * 		 * The Cloud Call Center framework performs the following steps to locate the required operation handler and any associated substep operation handlers.
		 * 		 * 
		 * 		 * Note: For Amazon Connect Lex Bot implementations, intent names are appended with a five letter suffix as different Amazon intents cannot have the same intent name. In the Cloud Call Center framework, the intent name equals the operation handler name. An operation handler can either be specific for an intent, having an operation handler name that includes this suffix (myOperation_SUFFX), or it can be generic and used by multiple CTI providers or different use cases, such as using the same handler for processing an HR request and a helpdesk request (myOperation).
		 * 		 * 
		 * 		 * 1.  Tries to locate the operation handler associated with the request.
		 * 		 *     *   First checks for an operation handler called `myOperation_SUFFX`.
		 * 		 *     *   If not found, checks for the operation handler `myOperation`. If not found, errors out.
		 * 		 * 2.  If the handler is found, checks the auth_required flag on the operation handler. If set, it checks that a valid authentication token (obtained through the getAuthToken() method) is present on the request. If present and valid, continue processing, else throw an error.
		 * 		 * 3.  Looks up the operation handler for the passed in substep. For this example let's assume `subStepName=SubStep`.
		 * 		 *     *   First checks for an operation handler named `myOperation_SUFFX.SubStep`. If found, executes the handler.
		 * 		 *     *   If not found, checks for the handler `myOperation.SubStep`. If found executes the handler.
		 * 		 *     *   If not found, checks if a `subStepNotFoundBehavior` was set on the request object.
		 * 		 *     *   If set, executes the behavior, otherwise, errors out.
		 * 		 * 4.  Executes the primary operation handler (`myOpersation_SUFFX` or `myOperation`.)
		 * 		 * 
		 * 		 * You can set the default behavior of a substep by calling the [CTIOperationRequest - setSubStepNotFoundBehaviour(Object behaviour)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-setSubStepNotFoundBehav_O&v=rome) method.
		 *
		 * @param {string} name The name of the substep that the CTI provider is trying to execute.
		 *
		 * @returns {void} Method does not return a value
		 */
		setOperationSubStepName(name: string): void
		
		/**
		 *
		 * Sets the specified key-value pair on the parameter object of the current CTIOperationRequest object.
		 *
		 * Using the get/set parameter methods enables the passing of virtually any string or number value between a message transformer and an operation handler. The parameter object can contain zero or more key/value pairs of data that directly correlate to the current operation request. The operation handler determines what key/value pairs are required as it consumes these values. Typically the message transformer sets these parameters on the CTIOperationRequest object by calling this method and the operation handler consumes them using the [CTIOperationRequest - getParameter(String key)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getParameter_S&v=rome) or [CTIOperationRequest - getParameters()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getParameters&v=rome) method.
		 * 		 * 
		 * 		 * Note: You should only store objects that can survive a `JSON.parse(JSON.stringify(object))` operation. Objects not meeting this criteria may not propagate correctly through the entire operation processing chain.
		 * 		 * 
		 * 		 * For example:
		 * 		 * 
		 * 		 *     var x = {
		 * 		 *       "string": 'abc',
		 * 		 *       "int": 123,
		 * 		 *       "float": 1.234,
		 * 		 *       "number": new Number(3),
		 * 		 *       "boolean": true,
		 * 		 *       "date": new Date(2006, 0, 2, 15, 4, 5),
		 * 		 *       "object": {
		 * 		 *         "string": 'abc',
		 * 		 *         "int": 123,
		 * 		 *         "float": 1.234,
		 * 		 *         "number": new Number(3),
		 * 		 *         "boolean": true,
		 * 		 *         "date": new Date(2006, 0, 2, 15, 4, 5)
		 * 		 *       },
		 * 		 *       "function": function(abc) {
		 * 		 *     
		 * 		 *       }
		 * 		 *     }
		 * 		 *     var stringify = JSON.stringify(x);
		 * 		 *     gs.info(stringify);
		 * 		 *     var hydrate = JSON.parse(stringify);
		 * 		 *     var stringify2 = JSON.stringify(hydrate);
		 * 		 *     gs.info(stringify2);
		 * 		 *     
		 * 		 * 
		 * 		 * Produces:
		 * 		 * 
		 * 		 *     {"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z","object":{"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z"}}
		 * 		 *     {"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z","object":{"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z"}}
		 *
		 * @param {string} key Name of the key under which to store the associated value.
		 * @param {{[fieldName: string]: string}} value Value to store.
		 * 
		 * Valid data types:
		 * 
		 * *   string
		 * *   int
		 * *   float
		 * *   number
		 * *   boolean
		 * *   date
		 * *   object
		 *
		 * @returns {void} Method does not return a value
		 */
		setParameter(key: string, value: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets the specified session attribute key-value pair on the current CTIOperationRequest object.
		 *
		 * Using the get/set session attribute methods enables the passing of virtually any string or number value between a message transformer and an operation handler. The sessionAttribute object can contain zero or more key/value pairs of data that are valid for the duration of a computer telephony integration provider defined session. Session attributes can also be accessed within a contact flow. The operation handler determines what session attribute key/value pairs are needed as it consumes these values. Typically the message transformer sets these attributes on the CTIOperationRequest object by calling this method and the operation handler gets the attributes using the [CTIOperationRequest - getSessionAttribute(String key)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getSessionAttribute_S&v=rome) or [CTIOperationRequest - getSessionAttribute()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpReq-getSessionAttributes&v=rome) method.
		 * 		 * 
		 * 		 * Note: You should only store objects that can survive a `JSON.parse(JSON.stringify(object))` operation. Objects not meeting this criteria may not propagate correctly through the entire operation processing chain.
		 * 		 * 
		 * 		 * For example:
		 * 		 * 
		 * 		 *     var x = {
		 * 		 *       "string": 'abc',
		 * 		 *       "int": 123,
		 * 		 *       "float": 1.234,
		 * 		 *       "number": new Number(3),
		 * 		 *       "boolean": true,
		 * 		 *       "date": new Date(2006, 0, 2, 15, 4, 5),
		 * 		 *       "object": {
		 * 		 *         "string": 'abc',
		 * 		 *         "int": 123,
		 * 		 *         "float": 1.234,
		 * 		 *         "number": new Number(3),
		 * 		 *         "boolean": true,
		 * 		 *         "date": new Date(2006, 0, 2, 15, 4, 5)
		 * 		 *       },
		 * 		 *       "function": function(abc) {
		 * 		 *     
		 * 		 *       }
		 * 		 *     }
		 * 		 *     var stringify = JSON.stringify(x);
		 * 		 *     gs.info(stringify);
		 * 		 *     var hydrate = JSON.parse(stringify);
		 * 		 *     var stringify2 = JSON.stringify(hydrate);
		 * 		 *     gs.info(stringify2);
		 * 		 *     
		 * 		 * 
		 * 		 * Produces:
		 * 		 * 
		 * 		 *     {"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z","object":{"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z"}}
		 * 		 *     {"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z","object":{"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z"}}
		 *
		 * @param {string} key Name of the key under which to store the associated value.
		 * @param {{[fieldName: string]: string}} value Value to store.
		 * 
		 * Valid data types:
		 * 
		 * *   string
		 * *   int
		 * *   float
		 * *   number
		 * *   boolean
		 * *   date
		 * *   object
		 *
		 * @returns {void} Method does not return a value
		 */
		setSessionAttribute(key: string, value: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets the behavior to perform if the current substep's operation handler is not found.
		 *
		 * This method should be called by the input message transformer.
		 *
		 * @param {OperationNotFoundBehaviours} behaviour Behavior to use if a handling behavior is not specified for the substep. This must be a behavior defined on the CTIOperationRequest.OperationNotFoundBehaviours object.
		 * 
		 * Possible values:
		 * 
		 * *   ThrowError: Throw an error.
		 * *   PassThrough: Do not perform any further processing on the request, just return.
		 * *   RouteToOperation: Use the parent operation handler <operation_name>.
		 *
		 * @returns {void} Method does not return a value
		 */
		setSubStepNotFoundBehaviour(behaviour: OperationNotFoundBehaviours): void
		
	}
	
	/** 
	 * You use CTIOperationResponse objects to pass information between an operation handler and a message transformer within the Cloud Call Center framework.  
	 *   
	 * Typically, an operation handler is responsible for setting values on the CTIOperationResponse object as it processes the associated request. A message transformer is then responsible for getting the values from the CTIOperationRequest object and building the CTI-specific payload that is sent back to the computer telephony integrator (CTI) provider.  
	 *   
	 * The ServiceNow base system provides working operation handlers and message transformers that enable connection to Amazon Connect. When building contact flows within Amazon Connect, there are two integration points between Amazon services and a ServiceNow instance:
	 * 
	 * *   Amazon Web Services (AWS) Lambda Proxy (Invoke AWS Lambda function)
	 * *   AWS Lex Bot (Get Customer Input)
	 * 
	 * You can find the available operation handlers and message transformers for these integration points in the Operation Handlers [sn_cti_operation_handler] and Provider Message Transformer [sn_cti_provider_msg_transormer] tables.  
	 *   
	 * The following operation handler script shows how to use various CTIOperationResponse methods to set values on the CTIOperationResponse object.  
	 *   
	 * 
	 *     (function( request, /*CTIOperationResponse*/ response) {
	 *     
	 *       try {
	 *         var state = request.getParameter('$state');
	 *         if(!state) {
	 *           state = 'new';
	 *         }
	 *         var phone = request.getParameter('contact.phone');
	 *         var username = request.getParameter('contact.username');
	 *         var someDataPresent = phone || username;
	 *         if(!someDataPresent) {
	 *           throw 'phone or username must be supplied';
	 *         }
	 *         if('new' === state) {
	 *           var userGr = null;
	 *           if(phone || username) {
	 *             userGr = new GlideRecordSecure('sys_user');
	 *             var qc = null;
	 *             if(phone) {
	 *               qc = userGr.addQuery('phone', phone);
	 *               qc.addOrCondition('mobile_phone', phone);
	 *               qc.addOrCondition("home_phone", phone);
	 *             }
	 *             if(username) {
	 *               if(qc) {
	 *                 qc.addOrCondition('user_name', username);
	 *               } else {
	 *                 qc = userGr.addQuery('user_name', username);
	 *               }
	 *             }
	 *             // If there was criteria then run the query
	 *             if(qc) {
	 *               userGr.query();
	 *             } else {
	 *               userGr = null;
	 *             }
	 *           }
	 *     			
	 *           var foundUser = userGr && userGr.next();
	 *     
	 *           var phonelogGr = new GlideRecord('sn_openframe_phone_log');
	 *           phonelogGr.initialize();
	 *           phonelogGr.setValue('call_id', request.getParameter('contact.id'));
	 *           phonelogGr.setValue('phone_number', phone);
	 *           if(foundUser) {
	 *             phonelogGr.setValue('contact', userGr.getUniqueValue());
	 *           }
	 *           phonelogGr.insert();
	 *     			
	 *           var interactionGr = new GlideRecordSecure('interaction');
	 *           interactionGr.initialize();
	 *           interactionGr.setValue('type', 'phone');
	 *           interactionGr.setValue('short_description', 'User Contact via Phone: ' + phone);
	 *           interactionGr.setValue('channel_metadata_table', 'sn_openframe_phone_log');
	 *           interactionGr.setValue('channel_metadata_document',phonelogGr.getUniqueValue());
	 *     			
	 *           if(foundUser) {
	 *             interactionGr.setValue('opened_for', userGr.getUniqueValue());
	 *             response.setSessionAttribute('snc_user_first_name', userGr.getValue('first_name'));
	 *             response.setSessionAttribute('snc_user_last_name', userGr.getValue('last_name'));
	 *             response.setSessionAttribute('snc_user_sys_id', userGr.getUniqueValue());
	 *           } else {
	 *             response.setSessionAttribute('snc_user_sys_id', "USER_NOT_FOUND");
	 *           }
	 *           interactionGr.setValue('state', 'new');
	 *     
	 *           var interactionId = interactionGr.insert();
	 *     
	 *           response.setStatusCode(200);
	 *           response.setMessage('success');
	 *           response.setSessionAttribute('interactionTable', 'interaction');
	 *           response.setSessionAttribute('interactionId', interactionId);
	 *     
	 *         }
	 *       } catch(e) {
	 *         ctx.setError(e);
	 *       }
	 *     
	 *     })(request, response);
	 * 
	 *   
	 *   
	 * For additional information on creating operation handlers, see [Configure a contact flow for an automated caller interaction](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/cloud-call-center/task/establish-automated-bot-interactions.html).  
	 *   
	 * The following message transformer script gets the values set on the CTIOperationResponse object and stores them in the CTI-specific payload that is then sent back to the CTI provider.  
	 *   
	 * 
	 *     (function (/*CTIOperationResponse*/operationResponse, /*HTTPResponse*/ httpResponse) {
	 *     	// AWS Connect Lambda expects name value pairs only
	 *     	var out = {};
	 *     	for(var k in operationResponse.getSessionAttributes()) {
	 *     		out[k] = operationResponse.getSessionAttributes()[k];
	 *     	}
	 *     	out.statusCode = operationResponse.getStatusCode();
	 *     	out.message = operationResponse.getMessage();
	 *     	httpResponse.setBody(out);
	 *     })(operationResponse, httpResponse);
	 * 
	 *   
	 *   
	 * This API runs in the sn_cti_core namespace. Before you are able to access the CTIOperationRequest API, the Cloud Call Center Core (sn_cti_core) application must be installed. For information on this installation, see [Install Cloud Call Center applications](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/cloud-call-center/task/install-ccc-apps.html).  
	 *   
	 * For additional information on the Cloud Call Center, see [Cloud Call Center](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/cloud-call-center/concept/cloud-call-center-overview.html).
	 * 
	 */
	class CTIOperationResponse {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Returns the authentication token that was set on the CTIOperationResponse object.
		 *
		 * This token is used by the Cloud Call Center framework to authenticate the current Cloud Call Center user before executing the requested operation handler if the handler's auth_required flag is set to true. The auth_required flag is a field in the Operation Handler [sn_cti_operation_handler] table. The life of an authentication token should be for the life of the call session, but is determined by the CTI provider.
		 * 		 * 
		 * 		 * You can define whatever authentication/authorization handling required by your implementation by creating your own authentication operation handler. Regardless of how the authentication token is generated, the message translator must pass the token back in the CTI payload. Additionally, the CTI provider must store this authentication token locally and pass it in each operation request that requires authentication.
		 * 		 * 
		 * 		 * If using the instance provided authenticate operation handler, the handler initiates the creation of the authentication token based on a four-digit user-entered pin. It then sets the authentication token in the sessionAttributes object of the CTIOperationResponse object. The associated message transformer translates the sessionAttributes object into the CTI-specific payload and then sends it to the CTI provider.
		 * 		 * 
		 * 		 * Note: If the authentication token is not passed, all requests to execute operation handlers with the auth_required flag set will fail. If you do not use authentication, you do not need to maintain authentication tokens.
		 * 		 * 
		 * 		 * The ServiceNow base system provides working operation handlers and message transformers that enable connection to Amazon Connect. When building contact flows within Amazon Connect, there are two integration points between Amazon services and a ServiceNow instance:
		 * 		 * 
		 * 		 * *   Amazon Web Services (AWS) Lambda Proxy (Invoke AWS Lambda function)
		 * 		 * *   AWS Lex Bot (Get Customer Input)
		 * 		 * 
		 * 		 * You can find the available operation handlers and message transformers for these integration points in the Operation Handlers [sn_cti_operation_handler] and Provider Message Transformer [sn_cti_provider_msg_transormer] tables.
		 *
		 *
		 * @returns {string} The authentication token previously set on the CTIOperationRequest object. If not set, returns null.
		 */
		getAuthToken(): string
		
		/**
		 *
		 * Returns the error object associated with the current CTIOperationResponse object.
		 *
		 * You might use this information to formulate the payload returned to the computer telephony integration (CTI) provider.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Operation error information. The format of this object is determined by the CTI provider. If an error does not exist, returns null.
		 */
		getError(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the sys_id of the interaction record associated with the call session that was set on the CTIOperationResponse object.
		 *
		 * The [CTIOperationResponse - setInteractionSysId(String Id)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-setInteractionSysId_S&v=rome) method must have been called prior to calling this method.
		 *
		 *
		 * @returns {string} The sys_id of the interaction record set on the CTIOperationResponse object. Interaction records are located in the Interaction [interaction] table.
		 * 
		 * If the interaction record sys_id is not set, the method returns null.
		 */
		getInteractionSysId(): string
		
		/**
		 *
		 * Returns the major version of the computer telephony integrator (CTI) software set on the current CTIOperationResponse object.
		 *
		 * Use this method if the CTI providers connected to your ServiceNow instance are running multiple versions of their software, as different software versions may require different payloads. If the payload is only slightly different between the software versions, it may make sense to have only a single message transformer. You can then handle the payload differences by just checking the version of software making the request within your message transformer. If the required payload is significantly different between versions, it may be more effective to use multiple message transformers.
		 *
		 *
		 * @returns {number} Major version number of the CTI software.
		 * 
		 * If the major version was never set, returns 1.
		 */
		getMajorVersion(): number
		
		/**
		 *
		 * Returns the message string set on the current CTIOperationResponse object.
		 *
		 * Typically this is a message that is spoken back to the user once an operation is complete. You can set this value using the [CTIOperationResponse - setMessage(String message)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-setMessage_S&v=rome) method.
		 *
		 *
		 * @returns {string} Message text. If no message exists, returns null.
		 */
		getMessage(): string
		
		/**
		 *
		 * Returns the minor version of the computer telephony integrator (CTI) software set on the current CTIOperationResponse object.
		 *
		 * Use this method if the CTI providers connected to your ServiceNow instance are running multiple versions of their software, as different software versions may require different payloads. If the payload is only slightly different between the software versions, it may make sense to have only a single message transformer. You can then handle the payload differences by just checking the version of software making the request within your message transformer. If the required payload is significantly different between versions, it may be more effective to use multiple message transformers.
		 *
		 *
		 * @returns {number} Minor version number of the payload associated with this interaction.
		 * 
		 * If the minor version was never set, returns 0.
		 */
		getMinorVersion(): number
		
		/**
		 *
		 * Returns the value of a specified key previously set on the current CTIOperationResponse object.
		 *
		 * Using the get/set parameter methods enables the passing of virtually any string or number value between an operation handler and a message transformer. The parameter object can contain zero or more key/value pairs of data that directly correlate to the current operation response. The operation handler determines what key/value pairs are required as it produces these values. Use the [CTIOperationResponse - setParameter(String key, Object value)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-setParameter_S_O&v=rome) method to set parameters on the current CTIOperationResponse object.
		 *
		 * @param {string} key The name of the key value to return.
		 *
		 * @returns {string} The value of the passed in key. If no such key exists, returns null.
		 */
		getParameter(key: string): string
		
		/**
		 *
		 * Returns the key-value pairs for all parameters that were previously set on the current CTIOperationResponse object.
		 *
		 * Using the get/set parameter methods enables the passing of virtually any string or number value between an operation handler and a message transformer. The parameter object can contain zero or more key/value pairs of data that directly correlate to the current operation response. The operation handler determines what key/value pairs are required as it produces these values. Use the [CTIOperationResponse - setParameter(String key, Object value)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-setParameter_S_O&v=rome) method to set parameters on the current CTIOperationResponse object.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} A map of key-value pairs that were previously set on the CTIOperationResponse object. This key-value pairs are free-form and defined by the needs of the operation handler. The returned values are either Strings or Numbers.
		 */
		getParameters(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the value for a specified session attribute key set on the current CTIOperationResponse object.
		 *
		 * Using the get/set session attribute methods enables the passing of virtually any string or number value between an operation handler and a message transformer. Session attributes can also be accessed within a contact flow. The sessionAttribute object can contain zero or more key/value pairs of data, such as the contact's phone number, that are valid for the duration of a computer telephony integration provider defined session. The operation handler determines what session attribute key/value pairs are needed as it utilizes these values during processing. Typically the operation handler sets these attributes on the CTIOperationResponse object by calling the [CTIOperationResponse - setSessionAttribute(String key, Object value)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-setSessionAttribute_S_O&v=rome) method and the message transformer consumes the attributes using this method.
		 *
		 * @param {string} key The name of the key value to return.
		 *
		 * @returns {string} Value of the passed in key. If no such key exists, returns null.
		 */
		getSessionAttribute(key: string): string
		
		/**
		 *
		 * Returns the key-value pairs for all session attributes that were previously set on the current CTIOperationResponse object.
		 *
		 * Using the get/set session attribute methods enables the passing of virtually any string or number value between an operation handler and a message transformer. Session attributes can also be accessed within a contact flow. The sessionAttribute object can contain zero or more key/value pairs of data, such as the contact's phone number, that are valid for the duration of a computer telephony integration provider defined session. The operation handler determines what session attribute key/value pairs are needed as it utilizes these values during processing. Typically the operation handler sets these attributes on the CTIOperationResponse object by calling the [CTIOperationResponse - setSessionAttribute(String key, Object value)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-setSessionAttribute_S_O&v=rome) method and the message transformer consumes the attributes using this method.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} A map of key-value pairs that were previously set on the CTIOperationResponse object. This key-value pairs are free-form and defined by the needs of the operation handler. The returned values are either Strings or Numbers.
		 */
		getSessionAttributes(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the status code set on the current CTIOperationResponse object.
		 *
		 * These status codes should correspond with standard HTTP status codes, such as 200 for success, 401 for authorization required. Typically, the resultant status codes are determined by the operation handler and are set on the CTIOperationResponse object using the [CTIOperationResponse - setStatusCode(String statusCode)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-setStatusCode_N&v=rome) method. The message transformer then uses this method to include the status code in the payload returned to the computer telephony integrator provider.
		 *
		 *
		 * @returns {number} Status code of the current operation. If a status code has not been set, returns -1.
		 */
		getStatusCode(): number
		
		/**
		 *
		 * Sets an authentication token on the current CTIOperationResponse object.
		 *
		 * This token is used by the Cloud Call Center framework to authenticate the current Cloud Call Center user before executing the requested operation handler if the handler's auth_required flag is set to true. The auth_required flag is a field in the Operation Handler [sn_cti_operation_handler] table. The life of an authentication token should be for the life of the call session, but is determined by the CTI provider.
		 * 		 * 
		 * 		 * You can define whatever authentication/authorization handling required by your implementation by creating your own authentication operation handler. Regardless of how the authentication token is generated, the message translator must pass the token back in the CTI payload. Additionally, the CTI provider must store this authentication token locally and pass it in each operation request that requires authentication.
		 * 		 * 
		 * 		 * If using the instance provided authenticate operation handler, the handler initiates the creation of the authentication token based on a four-digit user-entered pin. It then sets the authentication token in the sessionAttributes object of the CTIOperationResponse object. The associated message transformer translates the sessionAttributes object into the CTI-specific payload and then sends it to the CTI provider.
		 * 		 * 
		 * 		 * Note: If the authentication token is not passed, all requests to execute operation handlers with the auth_required flag set will fail. If you do not use authentication, you do not need to maintain authentication tokens.
		 * 		 * 
		 * 		 * The ServiceNow base system provides working operation handlers and message transformers that enable connection to Amazon Connect. When building contact flows within Amazon Connect, there are two integration points between Amazon services and a ServiceNow instance:
		 * 		 * 
		 * 		 * *   Amazon Web Services (AWS) Lambda Proxy (Invoke AWS Lambda function)
		 * 		 * *   AWS Lex Bot (Get Customer Input)
		 * 		 * 
		 * 		 * You can find the available operation handlers and message transformers for these integration points in the Operation Handlers [sn_cti_operation_handler] and Provider Message Transformer [sn_cti_provider_msg_transormer] tables.
		 *
		 *
		 * @returns {string} The authentication token to use to authenticate operations that have the auth_required flag set.
		 */
		setAuthToken(): string
		
		/**
		 *
		 * Sets the error object in the current CTIOperationResponse object.
		 *
		 * You can use the error object in the component to formulate the payload to send to the computer telephony integrator (CTI) provider.
		 *
		 * @param {{[fieldName: string]: string}} error Information about the error that was detected while processing the requested operation. The format of this object is determined by the CTI provider.
		 *
		 * @returns {void} Method does not return a value
		 */
		setError(error: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets the sys_id of the interaction record associated with the operation request on the current CTIOperationResponse object.
		 *
		 * @param {string} sys_id The sys_id to set for the current interaction.
		 *
		 * @returns {void} Method does not return a value
		 */
		setInteractionSysId(sys_id: string): void
		
		/**
		 *
		 * Sets the major version of the computer telephony integrator (CTI) provider software making the request on the associated CTIOperationResponse object.
		 *
		 * Use this method if the CTI providers connected to your ServiceNow instance are running multiple versions of their software, as different software versions may require different payloads. If the payload is only slightly different between the software versions, it may make sense to have only a single message transformer. You can then handle the payload differences by just checking the version of software making the request within your message transformer. If the required payload is significantly different between versions, it may be more effective to use multiple message transformers.
		 *
		 * @param {number} majorVersion Major version of the CTI provider software making the operation request.
		 * 
		 * If this value was not previously set, returns 1.
		 *
		 * @returns {void} Method does not return a value
		 */
		setMajorVersion(majorVersion: number): void
		
		/**
		 *
		 * Sets a text message on the current CTIOperationResponse object.
		 *
		 * Typically this is a message that is spoken back to the user once an operation is complete and is set by the associated operation handler. The message transformer then uses the [CTIOperationResponse - getMessage()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-getMessage&v=rome) method to obtain the message and pass it back to the computer telephony integration provider.
		 *
		 * @param {string} message Message text
		 *
		 * @returns {void} Method does not return a value
		 */
		setMessage(message: string): void
		
		/**
		 *
		 * Sets the minor version of the computer telephony integrator (CTI) provider software making the request on the associated CTIOperationResponse object.
		 *
		 * Use this method if the CTI providers connected to your ServiceNow instance are running multiple versions of their software, as different software versions may require different payloads. If the payload is only slightly different between the software versions, it may make sense to have only a single message transformer. You can then handle the payload differences by just checking the version of software making the request within your message transformer. If the required payload is significantly different between versions, it may be more effective to use multiple message transformers.
		 *
		 * @param {number} minorVersion Minor version of the CTI provider software making the operation request.
		 * 
		 * If this value was not previously set, returns 0.
		 *
		 * @returns {void} Method does not return a value
		 */
		setMinorVersion(minorVersion: number): void
		
		/**
		 *
		 * Sets the specified key-value pair on the associated CTIOperationResponse object.
		 *
		 * Using the get/set parameter methods enables the passing of virtually any string or number value between an operation handler and a message transformer. The parameter object can contain zero or more key/value pairs of data that directly correlate to the current operation request. The operation handler determines what key/value pairs are required as it consumes these values. Typically the operation handler sets these parameters on the CTIOperationResponse object by calling this method and the message transformer consumes them using the [CTIOperationResponse - getParmeter(String key)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-getParameter_S&v=rome) or [CTIOperationResponse - getSParameters()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-getParameters&v=rome) method.
		 * 		 * 
		 * 		 * Note: You should only store objects that can survive a `JSON.parse(JSON.stringify(object))` operation. Objects not meeting this criteria may not propagate correctly through the entire operation processing chain.
		 * 		 * 
		 * 		 * For example:
		 * 		 * 
		 * 		 *     var x = {
		 * 		 *       "string": 'abc',
		 * 		 *       "int": 123,
		 * 		 *       "float": 1.234,
		 * 		 *       "number": new Number(3),
		 * 		 *       "boolean": true,
		 * 		 *       "date": new Date(2006, 0, 2, 15, 4, 5),
		 * 		 *       "object": {
		 * 		 *         "string": 'abc',
		 * 		 *         "int": 123,
		 * 		 *         "float": 1.234,
		 * 		 *         "number": new Number(3),
		 * 		 *         "boolean": true,
		 * 		 *         "date": new Date(2006, 0, 2, 15, 4, 5)
		 * 		 *       },
		 * 		 *       "function": function(abc) {
		 * 		 *     
		 * 		 *       }
		 * 		 *     }
		 * 		 *     var stringify = JSON.stringify(x);
		 * 		 *     gs.info(stringify);
		 * 		 *     var hydrate = JSON.parse(stringify);
		 * 		 *     var stringify2 = JSON.stringify(hydrate);
		 * 		 *     gs.info(stringify2);
		 * 		 *     
		 * 		 * 
		 * 		 * Produces:
		 * 		 * 
		 * 		 *     {"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z","object":{"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z"}}
		 * 		 *     {"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z","object":{"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z"}}
		 *
		 * @param {string} key Name of the key under which to store the associated value.
		 * @param {{[fieldName: string]: string}} value Value to store for the key.
		 * 
		 * Valid data types:
		 * 
		 * *   string
		 * *   int
		 * *   float
		 * *   number
		 * *   boolean
		 * *   date
		 * *   object
		 *
		 * @returns {void} Method does not return a value
		 */
		setParameter(key: string, value: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets the specified session attribute key-value pair on the associated CTIOperationResponse object.
		 *
		 * Using the get/set session attribute methods enables the passing of virtually any string or number value between an operation handler and a message transformer. The sessionAttribute object can contain zero or more key/value pairs of data that are valid for the duration of a computer telephony integration provider defined session. Session attributes can also be accessed within a contact flow. The operation handler determines what session attribute key/value pairs are needed as it consumes these values. Typically the operation handler sets these attributes on the CTIOperationResponse object by calling this method and the message transformer gets the attributes using the [CTIOperationResponse - getSessionAttribute(String key)](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-getSessionAttribute_S&v=rome) or [CTIOperationResponse - getSessionAttribute()](https://developer.servicenow.com/go_to_api.do?ID=CTIOpResp-getSessionAttributes&v=rome) method.
		 * 		 * 
		 * 		 * Note: You should only store objects that can survive a `JSON.parse(JSON.stringify(object))` operation. Objects not meeting this criteria may not propagate correctly through the entire operation processing chain.
		 * 		 * 
		 * 		 * For example:
		 * 		 * 
		 * 		 *     var x = {
		 * 		 *       "string": 'abc',
		 * 		 *       "int": 123,
		 * 		 *       "float": 1.234,
		 * 		 *       "number": new Number(3),
		 * 		 *       "boolean": true,
		 * 		 *       "date": new Date(2006, 0, 2, 15, 4, 5),
		 * 		 *       "object": {
		 * 		 *         "string": 'abc',
		 * 		 *         "int": 123,
		 * 		 *         "float": 1.234,
		 * 		 *         "number": new Number(3),
		 * 		 *         "boolean": true,
		 * 		 *         "date": new Date(2006, 0, 2, 15, 4, 5)
		 * 		 *       },
		 * 		 *       "function": function(abc) {
		 * 		 *     
		 * 		 *       }
		 * 		 *     }
		 * 		 *     var stringify = JSON.stringify(x);
		 * 		 *     gs.info(stringify);
		 * 		 *     var hydrate = JSON.parse(stringify);
		 * 		 *     var stringify2 = JSON.stringify(hydrate);
		 * 		 *     gs.info(stringify2);
		 * 		 *     
		 * 		 * 
		 * 		 * Produces:
		 * 		 * 
		 * 		 *     {"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z","object":{"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z"}}
		 * 		 *     {"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z","object":{"string":"abc","int":123,"float":1.234,"number":3,"boolean":true,"date":"2006-01-02T23:04:05.000Z"}}
		 *
		 * @param {string} key Name of the session attribute key under which to set the associated value.
		 * @param {{[fieldName: string]: string}} value Value to set.
		 * 
		 * Valid data types:
		 * 
		 * *   string
		 * *   int
		 * *   float
		 * *   number
		 * *   boolean
		 * *   date
		 * *   object
		 *
		 * @returns {void} Method does not return a value
		 */
		setSessionAttribute(key: string, value: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets the status code of the current operation request on the CTIOperationResponse object.
		 *
		 * You can use any integer values to define the status, but it is recommended that you emulate the HTTP status codes, such as 200 = Ok/Success, 400 = Bad Request, 401 = Unauthorized.
		 *
		 * @param {number} statusCode Integer that uniquely identifies the status of the requested operation.
		 *
		 * @returns {void} Method does not return a value
		 */
		setStatusCode(statusCode: number): void
		
	}
	
}