declare namespace sn_fd - FlowDesigner {

	/** 
	 * The Flow API can only be used in server scripts.  
	 *   
	 * Use the sn_fd namespace to access the Flow API.  
	 *   
	 * Before interacting with a flow using the Flow API, you must first create and activate the flow in the Flow Designer interface. Because the Flow API only interacts with pre-built flows, there is no constructor for the class.  
	 *   
	 * This API is deprecated and replaced by the [FlowAPI - Scoped, Global](dev.do#!/reference/api/orlando/server/sn_fd-namespace/ScriptableFlowAPI "Use FlowAPI methods to execute actions, flows, or subflows in server-side scripts using either blocking or non-blocking methods.")  
	 *   
	 * 
	 * Note: To optimize instance performance, avoid calling these methods from a script for an asynchronous business rule. Instead, create a scheduled job record within the Flow Designer UI.
	 * 
	 */
	class Flow {
	
		/**
		 *
		 * Ignores the trigger and runs an activated flow asynchronously.
		 *
		 * Asynchronous calls are non-blocking, allowing the client to execute other code in the script without having to wait for the flow to complete.
		 *
		 * @param {string} scopeName.flowName The application scope for the flow and the internal name of the flow to run. If scopeName is not included, the scope of the user currently logged in is used. Retrieve the internal name of the flow using the Internal name column on the Flow Designer landing page.
		 * @param {{[fieldName: string]: string}} flowInputs Name-value pairs in <String, Object> format that define record-based flow inputs.
		 * 
		 * To call a flow with a record-based trigger, use the format:
		 * 
		 * var flowInputs = {};
		 * flowInputs['current'] = glideRecord;
		 * flowInputs['table_name'] = glideRecord.getTableName();
		 * 
		 * The GlideRecord object must be named 'current'.
		 * 
		 * To call a flow with a Service Catalog trigger, use the format:
		 * 
		 * var flowInputs = {};
		 * flowInputs['request_item'] = glideRecord;
		 * flowInputs['table_name'] = glideRecord.getTableName();
		 * 
		 * The GlideRecord object must be named 'request_item'.
		 *
		 * @returns {{[fieldName: string]: string}} PlanResponse object containing the following properties:
		 * 
		 * *   contextId: sys_id of the execution details record for the executed flow. Access the execution details by navigating to the Flow Executions tab in Flow Designer and filtering by sys_id.
		 * 
		 * An exception occurs when the flow:
		 * 
		 * *   Does not exist within the specified application scope, or the flow or scope name has been misspelled.
		 * *   Is not activated.
		 * *   Exceeds the recursion limit set by the com.glide.hub.flow_engine.indirect_recursion_limit system property. The default value is three.
		 */
		startAsync(flowInputs: {[fieldName: string]: string}): {[fieldName: string]: string}
		
	}
	
	/** 
	 * Access FlowAPI methods in global and scoped scripts using the sn_fd.FlowAPI object. Create calls to your flows using the Code Snippet action in Flow Designer, or use the methods detailed here to update scripts manually.  
	 *   
	 * 
	 * Note: In domain separated instances, flows, subflows, and actions triggered by this API run in the domain of the user who started the script. For example, if a user in the Acme domain starts a script that triggers a flow, the flow runs in the Acme domain and can only access Acme data, even if the flow runs as the System User.
	 * 
	 *   
	 *   
	 * 
	 * Note: To optimize instance performance, avoid calling these methods from a script for an asynchronous business rule. Instead, create a scheduled job record within the Flow Designer UI.
	 * 
	 */
	class FlowAPI {
	
		/**
		 *
		 * Cancels a paused or running flow, subflow, or action.
		 *
		 * @param {string} contextId Sys_id of the execution details record for the flow, subflow, or action. Access the execution details by navigating to the Flow Executions tab in Flow Designer, or pass the sys_id of the context record returned by the startFlow(), startSubflow(), or startAction() methods.
		 * @param {string} reason Optional. Reason for canceling the flow, subflow, or action. Appears in the Message field of the Flow engine log entries [sys_flow_log] table.
		 *
		 * @returns {void} Method does not return a value
		 */
		cancel(contextId: string, reason: string): void
		
