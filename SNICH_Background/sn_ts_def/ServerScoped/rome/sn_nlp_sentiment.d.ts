declare namespace sn_nlp_sentiment {

	/** 
	 * The Sentiment Analysis API should be used in a script that is treated as an admin-executing script. For example, we should use the Sentiment Analysis API in Script Action or Scheduled Job.  
	 *   
	 * To use this class in a scoped application, use the sn_nlp_sentiment namespace identifier. The Sentiment Analysis plugin ( com.snc.sentiment_analysis) must be enabled to access the SentimentAnalyser API.
	 * 
	 */
	class SentimentAnalyser {
	
		/**
		 *
		 * @param {GlideRecord} configGR GlideRecord object of a connector configuration.
		 *
		 */
		constructor(configGR: GlideRecord)
		
		/**
		 *
		 * Performs sentiment analysis on the specified text.
		 *
		 * @param {string} inputText Text on which sentiment analysis should be performed.
		 *
		 * @returns {{[fieldName: string]: string}} Result of the sentiment analysis specifying the status, score, normalised score, sys_id of the relevant connector configuration, and error message.
		 */
		analyze(inputText: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Performs sentiment analysis on an array of strings.
		 *
		 * @param {{[fieldName: string]: string}} inputTextArray Array of text (string) on which to perform sentiment analysis.
		 *
		 * @returns {{[fieldName: string]: string}} An array that gives the result of the sentiment analysis performed on multiple texts specifying the status, score, normalized score, sys_id of the relevant connector configuration, and error message.
		 */
		analyzeMultiple(inputTextArray: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Performs sentiment analysis on an array of strings in the specified language.
		 *
		 * @param {{[fieldName: string]: string}} inputTextArray Array of text (string) on which to perform sentiment analysis.
		 * @param {string} language Language for the input text. This can very for different sentiment services.
		 *
		 * @returns {{[fieldName: string]: string}} An array with the result of the sentiment analysis performed on multiple texts of the mentioned language, specifying the status, score, normalized score, sys_id of the relevant connector configuration, and error message.
		 */
		analyzeMultipleWithLanguage(inputTextArray: {[fieldName: string]: string}, language: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Performs sentiment analysis on a specified text and language.
		 *
		 * @param {string} inputText Text on which to perform sentiment analysis.
		 * @param {string} language Language for the input text. This can very for different sentiment services.
		 *
		 * @returns {{[fieldName: string]: string}} Result of the sentiment analysis specifying the status, score, normalized score, sys_id of the relevant connector configuration, and error message.
		 */
		analyzeWithLanguage(inputText: string, language: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the GlideRecord of the specified connector configuration.
		 *
		 * @param {string} connectorName Name of the connector configuration.
		 *
		 * @returns {GlideRecord} GlideRecord of the specified connector configuration.
		 */
		getConnectorByName(connectorName: string): GlideRecord
		
		/**
		 *
		 * Returns the GlideRecord of the default connector configuration.
		 *
		 *
		 * @returns {GlideRecord} GlideRecord of the default connector configuration.
		 */
		getDefaultConnector(): GlideRecord
		
	}
	
}