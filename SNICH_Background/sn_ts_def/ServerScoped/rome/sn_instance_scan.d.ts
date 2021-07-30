declare namespace sn_instance_scan {

	/** 
	 * This API is included with the Instance Scan (com.glide.instance_scan) plugin. For more information, see [Instance Scan](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/reference/hs-landing-page.html).  
	 *   
	 * In Instance Scan, checks run on each record in the scope of a scan on the instance to generate findings. Each finding holds information about an issue record and which check it violated. Findings API methods are used in Instance Scan checks as part of the engine object passed to the user. Add the code to the Script field in the check form.  
	 *   
	 * See also:
	 * 
	 * *   [Getting started with checks](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/concept/hs-intro-health-check.html)
	 * *   [Findings](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/concept/hs-findings.html)
	 * 
	 */
	class FindingAPI {
	
		/**
		 *
		 * Increases the count of the current finding.
		 *
		 * The finding count starts at zero for each record that a check analyzes in a scan. When called, this method increments the finding count. The count indicates that a finding is to be generated for the current record.
		 * 		 * 
		 * 		 * This method can be called multiple times to signify that this finding has multiple occurrences of a check violation in the current record.
		 *
		 *
		 * @returns {void} 
		 */
		increment(): void
		
		/**
		 *
		 * If the current finding is from a linter check, this method increments the current finding count and simultaneously passes the linter node object to the finding.
		 *
		 * Use this method in the Script field in the [Linter Check form](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/task/hc-linter-check.html). This method saves information about the given node, such as a line number in a current finding's details column.
		 * 		 * 
		 * 		 * See also:
		 * 		 * 
		 * 		 * *   [Advanced linter check scripts](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/concept/hs-linter-check-scripts.html)
		 * 		 * *   [LinterCheckAstNode API](dev.do#!/reference/api/rome/server/ "Provides methods for getting abstract syntax tree (AST) node details in linter checks.")
		 *
		 * @param {{[fieldName: string]: string}} node Node object from the linter check.
		 *
		 * @returns {void} 
		 */
		incrementWithNode(node: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets the source of the current finding based on the provided GlideRecord.
		 *
		 * Use this method in the Script field of a Script Only check. This method is not used for any other checks because they automatically set the source as the current record during the scan. For more information, see [Create a script only check](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/task/hs-create-script-health-check.html).
		 *
		 * @param {GlideRecord} source The record to set as the source record for the current finding. This value is added as a reference in the Source field of the Scan Findings [scan_finding] table.
		 *
		 * @returns {void} 
		 */
		setCurrentSource(source: GlideRecord): void
		
	}
	
	/** 
	 * This API is included with the Instance Scan (com.glide.instance_scan) plugin. For more information, see [Instance Scan](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/reference/hs-landing-page.html).  
	 *   
	 * Use the methods in this class to run linter checks on [AST node](https://mozilla.github.io/rhino/javadoc/org/mozilla/javascript/ast/AstNode.html) types by adding code to the Script field in the [Linter Check form](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/task/hc-linter-check.html). For more information, see [Advanced linter check scripts](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/administer/health-scan/concept/hs-linter-check-scripts.html).  
	 *   
	 * Create a linter check to identify any issues in a script. When a linter check is run on a record, an abstract syntax tree for its code is generated. You can use the abstract syntax tree to analyze issues with the code.  
	 *   
	 * Access methods in this API using the Instance Scan engine.rootNode object.
	 * 
	 */
	class LinterCheckAstNodeAPIBoth {
	
		/**
		 *
		 * Retrieves the string value of a name node type. A name node represents a simple identifier that is not a keyword, such as a function or variable name.
		 *
		 *
		 * @returns {string} If the linter object is a name node type, return the name as a string. Null otherwise.
		 */
		getNameIdentifier(): string
		
		/**
		 *
		 * Gets the parent node object of the accessed node.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Parent node object of the accessed node.
		 */
		getParent(): {[fieldName: string]: string}
		
		/**
		 *
		 * Gets the type of the accessed node.
		 *
		 *
		 * @returns {string} Type name of the accessed node. For example, a function call in the source is tokenized as a node with the type name of `CALL`. See [Token class](https://mozilla.github.io/rhino/javadoc/org/mozilla/javascript/Token.html) for all node type names.
		 */
		getTypeName(): string
		
		/**
		 *
		 * Accesses each node in the subtree starting from this node and executes a given callback function on each node.
		 *
		 * @param {{[fieldName: string]: string}} callbackFunction Callback function to be executed on each node in the subtree of this node. This callback function takes a node as a parameter which is the node to be visited.
		 *
		 * @returns {void} 
		 */
		visit(callbackFunction: {[fieldName: string]: string}): void
		
	}
	
}
declare const engine.finding: FindingAPI
declare const engine.rootNode: LinterCheckAstNodeAPIBoth