		/**
		 *
		 * Run an action from a server-side script synchronously.
		 *
		 * Execute an action from within a business rule, script include, or any other server-side script. Actions run using this method run synchronously, so the method has access to outputs created by the action. Use startAction to run an action asynchronously.
		 * 		 * 
		 * 		 * Note: This method runs the action as the user who initiates the session.
		 *
		 * @param {string} name The scope and name of the action to be executed, for example global.action_name.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define action inputs. Use the input name, not the input label.
		 * @param {number} timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
		 *
		 * @returns {{[fieldName: string]: string}} The action outputs.
		 */
		executeAction(name: string, inputs: {[fieldName: string]: string}, timeout: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Run an action from a server-side script synchronously from the current user session without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.
		 *
		 * Note: Execution details and context records are not created, regardless of Flow Designer settings.
		 *
		 * @param {string} name Scope and internal name of the action to execute. For example, global.action_name. Locate the Internal name field in the list of Flow Designer actions.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define action inputs. You can find the available action inputs and required data types under Inputs in the action outline. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
		 * @param {number} timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
		 *
		 * @returns {{[fieldName: string]: string}} Object containing outputs defined by the action. You can find the outputs for the action under Outputs in the action outline.
		 */
		executeActionQuick(name: string, inputs: {[fieldName: string]: string}, timeout: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Runs a Data Stream action synchronously from a server-side script and returns a ScriptableDataStream object.
		 *
		 * For more information about Data Stream actions, see [Data Stream actions and pagination](https://docs.servicenow.com/bundle/orlando-servicenow-platform/page/administer/integrationhub/concept/data-stream-actions.html).
		 * 		 * 
		 * 		 * Note: Always wrap data stream logic in a try/catch block to catch errors. Always include a finally statement that ends with the close() method from the ScriptableDataStream class to close the data stream and prevent performance issues.
		 *
		 * @param {string} name The scope and name of the Data Stream action to execute. For example, global.data_stream_action_name.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define action inputs. Use the input name, not the input label. If the action does not have any inputs, do not include this parameter.
		 * @param {number} timeout Optional. Amount of time before the action times out. After the timeout expires, an exception is thrown. The timeout only applies to the executeDataStreamAction method, not to methods in the ScriptableDataStream class.
		 * 
		 * Default: 30000, specified by the com.glide.hub.flow_api.default_execution_time system property
		 * 
		 * Unit: Milliseconds
		 *
		 * @returns {ScriptableDataStream} An object used to iterate through items in the data stream. Use the methods in the ScriptableDataStream class to interact with this object. See [ScriptableDataStream API](https://developer.servicenow.com/go_to_api.do?ID=ScriptableDataStreamAPI&v=orlando).
		 */
		executeDataStreamAction(name: string, inputs: {[fieldName: string]: string}, timeout: number): ScriptableDataStream
		
		/**
		 *
		 * Run a flow from a server-side script synchronously.
		 *
		 * Execute a flow from within a business rule, script include, or any other server-side script. Flows run using this method run synchronously. Use startFlow to run a flow asynchronously.
		 * 		 * 
		 * 		 * Note: This method runs the flow as the user specified in flow properties.
		 *
		 * @param {string} name The scope and name of the flow to be executed, for example global.flow_name.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define trigger inputs. Use the input name, not the input label.
		 * @param {number} timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
		 *
		 * @returns {{[fieldName: string]: string}} The API throws an exception when a flow called synchronously pauses. The current execution is in the waiting state. In most cases, the exception is removed when the flow resumes. However, the API cannot resume a flow that has been sent to a MID Server.
		 */
		executeFlow(name: string, inputs: {[fieldName: string]: string}, timeout: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Run a flow, subflow, or action from a server-side script synchronously or asynchronously without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.
		 *
		 * This method runs the flow as the user who initiates the session. Setting the flow to run as the system user, or impersonating a user, is not supported. Flows that include wait conditions, for instance the Wait for a duration of time flow logic or Ask For Approval action, are not supported.
		 * 		 * 
		 * 		 * Note: Execution details and context records are not created, regardless of Flow Designer settings.
		 *
		 * @param {string} name Scope and internal name of the flow to execute. For example, global.flow_name. Locate the Internal name field in the list of Flow Designer flows.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define trigger inputs. You can find the available trigger inputs and required data types in the Trigger section of the flow. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
		 * @param {number} timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
		 *
		 * @returns {void} Method does not return a value
		 */
		executeFlowQuick(name: string, inputs: {[fieldName: string]: string}, timeout: number): void
		
		/**
		 *
		 * Run an subflow from a server-side script synchronously.
		 *
		 * Execute a subflow from within a business rule, script include, or any other server-side script. Subflows run using this method run synchronously. Use startSubflow to run an subflow asynchronously.
		 * 		 * 
		 * 		 * Note: This method runs the flow as the user specified in flow properties.
		 *
		 * @param {string} name The scope and name of the subflow to be executed, for example global.subflow_name.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define subflow inputs. Use the input name, not the input label.
		 * @param {number} timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
		 *
		 * @returns {{[fieldName: string]: string}} The API throws an exception when a flow called synchronously pauses. The current execution is in the waiting state. In most cases, the exception is removed when the flow resumes. However, the API cannot resume a flow that has been sent to a MID Server.
		 */
		executeSubflow(name: string, inputs: {[fieldName: string]: string}, timeout: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Run a subflow from a server-side script synchronously from the current user session without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.
		 *
		 * This method runs the subflow as the user who initiates the session. Setting the subflow to run as the System User, or impersonating a user, is not applied. Subflows that include wait conditions, for instance the Wait for a duration of time flow logic or Ask For Approval action, are not supported.
		 * 		 * 
		 * 		 * Note: Execution details and context records are not created, regardless of Flow Designer settings.
		 *
		 * @param {string} name Scope and internal name of the subflow to execute. For example, global.subflow_name. Locate the Internal name field in the list of Flow Designer subflows.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define subflow inputs. You can find the available subflow inputs and required data types under Inputs in the subflow. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
		 * @param {number} timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
		 *
		 * @returns {{[fieldName: string]: string}} Object containing outputs defined by the subflow. You can find the outputs for the subflow under Subflow Inputs & Outputs in the subflow outline.
		 */
		executeSubflowQuick(name: string, inputs: {[fieldName: string]: string}, timeout: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Build password2 values inside a script step.
		 *
		 * Identify an encrypted password2 value returned from a GlideRecord, enabling the system to display the value as a masked password rather than an encrypted string.
		 *
		 * @param {string} password Encrypted password2 value.
		 *
		 * @returns {string} Encrypted password2 value, recognised by the engine as a password value.
		 */
		setEncryptedOutput(password: string): string
		
		/**
		 *
		 * Run an action from a server-side script asynchronously.
		 *
		 * Execute an action from within a business rule, script include, or any other server-side script. Actions run using this method run asynchronously, and scripts using this method does not have access to any outputs created by the action. Use executeAction to run an action synchronously and access the outputs it generates.
		 * 		 * 
		 * 		 * Note: This method runs the action as the user who initiates the session.
		 *
		 * @param {string} name The scope and name of the action to be executed, for example global.action_name.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define action inputs. Use the input name, not the input label.
		 *
		 * @returns {string} Sys Id of the context record for the action. Access the context record by navigating to the Flow Executions tab in Flow Designer, selecting a flow execution, and clicking Open Context Record.
		 */
		startAction(name: string, inputs: {[fieldName: string]: string}): string
		
		/**
		 *
		 * Run an action from a server-side script asynchronously without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.
		 *
		 * Note: Execution details and context records are not created, regardless of Flow Designer settings.
		 *
		 * @param {string} name Scope and internal name of the action to execute. For example, global.action_name. Locate the Internal name field in the list of Flow Designer actions.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define action inputs. You can find the available action inputs and required data types under Inputs in the action outline. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
		 *
		 * @returns {void} Method does not return a value
		 */
		startActionQuick(name: string, inputs: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Run a flow from a server-side script.
		 *
		 * Execute a flow from within a business rule, script include, or any other server-side script. Flows executed with this method run asynchronously.
		 * 		 * 
		 * 		 * Note: This method runs the flow as the user specified in flow properties.
		 *
		 * @param {string} name The scope and name of the flow to be executed, for example global.flow_name.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define trigger inputs. Use the input name, not the input label.
		 *
		 * @returns {string} Sys Id of the context record for the flow. Access the context record by navigating to the Flow Executions tab in Flow Designer, selecting a flow execution, and clicking Open Context Record.
		 */
		startFlow(name: string, inputs: {[fieldName: string]: string}): string
		
		/**
		 *
		 * Run a flow from a server-side script asynchronously without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.
		 *
		 * This method runs the flow as the System User. Setting the flow to run as the user who initiates the session, or impersonating a user, is not applied. Flows that include wait conditions, for instance the Wait for a duration of time flow logic or Ask For Approval action, are not supported.
		 * 		 * 
		 * 		 * Note: Execution details and context records are not created, regardless of Flow Designer settings.
		 *
		 * @param {string} name Scope and internal name of the flow to execute. For example, global.flow_name. Locate the Internal name field in the list of Flow Designer flows.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define trigger inputs. You can find the available trigger inputs and required data types in the Trigger section of the flow. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
		 *
		 * @returns {void} Method does not return a value
		 */
		startFlowQuick(name: string, inputs: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Run a subflow from a server-side script.
		 *
		 * Execute a subflow from within a business rule, script include, or any other server-side script. Subflows run using this method run asynchronously Scripts that include this method do not have access to outputs created by the flow. Use executeSubflow to run a subflow synchronously and access the outputs it generates.
		 * 		 * 
		 * 		 * Note: This method runs the flow as the user specified in flow properties.
		 *
		 * @param {string} name The scope and name of the subflow to be executed, for example global.subflow_name.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define subflow inputs. Use the input name, not the input label.
		 *
		 * @returns {string} Sys Id of the context record for the subflow. Access the context record by navigating to the Flow Executions tab in Flow Designer, selecting a flow execution, and clicking Open Context Record.
		 */
		startSubflow(name: string, inputs: {[fieldName: string]: string}): string
		
		/**
		 *
		 * Run a subflow from a server-side script asynchronously without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.
		 *
		 * This method runs the subflow as the System User. Setting the subflow to run as the user who initiates the session, or impersonating a user, is not applied. Subflows that include wait conditions, for instance the Wait for a duration of time flow logic or Ask For Approval action, are not supported.
		 * 		 * 
		 * 		 * Note: Execution details and context records are not created, regardless of Flow Designer settings.
		 *
		 * @param {string} name Scope and internal name of the subflow to execute. For example, global.subflow_name. Locate the Internal name field in the list of Flow Designer subflows.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define subflow inputs. You can find the available subflow inputs and required data types under Inputs in the subflow. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
		 *
		 * @returns {void} Method does not return a value
		 */
		startSubflowQuick(name: string, inputs: {[fieldName: string]: string}): void
		
	}
	
	/** 
	 * This class can only be used in a server-side script after retrieving a ScriptableDataStream object from the executeDataStreamAction() method in the FlowAPI class. See [FlowAPI](https://developer.servicenow.com/go_to_api.do?ID=ScriptableFlowAPI&v=orlando).  
	 *   
	 * After retrieving a ScriptableDataStream object, call the methods in this specific order:  
	 *   
	 * 
	 * 1.  Use the hasNext() method to determine whether there are more items in the data stream.
	 * 2.  Use the next() method to access the next item in the stream.
	 * 3.  Use the getItemIndex(), getItemInPageIndex(), and getPageIndex() methods to get information from the stream.
	 * 4.  Use the close() method to close the stream.
	 * 
	 *   
	 *   
	 * 
	 * Note: Always wrap data stream logic in a try/catch block to catch errors. Always include a finally statement that ends with the close() method from the ScriptableDataStream class to close the data stream and prevent performance issues.
	 * 
	 */
	class ScriptableDataStream {
	
		/**
		 *
		 * Closes the connection to a data stream. Always call this method after performing any desired operations on a data stream.
		 *
		 * You can only call this method on a ScriptableDataStream object returned from the executeDataStreamAction() method in the FlowAPI class. See [FlowAPI](https://developer.servicenow.com/go_to_api.do?ID=ScriptableFlowAPI&v=orlando).
		 *
		 *
		 * @returns {void} Method does not return a value
		 */
		close(): void
		
		/**
		 *
		 * Returns the current index of an item in a data stream.
		 *
		 * You can only call this method on a ScriptableDataStream object returned from the executeDataStreamAction() method in the FlowAPI class. See [FlowAPI](https://developer.servicenow.com/go_to_api.do?ID=ScriptableFlowAPI&v=orlando).
		 *
		 *
		 * @returns {number} Current index of an item in a data stream using zero-based indexing.
		 */
		getItemIndex(): number
		
		/**
		 *
		 * Returns the current index of an item within the current page in a data stream.
		 *
		 * You can only call this method on a ScriptableDataStream object returned from the executeDataStreamAction() method in the FlowAPI class. See [FlowAPI](https://developer.servicenow.com/go_to_api.do?ID=ScriptableFlowAPI&v=orlando).
		 *
		 *
		 * @returns {number} Current index of an item within the current page in the data stream using zero-based indexing.
		 */
		getItemInPageIndex(): number
		
		/**
		 *
		 * Returns the current index of a page in a data stream.
		 *
		 * You can only call this method on a ScriptableDataStream object returned from the executeDataStreamAction() method in the FlowAPI class. See [FlowAPI](https://developer.servicenow.com/go_to_api.do?ID=ScriptableFlowAPI&v=orlando).
		 *
		 *
		 * @returns {number} Current index of a page in a data stream using zero-based indexing.
		 */
		getPageIndex(): number
		
		/**
		 *
		 * Returns true if there are more items in the data stream.
		 *
		 * You can only call this method on a ScriptableDataStream object returned from the executeDataStreamAction() method in the FlowAPI class. See [FlowAPI](https://developer.servicenow.com/go_to_api.do?ID=ScriptableFlowAPI&v=orlando).
		 * 		 * 
		 * 		 * Note: By default, the instance waits for 600 seconds to retrieve a single page of data from a MID Server. If you encounter a timeout when running a Data Stream action through a MID Server, change this default by increasing the datastream_alternative_env_fetch_page_timeout system property.
		 *
		 *
		 * @returns {boolean} Flag that determines whether there are more items in the data stream. Values include:
		 * 
		 * *   true: There are more items to iterate through in the data stream.
		 * *   false: There are no more items in the data stream.
		 */
		hasNext(): boolean
		
		/**
		 *
		 * Returns the next item in a data stream.
		 *
		 * You can only call this method on a ScriptableDataStream object returned from the executeDataStreamAction() method in the FlowAPI class. See [FlowAPI](https://developer.servicenow.com/go_to_api.do?ID=ScriptableFlowAPI&v=orlando).
		 * 		 * 
		 * 		 * Note: By default, the instance waits for 600 seconds to retrieve a single page of data from a MID Server. If you encounter a timeout when running a Data Stream action through a MID Server, change this default by increasing the datastream_alternative_env_fetch_page_timeout system property.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The next item in the data stream. This object contains the outputs defined by the Data Stream action. To view the Data Stream action outputs, navigate to the Outputs section of the Data Stream action in the Flow Designer interface.
		 */
		next(): {[fieldName: string]: string}
		
	}
	
	/** 
	 * The Subflow API can only be used in server scripts.  
	 *   
	 * Use the sn_fd namespace to access the Subflow API.  
	 *   
	 * Before interacting with a subflow using the Subflow API, you must first create and publish the subflow in the Flow Designer interface. Because the Subflow API only interacts with pre-built subflows, there is no constructor for the class.  
	 *   
	 * This API is deprecated and replaced by the [FlowAPI - Scoped, Global](dev.do#!/reference/api/orlando/server/sn_fd-namespace/ScriptableFlowAPI "Use FlowAPI methods to execute actions, flows, or subflows in server-side scripts using either blocking or non-blocking methods.").  
	 *   
	 * 
	 * Note: To optimize instance performance, avoid calling these methods from a script for an asynchronous business rule. Instead, create a scheduled job record within the Flow Designer UI.
	 * 
	 */
	class Subflow {
	
		/**
		 *
		 * Runs a published subflow asynchronously.
		 *
		 * Asynchronous calls are non-blocking, allowing the client to execute other code in the script without having to wait for the subflow to complete.
		 *
		 * @param {string} scopeName.subflowName The application scope for the subflow and the internal name of the subflow to run. If scopeName is not included, the scope of the user currently logged in is used. Retrieve the internal name of the subflow using the Internal name column on the Flow Designer landing page.
		 * @param {{[fieldName: string]: string}} inputs Name-value pairs that define subflow inputs. If a subflow includes mandatory inputs, they must be included. For inputs of Reference or Document ID field types, use a GlideRecord object as the value.
		 *
		 * @returns {{[fieldName: string]: string}} PlanResponse object containing the following properties:
		 * 
		 * *   contextId: sys_id of the execution details record for the executed subflow. Access the execution details by navigating to the Flow Executions tab in Flow Designer and filtering by sys_id.
		 * 
		 * An exception occurs when the subflow:
		 * 
		 * *   Does not exist within the specified application scope, or the subflow or scope name has been misspelled.
		 * *   Is not published.
		 * *   Is passed an input object that does not match the subflow inputs.
		 * *   Exceeds the recursion limit set by the com.glide.hub.flow_engine.indirect_recursion_limit system property. The default value is three.
		 */
		startAsync(inputs: {[fieldName: string]: string}): {[fieldName: string]: string}
		
	}
	
}