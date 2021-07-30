declare namespace sn_impex {

	/** 
	 * The CSVParser API is in the sn_impex namespace.
	 * 
	 */
	class CSVParser {
	
		/**
		 *
		 * Parses passed in CSV formatted content into an array.
		 *
		 * @param {string} csvLine CSV content to parse.
		 * @param {string} delimiter Optional. Character used to delineate the fields in the source CSV content.
		 * 
		 * Default: Comma ','
		 * @param {string} quoteCharacter Optional. Character used as the quote character in the source CSV content.
		 * 
		 * Default: Double quote '"'
		 *
		 * @returns {{[fieldName: string]: string}} Array containing the parsed values for each element in the passed-in CSV content.
		 * 
		 * For example:
		 * 
		 * {
		 * Joe,
		 * Smith,
		 * 470 W Carmen, Chicago IL, 60640
		 * }
		 */
		parseLineToArray(csvLine: string, delimiter: string, quoteCharacter: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Parses passed in CSV formatted content into an object.
		 *
		 * @param {string} csvLine CSV content to parse.
		 * @param {{[fieldName: string]: string}} headers Headers associated with the CSV content. These headers must be specified in the same order as the corresponding content in csvLine. For example, var headers = ['first_name', 'last_name', 'address'];
		 * @param {string} delimiter Optional. Character used to delineate the fields in the source CSV content.
		 * 
		 * Default: Comma ','
		 * @param {string} quoteCharacter Optional. Character used as the quote character in the source CSV content.
		 * 
		 * Default: Double quote '"'
		 *
		 * @returns {{[fieldName: string]: string}} Object containing the header and corresponding value for each element in the passed-in CSV content.
		 * 
		 * For example:
		 * 
		 * {
		 * first_name: Joe,
		 * last_name: Smith,
		 * address: 1470 W Carmen, Chicago IL, 60640
		 * }
		 */
		parseLineToObject(csvLine: string, headers: {[fieldName: string]: string}, delimiter: string, quoteCharacter: string): {[fieldName: string]: string}
		
	}
	
	/** 
	 * The GlideExcelParser methods can be used in global and scoped scripts. Use the sn_impex namespace identifier to create a GlideExcelParser object.
	 * 
	 */
	class GlideExcelParser {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Close the connection to the input stream and release the document.
		 *
		 *
		 * @returns {void} Method does not return a value
		 */
		close(): void
		
		/**
		 *
		 * Returns a list of column headers from the parsed document.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} An array of strings of column headers from the parsed document.
		 */
		getColumnHeaders(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the error message when the parse() method fails.
		 *
		 *
		 * @returns {string} The error message.
		 */
		getErrorMessage(): string
		
		/**
		 *
		 * Get the current row values and headers.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The row headers are property names and the row values are property values.
		 */
		getRow(): {[fieldName: string]: string}
		
		/**
		 *
		 * Gets table column types and max character length from a spreadsheet or CSV attachment.
		 *
		 * Note: This method is restricted to scoped applications.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Returns attachment data as a map in which the key is column name. Values contain column type and maximum length of a character string in the column. Access return values using the getType() and getLength() methods.
		 */
		getTableInfo(): {[fieldName: string]: string}
		
		/**
		 *
		 * Moves to the next row.
		 *
		 *
		 * @returns {boolean} Returns true if there is a next row, otherwise, returns false.
		 */
		next(): boolean
		
		/**
		 *
		 * Parse an XLSX formatted Excel document.
		 *
		 * @param {GlideScriptableInputStream} inputStream The Excel document to be parsed.
		 *
		 * @returns {boolean} Returns true if the parse was successful, otherwise, returns false.
		 */
		parse(inputStream: GlideScriptableInputStream): boolean
		
		/**
		 *
		 * Set the number of the header row to be retrieved.
		 *
		 * @param {number} headerRowNumber The header row to be retrieved.
		 *
		 * @returns {void} Method does not return a value
		 */
		setHeaderRowNumber(headerRowNumber: number): void
		
		/**
		 *
		 * Return an empty value instead of null when an Excel cell is not present.
		 *
		 * @param {boolean} empty When true, cells that are not present return an empty value. When false, cells that are not present return null.
		 *
		 * @returns {void} Method does not return a value
		 */
		setNullToEmpty(empty: boolean): void
		
		/**
		 *
		 * Set the name of the sheet to be retrieved.
		 *
		 * If both setSheetNumber() and setSheetName() are set, setSheetName() is used.
		 *
		 * @param {string} sheetName The name of the sheet to be retrieved.
		 *
		 * @returns {void} Method does not return a value
		 */
		setSheetName(sheetName: string): void
		
		/**
		 *
		 * Set the number of the Excel sheet to be retrieved.
		 *
		 * If both setSheetNumber() and setSheetName() are set, setSheetNumber() is ignored.
		 *
		 * @param {number} sheetNumber The Excel sheet number to retrieve.
		 *
		 * @returns {void} Method does not return a value
		 */
		setSheetNumber(sheetNumber: number): void
		
	}
	
	/** 
	 * These methods create the Import Set table using a dynamic, standard naming convention. Tables must have at least one defined column. Modification and deletion of existing Import Set tables is not supported.  
	 *   
	 * A scheduled job named Scripted Import Set Deleter runs every seven days by default. Scripted Import Set Deleter deletes all Import Sets, Transform Maps, Transform Entries, and drops the Import Set Tables associated with the tables created by this API.  
	 *   
	 * You can use the GlideImportSetTable methods in global and scoped scripts. Use the sn_impex namespace identifier to create a GlideImportSetTable object.
	 * 
	 */
	class GlideImportSetTable {
	
		/**
		 *
		 * @param {string} tableLabel Label of the Import Set table created upon calling the create() method.
		 *
		 */
		constructor(tableLabel: string)
		
		/**
		 *
		 * Creates a GlideDateTime column.
		 *
		 * @param {string} columnLabel Label of the GlideDateTime column to create in the Import Set table.
		 *
		 * @returns {void} Method does not return a value
		 */
		addDateTimeColumn(columnLabel: string): void
		
		/**
		 *
		 * Creates a string column.
		 *
		 * @param {string} columnLabel Label of the string column to create in the Import Set table.
		 * @param {number} length Optional. Maximum column length.
		 * 
		 * Default: 40 characters
		 *
		 * @returns {void} Method does not return a value
		 */
		addStringColumn(columnLabel: string, length: number): void
		
		/**
		 *
		 * Creates the Import Set table.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} JSON object in the following format:
		 * 
		 * *   tableName: String. Database name of the table.
		 * *   tableLabel: String. User-friendly label of the table (rewriteable).
		 * *   columns: Object. Map of table column labels to column names provided by the addDateTimeColumn() and addStringColumn() methods.
		 *     *   column_label: String. Label of the string column in the Import Set table.
		 *     *   column_name: String. Name of the string column in the Import Set table.
		 * 
		 * {"tableName": "<table_name>", "tableLabel": "<table label>", "columns": StringMap(<column_label>: <column_name>)}
		 */
		create(): {[fieldName: string]: string}
		
	}
	
	/** 
	 * You can use the GlideImportSetTransformMap methods in global and scoped scripts. Use the sn_impex namespace identifier to create a GlideImportSetTransformMap object.
	 * 
	 */
	class GlideImportSetTransformMap {
	
		/**
		 *
		 * @param {string} transformMapName Name of the map.
		 * @param {string} importSetTableName Name of the Import Set table.
		 * @param {string} targetTableName Name of the target table.
		 *
		 */
		constructor(transformMapName: string, importSetTableName: string, targetTableName: string)
		
		/**
		 *
		 * Add a GlideDateTime transform entry to a transform map.
		 *
		 * @param {string} targetColumn Target column from target table to transform to.
		 * @param {boolean} coalesce Optional. Flag that indicates whether to insert the record into the target table
		 * 
		 * *   true: If true and target table contains a record with the same value in this field, the record is updated, that is, not inserted.
		 * *   false: Default. Record is inserted into the target table.
		 * @param {string} sourceColumn Source column from Import Set table to transform from.
		 * @param {string} dateTimeFormat Optional. GlideDateTime format of the transform, for example, yyyy-MM-dd HH:mm:ss. If empty, the default value is the system date time format.
		 *
		 * @returns {void} Method does not return a value
		 */
		addDateTimeTransformEntry(targetColumn: string, coalesce: boolean, sourceColumn: string, dateTimeFormat: string): void
		
		/**
		 *
		 * Adds a string transform entry to a transform map.
		 *
		 * @param {string} targetColumn Source column from Import Set table to transform from.
		 * @param {string} coalesce Target column from target table to transform to.
		 * @param {boolean} sourceColumn Optional. Flag that indicates whether to insert the record into the target table
		 * 
		 * *   true: If true and target table contains a record with the same value in this field, the record is updated, that is, not inserted.
		 * *   false: Default. Record is inserted into the target table.
		 *
		 * @returns {void} Method does not return a value
		 */
		addTransformEntry(targetColumn: string, coalesce: string, sourceColumn: boolean): void
		
		/**
		 *
		 * Creates a new transform map.
		 *
		 * Note: To create a transform map you must have defined at least one transform entry using either addDateTimeTransformEntry() or addTransformEntry().
		 *
		 *
		 * @returns {string} The sys_id of the created transform map.
		 */
		create(): string
		
	}
	
}