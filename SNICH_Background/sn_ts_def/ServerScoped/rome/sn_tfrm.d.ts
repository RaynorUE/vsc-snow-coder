declare namespace sn_tfrm {

	/** 
	 * The scripted Transformer API works along with the TransformerDefinition and TransformerRuleList APIs. Together, these APIs transform XML nodes or any entity in a structured JSON document into an output of name-value pairs. Supported JSON entities including objects and elements within an array, such as strings, numbers, and other arrays.  
	 *   
	 * 
	 * *   The TransformerRuleList API enables you to create transformation rule lists that define what data in the source document to include in the output and how to transform the source data.
	 *     
	 * *   The TransformerDefinition API associates a transformation rule list with a JSON/XML record path to define reusable transform definition objects. You can use a transform definition object to transform one or more source documents.
	 *     
	 * *   The Transformer API performs the actual data transformation, one data entity at a time, using the specified transformation rule list to create the desired output data.
	 *     
	 * 
	 *   
	 *   
	 * You can use the Transformer class in both scoped and global server scripts. When using this class, use the sn_tfrm namespace identifier. Before this API is available in an instance, you must activate the Transformation Service plugin (com.glide.transform).  
	 *   
	 * The following example illustrates how to use the TransformerRuleList API to define the transformation rules, the TransformerDefinition API to define the transformation criteria, and the Transformer API to actually perform the transformation.  
	 *   
	 * This code example retrieves an external JSON-based stock details document, creates rules for transforming that data into a tabular table, and then transforms the source document, one row at a time. The following is a snippet of the JSON source document being transformed:  
	 *   
	 * 
	 *     {
	 *       "NOW": {
	 *         "quote": {
	 *           "symbol": "NOW",
	 *           "companyName": "ServiceNow Inc.",
	 *           "primaryExchange": "New York Stock Exchange",
	 *           "sector": "Technology",
	 *           "open": 166.78,
	 *           "openTime": 1522935000556,
	 *           "close": 165.77,
	 *           "changePercent": 0.00656,
	 *            ...
	 *          },
	 *      ...}
	 * 
	 *   
	 *   
	 * 
	 *     var stockAPI = new sn_ws.RESTMessageV2('Stock Details', 'Default GET'); 
	 *     var response = stockAPI.execute(); 
	 *     var responseBody = response.getBody(); // obtain the source JSON document
	 *     
	 *     /* Define the list of rules to use to transform the acquired JSON stock detail 
	 *     information into a tabular table */
	 *     
	 *     var transformerRuleList = new sn_tfrm.TransformerRuleList() // instantiate the rule list object
	 *       .fromJSON() // indicate that the source document is JSON
	 *       .addRule('ticker', '$.quote.symbol') // add a rule to copy the value in the "symbol" field of the source document to the ticker field in the output document (no changes)
	 *       .addRule('change_percentage', '$.quote.changePercent') // copy the "changePercent" field from source into the change_percentage field of output document
	 *       .thenMultiply('100') // multiply the change_percentage value by 100
	 *       .thenRoundDown('0') // addthen round it down to a whole number 
	 *       .addRule('close_price', '$.quote.close') // copy the "close" field to the close_price field in the 21=-[';output
	 *       .thenAdaptCurrency('USD', false) // attach the US dollar code to the close_price field, but do not display the symbol
	 *       .addRule('summary') // add a blank "summary" field to the output (no corresponding source field)
	 *       .thenConcat('Shares of ') // in the summary field concatenate the string "Shares of "
	 *       .thenConcatSymbol('ticker') // then concatenate the "ticker" field from the source document
	 *       .thenConcat(' closed at ') // then concatenate the string " closed at "
	 *       .thenConcatSymbol('close_price'); // then concatenate the "close_price" field from the source document
	 *     
	 *     // Create a transformer definition that associates the rule list to use and the record path of the set of records in the source document to transform.  
	 *     var path = '$.*'; 
	 *     var transformerDefinition = new sn_tfrm.TransformerDefinition(transformerRuleList, path);
	 *      
	 *     // Instantiate the transformer object.
	 *     var transformer = new sn_tfrm.Transformer(transformerDefinition, responseBody); 
	 *     
	 *     // Transform the source data, one row at a time, until all rows are processed.
	 *     var results = []; 
	 *     while (transformer.transform()) { 
	 *       results.push(transformer.getRow());
	 *     } 
	 * 
	 * Output:
	 * 
	 *      {ticker: "Now", change_percentage: "0", close_price: "165.77 USD", summary: "Shares of Now closed at 165.77" }
	 * 
	 */
	class Transformer {
	
		/**
		 *
		 * @param {{[fieldName: string]: string}} transformerDefinition Object that describes the content transformation; includes rule list and JSONPath/XPath record path.
		 * 
		 * Use the TransformerRuleList() and TransformerDefinition() APIs to generate this object.
		 * @param {string} document Source document to translate.
		 *
		 */
		constructor(transformerDefinition: {[fieldName: string]: string}, document: string)
		
		/**
		 *
		 * Returns the row resulting from the last transformation (or null if no row exists).
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Object containing one transformed row/node of data.
		 */
		getRow(): {[fieldName: string]: string}
		
		/**
		 *
		 * Transforms the next available row/node in the source document.
		 *
		 *
		 * @returns {boolean} Flag that indicates whether there is a valid next row to transform.
		 * 
		 * *   true: Valid next row
		 * *   false: No additional rows
		 */
		transform(): boolean
		
	}
	
	/** 
	 * The TransformerDefinition API works along with the Transformer and TransformerRuleList APIs. Together, these APIs transform XML nodes or any entity in a structured JSON document into an output of name-value pairs. Supported JSON entities including objects and elements within an array, such as strings, numbers, and other arrays.  
	 *   
	 * 
	 * *   The TransformerRuleList API enables you to create transformation rule lists that define what data in the source document to include in the output and how to transform the source data.
	 *     
	 * *   The TransformerDefinition API associates a transformation rule list with a JSON/XML record path to define reusable transform definition objects. You can use a transform definition object to transform one or more source documents.
	 *     
	 * 
	 *   
	 *   
	 * In addition, this object provides methods that enable you to obtain the record path of the TransformerDefinition object. It can also validate whether the definition has a valid TransformerRuleList associated with it.  
	 *   
	 * The Transformer API performs the actual data transformation, one data entity at a time, using the specified transformation rule list to create the desired output data.  
	 *   
	 * You can use the TransformerDefinition class in both scoped and global server scripts. When using this class, use the sn_tfrm namespace identifier. Also, before this API is available in an instance, you must activate the Transformation Service plugin (com.glide.transform).
	 * 
	 */
	class TransformerDefinition {
	
		/**
		 *
		 * @param {{[fieldName: string]: string}} transformerRuleList TransformerRuleList to associate with this transformer definition.
		 * @param {string} recordPath Optional. The path (JSONPath for JSON, XPath for XML) that identifies the container (parent) of nodes to parse as records in the source document.
		 * 
		 * For JSON documents, these nodes can be any object, array, or JSON primitive (string, number, boolean). For XML documents, these nodes are the child elements of the container.
		 * 
		 * If recordPath is unspecified, the entire document is inferred as a single record. For JSON documents, if the top node is an array and recordPath is unspecified, then the top array is the record's container, and each of its entries is a record.
		 *
		 */
		constructor(transformerRuleList: {[fieldName: string]: string}, recordPath: string)
		
		/**
		 *
		 * If set when the TransformerDefinition object was instantiated, returns the record path for the source data file associated with the TransformerDefinition object.
		 *
		 * A record path (JSONPath for JSON, XPath for XML) identifies the container (parent) of nodes to parse as records in the source document.
		 * 		 * 
		 * 		 * For JSON documents, these nodes can be any object, array, or JSON primitive (string, number, boolean). For XML documents, these nodes are the child elements of the container.
		 * 		 * 
		 * 		 * If recordPath is unspecified, the entire document is inferred as a single record. For JSON documents, if the top node is an array and recordPath is unspecified, then the top array is the record's container, and each of its entries is a record.
		 *
		 *
		 * @returns {string} If set, the record path associated with the transformer definition. If not set, returns null.
		 */
		recordPath(): string
		
		/**
		 *
		 * Validates whether a valid TransformerRuleList is associated with the TransformerDefintion object.
		 *
		 *
		 * @returns {boolean} Flag that indicates whether a valid TransformerRuleList is associated with the specified TransformerDefintion object.
		 * 
		 * Valid values:
		 * 
		 * *   true: Valid TransformerRuleList associated
		 * *   false: Invalid or no TransformerRulList associated
		 */
		validate(): boolean
		
	}
	
	/** 
	 * The TransformerRuleList API works along with the Transformer and TransformerDefinition APIs. Together, these APIs transform XML nodes or any entity in a structured JSON document into an output of name-value pairs. Supported JSON entities including objects and elements within an array, such as strings, numbers, and other arrays.  
	 *   
	 * 
	 * *   The TransformerRuleList API enables you to create transformation rule lists that define what data in the source document to include in the output and how to transform the source data.
	 *     
	 * *   The TransformerDefinition API associates a transformation rule list with a JSON/XML record path to define reusable transform definition objects. You can use a transform definition object to transform one or more source documents.
	 *     
	 * *   The Transformer API performs the actual data transformation, one data entity at a time, using the specified transformation rule list to create the desired output data.
	 *     
	 * 
	 *   
	 *   
	 * When you instantiate the TransformRuleList object, you must define whether it describes a JSON or XML source document using the .fromJSON() or .fromXML() methods. For example:  
	 *   
	 * `var trl = sn_tfrm.TransformerRuleList().fromJSON();` or `var trl = sn_tfrm.TransformerRuleList().fromXML();`  
	 *   
	 * Then use the addRule() method to define a transformation rule for each element in the source document that you want to include as a name-value pair in the output.  
	 *   
	 * Use "adapter methods", such as setName() or thenAdd(), to define how to manipulate data elements when the transformation is performed. Adapter methods work along with the addRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns. You can apply one or more adapter methods to each data transformation. Adapter methods enable you to do things such as:
	 * 
	 * *   Concatenate text.
	 * *   Perform mathematical functions, such as add, subtract, divide, and multiply.
	 * *   Round values up or down (round up/down, ceiling/floor).
	 * *   Define whether to use the minimum or maximum value when comparing a source data element to a specified value.
	 * *   Apply a currency code.
	 * *   Convert between different units of measure.
	 * *   Format data elements.
	 * *   Apply patterns.
	 * *   Replace specified data elements with a specified value.
	 * *   Split and rearrange strings.
	 * 
	 *   
	 *   
	 * You can use the TransformerRuleList class in both scoped and global server scripts. When using this class, use the sn_tfrm namespace identifier. Also, before this API is available in an instance, you must activate the Transformation Service plugin (com.glide.transform).
	 * 
	 */
	class TransformerRuleList {
	
		/**
		 *
		 * Creates an entry in the associated transformation rules list which defines a field to create in the output.
		 *
		 * You can create rules for any element in a source document. For example, `.addRule('ticker', '$.quote.symbol')` creates the field "ticker" in the output and copies over the value in quote.symbol of the source.
		 * 		 * 
		 * 		 * Once you define a rule using addRule(), you then use adaptor methods, such as thenAdd(), thenReplace(), and thenFloor() to manipulate the rule's output data. You can define as many adaptor methods as needed for a single rule. All adapter methods directly after an addRule() call, until the next addRule() call, apply to that rule. Adapter methods are cumulative with the result of all adapter methods being the final value saved in the output field.
		 * 		 * 
		 * 		 * For example, in the following code snippet, thenMultiply() and thenRoundDown() apply to addRule('change_percentage', '$.quote.changePercent'); addRule('close_price', '$.quote.close') starts a new rule. If the value in $.quote.changePercent is .011, then the final output value is "1" ( .011 * 100 rounded down to the ones position).
		 * 		 * 
		 * 		 *     
		 * 		 *       .addRule('change_percentage', '$.quote.changePercent') 
		 * 		 *       .thenMultiply('100') 
		 * 		 *       .thenRoundDown('0') 
		 * 		 *       .addRule('close_price', '$.quote.close') 
		 * 		 * 
		 * 		 * The addRule() method also supports the parameter summary; `.addRule('summary')`. This implementation creates the name field "summary:" in the output, but does not correlate it to any field in the source. You can then use the adaptor methods thenConcat() and thenConcatSymbol() to modify the contents of the summary field.
		 *
		 * @param {string} rule Name of the element in the destination output.
		 * @param {string} path Optional. JSONPath or XPath to the data element in the source document.
		 * 
		 * The adapter methods thenConcat() and thenConcatSymbol() do not require you to define this parameter if no other adapter methods are defined for the rule. All other adapter methods require this parameter.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		addRule(rule: string, path: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Defines a name for the associated TransformerRuleList object for logging purposes.
		 *
		 * @param {string} name Name to use to identify the associated TransformerRuleList object.
		 * 
		 * Although the API does not force this name to be unique, it is helpful if they are unique within an instance.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		setName(name: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that ties the specified currency code to the output field defined in the associated addRule() call.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {string} currencyCode Currency code to tie to the destination data element, such as USD, EUR, and GBP.
		 * @param {boolean} outputNumericCurrencyValue Optional. Flag that indicates whether to display the currency code.
		 * 
		 * Valid values:
		 * 
		 * *   true: do not display the country code; numeric value only
		 * *   false: display the country code
		 * 
		 * Default: false
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenAdaptCurrency(currencyCode: string, outputNumericCurrencyValue: boolean): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that converts the source field from one unit of measure to another, such as from minutes to seconds or weeks to days.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {string} inputDuration Current unit of measure of the source field.
		 * 
		 * Valid values:
		 * 
		 * *   NANOSECOND
		 * *   MICROSECOND
		 * *   MILLISECOND
		 * *   SECOND
		 * *   MINUTE
		 * *   HOUR
		 * *   DAY
		 * *   WEEK
		 * @param {string} outputDuration Unit of measure to convert the source field to in the output.
		 * 
		 * Valid values:
		 * 
		 * *   NANOSECOND
		 * *   MICROSECOND
		 * *   MILLISECOND
		 * *   SECOND
		 * *   MINUTE
		 * *   HOUR
		 * *   DAY
		 * *   WEEK
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenAdaptDuration(inputDuration: string, outputDuration: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that adds the passed in value to the source field.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Value to add to the source field.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenAdd(operand: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that searches the associated source field for a list of strings and replaces them in the output with the specified replacement values.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {{[fieldName: string]: string}} map Name/value pairs.
		 * 
		 * *   name: text to locate in the source data element
		 * *   value: text to replace it with in the output
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenApplyMap(map: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that matches a specified regex pattern to content in the source field and then replaces/reformats that content with a second regex pattern and stores that value in the output.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {string} matchPattern Regex pattern to use to locate the text to replace/reformat.
		 * @param {string} outputPattern Regex pattern to use to update the located text.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenApplyPattern(matchPattern: string, outputPattern: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an action to the current rule to round the source field up at the decimal position specified by the passed in value.
		 *
		 * Unlike straight rounding where the number is rounded based on the value of the digit in the specified decimal position (0-4 round down, 5-9 round up), ceiling always rounds up. For example, the ceiling value for 2.156 and 2.152 is always 2.16 for the passed in decimal position of 2; whereas for straight rounding the values would be 2.16 and 2.15 respectively. For negative numbers, the ceiling operation makes the number more positive, as in the ceiling value of -2.156 is -2.15; whereas the same number rounded up makes the value more negative, -2.16.
		 * 		 * 
		 * 		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Decimal position to the right of the decimal point at which to round the number up (apply ceiling).
		 * 
		 * For example, if this value is 2 and the source data element is 6.421, the resulting value is 6.43.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenCeiling(operand: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that concatenates the passed in string to the output field.
		 *
		 * Unlike other adapter methods, this method does not have to be applied to a source field. You can use this method to create completely new data strings in the output.
		 * 		 * 
		 * 		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {string} value Text to concatenate to the end of the current data element.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenConcat(value: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that concatenates the value of a field previously defined in the rules list to the current output field.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {string} symbol Name of the rules list element to append to the output field.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenConcatSymbol(symbol: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that divides the source field by the passed in value.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Value by which to divide the source field.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenDivideBy(operand: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that divides the passed in value by the source field.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Value into which to divide the source field.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenDivideInto(operand: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that rounds the source field down at the decimal position specified by the passed in value and stores it in the output.
		 *
		 * Unlike straight rounding where the number is rounded based on the value of the digit in the specified decimal position (0-4 round down, 5-9 round up), floor always rounds down. For example, the floor value for 2.156 and 2.152 is always 2.15 for the passed in decimal position of 2; whereas for straight rounding the values would be 2.16 and 2.15 respectively. For negative numbers, the floor operation makes the number more negative, as in the floor value of -2.156 is -2.16; whereas the same number rounded down makes the value more positive, -2.15.
		 * 		 * 
		 * 		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Decimal position to the right of the decimal point at which to round the number down (apply floor).
		 * 
		 * For example, if this value is 2 and the source data element is 6.427, the resulting value is 6.42.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenFloor(operand: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that reformats the content in the source field that matches the specified match pattern, with the specified output pattern.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {string} matchPattern Pattern to match against the source field.
		 * 
		 * Valid values:
		 * 
		 * *   @: any character
		 * *   #: decimal digit
		 * *   : literal escape (@ for the @ symbol)
		 * @param {string} outputPattern Pattern to replace the content with in the output.
		 * 
		 * Valid values:
		 * 
		 * *   @: any character
		 * *   #: decimal digit
		 * *   : literal escape (@ for the @ symbol)
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenFormat(matchPattern: string, outputPattern: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that compares the passed in value against the source field and copies the greater of the two values to the output field.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Value to compare to the source field.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenMax(operand: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that compares the passed in value against the source field and copies the lower of the two values to the output field.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Value to compare to the source field.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenMin(operand: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that multiplies the source field by the passed in value.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Value by which to multiply the source field.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenMultiply(operand: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that finds all text within the source field that matches a specified string and replaces it with an updated string.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {string} matchString String to match against the source field to identify the text to replace.
		 * @param {string} replaceString String with which to replace the matching text.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenReplace(matchString: string, replaceString: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that rounds the source data element up at the decimal position specified by the passed in value.
		 *
		 * For negative numbers, the thenRoundUp() method makes the number more negative; the round up value of -2.156 is -2.16. The thenCeiling() method makes the same number more positive, -2.15.
		 * 		 * 
		 * 		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Decimal position to the right of the decimal point at which to round the number up.
		 * 
		 * For example, if this value is 2 and the source data element is 6.422, the resulting value is 6.43.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		Up(operand: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that rounds the source field down at the decimal position specified by the passed in value.
		 *
		 * For negative numbers, the thenRoundDown() method makes the number more positive; the round down value of -2.156 is -2.15. The thenFloor() method makes the same number more negative, -2.16.
		 * 		 * 
		 * 		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Decimal position to the right of the decimal point at which to round the number down.
		 * 
		 * For example, if this value is 2 and the source data element is 6.427, the resulting value is 6.42.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenRoundDown(operand: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that splits, reorganizes, and replaces strings within the source field and saves them in the output field.
		 *
		 * The splitPattern parameter denotes how to divide the source text string into segments. This parameter can be a typical word separator such as a space (' '), comma (','), or semicolon (';'), and can also be any string, such as 'name'. For example, if the source text is "Smith John Michael" and the splitPattern is a space, then the available segments are "Smith", "John", and "Michael". To reference a segment, use $#, where # is the number of the order of the segment in the source text string. For example, if the method call is `thenSplit(' ', '$2 $3 $1')`, then the output is "John Michael Smith". In addition, you can add constants within the output pattern, such as `thenSplit(' ', 'First name: $2 Middle name: $3 Last name: $1')`.
		 * 		 * 
		 * 		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {string} splitPattern String that denotes how to split the text into segments.
		 * @param {string} replaceString String that defines the output string, including segment references and constants. Not all segments need to be referenced.
		 * 
		 * Reference the segments defined by the splitPattern using $#, where # is the number of the order of the segment in the source data element. Reference the entire source data element using $0.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenSplit(splitPattern: string, replaceString: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds an adapter to the current rule that subtracts the passed in value from the source field and stores it in the output field.
		 *
		 * Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptations to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
		 *
		 * @param {number} operand Value to subtract from the source data element.
		 *
		 * @returns {{[fieldName: string]: string}} Current TransformerRuleList object.
		 */
		thenSubtract(operand: number): {[fieldName: string]: string}
		
	}
	
}