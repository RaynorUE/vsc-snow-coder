declare namespace sn_ais {

	/** 
	 * You can populate the answer object with query details retrieved from the context of the Genius Result configuration using the [GeniusResultContext](dev.do#!/reference/api/rome/server/ "The GeniusResultContext API provides methods for retrieving search query information from the context of a Genius Result configuration.") API.  
	 *   
	 * The GeniusResultAnswer API methods you must invoke to create the answer object vary by Genius Result answer type:
	 * 
	 * *   For the Search answer type, you must invoke the setTable() method and either the setSearchPhrase() method or the addSearchPhrases() method. All other methods are optional except for addDataMap(), which is not relevant for this use case.
	 * *   For the Script answer type, you must invoke the addDataMap() method. No other methods are relevant for this use case.
	 * 
	 * Use this API in Genius Result server-side scripts with the `sn_ais` namespace identifier. For more information on scripting logic for Genius Results, see [Create a new Genius Result configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/ai-search/task/create-genius-results-config-ais.html).
	 * 
	 */
	class GeniusResultAnswer {
	
		/**
		 *
		 * Adds a set of arbitrary key-value pair fields to a Genius Result Script answer. You can utilize any public Now Platform API to generate these fields.
		 *
		 * Note: When constructing logic for a Genius Result with the Script answer type, you must invoke this method. If you do not invoke this method, the Genius Result answer script fails.
		 * 		 * 
		 * 		 * You can add multiple field maps to a single Genius Result answer by invoking this method more than once. Each field map populates a separate Genius Result answer card.
		 *
		 * @param {{[fieldName: string]: string}} map Defines an arbitrary set of key-value pair fields for addition to the Genius Result Script answer. All field values must be Strings.
		 * 
		 *     {
		 *       "fieldName1": String,
		 *       "fieldName2": String
		 *     }
		 *
		 * @returns {boolean} Flag that indicates whether invocation of the method succeeded.
		 * 
		 * Valid values:
		 * 
		 * *   true: Invocation of the method succeeded.
		 * *   false: Invocation of the method failed.
		 */
		addDataMap(map: {[fieldName: string]: string}): boolean
		
		/**
		 *
		 * Adds terms to the search query defined for a Genius Result Search answer.
		 *
		 * Note: When constructing logic for a Genius Result with the Search answer type, you must invoke the setTable() method and either this method or the setSearchPhrase() method. If you do not invoke both of the required methods, the Genius Result answer search query fails.
		 *
		 * @param {{[fieldName: string]: string}} searchPhrases Array of arbitrary Strings to add as terms for the search query made by the Genius Result Search answer. Search treats these terms as if separated by the OR operator.
		 * 
		 * Example:
		 * 
		 *     [
		 *       "Term": String,
		 *       "Quoted phrase": String
		 *     ]
		 *
		 * @returns {boolean} Flag that indicates whether invocation of the method succeeded.
		 * 
		 * Valid values:
		 * 
		 * *   true: Invocation of the method succeeded.
		 * *   false: Invocation of the method failed.
		 */
		addSearchPhrases(searchPhrases: {[fieldName: string]: string}): boolean
		
		/**
		 *
		 * Sets and encodes the search query for a Genius Result Search answer.
		 *
		 * @param {string} query Query to use for the search issued by the Genius Result Search answer.
		 *
		 * @returns {boolean} Flag that indicates whether invocation of the method succeeded.
		 * 
		 * Valid values:
		 * 
		 * *   true: Invocation of the method succeeded.
		 * *   false: Invocation of the method failed.
		 */
		setEncodedQuery(query: string): boolean
		
		/**
		 *
		 * Limits the maximum number of search results returned for a Genius Result Search answer. By default, the search query returns up to three results.
		 *
		 * @param {number} searchLimit Positive integer value for the maximum number of search results to return for a Genius Result Search answer. Values above 3 have no effect.
		 * 
		 * Default: 3
		 *
		 * @returns {boolean} Flag that indicates whether invocation of the method succeeded.
		 * 
		 * Valid values:
		 * 
		 * *   true: Invocation of the method succeeded.
		 * *   false: Invocation of the method failed.
		 */
		setSearchLimit(searchLimit: number): boolean
		
		/**
		 *
		 * Specifies terms for the search query defined for a Genius Result Search answer.
		 *
		 * Note: When constructing logic for a Genius Result with the Search answer type, you must invoke the setTable() method and either this method or the addSearchPhrases() method. If you do not invoke both of the required methods, the Genius Result answer search query fails.
		 *
		 * @param {string} searchPhrase Terms to use for the search query made by the Genius Result Search answer.
		 * 
		 * If you want to retain the original search query terms submitted by the user, set this parameter to the String value returned by the GeniusResultContext.getOriginalSearchPhrase() method.
		 *
		 * @returns {boolean} Flag that indicates whether invocation of the method succeeded.
		 * 
		 * Valid values:
		 * 
		 * *   true: Invocation of the method succeeded.
		 * *   false: Invocation of the method failed.
		 */
		setSearchPhrase(searchPhrase: string): boolean
		
		/**
		 *
		 * Limits the search query defined for a Genius Result Search answer to a specific table. The query only returns search results from the specified table as Genius Result answer cards.
		 *
		 * Note: When constructing logic for a Genius Result with the Search answer type, you must invoke this method and either the setSearchPhrase() method or the addSearchPhrases() method. If you do not invoke both of the required methods, the Genius Result answer search query fails.
		 *
		 * @param {string} table Now Platform table name. Only indexed records on this table are included in results for the Genius Result Search answer.
		 *
		 * @returns {boolean} Flag that indicates whether invocation of the method succeeded.
		 * 
		 * Valid values:
		 * 
		 * *   true: Invocation of the method succeeded.
		 * *   false: Invocation of the method failed.
		 */
		setTable(table: string): boolean
		
		/**
		 *
		 * Specifies whether to perform typo handling auto-correction (spell checking) for a search query defined in a Genius Result Search answer.
		 *
		 * If you do not invoke this method for a Genius Result Search answer, the defined search query inherits the typo handling flag from the search query that activated the Genius Result configuration.
		 *
		 * @param {boolean} spellCheck Flag that indicates whether to perform typo handling auto-correction for the search query defined in a Genius Result Search answer.
		 * 
		 * Valid values:
		 * 
		 * *   true: Perform typo handling auto-correction for the search query.
		 * *   false: Bypass typo handling auto-correction for the search query.
		 * 
		 * Default: true
		 *
		 * @returns {void} 
		 */
		spellCheck(spellCheck: boolean): void
		
	}
	
	/** 
	 * You can use search query details retrieved with this API to populate Genius Result answer objects created with the [GeniusResultAnswer](dev.do#!/reference/api/rome/server/sn_ais-namespace/GeniusResultAnswerAPI "The GeniusResultAnswer API provides methods for creating an answer object in a Genius Result configuration. Answers created with this API define search requests or key-value pair maps that can populate Genius Result answer cards.") API.  
	 *   
	 * Use this API in Genius Result server-side scripts with the `sn_ais` namespace identifier. For more information on scripting logic for Genius Results, see [Create a new Genius Result configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/ai-search/task/create-genius-results-config-ais.html).
	 * 
	 */
	class GeniusResultContext {
	
		/**
		 *
		 * Retrieves the user's original search query terms from the search query. You can use these terms to populate Genius Result answers using GeniusResultAnswer API methods.
		 *
		 *
		 * @returns {string} Original terms from the search query.
		 * 
		 * Data type: String
		 */
		getOriginalSearchPhrase(): string
		
		/**
		 *
		 * Retrieves NLU model prediction results for the search query.
		 *
		 * Use this method to retrieve the intent detected for the search query. You can populate Genius Result answers with details from the detected intent using GeniusResultAnswer API methods.
		 *
		 *
		 * @returns {any} Name of the NLU model that produced the prediction result.
		 * 
		 * Data type: String
		 */
		getPredictionResult(): any
		
	}
	
}