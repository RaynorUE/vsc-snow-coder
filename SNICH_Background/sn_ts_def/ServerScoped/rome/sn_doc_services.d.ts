declare namespace sn_doc_services {

	/** 
	 * This API requires the Document Management plugin (com.snc.platform_document_management) and is provided within the sn_doc_services namespace. For information, see [Document Services](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/document-services/reference/document-services-landing-page.html).  
	 *   
	 * Before using the methods in this API, add a document template with its version and create a document list. Use the [SystemDocumentListEntry](dev.do#!/reference/api/rome/server/ "Provides methods for setting the record fields in the Document List Entries [ds_document_list_entry] table.") API to add or remove documents from a document list.  
	 *   
	 * Before using the methods in this API, you must add a document with its default version and create a document list.
	 * 
	 * *   [SystemDocument](dev.do#!/reference/api/rome/server/ "Provides methods for setting fields of a record in the Documents [ds_document] table.") – Define a document object.
	 * *   [DocumentService](dev.do#!/reference/api/rome/server/ "Provides methods for creating, deleting, and updating a document.") – Add, update, or delete a document.
	 * *   [SystemDocumentVersion](dev.do#!/reference/api/rome/server/ "Provides methods for setting the values of a document's source version in the Versions [ds_document_version] table.") – Define a document version.
	 * *   [DocumentVersionService](dev.do#!/reference/api/rome/server/ "Provides a service for creating and deleting document versions. Each version is an element containing the document content and is provided using a single URL or attachment. An attachment can only be added in the Document Versions [ds_document_version] table UI and not with the API.") – Add, update, or delete a document version.
	 * *   [SystemDocumentList](dev.do#!/reference/api/rome/server/ "Provides methods for setting the record fields in the Document Lists [ds_document_lists] table.") – Define a document list.
	 * *   [DocumentListService](dev.do#!/reference/api/rome/server/ "Provides methods for creating, deleting, and updating a document list.") – Add, update, or delete a document list.
	 * 
	 *   
	 *   
	 * To define a document as a template:
	 * 
	 * *   Define the document object setting the [SystemDocument – template()](dev.do#!/reference/api/rome/server/ "Specifies whether a document record is a template.") method to true. Create or update the document record with the methods in the [DocumentService](dev.do#!/reference/api/rome/server/ "Provides methods for creating, deleting, and updating a document.") API.
	 * *   Select the Template check box of a document in the Documents [ds_document] table.
	 * 
	 */
	class DocumentListEntryService {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Adds a document template entry to a document list.
		 *
		 * @param {{[fieldName: string]: string}} entry One or more properties representing fields of a document list entry object.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		createDocumentListEntry(entry: {[fieldName: string]: string}): any
		
		/**
		 *
		 * Removes a document list entry from the Document List Entries [ds_document_list_entry] table.
		 *
		 * @param {string} listEntryId Sys_id of a document list record in the Document List Entries [ds_document_list_entry] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		deleteDocumentListEntry(listEntryId: string): any
		
		/**
		 *
		 * Updates the field values of an existing document list entry.
		 *
		 * @param {string} listEntryId Sys_id of a document list record in the Document List Entries [ds_document_list_entry] table.
		 * @param {{[fieldName: string]: string}} entry One or more properties representing fields of a document list entry object.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		updateDocumentListEntry(listEntryId: string, entry: {[fieldName: string]: string}): any
		
	}
	
	/** 
	 * This API requires the Document Management plugin (com.snc.platform_document_management) and is provided within the sn_doc_services namespace. For information, see [Document Services](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/document-services/reference/document-services-landing-page.html).  
	 *   
	 * The Document Management plugin also supports creating lists of document templates to associate with your document. For example, a job application requiring multiple documents such as a diploma, ID, or passport. After you add your document list, you can add document templates:
	 * 
	 * *   [SystemDocumentListEntry](dev.do#!/reference/api/rome/server/ "Provides methods for setting the record fields in the Document List Entries [ds_document_list_entry] table.") – Define a document template list entry.
	 * *   [DocumentListEntryService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentListEntryServiceBothAPI "Provides methods for maintaining document templates in a document list.") – Add or remove a document template list entry.
	 * 
	 *   
	 *   
	 * To define a document as a template:
	 * 
	 * *   Define the document object setting the [SystemDocument – template()](dev.do#!/reference/api/rome/server/ "Specifies whether a document record is a template.") method to true. Create or update the document record with the methods in the [DocumentService](dev.do#!/reference/api/rome/server/ "Provides methods for creating, deleting, and updating a document.") API.
	 * *   Select the Template check box of a document in the Documents [ds_document] table.
	 * 
	 *   
	 *   
	 * The following APIs enable you to define and manage documents:
	 * 
	 * *   [SystemDocument](dev.do#!/reference/api/rome/server/ "Provides methods for setting fields of a record in the Documents [ds_document] table.") – Define a document object.
	 * *   [DocumentService](dev.do#!/reference/api/rome/server/ "Provides methods for creating, deleting, and updating a document.") – Add, update, or delete a document.
	 * 
	 *   
	 *   
	 * To define a document as a template:
	 * 
	 * *   Define the document object setting the [SystemDocument – template()](dev.do#!/reference/api/rome/server/ "Specifies whether a document record is a template.") method to true. Create or update the document record with the methods in the [DocumentService](dev.do#!/reference/api/rome/server/ "Provides methods for creating, deleting, and updating a document.") API.
	 * *   Select the Template check box of a document in the Documents [ds_document] table.
	 * 
	 *   
	 *   
	 * See also [SystemDocumentList](dev.do#!/reference/api/rome/server/ "Provides methods for setting the record fields in the Document Lists [ds_document_lists] table.").
	 * 
	 */
	class DocumentListService {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Creates a document list in the Document Lists [ds_document_lists] table.
		 *
		 * The Document Management plugin also supports creating lists of document templates to associate with your document. For example, a job application requiring multiple documents such as a diploma, ID, or passport. After you add your document list, you can add document templates:
		 * 		 * 
		 * 		 * *   [SystemDocumentListEntry](dev.do#!/reference/api/rome/server/ "Provides methods for setting the record fields in the Document List Entries [ds_document_list_entry] table.") – Define a document template list entry.
		 * 		 * *   [DocumentListEntryService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentListEntryServiceBothAPI "Provides methods for maintaining document templates in a document list.") – Add or remove a document template list entry.
		 * 		 * 
		 * 		 * Use the [createDocumentsFromList()](dev.do#!/reference/api/rome/server/ "Creates documents from a list of document templates.") method to create documents from the document template list.
		 *
		 * @param {{[fieldName: string]: string}} doc One or more properties representing fields of a new record. The name property is required and can be set using the SystemDocumentList constructor or name() method.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		createDocumentList(doc: {[fieldName: string]: string}): any
		
		/**
		 *
		 * Creates documents from a list of document templates.
		 *
		 * Note: Before using this method, create a document template list using the [createDocumentList()](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentListServiceBothAPI#DLS-createDocumentList_O "Creates a document list in the Document Lists [ds_document_lists] table.") method.
		 *
		 * @param {string} listSysId Sys_id of a document list record in the Document Lists [ds_document_lists] table.
		 * @param {string} tableName Name of the table containing the record on which add a list of document template references.
		 * @param {string} tableSysId Sys_id of the record containing the content from which to add a list of document template references.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		createDocumentsFromList(listSysId: string, tableName: string, tableSysId: string): any
		
		/**
		 *
		 * Removes a document record from the Document Lists [ds_document_lists] table.
		 *
		 * @param {string} listSysId Sys_id of a document list record in the Document Lists [ds_document_lists] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		deleteDocumentList(listSysId: string): any
		
		/**
		 *
		 * Updates the field values of an existing document list.
		 *
		 * @param {string} listSysId Sys_id of a document list record in the Document Lists [ds_document_lists] table.
		 * @param {{[fieldName: string]: string}} doc One or more properties representing document list fields to be updated.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		updateDocumentList(listSysId: string, doc: {[fieldName: string]: string}): any
		
	}
	
	/** 
	 * This API requires the Document Management plugin (com.snc.platform_document_management) and is provided within the sn_doc_services namespace. For information, see [Document Services](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/document-services/reference/document-services-landing-page.html).  
	 *   
	 * The following APIs enable you to define and manage documents:
	 * 
	 * *   [SystemDocument](dev.do#!/reference/api/rome/server/ "Provides methods for setting fields of a record in the Documents [ds_document] table.") – Define a document object.
	 * *   [DocumentService](dev.do#!/reference/api/rome/server/ "Provides methods for creating, deleting, and updating a document.") – Add, update, or delete a document.
	 * 
	 */
	class DocumentReferenceService {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Adds a document reference to a target table record.
		 *
		 * @param {string} docSysId Sys_id of a document record in the Documents [ds_document] table.
		 * @param {string} targetTable Name of the target table on which to provide a document reference.
		 * @param {string} tableSysId Sys_id of the target table record to which the document reference is to be added.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		addDocumentReference(docSysId: string, targetTable: string, tableSysId: string): any
		
		/**
		 *
		 * Removes a document reference from the Document References [ds_document_reference] table.
		 *
		 * @param {string} docSysId Sys_id of a document record in the Documents [ds_document] table.
		 * @param {string} targetTable Name of the table containing the document reference. This information is listed with the document in the Document References [ds_document_reference] table.
		 * @param {string} tableSysId Sys_id of the record from which the document is referenced. You can find related information listed with the document in the Document References [ds_document_reference] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		removeDocumentReference(docSysId: string, targetTable: string, tableSysId: string): any
		
	}
	
	/** 
	 * This API requires the Document Management plugin (com.snc.platform_document_management) and is provided within the sn_doc_services namespace. For information, see [Document Services](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/document-services/reference/document-services-landing-page.html).  
	 *   
	 * A document is a collection of information about a document record. The methods used to create or update a record modify fields using the [SystemDocument](dev.do#!/reference/api/rome/server/ "Provides methods for setting fields of a record in the Documents [ds_document] table.") object.  
	 *   
	 * Document content is managed using versions. The following APIs enable you to define and manage document versions:
	 * 
	 * *   [SystemDocumentVersion](dev.do#!/reference/api/rome/server/ "Provides methods for setting the values of a document's source version in the Versions [ds_document_version] table.") – Define a document version as the source of the document content. Each version is an element containing the document content and is provided using a single URL or attachment. An attachment can only be added in the Document Versions [ds_document_version] table UI and not with the API.
	 * *   [DocumentVersionService](dev.do#!/reference/api/rome/server/ "Provides a service for creating and deleting document versions. Each version is an element containing the document content and is provided using a single URL or attachment. An attachment can only be added in the Document Versions [ds_document_version] table UI and not with the API.") – Document content is managed using versions.
	 * 
	 *   
	 *   
	 * Use the [DocumentReferenceService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentReferenceServiceBothAPI "Provides methods for managing document references within a target table, such as the Incidents [incident] or Knowledge [kb_knowledge] table. You can use document references to associate information with a record.") API to manage documents referenced in a target table, such as the Incidents [incident] or Knowledge [kb_knowledge] table.  
	 *   
	 * The Document Management plugin also supports creating lists of document templates to associate with your document. For example, a job application requiring multiple documents such as a diploma, ID, or passport.
	 * 
	 * *   [SystemDocumentList](dev.do#!/reference/api/rome/server/ "Provides methods for setting the record fields in the Document Lists [ds_document_lists] table.") – Define a list of document templates.
	 * *   [DocumentListService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentListServiceBothAPI "Provides methods for creating, deleting, and updating a document list.") – Add or remove a document template list.
	 * *   [SystemDocumentListEntry](dev.do#!/reference/api/rome/server/ "Provides methods for setting the record fields in the Document List Entries [ds_document_list_entry] table.") – Define a document template list entry.
	 * *   [DocumentListEntryService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentListEntryServiceBothAPI "Provides methods for maintaining document templates in a document list.") – Add or remove a document template list entry.
	 * 
	 */
	class DocumentService {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Creates a document record in the Documents [ds_document] table.
		 *
		 * @param {{[fieldName: string]: string}} doc One or more properties representing fields of a new record. The name property is required and can be set using the SystemDocument constructor or name() method.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		createDocument(doc: {[fieldName: string]: string}): any
		
		/**
		 *
		 * Removes a document record from the Documents [ds_document] table.
		 *
		 * @param {string} docSysId Sys_id of a document record in the Documents [ds_document] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		deleteDocument(docSysId: string): any
		
		/**
		 *
		 * Updates the field values of an existing document record.
		 *
		 * @param {string} docSysId Sys_id of a document record in the Documents [ds_document] table.
		 * @param {{[fieldName: string]: string}} doc One or more properties representing document fields to be updated.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		updateDocument(docSysId: string, doc: {[fieldName: string]: string}): any
		
	}
	
	/** 
	 * This API requires the Document Management plugin (com.snc.platform_document_management) and is provided within the sn_doc_services namespace. For information, see [Document Services](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/document-services/reference/document-services-landing-page.html).  
	 *   
	 * Before creating a document version, you must first define and add a document record.  
	 *   
	 * *   [SystemDocument](dev.do#!/reference/api/rome/server/ "Provides methods for setting fields of a record in the Documents [ds_document] table.") – Define a document object.
	 * *   [DocumentService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentServiceBothAPI "Provides methods for creating, deleting, and updating a document.") – Add, update, or delete a document.
	 * 
	 */
	class DocumentVersionService {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Creates a document version record in the Versions [ds_document_version] table.
		 *
		 * @param {{[fieldName: string]: string}} docVersion One or more properties representing fields of a document version.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		createDocumentVersion(docVersion: {[fieldName: string]: string}): any
		
		/**
		 *
		 * Deletes a document version.
		 *
		 * @param {string} docVersionSysId Sys_id of a document version in the Versions [ds_document_version] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - The operation was successful.
		 * *   failure – The operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		deleteDocumentVersion(docVersionSysId: string): any
		
	}
	
	/** 
	 * This API requires the Document Management plugin (com.snc.platform_document_management) and is provided within the sn_doc_services namespace. For information, see [Document Services](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/document-services/reference/document-services-landing-page.html).  
	 *   
	 * To create a document, use the [DocumentService API](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentServiceBothAPI "Provides methods for creating, deleting, and updating a document.").
	 * 
	 */
	class SystemDocument {
	
		/**
		 *
		 * @param {string} docName Name of the document.
		 *
		 */
		constructor(docName: string): void
		
		/**
		 *
		 * Sets the Audience field of a document record to specify external or internal availability. Represents the Audience field in a Document Management form.
		 *
		 * @param {string} audience String representing the intended audience of the document.
		 * 
		 * Possible values:
		 * 
		 * *   external
		 * *   internal
		 * 
		 * Default: internal
		 *
		 * @returns {void} 
		 */
		audience(audience: string): void
		
		/**
		 *
		 * Sets the Classification field of a document record to identify the level of information sensitivity. Represents the Classification field in a Document Management form.
		 *
		 * @param {string} classification Classification of the document.
		 * 
		 * Possible values:
		 * 
		 * *   confidential
		 * *   public
		 * *   restricted
		 * 
		 * Default: public
		 *
		 * @returns {string} The value of the classification property of a SystemDocument object.
		 */
		classification(classification: string): string
		
		/**
		 *
		 * Sets the template from which to generate a document. When the document is generated, the specified template is listed in the Created From Template field in the Documents [ds_document_list] table.
		 *
		 * @param {string} docTemplate Sys_id of a document listed in the Documents [ds_document_list] table. The document must have the Template checkbox selected (true). See also [DocumentVersionService API](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentVersionServiceBothAPI "Provides a service for creating and deleting document versions. Each version is an element containing the document content and is provided using a single URL or attachment. An attachment can only be added in the Document Versions [ds_document_version] table UI and not with the API.").
		 *
		 * @returns {void} 
		 */
		createdFromTemplate(docTemplate: string): void
		
		/**
		 *
		 * Sets the Department field of a document record.
		 *
		 * @param {string} docDept Sys_id of a department listed in the Departments [cmn_department] table.
		 *
		 * @returns {void} 
		 */
		department(docDept: string): void
		
		/**
		 *
		 * Sets the Description field of a document record.
		 *
		 * @param {string} description Description of the document.
		 *
		 * @returns {void} 
		 */
		description(description: string): void
		
		/**
		 *
		 * Sets the Name field of a document record.
		 *
		 * Note: You can also set the name as a parameter in the SystemDocument() constructor.
		 *
		 * @param {string} docName Name of the document.
		 *
		 * @returns {void} 
		 */
		name(docName: string): void
		
		/**
		 *
		 * Sets the Owner field of a document record.
		 *
		 * @param {string} owner Sys_id of a user listed in the Users [sys_user] table.
		 * 
		 * Role required: admin
		 * 
		 * Default: Current user
		 *
		 * @returns {void} 
		 */
		owner(owner: string): void
		
		/**
		 *
		 * Sets the Reviewers field of a document record.
		 *
		 * @param {string} reviewers List of one or more document reviewers by sys_id. The reviewer must be a user listed in the Users [sys_user] table.
		 *
		 * @returns {void} 
		 */
		reviewers(reviewers: string): void
		
		/**
		 *
		 * Sets the State field of a document record.
		 *
		 * @param {string} state State of the document representing where the document is in the workflow.
		 * 
		 * Valid values:
		 * 
		 * *   draft
		 * *   submit
		 * *   review
		 * *   complete
		 * 
		 * Default: draft
		 *
		 * @returns {void} 
		 */
		state(state: string): void
		
		/**
		 *
		 * Specifies whether a document record is a template.
		 *
		 * @param {boolean} template Flag that specifies whether a document record is a template.
		 * 
		 * Valid values:
		 * 
		 * *   true: The default version of this document is a template.
		 * *   false: This document is not a template.
		 * 
		 * Default: false
		 *
		 * @returns {void} 
		 */
		template(template: boolean): void
		
		/**
		 *
		 * Sets the Type field of a document record.
		 *
		 * @param {string} docType Type of document.
		 * 
		 * Valid values:
		 * 
		 * *   contract
		 * *   guideline
		 * *   policy
		 * *   procedure
		 * 
		 * Default: None
		 *
		 * @returns {void} 
		 */
		type(docType: string): void
		
	}
	
	/** 
	 * This API requires the Document Management plugin (com.snc.platform_document_management) and is provided within the sn_doc_services namespace. For information, see [Document Services](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/document-services/reference/document-services-landing-page.html).  
	 *   
	 * To create or manage a document list, use the [DocumentListService API](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentListServiceBothAPI "Provides methods for creating, deleting, and updating a document list.").
	 * 
	 */
	class SystemDocumentList {
	
		/**
		 *
		 * @param {string} docListName Name of the document list.
		 *
		 */
		constructor(docListName: string): void
		
		/**
		 *
		 * Sets the Description field of a new document list record.
		 *
		 * @param {string} description Description of the document list.
		 *
		 * @returns {void} 
		 */
		description(description: string): void
		
		/**
		 *
		 * Sets the Name field of a document list record.
		 *
		 * Note: You can also set the name as a parameter in the SystemDocumentList() constructor.
		 *
		 * @param {string} docListName Name of the document list.
		 *
		 * @returns {void} 
		 */
		name(docListName: string): void
		
	}
	
	/** 
	 * This API requires the Document Management plugin (com.snc.platform_document_management) and is provided within the sn_doc_services namespace. For information, see [Document Services](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/document-services/reference/document-services-landing-page.html).  
	 *   
	 * Before using the methods in this API, add a document with its version and create a document list. Use the [DocumentListEntryService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentListEntryServiceBothAPI "Provides methods for maintaining document templates in a document list.") API to add or remove documents from a document list.  
	 *   
	 * Before using the methods in this API, you must add a document with its versions, and create a document list.
	 * 
	 * *   [SystemDocument](dev.do#!/reference/api/rome/server/sn_doc_services/SystemDocumentBothAPI "Provides methods for setting fields of a record in the Documents [ds_document] table.") – Define a document object.
	 * *   [DocumentService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentServiceBothAPI "Provides methods for creating, deleting, and updating a document.") – Add, update, or delete a document.
	 * *   [SystemDocumentVersion](dev.do#!/reference/api/rome/server/ "Provides methods for setting the values of a document's source version in the Versions [ds_document_version] table.") – Define a document version.
	 * *   [DocumentVersionService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentVersionServiceBothAPI "Provides a service for creating and deleting document versions. Each version is an element containing the document content and is provided using a single URL or attachment. An attachment can only be added in the Document Versions [ds_document_version] table UI and not with the API.") – Add, update, or delete a document version.
	 * *   [SystemDocumentList](dev.do#!/reference/api/rome/server/sn_doc_services/SystemDocumentListBothAPI "Provides methods for setting the record fields in the Document Lists [ds_document_lists] table.") – Define a document list.
	 * *   [DocumentListService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentListServiceBothAPI "Provides methods for creating, deleting, and updating a document list.") – Add, update, or delete a document list.
	 * 
	 */
	class SystemDocumentListEntry {
	
		/**
		 *
		 * @param {string} listSysId Sys_id of a document list record in the Document Lists [ds_document_lists] table.
		 *
		 */
		constructor(listSysId: string): void
		
		/**
		 *
		 * Sets the Description field of a document list entry record.
		 *
		 * @param {string} description Description of the document list entry.
		 *
		 * @returns {void} 
		 */
		description(description: string): void
		
		/**
		 *
		 * Specifies the document template to add to a document list.
		 *
		 * To define a document as a template:
		 * 		 * 
		 * 		 * *   Define the document object setting the [SystemDocument – template()](dev.do#!/reference/api/rome/server/sn_doc_services/SystemDocumentBothAPI#SystemDoc-template_S "Specifies whether a document record is a template.") method to true. Create or update the document record with the methods in the [DocumentService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentServiceBothAPI "Provides methods for creating, deleting, and updating a document.") API.
		 * 		 * *   Select the Template check box of a document in the Documents [ds_document] table.
		 * 		 * 
		 * 		 * The document record specified must have a version. Use the following APIs to define and add a document version:
		 * 		 * 
		 * 		 * *   [SystemDocumentVersion](dev.do#!/reference/api/rome/server/ "Provides methods for setting the values of a document's source version in the Versions [ds_document_version] table.") – Define a document version.
		 * 		 * *   [DocumentVersionService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentVersionServiceBothAPI "Provides a service for creating and deleting document versions. Each version is an element containing the document content and is provided using a single URL or attachment. An attachment can only be added in the Document Versions [ds_document_version] table UI and not with the API.") – Add, update, or delete a document version.
		 *
		 * @param {string} docSysId Sys_id of a document record in the Documents [ds_document] table. The document specified must be a template and have a version.
		 *
		 * @returns {void} 
		 */
		document(docSysId: string): void
		
		/**
		 *
		 * Specifies the document list in which to add a document.
		 *
		 * Note: You can alternatively set the document list as a parameter in the SystemDocumentListEntry() constructor.
		 * 		 * 
		 * 		 * Use the following APIs to define and create a document list:
		 * 		 * 
		 * 		 * *   [SystemDocumentList](dev.do#!/reference/api/rome/server/sn_doc_services/SystemDocumentListBothAPI "Provides methods for setting the record fields in the Document Lists [ds_document_lists] table.") – Define a document list.
		 * 		 * *   [DocumentListService](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentListServiceBothAPI "Provides methods for creating, deleting, and updating a document list.") – Add, update, or delete a document list.
		 *
		 * @param {string} listSysId Sys_id of a document list record in the Document Lists [ds_document_lists] table.
		 *
		 * @returns {void} 
		 */
		documentList(listSysId: string): void
		
	}
	
	/** 
	 * This API requires the Document Management plugin (com.snc.platform_document_management) and is provided within the sn_doc_services namespace. For information, see [Document Services](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/document-services/reference/document-services-landing-page.html).  
	 *   
	 * To create a document version, use the [DocumentVersionService API](dev.do#!/reference/api/rome/server/sn_doc_services/DocumentVersionServiceBothAPI "Provides a service for creating and deleting document versions. Each version is an element containing the document content and is provided using a single URL or attachment. An attachment can only be added in the Document Versions [ds_document_version] table UI and not with the API.").
	 * 
	 */
	class SystemDocumentVersion {
	
		/**
		 *
		 * @param {string} docSysId Sys_id of a document record in the Documents [ds_document] table.
		 *
		 */
		constructor(docSysId: string): void
		
		/**
		 *
		 * Specifies the document record for this version.
		 *
		 * Note: You can alternatively set the name as a parameter in the SystemDocumentVersion() constructor.
		 *
		 * @param {string} docSysId Sys_id of a document record in the Documents [ds_document] table.
		 *
		 * @returns {void} 
		 */
		document(docSysId: string): void
		
		/**
		 *
		 * Sets the Type field of a document version.
		 *
		 * @param {string} docType Document source type.
		 * 
		 * Valid values:
		 * 
		 * *   url
		 * *   attachment
		 * 
		 * Default: attachment
		 * 
		 * Note: An attachment can currently only be added in the Document Versions [ds_document_version] table UI and not with the API.
		 *
		 * @returns {void} 
		 */
		type(docType: string): void
		
		/**
		 *
		 * Sets the URL of a document version.
		 *
		 * @param {string} url URL of the source document for this version.
		 *
		 * @returns {void} 
		 */
		url(url: string): void
		
		/**
		 *
		 * Sets the number of a document version.
		 *
		 * @param {number} versionNumber Version number for this document.
		 *
		 * @returns {void} 
		 */
		versionNumber(versionNumber: number): void
		
	}
	
}