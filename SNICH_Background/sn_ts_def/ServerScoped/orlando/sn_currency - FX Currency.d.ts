declare namespace sn_currency - FX Currency {

	/** 
	 * You can acquire information for a specific FX Currency field by calling the [GlideCurrencyConfig(Object ed)](https://developer.servicenow.com/go_to_api.do?ID=S-GCConfig-GlideCurrencyConfig_O&v=orlando) constructor, which associates a specific FX Currency field to the instantiated object. When calling the various GlideCurrencyConfig() methods, if a record exists in the FX Currency Configuration [fx_configuration] table for the FX Currency field, the requested value is passed back. If a record or field is not available, the default value is passed back. You can also acquire the default FX Currency configuration values by calling the [GlideCurrencyConfig()](https://developer.servicenow.com/go_to_api.do?ID=S-GCConfig-GlideCurrencyConfig&v=orlando) constructor.  
	 *   
	 * For additional information on FX Currency configuration, see [Setting up and operating FX Currency fields](https://docs.servicenow.com/bundle/orlando-platform-administration/page/administer/currency/concept/fx-currency.html).  
	 *   
	 * This class runs is in the sn_currency namespace.
	 * 
	 */
	class GlideCurrencyConfig {
	
		/**
		 *
		 * @param {GlideElementDescriptor} ed GlideElementDescriptor object of the FX Currency field to associate with the GlideCurrencyConfig object.
		 *
		 */
		constructor(ed: GlideElementDescriptor)
		
		/**
		 *
		 * Returns the aggregation source value for an FX Currency field.
		 *
		 * If called on an existing FX Currency field that has a corresponding FX Currency Configuration [fx_configuration] record, returns the value of the Aggregation Source (aggregation_source) field. Otherwise, if a new record, returns a default value.
		 * 		 * 
		 * 		 * For more information on aggregation source, see [Specify the table field and its currency display parameters](https://docs.servicenow.com/bundle/orlando-platform-administration/page/administer/currency/concept/configure-fx-currency-field-behavior.html#fx-currency-display-parameters).
		 *
		 *
		 * @returns {string} Source of values for aggregations. The returned value depends on the constructor used to instantiate the object.
		 * 
		 * *   GlideCurrencyConfig(Object ed): If an fx_configuration record exists, returns the aggregation_source field from the fx_configuration record that is associated with the FX Currency field specified by the GlideElementDescriptor passed in the constructor. If no fx_configuration record, follows the GlideCurrencyConfig() rules.
		 * *   GlideCurrencyConfig(): If set, returns the value in the glide.currency2.aggregation_source field in system properties. Otherwise, returns a hard-coded default of reference.
		 * 
		 * Possible values:
		 * 
		 * *   default
		 * *   as_entered
		 * *   reference
		 */
		getAggregationSource(): string
		
		/**
		 *
		 * Returns the field used as the source of the date and time for the currency conversion.
		 *
		 * If called on an existing FX Currency field that has a corresponding FX Currency Configuration [fx_configuration] record, returns the value of the Conversion Date Source (conversion_date_source) field. Otherwise, if a new record, returns "null".
		 * 		 * 
		 * 		 * For more information on the Conversion Date Source field, see [Identify the rate table and date source for currency conversions](https://docs.servicenow.com/bundle/orlando-platform-administration/page/administer/currency/concept/configure-fx-currency-field-behavior.html#fx-currency-conv-rate-table-date-source).
		 *
		 *
		 * @returns {string} Field in the record used as the conversion date source. The returned value depends on the constructor used to instantiate the object.
		 * 
		 * *   GlideCurrencyConfig(Object ed): If an fx_configuration record exists, returns the conversion_date_source field from the fx_configuration record that is associated with the FX Currency field specified by the GlideElementDescriptor passed in the constructor. If no fx_configuration record, follows the GlideCurrencyConfig() rules.
		 * *   GlideCurrencyConfig(): Returns null.
		 */
		getConversionDateSource(): string
		
		/**
		 *
		 * Returns the number of digits to display for an FX Currency field.
		 *
		 * If called on an existing FX Currency field that has a corresponding FX Currency Configuration [fx_configuration] record, returns the value of the Display Digits (display_digits) field. Otherwise, if a new record, returns a default value.
		 *
		 *
		 * @returns {number} Number of digits to display for the FX Currency field. The returned value depends on the constructor used to instantiate the object.
		 * 
		 * *   GlideCurrencyConfig(Object ed): If an fx_configuration record exists, returns the value of the display_digits field in the FX Currency Configuration [fx_configuration] record that is associated with the FX Currency field specified by the GlideElementDescriptor passed in the constructor. If no fx_configuration record, follows the GlideCurrencyConfig() rules.
		 * *   GlideCurrencyConfig(): If set, returns the value of the glide.currency2.display_digits property in system properties. Otherwise, returns -1.
		 */
		getDisplayDigits(): number
		
		/**
		 *
		 * Returns the currency code used to convert the FX Currency value when it appears in lists and reports.
		 *
		 * If called on an existing FX Currency field that has a corresponding FX Currency Configuration [fx_configuration] record, returns the value of the Display Value Currency (display_value) field. Otherwise, if a new record, returns a default value.
		 *
		 *
		 * @returns {string} Currency code to use to display the FX Currency field. The returned value depends on the constructor used to instantiate the object.
		 * 
		 * *   GlideCurrencyConfig(Object ed): If an fx_configuration record exists, returns the display_value field, which contains the currency code, from the fx_configuration record that is associated with the FX Currency field specified by the GlideElementDescriptor passed in the constructor. If no fx_configuration record, follows the GlideCurrencyConfig() rules.
		 * *   GlideCurrencyConfig(): If set, returns the value of the glide.currency2.display_value property in system properties. Otherwise, returns as_entered.
		 * 
		 * Possible values:
		 * 
		 * *   default: Global default. This is the value in the glide.currency2.display_digits property.
		 * *   as_entered: Currency value as entered by the user.
		 * *   in_session_currency: Currency value converted to the session currency. Session currency is based on the user's locale.
		 * *   in_reference_currency: Reference value if computed and stored. Otherwise, the currency value converted to the reference currency.
		 */
		getDisplayValue(): string
		
		/**
		 *
		 * Returns the rate table field used as a rate table filter for an FX Currency field.
		 *
		 * If called on an existing FX Currency field that has a corresponding FX Currency Configuration [fx_configuration] record, returns the value of the Rate Table Field (rate_filter_rate_table_field). Otherwise, if a new record, returns a default value.
		 * 		 * 
		 * 		 * For more information on rate table filters, see [Select the rate and target table fields used for filtering](https://docs.servicenow.com/bundle/orlando-platform-administration/page/administer/currency/concept/configure-fx-currency-field-behavior.html#fx-currency-rate-target-table-fields).
		 *
		 *
		 * @returns {string} Field in the rate table used to filter the rate table records. The returned value depends on the constructor used to instantiate the object.
		 * 
		 * *   GlideCurrencyConfig(Object ed): If an fx_configuration record exists, returns the rate_filter_rate_table_field from the fx_configuration record that is associated with the FX Currency field specified by the GlideElementDescriptor passed in the constructor. If no fx_configuration record, follows the GlideCurrencyConfig() rules.
		 * *   GlideCurrencyConfig(): Returns null.
		 */
		getRateFilterRateTableField(): string
		
		/**
		 *
		 * Returns the target table field used to filter the rate table records for an FX Currency field.
		 *
		 * If called on an existing FX Currency field that has a corresponding FX Currency Configuration [fx_configuration] record, returns the value of the Target Table Field (rate_filter_target_table_field). Otherwise, if a new record, returns a default value.
		 * 		 * 
		 * 		 * For more information on rate table filters, see [Select the rate and target table fields used for filtering](https://docs.servicenow.com/bundle/orlando-platform-administration/page/administer/currency/concept/configure-fx-currency-field-behavior.html#fx-currency-rate-target-table-fields).
		 *
		 *
		 * @returns {string} Field in the target table used/to use to filter the rate table. The returned value depends on the constructor used to instantiate the object.
		 * 
		 * *   GlideCurrencyConfig(Object ed): If an fx_configuration record exists, returns the rate_filter_target_table_field from the fx_configuration record that is associated with the FX Currency field specified by the GlideElementDescriptor passed in the constructor. If no fx_configuration record, follows the GlideCurrencyConfig() rules.
		 * *   GlideCurrencyConfig(): Returns null.
		 */
		getRateFilterTargetTableField(): string
		
		/**
		 *
		 * Returns the rate table used to convert currency for an FX Currency field.
		 *
		 * If called on an existing FX Currency field that has a corresponding FX Currency Configuration [fx_configuration] record, returns the value of the Rate Table Field (rate_filter_rate_table_field). Otherwise, if a new record, returns a default value.
		 * 		 * 
		 * 		 * For more information on FX Currency rate tables, see [Identify the rate table and date source for currency conversions](https://docs.servicenow.com/bundle/orlando-platform-administration/page/administer/currency/concept/configure-fx-currency-field-behavior.html#fx-currency-conv-rate-table-date-source).
		 *
		 *
		 * @returns {string} Name of the rate table used to perform the currency conversion. The returned value depends on the constructor used to instantiate the object.
		 * 
		 * *   GlideCurrencyConfig(Object ed): If an fx_configuration record exists, returns the rate_table_field field from the fx_configuration record that is associated with the FX Currency field specified by the GlideElementDescriptor passed in the constructor. If no fx_configuration record, follows the GlideCurrencyConfig() rules.
		 * *   GlideCurrencyConfig(): If set, returns the value of the glide.currency2.system_rate_table property from system properties. Otherwise, returns fx_system_rate.
		 */
		getRateTable(): string
		
		/**
		 *
		 * Returns the reference currency for an FX Currency field.
		 *
		 * If called on an existing FX Currency field that has a corresponding FX Currency Configuration [fx_configuration] record, returns the value of the Reference Currency (reference_currency) field. Otherwise, if a new record, returns a default value.
		 * 		 * 
		 * 		 * For more information on reference currency, see [Set the reference currency](https://docs.servicenow.com/bundle/orlando-platform-administration/page/administer/currency/concept/configure-fx-currency-field-behavior.html#fx-currency-set-reference).
		 *
		 *
		 * @returns {string} Reference currency as an ISO currency code. The returned value depends on the constructor used to instantiate the object.
		 * 
		 * *   GlideCurrencyConfig(Object ed): If an fx_configuration record exists, returns the reference_currency field from the fx_configuration record that is associated with the FX Currency field specified by the GlideElementDescriptor passed in the constructor. If no fx_configuration record, follows the GlideCurrencyConfig() rules.
		 * *   GlideCurrencyConfig(): If set, returns the value of the glide.currency2.default_reference_currency system property. Otherwise the method applies the following rules, in the specified order, to determine the reference currency code:
		 *     *   If the glide.system.reference_currency system property is set to true, uses the value in the glide.system.reference_currency.code system property.
		 *     *   The value in the glide.system.locale system property (which implies a currency).
		 *     *   Default locale of the Java Virtual Machine on which the instance is running.
		 */
		getReferenceCurrency(): string
		
		/**
		 *
		 * Returns the reference currency source for an FX Currency field.
		 *
		 * If called on an existing FX Currency field that has a corresponding FX Currency Configuration [fx_configuration] record, returns the value (dot-walk path) of the Reference Currency Source (reference_currency_source) field. Otherwise, if a new record, returns a default value.
		 * 		 * 
		 * 		 * For more information on reference currency source, see [Set the reference currency](https://docs.servicenow.com/bundle/orlando-platform-administration/page/administer/currency/concept/configure-fx-currency-field-behavior.html#fx-currency-set-reference).
		 *
		 *
		 * @returns {string} Dot-walk path of the field used/to use as the reference currency. The returned value depends on the constructor used to instantiate the object.
		 * 
		 * *   GlideCurrencyConfig(Object ed): If an fx_configuration record exists, returns the reference_currency_source field from the fx_configuration record that is associated with the FX Currency field specified by the GlideElementDescriptor passed in the constructor. If no fx_configuration record, follows the GlideCurrencyConfig() rules.
		 * *   GlideCurrencyConfig(): Returns null.
		 */
		getReferenceCurrencySource(): string
		
	}
	
	/** 
	 * You can instantiate the GlideCurrencyConverter object and define the source and destination currencies during instantiation using GlideCurrencyConverter(from, to). You can also instantiate the object without these values and define them later using the setFromCurrency() and setToCurrency() methods. These values and the amount to convert must be set before calling the convert() method to perform the currency conversion. To set the amount to convert, use the setAmount() method.  
	 *   
	 * The GlideCurrencyConverter() API also provides optional methods that enable you to:
	 * 
	 * *   Set the date and time for which to perform the conversion, setDateTime(). By setting the date and time, the rate that is used in the conversion calculation is that for the specified date and time, instead of the default of the current date and time.
	 * *   Set the rate table to use in the conversion, setRateTable(). By default the conversion uses the fx_system_rate table however, you can define custom rate tables for your instance. For additional information on creating rate tables, see [Add conversion rates using a custom rate table](https://docs.servicenow.com/bundle/orlando-platform-administration/page/administer/currency/task/custom-rate-table.html).
	 * 
	 *   
	 *   
	 * This class runs is in the sn_currency namespace.
	 * 
	 */
	class GlideCurrencyConverter {
	
		/**
		 *
		 * @param {string} from Three-letter ISO 3166 country code of the source currency.
		 * @param {string} to Three-letter ISO 3166 country code of the converted currency.
		 *
		 */
		constructor(from: string, to: string)
		
		/**
		 *
		 * Executes the currency converter.
		 *
		 * Call this method after calling other GlideCurrencyConverter methods that construct the currency conversion, such as setAmount(), setRateTable(), and setDate().
		 *
		 *
		 * @returns {{[fieldName: string]: string}} If the conversion is successful, returns CurrencyExchangeValue object. If unsuccessful, returns "null".
		 * 
		 * CurrencyExchangeValue {
		 * Rate: Number,
		 * OriginalAmount: Number,
		 * Amount: Number,
		 * fromCurrency: String,
		 * toCurrency: String,
		 * rateSysId: String
		 * }
		 * 
		 * Rate: Number. Exchange rate used in the conversion.
		 * 
		 * OriginalAmount: Number. Source currency amount.
		 * 
		 * Amount: Number. Converted amount (OriginalAmount * Rate).
		 * 
		 * fromCurrency: String. Three-letter ISO 3166 country code of the source currency.
		 * 
		 * toCurrency: String. Three-letter ISO 3166 country code of the converted currency.
		 * 
		 * rateSysId: String. Sys_id of the rate table record used to calculate the conversion.
		 */
		convert(): {[fieldName: string]: string}
		
		/**
		 *
		 * Sets the amount of currency to convert.
		 *
		 * @param {string} amount Currency amount to convert. This value must be unformatted except for a decimal point to denote fractional currency. For example, 1234.56 is valid, 1,234.56 is invalid.
		 *
		 * @returns {void} Method does not return a value
		 */
		setAmount(amount: string): void
		
		/**
		 *
		 * Sets the currency conversion date and time.
		 *
		 * This date and time determines the conversion rate that is used to convert the currency. If this method is not called before the GlideCurrencyConverter.convert() method, the conversion is performed using the rate for the current date/time.
		 *
		 * @param {GlideDateTime} date Date/time for which to calculate the currency conversion. This value determines the rate that is used in the conversion.
		 *
		 * @returns {void} Method does not return a value
		 */
		setDateTime(date: GlideDateTime): void
		
		/**
		 *
		 * Sets the country code of the source currency.
		 *
		 * @param {string} from Three-letter ISO 3166 country code of the source currency.
		 *
		 * @returns {void} Method does not return a value
		 */
		setFromCurrency(from: string): void
		
		/**
		 *
		 * Defines the rate table to use in the currency conversion.
		 *
		 * If this method is not called before the GlideCurrencyConverter.convert() method is called, the conversion is performed using the fx_system_rate table. All custom rate tables must extend the fx_conversion_rate table. For additional information on creating rate tables, see [Add conversion rates using a custom rate table](https://docs.servicenow.com/bundle/orlando-platform-administration/page/administer/currency/task/custom-rate-table.html).
		 *
		 * @param {string} rateTable Name of the rate table to use in the currency conversion.
		 *
		 * @returns {void} Method does not return a value
		 */
		setRateTable(rateTable: string): void
		
		/**
		 *
		 * Sets the country code of the destination currency.
		 *
		 * @param {string} to Three-letter ISO 3166 country code of the source currency.
		 *
		 * @returns {void} Method does not return a value
		 */
		setToCurrency(to: string): void
		
	}
	
	/** 
	 * Refer to the [GlideCurrencyConverter()](dev.do#!/reference/api/orlando/server/sn_currency-namespace/GlideCurrConverterScopedAPI "The GlideCurrencyConverter API provides methods to convert one currency value to another, such as converting US dollars into European Euro.") API for methods that return a GlideCurrencyExchangeValue object.  
	 *   
	 * 
	 * Note: There is no constructor for this class.
	 * 
	 */
	class GlideCurrencyExchangeValue {
	
		/**
		 *
		 * Returns the currency amount after the conversion.
		 *
		 *
		 * @returns {number} Currency amount after the conversion.
		 */
		getAmount(): number
		
		/**
		 *
		 * Returns the converted to currency type.
		 *
		 *
		 * @returns {string} Three-letter ISO currency code of the converted to currency.
		 */
		getCurrency(): string
		
		/**
		 *
		 * Returns the original, pre-conversion currency type.
		 *
		 *
		 * @returns {string} Three-letter ISO currency code of the currency converted from.
		 */
		getOriginalCurrency(): string
		
		/**
		 *
		 * Returns the original, pre-conversion amount.
		 *
		 *
		 * @returns {number} Original amount before conversion.
		 */
		getOriginalValue(): number
		
		/**
		 *
		 * Returns the exchange rate used during the conversion.
		 *
		 *
		 * @returns {number} Exchange rate used in the currency conversion.
		 */
		getRate(): number
		
		/**
		 *
		 * Returns the sys_id of the record in the rate table used in the currency conversion.
		 *
		 *
		 * @returns {string} Sys_id of the rate table used in the currency conversion.
		 */
		getRateSysId(): string
		
	}
	
	/** 
	 * When instantiating the GlideCurrencyFormatter object, you define the format of the output results for this object. Once set, the same format is used each time you call the GlideCurrencyFormatter.format() method of that object. The GlideCurrencyFormatter() and format() methods are the only two methods that you must call to format FX Currency.  
	 *   
	 * The GlideCurrencyFormatter() API also provides optional methods that enable you to:
	 * 
	 * *   Set the locale of the currency using setLocale(). By setting the locale, the formatter takes into consideration any formatting that is specific to that locale, such as whether a decimal point or decimal comma is used to denote fractions of currency amount. Default: System locale
	 * *   Set the minimum number of fractional digits to display using setMinFractionDigits(). Defines the minimum number of digits to the right of the decimal point/decimal comma to include. By default, all digits passed in are displayed. If the passed in amount has fewer digits than the specified minimum, the result is padded with "0".
	 * *   Set the maximum number of fractional digits to display using setMaxFractionDigits(). Defines the maximum number of digits to the right of the decimal point/decimal comma to include. By default, all digits passed in are displayed. If the passed in amount has a greater number of digits than the specified maximum, the additional digits are truncated during the process of rounding to the number of maximum fraction digits. Rounding is performed to the closest right-most digit. For example, if the maximum fraction digit is set to 2 and the passed in currency value is 123.456, the formatted value is 123.46. If the currency value is 23.122, the formatted value is 23.12. If the maximum is set to less than the minimum, the minimum value is used.
	 * 
	 *   
	 *   
	 * This class runs is in the sn_currency namespace.
	 * 
	 */
	class GlideCurrencyFormatter {
	
		/**
		 *
		 * @param {string} formatString Optional. Format string to use to format any currency passed into the formatter.
		 * 
		 * Valid values:
		 * 
		 * *   %s: Replaced by the currency symbol associated with the country code specified in the format() call.
		 * *   %v: Replaced by the currency amount, such as 123.45.
		 * *   %c: Replaced by the ISO currency code specified in the format() call, such as USD or EUR.
		 * *   %l: Replaced with the passed in value, no formatting performed.
		 * *   %p: Replaced by the percent sign (%).
		 * 
		 * For example, if the format string is '%s%v%c' and the value to format is 123.45 in US dollars, the returned formatted string is $123.45 USD. If the format string is '%s%l%c' and the value string to format is '56M' in Euros, the returned formatted string is €56M EUR.
		 * 
		 * Note: The same format string is used each time the format() method is called on this object.
		 *
		 */
		constructor(formatString: string)
		
		/**
		 *
		 * Formats a specified currency value using the specified currency code.
		 *
		 * The resulting format of the currency is also dependent on the values passed in when the GlideCurrencyFormatter object was initially instantiated.
		 *
		 * @param {string} value Currency amount to format. The amount can only contain a decimal point to denote the fractional amount, commas are not supported.
		 * 
		 * Valid values: 123.45 or 2436.23
		 * 
		 * Invalid values 123,45 or 2,134.56
		 * @param {string} currencyCode Three-letter ISO currency code to use when formatting the currency.
		 *
		 * @returns {string} Formatted currency value.
		 */
		format(value: string, currencyCode: string): string
		
		/**
		 *
		 * Sets the default language and country, which constitutes the locale, for the currency formatter.
		 *
		 * If you do not call this method before calling the GlideCurrencyFormatter.format() method, the locale defaults to the current session locale.
		 *
		 * @param {string} language Two-letter ISO 639 language code, such as en, sp, and fr.
		 * @param {string} country Two-letter ISO 3166 country code, such as US, ES, and FR.
		 *
		 * @returns {void} Method does not return a value
		 */
		setLocale(language: string, country: string): void
		
		/**
		 *
		 * Sets the maximum number of digits to the right of the decimal point/decimal comma to return.
		 *
		 * @param {number} maxFractionDigits Maximum number of fraction digits to return. If this value is set to something less than the minFractionDigits value, it is overridden by minFractionDigits.
		 *
		 * @returns {void} Method does not return a value
		 */
		setMaxFractionDigits(maxFractionDigits: number): void
		
		/**
		 *
		 * Sets the minimum number of fraction digits (right of the decimal point/decimal comma) to return.
		 *
		 * @param {number} minFractionDigits Minimum number of fraction digits to return.
		 *
		 * @returns {void} Method does not return a value
		 */
		setMinFractionDigits(minFractionDigits: number): void
		
	}
	
	/** 
	 * The methods in this class parse a specified string into a [GlideCurrencyValue](dev.do#!/reference/api/orlando/server/sn_currency-namespace/GlideCurrencyValueScopedAPI "Provides methods that return the currency code and original currency from an associated GlideCurrencyParser.parse() call.") object enabling you to obtain locale-based currency formatting. Before calling the GlideCurrencyParser.parse() method, which actually performs the parse, you must set the currency code to use during the parse. You can set the currency code by either passing it in the GlideCurrencyParser.parse() method call or by calling GlideCurrencyParser.setDefaultCurrencyCode().  
	 *   
	 * Setting the locale is optional. If you do not set it through the GlideCurrencyParser.setLocale() method, the passed in currency amount must be unformatted, except for the value that denotes fractional currency. For example, 1234.56 is valid, 1,234.56 is invalid.  
	 *   
	 * This class runs is in the sn_currency namespace.
	 * 
	 */
	class GlideCurrencyParser {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Parses a specified string into a GlideCurrencyValue object to obtain locale-based currency formatting.
		 *
		 * @param {string} value String to parse. You can prepend this string with the ISO currency code to use when parsing the string (semicolon separated). If the currency code is not set prior to calling the parse() method, it defaults to the current session currency code.
		 * 
		 * This method supports both decimal point and decimal comma notation.
		 * 
		 * For example: "123.45", "USD;123.45", "123,45", "EUR;123,45"
		 *
		 * @returns {{[fieldName: string]: string}} Parsed value information.
		 * 
		 * Data type: Object
		 */
		parse(value: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Sets the currency code for the associated GlideCurrencyParser object.
		 *
		 * @param {string} currencyCode Three-letter ISO currency code to use as the default in the associated GlideCurrencyParser object.
		 *
		 * @returns {void} Method does not return a value
		 */
		setDefaultCurrencyCode(currencyCode: string): void
		
		/**
		 *
		 * Sets the default language and country codes, which constitute the locale, on the associated GlideCurrencyParser object.
		 *
		 * If you do not call this method before calling the GlideCurrencyParser.parse() method, the locale defaults to the current session locale.
		 *
		 * @param {string} language Three-letter ISO 639 language code, such as eng, spa, and fre.
		 * @param {string} country Three-letter ISO 3166 country code, such as USA, ESP, and FRA.
		 *
		 * @returns {void} Method does not return a value
		 */
		setLocale(language: string, country: string): void
		
	}
	
	/** 
	 * Note: There is no constructor for this class.
	 * 
	 */
	class GlideCurrencyValue {
	
		/**
		 *
		 * Returns the currency amount originally passed into the associated GlideCurrencyParser.parse() call.
		 *
		 *
		 * @returns {string} Original currency passed into the parse() method.
		 */
		getAmount(): string
		
		/**
		 *
		 * Returns the currency code used to parse the currency in the associated GlideCurrencyParser.parse() call.
		 *
		 *
		 * @returns {string} Three-letter ISO currency code used to parse the currency.
		 */
		getCurrencyCode(): string
		
	}
	
}