declare namespace sn_kmf_ns {

	/** 
	 * To use this API, you must have already created and configured a Key Management Framework (KMF) cryptographic module with one or more cryptographic specifications and created/imported its associated key. For details, see [Cryptographic modules](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/key-management-framework/concept/cryptographic-modules.html).  
	 *   
	 * The KMFCryptoOperation object generated using this API represents a cryptographic operation, such as a Symmetric Encryption. Use the KMFCryptoOperations() method to create this object, the builder methods to set properties on the object, and the doOperation() method to execute the operation.  
	 *   
	 * You can use this API in both scoped and global applications. You must always specify the `sn_kmf_ns` namespace when calling this API.
	 * 
	 */
	class KMFCryptoOperation {
	
		/**
		 *
		 * @param {string} cryptoModuleName Name of the Key Management Framework (KMF) cryptographic module to use. You must create this module before calling this method. For details, see [Cryptographic modules](https://docs.servicenow.com/bundle/rome-platform-administration/page/administer/key-management-framework/concept/cryptographic-modules.html).
		 * @param {string} operationName Name of the operation to perform.
		 * 
		 * Valid values (not case-sensitive):
		 * 
		 * *   ASYMMETRIC_DECRYPTION: Data decryption using an asymmetric-key algorithm. Requires a KMF cryptographic module with an Asymmetric Data Decryption cryptographic purpose.
		 *     *   Additional builder methods: withAdditionalInput()
		 *     *   Default input format: Formatted - Formatted to the KMF specifications
		 *     *   Default output format: KMFBase64 - Base64 encoded
		 *     *   Default output type: String
		 * *   ASYMMETRIC_ENCRYPTION: Data encryption using an asymmetric-key algorithm. Requires a KMF cryptographic module with an Asymmetric Data Encryption cryptographic purpose.
		 *     *   Additional builder methods: withAdditionalInput()
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 *     *   Default output type: String. Output can also be an [KMFEncryptionPayload](dev.do#!/reference/api/rome/server/) object. RSA and EC-IES are compatible with both. For additional information on the KMFEncryptionPayload object, see [withAdditionalInput()](dev.do#!/reference/api/rome/server/).
		 * *   ASYMMETRIC_UNWRAPPING: Key unwrapping using an asymmetric-key algorithm. Requires a KMF cryptographic module with an Asymmetric Key Unwrapping cryptographic purpose.
		 *     *   Additional builder methods: withAlgorithm()
		 *     *   Default input format: Formatted - Formatted to the KMF specifications
		 *     *   Default output format: KMFBase64 - Base64 encoded
		 *     *   Default output type: String
		 * *   ASYMMETRIC_WRAPPING: Key wrapping using an asymmetric-key algorithm. Requires a KMF cryptographic module with an Asymmetric Key Wrapping cryptographic purpose.
		 *     *   Additional builder methods: withAlgorithm(), withSysId()
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 *     *   Default output type: String
		 * *   MAC_GENERATION: Generation of a Message Authentication Code (MAC). Symmetric-key algorithm based to provides data integrity and authentication. Requires a KMF cryptographic module with a Symmetric Authenticity cryptographic purpose.
		 *     *   Additional builder methods: None
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 *     *   Default output type: String
		 * *   MAC_VERIFICATION: Verification of a MAC. Symmetric-key algorithm based to provide data integrity and authentication. Requires a KMF cryptographic module with a Symmetric Authenticity cryptographic purpose.
		 *     *   Additional builder methods: withAdditionalInput()
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: KMFNone - No decoding
		 *     *   Default output type: Boolean
		 * *   SIGNATURE_GENERATION: Generation of a digital signature. Asymmetric-key algorithm based to provide data integrity and authentication. Requires a KMF cryptographic module with a Signature Generation cryptographic purpose.
		 *     *   Additional builder methods: None
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 *     *   Default output type: String
		 * *   SIGNATURE_VERIFICATION: Verification of a digital signature. Asymmetric-key algorithm based to provide data integrity and authentication. Requires a KMF cryptographic module with a Signature Verification cryptographic purpose.
		 *     *   Additional builder methods: withAdditionalInput()
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: KMFNone - No decoding
		 *     *   Default output type: Boolean
		 * *   SYMMETRIC_ENCRYPTION: Data encryption using a symmetric-key algorithm. If the algorithm is not equality preserving, only formatted output is allowed. Requires a KMF cryptographic module with a Symmetric Data Encryption/Decryption cryptographic purpose.
		 *     *   Additional builder methods: None
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 *     *   Default output type: String
		 * *   SYMMETRIC_DECRYPTION: Data decryption using a symmetric-key algorithm. If the algorithm is not equality preserving, KMFBase64 input is allowed. Requires a KMF cryptographic module with a Symmetric Data Encryption/Decryption cryptographic purpose.
		 *     *   Additional builder methods: None
		 *     *   Default input format: Formatted - Formatted to the KMF specifications
		 *     *   Default output format: KMFBase64 - Base64 encoded
		 *     *   Default output type: String
		 * *   SYMMETRIC_WRAPPING: Key wrapping using a symmetric-key algorithm. If the algorithm is not equality preserving, only formatted output is allowed. Requires a KMF cryptographic module with a Symmetric Key Wrapping/Unwrapping cryptographic purpose.
		 *     *   Additional builder methods: withAlgorithm() and withSysId()
		 *     *   Default input format: KMFBase64 - Base64 encoded
		 *     *   Default output format: Formatted - Formatted to the KMF specifications
		 *     *   Default output type: String
		 * *   SYMMETRIC_UNWRAPPING: Key unwrapping using a symmetric-key algorithm. If the algorithm is not equality preserving, KMFBase64 input is allowed. Requires a KMF cryptographic module with a Symmetric Key Wrapping/Unwrapping cryptographic purpose.
		 *     *   Additional builder methods: withAlgorithm()
		 *     *   Default input format: Formatted - Formatted to the KMF specifications
		 *     *   Default output format: KMFBase64 - Base64 encoded
		 *     *   Default output type: String
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
		 * For example, during a Message Authentication Code (MAC) verification, use this method to pass in the generated MAC tag. Similarly, during signature verification, use it to pass in the signature. You can also use this method to pass additional data, a KMFEncryptionPayload object, when performing an asymmetric operation with an integrated cipher, such as Elliptic Curve Integrated Encryption Scheme (EC-IES.)
		 * 		 * 
		 * 		 * Note: The additional input does not have to be in the same format as what is currently set on the KFMCryptoOperation object.
		 *
		 * @param {{[fieldName: string]: string}} additionalInput Optional, except for Asymmetric Decryption operations when using EC-IES. Additional input data needed to perform the cryptographic operation specified in the KMFCryptoOperation object.
		 * 
		 * Supported string formats:
		 * 
		 * *   FORMATTED: Formatted to the Key Management Framework (KMF) specifications.
		 * *   KMFBASE64: Base64 encoded.
		 * 
		 * KMFEncryptionPayload object format:
		 * 
		 *     {
		 *       "ciphertext": String,
		 *       "derivation_secret": String,
		 *       "ephemeral_key": String,
		 *       "ephemeral_key_format": String,
		 *       "signature": String
		 *     }
		 * @param {{[fieldName: string]: string}} additionalInput.ciphertext Required for Asymmetric Decryption, optional for all other operations.
		 * 
		 * Valid values:
		 * 
		 * *   If using an RSA algorithm: RSA ciphertext
		 * *   If using an EC-IES algorithm: Integrated AES ciphertext
		 * 
		 * Available from the Asymmetric Encryption operation when the output type is set to payload.
		 * @param {{[fieldName: string]: string}} additionalInput.derivation_secret Optional, only used for the Asymmetric Encryption or Asymmetric Decryption operations with EC-IES. Shared secret to use during the key derivation process of the integrated scheme.
		 * @param {{[fieldName: string]: string}} additionalInput.ephemeral_key Required for the Asymmetric Decryption operation when using EC-IES, optional for all other operations. Ephemeral public key to use during the basic agreement process of the integrated scheme.
		 * 
		 * Available from the Asymmetric Encryption operation when the output type is set to payload.
		 * @param {string} additionalInput.ephemeral_key_format Optional, only used for the Asymmetric Encryption or Asymmetric Decryption operations with EC-IES. Overrides the format of the public key represented by the ephemeral_key parameter.
		 * 
		 * Valid values:
		 * 
		 * *   x962
		 * *   der
		 * @param {{[fieldName: string]: string}} additionalInput.signature Required for the Asymmetric Decryption operation with EC-IES, optional for all others. The signature of the ciphertext to validate using the signature verification process of the integrated scheme.
		 * 
		 * Available from the Asymmetric Encryption operation when the output type is set to payload.
		 *
		 * @returns {void} 
		 */
		withAdditionalInput(additionalInput: {[fieldName: string]: string}): void
		
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
		 * Default: Value determined by the operation specified when the KMFCryptoOperation object was instantiated. For more information, see [KMFCryptoOperation - KMFCryptoOperation(String cryptoModuleName, String operationName)](dev.do#!/reference/api/rome/server/sn_kmf_ns-namespace/KMFCryptoOperationBothAPI#KMFCO-KMFCryptoOperation_S_S "Creates a KMFCryptoOperation object for the specified module and operation.").
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
		 * Default if this method is not called: Value determined by the operation specified when the KMFCryptoOperation object was instantiated. For more information, see [KMFCryptoOperation - KMFCryptoOperation(String cryptoModuleName, String operationName)](dev.do#!/reference/api/rome/server/sn_kmf_ns-namespace/KMFCryptoOperationBothAPI#KMFCO-KMFCryptoOperation_S_S "Creates a KMFCryptoOperation object for the specified module and operation.").
		 *
		 * @returns {void} 
		 */
		withOutputFormat(outputFormat: string): void
		
		/**
		 *
		 * Sets the data type for the output data returned after the cryptographic operation is performed.
		 *
		 * Note: When you instantiate the KMFCryptoOperation object for MAC_VERIFICATION or SIGNATURE_VERIFICATION operations, you must also call this method, passing boolean, to set the correct output type or an exception is thrown when you execute the operation.
		 *
		 * @param {string} outputType Type of output data.
		 * 
		 * Not all output types are applicable to all operations. For an unsupported type, an exception is thrown.
		 * 
		 * Valid values (not case-sensitive):
		 * 
		 * *   String: Not valid for MAC_VERIFICATION or SIGNATURE_VERIFICATION operations.
		 * *   Boolean: Only valid for MAC_VERIFICATION or SIGNATURE_VERIFICATION operations.
		 * *   Payload: Only valid for the ASYMMETRIC_ENCRYPTION operation. Use this output type for EC-IES.
		 * 
		 * Note: When specifying an output of Payload, the output of the doOperation() method is a KMFEncryptionPayload object. For more information on the structure of this object, see [withAdditionalInput()](dev.do#!/reference/api/rome/server/sn_kmf_ns-namespace/KMFCryptoOperationBothAPI#KMFCO-withAddInput_S).
		 * 
		 * Default: Value determined by the operation, specified when the KMFCryptoOperation object was instantiated. For more information, see [KMFCryptoOperation - KMFCryptoOperation(String cryptoModuleName, String operationName)](dev.do#!/reference/api/rome/server/sn_kmf_ns-namespace/KMFCryptoOperationBothAPI#KMFCO-KMFCryptoOperation_S_S "Creates a KMFCryptoOperation object for the specified module and operation.").
		 *
		 * @returns {void} 
		 */
		withOutputType(outputType: string): void
		
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