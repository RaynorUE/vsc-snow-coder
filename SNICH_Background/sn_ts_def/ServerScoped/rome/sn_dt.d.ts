declare namespace sn_dt {

	/** 
	 * Access DecisionTableAPI methods using the sn_dt namespace. To learn more about Decision Tables, see [Decision Tables](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/decision-table/concept/decision-table.html).
	 * 
	 */
	class DecisionTableAPI {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Returns all decision tables from the Decision Tables [sys_decision] table.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} All decision tables and their fields from the Decision Tables [sys_decision] table. Each decision table contains these key-value pairs:
		 * 
		 * *   distinctAnswers: Array. Answer records associated with the decision table. Each record contains these key-value pairs.
		 *     *   valid: Boolean. True if the record exists in the system; otherwise false.
		 *     *   label: String. Answer record label.
		 *     *   value: String. Sys ID of the answer record.
		 *     *   table: String. Table containing the answer record.
		 * *   referenceQualifier: String. Used for internal purposes.
		 * *   inputs: Array. Decision inputs from the Decision Inputs [sys_decision_input] table associated with the decision table. Each record contains these key-value pairs.
		 *     *   searchField: String. Used for internal purposes.
		 *     *   defaultValue: String. Default value for the input.
		 *     *   show_ref_finder: Boolean. Used for internal purposes.
		 *     *   use_dependent: Boolean. Used for internal purposes.
		 *     *   type: String. Input data type.
		 *     *   mandatory: Boolean. True if the input is mandatory; otherwise false.
		 *     *   extended: Boolean. True if the input extends another field; otherwise false.
		 *     *   local: Boolean. Used for internal purposes.
		 *     *   sys_class_name: String. Used for internal purposes.
		 *     *   reference: String. Reference table used if the input type is reference.
		 *     *   dependent_on: String. Field that document ID and choice inputs depend on.
		 *     *   data_structure: String. Used for internal purposes.
		 *     *   readonly: Boolean. True if the input is read-only; otherwise false.
		 *     *   id: String. Sys ID of the input from the Decision Inputs [sys_decision_input] table.
		 *     *   type_label: String. Input data type label.
		 *     *   table: String. Reference field table if the input type is reference.
		 *     *   order: Number. Order in which the system evaluates inputs.
		 *     *   ref_qual: String. Condition applied to the reference table.
		 *     *   reference_display: String. Used for internal purposes.
		 *     *   choiceOption: String. Method for users to see a list of suggested values.
		 *     *   label: String. Label of the input record.
		 *     *   hint: String. Hint text used to help users understand the input required.
		 *     *   name: String. Internal name of the input record.
		 *     *   attributes: Array. Field attributes that apply to the input record.
		 *     *   maxsize: Number. Maximum number of characters allowed in the field.
		 *     *   columnName: String. Name of the input.
		 * *   domain: String. Domain in which the decision table is visible.
		 * *   answerType: String. Used for internal purposes.
		 * *   questions: Array. Decision records from the Decision [sys_decision_question] table associated with the decision table. Decision records contain these key-value pairs.
		 *     *   defaultAnswer: Boolean. True if this decision is the default for the decision table; otherwise false.
		 *     *   condition: String. Conditions required to reach this decision. The fields available for the condition are the decision inputs that are associated with this decision table.
		 *     *   answer: Object. Answer record associated with the decision. Answer objects contain these key-value pairs.
		 *         *   valid: Boolean. True if the record exists in the system; otherwise false.
		 *         *   label: String. Answer record label.
		 *         *   value: String. Sys ID of the answer record.
		 *         *   table: String. Table containing the answer record.
		 *     *   decisionTable: String. Sys ID of the decision table from the Decision Tables [sys_decision] table associated with the decision.
		 *     *   domain: String. Domain in which the decision is visible.
		 *     *   active: Boolean. True if the decision record is active; otherwise false.
		 *     *   id: String. Sys ID of the decision record from the Decision [sys_decision_question] table.
		 *     *   label: String. Label for the decision record.
		 *     *   order: Number. Order in which the system evaluates decisions.
		 * *   accessibleFrom: String. Scopes that have access to the record.
		 * *   name: String. Internal name of the decision table record.
		 * *   active: Boolean. True if the decision table record is active; otherwise false.
		 * *   id: String. Sys ID of the decision table record.
		 * *   label: String. Label of the decision table record.
		 * *   answerTable: Object. Answer table associated with the decision table.
		 *     *   displayValue: String. Display name of the table that contains answer records.
		 *     *   value: String. Internal name of the table that contains answer records.
		 * 
		 * Format: JSON
		 */
		getAll(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the answers associated with the specified decision table. An answer is a record on any table associated with a Decision [sys_decision_question] record.
		 *
		 * @param {string} decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
		 *
		 * @returns {{[fieldName: string]: string}} Answer records associated with the decision table. Each record contains these key-value pairs:
		 * 
		 * *   valid: Boolean. True if the record exists in the system; otherwise false.
		 * *   label: String. Answer record label.
		 * *   value: String. Sys ID of the answer record.
		 * *   table: String. Table containing the answer record.
		 * 
		 * Format: JSON
		 */
		getAnswers(decisionID: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Evaluates a decision table based on the provided inputs and returns an answer. If no inputs are provided, returns the first default answer found.
		 *
		 * @param {string} decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
		 * @param {{[fieldName: string]: string}} inputs Optional. Input values for the Decision Inputs [sys_decision_input] table associated with the provided decision table. Use the value of the Column name field as the key. The data type of the value must match the Decision Input Type field. If no inputs are provided, returns the first default answer found.
		 *
		 * @returns {GlideRecord} The correctly evaluated Answer record associated with the decision table. An answer record is a record from the table defined in the Decision [sys_decision_question] record Answer table field.
		 * 
		 * If no inputs are provided, returns the first default answer found. If no default or correctly evaluated answers are found, returns an error.
		 */
		getDecision(decisionID: string, inputs: {[fieldName: string]: string}): GlideRecord
		
		/**
		 *
		 * Evaluates a decision table based on the provided inputs and returns all correctly evaluated answers. If no inputs are provided, returns all default answers.
		 *
		 * @param {string} decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
		 * @param {{[fieldName: string]: string}} inputs Optional. Input values for the Decision Inputs [sys_decision_input] table associated with the provided decision table. If no inputs are provided, returns all default answers.
		 *
		 * @returns {{[fieldName: string]: string}} Answer records in GlideRecord format. An answer record is a record on any table associated with a Decision [sys_decision_question] record. If no inputs are provided, returns all default answers. If no default or correctly evaluated answers are found, returns an error.
		 */
		getDecisions(decisionID: string, inputs: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns a single decision table from the Decision Tables [sys_decision] table.
		 *
		 * @param {string} decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
		 *
		 * @returns {{[fieldName: string]: string}} Decision table from the Decision Tables [sys_decision] table. Each decision table contains these key-value pairs.
		 * 
		 * *   distinctAnswers: Array. Answer records associated with the decision table. Each record contains these key-value pairs.
		 *     *   valid: Boolean. True if the record exists in the system; otherwise false.
		 *     *   label: String. Answer record label.
		 *     *   value: String. Sys ID of the answer record.
		 *     *   table: String. Table containing the answer record.
		 * *   referenceQualifier: String. Used for internal purposes.
		 * *   inputs: Array. Decision inputs from the Decision Inputs [sys_decision_input] table associated with the decision table. Each record contains these key-value pairs.
		 *     *   searchField: String. Used for internal purposes.
		 *     *   defaultValue: String. Default value for the input.
		 *     *   show_ref_finder: Boolean. Used for internal purposes.
		 *     *   use_dependent: Boolean. Used for internal purposes.
		 *     *   type: String. Input data type.
		 *     *   mandatory: Boolean. True if the input is mandatory; otherwise false.
		 *     *   extended: Boolean. True if the input extends another field; otherwise false.
		 *     *   local: Boolean. Used for internal purposes.
		 *     *   sys_class_name: String. Used for internal purposes.
		 *     *   reference: String. Reference table used if the input type is reference.
		 *     *   dependent_on: String. Field that document ID and choice inputs depend on.
		 *     *   data_structure: String. Used for internal purposes.
		 *     *   readonly: Boolean. True if the input is read-only; otherwise false.
		 *     *   id: String. Sys ID of the input from the Decision Inputs [sys_decision_input] table.
		 *     *   type_label: String. Input data type label.
		 *     *   table: String. Reference field table if the input type is reference.
		 *     *   order: Number. Order in which the system evaluates inputs.
		 *     *   ref_qual: String. Condition applied to the reference table.
		 *     *   reference_display: String. Used for internal purposes.
		 *     *   choiceOption: String. Method for users to see a list of suggested values.
		 *     *   label: String. Label of the input record.
		 *     *   hint: String. Hint text used to help users understand the input required.
		 *     *   name: String. Internal name of the input record.
		 *     *   attributes: Array. Field attributes that apply to the input record.
		 *     *   maxsize: Number. Maximum number of characters allowed in the field.
		 *     *   columnName: String. Name of the input.
		 * *   domain: String. Domain in which the decision table is visible.
		 * *   answerType: String. Used for internal purposes.
		 * *   questions: Array. Decision records from the Decision [sys_decision_question] table associated with the decision table. Decision records contain these key-value pairs.
		 *     *   defaultAnswer: Boolean. True if this decision is the default for the decision table; otherwise false.
		 *     *   condition: String. Conditions required to reach this decision. The fields available for the condition are the decision inputs that are associated with this decision table.
		 *     *   answer: Object. Answer record associated with the decision. Answer objects contain these key-value pairs.
		 *         *   valid: Boolean. True if the record exists in the system; otherwise false.
		 *         *   label: String. Answer record label.
		 *         *   value: String. Sys ID of the answer record.
		 *         *   table: String. Table containing the answer record.
		 *     *   decisionTable: String. Sys ID of the decision table from the Decision Tables [sys_decision] table associated with the decision.
		 *     *   domain: String. Domain in which the decision is visible.
		 *     *   active: Boolean. True if the decision record is active; otherwise false.
		 *     *   id: String. Sys ID of the decision record from the Decision [sys_decision_question] table.
		 *     *   label: String. Label for the decision record.
		 *     *   order: Number. Order in which the system evaluates decisions.
		 * *   accessibleFrom: String. Scopes that have access to the record.
		 * *   name: String. Internal name of the decision table record.
		 * *   active: Boolean. True if the decision table record is active; otherwise false.
		 * *   id: String. Sys ID of the decision table record.
		 * *   label: String. Label of the decision table record.
		 * *   answerTable: Object. Answer table associated with the decision table.
		 *     *   displayValue: String. Display name of the table that contains answer records.
		 *     *   value: String. Internal name of the table that contains answer records.
		 * 
		 * Format: JSON
		 */
		getDecisionTable(decisionID: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the decision inputs from the Decision Inputs [sys_decision_input] table associated with the passed in decision table.
		 *
		 * @param {string} decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
		 *
		 * @returns {{[fieldName: string]: string}} Decision inputs from the Decision Inputs [sys_decision_input] table associated with the decision table. You can find the inputs associated with a decision table using the Decision Inputs related list in the Decision Tables [sys_decision] table. Inputs contain these key-value pairs.
		 * 
		 * *   searchField: String. Used for internal purposes.
		 * *   defaultValue: String. Default value for the input.
		 * *   show_ref_finder: Boolean. Used for internal purposes.
		 * *   use_dependent: Boolean. Used for internal purposes.
		 * *   type: String. Input data type.
		 * *   mandatory: Boolean. True if the input is mandatory; otherwise false.
		 * *   extended: Boolean. True if the input extends another field; otherwise false.
		 * *   local: Boolean. Used for internal purposes.
		 * *   sys_class_name: String. Used for internal purposes.
		 * *   reference: String. Reference table used if the input type is reference.
		 * *   dependent_on: String. Field that document ID and choice inputs depend on.
		 * *   data_structure: String. Used for internal purposes.
		 * *   readonly: Boolean. True if the input is read-only; otherwise false.
		 * *   id: String. Sys ID of the input from the Decision Inputs [sys_decision_input] table.
		 * *   type_label: String. Input data type label.
		 * *   table: String. Reference field table if the input type is reference.
		 * *   order: Number. Order in which the system evaluates inputs.
		 * *   ref_qual: String. Condition applied to the reference table.
		 * *   reference_display: String. Used for internal purposes.
		 * *   choiceOption: String. Method for users to see a list of suggested values.
		 * *   label: String. Label of the input record.
		 * *   hint: String. Hint text used to help users understand the input required.
		 * *   name: String. Internal name of the input record.
		 * *   attributes: Array. Field attributes that apply to the input record.
		 * *   maxsize: Number. Maximum number of characters allowed in the field.
		 * *   columnName: String. Name of the input.
		 * 
		 * Format: JSON
		 */
		getInputs(decisionID: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the decisions from the Decision [sys_decision_question] table associated with the passed in decision table.
		 *
		 * @param {string} decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
		 *
		 * @returns {{[fieldName: string]: string}} Decisions from the Decision [sys_decision_question] table associated with the decision table. You can find the decisions associated with a decision table using the Decisions related list in the Decision Tables [sys_decision] table. Decision records contain these key-value pairs.
		 * 
		 * *   defaultAnswer: Boolean. True if this decision is the default for the decision table; otherwise false.
		 * *   condition: String. Conditions required to reach this decision. The fields available for the condition are the decision inputs that are associated with this decision table.
		 * *   answer: Object. Answer record associated with the decision. Answer objects contain these key-value pairs.
		 *     *   valid: Boolean. True if the record exists in the system; otherwise false.
		 *     *   label: String. Answer record label.
		 *     *   value: String. Sys ID of the answer record.
		 *     *   table: String. Table containing the answer record.
		 * *   decisionTable: String. Sys ID of the decision table from the Decision Tables [sys_decision] table associated with the decision.
		 * *   domain: String. Domain in which the decision is visible.
		 * *   active: Boolean. True if the decision record is active; otherwise false.
		 * *   id: String. Sys ID of the decision record from the Decision [sys_decision_question] table.
		 * *   label: String. Label for the decision record.
		 * *   order: Number. Order in which the system evaluates decisions.
		 * 
		 * Format: JSON
		 */
		getQuestions(decisionID: string): {[fieldName: string]: string}
		
	}
	
}