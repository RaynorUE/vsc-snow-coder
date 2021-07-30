declare namespace sn_ih {

	/** 
	 * Use these methods in the Flow Designer script step with the sn_ih namespace identifier. For example, you can use this API to create a JSON payload in the Flow Designer Script step and pass the returned value to the REST step to send the request to a third-party service. For more information, see the Flow Designer [Script step](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/flow-designer/reference/javascript-step-action-designer.html).
	 * 
	 * You can only use this API within the Flow Designer environment.
	 * 
	 * To use this class, you must call the build() method in the JSONStreamingBuilder class to return a JSONStreamingAPI object. See [JSONStreamingBuilder](dev.do#!/reference/api/rome/server/ "Create a builder object used to build a large streaming JSON payload to use in a REST or SOAP request to send bulk data to a third-party API. You can also create the payload as a JSON string for a non-streaming option.").
	 * 
	 *   
	 *   
	 * 
	 * API call order
	 * --------------
	 * 
	 * Generate JSON payloads using these APIs in the following order:
	 * 
	 * JSONStreamingBuilder: Creates a builder object
	 * 
	 * Use these methods in the following order to create a builder object:
	 * 
	 * 1.  JSONStreamingBuilder(): Instantiates the JSONStreamingBuilder object.
	 * 2.  withAttachment(): Optional. Creates the JSON object as a streaming attachment and stores it in the Streaming Attachments [streaming_attachment] table. If you do not call this method, the API creates the payload as a JSON string.
	 * 3.  expiresAt(): Optional. Sets a time when the attachment expires. Must also call the withAttachment() method.
	 * 4.  build(): Returns a JSONStreamingAPI object.
	 * 
	 * JSONStreamingAPI: Builds the JSON payload
	 * 
	 * Use these methods in the following order to create the JSON payload:
	 * 
	 * 1.  startObject(): Creates the parent JSON object.
	 * 2.  Methods to generate the JSON key-value pairs, such as writeFieldName(), writeString(), and writeNumberField().
	 * 3.  endObject(): Closes the parent JSON object.
	 * 4.  getJSONString() or getAttachmentId(): Returns the JSON string or attachment ID that you created.
	 * 5.  close(): Closes the JSONStreamingAPI object.
	 * 
	 *   
	 *   
	 * 
	 * Size limits
	 * -----------
	 * 
	 * Payloads generated through this API cannot exceed these size limits:
	 * 
	 * *   Attachments: 200 MB
	 * *   Strings: 5 MB
	 * 
	 *   
	 *   
	 * 
	 * Example
	 * -------
	 * 
	 * This example create a JSON object and stores it in the Attachment [sys_attachment] table with a defined expiration date. You can use this option to create payloads under 5 MB.
	 * 
	 *     try {
	 *       var ttl = new GlideDateTime("2011-01-01 12:00:00");
	 *       var builder = new sn_ih.JSONStreamingBuilder()
	 *         .withAttachment() // Creates the JSON object in streaming mode within an attachment.
	 *         .expiresAt(ttl) // Sets an expiration date for the attachment.
	 *         .build(); // Creates the JSONStreamingAPI object. 
	 *     
	 *       builder.startObject()  // Begins generating the JSON object.
	 *     	.writeFieldName("firstName")  // Adds a "firstName" field 
	 *     	.writeString("John")          // Writes the value of the "firstName" field
	 *     	.writeFieldName("lastName")
	 *     	.writeString("Smith")
	 *     	.writeNumberField("age","25") // Write a number field named "age" with value "25"
	 *     	.writeFieldName("address")
	 *     	.startObject()                // Start a new object nested under the parent object
	 *     		.writeStringField("streetAddress", "21 2nd Street")
	 *     		.writeStringField("city", "Santa Clara")
	 *     		.writeStringField("state", "CA")
	 *     		.writeStringField("postalCode", "11111")
	 *     	.endObject()
	 *     	.writeFieldName("phoneNumber")
	 *     	.startArray()                    // Start an array 
	 *     		.startObject()               // Add the first object to the array 
	 *     			.writeFieldName("type")
	 *     			.writeString("home")
	 *     			.writeFieldName("number")
	 *     			.writeString("212 555-1234")
	 *     		.endObject()
	 *     		.startObject()               // Add another object to the array 
	 *     			.writeFieldName("type")
	 *     			.writeString("fax")
	 *     			.writeFieldName("number")
	 *     			.writeString("646 555-4567")
	 *     		.endObject()
	 *     	.endArray()
	 *     	.endObject()
	 *     
	 *       gs.log(builder.getAttachmentId()); // Returns the sys_id of the attachment.
	 *     } 
	 *     
	 *     catch (err) {
	 *       gs.log(err);
	 *     } 
	 *     
	 *     finally {
	 *       builder.close();
	 *     }
	 * 
	 * Alternatively, this example uses the API in the Script step and creates the payload as a JSON string. You can use this option to create payloads under 5 MB.
	 * 
	 *     (function execute(inputs, outputs) {
	 *     
	 *       var builder = new sn_ih.JSONStreamingBuilder().build();
	 *       
	 *       builder.startObject()
	 *         .enablePrettyPrint()
	 *         .writeFieldName("firstName")
	 *         .writeString("John")
	 *         .writeFieldName("lastName")
	 *         .writeString("Smith")
	 *         .writeNumberField("age","25")
	 *         .writeFieldName("address")
	 *         .startObject()
	 *           .writeStringField("streetAddress", "21 2nd Street")
	 *           .writeStringField("city", "Santa Clara")
	 *           .writeStringField("state", "CA")
	 *           .writeStringField("postalCode", "11111")
	 *         .endObject()
	 *         .writeFieldName("phoneNumber")
	 *         .startArray()
	 *           .startObject()
	 *             .writeFieldName("type")
	 *             .writeString("home")
	 *             .writeFieldName("number")
	 *             .writeString("212 555-1234")
	 *           .endObject()
	 *           .startObject()
	 *             .writeFieldName("type")
	 *             .writeString("fax")
	 *             .writeFieldName("number")
	 *             .writeString("646 555-4567")
	 *           .endObject()
	 *         .endArray()
	 *         .endObject()
	 *     
	 *       outputs.payload = builder.getJSONString();
	 *       
	 *     })(inputs, outputs);
	 * 
	 * Output:
	 * 
	 *     {
	 *     "firstName" : "John",
	 *     "lastName" : "Smith",
	 *     "age" : 25,
	 *     "address" : {
	 *       "streetAddress" : "21 2nd Street",
	 *       "city" : "Santa Clara",
	 *       "state" : "CA",
	 *       "postalCode" : "11111"
	 *     },
	 *     "phoneNumber" : [ {
	 *       "type" : "home",
	 *       "number" : "212 555-1234"
	 *     }, {
	 *       "type" : "fax",
	 *       "number" : "646 555-4567"
	 *     } ]
	 *     }
	 * 
	 */
	class JSONStreamingAPI {
	
		/**
		 *
		 * Closes the JSONStreamingAPI object. Must call this method to close the stream after building a JSON object.
		 *
		 *
		 * @returns {void} Method does not return a value
		 */
		close(): void
		
		/**
		 *
		 * Ends pretty print JSON formatting.
		 *
		 * Before calling this method, you must first call enablePrettyPrint() to add JSON formatting to a specific section.
		 *
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		disablePrettyPrint(): JSONStreamingAPI
		
		/**
		 *
		 * Adds pretty print formatting to a JSON object, or a section of a JSON object.
		 *
		 * To disable pretty print formatting in a JSON object section, use the disablePrettyPrint() method.
		 *
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		enablePrettyPrint(): JSONStreamingAPI
		
		/**
		 *
		 * Closes an array within the parent JSON object.
		 *
		 * Call the startArray() method first to open the array.
		 *
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		endArray(): JSONStreamingAPI
		
		/**
		 *
		 * Closes an object within the parent JSON object.
		 *
		 * Call the startObject() method first to open the object.
		 *
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		endObject(): JSONStreamingAPI
		
		/**
		 *
		 * Returns the sys_id of the attachment record in the Streaming Attachments [streaming_attachment] table that contains the JSON payload.
		 *
		 * You must call the withAttachment() method in the JSONStreamingBuilder class to save the JSON payload as an attachment before calling this method. See [JSONStreamingBuilder](dev.do#!/reference/api/rome/server/ "Create a builder object used to build a large streaming JSON payload to use in a REST or SOAP request to send bulk data to a third-party API. You can also create the payload as a JSON string for a non-streaming option.").
		 *
		 *
		 * @returns {string} Sys_id of the attachment record in the Streaming Attachments [streaming_attachment] table that contains the JSON payload.
		 */
		getAttachmentId(): string
		
		/**
		 *
		 * Returns the JSON object as a string.
		 *
		 * To return the JSON object as a string, do not call the withAttachment() method in the JSONStreamingBuilder class. See [JSONStreamingBuilder](dev.do#!/reference/api/rome/server/ "Create a builder object used to build a large streaming JSON payload to use in a REST or SOAP request to send bulk data to a third-party API. You can also create the payload as a JSON string for a non-streaming option.").
		 *
		 *
		 * @returns {string} Contains the JSON object built using the JSONStreamingAPI.
		 */
		getJSONString(): string
		
		/**
		 *
		 * Opens an array within the parent JSON object.
		 *
		 * Include the endArray() method to close the array.
		 *
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		startArray(): JSONStreamingAPI
		
		/**
		 *
		 * Creates an array within the parent JSON object.
		 *
		 * Surround this method with the startArray() and endArray() methods to open and close the array.
		 *
		 * @param {string} fieldName The name of the array.
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		startArrayField(fieldName: string): JSONStreamingAPI
		
		/**
		 *
		 * Opens an object within the parent JSON object.
		 *
		 * Requires the endObject() method to close the object.
		 *
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		startObject(): JSONStreamingAPI
		
		/**
		 *
		 * Adds a Boolean value to the parent JSON object.
		 *
		 * @param {boolean} state The boolean value to add to the parent JSON object.
		 * 
		 * Valid values:
		 * 
		 * *   true
		 * *   false
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		writeBoolean(state: boolean): JSONStreamingAPI
		
		/**
		 *
		 * Adds a Boolean field and value to the parent JSON object.
		 *
		 * @param {string} fieldName The name of the field to add to the parent JSON object.
		 * @param {boolean} value The boolean value to add to the parent JSON object.
		 * 
		 * Valid values:
		 * 
		 * *   true
		 * *   false
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		writeBooleanField(fieldName: string, value: boolean): JSONStreamingAPI
		
		/**
		 *
		 * Adds a field name to the parent JSON object.
		 *
		 * @param {string} name Field name to add to the parent JSON object.
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		writeFieldName(name: string): JSONStreamingAPI
		
		/**
		 *
		 * Adds a null value to the parent JSON object.
		 *
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		writeNull(): JSONStreamingAPI
		
		/**
		 *
		 * Adds a field with a null value to the parent JSON object.
		 *
		 * @param {string} fieldName The name of the null field.
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		writeNullField(fieldName: string): JSONStreamingAPI
		
		/**
		 *
		 * Adds a number field and value to the parent JSON object.
		 *
		 * @param {string} fieldName The name of the number field.
		 * @param {string} encodedValue The value of the number field.
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		writeNumberField(fieldName: string, encodedValue: string): JSONStreamingAPI
		
		/**
		 *
		 * Adds a raw value to the parent JSON object.
		 *
		 * @param {string} text Raw text to add to the parent JSON object.
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		writeRaw(text: string): JSONStreamingAPI
		
		/**
		 *
		 * Adds a string value to the parent JSON object.
		 *
		 * @param {string} text The string value to add to the parent JSON object.
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		writeString(text: string): JSONStreamingAPI
		
		/**
		 *
		 * Adds a string field and value to the parent JSON object.
		 *
		 * @param {string} fieldName The name of the field to add to the parent JSON object.
		 * @param {string} value The value of the field.
		 *
		 * @returns {JSONStreamingAPI} Streaming JSON object used to construct the payload.
		 */
		writeStringField(fieldName: string, value: string): JSONStreamingAPI
		
	}
	
	/** 
	 * Use these methods in the Flow Designer script step with the sn_ih namespace identifier. For example, you can use this API to create a JSON payload in the Flow Designer Script step and pass the returned value to the REST step to send the request to a third-party service. For more information, see the Flow Designer [Script step](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/flow-designer/reference/javascript-step-action-designer.html).
	 * 
	 * You can only use this API within the Flow Designer environment.
	 * 
	 *   
	 *   
	 * 
	 * API call order
	 * --------------
	 * 
	 * Generate JSON payloads using these APIs in the following order:
	 * 
	 * JSONStreamingBuilder: Creates a builder object
	 * 
	 * Use these methods in the following order to create a builder object:
	 * 
	 * 1.  JSONStreamingBuilder(): Instantiates the JSONStreamingBuilder object.
	 * 2.  withAttachment(): Optional. Creates the JSON object as a streaming attachment and stores it in the Streaming Attachments [streaming_attachment] table. If you do not call this method, the API creates the payload as a JSON string.
	 * 3.  expiresAt(): Optional. Sets a time when the attachment expires. Must also call the withAttachment() method.
	 * 4.  build(): Returns a JSONStreamingAPI object.
	 * 
	 * JSONStreamingAPI: Builds the JSON payload
	 * 
	 * Use these methods in the following order to create the JSON payload:
	 * 
	 * 1.  startObject(): Creates the parent JSON object.
	 * 2.  Methods to generate the JSON key-value pairs, such as writeFieldName(), writeString(), and writeNumberField().
	 * 3.  endObject(): Closes the parent JSON object.
	 * 4.  getJSONString() or getAttachmentId(): Returns the JSON string or attachment ID that you created.
	 * 5.  close(): Closes the JSONStreamingAPI object.
	 * 
	 *   
	 *   
	 * 
	 * Size limits
	 * -----------
	 * 
	 * Payloads generated through this API cannot exceed these size limits:
	 * 
	 * *   Attachments: 200 MB
	 * *   Strings: 5 MB
	 * 
	 *   
	 *   
	 * 
	 * Examples
	 * --------
	 * 
	 * This example shows how to create a JSON object and store it in the Attachment [sys_attachment] table with a defined expiration date.
	 * 
	 *     try {
	 *       var ttl = new GlideDateTime("2011-01-01 12:00:00");
	 *       var builder = new sn_ih.JSONStreamingBuilder()
	 *         .withAttachment() // Creates the JSON object in streaming mode within an attachment.
	 *         .expiresAt(ttl) // Sets an expiration date for the attachment.
	 *         .build(); // Creates the JSONStreamingAPI object. 
	 *     
	 *       builder.startObject()  // Begins generating the JSON object.
	 *     	.writeFieldName("firstName")  // Adds a "firstName" field 
	 *     	.writeString("John")          // Writes the value of the "firstName" field
	 *     	.writeFieldName("lastName")
	 *     	.writeString("Smith")
	 *     	.writeNumberField("age","25") // Write a number field named "age" with value "25"
	 *     	.writeFieldName("address")
	 *     	.startObject()                // Start a new object nested under the parent object
	 *     		.writeStringField("streetAddress", "21 2nd Street")
	 *     		.writeStringField("city", "Santa Clara")
	 *     		.writeStringField("state", "CA")
	 *     		.writeStringField("postalCode", "11111")
	 *     	.endObject()
	 *     	.writeFieldName("phoneNumber")
	 *     	.startArray()                    // Start an array 
	 *     		.startObject()               // Add the first object to the array 
	 *     			.writeFieldName("type")
	 *     			.writeString("home")
	 *     			.writeFieldName("number")
	 *     			.writeString("212 555-1234")
	 *     		.endObject()
	 *     		.startObject()               // Add another object to the array 
	 *     			.writeFieldName("type")
	 *     			.writeString("fax")
	 *     			.writeFieldName("number")
	 *     			.writeString("646 555-4567")
	 *     		.endObject()
	 *     	.endArray()
	 *     	.endObject()
	 *     
	 *       gs.log(builder.getAttachmentId()); // Returns the sys_id of the attachment.
	 *     } 
	 *     
	 *     catch (err) {
	 *       gs.log(err);
	 *     } 
	 *     
	 *     finally {
	 *       builder.close();
	 *     }
	 * 
	 * Alternatively, this example shows how to use the API in the Script step and create the payload as a JSON string. You can use this option to create payloads under 5 MB.
	 * 
	 *     (function execute(inputs, outputs) {
	 *     
	 *       var builder = new sn_ih.JSONStreamingBuilder().build();
	 *       
	 *       builder.startObject()
	 *         .enablePrettyPrint()
	 *         .writeTextElement("firstName","John")
	 *         .writeString("John")
	 *         .writeFieldName("lastName")
	 *         .writeString("Smith")
	 *         .writeNumberField("age","25")
	 *         .writeFieldName("address")
	 *         .startObject()
	 *           .writeStringField("streetAddress", "21 2nd Street")
	 *           .writeStringField("city", "Santa Clara")
	 *           .writeStringField("state", "CA")
	 *           .writeStringField("postalCode", "11111")
	 *         .endObject()
	 *         .writeFieldName("phoneNumber")
	 *         .startArray()
	 *           .startObject()
	 *             .writeFieldName("type")
	 *             .writeString("home")
	 *             .writeFieldName("number")
	 *             .writeString("212 555-1234")
	 *           .endObject()
	 *           .startObject()
	 *             .writeFieldName("type")
	 *             .writeString("fax")
	 *             .writeFieldName("number")
	 *             .writeString("646 555-4567")
	 *           .endObject()
	 *         .endArray()
	 *         .endObject()
	 *     
	 *       outputs.payload = builder.getJSONString();
	 *       
	 *     })(inputs, outputs);
	 * 
	 * Output:
	 * 
	 *     {
	 *     "firstName" : "John",
	 *     "lastName" : "Smith",
	 *     "age" : 25,
	 *     "address" : {
	 *       "streetAddress" : "21 2nd Street",
	 *       "city" : "Santa Clara",
	 *       "state" : "CA",
	 *       "postalCode" : "11111"
	 *     },
	 *     "phoneNumber" : [ {
	 *       "type" : "home",
	 *       "number" : "212 555-1234"
	 *     }, {
	 *       "type" : "fax",
	 *       "number" : "646 555-4567"
	 *     } ]
	 *     }
	 * 
	 */
	class JSONStreamingBuilder {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Returns a JSONStreamingAPI object.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Streaming JSON object used to construct the payload.
		 */
		build(): {[fieldName: string]: string}
		
		/**
		 *
		 * Sets a time when the attachment expires. Must also call the withAttachment() method. If you do not call this method, the attachment expires two hours from the time the attachment is created.
		 *
		 * @param {{[fieldName: string]: string}} expiresAt Object that is set when the attachment expires.
		 * 
		 * *   Minimum value: 7200 seconds, or two hours, from the time the attachment is created. Default.
		 * *   Maximum value: 172800 seconds, or 48 hours, from the time the attachment is created.
		 *
		 * @returns {JSONStreamingBuilder} Builder object used to initiate the JSON payload.
		 */
		expiresAt(expiresAt: {[fieldName: string]: string}): JSONStreamingBuilder
		
		/**
		 *
		 * Creates the JSON object as a streaming attachment and stores it in the Streaming Attachments [streaming_attachment] table. If you do not call this method, the API creates the payload as a JSON string.
		 *
		 *
		 * @returns {JSONStreamingBuilder} Builder object used to initiate the JSON payload.
		 */
		withAttachment(): JSONStreamingBuilder
		
	}
	
	/** 
	 * Use these methods in a Flow Designer Script step with the sn_ih namespace identifier. For example, you can use this API to create an XML payload in the Flow Designer Script step and pass the returned value to the REST step to send the request to a third-party service. For more information, see the Flow Designer [Script step](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/flow-designer/reference/javascript-step-action-designer.html).
	 * 
	 * Note: You can only use this API within the Flow Designer environment.
	 * 
	 * There is no constructor for this class. Instead, you must call the build() method in the XMLStreamingBuilder class to return an XMLStreamingAPI object. For more information, see [XMLStreamingBuilder](dev.do#!/reference/api/rome/server/ "Create a builder object to build a large XML payload for use in a REST or SOAP request to send bulk data to a third-party API. You can also create the payload as an XML string for a non-streaming option.").
	 * 
	 *   
	 *   
	 * 
	 * API call order
	 * --------------
	 * 
	 * Generate XML payloads by first instantiating a builder object with XMLStreamingBuilder and then calling the methods in the XMLStreamingAPI class:
	 * 
	 * 1. XMLStreamingBuilder: Creates a builder object
	 * 
	 * Use these method in the following order to create a builder object:
	 * 
	 * 1.  XMLStreamingBuilder(): Instantiates the XMLStreamingBuilder object.
	 * 2.  withAttachment(): Optional. Creates an XML document as an attachment and stores it in the Streaming Attachments [streaming_attachment] table. If you don't call this method, the API builds the payload as an XML string.
	 * 3.  expiresAt(): Optional. Sets a time when the attachment expires. False is the default. Must also call the withAttachment() method.
	 * 4.  build(): Returns an XMLStreamingAPI object.
	 * 
	 * 2. XMLStreamingAPI: Builds the XML payload
	 * 
	 * Use these methods in the following order to create the XML payload:
	 * 
	 * 1.  startDocument(): Creates the top-level parent element in the XML document.
	 * 2.  Methods to generate child elements in the XML document, such as writeTextElement(), startElement(), and writeArray().
	 * 3.  Methods to generate attributes for an element, such as writeAttribute(), writeNamespace(), and writeDtd().
	 * 4.  endElement(): Closes an XML element.
	 * 5.  endDocument: Closes the top-level parent element.
	 * 6.  getXMLString() or getAttachmentId(): Returns the XML string or attachment ID that you created.
	 * 7.  close(): Closes the XMLStreamingAPI object.
	 * 
	 *   
	 *   
	 * 
	 * Size limits
	 * -----------
	 * 
	 * Payloads generated through this API cannot exceed these size limits:
	 * 
	 * *   Attachments: 200 MB
	 * *   Strings: 5 MB
	 * 
	 *   
	 *   
	 * 
	 * The following example shows how to create an XML document and store it in the Streaming Attachments [streaming_attachment] table with a defined expiration date.
	 * 
	 *     
	 *     try {
	 *       var ttl = new GlideDateTime("2011-01-01 12:00:00");
	 *       var builder = new sn_ih.XMLStreamingBuilder()
	 *         .withAttachment() // Creates the XML document in streaming mode within an attachment.
	 *         .expiresAt(ttl) // Sets an expiration date for the attachment.
	 *         .build(); // Creates the XMLStreamingAPI object.
	 *     
	 *       builder.startDocument() // Begins generating the XML document.
	 *         .writeTextElement("firstName","John") // Writes a "firstName" element and value.
	 *         .writeTextElement("lastName","Smith")
	 *         .writeTextElement("age","25")
	 *         .startElement("address") // Adds an "address" parent element.
	 *           .writeTextElement("streetAddress", "21 2nd Street") // Writes a child element and value.
	 *           .writeTextElement("city", "Santa Clara")
	 *           .writeTextElement("state", "CA")
	 *           .writeTextElement("postalCode", "11111")
	 *         .endElement() // Adds a closing tag for the "address" element.
	 *         .startElement("phoneNumber")
	 *           .writeTextElement("type","home")
	 *           .writeTextElement("number","212 555-1234")
	 *           .writeTextElement("type","fax")
	 *           .writeTextElement("number","646 555-4567")
	 *         .endElement()
	 *       .endDocument() // Stops generating the XML document.
	 *           
	 *       gs.log(builder.getAttachmentId()); // Returns the sys_id of the attachment.
	 *     } catch (err) {
	 *       gs.log(err);
	 *     } finally {
	 *       builder.close();
	 *     }
	 * 
	 * Alternatively, this example shows how to use the API in the Script step and create the payload as an XML string. You can use this option to create payloads under 5 MB.
	 * 
	 *     (function execute(inputs, outputs) {
	 *     
	 *       var builder = new sn_ih.XMLStreamingBuilder().build();
	 *       
	 *       builder.startDocument()
	 *         .enablePrettyPrint()
	 *         .writeTextElement("firstName","John")
	 *         .writeTextElement("lastName","Smith")
	 *         .writeTextElement("age","25")
	 *         .startElement("address")
	 *           .writeTextElement("streetAddress", "21 2nd Street")
	 *           .writeTextElement("city", "Santa Clara")
	 *           .writeTextElement("state", "CA")
	 *           .writeTextElement("postalCode", "11111")
	 *         .endElement()
	 *         .startElement("phoneNumber")
	 *           .writeTextElement("type","home")
	 *           .writeTextElement("number","212 555-1234")
	 *           .writeTextElement("type","fax")
	 *           .writeTextElement("number","646 555-4567")
	 *         .endElement()
	 *       .endDocument()
	 *     
	 *       outputs.payload = builder.getXMLString();
	 *       
	 *     })(inputs, outputs);
	 * 
	 * Output:
	 * 
	 *     <?xml version="1.0" encoding="UTF-8"?>
	 *     <firstName>John</firstName>
	 *     <lastName>Smith</lastName>
	 *     <age>25</age>
	 *     <address>
	 *       <streetAddress>21 2nd Street</streetAddress>
	 *       <city>Santa Clara</city>
	 *       <state>CA</state>
	 *       <postalCode>11111</postalCode>
	 *     </address>
	 *     <phoneNumber>
	 *       <type>home</type>
	 *       <number>212 555-1234</number>
	 *       <type>fax</type>
	 *       <number>646 555-4567</number>
	 *     </phoneNumber>
	 * 
	 */
	class XMLStreamingAPI {
	
		/**
		 *
		 * Closes the XMLStreamingAPI object. You must call this method to close the stream after building your XML document.
		 *
		 * The following example shows how to create an XML document and store it in the Streaming Attachments [streaming_attachment] table with a defined expiration date.
		 *
		 *
		 * @returns {void} Method does not return a value
		 */
		close(): void
		
		/**
		 *
		 * Ends pretty print XML formatting.
		 *
		 * Before calling this method, you must first call enablePrettyPrint() to add XML formatting to a section.
		 *
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		disablePrettyPrint(): XMLStreamingAPI
		
		/**
		 *
		 * Adds pretty print formatting to an XML element or tree of elements.
		 *
		 * Use the disablePrettyPrint() method to end the formatting.
		 *
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		enablePrettyPrint(): XMLStreamingAPI
		
		/**
		 *
		 * Ends the structure of your XML document.
		 *
		 * After calling the startDocument() method and organizing your streaming XML document, call the endDocument() method at the end of your document's structure. You must use these two methods together to successfully build your streaming XML document's structure.
		 *
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		endDocument(): XMLStreamingAPI
		
		/**
		 *
		 * Adds a closing tag to an XML element.
		 *
		 * Use the following methods in this sequence to create a valid XML element:
		 * 		 * 
		 * 		 * 1.  Use the startElement() method to add a starting tag.
		 * 		 * 2.  Use the endElement() method to add the closing tag.
		 *
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		endElement(): XMLStreamingAPI
		
		/**
		 *
		 * Returns the XML document as a string.
		 *
		 * To return the XML document as a string, don't call the getAttachementId() method in the XMLStreamingBuilder class. For more information, see [XMLStreamingBuilder - Scoped](dev.do#!/reference/api/rome/server/ "Create a builder object to build a large XML payload for use in a REST or SOAP request to send bulk data to a third-party API. You can also create the payload as an XML string for a non-streaming option.").
		 *
		 *
		 * @returns {string} XML document created using the XMLStreamingAPI methods, as a string.
		 */
		getXMLString(): string
		
		/**
		 *
		 * Begins building an XML document.
		 *
		 * After calling the build() method, call the startDocument() method to start organizing your XML document. You must also call the endDocument method at the end of your document's structure.
		 *
		 * @param {string} rootElement Optional. Root element, or top-level parent element, for your XML document.
		 * @param {{[fieldName: string]: string}} namespaceDefinitionMap Optional. Map of keys and values for the namespaces and their associated values in a subsequent list of elements. For example:
		 * 
		 *     {
		 *     'namespaceOne':'namespaceValue',
		 *     'namespaceTwo':'namespaceValue'
		 *     }
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		startDocument(rootElement: string, namespaceDefinitionMap: {[fieldName: string]: string}): XMLStreamingAPI
		
		/**
		 *
		 * Adds a starting tag for an XML element.
		 *
		 * Use the following methods in this sequence to create a valid XML element:
		 * 		 * 
		 * 		 * 1.  Use the startElement() method to add a starting tag.
		 * 		 * 2.  Use the endElement() method to add the closing tag.
		 *
		 * @param {string} name Name of the XML element.
		 * @param {{[fieldName: string]: string}} namespaceMap Optional. Map of keys and values for the namespaces and their associated values in a subsequent list of elements. For example:
		 * 
		 *     {
		 *     'namespaceOne':'namespaceValue',
		 *     'namespaceTwo':'namespaceValue'
		 *     }
		 * @param {{[fieldName: string]: string}} attributeMap Optional. Map of keys and values for the attributes and their associated values in a subsequent list of elements.
		 * @param {string} prefix Optional. Prefix for the XML element.
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		startElement(name: string, namespaceMap: {[fieldName: string]: string}, attributeMap: {[fieldName: string]: string}, prefix: string): XMLStreamingAPI
		
		/**
		 *
		 * Adds a list of nested elements with predefined text to your streaming XML document.
		 *
		 * After calling the startDocument() method, you can call the writeArray() method to add a block of nested elements to your streaming XML document.
		 *
		 * @param {string} elementName Name of the XML element associated with each string listed in the data array.
		 * @param {{[fieldName: string]: string}} data List of values to assign to each element nested inside wrappingElement.
		 * @param {string} wrappingElement Parent element containing each elementName.
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeArray(elementName: string, data: {[fieldName: string]: string}, wrappingElement: string): XMLStreamingAPI
		
		/**
		 *
		 * Adds an attribute to an element in your XML document.
		 *
		 * After calling the startDocument(), startElement(), or writeTextElement() method, you can call the writeAttribute() method to add an attribute to the associated XML element.
		 *
		 * @param {string} name Name of the XML element's attribute.
		 * @param {string} value Value for the XML element's attribute.
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeAttribute(name: string, value: string): XMLStreamingAPI
		
		/**
		 *
		 * Adds attributes to an element in your XML document.
		 *
		 * After calling the startDocument(), startElement(), or writeTextElement() method, you can call the writeAttributes() method to add attributes to the associated XML element.
		 *
		 * @param {{[fieldName: string]: string}} attributeMap Map of keys and values containing attribute names and values to associate with the XML element. For example:
		 * 
		 *     {
		 *     'attributeOne':'attributeValue',
		 *     'attributeTwo':'attributeValue'
		 *     }
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeAttributes(attributeMap: {[fieldName: string]: string}): XMLStreamingAPI
		
		/**
		 *
		 * Adds CDATA to your XML document.
		 *
		 * After calling the writeCDataElement() method, you can call the writeCData() method to add CDATA within the element.
		 *
		 * @param {string} data Value to include after the CDATA keyword in your CDATA element.
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeCData(data: string): XMLStreamingAPI
		
		/**
		 *
		 * Adds a CDATA element to your XML document.
		 *
		 * After calling the startDocument() method, you can call the writeCDataElement() method to add a CDATA element to your XML document.
		 *
		 * @param {string} name Name of the CDATA element.
		 * @param {string} data Optional. Type of data to parse the CDATA element as.
		 * @param {{[fieldName: string]: string}} prefix Optional. Map of child elements and values that the CDATA element includes. For example:
		 * 
		 *     {
		 *     'prefixOne':'prefixValue',
		 *     'prefixTwo':'prefixValue'
		 *     }
		 * 
		 * You must associate an XML element's prefix with a namespace using [writeNamespace()](https://docs.servicenow.com/bundle/rome-application-development/page/app-store/dev_portal/API_reference/XMLStreamingAPI/concept/XMLStreamingAPIScopedAPI.html#XSA-writeNamespace).
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeCDataElement(name: string, data: string, prefix: {[fieldName: string]: string}): XMLStreamingAPI
		
		/**
		 *
		 * Adds text to your XML document.
		 *
		 * Use the writeCharacters() method to insert string data to a section in your XML document.
		 *
		 * @param {string} text Text to add to a section of your XML document.
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeCharacters(text: string): XMLStreamingAPI
		
		/**
		 *
		 * Adds a comment to your XML document.
		 *
		 * After calling the startDocument() method, you can call the writeComment() method to add a comment to your XML document.
		 *
		 * @param {string} comment Comment text to include.
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeComment(comment: string): XMLStreamingAPI
		
		/**
		 *
		 * Adds a document type definition to your XML document.
		 *
		 * After calling the startDocument() method, you can call the writeDtd() method to add a valid XML document type definition to your XML document.
		 *
		 * @param {string} dtd Name of a valid XML document type definition.
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeDtd(dtd: string): XMLStreamingAPI
		
		/**
		 *
		 * Adds a namespace to an element in your XML document.
		 *
		 * After calling the startDocument(), startElement(), or writeTextElement() method, you can call the writeNamespace() method to add a namespace to the associated XML element.
		 *
		 * @param {string} prefix Prefix for the XML namespace.
		 * @param {string} namespaceURI Optional. URI for the namespace.
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeNamespace(prefix: string, namespaceURI: string): XMLStreamingAPI
		
		/**
		 *
		 * Adds namespaces to the root element in your XML document.
		 *
		 * After calling the startDocument() or startElement() method, you can call the writeNamespaces() method to declare namespaces for the associated XML element.
		 *
		 * @param {{[fieldName: string]: string}} namespaceMap Map of keys and values containing namespace prefixes and URIs to associate with the root element of the XML document. For example:
		 * 
		 *     {
		 *     'namespaceOne':'namespaceValue',
		 *     'namespaceTwo':'namespaceValue'
		 *     }
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeNamespaces(namespaceMap: {[fieldName: string]: string}): XMLStreamingAPI
		
		/**
		 *
		 * Adds a single XML element to your XML document.
		 *
		 * After calling the startDocument() method, you can call the writeTextElement() method to add a single XML element to your XML document's structure.
		 *
		 * @param {string} name Name of the XML element.
		 * @param {string} text Value for the XML element.
		 * @param {{[fieldName: string]: string}} prefix Optional. Map of prefixes and values associated with the XML element. For example:
		 * 
		 *     {
		 *     'prefixOne':'prefixValue',
		 *     'prefixTwo':'prefixValue'
		 *     }
		 * 
		 * You must associate an XML element's prefix with a namespace using [writeNamespace()](https://docs.servicenow.com/bundle/rome-application-development/page/app-store/dev_portal/API_reference/XMLStreamingAPI/concept/XMLStreamingAPIScopedAPI.html#XSA-writeNamespace).
		 *
		 * @returns {XMLStreamingAPI} Streaming XML object for constructing the payload.
		 */
		writeTextElement(name: string, text: string, prefix: {[fieldName: string]: string}): XMLStreamingAPI
		
	}
	
	/** 
	 * Use these methods in a Flow Designer Script step with the sn_ih namespace identifier. For example, you can use this API to create an XML payload in the Flow Designer Script step and pass the returned value to the REST step to send the request to a third-party service. For more information, see the Flow Designer [Script step](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/flow-designer/reference/javascript-step-action-designer.html).
	 * 
	 * Note: You can only use this API within the Flow Designer environment.
	 * 
	 *   
	 *   
	 * 
	 * API call order
	 * --------------
	 * 
	 * Generate XML payloads by first instantiating a builder object with XMLStreamingBuilder and then calling the methods in the XMLStreamingAPI class:
	 * 
	 * 1. XMLStreamingBuilder: Creates a builder object
	 * 
	 * Use these method in the following order to create a builder object:
	 * 
	 * 1.  XMLStreamingBuilder(): Instantiates the XMLStreamingBuilder object.
	 * 2.  withAttachment(): Optional. Creates an XML document as an attachment and stores it in the Streaming Attachments [streaming_attachment] table. If you don't call this method, the API builds the payload as an XML string.
	 * 3.  expiresAt(): Optional. Sets a time when the attachment expires. False is the default. Must also call the withAttachment() method.
	 * 4.  build(): Returns an XMLStreamingAPI object.
	 * 
	 * 2. XMLStreamingAPI: Builds the XML payload
	 * 
	 * Use these methods in the following order to create the XML payload:
	 * 
	 * 1.  startDocument(): Creates the top-level parent element in the XML document.
	 * 2.  Methods to generate child elements in the XML document, such as writeTextElement(), startElement(), and writeArray().
	 * 3.  Methods to generate attributes for an element, such as writeAttribute(), writeNamespace(), and writeDtd().
	 * 4.  endElement(): Closes an XML element.
	 * 5.  endDocument: Closes the top-level parent element.
	 * 6.  getXMLString() or getAttachmentId(): Returns the XML string or attachment ID that you created.
	 * 7.  close(): Closes the XMLStreamingAPI object.
	 * 
	 *   
	 *   
	 * 
	 * Size limits
	 * -----------
	 * 
	 * Payloads generated through this API cannot exceed these size limits:
	 * 
	 * *   Attachments: 200 MB
	 * *   Strings: 5 MB
	 * 
	 *   
	 *   
	 * 
	 * The following example shows how to create an XML document and store it in the Streaming Attachments [streaming_attachment] table with a defined expiration date.
	 * 
	 *     
	 *     try {
	 *       var ttl = new GlideDateTime("2011-01-01 12:00:00");
	 *       var builder = new sn_ih.XMLStreamingBuilder()
	 *         .withAttachment() // Creates the XML document in streaming mode within an attachment.
	 *         .expiresAt(ttl) // Sets an expiration date for the attachment.
	 *         .build(); // Creates the XMLStreamingAPI object.
	 *     
	 *       builder.startDocument() // Begins generating the XML document.
	 *         .writeTextElement("firstName","John") // Writes a "firstName" element and value.
	 *         .writeTextElement("lastName","Smith")
	 *         .writeTextElement("age","25")
	 *         .startElement("address") // Adds an "address" parent element.
	 *           .writeTextElement("streetAddress", "21 2nd Street") // Writes a child element and value.
	 *           .writeTextElement("city", "Santa Clara")
	 *           .writeTextElement("state", "CA")
	 *           .writeTextElement("postalCode", "11111")
	 *         .endElement() // Adds a closing tag for the "address" element.
	 *         .startElement("phoneNumber")
	 *           .writeTextElement("type","home")
	 *           .writeTextElement("number","212 555-1234")
	 *           .writeTextElement("type","fax")
	 *           .writeTextElement("number","646 555-4567")
	 *         .endElement()
	 *       .endDocument() // Stops generating the XML document.
	 *           
	 *       gs.log(builder.getAttachmentId()); // Returns the sys_id of the attachment.
	 *     } catch (err) {
	 *       gs.log(err);
	 *     } finally {
	 *       builder.close();
	 *     }
	 * 
	 * Alternatively, this example shows how to use the API in the Script step and create the payload as an XML string. You can use this option to create payloads under 5 MB.
	 * 
	 *     (function execute(inputs, outputs) {
	 *     
	 *       var builder = new sn_ih.XMLStreamingBuilder().build();
	 *       
	 *       builder.startDocument()
	 *         .enablePrettyPrint()
	 *         .writeTextElement("firstName","John")
	 *         .writeTextElement("lastName","Smith")
	 *         .writeTextElement("age","25")
	 *         .startElement("address")
	 *           .writeTextElement("streetAddress", "21 2nd Street")
	 *           .writeTextElement("city", "Santa Clara")
	 *           .writeTextElement("state", "CA")
	 *           .writeTextElement("postalCode", "11111")
	 *         .endElement()
	 *         .startElement("phoneNumber")
	 *           .writeTextElement("type","home")
	 *           .writeTextElement("number","212 555-1234")
	 *           .writeTextElement("type","fax")
	 *           .writeTextElement("number","646 555-4567")
	 *         .endElement()
	 *       .endDocument()
	 *     
	 *       outputs.payload = builder.getXMLString();
	 *       
	 *     })(inputs, outputs);
	 * 
	 * Output:
	 * 
	 *     <?xml version="1.0" encoding="UTF-8"?>
	 *     <firstName>John</firstName>
	 *     <lastName>Smith</lastName>
	 *     <age>25</age>
	 *     <address>
	 *       <streetAddress>21 2nd Street</streetAddress>
	 *       <city>Santa Clara</city>
	 *       <state>CA</state>
	 *       <postalCode>11111</postalCode>
	 *     </address>
	 *     <phoneNumber>
	 *       <type>home</type>
	 *       <number>212 555-1234</number>
	 *       <type>fax</type>
	 *       <number>646 555-4567</number>
	 *     </phoneNumber>
	 * 
	 */
	class XMLStreamingBuilder {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Returns an XMLStreamingAPI object.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Streaming XML object for constructing the payload.
		 */
		build(): {[fieldName: string]: string}
		
		/**
		 *
		 * Sets a time when the attachment expires. Must also call the withAttachment() method.
		 *
		 * @param {{[fieldName: string]: string}} expiresAt Object that is set when the attachment expires.
		 * 
		 * *   Minimum value: 7200 seconds, or two hours, from the time the attachment is created. This is the default value if you don't call the expiresAt() method.
		 * *   Maximum value: 172800 seconds, or 48 hours, from the time the attachment is created.
		 *
		 * @returns {XMLStreamingBuilder} Builder object used to initiate the XML payload.
		 */
		expiresAt(expiresAt: {[fieldName: string]: string}): XMLStreamingBuilder
		
		/**
		 *
		 * Creates an XML document as an attachment and stores it in the Streaming Attachments [streaming_attachment] table. If you don't call this method, the API creates the XML document as a string.
		 *
		 *
		 * @returns {XMLStreamingBuilder} Builder object used to initiate the XML payload.
		 */
		withAttachment(): XMLStreamingBuilder
		
	}
	
}