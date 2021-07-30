/** 
 * Use the action API to configure UI actions with which users can interact. Use these scripts in the UI Action [sys_ui_action] table. For information, see [UI actions](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/list-administration/task/t_EditingAUIAction.html).
 * 
 * Methods for this API are referred to by the variable name 'action' in any server-side JavaScript. To learn more, see [Creating interactions with UI actions](https://developer.servicenow.com/blog.do?p=/post/training-ui-action-101/).
 * 
 */
declare class ActionAPIBoth {

	/**
	 *
	 * Gets a GlideURI object to determine the user view.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} GlideURI object representing the URI parameter of the user view.
	 * 
	 * *   [GlideURI](dev.do#!/reference/api/rome/server/ "Enables handling the URI parameter in scoped applications.")
	 * *   [GlideURI - Global](https://docs.servicenow.com/bundle/rome-application-development/page/app-store/dev_portal/API_reference/GlideURIGlobal/concept/GlideURIGlobalAPI.html)
	 */
	getGlideURI(): {[fieldName: string]: string}
	
	/**
	 *
	 * Gets the URL of the return page in view after a UI action is complete.
	 *
	 *
	 * @returns {string} URL of the return page in view after a UI action is complete.
	 */
	getReturnURL(): string
	
	/**
	 *
	 * Gets the value of a URL parameter.
	 *
	 * @param {string} parameterName Name of the URL parameter name to be queried for the URL parameter value.
	 *
	 * @returns {string} URL parameter value.
	 */
	getURLParameter(parameterName: string): string
	
