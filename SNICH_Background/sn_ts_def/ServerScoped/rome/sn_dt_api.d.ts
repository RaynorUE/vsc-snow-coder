declare namespace sn_dt_api {

	/** 
	 * In addition, you can use this API to detect the language of a specific string and check whether the DynamicTranslation methods are enabled for a translation service. Use this API to create a seamless localization experience for your user interface, enabling one interface to service multiple countries.  
	 *   
	 * Currently this API supports three translation service providers: Microsoft Azure Translator Service, IBM Watson Translator Service, and Google Cloud Translator Service. You can also configure other translation services within your instance and then use the DynamicTranslation API to translate your text.  
	 *   
	 * When using these methods in a server-side script, use the `sn_dt_api` namespace identifier. Before you are able to use this API, you must activate the DynamicTranslation (com.glide.dynamic_translation) plugin. For information on this plugin and additional information on Dynamic Translation, refer to [Dynamic translation overview](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/concept/dynamic-translation-overview.html).
	 * 
	 */
	class DynamicTranslation {
	
		/**
		 *
		 * Detects the language of the passed in text.
		 *
		 * If you pass in a translator, the method uses that translation service to detect the source language. Otherwise, the detection is performed by the default translation service. Ensure that the text strings that you provide contain enough verbiage to enable proper language detection.
		 * 		 * 
		 * 		 * In addition to the detected language, the response contains a confidence level of the detection, along with other possible language alternatives. If a translator is not passed in, the method also returns the default translation service used to detect the language.
		 *
		 * @param {string} text Text to use to detect the language.
		 * @param {{[fieldName: string]: string}} parms Optional. JSON object that contains additional translation parameters.
		 * @param {string} parms.translator Optional. Translation service to use to translate the text (not case-sensitive).
		 * 
		 * Valid values:
		 * 
		 * *   Google
		 * *   Microsoft
		 * *   IBM
		 * *   <custom>
		 * 
		 * Note: To use custom translation services you must first configure the translation service in your instance. For details, see [Integrate with a translation service provider](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/integrate-translation-service-provider.html).
		 * 
		 * Default: Translation service configured in the Translator Configuration [sn_dt_translator_configuration] table.
		 *
		 * @returns {{[fieldName: string]: string}} The following are error messages that the method may return and indications as to the error's root cause.
		 * 
		 * *   Text ("text" field) is missing or invalid. (40000): The text to translate is either missing or not a string.
		 * *   Dynamic Translation plugin is not installed. (40001): The Dynamic Translation API was invoked without activating the com.glide.dynamic_translation plugin. For information on activating this plugin, see [Dynamic translation overview](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/concept/dynamic-translation-overview.html).
		 * *   Translator ("translator" field) is invalid. (40003): The passed in translator parameter is not a string.
		 * *   <translator> translator is not configured. (40004): The specified translation service is not configured in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   <translator> translator is inactive. (40005): The specified translation service is not set to Active in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   Additional parameters are invalid. (40006): The additional parameters that were passed are not an object.
		 * *   Maximum time limit has been exceeded. (40009): The operation took longer than the defined timeout value specified in the Translation Configuration. Default: 40 seconds
		 * *   Default translator is not configured for detection. (40011): The default translation service has not been specified for language detection in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   <translator> translator is not configured for detection. (40013): The specified translation service is not configured for language detection in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   Unknown error occurred. (40051): Default error thrown when the error doesn’t fall in to any other category.
		 * *   Text ("text" field) has exceeded its maximum length. (40052): The text that was passed in to translate exceeds the maximum length supported by the corresponding translation service.
		 * *   Request is not authorized because credentials are missing or invalid (40055): The credentials configured for the translation service in Connections & Credentials are not valid. For information on connections and credentials, see [Dynamic translation overview](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/concept/dynamic-translation-overview.html).
		 */
		getDetectedLanguage(text: string, parms: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Detects the languages of the passed in text strings.
		 *
		 * If you pass in a translator, the method uses that translation service to detect the source language. Otherwise, the detection is performed by the default translation service. Ensure that the text strings that you provide contain enough verbiage to enable proper language detection.
		 * 		 * 
		 * 		 * In addition to the detected language, the response contains a confidence level of the detection, along with other possible language alternatives. If a translator is not passed in, the method also returns the default translation service used to detect the language.
		 *
		 * @param {{[fieldName: string]: string}} texts List of text strings to use to detect the language(s).
		 * @param {{[fieldName: string]: string}} parms Optional. JSON object that contains additional translation parameters.
		 * 
		 *     "parms": {
		 *       "translator": "String"
		 *     }
		 * @param {string} parms.translator Translation service to use to detect the language of a string. Translation services are configured under the Translator Configuration menu and located in the Translator Configuration [sn_dt_translator_configuration] table.
		 * 
		 * Possible values - not case-sensitive:
		 * 
		 * *   Google
		 * *   Microsoft
		 * *   IBM
		 * *   <custom>
		 * 
		 * Note: To use custom translation services you must first configure the translation service in your instance. For details, see [Integrate with a translation service provider](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/integrate-translation-service-provider.html).
		 * 
		 * Default: Translation service configured in the Translator Configuration [sn_dt_translator_configuration] table.
		 *
		 * @returns {{[fieldName: string]: string}} The following are error messages that the method may return and indications as to the error's root cause.
		 * 
		 * *   Text ("text" field) is missing or invalid. (40000): The text to translate is either missing or not a string.
		 * *   Dynamic Translation plugin is not installed. (40001): The Dynamic Translation API was invoked without activating the com.glide.dynamic_translation plugin. For information on activating this plugin, see [Dynamic translation overview](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/concept/dynamic-translation-overview.html).
		 * *   Translator ("translator" field) is invalid. (40003): The passed in translator parameter is not a string.
		 * *   <translator> translator is not configured. (40004): The specified translation service is not configured in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   <translator> translator is inactive. (40005): The specified translation service is not set to Active in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   Additional parameters are invalid. (40006): The additional parameters that were passed are not an object.
		 * *   Maximum time limit has been exceeded. (40009): The operation took longer than the defined timeout value specified in the Translation Configuration. Default: 40 seconds
		 * *   Request failed with multiple errors. (40010): Multiple errors occurred in the language detection call. For more information, refer to the response for each individual text string.
		 * *   Default translator is not configured for detection. (40011): The default translation service has not been specified for language detection in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   <translator> translator is not configured for detection. (40013): The specified translation service is not configured for language detection in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   Translator configuration version is invalid. Migrate to v3. (40014): The associated version of the Translator Configuration for the specified translation service does not support the specified text translation method. For more information, see [Migrate to version v3 of a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/migrate-v2-dynamic-translation.html).
		 * *   Unknown error occurred. (40051): Default error thrown when the error doesn’t fall in to any other category.
		 * *   Text ("text" field) has exceeded its maximum length. (40052): The text that was passed in to translate exceeds the maximum length supported by the corresponding translation service.
		 * *   Request is not authorized because credentials are missing or invalid (40055): The credentials configured for the translation service in Connections & Credentials are not valid. For information on connections and credentials, see [Dynamic translation overview](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/concept/dynamic-translation-overview.html).
		 */
		getDetectedLanguages(texts: {[fieldName: string]: string}, parms: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Translates the passed in text to one or more languages.
		 *
		 * The method uses translation services, such as Microsoft Azure Translator Service, IBM Watson Translator Service, and Google Cloud Translator Service, to perform the translation. If you do not pass in translation parameters, the method uses the system default.
		 *
		 * @param {string} textToTranslate Text to translate.
		 * @param {{[fieldName: string]: string}} parms Optional. JSON object that contains additional translation parameters.
		 * 
		 *     "parms": {
		 *       "additionalParameters": {Object},
		 *       "sourceLanguage": "String",
		 *       "targetLanguages": [Array],
		 *       "translator": "String"
		 *     }
		 * @param {{[fieldName: string]: string}} parms.additionalParameters Optional. Array of JSON objects. Each object contains key-value pairs that provide additional information for performing the translation.
		 * 
		 *     "additionalParameters": {
		 *       "parameterName": "String",
		 *       "parameterValue": "String"
		 *     }
		 * @param {string} parms.additionalParameters.parameterName Optional. Key name.
		 * 
		 * Valid values:
		 * 
		 * *   textype: Type of text to translate. For Microsoft Azure Translator Service only.
		 * @param {string} parms.additionalParameters.parameterValue Optional. Value of the associated key.
		 * 
		 * Valid values:
		 * 
		 * *   plain: Standard text string
		 * *   html: HTML text string
		 * 
		 * Default: plain
		 * @param {string} parms.sourceLanguage Optional. Language code of the source text.
		 * 
		 * Default: Translation service detects the source language.
		 * @param {{[fieldName: string]: string}} parms.targetLanguages Optional. List of language codes to use to translate the text. The method returns translated text for each language code.
		 * 
		 * Default: User preferred language.
		 * @param {string} parms.translator Optional. Translation service to use to translate the text (not case-sensitive).
		 * 
		 * Valid values:
		 * 
		 * *   Google
		 * *   Microsoft
		 * *   IBM
		 * *   <custom>
		 * 
		 * Note: To use custom translation services you must first configure the translation service in your instance. For details, see [Integrate with a translation service provider](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/integrate-translation-service-provider.html).
		 * 
		 * Default: Translation service configured in the Translator Configuration [sn_dt_translator_configuration] table.
		 *
		 * @returns {{[fieldName: string]: string}} The following are error messages that the method may return and indications as to their root cause.
		 * 
		 * *   Text ("text" field) is missing or invalid. (40000): The text to translate is either missing or not a string.
		 * *   Dynamic Translation plugin is not installed. (40001): The Dynamic Translation API was invoked without activating the com.glide.dynamic_translation plugin. For information on activating this plugin, see [Dynamic translation overview](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/concept/dynamic-translation-overview.html).
		 * *   Default translator is not configured for translation. (40002): No translation service is selected as the default translation service in the Translator Configurations. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   Translator ("translator" field) is invalid. (40003): The passed in translator parameter is not a string.
		 * *   <translator> translator is not configured. (40004): The specified translation service is not configured in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   <translator> translator is inactive. (40005): The specified translation service is not set to Active in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   Additional parameters are invalid. (40006): The additional parameters that were passed are not an object.
		 * *   Target languages ("targetLanguages" field) are invalid. (40007): The targetLanguages parameter is passed in the call but is not valid for one of the following reasons:
		 *     
		 *     *   Value is not an array
		 *     *   Array is empty
		 *     *   One or multiple of the entries is not a string
		 *     
		 * *   Source language ("sourceLanguage" field) is invalid. (40008): The sourceLanguage parameter is passed in the call but the value is not a String.
		 * *   Maximum time limit has been exceeded. (40009): The operation took longer than the defined timeout value specified in the Translation Configuration. Default: 40 seconds
		 * *   <translator> translator is not configured for translation. (40012): The specified translation service is not configured for text translation in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   Unknown error occurred. (40051): Default error thrown when the error doesn’t fall in to any other category.
		 * *   Text ("text" field) has exceeded its maximum length. (40052): The text that was passed in to translate exceeds the maximum length supported by the corresponding translation service.
		 * *   Source language is invalid. (40053): The passed in sourceLanguage parameter contains a language code that is not supported by the corresponding translation service.
		 * *   Target language is invalid. (40054): One or more of the language codes passed in the targetLanguages parameter is not supported by the corresponding translation service.
		 * *   Request is not authorized because credentials are missing or invalid (40055): The credentials configured for the translation service in Connections & Credentials are not valid. For information on connections and credentials, see [Dynamic translation overview](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/concept/dynamic-translation-overview.html).
		 * *   Text cannot be translated to target languages. (40056): The specified translation service is not able to translate the passed in text into the specified target languages.
		 */
		getTranslation(textToTranslate: string, parms: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Translates the passed in text strings to one or more languages.
		 *
		 * The method uses translation services, such as Microsoft Azure Translator Service, IBM Watson Translator Service, and Google Cloud Translator Service, to perform the translation. If you do not pass in translation parameters, the method uses the system default.
		 *
		 * @param {{[fieldName: string]: string}} texts List of text stings to translate.
		 * @param {{[fieldName: string]: string}} parms Optional. JSON object that contains additional translation parameters.
		 * 
		 *     "parms": {
		 *       "additionalParameters": {Object},
		 *       "sourceLanguage": "String",
		 *       "targetLanguages": [Array],
		 *       "translator": "String"
		 *     }
		 * @param {{[fieldName: string]: string}} parms.additionalParameters Optional. Array of JSON objects. Each object contains key-value pairs that provide additional information for performing the translation.
		 * 
		 *     "additionalParameters": {
		 *       "parameterName": "String",
		 *       "parameterValue": "String"
		 *     }
		 * @param {string} parms.additionalParameters.parameterName Optional. Key name.
		 * 
		 * Valid values:
		 * 
		 * *   textype: Type of text to translate. For Microsoft Azure Translator Service only.
		 * @param {string} parms.additionalParameters.parameterValue Optional. Value of the associated key.
		 * 
		 * Valid values:
		 * 
		 * *   plain: Standard text string
		 * *   html: HTML text string
		 * 
		 * Default: plain
		 * @param {string} parms.sourceLanguage Optional. Language code of the source text.
		 * 
		 * Default: Translation service detects the source language.
		 * @param {{[fieldName: string]: string}} parms.targetLanguages Optional. List of language codes to use to translate the text. The method returns translated text for each language code.
		 * 
		 * Default: User preferred language.
		 * @param {string} parms.translator Optional. Translation service to use to translate the text (not case-sensitive).
		 * 
		 * Valid values:
		 * 
		 * *   Google
		 * *   Microsoft
		 * *   IBM
		 * *   <custom>
		 * 
		 * Note: To use custom translation services you must first configure the translation service in your instance. For details, see [Integrate with a translation service provider](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/integrate-translation-service-provider.html).
		 * 
		 * Default: Translation service configured in the Translator Configuration [sn_dt_translator_configuration] table.
		 *
		 * @returns {{[fieldName: string]: string}} The following are error messages that the method may return and indications as to their root cause.
		 * 
		 * *   Text ("text" field) is missing or invalid. (40000): The text to translate is either missing or not a string.
		 * *   Dynamic Translation plugin is not installed. (40001): The Dynamic Translation API was invoked without activating the com.glide.dynamic_translation plugin. For information on activating this plugin, see [Dynamic translation overview](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/concept/dynamic-translation-overview.html).
		 * *   Default translator is not configured for translation. (40002): No translation service is selected as the default translation service in the Translator Configurations. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   Translator ("translator" field) is invalid. (40003): The passed in translator parameter is not a string.
		 * *   <translator> translator is not configured. (40004): The specified translation service is not configured in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   <translator> translator is inactive. (40005): The specified translation service is not set to Active in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   Additional parameters are invalid. (40006): The additional parameters that were passed are not an object.
		 * *   Target languages ("targetLanguages" field) are invalid. (40007): The targetLanguages parameter is passed in the call but is not valid for one of the following reasons:
		 *     
		 *     *   Value is not an array
		 *     *   Array is empty
		 *     *   One or multiple of the entries is not a string
		 *     
		 * *   Source language ("sourceLanguage" field) is invalid. (40008): The sourceLanguage parameter is passed in the call but the value is not a String.
		 * *   Maximum time limit has been exceeded. (40009): The operation took longer than the defined timeout value specified in the Translation Configuration. Default: 40 seconds
		 * *   Request failed with multiple errors. (40010): Multiple errors occurred in the language detection call. For more information, refer to the response for each individual text string.
		 * *   <translator> translator is not configured for translation. (40012): The specified translation service is not configured for text translation in the Translator Configuration. For information on creating/modifying a translator configuration, see [Create a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/create-custom-translator.html).
		 * *   Translator configuration version is invalid. Migrate to v3. (40014): The associated version of the Translator Configuration for the specified translation service does not support the specified text translation method. For more information, see [Migrate to version v3 of a translator configuration](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/migrate-v2-dynamic-translation.html).
		 * *   Unknown error occurred. (40051): Default error thrown when the error doesn’t fall in to any other category.
		 * *   Text ("text" field) has exceeded its maximum length. (40052): The text that was passed in to translate exceeds the maximum length supported by the corresponding translation service.
		 * *   Source language is invalid. (40053): The passed in sourceLanguage parameter contains a language code that is not supported by the corresponding translation service.
		 * *   Target language is invalid. (40054): One or more of the language codes passed in the targetLanguages parameter is not supported by the corresponding translation service.
		 * *   Request is not authorized because credentials are missing or invalid (40055): The credentials configured for the translation service in Connections & Credentials are not valid. For information on connections and credentials, see [Dynamic translation overview](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/concept/dynamic-translation-overview.html).
		 * *   Text cannot be translated to target languages. (40056): The specified translation service is not able to translate the passed in text into the specified target languages.
		 */
		getTranslations(texts: {[fieldName: string]: string}, parms: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Determines whether the various methods in the DynamicTranslation API are enabled for a translation service.
		 *
		 * If you pass in a specific translation service, the method checks the method activation for that translation service; otherwise the method checks the default translation service.
		 *
		 * @param {string} translator Optional. Translation service to use to verify whether the methods are active. Translation services are configured under the Translator Configuration menu.
		 * 
		 * Possible values - not case-sensitive:
		 * 
		 * *   Google
		 * *   Microsoft
		 * *   IBM
		 * *   <custom>
		 * 
		 * Note: To use custom translation services you must first configure the translation service in your instance. For details, see [Integrate with a translation service provider](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/dynamic-translation/task/integrate-translation-service-provider.html).
		 * 
		 * Default: Default translation service.
		 *
		 * @returns {{[fieldName: string]: string}} The following are error messages that the API may return and indications as to their root cause.
		 * 
		 * *   Translator ("translator" field) is invalid. (40003): The passed in translator parameter is not a string.
		 */
		isEnabled(translator: string): {[fieldName: string]: string}
		
	}
	
}