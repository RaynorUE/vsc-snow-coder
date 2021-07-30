declare namespace sn_kmf_ns {

	/** 
	 * To use this API, you must have already created and configured a Key Management Framework (KMF) cryptographic module with one or more cryptographic specifications and created/imported its associated key. For details, see [Cryptographic module overview](https://docs.servicenow.com/bundle/quebec-platform-administration/page/administer/key-management-framework/concept/crypto-module-overview.html).  
	 *   
	 * The KMFCryptoOperation object generated using this API represents a cryptographic operation, such as a Symmetric Encryption. Use the KMFCryptoOperations() method to create this object, the builder methods to set properties on the object, and the doOperation() method to execute the operation.  
	 *   
	 * You can use this API in both scoped and global applications. You must always specify the sn_kmf_ns namespace when calling this API.
	 * 
	 */
	class KMFCryptoOperation {
	
		/**
		 *
		 * @param {string} cryptoModuleName Name of the Key Management Framework (KMF) cryptographic module to use. This module must be created before calling this method. For details, see [Cryptographic module overview](https://docs.servicenow.com/bundle/quebec-platform-administration/page/administer/key-management-framework/concept/crypto-module-overview.html).
		 * @param {string} operationName Name of the operation to perform.
		 * 
		 * Valid values (not case-sensitive):
		 * 
		 * *   ASYMMETRIC_DECRYPTION: Data decryption using an asymmetric-key algorithm. Requires a KMF cryptographic module with an Asymmetric Data Decryption cryptographic purpose.
		 *     *   Additional builder methods: None
		 *     *   Default input format: Formatted - Formatted to the KMF specifications
		 *     *   Default output format: KMFBase64 - Base64 encoded
		 * *   ASYMMETRIC_ENCRYPTION: Data encryption using an asymmetric-key algorithm. Requires a KMF cryptographic module with an Asymmetric Data Encryption cryptographic purpose.
		 *     *   Additional builder methods: None
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 * *   ASYMMETRIC_UNWRAPPING: Key unwrapping using an asymmetric-key algorithm. Requires a KMF cryptographic module with an Asymmetric Key Unwrapping cryptographic purpose.
		 *     *   Additional builder methods: withAlgorithm()
		 *     *   Default input format: Formatted - Formatted to the KMF specifications
		 *     *   Default output format: KMFBase64 - Base64 encoded
		 * *   ASYMMETRIC_WRAPPING: Key wrapping using an asymmetric-key algorithm. Requires a KMF cryptographic module with an Asymmetric Key Wrapping cryptographic purpose.
		 *     *   Additional builder methods: withAlgorithm(), withSysId()
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 * *   MAC_GENERATION: Generation of a Message Authentication Code (MAC).Symmetric-key algorithm based to provides data integrity and authentication. Requires a KMF cryptographic module with a Symmetric Authenticity cryptographic purpose.
		 *     *   Additional builder methods: None
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 * *   MAC_VERIFICATION: Verification of a MAC. Symmetric-key algorithm based to provide data integrity and authentication. Requires a KMF cryptographic module with a Symmetric Authenticity cryptographic purpose.
		 *     *   Additional builder methods: withAdditionalInput()
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: KMFNone - No decoding
		 * *   SIGNATURE_GENERATION: Generation of a digital signature. Asymmetric-key algorithm based to provide data integrity and authentication. Requires a KMF cryptographic module with a Signature Generation cryptographic purpose.
		 *     *   Additional builder methods: None
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 * *   SIGNATURE_VERIFICATION: Verification of a digital signature. Asymmetric-key algorithm based to provide data integrity and authentication. Requires a KMF cryptographic module with a Signature Verification cryptographic purpose.
		 *     *   Additional builder methods: withAdditionalInput()
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: KMFNone - No decoding
		 * *   SYMMETRIC_ENCRYPTION: Data encryption using a symmetric-key algorithm. If the algorithm is not equality preserving, only formatted output is allowed. Requires a KMF cryptographic module with a Symmetric Data Encryption/Decryption cryptographic purpose.
		 *     *   Additional builder methods: None
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 * *   SYMMETRIC_DECRYPTION: Data decryption using a symmetric-key algorithm. If the algorithm is not equality preserving, KMFBase64 input is allowed. Requires a KMF cryptographic module with a Symmetric Data Encryption/Decryption cryptographic purpose.
		 *     *   Additional builder methods: None
		 *     *   Default input format: Formatted - Formatted to the KMF specifications
		 *     *   Default output format: KMFBase64 - Base64 encoded
		 * *   SYMMETRIC_WRAPPING: Key wrapping using a symmetric-key algorithm. If the algorithm is not equality preserving, only formatted output is allowed. Requires a KMF cryptographic module with a Symmetric Key Wrapping/Unwrapping cryptographic purpose.
		 *     *   Additional builder methods: withAlgorithm() and withSysId()
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 * *   SYMMETRIC_UNWRAPPING: Key unwrapping using a symmetric-key algorithm. If the algorithm is not equality preserving, KMFBase64 input is allowed. Requires a KMF cryptographic module with a Symmetric Key Wrapping/Unwrapping cryptographic purpose.
		 *     *   Additional builder methods: withAlgorithm()
		 *     *   Default input format: Formatted - Formatted to the KMF specifications
		 *     *   Default output format: KMFBase64 - Base64 encoded
		 *
		 */
		constructor(cryptoModuleName: string, operationName: string)
		
		/**
		 *
		 * Performs the cryptographic operation defined by the current KMFCryptoOperation object on the supplied data and returns the result.
		 *
		 * @param {{[fieldName: string]: string}} data Required except if the withSysId() builder method has previously been called on the associated KMFCryptoOperation object. Input data on which to perform the cryptographic operation.
		 *
		 * @returns {any} Data results after performing the operation specified in the associated KMFCryptoOperation object.
		 */
		doOperation(data: {[fieldName: string]: string}): any
		
		/**
		 *
		 * Sets the additional input needed to perform the cryptographic operation.
		 *
		 * For example, during a MAC verification, use this method to pass in the generated MAC address. Similarly, during signature verification, use it to pass in the signature.
		 * 		 * 
		 * 		 * Note: The additional input does not have to be in the same format as what is currently set on the KFMCryptoOperation object.
		 *
		 * @param {string} additionalInput Additional input data needed to perform the cryptographic operation specified in the KMFCryptoOperation object.
		 * 
		 * Supported formats:
		 * 
		 * *   FORMATTED: Formatted to the Key Management Framework (KMF) specifications.
		 * *   KMFBASE64: Base64 encoded.
		 *
		 * @returns {void} 
		 */
		withAdditionalInput(additionalInput: string): void
		
		/**
		 *
		 * Sets the algorithm associated with the key material to wrap.
		 *
		 * @param {string} algorithm Algorithm to use.
		 * 
		 * Valid values:
		 * 
		 * *   AES: Symmetric key type
		 * *   EC: Asymmetric key type
		 * *   HMAC: Symmetric key type
		 * *   RSA: Asymmetric key type
		 *
		 * @returns {void} 
		 */
		withAlgorithm(algorithm: string): void
		
		/**
		 *
		 * Sets the data format for the input data on which the cryptographic operation will be performed. Uses the specified format when decoding the data.
		 *
		 * @param {string} inputFormat Format of the input data.
		 * 
		 * Valid values:
		 * 
		 * *   FORMATTED: Formatted to the Key Management Framework (KMF) specifications.
		 * *   KMFBASE64: Base64 encoded.
		 * *   KMFNONE: No encoding.
		 * 
		 * Default: Value determined by the operation specified when the KMFCryptoOperation object was instantiated. For more information, see [KMFCryptoOperation - KMFCryptoOperation(String cryptoModuleName, String operationName)](dev.do#!/reference/api/quebec/server/sn_kmf_ns-namespace/KMFCryptoOperationBothAPI#KMFCO-KMFCryptoOperation_S_S "Creates a KMFCryptoOperation object for the specified module and operation.").
		 *
		 * @returns {void} 
		 */
		withInputFormat(inputFormat: string): void
		
		/**
		 *
		 * Sets the data format of the output data that is returned by the cryptographic operation. Uses the specified format when encoding the data.
		 *
		 * @param {string} outputFormat Format of the output data.
		 * 
		 * Valid values:
		 * 
		 * *   FORMATTED: Formatted to the Key Management Framework (KMF) specifications.
		 * *   KMFBASE64: Base64 encoded.
		 * *   KMFNONE: No decoding. Only supported for MAC_VERIFICATION and SIGNATURE_VERIFICATION.
		 * 
		 * Default: Value determined by the operation specified when the KMFCryptoOperation object was instantiated. For more information, see [KMFCryptoOperation - KMFCryptoOperation(String cryptoModuleName, String operationName)](dev.do#!/reference/api/quebec/server/sn_kmf_ns-namespace/KMFCryptoOperationBothAPI#KMFCO-KMFCryptoOperation_S_S "Creates a KMFCryptoOperation object for the specified module and operation.").
		 *
		 * @returns {void} 
		 */
		withOutputFormat(outputFormat: string): void
		
		/**
		 *
		 * Sets the sys_id of the key to wrap on the KMFCryptoOperation object. Applicable to symmetric and asymmetric wrapping of keys.
		 *
		 * @param {string} sysId Sys_id of the key to wrap. Located in the Module Key [sys_kmf_module_key] table.
		 *
		 * @returns {void} 
		 */
		withSysId(sysId: string): void
		
	}
	
}