declare namespace sn_templated_snip {

	/** 
	 * Response templates are reusable messages that agents can copy to case or task forms. They provide quick and consistent messages to users and display standard chat response messages to requesters in Agent Chat. This API requires the Templated Responses plugin (com.sn_templated_snip), which is activated by default. This API is provided within the sn_templated_snip namespace.  
	 *   
	 * For additional information on response templates, see [Response templates](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/human-resources/concept/response-templates-templated-snippets.html).
	 * 
	 */
	class ResponseTemplate {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Returns all response templates from a specified table that match the passed in query criteria.
		 *
		 * @param {string} tableName Name of the table to use to search the sn_templated_snip_note_template table to locate corresponding response templates. For example, incident or sn_hr_core_case.
		 * @param {string} recordId Sys ID of the record to use to render the variables in the response template.
		 * @param {string} searchTerm Optional. Text to use to filter the list of matching response templates.
		 * 
		 * The method performs a CONTAINS search of this text on the name and body fields and a STARTS WITH search on the short name field. For example, if the search term is "crash", the method returns any response template that matches the query criteria and has crash in the name or body or the short name starts with crash.
		 * 
		 * Response templates with exact matches on short name appear first in the return results. All other returned response templates are sorted by name.
		 * 
		 * Default: Return all matching response templates.
		 * @param {number} limit Optional. Maximum number of response templates to return.
		 * 
		 * Default: 50
		 * @param {number} offset Optional. For pagination, the index at which to start the search.
		 * 
		 * Default: 0
		 * @param {boolean} includeEvaluatedBody Optional. Flag that indicates whether to render the template variables.
		 * 
		 * Valid values:
		 * 
		 * *   false: Do not render the template variables. The response contains the message variables.
		 *     
		 *     For example:
		 *     
		 *     Please note that your case ${number} has been escalated to ${assignment_group}.
		 *     
		 * *   true: Renders the template variables and returns evaluated_response in the return results.
		 *     
		 *     For example:
		 *     
		 *     Please note that your case INC100001 has been escalated to Facilities.
		 *     
		 * 
		 * Default: false
		 * @param {string} errorFormat Optional. HTML formatting to use for errors.
		 * 
		 * For example:
		 * 
		 * `"<span style='color:#ffff00'>${%s}</span>"`
		 * 
		 * Default: `"<span style='color:#ff0000'>${%s}</span>"`
		 * @param {{[fieldName: string]: string}} opts Optional. Parameters to pass to the sn_templated_snip.response_template extension point. The format and content of these parameters are dependent on the implementation of the extension point. For additional information on extension points, see [Using extension points to extend application functionality](https://docs.servicenow.com/bundle/rome-application-development/page/build/applications/concept/extension-points.html).
		 *
		 * @returns {{[fieldName: string]: string}} Array of all templates that match the specified search criteria. Response templates with exact matches on short name appear first in the return results. All other returned response templates are sorted by name.
		 * 
		 * Each node in the Array may contain the following parameters:
		 * 
		 * *   sys_id: String. Unique identifier of the response template.
		 * *   name: String. Name of the response template.
		 * *   short_name: String. Short name of the response template.
		 * *   body: HTML. Body of the response template.
		 * *   short_name_match: Boolean. Flag that indicates whether an exact match occurred on the short name of the response template.
		 * *   evaluated_response: Array. Results of the template evaluation.
		 *     *   success: Boolean. Flag that indicates whether all variables rendered properly.
		 *     *   evaluated_body: HTML. Rendered response template body.
		 *     *   error: Array. Entry for each evaluation error that occurred.
		 *         *   inAccessibleVariables: String. Variables in the response template body that could not be resolved.
		 *         *   unEvaluatedVariables: String. Variablesin the response template body that were not evaluated.
		 *         *   message: String. Error message.
		 */
		query(tableName: string, recordId: string, searchTerm: string, limit: number, offset: number, includeEvaluatedBody: boolean, errorFormat: string, opts: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Renders the HTML body of a specified response template.
		 *
		 * During rendering, all variables are resolved using the information from the specified table and record. If variables cannot be resolved, or any other problem occurs during rendering, the method returns an error message in the results.
		 *
		 * @param {string} templateId Sys ID of the response template to render.
		 * @param {string} tableName Name of the table to use when rendering the variables on the response template.
		 * @param {string} recordId Sys ID of the record to use when rendering the variables on the response template. This record must be in the table specified by tableName.
		 * @param {string} errorFormat Optional. HTML formatting to use for errors.
		 * 
		 * For example:
		 * 
		 * `"<span style='color:#ffff00'>${%s}</span>"`
		 * 
		 * Default: `"<span style='color:#ff0000'>${%s}</span>"`
		 * @param {{[fieldName: string]: string}} opts Optional. Parameters to pass to the sn_templated_snip.response_template extension point. The format and content of these parameters are dependent on the implementation of the extension point. For additional information on extension points, see [Using extension points to extend application functionality](https://docs.servicenow.com/bundle/rome-application-development/page/build/applications/concept/extension-points.html).
		 *
		 * @returns {{[fieldName: string]: string}} Results of the render.
		 * 
		 * *   success: Flag that indicates whether the render was successful.
		 * *   evaluated_body: String. For success, rendered response template body. For error, response template body which includes both rendered and non-renderable variables.
		 * *   error: Object. Error message if render was unsuccessful.
		 *     *   unEvaluatedVariables: Variables that could not be rendered.
		 *     *   message: Error message.
		 */
		render(templateId: string, tableName: string, recordId: string, errorFormat: string, opts: {[fieldName: string]: string}): {[fieldName: string]: string}
		
	}
	
}