	/**
	 *
	 * Opens a page with a GlideRecord in the user view.
	 *
	 * @param {{[fieldName: string]: string}} gr GlideRecord of the page to be opened in the user view.
	 *
	 * @returns {void} Method does not return a value
	 */
	openGlideRecord(gr: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Indicates whether to enable or disable pop-up windows on the page in the current view.
	 *
	 * @param {boolean} noPop Flag indicating whether to enable or disable pop-up windows on the page:
	 * 
	 * *   true: Disables pop-up windows.
	 * *   false: Default. Enables pop-up windows.
	 *
	 * @returns {void} 
	 */
	setNoPop(noPop: boolean): void
	
	/**
	 *
	 * Sets the redirect URI for this transaction, which determines the next page the user sees.
	 *
	 * For use cases:
	 * 	 * 
	 * 	 * *   [Create a UI routing action](https://docs.servicenow.com/bundle/rome-application-development/page/script/useful-scripts/task/t_CreateAUIRoutingAction.html)
	 * 	 * *   [Create knowledge articles from HR cases](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/knowledge-management/task/ui-action-hrcase-article.html)
	 * 	 * *   [Define task relationships with UI actions](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/task-table/reference/r_UIActions.html)
	 *
	 * @param {{[fieldName: string]: string}} URL URL to set as the redirect. You can provide the URL as a string or a [GlideRecord](dev.do#!/reference/api/rome/server/ "Scoped GlideRecord is used for database operations."). If you pass the URL as a GlideRecord, this value takes the focus to that record's form.
	 *
	 * @returns {void} Method does not return a value
	 */
	setRedirectURL(URL: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Sets the return URI for this transaction after a UI action is complete. You can use this method to determine what page the user has in view when they return from submit.
	 *
	 * @param {{[fieldName: string]: string}} URL URI to set as the return location after a UI action is complete. You can provide the URL as a string or a [GlideRecord](dev.do#!/reference/api/rome/server/ "Scoped GlideRecord is used for database operations.").
	 *
	 * @returns {void} Method does not return a value
	 */
	setReturnURL(URL: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Sets a URL parameter name and value.
	 *
	 * @param {string} parameterName Name of the URL parameter.
	 * @param {string} parameterValue Value of the parameter.
	 *
	 * @returns {void} Method does not return a value
	 */
	setURLParameter(parameterName: string, parameterValue: string): void
	
}

/** 
 * Use these methods to generate a hash for the certificate, sign data using a private key, and generate a message authentication code.
 * 
 */
declare class CertificateEncryption {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Generates the Message Authentication Code (MAC), which is used to authenticate a message.
	 *
	 * @param {string} key Key to use to sign the message. Must be Base64 encoded.
	 * @param {string} algorithm Algorithm to use to generate the MAC: HmacSHA256, HmacSHA1, HmacMD5, and so on.
	 * @param {string} data Data to process.
	 *
	 * @returns {string} MAC in base64 format.
	 */
	generateMac(key: string, algorithm: string, data: string): string
	
	/**
	 *
	 * Generates a hash (SHA-1, SHA-256, and so on) for the certificate from Trust Store Cert.
	 *
	 * @param {string} certificateID sys_id of the certificate record in the X.509 Certificate [sys_certificate] table.
	 * @param {string} algorithm SHA-1, SHA-256, and so on
	 *
	 * @returns {string} Thumbprint in base64 format.
	 */
	getThumbPrint(certificateID: string, algorithm: string): string
	
	/**
	 *
	 * Generates a hash (SHA-1, SHA-256, and so on) for the certificate from the keystore entry.
	 *
	 * @param {string} certificateID sys_id of the certificate record in the X.509 Certificate [sys_certificate] table.
	 * @param {string} alias Alias name for the certificate.
	 * @param {string} algorithm SHA-1, SHA-256, and so on.
	 *
	 * @returns {string} Thumbprint in base64 format.
	 */
	getThumbPrintFromKeystore(certificateID: string, alias: string, algorithm: string): string
	
	/**
	 *
	 * Signs the data using the private key and the specified algorithm.
	 *
	 * @param {string} certificateID sys_id of the certificate record in the X.509 Certificate [sys_certificate] table.
	 * @param {string} alias Private key name.
	 * @param {string} aliaspassword Password for the private key.
	 * @param {string} algorithm Algorithm to use. Must be one of the following values:
	 * 
	 * *   NONEwithRSA
	 * *   MD2withRSA
	 * *   MD5withRSA
	 * *   SHA1withRSA
	 * *   SHA224withRSA
	 * *   SHA256withRSA
	 * *   SHA384withRSA
	 * *   SHA512withRSA
	 * *   NONEwithDSA
	 * *   SHA1withDSA
	 * *   SHA224withDSA
	 * *   SHA256withDSA
	 * *   NONEwithECDSA
	 * *   SHA1withECDSA
	 * *   SHA224withECDSA
	 * *   SHA256withECDSA
	 * *   SHA384withECDSA
	 * *   SHA512withECDSA
	 * @param {string} datatosign Data to sign.
	 *
	 * @returns {string} Signed data in base64 format.
	 */
	sign(certificateID: string, alias: string, aliaspassword: string, algorithm: string, datatosign: string): string
	
}

/** 
 * You cannot instantiate objects of this type. Objects of this type are created automatically and are accessible only in script steps and inline scripts.
 * 
 */
declare class FlowScriptAPI {

	/**
	 *
	 * Returns the context ID of the running flow.
	 *
	 *
	 * @returns {string} The sys_id of the running flow.
	 */
	getContextID(): string
	
}

/** 
 * The scoped GlideAggregate class is an extension of GlideRecord and provides database aggregation (AVG, COUNT, MIN, MAX, STDDEV, SUM) queries. This functionality can be helpful when creating customized reports or in calculations for calculated fields. The GlideAggregate class works only on number fields.  
 *   
 * When you use GlideAggregate on currency or price fields, you are working with the reference currency value. Be sure to convert the aggregate values to the user's session currency for display. Because the conversion rate between the currency or price value (displayed value) and its reference [currency](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/currency/concept/currency.html) value (aggregation value) might change, the result may not be what the user expects.  
 *   
 * 
 * Note: When using an on-premise system, the database server time zone must be set to GMT/UTC for this class to work properly.
 * 
 */
declare class GlideAggregate {

	/**
	 *
	 * @param {string} tableName Name of the table.
	 *
	 */
	constructor(tableName: string)
	
	/**
	 *
	 * Adds an aggregate to a database query.
	 *
	 * @param {string} agg Name of an aggregate to include in a database query.
	 * 
	 * Valid values:
	 * 
	 * *   AVG
	 * *   COUNT
	 * *   MIN
	 * *   MAX
	 * *   STDDEV
	 * *   SUM
	 * @param {string} name Optional. Name of the field to group the results of the aggregation by.
	 * 
	 * Default: Null
	 *
	 * @returns {void} Method does not return a value
	 */
	addAggregate(agg: string, name: string): void
	
	/**
	 *
	 * Adds an encoded query to the other queries that may have been set for this aggregate.
	 *
	 * @param {string} query An encoded query to add to the aggregate.
	 *
	 * @returns {void} Method does not return a value
	 */
	addEncodedQuery(query: string): void
	
	/**
	 *
	 * Adds a not null query to the aggregate.
	 *
	 * @param {string} fieldname The name of the field.
	 *
	 * @returns {GlideQueryCondition} The scoped query condition.
	 */
	addNotNullQuery(fieldname: string): GlideQueryCondition
	
	/**
	 *
	 * Adds a null query to the aggregate.
	 *
	 * @param {string} fieldName The name of the field.
	 *
	 * @returns {GlideQueryCondition} The scoped query condition.
	 */
	addNullQuery(fieldName: string): GlideQueryCondition
	
	/**
	 *
	 * Adds a query to the aggregate.
	 *
	 * @param {string} name The query to add.
	 * @param {string} operator The operator for the query.
	 * @param {string} value The list of values to include in the query.
	 *
	 * @returns {GlideQueryCondition} The query condition.
	 */
	addQuery(name: string, operator: string, value: string): GlideQueryCondition
	
	/**
	 *
	 * Adds a trend for a specified field.
	 *
	 * @param {string} fieldName Name of the field for which trending should occur.
	 * @param {string} timeInterval Time interval for the trend.
	 * 
	 * Valid values:
	 * 
	 * *   date
	 * *   dayofweek
	 * *   hour
	 * *   minute
	 * *   quarter
	 * *   value
	 * *   week
	 * *   year
	 * @param {number} numUnits Optional. Only valid when timeInterval = minute. Number of minutes to include in the trend.
	 * 
	 * Default: 1
	 *
	 * @returns {void} Method does not return a value
	 */
	addTrend(fieldName: string, timeInterval: string, numUnits: number): void
	
	/**
	 *
	 * Returns the value of an aggregate from the current record.
	 *
	 * @param {string} agg The type of the aggregate. For example, `SUM` or `COUNT`.
	 * @param {string} name Name of the field on which to perform the aggregation.
	 *
	 * @returns {string} The value of the aggregation.
	 * 
	 * If the values being aggregated are FX Currency values, the returned value is in the format `<currency_code;currency_value>`, such as: USD;134.980000.
	 * 
	 * Note: If the specified field contains FX Currency values of mixed currency types, the method is not able to aggregate the values and returns a semicolon (;).
	 */
	getAggregate(agg: string, name: string): string
	
	/**
	 *
	 * Gets the query necessary to return the current aggregate.
	 *
	 *
	 * @returns {string} The encoded query to get the aggregate.
	 */
	getAggregateEncodedQuery(): string
	
	/**
	 *
	 * Retrieves the encoded query.
	 *
	 *
	 * @returns {string} The encoded query.
	 */
	getEncodedQuery(): string
	
	/**
	 *
	 * Retrieves the number of rows in the GlideAggregate object.
	 *
	 *
	 * @returns {number} The number of rows in the GlideAggregate object.
	 */
	getRowCount(): number
	
	/**
	 *
	 * Retrieves the table name associated with this GlideAggregate object.
	 *
	 *
	 * @returns {string} The table name.
	 */
	getTableName(): string
	
	/**
	 *
	 * Returns the value of the specified field.
	 *
	 * @param {string} name Name of the field within the current table to return.
	 *
	 * @returns {string} Value of the specified field.
	 */
	getValue(name: string): string
	
	/**
	 *
	 * Provides the name of a field to use in grouping the aggregates.
	 *
	 * May be called numerous times to set multiple group fields.
	 *
	 * @param {string} name Name of the field.
	 *
	 * @returns {void} Method does not return a value
	 */
	groupBy(name: string): void
	
	/**
	 *
	 * Determines if there are any more records in the GlideAggregate object.
	 *
	 *
	 * @returns {boolean} True if there are more results in the query set.
	 */
	hasNext(): boolean
	
	/**
	 *
	 * Moves to the next record in the GlideAggregate.
	 *
	 *
	 * @returns {boolean} True if there are more records in the query set; otherwise, false.
	 */
	next(): boolean
	
	/**
	 *
	 * Orders the aggregates using the value of the specified field. The field will also be added to the group-by list.
	 *
	 * @param {string} name Name of the field to order the aggregates by.
	 *
	 * @returns {void} Method does not return a value
	 */
	orderBy(name: string): void
	
	/**
	 *
	 * Orders the aggregates based on the specified aggregate and field.
	 *
	 * @param {string} agg Type of aggregation.
	 * @param {string} fieldName Name of the field to aggregate.
	 *
	 * @returns {void} Method does not return a value
	 */
	orderByAggregate(agg: string, fieldName: string): void
	
	/**
	 *
	 * Sorts the aggregates in descending order based on the specified field. The field will also be added to the group-by list.
	 *
	 * @param {string} name Name of the field.
	 *
	 * @returns {void} Method does not return a value
	 */
	orderByDesc(name: string): void
	
	/**
	 *
	 * Issues the query and gets the results.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	query(): void
	
	/**
	 *
	 * Sets whether the results are to be grouped.
	 *
	 * @param {boolean} b When true the results are grouped.
	 *
	 * @returns {void} Method does not return a value
	 */
	setGroup(b: boolean): void
	
}

/** 
 * Application properties enable service providers to customize application functionality based on the domain. Instead of only having a single system property (System Property [sys_properties] table) that defines the functionality for all domains and users, application properties can be implemented to define functionality for specific domains.  
 *   
 * To access this API you must activate the Domain Support - Domain Extensions Installer (com.glide.domain.msp_extensions.installer) plugin.  
 *   
 * For additional information on domain-specific application properties, see [Domain-separated application properties](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/company-and-domain-separation/concept/ds-application-properties.html).
 * 
 */
declare class GlideApplicationProperty {

	/**
	 *
	 * Returns the value for the specified application property and domain sys_id.
	 *
	 * The list of available application properties is located in the Application Properties [sys_application_property] and Application Property Values [sys_application_property_value] tables.
	 * 	 * 
	 * 	 * Note: If the specified domain is a child domain, and there is not an application property for the child domain, the method returns the parent domain application property, if available.
	 *
	 * @param {string} name Name of the application property to return.
	 * 
	 * Note: If the application is not global, you must prefix the name of the sys_application_property with the application's scope.
	 * @param {string} domainSysId Optional. Sys_id of the domain associated with the application property.
	 * 
	 * Default: Session domain
	 *
	 * @returns {string} Value of the specified application property for the specified domain. If domainSysId is not passed in the call, then returns the session domain.
	 * 
	 * If the specified application property doesn’t exist, returns the same-name system property value.
	 * 
	 * If the user does not have access rights to the specified domain, throws an exception and no value is returned.
	 */
	getValue(name: string, domainSysId: string): string
	
	/**
	 *
	 * Stores the specified value in the specified application property for the specified domain, or the current session domain if not specified.
	 *
	 * The following are guidelines for using this method:
	 * 	 * 
	 * 	 * *   The application property is not created if its name contains one of the following strings:
	 * 	 *     *   glide.properties.blacklist
	 * 	 *     *   glide.properties.no_db_override
	 * 	 *     *   glide.properties.safe_overrides
	 * 	 *     *   glide.properties.maint_write_roles
	 * 	 * *   The application property is not created if there is an existing system property with the same name, and the system property is marked as private.
	 * 	 * *   The application property is not created if there is an existing system property and the application property does not reference it.
	 * 	 * *   The name of the application property in the sys_application_property table is prefixed with the application's scope if it is not global.
	 * 	 * *   This method cannot be called from a different scope.
	 *
	 * @param {string} name Name of the application property to save.
	 * 
	 * Note: If the application is not global, you must prefix the name of the sys_application_property with the application's scope.
	 * @param {string} value Value to store in the specified application property.
	 * @param {string} domainSysId Optional. Sys_id of the domain associated with the application property.
	 * 
	 * Default: Current session domain
	 *
	 * @returns {boolean} Flag that indicates whether the save operation was successful.
	 * 
	 * Valid values:
	 * 
	 * *   true: Value was successfully saved.
	 * *   false: An error occurred and the application property was not created/updated.
	 * 
	 * If the user does not have access rights to the specified domain, throws an exception and no value is returned.
	 */
	setValue(name: string, value: string, domainSysId: string): boolean
	
}

/** 
 * Use the GlideCalendarDateTime methods to perform date-time operations, such as instantiating a GlideCalendarDateTime object, performing date-time calculations, formatting a date-time, or converting between date-time formats.
 * 
 */
declare class GlideCalendarDateTime {

	/**
	 *
	 * @param {string} dateTime UTC date and time using the format yyyy-MM-dd HH:mm:ss.
	 *
	 */
	constructor(dateTime: string)
	
	/**
	 *
	 * Adds a GlideTime object to the current GlideCalendarDateTime object.
	 *
	 * @param {GlideTime} time Time to add.
	 *
	 * @returns {void} Method does not return a value
	 */
	add(time: GlideTime): void
	
	/**
	 *
	 * Adds a specified number of milliseconds to the GlideCalendarDateTime object.
	 *
	 * @param {number} milliseconds Number of milliseconds to add
	 *
	 * @returns {void} Method does not return a value
	 */
	add(milliseconds: number): void
	
	/**
	 *
	 * Adds a specified number of days to the current GlideCalendarDateTime object. A negative parameter subtracts days.
	 *
	 * The method determines the local date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts days using the local date and time values.
	 *
	 * @param {number} days Number of days to add. Use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addDaysLocalTime(days: number): void
	
	/**
	 *
	 * Adds a specified number of days to the current GlideCalendarDateTime object. A negative parameter subtracts days.
	 *
	 * The method determines the UTC date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts days using the UTC date and time values.
	 *
	 * @param {number} days Number of days to add. Use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addDaysUTC(days: number): void
	
	/**
	 *
	 * Adds a specified number of months to the current GlideCalendarDateTime object. A negative parameter subtracts months.
	 *
	 * The method determines the local date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts months using the local date and time values.
	 *
	 * @param {number} months Number of months to add. Use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addMonthsLocalTime(months: number): void
	
	/**
	 *
	 * Adds a specified number of months to the current GlideCalendarDateTime object. A negative parameter subtracts months.
	 *
	 * The method determines the UTC date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts months using the UTC date and time values.
	 *
	 * @param {number} months Number of months to add. Use a negative number to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addMonthsUTC(months: number): void
	
	/**
	 *
	 * Adds a specified number of seconds to the GlideCalendarDateTime object.
	 *
	 * @param {number} seconds Number of seconds to add
	 *
	 * @returns {void} Method does not return a value
	 */
	addSeconds(seconds: number): void
	
	/**
	 *
	 * Adds a specified number of weeks to the current GlideCalendarDateTime object. A negative parameter subtracts weeks.
	 *
	 * The method determines the local date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts weeks using the local date and time values.
	 *
	 * @param {number} weeks Number of weeks to add. Use a negative number to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addWeeksLocalTime(weeks: number): void
	
	/**
	 *
	 * Adds a specified number of weeks to the current GlideCalendarDateTime object. A negative parameter subtracts weeks.
	 *
	 * The method determines the UTC date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts weeks using the UTC date and time values.
	 *
	 * @param {number} weeks Number of weeks to add. Use a negative number to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addWeeksUTC(weeks: number): void
	
	/**
	 *
	 * Adds a specified number of years to the current GlideCalendarDateTime object. A negative parameter subtracts years.
	 *
	 * The method determines the local date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts years using the local date and time values.
	 *
	 * @param {number} years Number of years to add. To subtract use a negative value.
	 *
	 * @returns {void} Method does not return a value
	 */
	addYearsLocalTime(years: number): void
	
	/**
	 *
	 * Adds a specified number of years to the current GlideCalendarDateTime object. A negative parameter subtracts years.
	 *
	 * The date and time value stored by GlideCalendarDateTime object is interpreted as being in the UTC time zone.
	 *
	 * @param {number} years Number of years to add. Use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addYearsUTC(years: number): void
	
	/**
	 *
	 * Determines if the GlideCalendarDateTime object's date and time occurs after the specified GlideCalendarDateTime object's date and time.
	 *
	 * @param {GlideCalendarDateTime} gdt Date and time to check against.
	 *
	 * @returns {boolean} Flag that indicates whether the GlideCalendarDateTime object's date and time is after the date and time specified by the parameter.
	 * 
	 * Possible values:
	 * 
	 * *   true: GlideCalendarDateTime object date and time is after the specified object's date and time.
	 * *   false: GlideCalendarDateTime object date and time is before or equal to the specified object's date and time.
	 */
	after(gdt: GlideCalendarDateTime): boolean
	
	/**
	 *
	 * Determines if the GlideCalendarDateTime object's date and time occurs before the specified GlideCalendarDateTime object's date and time.
	 *
	 * @param {GlideCalendarDateTime} gdt Date and time to check against.
	 *
	 * @returns {boolean} Flag that indicates whether the GlideCalendarDateTime object's date and time is before the date and time specified by the parameter.
	 * 
	 * Possible values:
	 * 
	 * *   true: GlideCalendarDateTime object date and time is before the specified object's date and time.
	 * *   false: GlideCalendarDateTime object date and time is after or equal to the specified object's date and time.
	 */
	before(gdt: GlideCalendarDateTime): boolean
	
	/**
	 *
	 * Compares two date and time objects to determine whether one occurs before the other or if they are equivalent.
	 *
	 * @param {{[fieldName: string]: string}} dateTime Date time in a GlideCalendarDateTime object.
	 *
	 * @returns {number} *   0 = Dates are equal
	 * *   1 = Object's date is after the date specified in the parameter
	 * *   -1 = Object's date is before the date specified in the parameter
	 */
	compareTo(dateTime: {[fieldName: string]: string}): number
	
	/**
	 *
	 * Compares an object with an existing value for equality.
	 *
	 * @param {{[fieldName: string]: string}} GCDT Object to compare. Can be a GlideCalendarDateTime object or a valid date time string.
	 *
	 * @returns {boolean} True if they are equal, false otherwise.
	 */
	equals(GCDT: {[fieldName: string]: string}): boolean
	
	/**
	 *
	 * Returns the date stored by the GlideCalendarDateTime object, expressed in the standard format, yyyy-MM-dd, and the system time zone, UTC by default.
	 *
	 *
	 * @returns {GlideDate} Date in the system time zone.
	 */
	getDate(): GlideDate
	
	/**
	 *
	 * Returns the day of the month stored by the GlideCalendarDateTime object, expressed in the current user's time zone.
	 *
	 *
	 * @returns {number} Day of the month in the user's time zone, from 1 to 31.
	 */
	getDayOfMonthLocalTime(): number
	
	/**
	 *
	 * Gets the day of the month stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} Day of the month in the UTC time zone, from 1 to 31.
	 */
	getDayOfMonthUTC(): number
	
	/**
	 *
	 * Returns the day of the week stored by the GlideCalendarDateTime object, expressed in the user's time zone.
	 *
	 *
	 * @returns {number} Day of the week value - Monday = 1, ... Sunday = 7
	 */
	getDayOfWeekLocalTime(): number
	
	/**
	 *
	 * Returns the day of the week stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} Day of the week value - Monday = 1, ... Sunday = 7
	 */
	getDayOfWeekUTC(): number
	
	/**
	 *
	 * Returns the number of days in the month stored by the GlideCalendarDateTime object, expressed in the current user's time zone.
	 *
	 *
	 * @returns {number} Number of days in the current month in the user's time zone.
	 */
	getDaysInMonthLocalTime(): number
	
	/**
	 *
	 * Returns the number of days in the month stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} Number of days in the month stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
	 */
	getDaysInMonthUTC(): number
	
	/**
	 *
	 * Returns the date and time value in the current user's display format and time zone. Referring to the GlideCalendarDateTime object directly returns the date and time value in the GMT time zone.
	 *
	 *
	 * @returns {string} Date and time in the user's format and time zone. Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
	 */
	getDisplayValue(): string
	
	/**
	 *
	 * Returns the display value in the internal format (yyyy-MM-dd HH:mm:ss).
	 *
	 * This method is useful for date/time fields, but not for date fields.
	 *
	 *
	 * @returns {string} Date and time values for the GlideCalendarDateTime object in the current user's time zone and the internal date and time format of yyyy-MM-dd HH:mm:ss.
	 */
	getDisplayValueInternal(): string
	
	/**
	 *
	 * Returns the amount of time that daylight saving time is offset.
	 *
	 *
	 * @returns {number} Amount of time, in milliseconds, that daylight saving is offset. Returns 0 if there is no offset or if the time is not during daylight saving time.
	 */
	getDSTOffset(): number
	
	/**
	 *
	 * Returns the current error message.
	 *
	 *
	 * @returns {string} Error message
	 */
	getErrorMsg(): string
	
	/**
	 *
	 * Returns the object's time in the local time zone and in the internal format.
	 *
	 *
	 * @returns {string} Object's time in the local time zone and the internal format.
	 */
	getInternalFormattedLocalTime(): string
	
	/**
	 *
	 * Returns the date stored by the GlideCalendarDateTime object, expressed in the standard format, yyyy-MM-dd, and the current user's time zone.
	 *
	 *
	 * @returns {GlideDate} Date in the user's time zone.
	 */
	getLocalDate(): GlideDate
	
	/**
	 *
	 * Returns the time in the user's time zone.
	 *
	 *
	 * @returns {GlideTime} Time in the user's time zone.
	 */
	getLocalTime(): GlideTime
	
	/**
	 *
	 * Returns the month stored by the GlideCalendarDateTime object, expressed in the current user's time zone.
	 *
	 *
	 * @returns {number} Numerical value of the month, Jan=1, Dec=12.
	 */
	getMonthLocalTime(): number
	
	/**
	 *
	 * Returns the month stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} Numerical value of the month, Jan=1, Dec=12.
	 */
	getMonthUTC(): number
	
	/**
	 *
	 * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT.
	 *
	 *
	 * @returns {number} Number of milliseconds since January 1, 1970, 00:00:00 GMT.
	 */
	getNumericValue(): number
	
	/**
	 *
	 * Returns the Unix duration stamp.
	 *
	 *
	 * @returns {GlideTime} Unix duration stamp in system format based on GMT time.
	 */
	getTime(): GlideTime
	
	/**
	 *
	 * Returns the time zone offset in milliseconds.
	 *
	 *
	 * @returns {number} Number of milliseconds of the time zone offset
	 */
	getTZOffset(): number
	
	/**
	 *
	 * Returns the object's time in local time zone in the user's format.
	 *
	 *
	 * @returns {string} Object's time in local time and the user's format.
	 */
	getUserFormattedLocalTime(): string
	
	/**
	 *
	 * Returns the date and time value stored by the GlideCalendarDateTime object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone; UTC by default.
	 *
	 *
	 * @returns {string} Date and time in the internal format and system time zone.
	 */
	getValue(): string
	
	/**
	 *
	 * Returns the number of the week stored by the GlideCalendarDateTime object, expressed in the current user's time zone.
	 *
	 * All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
	 *
	 *
	 * @returns {number} Number of the current week. The highest week number in a year is either 52 or 53.
	 */
	getWeekOfYearLocalTime(): number
	
	/**
	 *
	 * Returns the number of the week stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
	 *
	 * All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
	 *
	 *
	 * @returns {number} Number of the current week in UTC time. The highest week number in a year is either 52 or 53.
	 */
	getWeekOfYearUTC(): number
	
	/**
	 *
	 * Returns the year stored by the GlideCalendarDateTime object, expressed in the current user's time zone.
	 *
	 *
	 * @returns {number} Four-digit year value in the user's time zone.
	 */
	getYearLocalTime(): number
	
	/**
	 *
	 * Returns the year stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} Four-digit year value in the UTC time zone.
	 */
	getYearUTC(): number
	
	/**
	 *
	 * Determines if an object's date is set.
	 *
	 *
	 * @returns {boolean} True if the object's date is set, false otherwise.
	 */
	hasDate(): boolean
	
	/**
	 *
	 * Determines if the object's time uses a daylight saving offset
	 *
	 *
	 * @returns {boolean} True if the time is daylight saving time, false otherwise.
	 */
	isDST(): boolean
	
	/**
	 *
	 * Determines if a value is a valid date and time.
	 *
	 *
	 * @returns {boolean} True if value is valid, false otherwise.
	 */
	isValid(): boolean
	
	/**
	 *
	 * Determines if the GlideCalendarDateTime object's data and time occurs on or after the specified GlideCalendarDateTime object's date and time.
	 *
	 * @param {GlideCalendarDateTime} gdt Date and time to check against.
	 *
	 * @returns {boolean} Flag that indicates whether the GlideCalendarDateTime object's date and time is on or after the date and time specified by the parameter.
	 * 
	 * Possible values:
	 * 
	 * *   true: GlideCalendarDateTime object date and time is on or after the specified object's date and time.
	 * *   false: GlideCalendarDateTime object date and time is before the specified object's date and time.
	 */
	onOrAfter(gdt: GlideCalendarDateTime): boolean
	
	/**
	 *
	 * Determines if the GlideCalendarDateTime object's data and time occurs on or before the specified GlideCalendarDateTime object's date and time.
	 *
	 * @param {GlideCalendarDateTime} gdt Date and time to check against.
	 *
	 * @returns {boolean} Flag that indicates whether the GlideCalendarDateTime object's date and time is on or before the date and time specified by the parameter.
	 * 
	 * Possible values:
	 * 
	 * *   true: GlideCalendarDateTime object date and time is on or before the specified object's date and time.
	 * *   false: GlideCalendarDateTime object date and time is after the specified object's date and time.
	 */
	onOrBefore(gdt: GlideCalendarDateTime): boolean
	
	/**
	 *
	 * Sets the day of the month to a specified value in the current user's time zone.
	 *
	 * @param {number} day Day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last day of the month.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDayOfMonthLocalTime(day: number): void
	
	/**
	 *
	 * Sets the day of the month to a specified value in the UTC time zone.
	 *
	 * @param {number} day Day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last day of the month.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDayOfMonthUTC(day: number): void
	
	/**
	 *
	 * Sets a date and time value using the current user's display format and time zone.
	 *
	 * @param {string} asDisplayed Date and time in the current user's display format and time zone.
	 * 
	 * The parameter must be formatted using the current user's preferred display format, such as MM-dd-yyyy HH:mm:ss.
	 * 
	 * To assign the current date and time to a variable in a workflow script, use `<variable>.setDisplayValue(gs.nowDateTime)`.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValue(asDisplayed: string): void
	
	/**
	 *
	 * Sets a date and time value using the current user's time zone and the specified date and time format.
	 *
	 * This method throws a runtime exception if the date and time format in the dateTime parameter does not match the format parameter. You can retrieve the error message by calling getErrorMsg() on the GlideCalendarDateTime object after the exception is caught.
	 *
	 * @param {string} dateTime Date and time in the current user's time zone.
	 * @param {string} format Format to use to parse the dateTime parameter.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValue(dateTime: string, format: string): void
	
	/**
	 *
	 * Sets a date and time value using the internal format (yyyy-MM-dd HH:mm:ss) and the current user's time zone.
	 *
	 * @param {string} dateTime Date and time in internal format
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValueInternal(dateTime: string): void
	
	/**
	 *
	 * Sets the date and time of the current object using an existing GlideCalendarDateTime object.
	 *
	 * This method is equivalent to instantiating a new object with a GlideCalendarDateTime parameter.
	 *
	 * @param {GlideCalendarDateTime} gcDT GlideCalendarDateTime object
	 *
	 * @returns {void} Method does not return a value
	 */
	setGlideDateTime(gcDT: GlideCalendarDateTime): void
	
	/**
	 *
	 * Sets the month stored by the GlideCalendarDateTime object to a specified value using the current user's time zone.
	 *
	 * @param {number} month Month to change to.
	 *
	 * @returns {void} Method does not return a value
	 */
	setMonthLocalTime(month: number): void
	
	/**
	 *
	 * Sets the month stored by the GlideCalendarDateTime object to a specified value using the UTC time zone.
	 *
	 * @param {number} month Month to change to.
	 *
	 * @returns {void} Method does not return a value
	 */
	setMonthUTC(month: number): void
	
	/**
	 *
	 * Sets the date and time of the GlideCalendarDateTime object.
	 *
	 * This method is equivalent to setInitialValue().
	 *
	 * @param {{[fieldName: string]: string}} dateTime Date and time to use. This parameter may be one of several types.
	 * 
	 * *   A string in the UTC time zone and the internal format of yyyy-MM-dd HH:mm:ss: sets the value of the object to the specified date and time.
	 *     
	 *     Using the method this way is equivalent to instantiating a new GlideCalendarDateTime object using the `GlideCalendarDateTime(value)` constructor.
	 *     
	 *     If the date and time format used does not match the internal format, the method attempts to set the date and time using other available formats. Resolving the date and time this way can lead to inaccurate data due to ambiguity in the day and month values. When using a non-standard date and time format, use `setValue(dt, format)` instead.
	 *     
	 * *   A GlideCalendarDateTime object: sets the value of the object to the date and time stored by the GlideCalendarDateTime passed in the parameter.
	 *     
	 *     Using the method this way is equivalent to instantiating a new GlideCalendarDateTime object using the `GlideCalendarDateTime(g)` constructor.
	 *     
	 * *   A Java Date object: sets the value of the object using the value stored by the Java Date object.
	 *     
	 *     Using the method this way is equivalent to passing the value returned by the Java Date object getTime() to the GlideCalendarDateTime setNumericValue() method. This method does not accept JavaScript Date objects.
	 *     
	 * *   A JavaScript Number: sets the value of the object using the Number value as milliseconds past January 1, 1970 00:00:00 GMT.
	 *     
	 *     Using the method this way is equivalent to the `setNumericValue(milliseconds)` method.
	 *     
	 * *   A Java Integer or Long: sets the value of the object using the Integer or Long value as milliseconds past January 1, 1970 00:00:00 GMT.
	 *     
	 *     Using the method this way is equivalent to the `setNumericValue(milliseconds)` method.
	 *
	 * @returns {void} Method does not return a value
	 */
	setValue(dateTime: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Sets a date and time value using the UTC time zone and the specified date and time format.
	 *
	 * This method throws a runtime exception if the date and time format used in the dateTime parameter does not match the format parameter. You can retrieve the error message by calling getErrorMsg() on the GlideCalendarDateTime object after the exception is caught.
	 *
	 * @param {string} dateTime Date and time to use.
	 * @param {string} format Format to use.
	 *
	 * @returns {void} Method does not return a value
	 */
	setValueUTC(dateTime: string, format: string): void
	
	/**
	 *
	 * Sets the year stored by the GlideCalendarDateTime object to a specified value using the current user's time zone.
	 *
	 * @param {number} year Year to change to.
	 *
	 * @returns {void} Method does not return a value
	 */
	setYearLocalTime(year: number): void
	
	/**
	 *
	 * Sets the year stored by the GlideCalendarDateTime object to a specified value using the UTC time zone.
	 *
	 * @param {number} year Year to change to.
	 *
	 * @returns {void} Method does not return a value
	 */
	setYearUTC(year: number): void
	
	/**
	 *
	 * Returns the duration difference between two GlideCalendarDateTime values.
	 *
	 * @param {GlideCalendarDateTime} start Start value.
	 * @param {GlideCalendarDateTime} end End value.
	 *
	 * @returns {GlideDuration} Time between the two values.
	 */
	subtract(start: GlideCalendarDateTime, end: GlideCalendarDateTime): GlideDuration
	
	/**
	 *
	 * Subtracts a specified amount of time.
	 *
	 * @param {GlideTime} time Time to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	subtract(time: GlideTime): void
	
	/**
	 *
	 * Subtracts a specified number of milliseconds from the GlideCalendarDateTime object.
	 *
	 * @param {number} milliseconds Number of milliseconds to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	subtract(milliseconds: number): void
	
	/**
	 *
	 * Returns the date and time value stored by the GlideCalendarDateTime object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone; UTC by default.
	 *
	 * This method is equivalent to getValue().
	 *
	 *
	 * @returns {string} Date and time stored by the GlideCalendarDateTime object in the system time zone and format.
	 */
	toString(): string
	
}

/** 
 */
declare class GlideDate {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Gets the date in the specified date format.
	 *
	 * @param {string} format Desired date format using Java [SimpleDateFormat](https://docs.oracle.com/javase/10/docs/api/java/text/SimpleDateFormat.html). For example, `"dd-MM-yyyy"` to get the day, month, and year, or `"EEEE"` to get the day of the week.
	 *
	 * @returns {string} Date value for the GlideDate object in the specified format.
	 */
	getByFormat(format: string): string
	
	/**
	 *
	 * Gets the day of the month stored by the GlideDate object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} The day of the month in the UTC time zone, from 1 to 31.
	 */
	getDayOfMonthNoTZ(): number
	
	/**
	 *
	 * Gets the date in the current user's display format and time zone.
	 *
	 *
	 * @returns {string} Date value for the GlideDate object in the current user's display format and time zone. Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
	 */
	getDisplayValue(): string
	
	/**
	 *
	 * Gets the date in the internal format (yyyy-MM-dd) and current user's timezone.
	 *
	 *
	 * @returns {string} Date value for the GlideDate object in the current user's time zone.
	 * 
	 * Format: yyyy-MM-dd
	 */
	getDisplayValueInternal(): string
	
	/**
	 *
	 * Gets the month stored by the GlideDate object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} The numerical value of the month from 1 to 12.
	 */
	getMonthNoTZ(): number
	
	/**
	 *
	 * Gets the date in the internal format (yyyy-MM-dd) and the system time zone (UTC by default).
	 *
	 *
	 * @returns {string} The date value for the GlideDate object in the system time zone.
	 * 
	 * Format: yyyy-MM-dd
	 */
	getValue(): string
	
	/**
	 *
	 * Gets the year stored by the GlideDate object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} The numerical value of the year.
	 */
	getYearNoTZ(): number
	
	/**
	 *
	 * Sets a date value using the current user's display format and time zone.
	 *
	 * @param {string} asDisplayed Date in the current user's display format and time zone.
	 * 
	 * Format: Must be formatted using the current user's preferred display format, such as yyyy-MM-dd.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValue(asDisplayed: string): void
	
	/**
	 *
	 * Sets the date of the current GlideDate object.
	 *
	 * @param {string} o Date and time to set in the current GlideDate object.
	 *
	 * @returns {void} Method does not return a value
	 */
	setValue(o: string): void
	
	/**
	 *
	 * Gets the duration difference between two GlideDate values.
	 *
	 * @param {GlideDate} start The start value.
	 * @param {GlideDate} end The end value.
	 *
	 * @returns {GlideDuration} The duration between the two values.
	 */
	subtract(start: GlideDate, end: GlideDate): GlideDuration
	
}

/** 
 * Use the GlideDateTime methods to perform date-time operations, such as instantiating a GlideDateTime object, performing date-time calculations, formatting a date-time, or converting between date-time formats.
 * 
 */
declare class GlideDateTime {

	/**
	 *
	 * @param {string} value A UTC date and time using the internal format yyyy-MM-dd HH:mm:ss.
	 *
	 */
	constructor(value: string)
	
	/**
	 *
	 * Adds a GlideTime object to the current GlideDateTime object.
	 *
	 * @param {GlideTime} gd GlideTime object whose time value to add to the specified GlideDateTime object.
	 *
	 * @returns {void} Method does not return a value
	 */
	add(gd: GlideTime): void
	
	/**
	 *
	 * Adds the specified number of milliseconds to the current GlideDateTime object.
	 *
	 * @param {number} milliseconds The number of milliseconds to add.
	 *
	 * @returns {void} Method does not return a value
	 */
	add(milliseconds: number): void
	
	/**
	 *
	 * Adds a specified number of days to the current GlideDateTime object. A negative parameter subtracts days. The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts days using the local date and time values.
	 *
	 * @param {number} days The number of days to add. Use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addDaysLocalTime(days: number): void
	
	/**
	 *
	 * Adds a specified number of days to the current GlideDateTime object. A negative parameter subtracts days. The method determines the UTC date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts days using the UTC date and time values.
	 *
	 * @param {number} days The number of days to add. Use a negative number to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addDaysUTC(days: number): void
	
	/**
	 *
	 * Adds a specified number of months to the current GlideDateTime object. A negative parameter subtracts months. The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts months using the local date and time values.
	 *
	 * @param {number} months The number of months to add. use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addMonthsLocalTime(months: number): void
	
	/**
	 *
	 * Adds a specified number of months to the current GlideDateTime object. A negative parameter subtracts months. The method determines the UTC date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts months using the UTC date and time values.
	 *
	 * @param {number} months The number of months to add. Use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addMonthsUTC(months: number): void
	
	/**
	 *
	 * Adds the specified number of seconds to the current GlideDateTime object.
	 *
	 * @param {number} seconds The number of seconds to add.
	 *
	 * @returns {void} Method does not return a value
	 */
	addSeconds(seconds: number): void
	
	/**
	 *
	 * Adds a specified number of weeks to the current GlideDateTime object. A negative parameter subtracts weeks. The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts weeks using the local date and time values.
	 *
	 * @param {number} weeks The number of weeks to add. Use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addWeeksLocalTime(weeks: number): void
	
	/**
	 *
	 * Adds a specified number of weeks to the current GlideDateTime object. A negative parameter subtracts weeks. The method determines the UTC date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts weeks using the UTC date and time values.
	 *
	 * @param {number} weeks The number of weeks to add. Use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addWeeksUTC(weeks: number): void
	
	/**
	 *
	 * Adds a specified number of years to the current GlideDateTime object. A negative parameter subtracts years. The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts years using the local date and time values.
	 *
	 * @param {number} years The number of years to add. Use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addYearsLocalTime(years: number): void
	
	/**
	 *
	 * Adds a specified number of years to the current GlideDateTime object. A negative parameter subtracts years. The date and time value stored by GlideDateTime object is interpreted as being in the UTC time zone.
	 *
	 * @param {number} years The number of years to add. Use a negative value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	addYearsUTC(years: number): void
	
	/**
	 *
	 * Determines if the GlideDateTime object's date and time occurs after the specified object's date and time.
	 *
	 * @param {GlideDateTime} gdt Date and time to check against.
	 *
	 * @returns {boolean} Flag that indicates whether the GlideDateTime object's date and time is after the date and time specified by the parameter.
	 * 
	 * Possible values:
	 * 
	 * *   true: GlideDateTime object date and time is after the specified object's date and time.
	 * *   false: GlideDateTime object date and time is before or equal to the specified object's date and time.
	 */
	after(gdt: GlideDateTime): boolean
	
	/**
	 *
	 * Determines if the GlideDateTime object's date and time occurs before the specified GlideDateTime object's date and time.
	 *
	 * @param {GlideDateTime} gdt Date and time to check against.
	 *
	 * @returns {boolean} Flag that indicates whether the GlideDateTime object's date and time is before the date and time specified by the parameter.
	 * 
	 * Possible values:
	 * 
	 * *   true: GlideDateTime object date and time is before the specified date and time.
	 * *   false: GlideDateTime object date and time is after or equal to the specified date and time.
	 */
	before(gdt: GlideDateTime): boolean
	
	/**
	 *
	 * Compares two date and time objects to determine whether they are equivalent or one occurs before or after the other.
	 *
	 * @param {{[fieldName: string]: string}} o Date and time object in GlideDateTime format
	 *
	 * @returns {number} *   0 = Dates are equal
	 * *   1 = The object's date is after the date specified in the parameter
	 * *   -1 = The object's date is before the date specified in the parameter
	 */
	compareTo(o: {[fieldName: string]: string}): number
	
	/**
	 *
	 * Compares a datetime with an existing value for equality.
	 *
	 * @param {{[fieldName: string]: string}} dateTime The datetime to compare.
	 *
	 * @returns {boolean} Returns true if they are equal; otherwise, false.
	 */
	equals(dateTime: {[fieldName: string]: string}): boolean
	
	/**
	 *
	 * Gets the date stored by the GlideDateTime object, expressed in the standard format, yyyy-MM-dd, and the system time zone, UTC by default.
	 *
	 *
	 * @returns {GlideDate} The date in the system time zone.
	 */
	getDate(): GlideDate
	
	/**
	 *
	 * Gets the day of the month stored by the GlideDateTime object, expressed in the current user's time zone.
	 *
	 *
	 * @returns {number} The day of the month in the user's time zone, from 1 to 31.
	 */
	getDayOfMonthLocalTime(): number
	
	/**
	 *
	 * Gets the day of the month stored by the GlideDateTime object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} The day of the month in the UTC time zone, from 1 to 31.
	 */
	getDayOfMonthUTC(): number
	
	/**
	 *
	 * Gets the day of the week stored by the GlideDateTime object, expressed in the user's time zone.
	 *
	 *
	 * @returns {number} The day of week value, in the user's time zone, from 1 to 7. Monday equals 1, Sunday equals 7.
	 */
	getDayOfWeekLocalTime(): number
	
	/**
	 *
	 * Gets the day of the week stored by the GlideDateTime object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} The day of week value from 1 to 7. Monday equals 1, Sunday equals 7.
	 */
	getDayOfWeekUTC(): number
	
	/**
	 *
	 * Gets the number of days in the month stored by the GlideDateTime object, expressed in the current user's time zone.
	 *
	 *
	 * @returns {number} The number of days in the current month in the user's time zone.
	 */
	getDaysInMonthLocalTime(): number
	
	/**
	 *
	 * Gets the number of days in the month stored by the GlideDateTime object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} The number of days in the month stored by the GlideDateTime object, expressed in the UTC time zone.
	 */
	getDaysInMonthUTC(): number
	
	/**
	 *
	 * Gets the date and time value in the current user's display format and time zone.
	 *
	 *
	 * @returns {string} The date and time in the user's format and time zone. Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
	 */
	getDisplayValue(): string
	
	/**
	 *
	 * Gets the display value in the internal format (yyyy-MM-dd HH:mm:ss).
	 *
	 *
	 * @returns {string} The date and time values for the GlideDateTime object in the current user's time zone and the internal date and time format of `yyyy-MM-dd HH:mm:ss`.
	 */
	getDisplayValueInternal(): string
	
	/**
	 *
	 * Gets the amount of time that daylight saving time is offset.
	 *
	 *
	 * @returns {number} Amount of time, in milliseconds, that daylight saving is offset. Returns 0 if there is no offset or if the time is not during daylight saving time.
	 */
	getDSTOffset(): number
	
	/**
	 *
	 * Gets the current error message.
	 *
	 *
	 * @returns {string} The error message.
	 */
	getErrorMsg(): string
	
	/**
	 *
	 * Returns the object's time in the local time zone and in the internal format.
	 *
	 *
	 * @returns {string} The object's time in the local time zone and the internal format.
	 */
	getInternalFormattedLocalTime(): string
	
	/**
	 *
	 * Gets the date stored by the GlideDateTime object, expressed in the standard format, yyyy-MM-dd, and the current user's time zone.
	 *
	 *
	 * @returns {GlideDate} The date in the user's time zone.
	 */
	getLocalDate(): GlideDate
	
	/**
	 *
	 * Returns a GlideTime object that represents the time portion of the GlideDateTime object in the user's time zone.
	 *
	 *
	 * @returns {GlideTime} The time in the user's time zone.
	 */
	getLocalTime(): GlideTime
	
	/**
	 *
	 * Gets the month stored by the GlideDateTime object, expressed in the current user's time zone.
	 *
	 *
	 * @returns {number} The numerical value of the month.
	 */
	getMonthLocalTime(): number
	
	/**
	 *
	 * Gets the month stored by the GlideDateTime object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} The numerical value of the month.
	 */
	getMonthUTC(): number
	
	/**
	 *
	 * Gets the number of milliseconds since January 1, 1970, 00:00:00 GMT.
	 *
	 *
	 * @returns {number} The number of milliseconds since January 1, 1970, 00:00:00 GMT.
	 */
	getNumericValue(): number
	
	/**
	 *
	 * Returns a GlideTime object that represents the time portion of the GlideDateTime object.
	 *
	 *
	 * @returns {GlideTime} The Unix duration stamp in system format based on GMT time.
	 */
	getTime(): GlideTime
	
	/**
	 *
	 * Gets the time zone offset in milliseconds.
	 *
	 *
	 * @returns {number} The number of milliseconds of time zone offset.
	 */
	getTZOffset(): number
	
	/**
	 *
	 * Returns the object's time in the local time zone and in the user's format.
	 *
	 *
	 * @returns {string} The object's time in the local time zone and in the user's format.
	 */
	getUserFormattedLocalTime(): string
	
	/**
	 *
	 * Gets the date and time value stored by the GlideDateTime object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone, UTC by default.
	 *
	 *
	 * @returns {string} The date and time value in the internal format and system time zone.
	 */
	getValue(): string
	
	/**
	 *
	 * Gets the number of the week stored by the GlideDateTime object, expressed in the current user's time zone. All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
	 *
	 *
	 * @returns {number} The number of the current week in local time. The highest week number in a year is either 52 or 53.
	 */
	getWeekOfYearLocalTime(): number
	
	/**
	 *
	 * Gets the number of the week stored by the GlideDateTime object, expressed in the UTC time zone. All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
	 *
	 *
	 * @returns {number} The number of the current week in UTC time. The highest week number in a year is either 52 or 53.
	 */
	getWeekOfYearUTC(): number
	
	/**
	 *
	 * Gets the year stored by the GlideDateTime object, expressed in the current user's time zone.
	 *
	 *
	 * @returns {number} Four-digit year value in the user's time zone.
	 */
	getYearLocalTime(): number
	
	/**
	 *
	 * Gets the year stored by the GlideDateTime object, expressed in the UTC time zone.
	 *
	 *
	 * @returns {number} 4-digit year value in the UTC time zone.
	 */
	getYearUTC(): number
	
	/**
	 *
	 * Determines if an object's date is set.
	 *
	 *
	 * @returns {boolean} True if the object date is set; otherwise, returns false.
	 */
	hasDate(): boolean
	
	/**
	 *
	 * Determines if an object's time uses a daylight saving offset.
	 *
	 *
	 * @returns {boolean} True if the time is daylight saving; otherwise, returns false.
	 */
	isDST(): boolean
	
	/**
	 *
	 * Determines if a value is a valid date and time.
	 *
	 *
	 * @returns {boolean} True if value is valid; otherwise, returns false.
	 */
	isValid(): boolean
	
	/**
	 *
	 * Determines if the GlideDateTime object's data and time occurs on or after the specified GlideDateTime object's date and time.
	 *
	 * @param {GlideDateTime} gdt Date and time to check against.
	 *
	 * @returns {boolean} Flag that indicates whether the GlideDateTime object's date and time is on or after the date and time specified by the parameter.
	 * 
	 * Possible values:
	 * 
	 * *   true: GlideDateTime object date and time is on or after the specified object's date and time.
	 * *   false: GlideDateTime object date and time is before the specified object's date and time.
	 */
	onOrAfter(gdt: GlideDateTime): boolean
	
	/**
	 *
	 * Determines if the GlideDateTime object's data and time occurs on or before the specified GlideDateTime object's date and time.
	 *
	 * @param {GlideDateTime} gdt Date and time to check against.
	 *
	 * @returns {boolean} Flag that indicates whether the GlideDateTime object's date and time is on or before the date and time specified by the parameter.
	 * 
	 * Possible values:
	 * 
	 * *   true: GlideDateTime object date and time is on or before the specified object's date and time.
	 * *   false: GlideDateTime object date and time is after the specified object's date and time.
	 */
	onOrBefore(gdt: GlideDateTime): boolean
	
	/**
	 *
	 * Sets the day of the month to a specified value in the current user's time zone.
	 *
	 * @param {number} day The day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last day of the month.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDayOfMonthLocalTime(day: number): void
	
	/**
	 *
	 * Sets the day of the month to a specified value in the UTC time zone.
	 *
	 * @param {number} day The day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last day of the month.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDayOfMonthUTC(day: number): void
	
	/**
	 *
	 * Sets a date and time value using the current user's display format and time zone.
	 *
	 * @param {string} asDisplayed The date and time in the current user's display format and time zone. The parameter must be formatted using the current user's preferred display format, such as MM-dd-yyyy HH:mm:ss. To assign the current date and time to a variable in a workflow script, use variable`.setDisplayValue(gs.nowDateTime);`.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValue(asDisplayed: string): void
	
	/**
	 *
	 * Sets a date and time value using the current user's time zone and the specified date and time format.
	 *
	 * This method throws a runtime exception if the date and time format used in the value parameter does not match the format parameter. You can retrieve the error message by calling getErrorMsg() on the GlideDateTime object after the exception is caught.
	 *
	 * @param {string} value Date and time in the current user's time zone.
	 * @param {string} format Date and time format to use to parse the value parameter.
	 * 
	 * Use the following values to describe the value parameter:
	 * 
	 * *   dd: Day of the month
	 * *   MM: Month of the year
	 * *   yyyy: Year
	 * *   HH: Hour
	 * *   mm: Minutes
	 * *   ss: Seconds
	 * 
	 * For example: "dd-MM-yyyy HH:mm:ss" or "MM-dd-yyyy HH:mm".
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValue(value: string, format: string): void
	
	/**
	 *
	 * Sets a date and time value using the internal format (yyyy-MM-dd HH:mm:ss) and the current user's time zone.
	 *
	 * @param {string} value The date and time in internal format.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValueInternal(value: string): void
	
	/**
	 *
	 * Sets the date and time of the current object using an existing GlideDateTime object. This method is equivalent to instantiating a new object with a GlideDateTime parameter.
	 *
	 * @param {GlideDateTime} g The object to use for setting the datetime value.
	 *
	 * @returns {void} Method does not return a value
	 */
	setGlideDateTime(g: GlideDateTime): void
	
	/**
	 *
	 * Sets the month stored by the GlideDateTime object to the specified value using the current user's time zone.
	 *
	 * @param {number} month The month to change to.
	 *
	 * @returns {void} Method does not return a value
	 */
	setMonthLocalTime(month: number): void
	
	/**
	 *
	 * Sets the month stored by the GlideDateTime object to the specified value using the UTC time zone.
	 *
	 * @param {number} month The month to change to.
	 *
	 * @returns {void} Method does not return a value
	 */
	setMonthUTC(month: number): void
	
	/**
	 *
	 * Sets the date and time of the GlideDateTime object.
	 *
	 * @param {string} o The date and time to use. This parameter may be one of several types:
	 * 
	 * *   A string in the UTC time zone and the internal format of yyyy-MM-dd HH:mm:ss. Sets the value of the object to the specified date and time. Using the method this way is equivalent to instantiating a new GlideDateTime object using the GlideDateTime(String value) constructor. If the date and time format used does not match the internal format, the method attempts to set the date and time using other available formats. Resolving the date and time this way can lead to inaccurate data due to ambiguity in the day and month values. When using a non-standard date and time format, use setValueUTC(String dt, String format) instead.
	 * *   A GlideDateTime object. Sets the value of the object to the date and time stored by the GlideDateTime passed in the parameter. Using the method this way is equivalent to instantiating a new GlideDateTime object using the GlideDateTime(GlideDateTime g) constructor.
	 * *   A JavaScript Number. Sets the value of the object using the Number value as milliseconds past January 1, 1970 00:00:00 GMT.
	 *
	 * @returns {void} Method does not return a value
	 */
	setValue(o: string): void
	
	/**
	 *
	 * Sets a date and time value using the UTC time zone and the specified date and time format. This method throws a runtime exception if the date and time format used in the dt parameter does not match the format parameter. You can retrieve the error message by calling `getErrorMsg()` on the GlideDateTime object after the exception is caught.
	 *
	 * @param {string} dt The date and time to use.
	 * @param {string} format The date and time format to use.
	 *
	 * @returns {void} Method does not return a value
	 */
	setValueUTC(dt: string, format: string): void
	
	/**
	 *
	 * Sets the year stored by the GlideDateTime object to the specified value using the current user's time zone.
	 *
	 * @param {number} year The year to change to.
	 *
	 * @returns {void} Method does not return a value
	 */
	setYearLocalTime(year: number): void
	
	/**
	 *
	 * Sets the year stored by the GlideDateTime object to the specified value using the UTC time zone.
	 *
	 * @param {number} year The year to change to.
	 *
	 * @returns {void} Method does not return a value
	 */
	setYearUTC(year: number): void
	
	/**
	 *
	 * Gets the duration difference between two GlideDateTime values.
	 *
	 * @param {GlideDateTime} Start The start value.
	 * @param {GlideDateTime} End The end value.
	 *
	 * @returns {GlideDuration} The duration between the two values.
	 */
	subtract(Start: GlideDateTime, End: GlideDateTime): GlideDuration
	
	/**
	 *
	 * Subtracts a specified amount of time from the current GlideDateTime object.
	 *
	 * @param {GlideTime} time The time value to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	subtract(time: GlideTime): void
	
	/**
	 *
	 * Subtracts the specified number of milliseconds from the GlideDateTime object.
	 *
	 * @param {number} milliseconds Number of milliseconds to subtract.
	 *
	 * @returns {void} Method does not return a value
	 */
	subtract(milliseconds: number): void
	
	/**
	 *
	 * Gets the date and time value stored by the GlideDateTime object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone, UTC by default. This method is equivalent to getValue().
	 *
	 *
	 * @returns {string} The date and time stored by the GlideDateTime object in the system time zone and format.
	 */
	toString(): string
	
}

/** 
 * The GlideDBFunctionBuilder methods provide a way to build Relational Database Management System (RDBMS) functions to perform SQL operations on record data. These methods can be used in both scoped and global server scripts.  
 *   
 * To use platform functions:
 * 
 * *   Construct a function using the GlideDBFunctionBuilder constructor and associated methods.
 * *   After building a function, you can apply the function to the current record using the addFunction() method of the GlideRecord class.
 * *   Add the function to a query using the addQuery() method of the GlideRecord class.
 * *   Retrieve the results of the function using the existing GlideRecord API methods such as getValue() and getElement().
 * 
 */
declare class GlideDBFunctionBuilder {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Adds the values of two or more integer fields.
	 *
	 * Use the field(String field) method to define fields on which the operation is performed.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	add(): void
	
	/**
	 *
	 * Builds the database function defined by the GlideDBFunctionBuilder object.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	build(): void
	
	/**
	 *
	 * Concatenates the values of two or more fields.
	 *
	 * Use the field(String field) method to define fields on which the operation is performed.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	concat(): void
	
	/**
	 *
	 * Defines a constant value to use in the function. If used with the dayofweek() method, the string defines whether to use Sunday or Monday as the first day of the week.
	 *
	 * @param {string} constant A constant value used in a function.
	 * 
	 * When used with the dayofweek() method, the value defines whether the week starts on a Sunday or Monday.
	 * 
	 * *   1: Week begins on Sunday.
	 * *   2: Week begins on Monday.
	 * 
	 * This definition enables the dayofweek() method to return the correct day of the week from a given date. If a value other than 1 or 2 is provided, the dayofweek() method uses Sunday as the first day of the week.
	 *
	 * @returns {void} Method does not return a value
	 */
	constant(constant: string): void
	
	/**
	 *
	 * Determines the duration using a given start date/time and end date/time.
	 *
	 * Use the field(String field) method to define start and end date/time fields.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	datediff(): void
	
	/**
	 *
	 * Returns an integer representing the day of the week for a given date.
	 *
	 * Use the field(String field) method to define the given date/time. Use the constant(String constant) method to define whether the week starts on a Sunday or Monday.
	 * 	 * 
	 * 	 * This method can be used with MySQL, Oracle, and Microsoft SQL Server databases only. If using an Oracle database, the NLS_TERRITORY setting must be set to a territory with Sunday as the first day of the week.
	 *
	 *
	 * @returns {number} If the first day of the week is set to Sunday in the constant(String constant) method, return values are associated with the following days of the week:
	 * 
	 * *   1: Sunday
	 * *   2: Monday
	 * *   3: Tuesday
	 * *   4: Wednesday
	 * *   5: Thursday
	 * *   6: Friday
	 * *   7: Saturday
	 * 
	 * If the first day of the week is set to Monday:
	 * 
	 * *   1: Monday
	 * *   2: Tuesday
	 * *   3: Wednesday
	 * *   4: Thursday
	 * *   5: Friday
	 * *   6: Saturday
	 * *   7: Sunday
	 * 
	 * If a value other than 1 or 2 is provided in the constant(String constant) method, the dayofweek() method uses Sunday as the first day of the week.
	 */
	dayofweek(): number
	
	/**
	 *
	 * Divides the value of one integer field by another.
	 *
	 * Use the field(String field) method to define fields on which the operation is performed.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	divide(): void
	
	/**
	 *
	 * Defines a field on which a SQL operation is performed.
	 *
	 * @param {string} field The field on which you are performing the SQL operation.
	 *
	 * @returns {void} Method does not return a value
	 */
	field(field: string): void
	
	/**
	 *
	 * Determines the number of code units in a field.
	 *
	 * Use the field(String field) method to define fields on which the operation is performed.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	length(): void
	
	/**
	 *
	 * Multiplies the values of two integer fields.
	 *
	 * Use the field(String field) method to define fields on which the operation is performed.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	multiply(): void
	
	/**
	 *
	 * Subtracts the value of one integer field from another.
	 *
	 * Use the field(String field) method to define fields on which the operation is performed.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	subtract(): void
	
}

/** 
 */
declare class GlideDigest {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Create a message digest from a string using the MD5 algorithm. The output string is in Base64.
	 *
	 * @param {string} source The source string.
	 *
	 * @returns {string} The message digest.
	 */
	getMD5Base64(source: string): string
	
	/**
	 *
	 * Create a message digest from an input stream using the MD5 algorithm. The output string is in Base64.
	 *
	 * @param {GlideScriptableInputStream} inputStream The source input stream.
	 *
	 * @returns {string} The message digest.
	 */
	getMD5Base64FromInputStream(inputStream: GlideScriptableInputStream): string
	
	/**
	 *
	 * Create a message digest from a string using the MD5 algorithm. The output string is in hexadecimal.
	 *
	 * @param {string} source The source string.
	 *
	 * @returns {string} The message digest.
	 */
	getMD5Hex(source: string): string
	
	/**
	 *
	 * Create a message digest from an input stream using the MD5 algorithm. The output string is in hexadecimal.
	 *
	 * @param {GlideScriptableInputStream} inputStream The source input stream.
	 *
	 * @returns {string} The message digest.
	 */
	getMD5HexFromInputStream(inputStream: GlideScriptableInputStream): string
	
	/**
	 *
	 * Create a message digest from a string using the SHA1 algorithm. The output string is in Base64.
	 *
	 * @param {string} source The source string.
	 *
	 * @returns {string} The message digest.
	 */
	getSHA1Base64(source: string): string
	
	/**
	 *
	 * Create a message digest from an input stream using the SHA1 algorithm. The output string is in Base64.
	 *
	 * @param {GlideScriptableInputStream} inputStream The source input stream.
	 *
	 * @returns {string} The message digest.
	 */
	getSHA1Base64FromInputStream(inputStream: GlideScriptableInputStream): string
	
	/**
	 *
	 * Create a message digest from a string using the SHA1 algorithm. The output string is in hexadecimal.
	 *
	 * @param {string} source The source string.
	 *
	 * @returns {string} The message digest.
	 */
	getSHA1Hex(source: string): string
	
	/**
	 *
	 * Create a message digest from an input stream using the SHA1 algorithm. The output string is in hexadecimal.
	 *
	 * @param {GlideScriptableInputStream} inputStream The source input stream.
	 *
	 * @returns {string} The message digest.
	 */
	getSHA1HexFromInputStream(inputStream: GlideScriptableInputStream): string
	
	/**
	 *
	 * Create a message digest from a string using the SHA256 algorithm. The output string is in Base64.
	 *
	 * @param {string} source The source string.
	 *
	 * @returns {string} The message digest.
	 */
	getSHA256Base64(source: string): string
	
	/**
	 *
	 * Create a message digest from an input stream using the SHA256 algorithm. The output string is in Base64.
	 *
	 * @param {GlideScriptableInputStream} inputStream The source input stream.
	 *
	 * @returns {string} The message digest.
	 */
	getSHA256Base64FromInputStream(inputStream: GlideScriptableInputStream): string
	
	/**
	 *
	 * Create a message digest from a string using the SHA256 algorithm. The output string is in hexadecimal.
	 *
	 * @param {string} source The source string.
	 *
	 * @returns {string} The message digest.
	 */
	getSHA256Hex(source: string): string
	
	/**
	 *
	 * Create a message digest from an input stream using the SHA256 algorithm. The output string is in hexadecimal.
	 *
	 * @param {GlideScriptableInputStream} inputStream The source input stream.
	 *
	 * @returns {string} The message digest.
	 */
	getSHA256HexFromInputStream(inputStream: GlideScriptableInputStream): string
	
}

/** 
 * GlideDuration objects store the duration as the number of days and time from January 1, 1970, 00:00:00. As a result, setValue() and getValue() use the scoped GlideDateTime object for parameters and return values.
 * 
 */
declare class GlideDuration {

	/**
	 *
	 * @param {string} displayValue Duration value.
	 * 
	 * Format: d HH:mm:ss where "d" is number of days.
	 *
	 */
	constructor(displayValue: string)
	
	/**
	 *
	 * Adds the duration of the specified GlideDuration object to the current GlideDuration object.
	 *
	 * @param {GlideDuration} duration GlideDuration object that contains the duration value to add to the current GlideDuration object.
	 *
	 * @returns {GlideDuration} New GlideDuration object whose duration is the sum of the durations of the two GlideDuration objects.
	 */
	add(duration: GlideDuration): GlideDuration
	
	/**
	 *
	 * Returns the duration value in the specified format.
	 *
	 * @param {string} format Duration format.
	 * 
	 * Format: [Global date and time field format](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/time/reference/r_FormatDateAndTimeFields.html)
	 *
	 * @returns {string} Current duration in the specified format.
	 */
	getByFormat(format: string): string
	
	/**
	 *
	 * Returns the number of days.
	 *
	 *
	 * @returns {number} Number of days in the duration.
	 */
	getDayPart(): number
	
	/**
	 *
	 * Returns the display value of the duration in number of days, hours, and minutes.
	 *
	 *
	 * @returns {string} Number of days, hours, and minutes, such as 2 Days 10 Hours 36 Minutes.
	 * 
	 * Format: Display value: "n" Days "n" Hours "n" Minutes
	 */
	getDisplayValue(): string
	
	/**
	 *
	 * Returns the duration value in "d HH:mm:ss" format.
	 *
	 *
	 * @returns {string} Duration value.
	 * 
	 * Format: d HH:mm:ss where "d" is number of days.
	 */
	getDurationValue(): string
	
	/**
	 *
	 * Returns the rounded number of days. If the time part is more than 12 hours, the return value is rounded up. Otherwise, it is rounded down.
	 *
	 *
	 * @returns {number} Day value of the display value rounded.
	 */
	getRoundedDayPart(): number
	
	/**
	 *
	 * Returns the internal date/time value of the current GlideDuration object.
	 *
	 * GlideDuration objects store the duration as a date and time from January 1, 1970, 00:00:00.
	 *
	 *
	 * @returns {string} Current duration within the GlideDuration object.
	 * 
	 * Format: YYYY-MM-DD HH:mm:ss
	 */
	getValue(): string
	
	/**
	 *
	 * Sets the duration display value.
	 *
	 * @param {string} asDisplayed Display duration value to set.
	 * 
	 * Format: d HH:mm:ss where "d" is number of days
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValue(asDisplayed: string): void
	
	/**
	 *
	 * Sets the internal date/time value of the GlideDuration object.
	 *
	 * The method sets the duration value to the difference of the passed in date/time the base date/time value of January 1, 1970, 00:00:00. The passed in date/time object (string) is parsed into a GlideDateTime object.
	 *
	 * @param {{[fieldName: string]: string}} o Date and time to use as the endpoint for the calculated duration time.
	 * 
	 * Format: YYYY-MM-DD HH:mm:ss
	 *
	 * @returns {void} Method does not return a value
	 */
	setValue(o: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Subtracts the duration of the specified GlideDuration object to the current GlideDuration object.
	 *
	 * @param {GlideDuration} duration GlideDuration object that contains the duration value to subtract from the current GlideDuration object.
	 *
	 * @returns {GlideDuration} New GlideDuration object whose duration contains the result of the subtraction of the duration of the two GlideDuration objects.
	 */
	subtract(duration: GlideDuration): GlideDuration
	
}

/** 
 */
declare class GlideElement {

	/**
	 *
	 * Determines if the user's role permits the creation of new records in this field.
	 *
	 *
	 * @returns {boolean} True if the field can be created, false otherwise.
	 */
	canCreate(): boolean
	
	/**
	 *
	 * Indicates whether the user's role permits them to read the associated GlideRecord.
	 *
	 *
	 * @returns {boolean} True if the field can be read, false otherwise.
	 */
	canRead(): boolean
	
	/**
	 *
	 * Determines whether the user's role permits them to write to the associated GlideRecord.
	 *
	 *
	 * @returns {boolean} True if the user can write to the field, false otherwise.
	 */
	canWrite(): boolean
	
	/**
	 *
	 * Determines if the current field has been modified. This functionality is available for all available data types, except Journal fields.
	 *
	 * Note: The changes() method is not supported within ACL scripts.
	 * 	 * 
	 * 	 * Note: If the GlideRecord on which you are performing this method has only been initialized and read, and has not been written, the underlying before-and-after values are the same. In this case, the method returns "false", as there has been no change to the data store.
	 *
	 *
	 * @returns {boolean} True if the fields have been changed, false if the field has not.
	 */
	changes(): boolean
	
	/**
	 *
	 * Determines if the previous value of the current field matches the specified object.
	 *
	 * Note: If the GlideRecord on which you are performing this method has only been initialized and read, and has not been written, the underlying before-and-after values are the same. In this case, the method returns "false", as there has been no change to the data store.
	 *
	 * @param {{[fieldName: string]: string}} o An object value to check against the previous value of the current field.
	 *
	 * @returns {boolean} True if the previous value matches, false if it does not.
	 */
	changesFrom(o: {[fieldName: string]: string}): boolean
	
	/**
	 *
	 * Determines if the new value of a field, after a change, matches the specified object.
	 *
	 * Note: The changesTo() method is not supported within ACL scripts.
	 * 	 * 
	 * 	 * Note: If the GlideRecord on which you are performing this method has only been initialized and read, and has not been written, the underlying before-and-after values are the same. In this case, the method returns "false", as there has been no change to the data store.
	 *
	 * @param {{[fieldName: string]: string}} o An object value to check against the new value of the current field.
	 *
	 * @returns {boolean} True if the previous value matches, false if it does not.
	 */
	changesTo(o: {[fieldName: string]: string}): boolean
	
	/**
	 *
	 * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT for a duration field. Does not require the creation of a GlideDateTime object because the duration field is already a GlideDateTime object.
	 *
	 *
	 * @returns {number} Number of milliseconds since January 1, 1970, 00:00:00 GMT.
	 */
	dateNumericValue(): number
	
	/**
	 *
	 * Returns the value of the specified attribute from the dictionary.
	 *
	 * If the attribute is a boolean attribute, use getBooleanAttribute(String) to get the value as a boolean rather than as a string.
	 *
	 * @param {string} attributeName Attribute name
	 *
	 * @returns {string} Attribute value
	 */
	getAttribute(attributeName: string): string
	
	/**
	 *
	 * Returns the Boolean value of the specified attribute from the dictionary.
	 *
	 * To get the value as a string, use getAttribute(string).
	 *
	 * @param {string} attributeName Attribute name
	 *
	 * @returns {boolean} Boolean value of the attribute. Returns false if the attribute does not exist.
	 */
	getBooleanAttribute(attributeName: string): boolean
	
	/**
	 *
	 * Returns the choice list for a specified field.
	 *
	 * The field for which to return the choice list is specified in the method call. For example: `var choices = glideRecord.urgency.getChoices();`. For information on choice list field types and their associated capabilities, see [Choice list field type](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/field-administration/concept/c_ChoiceLists.html).
	 *
	 * @param {string} dependent Optional. Field within the associated record on which the choice list field depends.
	 *
	 * @returns {{[fieldName: string]: string}} List of possible values for the choice list, which are the values in the Choice [sys_choice] table. If the dependent parameter is passed, the return results reflect only those choices available for the specified dependent field.
	 */
	getChoices(dependent: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the choice label for the current choice.
	 *
	 * A choice has a value (number) and a label (string). This method returns the label.
	 *
	 *
	 * @returns {string} The selected choice's label.
	 */
	getChoiceValue(): string
	
	/**
	 *
	 * Returns the clear text value for Password (2 way encrypted) fields in scoped applications.
	 *
	 *
	 * @returns {string} The clear text password.
	 */
	getDecryptedValue(): string
	
	/**
	 *
	 * Gets the formatted display value of the field.
	 *
	 * @param {number} maxCharacters Optional: Maximum characters desired
	 *
	 * @returns {string} The display value of the field
	 */
	getDisplayValue(maxCharacters: number): string
	
	/**
	 *
	 * Returns the field's element descriptor.
	 *
	 *
	 * @returns {GlideElementDescriptor} The field's element descriptor.
	 */
	getED(): GlideElementDescriptor
	
	/**
	 *
	 * Returns the phone number in international format.
	 *
	 *
	 * @returns {string} The phone number in international format.
	 */
	getGlobalDisplayValue(): string
	
	/**
	 *
	 * Returns the HTML value of a field.
	 *
	 * @param {number} maxChars Optional. Maximum number of characters to return.
	 *
	 * @returns {string} HTML value for the field.
	 */
	getHTMLValue(maxChars: number): string
	
	/**
	 *
	 * Returns either the most recent journal entry or all journal entries.
	 *
	 * @param {number} mostRecent If 1, returns the most recent entry. If -1, returns all journal entries.
	 *
	 * @returns {string} For the most recent entry, returns a string that contains the field label, timestamp, and user display name of the journal entry.
	 * 
	 * For all journal entries, returns the same information for all journal entries ever entered as a single string with each entry delimited by "nn".
	 */
	getJournalEntry(mostRecent: number): string
	
	/**
	 *
	 * Returns the object label.
	 *
	 *
	 * @returns {string} Object label
	 */
	getLabel(): string
	
	/**
	 *
	 * Returns the name of the field.
	 *
	 *
	 * @returns {string} Field name
	 */
	getName(): string
	
	/**
	 *
	 * Gets the table name for a reference element.
	 *
	 *
	 * @returns {string} The table name of the reference
	 */
	getReferenceTable(): string
	
	/**
	 *
	 * Returns a GlideRecord object for a given reference element.
	 *
	 * Warning: If the reference element does not contain a value, it returns an empty GlideRecord object, not a NULL object.
	 *
	 *
	 * @returns {GlideRecord} A GlideRecord object
	 */
	getRefRecord(): GlideRecord
	
	/**
	 *
	 * Returns the name of the table on which the field resides.
	 *
	 *
	 * @returns {string} Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
	 */
	getTableName(): string
	
	/**
	 *
	 * Determines if a field is null.
	 *
	 *
	 * @returns {boolean} True if the field is null or an empty string, false if not.
	 */
	nil(): boolean
	
	/**
	 *
	 * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.
	 *
	 * When called, setDateNumericValue() automatically creates the necessary GlideDateTime/GlideDate/GlideDuration object, and then sets the element to the specified value.
	 * 	 * 
	 * 	 * Note: Before calling this method, the element must already exist by querying an existing record or by using the now_GR.initialize() method to initialize a new record.
	 *
	 * @param {number} milliseconds Number of milliseconds since 1/1/1970
	 *
	 * @returns {void} Method does not return a value
	 */
	setDateNumericValue(milliseconds: number): void
	
	/**
	 *
	 * Sets the display value of the field.
	 *
	 * @param {{[fieldName: string]: string}} value The value to set for the field.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValue(value: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Adds an error message. Available in Fuji patch 3.
	 *
	 * @param {string} errorMessage The error message.
	 *
	 * @returns {void} Method does not return a value
	 */
	setError(errorMessage: string): void
	
	/**
	 *
	 * Sets the field to the specified phone number.
	 *
	 * This method is only available on a phone number GlideElement.
	 *
	 * @param {{[fieldName: string]: string}} phoneNumber The phone number to set. This can be in either the international or local format.
	 * @param {boolean} strict When true, specifies that the number specified must match the correct format. When false, the system attempts to correct an improperly formatted phone number.
	 *
	 * @returns {boolean} True if the value was set.
	 */
	setPhoneNumber(phoneNumber: {[fieldName: string]: string}, strict: boolean): boolean
	
	/**
	 *
	 * Sets the value of a field.
	 *
	 * Note: Before calling this method, the element must already exist by querying an existing record or by using the now_GR.initialize() method to initialize a new record.
	 *
	 * @param {{[fieldName: string]: string}} value Object value to set the field to.
	 *
	 * @returns {void} Method does not return a value
	 */
	setValue(value: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Converts the value of a GlideRecord field to a string.
	 *
	 *
	 * @returns {string} Value as a string.
	 */
	toString(): string
	
}

/** 
 * This API provides methods that enable you to perform the following:
 * 
 * *   Obtain the FX Currency field display string, as entered by the user.
 * *   Obtain the display value of an FX Currency field.
 * *   Obtain the reference currency value of an FX Currency field.
 * *   Obtain the session currency value of an FX Currency field.
 * *   Set the display value of an FX Currency field.
 * 
 *   
 *   
 * The GlideElementCurrency2 class has no constructor.
 * 
 */
declare class GlideElementCurrency2 {

	/**
	 *
	 * Returns an FX Currency field display string, as entered by the user, from the associated GlideRecord.
	 *
	 * For additional information on FX Currency fields, see [Setting up and operating FX Currency fields](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/currency/concept/fx-currency.html).
	 *
	 *
	 * @returns {string} Display currency string as entered by the user.
	 */
	getAsEnteredDisplayValue(): string
	
	/**
	 *
	 * Returns the display value of an FX Currency field within the associated GlideRecord.
	 *
	 * Depending on how the display_value is set in the FX Currency Configuration [fx_configuration] table, the returned value may be the:
	 * 	 * 
	 * 	 * *   Currency value as entered by the user
	 * 	 * *   Currency value converted to the session currency (based on the user's locale)
	 * 	 * *   Currency value converted to the reference currency
	 * 	 * 
	 * 	 * For additional information on FX Currency and the configuration table, see [Configure FX Currency global settings](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/currency/task/fx-currency-configure.html).
	 *
	 *
	 * @returns {string} Display currency value
	 */
	getDisplayValue(): string
	
	/**
	 *
	 * Returns the reference currency value of an FX Currency field within the associated GlideRecord.
	 *
	 * Reference currency is the common currency into which all currency values in a field are converted. The currency code that the getReferenceDisplayValue() method uses to derive the reference currency is based on the following:
	 * 	 * 
	 * 	 * *   If an instance record exists, then the method uses the value in the reference_currency field of the FX Currency [fx_currency2_instance] table.
	 * 	 * *   If an instance record does not exist, then the method uses the reference currency that would be set on the instance record when the instance record is eventually created (in the following order):
	 * 	 *     *   If set, the reference_currency in the FX Currency Configuration [fx_configuration] table.
	 * 	 *     *   If set, the reference_currency_source in the FX Currency Configuration [fx_configuration] table.
	 * 	 *     *   System default, system reference currency.
	 * 	 * 
	 * 	 * For additional information on the values in the FX Currency Configuration [fx_configuration] table, see [Setting up and operating FX Currency fields](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/currency/concept/fx-currency.html).
	 *
	 *
	 * @returns {string} Reference currency amount for the associated FX Currency display value.
	 */
	getReferenceDisplayValue(): string
	
	/**
	 *
	 * Returns the session currency value of the associated FX Currency field within the current GlideRecord.
	 *
	 *
	 * @returns {string} Currency value converted to the session currency, which is based on the current user's locale.
	 */
	getSessionDisplayValue(): string
	
	/**
	 *
	 * Sets the display value of an FX Currency field with the specified currency value.
	 *
	 * For additional information on FX Currency fields, see [Setting up and operating FX Currency fields](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/currency/concept/fx-currency.html).
	 *
	 * @param {string} displayValue Value to set in the FX Currency field in the format `<currency code>;<currency amount>`. You must format the `<currency amount>` field in the user's locale.
	 * 
	 * For example, if the user's locale is USA/eng, the passed in `<currency amount>` would be 123.45. If the user's local is FRA/fre, the passed in `<currency amount>` would be 123,45.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValue(displayValue: string): void
	
}

/** 
 * There is no constructor for this class. Use the GlideElement or GlideRecord getED() method to obtain a GlideElementDescriptor object.
 * 
 */
declare class GlideElementDescriptor {

	/**
	 *
	 * Returns the encryption type used for attachments on the element's table.
	 *
	 * This method is for use with the Edge Encryption plugin.
	 *
	 *
	 * @returns {string} The encryption type used on attachments. Returns null if attachments on the element's table are not being encrypted.
	 */
	getAttachmentEncryptionType(): string
	
	/**
	 *
	 * Returns the element's encryption type.
	 *
	 * This method is for use with the Edge Encryption plugin.
	 *
	 *
	 * @returns {string} The element's encryption type. Returns null if the element is not encrypted.
	 */
	getEncryptionType(): string
	
	/**
	 *
	 * Returns the element's internal data type.
	 *
	 *
	 * @returns {string} The element's internal data type.
	 * 
	 * Possible values:
	 * 
	 * *   boolean
	 * *   char
	 * *   collection
	 * *   conditions
	 * *   date
	 * *   decimal
	 * *   documentation_field
	 * *   domain_id
	 * *   due_date
	 * *   email
	 * *   field_name
	 * *   file_attachment
	 * *   float
	 * *   glide_date
	 * *   glide_date_time
	 * *   glide_duration
	 * *   glide_list
	 * *   GUID
	 * *   html
	 * *   image
	 * *   integer
	 * *   long
	 * *   longint
	 * *   multi_two_lines
	 * *   journal
	 * *   journal_input
	 * *   numeric
	 * *   order_index
	 * *   password
	 * *   ph_number
	 * *   reference
	 * *   script
	 * *   script_plain
	 * *   string
	 * *   sys_class_name
	 * *   table_name
	 * *   template_value
	 * *   timer
	 * *   translated_field
	 * *   url
	 * *   user_image
	 * *   user_input
	 * *   user_roles
	 * *   video
	 * *   workflow
	 */
	getInternalType(): string
	
	/**
	 *
	 * Returns the element's label.
	 *
	 *
	 * @returns {string} The element's label.
	 */
	getLabel(): string
	
	/**
	 *
	 * Returns the element's length.
	 *
	 *
	 * @returns {number} The element's size.
	 */
	getLength(): number
	
	/**
	 *
	 * Returns the element's name.
	 *
	 *
	 * @returns {string} The element's name.
	 */
	getName(): string
	
	/**
	 *
	 * Returns the element's plural label.
	 *
	 *
	 * @returns {string} The element's plural label.
	 */
	getPlural(): string
	
	/**
	 *
	 * Returns true if an encrypted attachment has been added to the table.
	 *
	 * This method is for use with the Edge Encryption plugin.
	 *
	 *
	 * @returns {boolean} Returns true if an encrypted attachment has been added to the table.
	 */
	hasAttachmentsEncrypted(): boolean
	
	/**
	 *
	 * Returns true if the element is an automatically generated or system field.
	 *
	 * Automatically generated and system fields cannot be encrypted. This method is for use with the Edge Encryption plugin.
	 *
	 *
	 * @returns {boolean} True if the element is automatically generated or a system field.
	 */
	isAutoOrSysID(): boolean
	
	/**
	 *
	 * Returns true if the element is defined as a dropdown choice in its dictionary definition.
	 *
	 * Choice fields cannnot be encrypted.
	 *
	 *
	 * @returns {boolean} Returns true if the element is defined as a dropdown choice. Returns true even if there are no entries defined in the choice table. The last choice type, suggestion, does not return true.
	 */
	isChoiceTable(): boolean
	
	/**
	 *
	 * Returns true if an element is encrypted.
	 *
	 * This method is for use with the Edge Encryption plugin.
	 *
	 *
	 * @returns {boolean} Returns true if the element is encrypted, false otherwise.
	 */
	isEdgeEncrypted(): boolean
	
	/**
	 *
	 * Determines whether the element is mandatory and must contain a value before the record can be saved.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether the associated element is mandatory and must contain a value before the record containing the element can be saved.
	 * 
	 * Valid values:
	 * 
	 * *   true: element must contain a value; mandatory field
	 * *   false: element does not have to contain a value
	 */
	isMandatory(): boolean
	
	/**
	 *
	 * Returns true if the element is a virtual element.
	 *
	 * A virtual element is a calculated field as set by the dictionary definition of the field. Virtual fields cannot be encrypted.
	 *
	 *
	 * @returns {boolean} Returns true if the element is a virtual element.
	 */
	isVirtual(): boolean
	
}

/** 
 */
declare class GlideEmailOutbound {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Adds the address to either the cc or bcc list.
	 *
	 * @param {string} type Either cc or bcc, determines the list to which the address is added.
	 * @param {string} address The recipient's email address.
	 *
	 * @returns {void} Method does not return a value
	 */
	addAddress(type: string, address: string): void
	
	/**
	 *
	 * Adds the recipient to either the cc or bcc list, but uses the display name instead of the address when showing the recipient.
	 *
	 * @param {string} type Either cc or bcc, determines the list to which the address is added.
	 * @param {string} address The recipient's email address.
	 * @param {string} displayName The name to be shown instead of the email address.
	 *
	 * @returns {void} Method does not return a value
	 */
	addAddress(type: string, address: string, displayName: string): void
	
	/**
	 *
	 * Returns the email's subject line.
	 *
	 *
	 * @returns {string} The email's subject line.
	 */
	getSubject(): string
	
	/**
	 *
	 * Returns the email's watermark.
	 *
	 *
	 * @returns {string} The email's watermark.
	 */
	getWatermark(): string
	
	/**
	 *
	 * Sets the body of the email.
	 *
	 * @param {string} bodyText The body of the email.
	 *
	 * @returns {void} Method does not return a value
	 */
	setBody(bodyText: string): void
	
	/**
	 *
	 * Sets the sender's address.
	 *
	 * @param {string} address The sender's email address.
	 *
	 * @returns {void} Method does not return a value
	 */
	setFrom(address: string): void
	
	/**
	 *
	 * Sets the reply to address.
	 *
	 * @param {string} address The reply to email address.
	 *
	 * @returns {void} Method does not return a value
	 */
	setReplyTo(address: string): void
	
	/**
	 *
	 * Sets the email's subject line.
	 *
	 * @param {string} subject Text for the subject line.
	 *
	 * @returns {void} Method does not return a value
	 */
	setSubject(subject: string): void
	
}

/** 
 * Methods for this API are accessible using the GlideFilter global object.  
 *   
 * 
 * Case sensitivity
 * ----------------
 * 
 * GlideFilter is case-sensitive by default. Use the [setCaseSensitive()](dev.do#!/reference/api/rome/server/ "Enables or disables case-sensitive filter results.") method to enable or disable case sensitivity. [GlideRecord](dev.do#!/reference/api/rome/server/ "Scoped GlideRecord is used for database operations.") queries are case-insensitive.
 * 
 * The following example shows how a GlideRecord query is case-insensitive and results in the same user record with upper or lower case.
 * 
 *     var gr = new GlideRecord('sys_user');
 *     gr.addQuery('first_name', 'Abel');
 *     gr.query();
 *     while (gr.next())
 *       gs.info("Upper case query: " + gr.getDisplayValue());
 *     
 *     var gr = new GlideRecord('sys_user');
 *     gr.addQuery('first_name', 'abel');
 *     gr.query();
 *     while (gr.next())       
 *       gs.info("Lower case query: " + gr.getDisplayValue());
 * 
 * GlideRecord query() output shows the same results display regardless of case.
 * 
 *     Upper case query: Abel Tuter
 *     Lower case query: Abel Tuter
 * 
 * The following example shows how GlideFilter only retrieves the matched value of the record for the upper case condition. The lower case condition does not provide a match.
 * 
 *     // Matches the 'Abel Tuter' user record
 *     var gr = new GlideRecord('sys_user');
 *     gr.query();
 *     var condition = 'first_name=Abel';
 *     var glideFilter = new GlideFilter(condition, 'filterCondition');
 *     while (gr.next()) {
 *        if (glideFilter.match(gr, true))
 *             gs.info("Upper case condition: " + gr.getDisplayValue());
 *     }
 *     
 *     // The following code does not match 'Abel Tuter' user record
 *     var gr = new GlideRecord('sys_user');
 *     gr.query();
 *     var condition = 'first_name=abel';
 *     var glideFilter = new GlideFilter(condition, 'filterCondition');
 *     while (gr.next()) {
 *        if (glideFilter.match(gr, true))
 *             gs.info("Lower case condition: " + gr.getDisplayValue());
 *     }
 * 
 * The output reveals that the filter only returns upper case results with default case-sensitivity:
 * 
 *     Upper case condition: Abel Tuter
 * 
 * The following example shows how to disable GlideFilter case-sensitivity with the setCaseSensitive() method. The filter matches the condition even though the case does not match the field value.
 * 
 *     // Matches the 'Abel Tuter' user record
 *     var gr = new GlideRecord('sys_user');
 *     gr.query();
 *     var condition = 'first_name=Abel';
 *     var glideFilter = new GlideFilter(condition, 'filterCondition');
 *     while (gr.next()) {
 *        if (glideFilter.match(gr, true))
 *          gs.info("Upper case condition: " + gr.getDisplayValue());
 *     }
 *     
 *     // The following code disables case sensitivity and matches the same record
 *     var gr = new GlideRecord('sys_user');
 *     gr.query();
 *     
 *     var condition = 'first_name=abel';
 *     var glideFilter = new GlideFilter(condition, 'filterCondition');
 *     glideFilter.setCaseSensitive(false);
 *     
 *     while (gr.next()) {
 *       if (glideFilter.match(gr, true))
 *         gs.info("Lower case condition: " + gr.getDisplayValue());
 *     }
 * 
 * The output reveals GlideFilter case-insensitive results:
 * 
 *     Upper case condition: Abel Tuter
 *     Lower case condition: Abel Tuter
 * 
 *   
 *   
 * 
 * Filter null values
 * ------------------
 * 
 * To exclude null values from GlideFilter query results, add ISNOTEMPTY to the query condition. The following example shows how using the same encoded query with GlideRecord and GlideFilter produces different results.
 * 
 *     var insertRecordsGr = new GlideRecord('u_test_table');
 *     insertRecordsGr.deleteMultiple();
 *     var dates = ['', '2021-01-29', '2021-01-30', '2021-01-31'];
 *     dates.forEach(function(val) {
 *       insertRecordsGr.initialize();
 *       insertRecordsGr.u_date_field = val;
 *       insertRecordsGr.insert();
 *     });
 *     
 *     var now_GR = new GlideRecord('u_test_table');
 *     now_GR.addEncodedQuery('u_date_field<javascript:gs.beginningOfToday()');
 *     now_GR.query();
 *     
 *     // Encoded query includes null values with GlideFilter, which might cause unexpected results
 *     var condition = 'u_date_field<javascript:gs.beginningOfToday()';
 *     
 *     var grWithGlideFilter = new GlideRecord('u_test_table');
 *     grWithGlideFilter.query();
 *     var filter = new GlideFilter(condition, 'filterCondition');
 *       
 *     var countWithGlideFilter = 0;
 *     while (grWithGlideFilter.next()) {
 *       if (GlideFilter.checkRecord(grWithGlideFilter, condition))
 *          countWithGlideFilter++;
 *     }
 *     
 *     gs.info('Record RowCount: ' + now_GR.getRowCount() + ' - Filter Count: ' + countWithGlideFilter);
 * 
 * The output shows that GlideRecord returns three records, skipping empty date values. The GlideFilter query counts the empty date value and returns a count of four records.
 * 
 *     Record RowCount: 3 - Filter Count: 4
 * 
 * To exclude null values from the GlideFilter results, add an AND condition ISNOTEMPTY to the queried field.
 * 
 *     // Encoded query includes null values with GlideFilter
 *     var condition = 'u_date_field<=javascript:gs.beginningOfToday()^u_date_fieldISNOTEMPTY';
 * 
 * Output shows that the GlideFilter encoded query skips the null date value and counts three results.
 * 
 *     Record RowCount: 3 - Filter Count: 3
 * 
 */
declare class GlideFilter {

	/**
	 *
	 * @param {string} filter Encoded query string in standard Glide format. See [Encoded query strings](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html). Results are case-sensitive, unless disabled using the [setCaseSensitive()](dev.do#!/reference/api/rome/server/ "Enables or disables case-sensitive filter results.") method.
	 * 
	 * To exclude null values from GlideFilter query results, add ISNOTEMPTY to the query condition.
	 * @param {string} title Descriptive title for the filter.
	 *
	 */
	constructor(filter: string, title: string)
	
	/**
	 *
	 * Compares a specified filter to the contents of a specified GlideRecord.
	 *
	 * If the specified filter contains one condition, the method returns true if the record meets the condition.
	 * 	 * 
	 * 	 * Filters support multiple conditions, for example `"active=true^number=abc^category=request"`. You can use the match parameter to define whether all conditions must be met to determine a match or just a single condition.
	 *
	 * @param {{[fieldName: string]: string}} now_GR GlideRecord to evaluate.
	 * @param {string} filter Encoded query string in standard Glide format. See [Encoded query strings](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html).
	 * 
	 * To exclude null values from GlideFilter query results, add ISNOTEMPTY to the query condition.
	 * @param {boolean} match Optional. Flag that indicates whether all conditions must be met if the filter parameter contains multiple conditions.
	 * 
	 * Valid values:
	 * 
	 * *   true: All conditions must be met for the method to return true.
	 * *   false: Only one of the conditions must be met for the method to return true.
	 * 
	 * Default: true
	 *
	 * @returns {boolean} Results of the filter comparison.
	 * 
	 * *   true: Filter conditions were met.
	 * *   false: Filter conditions were not met.
	 */
	checkRecord(now_GR: {[fieldName: string]: string}, filter: string, match: boolean): boolean
	
	/**
	 *
	 * Evaluates a filter against a specified GlideRecord.
	 *
	 * @param {{[fieldName: string]: string}} now_GR GlideRecord to evaluate.
	 * @param {boolean} match Flag that indicates whether all filter conditions must match.
	 * 
	 * Valid values:
	 * 
	 * *   true: All filter conditions must match.
	 * *   false: Filter condition match is not required.
	 * 
	 * Default: false
	 *
	 * @returns {boolean} Results of the match check.
	 * 
	 * *   true: Filter conditions were met.
	 * *   false: Filter conditions were not met.
	 */
	match(now_GR: {[fieldName: string]: string}, match: boolean): boolean
	
	/**
	 *
	 * Enables or disables case-sensitive filter results.
	 *
	 * @param {boolean} caseSensitive Flag that indicates whether the filter is case-sensitive.
	 * 
	 * Valid values:
	 * 
	 * *   true: The filter is case-sensitive.
	 * *   false: The filter is case-insensitive.
	 * 
	 * Default: true
	 *
	 * @returns {void} 
	 */
	setCaseSensitive(caseSensitive: boolean): void
	
}

/** 
 * The scoped GlideFormScratchpad class has no constructor and no methods. The g_scratchpad object behaves identically for global and scoped applications.  
 *   
 * The g_scratchpad object provides a mechanism for passing information from the server to the client when the client requires information not available on a form. This can be accomplished by creating a business rule to put the information in the g_scratchpad object and accessing the information in a client script.  
 *   
 * For an example on using this class, [Example: g_scratchpad](https://developer.servicenow.com/dev.do#!/guides/rome/now-platform/tpb-guide/client_scripting_technical_best_practices%23%23example-g-scratchpad) on the Developer Site.
 * 
 */
declare class GlideFormScratchpad {

}

/** 
 * A GlideImportLog object consumable by the GlideImportSetTransformer API. This object is not required for the GlideImportSetTransformer API, it enables you to associate import logs with a specific Import Set transformation.
 * 
 */
declare class GlideImportLog {

	/**
	 *
	 * @param {GlideImportSetRun} importSetRun Optional. Import Set Run record on which all logs are to be associated with.
	 * @param {string} source Optional. Source field value attached to the Import Log record that defines where in the Import Set process this message was logged from. For example, Loading could represent loading step, Cleanup could represent during the cleanup after the transform, and so on.
	 *
	 */
	constructor(importSetRun: GlideImportSetRun, source: string)
	
	/**
	 *
	 * Logs a message of type Error to the Import Log [import_log] table.
	 *
	 * @param {string} message Log message. Maximum length 4000 characters.
	 * @param {string} source Optional. Source field value attached to the Import Log record that defines where in the Import Set process this message was logged from. For example, Loading could represent loading step, Cleanup could represent during the cleanup after the transform, and so on.
	 *
	 * @returns {void} Method does not return a value
	 */
	error(message: string, source: string): void
	
	/**
	 *
	 * Returns a sys_id of the Import Run record associated with this Import Log.
	 *
	 *
	 * @returns {string} Sys_id of an Import Set Run record from the Transform History [sys_import_set_run] table.
	 */
	getImportRunHistory(): string
	
	/**
	 *
	 * Logs a message of type Info to the Import Log [import_log] table.
	 *
	 * @param {string} message Log message. Maximum length 4000 characters.
	 * @param {string} source Optional. Source field value attached to the Import Log record that defines where in the Import Set process this message was logged from. For example, Loading could represent loading step, Cleanup could represent during the cleanup after the transform, and so on.
	 *
	 * @returns {void} Method does not return a value
	 */
	info(message: string, source: string): void
	
	/**
	 *
	 * Associates the GlideImportLog object with a specific Import Set Run record.
	 *
	 * @param {string} importRunHistory The sys_id of a record from the Transform History [sys_import_set_run] table.
	 *
	 * @returns {void} Method does not return a value
	 */
	setImportRunHistory(importRunHistory: string): void
	
	/**
	 *
	 * Logs a message of type Warn to the Import Log [import_log] table.
	 *
	 * @param {string} message Log message. Maximum length 4000 characters.
	 * @param {string} source Optional. Source field value attached to the Import Log record that defines where in the Import Set process this message was logged from. For example, Loading could represent loading step, Cleanup could represent during the cleanup after the transform, and so on.
	 *
	 * @returns {void} Method does not return a value
	 */
	warn(message: string, source: string): void
	
}

/** 
 */
declare class GlideImportSetRun {

	/**
	 *
	 * @param {string} importSetID Optional. The sys_id of the import set record listed in the Import Sets [sys_import_set] table. If not set, a new [sys_import_set] record is created and the GlideImportSetRun object represents this record.
	 *
	 */
	constructor(importSetID: string)
	
	/**
	 *
	 * Gets the sys_id of the Import Set Run associated with the transformation.
	 *
	 *
	 * @returns {string} The sys_id of the Transform Histories [sys_import_set_run] record associated with the transform.
	 */
	getImportSetRunSysID(): string
	
}

/** 
 * To execute an Import Set transform:
 * 
 * 1.  Create an Import Set table using the GlideImportSetTable API.
 * 2.  Create a Transform Map using the GlideImportSetTransformMap API.
 * 3.  Create or use an existing Import Set using the GlideRecord API.
 * 4.  Execute an Import Set Transform using the GlideImportSetTransformer API.
 * 
 * Once you have created the Import Set record it must be consumed by the GlideImportSetTransformer API in order to trigger the transform.  
 *   
 * `var transformer = new GlideImportSetTransformer(); transformer.transformAllMaps(importSetGr);`
 * 
 */
declare class GlideImportSetTransformer {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Gets the Import Set Run object associated with a GlideImportSetTransformer object.
	 *
	 *
	 * @returns {GlideImportSetRun} GlideImportSetRun object created by running a transformation or the argument supplied to the setImportSetRun() method.
	 */
	getImportSetRun(): GlideImportSetRun
	
	/**
	 *
	 * Returns a Boolean value specifying whether or not there was an error during a transformation.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether there is an error.
	 * 
	 * *   true: Error.
	 * *   false: Success.
	 */
	isError(): boolean
	
	/**
	 *
	 * Associates an Import Set record with a specific GlideImportSetTransformer object.
	 *
	 * @param {string} id The sys_id of an Import Set record from the Import Sets [sys_import_set] table.
	 *
	 * @returns {void} Method does not return a value
	 */
	setImportSetID(id: string): void
	
	/**
	 *
	 * Associates an Import Set Run object with a specific GlideImportSetTransformer object.
	 *
	 * @param {GlideImportSetRun} importSetRun GlideImportSetRun object representing the ImportSetRun record to track the transformation history.
	 *
	 * @returns {void} Method does not return a value
	 */
	setImportSetRun(importSetRun: GlideImportSetRun): void
	
	/**
	 *
	 * Associates a GlideImportLog object with a specific GlideImportSetTransformer object.
	 *
	 * If this method is not called prior to calling the transformAllMaps() method, a GlideImportLog object is created internally on the server side.
	 *
	 * @param {GlideImportLog} log GlideImportLog object to link to the Import Set history. Once set, any call from the GlideImportLog object is associated with the Import Set run history for that specific transform.
	 *
	 * @returns {void} Method does not return a value
	 */
	setLogger(log: GlideImportLog): void
	
	/**
	 *
	 * Associates a Transform Map with a specific GlideImportSetTransformer object.
	 *
	 * @param {string} mapID A sys_id from the Table Transform Maps [sys_transform_map] table.
	 *
	 * @returns {void} Method does not return a value
	 */
	setMapID(mapID: string): void
	
}

/** 
 * There is no constructor for a GlideLocale object. Use the get() method to get a GlideLocale object.
 * 
 */
declare class GlideLocale {

	/**
	 *
	 * Returns the GlideLocale object.
	 *
	 *
	 * @returns {GlideLocale} The GlideLocale object.
	 */
	get(): GlideLocale
	
	/**
	 *
	 * Returns the decimal separator.
	 *
	 *
	 * @returns {string} The decimal separator.
	 */
	getDecimalSeparator(): string
	
	/**
	 *
	 * Returns the grouping separator.
	 *
	 *
	 * @returns {string} The grouping separator.
	 */
	getGroupingSeparator(): string
	
}

/** 
 */
declare class GlidePluginManager {

	/**
	 *
	 * Determines if the specified plugin has been activated.
	 *
	 * @param {string} pluginID Unique plugin identifier.
	 *
	 * @returns {boolean} Flag that indicates if the plugin is active.
	 * 
	 * Valid values:
	 * 
	 * *   true: Plugin is active.
	 * *   false: Plugin is inactive.
	 */
	isActive(pluginID: string): boolean
	
}

/** 
 * The GlideQuery API lets you:  
 *   
 * 
 * *   Use standard JavaScript objects and types for queries and results.
 * *   Quickly diagnose query errors with additional checks and clear error messages.
 * *   Simplify your code by avoiding boiler-plate query patterns.
 * *   Avoid common performance issues without needing deeper knowledge of GlideRecord.
 * 
 *   
 *   
 * Use the GlideQuery API in scoped or global server-side scripts. This API requires the GlideQuery [com.sn_glidequery] plugin.  
 *   
 * 
 * Implementation
 * --------------
 * 
 * This API works together with the [Stream](dev.do#!/reference/api/rome/server/ "The Stream API interacts with a stream of items such as records. For example, you can use the forEach() method to update the state of each record in a stream returned by the GlideQuery API.") and [Optional](dev.do#!/reference/api/rome/server/ "The Optional API interacts with a single record returned by the GlideQuery, Stream, or GlideRecord APIs, even when it does not exist. Write scripts that are less likely to result in an error by handling null or undefined query results.") APIs in a builder pattern where the method calls chain together, each method building on the returned result of the previous method. Use methods to define the attributes of the query. The methods do not execute until you call a terminal method, a method that returns a query result, allowing you to define the requirements of the query before executing it.
 * 
 * If the query returns a single record, the system wraps the result in an Optional object. If the query returns a stream of records, the system wraps the result in a Stream object. These objects let you manage the result using a set of methods in each API.
 * 
 * For example, here's a script that performs a query on the Task table and groups the records by priority and returns groups with total reassignments greater than four.
 * 
 *     var query = new global.GlideQuery('task')
 *         .where('active', true) //Returns new GlideQuery object with a "where" clause.
 *         .groupBy('priority') //Returns new GlideQuery object with a "group by" clause.
 *         .aggregate('sum', 'reassignment_count') //Returns new GlideQuery object with a "sum(reassignment_count)" clause.
 *         .having('sum', 'reassignment_count', '>', 4) //Returns new GlideQuery object with a "having reassignment_count > 4" clause.
 *         .select() //Returns a stream of records wrapped in a Stream object.  
 *         .toArray(10); //Terminal method in the Stream class that executes the query and returns the result. 
 * 
 *   
 *   
 * 
 * Error handling
 * --------------
 * 
 * The GlideQuery API throws an error when your query has a problem, and includes a clear explanation to help guide you. GlideQuery checks for:
 * 
 * *   Invalid fields
 * *   Invalid value types for a field
 * *   Invalid values for choice fields
 * *   Invalid query operators
 * 
 * For example, this code sample would throw an error because the queried field does not exist in the table.
 * 
 *     new global.GlideQuery('task')
 *         .where('id', '4717dfe5a9fe198100450448b2404c16') // should be 'sys_id'
 *         .select('description', 'severity')
 *         .toArray(100);
 *       // Error: Unable to find field 'id' in table 'task'. Known fields: active, activity_due, ...
 * 
 * This code sample would throw an error because the data type of one of the arguments is incorrect.
 * 
 *     new global.GlideQuery('task')
 *         .where('priority', 'one') // priority is an integer (should be 1)
 *         .select('description', 'severity')
 *         .toArray(100);
 *       // Error: Unable to match value ['one'] with field 'priority' in table 'task'. Expecting type 'integer'
 * 
 *   
 *   
 * 
 * Reuse
 * -----
 * 
 * Because GlideQuery objects are immutable, you can reuse them later in other parts of your code. For example, this script creates a query and then uses the GlideQuery object later to generate a report.
 * 
 *     var highPriorityTasks = new global.GlideQuery('task')
 *         .where('active', true)
 *         .where('priority', 1);
 *     
 *     generateReport(highPriorityTasks);
 *     notifyOwners(highPriorityTasks);
 *     var avgReassignmentCount = highPriorityTasks
 *         .avg('reassignment_count')
 *         .orElse(0)
 *     
 * 
 *   
 *   
 * 
 * Limitations
 * -----------
 * 
 * The GlideQuery API does not support:
 * 
 * *   Reading or writing to tables that do not allow access from other scopes.
 * *   Reading encoded queries.
 * *   GlideDate or GlideDateTime objects, which are read as JavaScript strings.
 * *   FX Currency fields.
 * *   Queries with ambiguous conditional logic. For example, the following query is unclear because the system does not know whether to execute `(active = true AND name != null) OR last_name = Luddy` or `active = true AND (name != null OR last_name = Luddy)`.
 *     
 *         var user = new global.GlideQuery('sys_user')
 *           .where('active', true)
 *           .whereNotNull('name')
 *           .orWhere('last_name', 'Luddy')
 *           .selectOne()
 *           .get()
 *     
 *     See the [where()](dev.do#!/reference/api/rome/server/ "Adds a Where clause to the query that returns values based on a given condition.") method to understand how to nest a child query instead.
 *     
 * 
 * Note: Because the GlideQuery API converts GlideRecord objects into standard JavaScript objects, it may take longer to execute queries. To reduce performance issues, avoid creating loops that iterate over large numbers of records.
 * 
 */
declare class GlideQuery {

	/**
	 *
	 * @param {string} table Table to query.
	 *
	 */
	constructor(table: string)
	
	/**
	 *
	 * Aggregates a field using a specified aggregation function.
	 *
	 * Use this method to build queries that aggregate against multiple fields or use multiple aggregate functions, or if you must use the groupBy() method. If you only want to aggregate against one field with one function, and you don't need to use groupBy(), then use one of these methods instead:
	 * 	 * 
	 * 	 * *   avg()
	 * 	 * *   min()
	 * 	 * *   max()
	 * 	 * *   count()
	 *
	 * @param {string} aggregateType The type of aggregation function to perform. Options include:
	 * 
	 * *   `min`: Returns the smallest value of all matching records.
	 * *   `max`: Returns the largest value of all matching records.
	 * *   `sum`: Returns the sum of all matching records.
	 * *   `avg`: Returns the average of all matching records.
	 * *   `count`: Returns the number of number of matching records.
	 * @param {string} field Field on which to perform the operation.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	aggregate(aggregateType: string, field: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the aggregate average of a given numeric field.
	 *
	 * You can only use this method on fields of the following types:
	 * 	 * 
	 * 	 * *   Integer
	 * 	 * *   Long
	 * 	 * *   Floating Point Number
	 * 	 * *   Double
	 * 	 * *   Currency
	 *
	 * @param {string} field Field on which to perform the operation.
	 *
	 * @returns {any | undefined} Object that contains the aggregate average of the given field.
	 */
	avg(field: string): any | undefined
	
	/**
	 *
	 * Returns the number of records that match the query.
	 *
	 *
	 * @returns {number} Number of records that match the query.
	 */
	count(): number
	
	/**
	 *
	 * Deletes all records in the table specified by the preceding Where clauses.
	 *
	 *
	 * @returns {void} 
	 */
	deleteMultiple(): void
	
	/**
	 *
	 * Disables updating system fields, or fields with a name that starts with the `sys` prefix, such as sys_created_on, sys_updated_on, and sys_mod_count. Only applies to the specified query.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	disableAutoSysFields(): {[fieldName: string]: string}
	
	/**
	 *
	 * Disables any business rules, flows, workflows, or audit records that would run or be created as the result of the query.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	disableWorkflow(): {[fieldName: string]: string}
	
	/**
	 *
	 * Forces a database update even when no record changes are made. For example, you can use this method to force a business rule to execute.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	forceUpdate(): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns a single record from the query.
	 *
	 * @param {string} key Sys_id of the record to return.
	 * @param {{[fieldName: string]: string}} selectedFields Optional. Additional fields to return in the result.
	 * 
	 * Default: The system always returns the sys_id.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	get(key: string, selectedFields: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Returns an Optional object containing a single record based on a set of name-value pairs to query by. Assumes the '=' operator for each name-value pair.
	 *
	 * @param {{[fieldName: string]: string}} keyValues Object where the keys are the name of the fields, and the values are the values to query for.
	 * @param {{[fieldName: string]: string}} selectedFields Optional. Additional fields to return in the result.
	 * 
	 * Default: The system always returns the sys_id.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	getBy(keyValues: {[fieldName: string]: string}, selectedFields: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Groups the query results by a designated field or fields.
	 *
	 * You must use this method with the aggregate() method.
	 *
	 * @param {{[fieldName: string]: string}} fields Field or fields to group the results by.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	groupBy(fields: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Filters aggregate groups so that you can display only groups of results that match a specified condition.
	 *
	 * Must use this method with the aggregate() or groupBy() methods.
	 *
	 * @param {string} aggregateType The type of aggregation function to perform. Options include:
	 * 
	 * *   `min`: Returns the smallest value of all matching records.
	 * *   `max`: Returns the largest value of all matching records.
	 * *   `sum`: Returns the sum of all matching records.
	 * *   `avg`: Returns the average of all matching records.
	 * *   `count`: Returns the number of number of matching records.
	 * @param {string} field Field on which to perform the operation.
	 * @param {string} operator Numeric operator to use in the operation.
	 * 
	 * Options include:
	 * 
	 * *   `>`: Greater than.
	 * *   `<`: Less than.
	 * *   `>=`: Greater than or equal to.
	 * *   `<=`: Less than or equal to.
	 * *   `=`: Equal to.
	 * *   `!=`: Not equal to.
	 * @param {number} value Number value to use in the operation.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	having(aggregateType: string, field: string, operator: string, value: number): {[fieldName: string]: string}
	
	/**
	 *
	 * Inserts a record and returns an Optional object containing the record.
	 *
	 * @param {{[fieldName: string]: string}} keyValues Object containing name-value pairs to insert into the record. Unspecified fields will be null.
	 * @param {{[fieldName: string]: string}} selectedFields Optional. Additional fields to return in the result.
	 * 
	 * Default: The system always returns the sys_id.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	insert(keyValues: {[fieldName: string]: string}, selectedFields: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Updates an existing record, or inserts a new record if one does not already exist.
	 *
	 * @param {{[fieldName: string]: string}} changes Object containing name-value pairs to update or insert into the record.
	 * @param {{[fieldName: string]: string}} selectedFields Optional. Additional fields to return in the result.
	 * 
	 * Default: The system always returns the sys_id.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	insertOrUpdate(changes: {[fieldName: string]: string}, selectedFields: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Limits the number of records returned in a query.
	 *
	 * @param {number} limit Number of records to return.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	limit(limit: number): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the aggregate maximum of a given field.
	 *
	 * @param {string} field Field on which to perform the operation.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	max(field: string): any | undefined
	
	/**
	 *
	 * Returns the aggregate minimum of a given field.
	 *
	 * @param {string} field Field on which to perform the operation.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	min(field: string): any | undefined
	
	/**
	 *
	 * Orders the returned result in ascending order by a given field.
	 *
	 * @param {string} fields Comma-delimited fields to order the result by in ascending order.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	orderBy(fields: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Orders the returned result in descending order by a given field.
	 *
	 * @param {string} fieldOrAggregate If the query does not use the aggregate() method, pass the field to order the results by.
	 * 
	 * If the query uses the aggregate() method, pass the type of aggregation function to perform.
	 * 
	 * Options include:
	 * 
	 * *   `min`: Returns the smallest value of all matching records.
	 * *   `max`: Returns the largest value of all matching records.
	 * *   `sum`: Returns the sum of all matching records.
	 * *   `avg`: Returns the average of all matching records.
	 * *   `count`: Returns the number of number of matching records.
	 * @param {string} field Optional. Field to order the result by in descending order. Required for queries using the aggregate() method.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	orderByDesc(fieldOrAggregate: string, field: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Adds an OR clause to a query that returns values based on a given condition.
	 *
	 * Note: Precede this method with the where(), whereNull(), or whereNotNull() methods.
	 *
	 * @param {{[fieldName: string]: string}} fieldOrQuery Field or another GlideQuery object used in the where clause. If passing a field, you can dot-walk to a desired value. For example, `'company.name'`.
	 * @param {string} operator Optional. Operator used in the OR clause. If you do not pass an argument, the system uses the = operator. You do not need to include a placeholder value.
	 * @param {any} value Value used in the OR clause.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	orWhere(fieldOrQuery: {[fieldName: string]: string}, operator: string, value: any): {[fieldName: string]: string}
	
	/**
	 *
	 * Adds an OR clause that returns records that do not contain a null value in a given field.
	 *
	 * Note: Precede this method with the where(), whereNull(), or whereNotNull() methods.
	 *
	 * @param {string} field Field used in the query.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	orWhereNotNull(field: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Adds an OR clause to a query that returns records that contain a null value in a given field.
	 *
	 * Note: Precede this method with the where(), whereNull(), or whereNotNull() methods.
	 *
	 * @param {string} field Field used in the query.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	orWhereNull(field: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the results of the query as a Stream object containing the specified fields.
	 *
	 * Note: Use a terminal method in the Stream class to get the result of the query. For more information, see [Stream](dev.do#!/reference/api/rome/server/ "The Stream API interacts with a stream of items such as records. For example, you can use the forEach() method to update the state of each record in a stream returned by the GlideQuery API.").
	 * 	 * 
	 * 	 * You can append a flag to a field name to return the field's metadata instead of the field's value. For example, using the field name `company$DISPLAY` returns the display value of a company field. Possible flags include:
	 * 	 * 
	 * 	 * *   `DISPLAY`: Returns the display value of a field.
	 * 	 * *   `CURRENCY_CODE`: Returns the currency code of a currency field. For example, `USD`.
	 * 	 * *   `CURRENCY_DISPLAY`: Returns the currency display value of a currency field. For example, `¥123.45`.
	 * 	 * *   `CURRENCY_STRING`: Returns the currency string of a currency field. For example, `JPY;123.45`.
	 *
	 * @param {{[fieldName: string]: string}} fields Optional. Fields to display in the result. You can provide any number of fields as arguments, dot-walk to a desired value, or use a flag. For example:
	 * 
	 *     select('first_name', 'location.city', 'company$DISPLAY');
	 * 
	 * or
	 * 
	 *     select(['first_name', 'location.city', 'company$DISPLAY']);
	 * 
	 * Default: The system always returns the sys_id.
	 *
	 * @returns {{[fieldName: string]: string}} Object used to interact with a stream of items such as records.
	 */
	select(fields: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the result of the query as an Optional object containing specified fields.
	 *
	 * Use this method when returning a single record, or to test if a record exists. If returning multiple records, use the select() method to return a Stream object.
	 * 	 * 
	 * 	 * You can append a flag to a field name to return the field's metadata instead of the field's value. For example, using the field name `company$DISPLAY` returns the display value of a company field. Possible flags include:
	 * 	 * 
	 * 	 * *   `DISPLAY`: Returns the display value of a field.
	 * 	 * *   `CURRENCY_CODE`: Returns the currency code of a currency field. For example, `USD`.
	 * 	 * *   `CURRENCY_DISPLAY`: Returns the currency display value of a currency field. For example, `¥123.45`.
	 * 	 * *   `CURRENCY_STRING`: Returns the currency string of a currency field. For example, `JPY;123.45`.
	 *
	 * @param {{[fieldName: string]: string}} fields Optional. Fields to display in the result. You can provide any number of fields as arguments, dot-walk to a desired value, or use a flag. For example:
	 * 
	 *     selectOne('first_name', 'location.city', 'company$DISPLAY');
	 * 
	 * or
	 * 
	 *     selectOne(['first_name', 'location.city', 'company$DISPLAY']);
	 * 
	 * Default: The system always returns the sys_id.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	selectOne(fields: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Returns the aggregate sum of a given numeric field.
	 *
	 * You can only use this method on fields of the following types:
	 * 	 * 
	 * 	 * *   Integer
	 * 	 * *   Long
	 * 	 * *   Floating Point Number
	 * 	 * *   Double
	 * 	 * *   Currency
	 *
	 * @param {string} field Field on which to perform the operation.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	sum(field: string): any | undefined
	
	/**
	 *
	 * Returns a GlideRecord object that represents the current query. Returns a GlideAggregrate object if the query uses the GlideQuery.aggregate() method.
	 *
	 * After transforming the query, use the query() method in the [GlideRecord](dev.do#!/reference/api/rome/server/ "Scoped GlideRecord is used for database operations.") or [GlideAggregate](dev.do#!/reference/api/rome/server/no-namespace/c_GlideAggregateScopedAPI "GlideAggregate enables creating database aggregation queries.") classes to query the database.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} GlideRecord object that contains the query. If you used the GlideQuery.aggregate() method, then the method returns a GlideAggregrate object instead.
	 */
	toGlideRecord(): {[fieldName: string]: string}
	
	/**
	 *
	 * Updates an existing record that matches the defined conditions.
	 *
	 * Before using this method, call the where() method to specify the conditions that a record must meet to be updated.
	 *
	 * @param {{[fieldName: string]: string}} changes Object containing name-value pairs to update in the record. Names must match fields in the table.
	 * @param {{[fieldName: string]: string}} selectedFields Optional. Additional fields to return in the result.
	 * 
	 * Default: The system always returns the sys_id.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	update(changes: {[fieldName: string]: string}, selectedFields: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Updates all existing records that match the defined conditions. Returns the number of records updated.
	 *
	 * Before using this method, call the where() method to specify the conditions that the records must meet to be updated.
	 *
	 * @param {{[fieldName: string]: string}} changes Object containing name-value pairs to update in the record. Names must match fields in the table.
	 *
	 * @returns {{[fieldName: string]: string}} Object containing the number of records that were updated. Keys include:
	 * 
	 * *   `rowCount`: Number of rows updated in the table.
	 */
	updateMultiple(changes: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Adds a Where clause to the query that returns values based on a given condition.
	 *
	 * Note: Do not precede this method with the orWhere(), orWhereNull(), or orWhereNotNull() methods.
	 *
	 * @param {{[fieldName: string]: string}} fieldOrQuery Field or another GlideQuery object used in the where clause. If passing a field, you can dot-walk to a desired value. For example, `'company.name'`.
	 * @param {string} operator Optional. Operator used in the where clause. If you do not pass an argument, the system uses the = operator.
	 * @param {any} value Value used in the where clause.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	where(fieldOrQuery: {[fieldName: string]: string}, operator: string, value: any): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns records that do not contain a null value in a given field.
	 *
	 * Note: Do not precede this method with the orWhere(), orWhereNull(), or orWhereNotNull() methods.
	 *
	 * @param {string} field Field used in the query.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	whereNotNull(field: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns records that contain a null value in a given field.
	 *
	 * Note: Do not precede this method with the orWhere(), orWhereNull(), or orWhereNotNull() methods.
	 *
	 * @param {string} field Field used in the query.
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	whereNull(field: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Executes the query using the GlideRecordSecure API to securely query the database while honoring ACLs.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} The query object being built.
	 */
	withAcls(): {[fieldName: string]: string}
	
}

/** 
 * Build complex queries such as:
 * 
 *     category='hardware' OR category='software' AND priority='2' AND priority='1'
 * 
 *   
 *   
 * In the case of addCondition(), an implied AND is added.  
 *   
 * This class has no constructor. A GlideQueryCondition object is returned by the following methods:
 * 
 * *   addActiveQuery()
 * *   addInactiveQuery()
 * *   addJoinQuery()
 * *   addNotNullQuery()
 * *   addNullQuery()
 * *   addQuery()
 * 
 *   
 *   
 * If there is a complicated set of AND and OR queries, a single encoded query containing all conditions simplifies the query creation. To simplify the query creation, create a query in a list view, right-click the query, and select Copy query. It creates a single encoded query string to return your result set. Use that string as a parameter in an addEncodedQuery() call.  
 *   
 * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.  
 *   
 * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
 * 
 */
declare class GlideQueryCondition {

	/**
	 *
	 * Adds an AND condition to the current condition.
	 *
	 * Table 2. Returns
	 * 	 * 
	 * 	 * Type
	 * 	 * 
	 * 	 * Description
	 * 	 * 
	 * 	 * GlideQueryCondition
	 * 	 * 
	 * 	 * A reference to a GlideQueryConditon that was added to the GlideRecord.
	 *
	 * @param {string} name The name of a field.
	 * @param {string} oper (Optional) The operator for the query. If you do not specify an operator, the condition uses an equals operator.
	 * @param {{[fieldName: string]: string}} value The value to query on.
	 *
	 * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
	 */
	addCondition(name: string, oper: string, value: {[fieldName: string]: string}): GlideQueryCondition
	
	/**
	 *
	 * Appends a two-or-three parameter OR condition to an existing GlideQueryCondition.
	 *
	 * addOrCondition() works in conjunction with any of the [addQuery()](https://developer.servicenow.com/go_to_api.do?ID=r_ScopedGlideRecordAddQuery_String_String_Object&v=rome) methods to `OR` the specified query parameters to the query previously constructed using addQuery().
	 * 	 * 
	 * 	 * addOrCondition() is typically called with three parameters; table field, operator, and comparison value. It can be called with only two parameters, table field and comparison value, such as `qc.addOrCondition('category', 'software');`. The operator in this case is assumed to be "equal to".
	 * 	 * 
	 * 	 * Table 1. Parameters
	 * 	 * 
	 * 	 * Name
	 * 	 * 
	 * 	 * Type
	 * 	 * 
	 * 	 * Description
	 * 	 * 
	 * 	 * name
	 * 	 * 
	 * 	 * String
	 * 	 * 
	 * 	 * Field name
	 * 	 * 
	 * 	 * oper
	 * 	 * 
	 * 	 * String
	 * 	 * 
	 * 	 * (Optional) Query operator. The available values are dependent on the data type of the value parameter.
	 * 	 * 
	 * 	 * Numbers:
	 * 	 * 
	 * 	 * *   =
	 * 	 * *   !=
	 * 	 * *   >
	 * 	 * *   >=
	 * 	 * *   <
	 * 	 * *   <=
	 * 	 * 
	 * 	 * Strings (must be in upper case):
	 * 	 * 
	 * 	 * *   =
	 * 	 * *   !=
	 * 	 * *   IN
	 * 	 * *   STARTSWITH
	 * 	 * *   ENDSWITH
	 * 	 * *   CONTAINS
	 * 	 * *   DOESNOTCONTAIN
	 * 	 * 
	 * 	 * value
	 * 	 * 
	 * 	 * Object
	 * 	 * 
	 * 	 * Value on which to query (not case-sensitive).
	 * 	 * 
	 * 	 * Note: All passed in arrays must contain a minimum of two elements. Single element arrays are not supported.
	 * 	 * 
	 * 	 * Table 2. Returns
	 * 	 * 
	 * 	 * Type
	 * 	 * 
	 * 	 * Description
	 * 	 * 
	 * 	 * GlideQueryCondition
	 * 	 * 
	 * 	 * A reference to a GlideQueryConditon that was added to the GlideRecord.
	 *
	 * @param {string} name Field name
	 * @param {string} oper (Optional) Query operator. The available values are dependent on the data type of the value parameter.
	 * 
	 * Numbers:
	 * 
	 * *   =
	 * *   !=
	 * *   >
	 * *   >=
	 * *   <
	 * *   <=
	 * 
	 * Strings (must be in upper case):
	 * 
	 * *   =
	 * *   !=
	 * *   IN
	 * *   STARTSWITH
	 * *   ENDSWITH
	 * *   CONTAINS
	 * *   DOESNOTCONTAIN
	 * @param {{[fieldName: string]: string}} value Value on which to query (not case-sensitive).
	 * 
	 * Note: All passed in arrays must contain a minimum of two elements. Single element arrays are not supported.
	 *
	 * @returns {GlideQueryCondition} A reference to a GlideQueryConditon that was added to the GlideRecord.
	 */
	addOrCondition(name: string, oper: string, value: {[fieldName: string]: string}): GlideQueryCondition
	
}

/** 
 * The GlideRecord API is the primary means of interfacing with the database on the server-side code. A GlideRecord is an object that contains records from a single table. Use the API to instantiate a GlideRecord object and add query parameters, filters, limits, and ordering.
 * 
 * See the [GlideRecord](https://developer.servicenow.com/dev.do#!/learn/courses/quebec/app_store_learnv2_scripting_quebec_scripting_in_servicenow/app_store_learnv2_scripting_quebec_server_side_scripting/app_store_learnv2_scripting_quebec_gliderecord) article for details on building and running queries.
 * 
 * For information on a class that performs the same functions as GlideRecord and enforces ACLs, see [Using GlideRecordSecure](https://docs.servicenow.com/bundle/rome-application-development/page/script/glide-server-apis/topic/p_GlideServerAPIs.html#concepthrq5bcgp).
 * 
 * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.
 * 
 * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
 * 
 *   
 *   
 * 
 * Retrieve values from records
 * ----------------------------
 * 
 * In most cases, do not use dot-walking to get values from a record. Dot-walking retrieves the entire object instead of the field value. Retrieving the object uses much more storage and might cause undesirable results when used in arrays or in Service Portal.
 * 
 * Instead of retrieving the entire object, you can use one of the following methods to copy the field values:
 * 
 * *   [getValue()](dev.do#!/reference/api/rome/server/ "Retrieves the string value of an underlying element in a field.")
 * *   [getDisplayValue()](dev.do#!/reference/api/rome/server/ "Retrieves the display value for the current record.")
 * 
 * If dot-walking through a GlideElement object is necessary, use the toString() method to retrieve values. For example, you might need the current caller's manager sys_id to set another reference field. The following example shows how to get the string value instead of the entire object:
 * 
 *     var mgr = current.caller_id.manager.toString();
 * 
 *   
 *   
 * 
 * See also:
 * 
 * *   [GlideAggregate](dev.do#!/reference/api/rome/server/no-namespace/c_GlideAggregateScopedAPI "GlideAggregate enables creating database aggregation queries.")
 * *   [GlideElement](dev.do#!/reference/api/rome/server/no-namespace/c_GlideElementScopedAPI "The Scoped GlideElement API provides a number of convenient script methods for dealing with fields and their values. Scoped GlideElement methods are available for the fields of the current GlideRecord.")
 * *   [GlideQuery](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI "The GlideQuery API is an alternative to GlideRecord to perform CRUD operations on record data from server-side scripts.")
 * 
 */
declare class GlideRecord {

	/**
	 *
	 * @param {string} tableName The table to be used.
	 *
	 */
	constructor(tableName: string)
	
	/**
	 *
	 * Adds a filter to return active records.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} Filter to return active records.
	 */
	addActiveQuery(): {[fieldName: string]: string}
	
	/**
	 *
	 * Adds an encoded query to other queries that may have been set.
	 *
	 * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.
	 * 	 * 
	 * 	 * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
	 * 	 * 
	 * 	 * To learn more about building searches using APIs, see [Implement Zing search using APIs](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/search-administration/task/implement-zing-search-api.html).
	 *
	 * @param {string} query An [encoded query string](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html).
	 *
	 * @returns {void} Method does not return a value
	 */
	addEncodedQuery(query: string): void
	
	/**
	 *
	 * Applies a pre-defined GlideDBFunctionBuilder object to a record.
	 *
	 * Use the GlideDBFunctionBuilder scoped class to define a function. After the function is defined, use the addFunction(Object function) method to apply the function to a record.
	 *
	 * @param {{[fieldName: string]: string}} function GlideDBFunctionBuilder object that defines a SQL operation.
	 *
	 * @returns {void} Method does not return a value
	 */
	addFunction(func: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Adds a filter to return records based on a relationship in a table related to the current GlideRecord.
	 *
	 * You can use this method to find all the users that are in the database group via the Group Member [sys_user_grmember] table, or to find all problems that have an assigned incident via the incident.problem_id relationship.
	 * 	 * 
	 * 	 * This is not a true database join; rather, addJoinQuery() adds a subquery. So, while the result set is limited based on the join, the only fields that you have access to are those on the base table (those which are in the table with which the GlideRecord was initialized.)
	 * 	 * 
	 * 	 * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.
	 * 	 * 
	 * 	 * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
	 *
	 * @param {string} joinTable Name of table to use in the join, such as 'incident'.
	 * @param {string} primaryField Optional. Name of the field in the GlideRecord to use to join the field specified in the joinTableField parameter.
	 * 
	 * Default: sys_id
	 * @param {string} joinTableField Optional. Name of the field in the table specified in joinTable to use to join the tables.
	 * 
	 * Default: First field in the table specified in joinTable that is a reference field to the current GlideRecord table.
	 *
	 * @returns {GlideQueryCondition} Filter that lists records where the relationships match.
	 */
	addJoinQuery(joinTable: string, primaryField: string, joinTableField: string): GlideQueryCondition
	
	/**
	 *
	 * A filter that specifies records where the value of the field passed in the parameter is not null.
	 *
	 * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.
	 * 	 * 
	 * 	 * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
	 *
	 * @param {string} fieldName The name of the field to be checked.
	 *
	 * @returns {GlideQueryCondition} A filter that specifies records where the value of the field passed in the parameter is not null.
	 */
	addNotNullQuery(fieldName: string): GlideQueryCondition
	
	/**
	 *
	 * Adds a filter to return records where the value of the specified field is null.
	 *
	 * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.
	 * 	 * 
	 * 	 * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
	 *
	 * @param {string} fieldName The name of the field to be checked.
	 *
	 * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
	 */
	addNullQuery(fieldName: string): GlideQueryCondition
	
	/**
	 *
	 * Build a search query and return the rows that match the request.
	 *
	 * If you are familiar with SQL, this method is similar to the "where" clause. One or more addQuery() calls can be made in a single query; in this case the queries are AND'ed. If any of the query statements need to be OR'ed, use the GlideQueryCondition method [addOrCondition()](https://developer.servicenow.com/go_to_api.do?ID=r_ScopedGlideQueryConditionOrAddCondition_String_name_String_oper_Object_value&v=rome).
	 * 	 * 
	 * 	 * When addQuery() is called with only two parameters, table name and comparison value, such as `myObj.addQuery('category','Hardware');`, the operator is assumed to be "equal to".
	 * 	 * 
	 * 	 * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.
	 * 	 * 
	 * 	 * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
	 *
	 * @param {string} name Table field name. If you are not querying a table field, use these reserved variables:
	 * 
	 * *   123TEXTQUERY321: Adds a search term to the query. Use this option to return matching values from any field in the table. Use the term you want to query as the value.
	 * *   123TEXTINDEXGROUP321: Adds a text index group to the query. Use the name of the text index group from the Text Index Groups [ts_index_group] table you want to query as the value. For more information about text index groups, see [Configure multiple tables for indexing and searching](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/search-administration/task/index-multiple-tables.html).
	 * @param {{[fieldName: string]: string}} value Value on which to query (not case-sensitive).
	 *
	 * @returns {GlideQueryCondition} Query condition added to the GlideRecord.
	 */
	addQuery(name: string, value: {[fieldName: string]: string}): GlideQueryCondition
	
	/**
	 *
	 * Provides the ability to build a request, which when executed, returns the rows from the specified table, that match the request.
	 *
	 * If you are familiar with SQL, this method is similar to the "where" clause. One or more addQuery() calls can be made in a single query; in this case the queries are AND'ed. If any of the query statements need to be OR'ed, use the GlideQueryCondition method [addOrCondition()](dev.do#!/reference/api/rome/server/no-namespace/c_GlideQueryConditionScopedAPI#r_ScopedGlideQueryConditionOrAddCondition_String_name_String_oper_Object_value "Appends a two-or-three parameter OR condition to an existing GlideQueryCondition.").
	 * 	 * 
	 * 	 * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.
	 * 	 * 
	 * 	 * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
	 *
	 * @param {string} name Table field name.
	 * @param {string} operator Query operator. The available values are dependent on the data type of the value parameter.
	 * 
	 * Numbers:
	 * 
	 * *   =
	 * *   !=
	 * *   >
	 * *   >=
	 * *   <
	 * *   <=
	 * 
	 * Strings (must be in upper case):
	 * 
	 * *   =
	 * *   !=
	 * *   IN
	 * *   NOT IN
	 * *   STARTSWITH
	 * *   ENDSWITH
	 * *   CONTAINS
	 * *   DOES NOT CONTAIN
	 * *   INSTANCEOF
	 * @param {{[fieldName: string]: string}} value Value on which to query (not case-sensitive).
	 *
	 * @returns {GlideQueryCondition} The query condition that was added to the GlideRecord.
	 */
	addQuery(name: string, operator: string, value: {[fieldName: string]: string}): GlideQueryCondition
	
	/**
	 *
	 * Adds a filter to return records using an encoded query string.
	 *
	 * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.
	 * 	 * 
	 * 	 * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
	 *
	 * @param {string} query An [encoded query string](https://docs.servicenow.com/bundle/rome-platform-administration/page/use/using-lists/concept/c_EncodedQueryStrings.html) .
	 *
	 * @returns {GlideQueryCondition} The query condition added to the GlideRecord.
	 */
	addQuery(query: string): GlideQueryCondition
	
	/**
	 *
	 * Provides atomic add and subtract operations on a specified number field at the database level for the current GlideRecord object.
	 *
	 * Typically, a GlideRecord object is written as one record in a database. Individual field values are stored as defined. For code that adds a value to a GlideRecord field, it simply saves the field to the database with the new value, rather than atomically incrementing it.
	 * 	 * 
	 * 	 * For example, when the following code is executed, the value of the u_count field in the database is 2.
	 * 	 * 
	 * 	 *     gs.info(now_GR.u_count); // "1" 
	 * 	 *     now_GR.u_count += 1;
	 * 	 *     now_GR.update();
	 * 	 *     now_GR.get(now_GR.sys_id);
	 * 	 *     gs.info(now_GR.u_count); // "2"
	 * 	 * 
	 * 	 * If another user concurrently runs identical code, instead of the two operations each adding 1 to u_count, the net effect is that u_count only contains 2, with one operation's update actually being lost.
	 * 	 * 
	 * 	 * Conversely, the addValue() method performs the addition/subtraction in the database when the record is updated as an atomic operation. Two operations running concurrently each properly update the field.
	 * 	 * 
	 * 	 *     gs.info(now_GR.u_count); // "1" 
	 * 	 *     now_GR.addValue(”u_count”, 1); 
	 * 	 *     now_GR.update(); 
	 * 	 *     now_GR.get(now_GR.sys_id); // The record must be reloaded from the database to observe the result
	 * 	 *     gs.info(now_GR.u_count); // "3", if executed concurrently with another user 
	 * 	 * 
	 * 	 * Note: The new value is not read back from the database unless explicitly done so.
	 * 	 * 
	 * 	 * Like setValue(), addValue() changes only take effect in the database after a subsequent call to update() or insert(). If insert() is called, the specified field is initialized with the value parameter passed into addValue().
	 * 	 * 
	 * 	 * Note: If setValue() is called for the specified field prior to calling addValue(), the addValue() method is not processed and an error message is logged.
	 *
	 * @param {string} field The name of the field in this GlideRecord to modify.
	 * 
	 * If the associated field is not a numeric type, the operation is ignored.
	 * @param {number} value The amount to add to the value when the record is saved. To perform a subtraction operation, simply pass a negative value.
	 *
	 * @returns {void} Method does not return a value
	 */
	addValue(field: string, value: number): void
	
	/**
	 *
	 * Sets the values of the specified encoded query terms and applies them to the current GlideRecord.
	 *
	 * @param {string} queryString Encoded query to apply to the current GlideRecord.
	 *
	 * @returns {void} 
	 */
	applyEncodedQuery(queryString: string): void
	
	/**
	 *
	 * Determines if the Access Control Rules, which include the user's roles, permit inserting new records in this table.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether the user's roles permit creating of records in this table.
	 * 
	 * Valid values:
	 * 
	 * *   true: Creating permitted
	 * *   false: Creating is not permitted
	 */
	canCreate(): boolean
	
	/**
	 *
	 * Determines if the Access Control Rules, which include the user's roles, permit deleting records in this table.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether the user's roles permit deleting of records in this table.
	 * 
	 * Valid values:
	 * 
	 * *   true: Deleting permitted
	 * *   false: Deleting is not permitted
	 */
	canDelete(): boolean
	
	/**
	 *
	 * Determines if the Access Control Rules, which include the user's roles, permit reading records in this table.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether the user's roles permit reading of records in this table.
	 * 
	 * Valid values:
	 * 
	 * *   true: Reading permitted
	 * *   false: Reading is not permitted
	 */
	canRead(): boolean
	
	/**
	 *
	 * Determines if the Access Control Rules, which include the user's roles, permit editing records in this table.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether the user's roles permit writing of records in this table.
	 * 
	 * Valid values:
	 * 
	 * *   true: Writing permitted
	 * *   false: Writing is not permitted
	 */
	canWrite(): boolean
	
	/**
	 *
	 * Sets a range of rows to be returned by subsequent queries.
	 *
	 * @param {number} firstRow First row to include. Because the index starts at 0, a value of 0 returns the first row.
	 * @param {number} lastRow 0-based row number of the first row NOT to return. Behaves similar to Java's String.substring(a,b) method.
	 * 
	 * For example, if lastRow = 4 and firstRow = 2, two records are returned (4-2).
	 * @param {boolean} forceCount Optional. Flag that indicates whether to force a row count query. In most implementations of this call, the row count is performed. There are some outlying cases, such as text searches, were a row count is not performed. Setting this flag ensures that the row count occurs.
	 * 
	 * Valid values:
	 * 
	 * *   true: Row count always occurs.
	 * *   false: Row count occurs if implemented in normal execution of method.
	 * 
	 * Default: false
	 *
	 * @returns {void} Method does not return a value
	 */
	chooseWindow(firstRow: number, lastRow: number, forceCount: boolean): void
	
	/**
	 *
	 * Deletes multiple records that satisfy the query condition.
	 *
	 * This method does not delete attachments.
	 * 	 * 
	 * 	 * Do not use deleteMultiple() on tables with currency fields, delete these records individually. Also, do not use this method with the chooseWindow() or setLimit() methods when working with large tables.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	deleteMultiple(): void
	
	/**
	 *
	 * Deletes the current record.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether the record was successfully deleted.
	 * 
	 * Valid values:
	 * 
	 * *   true: Record was deleted.
	 * *   false: No record was found to delete.
	 */
	deleteRecord(): boolean
	
	/**
	 *
	 * Returns the specified record in the current GlideRecord object.
	 *
	 * This method accepts either one or two parameters. If only a single parameter is passed in, the method assumes that it is the sys_id of the desired record. If not found, it then tries to match the value against the display value. If two parameters are passed in, the first is the name of the column within the GlideRecord to search. The second is the value to search for.
	 * 	 * 
	 * 	 * If multiple records are found, use next() to access the additional records.
	 *
	 * @param {{[fieldName: string]: string}} name Optional. Name of the instantiated GlideRecord column to search for the specified value parameter. If only a single parameter is passed in, the method assumes that this parameter is the sys_id or display value.
	 * @param {{[fieldName: string]: string}} value Value to match.
	 *
	 * @returns {boolean} Indicates whether the requested record was located:
	 * 
	 * *   true: record was found
	 * *   false: record was not found
	 */
	get(name: {[fieldName: string]: string}, value: {[fieldName: string]: string}): boolean
	
	/**
	 *
	 * Returns the dictionary attributes for the specified field.
	 *
	 * @param {string} fieldName Field name for which to return the dictionary attributes
	 *
	 * @returns {string} Dictionary attributes
	 */
	getAttribute(fieldName: string): string
	
	/**
	 *
	 * Returns the current table's label.
	 *
	 *
	 * @returns {string} Label that identifies the table.
	 */
	getClassDisplayValue(): string
	
	/**
	 *
	 * Retrieves the display value for the current record.
	 *
	 *
	 * @returns {string} Display value for the current record.
	 */
	getDisplayValue(): string
	
	/**
	 *
	 * Returns the element's descriptor.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} The element's descriptor.
	 */
	getED(): {[fieldName: string]: string}
	
	/**
	 *
	 * Retrieves the GlideElement object for the specified field.
	 *
	 * The value returned by this method is a complete GlideElement object. The results are the equivalent of dot-walking a field value. For example, `now_GR.getElement('short_description')` provides the same result as `nowGR.short_description`.
	 * 	 * 
	 * 	 * In most cases, do not use dot-walking to get values from a record. Dot-walking retrieves the entire object instead of the field value. Retrieving the object uses much more storage and might cause undesirable results when used in arrays or in Service Portal.
	 * 	 * 
	 * 	 * Instead of retrieving the entire object, you can use one of the following methods to copy the field values:
	 * 	 * 
	 * 	 * *   [getValue()](dev.do#!/reference/api/rome/server/ "Retrieves the string value of an underlying element in a field.")
	 * 	 * *   [getDisplayValue()](dev.do#!/reference/api/rome/server/no-namespace/c_GlideRecordScopedAPI#r_ScopedGlideRecordGetDisplayValue "Retrieves the display value for the current record.")
	 * 	 * 
	 * 	 * If dot-walking through a GlideElement object is necessary, use the toString() method to retrieve values. For example, you might need the current caller's manager sys_id to set another reference field. The following example shows how to get the string value instead of the entire object:
	 * 	 * 
	 * 	 *     var mgr = current.caller_id.manager.toString();
	 * 	 * 
	 * 	 * See also:
	 * 	 * 
	 * 	 * *   [GlideElement – toString()](dev.do#!/reference/api/rome/server/no-namespace/c_GlideElementScopedAPI#r_ScopedGlideElementToString "Converts the value of a GlideRecord field to a string.")
	 * 	 * *   [getElements()](dev.do#!/reference/api/rome/server/ "Returns an array of GlideElement objects. Each object describes a field in the current GlideRecord.")
	 *
	 * @param {string} fieldName Column name for which to return the GlideElement object.
	 *
	 * @returns {{[fieldName: string]: string}} The GlideElement for the specified column of the current record. Each object describes a field in the current GlideRecord.
	 */
	getElement(fieldName: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns an array of GlideElement objects. Each object describes a field in the current GlideRecord.
	 *
	 * If dot-walking through a GlideElement object is necessary, use the toString() method to retrieve values. For example, you might need the current caller's manager sys_id to set another reference field. The following example shows how to get the string value instead of the entire object:
	 * 	 * 
	 * 	 *     var mgr = current.caller_id.manager.toString();
	 * 	 * 
	 * 	 * See also:
	 * 	 * 
	 * 	 * *   [GlideElement – toString()](dev.do#!/reference/api/rome/server/no-namespace/c_GlideElementScopedAPI#r_ScopedGlideElementToString "Converts the value of a GlideRecord field to a string.")
	 * 	 * *   [getElement()](dev.do#!/reference/api/rome/server/no-namespace/c_GlideRecordScopedAPI#r_ScopedGlideRecordGetElement_String "Retrieves the GlideElement object for the specified field.")
	 *
	 *
	 * @returns {{[fieldName: string]: string}} Array of [GlideElement](dev.do#!/reference/api/rome/server/no-namespace/c_GlideElementScopedAPI "The Scoped GlideElement API provides a number of convenient script methods for dealing with fields and their values. Scoped GlideElement methods are available for the fields of the current GlideRecord.") objects. Each object describes a field in the current GlideRecord.
	 */
	getElements(): {[fieldName: string]: string}
	
	/**
	 *
	 * Retrieves the query condition of the current result set as an encoded query string.
	 *
	 * For details, see [Encoded query strings](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html).
	 *
	 *
	 * @returns {string} 
	 */
	getEncodedQuery(): string
	
	/**
	 *
	 * Returns the field's label.
	 *
	 *
	 * @returns {string} Field's label
	 */
	getLabel(): string
	
	/**
	 *
	 * Retrieves the last error message. If there is no last error message, null is returned.
	 *
	 *
	 * @returns {string} The last error message as a string.
	 */
	getLastErrorMessage(): string
	
	/**
	 *
	 * Retrieves the link to the current record.
	 *
	 * @param {boolean} noStack Flag indicating whether to append the sysparm_stack parameter to the returned link. This parameter specifies the page to visit after closing the current link.
	 * 
	 * Valid values:
	 * 
	 * *   true: Do not attach the sysparm_stack parameter.
	 * *   false: Attach the sysparm_stack parameter.
	 * 
	 * If true, the sysparm_stack parameter is not appended to the link.
	 *
	 * @returns {string} Link to the current record.
	 */
	getLink(noStack: boolean): string
	
	/**
	 *
	 * Retrieves the class name for the current record.
	 *
	 *
	 * @returns {string} The class name.
	 */
	getRecordClassName(): string
	
	/**
	 *
	 * Retrieves the number of rows in the query result.
	 *
	 *
	 * @returns {number} Number of rows.
	 */
	getRowCount(): number
	
	/**
	 *
	 * Retrieves the name of the table associated with the GlideRecord.
	 *
	 *
	 * @returns {string} The table name
	 */
	getTableName(): string
	
	/**
	 *
	 * Gets the primary key of the record, which is usually the sys_id unless otherwise specified.
	 *
	 *
	 * @returns {string} The unique primary key as a String, or null if the key is null.
	 */
	getUniqueValue(): string
	
	/**
	 *
	 * Retrieves the string value of an underlying element in a field.
	 *
	 * Note: If the Platform Encryption plugin is enabled and the instance has access to the key, this method returns clear text values from encrypted fields. If the instance does not have access to the key, this method returns the encrypted value. For more information, see [Platform Encryption](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/now-platform-encryption/concept/now-platform-encryption.html).
	 *
	 * @param {string} name The name of the field to get the value from.
	 *
	 * @returns {string} The string value of the underlying element. Returns null if the field is empty or the field does not exist. Boolean values return as "0" and "1" string values instead of false and true.
	 */
	getValue(name: string): string
	
	/**
	 *
	 * Determines if there are any more records in the GlideRecord object.
	 *
	 *
	 * @returns {boolean} True if there are more records in the query result set.
	 */
	hasNext(): boolean
	
	/**
	 *
	 * Creates an empty record suitable for population before an insert.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	initialize(): void
	
	/**
	 *
	 * Inserts a new record using the field values that have been set for the current record.
	 *
	 *
	 * @returns {string} Unique ID of the inserted record, or null if the record is not inserted.
	 */
	insert(): string
	
	/**
	 *
	 * Checks to see if the current database action is to be aborted.
	 *
	 * isActionAborted() is initialized (set to false) for new threads and by the next() method.
	 *
	 *
	 * @returns {boolean} Flag that indicates if the current database action is to be aborted.
	 * 
	 * Valid values:
	 * 
	 * *   true: The current database action is to be aborted.
	 * *   false: The current database action is not to be aborted.
	 */
	isActionAborted(): boolean
	
	/**
	 *
	 * Verifies whether the specified encoded query is valid.
	 *
	 * If the specified encoded query is valid, then the query is applied, just as if you had called [addEncodedQuery()](dev.do#!/reference/api/rome/server/no-namespace/c_GlideRecordScopedAPI#r_ScopedGlideRecordAddEncodedQuery_String "Adds an encoded query to other queries that may have been set."). If the specified encoded query is invalid, then `sys_idNotValidnull` is added as the encoded query.
	 *
	 * @param {string} query Encoded query to validate. See [Encoded query strings](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html).
	 *
	 * @returns {boolean} Flag that indicates whether the specified encoded query is valid.
	 * 
	 * *   true: Passed-in encoded query is valid
	 * *   false: Passed-in encoded query is not valid
	 */
	isEncodedQueryValid(query: string): boolean
	
	/**
	 *
	 * Checks if the current record is a new record that has not yet been inserted into the database.
	 *
	 *
	 * @returns {boolean} True if the record is new and has not been inserted into the database.
	 */
	isNewRecord(): boolean
	
	/**
	 *
	 * Determines if the current table is valid or if the record was successfully retrieved.
	 *
	 *
	 * @returns {boolean} Flag that indicates if the table is valid or if the record was successfully retrieved.
	 * 
	 * Possible values:
	 * 
	 * *   true: Table is valid or the record was successfully retrieved.
	 * *   false: Table is invalid or the record was not successfully retrieved.
	 */
	isValid(): boolean
	
	/**
	 *
	 * Determines if the specified field is defined in the current table.
	 *
	 * @param {string} columnName The name of the field.
	 *
	 * @returns {boolean} True if the field is defined for the current table.
	 */
	isValidField(columnName: string): boolean
	
	/**
	 *
	 * Determines if a record was actually returned by the query/get record operation.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether a record was actually returned by the query/get operation.
	 * 
	 * Valid values:
	 * 
	 * *   true: Record returned by query/get operation.
	 * *   false: End of record set, no record returned.
	 */
	isValidRecord(): boolean
	
	/**
	 *
	 * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique ID to the record.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	newRecord(): void
	
	/**
	 *
	 * Moves to the next record in the GlideRecord object.
	 *
	 * Note: This method fails if there is a field in the table called "next". If that is the case, use the method [_next()](https://developer.servicenow.com/go_to_api.do?ID=SGR-_next&v=rome).
	 *
	 *
	 * @returns {boolean} Flag that indicates if there is a "next" record in the GlideRecord.
	 * 
	 * Valid values:
	 * 
	 * *   true: Move to the next record was successful.
	 * *   false: No more records in the result set.
	 */
	next(): boolean
	
	/**
	 *
	 * Determines if an operation is insert, update, or delete.
	 *
	 * Knowing the operation enables using current.operation() to make a generic business rule which can handle each operation uniquely.
	 * 	 * 
	 * 	 * For information on using the global variable current, refer to [Global variables in business rules](https://docs.servicenow.com/https://staging-docs-servicenow.zoominsoftware.io/bundle/rome-application-development/page/script/business-rules/concept/c_UsingPredefinedGlobalVariables.html).
	 *
	 *
	 * @returns {string} The current operation.
	 * 
	 * Possible values:
	 * 
	 * *   delete
	 * *   insert
	 * *   update
	 */
	operation(): string
	
	/**
	 *
	 * Specifies an orderBy column.
	 *
	 * Call this method more than once to order by multiple columns. Results are arranged in ascending order. To arrange records in descending order, see [Scoped GlideRecord - orderByDesc(String name)](dev.do#!/reference/api/rome/server/ "Specifies a descending orderBy column.").
	 *
	 * @param {string} name Column name to use to order the records in this GlideRecord object.
	 *
	 * @returns {void} Method does not return a value
	 */
	orderBy(name: string): void
	
	/**
	 *
	 * Specifies a descending orderBy column.
	 *
	 * Call this method more than once to order by multiple columns. Results are arranged in descending order. To arrange records in ascending order, see [Scoped GlideRecord - orderBy(String name)](dev.do#!/reference/api/rome/server/no-namespace/c_GlideRecordScopedAPI#r_ScopedGlideRecordOrderBy_String "Specifies an orderBy column.").
	 *
	 * @param {string} name Column name to use to order the records in a GlideRecord object.
	 *
	 * @returns {void} Method does not return a value
	 */
	orderByDesc(name: string): void
	
	/**
	 *
	 * Runs a query against the table based on the filters specified by query methods such as addQuery() and addEncodedQuery().
	 *
	 * This method queries the GlideRecord table as well as any references of the table. For more information, see [Querying tables in script](https://docs.servicenow.com/bundle/rome-application-development/page/script/server-scripting/concept/c_UsingGlideRecordToQueryTables.html).
	 * 	 * 
	 * 	 * Note: This method fails if there is a field in the table called "query". If that is the case, use the[_query()](dev.do#!/reference/api/rome/server/ "Runs a query against the table based on the filters specified by query methods such as addQuery() and addEncodedQuery(). This method is intended to be used on tables in which there is a column named "query", which might cause errors running the query() method.") method instead.
	 * 	 * 
	 * 	 * See the [GlideRecord](https://developer.servicenow.com/dev.do#!/learn/courses/quebec/app_store_learnv2_scripting_quebec_scripting_in_servicenow/app_store_learnv2_scripting_quebec_server_side_scripting/app_store_learnv2_scripting_quebec_gliderecord) article for details on building and running queries.
	 * 	 * 
	 * 	 * See also:
	 * 	 * 
	 * 	 * *   [GlideAggregate](dev.do#!/reference/api/rome/server/no-namespace/c_GlideAggregateScopedAPI "GlideAggregate enables creating database aggregation queries.")
	 * 	 * *   [GlideQuery](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI "The GlideQuery API is an alternative to GlideRecord to perform CRUD operations on record data from server-side scripts.")
	 * 	 * *   [GlideQueryCondition](dev.do#!/reference/api/rome/server/no-namespace/c_GlideQueryConditionScopedAPI "The scoped GlideQueryCondition API provides additional AND or OR conditions that can be added to the current condition, allowing you to build complex queries.")
	 *
	 * @param {string} name Optional - must also specify value parameter. Name of the field to search for the value specified in the value parameter.
	 * 
	 * Note: This method is typically run without arguments, but you can specify a name-value pair to filter records containing the specified values. If the parameters are specified, the "name=value" condition is added to the query.
	 * @param {string} value Optional - must also specify field parameter. Value to search for in the specified field parameter.
	 *
	 * @returns {void} Method does not return a value
	 */
	query(name: string, value: string): void
	
	/**
	 *
	 * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted. This is often used in business rules.
	 *
	 * Use in an onBefore business rule to prevent the database action from being done. The business rule continues to run after setAbortAction() is called. Calling setAbortAction() does not stop subsequent business rules from executing. Calling this method only prevents the database action from occurring.
	 *
	 * @param {boolean} b True to abort the next action. False if the action is to be allowed.
	 *
	 * @returns {void} Method does not return a value
	 */
	setAbortAction(b: boolean): void
	
	/**
	 *
	 * Sets the limit for number of records are fetched by the GlideRecord query.
	 *
	 * @param {number} maxNumRecords The maximum number of records to fetch.
	 *
	 * @returns {void} Method does not return a value
	 */
	setLimit(maxNumRecords: number): void
	
	/**
	 *
	 * Sets the sys_id value for the current record.
	 *
	 * @param {string} guid GUID to assign to the current record.
	 *
	 * @returns {void} Method does not return a value
	 */
	setNewGuidValue(guid: string): void
	
	/**
	 *
	 * Sets the value of the field with the specified name to the specified value.
	 *
	 * Normally the script does a `now_GR.category = value`. However, if the element name is itself a variable then you can use `now_GR.setValue(elementName, value)`. When setting a value, ensure the data type of the field matches the data type of the value you enter.
	 * 	 * 
	 * 	 * Note: If the Platform Encryption plugin is enabled and the instance has access to the key, this method can insert encrypted data into encrypted fields. If the instance does not have access to the key, this method returns an error. For more information, see [Platform Encryption](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/now-platform-encryption/concept/now-platform-encryption.html).
	 *
	 * @param {string} name Name of the field.
	 * @param {{[fieldName: string]: string}} value Value to assign to the field.
	 *
	 * @returns {void} Method does not return a value
	 */
	setValue(name: string, value: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Enables or disables the running of business rules, script engines, and audit.
	 *
	 * @param {boolean} enable If true (default), enables business rules. If false, disables business rules.
	 *
	 * @returns {void} Method does not return a value
	 */
	setWorkflow(enable: boolean): void
	
	/**
	 *
	 * Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
	 *
	 * @param {string} reason Optional. Reason for the update. The reason appears in the audit record.
	 *
	 * @returns {string} Sys_id of the new or updated record. Returns null if the update fails.
	 */
	update(reason: string): string
	
	/**
	 *
	 * Updates each GlideRecord in a stated query with a specified set of changes.
	 *
	 * This method does not support adding multiple journal entries.
	 * 	 * 
	 * 	 * Note: To ensure expected results, use the setValue() method instead of direct assignments. That is, use `gr.setValue('<field_name>', '4'));` instead of `gr.<field_name> = 4`.
	 * 	 * 
	 * 	 * Note: Do not use this method with the chooseWindow() or setLimit() methods when working with large tables.
	 * 	 * 
	 * 	 * This method sets new values and does not clear existing values. To clear an existing value, use the setValue() method and set the field to null.
	 *
	 *
	 * @returns {void} Method does not return a value
	 */
	updateMultiple(): void
	
	/**
	 *
	 * Moves to the next record in the GlideRecord. Provides the same functionality as next(), use this method if the GlideRecord has a column named next.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether there are more records in the query set.
	 * 
	 * Possible values:
	 * 
	 * *   true: More records in the query set.
	 * *   false: No more records in the query set.
	 */
	_next(): boolean
	
	/**
	 *
	 * Runs a query against the table based on the filters specified by query methods such as addQuery() and addEncodedQuery(). This method is intended to be used on tables in which there is a column named "query", which might cause errors running the query() method.
	 *
	 * This method queries the GlideRecord table as well as any references of the table. For more information, see [Querying tables in script](https://docs.servicenow.com/bundle/rome-application-development/page/script/server-scripting/concept/c_UsingGlideRecordToQueryTables.html).
	 * 	 * 
	 * 	 * See the [GlideRecord](https://developer.servicenow.com/dev.do#!/learn/courses/quebec/app_store_learnv2_scripting_quebec_scripting_in_servicenow/app_store_learnv2_scripting_quebec_server_side_scripting/app_store_learnv2_scripting_quebec_gliderecord) article for details on building and running queries.
	 * 	 * 
	 * 	 * See also:
	 * 	 * 
	 * 	 * *   [GlideAggregate](dev.do#!/reference/api/rome/server/no-namespace/c_GlideAggregateScopedAPI "GlideAggregate enables creating database aggregation queries.")
	 * 	 * *   [GlideQuery](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI "The GlideQuery API is an alternative to GlideRecord to perform CRUD operations on record data from server-side scripts.")
	 * 	 * *   [GlideQueryCondition](dev.do#!/reference/api/rome/server/no-namespace/c_GlideQueryConditionScopedAPI "The scoped GlideQueryCondition API provides additional AND or OR conditions that can be added to the current condition, allowing you to build complex queries.")
	 *
	 * @param {string} name Optional - must also specify value parameter. Name of the field to search for the value specified in the value parameter.
	 * 
	 * Note: This method is typically run without arguments, but you can specify a name-value pair to filter records containing the specified values. If the parameters are specified, the "name=value" condition is added to the query.
	 * @param {string} value Optional - must also specify field parameter. Value to search for in the specified field parameter.
	 *
	 * @returns {void} Method does not return a value
	 */
	_query(name: string, value: string): void
	
}

/** 
 */
declare class GlideSchedule {

	/**
	 *
	 * @param {string} sysID The system ID for the schedule.
	 * @param {string} timeZone The time zone. (Optional)
	 *
	 */
	constructor(sysID: string, timeZone: string)
	
	/**
	 *
	 * Adds a new schedule segment to the current schedule.
	 *
	 * @param {GlideDateTime} startDate The starting date of the new schedule segment.
	 * @param {GlideDuration} offSet The time offset of the new schedule segment.
	 *
	 * @returns {GlideDateTime} The schedule updated with the new schedule segment.
	 */
	add(startDate: GlideDateTime, offSet: GlideDuration): GlideDateTime
	
	/**
	 *
	 * Determines the elapsed time in the schedule between two date time values using the timezone of the schedule or, if that is not specified, the timezone of the session.
	 *
	 * @param {GlideDateTime} startDate The starting datetime.
	 * @param {GlideDateTime} endDate The ending datetime.
	 *
	 * @returns {GlideDuration} The difference between the starting and ending datetime.
	 */
	duration(startDate: GlideDateTime, endDate: GlideDateTime): GlideDuration
	
	/**
	 *
	 * Retrieves the schedule name.
	 *
	 *
	 * @returns {string} The name of the current schedule.
	 */
	getName(): string
	
	/**
	 *
	 * Determines if the specified date and time is within the current schedule.
	 *
	 * @param {GlideDateTime} time Date and time value to check.
	 *
	 * @returns {boolean} Flag that indicates whether the specified date and time is within the schedule.
	 * 
	 * Valid values:
	 * 
	 * *   true: Date and time is within the schedule.
	 * *   false: Date and time are outside of the schedule.
	 */
	isInSchedule(time: GlideDateTime): boolean
	
	/**
	 *
	 * Determines if the current schedule is valid. A schedule is valid if it has at least one schedule span.
	 *
	 *
	 * @returns {boolean} True if the schedule is valid.
	 */
	isValid(): boolean
	
	/**
	 *
	 * Loads a schedule with the schedule information.
	 *
	 * @param {string} sysID The system ID of the schedule.
	 * @param {string} timeZone (Optional) The timezone. If a timezone is not specified, or is nil, the current session timezone is used for the schedule.
	 * @param {string} excludeSpanID Any span to exclude.
	 *
	 * @returns {void} Method does not return a value
	 */
	load(sysID: string, timeZone: string, excludeSpanID: string): void
	
	/**
	 *
	 * Sets the timezone for the current schedule.
	 *
	 * @param {string} timeZone The timezone.
	 *
	 * @returns {void} Method does not return a value
	 */
	setTimeZone(timeZone: string): void
	
	/**
	 *
	 * Determines how much time (in milliseconds) until start time of the next schedule item.
	 *
	 * This function is intended to be called when the GlideSchedule object (cmn_schedule table) is not currently in the schedule window. The whenNext() call returns duration (in ms) until the GlideSchedule object is within the schedule. This function does not return a meaningful value if called when the GlideSchedule object is within the schedule.
	 *
	 * @param {GlideDateTime} time Time to be evaluated
	 * @param {string} timeZone Timezone
	 *
	 * @returns {number} Number of milliseconds until the start time of the next schedule item. Returns -1 if never.
	 */
	whenNext(time: GlideDateTime, timeZone: string): number
	
}

/** 
 * The GlideScopedEvaluator API evaluates records with script fields defined. The scope of the script is defined by the scope of the record.
 * 
 */
declare class GlideScopedEvaluator {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Evaluates a script from a GlideRecord field.
	 *
	 * @param {GlideRecord} grObj The GlideRecord containing a script expression.
	 * @param {string} scriptField (Optional) The name of the field containing the script expression.
	 * @param {{[fieldName: string]: string}} variables (Optional) A map of variables with name-value pairs. These variables are available to the script during execution of this method.
	 *
	 * @returns {{[fieldName: string]: string}} The result of the script execution.
	 */
	evaluateScript(grObj: GlideRecord, scriptField: string, variables: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns a variable from a GlideScopedEvaluator object.
	 *
	 * @param {string} name The name of the variable.
	 *
	 * @returns {{[fieldName: string]: string}} The value of the specified variable.
	 */
	getVariable(name: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Puts a variable into the GlideScopedEvaluator object. These variables are available to the script that this GlideScopedEvaluator object runs.
	 *
	 * @param {string} name The name of the variable.
	 * @param {{[fieldName: string]: string}} value The value of the variable.
	 *
	 * @returns {void} Method does not return a value
	 */
	putVariable(name: string, value: {[fieldName: string]: string}): void
	
}

/** 
 * See the scoped GlideSysAttachment API for methods that return a GlideScriptableInputStream object. The scoped GlideTextReader constructor requires a GlideScriptableInputStream object as an input parameter.
 * 
 */
declare class GlideScriptableInputStream {

}

/** 
 * Processors provide a customizable URL endpoint that can execute arbitrary server-side JavaScript code and produce output such as TEXT, JSON, or HTML. The ScopedGlideScriptedProcessor APIs are used in processor scripts to access the the processor (servlet) capabilities. There are no constructors for the ScopedGlideScriptedProcessor APIs. The methods are called using the global variable g_processor.  
 *   
 * A useful global variable, g_target, is available in processor scripts. It contains the table name extracted from the URL.  
 *   
 * The URL to a processor has the format: https://<instance name.servicenow.com>/<path endpoint>.do?<parameter endpoint>=<value> where the path endpoint and parameter endpoint are defined on the processor form.
 * 
 */
declare class GlideScriptedProcessor {

	/**
	 *
	 * Redirects to the specified URL.
	 *
	 * @param {string} url Destination URL
	 *
	 * @returns {void} Method does not return a value
	 */
	redirect(url: string): void
	
	/**
	 *
	 * Encodes an object as a JSON string and writes it to the current URL.
	 *
	 * @param {{[fieldName: string]: string}} o The object to encode to a JSON string.
	 *
	 * @returns {void} Method does not return a value
	 */
	writeJSON(o: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Writes the specified string to the current URL in the specified character-encoding.
	 *
	 * @param {string} contentType Sets the content type of the response sent to the client, if the response has not been committed, and may include a character-encoding specification.
	 * @param {string} s The string to write.
	 *
	 * @returns {void} Method does not return a value
	 */
	writeOutput(contentType: string, s: string): void
	
	/**
	 *
	 * Writes the specified string to the current URL.
	 *
	 * @param {string} s The string to write.
	 *
	 * @returns {void} Method does not return a value
	 */
	writeOutput(s: string): void
	
}

/** 
 * There is no constructor for this class. Methods are accessed through the static object GlideSecureRandomUtil. The GlideSecureRandomUtil class is available in both global and scoped applications.
 * 
 */
declare class GlideSecureRandomUtil {

	/**
	 *
	 * Generates a pseudo-random integer.
	 *
	 *
	 * @returns {number} The pseudo-randomly generated integer.
	 */
	getSecureRandomInt(): number
	
	/**
	 *
	 * Generates a pseudo-random integer between 0 (inclusive) and the bound (exclusive) value that you pass into the method.
	 *
	 * @param {number} bound The bound value.
	 *
	 * @returns {number} The pseudo-randomly generated integer.
	 */
	getSecureRandomIntBound(bound: number): number
	
	/**
	 *
	 * Generates pseudo-random long value.
	 *
	 *
	 * @returns {number} The pseudo-randomly generated 64-bit integer.
	 */
	getSecureRandomLong(): number
	
	/**
	 *
	 * Generates a random alpha-numeric String with the specified length.
	 *
	 * @param {number} length The length of the string in number of characters.
	 *
	 * @returns {string} The randomly generated string.
	 */
	getSecureRandomString(length: number): string
	
}

/** 
 * Access these methods using the static object GlideSecurityUtils. This class is available in scoped and global scripts.
 * 
 */
declare class GlideSecurityUtils {

	/**
	 *
	 * Removes suspicious encoding to prevent reflected or DOM based cross site scripting.
	 *
	 * @param {string} url The URL to be checked.
	 *
	 * @returns {string} The URL stripped of problem elements.
	 */
	cleanURL(url: string): string
	
	/**
	 *
	 * Removes the domain address from the URL, which leaves the page name and parameters.
	 *
	 * @param {string} url The URL to be turned into a relative URL.
	 *
	 * @returns {string} A relative URL.
	 */
	enforceRelativeURL(url: string): string
	
	/**
	 *
	 * Add escape characters to a script.
	 *
	 * Adding escape characters to a script helps prevent cross-site scripting.
	 *
	 * @param {string} script The script to have escape characters added.
	 *
	 * @returns {string} The script with escape characters added.
	 */
	escapeScript(script: string): string
	
	/**
	 *
	 * Check the specified URL against the system defined white list.
	 *
	 * @param {string} url The URL to be checked against the URL white list.
	 *
	 * @returns {boolean} Returns true if the specified URL is in the white list.
	 */
	isURLWhiteListed(url: string): boolean
	
}

/** 
 * ServiceNow processors are equivalent to Java servlets. Processors provide a customizable URL endpoint that can execute arbitrary server-side JavaScript code and produce output such as TEXT, JSON, or HTML. The GlideServletRequest API is used in processor scripts to access the [HttpServletRequest](http://docs.oracle.com/javaee/1.4/api/javax/servlet/http/HttpServletRequest.html) object. The GlideServletRequest object provides a subset of the HttpServletRequest APIs. The methods are called using the global variable g_request.  
 *   
 * A useful global variable, g_target, is available in processor scripts. It contains the table name extracted from the URL.  
 *   
 * The URL to a processor has the format: https://<instance name.servicenow.com>/<path endpoint>.do?<parameter endpoint>=<value> where the path endpoint and parameter endpoint are defined on the processor form.
 * 
 */
declare class GlideServletRequest {

	/**
	 *
	 * Returns the MIME type of the body of the request.
	 *
	 *
	 * @returns {string} The content type, returns null if the content type is not known.
	 */
	getContentType(): string
	
	/**
	 *
	 * Returns the header value.
	 *
	 * @param {string} name The name of the header to be retrieved.
	 *
	 * @returns {string} The header.
	 */
	getHeader(name: string): string
	
	/**
	 *
	 * Returns a comma-separated list of header names.
	 *
	 *
	 * @returns {string} A comma-separated list of header names.
	 */
	getHeaderNames(): string
	
	/**
	 *
	 * Returns the header values.
	 *
	 * @param {string} name Names of the headers to be retrieved.
	 *
	 * @returns {string} The header values.
	 */
	getHeaders(name: string): string
	
	/**
	 *
	 * Returns the value of the parameter contained in the request URL.
	 *
	 * @param {string} name The name of the parameter to be retrieved. This can be the parameter endpoint from the processor form.
	 *
	 * @returns {string} The parameter value. Returns null if the parameter is not found.
	 */
	getParameter(name: string): string
	
	/**
	 *
	 * Returns an enumeration list of URL parameters that were used in the request URI.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} Java enumerator object list of URL parameters used in the HTTP request URI.
	 */
	getParameterNames(): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the query string from the request.
	 *
	 *
	 * @returns {string} The query string.
	 */
	getQueryString(): string
	
}

/** 
 * ServiceNow processors are equivalent to Java servlets. Processors provide a customizable URL endpoint that can execute arbitrary server-side JavaScript code and produce output such as TEXT, JSON, or HTML. The ScopedGlideServletResponse API is used in processor scripts to access the [HttpServletResponse](http://docs.oracle.com/javaee/1.4/api/javax/servlet/http/HttpServletResponse.html) object. The ScopedGlideServletResponse object provides a subset of the HttpServletResponse APIs. The methods are called using the global variable g_response.  
 *   
 * A useful global variable, g_target, is available in processor scripts. It contains the table name extracted from the URL.  
 *   
 * The URL to a processor has the format: https://<instance name.servicenow.com>/<path endpoint>.do?<parameter endpoint>=<value> where the path endpoint and parameter endpoint are defined on the processor form.
 * 
 */
declare class GlideServletResponse {

	/**
	 *
	 * Sends a temporary redirect to the client.
	 *
	 * @param {string} location The URL to receive the response.
	 *
	 * @returns {void} Method does not return a value
	 */
	sendRedirect(location: string): void
	
	/**
	 *
	 * Sets the MIME type of the response
	 *
	 * @param {string} type The MIME type.
	 *
	 * @returns {void} Method does not return a value
	 */
	setContentType(type: string): void
	
	/**
	 *
	 * Sets a response header to the specified value.
	 *
	 * @param {string} key Specifies the header.
	 * @param {string} value The value to be assigned to the header. If the header exists, it is overwritten.
	 *
	 * @returns {void} Method does not return a value
	 */
	setHeader(key: string, value: string): void
	
	/**
	 *
	 * Sets the status code for the response.
	 *
	 * @param {number} status The status to be set.
	 *
	 * @returns {void} Method does not return a value
	 */
	setStatus(status: number): void
	
}

/** 
 * There are no constructors for creating an instance of a scoped GlideSession object. Instead, use the getSession() method of the scoped GlideSystem API.
 * 
 */
declare class GlideSession {

	/**
	 *
	 * Retrieves a session client value previously set with putClientData().
	 *
	 * Use this method to retrieve data values that were set using the putClientData() method.
	 *
	 * @param {string} paramName Name of the client data to retrieve.
	 *
	 * @returns {string} The client data as a string.
	 */
	getClientData(paramName: string): string
	
	/**
	 *
	 * Returns the client IP address.
	 *
	 *
	 * @returns {string} The IP address.
	 */
	getClientIP(): string
	
	/**
	 *
	 * Returns the application currently selected in the application picker.
	 *
	 * This method requires admin privileges.
	 *
	 *
	 * @returns {string} The currently selected application.
	 */
	getCurrentApplicationId(): string
	
	/**
	 *
	 * Returns the sys_id of the current domain for the logged-in user session.
	 *
	 * The identifier that is returned depends on the domain type and the instantiation of that domain.
	 * 	 * 
	 * 	 * *   If the user is configured in the global domain, and does not use the domain picker to switch domains, the method returns null.
	 * 	 * *   If the user uses the domain picker to switch to the global domain, the method returns the string "global".
	 * 	 * *   For all other domains, the method returns the sys_id of that domain.
	 *
	 *
	 * @returns {string} Sys_id of the session domain of the current logged-in user. This is the same information that appears in the domain picker.
	 */
	getCurrentDomainID(): string
	
	/**
	 *
	 * Returns the session's language code.
	 *
	 *
	 * @returns {string} The session's language code.
	 */
	getLanguage(): string
	
	/**
	 *
	 * Returns the session token.
	 *
	 *
	 * @returns {string} The session token.
	 */
	getSessionToken(): string
	
	/**
	 *
	 * Returns the name of the session's time zone.
	 *
	 *
	 * @returns {string} The name of the session's time zone.
	 */
	getTimeZoneName(): string
	
	/**
	 *
	 * Returns the URL on the stack. Returns null if the stack is empty.
	 *
	 *
	 * @returns {string} The URL. Returns null if the stack is empty.
	 */
	getUrlOnStack(): string
	
	/**
	 *
	 * Returns true if the user is impersonating another user.
	 *
	 *
	 * @returns {boolean} Returns true if the user is impersonating another user; otherwise, returns false.
	 */
	isImpersonating(): boolean
	
	/**
	 *
	 * Returns true if the session is interactive.
	 *
	 * An interactive session is one that involves an end-user interacting with a user interface that then retrieves information from a server. An example of this type of session is when a user logs in using the log-in screen or uses a form to query a data store. A non-interactive session is one that only involves programmatic interaction with a server such as a SOAP request to retrieve data.
	 *
	 *
	 * @returns {boolean} True if the session is interactive.
	 */
	isInteractive(): boolean
	
	/**
	 *
	 * Returns true if the user is logged in.
	 *
	 *
	 * @returns {boolean} True if the user is logged in.
	 */
	isLoggedIn(): boolean
	
	/**
	 *
	 * Sets a session client value that can be retrieved with getClientData(). This method is used in a server side script that runs when a form is created.
	 *
	 * @param {string} paramName Name of the client data to set.
	 * @param {string} paramValue Value of the client data.
	 *
	 * @returns {void} Method does not return a value
	 */
	putClientData(paramName: string, paramValue: string): void
	
}

/** 
 * You access GlideSPScriptable methods by using the global `$sp` object.
 * 
 */
declare class GlideSPScriptable {

	/**
	 *
	 * Returns true if the user can read the specified GlideRecord.
	 *
	 * If the record type is `kb_knowledge`, `sc_cat_item`, or `sc_category`, the method checks if the user can view the item.
	 *
	 * @param {GlideRecord} now_GR The GlideRecord to check.
	 *
	 * @returns {boolean} True if the record is valid and readable.
	 */
	canReadRecord(now_GR: GlideRecord): boolean
	
	/**
	 *
	 * Returns true if the user can read the specified GlideRecord.
	 *
	 * If the record type is `kb_knowledge`, `sc_cat_item`, or `sc_category`, the method checks if the user can view the item.
	 *
	 * @param {string} table Name of the table to query.
	 * @param {string} sysId Sys_id of the record to query.
	 *
	 * @returns {boolean} True if the record is valid and readable.
	 */
	canReadRecord(table: string, sysId: string): boolean
	
	/**
	 *
	 * Returns true if the currently logged in user has permission to view the specified page.
	 *
	 * The system determines permission using roles and user criteria. For more information, see [Configure page security by role](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/build/service-portal/concept/c_PublicAndRolePages.html) and [User criteria for Service Portal](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/build/service-portal/concept/user-criteria.html).
	 *
	 * @param {string} pageID Page ID from the Pages [sp_page] table.
	 *
	 * @returns {boolean} Flag that indicates whether the currently logged in user has permissions to view the specified page. Values include:
	 * 
	 * *   true: The user can view the page.
	 * *   false: Either the user cannot view the page, the given pageID is not valid, or the user is not logged in.
	 */
	canSeePage(pageID: string): boolean
	
	/**
	 *
	 * Returns a model and view model for a `sc_cat_item` or `sc_cat_item_guide`.
	 *
	 * This method is deprecated. Use the getCatalogItem(String sysId, Boolean isOrdering) method instead. This method calls the getCatalogItem(String sysId, Boolean isOrdering) method with the isOrdering parameter set to false, which means that write roles security checking is done.
	 * 	 * 
	 * 	 * This method is a quick way to get the data necessary to render and order a catalog item using `<sp-model />`. If you just need to get a catalog item to show its picture or name, use GlideRecord to query the `sc_cat_item` table.
	 *
	 * @param {string} sysId The sys_id of the catalog item (`sc_cat_item`) or order guide (`sc_cat_item_guide`).
	 *
	 * @returns {{[fieldName: string]: string}} An object containing the catalog item variable model, view, sections, pricing, and client scripts.
	 */
	getCatalogItem(sysId: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns a model and view model for a `sc_cat_item` or `sc_cat_item_guide`.
	 *
	 * @param {string} sysId The sys_id of the catalog item (`sc_cat_item`) or order guide (`sc_cat_item_guide`).
	 * @param {boolean} isOrdering When true, uses create roles security check. When false, uses write roles security check.
	 * 
	 * When users are ordering an item or have it in their cart, check using the create roles.
	 * 
	 * If users are not ordering, for example, somebody is looking at a requested item to see the variables associated with that item, then check using the write roles.
	 *
	 * @returns {{[fieldName: string]: string}} An object containing the catalog item variable model, view, sections, pricing, and client scripts.
	 */
	getCatalogItem(sysId: string, isOrdering: boolean): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the display value of the specified field (if it exists and has a value) from either the widget's `sp_instance` or the `sp_portal` record.
	 *
	 * @param {string} fieldName Name of the field
	 *
	 * @returns {string} The display value from either the `sp_instance` or `sp_portal` record.
	 */
	getDisplayValue(fieldName: string): string
	
	/**
	 *
	 * Returns information about the specified field in the specified GlideRecord.
	 *
	 * @param {GlideRecord} now_GR The GlideRecord to check
	 * @param {string} fieldName The field to find information for
	 *
	 * @returns {{[fieldName: string]: string}} An object containing the field's label, value, displayValue, and type. Returns null if the GlideRecord of field name are not valid, or if the field is not readable.
	 */
	getField(now_GR: GlideRecord, fieldName: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Checks the specified list of field names, and returns an array of valid field names.
	 *
	 * @param {GlideRecord} now_GR The GlideRecord to check
	 * @param {string} field Names A comma separated list of field names.
	 *
	 * @returns {{[fieldName: string]: string}} An array of valid fields.
	 */
	getFields(now_GR: GlideRecord, fieldNames: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Checks the specified list of field names and returns an object of valid field names.
	 *
	 * @param {GlideRecord} now_GR The GlideRecord to check
	 * @param {string} field Names A comma separated list of field names.
	 *
	 * @returns {{[fieldName: string]: string}} An object containing valid field names.
	 */
	getFieldsObject(now_GR: GlideRecord, fieldNames: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Return the form.
	 *
	 * @param {string} tableName The name of the table
	 * @param {string} sysId The form's sys_id
	 *
	 * @returns {{[fieldName: string]: string}} The form
	 */
	getForm(tableName: string, sysId: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns KB articles in the specified category and its subcategories.
	 *
	 * To avoid performance issues, do not use this method to return articles in large categories or articles with inline images. Instead, use getKBArticleSummaries().
	 *
	 * @param {string} sys_id Sys_id of the KB article category.
	 * @param {number} limit Maximum number of KB articles returned.
	 *
	 * @returns {{[fieldName: string]: string}} The articles within the category and its subcategories with:
	 * 
	 * *   A workflow_state of published.
	 * *   A valid_to date greater than or equal to the current date.
	 */
	getKBCategoryArticles(sys_id: string, limit: number): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns Knowledge Base article summaries in the specified category and its subcategories.
	 *
	 * @param {string} sys_id Sys_id of the KB article category.
	 * @param {number} limit Maximum number of KB articles returned.
	 * @param {number} maxChars Maximum number of characters to return from the article text. For full article text, set the value to `-1`.
	 *
	 * @returns {{[fieldName: string]: string}} The articles within the category and its subcategories with:
	 * 
	 * *   A workflow_state of published.
	 * *   A valid_to date greater than or equal to the current date.
	 */
	getKBCategoryArticleSummaries(sys_id: string, limit: number, maxChars: number): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the number of articles in the defined Knowledge Base.
	 *
	 * @param {string} sys_id Sys_id of a Knowledge Base record.
	 *
	 * @returns {number} Number of knowledge articles in the defined Knowledge Base with:
	 * 
	 * *   A workflow_state of published.
	 * *   A valid_to date greater than or equal to the current date.
	 */
	getKBCount(sys_id: string): number
	
	/**
	 *
	 * Returns a list of the specified table's columns in the specified view.
	 *
	 * @param {string} tableName Name of the table
	 * @param {string} view The view by which to filter the columns
	 *
	 * @returns {{[fieldName: string]: string}} An object containing the column names.
	 */
	getListColumns(tableName: string, view: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the (?id=) portion of the URL based on the sp_menu type.
	 *
	 * @param {GlideRecord} page The page
	 *
	 * @returns {string} The href portion of the URL.
	 */
	getMenuHREF(page: GlideRecord): string
	
	/**
	 *
	 * Returns an array of menu items for the specified instance.
	 *
	 * @param {string} sysId sysId of the instance
	 *
	 * @returns {{[fieldName: string]: string}} Menu items for the specified instance
	 */
	getMenuItems(sysId: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the value of the specified parameter.
	 *
	 * @param {string} name The name of the key from the query string or post body.
	 *
	 * @returns {{[fieldName: string]: string}} Returns the specified parameter as an object. Returns null if there is no request, JSON request, or widget.
	 */
	getParameter(name: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the portal record from the Service Portals [sp_portal] table.
	 *
	 *
	 * @returns {GlideRecord} The portal record for the current portal from the Service Portals [sp_portal] table.
	 */
	getPortalRecord(): GlideRecord
	
	/**
	 *
	 * If parameters are provided, returns the GlideRecord identified by the provided table and Sys ID. If no parameters are provided, returns the record identified by the current URL.
	 *
	 * @param {string} table Optional. The table of the record to return. If no parameters are included, returns the table and Sys ID identified by the current URL.
	 * @param {string} sys_id Optional. The Sys ID of the record to return. If no parameters are included, returns the record identified by the current URL.
	 *
	 * @returns {GlideRecord} If parameters are provided, returns the record identified by the provided table and Sys ID.
	 * 
	 * If no parameters are provided, returns the record identified by the current URL.
	 * 
	 * Returns null if the widget is embedded by another widget, or if the record for the provided parameters is not found.
	 */
	getRecord(table: string, sys_id: string): GlideRecord
	
	/**
	 *
	 * Copies display values for the specified fields into the data parameter.
	 *
	 * @param {{[fieldName: string]: string}} data The display values for the specified fields are copied to this object.
	 * @param {GlideRecord} from The GlideRecord to process.
	 * @param {string} names A comma-separated list of field names.
	 *
	 * @returns {void} Method does not return a value
	 */
	getRecordDisplayValues(data: {[fieldName: string]: string}, from: GlideRecord, names: string): void
	
	/**
	 *
	 * For the specified fields, copies the element's name, display value, and value into the data parameter.
	 *
	 * @param {{[fieldName: string]: string}} data The element's name, display value, and value for the specified fields are copied to this object.
	 * @param {GlideRecord} from The GlideRecord to process.
	 * @param {string} names A comma-separated list of field names.
	 *
	 * @returns {void} Method does not return a value
	 */
	getRecordElements(data: {[fieldName: string]: string}, from: GlideRecord, names: string): void
	
	/**
	 *
	 * Copies values for the specified field names from the GlideRecord into the data parameter.
	 *
	 * @param {{[fieldName: string]: string}} data The value for the specified fields are copied to this object.
	 * @param {GlideRecord} from The GlideRecord to process.
	 * @param {string} names A comma-separated list of field names.
	 *
	 * @returns {void} Method does not return a value
	 */
	getRecordValues(data: {[fieldName: string]: string}, from: GlideRecord, names: string): void
	
	/**
	 *
	 * Returns Service Catalog variables associated with a record in String format.
	 *
	 * @param {GlideRecord} now_GR The record to retrieve Service Catalog variables for. Must be a record with Service Catalog variables defined, such as a requested item [sc_req_item] record or an incident submitted through a record producer.
	 * @param {boolean} includeNilResponses Optional. If true, the API includes variables with no user-defined value.
	 *
	 * @returns {string} Service Catalog variables associated with the record.
	 */
	getRecordVariables(now_GR: GlideRecord, includeNilResponses: boolean): string
	
	/**
	 *
	 * Returns an array of Service Catalog variables associated with a record.
	 *
	 * @param {GlideRecord} now_GR The record to retrieve Service Catalog variables for. Must be a record with Service Catalog variables defined, such as a requested item [sc_req_item] record or an incident submitted through a record producer.
	 * @param {boolean} includeNilResponses Optional. If true, the API includes variables with no user-defined value.
	 *
	 * @returns {{[fieldName: string]: string}} Array of Service Catalog variables associated with the record.
	 */
	getRecordVariablesArray(now_GR: GlideRecord, includeNilResponses: boolean): {[fieldName: string]: string}
	
	/**
	 *
	 * Gets the activity stream for the specified record. This method works on tables that extend the task table.
	 *
	 * @param {string} table The table name
	 * @param {string} sysID The sys_id of the record
	 *
	 * @returns {{[fieldName: string]: string}} If a table extending the task table is specified, contains the display_value, sys_id, short_description,number, entries, user_sys_id, user_full_name, user_login, label, table, and journal_fields properties; otherwise contains the table and sys_id properties.
	 * 
	 * Note: The user_login property contains the User ID of the current user. The user_sys_id and iser_full_name properties reference the creator of the queried record.
	 */
	getStream(table: string, sysID: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the user's initials.
	 *
	 *
	 * @returns {string} The user's initials
	 */
	getUserInitials(): string
	
	/**
	 *
	 * Returns the named value of the JSON request, instance, or portal.
	 *
	 * @param {string} name Name of the JSON request, instance, or portal.
	 *
	 * @returns {{[fieldName: string]: string}} Value of the specified parameter. Null if the specified entity does not exist or has no such parameter.
	 */
	getValue(name: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Copies values from the request or instance to the data parameter.
	 *
	 * @param {{[fieldName: string]: string}} data Receives the parameter values.
	 * @param {string} names Comma-separated string of field names.
	 *
	 * @returns {void} Method does not return a value
	 */
	getValues(data: {[fieldName: string]: string}, names: string): void
	
	/**
	 *
	 * Returns an array of Service Catalog variables associated with the record in the URL.
	 *
	 * For example, if the URL includes the parameters `id=form&table=sc_req_item&sys_id=832e9620db4f330083766b984b9619cf`, the API returns the variables associated with the given record in the Requested item [sc_req_item] table. Must be a record with Service Catalog variables defined, such as a requested item [sc_req_item] record or an incident submitted through a record producer.
	 *
	 * @param {boolean} includeNilResponses Optional. If true, the API includes variables with no user-defined value.
	 *
	 * @returns {{[fieldName: string]: string}} Array of variables associated with the table.
	 */
	getVariablesArray(includeNilResponses: boolean): {[fieldName: string]: string}
	
	/**
	 *
	 * Gets a widget by id or sys_id, executes that widget's server script using the provided options, then returns the widget model.
	 *
	 * @param {string} sysID The widget sys_id or widget_id
	 * @param {{[fieldName: string]: string}} options An object to pass to the widget's server script. Refer to this object as `options` in your server script.
	 * 
	 * Note: Any options passed into this function will only be available in the embedded widget's server script on the first execution of that script. Any subsequent calls into the server script from the embedded widget will not contain the object properties passed in.
	 *
	 * @returns {{[fieldName: string]: string}} A widget model to be used with sp-widget.
	 */
	getWidget(sysID: string, options: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Transforms a URL requesting a list or form in the platform UI into the URL of the corresponding `id=list` or `id=form` Service Portal page.
	 *
	 * Use this method to perform tasks such as redirecting a user after login to the correct Service Portal page when they request a platform UI form or list URL. Note that the `id=list` and `id=form` page targets are not customizable.
	 * 	 * 
	 * 	 * Note: Table, sys_id, and sysparm_query values are preserved from the original URL; sysparm_view is not.
	 *
	 * @param {string} url Platform UI URL
	 *
	 * @returns {string} Transformed Service Portal URL.
	 * 
	 * If the passed-in URL does not request a list or a form in the platform UI, a null value is returned.
	 */
	mapUrlToSPUrl(url: string): string
	
}

/** 
 * Access these methods using the static object GlideStringUtil. This class is available in scoped and global scripts.
 * 
 */
declare class GlideStringUtil {

	/**
	 *
	 * Replaces periods with underscore characters.
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {string} Text with periods replaced with underscores.
	 */
	dotToUnderBar(sourceString: string): string
	
	/**
	 *
	 * Removes quotes from a string.
	 *
	 * @param {string} sourceString The string to be processed.
	 *
	 * @returns {string} The string with quotes removed.
	 */
	escapeAllQuotes(sourceString: string): string
	
	/**
	 *
	 * Replaces problem characters with escape characters.
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {string} Text with problem characters replaced with escape characters.
	 */
	escapeForHomePage(sourceString: string): string
	
	/**
	 *
	 * Replaces illegal characters with their escape codes.
	 *
	 * Using this method removes illegal characters that might cause the UI to render improperly, or trigger a client side attack such as JavaScript or HTML injection.
	 *
	 * @param {string} htmlString Text to process.
	 *
	 * @returns {string} Text with illegal characters replaced with their escape codes.
	 */
	escapeHTML(htmlString: string): string
	
	/**
	 *
	 * Replaces non-printable characters with their printable notation.
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {string} Text with non-printable characters replaced with printable notation.
	 */
	escapeNonPrintable(sourceString: string): string
	
	/**
	 *
	 * Replaces query term separators "^" with their escape sequence "^^".
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {string} Text with query term separators replaced with the escape characters.
	 */
	escapeQueryTermSeparator(sourceString: string): string
	
	/**
	 *
	 * Replaces quotes with escape characters by adding a backslash before each quote.
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {string} Text with backslashes added before quotes.
	 */
	escapeTicks(sourceString: string): string
	
	/**
	 *
	 * Replaces illegal HTML characters into HTML notation.
	 *
	 * Using this method removes illegal characters that might cause the UI to render improperly, or trigger a client side attack such as JavaScript or HTML injection.
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {string} Text with illegal characters replaced with HTML notation.
	 */
	getHTMLValue(sourceString: string): string
	
	/**
	 *
	 * Extracts numeric characters from a string.
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {string} Text containing only numeric characters.
	 */
	getNumeric(sourceString: string): string
	
	/**
	 *
	 * Validates whether the specified string is a valid base64 string.
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {boolean} Flag that indicates whether the specified string is in valid base64 format.
	 * 
	 * Possible values:
	 * 
	 * *   true: Valid base64 formatted string.
	 * *   false: Invalid base64 formatted string.
	 */
	isBase64(sourceString: string): boolean
	
	/**
	 *
	 * Validates whether the specified string is in valid sys_id format.
	 *
	 * The sys_id format is a sequence of 32 hexadecimal characters where all the characters are in the range [0-9, a-f, A-F].
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {boolean} Flag that indicates whether the specified string is in valid sys_id format.
	 * 
	 * Possible values:
	 * 
	 * *   true: Valid sys_id formatted string.
	 * *   false: Invalid sys_id formatted string.
	 */
	isEligibleSysID(sourceString: string): boolean
	
	/**
	 *
	 * Replaces the new line character, `/n`, with a break code, `<br/>`.
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {string} Text with new line characters replaced with HTML break code.
	 */
	newLinesToBreaks(sourceString: string): string
	
	/**
	 *
	 * Replaces carriage returns, line feeds, and tabs with spaces, and then removes leading, trailing, and duplicate spaces.
	 *
	 * @param {string} sourceString Text to process.
	 *
	 * @returns {string} Text with carriage returns, line feeds, and tabs replaced with spaces, and then leading, trailing, and duplicate spaces removed.
	 */
	normalizeWhitespace(sourceString: string): string
	
	/**
	 *
	 * Replaces escape characters with their respective character.
	 *
	 * This method replaces these escape characters: `&lt; &gt: &nbsp; &amp; &quote;`.
	 * 	 * 
	 * 	 * Note: In scoped applications call this method as unescapeHTML(String). In global applications call this method as unEscapeHTML(String).
	 *
	 * @param {string} htmlString String to process.
	 *
	 * @returns {string} String with the escape characters replaced.
	 */
	unEscapeHTML(htmlString: string): string
	
}

/** 
 * Content is returned as a string, not as a byte array when getContent() is called.  
 *   
 * Content is returned as a GlideScriptableInputStream object when getContentStream() is called. The GlideScriptableInputStream contains the actual bytes not converted into a String.
 * 
 */
declare class GlideSysAttachment {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Copies attachments from the source record to the target record.
	 *
	 * @param {string} sourceTable Name of the table with the attachments to be copied.
	 * @param {string} sourceID Source table's sys_id.
	 * @param {string} targetTable Name of the table on which to add the attachments.
	 * @param {string} targetID Target table's sys_id.
	 *
	 * @returns {string} Array of sys_ids of the attachments that were copied.
	 */
	copy(sourceTable: string, sourceID: string, targetTable: string, targetID: string): string
	
	/**
	 *
	 * Deletes the specified attachment.
	 *
	 * @param {string} attachmentID Attachment's sys_id.
	 *
	 * @returns {void} Method does not return a value
	 */
	deleteAttachment(attachmentID: string): void
	
	/**
	 *
	 * Returns a GlideRecord containing the matching attachment metadata such as name, type, or size.
	 *
	 * @param {string} tableName Name of the table to which the attachment belongs; for example, incident.
	 * @param {string} sys_id The sys_id of record to which the attachment belongs.
	 *
	 * @returns {GlideRecord} GlideRecord object containing the matching attachment metadata such as name, type, or size.
	 */
	getAttachments(tableName: string, sys_id: string): GlideRecord
	
	/**
	 *
	 * Returns the attachment content as a string.
	 *
	 * @param {GlideRecord} sysAttachment Attachment record.
	 *
	 * @returns {string} Attachment contents as a string. Returns up to 5MB of data.
	 */
	getContent(sysAttachment: GlideRecord): string
	
	/**
	 *
	 * Returns the attachment content as a string with base64 encoding.
	 *
	 * @param {GlideRecord} sysAttachment Attachment record.
	 *
	 * @returns {string} Attachment contents as a string with base64 encoding. Returns up to 5MB of data.
	 */
	getContentBase64(sysAttachment: GlideRecord): string
	
	/**
	 *
	 * Returns a GlideScriptableInputStream object given the sys_id of an attachment.
	 *
	 * You can use the [GlideTextReader](dev.do#!/reference/api/rome/server/ "Provides the ability to read single lines from an input stream. Because an input stream is used, it is not subject to the 5MB attachment size limit.") API to read the content stream.
	 *
	 * @param {string} sysID Attachment sys_id.
	 *
	 * @returns {GlideScriptableInputStream} Stream that contains the attachment content.
	 */
	getContentStream(sysID: string): GlideScriptableInputStream
	
	/**
	 *
	 * Attaches a specified attachment to the specified record.
	 *
	 * @param {GlideRecord} record Record to which to attach the attachment.
	 * @param {string} fileName Attachment file name.
	 * @param {string} contentType Attachment content type.
	 * @param {string} content Attachment content.
	 *
	 * @returns {string} Attachment sys_id. Returns null if the attachment was not added.
	 */
	write(record: GlideRecord, fileName: string, contentType: string, content: string): string
	
	/**
	 *
	 * Inserts an attachment for the specified record using base64 encoded content.
	 *
	 * @param {GlideRecord} now_GR Record to which the attachment is to be attached.
	 * @param {string} fileName Attachment's file name.
	 * @param {string} contentType Attachment's content type.
	 * @param {string} content Attachment content in base64 format.
	 *
	 * @returns {string} Sys_id of the attachment created.
	 */
	writeBase64(now_GR: GlideRecord, fileName: string, contentType: string, content: string): string
	
	/**
	 *
	 * Inserts an attachment using the input stream.
	 *
	 * @param {GlideRecord} now_GR Record to which the attachment is to be attached.
	 * @param {string} fileName Attachment's file name.
	 * @param {string} contentType Attachment's content type.
	 * @param {GlideScriptableInputStream} content Attachment content.
	 *
	 * @returns {string} Sys_id of the attachment created.
	 */
	writeContentStream(now_GR: GlideRecord, fileName: string, contentType: string, content: GlideScriptableInputStream): string
	
}

/** 
 */
declare class GlideSysListControl {

	/**
	 *
	 * @param {string} tableName Name of the table
	 *
	 */
	constructor(tableName: string)
	
	/**
	 *
	 * Returns the sys_id for the control.
	 *
	 *
	 * @returns {string} sys_id of the control
	 */
	getControlID(): string
	
	/**
	 *
	 * Returns true if the edit button is not displayed.
	 *
	 *
	 * @returns {boolean} True when the edit button is not displayed.
	 */
	isOmitEditButton(): boolean
	
	/**
	 *
	 * Returns true when the New button is not displayed.
	 *
	 *
	 * @returns {boolean} True when the new button is not displayed.
	 */
	isOmitNewButton(): boolean
	
}

/** 
 * Many of the GlideSystem methods facilitate the easy inclusion of dates in query ranges, and are most often used in filters and reporting.
 * 
 */
declare class GlideSystem {

	/**
	 *
	 * Adds an error message for the current session.
	 *
	 * @param {string} message Message to add.
	 *
	 * @returns {void} Method does not return a value
	 */
	addErrorMessage(message: string): void
	
	/**
	 *
	 * Adds an info message for the current session. This method is not supported for asynchronous business rules.
	 *
	 * @param {string} message Info message to add.
	 *
	 * @returns {void} Method does not return a value
	 */
	addInfoMessage(message: string): void
	
	/**
	 *
	 * Returns an ASCII string from the specified base64 string.
	 *
	 * @param {string} source A base64 encoded string.
	 *
	 * @returns {string} The decoded string.
	 */
	base64Decode(source: string): string
	
	/**
	 *
	 * Creates a base64 string from the specified string.
	 *
	 * @param {string} source String to encode.
	 *
	 * @returns {string} Encoded base64 string.
	 */
	base64Encode(source: string): string
	
	/**
	 *
	 * Returns the date and time for the beginning of last month in GMT.
	 *
	 *
	 * @returns {string} GMT beginning of last month, in the format yyyy-mm-dd hh:mm:ss
	 */
	beginningOfLastMonth(): string
	
	/**
	 *
	 * Returns the date and time for the beginning of last week in GMT.
	 *
	 *
	 * @returns {string} GMT beginning of last week, in the format yyyy-mm-dd hh:mm:ss
	 */
	beginningOfLastWeek(): string
	
	/**
	 *
	 * Returns the date and time for the beginning of next month in GMT.
	 *
	 *
	 * @returns {string} GMT beginning of next month, in the format yyyy-mm-dd hh:mm:ss
	 */
	beginningOfNextMonth(): string
	
	/**
	 *
	 * Returns the date and time for the beginning of next week in GMT.
	 *
	 *
	 * @returns {string} The GMT beginning of next week, in the format yyyy-mm-dd hh:mm:ss.
	 */
	beginningOfNextWeek(): string
	
	/**
	 *
	 * Returns the date and time for the beginning of next year in GMT.
	 *
	 *
	 * @returns {string} GMT beginning of next year, in the format yyyy-mm-dd hh:mm:ss
	 */
	beginningOfNextYear(): string
	
	/**
	 *
	 * Returns the date and time for the beginning of this month in GMT.
	 *
	 *
	 * @returns {string} GMT beginning of this month, in the format yyyy-mm-dd hh:mm:ss
	 */
	beginningOfThisMonth(): string
	
	/**
	 *
	 * Returns the date and time for the beginning of this quarter in GMT.
	 *
	 *
	 * @returns {string} GMT beginning of this quarter, in the format yyyy-mm-dd hh:mm:ss
	 */
	beginningOfThisQuarter(): string
	
	/**
	 *
	 * Returns the date and time for the beginning of this week in GMT.
	 *
	 *
	 * @returns {string} GMT beginning of this week, in the format yyyy-mm-dd hh:mm:ss
	 */
	beginningOfThisWeek(): string
	
	/**
	 *
	 * Returns the date and time for the beginning of this year in GMT.
	 *
	 *
	 * @returns {string} GMT beginning of this year, in the format yyyy-mm-dd hh:mm:ss
	 */
	beginningOfThisYear(): string
	
	/**
	 *
	 * Generates a date and time for the specified date in GMT.
	 *
	 * @param {string} date Format: yyyy-mm-dd
	 * @param {string} range Start, end, or a time in the 24 hour format hh:mm:ss.
	 *
	 * @returns {string} A date and time in the format yyyy-mm-dd hh:mm:ss. If range is start, the returned value is yyyy-mm-dd 00:00:00; If range is end the return value is yyyy-mm-dd 23:59:59.
	 */
	dateGenerate(date: string, range: string): string
	
	/**
	 *
	 * Returns the date and time for a specified number of days ago.
	 *
	 * @param {number} days Integer number of days
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	daysAgo(days: number): string
	
	/**
	 *
	 * Returns the date and time for the end of the day a specified number of days ago.
	 *
	 * @param {number} days Integer number of days
	 *
	 * @returns {string} GMT end of the day in the format yyyy-mm-dd hh:mm:ss
	 */
	daysAgoEnd(days: number): string
	
	/**
	 *
	 * Returns the date and time for the beginning of the day a specified number of days ago.
	 *
	 * @param {string} days Integer number of days
	 *
	 * @returns {string} GMT start of the day in the format yyyy-mm-dd hh:mm:ss
	 */
	daysAgoStart(days: string): string
	
	/**
	 *
	 * Writes a debug message to the system log.
	 *
	 * @param {string} message The log message with place holders for any variable arguments.
	 * @param {{[fieldName: string]: string}} param1 (Optional) First variable argument.
	 * @param {{[fieldName: string]: string}} param2 (Optional) Second variable argument.
	 * @param {{[fieldName: string]: string}} param3 (Optional) Third variable argument.
	 * @param {{[fieldName: string]: string}} param4 (Optional) Fourth variable argument.
	 * @param {{[fieldName: string]: string}} param5 (Optional) Fifth variable argument.
	 *
	 * @returns {void} Method does not return a value
	 */
	debug(message: string, param1: {[fieldName: string]: string}, param2: {[fieldName: string]: string}, param3: {[fieldName: string]: string}, param4: {[fieldName: string]: string}, param5: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Returns the date and time for the end of last month in GMT.
	 *
	 *
	 * @returns {string} GMT end of last month, in the format yyyy-mm-dd hh:mm:ss
	 */
	endOfLastMonth(): string
	
	/**
	 *
	 * Returns the date and time for the end of last week in GMT.
	 *
	 *
	 * @returns {string} GMT end of last week, in the format yyyy-mm-dd hh:mm:ss
	 */
	endOfLastWeek(): string
	
	/**
	 *
	 * Returns the date and time for the end of last year in GMT.
	 *
	 *
	 * @returns {string} GMT in format yyyy-mm-dd hh:mm:ss
	 */
	endOfLastYear(): string
	
	/**
	 *
	 * Returns the date and time for the end of next month in GMT.
	 *
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	endOfNextMonth(): string
	
	/**
	 *
	 * Returns the date and time for the end of next week in GMT.
	 *
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	endOfNextWeek(): string
	
	/**
	 *
	 * Returns the date and time for the end of next year in GMT.
	 *
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	endOfNextYear(): string
	
	/**
	 *
	 * Returns the date and time for the end of this month in GMT.
	 *
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	endOfThisMonth(): string
	
	/**
	 *
	 * Returns the date and time for the end of this quarter in GMT.
	 *
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	endOfThisQuarter(): string
	
	/**
	 *
	 * Returns the date and time for the end of this week in GMT.
	 *
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	endOfThisWeek(): string
	
	/**
	 *
	 * Returns the date and time for the end of this year in GMT.
	 *
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	endOfThisYear(): string
	
	/**
	 *
	 * Writes an error message to the system log.
	 *
	 * This method accepts up to five variable arguments (varargs) in the message using the Java MessageFormat placeholder replacement pattern.
	 * 	 * 
	 * 	 * Note: Variables must contain valid values for this method to provide correct output.
	 *
	 * @param {string} message The log message with place holders for any variable arguments.
	 * @param {{[fieldName: string]: string}} param1 (Optional) First variable argument.
	 * @param {{[fieldName: string]: string}} param2 (Optional) Second variable argument.
	 * @param {{[fieldName: string]: string}} param3 (Optional) Third variable argument.
	 * @param {{[fieldName: string]: string}} param4 (Optional) Fourth variable argument.
	 * @param {{[fieldName: string]: string}} param5 (Optional) Fifth variable argument.
	 *
	 * @returns {void} Method does not return a value
	 */
	error(message: string, param1: {[fieldName: string]: string}, param2: {[fieldName: string]: string}, param3: {[fieldName: string]: string}, param4: {[fieldName: string]: string}, param5: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Queues an event for the event manager.
	 *
	 * @param {string} name Name of the event being queued.
	 * @param {{[fieldName: string]: string}} instance GlideRecord object, such as "current".
	 * @param {string} parm1 Optional. Saved with the instance if specified.
	 * @param {string} parm2 Optional. Saved with the instance if specified.
	 * @param {string} queue Optional. Name of the queue.
	 *
	 * @returns {void} Method does not return a value
	 */
	eventQueue(name: string, instance: {[fieldName: string]: string}, parm1: string, parm2: string, queue: string): void
	
	/**
	 *
	 * Queues an event in the event manager.
	 *
	 * The passed in event schedule information is stored in the Events [sysevent] table. For additional information on events, see [Events](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/platform-events/concept/events.html.).
	 *
	 * @param {string} name Name of the event to queue.
	 * @param {GlideRecord | string} instance GlideRecord object or the sys_id of the record to which this event applies.
	 * @param {string} parm1 Optional. String to pass into the event script. This parameter is free-form and depends on the implementation of the event script.
	 * 
	 * Default: If the instance parameter is a GlideRecord object, then the default is the display value for that GlideRecord (now_GR.getDisplayValue) otherwise it is `null`.
	 * @param {string} parm2 Optional. String to pass into the event script. This parameter is free-form and depends on the implementation of the event script.
	 * 
	 * Default: `null`
	 * @param {{[fieldName: string]: string}} expiration Optional. GlideDateTime object or a date/time type element that specifies the date and time to process the event.
	 * 
	 * Default: Current date/time
	 *
	 * @returns {void} Method does not return a value
	 */
	eventQueueScheduled(name: string, instance: GlideRecord | string, parm1: string, parm2: string, expiration: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Executes a job for a scoped application.
	 *
	 * You can only use this method on a job in the same application as the script calling this method.
	 *
	 * @param {GlideRecord} job Job to run.
	 *
	 * @returns {string} Returns the sys_id of the scheduled job. Returns null if the job is global.
	 */
	executeNow(job: GlideRecord): string
	
	/**
	 *
	 * Generates a GUID that can be used when a unique identifier is required.
	 *
	 *
	 * @returns {string} A 32-character hexadecimal GUID.
	 */
	generateGUID(): string
	
	/**
	 *
	 * Gets the caller scope name; returns null if there is no caller.
	 *
	 *
	 * @returns {string} The caller's scope name, or null if there is no caller.
	 */
	getCallerScopeName(): string
	
	/**
	 *
	 * Gets a string representing the cache version for a CSS file.
	 *
	 *
	 * @returns {string} The CSS cache version.
	 */
	getCssCacheVersionString(): string
	
	/**
	 *
	 * Gets the ID of the current application as set using the Application Picker.
	 *
	 *
	 * @returns {string} The current application's sys_id, or global in none is set.
	 */
	getCurrentApplicationId(): string
	
	/**
	 *
	 * Gets the name of the current scope.
	 *
	 *
	 * @returns {string} The current scope name.
	 */
	getCurrentScopeName(): string
	
	/**
	 *
	 * Returns the list of error messages for the session that were added by addErrorMessage().
	 *
	 *
	 * @returns {{[fieldName: string]: string}} List of error messages associated with the session.
	 */
	getErrorMessages(): {[fieldName: string]: string}
	
	/**
	 *
	 * Retrieves the specified message from the Message [sys_ui_message] table. If the message has HTML special characters, replaces them with the corresponding HTML name codes. For example, `&` becomes `&amp;`.
	 *
	 * If the specified message identifier (Key) exists in the Message [sys_ui_message] table for the current language, the method returns the translated message with all special characters returned as escape sequences. If the specified message identifier does not exist for the current language, then the method returns the English version of the message with all special characters returned as escape sequences. If the message identifier does not exist in the table, then it returns the message ID.
	 * 	 * 
	 * 	 * For additional information about the Message table, see [Message table](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/localization/reference/r_MessageTable.html).
	 * 	 * 
	 * 	 * Note: If the UI message has a tick ('), there may be issues with the message in the script; to escape the ticks ('), use getMessageS(String, Object).
	 *
	 * @param {string} id Message identifier. You can locate this value in the Key field of the Message [sys_ui_message] table. Note the Key field may look exactly like the actual message string.
	 * @param {{[fieldName: string]: string}} args Optional. List of strings or other values defined by java.text.MessageFormat that replace the variables within the specified message.
	 * 
	 * For example: `gs.getMessage("Abort adding action '{0}', same subflow can't be added twice in this subflow.", current.action.name);`
	 * 
	 * In this example '{0}' is replaced with the content of current.action.name.
	 * 
	 * Note: The passed in values are not translated. They are inserted verbatim in the message.
	 *
	 * @returns {string} UI message with HTML special characters replaced with HTML name codes.
	 */
	getEscapedMessage(id: string, args: {[fieldName: string]: string}): string
	
	/**
	 *
	 * Retrieves translated messages from the Message [sys_ui_message] table to display in a UI.
	 *
	 * If the specified message identifier (key) exists in the Message [sys_ui_message] table for the current language, then the method returns the translated message. If the specified message identifier does not exist for the current language, then the method returns the English version of the message. If the message identifier does not exist in the table, then it returns the message ID.
	 * 	 * 
	 * 	 * For additional information about the Message table, see [Message table](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/localization/reference/r_MessageTable.html)
	 * 	 * 
	 * 	 * Note: If the UI message has a tick ('), there may be issues with the message in the script; to escape the ticks ('), use getMessageS(String, Object).
	 *
	 * @param {string} id Message identifier. You can locate this value in the Key field of the Message [sys_ui_message] table. Note the Key field may look exactly like the actual message.
	 * @param {{[fieldName: string]: string}} args Optional. List of strings or other values defined by java.text.MessageFormat that replace the variables within the specified message.
	 * 
	 * For example: `gs.getMessage("Abort adding action '{0}', same subflow can't be added twice in this subflow.", current.action.name);`
	 * 
	 * In this example '{0}' is replaced with the content of current.action.name.
	 * 
	 * Note: The passed in values are not translated. They are inserted verbatim in the message.
	 *
	 * @returns {string} UI message.
	 */
	getMessage(id: string, args: {[fieldName: string]: string}): string
	
	/**
	 *
	 * Gets the value of a Glide property. If the property is not found, returns an alternate value.
	 *
	 * @param {string} key The key for the property whose value should be returned.
	 * @param {{[fieldName: string]: string}} alt (Optional) Alternate object to return if the property is not found.
	 *
	 * @returns {string} The value of the Glide property, or the alternate object defined above.
	 */
	getProperty(key: string, alt: {[fieldName: string]: string}): string
	
	/**
	 *
	 * Gets a reference to the current Glide session.
	 *
	 *
	 * @returns {string} A reference for the current session.
	 */
	getSession(): string
	
	/**
	 *
	 * Retrieves the GlideSession session ID.
	 *
	 *
	 * @returns {string} The session ID.
	 */
	getSessionID(): string
	
	/**
	 *
	 * This method is no longer available. Instead, use `gs.getSession().getSessionToken()`.
	 *
	 *
	 * @returns {string} The session token.
	 */
	getSessionToken(): string
	
	/**
	 *
	 * Returns the name of the time zone associated with the current user.
	 *
	 * This method has been deprecated. Instead, use the [getTimeZoneName()](https://developer.servicenow.com/go_to_api.do?ID=r_ScopedGlideSessionGetTimeZoneName&v=rome) method in the GlideSession API.
	 *
	 *
	 * @returns {string} The time zone name.
	 */
	getTimeZoneName(): string
	
	/**
	 *
	 * Gets the current URI for the session.
	 *
	 *
	 * @returns {string} The URI.
	 */
	getUrlOnStack(): string
	
	/**
	 *
	 * Returns a reference to the scoped GlideUser object for the current user.
	 *
	 * See [GlideUser - Scoped](https://docs.servicenow.com/bundle/rome-application-development/page/app-store/dev_portal/API_reference/glideUserScoped/concept/c_GlideUserScopedAPI.html)for a list of available methods.
	 *
	 *
	 * @returns {GlideUser} Reference to a scoped user object.
	 */
	getUser(): GlideUser
	
	/**
	 *
	 * Gets the display name of the current user.
	 *
	 *
	 * @returns {string} The name field of the current user. Returns Abel Tuter, as opposed to abel.tuter.
	 */
	getUserDisplayName(): string
	
	/**
	 *
	 * Gets the sys_id of the current user.
	 *
	 *
	 * @returns {string} The sys_id of the current user.
	 */
	getUserID(): string
	
	/**
	 *
	 * Gets the user name, or user id, of the current user.
	 *
	 *
	 * @returns {string} The user name of the current user.
	 */
	getUserName(): string
	
	/**
	 *
	 * Determines if the current user has the specified role.
	 *
	 * @param {{[fieldName: string]: string}} role The role to check.
	 *
	 * @returns {boolean} True if the user had the role. Returns true for users with the administrator role.
	 */
	hasRole(role: {[fieldName: string]: string}): boolean
	
	/**
	 *
	 * Returns the date and time for a specified number of hours ago.
	 *
	 * @param {number} hours Integer number of hours
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	hoursAgo(hours: number): string
	
	/**
	 *
	 * Returns the date and time for the end of the hour a specified number of hours ago.
	 *
	 * @param {number} hours Integer number of hours
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	hoursAgoEnd(hours: number): string
	
	/**
	 *
	 * Returns the date and time for the start of the hour a specified number of hours ago.
	 *
	 * @param {number} hours Integer number of hours
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	hoursAgoStart(hours: number): string
	
	/**
	 *
	 * Provides a safe way to call a script include from the sandbox, allowing only the inclusion of trusted scripts.
	 *
	 * @param {string} name Name of the script to include.
	 *
	 * @returns {boolean} Flag that indicates whether the script include worked.
	 * 
	 * Possible values:
	 * 
	 * *   true: Script include worked.
	 * *   false: Script include failed.
	 */
	include(name: string): boolean
	
	/**
	 *
	 * Writes an info message to the system log.
	 *
	 * @param {string} message The log message with place holders for any variable arguments.
	 * @param {{[fieldName: string]: string}} param1 (Optional) First variable argument.
	 * @param {{[fieldName: string]: string}} param2 (Optional) Second variable argument.
	 * @param {{[fieldName: string]: string}} param3 (Optional) Third variable argument.
	 * @param {{[fieldName: string]: string}} param4 (Optional) Fourth variable argument.
	 * @param {{[fieldName: string]: string}} param5 (Optional) Fifth variable argument.
	 *
	 * @returns {void} Method does not return a value
	 */
	info(message: string, param1: {[fieldName: string]: string}, param2: {[fieldName: string]: string}, param3: {[fieldName: string]: string}, param4: {[fieldName: string]: string}, param5: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Determines if debugging is active for a specific scope.
	 *
	 *
	 * @returns {boolean} True if either session debugging is active or the log level is set to debug for the specified scope.
	 */
	isDebugging(): boolean
	
	/**
	 *
	 * Checks if the current session is interactive. An example of an interactive session is when a user logs in normally. An example of a non-interactive session is using a SOAP request to retrieve data.
	 *
	 *
	 * @returns {boolean} True if the session is interactive.
	 */
	isInteractive(): boolean
	
	/**
	 *
	 * Determines if the current user is currently logged in.
	 *
	 *
	 * @returns {boolean} True if the current user is logged in.
	 */
	isLoggedIn(): boolean
	
	/**
	 *
	 * You can determine if a request comes from a mobile device.
	 *
	 * This method can be used in UI action conditions and business rules.
	 *
	 *
	 * @returns {boolean} True if the request comes from a mobile device; otherwise, false.
	 */
	isMobile(): boolean
	
	/**
	 *
	 * Returns the date and time for the end of the minute a specified number of minutes ago.
	 *
	 * @param {number} minutes Integer number of minutes
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	minutesAgoEnd(minutes: number): string
	
	/**
	 *
	 * Returns the date and time for the start of the minute a specified number of minutes ago.
	 *
	 * @param {number} minutes Integer number of minutes
	 *
	 * @returns {string} GMT in the format yyyy-mm-dd hh:mm:ss
	 */
	minutesAgoStart(minutes: number): string
	
	/**
	 *
	 * Returns the date and time for a specified number of months ago.
	 *
	 * @param {number} months Integer number of months
	 *
	 * @returns {string} GMT on today's date of the specified month, in the format yyyy-mm-dd hh:mm:ss
	 */
	monthsAgo(months: number): string
	
	/**
	 *
	 * Returns the date and time for the start of the month a specified number of months ago.
	 *
	 * @param {number} months Integer number of months
	 *
	 * @returns {string} GMT start of the month the specified number of months ago, in the format yyyy-mm-dd hh:mm:ss
	 */
	monthsAgoStart(months: number): string
	
	/**
	 *
	 * Queries an object and returns true if the object is null, undefined, or contains an empty string.
	 *
	 * @param {{[fieldName: string]: string}} o The object to be checked.
	 *
	 * @returns {boolean} True if the object is null, undefined, or contains an empty string; otherwise, returns false.
	 */
	nil(o: {[fieldName: string]: string}): boolean
	
	/**
	 *
	 * Returns the date and time for the last day of the quarter for a specified number of quarters ago.
	 *
	 * @param {number} quarters Integer number of quarters
	 *
	 * @returns {string} GMT end of the quarter that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss
	 */
	quartersAgoEnd(quarters: number): string
	
	/**
	 *
	 * Returns the date and time for the first day of the quarter for a specified number of quarters ago.
	 *
	 * @param {number} quarters Integer number of quarters
	 *
	 * @returns {string} GMT end of the month that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss
	 */
	quartersAgoStart(quarters: number): string
	
	/**
	 *
	 * Sets the specified key to the specified value if the property is within the script's scope.
	 *
	 * Note: Care should be taken when setting system properties (sys_properties) using this method as it causes a system-wide cache flush. Each flush can cause system degradation while the caches rebuild. If a value must be updated often, it should not be stored as a system property. In general, you should only place values in the sys_properties table that do not frequently change.
	 *
	 * @param {string} key The key for the property to be set.
	 * @param {string} value The value of the property to be set.
	 * @param {string} description A description of the property.
	 *
	 * @returns {void} Method does not return a value
	 */
	setProperty(key: string, value: string, description: string): void
	
	/**
	 *
	 * Sets the redirect URI for this transaction, which then determines the next page the user will see.
	 *
	 * @param {{[fieldName: string]: string}} o URI object or URI string to set as the redirect
	 *
	 * @returns {void} Method does not return a value
	 */
	setRedirect(o: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Determines if a database table exists.
	 *
	 * @param {string} name Name of the table to check for existence.
	 *
	 * @returns {boolean} True if the table exists. False if the table was not found.
	 */
	tableExists(name: string): boolean
	
	/**
	 *
	 * Replaces UTF-8 encoded characters with ASCII characters.
	 *
	 * @param {string} url A string with UTF-8 percent (%) encoded characters.
	 *
	 * @returns {string} A string with encoded characters replaced with ASCII characters.
	 */
	urlDecode(url: string): string
	
	/**
	 *
	 * Encodes non-ASCII characters, unsafe ASCII characters, and spaces so the returned string can be used on the Internet. Uses UTF-8 encoding. Uses percent (%) encoding.
	 *
	 * @param {string} url The string to be encoded.
	 *
	 * @returns {string} A string with non-ASCII characters, unsafe ASCII characters, and spaces encoded.
	 */
	urlEncode(url: string): string
	
	/**
	 *
	 * Writes a warning message to the system log.
	 *
	 * @param {string} message The log message with place holders for any variable arguments.
	 * @param {{[fieldName: string]: string}} param1 (Optional) First variable argument.
	 * @param {{[fieldName: string]: string}} param2 (Optional) Second variable argument.
	 * @param {{[fieldName: string]: string}} param3 (Optional) Third variable argument.
	 * @param {{[fieldName: string]: string}} param4 (Optional) Fourth variable argument.
	 * @param {{[fieldName: string]: string}} param5 (Optional) Fifth variable argument.
	 *
	 * @returns {void} Method does not return a value
	 */
	warn(message: string, param1: {[fieldName: string]: string}, param2: {[fieldName: string]: string}, param3: {[fieldName: string]: string}, param4: {[fieldName: string]: string}, param5: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Takes an XML string and returns a JSON object.
	 *
	 * @param {string} xmlString The XML string to be converted.
	 *
	 * @returns {{[fieldName: string]: string}} A JSON object representing the XML string. Null if unable to process the XML string.
	 */
	xmlToJSON(xmlString: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns a date and time for a certain number of years ago.
	 *
	 * @param {number} years An integer number of years
	 *
	 * @returns {string} GMT beginning of the year that is the specified number of years ago, in the format yyyy-mm-dd hh:mm:ss.
	 */
	yearsAgo(years: number): string
	
	/**
	 *
	 * Returns yesterday's time (24 hours ago).
	 *
	 *
	 * @returns {string} GMT for 24 hours ago, in the format yyyy-mm-dd hh:mm:ss
	 */
	yesterday(): string
	
}

/** 
 */
declare class GlideTableHierarchy {

	/**
	 *
	 * @param {string} tableName The name of the table.
	 *
	 */
	constructor(tableName: string)
	
	/**
	 *
	 * Returns an array of strings containing all tables that extend the current table and includes the current table.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} An array of strings containing the tables in the hierarchy that includes the current table.
	 */
	getAllExtensions(): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the parent class.
	 *
	 *
	 * @returns {string} The parent class.
	 */
	getBase(): string
	
	/**
	 *
	 * Returns an array of strings containing all classes in the hierarchy of the current table.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} An array of strings of the classes in the hierarchy.
	 */
	getHierarchy(): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the table's name.
	 *
	 *
	 * @returns {string} The table's name.
	 */
	getName(): string
	
	/**
	 *
	 * Returns the top level class in the hierarchy.
	 *
	 *
	 * @returns {string} Name of the root class.
	 */
	getRoot(): string
	
	/**
	 *
	 * Returns an array of strings containing all tables that extend the current table.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} An array of strings containing the tables that extend the current table.
	 */
	getTableExtensions(): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns an array of strings of the table names in the hierarchy.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} An array of strings containing the names of tables in the hierarchy.
	 */
	getTables(): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns true of this class has been extended.
	 *
	 *
	 * @returns {boolean} True if the current table has extensions.
	 */
	hasExtensions(): boolean
	
	/**
	 *
	 * Returns true if this is a base class.
	 *
	 *
	 * @returns {boolean} True if the current table has no parent and has extensions.
	 */
	isBaseClass(): boolean
	
	/**
	 *
	 * Returns true if this table is not in a hierarchy.
	 *
	 *
	 * @returns {boolean} True if the current table has no parent and no extensions.
	 */
	isSoloClass(): boolean
	
}

/** 
 */
declare class GlideTextReader {

	/**
	 *
	 * @param {GlideScriptableInputStream} inputStream The input stream to be read.
	 *
	 */
	constructor(inputStream: GlideScriptableInputStream)
	
	/**
	 *
	 * Returns the character encoding of the input stream.
	 *
	 *
	 * @returns {string} The character encoding of the input stream.
	 */
	getEncoding(): string
	
	/**
	 *
	 * Returns a single line from the input stream and returns a string. Since this is working off of a stream, it is not subject to the 5MB size limit.
	 *
	 *
	 * @returns {string} A single line of input up to the carriage return. Does not include the carriage return. Returns null if there is no content.
	 */
	readLine(): string
	
}

/** 
 */
declare class GlideTime {

	/**
	 *
	 * @param {number} milliseconds Time to add to midnight UTC.
	 * 
	 * Unit: Milliseconds
	 *
	 */
	constructor(milliseconds: number)
	
	/**
	 *
	 * Returns the time in the specified format.
	 *
	 * For information on the time formats that you can pass into this method, see [Global date and time field format](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/time/reference/r_FormatDateAndTimeFields.html). You can pass these values in any order and add separators such as a dash, space, backslash, or colon. In addition, you can also pass the character "a" to return am/pm.
	 *
	 * @param {string} format String to use to format the time.
	 * 
	 * For example, if the current time is 10:30:20 then:
	 * 
	 * *   hh:mm:ss = 10:30:20
	 * *   HH = 10
	 * *   HH –- ss = 10 –- 20
	 * *   hh a = 10 AM
	 * *   s:m:H ss:mm:hh = 20:30:10 20:30:10
	 * *   HH:mm:ss.SSSZ = 10:30:20.000+0000
	 * *   HH/mm/ss = 10/30/20
	 *
	 * @returns {string} Time in the specified format.
	 */
	getByFormat(format: string): string
	
	/**
	 *
	 * Gets the time in the current user's display format and time zone.
	 *
	 * When designing business rules or script includes remember that this method may return values in different formats for different users.
	 *
	 *
	 * @returns {string} The time in the user's format and time zone.
	 */
	getDisplayValue(): string
	
	/**
	 *
	 * Gets the display value in the current user's time zone and the internal format (HH:mm:ss).
	 *
	 *
	 * @returns {string} The time value for the GlideTime object in the current user's time zone and the internal time format of HH:mm:ss.
	 */
	getDisplayValueInternal(): string
	
	/**
	 *
	 * Returns the hours part of the time using the local time zone.
	 *
	 *
	 * @returns {number} The hours using the local time zone.
	 */
	getHourLocalTime(): number
	
	/**
	 *
	 * Returns the hours part of the time using the local time zone. The number of hours is based on a 24 hour clock.
	 *
	 *
	 * @returns {number} The hours using the local time zone. The number of hours is based on a 24 hour clock.
	 */
	getHourOfDayLocalTime(): number
	
	/**
	 *
	 * Returns the hours part of the time using the UTC time zone. The number of hours is based on a 24 hour clock.
	 *
	 *
	 * @returns {number} The hours using the UTC time zone. The number of hours is based on a 24 hour clock.
	 */
	getHourOfDayUTC(): number
	
	/**
	 *
	 * Returns the hours part of the time using the UTC time zone. The number of hours is based on a 12 hour clock. Noon and midnight are represented by 0, not 12.
	 *
	 *
	 * @returns {number} The hours using the UTC time zone. The number of hours is based on a 12 hour clock. Noon and midnight are represented by 0, not 12.
	 */
	getHourUTC(): number
	
	/**
	 *
	 * Returns the number of minutes using the local time zone.
	 *
	 *
	 * @returns {number} The number of minutes using the local time zone.
	 */
	getMinutesLocalTime(): number
	
	/**
	 *
	 * Returns the number of minutes in the hour based on the UTC time zone.
	 *
	 *
	 * @returns {number} The number of minutes in the hour using the UTC time zone.
	 */
	getMinutesUTC(): number
	
	/**
	 *
	 * Returns the number of seconds in the current minute.
	 *
	 *
	 * @returns {number} The number of seconds in the minute.
	 */
	getSeconds(): number
	
	/**
	 *
	 * Gets the time value stored in the database by the GlideTime object in the internal format, HH:mm:ss, and the system time zone.
	 *
	 *
	 * @returns {string} The time value in the internal fomat and system time zone.
	 */
	getValue(): string
	
	/**
	 *
	 * Sets a time value using the current user's display format and time zone.
	 *
	 * @param {string} asDisplayed The time in the current user's display format and time zone. The parameter must be formatted using the current user's preferred display format, such as HH:mm:ss.
	 *
	 * @returns {void} Method does not return a value
	 */
	setDisplayValue(asDisplayed: string): void
	
	/**
	 *
	 * Sets the time of the GlideTime object in the internal time zone.
	 *
	 * @param {string} o The time in hh:mm:ss format.
	 *
	 * @returns {void} Method does not return a value
	 */
	setValue(o: string): void
	
	/**
	 *
	 * Gets the duration difference between two GlideTime object values.
	 *
	 * @param {GlideTime} startTime The start value.
	 * @param {GlideTime} endTime The end value.
	 *
	 * @returns {GlideDuration} The duration between the two values.
	 */
	subtract(startTime: GlideTime, endTime: GlideTime): GlideDuration
	
}

/** 
 */
declare class GlideTransformLog {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Logs a message of type Error to localhost logs.
	 *
	 * @param {string} message Transform log message.
	 *
	 * @returns {void} Method does not return a value
	 */
	error(message: string): void
	
	/**
	 *
	 * Logs a message of type Info to localhost logs.
	 *
	 * @param {string} message Transform log message.
	 *
	 * @returns {void} Method does not return a value
	 */
	info(message: string): void
	
	/**
	 *
	 * Logs a message of type Warn to localhost logs.
	 *
	 * @param {string} message Transform log message.
	 *
	 * @returns {void} Method does not return a value
	 */
	warn(message: string): void
	
}

/** 
 * You create the properties using the sys_properties list and assign a version number. When you do this from the scoped application, the prefix is automatically added to the property name. The scoped application UI compatibility properties are:  
 *   
 * 
 * *   <scope-name>.ui.ie_minimum
 * *   <scope-name>.ui.chrome_minimum
 * *   <scope-name>.ui.firefox_minimum
 * *   <scope-name>.ui.safari_major_version_minimum
 * 
 *   
 *   
 * You can then use the scoped GlideUICompatibility class to determine if the current browser is supported.
 * 
 */
declare class GlideUICompatibility {

	/**
	 *
	 * @param {string} scopeName The application's scope name
	 *
	 */
	constructor(scopeName: string)
	
	/**
	 *
	 * Returns the terms "block" or "allow" based upon the browser version.
	 *
	 *
	 * @returns {string} Either block or allow
	 */
	getCompatibility(): string
	
	/**
	 *
	 * Determines if the browser is not supported.
	 *
	 *
	 * @returns {boolean} True if the browser is not supported.
	 */
	isBlocked(): boolean
	
}

/** 
 * For more information on using URIs:
 * 
 * *   [Navigate by URL](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/use/navigation/task/navigate-using-url.html)
 * *   [Navigation stack](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/administer/navigation-and-ui/concept/c_NavigationStack.html)
 * 
 *   
 *   
 * See also: [GlideURI - Global](https://docs.servicenow.com/bundle/rome-application-development/page/app-store/dev_portal/API_reference/GlideURIGlobal/concept/GlideURIGlobalAPI.html).
 * 
 */
declare class GlideURI {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Returns the value of the specified parameter.
	 *
	 * @param {string} name The parameter name.
	 *
	 * @returns {string} The value for the specified parameter.
	 */
	get(name: string): string
	
	/**
	 *
	 * Returns the file name portion of the URI.
	 *
	 *
	 * @returns {string} The file name portion of the URI.
	 */
	getFileFromPath(): string
	
	/**
	 *
	 * Sets the specified parameter to the specified value.
	 *
	 * @param {string} name The parameter name.
	 * @param {string} value The value.
	 *
	 * @returns {void} 
	 */
	set(name: string, value: string): void
	
	/**
	 *
	 * Reconstructs the URI string and performs the proper URL encoding by converting non-valid characters to their URL code. For example, converting & to '%26'.
	 *
	 * Parameters set with the set() method are encoded with the URI as well.
	 *
	 * @param {string} path The base portion of the system URL to which the URI is appended.
	 *
	 * @returns {string} The URL.
	 */
	toString(path: string): string
	
}

/** 
 */
declare class GlideUser {

	/**
	 *
	 * Returns the current user's company sys_id.
	 *
	 *
	 * @returns {string} Company sys_id
	 */
	getCompanyID(): string
	
	/**
	 *
	 * Returns the current user's display name.
	 *
	 *
	 * @returns {string} User's display name
	 */
	getDisplayName(): string
	
	/**
	 *
	 * Returns the identifier of the user's current session domain.
	 *
	 * The identifier that is returned depends on the domain type and the instantiation of that domain.
	 * 	 * 
	 * 	 * *   If the user is configured in the global domain, and does not use the domain picker to switch domains, the method returns null.
	 * 	 * *   If the user uses the domain picker to switch to the global domain, the method returns the string "global".
	 * 	 * *   For all other domains, the method returns the sys_id of that domain.
	 *
	 *
	 * @returns {string} Domain identifier
	 */
	getDomainID(): string
	
	/**
	 *
	 * Returns the user's email address.
	 *
	 *
	 * @returns {string} User's email address
	 */
	getEmail(): string
	
	/**
	 *
	 * Returns the user's first name.
	 *
	 *
	 * @returns {string} User's first name
	 */
	getFirstName(): string
	
	/**
	 *
	 * Gets the sys_id of the current user.
	 *
	 *
	 * @returns {string} User's sys_id
	 */
	getID(): string
	
	/**
	 *
	 * Returns the user's last name.
	 *
	 *
	 * @returns {string} User's last name
	 */
	getLastName(): string
	
	/**
	 *
	 * Returns the user ID, or login name, of the current user.
	 *
	 *
	 * @returns {string} User ID
	 */
	getName(): string
	
	/**
	 *
	 * Gets the specified user preference value for the current user.
	 *
	 * @param {string} name The name of the preference.
	 *
	 * @returns {string} The preference value.
	 */
	getPreference(name: string): string
	
	/**
	 *
	 * Returns a list of roles that includes explicitly granted roles, inherited roles, and roles acquired by group membership.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} List of all roles available to the user
	 */
	getRoles(): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the list of roles explicitly granted to the user.
	 *
	 * Unlike the getRoles() method, this method does not return roles the user inherits or roles acquired from group membership.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} List of roles explicitly assigned to the user
	 */
	getUserRoles(): {[fieldName: string]: string}
	
	/**
	 *
	 * Determines if the current user has the specified role.
	 *
	 * @param {string} role Role to check
	 *
	 * @returns {boolean} True if the user has the role.
	 */
	hasRole(role: string): boolean
	
	/**
	 *
	 * Determines if the current user is a member of the specified group.
	 *
	 * @param {string} group Group to check
	 *
	 * @returns {boolean} True if the user is a member of the group.
	 */
	isMemberOf(group: string): boolean
	
	/**
	 *
	 * Saves a user preference value to the database.
	 *
	 * @param {string} name The preference to save.
	 * @param {string} value The preference value.
	 *
	 * @returns {void} Method does not return a value
	 */
	savePreference(name: string, value: string): void
	
}

/** 
 * Access these methods using the static object GlideXMLUtil. This class is available in scoped and global scripts.
 * 
 */
declare class GlideXMLUtil {

	/**
	 *
	 * Removes invalid characters from an XML string.
	 *
	 * @param {string} xmlString The string to be processed.
	 *
	 * @returns {string} A string with invalid characters removed.
	 */
	removeInvalidChars(xmlString: string): string
	
	/**
	 *
	 * Determines if the specified string is valid XML.
	 *
	 * @param {string} xmlString The string to be validated.
	 * @param {boolean} nsAware When true, the validation is aware of name spaces. When false, the validation ignores name spaces.
	 * @param {boolean} forgiveUnclosed When true, the validation does not check for tags enclosing the string.
	 *
	 * @returns {string} Returns null if the string is valid. Returns an error string describing the error if the specified string is not valid.
	 */
	validateXML(xmlString: string, nsAware: boolean, forgiveUnclosed: boolean): string
	
}

/** 
 * Using the NotifyConferenceUtil API you can:  
 *   
 * 
 * *   Create new conference calls
 * *   Add participants by phone number or user ID
 * *   Remove participants from a conference call
 * *   Mute participants in a conference call
 * *   Unmute participants in a conference call
 * *   Obtain the capabilities of a specified service provider
 * *   End a conference call
 * 
 *   
 *   
 * You can use this API in both scoped and global scripts. To use this API you must activate the Conference Notify plugin (com.snc.notify) which requires a separate subscription. For details on activating this plugin, see [Activate Notify](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/notify2/task/t_ActivateNotify.html).
 * 
 */
declare class NotifyConferenceUtil {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Adds a participant to a specified conference call using their phone number to identify the participant.
	 *
	 * @param {string} toNumber Phone number of the participant to add to the conference call.
	 * @param {GlideRecord} confGR GlideRecord of the conference call to which to add the specified participant. These records are located in the Notify Conference Call [notify_conference_call] table.
	 *
	 * @returns {{[fieldName: string]: string}} Results of the conference action.
	 * 
	 * `<action>.status`: Status of the conference action.
	 * 
	 * *   Data type: Boolean
	 * *   Valid values:
	 *     *   true: Conference action succeeded
	 *     *   false: Conference action failed
	 * 
	 * `<action>.successMessages`: If status is true, success message(s), else empty.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.warnMessages`: If status is false, any warning messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.errorMessages`: If status is false, any error messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 */
	addToConferenceByPhoneNumber(toNumber: string, confGR: GlideRecord): {[fieldName: string]: string}
	
	/**
	 *
	 * Adds a participant to the conference call referenced by the passed in GlideRecord using their unique user identifier.
	 *
	 * @param {string} userId Sys ID of the participant to add to the specified conference call. This information is located in the User [sys_user] table.
	 * @param {GlideRecord} confGR GlideRecord of the conference call to add the specified participant. These records are located in the Notify Conference Call [notify_conference_call] table.
	 *
	 * @returns {{[fieldName: string]: string}} Results of the conference action.
	 * 
	 * `<action>.status`: Status of the conference action.
	 * 
	 * *   Data type: Boolean
	 * *   Valid values:
	 *     *   true: Conference action succeeded
	 *     *   false: Conference action failed
	 * 
	 * `<action>.successMessages`: If status is true, success message(s), else empty.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.warnMessages`: If status is false, any warning messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.errorMessages`: If status is false, any error messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 */
	addToConferenceByUserId(userId: string, confGR: GlideRecord): {[fieldName: string]: string}
	
	/**
	 *
	 * Performs the specified conference call action, such as starting/ending a conference call or joining, removing, muting, or unmuting participants from a conference call.
	 *
	 * You can start a new conference call and add participants within a single call to this method or call the method multiple times to start the call and then manage participants separately. In addition, through the passed in data object, you can configure the method to:
	 * 	 * 
	 * 	 * *   Save pointers in the conference call record to the specific record (source record), such as an incident or problem, that is the topic of discussion for the conference call.
	 * 	 * *   Allow/disallow multiple conference calls for a source record.
	 * 	 * *   Automatically log the participants that were in the conference call in the "Work Notes" field of the source record.
	 * 	 * *   Have a message read aloud when a participant answers an outgoing call from the conference.
	 *
	 * @param {string} action Defines the conference call action to perform.
	 * 
	 * The following are the available conference call actions:
	 * 
	 * *   start: Starts the conference call identified in data.confId
	 * *   end: Terminates the conference call identified in data.confId
	 * *   join: Adds the participant specified in the data.items array to the conference call identified in data.confId
	 * *   multiJoin: Adds the participants specified in the data.items array to the conference call identified in data.confId
	 * *   selfJoin: Adds the currently logged in user to the conference call (no entry in data.items required.)
	 * *   kick: Removes the participant specified in the data.items array from the conference call identified in data.confId
	 * *   multiKick: Removes the participants specified in the data.items array from the conference call identified in data.confId
	 * *   mute: Mutes the participant specified in the data.items array on the conference call identified in data.confId
	 * *   multiMute: Mutes the participants specified in the data.items array on the conference call identified in data.confId
	 * *   unmute: Unmutes the participant specified in the data.items array from the conference call identified in data.confId
	 * *   multiUnmute: Unmutes the participants specified in the data.items array from the conference call identified in data.confId
	 * @param {{[fieldName: string]: string}} data Object that describes the conference call.
	 * @param {boolean} data.addToWorkNotes Flag that indicates whether to add information about the participants that were included in the conference call in the work notes field of the associated record.
	 * 
	 * For this functionality to work, you must also specify values in the data.table and data.sysId parameters. These parameters identify the record in which to add the work notes.
	 * 
	 * Default: false
	 * 
	 * Actions for which this parameter is valid:
	 * 
	 * *   start
	 * *   join
	 * *   multiJoin
	 * *   selfJoin
	 * @param {boolean} data.allowMulticonference Flag that indicates whether to allow multiple conference calls for a specific record at one time.
	 * 
	 * For this functionality to work, you must also specify values in the data.table and data.sysId parameters. These parameters identify the record that is allowed to have multiple conference calls.
	 * 
	 * Default: false
	 * 
	 * Actions for which this parameter is valid:
	 * 
	 * *   start
	 * @param {string} data.confId Sys ID of the conference call.
	 * 
	 * The conference Sys ID is located in the Notify Conference Call [notify_conference_call] table.
	 * 
	 * Actions for which this parameter is required:
	 * 
	 * *   end
	 * *   join
	 * *   multiJoin
	 * *   selfJoin
	 * 
	 * Note: Participant actions such as mute, unmute, and kick do not require this parameter to be set as the method obtains this information from the Notify Conference Call Participant [notify_participant] table.
	 * @param {string} data.fromNumber Service provider number to call into for the conference call.
	 * 
	 * Locate this value in the Number or Phone number column of the Notify Phone Number [notify_number] table.
	 * 
	 * Actions for which this parameter is required:
	 * 
	 * *   start
	 * @param {boolean} data.isNewConference Flag that indicates whether this is a new or an existing conference call.
	 * 
	 * Valid values:
	 * 
	 * *   true: New conference call
	 * *   false: Existing conference call
	 * 
	 * Default: false
	 * 
	 * Actions for which this parameter is valid:
	 * 
	 * *   start
	 * @param {{[fieldName: string]: string}} data.items Information for each participant to include in the conference call.
	 * 
	 * Valid array values:
	 * 
	 * *   id: Sys ID of user; located in the User [sys_User] table.
	 *     
	 *     Valid actions: join, multiJoin, start
	 *     
	 * *   notifyParticipantId: Sys ID of the Notify participant; located in the Notify Participant [notify_participant] table.
	 *     
	 *     Valid actions: join, kick, multiJoin, mute, start, unmute
	 *     
	 * *   phoneNumber: Phone number of the participant. If this value is passed in conjunction with either the id or notifyParticipantId, this value supersedes the phone numbers in the user/participant record and is used to place the call.
	 *     
	 *     Valid actions: join, multiJoin, start
	 *     
	 * *   email: Email address of the participant.
	 *     
	 *     Valid actions: join, multiJoin, start
	 * @param {string} data.message Message that is read aloud when a user answers the call, such as, "P1 incident has been created please login to instance."
	 * 
	 * Actions for which this parameter is valid:
	 * 
	 * *   start
	 * *   join
	 * *   multiJoin
	 * @param {string} data.serviceProvider Required. Name of conference service provider, such as Zoom or Webex.
	 * 
	 * Actions for which this parameter is required:
	 * 
	 * *   all
	 * @param {string} data.sysId Sys ID of the source record to associate with the conference call.
	 * 
	 * For example, if a conference call is held to discuss a specific incident or problem, put the Sys ID of the incident or problem record in this value. This Sys ID is stored in the Source column of the NotifyConference Call [notify_conference_call] table and can later be tracked.
	 * 
	 * This parameter is used in conjunction with the data.Table, data.addToWorkNotes, and allowMulticonference parameters.
	 * 
	 * Actions for which this parameter is valid:
	 * 
	 * *   start
	 * @param {string} data.table Table that contains the source record to associate with the conference call. A source record can be any record, such as an "incident" or "problem", that is the topic of discussion in the conference call.
	 * 
	 * This table name is stored in the Table column of the NotifyConference Call [notify_conference_call] table and can be tracked.
	 * 
	 * This parameter is used in conjunction with the data.sysId, data.addToWorkNotes, and allowMulticonference parameters.
	 * 
	 * Actions for which this parameter is valid:
	 * 
	 * *   start
	 *
	 * @returns {{[fieldName: string]: string}} Results of the conference action.
	 * 
	 * `<action>.status`: Status of the conference action.
	 * 
	 * *   Data type: Boolean
	 * *   Valid values:
	 *     *   true: Conference action succeeded
	 *     *   false: Conference action failed
	 * 
	 * `<action>.successMessages`: If status is true, success message(s), else empty.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.warnMessages`: If status is false, any warning messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.errorMessages`: If status is false, any error messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 */
	doConferenceAction(action: string, data: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns a JSON data template to use with the doConferenceAction() method. Using this template automatically structures the data object so that you don't have to manually create it.
	 *
	 * Call this method prior to calling the doConferenceAction() method. For the desired conference call action, set the desired parameters within the template, and then pass the template in the doConferenceAction() call. For additional information on the valid parameters for each action, see [doConferenceAction()](https://docs.servicenow.com/bundle/rome-application-development/page/app-store/dev_portal/API_reference/NotifyConferenceUtils/concept/NotifyConferenceUtils.html#NUtil-doConferenceAction_S_O).
	 * 	 * 
	 * 	 * Note: This is a helper method. You can also manually construct this object and pass that object into the doConferenceAction() method and have the same outcome.
	 *
	 *
	 * @returns {{addToWorkNotes: boolean, allowMultconference: boolean, confId: string, fromNumber: string, isNewConference: boolean, items:{id:string, notififyParticipantId:string, phoneNumber:string, email:string}[], message:string, serviceProvider:string, sysId: string, table:string}} Table that contains the source record to associate with the conference call. A source record can be any record, such as an "incident" or "problem", that is the topic of discussion in the conference call.
	 * 
	 * This table name is stored in the Table column of the NotifyConference Call [notify_conference_call] table and can be tracked.
	 * 
	 * This parameter is used in conjunction with the data.sysId, data.addToWorkNotes, and allowMulticonference parameters.
	 * 
	 * Actions for which this parameter is valid:
	 * 
	 * *   start
	 */
	getConferenceInputDataTemplate(): {addToWorkNotes: boolean, allowMultconference: boolean, confId: string, fromNumber: string, isNewConference: boolean, items:{id:string, notififyParticipantId:string, phoneNumber:string, email:string}[], message:string, serviceProvider:string, sysId: string, table:string}
	
	/**
	 *
	 * Returns the capabilities of all telephony service provider drivers in the instance.
	 *
	 * Possible capabilities include:
	 * 	 * 
	 * 	 * *   archive: archives the conference after it ends
	 * 	 * *   beepOnLeave: plays a "beep" tone when a participant leaves the conference call
	 * 	 * *   beepOnJoin: plays a "beep" tone when a participant joins the conference call
	 * 	 * *   end: ends the identified conference call
	 * 	 * *   filesharing: allows file sharing between participants
	 * 	 * *   join: adds a participant to a conference call
	 * 	 * *   kick: removes a participant from a conference call
	 * 	 * *   multiJoin: adds multiple participants to a conference call
	 * 	 * *   multiKick: removes multiple participants from a conference call
	 * 	 * *   muteOnJoin: mutes a participant when they initially join a conference call
	 * 	 * *   multiUnmute: unmutes multiple participants for a conference call
	 * 	 * *   record: records conference calls
	 * 	 * *   recording: provides an on-screen indicator when the conference call is being recorded
	 * 	 * *   screenSharing: allows participant screens to be shared with the group
	 * 	 * *   selfJoin: adds the current logged in user to a conference call
	 * 	 * *   speaking: provides an on-screen message as to who is currently speaking
	 * 	 * *   start: starts the identified conference call
	 * 	 * *   unmute: unmutes a participant in a conference call
	 *
	 *
	 * @returns {{[fieldName: string]: string}} Key-value pairs of the status of each driver capability.
	 * 
	 * Valid values:
	 * 
	 * *   isSupported = 0: capability is not supported
	 * *   isSupported = 1: capability is supported
	 */
	getServiceProvidersCapabilities(): {[fieldName: string]: string}
	
	/**
	 *
	 * Determines whether a Notify conference action is supported by a telephony service provider.
	 *
	 * To use this method, you must first call the getServiceProviderCapabilities() method. This method returns an object that contains information about the availability of each possible Notify conference action for each service provider configured in your instance.
	 * 	 * 
	 * 	 * For example:
	 * 	 * 
	 * 	 *     {
	 * 	 *         "Telephony": {
	 * 	 *             "start": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "end": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "selfJoin": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "join": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "multiJoin": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "mute": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "multiMute": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "unmute": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "multiUnmute": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "kick": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "multiKick": {
	 * 	 *                 "isSupported": 1,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "record": {
	 * 	 *                 "isSupported": 0,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "speaking": {
	 * 	 *                 "isSupported": 0,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "recording": {
	 * 	 *                 "isSupported": 0,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "screenSharing": {
	 * 	 *                 "isSupported": 0,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "fileSharing": {
	 * 	 *                 "isSupported": 0,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "archive": {
	 * 	 *                 "isSupported": 0,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "muteOnJoin": {
	 * 	 *                 "isSupported": 0,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "beepOnJoin": {
	 * 	 *                 "isSupported": 0,
	 * 	 *                 "meta": {}
	 * 	 *             },
	 * 	 *             "beepOnLeave": {
	 * 	 *                 "isSupported": 0,
	 * 	 *                 "meta": {}
	 * 	 *             }
	 * 	 *         }
	 * 	 *     }
	 *
	 * @param {number} action Value of the isSupported parameter returned by the getServiceProvidersCapabilities() method for a specific action and service provider.
	 * 
	 * Note: Although the isSupported value may appear to be a Boolean, it is actually a Number. Do not try and evaluate the capabilities as Boolean values. Use this method as the associated values may be expanded in future versions.
	 *
	 * @returns {boolean} Flag that indicates whether the telephony service provider supports the specified action.
	 * 
	 * Valid values:
	 * 
	 * *   true: action is supported by the service provider
	 * *   false: action is not supported by the service provider
	 */
	isActionSupported(action: number): boolean
	
	/**
	 *
	 * Removes the participant associated with the passed in GlideRecord from the current conference call.
	 *
	 * @param {GlideRecord} notifyParticipantGR GlideRecord object of the participant to remove from the conference call. These records are located in the Notify Participant [notify_participant] table.
	 *
	 * @returns {{[fieldName: string]: string}} Results of the conference action.
	 * 
	 * `<action>.status`: Status of the conference action.
	 * 
	 * *   Data type: Boolean
	 * *   Valid values:
	 *     *   true: Conference action succeeded
	 *     *   false: Conference action failed
	 * 
	 * `<action>.successMessages`: If status is true, success message(s), else empty.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.warnMessages`: If status is false, any warning messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.errorMessages`: If status is false, any error messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 */
	kickByParticipantGR(notifyParticipantGR: GlideRecord): {[fieldName: string]: string}
	
	/**
	 *
	 * Mutes the participant associated with the passed in GlideRecord on the current conference call.
	 *
	 * @param {{[fieldName: string]: string}} notifyParticipantGR GlideRecord object of the participant to mute. These records are located in the Notify Participant [notify_participant] table.
	 *
	 * @returns {{[fieldName: string]: string}} Results of the conference action.
	 * 
	 * `<action>.status`: Status of the conference action.
	 * 
	 * *   Data type: Boolean
	 * *   Valid values:
	 *     *   true: Conference action succeeded
	 *     *   false: Conference action failed
	 * 
	 * `<action>.successMessages`: If status is true, success message(s), else empty.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.warnMessages`: If status is false, any warning messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.errorMessages`: If status is false, any error messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 */
	muteByParticipantGR(notifyParticipantGR: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Unmutes the participant associated with the passed in GlideRecord on the current conference call.
	 *
	 * @param {GlideRecord} notifyParticipantGR GlideRecord object of the participant to unmute. These records are located in the Notify Participant [notify_participant] table.
	 *
	 * @returns {{[fieldName: string]: string}} Results of the conference action.
	 * 
	 * `<action>.status`: Status of the conference action.
	 * 
	 * *   Data type: Boolean
	 * *   Valid values:
	 *     *   true: Conference action succeeded
	 *     *   false: Conference action failed
	 * 
	 * `<action>.successMessages`: If status is true, success message(s), else empty.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.warnMessages`: If status is false, any warning messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 * 
	 * `<action>.errorMessages`: If status is false, any error messages thrown during processing.
	 * 
	 * *   Data type: Array of Strings
	 */
	unmuteByParticipantGR(notifyParticipantGR: GlideRecord): {[fieldName: string]: string}
	
}

/** 
 * You can get an Optional object in these ways:  
 *   
 * 
 * *   Return an Optional object from these methods in the GlideQuery class. For more information, see [GlideQuery](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI "The GlideQuery API is an alternative to GlideRecord to perform CRUD operations on record data from server-side scripts.").
 *     *   [getBy()](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI#GQ-getBy_O_O "Returns an Optional object containing a single record based on a set of name-value pairs to query by. Assumes the '=' operator for each name-value pair.")
 *     *   [get()](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI#GQ-get_S_O "Returns a single record from the query.")
 *     *   [insert()](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI#GQ-insert_O_O "Inserts a record and returns an Optional object containing the record.")
 *     *   [insertOrUpdate()](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI#GQ-insertOrUpdate_O_O "Updates an existing record, or inserts a new record if one does not already exist.")
 *     *   [update()](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI#GQ-update_O_O "Updates an existing record that matches the defined conditions.")
 *     *   [selectOne()](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI#GQ-selectOne_S "Returns the result of the query as an Optional object containing specified fields.")
 *     *   [avg()](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI#GQ-avg_S "Returns the aggregate average of a given numeric field.")
 *     *   [max()](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI#GQ-max_S "Returns the aggregate maximum of a given field.")
 *     *   [min()](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI#GQ-min_S "Returns the aggregate minimum of a given field.")
 *     *   [sum()](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI#GQ-sum_S "Returns the aggregate sum of a given numeric field.")
 * *   Return an Optional object from the [find()](dev.do#!/reference/api/rome/server/ "Returns the first record or item in the Stream object that matches the predicate function. If no predicate function is provided, then the method returns the first record or item in the Stream.") method in the Stream class. For more information on Stream, see the [Stream](dev.do#!/reference/api/rome/server/ "The Stream API interacts with a stream of items such as records. For example, you can use the forEach() method to update the state of each record in a stream returned by the GlideQuery API.") API.
 * *   Use the [lazy()](dev.do#!/reference/api/rome/server/ "Returns a new Optional object. Instead of containing the record, the object contains a function to get the record that is only called if and when requested in the code.") method to generate the value of the Optional if ever needed.
 * 
 *   
 *   
 * These methods are static and do not require an instance of the class:  
 *   
 * 
 * *   [lazy()](dev.do#!/reference/api/rome/server/ "Returns a new Optional object. Instead of containing the record, the object contains a function to get the record that is only called if and when requested in the code.")
 * *   [of()](dev.do#!/reference/api/rome/server/ "Wraps a given value in an Optional object. For example, you can wrap the result of a GlideRecord query in an Optional object to use the associated methods.")
 * *   [empty()](dev.do#!/reference/api/rome/server/ "Returns an empty Optional object. Use this method in an Else clause to handle a query that might not return a result.")
 * 
 *   
 *   
 * You can use these static methods with any API that returns a single value such as [GlideRecord](dev.do#!/reference/api/rome/server/no-namespace/c_GlideRecordScopedAPI "Scoped GlideRecord is used for database operations.").  
 *   
 * Use the Optional API in scoped or global server-side scripts. This API requires the GlideQuery [com.sn_glidequery] plugin.  
 *   
 * 
 * Implementation
 * --------------
 * 
 * This API can work with the [GlideQuery](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI "The GlideQuery API is an alternative to GlideRecord to perform CRUD operations on record data from server-side scripts.") and [Stream](dev.do#!/reference/api/rome/server/ "The Stream API interacts with a stream of items such as records. For example, you can use the forEach() method to update the state of each record in a stream returned by the GlideQuery API.") APIs in a builder pattern where the method calls chain together, each method building on the returned result of the previous method. Use methods to define the attributes of the query. The methods do not execute until you call a terminal method, a method that returns a query result, allowing you to define the requirements of the query before executing it.
 * 
 * If the query returns a single record, the system wraps the result in an Optional object. If the query returns a stream of records, the system wraps the result in a Stream object. These objects let you manage the result using a set of methods in each API.
 * 
 * For example, here's a script that performs a query on the Task table and groups the records by priority and returns groups with total reassignments greater than four.
 * 
 *     var query = new global.GlideQuery('task')
 *         .where('active', true) //Returns new GlideQuery object with a "where" clause.
 *         .groupBy('priority') //Returns new GlideQuery object with a "group by" clause.
 *         .aggregate('sum', 'reassignment_count') //Returns new GlideQuery object with a "sum(reassignment_count)" clause.
 *         .having('sum', 'reassignment_count', '>', 4) //Returns new GlideQuery object with a "having reassignment_count > 4" clause.
 *         .select() //Returns a stream of records wrapped in a Stream object.  
 *         .toArray(10); //Terminal method in the Stream class that executes the query and returns the result. 
 * 
 *   
 *   
 * 
 * Terminal methods
 * ----------------
 * 
 * For performance reasons, a query only fetches data when you call a terminal method. These are the terminal methods from the Optional class:
 * 
 * *   [get()](dev.do#!/reference/api/rome/server/ "Returns the record inside the Optional object, or returns an error if the query does not return a record.")
 * *   [orElse()](dev.do#!/reference/api/rome/server/ "Adds a default value within the Optional object if the query does not return any results.")
 * *   [ifPresent()](dev.do#!/reference/api/rome/server/ "Applies a function to the record within an Optional object. If the Optional object does not contain a record, the function does not execute.")
 * *   [isEmpty()](dev.do#!/reference/api/rome/server/ "Returns true if the Optional object is empty.")
 * *   [isPresent()](dev.do#!/reference/api/rome/server/ "Checks whether an Optional object contains a value.")
 * 
 */
declare class Optional {

	/**
	 *
	 * Returns an empty Optional object. Use this method in an Else clause to handle a query that might not return a result.
	 *
	 * Note: This method is static. You do not need an instance of the class to use this method.
	 *
	 * @param {string} reason Optional. Reason displayed in the log when Optional.get() is called on the empty Optional object.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	empty(reason: string): any | undefined
	
	/**
	 *
	 * Applies a predicate function, a function that takes a single value and returns true or false, to the record inside the Optional object. If the function returns true, the method returns the Optional record unchanged. If the function returns false, it returns an empty Optional object.
	 *
	 * @param {{[fieldName: string]: string}} predicate Predicate function to apply to the value inside the Optional object. Must return a Boolean value.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	filter(predicate: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Applies a function that returns an Optional object to the result of a query. Use this method to perform a second query using the result of the first.
	 *
	 * @param {{[fieldName: string]: string}} fn Function to apply to the results of the query that returned the Optional object.
	 *
	 * @returns {any | undefined} Object used to interact with a single record.
	 */
	flatMap(fn: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Returns the record inside the Optional object, or returns an error if the query does not return a record.
	 *
	 *
	 * @returns {any} The record inside the Optional object. If the value is null or undefined, the system returns an error.
	 */
	get(): any
	
	/**
	 *
	 * Applies a function to the record within an Optional object. If the Optional object does not contain a record, the function does not execute.
	 *
	 * @param {{[fieldName: string]: string}} fn The function to apply to the record within the Optional object.
	 *
	 * @returns {void} 
	 */
	ifPresent(fn: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Returns true if the Optional object is empty.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether the result of a query contains a value.
	 * 
	 * Valid values:
	 * 
	 * *   true: The query returns null or undefined.
	 * *   false: The query returns a value.
	 */
	isEmpty(): boolean
	
	/**
	 *
	 * Checks whether an Optional object contains a value.
	 *
	 *
	 * @returns {boolean} Flag that indicates whether the result of a query contains a value.
	 * 
	 * Valid values:
	 * 
	 * *   true: The query returns a value.
	 * *   false: The query returns null or undefined.
	 */
	isPresent(): boolean
	
	/**
	 *
	 * Returns a new Optional object. Instead of containing the record, the object contains a function to get the record that is only called if and when requested in the code.
	 *
	 * Use this method to delay getting the value until it's needed. You might do this if requesting the value from a slow source and don't want to slow down your code unnecessarily. Otherwise, you can return an Optional object using the [GlideQuery](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI "The GlideQuery API is an alternative to GlideRecord to perform CRUD operations on record data from server-side scripts.") and [Stream](dev.do#!/reference/api/rome/server/ "The Stream API interacts with a stream of items such as records. For example, you can use the forEach() method to update the state of each record in a stream returned by the GlideQuery API.") APIs.
	 * 	 * 
	 * 	 * Note: This method is static. You do not need an instance of the class to use this method.
	 *
	 * @param {{[fieldName: string]: string}} lazyGetFn Function that returns a single record as a result of a query. For example:
	 * 
	 *     var userGr = new GlideRecord('sys_user');
	 *
	 * @returns {any | undefined} Object containing the result of the query in the format `Optional<result>`.
	 */
	lazy(lazyGetFn: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Applies a function to the result of a query.
	 *
	 * @param {{[fieldName: string]: string}} fn Function to apply to the result of the query.
	 *
	 * @returns {any | undefined} Object containing the results of the query updated by the function in the format `Optional<result>`.
	 */
	map(fn: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Wraps a given value in an Optional object. For example, you can wrap the result of a GlideRecord query in an Optional object to use the associated methods.
	 *
	 * Note: This method is static. You do not need an instance of the class to use this method.
	 *
	 * @param {any} value Value inside the Optional object.
	 *
	 * @returns {any | undefined} Object containing the passed-in value in the format `Optional<value>`.
	 */
	of(value: any): any | undefined
	
	/**
	 *
	 * Adds a default value within the Optional object if the query does not return any results.
	 *
	 * @param {any} defaultValue Value within the Optional object if the query does not return any results.
	 *
	 * @returns {any} Value within the Optional object if the query does not return any results.
	 */
	orElse(defaultValue: any): any
	
}

/** 
 * This API requires the Performance Analytics (com.snc.pa.analytics_center) application. For more information, see [Performance Analytics](https://docs.servicenow.com/bundle/rome-now-intelligence/page/use/performance-analytics/reference/r_PALandingPage.html).
 * 
 */
declare class PAScorecard {

	/**
	 *
	 * Add a query parameter to filter the returned scores.
	 *
	 * Call this method multiple times on the same PAScorecard object to pass multiple parameters, such as the indicator sys_id and a breakdown sys_id. After specifying all parameters, call query() to run the query.
	 * 	 * 
	 * 	 * If you query a PAScorecard object with no parameters, the API returns a list of all indicators that are displayed on the Analytics Hub, with their scores.
	 *
	 * @param {string} uuid Enter a colon-separated list of sys_id values to specify which indicators, breakdowns, aggregates, and domains to query. The parameter follows this format:
	 * 
	 * <indicator_sys_id>:<breakdown_sys_id>:<elements_filter_sys_id or element_sys_ids>:<lvl-2 breakdown_sys_id>:<lvl-2 elements_filter_sys_id or element_sys_ids>:<aggregate_sys_id>;<domain_sys_id>
	 * 
	 * The parameter must begin with the sys_id of an indicator record. Optionally, you can append the sys_id values of a breakdown and breakdown element to group the response based on the breakdown, and the sys_id of an aggregate to apply that aggregate. You can use a breakdown with an aggregate, or use only one.
	 * 
	 * For information about obtaining the sys_id values of records, see [Unique record identifier (sys_id)](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/table-administration/concept/c_UniqueRecordIdentifier.html).
	 * 
	 * Note: If an indicator is configured to use a Default time series, all Analytics Hub values for that indicator use that time series aggregation.
	 * @param {string} breakdown Sys_id of a breakdown to return chart information organized as defined by the breakdown. For example, the sys_id of a priority breakdown to return separate task chart information for each priority value, such as the number of open incidents / Priority / 2 - High.
	 * 
	 * Data type: String
	 * @param {string} breakdown_relation Specify the sys_id of a breakdown relation to break down the returned data using that relation. You can view available breakdown relations by setting the include_available_breakdowns parameter to true.
	 * @param {string} elements_filter Specify the sys_id of an elements filter to apply that filter to the returned data.
	 * @param {string} display Flag that indicates the type of indicators to return.
	 * 
	 * Valid values:
	 * 
	 * *   true: Return only indicators that display on the Analytics Hub.
	 * *   all: Return all indicators.
	 * 
	 * Data type: String
	 * 
	 * Default: true
	 * @param {string} favorites Flag that indicates whether to return only indicators that are favorites of the querying user.
	 * 
	 * Valid values:
	 * 
	 * *   true: Return only indicators that are favorites of the querying user.
	 * *   false: Return all indicators.
	 * 
	 * Data type: Boolean
	 * 
	 * Default: false
	 * @param {string} key Flag that indicates whether to return results only for key indicators.
	 * 
	 * Valid values:
	 * 
	 * *   true: Return the trendline_scores element.
	 * *   false: Do not return the trendline_scores element .
	 * 
	 * Data type: Boolean
	 * 
	 * Default: false
	 * @param {string} target Flag that indicates whether to return results only for indicators that have a target set on the Analytics Hub.
	 * 
	 * Valid values:
	 * 
	 * *   true: Only return results for indicators that have a target set.
	 * *   false: Return results for all applicable indicators.
	 * 
	 * Data type: Boolean
	 * 
	 * Default: false
	 * @param {string} contains Comma-separated list of names or descriptions to return results only from indicators with a matching value. All the comma-separated list items must match, or no results are returned: The list follows AND logic, not OR logic.
	 * 
	 * Data type: String
	 * @param {string} tags Enter an indicator group sys_id to return the indicators in that group. Do not use uuid with this parameter.
	 * @param {string} per_page Maximum number of indicators each query can return on a page.
	 * 
	 * Data type: Number
	 * 
	 * Default: 10
	 * 
	 * Maximum: 100
	 * @param {string} page Specify the page number. For example, when querying 20 Analytics Hubs with the default per_page value (10), specify a page value of 2 to retrieve Analytics Hubs 11-20.
	 * @param {string} sortby Value to use when sorting results.
	 * 
	 * Valid values:
	 * 
	 * *   bullet
	 * *   change
	 * *   changeperc
	 * *   date
	 * *   default
	 * *   direction
	 * *   duedate
	 * *   frequency
	 * *   gap
	 * *   gapperc
	 * *   group
	 * *   indicator_group
	 * *   name
	 * *   order
	 * *   target
	 * *   trend
	 * *   value
	 * 
	 * Data type: String
	 * 
	 * Default: value
	 * @param {string} sortdir Sort direction.
	 * 
	 * Valid values:
	 * 
	 * *   asc: Denotes ascending
	 * *   des: Denotes descending
	 * 
	 * Data type: String
	 * 
	 * Default: Descending
	 * @param {string} display_value Data retrieval operation for reference and choice fields.
	 * 
	 * Based on this value, the display value and/or the actual value in the database are retrieved.
	 * 
	 * *   true returns display values for all of the fields.
	 * *   false returns actual values from the database. If a value is not specified, this parameter defaults to false.
	 * *   all returns both actual and display values.
	 * @param {string} exclude_reference_link Flag that indicates whether to hide additional information provided for reference fields, such as the URI to the reference resource.
	 * 
	 * Valid values:
	 * 
	 * *   true: Hide additional information provided for reference fields.
	 * *   false: Do not hide additional information provided for reference fields.
	 * 
	 * Data type: Boolean
	 * 
	 * Default: false
	 * @param {string} include_scores Flag that indicates whether to return indicator scores for the entire time range selected on the Analytics Hub. If a value is not specified, this parameter defaults to false and returns only the most recent score value.
	 * 
	 * To constrain the date range of the scores that are returned, combine this parameter with the from and to parameters.
	 * @param {string} from Earliest date to return scores from. Only scores from this date or later are returned.
	 * 
	 * This parameter requires that include_scores is set to true.
	 * @param {string} to Latest date from which to return scores. Only scores from this date or earlier are returned.
	 * 
	 * This parameter requires that include_scores is set to true.
	 * @param {string} step Numeric value to skip scores, based on the indicator frequency. For example, specify a value of 3 to return only scores from every third day for a daily indicator, or from every third week for a weekly indicator.
	 * 
	 * Data type: Number
	 * @param {string} limit Maximum number of scores to return.
	 * 
	 * Data type: Number
	 * @param {string} include_available_breakdowns Flag that indicates whether to return all available breakdowns for an indicator.
	 * 
	 * Valid values:
	 * 
	 * *   true: Return all available breakdowns for an indicator.
	 * *   false: Return no breakdowns.
	 * 
	 * Data type: Boolean
	 * 
	 * Default: false
	 * @param {string} include_available_aggregates Flag that indicates whether to return all possible aggregates for an indicator, including aggregates that have already been applied.
	 * 
	 * Valid values:
	 * 
	 * *   true: Return all possible aggregates for an indicator, including aggregates that have already been applied.
	 * *   false: Return no aggregates.
	 * 
	 * Data type: Boolean
	 * 
	 * Default: false
	 * @param {string} include_realtime Flag that indicates whether to return the realtime_enabled element which indicates if real-time scores are enabled for the indicator, and the realtime_value element which contains the real-time score value. This parameter is not supported for formula indicators.
	 * 
	 * Valid values:
	 * 
	 * *   true: Return the realtime_enabled element.
	 * *   false: Do not return the realtime_enabled element.
	 * 
	 * Data type: Boolean
	 * 
	 * Default: false
	 * @param {string} include_target_color_scheme Flag that indicates whether to return the target_color_scheme element that contains the minimum and maximum values, and the color of each section of the target color scheme for the Analytics Hub.
	 * 
	 * Valid values:
	 * 
	 * *   true: Return the target_color_scheme element.
	 * *   false: Do not return the target_color_scheme element.
	 * 
	 * Data type: Boolean
	 * 
	 * Default: false
	 * @param {string} include_forecast_scores Flag that indicates whether to return the forecast_scores element that contains an array of date-value pairs that define the forecast data for the Analytics Hub.
	 * 
	 * This paramater requires that the include_scores parameter is also set to true.
	 * @param {string} include_trendline_scores Flag that indicates whether to return the trendline_scores element that contains an array of date-value pairs that define the Analytics Hub trendline.
	 * 
	 * This paramater requires that the include_scores parameter is also set to true.
	 *
	 * @returns {void} Method does not return a value
	 */
	addParam(uuid: string, breakdown: string, breakdown_relation: string, elements_filter: string, display: string, favorites: string, key: string, target: string, contains: string, tags: string, per_page: string, page: string, sortby: string, sortdir: string, display_value: string, exclude_reference_link: string, include_scores: string, from: string, to: string, step: string, limit: string, include_available_breakdowns: string, include_available_aggregates: string, include_realtime: string, include_target_color_scheme: string, include_forecast_scores: string, include_trendline_scores: string): void
	
	/**
	 *
	 * Perform a query based on the specified parameters and return the results as an object.
	 *
	 * Before calling this method, configure parameters for the PAScorecard object by calling addParam(String parameter, String value).
	 *
	 *
	 * @returns {{[fieldName: string]: string}} The PAScorecard object.
	 */
	query(): {[fieldName: string]: string}
	
	/**
	 *
	 * Get the last query result as an object.
	 *
	 * This method does not perform a query. To perform a query before returning the result, use query().
	 * 	 * 
	 * 	 * This function cannot run in a scope other than global.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} The results from the last query, returned as a JS object.
	 */
	result(): {[fieldName: string]: string}
	
}

/** 
 * You can query information about a snapshot at a certain date using the indicator sys_id and date, and perform comparisons between snapshots for an indicator at different dates.
 * 
 */
declare class PASnapshot {

	/**
	 *
	 * Compare records in snapshots for a specified indicator at multiple dates, such as to identify records included in one snapshot but not the other.
	 *
	 * @param {string} sys_id The indicator sys_id.
	 * @param {number} date1 The date of the first snapshot, in the format yyyymmdd.
	 * @param {number} date2 The date of the second snapshot, in the format yyyymmdd.
	 * @param {string} type Specifies what data to retrieve. Valid values are:
	 * 
	 * *   all1: all records in the first snapshot
	 * *   all2: all records in the second snapshot
	 * *   shared: records that are in both snapshots
	 * *   movedin: records that are in the first snapshot, but not the second
	 * *   movedout: records that are in the second snapshot, but not the first
	 *
	 * @returns {string} A comma-separated list of sys_id values.
	 */
	getCompareIDs(sys_id: string, date1: number, date2: number, type: string): string
	
	/**
	 *
	 * Get the query used to compare records in snapshots for a specified indicator at multiple dates.
	 *
	 * @param {string} sys_id The indicator sys_id.
	 * @param {number} date1 The date of the first snapshot, in the format yyyymmdd.
	 * @param {number} date2 The date of the second snapshot, in the format yyyymmdd.
	 * @param {string} type Specifies what data to retrieve. Valid values are:
	 * 
	 * *   all1: all records in the first snapshot
	 * *   all2: all records in the second snapshot
	 * *   shared: records that are in both snapshots
	 * *   movedin: records that are in the second snapshot, but not the first
	 * *   movedout: records that are in the first snapshot, but not the second
	 *
	 * @returns {string} The table, view, and encoded query as a JSON string.
	 */
	getCompareQuery(sys_id: string, date1: number, date2: number, type: string): string
	
	/**
	 *
	 * Get the sys_id values for all records contained in the snapshot for a specified indicator at the specified date.
	 *
	 * @param {string} sys_id The indicator sys_id.
	 * @param {number} date The date when the snapshot was taken, in the format yyyymmdd.
	 *
	 * @returns {string} A comma-separated list of sys_id values.
	 */
	getIDs(sys_id: string, date: number): string
	
	/**
	 *
	 * Get the query used to generate the snapshot for a specified indicator at the specified date.
	 *
	 * @param {string} sys_id The indicator sys_id.
	 * @param {number} date The date when the snapshot was taken, in the format yyyymmdd.
	 *
	 * @returns {string} The table, view, and encoded query as a JSON string.
	 */
	getQuery(sys_id: string, date: number): string
	
}

/** 
 * Access RenderProperties methods using the static variable `RP`.
 * 
 */
declare class RenderProperties {

	/**
	 *
	 * Returns the encoded query from the URL sent to the page.
	 *
	 *
	 * @returns {string} Returns the encoded query from the URL sent to the form.
	 */
	getEncodedQuery(): string
	
	/**
	 *
	 * Returns the list control object for the page.
	 *
	 *
	 * @returns {ScopedSysListControl} The list control object for the page.
	 */
	getListControl(): ScopedSysListControl
	
	/**
	 *
	 * Returns the value of the specified URL parameter.
	 *
	 * @param {string} parameterName Name of the parameter passed on the URL.
	 *
	 * @returns {string} The parameter's value.
	 */
	getParameterValue(parameterName: string): string
	
	/**
	 *
	 * Returns the URL where the request originated.
	 *
	 *
	 * @returns {string} The URL of the page where the request originated.
	 */
	getReferringURL(): string
	
	/**
	 *
	 * Returns the name of the view in use.
	 *
	 *
	 * @returns {string} The name of the view being used.
	 */
	getViewName(): string
	
	/**
	 *
	 * Returns the window's properties.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} The window's properties
	 */
	getWindowProperties(): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns true if the page is part of Studio.
	 *
	 *
	 * @returns {boolean} Returns true if the page is part of Studio.
	 */
	isInDevStudio(): boolean
	
	/**
	 *
	 * Returns true if this is an interactive session. An interactive session is when a user has logged in as opposed to a REST request.
	 *
	 *
	 * @returns {boolean} True if this is an interactive session.
	 */
	isInteractive(): boolean
	
	/**
	 *
	 * Returns true when the `sysparm_collection_related_file` URL parameter is set.
	 *
	 *
	 * @returns {boolean} Returns true when the `sysparm_collection_related_file` URL parameter is set.
	 */
	isManyToMany(): boolean
	
	/**
	 *
	 * Returns true when the `sys_is_related_list` URL-parameter is true. Returns false if the parameter is not present.
	 *
	 *
	 * @returns {boolean} True if the URL parameter `sys_is_related_list` is true.
	 */
	isRelatedList(): boolean
	
}

/** 
 * With the ScopedDCManager API, you can:
 * 
 * *   Assign data classifications to existing dictionary entries.
 * *   Look up the data classifications for specific dictionary entries.
 * *   Remove all data classifications associated with specific dictionary entries.
 * *   Retrieve a list of all data classifications available in the current domain.
 * 
 *   
 *   
 * This API requires the Data Classification [com.glide.data_classification] plugin.  
 *   
 * For more information, see [Data Classification](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/security/concept/data-classification.html).
 * 
 */
declare class ScopedDCManager {

	/**
	 *
	 * Assigns pre-defined or user-defined data classifications to existing dictionary entries.
	 *
	 * Requires the admin or data_classification_admin role.
	 *
	 * @param {string} dictEntries The sys_ids of the records you want to classify. The sys_ids are from the Dictionary [sys_dictionary] table. Entered as a comma-separated list enclosed in a string.
	 * @param {string} dataClasses The sys_ids of the data classifications you want to assign. The sys_ids are from the Data Classification [data_classification] table. Entered as a comma-separated list enclosed in a string.
	 *
	 * @returns {string} Message describing the result of the operation.
	 */
	classify(dictEntries: string, dataClasses: string): string
	
	/**
	 *
	 * Removes all data classifications for the specified dictionary entries.
	 *
	 * Requires the admin or data_classification_admin role.
	 *
	 * @param {string} dictEntries The sys_ids of the records you want to remove classifications from. The sys_ids are from the Dictionary [sys_dictionary] table. Entered as a comma-separated list enclosed in a string.
	 *
	 * @returns {string} Message describing the result of the operation.
	 */
	clearClassification(dictEntries: string): string
	
	/**
	 *
	 * Returns a list of all data classifications available in the current domain.
	 *
	 * Requires the admin, data_classification_admin, or data_classification_auditor role.
	 *
	 *
	 * @returns {{parent:{sys_id:string, name:string}, sys_id:string, name:string}[]} Name of the data classification.
	 * 
	 * Data type: String
	 */
	getAllDataClasses(): {parent:{sys_id:string, name:string}, sys_id:string, name:string}[]
	
	/**
	 *
	 * Retrieves all data classifications for the specified dictionary entries.
	 *
	 * Requires the admin, data_classification_admin, or data_classification_auditor role.
	 *
	 * @param {string} dictEntries The sys_ids of the records you want to retrieve classifications for. The sys_ids are from the Dictionary [sys_dictionary] table. Entered as a comma-separated list enclosed in a string.
	 *
	 * @returns {{parent:{sys_id:string, name:string}, sys_id:string, name:string}} Name of the data classification.
	 * 
	 * Data type: String
	 */
	getClassification(dictEntries: string): {parent:{sys_id:string, name:string}, sys_id:string, name:string}
	
}

/** 
 * The SPScriptedFacet API can only be used in a facet generation script in a Service Portal search source. The facet generation script is only visible when Is scripted source is selected.  
 *   
 * There is no constructor for this class. Instead, use the createFacet() or createMultiChoiceFacet() methods of the SPScriptedFacetService class to generate a facets object.
 * 
 */
declare class SPScriptedFacet {

	/**
	 *
	 * Adds facet items or mapped queries to a facets object.
	 *
	 * Before adding facet items to a facets object, create the facets object using the createFacet() or createMultiChoiceFacet() methods of the SPScriptedFacetService class.
	 *
	 * @param {string} label The display label for the facet item or mapped query.
	 * @param {{[fieldName: string]: string}} valueObj The facet item or mapped query for the facet. Can only contain types String, Number, Boolean, and Double.
	 *
	 * @returns {void} Method does not return a value
	 */
	addFacetItem(label: string, valueObj: {[fieldName: string]: string}): void
	
}

/** 
 * The SPScriptedFacetService API can only be used in a facet generation script in a Service Portal search source. The facet generation script is only visible when Is scripted source is selected.  
 *   
 * There is no constructor for this class. Instead, use the createFacet() or createMultiChoiceFacet() methods to generate a facets object.
 * 
 */
declare class SPScriptedFacetService {

	/**
	 *
	 * Creates a single choice facets object.
	 *
	 * After creating the facets object, add facet items or mapped queries to the facet using the addFacetItem() method of the SPScriptedFacet class.
	 *
	 * @param {string} label Label for the facet.
	 * @param {string} id ID for the facet.
	 *
	 * @returns {{[fieldName: string]: string}} Single choice facets object. Returns an error when:
	 * 
	 * *   A duplicate label or ID is found.
	 * *   A label or ID is not defined.
	 */
	createFacet(label: string, id: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Creates a multi choice facets object.
	 *
	 * After creating the facets object, add facet items or mapped queries to the facet using the addFacetItem() method of the SPScriptedFacet class.
	 *
	 * @param {string} label Label for the facet.
	 * @param {string} id ID for the facet.
	 *
	 * @returns {{[fieldName: string]: string}} Multi choice facets object.
	 * 
	 * Returns an error when:
	 * 
	 * *   A duplicate label or ID is found.
	 * *   A label or ID is not defined.
	 */
	createMultiChoiceFacet(label: string, id: string): {[fieldName: string]: string}
	
}

/** 
 * You can get a Stream object in these ways:  
 *   
 * 
 * *   Instantiate a Stream object using the constructor.
 * *   Return a Stream object from the GlideQuery.select() method. For more information, see [GlideQuery](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI "The GlideQuery API is an alternative to GlideRecord to perform CRUD operations on record data from server-side scripts.").
 * 
 *   
 *   
 * This method is static and does not require an instance of the class: [fromArray()](dev.do#!/reference/api/rome/server/ "Returns a Stream object that contains the values from the provided array.").  
 *   
 * Use the Stream API in scoped or global server-side scripts. This API requires the GlideQuery [com.sn_glidequery] plugin.  
 *   
 * 
 * Implementation
 * --------------
 * 
 * This API can work with the [GlideQuery](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI "The GlideQuery API is an alternative to GlideRecord to perform CRUD operations on record data from server-side scripts.") and [Optional](dev.do#!/reference/api/rome/server/no-namespace/OptionalGlobalAPI "The Optional API interacts with a single record returned by the GlideQuery, Stream, or GlideRecord APIs, even when it does not exist. Write scripts that are less likely to result in an error by handling null or undefined query results.") APIs in a builder pattern where the method calls chain together, each method building on the returned result of the previous method. Use methods to define the attributes of the query. The methods do not execute until you call a terminal method, a method that returns a query result, allowing you to define the requirements of the query before executing it.
 * 
 * If the query returns a single record, the system wraps the result in an Optional object. If the query returns a stream of records, the system wraps the result in a Stream object. These objects let you manage the result using a set of methods in each API.
 * 
 * For example, here's a script that performs a query on the Task table and groups the records by priority and returns groups with total reassignments greater than four.
 * 
 *     var query = new global.GlideQuery('task')
 *         .where('active', true) //Returns new GlideQuery object with a "where" clause.
 *         .groupBy('priority') //Returns new GlideQuery object with a "group by" clause.
 *         .aggregate('sum', 'reassignment_count') //Returns new GlideQuery object with a "sum(reassignment_count)" clause.
 *         .having('sum', 'reassignment_count', '>', 4) //Returns new GlideQuery object with a "having reassignment_count > 4" clause.
 *         .select() //Returns a stream of records wrapped in a Stream object.  
 *         .toArray(10); //Terminal method in the Stream class that executes the query and returns the result. 
 * 
 *   
 *   
 * 
 * Terminal methods
 * ----------------
 * 
 * For performance reasons, a query only fetches data when you call a terminal method. These are the terminal methods from the Stream class:
 * 
 * *   [every()](dev.do#!/reference/api/rome/server/ "Applies a predicate function to every item in the Stream object. If the predicate returns true for every item in the stream, the method returns true. If the predicate returns false for any item in the stream, the method returns false.")
 * *   [find()](dev.do#!/reference/api/rome/server/ "Returns the first record or item in the Stream object that matches the predicate function. If no predicate function is provided, then the method returns the first record or item in the Stream.")
 * *   [forEach()](dev.do#!/reference/api/rome/server/ "Applies the specified function to each record or item in the stream.")
 * *   [reduce()](dev.do#!/reference/api/rome/server/ "Executes a reducer function on each item in the stream, resulting in single output value.")
 * *   [some()](dev.do#!/reference/api/rome/server/ "Applies a predicate function, a function that takes a single value and returns true or false, to each item in the stream. If the predicate returns true for any item in the stream, the method returns true.")
 * *   [toArray()](dev.do#!/reference/api/rome/server/ "Returns an array containing the given number of items from the stream.")
 * 
 */
declare class Stream {

	/**
	 *
	 * @param {{[fieldName: string]: string}} nextFn A function that retrieves the next item in the stream.
	 *
	 */
	constructor(nextFn: {[fieldName: string]: string})
	
	/**
	 *
	 * Returns results in batches of arrays, each containing the number of records passed to the method.
	 *
	 * @param {number} count Number of records in each array returned from the stream.
	 *
	 * @returns {{[fieldName: string]: string}} Object used to interact with a stream of items such as records.
	 */
	chunk(count: number): {[fieldName: string]: string}
	
	/**
	 *
	 * Applies a predicate function to every item in the Stream object. If the predicate returns true for every item in the stream, the method returns true. If the predicate returns false for any item in the stream, the method returns false.
	 *
	 * @param {{[fieldName: string]: string}} predicate Predicate function to apply to every record or item inside the Stream object. The function must take each item in the stream as input and return a boolean.
	 *
	 * @returns {boolean} Flag that indicates whether the predicate function returns true for every item in the stream.
	 * 
	 * Valid values:
	 * 
	 * *   true: The predicate function returns true for every item in the stream.
	 * *   false: The predicate function does not return true for every item in the stream.
	 */
	every(predicate: {[fieldName: string]: string}): boolean
	
	/**
	 *
	 * Applies a predicate function to each item in the Stream object. If the predicate returns true, the method returns the stream. If the predicate returns false, it returns an empty Stream object.
	 *
	 * For better performance, use the where(), whereNotNull(), and whereNull() methods in the GlideQuery class instead of this method where possible. See [GlideQuery](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI "The GlideQuery API is an alternative to GlideRecord to perform CRUD operations on record data from server-side scripts.").
	 *
	 * @param {{[fieldName: string]: string}} predicate Predicate function to apply to every record or item inside the Stream object. The function must take each item in the stream as input and return a boolean.
	 *
	 * @returns {{[fieldName: string]: string}} Object used to interact with a stream of items such as records.
	 */
	filter(predicate: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Returns the first record or item in the Stream object that matches the predicate function. If no predicate function is provided, then the method returns the first record or item in the Stream.
	 *
	 * @param {{[fieldName: string]: string}} predicate Optional. Predicate function to apply to the items inside the Stream object. The function must take each item in the stream as input and return a boolean.
	 *
	 * @returns {any | undefined} Object containing the returned record.
	 */
	find(predicate: {[fieldName: string]: string}): any | undefined
	
	/**
	 *
	 * Applies a function to every item in a stream. Returns another stream that you can iterate over.
	 *
	 * Use this method instead of map() if the function returns a second stream of records.
	 *
	 * @param {{[fieldName: string]: string}} fn Function to apply to the result of the query that returns a Stream object.
	 *
	 * @returns {{[fieldName: string]: string}} Object containing the stream of records updated after applying the function.
	 */
	flatMap(fn: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Applies the specified function to each record or item in the stream.
	 *
	 * @param {{[fieldName: string]: string}} fn Function to apply to each item in the stream.
	 *
	 * @returns {void} 
	 */
	forEach(fn: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Returns a Stream object that contains the values from the provided array.
	 *
	 * Note: This method is static. You do not need an instance of the class to use this method.
	 *
	 * @param {{[fieldName: string]: string}} arr Array of values to create the stream from.
	 *
	 * @returns {{[fieldName: string]: string}} Object used to interact with a stream of items such as records.
	 */
	fromArray(arr: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Limits the number of results returned by the stream.
	 *
	 * For better performance, use the limit() method in the GlideQuery class where possible. See [GlideQuery](dev.do#!/reference/api/rome/server/no-namespace/GlideQueryAPI "The GlideQuery API is an alternative to GlideRecord to perform CRUD operations on record data from server-side scripts."). You may need to use this method to limit results with the Stream.flatMap() method.
	 *
	 * @param {number} count Number of records to return.
	 *
	 * @returns {{[fieldName: string]: string}} Object used to interact with a stream of items such as records.
	 */
	limit(count: number): {[fieldName: string]: string}
	
	/**
	 *
	 * Applies a function to each item in a stream and returns the updated Stream object.
	 *
	 * @param {{[fieldName: string]: string}} fn Function to apply to the result of the query that takes the each item in the stream as input.
	 *
	 * @returns {{[fieldName: string]: string}} Object containing the stream of records updated after applying the function.
	 */
	map(fn: {[fieldName: string]: string}): {[fieldName: string]: string}
	
	/**
	 *
	 * Executes a reducer function on each item in the stream, resulting in single output value.
	 *
	 * This method is similar to the native JavaScript reduce() method. For more information, see [w3schools documentation](https://www.w3schools.com/jsref/jsref_reduce.asp).
	 *
	 * @param {{[fieldName: string]: string}} reducerFn Function to apply to each item in the stream that reduces the stream to a single value. This function must take two arguments:
	 * 
	 * *   `acc`: Accumulator that accumulates all values returned by the function.
	 * *   `cur`: Current item being accumulated in the array.
	 * @param {any} initialValue Value passed to the function as the initial value.
	 *
	 * @returns {any} Accumulated total of all items returned by the reducer function.
	 */
	reduce(reducerFn: {[fieldName: string]: string}, initialValue: any): any
	
	/**
	 *
	 * Applies a predicate function, a function that takes a single value and returns true or false, to each item in the stream. If the predicate returns true for any item in the stream, the method returns true.
	 *
	 * @param {{[fieldName: string]: string}} predicate Predicate function to apply to the items inside the Stream object. Must return a Boolean value.
	 *
	 * @returns {boolean} Flag that indicates whether the predicate function returned true for an item in the stream.
	 * 
	 * Valid values:
	 * 
	 * *   true: The predicate function returned true for an item in the stream.
	 * *   false: The predicate function did not return true for an item in the stream.
	 */
	some(predicate: {[fieldName: string]: string}): boolean
	
	/**
	 *
	 * Returns an array containing the given number of items from the stream.
	 *
	 * @param {number} count The maximum number of items from the stream to return in the array.
	 *
	 * @returns {{[fieldName: string]: string}} Array containing the given number of items from the stream.
	 */
	toArray(count: number): {[fieldName: string]: string}
	
}

/** 
 * There is no constructor for the scoped TemplatePrinter API. The methods are called in mail scripts using the template global variable.
 * 
 */
declare class TemplatePrinter {

	/**
	 *
	 * Prints the string to the email body.
	 *
	 * @param {string} string The string to print
	 *
	 * @returns {void} Method does not return a value
	 */
	print(string: string): void
	
	/**
	 *
	 * Adds non-breaking spaces to the email body.
	 *
	 * @param {number} spaces The number of non-breaking spaces to output to the email body.
	 *
	 * @returns {void} Method does not return a value
	 */
	space(spaces: number): void
	
}

/** 
 * This API requires the Remote Tables plugin (com.glide.script.vtable) to be activated. [Retrieving external data using remote tables and scripts](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/remote-tables/concept/remote-tables.html).  
 *   
 * Remote table rows are created using the [v_table](dev.do#!/reference/api/rome/server/ "Scriptable object that enables you to add rows to a remote table.") API.
 * 
 */
declare class v_queryAPI {

	/**
	 *
	 * Gets an encoded query string for the specified field.
	 *
	 * @param {string} field Name of the field.
	 *
	 * @returns {string} Returns an [encoded query string](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html) for the given field.
	 */
	getCondition(field: string): string
	
	/**
	 *
	 * Returns the query against a remote table as an encoded query string
	 *
	 * For details, see [Encoded query strings](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html).
	 *
	 *
	 * @returns {string} The encoded query as a string.
	 */
	getEncodedQuery(): string
	
	/**
	 *
	 * Gets the value of a field in an equality query condition.
	 *
	 * @param {string} field Name of the field to be queried.
	 *
	 * @returns {string} Value of the field in the query condition. For example, if `name=John` is the encoded query, then getParameter("name") returns `"John"`.
	 */
	getParameter(field: string): string
	
	/**
	 *
	 * Returns the sys_id value in a get query.
	 *
	 *
	 * @returns {string} Sys_id value in the get query, for example, if `sys_id=123`, this method returns 123.
	 */
	getSysId(): string
	
	/**
	 *
	 * Gets a text search query parameter.
	 *
	 * See also:
	 * 	 * 
	 * 	 * *   [Encoded query strings](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html)
	 * 	 * *   [Querying tables in script](https://docs.servicenow.com/bundle/rome-application-development/page/script/server-scripting/concept/c_UsingGlideRecordToQueryTables.html)
	 *
	 *
	 * @returns {string} Text search query parameter, for example email.
	 */
	getTextSearch(): string
	
	/**
	 *
	 * Determines if the query is a get query, that is, a query that retrieves a record by sys_id.
	 *
	 *
	 * @returns {boolean} Flag indicates that query for a specific record has `sys_id=` as the query format.
	 * 
	 * Valid values:
	 * 
	 * *   true: Query contains equality query condition on the sys_id field.
	 * *   false: Query does not include equality query condition on the sys_id field.
	 */
	isGet(): boolean
	
	/**
	 *
	 * Indicates if the query contains a text query parameter.
	 *
	 * See also:
	 * 	 * 
	 * 	 * *   [Encoded query strings](https://docs.servicenow.com/bundle/rome-platform-user-interface/page/use/using-lists/concept/c_EncodedQueryStrings.html)
	 * 	 * *   [Querying tables in script](https://docs.servicenow.com/bundle/rome-application-development/page/script/server-scripting/concept/c_UsingGlideRecordToQueryTables.html)
	 *
	 *
	 * @returns {boolean} Flag that indicates whether the query contains a text query parameter.
	 * 
	 * Valid values:
	 * 
	 * *   true: Query contains a text query parameter.
	 * *   false: Query does not contain a text query parameter.
	 */
	isTextSearch(): boolean
	
	/**
	 *
	 * Sets the last error message in the GlideRecord.
	 *
	 * See also [Scoped GlideRecord - getLastErrorMessage()](dev.do#!/reference/api/rome/server/no-namespace/c_GlideRecordScopedAPI "Scoped GlideRecord is used for database operations.").
	 *
	 * @param {string} message Error message.
	 *
	 * @returns {void} 
	 */
	setLastErrorMessage(message: string): void
	
}

/** 
 * This API requires the Remote Tables plugin (com.glide.script.vtable) to be activated. [Retrieving external data using remote tables and scripts](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/remote-tables/concept/remote-tables.html).  
 *   
 * Use the [v_query](dev.do#!/reference/api/rome/server/no-namespace/v_queryAPI "Scriptable object that represents a query running against a remote table.") scriptable object to query remote tables.
 * 
 */
declare class v_tableAPI {

	/**
	 *
	 * Adds rows to the remote table.
	 *
	 * See also [Create a script definition for a remote table](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/remote-tables/task/create-remote-table-script.html).
	 *
	 * @param {{[fieldName: string]: string}} row JavaScript object containing field name and value map in which the key is the field name, for example, `{number: "INC0001", sys_id: "a34"}`.
	 * 
	 *     { <field name>: String }
	 * @param {string} row.<field value> Represents the value of the selected field. Although no fields are mandatory, ServiceNow recommends sys_id.
	 * 
	 * Example listing only sys_id field and value:
	 * 
	 *     { sys_id: "<uniqueID>" }
	 *
	 * @returns {boolean} Flag that indicates whether the row was added to the remote table.
	 * 
	 * Valid values:
	 * 
	 * *   true: Success.
	 * *   false: Row was not added.
	 */
	addRow(row: {[fieldName: string]: string}): boolean
	
}

/** 
 * There are no constructors for creating an instance of a scoped workflow object. Instead, use the global workflow object available in activity scripts. This workflow object is available in any script location inside a workflow.
 * 
 */
declare class Workflow {

	/**
	 *
	 * Adds a debug message to the log.
	 *
	 * @param {string} message The message to add to the log.
	 * @param {{[fieldName: string]: string}} args Arguments to add to the message.
	 *
	 * @returns {string} The message added to the log.
	 */
	debug(message: string, args: {[fieldName: string]: string}): string
	
	/**
	 *
	 * Adds an error message to the log.
	 *
	 * @param {string} message The message to add to the log.
	 * @param {{[fieldName: string]: string}} args Arguments to add to the message.
	 *
	 * @returns {string} The logged message
	 */
	error(message: string, args: {[fieldName: string]: string}): string
	
	/**
	 *
	 * Returns the specified variable's value.
	 *
	 * @param {string} name The variable name
	 *
	 * @returns {{[fieldName: string]: string}} The variable's value
	 */
	getVariable(name: string): {[fieldName: string]: string}
	
	/**
	 *
	 * Adds an informational message to the log.
	 *
	 * @param {string} message The message to add to the log.
	 * @param {{[fieldName: string]: string}} args Arguments to add to the message.
	 *
	 * @returns {string} The message that is logged.
	 */
	info(message: string, args: {[fieldName: string]: string}): string
	
	/**
	 *
	 * Returns the workflow name.
	 *
	 *
	 * @returns {string} The workflow name
	 */
	name(): string
	
	/**
	 *
	 * Removes the specified variable from the workflow.
	 *
	 * @param {string} name The variable name
	 *
	 * @returns {void} Method does not return a value
	 */
	removeVariable(name: string): void
	
	/**
	 *
	 * Returns the workflow's scratchpad object.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} The scratchpad object.
	 */
	scratchpad(): {[fieldName: string]: string}
	
	/**
	 *
	 * Sets the workflow's result.
	 *
	 * @param {string} result The workflow's result
	 *
	 * @returns {void} Method does not return a value
	 */
	setResult(result: string): void
	
	/**
	 *
	 * Sets the specified variable to the specified value.
	 *
	 * @param {string} name The variable name
	 * @param {{[fieldName: string]: string}} value The value to be assigned to the variable.
	 *
	 * @returns {void} Method does not return a value
	 */
	setVariable(name: string, value: {[fieldName: string]: string}): void
	
	/**
	 *
	 * Adds a warning message to the log.
	 *
	 * @param {string} message The message to add to the log.
	 * @param {{[fieldName: string]: string}} args Arguments to add to the message.
	 *
	 * @returns {string} The logged message
	 */
	warn(message: string, args: {[fieldName: string]: string}): string
	
}

/** 
 * Use this JavaScript class to create an object from an XML string, usually a return value from a web-service invocation, or the XML payload of ECC Queue. Using the XMLDocument2 object in a JavaScript business rule lets you query values from the XML elements and attributes directly.  
 *   
 * An XML string has a tree structure, and the parts of the structure are called nodes. An XMLDocument2 object deals with two node types, element, and document element. An element node is a node with a name and possibly attributes and child nodes. A document-element node is the root node of the XML tree. It is the only node without a parent node.
 * 
 */
declare class XMLDocument2 {

	/**
	 *
	 *
	 */
	constructor()
	
	/**
	 *
	 * Creates and adds an element node to the current node. The element name is the string passed in as a parameter. The new element has no text child nodes.
	 *
	 * @param {string} name The new element's name.
	 *
	 * @returns {XMLNode} Current XML node.
	 */
	createElement(name: string): XMLNode
	
	/**
	 *
	 * Creates and adds an element node with a text child node to the current node.
	 *
	 * @param {string} name Name of the element to add.
	 * @param {string} value Element's text value.
	 *
	 * @returns {XMLNode} Current XML node.
	 */
	createElementWithTextValue(name: string, value: string): XMLNode
	
	/**
	 *
	 * Gets the document element node of the XMLdocument2 object. The document element node is the root node.
	 *
	 *
	 * @returns {XMLNode} The document element.
	 */
	getDocumentElement(): XMLNode
	
	/**
	 *
	 * Gets the first node in the specified XPATH.
	 *
	 * @param {string} xPath The XPATH.
	 *
	 * @returns {XMLNode} The first node.
	 */
	getFirstNode(xPath: string): XMLNode
	
	/**
	 *
	 * Gets the node after the specified node.
	 *
	 * @param {{[fieldName: string]: string}} current The current node.
	 *
	 * @returns {XMLNode} The next node.
	 */
	getNextNode(current: {[fieldName: string]: string}): XMLNode
	
	/**
	 *
	 * Gets the node specified in the XPath.
	 *
	 * @param {string} xPath XPath of the node to obtain.
	 *
	 * @returns {XMLNode} Current XML node.
	 */
	getNode(xPath: string): XMLNode
	
	/**
	 *
	 * Gets all the text child nodes from the node referenced in the specified XPath.
	 *
	 * @param {string} xPath XPath of the text to obtain.
	 *
	 * @returns {string} Text children in the XPath.
	 */
	getNodeText(xPath: string): string
	
	/**
	 *
	 * Parses the XML string and loads it into the XMLDocument2 object.
	 *
	 * @param {string} xmlDoc The document to parse.
	 *
	 * @returns {boolean} Flag that indicates whether the content was parsed.
	 */
	parseXML(xmlDoc: string): boolean
	
	/**
	 *
	 * Makes the node passed in as a parameter the current node.
	 *
	 * @param {XMLNode} element The element node to set as the current node.
	 *
	 * @returns {void} Method does not return a value
	 */
	setCurrentElement(element: XMLNode): void
	
	/**
	 *
	 * When set to true, the XMLDocument2 object processes the document with XML namespaces.
	 *
	 * If you don't set this, an XML document with namespaces won't be enumerated correctly, and an XPath search would fail.
	 *
	 * @param {boolean} aware When true, the XMLDocument2 object processes the document with XML namespaces.
	 *
	 * @returns {void} Method does not return a value
	 */
	setNamespaceAware(aware: boolean): void
	
	/**
	 *
	 * Returns a string containing the XML.
	 *
	 *
	 * @returns {string} A string containing the XML.
	 */
	toString(): string
	
}

/** 
 * There are no constructors for creating a stand alone instance of an XMLNode object. Instead, use the createElement() method of [XMLDocument2](dev.do#!/reference/api/rome/server/no-namespace/c_XMLDocument2ScopedAPI "XMLDocument2 is a JavaScript Object wrapper for parsing and extracting XML data from an XML string."), which adds a node to an existing document.
 * 
 */
declare class XMLNode {

	/**
	 *
	 * Gets the value of the attribute.
	 *
	 * @param {string} attribute Name of the attribute.
	 *
	 * @returns {string} The attribute's value.
	 */
	getAttribute(attribute: string): string
	
	/**
	 *
	 * Returns an object containing the node's attributes as properties with values.
	 *
	 *
	 * @returns {{[fieldName: string]: string}} Contains name-value pairs where the name is the attribute and the value is the attribute's value.
	 */
	getAttributes(): {[fieldName: string]: string}
	
	/**
	 *
	 * Gets a XMLNodeIterator object that can be used to walk through the list of child nodes.
	 *
	 *
	 * @returns {XMLNodeIterator} The node iterator object.
	 */
	getChildNodeIterator(): XMLNodeIterator
	
	/**
	 *
	 * Gets the node's first child node.
	 *
	 *
	 * @returns {XMLNode} The node's first child node.
	 */
	getFirstChild(): XMLNode
	
	/**
	 *
	 * Gets the node's last child node.
	 *
	 *
	 * @returns {XMLNode} The node's last child.
	 */
	getLastChild(): XMLNode
	
	/**
	 *
	 * Gets the node's name. A node's name is determined by the node type. A document-element node's name is #document. A text node's name is #text. An element node's name is the element's name.
	 *
	 *
	 * @returns {string} The node's name.
	 */
	getNodeName(): string
	
	/**
	 *
	 * Gets the node's value. A node's value is determined by the node type. Element and document-element nodes return null.
	 *
	 *
	 * @returns {string} The node's value.
	 */
	getNodeValue(): string
	
	/**
	 *
	 * Gets the text content of the current node. The text content of a node consists of all the node's child text nodes
	 *
	 *
	 * @returns {string} The text content of the current node.
	 */
	getTextContent(): string
	
	/**
	 *
	 * Determines if the node has the specified attribute.
	 *
	 * @param {string} attribute The name of the attribute to check.
	 *
	 * @returns {boolean} True if the node has the attribute.
	 */
	hasAttribute(attribute: string): boolean
	
	/**
	 *
	 * Returns the string value of the current node.
	 *
	 *
	 * @returns {string} The string value of the current node.
	 */
	toString(): string
	
}

/** 
 * There are no constructors for creating a stand alone instance of a XMLNodeIterator object. To create a XMLNodeIterator object use the getChildNodeIterator() method of the XMLNode object.
 * 
 */
declare class XMLNodeIterator {

	/**
	 *
	 * Returns true if the iteration has more elements.
	 *
	 *
	 * @returns {boolean} True if the iteration has more elements.
	 */
	hasNext(): boolean
	
	/**
	 *
	 * Gets the next element in the iteration. The returned element may be a #text node for the spaces/tabs if XML is "pretty formatted".
	 *
	 *
	 * @returns {XMLNode} The next element in the iteration.
	 */
	next(): XMLNode
	
}

declare const action: ActionAPIBoth
declare class GlideRecordSecure extends GlideRecord{}
declare const v_query: v_queryAPI
declare const v_table: v_tableAPI