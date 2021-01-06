//SCOPED GlideSoft Definition File. In combination with JSConfig.json I provide you intellisense for ServiceNow APIs.



declare namespace sn_sc {

    /**
     * CartJS API enables you to access the shopping cart for a user. To use this class in a scoped application, use the sn_sc namespace identifier. The Service Catalog Scoped API plugin (ID: com.glideapp.servicecatalog.scoped.api) that is enabled by default is required to access the CartJS API. 
     * 
     * 
     */
    declare class CartJS {



        /**
         * Creates an instance of the CartJS class with the name of a defined cart for the user who is currently logged in.
         * 
         * @cartName Name of a defined cart for the user who is currently logged in.
         * @example
         * var cart = new sn_sc.CartJS(cart1);
         */
        constructor(cartName: String);

        /**
         * Creates an instance of the CartJS class for the default cart of the user who is currently logged in.
         * 
         * @example
         * var cart = new sn_sc.CartJS();
         */
        constructor();

        /**
         * Adds the request for a catalog item to the current cart.
         * 
         * @request A JSON object that contains the details of the catalog item to be added to the cart.The structure of the request object is:
         * {
         * 'sysparm_id': item_id,
         * 'sysparm_quantity': item_quantity,
         * 'variables':{
         * 'var_name': 'var_value',
         * ...
         * }
         * } item_id: sys_id of the item to be added to the cart item_quantity: Number of items to be added. Default value is 1. var_name: Name of the question. var_value: Value of the answer (Not the display value). 
         * @example
         * 
         * var cart = new sn_sc.CartJS();
         * var item =
         * {
         * 'sysparm_id': '0d08837237153000158bbfc8bcbe5d02',
         * 'sysparm_quantity': '1',
         * 'variables':{
         * 'carrier': 'at_and_t_mobility',
         * 'data_plan': '500MB',
         * 'duration': 'eighteen_months',
         * 'color': 'slate',
         * 'storage': 'sixtyfour' 
         * }};
         * var cartDetails = cart.addToCart(item);
         * gs.info(cartDetails);
         * @returns Structure of the current cart.{
         * 'subtotal': value,
         * 'items':[
         * {
         * itemName:'',
         * quantity:'', price:'', recurring_price:''
         * } ...]
         * }
         */
        addToCart(request: Object): JSONString;

        /**
         * Specifies if the current user has the required role to edit the Request for field.
         * 
         * @example
         * var cart=new sn_sc.CartJS();
         * console.log(cart.canViewRF());
         * @returns Flag that indicates whether the user has the required role to edit the requested for field.Valid values: true: user has the required role false: user does not have the required role 
         */
        canViewRF(): Boolean;

        /**
         * Performs the cart checkout. If the two-step checkout is enabled, returns the order summary. If the two-step checkout is disabled, the cart is submitted and details of the generated request are returned.
         * 
         * @example
         * var cart = new sn_sc.CartJS();
         * var checkoutInfo = cart.checkoutCart();
         * gs.info(checkoutInfo);
         * 
         * @returns If the two-step checkout is enabled, the summary of the items in the cart is returned.{ "subtotal_price":"", "subtotal_recurring_frequency":"", "delivery_address":"", "special_instructions":"", "total_title":"", "requested_for_user":"System Administrator", "requested_for":"6816f79cc0a8016401c5a33be04be441", “daily”: ["frequency_subtotal":"", "items":[{}, {}, ...], …], “monthly”:["frequency_subtotal":"", "items":[{}, {}, ...], …], “annually”:["frequency_subtotal":"", "items":[{}, {}, ...], …], "none":["frequency_subtotal":"", "items":[{}, {}, ...], …],
         * }
         * If the two-step checkout is disabled:{ 'request_id' : "sys_id of the generated request", "request_number" : "Number of the generated request"
         * }
         * 
         */
        checkoutCart(): JSONString;

        /**
         * Deletes the current cart.
         * 
         * @example
         * var cart = new sn_sc.CartJS();
         *       cart.empty();
         */
        empty();

        /**
         * Returns the cart details.
         * 
         * @example
         * var cart=new sn_sc.CartJS();
         * 	console.log (cart.getCartDetails());
         * @returns Object pointing to the current cart details.
         */
        getCartDetails(): Object;

        /**
         * Returns the cart id of the current cart.
         * 
         * @example
         * 
         *       var cart = new sn_sc.CartJS();
         *       cart.getCartID(); 
         *       gs.info(cartId);
         * 
         * @returns sys_id for the current cart.
         */
        getCartID(): String;

        /**
         * Returns the GlideRecord for the cart item (sc_cart_item) in the current cart.
         * 
         * @example
         * 
         *       var cart = new sn_sc.CartJS();
         *       cart.getCartItems(); 
         *       gs.info(CartItems)
         * 
         * @returns GlideRecord pointing to cart items in the current cart.
         */
        getCartItems(): GlideRecord;

        /**
         * Gets the delivery address for the current cart.
         * 
         * @example
         * 
         *       var cart = new sn_sc.CartJS();
         *       cart.setDeliveryAddress("Brasilia, Brasil");
         *       cart.getDeliveryAddress(); 
         *       gs.info(DeliveryAddress);
         * 
         * @returns Delivery address for the current cart.
         */
        getDeliveryAddress(): String;

        /**
         * Gets the sys_id from the sys_user record of the user for whom the cart is requested.
         * 
         * @example
         * 
         * var cart = new sn_sc.CartJS();
         * cart.setRequestedFor("039c516237b1300054b6a3549dbe5dfc")
         * cart.getRequestedFor(); 
         * gs.info(cartId);
         * 
         * @returns sys_id from the sys_user record of the user for whom the cart is requested.
         */
        getRequestedFor(): String;

        /**
         * Gets the name from the user record of the user for whom the current cart is requested.
         * 
         * @example
         * 
         *       var cart = new sn_sc.CartJS();
         *       cart.getRequestedForDisplayName(); 
         *       gs.info(DisplayName);
         * 
         * @returns Name from the user record of the user for whom the current cart is requested.
         */
        getRequestedForDisplayName(): String;

        /**
         * Gets the special instructions for the current cart.
         * 
         * @example
         * 
         *       var cart = new sn_sc.CartJS();
         *       cart.setSpecialInstructions("Delivery before 8 AM.");
         *       cart.getSpecialInstructions(); 
         *       gs.info(SpecialInstructions);
         * 
         * @returns Special instructions for the current cart.
         */
        getSpecialInstructions(): String;

        /**
         * Orders a single item. If two-step checkout is enabled, the method adds the specified item to the cart and returns the sys_id of the cart. If two-step checkout is disabled, the method completes the purchase of the specified item and returns the sys_id of the generated request.
         * 
         * @request JSON object that contains details of the catalog item to order.
         * @requestdelivery_address Address to which to deliver the items.Default: Address of user
         * @requestsysparm_id Required. The sys_id of the item to purchase.
         * @requestspecial_instructions Instructions to follow when processing the order.
         * @requestsysparm_quantity Quantity of the specified item to purchase.Default: 1
         * @requestsysparm_requested_for The sys_id of the user for whom the item is requested.Default: Session user
         * @requestvariables Questions and customer answers associated with the item.
         * @requestvariablesvar_name Name of the question.
         * @requestvariablesvar_value Customer's response to the associated question.
         * @example
         * 
         * var cart = new sn_sc.CartJS();
         * var request =
         * {
         *   'sysparm_id': '0d08837237153000158bbfc8bcbe5d02',
         *   'sysparm_quantity': '1',
         *   'variables':{
         *     'carrier': 'at_and_t_mobility',
         *     'data_plan': '500MB',
         *     'duration': 'eighteen_months',
         *     'color': 'slate',
         *     'storage': 'sixtyfour'
         *   }
         * }
         * var cartDetails = cart.orderNow(request);
         * gs.info(cartDetails);
         * @returns Output if two-step checkout is enabled:{ 'cart_id' : '&lt;sys_id of the cart to which the items were added&gt;'
         * }
         * Output if two-step checkout is disabled:
         * { 'request_id' : '&lt;sys_id of the generated request&gt;', 'request_number' : '&lt;Number of the generated request&gt;'
         * }
         */
        orderNow(request: Object, requestdelivery_address: String, requestsysparm_id: String, requestspecial_instructions: String, requestsysparm_quantity: Number, requestsysparm_requested_for: String, requestvariables: Array<any>, requestvariablesvar_name: String, requestvariablesvar_value: String): JSONkey/valuepairs;

        /**
         * Sets the delivery address for the current cart.
         * 
         * @address Delivery address for the current cart.
         * @example
         * 
         *       var cart = new sn_sc.CartJS();
         *       cart.setDeliveryAddress("Brasilia, Brasil"); 
         *       
         */
        setDeliveryAddress(address: String);

        /**
         * Sets the sys_id in the sys_user record of the user for whom the cart is requested.
         * 
         * @user sys_id to be set in the sys_user record of the user for whom the cart is requested.
         * @example
         * 
         * var cart = new sn_sc.CartJS();
         * cart.setRequestedFor("039c516237b1300054b6a3549dbe5dfc")
         * 
         */
        setRequestedFor(user: String);

        /**
         * Sets the special instructions for the current cart.
         * 
         * @specialInstructions Special instructions for the current cart.
         * @example
         * 
         *       var cart = new sn_sc.CartJS();
         *       cart.setSpecialInstructions("Delivery before 8 AM."); 
         *    
         */
        setSpecialInstructions(specialInstructions: String);

        /**
         * Updates special instructions, requested for, and delivery address from the request parameter and performs the cart checkout. Use this API to modify the mentioned parameters of the cart and perform the cart checkout simultaneously. Missing parameters in the request object will have their default value.
         * 
         * @request A JSON object that contains details of the cart to be submitted.The structure of the request object is:
         * { 'special_instructions' : 'instructions', 'sysparm_requested_for' : requested_for, 'delivery_address' : 'address'
         * } instructions: Special instructions for the request. requested_for : sys_id of the requested_for user. address: Delivery address for the request. 
         * @example
         * var cart = new sn_sc.CartJS();
         * var request =
         * {
         *   'special_instructions' : 'Delivery only in working hours',
         *   'requested_for' : '62826bf03710200044e0bfc8bcbe5df1',
         *   'delivery_address' : "Brasilia, Brasil",
         * };
         * var requestDetails = cart.submitOrder(request);
         * gs.info(requestDetails);
         * @returns Structure of the cart.{ 'request_id' : 'sys_id of the generated Request', 'request_number' : 'Number of the generated Request'
         * }
         */
        submitOrder(request: Object): JSONString;

        /**
         * Updates an item in the cart.
         * 
         * @request A JSON object that contains details of the catalog item to be updated.The structure of the request object is:
         * { 'sysparm_quantity' : item_quantity, 'sysparm_requested_for' : requested_for, 'variables' : { 'var_name' : 'var_value', ... }
         * } item_quantity: Number of items to be added. Default value is 1. var_name: Name of the question. var_value: Value of the answer (Not the display value). 
         * @cart_item_id sys_id of the cart item to be modified.
         * @example
         * var cart = new sn_sc.CartJS();
         * var request =
         * {
         *   'sysparm_quantity': '1',
         *   'variables':{
         *     'carrier': 'at_and_t_mobility',
         *     'data_plan': '500MB',
         *     'duration': 'eighteen_months',
         *     'color': 'slate',
         *     'storage': 'sixtyfour'
         *   }
         * };
         * var cart_item_id = "4d69b672c322320076173b0ac3d3ae79";
         * var cartDetails = cart.updateItem(request, cart_item_id);
         * gs.info(cartDetails);
         * 
         * @returns Details of the cart.{ 'subtotal': value, 'items':[ { itemName:'', quantity:'', price:'', recurring_price:'' } ...], ...
         * }
         */
        updateItem(request: Object, cart_item_id: String): JSONString;

    }

}
declare namespace sn_sc {

    /**
     * CatalogClientScript API enables you to create, modify, or delete catalog client script records. To use this class in a scoped application, use the sn_sc namespace identifier. The Service Catalog Scoped API plugin (ID: com.glideapp.servicecatalog.scoped.api) that is enabled by default is required to access the CatalogClientScript API. 
     * 
     * 
     */
    declare class CatalogClientScript {



        /**
         * Creates an instance of the CatalogClientScript class.
         * 
         * @example
         * var catalogClientScript = new sn_sc.CatalogClientScript();
         */
        constructor();

        /**
         * Adds a script to the catalog client script.
         * 
         * @script Script to be added to the catalog client script.
         * @example
         * var catalogClientScript = new sn_sc.CatalogClientScript();
         * catalogClientScript.addScript("function onLoad(){Enter the script}");
         */
        addScript(script: String);

        /**
         * Specifies if the catalog client script runs on a catalog item.
         * 
         * @flag If true, the catalog client script runs on the catalog item. If false, the catalog client script does not run on the catalog item.
         * @example
         * var catalogClientScript = new sn_sc.CatalogClientScript();
         * catalogClientScript.appliesToCatalogItem(true);
         */
        appliesToCatalogItem(flag: Boolean);

        /**
         * Specifies if the catalog client script runs on a catalog task.
         * 
         * @flag If true, the catalog client script runs on the catalog task. If false, the catalog client script does not run on the catalog task.
         * @example
         * var catalogClientScript = new sn_sc.CatalogClientScript();
         * catalogClientScript.appliesToCatalogTask(true);
         */
        appliesToCatalogTask(flag: Boolean);

        /**
         * Specifies if the catalog client script runs on a requested item.
         * 
         * @flag If true, the catalog client script runs on the requested item. If false, the catalog client script does not run on the requested item.
         * @example
         * var catalogClientScript = new sn_sc.CatalogClientScript();
         * catalogClientScript.appliesToRequestedItem(true);
         */
        appliesToRequestedItem(flag: Boolean);

        /**
         * Specifies if the catalog client script runs on a requested item.
         * 
         * @flag If true, the catalog client script runs on the target record. If false, the catalog client script does not run on the target record.
         * @example
         * var catalogClientScript = new sn_sc.CatalogClientScript();
         * catalogClientScript.appliesToTargetRecord(true);
         */
        appliesToTargetRecord(flag: Boolean);

        /**
         * Inserts the defined catalog client script in the catalog_script_client table.
         * 
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @example
         * 
         *         var catalogClientScript = new sn_sc.CatalogClientScript();
         *         catalogClientScript.setAttributes({"name": "My Catalog Item", "applies_to": "item", "ui_type": "desktop", "type": "onLoad"});
         *         catalogClientScript.appliesToCatalogItem(true);
         *         catalogClientScript.appliesToRequestedItem(true);
         *         catalogClientScript.appliesToCatalogTask(true);
         *         catalogClientScript.appliesToTargetRecord(true);
         *         var catalogClientScriptId = catalogClientScript.create();
         *         gs.info(catalogClientScriptId);
         *       
         *       
         *       
         *       
         * @returns sys_id of the catalog client script.
         */
        create(standardUpdate: Boolean): String;

        /**
         * Deletes the defined catalog client script.
         * 
         * @sys_id sys_id of the catalog client script.
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @example
         * 
         *         var sys_id = "039c516237b1300054b6a3549dbe5dfc"; 
         *         var catalogClientScript = new sn_sc.CatalogClientScript();
         *         catalogClientScript.deleteRecord("039c516237b1300054b6a3549dbe5dfc");
         */
        deleteRecord(sys_id: String, standardUpdate: Boolean);

        /**
         * Defines attribute values for the catalog client script.
         * 
         * @attributes A JSON object that has mapping for the field and value pairs.
         * @example
         * var catalogClientScript = new sn_sc.CatalogClientScript();
         * catalogClientScript.setAttributes({"name": "My Catalog Item", "applies_to": "catalog_item", "ui_type": "desktop", "type": "onLoad"});
         */
        setAttributes(attributes: Object);

        /**
         * Associates a catalog item with the catalog client script.
         * 
         * @sys_id sys_id of the catalog item.
         * @example
         * var catalogClientScript = new sn_sc.CatalogClientScript();
         * catalogClientScript.setCatalogItem("039c516237b1300054b6a3549dbe5dfc");
         */
        setCatalogItem(sys_id: String);

        /**
         * Runs the catalog client script when a variable value is updated.
         * 
         * @sys_id sys_id of the variable.
         * @example
         * var catalogClientScript = new sn_sc.CatalogClientScript();
         * catalogClientScript.setOnChangeVariable("039c516237b1300054b6a3549dbe5dfc");
         */
        setOnChangeVariable(sys_id: String);

        /**
         * Associates a variable set with the catalog client script.
         * 
         * @sys_id sys_id of the variable set.
         * @example
         * var catalogClientScript = new sn_sc.CatalogClientScript();
         * catalogClientScript.setVariableSet("039c516237b1300054b6a3549dbe5dfc");
         */
        setVariableSet(sys_id: String);

    }

}
declare namespace sn_sc {

    /**
     * CatalogItemVariable API enables you to create and modify service catalog item variables using scripts. 
     * 
     * 
     */
    declare class CatalogItemVariable {



        /**
         * Insert the defined catalog item variable.
         * 
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @returns Return the sys_id of the inserted variable record.
         */
        create(standardUpdate: Boolean): String;

        /**
         * Delete the defined catalog item variable.
         * 
         * @standardUpdate Set to true to enable the running of engines and workflow.
         */
        deleteRecord(standardUpdate: Boolean);

        /**
         * Get a mapping of catalog item variable attribute values.
         * 
         * @columns Specify the set of columns that you would like the values for.
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @returns An object mapping column names to values.
         */
        read(columns: Object, standardUpdate: Boolean): Object;

        /**
         * Define attribute values for this catalog item variable.
         * 
         * @attributes An object mapping column names to values.
         */
        setAttributes(attributes: Object);

        /**
         * Use to update current catalog item variable with set values.
         * 
         * @columnValues An object mapping column names to values.
         * @standardUpdate Set to true to enable the running of engines and workflow.
         */
        update(columnValues: Object, standardUpdate: Boolean);

    }

}/**
 * CatalogItemVariableSet API enables you to create and modify service catalog item variable sets using scripts. 
 * 
 * 
 */
declare class CatalogItemVariableSet {



    /**
     * Insert the defined catalog item variable set.
     * 
     * @standardUpdate Set to true to enable the running of engines and workflow.
     * @returns Return the sys_id of the inserted variable record.
     */
    create(standardUpdate: Boolean): String;

    /**
     * Delete the defined catalog item variable.
     * 
     * @standardUpdate Set to true to enable the running of engines and workflow.
     */
    deleteRecord(standardUpdate: Boolean);

    /**
     * Get a mapping of catalog item variable set attribute values.
     * 
     * @columns Specify the set of columns that you would like the values for.
     * @standardUpdate Set to true to enable the running of engines and workflow.
     * @returns An object mapping column names to values.
     */
    read(columns: Object, standardUpdate: Boolean): Object;

    /**
     * Define attribute values for this catalog item variable set.
     * 
     * @attributes An object mapping column names to values.
     */
    setAttributes(attributes: Object);

    /**
     * Use to update current catalog item variable set with set values.
     * 
     * @columnValues An object mapping column names to values.
     * @standardUpdate Set to true to enable the running of engines and workflow.
     */
    update(columnValues: Object, standardUpdate: Boolean);

}


declare namespace sn_sc {

    /**
     * CatalogItemVariableSetM2M API enables you to create and modify service catalog item variable set many-to-many (M2Ms) using scripts. 
     * 
     * 
     */
    declare class CatalogItemVariableSetM2M {



        /**
         * Insert the defined catalog item variable set M2M.
         * 
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @returns Return the sys_id of the inserted variable record.
         */
        create(standardUpdate: Boolean): String;

        /**
         * Delete the defined catalog item variable set M2M.
         * 
         * @standardUpdate Set to true to enable the running of engines and workflow.
         */
        deleteRecord(standardUpdate: Boolean);

        /**
         * Get a mapping of catalog item variable set M2M attribute values.
         * 
         * @columns Specify the set of columns that you would like the values for.
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @returns An object mapping column names to values.
         */
        read(columns: Object, standardUpdate: Boolean): Object;

        /**
         * Define attribute values for this catalog item variable set M2M.
         * 
         * @attributes An object mapping column names to values.
         */
        setAttributes(attributes: Object);

        /**
         * Updates current catalog item variable set M2M with set values.Consistency across all API ref topics is critical. Follow the template exactly or the importer script will fail.
         * 
         * @columnValues An object mapping column names to values.
         * @standardUpdate Set to true to enable the running of engines and workflow.
         */
        update(columnValues: Object, standardUpdate: Boolean);

    }

}
declare namespace sn_sc {

    /**
     * CatalogJS API enables you to use methods to check and retrieve catalog-specific properties. To use this class in a scoped application, use the sn_sc namespace identifier. The Service Catalog Scoped API plugin (com.glideapp.servicecatalog.scoped.api) that is enabled by default is required to access the CatalogJS API. 
     * 
     * 
     */
    declare class CatalogJS {



        /**
         * Creates an instance of the Catalog class with the specified sys_id.
         * 
         * @sys_id sys_id of the Catalog.
         * @example
         * new sn_sc.Catalog(catalog_sys_id);
         * var Catalog = new sn_sc.Catalog("31bea3d53790200044e0bfc8bcbe5dec");
         * 
         * 
         */
        constructor(sys_id: String);

        /**
         * Creates an instance of the catalog class for the specified glide record object.
         * 
         * @gr Glide Record pointing to the sc_catalog table.
         * @example
         * var gr = new GlideRecord('sc_catalog');
         *  gr.addQuery('sys_id','e0d08b13c3330100c8b837659bba8fb4');
         * gr.query();
         * var Catalog = new sn_sc.Catalog(gr);
         */
        constructor(gr: Object);

        /**
         * Specifies if the catalog is viewable for the user.
         * 
         * @mobile True if the view is mobile view. Else, false.
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");;	
         * 	         console.log (catalog.canView(true));
         * @returns Returns true if the catalog is viewable for the user.
         */
        canView(mobile: Boolean): Boolean;

        /**
         * If only one active catalog exists, that catalog is returned. Else, the earliest catalog created is returned, from the list of the catalogs that the user can view. If no catalog is available, null is returned.
         * 
         * @example
         * var catalog = sn_sc.Catalog. getAvailableCatalog()
         * @returns Object pointing to the earliest catalog that the user can view.
         */
        getAvailableCatalog(): Object;

        /**
         * Returns the catalog background color.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");
         * console.log(catalog.getBackgroundColor());
         * @returns Background color of the catalog.
         */
        getBackgroundColor(): String;

        /**
         * Specifies the number of catalogs active in the catalog table.
         * 
         * @example
         * console.log (sn_sc.Catalog.getCatalogCount());
         * @returns Number of catalogs available in the catalog table.
         */
        getCatalogCount(): Integer;

        /**
         * Returns the categories for the specified catalog.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");	
         * 	         console.log(catalog.getCategories());
         * @returns Returns the categories for the specified catalog.
         */
        getCategories(): ArrayList;

        /**
         * Specifies the sys_ids of the categories in the specified catalog.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");
         * 	console.log(catalog.getCategoryIds());
         * @returns Returns the sys_ids of the categories in the specified catalog.
         */
        getCategoryIds(): ArrayList;

        /**
         * Specifies the catalog description.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");
         * 	console.log(catalog.getDescription());
         * @returns Catalog description.
         */
        getDescription(): String;

        /**
         * Returns the catalog desktop image value.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");
         * 	console.log(catalog.getDesktopImageSRC());
         * @returns Catalog desktop image value.
         */
        getDesktopImageSRC(): String;

        /**
         * Returns the catalog gliderecord.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");	
         * 	data.history=catalog.getGr();
         * @returns GlideRecord of the catalog.
         */
        getGr(): GlideRecord;

        /**
         * Returns the catalog header icon.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");
         * console.log(catalog.getHeaderIconSRC());
         * @returns Catalog header icon.
         */
        getHeaderIconSRC(): String;

        /**
         * Specifies the sys_id of the catalog.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");
         * 	console.log(catalog.getId());
         * @returns sys_id of the catalog.
         */
        getID(): String;

        /**
         * Returns the title of the catalog.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");
         * 	console.log(catalog.getTitle());
         * @returns Title of the catalog
         */
        getTitle(): String;

        /**
         * Specifies if the catalog has categories.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");
         * 	console.log(catalog.hasCategories());
         * @returns Returns true if the catalog has categories. Else returns false.
         */
        hasCategories(): Boolean;

        /**
         * Specifies if the catalog has catalog items.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");
         * 	console.log(catalog.hasItems());
         * 
         * @returns Returns true if the catalog has catalog items. Else returns false.
         */
        hasItems(): Boolean;

        /**
         * Specifies if the wish list is enabled for a catalog.
         * 
         * @example
         * var catalog=new sn_sc.Catalog("e0d08b13c3330100c8b837659bba8fb4");	
         * 	console.log(catalog.isWishlistEnabled());
         * 
         * @returns Returns true if wish list is enabled for a catalog. Else returns false.
         */
        isWishlistEnabled(): Boolean;

    }

}
declare namespace sn_sc {

    /**
     * CatalogSearch API enables you to search catalog item. To use this class in a scoped application, use the sn_sc namespace identifier. The Service Catalog Scoped API plugin (ID: com.glideapp.servicecatalog.scoped.api) that is enabled by default is required to access the CatalogSearch API. 
     * 
     * 
     */
    declare class CatalogSearch {



        /**
         * Creates an instance of the CatalogSearch class.
         * 
         * @example
         * var gr = new sn_sc.CatalogSearch();
         */
        constructor();

        /**
         * Searches a catalog item based on a search term. The search can be narrowed down to a catalog category level.
         * 
         * @catalogID Identifier of the catalog that is searched.
         * @categoryID Identifier of the catalog category that is searched.
         * @term Search term.
         * @mobile If true, only catalog items exposed for mobile are searched.
         * @depthSearch If true, subcategories are also searched.
         * @example
         * 
         * var gr = new sn_sc.CatalogSearch().search('', '', 'Apple', false, true);
         * gr.query()
         * while(var gr = new sn_sc.CatalogSearch().search('', '', 'Apple', false, true);
         * gr.query()
         * while(gr.next()) {
         * gs.log(gr.name)
         * })
         * @returns Returns the GlideRecord on sc_cat_item matching the search result.
         */
        search (catalogID: String, categoryID: String, term: String, mobile: Boolean, depthSearch: Boolean): GlideRecord;

    }

}
declare namespace sn_sc {

    /**
     * CatCategory API enables you to create and modify service catalog categories using scripts. 
     * 
     * 
     */
    declare class CatCategory {



        /**
         * Adds the Available For user criteria to a catalog category.
         * 
         * @action Specify add to add the user criteria to the Available For list. Specify delete to delete the user criteria from the Available For list.
         * @criteriaIDs Array of the user criteria sys_ids.
         * @example
         * 
         * var item = new sn_sc.CatCategory("31bea3d53790200044e0bfc8bcbe5dec");
         * item. availableForUserCriteria("add", ["0c441abbc6112275000025157c651c89"]);
         * 
         */
        availableForUserCriteria(action: String, criteriaIDs: Array<any>);

        /**
         * Determines whether a specified user can view a specified category on a mobile device or desktop.
         * 
         * @isMobile Flag that indicates whether to verify the user for access on a mobile device or desktop. true: validate for mobile. false: validate for desktop. 
         * @userSysId Unique identifier of the user to validate.
         * @example
         * var scopedCategoryObj = new sn_sc.CatCategory('7b1262b9530033007444ddeeff7b12ae');
         * scopedCategoryObj.canView(false, '62826bf03710200044e0bfc8bcbe5df1');
         * @returns Flag that indicates whether the user can view the associated category. true: user can view the category. false: user cannot view the category. 
         */
        canView(isMobile: Boolean, userSysId: String): Boolean;

        /**
         * Insert the defined category.
         * 
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @example
         * var categoryCreate = new sn_sc.CatCategory();
         * categoryCreate.setAttributes({"title" : "test a scoped category", "sc_catalog" : "e0d08b13c3330100c8b837659bba8fb4"});
         * var categorySysId = categoryCreate.create();
         * var isValidSysId = categorySysId.match(/^[0-9a-fA-F]{32}$/) == null ? false : true;
         * global.Assert.assertEquals(true, isValidSysId,"CategorySysId: ["+ categorySysId +"] is not valid", true, isValidSysId);
         * @returns Return the sys_id of the inserted variable record.
         */
        create(standardUpdate: Boolean): String;

        /**
         * Deletes the category record on which the CatCategory class was initially instantiated.
         * 
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @example
         * var categoryDelete = new sn_sc.CatCategory(categorySysId);
         * categoryDelete.deleteRecord();
         * var category = new sn_sc.CatCategory(categorySysId);
         * values = category.read({"title" : "", "sc_catalog":""}, false);
         * global.Assert.assertEquals("", values.title,"Category should title");
         */
        deleteRecord(standardUpdate: Boolean);

        /**
         * Returns the sys_id of the category.
         * 
         * @example
         * var cart = new sn_sc.CatCategory("2809952237b1300054b6a3549dbe5dd4");
         * var categoryID = cart.getID();
         * gs.info(categoryID);
         * @returns sys_id of the category.
         */
        getID(): String;

        /**
         * Adds the Not Available For user criteria to a catalog category.
         * 
         * @action Specify add to add the user criteria to the Not Available For list. Specify delete to delete the user criteria from the Not Available For list.
         * @example
         * 
         * var item = new sn_sc.CatCategory("31bea3d53790200044e0bfc8bcbe5dec");
         * item. notAvailableForUserCriteria("add", ["0c441abbc6112275000025157c651c89"]);
         * 
         */
        notAvailableForUserCriteria(action: String);

        /**
         * Get a mapping of the category.
         * 
         * @columns Specify the set of columns that you would like the values for.
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @example
         * var category = new sn_sc.CatCategory("a96277509f300200b407b89a442e704e");
         * var values = category.read({"title" : ""}, true);
         * gs.log(values.title);
         * @returns An object mapping column names to values.
         */
        read(columns: Object, standardUpdate: Boolean): Object;

        /**
         * Define attribute values for this category.
         * 
         * @attributes Set the attributes for new field and value pairs.
         * @example
         * var categoryCreate = new sn_sc.CatCategory();
         * categoryCreate.setAttributes({"title" : "test a scoped category", "sc_catalog" : "e0d08b13c3330100c8b837659bba8fb4"});
         * var categorySysId = categoryCreate.create();
         * var isValidSysId = categorySysId.match(/^[0-9a-fA-F]{32}$/) == null ? false : true;
         * global.Assert.assertEquals(true, isValidSysId,"CategorySysId: ["+ categorySysId +"] is not valid", true, isValidSysId);
         */
        setAttributes(attributes: Object);

        /**
         * Define the table name for this category.
         * 
         * @tableName Specify the name of the table that extends sc_category.
         * @example
         * var categoryRead = new sn_sc.CatCategory(categorySysId);
         * categoryRead.setTableName("test_category");
         * var values = categoryRead.read({"title" : "", "sc_catalog":"", "test": ""}, false);
         * gs.info(categorySysId);
         * gs.info(values.title);
         * gs.info(values.test);
         * global.Assert.assertEquals("testValue", values.test,"Category extends sc_category and stores its extended value");
         */
        setTableName(tableName: String);

        /**
         * Use to update current category.
         * 
         * @columnValues Object mapping column names to values.
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @example
         * var categoryUpdate = new sn_sc.CatCategory(categorySysId);
         * categoryUpdate.update({"title" : "test changed scoped category"}, true);
         * values = categoryUpdate.read({"title" : "", "sc_catalog":""}, false);
         * global.Assert.assertEquals("test changed scoped category", values.title,"Category should title");
         */
        update(columnValues: Object, standardUpdate: Boolean);

    }

}
declare namespace sn_sc {

    /**
     * CatItem API enables you to create and modify service catalog items using scripts. 
     * 
     * 
     */
    declare class CatItem {



        /**
         * Adds the Available For user criteria to a catalog item.
         * 
         * @action Specify add to add the user criteria to the Available For list. Specify delete to delete the user criteria from the Available For list.
         * @criteriaIDs Array of the user criteria sys_ids.
         * @example
         * 
         * var item = new sn_sc.CatItem("31bea3d53790200044e0bfc8bcbe5dec");
         * item. availableForUserCriteria("add", ["0c441abbc6112275000025157c651c89"]);
         * 
         */
        availableForUserCriteria(action: string, criteriaIDs: Array<any>);

        /**
         * Verifies whether the current catalog item is viewable in the selected domain (domain selected in the domain picker).Catalog items in the global domain are available across all domains.
         * 
         * @example
         * var catItem = new sn_sc.CatItem("060f3afa3731300054b6a3549dbe5d3e");
         * gs.info(catItem.canViewInDomain());
         * @returns Flag that validates whether the current catalog item is viewable in the selected domain.Valid values: true: catalog item is viewable in the domain false: catalog item is not viewable in the domain 
         */
        canViewInDomain(): Boolean;

        /**
         * Specifies if the user has access to view the catalog item on global search.
         * 
         * @isMobile True if the search is in mobile view. Else, false.
         * @example
         * var cart=new sn_sc.CatItem("04b7e94b4f7b4200086eeed18110c7fd");	
         * 	data.history=cart.canViewOnSearch('false');
         * @returns Returns true if the user has access to view the catalog item on global search. Else, returns false.
         */
        canViewOnSearch(isMobile: Boolean): Boolean;

        /**
         * Insert the defined catalog item.
         * 
         * @standardUpdate Set to true to enable the running of engines and workflow.
         */
        create(standardUpdate: Boolean);

        /**
         * Delete the defined catalog item.
         * 
         * @standardUpdate Set to true to enable the running of engines and workflow.
         */
        deleteRecord(standardUpdate: Boolean);

        /**
         * Specifies the first category that the user can view in a catalog.
         * 
         * @catalogId sys_id of the catalog.
         * @example
         * var CatItem=new sn_sc.CatItem("04b7e94b4f7b4200086eeed18110c7fd");	
         * 	console.log(CatItem.getFirstAccessibleCategoryForSearch("e0d08b13c3330100c8b837659bba8fb4”));
         * @returns sys_id of the first category that the user can view in a catalog.
         */
        getFirstAccessibleCategoryForSearch(catalogId: String): String;

        /**
         * Returns the class name for the current catalog item record.
         * 
         * @example
         * var CatItem=new sn_sc.CatItem("04b7e94b4f7b4200086eeed18110c7fd");	
         * 	console.log(CatItem.getRecordClass());
         * @returns Class name for the current catalog item record.
         */
        getRecordClass(): String;

        /**
         * Specifies if the catalog item is available in service portal.
         * 
         * @example
         * var CatItem=new sn_sc.CatItem("04b7e94b4f7b4200086eeed18110c7fd");	
         * 	data.history=CatItem.isVisibleServicePortal();
         * @returns Returns true if the catalog item is available in service portal. Else, returns false.
         */
        isVisibleServicePortal(): Boolean;

        /**
         * Adds the Not Available For user criteria to a catalog item.
         * 
         * @action Specify add to add the user criteria to the Not Available For list. Specify delete to delete the user criteria from the Not Available For list.
         * @example
         * 
         * var item = new sn_sc.CatItem("31bea3d53790200044e0bfc8bcbe5dec");
         * item. notAvailableForUserCriteria("add", ["0c441abbc6112275000025157c651c89"]);
         * 
         */
        notAvailableForUserCriteria(action: String);

        /**
         * Get a mapping of catalog item attribute values.
         * 
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @columns Specify the set of columns that you would like the values for.
         * @returns An object mapping column names to values.
         */
        read(standardUpdate: Boolean, columns: Object): Object;

        /**
         * Define attribute values for this catalog item.
         * 
         * @attributes An object mapping column names to values.
         */
        setAttributes(attributes: Object);

        /**
         * Define the catalogs that this catalog item is associated with.
         * 
         * @catalogs Specify comma-separated list of catalogs that you would like the item to be associated with.
         */
        setCatalogs(catalogs: String);

        /**
         * Define the categories that this catalog item is associated with.
         * 
         * @categories Specify comma-separated list of categories that you would like the item to be associated with.
         */
        setCategories(categories: String);

        /**
         * Set the image of a catalog item to a database image record.
         * 
         * @dbImageSysId sys_id of an attachment referencing the db_image.
         * @type Type can be picture or an icon.
         */
        setImage(dbImageSysId: String, type: String);

        /**
         * Define the table name for this catalog item.
         * 
         * @tableName Specify the name of the table that extends sc_cat_item.
         */
        setTableName(tableName: String);

        /**
         * Use to update current catalog item with set values.
         * 
         * @columnValues An object mapping column names to values.
         * @standardUpdate Set to true to enable the running of engines and workflow.
         */
        update(columnValues: Object, standardUpdate: Boolean);

    }

}/**
 * APIs available for encrypting certificates in scoped applications. Use these methods to generate a hash for the certificate, sign data using a private key, and generate a message authentication code.
 * 
 * 
 */
declare class CertificateEncryption {



    /**
     * Instantiates a CertificateEncryption object in a scoped application.
     * 
     */
    constructor();

    /**
     * Generates the Message Authentication Code (MAC), which is used to authenticate a message.
     * 
     * @key Key to use to sign the message. Must be Base64 encoded.
     * @algorithm Algorithm to use to generate the MAC: HmacSHA256, HmacSHA1, HmacMD5, and so on.
     * @data Data to process.
     * @example
     * var mac = new CertificateEncryption;
     * var key = "sample_key"; 
     * key = GlideSystem.base64Encode(key);
     * mac.generateMac(key, "HmacSHA256", "sample_data");
     * @returns MAC in base64 format.
     */
    generateMac(key: String, algorithm: String, data: String): String;

    /**
     * Generates a hash (SHA-1, SHA-256, and so on) for the certificate from Trust Store Cert.
     * 
     * @certificateID sys_id of the certificate record in the X.509 Certificate [sys_certificate] table.
     * @algorithm SHA-1, SHA-256, and so on
     * @returns Thumbprint in base64 format.
     */
    getThumbPrint(certificateID: String, algorithm: String): String;

    /**
     * Generates a hash (SHA-1, SHA-256, and so on) for the certificate from the keystore entry.
     * 
     * @certificateID sys_id of the certificate record in the X.509 Certificate [sys_certificate] table.
     * @alias Alias name for the certificate.
     * @algorithm SHA-1, SHA-256, and so on.
     * @returns Thumbprint in base64 format.
     */
    getThumbPrintFromKeystore(certificateID: String, alias: String, algorithm: String): String;

    /**
     * Signs the data using the private key and the given algorithm.
     * 
     * @certificateID sys_id of the certificate record in the X.509 Certificate [sys_certificate] table.
     * @alias Private key name.
     * @aliaspassword Password for the private key.
     * @datatosign Data to sign.
     * @algorithm SHA-1, SHA-256, and so on.
     * @example
     * var ce = new CertificateEncryption;
     * ce.sign("recordID", "alias", "password", "SHA-1", "sign this data");
     * @returns Signed data in base64 format.
     */
    sign(certificateID: String, alias: String, aliaspassword: String, datatosign: String, algorithm: String): String;

}


declare namespace sn_clotho {

    /**
     * Provides methods to add data to the MetricBase database, to execute transforms on the MetricBase database, and to receive the results of the transforms. The Client class can be used in scoped and global server scripts. When using the Client class, use the sn_clotho namespace identifier. * * This class is part of the MetricBase application.
     * 
     * 
     */
    declare class Client {



        /**
         * Create an instance of the client class to access the MetricBase database.
         * 
         * @example
         * var client = new sn_clotho.Client();
         */
        constructor();

        /**
         * Remove the data in the MetricBase database associated with the specified metric in the specified GlideRecord. Use this method for removing test data.Note: This method deletes data from the MetricBase database. There is no recovery mechanism. 
         * 
         * @gr The records whose time series data for the specified metric is to be deleted.
         * @metric The name of the metric.
         * @example
         * var client = new sn_clotho.Client();
         * //query drones of a specific model
         * var drones = new GlideRecord("mb_demo_drone");
         * drones.addQuery("model", "Kingfisher Phantom");
         * drones.query();
         * 
         * client.deleteSeries(drones, 'mb_demo_mt_speed');
         */
        deleteSeries(gr: GlideRecord, metric: String);

        /**
         * Save metric data to the MetricBase database.
         * 
         * @metricData A DataBuilder object containing metric data.
         */
        put(metricData: sn_clotho.DataBuilder);

    }

}
declare namespace sn_cmdbgroup {

    /**
     * The CMDBGroupAPI provided methods for performing actions on CMDB groups. The CMDBGroupAPI is a scoped static class. To use the class you must include the namespace identifier sn_cmdbgroup before the CMDBGroupAPI object. For example:
     * 
     * 
     */
    declare class CMDBGroupAPI {



        /**
         * Returns all CIs for this group. This includes all manual CIs and the list of CIs from the Query Builder's saved query.
         * 
         * @groupId The sysId of the CMDB group.
         * @requireCompleteSet When true, returns an empty string if any CIs are filtered out by ACL restrictions.
         * @example
         * // Script example:
         * var getAllCIFunc = function(groupSysId) {
         *     var parser = new JSONParser();
         *     var response = sn_cmdbgroup.CMDBGroupAPI.getAllCI(groupSysId, false);
         *     var parsed = parser.parse(response);
         *     if (parsed.result) {
         *         gs.print("succeed to retrieve ci list: " + parsed.idList);
         *     } else {
         *         gs.print("fail to retrieve list, errors: " + JSON.stringify(parsed.errors));
         *     }
         * }
         * var groupExists = "d0d2d25113152200eef2dd828144b0e4";
         * var groupContainsInvalidSavedQuery = "e685a2c3d7012200de92a5f75e610387";
         * getAllCIFunc(groupExists);
         * getAllCIFunc(groupContainsInvalidSavedQuery);
         * @returns A JSON formated string in the format { 'result':false, 'errors':[ {'message':'Group does not exist', 'error':'GROUP_SYS_ID_IS_NOT_FOUND'}, { } // another error if it exists ], 'partialCIListDueToACLFlag':false,
         * 'idList':['sys_id_1', 'sys_id2'] }
         * Where result - a boolean flag. When true the method was successful. errors - a list of errors with a message and error code. partialCIListDueToACLFlag - a Boolean flag. When true, the idList is incomplete due to an ACL restriction. When false, the idList is complete. idList - an array of cmdb_ci sys_ids When not successful, returns one of the errors GROUP_SYS_ID_IS_NOT_FOUND, GROUP_SYS_ID_IS_EMPTY, FAIL_TO_INSERT_GROUP_CI_PAIR, FAIL_TO_INSERT_GROUP_QUERY_ID_PAIR, CI_CAN_NOT_FOUND, SAVED_QUERY_ID_NOT_FOUND, ERROR_DURING_QUERY_BUILDER_PROCESS_QUERY, TIMEOUT_DURING_QUERY_BUILDER_PROCESS_QUERY, NOT_COMPLETE_DURING_QUERY_BUILDER_PROCESS_QUERY, MAX_LIMIT_DURING_QUERY_BUILDER_PROCESS_QUERY, GROUP_API_TIMEOUT, EXCEPTION_FROM_EXECUTE_QUERY, SOME_CI_NOT_VISIBLE_DUE_TO_SECURITY_CONSTRAINT
         */
        getAllCI(groupId: String, requireCompleteSet: Boolean): String;

        /**
         * Returns all CIs returned from all saved query builder's query IDs for the specified group.
         * 
         * @groupId The sysId of the CMDB group.
         * @requireCompleteSet When true, returns an empty string if any CIs are filtered out by ACL restrictions.
         * @example
         * // Script example:
         * var getAllCIFromQueryBuilderFunc = function(groupSysId) {
         *     var parser = new JSONParser();
         *     var response = sn_cmdbgroup.CMDBGroupAPI.getAllCIFromQueryBuilder(groupSysId, false);
         *     var parsed = parser.parse(response);
         *     if (parsed.result) {
         *         gs.print("succeed to retrieve ci list: " + parsed.idList);
         *     } else {
         *         gs.print("fail to retrieve list, errors: " + JSON.stringify(parsed.errors));
         *     }
         * }
         * var groupExists = "d0d2d25113152200eef2dd828144b0e4";
         * var groupContainsInvalidSavedQuery = "e685a2c3d7012200de92a5f75e610387";
         * getAllCIFromQueryBuilderFunc(groupExists);
         * getAllCIFromQueryBuilderFunc(groupContainsInvalidSavedQuery);
         * @returns A JSON formated string in the format { 'result':false, 'errors':[ {'message':'Group does not exist', 'error':'GROUP_SYS_ID_IS_NOT_FOUND'}, { } // another error if it exists ], 'partialCIListDueToACLFlag':false,
         * 'idList':['sys_id_1', 'sys_id2'] }
         * Where result - a boolean flag. When true the method was successful. errors - a list of errors with a message and error code. partialCIListDueToACLFlag - a Boolean flag. When true, the idList is incomplete due to an ACL restriction. When false, the idList is complete. idList - an array of cmdb_ci sys_ids When not successful, returns one of the errors GROUP_SYS_ID_IS_NOT_FOUND, GROUP_SYS_ID_IS_EMPTY, FAIL_TO_INSERT_GROUP_CI_PAIR, FAIL_TO_INSERT_GROUP_QUERY_ID_PAIR, CI_CAN_NOT_FOUND, SAVED_QUERY_ID_NOT_FOUND, ERROR_DURING_QUERY_BUILDER_PROCESS_QUERY, TIMEOUT_DURING_QUERY_BUILDER_PROCESS_QUERY, NOT_COMPLETE_DURING_QUERY_BUILDER_PROCESS_QUERY, MAX_LIMIT_DURING_QUERY_BUILDER_PROCESS_QUERY, GROUP_API_TIMEOUT, EXCEPTION_FROM_EXECUTE_QUERY, SOME_CI_NOT_VISIBLE_DUE_TO_SECURITY_CONSTRAINT
         */
        getAllCIFromQueryBuilder(groupId: String, requireCompleteSet: Boolean): String;

        /**
         * Returns the CMDB group's manual CI list.
         * 
         * @groupId The sysId of the CMDB group.
         * @requireCompleteSet When true, returns an error string if any CIs are filtered out by ACL restrictions.
         * @example
         * // Script example for requireCompleteSet being false:
         *     var getManualCIList = function(groupSysId) {
         *     var parser = new JSONParser();
         *     var response = sn_cmdbgroup.CMDBGroupAPI.getManualCIList(groupSysId, false);
         *     var parsed = parser.parse(response);
         *     if (parsed.result) {
         *         gs.print("succeed to retrieve ci list: " + parsed.idList);
         *     } else {
         *         gs.print("fail to retrieve list, errors: " + JSON.stringify(parsed.errors));
         *     }
         * }
         * // create a group in cmdb_group, and add CIs to this group in Edit Manual CI form
         * var groupExists = "d0d2d25113152200eef2dd828144b0e4";
         * // use a non-exist group
         * var groupDoesNotExists = "d0d2d25113152200eef2dd828144b0e4111";
         * getManualCIList(groupExists);
         * getManualCIList(groupDoesNotExists);
         *  
         * @example
         * // Script example for requireCompleteSet being true
         *     var getManualCIList = function(groupSysId) {
         *     var parser = new JSONParser();
         *     var response = sn_cmdbgroup.CMDBGroupAPI.getManualCIList(groupSysId, true);
         *     var parsed = parser.parse(response);
         *     if (parsed.result) {
         *         gs.print("succeed to retrieve ci list: " + parsed.idList);
         *     } else {
         *         gs.print("fail to retrieve list, errors: " + JSON.stringify(parsed.errors));
         *     }
         * }
         * // create a group in cmdb_group, and add CIs to this group in Edit Manual CI form
         * var groupExists = "d0d2d25113152200eef2dd828144b0e4";
         * getManualCIList(groupExists);
         * @returns A JSON formated string in the format { 'result':false, 'errors':[ {'message':'Group does not exist', 'error':'GROUP_SYS_ID_IS_NOT_FOUND'}, { } // another error if it exists ], 'partialCIListDueToACLFlag':false,
         * 'idList':['sys_id_1', 'sys_id2'] }
         * Where result - a boolean flag. When true the method was successful. errors - a list of errors with a message and error code. partialCIListDueToACLFlag - a Boolean flag. When true, the idList is incomplete due to an ACL restriction. When false, the idList is complete. idList - an array of cmdb_ci sys_ids When not successful, returns one of the errors GROUP_SYS_ID_IS_NOT_FOUND, GROUP_SYS_ID_IS_EMPTY, FAIL_TO_INSERT_GROUP_CI_PAIR, FAIL_TO_INSERT_GROUP_QUERY_ID_PAIR, CI_CAN_NOT_FOUND, SAVED_QUERY_ID_NOT_FOUND, ERROR_DURING_QUERY_BUILDER_PROCESS_QUERY, TIMEOUT_DURING_QUERY_BUILDER_PROCESS_QUERY, NOT_COMPLETE_DURING_QUERY_BUILDER_PROCESS_QUERY, MAX_LIMIT_DURING_QUERY_BUILDER_PROCESS_QUERY, GROUP_API_TIMEOUT, EXCEPTION_FROM_EXECUTE_QUERY, SOME_CI_NOT_VISIBLE_DUE_TO_SECURITY_CONSTRAINT
         */
        getManualCIList(groupId: String, requireCompleteSet: Boolean): String;

        /**
         * Returns the query builder's query IDs for the specified CMDB group.
         * 
         * @groupId The sysId of the CMDB group.
         * @requireCompleteSet When true, returns an empty string if any CIs are filtered out by ACL restrictions.
         * @example
         * // Script example:
         * var getSavedQueryIdList = function(groupSysId) {
         *     var parser = new JSONParser();
         *     var response = sn_cmdbgroup.CMDBGroupAPI.getSavedQueryIdList(groupSysId, false);
         *     var parsed = parser.parse(response);
         *     if (parsed.result) {
         *         gs.print("succeed to retrieve saved query id list: " + parsed.idList);
         *     } else {
         *         gs.print("fail to retrieve list, errors: " + JSON.stringify(parsed.errors));
         *     }
         * }
         * var groupExists = "d0d2d25113152200eef2dd828144b0e4";
         * var groupDoesNotExists = "d0d2d25113152200eef2dd828144b0e4111";
         * getSavedQueryIdList(groupExists);
         * getSavedQueryIdList(groupDoesNotExists);
         * @returns A JSON formated string in the format { 'result':false, 'errors':[ {'message':'Group does not exist', 'error':'GROUP_SYS_ID_IS_NOT_FOUND'}, { } // another error if it exists ], 'partialCIListDueToACLFlag':false,
         * 'idList':['sys_id_1', 'sys_id2'] }
         * Where result - a boolean flag. When true the method was successful. errors - a list of errors with a message and error code. partialCIListDueToACLFlag - a Boolean flag. When true, the idList is incomplete due to an ACL restriction. When false, the idList is complete. idList - an array of cmdb_ci sys_ids When not successful, returns one of the errors GROUP_SYS_ID_IS_NOT_FOUND, GROUP_SYS_ID_IS_EMPTY, FAIL_TO_INSERT_GROUP_CI_PAIR, FAIL_TO_INSERT_GROUP_QUERY_ID_PAIR, CI_CAN_NOT_FOUND, SAVED_QUERY_ID_NOT_FOUND, ERROR_DURING_QUERY_BUILDER_PROCESS_QUERY, TIMEOUT_DURING_QUERY_BUILDER_PROCESS_QUERY, NOT_COMPLETE_DURING_QUERY_BUILDER_PROCESS_QUERY, MAX_LIMIT_DURING_QUERY_BUILDER_PROCESS_QUERY, GROUP_API_TIMEOUT, EXCEPTION_FROM_EXECUTE_QUERY, SOME_CI_NOT_VISIBLE_DUE_TO_SECURITY_CONSTRAINT
         */
        getSavedQueryIdList(groupId: String, requireCompleteSet: Boolean): String;

        /**
         * Sets the manual CI list for the specified group. The existing manual CI list is overwritten. CI sysIds not found in the cmdb_ci table are ignored.
         * 
         * @groupId The sysId of the CMDB group.
         * @ciSysIds Comma separated list of CI sysIds.
         * @example
         * // Script example:
         * var setManualCIListFunc = function(groupSysId, manualCIList) {
         *     var parser = new JSONParser();
         *     var response = sn_cmdbgroup.CMDBGroupAPI.setManualCIList(groupSysId, manualCIList);
         *     var parsed = parser.parse(response);
         *     if (parsed.result) {
         *         gs.print("succeed to set manual ci list");
         *     } else {
         *         gs.print("fail to set manual ci list, errors: " + JSON.stringify(parsed.errors));
         *     }
         * }
         * var group = "d0d2d25113152200eef2dd828144b0e4";
         * var groupDoesNotExist = "1234";
         * var manualCIList = "b4fd7c8437201000deeabfc8bcbe5dc1, affd3c8437201000deeabfc8bcbe5dc3";
         * setManualCIListFunc(group, manualCIList);
         * setManualCIListFunc(groupDoesNotExist, manualCIList);
         * @returns A JSON formated string in the format { 'result':false, 'errors':[ {'message':'Group does not exist', 'error':'GROUP_SYS_ID_IS_NOT_FOUND'}, { } // another error if it exists ], 'partialCIListDueToACLFlag':false,
         * 'idList':['sys_id_1', 'sys_id2'] }
         * Where result - a boolean flag. When true the method was successful. errors - a list of errors with a message and error code. partialCIListDueToACLFlag - a Boolean flag. When true, the idList is incomplete due to an ACL restriction. When false, the idList is complete. idList - an array of cmdb_ci sys_ids When not successful, returns one of the errors GROUP_SYS_ID_IS_NOT_FOUND, GROUP_SYS_ID_IS_EMPTY, FAIL_TO_INSERT_GROUP_CI_PAIR, FAIL_TO_INSERT_GROUP_QUERY_ID_PAIR, CI_CAN_NOT_FOUND, SAVED_QUERY_ID_NOT_FOUND, ERROR_DURING_QUERY_BUILDER_PROCESS_QUERY, TIMEOUT_DURING_QUERY_BUILDER_PROCESS_QUERY, NOT_COMPLETE_DURING_QUERY_BUILDER_PROCESS_QUERY, MAX_LIMIT_DURING_QUERY_BUILDER_PROCESS_QUERY, GROUP_API_TIMEOUT, EXCEPTION_FROM_EXECUTE_QUERY, SOME_CI_NOT_VISIBLE_DUE_TO_SECURITY_CONSTRAINT
         */
        setManualCIList(groupId: String, ciSysIds: String): String;

        /**
         * Sets the saved query ID list for the specified group. The existing query ID list is overwritten. Query sysIds not found in the qb_saved_query table are ignored.
         * 
         * @groupId The sysId of the CMDB group.
         * @queryIds Comma separated list of saved query sysIds.
         * @example
         * // Script example:
         * var setSavedQueryIdListFunc = function(groupSysId, queryIdList) {
         *     var parser = new JSONParser();
         *     var response = sn_cmdbgroup.CMDBGroupAPI.setSavedQueryIdList(groupSysId, queryIdList);
         *     var parsed = parser.parse(response);
         *     if (parsed.result) {
         *         gs.print("succeed to set saved query id list");
         *     } else {
         *         gs.print("fail to set saved query id list, errors: " + JSON.stringify(parsed.errors));
         *     }
         * }
         * var group = "d0d2d25113152200eef2dd828144b0e4";
         * var savedQueryBuilderIdList = "394585fed7812200de92a5f75e6103e8";
         * var savedQueryBuilderIdNotExistList = "b4fd7c8437201000deeabfc8bcbe5dc1,
         *    affd3c8437201000deeabfc8bcbe5dc3";
         *  
         * setSavedQueryIdListFunc(group, savedQueryBuilderIdList);
         * setSavedQueryIdListFunc(group, savedQueryBuilderIdNotExistList);
         * 
         * @returns A JSON formated string in the format { 'result':false, 'errors':[ {'message':'Group does not exist', 'error':'GROUP_SYS_ID_IS_NOT_FOUND'}, { } // another error if it exists ], 'partialCIListDueToACLFlag':false,
         * 'idList':['sys_id_1', 'sys_id2'] }
         * Where result - a boolean flag. When true the method was successful. errors - a list of errors with a message and error code. partialCIListDueToACLFlag - a Boolean flag. When true, the idList is incomplete due to an ACL restriction. When false, the idList is complete. idList - an array of cmdb_ci sys_ids When not successful, returns one of the errors GROUP_SYS_ID_IS_NOT_FOUND, GROUP_SYS_ID_IS_EMPTY, FAIL_TO_INSERT_GROUP_CI_PAIR, FAIL_TO_INSERT_GROUP_QUERY_ID_PAIR, CI_CAN_NOT_FOUND, SAVED_QUERY_ID_NOT_FOUND, ERROR_DURING_QUERY_BUILDER_PROCESS_QUERY, TIMEOUT_DURING_QUERY_BUILDER_PROCESS_QUERY, NOT_COMPLETE_DURING_QUERY_BUILDER_PROCESS_QUERY, MAX_LIMIT_DURING_QUERY_BUILDER_PROCESS_QUERY, GROUP_API_TIMEOUT, EXCEPTION_FROM_EXECUTE_QUERY, SOME_CI_NOT_VISIBLE_DUE_TO_SECURITY_CONSTRAINT
         */
        setSavedQueryIdList(groupId: String, queryIds: String): String;

    }

}
declare namespace sn_cc {

    /**
     * Use ConnectionInfo API to get connection attribute information through the connection and credential alias. You can use this API in scoped applications, or within the global scope. In scoped scripts, use the sn_cc namespace identifier. * * This function retrieves connection attribute information identified by the given connection and credential alias. * * 
     * 
     * 
     */
    declare class ConnectionInfo {



        /**
         * Returns the value of a connection info attribute with the specified name.
         * 
         * @example
         *   // get the same values using getAttribute
         *   gs.info(connectionInfo.getAttribute("name"));
         *   gs.info(connectionInfo.getAttribute("connection_url"));
         * 
         */
        getAttribute();

        /**
         * Returns the value of credential attributes for a specified connection.
         * 
         * @example
         *  // get credential attributes
         *   gs.info(connectionInfo.getCredentialAttribute("user_name"));
         *   gs.info(connectionInfo.getCredentialAttribute("password")); 
         * 
         */
        getCredentialAttribute();

        /**
         * Returns the connection attributes as a collection of key-value pairs.
         * 
         * @example
         *  // get data map
         *   var datamap = connectionInfo.getDataMap();
         *   gs.info(datamap["name"]);
         *   gs.info(datamap["connection_url"]);
         * 
         */
        getDataMap();

        /**
         * Returns the extended attributes as a collection of key-value pairs.
         * 
         * @example
         * // get extended attributes
         *   var extendedAttributes = connection.getExtendedAttributes();  
         *   gs.info(extendedAttributes["name1"]);
         *  }
         * 
         */
        getExtendedAttributes();

    }

}
declare namespace sn_cc {

    /**
     * Use ConnectionInfoProvider API to select connection information through the connection alias. You can use this API in scoped applications, or within the global scope. In scoped scripts, use the sn_cc namespace identifier. * * This function retrieves connection information identified by the given connection alias. * * 
     * 
     * 
     */
    declare class ConnectionInfoProvider {



        /**
         * Use ConnectionInfoProvider() to select connection information through the connection alias.
         * 
         */
        constructor();

        /**
         * This function retrieves a ConnectionInfo object identified by the given aliasID in the current domain.
         * 
         * @aliasID The sys_id of a connection alias.
         * @example
         * var provider = new sn_cc.ConnectionInfoProvider();
         * 
         * // get a jdbc connection in the current domain with the alias ID
         * //     "6219afbf9f03320021dd7501942e70fc"
         * var connectionInfo = provider.getConnectionInfo("6219afbf9f03320021dd7501942e70fc");
         * @returns Information about the connection.
         */
        getConnectionInfo(aliasID: String): sn_cc.ConnectionInfo;

        /**
         * This function retrieves a ConnectionInfo object identified by the given aliasID for a specific domain.
         * 
         * @aliasID The sys_id of a connection alias.
         * @domainID The sys_id of a domain or global.
         * @example
         * var provider = new sn_cc.ConnectionInfoProvider();
         * 
         * // get a jdbc connection in the ACME domain with the alias ID
         *  //      "cd5923ff9f03320021dd7501942e70bb"
         *  connectionInfo = provider.getConnectionInfoByDomain("cd5923ff9f03320021dd7501942e70bb",
         *         "c90d4b084a362312013398f051272c0d");
         * @returns Connection information.
         */
        getConnectionInfoByDomain(aliasID: String, domainID: String): sn_cc.ConnectionInfo;

    }

}
declare namespace sn_connect {

    /**
     * Conversation API enables you to create or modify Connect conversations. To use this class in a scoped application, use the sn_connect namespace identifier. The Connect Scriptable APIs plugin (ID: com.glide.connect.scriptable) should be enabled to access the Conversation API.
     * 
     * 
     */
    declare class Conversation {



        /**
         * Add a user to a conversation.
         * 
         * @sysID The sys_ID of the user you want to add to a conversation.
         * @example
         * var conversation = sn_connect.Conversation.get("7caf49111309030034bb58a12244b06c");
         * conversation.addSubscriber("a8f98bb0eb32010045e1a5115206fe3a");
         */
        addSubscriber(sysID: String);

        /**
         * Create a Connect conversation.
         * 
         * @name Create a conversation with a specific name.
         * @type Include a specific conversation type. The type is determined by the type choice list. The base system includes the following type options: connect support group peer qanda team 
         * @example
         * var conversation = sn_connect.Conversation.create({
         *     name: "Hello world",
         *     type: "connect"
         * });
         * @returns Scriptable Conversation
         */
        create(name: String, type: String): Object;

        /**
         * Get an existing Connect conversation by sys_id.
         * 
         * @sysID The sys_id of the conversation record.
         * @example
         * var conversation = sn_connect.Conversation.get("27b9844c1385030034bb58a12244b037");
         * @returns Conversation object
         */
        get(sysID: String): Object;

        /**
         * Remove a user from a conversation.
         * 
         * @SysID The sys_id of the user you want to remove from a conversation.
         * @example
         * var conversation = sn_connect.Conversation.get("7caf49111309030034bb58a12244b06c");
         * conversation.removeSubscriber("a8f98bb0eb32010045e1a5115206fe3a");
         */
        removeSubscriber(SysID: String);

        /**
         * Send a message to a conversation.
         * 
         * @Body The main text of the message.
         * @Field The field you want the message to appear as. Only use this option if adding a message to a record conversation. Choose from work_notes, comments, or system. Using the field system treats the message as a system message.
         * @example
         * var conversation = sn_connect.Conversation.get("2064fa3919010300964f5270e9840fbb");
         * conversation.sendMessage(body: "Hello world", field: "work_notes");
         */
        sendMessage(Body: String, Field: String);

    }

}
declare namespace sn_clotho {

    /**
     * A Data object contains the results of transform performed by a sn_clotho.Client.transform() method. Do not use a constructor to create an instance of this class, instead use the object returned by the sn_clotho.Client.transform() method. * * The Data class can be used in scoped and global server scripts. When using the Data class, use the sn_clotho namespace identifier. * * This class is part of the MetricBase application.
     * 
     * 
     */
    declare class Data {



        /**
         * Returns the end time for data in the Data object.
         * 
         * @returns The end of the time period.
         */
        getEnd(): GlideDateTime;

        /**
         * Returns the label assigned by the sn_clotho.ClothoTransform.label() method.
         * 
         * @returns The label assigned to the data.
         */
        getLabel(): String;

        /**
         * Returns the name of the metric of the data series. Returns null when the data object is associated with multiple data series.
         * 
         * @returns Name of the metric field. Returns null when the data object is associated with multiple data series.
         */
        getMetricName(): String;

        /**
         * Returns the time period in milliseconds.
         * 
         * @returns The elapsed time in seconds.
         */
        getPeriod(): Number;

        /**
         * Returns the start time for data in the Data object.
         * 
         * @returns The time for the first data point.
         */
        getStart(): GlideDateTime;

        /**
         * Returns the subject of the data series. Returns null when the data object is associated with multiple data series.
         * 
         * @returns The subject field value of the subject GlideRecord. This is generally the sys_id of the subject GlideRecord.
         */
        getSubject(): String;

        /**
         * Returns the name of the table assigned in the DataSelector class constructor. Returns null when the data object is associated with multiple data series.
         * 
         * @returns Table name. Returns null when the data object is associated with multiple data series.
         */
        getTableName(): String;

        /**
         * Returns an array of values.
         * 
         * @returns An array of numbers.
         */
        getValues(): Array<any>;

        /**
         * Returns the number of values in the Data object.
         * 
         * @returns The number of values in the object.
         */
        size(): Number;

    }

}
declare namespace sn_clotho {

    /**
     * Use the DataBuilder class to create a series of data points for a metric. Use the sn_clotho.Client.put() method to save the values. The DataBuilder class can be used in scoped and global server scripts. When using the DataBuilder class, use the sn_clotho namespace identifier. * * This class is part of the MetricBase application.
     * 
     * 
     */
    declare class DataBuilder {



        /**
         * Creates an instance of the DataBuilder class.
         * 
         * @glideRecord GlideRecord from which to obtain the domain.
         * @subject The sys_id of the GlideRecord associated with this series.
         * @metric The field name of the metric.
         * @example
         * // Where cpu_percentage is the name of the metric
         * var dataBuilder = new sn_clotho.DataBuilder(gr, 'cpu_percentage');
         */
        constructor(glideRecord: Object, subject: String, metric: String);

        /**
         * Add a series of data points to the DataBuilder object. Each data point is a time stamp and a value.Uses the start parameter and the retention policy collection period to calculate the time stamp for each value in the array. The first value has the start parameter as the time stamp. This method does not save the data in the MetricBase database. Use the sn_clotho.Client.put() method to save the values.
         * 
         * @start The time stamp for the first data point. Subsequent time stamps are calculated using the retention policy collection period.
         * @value An array of numbers.
         * @example
         * 
         * var points = [7,0.5,273];
         * var dataBuilder = new sn_clotho.DataBuilder(gr, 'cpu_percentage');
         * // this creates a GlideDateTime object set to the current date and time
         * var time = new GlideDateTime();
         * dataBuilder.add(time, points);
         * @returns The same DataBuilder object.
         */
        add(start: GlideDateTime, value: Array<any>): sn_clotho.DataBuilder;

        /**
         * Add a data point to the DataBuilder object. Each data point is a time stamp and a value. This method does not save the data point in the metric. Use the sn_clotho.Client.put() method to save the values.
         * 
         * @start The time stamp for the data point.
         * @value The value of the data point.
         * @example
         * var dataBuilder = new sn_clotho.DataBuilder(gr, 'cpu_percentage');
         * // this creates a GlideDateTime object set to the current date and time
         * var time = new GlideDateTime();
         * dataBuilder.add(time, 0.6);
         * @returns The DataBuilder object.
         */
        add(start: GlideDateTime, value: Number): sn_clotho.DataBuilder;

    }

}/**
 * Use the DecisionTableAPI class to access Decision Tables data in scoped and global server-side scripts. Access DecisionTableAPI methods using the sn_dt namespace. To learn more about Decision Tables, see Decision Tables.
 * 
 * 
 */
declare class DecisionTableAPI {



    /**
     * Instantiates a DecisionTableAPI object.
     * 
     * @example
     * var dt = new sn_dt.DecisionTableAPI();
     */
    constructor();

    /**
     * Returns all decision tables from the Decision Tables [sys_decision] table.
     * 
     * @example
     * var dt = new sn_dt.DecisionTableAPI();
     * var response = dt.getAll();
     * gs.print(JSON.stringify(response));
     * 
     * @returns All decision tables and their fields from the Decision Tables [sys_decision] table. Each decision table contains these key-value pairs: distinctAnswers: Array. Answer records associated with the decision table. Each record contains these key-value pairs. valid: Boolean. True if the record exists in the system; otherwise false. label: String. Answer record label. value: String. Sys ID of the answer record. table: String. Table containing the answer record. referenceQualifier: String. Used for internal purposes. inputs: Array. Decision inputs from the Decision Inputs [sys_decision_input] table associated with the decision table. Each record contains these key-value pairs. searchField: String. Used for internal purposes. defaultValue: String. Default value for the input. show_ref_finder: Boolean. Used for internal purposes. use_dependent: Boolean. Used for internal purposes. type: String. Input data type. mandatory: Boolean. True if the input is mandatory; otherwise false. extended: Boolean. True if the input extends another field; otherwise false. local: Boolean. Used for internal purposes. sys_class_name: String. Used for internal purposes. reference: String. Reference table used if the input type is reference. dependent_on: String. Field that document ID and choice inputs depend on. data_structure: String. Used for internal purposes. readonly: Boolean. True if the input is read-only; otherwise false. id: String. Sys ID of the input from the Decision Inputs [sys_decision_input] table. type_label: String. Input data type label. table: String. Reference field table if the input type is reference. order: Number. Order in which the system evaluates inputs. ref_qual: String. Condition applied to the reference table. reference_display: String. Used for internal purposes. choiceOption: String. Method for users to see a list of suggested values. label: String. Label of the input record. hint: String. Hint text used to help users understand the input required. name: String. Internal name of the input record. attributes: Array. Field attributes that apply to the input record. maxsize: Number. Maximum number of characters allowed in the field. columnName: String. Name of the input. domain: String. Domain in which the decision table is visible. answerType: String. Used for internal purposes. questions: Array. Decision records from the Decision [sys_decision_question] table associated with the decision table. Decision records contain these key-value pairs. defaultAnswer: Boolean. True if this decision is the default for the decision table; otherwise false. condition: String. Conditions required to reach this decision. The fields available for the condition are the decision inputs that are associated with this decision table. answer: Object. Answer record associated with the decision. Answer objects contain these key-value pairs. valid: Boolean. True if the record exists in the system; otherwise false. label: String. Answer record label. value: String. Sys ID of the answer record. table: String. Table containing the answer record. decisionTable: String. Sys ID of the decision table from the Decision Tables [sys_decision] table associated with the decision. domain: String. Domain in which the decision is visible. active: Boolean. True if the decision record is active; otherwise false. id: String. Sys ID of the decision record from the Decision [sys_decision_question] table. label: String. Label for the decision record. order: Number. Order in which the system evaluates decisions. accessibleFrom: String. Scopes that have access to the record. name: String. Internal name of the decision table record. active: Boolean. True if the decision table record is active; otherwise false. id: String. Sys ID of the decision table record. label: String. Label of the decision table record. answerTable: Object. Answer table associated with the decision table. displayValue: String. Display name of the table that contains answer records. value: String. Internal name of the table that contains answer records. Format: JSON
     */
    getAll(): Object;

    /**
     * Returns the answers associated with the specified decision table. An answer is a record on any table associated with a Decision [sys_decision_question] record.
     * 
     * @decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
     * @example
     * var dt = new sn_dt.DecisionTableAPI();
     * var response = dt.getAnswers("3c4464a7b701230034d1da23ee11a993");
     * gs.print(JSON.stringify(response));
     * @returns Answer records associated with the decision table. Each record contains these key-value pairs: valid: Boolean. True if the record exists in the system; otherwise false. label: String. Answer record label. value: String. Sys ID of the answer record. table: String. Table containing the answer record. Format: JSON
     */
    getAnswers(decisionID: String): Object;

    /**
     * Evaluates a decision table based on the provided inputs and returns an answer. If no inputs are provided, returns the first default answer found.
     * 
     * @decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
     * @inputs Optional. Input values for the Decision Inputs [sys_decision_input] table associated with the provided decision table. Use the value of the Column name field as the key. The data type of the value must match the Decision Input Type field. If no inputs are provided, returns the first default answer found.
     * @example
     * var dt = new sn_dt.DecisionTableAPI();
     * var inputs = new Object();
     * inputs[‘age’] = 25;
     * var response = dt.getDecision('26eea7a9dba07300efc65404ce961961', inputs);
     * @returns The correctly evaluated Answer record associated with the decision table. An answer record is a record from the table defined in the Decision [sys_decision_question] record Answer table field. If no inputs are provided, returns the first default answer found. If no default or correctly evaluated answers are found, returns an error.
     */
    getDecision(decisionID: String, inputs: Object): GlideRecord;

    /**
     * Evaluates a decision table based on the provided inputs and returns all correctly evaluated answers. If no inputs are provided, returns all default answers.
     * 
     * @decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
     * @inputs Optional. Input values for the Decision Inputs [sys_decision_input] table associated with the provided decision table. If no inputs are provided, returns all default answers.
     * @example
     * var dt = new sn_dt.DecisionTableAPI();
     * var input = new Object();
     * input['age'] = 25;
     * var response = dt.getDecisions('5b06ce5db701230034d1da23ee11a965', input);
     * 
     * @returns Answer records in GlideRecord format. An answer record is a record on any table associated with a Decision [sys_decision_question] record. If no inputs are provided, returns all default answers. If no default or correctly evaluated answers are found, returns an error.
     */
    getDecisions(decisionID: String, inputs: Object): Array<any>;

    /**
     * Returns a single decision table from the Decision Tables [sys_decision] table.
     * 
     * @decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
     * @example
     * var dt = new sn_dt.DecisionTableAPI();
     * var response = dt.getDecisionTable("3c4464a7b701230034d1da23ee11a993");
     * gs.print(JSON.stringify(response));
     * 
     * @returns Decision table from the Decision Tables [sys_decision] table. Each decision table contains these key-value pairs. distinctAnswers: Array. Answer records associated with the decision table. Each record contains these key-value pairs. valid: Boolean. True if the record exists in the system; otherwise false. label: String. Answer record label. value: String. Sys ID of the answer record. table: String. Table containing the answer record. referenceQualifier: String. Used for internal purposes. inputs: Array. Decision inputs from the Decision Inputs [sys_decision_input] table associated with the decision table. Each record contains these key-value pairs. searchField: String. Used for internal purposes. defaultValue: String. Default value for the input. show_ref_finder: Boolean. Used for internal purposes. use_dependent: Boolean. Used for internal purposes. type: String. Input data type. mandatory: Boolean. True if the input is mandatory; otherwise false. extended: Boolean. True if the input extends another field; otherwise false. local: Boolean. Used for internal purposes. sys_class_name: String. Used for internal purposes. reference: String. Reference table used if the input type is reference. dependent_on: String. Field that document ID and choice inputs depend on. data_structure: String. Used for internal purposes. readonly: Boolean. True if the input is read-only; otherwise false. id: String. Sys ID of the input from the Decision Inputs [sys_decision_input] table. type_label: String. Input data type label. table: String. Reference field table if the input type is reference. order: Number. Order in which the system evaluates inputs. ref_qual: String. Condition applied to the reference table. reference_display: String. Used for internal purposes. choiceOption: String. Method for users to see a list of suggested values. label: String. Label of the input record. hint: String. Hint text used to help users understand the input required. name: String. Internal name of the input record. attributes: Array. Field attributes that apply to the input record. maxsize: Number. Maximum number of characters allowed in the field. columnName: String. Name of the input. domain: String. Domain in which the decision table is visible. answerType: String. Used for internal purposes. questions: Array. Decision records from the Decision [sys_decision_question] table associated with the decision table. Decision records contain these key-value pairs. defaultAnswer: Boolean. True if this decision is the default for the decision table; otherwise false. condition: String. Conditions required to reach this decision. The fields available for the condition are the decision inputs that are associated with this decision table. answer: Object. Answer record associated with the decision. Answer objects contain these key-value pairs. valid: Boolean. True if the record exists in the system; otherwise false. label: String. Answer record label. value: String. Sys ID of the answer record. table: String. Table containing the answer record. decisionTable: String. Sys ID of the decision table from the Decision Tables [sys_decision] table associated with the decision. domain: String. Domain in which the decision is visible. active: Boolean. True if the decision record is active; otherwise false. id: String. Sys ID of the decision record from the Decision [sys_decision_question] table. label: String. Label for the decision record. order: Number. Order in which the system evaluates decisions. accessibleFrom: String. Scopes that have access to the record. name: String. Internal name of the decision table record. active: Boolean. True if the decision table record is active; otherwise false. id: String. Sys ID of the decision table record. label: String. Label of the decision table record. answerTable: Object. Answer table associated with the decision table. displayValue: String. Display name of the table that contains answer records. value: String. Internal name of the table that contains answer records. Format: JSON
     */
    getDecisionTable(decisionID: String): Object;

    /**
     * Returns the decision inputs from the Decision Inputs [sys_decision_input] table associated with the passed in decision table.
     * 
     * @decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
     * @example
     * var dt = new sn_dt.DecisionTableAPI();
     * var response = dt.getInputs("3c4464a7b701230034d1da23ee11a993");
     * gs.print(JSON.stringify(response));
     * 
     * @returns Decision inputs from the Decision Inputs [sys_decision_input] table associated with the decision table. You can find the inputs associated with a decision table using the Decision Inputs related list in the Decision Tables [sys_decision] table. Inputs contain these key-value pairs. searchField: String. Used for internal purposes. defaultValue: String. Default value for the input. show_ref_finder: Boolean. Used for internal purposes. use_dependent: Boolean. Used for internal purposes. type: String. Input data type. mandatory: Boolean. True if the input is mandatory; otherwise false. extended: Boolean. True if the input extends another field; otherwise false. local: Boolean. Used for internal purposes. sys_class_name: String. Used for internal purposes. reference: String. Reference table used if the input type is reference. dependent_on: String. Field that document ID and choice inputs depend on. data_structure: String. Used for internal purposes. readonly: Boolean. True if the input is read-only; otherwise false. id: String. Sys ID of the input from the Decision Inputs [sys_decision_input] table. type_label: String. Input data type label. table: String. Reference field table if the input type is reference. order: Number. Order in which the system evaluates inputs. ref_qual: String. Condition applied to the reference table. reference_display: String. Used for internal purposes. choiceOption: String. Method for users to see a list of suggested values. label: String. Label of the input record. hint: String. Hint text used to help users understand the input required. name: String. Internal name of the input record. attributes: Array. Field attributes that apply to the input record. maxsize: Number. Maximum number of characters allowed in the field. columnName: String. Name of the input. Format: JSON
     */
    getInputs(decisionID: String): Object;

    /**
     * Returns the decisions from the Decision [sys_decision_question] table associated with the passed in decision table.
     * 
     * @decisionID Sys ID of the Decision Table record from the Decision Tables [sys_decision] table.
     * @example
     * var dt = new sn_dt.DecisionTableAPI();
     * var response = dt.getQuestions("3c4464a7b701230034d1da23ee11a993");
     * gs.print(JSON.stringify(response));
     * 
     * @returns Decisions from the Decision [sys_decision_question] table associated with the decision table. You can find the decisions associated with a decision table using the Decisions related list in the Decision Tables [sys_decision] table. Decision records contain these key-value pairs. defaultAnswer: Boolean. True if this decision is the default for the decision table; otherwise false. condition: String. Conditions required to reach this decision. The fields available for the condition are the decision inputs that are associated with this decision table. answer: Object. Answer record associated with the decision. Answer objects contain these key-value pairs. valid: Boolean. True if the record exists in the system; otherwise false. label: String. Answer record label. value: String. Sys ID of the answer record. table: String. Table containing the answer record. decisionTable: String. Sys ID of the decision table from the Decision Tables [sys_decision] table associated with the decision. domain: String. Domain in which the decision is visible. active: Boolean. True if the decision record is active; otherwise false. id: String. Sys ID of the decision record from the Decision [sys_decision_question] table. label: String. Label for the decision record. order: Number. Order in which the system evaluates decisions. Format: JSON
     */
    getQuestions(decisionID: String): Object;

}


declare namespace sn_discovery {

    /**
     * The methods of the DiscoveryAPI - Scoped class launch a quick Discovery of a single IPv4 address and return summaries of previously launched Discovery statuses for a single CI or for all scanned CIs. 
     * 
     * 
     */
    declare class DiscoveryAPI {



        /**
         * Used to discover a single IPv4 address.A MID Server is selected automatically, based on the IP address provided or the application specified. The following exceptions can be thrown during MID Server selection: NoSuitableMidServerFoundException: No appropriate MID Server available for this Discovery BadArgumentException: Invalid argument detected during MID Server selection Table 1. Parameters Name Type Description IP address string IP address to discover. application string Application configured for the MID Server. source string (Optional) Source of the Discovery, displayed in the optional Source field in the Discovery Status record, which indicates how the Discovery was triggered. If no source is specified, the system uses Discovery_API as the source. To define a source, you must have an application value. If no application is defined, use a place holder of NULL in the expression. 
         * 
         * @IPaddress IP address to discover.
         * @application Application configured for the MID Server.
         * @source (Optional) Source of the Discovery, displayed in the optional Source field in the Discovery Status record, which indicates how the Discovery was triggered. If no source is specified, the system uses Discovery_API as the source. To define a source, you must have an application value. If no application is defined, use a place holder of NULL in the expression.
         * @example
         * var sysid =
         *                     sn_discovery.DiscoveryAPI.discoverIpAddress("11.23.125.39");
         * @returns Discovery status record sys_id.
         */
        discoverIpAddress(IPaddress: string, application: string, source: string): string;

        /**
         * Used to return a summary of a configuration item's Discovery status given the specific status sys_id and IPv4 address.The following exceptions can be thrown: DiscoveryStatusNotFoundException: Displays this message: Discovery Status with sys id '&lt;invalid value&gt;' does not exist DiscoveryDeviceHistoryNotFoundException: Device History with Discovery Status sys id '&lt;invalid value&gt;' and ipAddress '&lt;invalid value&gt;' does not exist IllegalArgumentException (invalid input arguments): This argument exception prevents input values from being null. Discovery Status sys id can not be null ipAddress can not be null IllegalArgumentException (values stored in database): This argument exception prevents erroneous data from being returned to the caller in the case of bad attribute values. Discovery Status 'state' property can not be null Device history 'source' property can not be null Device history 'issues' property is not an integer: &lt;invalid value&gt; Device history 'issues' property can not be less than 0: &lt;invalid value&gt; 
         * 
         * @ipAddress The IPv4 address that was scanned.
         * @discoveryStatusSysId The sys_id of the Discovery status record for the IP address that was scanned.
         * @example
         * var ipResultObj = sn_discovery.DiscoveryAPI.reportCiIpAddressStatus(ipAddress, discoveryStatus);
         * 
         * @returns JavaScript array of immutable ReportCiStatusOutputJS objects.
         */
        reportCiIpAddressStatus(ipAddress: string, discoveryStatusSysId: string): array;

        /**
         * Used to return a summary of a CI Discovery status given a specific Discovery Status sys_id.The following exceptions can be thrown: DiscoveryStatusNotFoundException: Discovery Status with sys id '&lt;invalid value&gt;' does not exist DiscoveryDeviceHistoryNotFoundException: Device History with Discovery Status sys id '&lt;invalid value&gt;' and ipAddress '&lt;invalid value&gt;' does not exist IllegalArgumentException (invalid input arguments): This argument exception prevents input values from being null. Discovery Status sys id can not be null ipAddress can not be null IllegalArgumentException (values stored in database): This argument exception imposes post conditions on database access values. Discovery Status 'state' property can not be null Device history 'source' property can not be null Device history 'issues' property is not an integer: &lt;invalid value&gt; Device history 'issues' property can not be less than 0: &lt;invalid value&gt; 
         * 
         * @sys_id The sys_id of a Discovery status record.
         * @example
         * var ipResultObjArray = sn_discovery.DiscoveryAPI.reportCiStatus(discoveryStatus);
         * for(var idx=0; idx &lt; ipResultObjArray.length; idx++) {    
         * var ipResultObj = ipResultObjArray[idx]; 
         * @returns JavaScript array of immutable ReportCiStatusOutputJS objects.
         */
        reportCiStatus(sys_id: string): array;

    }

}/**
 * The DynamicTranslation API provides methods that translate text, in real time, into multiple languages using translation service providers. In addition, you can use this API to detect the language of a specific string and check whether the getDetectedLanguage() and getTranslation() methods are enabled for a translation service. Use this API to create a seamless localization experience for your user interface, enabling one interface to service multiple countries. * * Currently this API supports two translation service providers: Microsoft Azure Translator Service and IBM Watson Translator Service. You can also configure other translation services within your instance and then use the DynamicTranslation API to translate your text. * * When using these methods in a server-side script, use the sn_dt_api namespace identifier. Before you are able to use this API, you must activate the DynamicTranslation plugin. For information on this plugin and additional information on Dynamic Translation, refer to Dynamic translation overview.
 * 
 * 
 */
declare class DynamicTranslation {



    /**
     * Detects the language of the passed in text.If you pass in a translator, the method uses that translation service to detect the source language. Otherwise, the detection is performed by the default translation service. Ensure that the text you provide contains enough verbiage to enable proper language detection.In addition to the detected language, the response contains a confidence level of the detection, along with other possible language alternatives. If a translator is not passed in, the method also returns the default translation service used to detect the language.
     * 
     * @text Text to use to detect the language.
     * @parms Optional. JSON object that contains additional translation parameters.
     * @parmstranslator Optional. Translation service to use to translate the text (not case-sensitive).Valid values: Microsoft IBM &lt;custom&gt; Note: To use custom translation services you must first configure the translation service in your instance. For details, see Integrate with a translation service provider. Default: translation service configured in the Translator Configuration [sn_dt_translator_configuration] table.
     * @example
     * var detectedResponse = sn_dt_api.DynamicTranslation.getDetectedLanguage('Please detect the language of this text', {"translator":'IBM'});
     *  gs.print(JSON.stringify(detectedResponse));
     * 
     * @example
     * var detectedResponse = sn_dt_api.DynamicTranslation.getDetectedLanguage('Please detect the language of this text', {"translator":123});
     *  gs.print(JSON.stringify(detectedResponse));
     * 
     * @returns JSON object containing the results of the language detection. detectedLanguage: Object. Parameters describing the detected language. code: String. Language code of the detected language. confidence: String. Float value indicating the confidence level of the detected language result. Value is between zero and one. The lower the value, the lower the confidence level. name: String. Language code of the detected language. alternatives: Object. Description of other languages that also may be a match. code: String. Language code of the alternative language. confidence: String. Float value indicating the confidence level of the alternative language. Value is between zero and one. The lower the value, the lower the confidence level. name: String. Language code of the alternative language. translator: String. Translation service used to detect the language. For example: { "detectedLanguage": { "code": "en", "confidence": "1", "name": "en" }, "alternatives": [ { "code": "vi", "confidence": "0.86", "name": "vi" }, { "code": "id", "confidence": "0.86", "name": "id" } ], "translator": "Microsoft"} 
     */
    getDetectedLanguage(text: String, parms: Object, parmstranslator: String): Object;

    /**
     * Translates the passed in text to one or more languages.The method uses translation services, such as Microsoft Azure Translator Service and IBM Watson Translator Service, to perform the translation. If you do not pass in translation parameters, the method uses the system default.
     * 
     * @textToTranslate Text to translate.
     * @parms Optional. JSON object that contains additional translation parameters.
     * @parmstargetLanguages Optional. List of language codes to use to translate the text. The method returns translated text for each language code.Default: User preferred language.
     * @parmstranslator Optional. Translation service to use to translate the text (not case-sensitive).Valid values: Microsoft IBM &lt;custom&gt; Note: To use custom translation services you must first configure the translation service in your instance. For details, see Integrate with a translation service provider. Default: translation service configured in the Translator Configuration [sn_dt_translator_configuration] table.
     * @parmssourceLanguage Optional. Language code of the source text.Default: Translation service detects the source language.
     * @parmsadditionalParameters Optional. Array of JSON objects. Each object contains key-value pairs that provide additional information for performing the translation.
     * @parmsadditionalParameters[]parameterName Key name.Valid values: textype: Type of text to translate. For Microsoft Azure Translation Service only. 
     * @parmsadditionalParameters[]parameterValue Value of the associated key.Valid values: plain: Standard text string html: HTML text string Default: plain
     * @example
     * try {
     *     gs.print(JSON.stringify(sn_dt_api.DynamicTranslation.getTranslation("Translate this text using platform from server", {
     *         "targetLanguages": ["fr", "it"],
     *         "additionalParameters": [{
     *             "parameterName": "texttype",
     *             "parameterValue": "plain"
     *         }],
     *         "translator": "Microsoft"
     *     })));
     * } catch (error) {
     *     gs.print(error.message);
     * }
     * 
     * @example
     * try {
     *     gs.print(JSON.stringify(sn_dt_api.DynamicTranslation.getTranslation("Translate this text using platform from server", {
     *         "targetLanguages": ["123"],
     *         "additionalParameters": [{
     *             "parameterName": "texttype",
     *             "parameterValue": "plain"
     *         }],
     *         "translator": "Microsoft"
     *     })));
     * } catch (error) {
     *     gs.print(error.message);
     * }
     * @returns Results of the text translation. translations: Object. Language translations. targetLanguage: String. Language code to which the source text was translated. translatedText: String. Translated text. translator: String. Translation service used to translate the text. detectedLanguage: Object. Detected language code of the source text. Returned only if the source language code is not passed in. code: String. Language code of the detected language. name: String. Language code of the detected language. For example: {"translations":[ { "targetLanguage":"it", "translatedText":"Tradurre questo testo utilizzando la piattaforma dal server" }, { "targetLanguage":"fr", "translatedText":"Traduire ce texte en utilisant la plate-forme à partir du serveur" } ], "translator":"Microsoft", "detectedLanguage":{"code":"en","name":"en"}
     * }
     */
    getTranslation(textToTranslate: String, parms: Object, parmstargetLanguages: Array<any>, parmstranslator: String, parmssourceLanguage: String, parmsadditionalParameters: Object, parmsadditionalParameters[]parameterName: String, parmsadditionalParameters[]parameterValue: String): Object;

    /**
     * Determines whether the getDetectedLanguage() and getTranslation() methods are enabled for a translation service.If you pass in a specific translation service, the API checks the method activation for that translation service; otherwise the method checks the default translation service.
     * 
     * @translator Optional. Translation service to verify whether the methods are active. Translation services are configured under the Translator Configuration menu.Possible values - not case-sensitive: Microsoft IBM &lt;custom&gt; Note: To use custom translation services you must first configure the translation service in your instance. For details, see Integrate with a translation service provider. 
     * @example
     * IsIBMTranslatorEnabled : function() {
     *   try {
     *     var response = sn_dt_api.DynamicTranslation.isEnabled('ibm');
     *      gs.print(JSON.stringify(response));
     * } catch(error) {
     * gs.print(error.message);
     * }
     * @example
     * IsIBMTranslatorEnabled : function() {
     *   try {
     *     var response = sn_dt_api.DynamicTranslation.isEnabled(123);
     *      gs.print(JSON.stringify(response));
     * } catch(error) {
     * gs.print(error.message);
     * }
     * @returns Results of the detection. detection: Boolean. Flag that indicates whether getDetectedLanguage() method is enabled. translation: Boolean. Flag that indicates whether the getTranslation() method is enabled. 
     */
    isEnabled(translator: String): Object;

}


declare namespace sn_fd {

    /**
     * Runs activated Flow Designer flows. The Flow API can only be used in server scripts. * * Use the sn_fd namespace to access the Flow API. * * Before interacting with a flow using the Flow API, you must first create and activate the flow in the Flow Designer interface. Because the Flow API only interacts with pre-built flows, there is no constructor for the class. * * This API is deprecated and replaced by the FlowAPI
     * 
     * 
     */
    declare class Flow {



        /**
         * Ignores the trigger and runs an activated flow asynchronously.Asynchronous calls are non-blocking, allowing the client to execute other code in the script without having to wait for the flow to complete.
         * 
         * @scopeNameflowName The application scope for the flow and the internal name of the flow to run. If scopeName is not included, the scope of the user currently logged in is used. Retrieve the internal name of the flow using the Internal name column on the Flow Designer landing page.
         * @flowInputs Name-value pairs in &lt;String, Object&gt; format that define record-based flow inputs.To call a flow with a record-based trigger, use the format:var flowInputs = {};
         * flowInputs['current'] = glideRecord;
         * flowInputs['table_name'] = glideRecord.getTableName(); The GlideRecord object must be named 'current'.
         * To call a flow with a Service Catalog trigger, use the format:var flowInputs = {};
         * flowInputs['request_item'] = glideRecord;
         * flowInputs['table_name'] = glideRecord.getTableName(); The GlideRecord object must be named 'request_item'.
         * @example
         * //Example 1: Run a flow with a record-based trigger
         * (function startFlowAsync() {
         * 
         * 	try {
         * 		// You MUST fetch the GlideRecord that will be passed to the flow
         * 		var glideRecordInput = new GlideRecord('sys_user');
         * 		glideRecordInput.get('62826bf03710200044e0bfc8bcbe5df1');
         * 
         * 		var flowInputs = {};
         * 		flowInputs['current'] = glideRecordInput;
         * 		flowInputs['table_name'] = glideRecordInput.getTableName();
         * 
         * 		var result = sn_fd.Flow.startAsync('global.recordtriggeredflow', flowInputs);
         * 
         * 		//The Sys ID of a flow execution (contextId)
         * 		var contextId = result.contextId;
         * 
         * 	} catch (ex) {
         * 		var message = ex.getMessage();
         * 		gs.error(message);
         * 	}
         * 
         * })();
         * 
         * //Example 2: Run a flow with a schedule-based trigger
         * (function startFlowAsync() {
         * 
         * 	try {
         * 		var result = sn_fd.Flow.startAsync('global.scheduletriggeredflow');
         * 
         * 		//The Sys ID of a flow execution (contextId)
         * 		var contextId = result.contextId;
         * 
         * 	} catch (ex) {
         * 		var message = ex.getMessage();
         * 		gs.error(message);
         * 	}
         * 
         * })();
         * 
         * //Example 3: Run a flow with a Service Catalog trigger
         * (function startFlowAsync() {
         * 
         * 	try {
         * 		// You MUST fetch the GlideRecord that will be passed to the flow
         * 		var glideRecordInput = new GlideRecord('sc_req_item');
         * 		glideRecordInput.get(aeed229047801200e0ef563dbb9a71c2);
         * 
         * 		var flowInputs = {};
         * 		flowInputs['request_item'] = glideRecordInput;
         * 		flowInputs['table_name'] = glideRecordInput.getTableName();
         * 
         * 		var result = sn_fd.Flow.startAsync('global.catalogtriggeredflow', flowInputs);
         * 
         * 		//The Sys ID of a flow execution (contextId)
         * 		var contextId = result.contextId;
         * 
         * 	} catch (ex) {
         * 		var message = ex.getMessage();
         * 		gs.error(message);
         * 	}
         * 
         * })();
         * 
         * //Example 4: Run a flow with a MetricBase trigger
         * (function startMetricBaseFlowAsync() {
         * 
         * 	try {
         * 
         * 		var oilLevelTriggerRecord = new GlideRecord('oil_levels');
         * 		oilLevelTriggerRecord.get('a4b3622bc72113007b237f48cb97635f');
         * 
         * 		var metricTriggerDefinition = new GlideRecord('sys_metric_trigger_definition');
         * 		metricTriggerDefinition.get('21f2eae7c72113007b237f48cb976352');
         * 
         * 		var event_time = oilLevelTriggerRecord.getValue('sys_created_on');
         * 		var level = 4;
         * 
         * 		var metricBaseFlowInputs = {};
         * 		//The record that triggered the metric event
         * 		metricBaseFlowInputs['current'] = oilLevelTriggerRecord;
         * 		//The MetricBase Trigger Definition record
         * 		metricBaseFlowInputs['metric'] = metricTriggerDefinition;
         * 		//The time that the 'record' reached a specific metric event level and triggered this flow
         * 		metricBaseFlowInputs['event_time'] = event_time;
         * 		//The target event level to reach in order for a metric flow to trigger
         * 		metricBaseFlowInputs['level'] = level;
         * 
         * 		var result = sn_fd.Flow.startAsync('global.metricbasedtriggeredflow', metricBaseFlowInputs);
         * 
         * 		//The Sys ID of a flow execution (contextId)
         * 		var contextId = result.contextId;
         * 
         * 	} catch (ex) {
         * 		var message = ex.getMessage();
         * 		gs.error(message);
         * 	}
         * 
         * })();
         * @returns PlanResponse object containing the following properties: contextId: sys_id of the execution details record for the executed flow. Access the execution details by navigating to the Flow Executions tab in Flow Designer and filtering by sys_id. An exception occurs when the flow: Does not exist within the specified application scope, or the flow or scope name has been misspelled. Is not activated. Exceeds the recursion limit set by the com.glide.hub.flow_engine.indirect_recursion_limit system property. The default value is three. 
         */
        startAsync(scopeNameflowName: String, flowInputs: Object): Object;

    }

}/**
 * Use FlowAPI methods to execute actions, flows, or subflows in server-side scripts using either blocking or non-blocking methods. Access FlowAPI methods in global and scoped scripts using the sn_fd.FlowAPI object. Create calls to your flows using the Code Snippet action in Flow Designer, or use the methods detailed here to update scripts manually. * * Note: In domain separated instances, flows, subflows, and actions triggered by this API run in the domain of the user who started the script. For example, if a user in the Acme domain starts a script that triggers a flow, the flow runs in the Acme domain and can only access Acme data, even if the flow runs as the System User. 
 * 
 * 
 */
declare class FlowAPI {



    /**
     * Run an action from a server-side script synchronously.Execute an action from within a business rule, script include, or any other server-side script. Actions run using this method run synchronously, so the method has access to outputs created by the action. Use startAction to run an action asynchronously.
     * 
     * @name The scope and name of the action to be executed, for example global.action_name.
     * @inputs Name-value pairs that define action inputs. Use the input name, not the input label.
     * @timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
     * @example
     * 
     * (function() {
     * 	
     * 	try {
     * 		var inputs = {};
     * 		inputs['name'] = ; // String 
     * 		inputs['password2'] = ; // Password (2 Way Encrypted) 
     * 		
     * 		// Execute Synchronously: Run in foreground. Code snippet has access to outputs.
     * 		// var timeout = ; //timeout in ms
     *               //sn_fd.FlowAPI.executeAction('global.actionforpassword2test', inputs, timeout)
     *               var outputs = sn_fd.FlowAPI.executeAction('global.actionforpassword2test', inputs);
     * 
     * 		// Get Outputs:
     * 		// Note: outputs can only be retrieved when executing synchronously.
     * 		var output = outputs['output']; // Password (2 Way Encrypted)
     * 		
     * 	} catch (ex) {
     * 		var message = ex.getMessage();
     * 		gs.error(message);
     * 	}	
     * })();
     * @returns The action outputs.
     */
    executeAction(name: String, inputs: Object, timeout: Number): Object;

    /**
     * Run an action from a server-side script synchronously from the current user session without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.Note: Execution details and context records are not created, regardless of Flow Designer settings.
     * 
     * @name Scope and internal name of the action to execute. For example, global.action_name. Locate the Internal name field in the list of Flow Designer actions.
     * @inputs Name-value pairs that define action inputs. You can find the available action inputs and required data types under Inputs in the action outline. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
     * @timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
     * @example
     * (function() {
     *   try {
     * 
     *     var grIncident = new GlideRecord('incident');
     *     grIncident.get('57af7aec73d423002728660c4cf6a71c');
     * 
     *     var inputs = {};
     *     inputs['variable'] = grIncident;
     * 
     *     var outputs = sn_fd.FlowAPI.executeActionQuick('global.update_record_test', inputs);
     * 
     *     // Get Outputs:
     *     // Note: outputs can only be retrieved when executing synchronously.
     *     var output1 = outputs['output1']; 
     * 
     *   } catch (ex) { 
     *     var message = ex.getMessage();
     *     gs.error(message);
     *     }
     * 	
     * })();
     * @returns Object containing outputs defined by the action. You can find the outputs for the action under Outputs in the action outline.
     */
    executeActionQuick(name: String, inputs: Object, timeout: Number): Object;

    /**
     * Run a flow from a server-side script synchronously.Execute a flow from within a business rule, script include, or any other server-side script. Flows run using this method run synchronously. Use startFlow to run a flow asynchronously.
     * 
     * @name The scope and name of the flow to be executed, for example global.flow_name.
     * @inputs Name-value pairs that define trigger inputs. Use the input name, not the input label.
     * @timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
     * @example
     * 
     * (function() {
     * 	try {
     * 		var inputs = {};
     * 		inputs['current'] = ; // GlideRecord of table:  
     * 		inputs['table_name'] = 'incident';
     * 
     *               // Execute Synchronously: Run in foreground.
     *               // var timeout = ; //timeout in ms
     *               //sn_fd.FlowAPI.executeFlow('global.test_flow', inputs, timeout)
     *               sn_fd.FlowAPI.executeFlow('global.test_flow', inputs);
     * 	} catch (ex) {
     * 		var message = ex.getMessage();
     * 		gs.error(message);
     * 	}
     * })();
     * @returns  
     */
    executeFlow(name: String, inputs: Object, timeout: Number): None;

    /**
     * Run a flow, subflow, or action from a server-side script synchronously or asynchronously without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.This method runs the flow as the user who initiates the session. Setting the flow to run as the system user, or impersonating a user, is not supported. Flows that include wait conditions, for instance the Wait for a duration of time flow logic or Ask For Approval action, are not supported.Note: Execution details and context records are not created, regardless of Flow Designer settings.
     * 
     * @name Scope and internal name of the flow to execute. For example, global.flow_name. Locate the Internal name field in the list of Flow Designer flows.
     * @inputs Name-value pairs that define trigger inputs. You can find the available trigger inputs and required data types in the Trigger section of the flow. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
     * @timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
     * @example
     * (function() {
     * 	
     *   try {
     *     var grIncident = new GlideRecord('incident');
     *     grIncident.get('ed92e8d173d023002728660c4cf6a7bc');
     * 
     *     var inputs = {};
     *     inputs['current'] = grIncident;
     *     inputs['table_name'] = 'incident';
     * 		
     *     sn_fd.FlowAPI.executeFlowQuick('global.test_quick_flow', inputs);
     * 		
     *   } catch (ex) {
     *     var message = ex.getMessage();
     *     gs.error(message);
     * 	}
     * 	
     * })();
     */
    executeFlowQuick(name: String, inputs: Object, timeout: Number);

    /**
     * Run an subflow from a server-side script synchronously.Execute a subflow from within a business rule, script include, or any other server-side script. Subflows run using this method run synchronously. Use startSubflow to run an subflow asynchronously.
     * 
     * @name The scope and name of the subflow to be executed, for example global.subflow_name.
     * @inputs Name-value pairs that define subflow inputs. Use the input name, not the input label.
     * @timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
     * @example
     * 
     * (function() {
     * 	
     * 	try {
     * 		var inputs = {};
     * 		inputs['name'] = ; // String 
     * 		inputs['password2'] = ; // Password (2 Way Encrypted) 
     * 		
     * 		// Execute Synchronously: Run in foreground.
     * 		// var timeout = ; //timeout in ms
     *               //sn_fd.FlowAPI.executeSubflow('global.subflowTest', inputs, timeout)
     *               var outputs = sn_fd.FlowAPI.executeSubflow('global.subflowTest', inputs);
     * 		
     * 	} catch (ex) {
     * 		var message = ex.getMessage();
     * 		gs.error(message);
     * 	}	
     * })();
     * @returns Object containing the subflow outputs.
     */
    executeSubflow(name: String, inputs: Object, timeout: Number): Object;

    /**
     * Run a subflow from a server-side script synchronously from the current user session without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.This method runs the subflow as the user who initiates the session. Setting the subflow to run as the System User, or impersonating a user, is not applied. Subflows that include wait conditions, for instance the Wait for a duration of time flow logic or Ask For Approval action, are not supported.Note: Execution details and context records are not created, regardless of Flow Designer settings.
     * 
     * @name Scope and internal name of the subflow to execute. For example, global.subflow_name. Locate the Internal name field in the list of Flow Designer subflows.
     * @inputs Name-value pairs that define subflow inputs. You can find the available subflow inputs and required data types under Inputs in the subflow. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
     * @timeout Optional. Timeout in milliseconds. This value overrides the 30 second default timeout specified by the com.glide.hub.flow_api.default_execution_time system property. After the timeout expires, an exception is thrown.
     * @example
     * (function() {
     * 
     *   try {
     *     var grIncident = new GlideRecord('incident');
     *     grIncident.get('57af7aec73d423002728660c4cf6a71c');
     * 
     *     var inputs = {};
     *     inputs['variable'] = grIncident;
     * 
     *     var outputs = sn_fd.FlowAPI.executeSubflowQuick('global.test_quick_run_subflow', inputs);
     * 
     *     // Get Outputs:
     *     // Note: outputs can only be retrieved when executing synchronously.
     *     var output1 = outputs['output1']; 
     * 		
     *   } catch (ex) {
     *     var message = ex.getMessage();
     *     gs.error(message);
     *     }
     * 	
     * })();
     * @returns Object containing outputs defined by the subflow. You can find the outputs for the subflow under Subflow Inputs &amp; Outputs in the subflow outline.
     */
    executeSubflowQuick(name: String, inputs: Object, timeout: Number): Object;

    /**
     * Build password2 values inside a script step.Identify an encrypted password2 value returned from a GlideRecord, enabling the system to display the value as a masked password rather than an encrypted string.
     * 
     * @password Encrypted password2 value.
     * @example
     * 
     * (function execute(inputs, outputs) {
     * 	// ...code...
     * 	var gr = new GlideRecord('sys_user');
     * 	gr.addQuery('first_name' , 'Abel');
     * 	gr.query();
     * 	gr.next();
     * 	var pwVal = gr.getValue('pw2');
     * 	outputs['usedSetEncrypted'] = sn_fd.GlideActionUtil.setEncryptedOutput(pwVal);
     * 	outputs['justSetDirectly'] = pwVal;
     * })(inputs, outputs);
     * @returns Encrypted password2 value, recognised by the engine as a password value.
     */
    setEncryptedOutput(password: String): String;

    /**
     * Run an action from a server-side script asynchronously.Execute an action from within a business rule, script include, or any other server-side script. Actions run using this method run asynchronously, and scripts using this method does not have access to any outputs created by the action. Use executeAction to run an action synchronously and access the outputs it generates.
     * 
     * @name The scope and name of the action to be executed, for example global.action_name.
     * @inputs Name-value pairs that define action inputs. Use the input name, not the input label.
     * @example
     * 
     * (function() {
     * 	try {
     * 		var inputs = {};
     * 		inputs['ah_task'] = myTaskRecord; // GlideRecord of table: task 
     * 		inputs['ah_comment'] ='Test Comment' ; // String 
     * 		sn_fd.FlowAPI.startAction('sn_itsm_spoke.add_comment', inputs);				
     * 	} catch (ex) {
     * 		var message = ex.getMessage();
     * 		gs.error(message);
     * 	}
     * })();
     */
    startAction(name: String, inputs: Object);

    /**
     * Run an action from a server-side script asynchronously without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.Note: Execution details and context records are not created, regardless of Flow Designer settings.
     * 
     * @name Scope and internal name of the action to execute. For example, global.action_name. Locate the Internal name field in the list of Flow Designer actions.
     * @inputs Name-value pairs that define action inputs. You can find the available action inputs and required data types under Inputs in the action outline. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
     * @example
     * (function() {
     * 	
     *   try {
     *     var grIncident = new GlideRecord('incident');
     *     grIncident.get('57af7aec73d423002728660c4cf6a71c');
     * 
     *     var inputs = {};
     *     inputs['variable'] = grIncident;
     * 
     *     sn_fd.FlowAPI.startActionQuick('global.update_record_test', inputs);
     * 
     *   } catch (ex) {
     *     var message = ex.getMessage();
     *     gs.error(message);
     *     }
     * 	
     * })();
     */
    startActionQuick(name: String, inputs: Object);

    /**
     * Run a flow from a server-side script.Execute a flow from within a business rule, script include, or any other server-side script. Flows executed with this method run asynchronously.
     * 
     * @name The scope and name of the flow to be executed, for example global.flow_name.
     * @inputs Name-value pairs that define trigger inputs. Use the input name, not the input label.
     * @example
     * 
     * (function() {
     * 	try {
     * 		var inputs = {};
     * 		inputs['current'] = ; // GlideRecord of table:  
     * 		inputs['table_name'] = 'incident';
     * 
     * 		sn_fd.FlowAPI.startFlow('global.test_flow', inputs);		
     * 	} catch (ex) {
     * 		var message = ex.getMessage();
     * 		gs.error(message);
     * 	}
     * })();
     */
    startFlow(name: String, inputs: Object);

    /**
     * Run a flow from a server-side script asynchronously without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.This method runs the flow as the System User. Setting the flow to run as the user who initiates the session, or impersonating a user, is not applied. Flows that include wait conditions, for instance the Wait for a duration of time flow logic or Ask For Approval action, are not supported.Note: Execution details and context records are not created, regardless of Flow Designer settings.
     * 
     * @name Scope and internal name of the flow to execute. For example, global.flow_name. Locate the Internal name field in the list of Flow Designer flows.
     * @inputs Name-value pairs that define trigger inputs. You can find the available trigger inputs and required data types in the Trigger section of the flow. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
     * @example
     * (function() {
     * 	
     *   try {
     *     var grIncident = new GlideRecord('incident');
     *     grIncident.get('ed92e8d173d023002728660c4cf6a7bc');
     * 
     *     var inputs = {};
     *     inputs['current'] = grIncident;
     *     inputs['table_name'] = 'incident';
     * 		
     *     sn_fd.FlowAPI.startFlowQuick('global.test_quick_flow', inputs);
     * 		
     *   } catch (ex) {
     *     var message = ex.getMessage();
     *     gs.error(message);
     * 	}
     * 	
     * })();
     */
    startFlowQuick(name: String, inputs: Object);

    /**
     * Run a subflow from a server-side script.Execute a subflow from within a business rule, script include, or any other server-side script. Subflows run using this method run asynchronously Scripts that include this method do not have access to outputs created by the flow. Use executeSubflow to run a subflow synchronously and access the outputs it generates.
     * 
     * @name The scope and name of the subflow to be executed, for example global.subflow_name.
     * @inputs Name-value pairs that define subflow inputs. Use the input name, not the input label.
     * @example
     * (function() {
     * 	try {
     * 		var inputs = {};
     * 		inputs['ah_task'] = myTaskRecord; // GlideRecord of table: task 
     * 		inputs['ah_comment'] ='Test Comment' ; // String 
     * 		sn_fd.FlowAPI.startSubflow('global.test_subflow', inputs);
     * 	} catch (ex) {
     * 		var message = ex.getMessage();
     * 		gs.error(message);
     * 	}
     * 	
     * })();
     */
    startSubflow(name: String, inputs: Object);

    /**
     * Run a subflow from a server-side script asynchronously without creating execution details or other related records. Improve performance by eliminating record-keeping overhead. Use this API to increase the speed of high-volume processing, for example multiple executions per second, in a production environment.This method runs the subflow as the System User. Setting the subflow to run as the user who initiates the session, or impersonating a user, is not applied. Subflows that include wait conditions, for instance the Wait for a duration of time flow logic or Ask For Approval action, are not supported.Note: Execution details and context records are not created, regardless of Flow Designer settings.
     * 
     * @name Scope and internal name of the subflow to execute. For example, global.subflow_name. Locate the Internal name field in the list of Flow Designer subflows.
     * @inputs Name-value pairs that define subflow inputs. You can find the available subflow inputs and required data types under Inputs in the subflow. Use the input name, not the input label. For example, {'table':'incident','sys_id':'a39d8e3cf0212300964feeefe80ff0ed'}.
     * @example
     * (function() {
     * 
     *   try {
     *     var grIncident = new GlideRecord('incident');
     *     grIncident.get('57af7aec73d423002728660c4cf6a71c');
     * 
     *     var inputs = {};
     *     inputs['variable'] = grIncident;
     * 
     *     sn_fd.FlowAPI.startSubflowQuick('global.test_quick_run_subflow', inputs);
     * 
     *   } catch (ex) {
     *     var message = ex.getMessage();  
     *     gs.error(message);
     *     }
     * 	
     * })();
     */
    startSubflowQuick(name: String, inputs: Object);

}

/**
 * GlideAggregate enables you to easily create database aggregation queries. The scoped GlideAggregate class is an extension of GlideRecord and provides database aggregation (COUNT, SUM, MIN, MAX, AVG) queries. This functionality can be helpful when creating customized reports or in calculations for calculated fields. The GlideAggregate class works only on number fields. * * When you use GlideAggregate on currency or price fields, you are working with the reference currency value. Be sure to convert the aggregate values to the user's session currency for display. Because the conversion rate between the currency or price value (displayed value) and its reference currency value (aggregation value) might change, the result may not be what the user expects. * * Note: When using an on-premise system, the database server time zone must be set to GMT/UTC for this class to work properly.
 * 
 * 
 */
declare class GlideAggregate {



    /**
     * Creates a GlideAggregate object on the specified table.
     * 
     * @tableName Name of the table.
     * @example
     * var count = new GlideAggregate('incident');
     */
    constructor(tableName: String);

    /**
     * Adds an aggregate.
     * 
     * @agg Name of the aggregate to add, for example, COUNT, MIN, or MAX
     * @name (Optional) Name of the column to aggregate. Null is the default.
     * @example
     * var count = new GlideAggregate('incident');
     * count.addAggregate('COUNT');
     * count.query();
     * var incidents = 0;
     * if (count.next()) {
     *    incidents = count.getAggregate('COUNT');
     * }
     * //Number of incidents varies depending on the current state
     * //of the incident table
     * gs.info('Number of incidents: ' + incidents);
     */
    addAggregate(agg: String, name: String);

    /**
     * Adds an encoded query to the other queries that may have been set for this aggregate.
     * 
     * @query An encoded query to add to the aggregate.
     * @example
     * //Number of incidents varies depending on the current state
     * //of the incident table
     * var count = new GlideAggregate('incident');
     * count.addEncodedQuery('active=true');
     * count.addAggregate('COUNT');
     * count.query();
     * var incidents = 0;
     * if (count.next())
     *    incidents = count.getAggregate('COUNT');
     * gs.info(incidents);
     */
    addEncodedQuery(query: String);

    /**
     * Adds a not null query to the aggregate.
     * 
     * @fieldname The name of the field.
     * @example
     * var count = new GlideAggregate('incident');
     *   count.addNotNullQuery('short_description');
     *   count.query();   // Issue the query to the database to get all records
     *   while (count.next()) {   
     *      // add code here to process the aggregate
     *   }
     * @returns The scoped query condition.
     */
    addNotNullQuery(fieldname: String): GlideQueryCondition;

    /**
     * Adds a null query to the aggregate.
     * 
     * @fieldName The name of the field.
     * @example
     * var count = new GlideAggregate('incident');
     *   count.addNullQuery('short_description');
     *   count.query();   // Issue the query to the database to get all records
     *   while (count.next()) {   
     *      // add code here to process the aggregate
     *   }
     * @returns The scoped query condition.
     */
    addNullQuery(fieldName: String): GlideQueryCondition;

    /**
     * Adds a query to the aggregate.
     * 
     * @name The query to add.
     * @operator The operator for the query.
     * @value The list of values to include in the query.
     * @example
     * //Number of incidents varies depending on the current state
     * //of the incident table
     * var count = new GlideAggregate('incident');
     * count.addQuery('active', '=','true');
     * count.addAggregate('COUNT', 'category');
     * count.query();  
     * while (count.next()) {
     *    var category = count.category;
     *    var categoryCount = count.getAggregate('COUNT', 'category');
     *    gs.info("There are currently " + categoryCount + " incidents with a category of " + category);
     * }
     * @returns The query condition.
     */
    addQuery(name: String, operator: String, value: String): GlideQueryCondition;

    /**
     * Adds a trend for a field.
     * 
     * @fieldName The name of the field for which trending should occur.
     * @timeInterval The time interval for the trend. The following choices are available: Year, Quarter, Date, Week, DayOfWeek, Hour, Value.
     */
    addTrend(fieldName: String, timeInterval: String);

    /**
     * Gets the value of an aggregate from the current record.
     * 
     * @agg The type of the aggregate, for example, SUM or Count.
     * @name Name of the field to get the aggregate from.
     * @example
     * var count = new GlideAggregate('incident');
     * count.addAggregate('COUNT');
     * count.query();
     * var incidents = 0;
     * if (count.next()) {
     *    incidents = count.getAggregate('COUNT');
     * }
     * //Number of incidents varies depending on the current state
     * //of the incident table
     * gs.info('Number of incidents: ' + incidents);
     * @returns The value of the aggregate.
     */
    getAggregate(agg: String, name: String): String;

    /**
     * Gets the query necessary to return the current aggregate.
     * 
     * @example
     * var count = new GlideAggregate('incident');
     * count.addAggregate('MIN', 'sys_mod_count');
     * count.groupBy('category');
     * count.query();  
     * while (count.next()) {
     *     gs.info(count.getAggregateEncodedQuery());
     * }
     * @returns The encoded query to get the aggregate.
     */
    getAggregateEncodedQuery(): String;

    /**
     * Retrieves the encoded query.
     * 
     * @example
     * var count = new GlideAggregate('incident');
     * count.addAggregate('MIN', 'sys_mod_count');
     * count.addAggregate('MAX', 'sys_mod_count');
     * count.addAggregate('AVG', 'sys_mod_count');
     * count.groupBy('category');
     * count.query();
     * gs.info(count.getEncodedQuery());
     * @returns The encoded query.
     */
    getEncodedQuery(): String;

    /**
     * Retrieves the number of rows in the GlideAggregate object.
     * 
     * @example
     * var count = new GlideAggregate('incident');
     *   count.addAggregate('MIN', 'sys_mod_count');
     *   count.addAggregate('MAX', 'sys_mod_count');
     *   count.addAggregate('AVG', 'sys_mod_count');
     *   count.groupBy('category');
     *   count.query();
     *   gs.info(count.getRowCount());
     *   while (count.next()) {  
     *      var min = count.getAggregate('MIN', 'sys_mod_count');
     *      var max = count.getAggregate('MAX', 'sys_mod_count');
     *      var avg = count.getAggregate('AVG', 'sys_mod_count');
     *      var category = count.category.getDisplayValue();
     *      gs.info(category + " Update counts: MIN = " + min + " MAX = " + max + " AVG = " + avg);
     *   }
     * @returns The number of rows in the GlideAggregate object.
     */
    getRowCount(): Number;

    /**
     * Retrieves the table name associated with this GlideAggregate object.
     * 
     * @example
     * var count = new GlideAggregate('incident');
     * count.addAggregate('MIN', 'sys_mod_count');
     * count.addAggregate('MAX', 'sys_mod_count');
     * count.addAggregate('AVG', 'sys_mod_count');
     * count.groupBy('category');
     * count.query();
     * gs.info(count.getTableName());
     * @returns The table name.
     */
    getTableName(): String;

    /**
     * Gets the value of a field.
     * 
     * @name The name of the field.
     * @example
     * var count = new GlideAggregate('incident');
     *   count.addAggregate('MIN', 'sys_mod_count');
     *   count.addAggregate('MAX', 'sys_mod_count');
     *   count.addAggregate('AVG', 'sys_mod_count');
     *   count.groupBy('category');
     *   count.query();   
     *   while (count.next()) {  
     *      var min = count.getAggregate('MIN', 'sys_mod_count');
     *      var max = count.getAggregate('MAX', 'sys_mod_count');
     *      var avg = count.getAggregate('AVG', 'sys_mod_count');
     *      var category = count.category.getDisplayValue();
     *   }
     * gs.info("Current category is: " + count.getValue('category'));
     * @returns The value of the field.
     */
    getValue(name: String): String;

    /**
     * Provides the name of a field to use in grouping the aggregates.May be called numerous times to set multiple group fields.
     * 
     * @name Name of the field.
     * @example
     * var count = new GlideAggregate('incident');
     * count.addAggregate('MIN', 'sys_mod_count');
     * count.addAggregate('MAX', 'sys_mod_count');
     * count.addAggregate('AVG', 'sys_mod_count');
     * count.groupBy('category');
     * count.query();   
     * while (count.next()) {  
     *      var min = count.getAggregate('MIN', 'sys_mod_count');
     *      var max = count.getAggregate('MAX', 'sys_mod_count');
     *      var avg = count.getAggregate('AVG', 'sys_mod_count');
     *      var category = count.category.getDisplayValue();
     *      gs.info(category + " Update counts: MIN = " + min + " MAX = " + max + " AVG = " + avg);
     * }
     */
    groupBy(name: String);

    /**
     * Determines if there are any more records in the GlideAggregate object.
     * 
     * @example
     * var agg = new GlideAggregate('incident');
     * agg.addAggregate('AVG', 'sys_mod_count');
     * agg.groupBy('category');
     * agg.query();
     * while (agg.hasNext()) {
     *     agg.next();
     *     var avg = agg.getAggregate('AVG', 'sys_mod_count');
     *     var category = agg.category.getDisplayValue();
     *     gs.info(category + ': AVG = ' + avg);
     * }
     * @returns True if there are more results in the query set.
     */
    hasNext(): Boolean;

    /**
     * Moves to the next record in the GlideAggregate.
     * 
     * @example
     * var count = new GlideAggregate('incident');
     * count.addAggregate('COUNT');
     * count.query();
     * var incidents = 0;
     * if (count.next()) {
     *    incidents = count.getAggregate('COUNT');
     *    gs.info(incidents);
     * }
     * @returns True if there are more records in the query set; otherwise, false.
     */
    next(): Boolean;

    /**
     * Orders the aggregates using the value of the specified field. The field will also be added to the group-by list.
     * 
     * @name Name of the field to order the aggregates by.
     * @example
     * var agg = new GlideAggregate('incident');
     * agg.addAggregate('count', 'category'); 
     * agg.orderBy('category'); 
     * agg.query(); 
     * while (agg.next()) { 
     *   var category = agg.category;
     *   var count = agg.getAggregate('count', 'category');
     *   var agg2 = new GlideAggregate('incident');   
     *   agg2.addAggregate('count', 'category');
     *   agg2.orderBy('category');
     *   gs.info(category + ": Current number of incidents:" + count);
     * }
     */
    orderBy(name: String);

    /**
     * Orders the aggregates based on the specified aggregate and field.
     * 
     * @agg Type of aggregation.
     * @fieldName Name of the field to aggregate.
     * @example
     * ga.addAggregate(‘COUNT’, ‘category’);
     *  
     * ga.orderByAggregate('count', 'category');
     *  
     * ga.query();
     *  
     * while(ga.next()) {
     *   gs.info(‘Category ’ + ga.category + ‘ ‘ + ga.getAggregate(‘COUNT’, ‘category’));
     *   }
     */
    orderByAggregate(agg: String, fieldName: String);

    /**
     * Sorts the aggregates in descending order based on the specified field. The field will also be added to the group-by list.
     * 
     * @name Name of the field.
     * @example
     * var agg = new GlideAggregate('incident');
     * agg.addAggregate('count', 'category'); 
     * agg.orderByDesc('category'); 
     * agg.query(); 
     * while (agg.next()) { 
     *   var category = agg.category;
     *   var count = agg.getAggregate('count', 'category');
     *   var agg2 = new GlideAggregate('incident');   
     *   agg2.addAggregate('count', 'category');
     *   agg2.orderBy('category');
     *   gs.info(category + ": Current number of incidents:" + count);
     * }
     */
    orderByDesc(name: String);

    /**
     * Issues the query and gets the results.
     * 
     * @example
     * var count = new GlideAggregate('incident');
     * count.addAggregate('COUNT');
     * count.query();
     * var incidents = 0;
     * if (count.next()) {
     *    incidents = count.getAggregate('COUNT');
     * }
     * gs.info('Number of incidents: ' + incidents);
     */
    query();

    /**
     * Sets whether the results are to be grouped.
     * 
     * @b When true the results are grouped.
     * @example
     * var ga = new GlideAggregate('incident');
     * ga.addAggregate('COUNT', 'category');
     *  
     * ga.setGroup(true);
     * ga.groupBy("category");
     *  
     * ga.query();
     *  
     * while(ga.next()) {
     *   gs.info('Category ' + ga.category + ' ' + ga.getAggregate('COUNT', 'category'));
     *   }
     */
    setGroup(b: Boolean);

}

/**
 * The GlideCalendarDateTime class provides methods for performing operations on GlideCalendarDateTime objects, such as instantiating GlideCalendarDateTime objects or working with glide_date_time fields. Use the GlideCalendarDateTime methods to perform date-time operations, such as instantiating a GlideCalendarDateTime object, performing date-time calculations, formatting a date-time, or converting between date-time formats.
 * 
 * 
 */
declare class GlideCalendarDateTime {



    /**
     * Instantiates a new GlideCalendarDateTime object from a date and time value in the UTC time zone specified with the format yyyy-MM-dd HH:mm:ss.
     * 
     * @dateTime UTC date and time using the format yyyy-MM-dd HH:mm:ss.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-01-01 12:00:00");
     */
    constructor(dateTime: String);

    /**
     * Instantiates a new GlideCalendarDateTime object set to the time of a specified GlideCalendarDateTime object in GMT format.
     * 
     * @gcDT Object used to set the time of the new object.
     * @example
     * var start = new GlideCalendarDateTime("2011-01-01 12:00:00");
     * var end = new GlideCalendarDateTime(start);
     * gs.print(end);
     */
    constructor(gcDT: GlideCalendarDateTime);

    /**
     * Instantiates a new GlideCalendarDateTime object with the current date and time in GMT format.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime();
     */
    constructor();

    /**
     * Adds a GlideTime object to the current GlideCalendarDateTime object.
     * 
     * @time Time to add.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * var gtime1 = new GlideTime();
     * gtime1.setValue("00:00:20");
     * gcdt.add(gtime1);
     * gs.print(gcdt.getTime());
     */
    add(time: GlideTime);

    /**
     * Adds a specified number of milliseconds to the GlideCalendarDateTime object.
     * 
     * @milliseconds Number of milliseconds to add
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getNumericValue());
     * gcdt.add(10);
     * gs.print(gcdt.getNumericValue());
     */
    add(milliseconds: Number);

    /**
     * Adds a specified number of days to the current GlideCalendarDateTime object. A negative parameter subtracts days.Use addDaysLocalTime() and addDaysUTC() instead of this method.
     * 
     * @days Number of days to add. Use a negative number to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gcdt.addDays(-1);
     * gs.print(gcdt.getDate());
     */
    addDays(days: Number);

    /**
     * Adds a specified number of days to the current GlideCalendarDateTime object. A negative parameter subtracts days.The method determines the local date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts days using the local date and time values.
     * 
     * @days Number of days to add. Use a negative value to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gcdt.addDaysLocalTime(-1);
     * gs.print(gcdt.getLocalDate());
     */
    addDaysLocalTime(days: Number);

    /**
     * Adds a specified number of days to the current GlideCalendarDateTime object. A negative parameter subtracts days.The method determines the UTC date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts days using the UTC date and time values.
     * 
     * @days Number of days to add. Use a negative value to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gcdt.addDaysUTC(-1);
     * gs.print(gcdt.getDate());
     */
    addDaysUTC(days: Number);

    /**
     * Adds a specified number of months to the current GlideCalendarDateTime object. A negative parameter subtracts months.Use addMonthsLocalTime() or addMonthsUTC() instead of this method.
     * 
     * @months Number of months to add. Use a negative number to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gcdt.addMonths(2);
     * gs.print(gcdt.getDate());
     */
    addMonths(months: Number);

    /**
     * Adds a specified number of months to the current GlideCalendarDateTime object. A negative parameter subtracts months.The method determines the local date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts months using the local date and time values.
     * 
     * @months Number of months to add. Use a negative value to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gcdt.addMonthsLocalTime(2);
     * gs.print(gcdt.getDate());
     */
    addMonthsLocalTime(months: Number);

    /**
     * Adds a specified number of months to the current GlideCalendarDateTime object. A negative parameter subtracts months.The method determines the UTC date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts months using the UTC date and time values.
     * 
     * @months Number of months to add. Use a negative number to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gcdt.addMonthsUTC(2);
     * gs.print(gcdt.getDate());
     */
    addMonthsUTC(months: Number);

    /**
     * Adds a specified number of seconds to the GlideCalendarDateTime object.
     * 
     * @seconds Number of seconds to add
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-12-07 08:00:00");
     * gcdt.addSeconds(1000);
     * gs.print(gcdt.getValue());
     */
    addSeconds(seconds: Number);

    /**
     * Adds a specified number of weeks to the current GlideCalendarDateTime object. A negative parameter subtracts weeks.Use addWeeksLocalTime() and addWeeksUTC() instead of this method.
     * 
     * @weeks Number of weeks to add. Use a negative number to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gcdt.addWeeks(-1);
     * gs.print(gcdt.getDate());
     */
    addWeeks(weeks: Number);

    /**
     * Adds a specified number of weeks to the current GlideCalendarDateTime object. A negative parameter subtracts weeks.The method determines the local date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts weeks using the local date and time values.
     * 
     * @weeks Number of weeks to add. Use a negative number to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gcdt.addWeeksLocalTime(-1);
     * gs.print(gcdt.getDate());
     */
    addWeeksLocalTime(weeks: Number);

    /**
     * Adds a specified number of weeks to the current GlideCalendarDateTime object. A negative parameter subtracts weeks.The method determines the UTC date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts weeks using the UTC date and time values.
     * 
     * @weeks Number of weeks to add. Use a negative number to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gcdt.addWeeksUTC(-1);
     * gs.print(gcdt.getDate());
     */
    addWeeksUTC(weeks: Number);

    /**
     * Adds a specified number of years to the current GlideCalendarDateTime object. A negative parameter subtracts years.Use addYearsLocalTime() or addYearsUTC() instead of this method.
     * 
     * @years Number of years to add. Use a negative value to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2010-08-31 08:00:00");
     * gcdt.addYears(1);
     * gs.print(gcdt.getDate());
     */
    addYears(years: Number);

    /**
     * Adds a specified number of years to the current GlideCalendarDateTime object. A negative parameter subtracts years.The method determines the local date and time equivalent to the value stored by the GlideCalendarDateTime object, then adds or subtracts years using the local date and time values.
     * 
     * @years Number of years to add. To subtract use a negative value.
     * @example
     * var gcdt = new GlideCalendarDateTime("2010-08-31 08:00:00");
     * gcdt.addYearsLocalTime(1);
     * gs.print(gcdt.getDate());
     */
    addYearsLocalTime(years: Number);

    /**
     * Adds a specified number of years to the current GlideCalendarDateTime object. A negative parameter subtracts years.The date and time value stored by GlideCalendarDateTime object is interpreted as being in the UTC time zone.
     * 
     * @years Number of years to add. Use a negative value to subtract.
     * @example
     * var gcdt = new GlideCalendarDateTime("2010-08-31 08:00:00");
     * gcdt.addYearsUTC(1);
     * gs.print(gcdt.getDate());
     */
    addYearsUTC(years: Number);

    /**
     * Compares two date and time objects to determine whether one occurs before the other or if they are equivalent.
     * 
     * @dateTime Date time in a GlideCalendarDateTime object
     * @example
     * var initDate = new GlideCalendarDateTime("2011-08-01 12:00:00");
     * var compDate1 = new GlideCalendarDateTime("2011-08-01 12:00:00");
     * var compDate2 = new GlideCalendarDateTime("2011-07-31 12:00:00");
     * var compDate3 = new GlideCalendarDateTime("2011-08-04 16:00:00");
     *  
     * gs.info(initDate.compareTo(compDate1)); // Equals (0)
     * gs.info(initDate.compareTo(compDate2)); // initDate is after compDate2 (1)
     * gs.info(initDate.compareTo(compDate3)); // initDate is before compDate3 (-1)
     * @returns  0 = Dates are equal 1 = Object's date is after the date specified in the parameter -1 = Object's date is before the date specified in the parameter 
     */
    compareTo(dateTime: Object): Number;

    /**
     * Compares an object with an existing value for equality.
     * 
     * @GCDT Object to compare. Can be a GlideCalendarDateTime object or a valid date time string.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 00:00:00");
     * gs.print(gcdt.equals("2011-09-30 00:12:01"));
     * @returns True if they are equal, false otherwise.
     */
    equals(GCDT: Object): Boolean;

    /**
     * Returns the date stored by the GlideCalendarDateTime object, expressed in the standard format, yyyy-MM-dd, and the system time zone, UTC by default.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getDate());
     * @returns Date in the system time zone.
     */
    getDate(): GlideDate;

    /**
     * Returns the current day of the month in the UTC time zone.Use getDayOfMonthLocalTime() and getDayOfMonthUTC() instead of this method.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-12-02 12:00:00");
     * gs.print(gcdt.getDayOfMonth());
     * @returns Day of the month in the UTC time zone, from 1 to 31.
     */
    getDayOfMonth(): Number;

    /**
     * Returns the day of the month stored by the GlideCalendarDateTime object, expressed in the current user's time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-12-02 12:00:00");
     * gs.print(gcdt.getDayOfMonthLocalTime());
     * @returns Day of the month in the user's time zone, from 1 to 31.
     */
    getDayOfMonthLocalTime(): Number;

    /**
     * Gets the day of the month stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-12-02 12:00:00");
     * gs.print(gcdt.getDayOfMonthUTC());
     * @returns Day of the month in the UTC time zone, from 1 to 31.
     */
    getDayOfMonthUTC(): Number;

    /**
     * Retrieves the day of the week stored by the GlideCalendarDateTime object, expressed in the user's time zone.Use getDayOfWeekLocalTime() and getDayOfWeekUTC() instead of this method.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-12-01 12:00:00");
     * gs.print(gcdt.getDayOfWeek());
     * @returns Day of the week value - Monday = 1, ... Sunday = 7.
     */
    getDayOfWeek(): Number;

    /**
     * Returns the day of the week stored by the GlideCalendarDateTime object, expressed in the user's time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-12-01 12:00:00");
     * gs.print(gcdt.getDayOfWeekLocalTime());
     * @returns Day of the week value - Monday = 1, ... Sunday = 7
     */
    getDayOfWeekLocalTime(): Number;

    /**
     * Returns the day of the week stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-12-01 12:00:00");
     * gs.print(gcdt.getDayOfWeekUTC());
     * @returns Day of the week value - Monday = 1, ... Sunday = 7
     */
    getDayOfWeekUTC(): Number;

    /**
     * Gets the number of days in the month stored by the GlideCalendarDateTime object, expressed in the Java Virtual Machine time zone.Use getDaysInMonthLocalTime() and getDaysInMonthUTC() instead of this method.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime(); //December
     * gs.print(gcdt.getDaysInMonth());
     * @returns Number of days in the current month in the Java Virtual Machine time zone.
     */
    getDaysInMonth(): Number;

    /**
     * Returns the number of days in the month stored by the GlideCalendarDateTime object, expressed in the current user's time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime(); //December
     * gs.print(gcdt.getDaysInMonthLocalTime());
     * @returns Number of days in the current month in the user's time zone.
     */
    getDaysInMonthLocalTime(): Number;

    /**
     * Returns the number of days in the month stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime(); //December
     * gs.print(gcdt.getDaysInMonthUTC());
     * @returns Number of days in the month stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
     */
    getDaysInMonthUTC(): Number;

    /**
     * Returns the date and time value in the current user's display format and time zone. Referring to the GlideCalendarDateTime object directly returns the date and time value in the GMT time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getDisplayValue());
     * @returns Date and time in the user's format and time zone. Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
     */
    getDisplayValue(): String;

    /**
     * Returns the display value in the internal format (yyyy-MM-dd HH:mm:ss).This method is useful for date/time fields, but not for date fields.
     * 
     * @example
     * // Wednesday
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getDisplayValueInternal());
     * @returns Date and time values for the GlideCalendarDateTime object in the current user's time zone and the internal date and time format of yyyy-MM-dd HH:mm:ss.
     */
    getDisplayValueInternal(): String;

    /**
     * Returns the amount of time that daylight saving time is offset.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getDSTOffset());
     * @returns Amount of time, in milliseconds, that daylight saving is offset. Returns 0 if there is no offset or if the time is not during daylight saving time.
     */
    getDSTOffset(): Number;

    /**
     * Returns the current error message.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 aa:00:00"); //bad
     * gs.print(gcdt.isValid()); //false
     * gs.print(gcdt.getErrorMsg()); //reason
     * @returns Error message
     */
    getErrorMsg(): String;

    /**
     * Returns the calendar date/time value in the user or system time zone based on the value specified in the Time zone field of the corresponding Business Calendar record.Note: The Start and End fields in the Business Calendar Entry [business_calendar_span] table contain an attribute time_zone_field that is set to the value in the Time zone field (calendar.time_zone). For details on creating a business calendar and setting the time zone value, see Create a business calendar.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2018-08-31 08:00:00");
     * gs.print(gcdt.getFloatingValue());
     * @returns Date and time in the internal format and time zone based on the Time zone field of the corresponding Business Calendar record. Floating: User time zone Any other value: System time zone 
     */
    getFloatingValue(): String;

    /**
     * Returns the object's time in the local time zone and in the internal format.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getInternalFormatedLocalTime());
     * @returns Object's time in the local time zone and the internal format.
     */
    getInternalFormattedLocalTime(): String;

    /**
     * Returns a date and time object set to midnight of a specified day using UTC.
     * 
     * @dayOfTheWeek Day of the week for which to return the date/time object.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getInternalMidnight(2));
     * @returns A GlideCalendarDateTime object set to midnight.
     */
    getInternalMidnight(dayOfTheWeek: Number): GlideCalendarDateTime;

    /**
     * Returns the date stored by the GlideCalendarDateTime object, expressed in the standard format, yyyy-MM-dd, and the current user's time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getLocalDate());
     * @returns Date in the user's time zone.
     */
    getLocalDate(): GlideDate;

    /**
     * Returns the time in the user's time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getLocalTime());
     * @returns Time in the user's time zone.
     */
    getLocalTime(): GlideTime;

    /**
     * Retrieves the month stored by the GlideCalendarDateTime object, expressed in Java Virtual Machine time zone.Use getMonthLocalTime() and getMonthUTC() instead of this method.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime(); //December
     * gs.print(gcdt.getMonth());
     * @returns Numerical value of the month, Jan=1, Dec=12.
     */
    getMonth(): Number;

    /**
     * Returns the month stored by the GlideCalendarDateTime object, expressed in the current user's time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime(); //December
     * gs.print(gcdt.getMonthLocalTime());
     * @returns Numerical value of the month, Jan=1, Dec=12.
     */
    getMonthLocalTime(): Number;

    /**
     * Returns the month stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime(); //December
     * gs.print(gcdt.getMonthUTC());
     * @returns Numerical value of the month, Jan=1, Dec=12.
     */
    getMonthUTC(): Number;

    /**
     * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getNumericValue());
     * @returns Number of milliseconds since January 1, 1970, 00:00:00 GMT.
     */
    getNumericValue(): Number;

    /**
     * Retrieves the amount of time elapsed since the midnight of a specified day to the current time.
     * 
     * @dayOfWeek Day of week value from 1 to 7. 1 = Monday, 7=Sunday.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00"); //Wednesday
     * var dur = new GlideDuration();
     *  
     * var span = gcdt.getSpanTime(1); //how much time since Monday 00:00:00
     * dur.setValue(span);
     * gs.print(dur.getDisplayValue());
     * @returns Amount of time elapsed since midnight of the specified day. To display the result in user-friendly terms, set the value to GlideDuration.
     */
    getSpanTime(dayOfWeek: Number): GlideTime;

    /**
     * Returns the Unix duration stamp.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getTime());
     * @returns Unix duration stamp in system format based on GMT time.
     */
    getTime(): GlideTime;

    /**
     * Returns the time zone offset in milliseconds.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.getLocalTime(); // PST local time
     * gs.print(gcdt.getTZOffset());
     * @returns Number of milliseconds of the time zone offset
     */
    getTZOffset(): Number;

    /**
     * Returns the object's time in local time zone in the user's format.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getUserFormatedLocalTime());
     * @returns Object's time in local time and the user's format.
     */
    getUserFormattedLocalTime(): String;

    /**
     * Retrieves the time zone for the current user session.This method is equivalent to gs.getSession().getTimeZone().
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getUserTimeZone());
     * @returns TimeZone object for the current user.
     */
    getUserTimeZone(): TimeZone;

    /**
     * Retrieves a GlideCalendarDateTime object with the time set to midnight using the UTC time zone.This method sets the date of the new GlideCalendarDateTime object as the specified day of the week within the week of the original GlideCalendarDateTime object.
     * 
     * @dayOfTheWeek Day of the week, from 1 to 7. Monday=1, Sunday=7. Do not enter 0 in this parameter.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00"); // Wednesday, 3rd day of the week.
     * gs.print(gcdt.getUTCMidnight(5)); //Friday, 5th day of the week.
     * @returns New GlideCalendarDateTime object, set to midnight.
     */
    getUTCMidnight(dayOfTheWeek: Number): GlideCalendarDateTime;

    /**
     * Returns the date and time value stored by the GlideCalendarDateTime object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone; UTC by default.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.getValue());
     * @returns Date and time in the internal format and system time zone.
     */
    getValue(): String;

    /**
     * Returns the number of the week stored by the GlideCalendarDateTime object, expressed in the current user's time zone.All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-12-01 12:00:00");
     * gs.print(gcdt.getWeekOfYearUTC());
     * @returns Number of the current week. The highest week number in a year is either 52 or 53.
     */
    getWeekOfYearLocalTime(): Number;

    /**
     * Returns the number of the week stored by the GlideCalendarDateTime object, expressed in the UTC time zone.All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-12-01 12:00:00");
     * gs.print(gcdt.getWeekOfYearUTC());
     * @returns Number of the current week in UTC time. The highest week number in a year is either 52 or 53.
     */
    getWeekOfYearUTC(): Number;

    /**
     * Retrieves the year stored by the GlideCalendarDateTime object, expressed in the Java Virtual Machine time zone.Use getYearLocalTime() and getYearUTC() instead of this method.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime(); //2011
     * gs.print(gcdt.getYear());
     * @returns Four-digit year value in the Java Virtual Machine time zone.
     */
    getYear(): Number;

    /**
     * Returns the year stored by the GlideCalendarDateTime object, expressed in the current user's time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime(); //2011
     * gs.print(gcdt.getYearLocalTime());
     * @returns Four-digit year value in the user's time zone.
     */
    getYearLocalTime(): Number;

    /**
     * Returns the year stored by the GlideCalendarDateTime object, expressed in the UTC time zone.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime(); //2011
     * gs.print(gcdt.getYearUTC());
     * @returns Four-digit year value in the UTC time zone.
     */
    getYearUTC(): number;

    /**
     * Determines if an object's date is set.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.hasDate());
     * @returns True if the object's date is set, false otherwise.
     */
    hasDate(): Boolean;

    /**
     * Determines if the object's time uses a daylight saving offset
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 00:00:00");
     * gs.print(gcdt.isDST()); //true
     * @returns True if the time is daylight saving time, false otherwise.
     */
    isDST(): Boolean;

    /**
     * Determines if a value is a valid date and time.
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 aa:00:00"); //bad
     * gs.print(gcdt.isValid()); //false
     * @returns True if value is valid, false otherwise.
     */
    isValid(): Boolean;

    /**
     * Sets the day of the month to a specified value.Use setDayOfMonthLocalTime(day) and setDayOfMonthUTC(day) instead of this method.
     * 
     * @day Day of the month, from 1 to 31.
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setDayOfMonth(9);
     * gs.print(gcdt.getDayOfMonth());
     */
    setDayOfMonth(day: Number);

    /**
     * Sets the day of the month to a specified value in the current user's time zone.
     * 
     * @day Day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last day of the month.
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setDayOfMonthLocalTime(9);
     * gs.print(gcdt.getDayOfMonthLocalTime());
     */
    setDayOfMonthLocalTime(day: Number);

    /**
     * Sets the day of the month to a specified value in the UTC time zone.
     * 
     * @day Day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last day of the month.
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setDayOfMonthUTC(9);
     * gs.print(gcdt.getDayOfMonthUTC());
     */
    setDayOfMonthUTC(day: Number);

    /**
     * Sets a date and time value using the current user's display format and time zone.
     * 
     * @asDisplayed Date and time in the current user's display format and time zone. The parameter must be formatted using the current user's preferred display format, such as MM-dd-yyyy HH:mm:ss.
     * To assign the current date and time to a variable in a workflow script, use &lt;variable&gt;.setDisplayValue(gs.nowDateTime);.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-02-02 12:00:00");
     * gcdt.setDisplayValue("2011-01-01 12:00:00");
     * gs.print(gcdt.getValue());
     */
    setDisplayValue(asDisplayed: String);

    /**
     * Sets a date and time value using the current user's time zone and the specified date and time format.This method throws a runtime exception if the date and time format in the dateTime parameter does not match the format parameter. You can retrieve the error message by calling getErrorMsg() on the GlideCalendarDateTime object after the exception is caught.
     * 
     * @dateTime Date and time in the current user's time zone.
     * @format Format to use to parse the dateTime parameter.
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-02-02 12:00:00");
     * gcdt.setDisplayValue("20-5-2011 12:00:00", "dd-MM-yyyy HH:mm:ss");
     * gs.print(gcdt.getValue());
     */
    setDisplayValue(dateTime: String, format: String);

    /**
     * Sets a date and time value using the internal format (yyyy-MM-dd HH:mm:ss) and the current user's time zone.
     * 
     * @dateTime Date and time in internal format
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-02-02 12:00:00");
     * gcdt.setDisplayValueInternal("2011-01-01 12:00:00");
     * gs.print(gcdt.getValue());
     */
    setDisplayValueInternal(dateTime: String);

    /**
     * Sets a date and time value using the internal format (yyyy-MM-dd HH:mm:ss) and the current user's time zone.This method attempts to parse incomplete date and time values.
     * 
     * @dateTime Date and time in internal format.
     */
    setDisplayValueInternalWithAlternates(dateTime: String);

    /**
     * Sets the date and time of the current object using an existing GlideCalendarDateTime object.This method is equivalent to instantiating a new object with a GlideCalendarDateTime parameter.
     * 
     * @gcDT GlideCalendarDateTime object
     * @example
     * var dt1 = new GlideCalendarDateTime("2011-01-01 12:00:00");
     * var dt2 = new GlideCalendarDateTime("2011-02-02 08:00:00");
     * dt1.setGlideCalendarDateTime(dt2);
     * gs.print(dt1.getValue());
     */
    setGlideCalendarDateTime(gcDT: GlideCalendarDateTime);

    /**
     * Sets the date and time.This method is equivalent to setValue(Object).
     * 
     * @dateTime Date and time to use. Accepts either a string in the GMT time zone in the internal format, or a GlideCalendarDateTime object.
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setInitialValue("2011-01-01 12:00:00");
     * gs.print(gcdt.getValue());
     */
    setInitialValue(dateTime: String);

    /**
     * Sets the month stored by the GlideCalendarDateTime object to a specified value using the Java Virtual Machine time zone.Use setMonthLocalTime() or setMonthUTC() instead of this method.
     * 
     * @month Month to change to.
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setMonth(1);
     * gs.print(gcdt.getMonth());
     */
    setMonth(month: Number);

    /**
     * Sets the month stored by the GlideCalendarDateTime object to a specified value using the current user's time zone.
     * 
     * @month Month to change to.
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setMonthLocalTime(1);
     * gs.print(gcdt.getMonthLocalTime());
     */
    setMonthLocalTime(month: Number);

    /**
     * Sets the month stored by the GlideCalendarDateTime object to a specified value using the UTC time zone.
     * 
     * @month Month to change to.
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setMonthUTC(1);
     * gs.print(gcdt.getMonthUTC());
     */
    setMonthUTC(month: Number);

    /**
     * Sets the date and time to the number of milliseconds since January 1, 1970 00:00:00 GMT.
     * 
     * @milliseconds Number of milliseconds
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setNumericValue(1314777600000);
     * gs.print(gcdt.getValue());
     */
    setNumericValue(milliseconds: Number);

    /**
     * Sets the time zone of the GlideCalendarDateTime object to be the specified time zone.
     * 
     * @timeZone Time zone object
     * @example
     * var tz = gs.getSession().getTimeZone();
     * var gcdt = new GlideCalendarDateTime(); 
     * gcdt.setTZ(tz);
     */
    setTZ(timeZone: TimeZone);

    /**
     * Sets the date and time of the GlideCalendarDateTime object.This method is equivalent to setInitialValue().
     * 
     * @dateTime Date and time to use. This parameter may be one of several types. A string in the UTC time zone and the internal format of yyyy-MM-dd HH:mm:ss: sets the value of the object to the specified date and time. Using the method this way is equivalent to instantiating a new GlideCalendarDateTime object using the GlideCalendarDateTime(value) constructor. If the date and time format used does not match the internal format, the method attempts to set the date and time using other available formats. Resolving the date and time this way can lead to inaccurate data due to ambiguity in the day and month values. When using a non-standard date and time format, use setValue(dt, format) instead. A GlideCalendarDateTime object: sets the value of the object to the date and time stored by the GlideCalendarDateTime passed in the parameter. Using the method this way is equivalent to instantiating a new GlideCalendarDateTime object using the GlideCalendarDateTime(g) constructor. A Java Date object: sets the value of the object using the value stored by the Java Date object. Using the method this way is equivalent to passing the value returned by the Java Date object getTime() to the GlideCalendarDateTime setNumericValue() method. This method does not accept JavaScript Date objects. A JavaScript Number: sets the value of the object using the Number value as milliseconds past January 1, 1970 00:00:00 GMT. Using the method this way is equivalent to the setNumericValue(milliseconds) method. A Java Integer or Long: sets the value of the object using the Integer or Long value as milliseconds past January 1, 1970 00:00:00 GMT. Using the method this way is equivalent to the setNumericValue(milliseconds) method. 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-01-01 12:00:00");
     * gcdt.setValue("2011-02-02 08:00:00");
     * gs.print(gcdt.getValue());
     */
    setValue(dateTime: Object);

    /**
     * Sets a date and time value using the UTC time zone and the specified date and time format.This method throws a runtime exception if the date and time format used in the dateTime parameter does not match the format parameter. You can retrieve the error message by calling getErrorMsg() on the GlideCalendarDateTime object after the exception is caught.
     * 
     * @dateTime Date and time to use
     * @format Format to use
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-01-01 12:00:00");
     * gcdt.setValueUTC("15-02-2011 08:00:00", "dd-MM-yyyy HH:mm:ss");
     * gs.print(gcdt.getValue());
     */
    setValueUTC(dateTime: String, format: String);

    /**
     * Sets the year stored by the GlideCalendarDateTime object to a specified value using the Java Virtual Machine time zone.Use setYearLocalTime() or setYearUTC() instead of this method.
     * 
     * @year Year to change to.
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setYear(2013);
     * gs.print(gcdt.getYear());
     */
    setYear(year: Number);

    /**
     * Sets the year stored by the GlideCalendarDateTime object to a specified value using the current user's time zone.
     * 
     * @year Year to change to.
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setYearLocalTime(2013);
     * gs.print(gcdt.getYearLocalTime());
     */
    setYearLocalTime(year: Number);

    /**
     * Sets the year stored by the GlideCalendarDateTime object to a specified value using the UTC time zone.
     * 
     * @year Year to change to.
     * @example
     * var gcdt = new GlideCalendarDateTime();
     * gcdt.setYearUTC(2013);
     * gs.print(gcdt.getYearUTC());
     */
    setYearUTC(year: Number);

    /**
     * Returns the duration difference between two GlideCalendarDateTime values.
     * 
     * @start Start value
     * @end End value
     * @example
     * var gcdt1 = new GlideCalendarDateTime("2011-08-28 09:00:00");
     * var gcdt2 = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * var dur = new GlideDuration();
     *  
     * var dur = GlideCalendarDateTime.subtract(gcdt1, gcdt2); //the difference between gcdt1 and gcdt2
     * gs.print(dur.getDisplayValue());
     * @returns Time between the two values
     */
    subtract(start: GlideCalendarDateTime, end: GlideCalendarDateTime): GlideDuration;

    /**
     * Subtracts a specified amount of time.
     * 
     * @time Time to subtract
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * var gtime1 = new GlideTime();
     * gtime1.setValue("00:00:20");
     * gcdt.subtract(gtime1);
     * gs.print(gcdt.getTime());
     */
    subtract(time: GlideTime);

    /**
     * Subtracts a specified number of milliseconds from the GlideCalendarDateTime object.
     * 
     * @milliseconds Number of milliseconds to subtract
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-12-07 08:00:00");
     * gcdt.subtract(1000);
     * gs.print(gcdt.getValue());
     */
    subtract(milliseconds: Number);

    /**
     * Returns the date and time value stored by the GlideCalendarDateTime object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone; UTC by default.This method is equivalent to getValue().
     * 
     * @example
     * var gcdt = new GlideCalendarDateTime("2011-08-31 08:00:00");
     * gs.print(gcdt.toString());
     * @returns Date and time stored by the GlideCalendarDateTime object in the system time zone and format.
     */
    toString(): String;

}

/**
 * The scoped GlideDate class provides methods for performing operations on GlideDate objects, such as instantiating GlideDate objects or working with GlideDate fields. 
 * 
 * 
 */
declare class GlideDate {



    /**
     * Creates a GlideDate object with the current date time.
     * 
     */
    constructor();

    /**
     * Gets the date in the specified date format.
     * 
     * @format the desired date format
     * @example
     * var gd = new GlideDate(); 
     * gd.setValue('2015-01-01');
     * gs.info(gd.getByFormat("dd-MM-yyyy"));
     * @returns the date in the specified format
     */
    getByFormat(format: String): String;

    /**
     * Gets the day of the month stored by the GlideDate object, expressed in the UTC time zone.
     * 
     * @example
     * //Today's date is 2016-05-13 
     * var gd =new GlideDate();
     * gs.info(gd.getDayOfMonthNoTZ());
     * @returns The day of the month in the UTC time zone, from 1 to 31.
     */
    getDayOfMonthNoTZ(): Number;

    /**
     * Gets the date in the current user's display format and time zone.
     * 
     * @example
     * var gd =new GlideDate(); 
     * gd.setValue('2015-01-01');
     * gs.info(gd.getDisplayValue());
     * @returns The date in the user's format and time zone. Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
     */
    getDisplayValue(): String;

    /**
     * Gets the display value in the internal format (yyyy-MM-dd).
     * 
     * @example
     * var gd =new GlideDate(); 
     * gs.info(gd.getDisplayValueInternal());
     * @returns The date values for the GlideDate object in the current user's time zone and the internal time format of yyyy-MM-dd.
     */
    getDisplayValueInternal(): String;

    /**
     * Gets the month stored by the GlideDate object, expressed in the UTC time zone.
     * 
     * @example
     * //Today's date is 2016-05-13
     * var gd =new GlideDate();
     * gs.info(gd.getMonthNoTZ());
     * @returns The numerical value of the month from 1 to 12.
     */
    getMonthNoTZ(): Number;

    /**
     * Gets the date value stored in the database by the GlideDate object in the internal format, yyyy-MM-dd, and the system time zone, UTC by default.
     * 
     * @example
     * var gd =new GlideDate();
     * gd.setValue('2015-01-01');
     * gs.info(gd.getValue());
     * @returns The date value in the internal format and system time zone.
     */
    getValue(): String;

    /**
     * Gets the year stored by the GlideDate object, expressed in the UTC time zone.
     * 
     * @example
     * //Today's date is 2016-05-13
     * var gd =new GlideDate();
     * gs.info(gd.getYearNoTZ());
     * @returns The numerical value of the year.
     */
    getYearNoTZ(): Number;

    /**
     * Sets a date value using the current user's display format and time zone.
     * 
     * @asDisplayed The date in the current user's display format and time zone. The parameter must be formatted using the current user's preferred display format, such as yyyy-MM-dd.
     * @example
     * var gd =new GlideDate();
     * gd.setDisplayValue("2011-01-01");
     * gs.info(gd.getValue());
     */
    setDisplayValue(asDisplayed: String);

    /**
     * Sets the date of the GlideDate object.
     * 
     * @o The date and time to use.
     * @example
     * var gd = new GlideDate(); 
     * gd.setValue('2015-01-01');
     * gs.info(gd.getValue());
     */
    setValue(o: String);

    /**
     * Gets the duration difference between two GlideDate values.
     * 
     * @start The start value.
     * @end The end value.
     * @example
     * var sgd1 = new GlideDate(); 
     * sgd1.setDisplayValue('2014-07-18'); 
     * var sgd2 = new GlideDate(); 
     * sgd2.setDisplayValue('2014-07-19'); 
     *  
     * duration= GlideDate.subtract(sgd1, sgd2); 
     * gs.info(duration.getDisplayValue());
     * @returns The duration between the two values.
     */
    subtract(start: GlideDate, end: GlideDate): GlideDuration;

}

/**
 * The scoped GlideDateTime class provides methods for performing operations on GlideDateTime objects, such as instantiating GlideDateTime objects or working with glide_date_time fields. Use the GlideDateTime methods to perform date-time operations, such as instantiating a GlideDateTime object, performing date-time calculations, formatting a date-time, or converting between date-time formats.
 * 
 * 
 */
declare class GlideDateTime {



    /**
     * Instantiates a new GlideDateTime object from a date and time value in the UTC time zone specified with the format yyyy-MM-dd HH:mm:ss.
     * 
     * @value A UTC date and time using the internal format yyyy-MM-dd HH:mm:ss.
     * @example
     * var gdt = new GlideDateTime("2011-01-01 12:00:00");
     */
    constructor(value: String);

    /**
     * Instantiates a new GlideDateTime object set to the time of the GlideDateTime object passed in the parameter.
     * 
     * @g The GlideDateTime object to use for setting the time of the new object.
     * @example
     * var start = new GlideDateTime("2011-01-01 12:00:00");
     * var end = new GlideDateTime(start);
     * gs.info(end);
     */
    constructor(g: GlideDateTime);

    /**
     * Instantiates a new GlideDateTime object with the current date and time in Greenwich Mean Time (GMT).
     * 
     * @example
     * var gdt = new GlideDateTime();
     */
    constructor();

    /**
     * Adds a GlideTime object to the current GlideDateTime object.
     * 
     * @gd The GlideTime object to add.
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * var gtime1 = new GlideTime();
     * gtime1.setValue("00:00:20");
     * gdt.add(gtime1);
     * var gtime2 = gdt.getTime();
     * gs.info(gtime2.getByFormat('hh:mm:ss'));
     */
    add(gd: GlideTime);

    /**
     * Adds the specified number of milliseconds to the current GlideDateTime object.
     * 
     * @milliseconds The number of milliseconds to add.
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gs.info(gdt.getNumericValue());
     * gdt.add(10);
     * gs.info(gdt.getNumericValue());
     */
    add(milliseconds: Number);

    /**
     * Adds a specified number of days to the current GlideDateTime object. A negative parameter subtracts days. The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts days using the local date and time values.
     * 
     * @days The number of days to add. Use a negative value to subtract.
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gdt.addDaysLocalTime(-1);
     * gs.info(gdt.getLocalDate());
     */
    addDaysLocalTime(days: Number);

    /**
     * Adds a specified number of days to the current GlideDateTime object. A negative parameter subtracts days. The method determines the UTC date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts days using the UTC date and time values.
     * 
     * @days The number of days to add. Use a negative number to subtract.
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gdt.addDaysUTC(-1);
     * gs.info(gdt.getDate());
     */
    addDaysUTC(days: Number);

    /**
     * Adds a specified number of months to the current GlideDateTime object. A negative parameter subtracts months. The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts months using the local date and time values.
     * 
     * @months The number of months to add. use a negative value to subtract.
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gdt.addMonthsLocalTime(2);
     * gs.info(gdt.getDate());
     */
    addMonthsLocalTime(months: Number);

    /**
     * Adds a specified number of months to the current GlideDateTime object. A negative parameter subtracts months. The method determines the UTC date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts months using the UTC date and time values.
     * 
     * @months The number of months to add. Use a negative value to subtract.
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gdt.addMonthsUTC(2);
     * gs.info(gdt.getDate());
     */
    addMonthsUTC(months: Number);

    /**
     * Adds the specified number of seconds to the current GlideDateTime object.
     * 
     * @seconds The number of seconds to add.
     * @example
     * var gdt = new GlideDateTime("2011-12-07 08:00:00");
     * gdt.addSeconds(1000);
     * gs.info(gdt.getValue());
     */
    addSeconds(seconds: Number);

    /**
     * Adds a specified number of weeks to the current GlideDateTime object. A negative parameter subtracts weeks. The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts weeks using the local date and time values.
     * 
     * @weeks The number of weeks to add. Use a negative value to subtract.
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gdt.addWeeksLocalTime(-1);
     * gs.info(gdt.getDate());
     */
    addWeeksLocalTime(weeks: Number);

    /**
     * Adds a specified number of weeks to the current GlideDateTime object. A negative parameter subtracts weeks. The method determines the UTC date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts weeks using the UTC date and time values.
     * 
     * @weeks The number of weeks to add. Use a negative value to subtract.
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gdt.addWeeksUTC(-1);
     * gs.info(gdt.getDate());
     */
    addWeeksUTC(weeks: Number);

    /**
     * Adds a specified number of years to the current GlideDateTime object. A negative parameter subtracts years. The method determines the local date and time equivalent to the value stored by the GlideDateTime object, then adds or subtracts years using the local date and time values.
     * 
     * @years The number of years to add. Use a negative value to subtract.
     * @example
     * var gdt = new GlideDateTime("2010-08-31 08:00:00");
     * gdt.addYearsLocalTime(1);
     * gs.info(gdt.getDate());
     */
    addYearsLocalTime(years: Number);

    /**
     * Adds a specified number of years to the current GlideDateTime object. A negative parameter subtracts years. The date and time value stored by GlideDateTime object is interpreted as being in the UTC time zone.
     * 
     * @years The number of years to add. Use a negative value to subtract.
     * @example
     * var gdt = new GlideDateTime("2010-08-31 08:00:00");
     * gdt.addYearsUTC(1);
     * gs.info(gdt.getDate());
     */
    addYearsUTC(years: Number);

    /**
     * Determines if the GlideDateTime object occurs after the specified GlideDateTime.
     * 
     * @gdt The time to check against.
     * @example
     * var gdt1 = new GlideDateTime("2016-05-09 10:11:12");
     * var gdt2 = new GlideDateTime("2017-06-12 15:11:12");
     * gs.info(gdt1.after(gdt2)); 
     * @returns Returns true if the GlideDateTime object's time is after the time specified by the parameter.
     */
    after(gdt: GlideDateTime): Boolean;

    /**
     * Determines if the GlideDateTime object occurs before the specified GlideDateTime.
     * 
     * @gdt The time to check against.
     * @example
     * var gdt1 = new GlideDateTime("2016-05-09 10:11:12");
     * var gdt2 = new GlideDateTime("2017-06-12 15:11:12");
     * gs.info(gdt1.before(gdt2));  
     * @returns Returns true if the GlideDateTime object's time is before the time specified by the parameter.
     */
    before(gdt: GlideDateTime): Boolean;

    /**
     * Compares two date and time objects to determine whether they are equivalent or one occurs before or after the other.
     * 
     * @o Date and time object in GlideDateTime format
     * @example
     * var initDate = new GlideDateTime("2011-08-01 12:00:00");
     * var compDate1 = new GlideDateTime("2011-08-01 12:00:00");
     * var compDate2 = new GlideDateTime("2011-07-31 12:00:00");
     * var compDate3 = new GlideDateTime("2011-08-04 16:00:00");
     *  
     * gs.info(initDate.compareTo(compDate1)); // Equals (0)
     * gs.info(initDate.compareTo(compDate2)); // initDate is after compDate2 (1)
     * gs.info(initDate.compareTo(compDate3)); // initDate is before compDate3 (-1)
     * @returns  0 = Dates are equal 1 = The object's date is after the date specified in the parameter -1 = The object's date is before the date specified in the parameter 
     */
    compareTo(o: Object): Number;

    /**
     * Compares a datetime with an existing value for equality.
     * 
     * @dateTime The datetime to compare.
     * @example
     * var gdt = new GlideDateTime("2011-08-31 00:00:00");
     * gs.info(gdt.equals("2011-09-30 00:12:01"));
     * @returns Returns true if they are equal; otherwise, false.
     */
    equals(dateTime: GlideDateTime): Boolean;

    /**
     * Gets the date stored by the GlideDateTime object, expressed in the standard format, yyyy-MM-dd, and the system time zone, UTC by default.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gs.info(gdt.getDate());
     * @returns The date in the system time zone.
     */
    getDate(): GlideDate;

    /**
     * Gets the day of the month stored by the GlideDateTime object, expressed in the current user's time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-12-02 12:00:00");
     * gs.info(gdt.getDayOfMonthLocalTime());
     * @returns The day of the month in the user's time zone, from 1 to 31.
     */
    getDayOfMonthLocalTime(): Number;

    /**
     * Gets the day of the month stored by the GlideDateTime object, expressed in the UTC time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-12-02 12:00:00");
     * gs.info(gdt.getDayOfMonthUTC());
     * @returns The day of the month in the UTC time zone, from 1 to 31.
     */
    getDayOfMonthUTC(): Number;

    /**
     * Gets the day of the week stored by the GlideDateTime object, expressed in the user's time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-12-01 12:00:00");//Thursday
     * gs.info(gdt.getDayOfWeekLocalTime());
     * @returns The day of week value, in the user's time zone, from 1 to 7. Monday equals 1, Sunday equals 7.
     */
    getDayOfWeekLocalTime(): Number;

    /**
     * Gets the day of the week stored by the GlideDateTime object, expressed in the UTC time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-12-01 12:00:00");//Thursday
     * gs.info(gdt.getDayOfWeekLocalTime());
     * @returns The day of week value from 1 to 7. Monday equals 1, Sunday equals 7.
     */
    getDayOfWeekUTC(): Number;

    /**
     * Gets the number of days in the month stored by the GlideDateTime object, expressed in the current user's time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-12-02 12:00:00"); //December
     * gs.info(gdt.getDaysInMonthLocalTime());
     * @returns The number of days in the current month in the user's time zone.
     */
    getDaysInMonthLocalTime(): Number;

    /**
     * Gets the number of days in the month stored by the GlideDateTime object, expressed in the UTC time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-11-02 12:00:00"); //November
     * gs.info(gdt.getDaysInMonthUTC());
     * @returns The number of days in the month stored by the GlideDateTime object, expressed in the UTC time zone.
     */
    getDaysInMonthUTC(): Number;

    /**
     * Gets the date and time value in the current user's display format and time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gs.info(gdt.getDisplayValue()); //uses current user session time zone (US/Pacific)
     * @returns The date and time in the user's format and time zone. Keep in mind when designing business rules or script includes that this method may return values in different formats for different users.
     */
    getDisplayValue(): String;

    /**
     * Gets the display value in the internal format (yyyy-MM-dd HH:mm:ss).
     * 
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00"); 
     * gs.info(gdt.getDisplayValueInternal()); //uses current user session time zone (US/Pacific)
     * @returns The date and time values for the GlideDateTime object in the current user's time zone and the internal date and time format of yyyy-MM-dd HH:mm:ss.
     */
    getDisplayValueInternal(): String;

    /**
     * Gets the amount of time that daylight saving time is offset.
     * 
     * @example
     * var gdt = new GlideDateTime("2014-08-31 08:00:00"); 
     * gs.info(gdt.getDSTOffset()); //uses current user session time zone (US/Pacific)
     * @returns Amount of time, in milliseconds, that daylight saving is offset. Returns 0 if there is no offset or if the time is not during daylight saving time.
     */
    getDSTOffset(): Number;

    /**
     * Gets the current error message.
     * 
     * @example
     * var gdt = new GlideDateTime(); 
     * gdt.setDisplayValue("2011-aa-01 00:00:00"); 
     * gs.info(gdt.getErrorMsg());
     * @returns The error message.
     */
    getErrorMsg(): String;

    /**
     * Returns the object's time in the local time zone and in the internal format.
     * 
     * @returns The object's time in the local time zone and the internal format.
     */
    getInternalFormattedLocalTime(): String;

    /**
     * Gets the date stored by the GlideDateTime object, expressed in the standard format, yyyy-MM-dd, and the current user's time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gs.info(gdt.getLocalDate());
     * @returns The date in the user's time zone.
     */
    getLocalDate(): GlideDate;

    /**
     * Returns a GlideTime object that represents the time portion of the GlideDateTime object in the user's time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2014-08-31 08:00:00");
     * gt = gdt.getLocalTime();
     * gs.info("local time is " + gt.getByFormat('hh:mm:ss'));
     * @returns The time in the user's time zone.
     */
    getLocalTime(): GlideTime;

    /**
     * Gets the month stored by the GlideDateTime object, expressed in the current user's time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-11-02 12:00:00"); //November
     * gs.info(gdt.getMonthLocalTime());
     * @returns The numerical value of the month.
     */
    getMonthLocalTime(): Number;

    /**
     * Gets the month stored by the GlideDateTime object, expressed in the UTC time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-11-02 12:00:00"); //November
     * gs.info(gdt.getMonthUTC());
     * @returns The numerical value of the month.
     */
    getMonthUTC(): Number;

    /**
     * Gets the number of milliseconds since January 1, 1970, 00:00:00 GMT.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gs.info(gdt.getNumericValue());
     * @returns The number of milliseconds since January 1, 1970, 00:00:00 GMT.
     */
    getNumericValue(): Number;

    /**
     * Returns a GlideTime object that represents the time portion of the GlideDateTime object.
     * 
     * @example
     * var gdt = new GlideDateTime("2014-08-31 08:00:00");
     * gt = gdt.getTime();
     * gs.info(gt.getByFormat('hh:mm:ss'));
     * @returns The Unix duration stamp in system format based on GMT time.
     */
    getTime(): GlideTime;

    /**
     * Gets the time zone offset in milliseconds.
     * 
     * @example
     * var gdt = new GlideDateTime();
     * gdt.getLocalTime(); // PST local time
     * gs.info(gdt.getTZOffset());
     * @returns The number of milliseconds of time zone offset.
     */
    getTZOffset(): Number;

    /**
     * Returns the object's time in the local time zone and in the user's format.
     * 
     * @returns The object's time in the local time zone and in the user's format.
     */
    getUserFormattedLocalTime(): String;

    /**
     * Gets the date and time value stored by the GlideDateTime object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone, UTC by default.
     * 
     * @example
     * var gdt = new GlideDateTime("2014-08-31 08:00:00");
     * gs.info(gdt.getValue());
     * @returns The date and time value in the internal format and system time zone.
     */
    getValue(): String;

    /**
     * Gets the number of the week stored by the GlideDateTime object, expressed in the current user's time zone. All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-12-01 12:00:00");//49th week, 1st week in december 
     * gs.info(gdt.getWeekOfYearLocalTime());
     * @returns The number of the current week in local time. The highest week number in a year is either 52 or 53.
     */
    getWeekOfYearLocalTime(): Number;

    /**
     * Gets the number of the week stored by the GlideDateTime object, expressed in the UTC time zone. All weeks begin on Sunday. The first week of the year is the week that contains at least one day of the new year. The week beginning Sunday 2015-12-27 is considered the first week of 2016 as that week contains January 1 and 2.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-12-01 12:00:00");//49th week, 1st week in december 
     * gs.info(gdt.getWeekOfYearUTC());
     * @returns The number of the current week in UTC time. The highest week number in a year is either 52 or 53.
     */
    getWeekOfYearUTC(): Number;

    /**
     * Gets the year stored by the GlideDateTime object, expressed in the current user's time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-11-02 12:00:00");
     * gs.info(gdt.getYearLocalTime());
     * @returns Four-digit year value in the user's time zone.
     */
    getYearLocalTime(): Number;

    /**
     * Gets the year stored by the GlideDateTime object, expressed in the UTC time zone.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-11-02 12:00:00"); 
     * gs.info(gdt.getYearUTC());
     * @returns 4-digit year value in the UTC time zone.
     */
    getYearUTC(): Number;

    /**
     * Determines if an object's date is set.
     * 
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gs.info(gdt.hasDate());
     * @returns True if the object date is set; otherwise, returns false.
     */
    hasDate(): Boolean;

    /**
     * Determines if an object's time uses a daylight saving offset.
     * 
     * @example
     * var gdt = new GlideDateTime("2014-08-31 00:00:00");
     * gs.info(gdt.isDST()); //true
     * @returns True if the time is daylight saving; otherwise, returns false.
     */
    isDST(): Boolean;

    /**
     * Determines if a value is a valid date and time.
     * 
     * @example
     * var gdt = new GlideDateTime(); 
     * gdt.setDisplayValue("2011-aa-01 00:00:00"); 
     * gs.info(gdt.isValid());
     * @returns True if value is valid; otherwise, returns false.
     */
    isValid(): Boolean;

    /**
     * Determines if the GlideDateTime object occurs on or after the specified GlideDateTime.
     * 
     * @gdt The time to check against.
     * @example
     * var gdt1 = new GlideDateTime("2016-05-09 10:11:12");
     * var gdt2 = new GlideDateTime("2017-06-12 15:11:12");
     * gs.info(gdt1.onOrAfter(gdt2));   
     * @returns Returns true if the GlideDateTime object's time is on or after the time specified by the parameter.
     */
    onOrAfter(gdt: GlideDateTime): Boolean;

    /**
     * Determines if the GlideDateTime object occurs on or before the specified GlideDateTime.
     * 
     * @gdt The time to check against.
     * @example
     * var gdt1 = new GlideDateTime("2016-05-09 10:11:12");
     * var gdt2 = new GlideDateTime("2017-06-12 15:11:12");
     * gs.info(gdt1.onOrBefore(gdt2));   
     * @returns Returns true if the GlideDateTime object's time is on or before the time specified by the parameter.
     */
    onOrBefore(gdt: GlideDateTime): Boolean;

    /**
     * Sets the day of the month to a specified value in the current user's time zone.
     * 
     * @day The day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last day of the month.
     * @example
     * var gdt = new GlideDateTime();
     * gdt.setDayOfMonthLocalTime(9);
     * gs.info(gdt.getDayOfMonthLocalTime());
     */
    setDayOfMonthLocalTime(day: Number);

    /**
     * Sets the day of the month to a specified value in the UTC time zone.
     * 
     * @day The day of month to change to, from 1 to 31. If this value is greater than the maximum number of days in the month, the value is set to the last day of the month.
     * @example
     * var gdt = new GlideDateTime();
     * gdt.setDayOfMonthUTC(9);
     * gs.info(gdt.getDayOfMonthUTC());
     */
    setDayOfMonthUTC(day: Number);

    /**
     * Sets a date and time value using the current user's display format and time zone.
     * 
     * @asDisplayed The date and time in the current user's display format and time zone. The parameter must be formatted using the current user's preferred display format, such as MM-dd-yyyy HH:mm:ss. To assign the current date and time to a variable in a workflow script, use variable.setDisplayValue(gs.nowDateTime);.
     * @example
     * var gdt = new GlideDateTime("2014-02-02 12:00:00");
     * gdt.setDisplayValue("2014-01-01 12:00:00");//uses current user session time zone (US/Pacific) 
     * gs.info(gdt.getValue());
     */
    setDisplayValue(asDisplayed: String);

    /**
     * Sets a date and time value using the current user's time zone and the specified date and time format. This method throws a runtime exception if the date and time format used in the value parameter does not match the format parameter. You can retrieve the error message by calling getErrorMsg() on the GlideDateTime object after the exception is caught.
     * 
     * @value The date and time in the current user's time zone.
     * @format The date and time format to use to parse the value parameter.
     * @example
     * var gdt = new GlideDateTime("2011-02-02 12:00:00");
     * gdt.setDisplayValue("20-5-2011 12:00:00", "dd-MM-yyyy HH:mm:ss"); //uses current user session time zone (US/Pacific)
     * gs.info(gdt.getValue());
     */
    setDisplayValue(value: String, format: String);

    /**
     * Sets a date and time value using the internal format (yyyy-MM-dd HH:mm:ss) and the current user's time zone.
     * 
     * @value The date and time in internal format.
     * @example
     * var gdt = new GlideDateTime("2014-02-02 12:00:00");
     * gdt.setDisplayValueInternal("2014-01-01 12:00:00"); //uses current user session time zone (US/Pacific)
     * gs.info(gdt.getValue());
     */
    setDisplayValueInternal(value: String);

    /**
     * Sets the date and time of the current object using an existing GlideDateTime object. This method is equivalent to instantiating a new object with a GlideDateTime parameter.
     * 
     * @g The object to use for setting the datetime value.
     * @example
     * var dt1 = new GlideDateTime("2011-01-01 12:00:00");
     * var dt2 = new GlideDateTime("2011-02-02 08:00:00");
     * dt1.setGlideDateTime(dt2);
     * gs.info(dt1.getValue());
     */
    setGlideDateTime(g: GlideDateTime);

    /**
     * Sets the month stored by the GlideDateTime object to the specified value using the current user's time zone.
     * 
     * @month The month to change to.
     * @example
     * var gdt = new GlideDateTime();
     * gdt.setMonthLocalTime(1);
     * gs.info(gdt.getMonthLocalTime());
     */
    setMonthLocalTime(month: Number);

    /**
     * Sets the month stored by the GlideDateTime object to the specified value using the UTC time zone.
     * 
     * @month The month to change to.
     * @example
     * var gdt = new GlideDateTime();
     * gdt.setMonthUTC(1);
     * gs.info(gdt.getMonthUTC());
     */
    setMonthUTC(month: Number);

    /**
     * Sets the date and time of the GlideDateTime object.
     * 
     * @o The date and time to use. This parameter may be one of several types: A string in the UTC time zone and the internal format of yyyy-MM-dd HH:mm:ss. Sets the value of the object to the specified date and time. Using the method this way is equivalent to instantiating a new GlideDateTime object using the GlideDateTime(String value) constructor. If the date and time format used does not match the internal format, the method attempts to set the date and time using other available formats. Resolving the date and time this way can lead to inaccurate data due to ambiguity in the day and month values. When using a non-standard date and time format, use etValueUTC(String dt, String format) instead. A GlideDateTime object. Sets the value of the object to the date and time stored by the GlideDateTime passed in the parameter. Using the method this way is equivalent to instantiating a new GlideDateTime object using the GlideDateTime(GlideDateTime g) constructor. A JavaScript Number. Sets the value of the object using the Number value as milliseconds past January 1, 1970 00:00:00 GMT. 
     * @example
     * var gdt = new GlideDateTime("2011-01-01 12:00:00");
     * gdt.setValue("2011-02-02 08:00:00");  // value set =  2011-02-02 08:00:00
     * gs.info(gdt.getValue());
     */
    setValue(o: String);

    /**
     * Sets a date and time value using the UTC time zone and the specified date and time format. This method throws a runtime exception if the date and time format used in the dt parameter does not match the format parameter. You can retrieve the error message by calling getErrorMsg() on the GlideDateTime object after the exception is caught.
     * 
     * @dt The date and time to use.
     * @format The date and time format to use.
     * @example
     * var gdt = new GlideDateTime("2011-01-01 12:00:00");
     * gdt.setValueUTC("15-02-2011 08:00:00", "dd-MM-yyyy HH:mm:ss");
     * gs.info(gdt.getValue());
     */
    setValueUTC(dt: String, format: String);

    /**
     * Sets the year stored by the GlideDateTime object to the specified value using the current user's time zone.
     * 
     * @year The year to change to.
     * @example
     * var gdt = new GlideDateTime();
     * gdt.setYearLocalTime(2013);
     * gs.info(gdt.getYearLocalTime());
     */
    setYearLocalTime(year: Number);

    /**
     * Sets the year stored by the GlideDateTime object to the specified value using the UTC time zone.
     * 
     * @year The year to change to.
     * @example
     * var gdt = new GlideDateTime();
     * gdt.setYearUTC(2013);
     * gs.info(gdt.getYearUTC());
     */
    setYearUTC(year: Number);

    /**
     * Gets the duration difference between two GlideDateTime values.
     * 
     * @Start The start value.
     * @End The end value.
     * @example
     * var gdt1 = new GlideDateTime("2011-08-28 09:00:00");
     * var gdt2 = new GlideDateTime("2011-08-31 08:00:00");
     *  
     * var dur = GlideDateTime.subtract(gdt1, gdt2); //the difference between gdt1 and gdt2
     * gs.info(dur.getDisplayValue());
     * @returns The duration between the two values.
     */
    subtract(Start: GlideDateTime, End: GlideDateTime): GlideDuration;

    /**
     * Subtracts a specified amount of time from the current GlideDateTime object.
     * 
     * @time The time value to subtract.
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * var gtime1 = new GlideTime();
     * gtime1.setValue("00:00:20");
     * gdt.subtract(gtime1);
     * var gtime2 = gdt.getTime();
     * gs.info(gtime2.getByFormat('hh:mm:ss'));
     */
    subtract(time: GlideTime);

    /**
     * Subtracts the specified number of milliseconds from the GlideDateTime object.
     * 
     * @milliseconds The number of milliseconds to subtract.
     * @example
     * var gdt = new GlideDateTime("2011-12-07 08:00:00");
     * gdt.subtract(1000);
     * gs.info(gdt.getValue());
     */
    subtract(milliseconds: Number);

    /**
     * Gets the date and time value stored by the GlideDateTime object in the internal format, yyyy-MM-dd HH:mm:ss, and the system time zone, UTC by default. This method is equivalent to getValue().
     * 
     * @example
     * var gdt = new GlideDateTime("2011-08-31 08:00:00");
     * gs.info(gdt.toString());
     * @returns The date and time stored by the GlideDateTime object in the system time zone and format.
     */
    toString(): String;

}

/**
 * Build functions to perform SQL operations in the database. The GlideDBFunctionBuilder methods provide a way to build Relational Database Management System (RDBMS) functions to perform SQL operations on record data. These methods can be used in both scoped and global server scripts. * * To use platform functions: Construct a function using the GlideDBFunctionBuilder constructor and associated methods. After building a function, you can apply the function to the current record using the addFunction() method of the GlideRecord class. Add the function to a query using the addQuery() method of the GlideRecord class. Retrieve the results of the function using the existing GlideRecord API methods such as getValue() and getElement(). 
 * 
 * 
 */
declare class GlideDBFunctionBuilder {



    /**
     * Instantiates a GlideDBFunctionBuilder object.
     * 
     * @example
     * var builder = new GlideDBFunctionBuilder();
     * 
     */
    constructor();

    /**
     * Adds the values of two or more integer fields.Use the field(String field) method to define fields on which the operation is performed.
     * 
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myAddingFunction = functionBuilder.add();
     * myAddingFunction = functionBuilder.field('order');
     * myAddingFunction = functionBuilder.field('priority');
     * myAddingFunction = functionBuilder.build();
     */
    add();

    /**
     * Builds the database function defined by the GlideDBFunctionBuilder object.
     * 
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myAddingFunction = functionBuilder.add();
     * myAddingFunction = functionBuilder.field('order');
     * myAddingFunction = functionBuilder.field('priority');
     * myAddingFunction = functionBuilder.build();
     * gs.print(myAddingFunction);
     */
    build();

    /**
     * Concatenates the values of two or more fields.Use the field(String field) method to define fields on which the operation is performed.
     * 
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myConcatFunction = functionBuilder.concat();
     * myConcatFunction = functionBuilder.field('short_description');
     * myConcatFunction = functionBuilder.field('caller_id.name');
     * myConcatFunction = functionBuilder.build();
     */
    concat();

    /**
     * Defines a constant value to use in the function. If used with the dayofweek() method, the string defines whether to use Sunday or Monday as the first day of the week.
     * 
     * @constant A constant value used in a function. When used with the dayofweek() method, the value defines whether the week starts on a Sunday or Monday. 1: Week begins on Sunday. 2: Week begins on Monday. This definition enables the dayofweek() method to return the correct day of the week from a given date. If a value other than 1 or 2 is provided, the dayofweek() method uses Sunday as the first day of the week.
     */
    constant(constant: String);

    /**
     * Determines the duration using a given start date/time and end date/time.Use the field(String field) method to define start and end date/time fields.
     * 
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myDateDiffFunction = functionBuilder.datediff();
     * myDateDiffFunction = functionBuilder.field('sys_updated_on');
     * myDateDiffFunction = functionBuilder.field('opened_at');
     * myDateDiffFunction = functionBuilder.build();
     */
    datediff();

    /**
     * Returns an integer representing the day of the week for a given date.Use the field(String field) method to define the given date/time. Use the constant(String constant) method to define whether the week starts on a Sunday or Monday.This method can be used with MySQL, Oracle, and Microsoft SQL Server databases only. If using an Oracle database, the NLS_TERRITORY setting must be set to a territory with Sunday as the first day of the week.
     * 
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var dayOfWeekFunction = functionBuilder.dayofweek();
     * dayOfWeekFunction = functionBuilder.field('opened_at');
     * dayOfWeekFunction = functionBuilder.constant('2');
     * dayOfWeekFunction = functionBuilder.build();
     * 
     * var gr = new GlideRecord('incident');
     * gr.addFunction(dayOfWeekFunction);
     * gr.query();
     * while(gr.next())
     * gs.log(gr.getValue(dayOfWeekFunction));
     * 
     * @returns If the first day of the week is set to Sunday in the constant(String constant) method, return values are associated with the following days of the week: 1: Sunday 2: Monday 3: Tuesday 4: Wednesday 5: Thursday 6: Friday 7: Saturday If the first day of the week is set to Monday: 1: Monday 2: Tuesday 3: Wednesday 4: Thursday 5: Friday 6: Saturday 7: Sunday If a value other than 1 or 2 is provided in the constant(String constant) method, the dayofweek() method uses Sunday as the first day of the week.
     */
    dayofweek(): Integer;

    /**
     * Divides the value of one integer field by another.Use the field(String field) method to define fields on which the operation is performed.
     * 
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myDivideFunction = functionBuilder.divide();
     * myDivideFunction = functionBuilder.field('order');
     * myDivideFunction = functionBuilder.field('priority');
     * myDivideFunction = functionBuilder.build();
     */
    divide();

    /**
     * Defines a field on which a SQL operation is performed.
     * 
     * @field The field on which you are performing the SQL operation.
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myAddingFunction = functionBuilder.add();
     * myAddingFunction = functionBuilder.field('order');
     * myAddingFunction = functionBuilder.field('priority');
     * myAddingFunction = functionBuilder.build();
     */
    field(field: String);

    /**
     * Determines the number of code units in a field.Use the field(String field) method to define fields on which the operation is performed.
     * 
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myLengthFunction = functionBuilder.length();
     * myLengthFunction = functionBuilder.field('short_description');
     * myLengthFunction = functionBuilder.build();
     * 
     */
    length();

    /**
     * Multiplies the values of two integer fields.Use the field(String field) method to define fields on which the operation is performed.
     * 
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myMultiplyFunction = functionBuilder.multiply();
     * myMultiplyFunction = functionBuilder.field('order');
     * myMultiplyFunction = functionBuilder.field('priority');
     * myMultiplyFunction = functionBuilder.build();
     */
    multiply();

    /**
     * Subtracts the value of one integer field from another.Use the field(String field) method to define fields on which the operation is performed.
     * 
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var mySubtractFunction = functionBuilder.subtract();
     * mySubtractFunction = functionBuilder.field('order');
     * mySubtractFunction = functionBuilder.field('priority');
     * mySubtractFunction = functionBuilder.build();
     */
    subtract();

}

/**
 * The scoped GlideDigest class provides methods for creating a message digest from strings or input streams using MD5, SHA1, or SHA256 hash algorithms. 
 * 
 * 
 */
declare class GlideDigest {



    /**
     * Creates an instance of scoped GlideDigest.
     * 
     */
    constructor();

    /**
     * Create a message digest from a string using the MD5 algorithm. The output string is in Base64.
     * 
     * @source The source string.
     * @example
     * var inputString = "Her molasses flowed slowly down the hill.";
     * var digest = new GlideDigest();
     * gs.info(digest.getMD5Base64(inputString));
     * @returns The message digest.
     */
    getMD5Base64(source: String): String;

    /**
     * Create a message digest from an input stream using the MD5 algorithm. The output string is in Base64.
     * 
     * @inputStream The source input stream.
     * @example
     * var inputStream = new GlideSysAttachment().getContentStream(attachmentSysID);
     * var digest = new GlideDigest();
     * gs.info(digest.getMD5Base64FromInputStream(inputStream));
     * @returns The message digest.
     */
    getMD5Base64FromInputStream(inputStream: GlideScriptableInputStream): String;

    /**
     * Create a message digest from a string using the MD5 algorithm. The output string is in hexadecimal.
     * 
     * @source The source string.
     * @example
     * var inputString = "Her molasses flowed slowly down the hill.";
     * var digest = new GlideDigest();
     * gs.info(digest.getMD5Hex(inputString));
     * @returns The message digest.
     */
    getMD5Hex(source: String): String;

    /**
     * Create a message digest from an input stream using the MD5 algorithm. The output string is in hexadecimal.
     * 
     * @inputStream The source input stream.
     * @example
     * var inputStream = new GlideSysAttachment().getContentStream(attachmentSysID);
     * var digest = new GlideDigest();
     * gs.info(digest.getMD5HexFromInputStream(inputStream));
     * @returns The message digest.
     */
    getMD5HexFromInputStream(inputStream: GlideScriptableInputStream): String;

    /**
     * Create a message digest from a string using the SHA1 algorithm. The output string is in Base64.
     * 
     * @source The source string.
     * @example
     * var inputString = "Her molasses flowed slowly down the hill.";
     * var digest = new GlideDigest();
     * gs.info(digest.getSHA1Base64(inputString));
     * @returns The message digest.
     */
    getSHA1Base64(source: String): String;

    /**
     * Create a message digest from an input stream using the SHA1 algorithm. The output string is in Base64.
     * 
     * @inputStream The source input stream.
     * @example
     * var inputStream = new GlideSysAttachment().getContentStream(attachmentSysID);
     * var digest = new GlideDigest();
     * gs.info(digest.getSHA1Base64FromInputStream(inputStream));
     * @returns The message digest.
     */
    getSHA1Base64FromInputStream(inputStream: GlideScriptableInputStream): String;

    /**
     * Create a message digest from a string using the SHA1 algorithm. The output string is in hexadecimal.
     * 
     * @source The source string.
     * @example
     * var inputString = "Her molasses flowed slowly down the hill.";
     * var digest = new GlideDigest();
     * gs.info(digest.getSHA1Hex(inputString));
     * @returns The message digest.
     */
    getSHA1Hex(source: String): String;

    /**
     * Create a message digest from an input stream using the SHA1 algorithm. The output string is in hexadecimal.
     * 
     * @inputStream The source input stream.
     * @example
     * var inputStream = new GlideSysAttachment().getContentStream(attachmentSysID);
     * var digest = new GlideDigest();
     * gs.info(digest.getSHA1HexFromInputStream(inputStream));
     * @returns The message digest.
     */
    getSHA1HexFromInputStream(inputStream: GlideScriptableInputStream): String;

    /**
     * Create a message digest from a string using the SHA256 algorithm. The output string is in Base64.
     * 
     * @source The source string.
     * @example
     * var inputString = "Her molasses flowed slowly down the hill.";
     * var digest = new GlideDigest();
     * gs.info(digest.getSHA256Base64(inputString));
     * @returns The message digest.
     */
    getSHA256Base64(source: String): String;

    /**
     * Create a message digest from an input stream using the SHA256 algorithm. The output string is in Base64.
     * 
     * @inputStream The source input stream.
     * @example
     * var inputStream = new GlideSysAttachment().getContentStream(attachmentSysID);
     * var digest = new GlideDigest();
     * gs.info(digest.getSHA256Base64FromInputStream(inputStream));
     * @returns The message digest.
     */
    getSHA256Base64FromInputStream(inputStream: GlideScriptableInputStream): String;

    /**
     * Create a message digest from a string using the SHA256 algorithm. The output string is in hexadecimal.
     * 
     * @source The source string.
     * @example
     * var inputString = "Her molasses flowed slowly down the hill.";
     * var digest = new GlideDigest();
     * gs.info(digest.getSHA256Hex(inputString));
     * @returns The message digest.
     */
    getSHA256Hex(source: String): String;

    /**
     * Create a message digest from an input stream using the SHA256 algorithm. The output string is in hexadecimal.
     * 
     * @inputStream The source input stream.
     * @example
     * var inputStream = new GlideSysAttachment().getContentStream(attachmentSysID);
     * var digest = new GlideDigest();
     * gs.info(digest.getSHA256HexFromInputStream(inputStream));
     * @returns The message digest.
     */
    getSHA256HexFromInputStream(inputStream: GlideScriptableInputStream): String;

}

/**
 * The scoped GlideDuration class provides methods for working with spans of time or durations. GlideDuration objects store the duration as a date and time from January 1, 1970, 00:00:00. As a result, setValue() and getValue() use the scoped GlideDateTime object for parameters and return values.
 * 
 * 
 */
declare class GlideDuration {



    /**
     * Instantiates a GlideDuration object with the specified display value.
     * 
     * @displayValue The display value.
     */
    constructor(displayValue: String);

    /**
     * Instantiates a GlideDuration object with the specified duration.
     * 
     * @milliseconds The duration value in milliseconds.
     */
    constructor(milliseconds: Number);

    /**
     * Instantiates a GlideDuration object by cloning the value of another GlideDuration object.
     * 
     * @another Another scoped GlideDuration object.
     */
    constructor(another: GlideDuration);

    /**
     * Instantiates a GlideDuration object.
     * 
     */
    constructor();

    /**
     * Add the specified duration to the object.
     * 
     * @duration The value to add to the object.
     * @example
     * var duration = new GlideDuration('3 12:00:00');
     * var duration2 = new GlideDuration('3:00:00');
     * var answer = duration.add(duration2);
     * gs.info(answer.getDisplayValue());
     * @returns The sum of the current and the added duration.
     */
    add(duration: GlideDuration): GlideDuration;

    /**
     * Gets the duration in the specified format.
     * 
     * @format The duration format.
     * @example
     * var dur = new GlideDuration('3 22:00:00');
     * gs.info(dur.getByFormat('HH:mm'));
     * @returns The current duration in the specified format.
     */
    getByFormat(format: String): String;

    /**
     * Gets the number of days.
     * 
     * @example
     * var dur = new GlideDuration('3 12:00:00');
     * gs.info(dur.getDayPart());
     * @returns The number of days.
     */
    getDayPart(): Number;

    /**
     * Gets the display value of the duration in number of days, hours, and minutes.
     * 
     * @example
     * var dur = new GlideDuration('3 12:00:00');
     * gs.info(dur.getDisplayValue());
     * @returns The number of days, hours, and minutes.
     */
    getDisplayValue(): String;

    /**
     * Gets the duration value in "d HH:mm:ss" format.
     * 
     * @example
     * var dur = new GlideDuration('3 12:00:00');
     * gs.info(dur.getDurationValue());
     * @returns The duration value.
     */
    getDurationValue(): String;

    /**
     * Gets the rounded number of days. If the time part is more than 12 hours, the return value is rounded up. Otherwise, it is rounded down.
     * 
     * @example
     * var dur = new GlideDuration('3 11:00:00');
     * gs.info(dur.getRoundedDayPart());
     * @returns The day part, rounded.
     */
    getRoundedDayPart(): Number;

    /**
     * Gets the internal value of the GlideDuration object.GlideDuration objects store the duration as a date and time from January 1, 1970, 00:00:00.
     * 
     * @example
     * var dur = new GlideDuration('3 12:00:00');
     * gs.info(dur.getValue());
     * @returns The duration in the object's internal format, which is the date and time from January 1, 1970, 00:00:00.
     */
    getValue(): String;

    /**
     * Sets the display value.
     * 
     * @asDisplayed The duration in "d HH:mm:ss" format.
     * @example
     * var dur = new GlideDuration(); 
     * dur.setDisplayValue('3 08:00:00');
     * gs.info(dur.getDisplayValue());
     */
    setDisplayValue(asDisplayed: String);

    /**
     * Sets the internal value of the GlideDuration object.GlideDuration objects store the duration as a date and time from January 1, 1970, 00:00:00.
     * 
     * @o The duration in the object's internal format, which is the date and time from January 1, 1970, 00:00:00.
     * @example
     * var dur = new GlideDuration();
     * dur.setValue('1970-01-05 08:00:00'); // sets internal DateTime value. The String will be parsed into a GlideDateTime object.
     * gs.info(dur.getDisplayValue());
     */
    setValue(o: Object);

    /**
     * Subtracts the specified duration from the current duration.
     * 
     * @duration The duration to subtract.
     * @example
     * var duration = new GlideDuration('3 12:00:00');
     * var duration2 = new GlideDuration('3:00:00');
     * var answer = duration.subtract(duration2);
     * gs.info(answer.getDisplayValue());
     */
    subtract(duration: GlideDuration);

}

/**
 * The Scoped GlideElement API provides a number of convenient script methods for dealing with fields and their values. Scoped GlideElement methods are available for the fields of the current GlideRecord. 
 * 
 * 
 */
declare class GlideElement {



    /**
     * Determines if the user's role permits the creation of new records in this field.
     * 
     * @returns True if the field can be created, false otherwise.
     */
    canCreate(): Boolean;

    /**
     * Indicates whether the user's role permits them to read the associated GlideRecord.
     * 
     * @returns True if the field can be read, false otherwise.
     */
    canRead(): Boolean;

    /**
     * Determines whether the user's role permits them to write to the associated GlideRecord.
     * 
     * @returns True if the user can write to the field, false otherwise.
     */
    canWrite(): Boolean;

    /**
     * Determines if the current field has been modified. This functionality is available for all available data types, except Journal fields.Note: The changes() method is not supported within ACL scripts.Note: If the GlideRecord on which you are performing this method has only been initialized and read, and has not been written, the underlying before-and-after values are the same. In this case, the method returns "false", as there has been no change to the data store.
     * 
     * @example
     * // This method is often used in business rules. The following example shows is from a business rule, 
     * // if "assigned_to" field value is changed, create a event in the EventQueue. 
     * if (!current.assigned_to.nil() &amp;&amp; current.assigned_to.changes()) {
     *   gs.eventQueue('incident.assigned', current, current.assigned_to.getDisplayValue() , previous.assigned_to.getDisplayValue());
     *   }
     * @returns True if the fields have been changed, false if the field has not.
     */
    changes(): Boolean;

    /**
     * Determines if the previous value of the current field matches the specified object.Note: If the GlideRecord on which you are performing this method has only been initialized and read, and has not been written, the underlying before-and-after values are the same. In this case, the method returns "false", as there has been no change to the data store.
     * 
     * @o An object value to check against the previous value of the current field.
     * @example
     * // The following example shows that in a business rule, if "active" field is changed from true, 
     * // insert a event in the EventQueue.
     * if (current.active.changesFrom(true)) {
     *   gs.eventQueue("incident.inactive", current, current.incident_state, previous.incident_state);
     * }
     * @returns True if the previous value matches, false if it does not.
     */
    changesFrom(o: Object): Boolean;

    /**
     * Determines if the new value of a field, after a change, matches the specified object.Note: The changesTo() method is not supported within ACL scripts.Note: If the GlideRecord on which you are performing this method has only been initialized and read, and has not been written, the underlying before-and-after values are the same. In this case, the method returns "false", as there has been no change to the data store.
     * 
     * @o An object value to check against the new value of the current field.
     * @example
     * // The following example shows that in a business rule, if "active" field is changed to false, 
     * // insert a event in the EventQueue.
     * if (current.active.changesTo(false)) {
     *   gs.eventQueue("incident.inactive", current, current.incident_state, previous.incident_state);
     * }
     * @returns True if the previous value matches, false if it does not.
     */
    changesTo(o: Object): Boolean;

    /**
     * Returns the number of milliseconds since January 1, 1970, 00:00:00 GMT for a duration field. Does not require the creation of a GlideDateTime object because the duration field is already a GlideDateTime object.
     * 
     * @example
     * var inc = new GlideRecord('incident');
     * inc.get('17c90efb13418700cc36b1422244b05d');
     * gs.info(inc.calendar_duration.dateNumericValue());
     * @returns Number of milliseconds since January 1, 1970, 00:00:00 GMT.
     */
    dateNumericValue(): Number;

    /**
     * Returns the value of the specified attribute from the dictionary.If the attribute is a boolean attribute, use getBooleanAttribute(String) to get the value as a boolean rather than as a string.
     * 
     * @attributeName Attribute name
     * @example
     * doit();
     * function doit() {
     *   var gr = new GlideRecord('sys_user');
     *   gr.query("user_name","admin");
     *   if (gr.next()) {
     *     gs.print("we got one");
     *     gs.print(gr.location.getAttribute("tree_picker"));
     *   }
     *  
     * }
     * @returns Attribute value
     */
    getAttribute(attributeName: String): String;

    /**
     * Returns the Boolean value of the specified attribute from the dictionary.To get the value as a string, use getAttribute(string).
     * 
     * @attributeName Attribute name
     * @returns Boolean value of the attribute. Returns false if the attribute does not exist.
     */
    getBooleanAttribute(attributeName: String): Boolean;

    /**
     * Generates a choice list for a field.
     * 
     * @dependent Optional: a dependent value
     * @example
     * var glideRecord = new GlideRecord('incident'); 
     * glideRecord.query('priority','1'); 
     * glideRecord.next(); 
     *  
     * // urgency has choice list: 1 - High, 2 - Medium, 3 - Low, with value: 1, 2, 3
     * var choices = glideRecord.urgency.getChoices(); 
     * gs.info(choices);
     * @returns An array list of choices.
     */
    getChoices(dependent: String): Array<any>;

    /**
     * Returns the choice label for the current choice.A choice has a value (number) and a label (string). This method returns the label.
     * 
     * @example
     * var glideRecord = new GlideRecord('incident'); 
     * glideRecord.query('priority','1'); 
     * glideRecord.next(); 
     *  
     * // urgency has choice list: 1 - High, 2 - Medium, 3 - Low, with value: 1, 2, 3
     * var choiceLabel = glideRecord.urgency.getChoiceValue(); 
     * gs.info(choiceLabel);
     * @returns The selected choice's label.
     */
    getChoiceValue(): String;

    /**
     * Returns the clear text value for Password (2 way encrypted) fields in scoped applications.
     * 
     * @example
     * var tablename = 'x_scoped_app_table'
     * var CI = new GlideRecord(tablename);  
     * CI.addQuery('number', '0001002'); 
     * CI.query(); 
     * CI.next(); 
     * 
     * var password = CI.password_field
     * var decrypted = password.getDecryptedValue(); 
     * gs.info(decrypted);
     * @returns The clear text password.
     */
    getDecryptedValue(): String;

    /**
     * Gets the formatted display value of the field.
     * 
     * @maxCharacters Optional: Maximum characters desired
     * @example
     * var glideRecord = new GlideRecord('incident');
     * glideRecord.query('priority','1');
     * glideRecord.next();
     * gs.info(glideRecord.priority.getDisplayValue());
     * @returns The display value of the field
     */
    getDisplayValue(maxCharacters: Number): String;

    /**
     * Returns the field's element descriptor.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     *  
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     * @returns The field's element descriptor.
     */
    getED(): GlideElementDescriptor;

    /**
     * Returns the phone number in international format.
     * 
     * @returns The phone number in international format.
     */
    getGlobalDisplayValue(): String;

    /**
     * Returns the HTML value of a field.
     * 
     * @maxChars Optional. Maximum number of characters to return.
     * @example
     * var inccause = new GlideRecord("incident");
     * inccause.short_description = current.short_description;
     * inccause.comments = current.comments.getHTMLValue();
     * inccause.insert();
     * @returns HTML value for the field.
     */
    getHTMLValue(maxChars: Number): String;

    /**
     * Returns either the most recent journal entry or all journal entries.
     * 
     * @mostRecent If 1, returns the most recent entry. If -1, returns all journal entries.
     * @example
     * //gets all journal entries as a string where each entry is delimited by '\n\n'
     * var notes = current.work_notes.getJournalEntry(-1); 
     * //stores each entry into an array of strings
     * var na = notes.split("\n\n");  
     *                       
     * for (var i = 0; i &lt; na.length; i++)                 
     *   gs.print(na[i]);
     * @returns For the most recent entry, returns a string that contains the field label, timestamp, and user display name of the journal entry. For all journal entries, returns the same information for all journal entries ever entered as a single string with each entry delimited by "\n\n".
     */
    getJournalEntry(mostRecent: Number): String;

    /**
     * Returns the object label.
     * 
     * @example
     * var gr = new GlideRecord("sc_req_item");
     * gr.addQuery("request", current.sysapproval);
     * gr.query();
     * while(gr.next()) {
     *     var nicePrice = gr.price.toString();
     *     if (nicePrice != ) {
     *         nicePrice = parseFloat(nicePrice);
     *         nicePrice = nicePrice.toFixed(2);
     *     }
     *     template.print(gr.number + ":  " + gr.quantity + " X " + gr.cat_item.getDisplayValue() + " at $" + nicePrice + " each \n");
     *     template.print("    Options:\n");
     *     var variables = gr.variables.getElements();    
     *     for (var key in variables) {
     *       var v = variables[key];
     *       if(v.getQuestion().getLabel() != ) {
     *          template.space(4);
     *          template.print('     ' +  v.getQuestion().getLabel() + " = " + v.getDisplayValue() + "\n");  
     *       }
     *     }
     * }
     * @returns Object label
     */
    getLabel(): String;

    /**
     * Returns the name of the field.
     * 
     * @returns Field name
     */
    getName(): String;

    /**
     * Gets the table name for a reference element.
     * 
     * @example
     * var grINC = new GlideRecord('incident');
     * grINC.query('number','INC0010041'); // record assignment group assigned to "CAB Approval"
     * if (grINC.next()) { 
     *   // Get the table name 
     *   var tableName = grINC.assignment_group.getReferenceTable();
     *   gs.info( tableName ); 
     * }
     * @returns The table name of the reference
     */
    getReferenceTable(): String;

    /**
     * Returns a GlideRecord object for a given reference element.Warning: If the reference element does not contain a value, it returns an empty GlideRecord object, not a NULL object. 
     * 
     * @example
     * 
     * var grINC = new GlideRecord('incident'); 
     * grINC.addNotNullQuery('caller_id');
     *  grINC.query(); 
     * if (grINC.next()) { 
     * 
     * // Get a GlideRecord object for the referenced sys_user record 
     * var grUSER = grINC.caller_id.getRefRecord(); 
     * if (grUSER.isValidRecord()) 
     *   gs.print(grUSER.getValue('name')); 
     * 
     * } 
     * @returns A GlideRecord object
     */
    getRefRecord(): GlideRecord;

    /**
     * Returns the name of the table on which the field resides.
     * 
     * @example
     * if (current.approver.getTableName() == "sysapproval_approver") {
     *   if (current.approver == email.from_sys_id)  {
     *      current.comments = "reply from: " + email.from + "\n\n" + email.body_text;
     *  
     *    // if it's been cancelled, it's cancelled.
     *   var doit = true;
     *   if (current.state=='cancelled')
     *       doit = false;
     *  
     *   if (email.body.state != undefined)
     *      current.state= email.body.state;
     *  
     *    if (doit)
     *       current.update();
     * } else {
     *    gs.log("Approval for task ("+current.sysapproval.getDisplayValue()+") rejected because user sending 
     *            email( "+email.from+") does not match the approver ("+current.approver.getDisplayValue()+")");
     * }
     *  
     * }
     * @returns Name of the table. The returned value may be different from the table Class that the record is in. See Tables and Classes in the product documentation.
     */
    getTableName(): String;

    /**
     * Determines if a field is null.
     * 
     * @example
     * var glideRecord = new GlideRecord('incident'); 
     * glideRecord.query('priority','1'); 
     * glideRecord.next(); 
     * gs.info(glideRecord.state.nil());
     * @returns True if the field is null or an empty string, false if not.
     */
    nil(): Boolean;

    /**
     * Sets the value of a date/time element to the specified number of milliseconds since January 1, 1970 00:00:00 GMT.When called, setDateNumericValue() automatically creates the necessary GlideDateTime/GlideDate/GlideDuration object, and then sets the element to the specified value.Note: Before calling this method, the element must already exist by querying an existing record or by using the gr.initialize() method to initialize a new record.
     * 
     * @milliseconds Number of milliseconds since 1/1/1970
     * @example
     * var gr = new GlideRecord("incident");
     * gr.initialize();
     * gr.opened_at.setDateNumericValue(10000);
     */
    setDateNumericValue(milliseconds: Number);

    /**
     * Sets the display value of the field.
     * 
     * @value The value to set for the field.
     * @example
     * var glideRecord = new GlideRecord('incident'); 
     * glideRecord.query('priority','1'); 
     * glideRecord.next();
     *  
     * //change the urgency to 3 
     * glideRecord.urgency.setDisplayValue('3 - Low');
     * gs.info(glideRecord.urgency);
     */
    setDisplayValue(value: Object);

    /**
     * Adds an error message. Available in Fuji patch 3.
     * 
     * @errorMessage The error message.
     * @example
     * var glideRecord = new GlideRecord('incident');
     * glideRecord.query('priority','1');
     * glideRecord.next();
     *  
     * glideRecord.short_description.setError('Error text');
     */
    setError(errorMessage: String);

    /**
     * Sets the field to the specified phone number.This method is only available on a phone number GlideElement.
     * 
     * @phoneNumber The phone number to set. This can be in either the international or local format.
     * @strict When true, specifies that the number specified must match the correct format. When false, the system attempts to correct an improperly formatted phone number.
     * @returns True if the value was set.
     */
    setPhoneNumber(phoneNumber: Object, strict: Boolean): Boolean;

    /**
     * Sets the value of a field.Note: Before calling this method, the element must already exist by querying an existing record or by using the gr.initialize() method to initialize a new record.
     * 
     * @value Object value to set the field to.
     * @example
     * var glideRecord = new GlideRecord('incident');
     * glideRecord.query('priority','1');
     * glideRecord.next();
     * glideRecord.short_description.setValue('Network failure');
     * gs.info(glideRecord.short_description);
     */
    setValue(value: Object);

    /**
     * Converts the value to a string.
     * 
     * @value Object value to set the field to.
     * @example
     * var glideRecord = new GlideRecord('incident');
     * glideRecord.query('priority','1');
     * glideRecord.next();
     * gs.info(glideRecord.opened_at.toString());
     * @returns The value as a string
     */
    toString(value: Object): String;

}

/**
 * The scoped GlideElementDescriptor API provides information about individual fields. There is no constructor for this class. Use the GlideElement getED() method to obtain a GlideElementDescriptor object.
 * 
 * 
 */
declare class GlideElementDescriptor {



    /**
     * Returns the encryption type used for attachments on the element's table.This method is for use with the Edge Encryption plugin.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     * 
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     * 
     * var isEdge = ed.getAttachmentEncryptionType();
     * gs.info(isEdge);
     * 
     * @returns The encryption type used on attachments. Returns null if attachments on the element's table are not being encrypted.
     */
    getAttachmentEncryptionType(): String;

    /**
     * Returns the element's encryption type.This method is for use with the Edge Encryption plugin.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     * 
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     * 
     * sEdge = ed.getEncryptionType();
     * gs.info(isEdge);
     * @returns The element's encryption type. Returns null if the element is not encrypted.
     */
    getEncryptionType(): String;

    /**
     * Returns the element's internal data type.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     *  
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     *  
     * var isEdge = ed.getInternalType();
     * gs.info(isEdge);
     * @returns The element's internal data type.
     */
    getInternalType(): String;

    /**
     * Returns the element's label.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     *  
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     *  
     * var isEdge = ed.getLabel();
     * gs.info(isEdge);
     * @returns The element's label.
     */
    getLabel(): String;

    /**
     * Returns the element's length.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     *  
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     *  
     * var isEdge = ed.getLength();
     * gs.info(isEdge);
     * @returns The element's size.
     */
    getLength(): Number;

    /**
     * Returns the element's name.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     *  
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     *  
     * var isEdge = ed.getName();
     * gs.info(isEdge);
     * @returns The element's name.
     */
    getName(): String;

    /**
     * Returns the element's plural label.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gr.query();
     * var ed = gr.getED();
     * gs.info(ed.getPlural());
     * @returns The element's plural label.
     */
    getPlural(): String;

    /**
     * Returns true if an encrypted attachment has been added to the table.This method is for use with the Edge Encryption plugin.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     * 
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     * 
     * var isEdge = ed.hasAttachmentsEncrypted();
     * gs.info(isEdge);
     * @returns Returns true if an encrypted attachment has been added to the table.
     */
    hasAttachmentsEncrypted(): Boolean;

    /**
     * Returns true if the element is an automatically generated or system field.Automatically generated and system fields cannot be encrypted. This method is for use with the Edge Encryption plugin.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     * 
     * isEdge = ed.isAutoOrSysID();
     * gs.info(isEdge);
     * 
     * @returns True if the element is automatically generated or a system field.
     */
    isAutoOrSysID(): Boolean;

    /**
     * Returns true if the element is defined as a dropdown choice in its dictionary definition.Choice fields cannnot be encrypted.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     * 
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     * 
     * var isChoiceTable = ed.isChoiceTable();
     * gs.info(isChoiceTable);
     * @returns Returns true if the element is defined as a dropdown choice. Returns true even if there are no entries defined in the choice table. The last choice type, suggestion, does not return true.
     */
    isChoiceTable(): Boolean;

    /**
     * Returns true if an element is encrypted.This method is for use with the Edge Encryption plugin.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     * 
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     * 
     * var isEdge = ed.isEdgeEncrypted();
     * gs.info(isEdge)
     * @returns Returns true if the element is encrypted, false otherwise.
     */
    isEdgeEncrypted(): Boolean;

    /**
     * Determines whether the element is mandatory and must contain a value before the record can be saved.
     * 
     * @example
     * var isRecordValid;
     * var gr = new GlideRecord('my_table');
     * var field = gr.getElement('name');
     * var elementDescriptor = field.getED();
     * gr.query();
     * while (gr.next()) {
     *   if (elementDescriptor.isMandatory() &amp;&amp; !gr.name) {
     *        isRecordValid = false;
     *   }
     * }
     * @returns Flag that indicates whether the associated element is mandatory and must contain a value before the record containing the element can be saved.Valid values: true: element must contain a value; mandatory field false: element does not have to contain a value 
     */
    isMandatory(): Boolean;

    /**
     * Returns true if the element is a virtual element.A virtual element is a calculated field as set by the dictionary definition of the field. Virtual fields cannot be encrypted.
     * 
     * @example
     * var grInc = new GlideRecord('incident');
     * grInc.query('priority', '1');
     * 
     * var field = grInc.getElement('priority');
     * var ed = field.getED();
     * 
     * var isVirtual = ed.isVirtual();
     * gs.info(isVirtual);
     * @returns Returns true if the element is a virtual element.
     */
    isVirtual(): Boolean;

}

/**
 * The scoped GlideEmailOutbound class implements the email object for scoped applications. You can use the GlideEmailOutbound methods with the email global object available in mail scripts. The email object behaves identically for global and scoped applications. 
 * 
 * 
 */
declare class GlideEmailOutbound {



    /**
     * Instantiates a scoped GlideEmailOutbound object.
     * 
     */
    constructor();

    /**
     * Adds the address to either the cc or bcc list.
     * 
     * @type Either cc or bcc, determines the list to which the address is added.
     * @address The recipient's email address.
     * @example
     * email.addAddress('cc', 'joe.employee@something.com');
     */
    addAddress(type: String, address: String);

    /**
     * Adds the recipient to either the cc or bcc list, but uses the display name instead of the address when showing the recipient.
     * 
     * @type Either cc or bcc, determines the list to which the address is added.
     * @address The recipient's email address.
     * @displayName The name to be shown instead of the email address.
     * @example
     * email.addAddress('bcc', 'joe.employee@something.com', 'dudley rocks');
     */
    addAddress(type: String, address: String, displayName: String);

    /**
     * Returns the email's subject line.
     * 
     * @returns The email's subject line.
     */
    getSubject(): String;

    /**
     * Returns the email's watermark.
     * 
     * @example
     * var watermark = email.getWatermark();
     * @returns The email's watermark.
     */
    getWatermark(): String;

    /**
     * Sets the body of the email.
     * 
     * @bodyText The body of the email.
     * @example
     * email.setBody('Dear Sir, ...');
     */
    setBody(bodyText: String);

    /**
     * Sets the sender's address.
     * 
     * @address The sender's email address.
     * @example
     * email.setFrom('joe.employee@something.com');
     */
    setFrom(address: String);

    /**
     * Sets the reply to address.
     * 
     * @address The reply to email address.
     * @example
     * email.setReplyTo('joe.employee@something.com');
     */
    setReplyTo(address: String);

    /**
     * Sets the email's subject line.
     * 
     * @subject Text for the subject line.
     * @example
     * email.setSubject('Important Issues to discuss');
     */
    setSubject(subject: String);

}

/**
 * Parse .xlsx formatted Excel files and access file data in script. The GlideExcelParser methods can be used in global and scoped scripts. Use the sn_impex namespace identifier to create a GlideExcelParser object.
 * 
 * 
 */
declare class GlideExcelParser {



    /**
     * Creates an instance of GlideExcelParser.The API name space identifier "sn_impex" must be used when creating a GlideExcelParser object.
     * 
     * @example
     * var parser = new sn_impex.GlideExcelParser(); 
     * var attachment = new GlideSysAttachment();
     * // use attachment sys id of an excel file
     * var attachmentStream = attachment.getContentStream(&lt;attachment sys id&gt;);
     * 
     * parser.parse(attachmentStream); 
     * 
     * //retrieve the column headers
     * var headers = parser.getColumnHeaders();  
     * var header1 = headers[0]; 
     * var header2 = headers[1]; 
     * 
     * //print headers
     * gs.print(header1 + " " + header2); 
     * 
     * while(parser.next()) { 
     *   var row = parser.getRow(); 
     *   //print row value for both columns   
     *   gs.print(row[header1] + ' ' + row[header2]) 
     * }
     */
    constructor();

    /**
     * Close the connection to the input stream and release the document.
     * 
     */
    close();

    /**
     * Returns a list of column headers from the parsed document.
     * 
     * @returns An array of strings of column headers from the parsed document.
     */
    getColumnHeaders(): Array<any>;

    /**
     * Returns the error message when the parse() method fails.
     * 
     * @returns The error message.
     */
    getErrorMessage(): String;

    /**
     * Get the current row values and headers.
     * 
     * @returns The row headers are property names and the row values are property values.
     */
    getRow(): Object;

    /**
     * Gets table column types and max character length from a spreadsheet or CSV attachment.Note: This method is restricted to scoped applications.
     * 
     * @example
     * var attachmentSysId = "&lt;sys_id&gt;";
     * var headerRowNumber = 6;
     * 
     * var attachmentStream = new GlideSysAttachment().getContentStream(attachmentSysId);
     * var parser = new sn_impex.GlideExcelParser();
     * parser.setHeaderRowNumber(headerRowNumber);
     * if (!parser.parse(attachmentStream)) {
     *     throw "Attachment could not be parsed as an Excel Spreadsheet " + attachmentSysId;
     * }
     * var tableInfo = parser.getTableInfo();
     * for (var name in tableInfo) {
     * gs.info('Column Name : ' + name + ', Type : ' + tableInfo[name].getType() + ', Max Length : ' + tableInfo[name].getLength());
     * }
     * @returns Returns attachment data as a map in which the key is column name. Values contain column type and maximum length of a character string in the column. Access return values using the getType() and getLength() methods.
     */
    getTableInfo(): Object;

    /**
     * Moves to the next row.
     * 
     * @returns Returns true if there is a next row, otherwise, returns false.
     */
    next(): Boolean;

    /**
     * Parse an XLSX formatted Excel document.
     * 
     * @inputStream The Excel document to be parsed.
     * @example
     * var parser = new sn_impex.GlideExcelParser();
     * parser.parse(request.body.dataStream); 
     * @returns Returns true if the parse was successful, otherwise, returns false.
     */
    parse(inputStream: GlideScriptableInputStream): Boolean;

    /**
     * Set the number of the header row to be retrieved.
     * 
     * @headerRowNumber The header row to be retrieved.
     */
    setHeaderRowNumber(headerRowNumber: Number);

    /**
     * Return an empty value instead of null when an Excel cell is not present.
     * 
     * @empty When true, cells that are not present return an empty value. When false, cells that are not present return null.
     */
    setNullToEmpty(empty: Boolean);

    /**
     * Set the name of the sheet to be retrieved.If both setSheetNumber() and setSheetName() are set, setSheetName() is used.
     * 
     * @sheetName The name of the sheet to be retrieved.
     */
    setSheetName(sheetName: String);

    /**
     * Set the number of the Excel sheet to be retrieved.If both setSheetNumber() and setSheetName() are set, setSheetNumber() is ignored.
     * 
     * @sheetNumber The Excel sheet number to retrieve.
     */
    setSheetNumber(sheetNumber: Number);

}

/**
 * The Scoped GlideFilter API provides a method to determine if a record meets a specified set of requirements. There is no constructor for Scoped GlideFilter. It is accessed by using the global object "GlideFilter".
 * 
 * 
 */
declare class GlideFilter {



    /**
     * Compares a specified filter to the contents of a specified GlideRecord.If the specified filter contains one condition, the method returns true if the record meets the condition of the filter.If the specified filter contains more than one condition, for example "active=true^number=abc^category=request", you can use the match parameter to define whether all conditions must be met to determine a match or just a single condition.
     * 
     * @gr GlideRecord to evaluate.
     * @filter Encoded query string (case-sensitive).
     * @match Optional. Flag that indicates whether all conditions must be met if the filter parameter contains multiple conditions. Valid values: true: all conditions must be met for the method to return true false: only one of the conditions must be met for the method to return true Default: true
     * @example
     * var rec = new GlideRecord('incident');
     * rec.query();
     * var bool = true;
     *  
     * while(rec.next())
     * {
     *    bool = GlideFilter.checkRecord(rec, "active=true");
     *    gs.info("number "+ rec. number + " is " + bool);
     * }
     * @returns Results of the filter comparison. true: filter conditions were met false: filer conditions were not met 
     */
    checkRecord(gr: GlideRecord, filter: String, match: Boolean): Boolean;

}

/**
 * The scoped GlideFormScratchpad class implements the g_scratchpad object for scoped applications. The scoped GlideFormScratchpad class has no constructor and no methods. The g_scratchpad object behaves identically for global and scoped applications. * * The g_scratchpad object provides a mechanism for passing information from the server to the client when the client requires information not available on a form. This can be accomplished by creating a business rule to put the information in the g_scratchpad object and accessing the information in a client script.
 * 
 * 
 */
declare class GlideFormScratchpad {



}

/**
 * GlideLocale provides information about display information for the local instance. There is no constructor for a GlideLocale object. Use the get() method to get a GlideLocale object.
 * 
 * 
 */
declare class GlideLocale {



    /**
     * Returns the GlideLocale object.
     * 
     * @example
     * var locale = GlideLocale.get();
     * @returns The GlideLocale object.
     */
    get(): GlideLocale;

    /**
     * Returns the decimal separator.
     * 
     * @example
     * var locale = GlideLocale.get();
     * var decimalSeparator = locale.getDecimalSeparator();
     * gs.info( "The decimal separator is " + decimalSeparator);
     * @returns The decimal separator.
     */
    getDecimalSeparator(): String;

    /**
     * Returns the grouping separator.
     * 
     * @example
     * var locale = GlideLocale.get();var groupingSeparator = locale.getGroupingSeparator();
     * gs.info( "The grouping separator is " + groupingSeparator);
     * @returns The grouping separator.
     */
    getGroupingSeparator(): String;

}


declare namespace sn_auth {

    /**
     * Use these methods for requesting and revoking OAuth refresh and access tokens. This API can be used in global and scoped scripts. In scoped scripts us the sn_auth namespace identifier.
     * 
     * 
     */
    declare class GlideOAuthClient {



        /**
         * Retrieves the token for the client. You can use the token to check the expiration date and perform a token renewal.
         * 
         * @OAuthEntityName The OAuth entity.
         * @requestor The request.
         * @example
         * token = oAuthClient.getToken(testAppProvider, someone@someemail.com);
         * @returns The token for the client.
         */
        getToken(OAuthEntityName: String, requestor: String): ScopedGlideOAuthToken;

        /**
         * Retrieves the token for the client, with the request parameters encoded in JSON format.
         * 
         * @clientName The client name.
         * @jsonString The JSON string for the client.
         * @example
         * 
         * var oAuthClient = new GlideOAuthClient();
         * var params ={grant_type:"password", username:"itil", password:'itil'};
         * var json =new JSON();
         * var text = json.encode(params);
         * var tokenResponse = oAuthClient.requestToken('TestClient', text);
         * var token = tokenResponse.getToken();
         * 
         * gs.log("AccessToken:"+ token.getAccessToken());
         * gs.log("AccessTokenExpiresIn:"+ token.getExpiresIn());
         * gs.log(" RefreshToken:"+ token.getRefreshToken());
         * 
         * @returns The token for the client.
         */
        requestToken(clientName: String, jsonString: String): sn_auth.GlideOAuthClientResponse;

        /**
         * Retrieves the token for the client, with the client name and the request set into a GlideOAuthClientResponse object.
         * 
         * @clientName The client name.
         * @request The request.
         * @returns The token for the client.
         */
        requestTokenByRequest(clientName: String, request: sn_auth.GlideOAuthClientRequest): sn_auth.GlideOAuthClientResponse;

        /**
         * Revokes the access or refresh token for the client, with the request and optional header parameters set into a GlideOAuthClientRequest object.
         * 
         * @clientName The client name.
         * @accessToken The access token.
         * @refreshToken The refresh token.
         * @request The request.
         * @returns The token for the client.
         */
        revokeToken(clientName: String, accessToken: String, refreshToken: String, request: sn_auth.GlideOAuthClientRequest): sn_auth.GlideOAuthClientResponse;

    }

}
declare namespace sn_auth {

    /**
     * Use these methods for handling OAuth client requests. This API can be used in global and scoped scripts. In scoped scripts us the sn_auth namespace identifier.
     * 
     * 
     */
    declare class GlideOAuthClientRequest {



        /**
         * Retrieves the grant type.
         * 
         * @returns The grant type.
         */
        getGrantType(): String;

        /**
         * Retrieves the HTTP headers for the string you provide.
         * 
         * @name The name of the parameter.
         * @returns The string map with the HTTP headers.
         */
        getHeader(name: String): StringMap;

        /**
         * Retrieves the HTTP headers.
         * 
         * @returns The string map with the HTTP headers.
         */
        getHeaders(): StringMap;

        /**
         * Retrieves the parameters for the parameter name you provide.
         * 
         * @name The parameter name for which you want the parameters.
         * @returns The parameters.
         */
        getParameter(name: String): String;

        /**
         * Retrieves the password.
         * 
         * @returns The password.
         */
        getPassword(): String;

        /**
         * Retrieves the refresh token.
         * 
         * @returns The refresh token.
         */
        getRefreshToken(): String;

        /**
         * Retrieves the scope.
         * 
         * @returns The scope.
         */
        getScope(): String;

        /**
         * Retrieves the user name.
         * 
         * @returns The user name.
         */
        getUserName(): String;

        /**
         * Sets the grant type for the string you provide.Note: You only need to set the grant type if it is not already defined in the OAuth provider profile. 
         * 
         * @name The grant type.
         */
        setGrantType(name: String);

        /**
         * Retrieves the HTTP headers for the string you provide.
         * 
         * @name The name of the parameter.
         * @value The value of the parameter.
         */
        setHead(name: String, value: String);

        /**
         * Sets the parameters for the name:value pair of strings you provide.
         * 
         * @name The parameter name for which you want the parameters.
         * @value The value of the parameter.
         */
        setParameter(name: String, value: String);

        /**
         * Sets the password with the string you provide.
         * 
         * @password The user name.
         */
        setPassword(password: String);

        /**
         * Sets the refresh token with the string you provide.
         * 
         * @refreshToken The refresh token.
         * @example
         * 
         *      var tokenRequest =new GlideOAuthClientRequest();
         *      tokenRequest.setGrantType("password");
         *      tokenRequest.setUserName("itil");
         *      tokenRequest.setPassword("itil");
         *      tokenRequest.setScope(null);
         *  
         *      var oAuthClient =new GlideOAuthClient();var tokenResponse = oAuthClient.requestToken("TestClient", tokenRequest);
         *      gs.log("Error:"+ tokenResponse.getErrorMessage());
         *  
         *      var token = tokenResponse.getToken();if(token){
         *        gs.log("AccessToken:"+ token.getAccessToken());
         *        gs.log("AccessTokenExpiresIn:"+ token.getExpiresIn());
         *        gs.log("RefreshToken:"+ token.getRefreshToken());
         * 
         */
        setRefreshToken(refreshToken: String);

        /**
         * Sets the scope for the string you provide.Note: You only need to set the scope if it is not already defined in the OAuth provider.
         * 
         * @scope The scope.
         */
        setScope(scope: String);

        /**
         * Sets the user name with the string you provide.
         * 
         * @userName The user name.
         */
        setUserName(userName: String);

    }

}
declare namespace sn_auth {

    /**
     * Use these methods for handling OAuth client responses. This API can be used in global and scoped scripts. In scoped scripts us the sn_auth namespace identifier.
     * 
     * 
     */
    declare class GlideOAuthClientResponse {



        /**
         * Retrieves all of the response information, including instance information.
         * 
         * @returns The response information.
         */
        getBody(): String;

        /**
         * Retrieves the HTTP response content header from an external OAuth provider.
         * 
         * @returns The HTTP response header.
         */
        getContentType(): String;

        /**
         * Retrieves the error message if authentication is not successful.
         * 
         * @returns The error message.
         */
        getErrorMessage(): String;

        /**
         * Retrieves the HTTP response code from the external OAuth provider.
         * 
         * @returns The HTTP response code.
         */
        getResponseCode(): String;

        /**
         * Retrieves the error message if authentication is not successful.
         * 
         * @returns The response content.
         */
        getResponseParameters(): MapString;

        /**
         * Retrieves the refresh token.
         * 
         * @returns The refresh token.
         */
        getToken(): sn_auth.GlideOAuthToken;

    }

}
declare namespace sn_auth {

    /**
     * Use the GlideOAuthToken methods for retrieving OAuth access token and information about the access token. This API can be used in global and scoped scripts. In scoped scripts use the sn_auth namespace identifier.
     * 
     * 
     */
    declare class GlideOAuthToken {



        /**
         * Retrieves the access token.
         * 
         * @returns The access token.
         */
        getAccessToken(): String;

        /**
         * Retrieves the sys_id of the token ID.
         * 
         * @returns The sys_id of the access token.
         */
        getAccessTokenSysID(): String;

        /**
         * Retrieves the lifespan of the access token in seconds.
         * 
         * @returns The lifespan.
         */
        getExpiresIn(): Number;

        /**
         * Retrieves the lifespan of the access token in seconds.
         * 
         * @returns The refresh token.
         */
        getRefreshToken(): Number;

        /**
         * Retrieves the sys_id of the refresh token.
         * 
         * @returns The sys_id of the refresh token.
         */
        getRefreshTokenSysID(): Number;

        /**
         * Retrieves the scope, which is the amount of access granted by the access token.
         * 
         * @returns The scope.
         */
        getScope(): String;

    }

}/**
 * The scoped GlidePluginManager API provides a method for determining if a plugin has been activated. 
 * 
 * 
 */
declare class GlidePluginManager {



    /**
     * Determines if the specified plugin has been activated.
     * 
     * @pluginID The plugin ID
     * @example
     * var gr = new GlideRecord('sys_plugins');
     * var queryString = "active=0^ORactive=1";
     * gr.addEncodedQuery(queryString);
     * gr.query();
     * pMgr = new GlidePluginManager();
     *  
     * while (gr.next()) {
     *    var name = gr.getValue('name');
     *    var pID = gr.getValue('source');
     *    isActive = pMgr.isActive(pID);
     *    if (isActive) 
     *        gs.info('The plugin ' + name + " is  active"  );
     * }
     * @returns True if the plugin has been activated.
     */
    isActive(pluginID: String): Boolean;

}

/**
 * The scoped GlideQueryCondition API provides additional AND or OR conditions that can be added to the current condition, allowing you to build complex queries. Build complex queries such as: * * In the case of addCondition(), an implied AND is added. * * This class has no constructor. A GlideQueryCondition object is returned by the following methods: addActiveQuery() addInactiveQuery() addJoinQuery() addNotNullQuery() addNullQuery() addQuery() * * If there is a complicated set of AND and OR queries, a single encoded query containing all conditions simplifies the query creation. To simplify the query creation, create a query in a list view, right-click the query, and select Copy query. It creates a single encoded query string to return your result set. Use that string as a parameter in an addEncodedQuery() call. * * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss. * * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
 * 
 * 
 */
declare class GlideQueryCondition {



    /**
     * Adds an AND condition to the current condition.Table 2. Returns Type Description GlideQueryCondition A reference to a GlideQueryConditon that was added to the GlideRecord. 
     * 
     * @name The name of a field.
     * @oper (Optional) The operator for the query. If you do not specify an operator, the condition uses an equals operator.
     * @value The value to query on.
     * @example
     * var gr = new GlideRecord('incident');
     * var qc = gr.addQuery('category', 'Hardware');
     * qc.addCondition('category', 'Network');
     * gr.addQuery('number','INC0000003');
     * gr.next();
     * gr.number;
     * gs.info(gr.getEncodedQuery());
     * @returns A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addCondition(name: String, oper: String, value: Object): GlideQueryCondition;

    /**
     * Appends a two-or-three parameter OR condition to an existing GlideQueryCondition.addOrCondition() works in conjunction with any of the addQuery() methods to OR the specified query parameters to the query previously constructed using addQuery().addOrCondition() is typically called with three parameters; table field, operator, and comparison value. It can be called with only two parameters, table field and comparison value, such as qc.addOrCondition('category', 'software');. The operator in this case is assumed to be "equal to".Table 1. Parameters Name Type Description name String Field name oper String (Optional) Query operator. The available values are dependent on the data type of the value parameter.Numbers: = != &gt; &gt;= &lt; &lt;= Strings (must be in upper case): = != IN STARTSWITH ENDSWITH CONTAINS DOESNOTCONTAIN value Object Value on which to query (not case-sensitive).Note: All passed in arrays must contain a minimum of two elements. Single element arrays are not supported. Table 2. Returns Type Description GlideQueryCondition A reference to a GlideQueryConditon that was added to the GlideRecord. 
     * 
     * @name Field name
     * @oper (Optional) Query operator. The available values are dependent on the data type of the value parameter.Numbers: = != &gt; &gt;= &lt; &lt;= Strings (must be in upper case): = != IN STARTSWITH ENDSWITH CONTAINS DOESNOTCONTAIN 
     * @value Value on which to query (not case-sensitive).Note: All passed in arrays must contain a minimum of two elements. Single element arrays are not supported.
     * @example
     * var gr = new GlideRecord('incident');
     * var qc = gr.addQuery('category', 'Hardware');
     * qc.addOrCondition('category', 'Network');
     * gr.addQuery('number','INC0000003');
     * gr.next();
     * gr.number;
     * gs.info(gr.getEncodedQuery());
     * 
     * @example
     * var myObj = new GlideRecord('incident');
     * var q1 = myObj.addQuery('state', '&lt;', 3);
     * q1.addOrCondition('state', '&gt;', 5);
     * var q2 = myObj.addQuery('priority', 1);
     * q2.addOrCondition('priority', 5);
     * myObj.query();
     * @returns A reference to a GlideQueryConditon that was added to the GlideRecord.
     */
    addOrCondition(name: String, oper: String, value: Object): GlideQueryCondition;

}

/**
 * Scoped GlideRecord is used for database operations. A GlideRecord contains both records and fields. For information about GlideRecordSecure, which is a class inherited from GlideRecord that performs the same functions as GlideRecord, and also enforces ACLs, see the GlideServer APIs . * * Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss. * * You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
 * 
 * 
 */
declare class GlideRecord {



    /**
     * Creates an instance of the GlideRecord class for the specified table.
     * 
     * @tableName The table to be used.
     * @example
     * var gr = new GlideRecord('incident');
     */
    constructor(tableName: String);

    /**
     * Adds a filter to return active records.
     * 
     * @example
     * var inc = new GlideRecord('incident');
     * inc.addActiveQuery();
     * inc.query();
     * @returns Filter to return active records.
     */
    addActiveQuery(): QueryCondition;

    /**
     * Adds an encoded query to other queries that may have been set.Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
     * 
     * @query An encoded query string.
     * @example
     * var queryString = "priority=1^ORpriority=2";
     * var gr = new GlideRecord('incident');
     * gr.addEncodedQuery(queryString);
     * gr.query();
     * while (gr.next()) {
     *   gs.addInfoMessage(gr.number);
     * }
     */
    addEncodedQuery(query: String);

    /**
     * Applies a pre-defined GlideDBFunctionBuilder object to a record.Use the GlideDBFunctionBuilder scoped class to define a function. After the function is defined, use the addFunction(Object function) method to apply the function to a record.
     * 
     * @func A GlideDBFunctionBuilder object that defines a SQL operation.
     * @example
     * var functionBuilder = new GlideDBFunctionBuilder();
     * var myAddingFunction = functionBuilder.add();
     * myAddingFunction = functionBuilder.field('order');
     * myAddingFunction = functionBuilder.field('priority');
     * myAddingFunction = functionBuilder.build();
     * 
     * var gr = new GlideRecord('incident');
     * gr.addFunction(myAddingFunction);
     * gr.addQuery(myAddingFunction, '&lt;', 5);
     * gr.query();
     * while(gr.next())
     * gs.log(gr.getValue(myAddingFunction));
     * 
     */
    addFunction(func: Object);

    /**
     * Adds a filter to return records based on a relationship in a related table.You can use this method to find all the users that are in the database group via the [sys_user_grmember] table, or to find all problems that have an assigned incident via the incident.problem_id relationship.This is not a true database join; rather, addJoinQuery adds a subquery. So, while the result set is limited based on the join, the only fields that you have access to are those on the base table (those which are in the table with which the GlideRecord was initialized).Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
     * 
     * @joinTable Table name
     * @primaryField (Optional) If other than sys_id, the primary field
     * @joinTableField (Optional) If other than sys_id, the field that joins the tables.
     * @example
     * var prob = new GlideRecord('problem');
     * prob.addJoinQuery('incident');
     * prob.query();
     * @example
     * // Look for Problem records that have associated Incident records
     * var gr = new GlideRecord('problem');
     * var grSQ = gr.addJoinQuery('incident');
     *  
     * // Where the Problem records are "active=false"
     * gr.addQuery('active', 'false');
     *  
     * // And the Incident records are "active=true"
     * grSQ.addCondition('active', 'true');
     *  
     * // Query
     * gr.query();
     *  
     * // Iterate and output results
     * while (gr.next()) {
     *     gs.info(gr.getValue('number'));
     * }
     * @example
     * var gr = new GlideRecord('problem'); 
     * gr.addJoinQuery('incident', 'opened_by', 'caller_id'); 
     * gr.query();
     * @returns A filter that lists records where the relationships match.
     */
    addJoinQuery(joinTable: String, primaryField: Object, joinTableField: Object): GlideQueryCondition;

    /**
     * A filter that specifies records where the value of the field passed in the parameter is not null.Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
     * 
     * @fieldName The name of the field to be checked.
     * @example
     * var target = new GlideRecord('incident'); 
     * target.addNotNullQuery('short_description');
     * target.query();   // Issue the query to the database to get all records where short_description is not null
     * while (target.next()) {   
     *      // add code here to process the incident record
     * }
     * @returns A filter that specifies records where the value of the field passed in the parameter is not null.
     */
    addNotNullQuery(fieldName: String): GlideQueryCondition;

    /**
     * Adds a filter to return records where the value of the specified field is null.Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
     * 
     * @fieldName The name of the field to be checked.
     * @example
     * var target = new GlideRecord('incident'); 
     * target.addNullQuery('short_description');
     * target.query();   // Issue the query to the database to get all records where short_description is null
     * while (target.next()) {   
     *    // add code here to process the incident record
     * }
     * @returns The query condition added to the GlideRecord.
     */
    addNullQuery(fieldName: String): GlideQueryCondition;

    /**
     * Build a search query and return the rows that match the request.If you are familiar with SQL, this method is similar to the "where" clause. One or more addQuery() calls can be made in a single query; in this case the queries are AND'ed. If any of the query statements need to be OR'ed, use the GlideQueryCondition method addOrCondition().When addQuery() is called with only two parameters, table field and comparison value, such as myObj.addQuery('category','Hardware');, the operator in this case is assumed to be "equal to".Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
     * 
     * @name Table field name. If you are not querying a table field, use these reserved variables: 123TEXTQUERY321: Adds a search term to the query. Use this option to return matching values from any field in the table. Use the term you want to query as the value. 123TEXTINDEXGROUP321: Adds a text index group to the query. Use the name of the text index group from the Text Index Groups [ts_index_group] table you want to query as the value. For more information about text index groups, see Configure multiple tables for indexing and searching. 
     * @value Value on which to query (not case-sensitive).
     * @example
     * var rec = new GlideRecord('incident');
     * rec.addQuery('active', true);
     * rec.query();
     * while (rec.next()) { 
     *   rec.active = false;
     *   gs.info('Active incident ' + rec.number + ' closed');
     *   rec.update();
     * }
     * @example
     * var gr = new GlideRecord("kb_knowledge);
     * gr.addQuery("123TEXTQUERY321", "email server");
     * gr.addQuery("123TEXTINDEXGROUP321", "portal");
     * gr.query();
     * @returns The query condition added to the GlideRecord.
     */
    addQuery(name: String, value: Object): GlideQueryCondition;

    /**
     * Provides the ability to build a request, which when executed, returns the rows from the specified table, that match the request.If you are familiar with SQL, this method is similar to the "where" clause. One or more addQuery() calls can be made in a single query; in this case the queries are AND'ed. If any of the query statements need to be OR'ed, use the GlideQueryCondition method addOrCondition().Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
     * 
     * @name Table field name.
     * @operator Query operator. The available values are dependent on the data type of the value parameter.Numbers: = != &gt; &gt;= &lt; &lt;= Strings (must be in upper case): = != IN NOT IN STARTSWITH ENDSWITH CONTAINS DOES NOT CONTAIN INSTANCEOF 
     * @value Value on which to query (not case-sensitive).
     * @example
     * var rec = new GlideRecord('incident');
     * rec.addQuery('active',true);
     * rec.addQuery('sys_created_on', "&gt;", "2010-01-19 04:05:00");
     * rec.query();
     * while (rec.next()) { 
     *   rec.active = false;
     *   gs.info('Active incident ' + rec.number + ' closed');
     *   rec.update();
     * }
     * @example
     * var gr = new GlideRecord('incident');
     * gr.addQuery('number','IN','INC00001,INC00002');
     * gr.query();
     * while(gr.next()) {
     *   //do something....
     * }
     * @returns The query condition that was added to the GlideRecord.
     */
    addQuery(name: String, operator: String, value: Object): GlideQueryCondition;

    /**
     * Adds a filter to return records using an encoded query string.Always test queries on a sub-production instance prior to deploying them on a production instance. An incorrectly constructed encoded query, such as including an invalid field name, produces an invalid query. When the invalid query is run, the invalid part of the query condition is dropped, and the results are based on the valid part of the query, which may return all records from the table. Using an insert(), update(), deleteRecord(), or deleteMultiple() method on bad query results can result in data loss.You can set the glide.invalid_query.returns_no_rows system property to true to have queries with invalid encoded queries return no records.
     * 
     * @query An encoded query string .
     * @example
     * var rec = new GlideRecord('incident');
     * rec.addQuery('active=true');
     * rec.query();
     * while (rec.next()) { 
     *   rec.active = false;
     *   gs.info('Active incident ' + rec.number + ' closed');
     *   rec.update();
     * }
     * @returns The query condition added to the GlideRecord.
     */
    addQuery(query: String): GlideQueryCondition;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit inserting new records in this table.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gs.info(gr.canCreate());
     * @returns Flag that indicates whether the user's roles permit creating of records in this table.Valid values: true: Creating permitted false: Creating is not permitted 
     */
    canCreate(): Boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit deleting records in this table.
     * 
     * @example
     * var att = new GlideRecord('sys_attachment');
     * gs.info(att.canDelete());
     * @returns Flag that indicates whether the user's roles permit deleting of records in this table.Valid values: true: Deleting permitted false: Deleting is not permitted 
     */
    canDelete(): Boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit reading records in this table.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gs.info(gr.canRead());
     * @returns Flag that indicates whether the user's roles permit reading of records in this table.Valid values: true: Reading permitted false: Reading is not permitted 
     */
    canRead(): Boolean;

    /**
     * Determines if the Access Control Rules, which include the user's roles, permit editing records in this table.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gs.info(gr.canWrite());
     * @returns Flag that indicates whether the user's roles permit writing of records in this table.Valid values: true: Writing permitted false: Writing is not permitted 
     */
    canWrite(): Boolean;

    /**
     * Sets a range of rows to be returned by subsequent queries.
     * 
     * @firstRow The first row to include. Because the index starts at 0, a value of 0 returns the first row.
     * @lastRow The last row to include in the range. Because the index starts at 0, use the value n - 1, in which n equals the actual row number.
     * @forceCount If true, the getRowCount() method will return all possible records.
     * @example
     * var gr = new GlideRecord('incident');
     * gr.orderBy('number');
     * gr.chooseWindow(2, 4);
     * gr.query();
     * if (gr.next()) { 
     *   gs.info(gr.number + ' is within window');
     * }
     */
    chooseWindow(firstRow: Number, lastRow: Number, forceCount: Boolean);

    /**
     * Deletes multiple records that satisfy the query condition.This method does not delete attachments.Do not use deleteMultiple() on tables with currency fields. Always delete each record individually. Also, do not use this method with the chooseWindow() or setLimit() methods when working with large tables.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gr.addQuery('active','false'); //to delete all inactive incidents
     * gr.query();
     * gr.deleteMultiple();
     */
    deleteMultiple();

    /**
     * Deletes the current record.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * //to delete one record
     * if (gr.get('99ebb4156fa831005be8883e6b3ee4b9'))
     *     gr.deleteRecord();
     * @returns Flag that indicates whether the record was successfully deleted.Valid values: true: Record was deleted. false: No record was found to delete. 
     */
    deleteRecord(): Boolean;

    /**
     * Returns the specified record in an instantiated GlideRecord object.This method accepts either one or two parameters. If only a single parameter is passed in, the method assumes it is the sys_id of the desired record. If two parameters are passed in, the first is the name of the column within the instantiated GlideRecord to search. The second is the value to search for.If multiple records are found, use next() to access the additional records.
     * 
     * @name Optional. Name of the instantiated GlideRecord column to search for the specified value parameter. If only a single parameter is passed in, the method assumes that this parameter is sys_id.
     * @value Value to match.
     * @example
     * var grIncident = new GlideRecord('incident');
     * var returnValue = grIncident.get('99ebb4156fa831005be8883e6b3ee4b9');
     * gs.info(returnValue); // logs true or false
     * gs.info(grIncident.number); // logs Incident Number
     * @example
     * var grIncident = new GlideRecord('incident');
     * var returnValue = grIncident.get('caller_id.name','Sylivia Wayland');
     * gs.info(returnValue); // logs true or false
     * gs.info(grIncident.number); // logs Incident Number
     * @returns Indicates whether the requested record was located: true: record was found false: record was not found 
     */
    get(name: Object, value: Object): Boolean;

    /**
     * Returns the dictionary attributes for the specified field.
     * 
     * @fieldName Field name for which to return the dictionary attributes
     * @example
     * doit();
     * function doit() {
     *   var gr = new GlideRecord('sys_user');
     *   gr.query("user_name","admin");
     *   if (gr.next()) {
     *     gs.print("we got one");
     *     gs.print(gr.location.getAttribute("tree_picker"));
     *   }
     * }
     * @returns Dictionary attributes
     */
    getAttribute(fieldName: String): String;

    /**
     * Returns the table's label.
     * 
     * @returns Table's label
     */
    getClassDisplayValue(): String;

    /**
     * Retrieves the display value for the current record.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gr.get('sys_id','ef43c6d40a0a0b5700c77f9bf387afe3');
     * gs.info(gr.getDisplayValue());
     * @returns The display value for the current record.
     */
    getDisplayValue(): String;

    /**
     * Returns the element's descriptor.
     * 
     * @example
     * var totalCritical  = 0;
     * var filledCritical = 0;
     * var fields         = current.getFields();
     *  
     * gs.print(fields);
     *  
     * for (var num = 0; num &lt; fields.size(); num++) {
     *  
     * 	gs.print("RUNNING ARRAY VALUE " + num);
     *  
     * 	var ed = fields.get(num).getED();
     *  
     * 	if(ed.hasAttribute("tiaa_critical")) {
     * 		gs.print("CRITICAL FIELD FOUND");
     * 		totalCritical ++;
     *  
     * 		if (!fields.get(num).isNil()) {
     * 			filledCritical ++;
     * 		}
     * 	}
     *  
     * }
     *  
     * var answer = 0;
     * gs.print("TOTAL - " + totalCritical);
     * gs.print("FILLED - " + filledCritical);
     *  
     * if (filledCritical &gt; 0 &amp;&amp; totalCritical &gt; 0) {
     *  
     * 	var pcnt = (filledCritical/totalCritical)*100;
     * 	answer = pcnt.toFixed(2);;
     *  
     * }
     *  
     * answer;
     * @returns Element's descriptor
     */
    getED(): GlideElementDescriptor;

    /**
     * Retrieves the GlideElement object for the specified field.
     * 
     * @columnName Name of the column to get the element from.
     * @example
     * var elementName = 'short_description'; 
     * var gr = new GlideRecord('incident'); 
     * gr.initialize(); 
     * gr.setValue(elementName, "My DB is not working");
     * gr.insert();
     * gs.info(gr.getElement('short_description'));
     * @returns The GlideElement for the specified column of the current record.
     */
    getElement(columnName: String): GlideElement;

    /**
     * Retrieves the query condition of the current result set as an encoded query string.
     * 
     * @example
     * var gr = new GlideRecord('incident'); 
     * gr.addQuery('active', true);
     * gr.addQuery('priority', 1); 
     * gr.query(); 
     * var encodedQuery = gr.getEncodedQuery(); 
     * gs.info(encodedQuery);
     * @returns The encoded query as a string.
     */
    getEncodedQuery(): String;

    /**
     * Returns the field's label.
     * 
     * @example
     * template.print("Summary of Requested items:\n");  
     * var gr = new GlideRecord("sc_req_item");
     * gr.addQuery("request", current.sysapproval);
     * gr.query();
     * while(gr.next()) {
     *     var nicePrice = gr.price.toString();
     *     if (nicePrice != '') {
     *         nicePrice = parseFloat(nicePrice);
     *         nicePrice = nicePrice.toFixed(2);
     *     }
     *     template.print(gr.number + ":  " + gr.quantity + " X " + gr.cat_item.getDisplayValue() 
     *                      + " at $" + nicePrice + " each \n");
     *     template.print("    Options:\n");
     *     for (key in gr.variables) {
     *       var v = gr.variables[key];
     *       if(v.getGlideObject().getQuestion().getLabel() != '') {
     *          template.space(4);
     *          template.print('     ' +  v.getGlideObject().getQuestion().getLabel() + " = " 
     *                      + v.getDisplayValue() + "\n");  
     *       }
     *     }
     * }
     * @returns Field's label
     */
    getLabel(): String;

    /**
     * Retrieves the last error message. If there is no last error message, null is returned.
     * 
     * @example
     * // Setup a data policy where short_description field in incident is mandatory
     * var gr = new GlideRecord('incident');
     * gr.insert(); // insert without data in mandatory field
     * var errormessage = gr.getLastErrorMessage(); 
     * gs.info(errormessage);
     * @returns The last error message as a string.
     */
    getLastErrorMessage(): String;

    /**
     * Retrieves a link to the current record.
     * 
     * @noStack If true, the sysparm_stack parameter is not appended to the link. The parameter sysparm_stack specifies the page to visit after closing the current link.
     * @example
     * gr = new GlideRecord('incident');
     * gr.addActiveQuery();
     * gr.addQuery("priority", 1);
     * gr.query();
     * gr.next()
     * gs.info(gs.getProperty('glide.servlet.uri') + gr.getLink(false));
     * @returns A link to the current record as a string.
     */
    getLink(noStack: Boolean): String;

    /**
     * Retrieves the class name for the current record.
     * 
     * @example
     * var gr = new GlideRecord('incident'); 
     * var recordClassName = gr.getRecordClassName(); 
     * gs.info(recordClassName);
     * @returns The class name.
     */
    getRecordClassName(): String;

    /**
     * Retrieves the number of rows in the query result.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gr.query();
     * gs.info("Records in incident table: " + gr.getRowCount());
     * @returns Number of rows.
     */
    getRowCount(): Number;

    /**
     * Retrieves the name of the table associated with the GlideRecord.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gs.info(gr.getTableName());
     * @returns The table name
     */
    getTableName(): String;

    /**
     * Gets the primary key of the record, which is usually the sys_id unless otherwise specified.
     * 
     * @example
     * var gr = new GlideRecord('kb_knowledge');
     * gr.query();
     * gr.next();
     * var uniqueid = gr.getUniqueValue();
     * gs.info(uniqueid);
     * @returns The unique primary key as a String, or null if the key is null.
     */
    getUniqueValue(): String;

    /**
     * Retrieves the string value of an underlying element in a field.
     * 
     * @name The name of the field to get the value from.
     * @example
     * var gr = new GlideRecord('incident'); 
     * gr.orderBy('number');
     * gr.query('active','true'); 
     * gr.next() ; 
     * gs.info(gr.getValue('number'));
     * @returns The value of the field.
     */
    getValue(name: String): String;

    /**
     * Determines if there are any more records in the GlideRecord object.
     * 
     * @example
     * var rec = new GlideRecord('incident'); 
     * rec.query(); 
     * if (rec.hasNext()) { 
     *   gs.info("Table is not empty"); 
     * }
     * @returns True if there are more records in the query result set.
     */
    hasNext(): Boolean;

    /**
     * Creates an empty record suitable for population before an insert.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gr.initialize(); 
     * gr.name='New Incident'; 
     * gr.description='Incident description'; 
     * gr.insert();
     */
    initialize();

    /**
     * Inserts a new record using the field values that have been set for the current record.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gr.initialize(); 
     * gr.name = 'New Incident'; 
     * gr.description = 'Incident description'; 
     * gr.insert();
     * @returns Unique ID of the inserted record, or null if the record is not inserted.
     */
    insert(): String;

    /**
     * Checks to see if the current database action is to be aborted.isActionAborted() is initialized (set to false) for new threads and by the next() method.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     *  
     * gs.info(gr.isActionAborted());
     * @returns True if the current database action is to be aborted
     */
    isActionAborted(): Boolean;

    /**
     * Verifies whether the specified encoded query is valid.
     * 
     * @query Encoded query to validate.
     * @example
     * var gr = new GlideRecord('incident_sla');
     * var isValidQuery = gr.isEncodedQueryValid('inc_impact=1^taskslatable_active=true');
     * if (isValidQuery) {
     *        gr.addEncodedQuery('inc_impact=1^taskslatable_active=true');
     *        gr.query();
     *        .
     *        .
     *        .
     * }
     * @returns Indicates whether the specified encoded query is valid. true: passed-in encoded query is valid false: passed-in encoded query is not valid 
     */
    isEncodedQueryValid(query: String): Boolean;

    /**
     * Checks if the current record is a new record that has not yet been inserted into the database.
     * 
     * @example
     * var gr = new GlideRecord("x_app_table"); 
     * gr.newRecord(); // create a new record and populate it with default values
     * gs.info(gr.isNewRecord());
     * @returns True if the record is new and has not been inserted into the database.
     */
    isNewRecord(): Boolean;

    /**
     * Determines if the table exists.
     * 
     * @example
     * var gr = new GlideRecord('incident');
     * gs.info(gr.isValid());
     *  
     * var anotherGr = new GlideRecord('wrong_table_name');
     * gs.info(anotherGr.isValid());
     * @returns True if table is valid or if record was successfully retrieved. False if table is invalid or record was not successfully retrieved.
     */
    isValid(): Boolean;

    /**
     * Determines if the specified field is defined in the current table.
     * 
     * @columnName The name of the the field.
     * @example
     * var gr = new GlideRecord('incident'); 
     * gr.initialize(); 
     * gs.info(gr.isValidField("short_description"));
     * @returns True if the field is defined for the current table.
     */
    isValidField(columnName: String): Boolean;

    /**
     * Determines if a record was actually returned by the query/get record operation.
     * 
     * @example
     * var rec = new GlideRecord('incident');
     * rec.query();
     * while (rec.next()) { 
     *   gs.info(rec.number + ' exists');
     * }
     * gs.info(rec.isValidRecord());
     * @returns Flag that indicates whether a record was actually returned by the query/get operation.Valid values: true: Record returned by query/get operation. false: End of record set, no record returned. 
     */
    isValidRecord(): Boolean;

    /**
     * Creates a new GlideRecord record, sets the default values for the fields, and assigns a unique ID to the record.
     * 
     * @example
     * var gr = new GlideRecord("x_app_table"); 
     * gr.newRecord(); 
     * gs.info(gr.isNewRecord());
     */
    newRecord();

    /**
     * Moves to the next record in the GlideRecord object.Note: This method fails if there is a field in the table called "next". If that is the case, use the method _next().
     * 
     * @example
     * var rec = new GlideRecord('incident');
     * rec.query();
     * while (rec.next()) { 
     *   gs.info(rec.number + ' exists');
     * }
     * @returns Flag that indicates if there is a "next" record in the GlideRecord. Valid values: true: Move to the next record was successful. false: No more records in the result set. 
     */
    next(): Boolean;

    /**
     * Retrieves the current operation being performed, such as insert, update, or delete.
     * 
     * @example
     * //Commonly used in a business rule, returns insert if the current operation is insert
     * gs.info("current operation " + current.operation());
     * @returns The current operation.
     */
    operation(): String;

    /**
     * Specifies an orderBy column.Call this method more than once to order by multiple columns. Results are arranged in ascending order, see orderByDesc(String name) to arrange records in descending order.
     * 
     * @name The column name used to order the records in this GlideRecord object.
     * @example
     * var queryString = "priority=2"; 
     * var gr = new GlideRecord('incident'); 
     * gr.orderBy('short_description'); // Ascending Order
     * gr.addEncodedQuery(queryString); 
     * gr.query(); 
     * while (gr.next()) { 
     *     gs.info(gr.short_description); 
     * }
     */
    orderBy(name: String);

    /**
     * Specifies a decending orderBy column.
     * 
     * @name The column name to be used to order the records in a GlideRecord object.
     * @example
     * var queryString = "priority=2"; 
     * var gr = new GlideRecord('incident'); 
     * gr.orderByDesc('short_description'); //Descending Order
     * gr.addEncodedQuery(queryString); 
     * gr.query(); 
     * while (gr.next()) { 
     *     gs.info(gr.short_description); 
     * }
     */
    orderByDesc(name: String);

    /**
     * Runs the query against the table based on the filters specified by addQuery, addEncodedQuery, etc.This queries the GlideRecord table as well as any references of the table. Usually this is performed without arguments. If name/value pair is specified, "name=value" condition is added to the query. Note: This method fails if there is a field in the table called "query". If that is the case, use the method _query().
     * 
     * @field Column name to query on.
     * @value Value to query for.
     * @example
     * var rec = new GlideRecord('incident');
     * rec.query();
     * while (rec.next()) { 
     *   gs.info(rec.number + ' exists');
     * }
     */
    query(field: Object, value: Object);

    /**
     * Sets a flag to indicate if the next database action (insert, update, delete) is to be aborted. This is often used in business rules.Use in an onBefore business rule to prevent the database action from being done. The business rule continues to run after setAbortAction() is called. Calling setAbortAction() does not stop subsequent business rules from executing. Calling this method only prevents the database action from occurring.
     * 
     * @b True to abort the next action. False if the action is to be allowed.
     * @example
     * // Often used in business rule to check whether the current operation should be aborted.
     * if (current.size &gt; 16) {
     *   current.setAbortAction(true);
     * }
     */
    setAbortAction(b: Boolean);

    /**
     * Sets the limit for number of records are fetched by the GlideRecord query.
     * 
     * @maxNumRecords The maximum number of records to fetch.
     * @example
     * var gr = new GlideRecord('incident');
     * gr.orderByDesc('sys_created_on');
     * gr.setLimit(10);
     * gr.query(); // this retrieves latest 10 incident records created
     */
    setLimit(maxNumRecords: Number);

    /**
     * Sets sys_id value for the current record.
     * 
     * @guid The GUID to be assigned to the current record.
     * @example
     * ar gr = new GlideRecord('incident');
     * gr.short_description='The third floor printer is broken';
     * gr.setNewGuidValue('eb4636ca6f6d31005be8883e6b3ee333');
     * gr.insert();
     * gs.info(gr.sys_id);
     */
    setNewGuidValue(guid: String);

    /**
     * Sets the value of the field with the specified name to the specified value.Normally the script does a gr.category = value. However, if the element name is itself a variable then gr.setValue(elementName, value) can be used. When setting a value, ensure the data type of the field matches the data type of the value you enter.
     * 
     * @name Name of the field.
     * @value The value to assign to the field.
     * @example
     * var elementName = 'short_description'; 
     * var gr = new GlideRecord('incident'); 
     * gr.initialize(); 
     * gr.setValue(elementName, "My DB is not working");
     * gr.insert();
     */
    setValue(name: String, value: Object);

    /**
     * Enables or disables the running of business rules, script engines, and audit.
     * 
     * @enable If true (default), enables business rules. If false, disables business rules.
     * @example
     * //Enable business rules, scripts engines for x_app_table
     * var gr = new GlideRecord("x_app_table"); 
     * gr.setWorkflow(true);
     */
    setWorkflow(enable: Boolean);

    /**
     * Updates the GlideRecord with any changes that have been made. If the record does not already exist, it is inserted.
     * 
     * @reason Optional. Reason for the update. The reason is displayed in the audit record.
     * @example
     * var gr = new GlideRecord('incident');
     * gr.get('99ebb4156fa831005be8883e6b3ee4b9');
     * gr.short_description='Update the short description';
     * gr.update();
     * gs.info(gr.getElement('short_description'));
     * @returns The sys_id of the new or updated record. Returns null if the update fails.
     */
    update(reason: String): String;

    /**
     * Updates each GlideRecord in a stated query with a specified set of changes.When changing field values, use setValue() instead of directly setting the field (field = something). When using updateMultiple(), directly setting the field (gr.state = 4) results in all records in the table being updated instead of just the records returned by the query.Do not use this method with the chooseWindow() or setLimit() methods when working with large tables.This method sets new values and does not clear existing values.
     * 
     * @example
     * // update the state of all active incidents to 4 - "Awaiting User Info"
     * var gr = new GlideRecord('incident');
     * gr.addQuery('active', true);
     * gr.setValue('state',  4);
     * gr.updateMultiple();
     */
    updateMultiple();

    /**
     * Moves to the next record in the GlideRecord. Provides the same functionality as next(), it is intended to be used in cases where the GlideRecord has a column named next.
     * 
     * @example
     * var rec = new GlideRecord('sys_template');
     * rec.query();
     * while (rec._next()) { 
     *   gs.print(rec.number + ' exists');
     * }
     * @returns True if there are more records in the query set.
     */
    _next(): Boolean;

    /**
     * Identical to query(). This method is intended to be used on tables where there is a column named query, which would interfere with using the query() method.Runs the query against the table based on the filters specified by the addQuery() and addEncodedQuery() methods. This method queries the GlideRecord table as well as any references of the table. Typically this method is called without arguments. If a name/value pair is specified, the "name=value" condition is added to the query.
     * 
     * @name Column name on which to query
     * @value Value for which to query
     * @example
     * var rec = new GlideRecord('sys_app_module');
     * rec._query();
     * while (rec.next()) { 
     *  gs.print(rec.number + ' exists');
     * }
     */
    _query(name: Object, value: Object);

}

/**
 * The scoped GlideSchedule API provides methods for performing operations on GlideSchedule objects, such as adding new schedule segments to a schedule, determining if a datetime is within the schedule, or setting the schedule timezone. 
 * 
 * 
 */
declare class GlideSchedule {



    /**
     * Instantiates a GlideSchedule object and loads the schedule information. If a timezone is not specified or is nil, the current session timezone is used.
     * 
     * @sysID The system ID for the schedule.
     * @timeZone The time zone. (Optional)
     * @example
     * var schedule = new GlideSchedule('090eecae0a0a0b260077e1dfa71da828', 'US/Pacific');
     */
    constructor(sysID: String, timeZone: String);

    /**
     * Instantiates an empty GlideSchedule object.
     * 
     */
    constructor();

    /**
     * Adds a new schedule segment to the current schedule.
     * 
     * @startDate The starting date of the new schedule segment.
     * @offSet The time offset of the new schedule segment.
     * @example
     * var startDate = new GlideDateTime('2014-01-02');
     * var days = 2;
     * var dur = new GlideDuration(60 * 60 * 24 * 1000 * days);
     * var schedule = new GlideSchedule();
     * var end = schedule.add(startDate, dur);
     * gs.info(end);
     * @returns The schedule updated with the new schedule segment.
     */
    add(startDate: GlideDateTime, offSet: GlideDuration): GlideDateTime;

    /**
     * Determines the elapsed time in the schedule between two date time values using the timezone of the schedule or, if that is not specified, the timezone of the session.
     * 
     * @startDate The starting datetime.
     * @endDate The ending datetime.
     * @example
     * var startDate = new GlideDateTime('2014-10-16 02:00:00');
     * var endDate = new GlideDateTime('2014-10-18 04:00:00');
     * var schedule = new GlideSchedule();
     *  
     * schedule.load('090eecae0a0a0b260077e1dfa71da828'); // loads "8-5 weekdays excluding holidays" schedule
     * var duration = schedule.duration(startDate, endDate);
     * gs.info(duration.getDurationValue()); // gets the elapsed time in schedule
     * @returns The difference between the starting and ending datetime.
     */
    duration(startDate: GlideDateTime, endDate: GlideDateTime): GlideDuration;

    /**
     * Retrieves the schedule name.
     * 
     * @example
     * sys_id ='04e664654a36232701a2247dcd8fc4cf'; // sys_id for "Application" schedule record
     * var sched = new GlideSchedule(sys_id);
     * gs.info(sched.getName());
     * @returns The name of the current schedule.
     */
    getName(): String;

    /**
     * Determines if the given datetime is within the current schedule.
     * 
     * @time The datetime value to check.
     * @example
     * var g = new GlideRecord('cmn_schedule');
     * g.addQuery('type', 'blackout');
     * g.query();
     * if (g.next()) {
     *    var sched = new GlideSchedule(g.sys_id);
     *    var d = new GlideDateTime();
     *    d.setDisplayValue("2007-09-18 12:00:00");
     *    if (sched.isInSchedule(d)) 
     *       gs.info("Is in the schedule");
     *    else
     *       gs.info("Is NOT in the schedule");
     * }
     * @returns True if the specified datetime is within the schedule; otherwise, false.
     */
    isInSchedule(time: GlideDateTime): Boolean;

    /**
     * Determines if the current schedule is valid. A schedule is valid if it has at least one schedule span.
     * 
     * @example
     * var g = new GlideRecord('cmn_schedule');
     * g.addQuery('type', 'blackout');
     * g.query();
     * if (g.next()) {
     *    var sched = new GlideSchedule(g.sys_id);
     *    var d = new GlideDateTime();
     *    d.setDisplayValue("2007-09-18 12:00:00");
     *    if (sched.isValid()) 
     *       gs.info("Is valid");
     *  
     *    else
     *       gs.info("Is not valid");
     * }
     * @returns True if the schedule is valid.
     */
    isValid(): Boolean;

    /**
     * Loads a schedule with the schedule information.
     * 
     * @sysID The system ID of the schedule.
     * @timeZone (Optional) The timezone. If a timezone is not specified, or is nil, the current session timezone is used for the schedule.
     * @excludeSpanID Any span to exclude.
     * @example
     * var x = new GlideSchedule();
     * x.load('08fcd0830a0a0b2600079f56b1adb9ae');
     */
    load(sysID: String, timeZone: String, excludeSpanID: String);

    /**
     * Sets the timezone for the current schedule.
     * 
     * @timeZone The timezone.
     * @example
     * var schedule = new GlideSchedule();
     * schedule.setTimeZone('US/Pacific');
     */
    setTimeZone(timeZone: String);

    /**
     * Determines how much time (in milliseconds) until start time of the next schedule item.This function is intended to be called when the GlideSchedule object (cmn_schedule table) is not currently in the schedule window. The whenNext() call returns duration (in ms) until the GlideSchedule object is within the schedule. This function does not return a meaningful value if called when the GlideSchedule object is within the schedule.
     * 
     * @time Time to be evaluated
     * @timeZone Timezone
     * @example
     * var startDate = new GlideDateTime('2014-10-25 08:00:00');
     * var glideSchedule = new GlideSchedule('08fcd0830a0a0b2600079f56b1adb9ae', 'UTC');
     * gs.info(glideSchedule.whenNext(startDate));
     * @example
     * testScript(); 
     * function testScript() { 
     * var now = new GlideDateTime(); //current date and time
     * var sched = new GlideSchedule("&lt;sys_id&gt;"); // Use a cmn_schedule sys_id 
     * if (sched.isInSchedule(now)){ 
     * gs.info('We are in an active schedule window so whenNext() is not helpful'); 
     * } else{  
     * gs.info('Not currently in schedule so call whenNext()'); 
     * var msUntilNext = sched.whenNext(new GlideDateTime(), 'US/Pacific'); 
     * gs.info('Next schedule starts in '+msUntilNext+' milliseconds'); 
     * } 
     * }
     * \\ Output [schedule inactive)]:
     * \\ *** Script: Not currently in schedule so call whenNext() 
     * \\ *** Script: Next schedule starts in -1 milliseconds
     * @returns Number of milliseconds until the start time of the next schedule item. Returns -1 if never.
     */
    whenNext(time: GlideDateTime, timeZone: String): Number;

}

/**
 * The GlideScopedEvaluator API allows you to evaluate scripts in a GlideRecord field from both scoped and global server scripts. The GlideScopedEvaluator API evaluates records with script fields defined. The scope of the script is defined by the scope of the record.
 * 
 * 
 */
declare class GlideScopedEvaluator {



    /**
     * Instantiates a GlideScopedEvaluator object.
     * 
     */
    constructor();

    /**
     * Evaluates a script from a GlideRecord field.
     * 
     * @grObj The GlideRecord containing a script expression.
     * @scriptField (Optional) The name of the field containing the script expression.
     * @variables (Optional) A map of variables with name-value pairs. These variables are available to the script during execution of this method.
     * @example
     * // For this example, we created a table: "x_app_table" with two columns: "short_description", "test_script"
     * // "test_script" will store the script to be evaluated by GlideScopedEvaluator.
     * gr = new GlideRecord('x_app_table'); 
     * gr.short_description = 'Testing GlideScopedEvaluator';  
     * gr.test_script = "gs.getUser().getName() + ' says ' + greeting; "; 
     * gr.insert(); 
     *  
     * // setup variables to be used by the script
     * var vars = {'greeting' : 'hello'};
     *  
     * //Evaluate the script from the field
     * var evaluator = new GlideScopedEvaluator(); 
     * gr = new GlideRecord('x_app_table'); 
     * gr.addQuery('short_description','Testing GlideScopedEvaluator'); 
     * gr.query(); 
     * if (gr.next()) { 
     *     gs.info(evaluator.evaluateScript(gr, 'test_script', vars));
     * }
     * @returns The result of the script execution.
     */
    evaluateScript(grObj: GlideRecord, scriptField: String, variables: Object): Object;

    /**
     * Returns a variable from a GlideScopedEvaluator object.
     * 
     * @name The name of the variable.
     * @example
     * //setting up a record that contains the script to be executed.
     * gr = new GlideRecord('x_app_table'); 
     * gr.short_description = 'Calculate Addition';  
     * gr.calculate = "result = x + y"; 
     * gr.insert(); 
     *  
     * var evaluator = new GlideScopedEvaluator();
     * evaluator.putVariable('x', 100);
     * evaluator.putVariable('y', 200);
     * evaluator.putVariable('result', null);
     *  
     * // Now retrieve the result 
     * gr = new GlideRecord('x_app_table'); 
     * gr.addQuery('short_description','Calculate Addition'); 
     * gr.query(); 
     * if (gr.next()) { 
     *     evaluator.evaluateScript(gr, 'calculate', null);
     *     gs.info(evaluator.getVariable('result'));
     * }
     * @returns The value of the specified variable.
     */
    getVariable(name: String): Object;

    /**
     * Puts a variable into the GlideScopedEvaluator object. These variables are available to the script that this GlideScopedEvaluator object runs.
     * 
     * @name The name of the variable.
     * @value The value of the variable.
     * @example
     * /setting up a record that contains the script to be executed.
     * gr = new GlideRecord('x_app_table'); 
     * gr.short_description = 'Calculate Addition';  
     * gr.calculate = "result = x + y"; 
     * gr.insert(); 
     *  
     * var evaluator = new GlideScopedEvaluator();
     * evaluator.putVariable('x', 100);
     * evaluator.putVariable('y', 200);
     * evaluator.putVariable('result', null);
     *  
     * // Now retrieve the result 
     * gr = new GlideRecord('x_app_table'); 
     * gr.addQuery('short_description','Calculate Addition'); 
     * gr.query(); 
     * if (gr.next()) { 
     *     evaluator.evaluateScript(gr, 'calculate', null);
     *     gs.info(evaluator.getVariable('result'));
     * }
     */
    putVariable(name: String, value: Object);

}

/**
 * A GlideScriptableInputStream object cannot be instantiated directly, but is used as an opaque object which is used to connect an input stream from GlideSysAttachment.getContentStream() with other streaming APIs, such as GlideTextReader, GlideDigest, and XMLDocument2. See the scoped GlideSysAttachment API for methods that return a GlideScriptableInputStream object. The scoped GlideTextReader constructor requires a GlideScriptableInputStream object as an input parameter.
 * 
 * 
 */
declare class GlideScriptableInputStream {



}

/**
 * ServiceNow processors are equivalent to Java servlets. Processors provide a customizable URL endpoint that can execute arbitrary server-side JavaScript code and produce output such as TEXT, JSON, or HTML. The GlideScriptedProcessor APIs are used in processor scripts to access the the processor (servlet) capabilities. There are no constructors for the GlideScriptedProcessor APIs. The methods are called using the global variable g_processor. * * A useful global variable, g_target, is available in processor scripts. It contains the table name extracted from the URL. * * The URL to a processor has the format: https://&lt;instance name.servicenow.com&gt;/&lt;path endpoint&gt;.do?&lt;parameter endpoint&gt;=&lt;value&gt; where the path endpoint and parameter endpoint are defined on the processor form.
 * 
 * 
 */
declare class GlideScriptedProcessor {



    /**
     * Redirects to the specified URL.
     * 
     * @url the destination URL
     * @example
     * //Do whatever processing you need and redirect to the homepage
     * g_processor.redirect("/navpage.do")
     */
    redirect(url: String);

    /**
     * Encodes an object as a JSON string and writes it to the current URL.
     * 
     * @o The object to encode to a JSON string.
     * @example
     * var map = {"key1":"value1","key2":"value2"};
     * g_processor.writeJSON(map);
     */
    writeJSON(o: Object);

    /**
     * Writes the specified string to the current URL in the specified character-encoding.
     * 
     * @contentType Sets the content type of the response sent to the client, if the response has not been committed, and may include a character-encoding specification.
     * @s The string to write.
     * @example
     * var name = g_request.getParameter("name");
     * g_processor.writeOutput("text/plain", "Hello " + name);
     */
    writeOutput(contentType: String, s: String);

    /**
     * Writes the specified string to the current URL.
     * 
     * @s The string to write.
     * @example
     * var name = g_request.getParameter("name");
     * g_processor.writeOutput("Hello " + name);
     */
    writeOutput(s: String);

}

/**
 * The scoped GlideSecureRandomUtil API provides methods for generating integers, long values, and strings. There is no constructor for this class. Methods are accessed through the static object GlideSecureRandomUtil. The GlideSecureRandomUtil class is available in both global and scoped applications.
 * 
 * 
 */
declare class GlideSecureRandomUtil {



    /**
     * Generates a pseudo-random integer.
     * 
     * @example
     * gs.info(GlideSecureRandomUtil.getSecureRandomInt());
     * 
     * @returns The pseudo-randomly generated integer.
     */
    getSecureRandomInt(): Number;

    /**
     * Generates a pseudo-random integer between 0 (inclusive) and the bound (exclusive) value that you pass into the method.
     * 
     * @bound The bound value.
     * @example
     * gs.info(GlideSecureRandomUtil.getSecureRandomIntBound(100));
     * @returns The pseudo-randomly generated integer.
     */
    getSecureRandomIntBound(bound: Number): Number;

    /**
     * Generates pseudo-random long value.
     * 
     * @example
     * gs.info(GlideSecureRandomUtil.getSecureRandomLong());
     * 
     * @returns The pseudo-randomly generated 64-bit integer.
     */
    getSecureRandomLong(): Number;

    /**
     * Generates a random alpha-numeric String with the specified length.
     * 
     * @length The length of the string in number of characters.
     * @example
     * gs.info(GlideSecureRandomUtil.getSecureRandomString(12));
     * @returns The randomly generated string.
     */
    getSecureRandomString(length: Number): String;

}

/**
 * Provides methods to work with URLs. Access these methods using the static object GlideSecurityUtils. This class is available in scoped and global scripts.
 * 
 * 
 */
declare class GlideSecurityUtils {



    /**
     * Removes suspicious encoding to prevent reflected or DOM based cross site scripting.
     * 
     * @url The URL to be checked.
     * @example
     * myurl='javascript%3Aalert(1)';
     * var clean=GlideSecurityUtils.cleanURL(myurl);
     * gs.info(clean);
     * @returns The URL stripped of problem elements.
     */
    cleanURL(url: String): String;

    /**
     * Removes the domain address from the URL, which leaves the page name and parameters.
     * 
     * @url The URL to be turned into a relative URL.
     * @example
     * myurl='http://evildomain.com/test.do';
     * relativeURL=GlideSecurityUtils.enforceRelativeURL(myurl);
     * gs.info(relativeURL);
     * @returns A relative URL.
     */
    enforceRelativeURL(url: String): String;

    /**
     * Add escape characters to a script.Adding escape characters to a script helps prevent cross-site scripting.
     * 
     * @script The script to have escape characters added.
     * @example
     * theScript="&lt;script&gt; alert(1)&lt;/script&gt;";
     * var escapedScript=GlideSecurityUtils.escapeScript(theScript);
     * gs.info(escapedScript);
     * @returns The script with escape characters added.
     */
    escapeScript(script: String): String;

    /**
     * Check the specified URL against the system defined white list.
     * 
     * @url The URL to be checked against the URL white list.
     * @example
     * myURL="http://evil.com/badscript.do";
     * isWhitelisted=GlideSecurityUtils.isURLWhiteListed(myURL);
     * gs.info(isWhitelisted);
     * @returns Returns true if the specified URL is in the white list.
     */
    isURLWhiteListed(url: String): Boolean;

}

/**
 * The GlideServletRequest API is used in processor scripts. ServiceNow processors are equivalent to Java servlets. Processors provide a customizable URL endpoint that can execute arbitrary server-side JavaScript code and produce output such as TEXT, JSON, or HTML. The GlideServletRequest API is used in processor scripts to access the HttpServletRequest object. The GlideServletRequest object provides a subset of the HttpServletRequest APIs. The methods are called using the global variable g_request. * * A useful global variable, g_target, is available in processor scripts. It contains the table name extracted from the URL. * * The URL to a processor has the format: https://&lt;instance name.servicenow.com&gt;/&lt;path endpoint&gt;.do?&lt;parameter endpoint&gt;=&lt;value&gt; where the path endpoint and parameter endpoint are defined on the processor form.
 * 
 * 
 */
declare class GlideServletRequest {



    /**
     * Returns the MIME type of the body of the request.
     * 
     * @example
     * var contentType = g_request.getContentType();
     * @returns The content type, returns null if the content type is not known.
     */
    getContentType(): String;

    /**
     * Returns the header value.
     * 
     * @name The name of the header to be retrieved.
     * @example
     * var headerValue = g_request.getHeader("host");
     * @returns The header.
     */
    getHeader(name: String): String;

    /**
     * Returns a comma-separated list of header names.
     * 
     * @example
     * var headerList = g_request.getHeaderNames();
     * @returns A comma-separated list of header names.
     */
    getHeaderNames(): String;

    /**
     * Returns the header values.
     * 
     * @name Names of the headers to be retrieved.
     * @example
     * var headerValue = g_request.getHeaders("host");
     * @returns The header values.
     */
    getHeaders(name: String): String;

    /**
     * Returns the value of the parameter contained in the request URL.
     * 
     * @name The name of the parameter to be retrieved. This can be the parameter endpoint from the processor form.
     * @example
     * var name = g_request.getParameter("x_snc_custom_x_snc_name");
     * @returns The parameter value. Returns null if the parameter is not found.
     */
    getParameter(name: String): Strings;

    /**
     * Returns a list of the parameter names found in the request URL.
     * 
     * @example
     * var paramList = g_request.getParameterNames();
     * @returns A comma-separated list of parameter names.
     */
    getParameterNames(): String;

    /**
     * Returns the query string from the request.
     * 
     * @example
     * var daString = g_request.getQueryString();
     * g_processor.writeOutput("The query string is: " + daString);
     * @returns The query string.
     */
    getQueryString(): String;

}

/**
 * The GlideServletResponse API is used in processor scripts. ServiceNow processors are equivalent to Java servlets. Processors provide a customizable URL endpoint that can execute arbitrary server-side JavaScript code and produce output such as TEXT, JSON, or HTML. The GlideServletResponse API is used in processor scripts to access the HttpServletResponse object. The GlideServletResponse object provides a subset of the HttpServletResponse APIs. The methods are called using the global variable g_response. * * A useful global variable, g_target, is available in processor scripts. It contains the table name extracted from the URL. * * The URL to a processor has the format: https://&lt;instance name.servicenow.com&gt;/&lt;path endpoint&gt;.do?&lt;parameter endpoint&gt;=&lt;value&gt; where the path endpoint and parameter endpoint are defined on the processor form.
 * 
 * 
 */
declare class GlideServletResponse {



    /**
     * Sends a temporary redirect to the client.
     * 
     * @location The URL to receive the response.
     */
    sendRedirect(location: String);

    /**
     * Sets the MIME type of the response
     * 
     * @type The MIME type.
     * @example
     * g_response.setContentType('text/html;charset=UTF-8');
     */
    setContentType(type: String);

    /**
     * Sets a response header to the specified value.
     * 
     * @key Specifies the header.
     * @value The value to be assigned to the header. If the header exists, it is over written.
     * @example
     * g_response.setHeader("host", "demonightlyus.service-now.com");
     */
    setHeader(key: String, value: String);

    /**
     * Sets the status code for the response.
     * 
     * @status The status to be set.
     * @example
     * // set the status to okay
     * g_response.setStatus(200);
     */
    setStatus(status: Number);

}

/**
 * The scoped GlideSession API provides a way to find information about the current session. There are no constructors for creating an instance of a scoped GlideSession object. Instead, use the getSession() method of the scoped GlideSystem API.
 * 
 * 
 */
declare class GlideSession {



    /**
     * Retrieves a session client value previously set with putClientData().This method is used in a client script to retrieve data values that were set by a server script that used the putClientData() method.
     * 
     * @paramName Name of the client data to retrieve.
     * @example
     * var session = gs.getSession();
     * session.putClientData('test1', 'Harry');
     * var clientData = session.getClientData('test1');
     * gs.info(clientData);
     * @returns The client data as a string.
     */
    getClientData(paramName: String): String;

    /**
     * Returns the client IP address.
     * 
     * @example
     * var session = gs.getSession();
     * var addr = session.getClientIP();
     * gs.info(addr);
     * @returns The IP address.
     */
    getClientIP(): String;

    /**
     * Returns the application currently selected in the application picker.This method requires admin privileges.
     * 
     * @example
     * var session = gs.getSession();
     * var appID = session.getCurrentApplicationId();
     * gs.info(appID);
     * @returns The currently selected application.
     */
    getCurrentApplicationId(): String;

    /**
     * Returns the session's language code.
     * 
     * @example
     * var session = gs.getSession();
     * var language = session.getLanguage();
     * gs.info(language);
     * @returns The session's language code.
     */
    getLanguage(): String;

    /**
     * Returns the session token.
     * 
     * @example
     * var session = gs.getSession();
     * var token = session.getSessionToken();
     * gs.info(token);
     * @returns The session token.
     */
    getSessionToken(): String;

    /**
     * Returns the name of the session's time zone.
     * 
     * @example
     * var session = gs.getSession();
     * var zoneName = session.getTimeZoneName();
     * gs.info(zoneName);
     * @returns The name of the session's time zone.
     */
    getTimeZoneName(): String;

    /**
     * Returns the URL on the stack. Returns null if the stack is empty.
     * 
     * @example
     * var session = gs.getSession();
     * var URL = session.getUrlOnStack();
     * gs.info(URL);
     * @returns The URL. Returns null if the stack is empty.
     */
    getUrlOnStack(): String;

    /**
     * Returns true if the user is impersonating another user.
     * 
     * @example
     * var isImpersonator = gs.getSession().isImpersonating();
     * gs.info(isImpersonator);
     * @returns Returns true if the user is impersonating another user; otherwise, returns false.
     */
    isImpersonating(): Boolean;

    /**
     * Returns true if the session is interactive.An interactive session is one that involves an end-user interacting with a user interface that then retrieves information from a server. An example of this type of session is when a user logs in using the log-in screen or uses a form to query a data store. A non-interactive session is one that only involves programmatic interaction with a server such as a SOAP request to retrieve data.
     * 
     * @example
     * var interActive = gs.getSession().isInteractive();
     * gs.info(interActive);
     * @returns True if the session is interactive.
     */
    isInteractive(): Boolean;

    /**
     * Returns true if the user is logged in.
     * 
     * @example
     * var session = gs.getSession();
     * var loggedIn = session.isLoggedIn();
     * gs.info(loggedIn);
     * @returns True if the user is logged in.
     */
    isLoggedIn(): Boolean;

    /**
     * Sets a session client value that can be retrieved with getClientData(). This method is used in a server side script that runs when a form is created.
     * 
     * @paramName Name of the client data to set.
     * @paramValue Value of the client data.
     * @example
     * var session = gs.getSession();
     * session.putClientData('test1', 'Harry');
     * var clientData = session.getClientData('test1');
     * gs.info(clientData);
     */
    putClientData(paramName: String, paramValue: String);

}

/**
 * Interact with data and perform record operations in Service Portal widgets. You access GlideSPScriptable methods by using the global $sp object.
 * 
 * 
 */
declare class GlideSPScriptable {



    /**
     * Returns true if the user can read the specified GlideRecord.If the record type is kb_knowledge, sc_cat_item, or sc_category, the method checks if the user can view the item.
     * 
     * @gr The GlideRecord to check.
     * @example
     * //Server script
     * data.items = [];
     * data.userName = gs.getUserDisplayName();
     * var gr = new GlideRecord("sc_cat_item");
     * gr.query();
     * while(gr.next() &amp;&amp; data.items.length &lt; 10) {
     *     if ($sp.canReadRecord(gr)) {
     *         data.items.push(gr.getDisplayValue("name"));
     *     }
     * }
     * 
     * //HTML template
     * &lt;div class="panel panel-default"&gt;
     *     &lt;div class="panel-heading"&gt;Hi, {{c.data.userName}}!&lt;/div&gt;
     *     &lt;div class="panel-body"&gt;
     *         Here are some things you can order:
     *         &lt;ul&gt;&lt;li ng-repeat="item in c.data.items"&gt;{{item}}&lt;/li&gt;&lt;/ul&gt;
     *     &lt;/div&gt;
     * &lt;/div&gt;
     * @returns True if the record is valid and readable.
     */
    canReadRecord(gr: GlideRecord): Boolean;

    /**
     * Returns true if the user can read the specified GlideRecord.If the record type is kb_knowledge, sc_cat_item, or sc_category, the method checks if the user can view the item.
     * 
     * @table Name of the table to query.
     * @sysId Sys_id of the record to query.
     * @returns True if the record is valid and readable.
     */
    canReadRecord(table: String, sysId: String): Boolean;

    /**
     * Returns true if the currently logged in user has permission to view the specified page.The system determines permission using roles and user criteria. For more information, see Configure page security by role and User criteria for Service Portal.
     * 
     * @pageID Page ID from the Pages [sp_page] table.
     * @example
     * GlideSPScriptable.canSeePage("kb_view2")
     * @returns Flag that indicates whether the currently logged in user has permissions to view the specified page. Values include: true: The user can view the page. false: Either the user cannot view the page, the given pageID is not valid, or the user is not logged in. 
     */
    canSeePage(pageID: String): Boolean;

    /**
     * Returns a model and view model for a sc_cat_item or sc_cat_item_guide.This method is deprecated. Use the getCatalogItem(String sysId, Boolean isOrdering) method instead. This method calls the getCatalogItem(String sysId, Boolean isOrdering) method with the isOrdering parameter set to false, which means that write roles security checking is done.This method is a quick way to get the data necessary to render and order a catalog item using &lt;sp-model /&gt;. If you just need to get a catalog item to show its picture or name, use GlideRecord to query the sc_cat_item table.
     * 
     * @sysId The sys_id of the catalog item (sc_cat_item) or order guide (sc_cat_item_guide).
     * @example
     * // Server script
     * (function() {
     *     var sys_id = $sp.getParameter("sys_id")
     *     data.catItem = $sp.getCatalogItem(sys_id);
     * })();
     * 
     * // Client script
     * function($http, spUtil) {
     *     var c = this;
     *     var submitting = false;
     *     c.getIt = function() {
     *         if (submitting) return;
     *         $http.post(spUtil.getURL('sc_cat_item'), c.data.catItem).success(function(response) {
     *             if (response.answer) {
     *                 c.req = response.answer;
     *                 c.req.page = c.req.table == 'sc_request' ? 'sc_request' : 'ticket';
     *             }
     *         });
     *     }
     * }
     * 
     * //SCSS
     * .img-bg {
     *     padding: 5px;
     *     background-color: $brand-primary;
     * }
     * 
     * .img-responsive {
     *     margin: 0 auto;
     * }
     * 
     * .cat-icon {
     *     display: block;
     *     margin: -40px auto 0;
     * }
     * 
     * // HTML template
     * &lt;div class="col-sm-4"&gt;
     *   &lt;div class="panel panel-default"&gt;
     *     &lt;div class="img-bg"&gt;
     *       &lt;img ng-src="{{::data.catItem.picture}}" class="img-responsive" /&gt;
     *     &lt;/div&gt;
     *     &lt;span class="cat-icon fa fa-stack fa-lg fa-3x hidden-xs"&gt;
     *       &lt;i class="fa fa-circle fa-stack-2x text-success"&gt;&lt;/i&gt;
     *       &lt;i class="fa fa-desktop fa-stack-1x fa-inverse"&gt;&lt;/i&gt;
     *     &lt;/span&gt;
     *     &lt;div class="panel-body"&gt;
     *       &lt;p class="lead text-center"&gt;{{::data.catItem.name}}&lt;/p&gt;
     *       &lt;ul class="list-unstyled"&gt;
     *         &lt;li class="text-center" ng-if="::data.catItem.price"&gt;${Price}: {{::data.catItem.price}}&lt;/li&gt;
     *       &lt;/ul&gt;
     *       &lt;sp-model form-model="::data.catItem" mandatory="mandatory"&gt;&lt;/sp-model&gt;
     *       &lt;p ng-if="c.req" class="text-center text-success"&gt;
     *         ${Request created!} &lt;a href="?id={{c.req.page}}&amp;table={{c.req.table}}&amp;sys_id={{c.req.sys_id}}"&gt;{{c.req.number}}&lt;/a&gt;
     *       &lt;/p&gt;
     *       &lt;button ng-if="!c.req" class="btn btn-default btn-block" ng-click="c.getIt()"&gt;${Get it}&lt;/button&gt;
     *     &lt;/div&gt;
     *   &lt;/div&gt;
     * &lt;/div&gt;
     * @returns An object containing the catalog item variable model, view, sections, pricing, and client scripts.
     */
    getCatalogItem(sysId: String): Object;

    /**
     * Returns a model and view model for a sc_cat_item or sc_cat_item_guide.
     * 
     * @sysId The sys_id of the catalog item (sc_cat_item) or order guide (sc_cat_item_guide).
     * @isOrdering When true, uses create roles security check. When false, uses write roles security check.When users are ordering an item or have it in their cart, check using the create roles.
     * If users are not ordering, for example, somebody is looking at a requested item to see the variables associated with that item, then check using the write roles.
     * @returns An object containing the catalog item variable model, view, sections, pricing, and client scripts.
     */
    getCatalogItem(sysId: String, isOrdering: Boolean): Object;

    /**
     * Returns the display value of the specified field (if it exists and has a value) from either the widget's sp_instance or the sp_portal record.
     * 
     * @fieldName Name of the field
     * @example
     * //Server script
     * (function() {
     *     data.title = $sp.getDisplayValue("title");
     *     data.catalog = $sp.getDisplayValue("sc_catalog");
     * })();
     * 
     * //HTML template
     * &lt;div&gt;
     *     &lt;h1&gt;sp_instance.title: {{::data.title}}&lt;/h1&gt;
     *     &lt;h1&gt;sp_portal.sc_catalog: {{::data.catalog}}&lt;/h1&gt;
     * &lt;/div&gt;
     * @returns The display value from either the sp_instance or sp_portal record.
     */
    getDisplayValue(fieldName: String): String;

    /**
     * Returns information about the specified field in the specified GlideRecord.
     * 
     * @gr The GlideRecord to check
     * @fieldName The field to find information for
     * @returns An object containing the field's label, value, displayValue, and type. Returns null if the GlideRecord of field name are not valid, or if the field is not readable.
     */
    getField(gr: GlideRecord, fieldName: String): Object;

    /**
     * Checks the specified list of field names, and returns an array of valid field names.
     * 
     * @gr The GlideRecord to check
     * @fieldNames A comma separated list of field names.
     * @returns An array of valid fields.
     */
    getFields(gr: GlideRecord, fieldNames: String): Array<any>;

    /**
     * Checks the specified list of field names and returns an object of valid field names.
     * 
     * @gr The GlideRecord to check
     * @fieldNames A comma separated list of field names.
     * @returns An object containing valid field names.
     */
    getFieldsObject(gr: GlideRecord, fieldNames: String): Object;

    /**
     * Return the form.
     * 
     * @tableName The name of the table
     * @sysId The form's sys_id
     * @returns The form
     */
    getForm(tableName: String, sysId: String): Object;

    /**
     * Returns KB articles in the specified category and its subcategories.To avoid performance issues, do not use this method to return articles in large categories or articles with inline images. Instead, use getKBArticleSummaries().
     * 
     * @sys_id Sys_id of the KB article category.
     * @limit Maximum number of KB articles returned.
     * @example
     * //Server script 
     * (function() {
     *     data.kbs = $sp.getKBCategoryArticles("0ac1bf8bff0221009b20ffffffffffec", 5);
     * })();
     * 
     * //HTML template
     * &lt;div&gt;
     * articles: {{::data.kbs}}
     * &lt;/div&gt;
     * 
     * @returns The articles within the category and its subcategories with: A workflow_state of published. A valid_to date greater than or equal to the current date. 
     */
    getKBCategoryArticles(sys_id: String, limit: Number): Array<any>;

    /**
     * Returns Knowledge Base article summaries in the specified category and its subcategories.
     * 
     * @sys_id Sys_id of the KB article category.
     * @limit Maximum number of KB articles returned.
     * @maxChars Maximum number of characters to return from the article text. For full article text, set the value to -1.
     * @example
     * //Server script 
     * (function() {
     *     data.summary = $sp.getKBCategoryArticleSummaries("0ac1bf8bff0221009b20ffffffffffec", 5, 200);
     * })();
     * 
     * //HTML template
     * &lt;div&gt;
     * articles: {{::data.summary}}
     * &lt;/div&gt;
     * 
     * @returns The articles within the category and its subcategories with: A workflow_state of published. A valid_to date greater than or equal to the current date. 
     */
    getKBCategoryArticleSummaries(sys_id: String, limit: Number, maxChars: Number): Array<any>;

    /**
     * Returns the number of articles in the defined Knowledge Base.
     * 
     * @sys_id Sys_id of a Knowledge Base record.
     * @example
     * //Server script 
     * (function() {
     *     data.count = $sp.getKBCount("a7e8a78bff0221009b20ffffffffff17");
     * })();
     * 
     * //HTML template
     * &lt;div&gt;
     * articles: {{::data.count}}
     * &lt;/div&gt;
     * 
     * @returns Number of knowledge articles in the defined Knowledge Base with: A workflow_state of published. A valid_to date greater than or equal to the current date. 
     */
    getKBCount(sys_id: String): Number;

    /**
     * Returns a list of the specified table's columns in the specified view.
     * 
     * @tableName Name of the table
     * @view The view by which to filter the columns
     * @returns An object containing the column names.
     */
    getListColumns(tableName: String, view: String): Object;

    /**
     * Returns the (?id=) portion of the URL based on the sp_menu type.
     * 
     * @page The page
     * @returns The href portion of the URL.
     */
    getMenuHREF(page: GlideRecord): String;

    /**
     * Returns an array of menu items for the specified instance.
     * 
     * @sysId sysId of the instance
     * @returns Menu items for the specified instance
     */
    getMenuItems(sysId: String): Array<any>;

    /**
     * Returns the value of the specified parameter.
     * 
     * @name The name of the key from the query string or post body.
     * @returns Returns the specified parameter as an object. Returns null if there is no request, JSON request, or widget.
     */
    getParameter(name: String): Object;

    /**
     * Returns the portal record from the Service Portals [sp_portal] table.
     * 
     * @example
     * //Server script
     * (function() {
     *     var portalGr = $sp.getPortalRecord();
     *     data.logo = portalGr.getDisplayValue("logo");
     *     data.homepage = portalGr.getDisplayValue("homepage.id");
     * })();
     * 
     * //HTML template
     * &lt;div&gt;
     *     &lt;img ng-src="{{::c.data.logo}}" /&gt;
     *     &lt;a href="?id={{::c.data.homepage}}"&gt;Click here to go home&lt;/a&gt;
     * &lt;/div&gt;
     * @returns The portal record for the current portal from the Service Portals [sp_portal] table.
     */
    getPortalRecord(): GlideRecord;

    /**
     * If parameters are provided, returns the GlideRecord identified by the provided table and Sys ID. If no parameters are provided, returns the record identified by the current URL.
     * 
     * @table Optional. The table of the record to return. If no parameters are included, returns the table and Sys ID identified by the current URL.
     * @sys_id Optional. The Sys ID of the record to return. If no parameters are included, returns the record identified by the current URL.
     * @example
     * //Server script 
     * (function(){ 
     * var gr = $sp.getRecord(); 
     * data.tableLabel = gr.getLabel(); 
     * })(); 
     * 
     * //HTML template 
     * &lt;div class="panel-heading"&gt; 
     * &lt;h4 class="panel-title"&gt;${{{data.tableLabel}} details}&lt;/h4&gt; 
     * &lt;/div&gt;
     * @returns If parameters are provided, returns the record identified by the provided table and Sys ID. If no parameters are provided, returns the record identified by the current URL. Returns null if the widget is embedded by another widget, or if the record for the provided parameters is not found.
     */
    getRecord(table: String, sys_id: String): GlideRecord;

    /**
     * Copies display values for the specified fields into the data parameter.
     * 
     * @data The display values for the specified fields are copied to this object.
     * @from The GlideRecord to process.
     * @names A comma-separated list of field names.
     */
    getRecordDisplayValues(data: Object, from: GlideRecord, names: String);

    /**
     * For the specified fields, copies the element's name, display value, and value into the data parameter.
     * 
     * @data The element's name, display value, and value for the specified fields are copied to this object.
     * @from The GlideRecord to process.
     * @names A comma-separated list of field names.
     */
    getRecordElements(data: Object, from: GlideRecord, names: String);

    /**
     * Copies values for the specified field names from the GlideRecord into the data parameter.
     * 
     * @data The value for the specified fields are copied to this object.
     * @from The GlideRecord to process.
     * @names A comma-separated list of field names.
     */
    getRecordValues(data: Object, from: GlideRecord, names: String);

    /**
     * Returns Service Catalog variables associated with a record in String format.
     * 
     * @gr The record to retrieve Service Catalog variables for. Must be a record with Service Catalog variables defined, such as a requested item [sc_req_item] record or an incident submitted through a record producer.
     * @includeNilResponses Optional. If true, the API includes variables with no user-defined value.
     * @example
     * //Server script 
     * (function() {
     * var itemsGR = new GlideRecord("sc_req_item");
     * itemsGR.get('585d1bc44f4f13008a959a211310c77d');
     * 	
     * data.scVars = $sp.getRecordVariables(itemsGR);
     * 
     * })();
     * 
     * //HTML template
     * &lt;div&gt;
     * Requested item variables: {{::data.scVars}}
     * &lt;/div&gt;
     * @returns Service Catalog variables associated with the record.
     */
    getRecordVariables(gr: GlideRecord, includeNilResponses: Boolean): String;

    /**
     * Returns an array of Service Catalog variables associated with a record.
     * 
     * @gr The record to retrieve Service Catalog variables for. Must be a record with Service Catalog variables defined, such as a requested item [sc_req_item] record or an incident submitted through a record producer.
     * @includeNilResponses Optional. If true, the API includes variables with no user-defined value.
     * @example
     * //Server script 
     * (function() {
     * var itemsGR = new GlideRecord("sc_req_item");
     * itemsGR.get('585d1bc44f4f13008a959a211310c77d');
     * 	
     * data.scVars = $sp.getRecordVariablesArray(itemsGR);
     * 
     * })();
     * 
     * //HTML template
     * &lt;div&gt;
     * Requested item variables: {{::data.scVars}}
     * &lt;/div&gt;
     * @returns Array of Service Catalog variables associated with the record.
     */
    getRecordVariablesArray(gr: GlideRecord, includeNilResponses: Boolean): Object;

    /**
     * Gets the activity stream for the specified record. This method works on tables that extend the task table.
     * 
     * @table The table name
     * @sysID The sys_id of the record
     * @returns If a table extending the task table is specified, contains the display_value, sys_id, short_description,number, entries, user_sys_id, user_full_name, user_login, label, table, and journal_fields properties; otherwise contains the table and sys_id properties.Note: The user_login property contains the User ID of the current user. The user_sys_id and iser_full_name properties reference the creator of the queried record.
     */
    getStream(table: String, sysID: String): Object;

    /**
     * Returns the user's initials.
     * 
     * @returns The user's initials
     */
    getUserInitials(): String;

    /**
     * Returns the named value of the JSON request, instance, or portal.
     * 
     * @name Name of the JSON request, instance, or portal.
     * @example
     * //Server script
     * (function() {
     *     data.title = $sp.getValue("title");
     *     data.catalog = $sp.getValue("sc_catalog");
     * })();
     * 
     * //HTML templage
     * &lt;div&gt;
     *     &lt;h1&gt;sp_instance.title: {{::data.title}}&lt;/h1&gt;
     *     &lt;h1&gt;sp_portal.sc_catalog: {{::data.catalog}}&lt;/h1&gt;
     * &lt;/div&gt;
     * @returns Value of the specified parameter. Null if the specified entity does not exist or has no such parameter.
     */
    getValue(name: String): Object;

    /**
     * Copies values from the request or instance to the data parameter.
     * 
     * @data Receives the parameter values.
     * @names Comma-separated string of field names.
     */
    getValues(data: Object, names: String);

    /**
     * Returns an array of Service Catalog variables associated with the record in the URL.For example, if the URL includes the parameters id=form&amp;table=sc_req_item&amp;sys_id=832e9620db4f330083766b984b9619cf, the API returns the variables associated with the given record in the Requested item [sc_req_item] table. Must be a record with Service Catalog variables defined, such as a requested item [sc_req_item] record or an incident submitted through a record producer.
     * 
     * @includeNilResponses Optional. If true, the API includes variables with no user-defined value.
     * @example
     * //Server script 
     * (function() {
     * var rec = $sp.getRecord();	
     * data.scVars = $sp.getVariablesArray();
     * })();
     * 
     * //HTML template
     * &lt;div
     * Current record variables: {{::data.scVars}}
     * &lt;/div&gt;
     * @returns Array of variables associated with the table.
     */
    getVariablesArray(includeNilResponses: Boolean): Object;

    /**
     * Gets a widget by id or sys_id, executes that widget's server script using the provided options, then returns the widget model.
     * 
     * @sysID The widget sys_id or widget_id
     * @options An object to pass to the widget's server script. Refer to this object as options in your server script.Note: Any options passed into this function will only be available in the embedded widget's server script on the first execution of that script. Any subsequent calls into the server script from the embedded widget will not contain the object properties passed in.
     * @example
     * //Server script
     * data.myWidget = $sp.getWidget('widget_id', {p1: param1, p2: param2});
     * 
     * //HTML
     * &lt;sp-widget widget="c.data.myWidget"&gt;&lt;/sp-widget&gt;
     * @returns A widget model to be used with sp-widget.
     */
    getWidget(sysID: String, options: Object): Object;

    /**
     * Transforms a URL requesting a list or form in the platform UI into the URL of the corresponding id=list or id=form Service Portal page.Use this method to perform tasks such as redirecting a user after login to the correct Service Portal page when they request a platform UI form or list URL. Note that the id=list and id=form page targets are not customizable.Note: Table, sys_id, and sysparm_query values are preserved from the original URL; sysparm_view is not.
     * 
     * @url Platform UI URL
     * @example
     * GlideSPScriptable().mapUrlToSPUrl("http://demo.service-now.com/task_list.do?sysparm_userpref_module=1523b8d4c611227b00be8216ec331b9a&amp;sysparm_query=assigned_to=javascript:getMyAssignments()&amp;sysparm_clear_stack=true"))
     * @example
     * GlideSPScriptable().mapUrlToSPUrl("incident.do?sys_id=12bc12bc12bc12bc12bc12bc12bc12bc")
     * @returns Transformed Service Portal URL.If the passed-in URL does not request a list or a form in the platform UI, a null value is returned.
     */
    mapUrlToSPUrl(url: String): String;

}

/**
 * Generate search analytics from custom Service Portal search widgets. By default, the Search Events [sys_search_event] and Search Source Events [sys_search_source_event] tables collect search data from base system search widgets. However, custom search widgets do not benefit from this feature. Use this API in the server script of custom search widgets in scoped or global environments to send search data to the suggestions and analytics tables. Generate relevant search suggestions for your users and monitor search analytics to understand what your users are searching for and whether they're finding what they need. * * This API collects the following search data: Searched terms Rank of clicked items Filters used to refine search results * * Search analytics and suggestions is a Now Platform feature. For more information, see Search analytics and suggestions.
 * 
 * 
 */
declare class GlideSPSearchAnalytics {



    /**
     * Sends search data to the Search Events [sys_search_events] and Search Source Events [sys_search_source_events] tables.
     * 
     * @payload JSON payload in String format containing search data to send to the Search Events [sys_search_events] and Search Source Events [sys_search_source_events] tables. Structure the payload according to the type of search data you would like to collect. Collect data when a user searches for a term: Requires a payload containing these key-value pairs. query: String. The query being searched. portal_id: String. Sys ID of the portal record from the Service Portals [sp_portal] table. page_id: String. Sys ID of the page record from the Pages [sp_page] table. results_per_source: Array. Number of results returned from each search source. source_id: String. Sys ID of the search source record from the Search Sources [sp_search_source] table. number_of_results: Number. Results returned from the query for the specific search source. refinement_occurred: Boolean. True if the user filtered the search results; otherwise false. Collect data when a user refines their search results: Requires a payload containing these key-value pairs. query: String. The query being searched. portal_id: String. Sys ID of the portal record from the Service Portals [sp_portal] table. page_id: String. Sys ID of the page record from the Pages [sp_page] table. refinement_occurred: Boolean. True if the user filtered the search results; otherwise false. Collect the rank of the search result that a user selects. Requires a payload containing these key-value pairs. query: String. The query being searched. portal_id: String. Sys ID of the portal record from the Service Portals [sp_portal] table. click_rank: Number. Rank of the item a user clicks. For example, if the user clicks the third item in a list of search results, the value is 3. Collect data when a user searches for a term and collect the rank of the search result that a user clicks: Requires a payload containing these key-value pairs. query: String. The query being searched. portal_id: String. Sys ID of the portal record from the Service Portals [sp_portal] table. page_id: String. Sys ID of the page record from the Pages [sp_page] table. results_per_source: Array. Number of results returned from each search source. source_id: Sys Id of the search source record from the Search Sources [sp_search_source] table in String format. number_of_results: Number of results returned from the query for the specific search source. click_rank: Number. Rank of the item a user clicks. For example, if the user clicks the third item in a list of search results, the value is 3. 
     * @example
     * var searchObject = new GlideSPSearchAnalytics();
     * var directSearchData = searchObject.publish("{  
     *    query:'how do i get a new computer',
     *    portal_id:'81b75d3147032100ba13a5554ee4902b',
     *    page_id:'87466b63c3223100c8b837659bba8feb',
     *    results_per_source:[  
     *       {  
     *          source_id:'bf2c4c15b3a31300e64be12b86a8dcb7',
     *          number_of_results:3,
     * 
     *       },
     *       {  
     *          source_id:'c96eb1686721220023c82e08f585efff',
     *          number_of_results:5
     *       }
     *    ],
     *    refinement:false
     * }"
     * );
     * @example
     * //client script
     * var payload = {
     *     query: this.data.query,
     *     portal_id: this.data.portalID,
     *     page_id: this.data.pageID,
     *     results_per_source: getSearchSources(),
     *     refinement_occurred: false
     * }
     * var payloadObject = {
     * 			action: "TestAction",
     * 			payload: payload
     * };
     * c.server.get(payloadObject);
     * 
     * //server script
     * if (input &amp;&amp; input.action === "TestAction") {
     * 	input.action = "";
     * 	var textSearchAnalytics = new GlideSPSearchAnalytics().publish(JSON.stringify(input.payload));
     * 	return ;
     * }
     * new GlideSPSearchAnalytics().publish(JSON.stringify(input.payload));
     */
    publish(payload: String);

}

/**
 * Provides string handling methods. Access these methods using the static object GlideStringUtil. This class is available in scoped and global scripts.
 * 
 * 
 */
declare class GlideStringUtil {



    /**
     * Replaces periods with underscore characters.
     * 
     * @sourceString The string to be processed.
     * @example
     * var filename="../../../../../../etc/passwd";
     * cleanFilename=GlideStringUtil.dotToUnderBar(filename);
     * gs.info(cleanFilename);
     * @returns The string with periods replaced with underscores.
     */
    dotToUnderBar(sourceString: String): String;

    /**
     * Remove quotes from a string.
     * 
     * @sourceString The string to be processed.
     * @example
     * mystring="let's escape some quotes";
     * escapeQuote=GlideStringUtil.escapeAllQuotes(mystring);
     * gs.info(escapeQuote);
     * @returns The string with quotes removed.
     */
    escapeAllQuotes(sourceString: String): String;

    /**
     * Use for home pages to replace problem characters with escape characters.
     * 
     * @sourceString The string to be processed.
     * @example
     * mystring="&lt;test&gt; string \n to escape";
     * escapedString=GlideStringUtil.escapeForHomePage(mystring);
     * gs.info(escapedString);
     * @returns A string with problem characters replaced with escape characters.
     */
    escapeForHomePage(sourceString: String): String;

    /**
     * Use to replace illegal characters with their escape codes.Using this method removes illegal characters that might cause the UI to render improperly, or trigger a client side attack such as JavaScript or HTML injection.
     * 
     * @htmlString The string to be processed.
     * @example
     * mydata='"&lt;&gt;&amp;';
     * mydata=GlideStringUtil.escapeHTML(mydata);
     * gs.info(mydata);
     * @returns The string with illegal characters replaced with their escape codes.
     */
    escapeHTML(htmlString: String): String;

    /**
     * Replaces non-printable characters with their printable notation.
     * 
     * @sourceString The string to be processed.
     * @example
     * mystring="test \x09 non \x00 printable \x07 chars";
     * escapedString=GlideStringUtil.escapeNonPrintable(mystring);
     * gs.info(escapedString);
     * @returns The string with non-printable characters replaced with printable notation.
     */
    escapeNonPrintable(sourceString: String): String;

    /**
     * Replaces query term separators "^" with their escape sequence "^^".
     * 
     * @sourceString The string to be processed.
     * @example
     * myquery="test^Test";
     * escapedQuery=GlideStringUtil.escapeQueryTermSeparator(myquery);
     * gs.info(escapedQuery);
     * @returns A string with query term separators replaced with the escape characters.
     */
    escapeQueryTermSeparator(sourceString: String): String;

    /**
     * Replace quotes with escape characters by adding a backslash before each quote.
     * 
     * @sourceString The string to be processed.
     * @example
     * mystring="let's try escapeTicks";
     * escaped=GlideStringUtil.escapeTicks(mystring);
     * gs.info(escaped); 
     * @returns The string with backslashes added before quotes.
     */
    escapeTicks(sourceString: String): String;

    /**
     * Use to replace illegal HTML characters into HTML notation.Using this method removes illegal characters that might cause the UI to render improperly, or trigger a client side attack such as JavaScript or HTML injection.
     * 
     * @sourceString The string to be processed.
     * @example
     * mydata='&amp;';
     * htmlvalue=GlideStringUtil.getHTMLValue(mydata);
     * gs.info(htmlvalue);
     * @returns The string with illegal characters replaced with HTML notation.
     */
    getHTMLValue(sourceString: String): String;

    /**
     * Extract numeric characters from a string.
     * 
     * @sourceString The string to be processed.
     * @example
     * mystring='123 test 456 String 789 cleaning';
     * onlyNumeric=GlideStringUtil.getNumeric(mystring);
     * gs.info(onlyNumeric); 
     * @returns A string containing only numeric characters.
     */
    getNumeric(sourceString: String): String;

    /**
     * Returns true if the specified string is a valid base64 string.
     * 
     * @sourceString The string to be processed.
     * @example
     * //(adding a "*" to corrupt the base64 format)
     * base64="GethdTYehdtshetB*";
     * isValid=GlideStringUtil.isBase64(base64);
     * gs.info(isValid);
     * @returns True if the specified string is in valid base64 format.
     */
    isBase64(sourceString: String): Boolean;

    /**
     * Returns true if the specified string is in valid sys ID format.The sys ID format is a sequence of 32 hexadecimal characters where all the characters are in the range [0-9, a-f, A-F].
     * 
     * @sourceString The string to be processed.
     * @example
     * sysID="62826bf03710200044e0bfc8bcbe5df1";
     * isElig=GlideStringUtil.isEligibleSysID(sysID);
     * gs.info(isElig);
     * @returns True when the specified string is in the valid sys ID format.
     */
    isEligibleSysID(sourceString: String): Boolean;

    /**
     * Replaces the new line character, "/n", with a break code " * ".
     * 
     * @sourceString The string to be processed.
     * @example
     * mystring="new line break \n, this is after the break";
     * replaceNewLine=GlideStringUtil.newLinesToBreaks(mystring);
     * gs.info(replaceNewLine); 
     * @returns The string with new line characters replaced with HTML break code.
     */
    newLinesToBreaks(sourceString: String): String;

    /**
     * Replaces carriage returns, line feeds, and tabs with spaces, and then removes leading, trailing, and duplicate spaces.
     * 
     * @sourceString The string to be processed.
     * @example
     * mystring="test with \n (new line) and \t (tabulation)";
     * normalizedString=GlideStringUtil.normalizeWhitespace(mystring);
     * gs.info(normalizedString);
     * @returns The string with carriage returns, line feeds, and tabs replaced with spaces, and then leading, trailing, and duplicate spaces removed.
     */
    normalizeWhitespace(sourceString: String): String;

    /**
     * Replaces escape characters with their respective character.This method replaces these escape characters, &amp;lt; &amp;gt: &amp;nbsp; &amp;amp; &amp;quote;.
     * 
     * @htmlString String to process.
     * @example
     * mydata='&amp;quot;&amp;lt;&amp;gt;&amp;amp;';
     * unescaped=GlideStringUtil.unEscapeHTML(mydata);
     * gs.info(unescaped);
     * @returns String with the escape characters replaced.
     */
    unEscapeHTML(htmlString: String): String;

}

/**
 * The GlideSysAttachment API provides a way to handle attachments. Content is returned as a string, not as a byte array when getContent() is called. * * Content is returned as a GlideScriptableInputStream object when getContentStream() is called. The GlideScriptableInputStream contains the actual bytes not converted into a String.
 * 
 * 
 */
declare class GlideSysAttachment {



    /**
     * Creates an instance of the GlideSysAttachment class.
     * 
     */
    constructor();

    /**
     * Copies attachments from the source record to the target record.
     * 
     * @sourceTable Name of the table with the attachments to be copied.
     * @sourceID The source table's sysID.
     * @targetTable Name of the table to have the attachments added.
     * @targetID The target table's sysID.
     * @returns Array of sysIDs of the attachments that were copied.
     */
    copy(sourceTable: String, sourceID: String, targetTable: String, targetID: String): String;

    /**
     * Deletes the specified attachment.
     * 
     * @attachmentID The attachment's sysID.
     */
    deleteAttachment(attachmentID: String);

    /**
     * Returns the attachment content as a string.
     * 
     * @sysAttachment The attachment record.
     * @returns The attachment contents as a string. Returns up to 5 MB of data.
     */
    getContent(sysAttachment: GlideRecord): String;

    /**
     * Returns the attachment content as a string with base64 encoding.
     * 
     * @sysAttachment The attachment record.
     * @returns The attachment contents as a string with base64 encoding. Returns up to 5 MB of data.
     */
    getContentBase64(sysAttachment: GlideRecord): String;

    /**
     * Returns a GlideScriptableInputStream object given the sysID of an attachment.
     * 
     * @sysID The attachment sysID.
     * @returns A stream that contains the attachment content.
     */
    getContentStream(sysID: String): GlideScriptableInputStream;

    /**
     * Inserts an attachment for the specified record.
     * 
     * @record The record to which the attachment is to be attached.
     * @fileName The attachment's file name.
     * @contentType The attachment's content type.
     * @content The attachment content.
     * @returns The attachment's sysID. Returns null if the attachment was not added.
     */
    write(record: GlideRecord, fileName: String, contentType: String, content: String): String;

    /**
     * Inserts an attachment for the specified record using base64 encoded content.
     * 
     * @gr The record to which the attachment is to be attached.
     * @fileName The attachment's file name.
     * @contentType The attachment's content type.
     * @content The attachment content in base64 format.
     * @returns The sysID of the attachment created.
     */
    writeBase64(gr: GlideRecord, fileName: String, contentType: String, content: String): String;

    /**
     * Inserts an attachment using the input stream.
     * 
     * @gr The record to which the attachment is to be attached.
     * @fileName The attachment's file name.
     * @contentType The attachment's content type.
     * @content The attachment content.
     * @returns The sysID of the attachment created.
     */
    writeContentStream(gr: GlideRecord, fileName: String, contentType: String, content: GlideScriptableInputStream): String;

}

/**
 * The scoped GlideSysListControl class allows you to determine if the New or Edit buttons are displayed. 
 * 
 * 
 */
declare class GlideSysListControl {



    /**
     * Instantiates a GlideSysListControl object.
     * 
     * @tableName Name of the table
     */
    constructor(tableName: String);

    /**
     * Returns the sys_id for the control.
     * 
     * @example
     * var sysListCtrl = new GlideSysListControl("incident");
     * var controlID = sysListCtrl.getControlID();
     * gs.info(controlID);
     * @returns sys_id of the control
     */
    getControlID(): String;

    /**
     * Returns true if the edit button is not displayed.
     * 
     * @example
     * var sysListCtrl = new GlideSysListControl("incident");
     * var isOmitted = sysListCtrl.isOmitEditButton();
     * gs.info(isOmitted);
     * @returns True when the edit button is not displayed.
     */
    isOmitEditButton(): Boolean;

    /**
     * Returns true when the New button is not displayed.
     * 
     * @example
     * var sysListCtrl = new GlideSysListControl("incident");
     * var isOmitted = sysListCtrl.isOmitNewButton();
     * gs.info(isOmitted);
     * @returns True when the new button is not displayed.
     */
    isOmitNewButton(): Boolean;

}

/**
 * The scoped GlideSystem (referred to by the variable name 'gs' in any server-side JavaScript) API provides a number of convenient methods to get information about the system, the current logged in user, etc. Many of the GlideSystem methods facilitate the easy inclusion of dates in query ranges, and are most often used in filters and reporting.
 * 
 * 
 */
declare class GlideSystem {



    /**
     * Adds an error message for the current session.
     * 
     * @message The message to add.
     * @example
     * gs.include("PrototypeServer");
     *   var ValidatePasswordStronger = Class.create();
     *   ValidatePasswordStronger.prototype = {
     *        process : function() {
     *           var user_password = request.getParameter("user_password");
     *           var min_len = 8;
     *           var rules = "Password must be at least " + min_len + 
     *              " characters long and contain a digit, an uppercase letter, and a lowercase letter.";
     *           if (user_password.length() &lt; min_len) {
     *              gs.addErrorMessage("TOO SHORT: " + rules);
     *              return false;
     *           }
     *           var digit_pattern = new RegExp("[0-9]", "g");
     *           if (!digit_pattern.test(user_password)) {
     *              gs.addErrorMessage("DIGIT MISSING: " + rules);
     *              return false;
     *           }
     *           var upper_pattern = new RegExp("[A-Z]", "g");
     *           if (!upper_pattern.test(user_password)) {
     *              gs.addErrorMessage("UPPERCASE MISSING: " + rules);
     *              return false;
     *           }
     *           var lower_pattern = new RegExp("[a-z]", "g");
     *           if (!lower_pattern.test(user_password)) {
     *              gs.addErrorMessage("LOWERCASE MISSING: " + rules);
     *              return false;
     *           }
     *           return true; // password is OK
     *        }
     *   }
     */
    addErrorMessage(message: Object);

    /**
     * Adds an info message for the current session. This method is not supported for asynchronous business rules.
     * 
     * @message An info message object.
     * @example
     * if ((!current.u_date1.nil()) &amp;&amp; (!current.u_date2.nil())) {
     *   var start = current.u_date1.getGlideObject().getNumericValue();
     *   var end = current.u_date2.getGlideObject().getNumericValue();
     *   if (start &gt; end) {
     *     gs.addInfoMessage('start must be before end');
     *     current.u_date1.setError('start must be before end');
     *     current.setAbortAction(true);
     *   }
     * }
     */
    addInfoMessage(message: Object);

    /**
     * Returns an ASCII string from the specified base64 string.
     * 
     * @source A base64 encoded string.
     * @returns The decoded string.
     */
    base64Decode(source: String): String;

    /**
     * Creates a base64 string from the specified string.
     * 
     * @source The string to be encoded.
     * @returns The base64 string.
     */
    base64Encode(source: String): String;

    /**
     * Returns the date and time for the beginning of last month in GMT.
     * 
     * @returns GMT beginning of last month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfLastMonth(): String;

    /**
     * Returns the date and time for the beginning of last week in GMT.
     * 
     * @returns GMT beginning of last week, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfLastWeek(): String;

    /**
     * Returns the date and time for the beginning of next month in GMT.
     * 
     * @returns GMT beginning of next month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfNextMonth(): String;

    /**
     * Returns the date and time for the beginning of next week in GMT.
     * 
     * @returns The GMT beginning of next week, in the format yyyy-mm-dd hh:mm:ss.
     */
    beginningOfNextWeek(): String;

    /**
     * Returns the date and time for the beginning of next year in GMT.
     * 
     * @returns GMT beginning of next year, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfNextYear(): String;

    /**
     * Returns the date and time for the beginning of this month in GMT.
     * 
     * @returns GMT beginning of this month, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisMonth(): String;

    /**
     * Returns the date and time for the beginning of this quarter in GMT.
     * 
     * @returns GMT beginning of this quarter, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisQuarter(): String;

    /**
     * Returns the date and time for the beginning of this week in GMT.
     * 
     * @returns GMT beginning of this week, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisWeek(): String;

    /**
     * Returns the date and time for the beginning of this year in GMT.
     * 
     * @returns GMT beginning of this year, in the format yyyy-mm-dd hh:mm:ss
     */
    beginningOfThisYear(): String;

    /**
     * Generates a date and time for the specified date in GMT.
     * 
     * @date Format: yyyy-mm-dd
     * @range Start, end, or a time in the 24 hour format hh:mm:ss.
     * @returns A date and time in the format yyyy-mm-dd hh:mm:ss. If range is start, the returned value is yyyy-mm-dd 00:00:00; If range is end the return value is yyyy-mm-dd 23:59:59.
     */
    dateGenerate(date: String, range: String): String;

    /**
     * Returns the date and time for a specified number of days ago.
     * 
     * @days Integer number of days
     * @example
     * function contractNoticeDue() {
     *     var gr = new GlideRecord("contract");
     *     gr.addQuery("u_contract_status", "Active");
     *     gr.query();
     *     while (gr.next()) {
     *         if ((gr.u_termination_date &lt;= gs.daysAgo(-90)) &amp;&amp; (gr.u_contract_duration == "Long")) {
     *             gr.u_contract_status = "In review";
     *         } 
     *         else if ((gr.u_termination_date &lt;= gs.daysAgo(-50)) &amp;&amp; (gr.u_contract_duration == "Medium")) {
     *             gr.u_contract_status = "In review";
     *         } 
     *         else if ((gr.u_termination_date &lt;= gs.daysAgo(-10)) &amp;&amp; (gr.u_contract_duration == "Short")) {
     *             gr.u_contract_status = "In review";
     *         }
     *     }
     *     gr.update();
     * }
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgo(days: Number): String;

    /**
     * Returns the date and time for the end of the day a specified number of days ago.
     * 
     * @days Integer number of days
     * @returns GMT end of the day in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgoEnd(days: Number): String;

    /**
     * Returns the date and time for the beginning of the day a specified number of days ago.
     * 
     * @days Integer number of days
     * @example
     * var gr = new GlideRecord('sysapproval_approver');
     * gr.addQuery('state', 'requested');
     * gr.addQuery('sys_updated_on', '&lt;', gs.daysAgoStart(5));
     * gr.query();
     * @returns GMT start of the day in the format yyyy-mm-dd hh:mm:ss
     */
    daysAgoStart(days: String): String;

    /**
     * Writes a debug message to the system log.
     * 
     * @message The log message with place holders for any variable arguments.
     * @param1 (Optional) First variable argument.
     * @param2 (Optional) Second variable argument.
     * @param3 (Optional) Third variable argument.
     * @param4 (Optional) Fourth variable argument.
     * @param5 (Optional) Fifth variable argument.
     * @example
     * gs.debug("This is a debug message");
     * var myFirstName = "Abel";
     * var myLastName = "Tuter";
     * gs.debug("This is a debug message from {0}.{1}", myFirstName, myLastName);
     */
    debug(message: String, param1: Object, param2: Object, param3: Object, param4: Object, param5: Object);

    /**
     * Returns the date and time for the end of last month in GMT.
     * 
     * @returns GMT end of last month, in the format yyyy-mm-dd hh:mm:ss
     */
    endOfLastMonth(): String;

    /**
     * Returns the date and time for the end of last week in GMT.
     * 
     * @returns GMT end of last week, in the format yyyy-mm-dd hh:mm:ss
     */
    endOfLastWeek(): String;

    /**
     * Returns the date and time for the end of last year in GMT.
     * 
     * @returns GMT in format yyyy-mm-dd hh:mm:ss
     */
    endOfLastYear(): String;

    /**
     * Returns the date and time for the end of next month in GMT.
     * 
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextMonth(): String;

    /**
     * Returns the date and time for the end of next week in GMT.
     * 
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextWeek(): String;

    /**
     * Returns the date and time for the end of next year in GMT.
     * 
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfNextYear(): String;

    /**
     * Returns the date and time for the end of this month in GMT.
     * 
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisMonth(): String;

    /**
     * Returns the date and time for the end of this quarter in GMT.
     * 
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisQuarter(): String;

    /**
     * Returns the date and time for the end of this week in GMT.
     * 
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisWeek(): String;

    /**
     * Returns the date and time for the end of this year in GMT.
     * 
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    endOfThisYear(): String;

    /**
     * Writes an error message to the system log.This method accepts up to five variable arguments (varargs) in the message using the Java MessageFormat placeholder replacement pattern.
     * 
     * @message The log message with place holders for any variable arguments.
     * @param1 (Optional) First variable argument.
     * @param2 (Optional) Second variable argument.
     * @param3 (Optional) Third variable argument.
     * @param4 (Optional) Fourth variable argument.
     * @param5 (Optional) Fifth variable argument.
     * @example
     * gs.error("This is an error message");
     * var myFirstName = "Abel";
     * var myLastName = "Tuter";
     * gs.error("This is an error message from {0}.{1}", myFirstName, myLastName);
     */
    error(message: String, param1: Object, param2: Object, param3: Object, param4: Object, param5: Object);

    /**
     * Queues an event for the event manager.
     * 
     * @name Name of the event being queued.
     * @instance GlideRecord object, such as "current".
     * @parm1 (Optional) Saved with the instance if specified.
     * @parm2 (Optional) Saved with the instance if specified.
     * @queue Name of the queue.
     * @example
     * if (current.operation() != 'insert' &amp;&amp; current.comments.changes()) {
     *     gs.eventQueue('incident.commented', current, gs.getUserID(), gs.getUserName());
     * }
     */
    eventQueue(name: String, instance: Object, parm1: String, parm2: String, queue: String);

    /**
     * Queues an event for the event manager at a specified date and time.
     * 
     * @name Name of the event being queued.
     * @instance GlideRecord object, such as "current".
     * @parm1 (Optional) Saved with the instance if specified.
     * @parm2 (Optional) Saved with the instance if specified.
     * @expiration Date and time to process this event..
     */
    eventQueueScheduled(name: String, instance: Object, parm1: String, parm2: String, expiration: Object);

    /**
     * Executes a job for a scoped application.You can only use this method on a job in the same application as the script calling this method.
     * 
     * @job The job to be run.
     * @returns Returns the sysID of the scheduled job. Returns null if the job is global.
     */
    executeNow(job: GlideRecord): String;

    /**
     * Generates a GUID that can be used when a unique identifier is required.
     * 
     * @example
     * personalId = gs.generateGUID();
     * gs.info(personalId);
     * @returns A 32-character hexadecimal GUID.
     */
    generateGUID(): String;

    /**
     * Gets the caller scope name; returns null if there is no caller.
     * 
     * @example
     * var Scopea = Class.create(); 
     *  
     * Scopea.prototype = { 
     *     initialize: function() { 
     *     }, 
     *  
     *     callerScope: function() { 
     *         var scopeb = new app_scope_b.Scopeb(); 
     *         return scopeb.callerscope(); 
     *     }, 
     *  
     *     type: 'Scopea' 
     * }
     * @example
     * var Scopeb = Class.create(); 
     *  
     * Scopeb.prototype = { 
     *     initialize: function() { 
     *         this._constructorCallerScope = gs.getCallerScopeName(); 
     *     }, 
     *  
     *     callerscope: function() { 
     *         return gs.getCallerScopeName(); 
     *     }, 
     *  
     *     getConstructorCallerScope: function() { 
     *         return this._constructorCallerScope; 
     *     }, 
     *  
     *     type: 'Scopeb' 
     * }
     * @example
     * gs.info(new Scopea().getCallerScopeName());
     * @returns The caller's scope name, or null if there is no caller.
     */
    getCallerScopeName(): String;

    /**
     * Gets a string representing the cache version for a CSS file.
     * 
     * @example
     * var verStr = gs.getCssCacheVersionString();
     * gs.info(verStr);
     * @returns The CSS cache version.
     */
    getCssCacheVersionString(): String;

    /**
     * Gets the ID of the current application as set using the Application Picker.
     * 
     * @example
     * var currentId = gs.getCurrentApplicationId();
     * gs.info(currentId);
     * @returns The current application's sys_id, or global in none is set.
     */
    getCurrentApplicationId(): String;

    /**
     * Gets the name of the current scope.
     * 
     * @example
     * var currentScope = gs.getCurrentScopeName();
     * gs.info(currentScope);
     * @returns The current scope name.
     */
    getCurrentScopeName(): String;

    /**
     * Returns the list of error messages for the session that were added by addErrorMessage().
     * 
     * @returns List of error messages
     */
    getErrorMessages(): String;

    /**
     * Retrieves a message from UI messages that has HTML special characters, and replaces them with escape sequences. For example, &amp; becomes &amp;amp;.
     * 
     * @id ID of the message.
     * @args Optional. List of strings or other values defined by java.text.MessageFormat, which allows you to produce language-neutral messages for display to users.
     * @example
     * var myMessage = gs.getEscapedMessage("Hello {0}", ["mom"]);
     * @returns The UI message with HTML special characters replaced with escape sequences.
     */
    getEscapedMessage(id: String, args: Array<any>): String;

    /**
     * Retrieves a message from UI messages.
     * 
     * @id The ID of the message.
     * @args (Optional) a list of strings or other values defined by java.text.MessageFormat, which allows you to produce language-neutral messages for display to users.
     * @example
     * var my_message = '${gs.getMessage("This is a message.")}'; 
     * alert(my_message);
     * @returns The UI message.
     */
    getMessage(id: String, args: Array<any>): String;

    /**
     * Gets the value of a Glide property. If the property is not found, returns an alternate value.
     * 
     * @key The key for the property whose value should be returned.
     * @alt (Optional) Alternate object to return if the property is not found.
     * @example
     * var attachment_link = gs.getProperty('glide.servlet.uri');
     * gs.info(attachment_link);
     * @returns The value of the Glide property, or the alternate object defined above.
     */
    getProperty(key: String, alt: Object): String;

    /**
     * Gets a reference to the current Glide session.
     * 
     * @example
     * if (!gs.hasRole("admin") &amp;&amp; !gs.hasRole("user_admin") &amp;&amp; gs.getSession().isInteractive()) {
     *   current.addQuery("active", "true");
     * }
     * @returns A reference for the current session.
     */
    getSession(): String;

    /**
     * Retrieves the GlideSession session ID.
     * 
     * @example
     * var myUserObject = gs.getSessionID();
     * gs.info(myUserObject);
     * @returns The session ID.
     */
    getSessionID(): String;

    /**
     * This method is no longer available. Instead, use gs.getSession().getSessionToken().
     * 
     * @returns The session token.
     */
    getSessionToken(): String;

    /**
     * Returns the name of the time zone associated with the current user.This method has been deprecated. Instead, use the getTimeZoneName() method in the GlideSession API.
     * 
     * @example
     * gs.info(gs.getTimeZoneName());
     * @returns The time zone name.
     */
    getTimeZoneName(): String;

    /**
     * Gets the current URI for the session.
     * 
     * @example
     * gs.info(gs.getUrlOnStack());
     * @returns The URI.
     */
    getUrlOnStack(): String;

    /**
     * Returns a reference to the scoped GlideUser object for the current user.See GlideUser for a list of available methods.
     * 
     * @example
     * var myUserObject = gs.getUser();
     * @returns Reference to a scoped user object.
     */
    getUser(): GlideUser;

    /**
     * Gets the display name of the current user.
     * 
     * @example
     * gs.info(gs.getUserDisplayName());
     * @returns The name field of the current user. Returns Abel Tuter, as opposed to abel.tuter.
     */
    getUserDisplayName(): String;

    /**
     * Gets the sys_id of the current user.
     * 
     * @example
     * gs.info(gs.getUserID());
     * @returns The sys_id of the current user.
     */
    getUserID(): String;

    /**
     * Gets the user name, or user id, of the current user.
     * 
     * @example
     * gs.info(gs.getUserName());
     * @returns The user name of the current user.
     */
    getUserName(): String;

    /**
     * Determines if the current user has the specified role.
     * 
     * @role The role to check.
     * @example
     * if (!gs.hasRole("admin") &amp;&amp; !gs.hasRole("groups_admin")  &amp;&amp; gs.getSession().isInteractive()) {
     *   var qc = current.addQuery("u_hidden", "!=", "true"); //cannot see hidden groups... 
     *   qc.addOrCondition("sys_id", "javascript:getMyGroups()"); //...unless in the hidden group
     *   gs.info("User has admin and groups admin roles");
     * }
     * else {
     *   gs.info("User does not have both admin and groups admin roles");
     * }
     * @returns True if the user had the role. Returns true for users with the administrator role.
     */
    hasRole(role: Object): Boolean;

    /**
     * Returns the date and time for a specified number of hours ago.
     * 
     * @hours Integer number of hours
     * @example
     * if (current.operation() == 'insert') {
     *  // If no due date was specified, calculate a default
     *  if (current.due_date == '') {
     *  
     *   if (current.urgency == '1') {
     *    // Set due date to 4 hours ahead of current time
     *    current.due_date = gs.hoursAgo(-4);
     *   }
     *  
     *   if (current.urgency == '2') {
     *    // Set due date to 2 days ahead of current time
     *    current.due_date = gs.daysAgo(-2);
     *   }
     *  
     *   if (current.urgency == '3') {
     *    // Set due date to 7 days ahead of current time
     *    current.due_date = gs.daysAgo(-7);
     *   }
     *  }
     * }
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgo(hours: Number): String;

    /**
     * Returns the date and time for the end of the hour a specified number of hours ago.
     * 
     * @hours Integer number of hours
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgoEnd(hours: Number): String;

    /**
     * Returns the date and time for the start of the hour a specified number of hours ago.
     * 
     * @hours Integer number of hours
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    hoursAgoStart(hours: Number): String;

    /**
     * Provides a safe way to call from the sandbox, allowing only trusted scripts to be included.
     * 
     * @name The name fo the script to include.
     * @example
     * gs.include("PrototypeServer");
     * @returns True if the include worked.
     */
    include(name: String): Boolean;

    /**
     * Writes an info message to the system log.
     * 
     * @message The log message with place holders for any variable arguments.
     * @param1 (Optional) First variable argument.
     * @param2 (Optional) Second variable argument.
     * @param3 (Optional) Third variable argument.
     * @param4 (Optional) Fourth variable argument.
     * @param5 (Optional) Fifth variable argument.
     * @example
     * gs.info("This is an info message");
     * var myFirstName = "Abel";
     * var myLastName = "Tuter";
     * gs.info("This is an info message from {0}.{1}", myFirstName, myLastName);
     */
    info(message: String, param1: Object, param2: Object, param3: Object, param4: Object, param5: Object);

    /**
     * Determines if debugging is active for a specific scope.
     * 
     * @example
     * gs.debug("This is a log message");
     * var myFirstName = "Abel";
     * var myLastName = "Tuter";
     * gs.debug("This is a log message from {0}.{1}", myFirstName, myLastName);
     * gs.info(gs.isDebugging());
     * @returns True if either session debugging is active or the log level is set to debug for the specified scope.
     */
    isDebugging(): Boolean;

    /**
     * Checks if the current session is interactive. An example of an interactive session is when a user logs in normally. An example of a non-interactive session is using a SOAP request to retrieve data.
     * 
     * @example
     * if (!gs.hasRole("admin") &amp;&amp; gs.getSession().isInteractive()) {
     *     var qc1 = current.addQuery('u_group',"");
     *     var gra = new GlideRecord('sys_user_grmember');
     *     gra.addQuery('user', gs.getUserID());
     *     gra.query();
     *     while (gra.next()) {
     *         qc1.addOrCondition('u_group', gra.group);
     *     }
     * }
     * @returns True if the session is interactive.
     */
    isInteractive(): Boolean;

    /**
     * Determines if the current user is currently logged in.
     * 
     * @example
     * gs.info(gs.isLoggedIn());
     * @returns True if the current user is logged in.
     */
    isLoggedIn(): Boolean;

    /**
     * You can determine if a request comes from a mobile device.This method can be used in UI action conditions and business rules.
     * 
     * @example
     * if (gs.isMobile())
     *   gs.info("submitted from mobile UI");
     *  else 
     *    gs.info("NOT submitted from mobile UI");
     * @returns True if the request comes from a mobile device; otherwise, false.
     */
    isMobile(): Boolean;

    /**
     * Returns the date and time for the end of the minute a specified number of minutes ago.
     * 
     * @minutes Integer number of minutes
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    minutesAgoEnd(minutes: Number): String;

    /**
     * Returns the date and time for the start of the minute a specified number of minutes ago.
     * 
     * @minutes Integer number of minutes
     * @returns GMT in the format yyyy-mm-dd hh:mm:ss
     */
    minutesAgoStart(minutes: Number): String;

    /**
     * Returns the date and time for a specified number of months ago.
     * 
     * @months Integer number of months
     * @returns GMT on today's date of the specified month, in the format yyyy-mm-dd hh:mm:ss
     */
    monthsAgo(months: Number): String;

    /**
     * Returns the date and time for the start of the month a specified number of months ago.
     * 
     * @months Integer number of months
     * @returns GMT start of the month the specified number of months ago, in the format yyyy-mm-dd hh:mm:ss
     */
    monthsAgoStart(months: Number): String;

    /**
     * Queries an object and returns true if the object is null, undefined, or contains an empty string.
     * 
     * @o The object to be checked.
     * @example
     * var gr = new GlideRecord();
     * gs.info(gs.nil(gr));
     * @returns True if the object is null, undefined, or contains an empty string; otherwise, returns false.
     */
    nil(o: Object): Boolean;

    /**
     * Returns the date and time for the last day of the quarter for a specified number of quarters ago.
     * 
     * @quarters Integer number of quarters
     * @returns GMT end of the quarter that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss
     */
    quartersAgoEnd(quarters: Number): String;

    /**
     * Returns the date and time for the first day of the quarter for a specified number of quarters ago.
     * 
     * @quarters Integer number of quarters
     * @returns GMT end of the month that was the specified number of quarters ago, in the format yyyy-mm-dd hh:mm:ss
     */
    quartersAgoStart(quarters: Number): String;

    /**
     * Sets the specified key to the specified value if the property is within the script's scope.Note: Care should be taken when setting system properties (sys_properties) using this method as it causes a system-wide cache flush. Each flush can cause system degradation while the caches rebuild. If a value must be updated often, it should not be stored as a system property. In general, you should only place values in the sys_properties table that do not frequently change.
     * 
     * @key The key for the property to be set.
     * @value The value of the property to be set.
     * @description A description of the property.
     * @example
     * gs.setProperty("glide.foo","bar","foo");
     * gs.info(gs.getProperty("glide.foo"));
     */
    setProperty(key: String, value: String, description: String);

    /**
     * Sets the redirect URI for this transaction, which then determines the next page the user will see.
     * 
     * @o URI object or URI string to set as the redirect
     * @example
     * gs.setRedirect("com.glideapp.servicecatalog_cat_item_view.do?sysparm_id=d41ce5bac611227a0167f4bf8109bf70&amp;sysparm_user=" 
     * + current.sys_id + "&amp;sysparm_email=" + current.email)
     */
    setRedirect(o: Object);

    /**
     * Determines if a database table exists.
     * 
     * @name Name of the table to check for existence.
     * @example
     * gs.info(gs.tableExists('incident'));
     * @returns True if the table exists. False if the table was not found.
     */
    tableExists(name: String): Boolean;

    /**
     * Replaces UTF-8 encoded characters with ASCII characters.
     * 
     * @url A string with UTF-8 percent (%) encoded characters.
     * @returns A string with encoded characters replaced with ASCII characters.
     */
    urlDecode(url: String): String;

    /**
     * Encodes non-ASCII characters, unsafe ASCII characters, and spaces so the returned string can be used on the Internet. Uses UTF-8 encoding. Uses percent (%) encoding.
     * 
     * @url The string to be encoded.
     * @returns A string with non-ASCII characters, unsafe ASCII characters, and spaces encoded.
     */
    urlEncode(url: String): String;

    /**
     * Writes a warning message to the system log.
     * 
     * @message The log message with place holders for any variable arguments.
     * @param1 (Optional) First variable argument.
     * @param2 (Optional) Second variable argument.
     * @param3 (Optional) Third variable argument.
     * @param4 (Optional) Fourth variable argument.
     * @param5 (Optional) Fifth variable argument.
     * @example
     * gs.warn("This is a warning");
     * var myFirstName = "Abel";
     * var myLastName = "Tuter";
     * gs.warn("This is a warning from {0}.{1}", myFirstName, myLastName);
     */
    warn(message: String, param1: Object, param2: Object, param3: Object, param4: Object, param5: Object);

    /**
     * Takes an XML string and returns a JSON object.
     * 
     * @xmlString The XML string to be converted.
     * @example
     * var jsonObject = gs.xmlToJSON(xmlString);
     * @returns A JSON object representing the XML string. Null if unable to process the XML string.
     */
    xmlToJSON(xmlString: String): Object;

    /**
     * Returns a date and time for a certain number of years ago.
     * 
     * @years An integer number of years
     * @returns GMT beginning of the year that is the specified number of years ago, in the format yyyy-mm-dd hh:mm:ss.
     */
    yearsAgo(years: Number): String;

    /**
     * Returns yesterday's time (24 hours ago).
     * 
     * @returns GMT for 24 hours ago, in the format yyyy-mm-dd hh:mm:ss
     */
    yesterday(): String;

}

/**
 * The Scoped GlideTableHierarchy API provides methods for handling information about table relationships. 
 * 
 * 
 */
declare class GlideTableHierarchy {



    /**
     * Instantiates a GlideTableHierarchy object.
     * 
     * @tableName The name of the table.
     * @example
     * var table = new GlideTableHierarchy("incident"); 
     * gs.info(table.getTables());
     */
    constructor(tableName: String);

    /**
     * Returns an array of strings containing all tables that extend the current table and includes the current table.
     * 
     * @example
     * var table = new GlideTableHierarchy("task"); 
     * gs.info(table.getAllExtensions());
     * @returns An array of strings containing the tables in the hierarchy that includes the current table.
     */
    getAllExtensions(): Array<any>;

    /**
     * Returns the parent class.
     * 
     * @example
     * var table = new GlideTableHierarchy("cmdb_ci_server"); 
     * gs.info(table.getBase());
     * @returns The parent class.
     */
    getBase(): String;

    /**
     * Returns an array of strings containing all classes in the hierarchy of the current table.
     * 
     * @example
     * var table = new GlideTableHierarchy("incident"); 
     * gs.info(table.getHierarchy());
     * @returns An array of strings of the classes in the hierarchy.
     */
    getHierarchy(): Array<any>;

    /**
     * Returns the table's name.
     * 
     * @example
     * var table = new GlideTableHierarchy("incident"); 
     * gs.info(table.getName());
     * @returns The table's name.
     */
    getName(): String;

    /**
     * Returns the top level class in the hierarchy.
     * 
     * @example
     * var table = new GlideTableHierarchy("cmdb_ci_server"); 
     * gs.info(table.getRoot());
     * @returns The root class.
     */
    getRoot(): String;

    /**
     * Returns an array of strings containing all tables that extend the current table.
     * 
     * @example
     * var table = new GlideTableHierarchy("task"); 
     * gs.info(table.getTableExtensions());
     * @returns An array of strings containing the tables that extend the current table.
     */
    getTableExtensions(): Array<any>;

    /**
     * Returns an array of strings of the table names in the hierarchy.
     * 
     * @example
     * var table = new GlideTableHierarchy("incident"); 
     * gs.info(table.getTables());
     * @returns An array of strings containing the names of tables in the hierarchy.
     */
    getTables(): Array<any>;

    /**
     * Returns true of this class has been extended.
     * 
     * @example
     * var table = new GlideTableHierarchy("incident"); 
     * gs.info(table.hasExtensions());
     * @returns True if the current table has extensions.
     */
    hasExtensions(): Boolean;

    /**
     * Returns true if this is a base class.
     * 
     * @example
     * var table = new GlideTableHierarchy("incident"); 
     * gs.info(table.isBaseClass());
     * @returns True if the current table has no parent and has extensions.
     */
    isBaseClass(): Boolean;

    /**
     * Returns true if this table is not in a hierarchy.
     * 
     * @example
     * var table = new GlideTableHierarchy("sys_user"); 
     * gs.info(table.isSoloClass());
     * @returns True if the current table has no parent and no extensions.
     */
    isSoloClass(): Boolean;

}

/**
 * Provides the ability to read single lines from an input stream. Because an input stream is used, it is not subject to the 5MB attachment size limit. 
 * 
 * 
 */
declare class GlideTextReader {



    /**
     * Creates a scoped GlideTextReader object for the specified input stream.
     * 
     * @inputStream The input stream to be read.
     */
    constructor(inputStream: GlideScriptableInputStream);

    /**
     * Returns the character encoding of the input stream.
     * 
     * @returns The character encoding of the input stream.
     */
    getEncoding(): String;

    /**
     * Returns a single line from the input stream and returns a string. Since this is working off of a stream, it is not subject to the 5MB size limit.
     * 
     * @example
     * var is = new GlideSysAttachment().getContentStream(attachmentSysId);
     * var reader = new GlideTextReader(is);
     * var ln = ' ';
     * while((ln = reader.readLine()) != null) {
     *   gs.info(ln);
     * }
     * @returns A single line of input up to the carriage return. Does not include the carriage return. Returns null if there is no content.
     */
    readLine(): String;

}

/**
 * The scoped GlideTime class provides methods for performing operations on GlideTime objects, such as instantiating GlideTime objects or working with GlideTime fields. 
 * 
 * 
 */
declare class GlideTime {



    /**
     * Instantiates a GlideTime object with the specified time.
     * 
     * @milliseconds The datetime in milliseconds.
     * @example
     * var gt = new GlideTime(10000); 
     * gs.info(gt.getDisplayValue());
     */
    constructor(milliseconds: Number);

    /**
     * Instantiates a GlideTime object with the current time.
     * 
     * @example
     * var gt = new GlideTime(); 
     * gs.info(gt.getDisplayValue());
     */
    constructor();

    /**
     * Gets the time in the specified format.
     * 
     * @format The time format.
     * @example
     * var gt = new GlideTime(); 
     * gt.setValue('12:00:00');
     * gs.info(gt.getByFormat("HH:mm"));
     * @returns The time in the specified format.
     */
    getByFormat(format: String): String;

    /**
     * Gets the time in the current user's display format and time zone.When designing business rules or script includes remember that this method may return values in different formats for different users.
     * 
     * @example
     * var gt = new GlideTime();
     * gt.setDisplayValue("12:00:00"); // User Time Zone
     * gs.info(gt.getDisplayValue()); // User Time Zone
     * @returns The time in the user's format and time zone.
     */
    getDisplayValue(): String;

    /**
     * Gets the display value in the current user's time zone and the internal format (HH:mm:ss).
     * 
     * @example
     * var gt = new GlideTime();
     * gt.setValue("01:00:00"); //Internal Time Zone , UTC
     * gs.info(gt.getDisplayValueInternal()); //User Time Zone
     * @returns The time value for the GlideTime object in the current user's time zone and the internal time format of HH:mm:ss.
     */
    getDisplayValueInternal(): String;

    /**
     * Returns the hours part of the time using the local time zone.
     * 
     * @returns The hours using the local time zone.
     */
    getHourLocalTime(): Number;

    /**
     * Returns the hours part of the time using the local time zone. The number of hours is based on a 24 hour clock.
     * 
     * @returns The hours using the local time zone. The number of hours is based on a 24 hour clock.
     */
    getHourOfDayLocalTime(): Number;

    /**
     * Returns the hours part of the time using the UTC time zone. The number of hours is based on a 24 hour clock.
     * 
     * @returns The hours using the UTC time zone. The number of hours is based on a 24 hour clock.
     */
    getHourOfDayUTC(): Number;

    /**
     * Returns the hours part of the time using the UTC time zone. The number of hours is based on a 12 hour clock. Noon and midnight are represented by 0, not 12.
     * 
     * @returns The hours using the UTC time zone. The number of hours is based on a 12 hour clock. Noon and midnight are represented by 0, not 12.
     */
    getHourUTC(): Number;

    /**
     * Returns the number of minutes using the local time zone.
     * 
     * @returns The number of minutes using the local time zone.
     */
    getMinutesLocalTime(): Number;

    /**
     * Returns the number of minutes in the hour based on the UTC time zone.
     * 
     * @returns The number of minutes in the hour using the UTC time zone.
     */
    getMinutesUTC(): Number;

    /**
     * Returns the number of seconds in the current minute.
     * 
     * @returns The number of seconds in the minute.
     */
    getSeconds(): Number;

    /**
     * Gets the time value stored in the database by the GlideTime object in the internal format, HH:mm:ss, and the system time zone.
     * 
     * @example
     * var gt = new GlideTime();
     * gs.info(gt.getValue()); // Internal Time Zone, UTC
     * @returns The time value in the internal fomat and system time zone.
     */
    getValue(): String;

    /**
     * Sets a time value using the current user's display format and time zone.
     * 
     * @asDisplayed The time in the current user's display format and time zone. The parameter must be formatted using the current user's preferred display format, such as HH:mm:ss.
     * @example
     * var gt = new GlideTime();
     * gt.setDisplayValue('01:00:00');   // User Time Zone
     * gs.info(gt.getDisplayValueInternal()); // User Time Zone
     */
    setDisplayValue(asDisplayed: String);

    /**
     * Sets the time of the GlideTime object in the internal time zone.
     * 
     * @o The time in hh:mm:ss format.
     * @example
     * var gt = new GlideTime();
     * gt.setValue('01:00:00');  //Internal Time Zone, UTC
     * gs.info("time is "+ gt.getByFormat('hh:mm:ss'));
     */
    setValue(o: String);

    /**
     * Gets the duration difference between two GlideTime object values.
     * 
     * @startTime The start value.
     * @endTime The end value.
     * @example
     * var gd1 = new GlideTime(); 
     * gd1.setDisplayValue("09:00:00"); 
     * var gd2 = new GlideTime(); 
     * gd2.setDisplayValue("09:10:00"); 
     *  
     * var dur = GlideDate.subtract(gd1, gd2); //the difference between gdt1 and gdt2 
     * gs.info(dur.getDisplayValue());
     * @returns The duration between the two values.
     */
    subtract(startTime: GlideTime, endTime: GlideTime): GlideDuration;

}

/**
 * The scoped GlideUICompatibility class provides the ability for scoped applications to define their own minimum browser versions. This is done by creating system properties for the scoped application. You create the properties using the sys_properties list and assign a version number. When you do this from the scoped application, the prefix is automatically added to the property name. The scoped application UI compatibility properties are: * * &lt;scope-name&gt;.ui.ie_minimum &lt;scope-name&gt;.ui.chrome_minimum &lt;scope-name&gt;.ui.firefox_minimum &lt;scope-name&gt;.ui.safari_major_version_minimum * * You can then use the scoped GlideUICompatibility class to determine if the current browser is supported.
 * 
 * 
 */
declare class GlideUICompatibility {



    /**
     * Creates a GlideUICompatibility object.
     * 
     * @scopeName The application's scope name
     */
    constructor(scopeName: String);

    /**
     * Returns the terms "block" or "allow" based upon the browser version.
     * 
     * @example
     * UICompatibility = new GlideUICompatibility(gs.getCurrentScopeName());
     * var blockOrAllow = UICompatibility.getCompatibility();
     * gs.info(blockOrAllow);
     * @returns Either block or allow
     */
    getCompatibility(): String;

    /**
     * Determines if the browser is not supported.
     * 
     * @example
     * UICompatibility = new GlideUICompatibility(gs.getCurrentScopeName());
     * var blocked = UICompatibility.isBlocked();
     * gs.info(blocked);
     * @returns True if the browser is not supported.
     */
    isBlocked(): Boolean;

}

/**
 * The GlideURI class is a utility class for handling the URI parameter. The GlideURI class is available in scoped and global scripts. 
 * 
 * 
 */
declare class GlideURI {



    /**
     * Instantiates a GlideURI object.
     * 
     */
    constructor();

    /**
     * Returns the specified parameter.
     * 
     * @name The parameter name.
     * @example
     * var gURI = new GlideURI();
     * gURI.set('sysparm_query', 'priority=2^active=true' );
     * var fileString = gURI.get('sysparm_query');
     * gs.info(fileString);
     * @returns The URI for the specified parameter.
     */
    get(name: String): String;

    /**
     * Returns the file name portion of the URI.
     * 
     * @example
     * var gURI = new GlideURI();
     *  
     * var fileString = gURI.getFileFromPath();
     * gs.info(fileString);
     * @returns The file name portion of the URI.
     */
    getFileFromPath(): String;

    /**
     * Sets the specified parameter to the specified value.
     * 
     * @name The parameter name.
     * @value The value.
     * @example
     * var gURI = new GlideURI();
     * gURI.set('sysparm_query', 'priority=2^active=true' );
     * var fileString = gURI.get('sysparm_query');
     * gs.info(fileString);
     */
    set(name: String, value: String);

    /**
     * Reconstructs the URI string and performs the proper URL encoding by converting non-valid characters to their URL code. For example, converting & to '%26'.Parameters set with the set method are encoded with the URI as well.
     * 
     * @path The base portion of the system URL to which the URI is appended.
     * @example
     * fileString = gURI.toString('https://&lt;your instance&gt;.service-now.com/navpage.do');
     * @returns The URL.
     */
    toString(path: String): String;

}

/**
 * The scoped GlideUser API provides access to information about the current user and current user roles. Using the scoped GlideUser API avoids the need to use the slower GlideRecord queries to get user information. 
 * 
 * 
 */
declare class GlideUser {



    /**
     * Returns the current user's company sys_id.
     * 
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.getCompanyID());
     * @returns Company sys_id
     */
    getCompanyID(): String;

    /**
     * Returns the current user's display name.
     * 
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.getDisplayName());
     * @returns User's display name
     */
    getDisplayName(): String;

    /**
     * Returns the identifier of the user's current session domain.The identifier that is returned depends on the domain type and the instantiation of that domain. If the user is configured in the global domain, and does not use the domain picker to switch domains, the method returns null. If the user uses the domain picker to switch to the global domain, the method returns the string "global". For all other domains, the method returns the sys_id of that domain. 
     * 
     * @example
     * var domain = new GlideRecord('domain');
     * domain.get(gs.getUser().getDomainID());
     * gs.info(domain.name);
     * @returns Domain identifier
     */
    getDomainID(): String;

    /**
     * Returns the user's email address.
     * 
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.getEmail());
     * @returns User's email address
     */
    getEmail(): String;

    /**
     * Returns the user's first name.
     * 
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.getFirstName());
     * @returns User's first name
     */
    getFirstName(): String;

    /**
     * Gets the sys_id of the current user.
     * 
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.getID());
     * @returns User's sys_id
     */
    getID(): String;

    /**
     * Returns the user's last name.
     * 
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.getLastName());
     * @returns User's last name
     */
    getLastName(): String;

    /**
     * Returns the user ID, or login name, of the current user.
     * 
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.getName());
     * @returns User ID
     */
    getName(): String;

    /**
     * Gets the specified user preference value for the current user.
     * 
     * @name The name of the preference.
     * @example
     * var currentUser = gs.getUser(); 
     * currentUser.savePreference(­'myPref','red'); 
     * gs.info(currentUser.getPreference(­'myPref'));
     * @returns The preference value.
     */
    getPreference(name: String): String;

    /**
     * Returns a list of roles that includes explicitly granted roles, inherited roles, and roles acquired by group membership.
     * 
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.getRoles());
     * @returns List of all roles available to the user
     */
    getRoles(): Array<any>;

    /**
     * Returns the list of roles explicitly granted to the user.Unlike the getRoles() method, this method does not return roles the user inherits or roles acquired from group membership.
     * 
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.getUserRoles());
     * @returns List of roles explicitly assigned to the user
     */
    getUserRoles(): Array<any>;

    /**
     * Determines if the current user has the specified role.
     * 
     * @role Role to check
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.hasRole('admin'));
     * @returns True if the user has the role.
     */
    hasRole(role: String): Boolean;

    /**
     * Determines if the current user is a member of the specified group.
     * 
     * @group Group to check
     * @example
     * var currentUser = gs.getUser(); 
     * gs.info(currentUser.isMemberOf(­'Capacity Mgmt'));
     * @returns True if the user is a member of the group.
     */
    isMemberOf(group: String): Boolean;

    /**
     * Saves a user preference value to the database.
     * 
     * @name The preference to save.
     * @value The preference value.
     * @example
     * var currentUser = gs.getUser(); 
     * currentUser.savePreference('myPref','red'); 
     * gs.info(currentUser.getPreference('myPref'));
     */
    savePreference(name: String, value: String);

}

/**
 * Provides methods to remove invalid characters from an XML string, and to validate an XML string. Access these methods using the static object GlideXMLUtil. This class is available in scoped and global scripts.
 * 
 * 
 */
declare class GlideXMLUtil {



    /**
     * Removes invalid characters from an XML string.
     * 
     * @xmlString The string to be processed.
     * @example
     * var test = "test\btab";
     * var removedTest = GlideXMLUtil.removeInvalidChars(test);
     * 
     * gs.info(removedTest);
     * @returns A string with invalid characters removed.
     */
    removeInvalidChars(xmlString: String): String;

    /**
     * Determines if the specified string is valid XML.
     * 
     * @xmlString The string to be validated.
     * @nsAware When true, the validation is aware of name spaces. When false, the validation ignores name spaces.
     * @forgiveUnclosed When true, the validation does not check for tags enclosing the string.
     * @example
     * var s = "&lt;?xml version=\"1.0\" encoding=\"UTF-8\"?&gt;&lt;unload unload_date=\"2017-11-27 21:56:14\"&gt;&lt;incident action=\"INSERT_OR_UPDATE\"&gt;&lt;active&gt;true&lt;/active&gt;&lt;/incident&gt;&lt;/unload&gt;";
     * var xml = GlideXMLUtil.validateXML(s,false, false);
     * gs.info(xml);
     * 
     * @returns Returns null if the string is valid. Returns an error string describing the error if the specified string is not valid.
     */
    validateXML(xmlString: String, nsAware: Boolean, forgiveUnclosed: Boolean): String;

}


declare namespace sn_hw {

    /**
     * The HistoryWalker API uses the audit/history tables to generate a historical version of an existing record. It supports the ability to return a GlideRecord to a previous update count (walked GlideRecord) with the appropriate GlideElements populated. After the walked GlideRecord is retrieved, the API provides the ability to move forward and backward the update numbers navigating through its historical updates. The associated methods can be used in scoped and global scripts. To use this class in scoped and global applications, use the sn_hw namespace identifier. The History Walker plugin (com.glide.history_walker) that is enabled by default is required to access the HistoryWalker API.Note: For offline updates, HistoryWalker API will be initiated automatically and the only two methods that you can use are: walkTo(0) (the input argument for this method can only be zero) and walkForward(). Other available methods cannot be invoked for offline updates. * * The HistoryWalker API provides two ways to retrieve the audit data: Using History Set: A History Set entry is created (if not available or not up to date) from the data in the sys_audit table for the record that you are going to walk through. The History Set table contains records (History Lines) with the actual changes to field values that occurred. Methods of the HistoryWalker API retrieve the history data from the generated History Lines, instead of querying the sys_audit table. Using Audit table: In this case, the HistoryWalker API extracts data directly querying the sys_audit table. * * By default, it populates the data to support the “changes”, “changesFrom” and “changesTo” methods in the walked record, as well as provides record and field level security. Additionally, it can enable journal fields and variables to be also populated in the walked GlideRecord when walking through the updates. * * This API enables you to: * * apply the appropriate history/audit data to get an existing GlideRecord to the state it was in a specific update count. instruct the HistoryWalker API to use sys_audit table instead of sys_history_set/sys_history_line tables to retrieve its data. turn off row-level access control. turn off field-level access control. turn off retrieval and processing of “changes” data. Enable journal fields. Enable variables.
     * 
     * 
     */
    declare class HistoryWalker {



        /**
         * Fetches the database record based on the parameters, using the History Sets or Audit data to retrieve the historic data, depending on the third parameter.
         * 
         * @tableName Name of table containing the record to retrieve.
         * @sydId sys_id of the record to retrieve.
         * @useAudit  If set to true, uses audit data to retrieve historic date. If set to false, uses history set to retrieve historic date. 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue(), true);
         * if (hw.walkTo(3)) {
         *     var oldPriority = hw.getWalkedRecord().priority;
         *     gs.info('Incident priority in update number ' + hw.getUpdateNumber() + ' was ' + oldPriority);
         * } else
         *     gs.info('Incident does not have update number 3');
         * 
         */
        constructor(tableName: String, sydId: String, useAudit: Boolean);

        /**
         * Fetches the database record based on the parameters, using the History Sets to retrieve the historic data.
         * 
         * @tableName Name of table containing the record to retrieve.
         * @sydId sys_id of the record to retrieve.
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * if (hw.walkTo(3)) {
         *     var oldPriority = hw.getWalkedRecord().priority;
         *     gs.info('Incident priority in update number ' + hw.getUpdateNumber() + ' was ' + oldPriority);
         * } else
         *     gs.info('Incident does not have update number 3');
         */
        constructor(tableName: String, sydId: String);

        /**
         * Gets the update number of the current walked glide record.
         * 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * hw.walkTo(3);
         * gs.info('Update number: ' + hw.getUpdateNumber());
         * @returns Current update number or, -1 if record is not found
         */
        getUpdateNumber(): int;

        /**
         * Gets the record filled with the history/audit data after walking to an update number.
         * 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * hw.walkTo(0);
         * var walkedRecord = hw.getWalkedRecord();
         * gs.info('Priority in update number 0: ' + walkedRecord.priority);
         * hw.walkTo(1);
         * walkedRecord = hw.getWalkedRecord();
         * gs.info('Short description in update number 1: ' + walkedRecord.short_description);
         * @returns The walked GlideRecord.
         */
        getWalkedRecord(): GlideRecord;

        /**
         * Returns a copy of the record filled with the history/audit data after walking to an update number.Note: The getWalkedRecord() API might modify the obtained walkedRecord after walking to another update number. The getWalkedRecordCopy() API gets a clone to the walked record to prevent that.
         * 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var walkedRecord = [];
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * hw.walkTo(0);
         * walkedRecord[0] = hw.getWalkedRecordCopy();
         * hw.walkTo(1);
         * walkedRecord[1] = hw.getWalkedRecordCopy();
         * 
         * gs.info('Priority in update number 0: ' + walkedRecord[0].priority);
         * gs.info('Short description in update number 1: ' + walkedRecord[1].short_description);
         * 
         * @returns A copy of the walked GlideRecord.
         */
        getWalkedRecordCopy(): GlideRecord;

        /**
         * Specifies if the record-level read access is applied on the record when retrieving from the database.
         * 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * gs.info('Field level security is active: ' + hw.isFieldLevelSecurity());
         * @returns Returns true if field level security is enabled, else returns false.
         */
        isFieldLevelSecurity(): Boolean;

        /**
         * Specifies if the record-level read access is applied on the record when retrieving from the database.
         * 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * gs.info('Record level security is active: ' + hw.isRecordLevelSecurity());
         * 
         * @returns Returns true if the record-level security is enabled, else returns false.
         */
        isRecordLevelSecurity(): Boolean;

        /**
         * Specifies if any of the methods that walk the record from one update to another, support the “changes” data for each element.
         * 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * gs.info('Changes is active: ' + hw.isWithChanges());
         * @returns Returns true if the changes support is enabled, else returns false.
         */
        isWithChanges(): Boolean;

        /**
         * Specifies if journal type fields are populated from the historical values.
         * 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * gs.info('Populating journal fields is active: ' + hw. isWithJournalFields());
         * 
         * @returns Returns true if journal fields are populated, else returns false.
         */
        isWithJournalFields(): Boolean;

        /**
         * Specifies if values are set for variables that are recorded in the history.
         * 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * gs.info('Populating variables is active: ' + hw. isWithVariables());
         * @returns Returns true if including values for variables, else returns false.
         */
        isWithVariables(): Boolean;

        /**
         * Sets the field-level read access on each element before setting the historical value of that element in the GlideRecord. If the field-level security is enabled, it prevents the API to populate the fields of the walked record that the user of the API does not have access to.
         * 
         * @fieldLevelSecurity If set to true, field-level security is enabled. The default value is true.
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * hw.setFieldLevelSecurity(false);
         * hw.walkTo(0);
         * 
         */
        setFieldLevelSecurity(fieldLevelSecurity: Boolean);

        /**
         * Sets the record-level read access on the record when retrieving from the database. The record-level security prevents the API to retrieve the walked record if the user of the API does not have access to the GlideRecord.
         * 
         * @recordLevelSecurity If set to true, record-level read access security is enabled. The default value is true.
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * hw.setRecordLevelSecurity(false);
         * hw.walkTo(0);
         * 
         */
        setRecordLevelSecurity(recordLevelSecurity: Boolean);

        /**
         * Sets the “changes” data support for each element for a method that walks the record from one update to another.
         * 
         * @withChanges If set to true, the “changes” data is supported for each element. The default value is true.
         * @example
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * hw.walkTo(0);
         * do {
         *     printChangedFields(hw);
         * } while (hw.walkForward());
         * 
         * function printChangedFields(hw) {
         *     var walkedGr = hw.getWalkedRecord();
         *     var fields = GlideScriptRecordUtil.get(walkedGr).getChangedFieldNames();
         *     gs.print("Fields changed at update " + hw.getUpdateNumber() + " were:");
         *     for (var j = 0; j &lt; fields.size(); j++)
         *         gs.print(" " + fields.get(j));
         *     gs.print("");
         * }
         * 
         */
        setWithChanges(withChanges: Boolean);

        /**
         * Specifies if journal type fields are populated from the historical values.
         * 
         * @withJournalFields If set to true, include journal-type fields. Th default value is false.
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * hw.setWithJournalFields(true);
         * if (hw.walkTo(0)) {
         *     var workNotes = hw.getWalkedRecord().work_notes;
         *     gs.info('Work Notes in update number ' + hw.getUpdateNumber() + ' was ' + workNotes);
         * }
         * 
         */
        setWithJournalFields(withJournalFields: Boolean);

        /**
         * Specifies if variables are populated from the historical values.
         * 
         * @withVariables If set to true, values are populated for variables. The default value is false.
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * hw.setWithVariables(true);
         * hw.walkTo(0);
         * if (hw.walkTo(0)) {
         *     var varUrgency = hw.getWalkedRecord().variables.urgency;
         *     gs.info('Variable Urgency in update number ' + hw.getUpdateNumber() + ' was ' + varUrgency);
         * }
         * 
         */
        setWithVariables(withVariables: Boolean);

        /**
         * Applies the appropriate history/audit data to get a walked GlideRecord to the state when it was one update number backward. If the previous update count is missing from the history/audit data, it will walk to the previous available update count.
         * 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * hw.walkTo(incGr.sys_mod_count);
         * do {
         *     var oldPriority = hw.getWalkedRecord().priority;
         *     gs.info('Incident priority in update number ' + hw.getUpdateNumber() + ' was ' + oldPriority);
         * } while (hw.walkBackward())
         * 
         * @returns Returns true if walking to the specified update number was possible. Else, returns false, for example if already walked to the update number 0.
         */
        walkBackward(): Boolean;

        /**
         * Applies the appropriate history/audit data to get a walked GlideRecord to the state when it was one update number forward. If next update count is missing from the history/audit data, it will walk to the next available update count.
         * 
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * hw.walkTo(0);
         * do {
         *     var oldPriority = hw.getWalkedRecord().priority;
         *     gs.info('Incident priority in update number ' + hw.getUpdateNumber() + ' was ' + oldPriority);
         * } while (hw.walkForward())
         * 
         * @returns Returns true if walking to the specified update number was possible. Else, returns false, for example if already walked to the GlideRecord update count.
         */
        walkForward(): Boolean;

        /**
         * Applies the appropriate history/audit data to get a GlideRecord to the state it was in a specific update count. Use getWalkedRecord() or getWalkedRecordCopy() after walking to an update number to retrieve the “walked” GlideRecord.
         * 
         * @updateCount The update number to walk to.
         * @example
         * var incGr = new GlideRecord('incident');
         * incGr.get('number', 'INC0000015');
         * 
         * var hw = new sn_hw.HistoryWalker(incGr.getTableName(), incGr.getUniqueValue());
         * if (hw.walkTo(3)) {
         *     var oldPriority = hw.getWalkedRecord().priority;
         *     gs.info('Incident priority in update number ' + hw.getUpdateNumber() + ' was ' + oldPriority);
         * } else
         *     gs.info('Incident does not have update number 3');
         * @returns true if walking to the specified update number was possible, false otherwise, for example if the requested update is greater than the update count of the GlideRecord, or if there is no history/audit data of the requested update number
         */
        walkTo(updateCount: Integer): Boolean;

    }

}/**
 * Handles lifecycle event activity set cases. Lifecycle event activity sets represent different stages in the lifecycle event process. You must define when the activity set is triggered, such as immediately upon creation of the lifecycle event case or after the completion of another activity set. Each activity set is associated with a single lifecycle event. * * The hr_ActivitySet API requires the HR Lifecycle Events plugin (com.sn_hr_lifecycle_events). * * See also Lifecycle event case management.
 * 
 * 
 */
declare class hr_ActivitySet {



    /**
     * Instantiates a new hr_ActivitySet object.
     * 
     */
    constructor();

    /**
     * Creates a lifecycle event case based on a specified HR service.
     * 
     * @hrService Sys ID of HR service in the HR Services [sn_hr_core_service] table to be assigned to the lifecycle event case.
     * @caseValues Key-value pairs containing a value for each case field.
     * @caseValuessubject_person Sys ID of subject person's name in the User [sys_user] table.
     * @caseValuesopened_for Sys ID of case opened for subject person in the Users [sys_user] table.
     * @caseValuessubject_person_job Sys ID of subject person's Business title in the Jobs [sn_hr_core_job] table.
     * @caseValueslocation Sys ID of subject person's location in HR profile in the Locations [cmn_location] table.
     * @caseValuesdepartment Sys ID of subject person's department in HR profile in the Departments [cmn_department] table.
     * @caseValuessubject_person_hr_profile Sys ID of subject person's HR profile in the HR Profiles [sn_hr_core_profile] table.
     * @caseValuesshort_description Case description.
     * @caseValuesstate Number representing uniquely-defined custom case state.
     * @example
     * var caseValues = {
     *               ‘subject_person’: ‘62826bf03710200044e0bfc8bcbe5df1’,
     *               ‘opened_for’: ‘0e826bf03710200044e0bfc8bcbe5d7c’,
     *               ‘subject_person_job’: ‘f8d56900587d3700964f4efae452b3db’,
     *               ‘location’: ‘25ab9d1d0a0a0bb300537fd25687439d’,
     *               ‘department’: ‘93b25282c0a8000b0b55c8ab34e2f1e6’,
     *               ‘subject_person_hr_profile’: ‘330370019f22120047a2d126c42e7012’,
     *               ‘short_description’: ‘Short description’,
     *               ‘state’: 10
     *           };
     * 
     *   var activity = new sn_hr_le.hr_ActivitySet();
     *   var createCase = new activity.createLECaseByService(‘4719647c67a60300132a6c3b5685ef16’, caseValues);
     * @returns Sys ID of the created case in the HR Lifecycle Events Cases [sn_hr_le_case] table.
     */
    createLECaseByService(hrService: String, caseValues: Object, caseValuessubject_person: String, caseValuesopened_for: String, caseValuessubject_person_job: String, caseValueslocation: String, caseValuesdepartment: String, caseValuessubject_person_hr_profile: String, caseValuesshort_description: String, caseValuesstate: Number): String;

    /**
     * Checks for a case matching the specified combination of subject person user, HR service, and job.
     * 
     * @spUser Sys ID of subject person user in the Users [sys_user] table.
     * @hrService Sys ID of HR service in the HR Services [sn_hr_core_service] table.
     * @jobId Sys ID of subject user's job title in the HR Services [sn_hr_core_service] table.
     * @example
     * var userId = '62826bf03710200044e0bfc8bcbe5df1'; //Abel Tuter
     * var hrServiceId = '64fa4c53534222003066a5f4a11c0875'; //Onboarding HR Service
     * var jobId = '3D62826bf03710200044e0bfc8bcbe5df1'; // Sample Job sys_id for the example
     * 
     * var activity = new sn_hr_le.hr_ActivitySet();
     * 
     * var hasActiveLECase = activity.hasActiveCaseByService(userId, hrServiceId, jobId);
     * 
     * gs.info('User has an active HR case: ' + hasActiveLECase);
     * @returns True if matching case exists, false otherwise.
     */
    hasActiveCaseByService(spUser: String, hrService: String, jobId: String): Boolean;

}

/**
 * Enables creating HR cases from a record producer. The hr_ActivityUtils script include requires the HR Lifecycle Events plugin (com.sn_hr_lifecycle_events).
 * 
 * 
 */
declare class hr_ActivityUtils {



    /**
     * Creates a case from a record producer and service. This method is intended to be called as-is to create a producer and does not require supplying data.The following variables can be configured in a record producer to provide additional capabilities as follows: job – References sn_hr_core_job and maps to subject_person_job in an HR case opened_for – References sys_user and maps opened_for in an HR case concurrent_job – If the record producer includes this variable (by activating checkbox) and parameters have job information, creates a new job in sn_hr_core_job table 
     * 
     * @current GlideRecord for case to be created.
     * @producer Comma-separated key value pair containing data as questions and answers that are automatically provided when a user submits an answer to a record producer question.
     * @cat_itemsys_id Looks up the HR service of case being created and variable names to populate the description.
     * @example
     * new sn_hr_core.hr_ActivityUtils(current).createCaseFromProducer(producer, cat_item.sys_id);
     * @returns New case in related table, varies by product.
     */
    createCaseFromProducer(current: GlideRecord, producer: Object, cat_itemsys_id: String): Object;

}

/**
 * Provides basic functionality for the HR application. The hr_Utils API requires the HR core plugin (com.sn_hr_core).
 * 
 * 
 */
declare class hr_Utils {



    /**
     * Instantiates an hr_Utils object.
     * 
     */
    constructor();

    /**
     * Gets the Sys ID of the active primary job for a provided user.
     * 
     * @userID Sys ID of the HR user from the User [sys_user] table assigned an active or future job in which Primary is true.
     * @example
     * var result = new sn_hr_core.hr_Utils().getPrimaryJob('5137153cc611227c000bbd1bd8cd2007');
     * gs.info('Result: ' + result);
     * @returns If present and active, Sys ID of the primary job from the Jobs [sn_hr_core_job] table, null otherwise.
     */
    getPrimaryJob(userID: String): String;

    /**
     * Switches the primary job of a user.
     * 
     * @userId Sys ID of HR user from the Users [sys_user] table.
     * @jobId Job Sys ID from the Jobs [sn_hr_core_job] table.
     * @example
     * var result = new sn_hr_core.hr_Utils().switchPrimaryJob('5137153cc611227c000bbd1bd8cd2007', 'bc884e723c0ebf00964fb8b1ce04f9d7');
     * gs.info('Result: ' + result);
     * @returns Encoded JSON with message and status, error otherwise.
     */
    switchPrimaryJob(userId: String, jobId: String): String;

}


declare namespace sn_cmdb {

    /**
     * The IdentificationEngine uses the Identification and Reconciliation framework to minimize creation of duplicate CIs and to reconcile CI attributes by only accepting information from authorized data sources when updating the CMDB. You must enable the Configuration Management for Scoped Apps (CMDB) [com.snc.cmdb.scoped] plugin in order to use this class. * * When using this class in a scoped application, use the sn_cmdb namespace identifier.
     * 
     * 
     */
    declare class IdentificationEngine {



        /**
         * Insert or update configuration items in the CMDB based on identification and reconciliation rules. Use this API instead of updating the CMDB directly.
         * 
         * @source Identifies the data source of the CI information. These must be one of the choice values defined for the discovery_source field of the cmdb_ci table.
         * @input A JSON formatted string of configuration items to be added or updated. Each input string is in the format 'items: [{}], relations:[{}], related[{}]', where each item within the items, relations, and related lists contains name-value pairs. The possible name-value pairs within the items list are: className - the sys_class_name of the CI to be created or updated. values:{} - the field information for the CI as name-value pairs, where the name is the field name. When updating reference fields, the value must be the referenced sys_id. lookup:[{}] - a list of records with each item having name-value pairs like the items list. related: [{}] - a list of records with each item having name-value pairs like the items list. The possible name-value pairs within the relations list are: parent - index of the parent item in the dependency relation child - index of the child item in the dependency relation type - the relationship type. This is one of the name field values from the cmdb_rel_type table. 
         * @example
         * var payload = {items: [{className:'cmdb_ci_linux_server', 
         *                values: {name:'stry0900844 CI 2',
         *                         serial_number:'9876EFGH',
         *                         mac_address:'4653XYZ',
         *                         ip_address:'10.10.10.4',
         *                         ram:'1238'}}]
         *               };
         * 
         * var jsonUntil = new JSON();
         * var input = jsonUntil.encode(payload);
         * var output = sn_cmdb.IdentificationEngine.createOrUpdateCI('ServiceNow', input);
         * gs.print(output);
         * 
         * @example
         * var payload = 
         *               {items: [ 
         *                     {className:'cmdb_ci_web_server', 
         *                      values: {name:'apache linux den 200', 
         *                               running_process_command: 'xyz',  
         *                               running_process_key_parameters: 'abc', 
         *                               tcp_port:'3452'}}, 
         *                     {className:'cmdb_ci_linux_server', 
         *                      values: {name:'lnux100', ram:'2048'}}],
         *                relations:[{parent: 0, child: 1, type: 'Runs on::Runs'}]
         *               };
         * 
         * var jsonUntil = new JSON();
         * var input = jsonUntil.encode(payload);
         * var output = sn_cmdb.IdentificationEngine.createOrUpdateCI('ServiceWatch', input);
         * gs.print(output);
         * 
         * @example
         * var payload = {items: [
         *            {className:'cmdb_ci_netgear', 
         *                values: {name:'ny8500-nbxs08',
         *                         ports:'1200'}, 
         *                lookup: [{className:'cmdb_serial_number',
         *                             values:{serial_number:'1234ABCD', serial_number_type:'uuid',absent:'false',valid:'true'}},
         *                         {className:'cmdb_serial_number',
         *                             values:{serial_number:'3456EFGH', serial_number_type:'system',absent:'false',valid:'true'}}]}]};
         * 
         * var jsonUntil = new JSON();
         * var input = jsonUntil.encode(payload);
         * var output = sn_cmdb.IdentificationEngine.createOrUpdateCI('ServiceNow', input);
         * gs.print(output);
         * 
         * @returns A JSON formatted string that is a list of results for the configuration items in the input string. Each result string is in the format 'items: [{}], relations:[{}]', where each item within the items and relations lists contains name-value pairs. The possible name-value pairs within the items list are: className- the sys_class_name for the CI that was updated or created. operation, which is one of INSERT, UPDATE, UPDATE_WITH_UPGRADE, UPDATE_WITH_DOWNGRADE, UPDATE_WITH_SWITCH, DELETE, NO_CHANGE sysId - the sys_id of the CI that was updated or created. relatedSysIds - a list of sys_id values of CIs used during lookup based identification. maskedAttributes – a list of attributes whose update by a non-authoritative data source gets skipped as defined by the Reconciliation Rules. identifierEntrySysId - sys_id of identifier entry used during matching. errors - a list of errors in the format of (error, message string), where error can be ABANDONED, INVALID_INPUT_DATA, IDENTIFICATION_RULE_MISSING, IDENTIFICATION_RULE_FOR_LOOKUP_MISSING, NO_LOOKUP_RULES_FOR_DEPENDENT_CI, NO_CLASS_NAME_FOR_INDEPENDENT_CI, MISSING_DEPENDENCY, MULTIPLE_DEPENDENCIES, MULTIPLE_DUPLICATE_RECORDS, RELATION_CHAIN_ENDS_AT_QUALIFIER, QUALIFICATION_LOOP, TYPE_CONFLICT_IN_QUALIFICATION, MULTI_MATCH, REQUIRED_ATTRIBUTE_EMPTY, RECLASSIFICATION_NOT_ALLOWED duplicateIndices - a list of indexes of items that are duplicates of the current item. identificationAttempts - a list of attempts in the format of (attributes, identiferName, attemptResult, searchOnTable) where attributes - the attributes of identifier entry used during identification identiferName - the CI identifier to which this identifier entry belongs attemptResult - one of SKIPPED, NO_MATCH, MATCHED, MULTI_MATCH searchOnTable - the table searched during the identification process. The possible name-value pairs within the relations list are: className - the relationship CI's class name and is always cmdb_rel_ci operation - one of INSERT, UPDATE, NO_CHANGE sysId - the sys_id of the relationship CI inserted or updated 
         */
        createOrUpdateCI(source: String, input: String): String;

        /**
         * Determines the operation (insert/update) that will be performed with the specified payload without committing the operation in the database.This works just like createOrUpdateCI(), but does not commit the result.
         * 
         * @jsonString A JSON formatted string of configuration items to be added or updated. Each input string is in the format 'items: [{}], relations:[{}]', where each item within the items and relations lists contains name-value pairs. The possible name-value pairs within the items list are: className - the sys_class_name of the CI to be created or updated. values:{} - the field information for the CI as name-value pairs, where the name is the field name. lookup:[{}] - a list of records with each item having name-value pairs like the items list. The possible name-value pairs within the relations list are: parent - index of the parent item in the dependency relation child - index of the child item in the dependency relation type - the relationship type. This is one of the name field values from the cmdb_rel_type table. 
         * @returns A JSON formatted string that is a list of results. Each result string is in the format 'items: [{}], relations:[{}]', where each item within the items and relations lists contains name-value pairs. The possible name-value pairs within the items list are: className- the sys_class_name for the CI that was updated or created. operation, which is one of INSERT, UPDATE, UPDATE_WITH_UPGRADE, UPDATE_WITH_DOWNGRADE, UPDATE_WITH_SWITCH, DELETE, NO_CHANGE sysId - the sys_id of the CI that was updated or created. relatedSysIds - a list of sys_id values of CIs used during lookup based identification. identifierEntrySysId - sys_id of identifier entry used during matching. errors - a list of errors in the format of (error, message string), where error can be ABANDONED, INVALID_INPUT_DATA, IDENTIFICATION_RULE_MISSING, IDENTIFICATION_RULE_FOR_LOOKUP_MISSING, NO_LOOKUP_RULES_FOR_DEPENDENT_CI, NO_CLASS_NAME_FOR_INDEPENDENT_CI, MISSING_DEPENDENCY, MULTIPLE_DEPENDENCIES, MULTIPLE_DUPLICATE_RECORDS, RELATION_CHAIN_ENDS_AT_QUALIFIER, QUALIFICATION_LOOP, TYPE_CONFLICT_IN_QUALIFICATION, MULTI_MATCH, REQUIRED_ATTRIBUTE_EMPTY, RECLASSIFICATION_NOT_ALLOWED duplicateIndices - a list of indexes of items that are duplicates of the current item. identificationAttempts - a list of attempts in the format of (attributes, identiferName, attemptResult, searchOnTable) where attributes - the attributes of identifier entry used during identification identiferName - the CI identifier to which this identifier entry belongs attemptResult - one of SKIPPED, NO_MATCH, MATCHED, MULTI_MATCH searchOnTable - the table searched during the identification process. The possible name-value pairs within the relations list are: className - the relationship CI's class name and is always cmdb_rel_ci operation - one of INSERT, UPDATE, NO_CHANGE sysId - the sys_id of the relationship CI inserted or updated 
         */
        identifyCI(jsonString: String): String;

        /**
         * Run an identification audit against the specified CI to detect duplicates.If duplicates are found, duplication tasks are created. Only use this method on CI types with independent identification rules.
         * 
         * @gr The CI on which to run the audit to detect duplicates. The CI must have independent identification rules.
         */
        runIdentificationAudit(gr: GlideRecord);

    }

}
declare namespace sn_interaction {

    /**
     * Use the Interaction API to define the behavior for interaction records. This class requires the Interaction Logging, Routing, and Queueing plugin (com.glide.interaction). * * Note: This method has been deprecated. * * To use this class in a scoped API, use the sn_interaction namespace identifier.
     * 
     * 
     */
    declare class Interaction {



        /**
         * Accept a new interaction.Accepting a transfer only works for pending transfers. Find any pending transfers in the Interaction Agent Transfer [interaction_agent_transfer] table.
         * 
         * @example
         * var GR = new GlideRecord('interaction');
         * GR.get('b2c0a3af202a1300964f959e0488de75');
         * var interaction = sn_interaction.Interaction.getInteraction(GR).accept();
         * @returns Returns true if the transfer is accepted.
         */
        accept(): Boolean;

        /**
         * Create an interaction.
         * 
         * @options Field values for an interaction record. The channel field with the channel sys_id and channel metadata are required. If a queue is not included in the parameter, the system returns Interaction b2c0a3af202a1300964f959e0488de75 has no queue specified... running queue matching rules.
         * @example
         * var interactionObj = sn_interaction.Interaction.create({
         * 	channel: '28a59893873103002ae97e2526cb0b5d',
         * 	channel_metadata:{},
         * 	opened_for: '46d44a23a9fe19810012d100cca80666',
         * 	queue: 'f3a50867b30303002186a72256a8dcb7'
         * });
         * @returns Interaction
         */
        create(options: Object): Object;

        /**
         * Get an interaction record.
         * 
         * @interaction Interaction record from the interaction table [interaction] that is retrieved from the system.
         * @example
         * var gr = new GlideRecord('interaction');
         * gr.get('608a21bd096a9300964ffbd57ba7dd8d');
         * var interaction = sn_interaction.Interaction.getInteraction(gr);
         * @returns Interaction
         */
        getInteraction(interaction: GlideRecord): Object;

        /**
         * Transfer an interaction record to an agent using the sys_id for the agent.When an interaction is transferred from one agent to another, the interaction needs to be accepted or rejected using GlideRecord APIs. Use the GlideRecord API to change the state of the interaction and update. For more information, see the GlideRecord - update method.Note: This method has been deprecated.
         * 
         * @SysID The sys_id of the user you want to transfer an interaction record to.
         * @example
         * var GR = new GlideRecord('interaction');
         * GR.get('24b927ef202a1300964f959e0488de2d');
         * var interaction = sn_interaction.Interaction.getInteraction(GR);
         * interaction.transferToAgent('6816f79cc0a8016401c5a33be04be441');
         */
        transferToAgent(SysID: String);

        /**
         * Transfer an interaction record to an interaction queue.Transferring an interaction from one queue to another closes the original interaction and creates an interaction in the new queue.Note: This method has been deprecated.
         * 
         * @SysID The sys_id of the interaction queue you want to transfer the interaction record to.
         * @example
         * var GR = new GlideRecord('interaction');
         * GR.get('24b927ef202a1300964f959e0488de2d');
         * var interaction = sn_interaction.Interaction.getInteraction(GR);
         * interaction.transferToQueue('86fee1933b101300088d832b44efc474');
         */
        transferToQueue(SysID: String);

    }

}
declare namespace sn_interaction {

    /**
     * Use the InteractionQueue API to configure the behavior for interaction queues and connectors. Note: This API has been deprecated, use the Queue and Agent APIs instead. * * This class requires the Interaction Logging, Routing, and Queueing plugin (com.glide.interaction). * * To use this class in a scoped API, use the sn_interaction namespace identifier.
     * 
     * 
     */
    declare class InteractionQueue {



        /**
         * Assign the next interaction in a queue to the current user.
         * 
         * @example
         * var queueGR = new GlideRecord('interaction_queue');
         * queueGR.get('86fee1933b101300088d832b44efc474');
         * var queue = sn_interaction.InteractionQueue.getQueue(queueGR).acceptNext();
         * @returns Interaction
         */
        acceptNext(): Object;

        /**
         * Get an existing interaction queue by sys_id.
         * 
         * @queue Queue from the interaction_queue table.
         * @example
         * var queueGR = new GlideRecord("interaction_queue");
         * queueGR.get('86fee1933b101300088d832b44efc474');
         * var queue = sn_interaction.InteractionQueue.getQueue(queueGR);
         * @returns Interaction Queue
         */
        get(queue: GlideRecord): Object;

        /**
         * Returns a list of agents who are online and assigned to a particular queue.Note: This API has been deprecated, use the Agent API instead.
         * 
         * @example
         * var queueGR = new GlideRecord('interaction_queue');
         * queueGR.get('86fee1933b101300088d832b44efc474');
         * var queue = sn_interaction.InteractionQueue.getQueue(queueGR);
         * queue.getAvailableAgents();
         * @returns List of available agents by sys_id.
         */
        getAvailableAgents(): Array<any>;

        /**
         * Check if a user is an agent for a queue.
         * 
         * @queue Sys ID for a queue in the interaction_queue table.
         * @returns Returns either true or false
         */
        isAgentFor(queue: GlideRecord): Boolean;

        /**
         * Find out whether the queue is in schedule.
         * 
         * @example
         * var queueRecord = new GlideRecord('interaction_queue');
         * queueRecord.get('f3a50867b30303002186a72256a8dcb7');
         * var queueInSchedule = sn_interaction.InteractionQueue.getQueue(queueRecord);
         * queueInSchedule.isInSchedule();
         * @returns InteractionQueue
         */
        isInSchedule(): object;

    }

}/**
 * Provides scoped methods to create JSON objects from a string, and to turn JSON objects into strings. For scoped applications, the JSON API uses static methods that call the JavaScript ES5 native JSON object.
 * 
 * 
 */
declare class JSON {



    /**
     * Creates an object or primitive type from a JSON formatted string.
     * 
     * @str A JSON formatted string.
     * @example
     * var str = '{"name":"George","lastname":"Washington"}';
     * var obj = JSON.parse(str);
     * gs.info('The first name is' + obj.name);
     * @returns An object created from the specified string.
     */
    parse(str: String): Object;

    /**
     * Creates a string from a JSON object.
     * 
     * @jsonObject The JSON object to be turned into a string.
     * @example
     * var obj = {"name":"George","lastname":"Washington"};
     * var str =  JSON.stringify(obj);
     * gs.info('The object' + str);
     * 
     * @returns A JSON formatted string.
     */
    stringify(jsonObject: Object): String;

}


declare namespace sn_notification {

    /**
     * Perform actions in a third-party messaging application. This class requires the Messaging Notification plugin (com.glide.notification.messaging) and an integration with a third-party messaging application such as Slack or Teams. Use these methods in an action script in the Message Actions [messaging_observer_handler] table. * * Use the sn_notification namespace to access the Messaging API.
     * 
     * 
     */
    declare class Messaging {



        /**
         * Sends a custom message to a third-party application in response to a messaging event. For example, you can send a custom welcome message to a Slack channel when the Now Actions application installs.Use this method in an action script in the Message Actions [messaging_observer_handler] table.
         * 
         * @messagingApplication Third-party application to send a message to from the Messaging Entities [messaging_application] table.
         * @recipient Recipient of the message. When the instance receives an inbound message, you can send a response to a Slack channel, Team, or individual user ID found in the inbound payload.
         * @messagingContent Message content to send from the Messaging Contents [messaging_content] table.
         * @target Record used to define dynamic field values in the message. Table must match the Target table field in the Messaging Contents record. If the Messaging Contents record does not use a target table, set the value to null.
         * @example
         * //Send a message to a Teams user
         * var app = new GlideRecord('messaging_application');
         * app.get('1f2d26527f4213007f005212bdfa9102');
         * 
         * var content = new GlideRecord('messaging_content');
         * content.get('17f1f9617320130082999cfd7bf6a706');
         * 
         * sn_notification.Messaging.send(app, '29:1ojsgDg1xuA_jZ70PDI2_6E7mn7P6Mc0wK7z0n2lblL-SaNXYVI1cR7i6qncllAGvdmhy2-kXh76IEVpUHXdz3w', content, null);
         * 
         * //Send a message to a Slack user
         * var app = new GlideRecord('messaging_application');
         * app.get('5d2e38c07f6113007f005212bdfa9160');
         * 
         * var content = new GlideRecord('messaging_content');
         * content.get('69c48ba77310130082999cfd7bf6a7af');
         * 
         * sn_notification.Messaging.send(app, 'U8P706QFQ', content, null);
         * 
         * //Send a message to a Slack channel
         * var app = new GlideRecord('messaging_application');
         * app.get('5d2e38c07f6113007f005212bdfa9160');
         * 
         * var content = new GlideRecord('messaging_content');
         * content.get('69c48ba77310130082999cfd7bf6a7af');
         * 
         * sn_notification.Messaging.send(app, 'CA6232N65', content, null);
         */
        send(messagingApplication: GlideRecord, recipient: String, messagingContent: GlideRecord, target: GlideRecord);

    }

}
declare namespace sn_notify {

    /**
     * The NotifyScoped API allows you to interact with Notify calls and SMS messages using scripts. Access the scoped Notify class and its associated methods from the sn_notify namespace.
     * 
     * 
     */
    declare class Notify {



        /**
         * Calls the specified E.164-compliant telephone number.
         * 
         * @notifyPhoneNumber Notify phone number from which to make the call. When you initiate a call, the outgoing call workflow for the number group associated with this number runs. Ensure this workflow includes a join conference call activity to connect the user to the conference call.
         * @toPhoneNumber Phone number to call. Called numbers are added to the conference call.
         * @conferenceCall Optional. If this parameter is passed in, the callers identified in the toPhoneNumber parameter are automatically joined into the conference call identified by this record. GlideRecord for the Notify Call [notify_call] table which identifies the conference call record. This record is automatically added to the outgoing call workflow scratchpad as the workflow.scratchpad.conference_call variable.
         * @userSysId Optional. Unique identifier (sys_id) of the user associated with the call.
         * @groupSysId Optional. Unique identifier (sys_id) of the group associated with the call.
         * @sourceRecord Optional. Source record that prompted this call.
         * @example
         * var from = '+14048007337';
         * var to = '+31646810495';
         * 
         * // set up call
         * new sn_notify.NotifyScoped().call(from, to);
         * @example
         * var notify = new sn_notify.NotifyScoped();
         * var from = '+14041234567';
         * var participants = ['+31612345678', '+31623456789', '+31687654321'];
         * 
         * // set up a conference call
         * var conferenceCall = notify.conferenceCall();
         * 
         * // set up the outbound calls for all conference call participants
         * for (var i in participants) {
         *     var to = participants[i];
         *     notify.call(from, to, conferenceCall);
         * }
         * 
         * 
         */
        call(notifyPhoneNumber: String, toPhoneNumber: String, conferenceCall: GlideRecord, userSysId: String, groupSysId: String, sourceRecord: GlideRecord);

        /**
         * Creates a new conference call GlideRecord.
         * 
         * @sourceRecord Optional. Record that initiated the request to create the conference call. Used to populate the source and table fields on notify_conference_call record.
         * @example
         * var notify = new sn_notify.NotifyScoped();
         * var from = '+14041234567';
         * var participants = ['+31612345678', '+31623456789', '+31687654321'];
         * 
         * // set up a conference call
         * var conferenceCall = notify.conferenceCall();
         * 
         * // set up the outbound calls for all conference call participants
         * for (var i in participants) {
         *     var to = participants[i];
         *     notify.call(from, to, conferenceCall);
         * }
         * @returns New Notify conference call [notify_conference_call] record.
         */
        conferenceCall(sourceRecord: GlideRecord): GlideRecord;

        /**
         * Resumes a call after it was put in a queue (on hold).Use this method to resume calls that were put in a queue with the queueCall() method.
         * 
         * @callRecord GlideRecord object on the Notify Call [notify_call] table with the held call you want to resume.
         * @example
         * var notifyCallGr = new GlideRecord('notify_call');
         * notifyCallGr.get('active participant sys id');
         *  
         * if (notifyCallGr.isValid) {
         *     sn_notify.NotifyScoped.dequeueCall(notifyCallGr);
         * }
         */
        dequeueCall(callRecord: GlideRecord);

        /**
         * Forwards the specified call to a different call recipient.
         * 
         * @call Notify call record or the telephony provider call ID, of the call to be forwarded.
         * @destination Notify phone number record or an E.164-compliant phone number, of the caller to which to forward the call.
         * @dtmf Dual Tone - Multi Frequency (DTMF) code to send upon call connection.
         * @example
         * var callID = 'CA92374b5aa561dab476a7001db6026edc'; // Twilio Call ID
         * var phoneNumber = '+91406xxxxxxx';
         * var dtmfTones = null;
         *  
         * var notifyCallGr = new GlideRecord('notify_call');
         * notifyCallGr.get('active participant sys id');
         *  
         * if (notifyCallGr.isValid) {
         *     sn_notify.NotifyScoped.forwardCall(notifyCallGr(or) callID, phoneNumber, dtmfTones)
         * }
         */
        forwardCall(call: GlideRecordorString, destination: GlideRecordorString, dtmf: String);

        /**
         * Returns a list of client sessions that are available to receive calls.
         * 
         * @notifyNumber Valid Notify phone number.
         * @example
         * var clientSessionGr = sn_notify.NotifyScoped.getAvailableClients('+185xxxxxxxx'); 
         * // Here clientSessionGr is of type GlideRecord on 'notify_client_session' table.
         *  
         * var isLoggedInUserAvailable = false;
         * while (clientSessionGr.next()) {
         *   if (clientSessionGr.user == gs.getUserID())
         *     isLoggedInUserAvailable = clientSessionGr.available;
         * }
         * gs.info('isLoggedInUserAvailable - ' + isLoggedInUserAvailable);
         * @returns GlideRecord from the notify_client_session table for the specified phone number. Returns "0" if there are no available client sessions.
         */
        getAvailableClients(notifyNumber: String): Array<any>;

        /**
         * Returns all phone numbers and short codes available to Notify.
         * 
         * @example
         * // instantiate notify
         * var notify = new sn_notify.NotifyScoped();
         * 
         * // get all available phone numbers
         * var phoneNumbers = notify.getPhoneNumbers();
         * 
         * // iterate over phone numbers
         * for (var i = 0; i &lt; phoneNumbers.size(); i++) {
         * 
         *   var number = phoneNumbers.get(i);
         * 
         * //perform any actions using each phone number
         * 
         * }
         * @returns List of NotifyPhoneNumber objects, each object representing one phone number available to Notify.
         */
        getPhoneNumbers(): List;

        /**
         * Returns all short codes available to Notify.
         * 
         * @example
         * // instantiate notify
         * var notify = new sn_notify.NotifyScoped();
         * 
         * // get all available shortcodes
         * var shortCodes = notify.getShortCodes();
         * 
         * // iterate over phone numbers
         * for (var i = 0; i &lt; shortCodes.size(); i++) {
         * 
         * var shortCode = shortCodes.get(i);
         * 
         * gs.log(shortCode.getNumber());
         * 
         * //perform any actions using each shortcode
         * }
         */
        getShortCodes();

        /**
         * Returns client tokens for any active telephony drivers for use in WebRTC or mobile clients.This method uses the currently logged-in user record as the client.
         * 
         * @record GlideRecord to use to identify the Notify client, such as a group record or a user record.
         * @example
         * // get Notify client Tokens per active Notify driver for the currently logged in user
         * var json = new sn_notify.NotifyScoped().getTokens();
         *  
         * // Parse the JSON that was return into a tokens object
         * var tokens = JSON.parse(json);
         * 
         * // Log line
         * gs.log('Notify client tokens for the currently logged in user');
         * 
         *  // iterate over the driver tokens
         * for (var driver in tokens) {
         *  	gs.log(driver + ' Driver token: ' + tokens[driver]);
         * }
         * @example
         * // instantiate Notify
         * var notify = new sn_notify.NotifyScoped.Notify();
         *  
         * // get all Notify Groups
         * var notifyGroup = new GlideRecord("notify_group");
         * notifyGroup.query();
         *  
         * // iterate over all notify groups
         * while (notifyGroup.next()) {
         *   // generate Notify Client tokens per active Notify Driver for this group
         *   var json = notify.getTokens(notifyGroup);
         *   var tokens = JSON.parse(json);
         *  
         *   for (var driver in tokens) {
         *     gs.log(gs.getMessage("Notify Client token for {0} driver and Notify Group '{1}': {2}", [driver, notifyGroup.getValue('name'), tokens[driver]]));
         *   }
         * }
         * @example
         * var notify = new sn_notify.NotifyScoped();
         * var gr = new GlideRecord('sys_user');
         * if (gr.get(gs.getUserID())) {
         *   gs.info(notify.getTokens(gr));
         * }
         * @returns Web RTC tokens for the supported drivers, as a JSON string with the following format: {driverName1: “token1”, driverName2: “token2”}, such as "TwilioDirect":"eyJhxxxx.eyJleHAiOiIxxxx.7fejxxx_mbLxxx"
         */
        getTokens(record: GlideRecord): String;

        /**
         * Returns the maximum amount of time that a client session stays active for a specified telephony driver before automatically timing out.
         * 
         * @owner Name of the telephony driver for which to retrieve the session length. Valid values: Twilio: for the old driver TwilioDirect: for the new driver 
         * @example
         * var owner = "TwilioDirect";  // Valid driver
         * var ttl = SNC.Notify.getTokenTTL(owner);
         * gs.info("Token TTL for " + owner + " --&gt; " + ttl);
         *  
         * owner = "Abcxyz";  // Invalid driver
         * ttl = SNC.Notify.getTokenTTL(owner);
         * // For an invalid driver, we throw NoSuchNotifyDriverException saying that Abcxyzdriver is not available
         * // and return the default value of TTL
         * gs.info("Token TTL for " + owner + " --&gt; " + ttl); 
         * @returns Maximum length of the session (in seconds). Default: 1800 seconds
         */
        getTokenTTL(owner: String): Integer;

        /**
         * Determines whether the specified phone number has the specified capability.The telephony driver associated with the phone number contains a list of all of the capabilities of the phone.Note: In the base system, the Notify JS driver only has 'show_speakers' as a capability; this can be modified.
         * 
         * @notifyPhoneNumber Phone number for which to check for the specified capability.
         * @capability Capability to detect. The string text must be an exact match to what is in the phone.
         * @example
         * // Each driver has a defined set of capabilities.
         * 
         * var capability = 'show_speakers';
         * gs.info(sn_notify.NotifyScoped.hasCapability('+185xxxxxxxx', capability)); // true
         *  
         * capability = 'send_sms';
         * gs.info(sn_notify.NotifyScoped.hasCapability('+185xxxxxxxx', capability)); // false
         * @returns Flag that indicates whether the specified phone has the specified capability. true: phone has the capability false: phone does not have the capability 
         */
        hasCapability(notifyPhoneNumber: String, capability: String): Boolean;

        /**
         * Removes the specified caller from the current Notify conference call.
         * 
         * @participant GlideRecord object containing the Notify Participant [notify_participant] record of the caller to remove from the conference call.
         * @example
         * var participant = new GlideRecord('notify_participant');
         * participant.get('&lt;sys_id&gt;');
         * if (participant.isValid()) {
         *     new sn_notify.NotifyScoped().kick(participant);
         * }
         */
        kick(participant: GlideRecord);

        /**
         * Performs one or more activities on an active Notify phone call.Use this method to change the behavior of a call. For example, transferring a call, playing audio, or forcing a hangup.Note: The scoped implementation of this method only supports custom Notify activities. Unlike the global implementation, it does not provide a NotifyAction API. For details on how to create a custom Notify activity, see Notify workflow activities.
         * 
         * @callRecord Notify Call [notify_call] record of the call for which to apply the actions.
         * @notifyAction NotifyAction object describing one or more activities to perform on the call.
         */
        modifyCall(callRecord: GlideRecord, notifyAction: NotifyAction);

        /**
         * Mutes the specified conference call participant.
         * 
         * @participantRecord GlideRecord from the notify_participant table for the participant to mute.
         * @example
         * var notifyParticipantGr = new GlideRecord('notify_participant');
         * notifyParticipantGr.get('active participant sys id');
         *  
         * if (notifyParticipantGr.isValid) {
         *     sn_notify.NotifyScoped.mute(notifyParticipantGr);
         * }
         */
        mute(participantRecord: GlideRecord);

        /**
         * Puts the specified call into a queue (on hold).Resume a queued call using the dequeueCall() method.
         * 
         * @callRecord GlideRecord object of the Notify Call record (notify_call table) to put on hold.
         * @example
         * var call = new GlideRecord('notify_call');
         * call.get('&lt;call record sys_id&gt;');
         * if (call.isValid()) {
         *     new sn_notify.NotifyScoped().queueCall(call);
         * }
         */
        queueCall(callRecord: GlideRecord);

        /**
         * Sends a specified SMS message to the specified list of Notify clients (phone numbers).
         * 
         * @notifyPhoneNumber Phone number from which the SMS message is being sent.
         * @toPhoneNumbers Comma separated list of E.164-compliant phone numbers to which to send the SMS message.
         * @messageBody SMS text to send.
         * @source Source record that prompted this SMS message, such as an incident.
         * @example
         * var incidentGr = new GlideRecord('incident');
         * incidentGr.get(active incident sys_id');
         * if (incidentGr.isValid()) {
         *     sn_notify.NotifyScoped.sendBulkSMS('+15413970605', ['+919885XXXXXX', '+919775XXXXXX'], 'Test automation message', incidentGr);
         * }
         * @returns Unique sys_id of the Notify Message [notify_message] record created by this function.
         */
        sendBulkSMS(notifyPhoneNumber: sn_notify.NotifyPhoneNumber, toPhoneNumbers: String, messageBody: String, source: GlideRecord): String;

        /**
         * Sends an SMS text message to an E.164-compliant phone number.This method creates a new record on the Notify Message [notify_message] table and associates it with the source record.
         * 
         * @notifyPhoneNumber Notify phone number or short code to which to send this SMS message.
         * @toPhoneNumber E.164-compliant phone number to which to send the SMS message.
         * @messageBody SMS text message.
         * @source Source record that prompted this SMS message, such as an incident.
         * @example
         * var incidentGr = new GlideRecord('incident');
         * incidentGr.get(active incident sys_id');
         * if (incidentGr.isValid()) {
         *     sn_notify.NotifyScoped.sendSMS('+15413970605', '+919885XXXXXX', 'Test automation message', incidentGr);
         * }
         * @returns Unique message SID; stored in the Notify Message [notify_message] record as message_id.
         */
        sendSMS(notifyPhoneNumber: sn_notify.NotifyPhoneNumber, toPhoneNumber: String, messageBody: String, source: GlideRecord): String;

        /**
         * Unmutes the specified conference call participant.
         * 
         * @participantRecord GlideRecord from the notify_participant table for the participant to unmute.
         * @example
         * var notifyParticipantGr = new GlideRecord('notify_participant');
         * notifyParticipantGr.get('active participant sys id');
         *  
         * if (notifyParticipantGr.isValid) {
         *     sn_notify.NotifyScoped.unmute(notifyParticipantGr);
         * }
         */
        unmute(participantRecord: GlideRecord);

    }

}/**
 * The NotifyConferenceUtil API provides methods to manage Notify conference calls and SMS messages for various telephony service providers, such as Zoom and WebEx. Using the NotifyConferenceUtil API you can: * * Create new conference calls Add participants by phone number or user ID Remove participants from a conference call Mute participants in a conference call Unmute participants in a conference call Obtain the capabilities of a specified service provider End a conference call * * You can use this API in both scoped and global scripts. To use this API you must activate the Conference Notify plugin (com.snc.notify) which requires a separate subscription. For details on activating this plugin, see Activate Notify.
 * 
 * 
 */
declare class NotifyConferenceUtil {



    /**
     * Instantiates a NotifyConferenceUtils object (constructor).
     * 
     * @example
     * function () {
     * 	var confGR = new GlideRecord('notify_conference_call');
     * 	confGR.get('76d3364d0b5133008e64aabcb4673a6d');
     * 
     * 	var confUtils = new NotifyConferenceUtils();
     * 	var actionResult = confUtils.addToConferenceByPhoneNumber("+917799555331", confGR)
     * 	if (actionResult.status)
     * 		gs.info('Participant has been added to conference');
     * 	else {
     * 		gs.info('join operation failed');
     * 		actionResult.warnMessages.forEach(function (msg) {
     * 			gs.info(msg);
     * 		});
     * 		actionResult.errorMessages.forEach(function (msg) {
     * 			gs.info(msg);
     * 		})
     * 	}
     * })();
     */
    constructor();

    /**
     * Adds a participant to a specified conference call using their phone number to identify the participant.
     * 
     * @toNumber Phone number of the participant to add to the conference call.
     * @confGR GlideRecord of the conference call to which to add the specified participant. These records are located in the Notify Conference Call [notify_conference_call] table.
     * @example
     * function () {
     * 	var confGR = new GlideRecord('notify_conference_call');
     * 	confGR.get('76d3364d0b5133008e64aabcb4673a6d');
     * 
     * 	var confUtils = new NotifyConferenceUtils();
     * 	var actionResult = confUtils.addToConferenceByPhoneNumber("+917799555331", confGR)
     * 	if (actionResult.status)
     * 		gs.info('Participant has been added to conference');
     * 	else {
     * 		gs.info('join operation failed');
     * 		actionResult.warnMessages.forEach(function (msg) {
     * 			gs.info(msg);
     * 		});
     * 		actionResult.errorMessages.forEach(function (msg) {
     * 			gs.info(msg);
     * 		})
     * 	}
     * })();
     * @returns Results of the conference action.&lt;action&gt;.status: Status of the conference action. Data type: Boolean Valid values: true: Conference action succeeded false: Conference action failed &lt;action&gt;.successMessages: If status is true, success message(s), else empty. Data type: Array of Strings &lt;action&gt;.warnMessages: If status is false, any warning messages thrown during processing. Data type: Array of Strings &lt;action&gt;.errorMessages: If status is false, any error messages thrown during processing. Data type: Array of Strings 
     */
    addToConferenceByPhoneNumber(toNumber: String, confGR: GlideRecord): Object;

    /**
     * Adds a participant to the conference call referenced by the passed in GlideRecord using their unique user identifier.
     * 
     * @userId Sys ID of the participant to add to the specified conference call. This information is located in the User [sys_user] table.
     * @confGR GlideRecord of the conference call to add the specified participant. These records are located in the Notify Conference Call [notify_conference_call] table.
     * @example
     * (function () {
     * 	var confGR = new GlideRecord('notify_conference_call');
     * 	confGR.get('76d3364d0b5133008e64aabcb4673a6d');
     * 
     * 	var confUtils = new NotifyConferenceUtils();
     * 	var actionResult = confUtils.addToConferenceByUserId(gs.getUserID(), confGR)
     * 	if (actionResult.status)
     * 		gs.info('Participant has been added to conference');
     * 	else {
     * 		gs.info('join operation failed');
     * 		actionResult.warnMessages.forEach(function (msg) {
     * 			gs.info(msg);
     * 		});
     * 		actionResult.errorMessages.forEach(function (msg) {
     * 			gs.info(msg);
     * 		})
     * 	}
     * })();
     * 
     * @returns Results of the conference action.&lt;action&gt;.status: Status of the conference action. Data type: Boolean Valid values: true: Conference action succeeded false: Conference action failed &lt;action&gt;.successMessages: If status is true, success message(s), else empty. Data type: Array of Strings &lt;action&gt;.warnMessages: If status is false, any warning messages thrown during processing. Data type: Array of Strings &lt;action&gt;.errorMessages: If status is false, any error messages thrown during processing. Data type: Array of Strings 
     */
    addToConferenceByUserId(userId: String, confGR: GlideRecord): Object;

    /**
     * Performs the specified conference call action, such as starting/ending a conference call or joining, removing, muting, or unmuting participants from a conference call.You can start a new conference call and add participants within a single call to this method or call the method multiple times to start the call and then manage participants separately. In addition, through the passed in data object, you can configure the method to: Save pointers in the conference call record to the specific record (source record), such as an incident or problem, that is the topic of discussion for the conference call. Allow/disallow multiple conference calls for a source record. Automatically log the participants that were in the conference call in the "Work Notes" field of the source record. Have a message read aloud when a participant answers an outgoing call from the conference. 
     * 
     * @action Defines the conference call action to perform.The following are the available conference call actions: start: Starts the conference call identified in data.confId end: Terminates the conference call identified in data.confId join: Adds the participant specified in the data.items array to the conference call identified in data.confId multiJoin: Adds the participants specified in the data.items array to the conference call identified in data.confId selfJoin: Adds the currently logged in user to the conference call (no entry in data.items required.) kick: Removes the participant specified in the data.items array from the conference call identified in data.confId multiKick: Removes the participants specified in the data.items array from the conference call identified in data.confId mute: Mutes the participant specified in the data.items array on the conference call identified in data.confId multiMute: Mutes the participants specified in the data.items array on the conference call identified in data.confId unmute: Unmutes the participant specified in the data.items array from the conference call identified in data.confId multiUnmute: Unmutes the participants specified in the data.items array from the conference call identified in data.confId 
     * @data Object that describes the conference call.
     * @dataaddToWorkNotes Flag that indicates whether to add information about the participants that were included in the conference call in the work notes field of the associated record. For this functionality to work, you must also specify values in the data.table and data.sysId parameters. These parameters identify the record in which to add the work notes.
     * Default: false
     * Actions for which this parameter is valid: start join multiJoin selfJoin 
     * @dataallowMulticonference Flag that indicates whether to allow multiple conference calls for a specific record at one time. For this functionality to work, you must also specify values in the data.table and data.sysId parameters. These parameters identify the record that is allowed to have multiple conference calls.
     * Default: false
     * Actions for which this parameter is valid: start 
     * @dataconfId Sys ID of the conference call. The conference Sys ID is located in the Notify Conference Call [notify_conference_call] table.
     * Actions for which this parameter is required: end join multiJoin selfJoin Note: Participant actions such as mute, unmute, and kick do not require this parameter to be set as the method obtains this information from the Notify Conference Call Participant [notify_participant] table. 
     * @datafromNumber Service provider number to call into for the conference call. Locate this value in the Number or Phone number column of the Notify Phone Number [notify_number] table.
     * Actions for which this parameter is required: start 
     * @dataisNewConference Flag that indicates whether this is a new or an existing conference call. Valid values: true: New conference call false: Existing conference call Default: false
     * Actions for which this parameter is valid: start 
     * @dataitems Information for each participant to include in the conference call. Valid array values: id: Sys ID of user; located in the User [sys_User] table.Valid actions: join, multiJoin, start notifyParticipantId: Sys ID of the Notify participant; located in the Notify Participant [notify_participant] table.Valid actions: join, kick, multiJoin, mute, start, unmute phoneNumber: Phone number of the participant. If this value is passed in conjunction with either the id or notifyParticipantId, this value supersedes the phone numbers in the user/participant record and is used to place the call.Valid actions: join, multiJoin, start email: Email address of the participant.Valid actions: join, multiJoin, start 
     * @datamessage Message that is read aloud when a user answers the call, such as, "P1 incident has been created please login to instance." Actions for which this parameter is valid: start join multiJoin 
     * @dataserviceProvider Required. Name of conference service provider, such as Zoom or Webex. Actions for which this parameter is required: all 
     * @datasysId Sys ID of the source record to associate with the conference call. For example, if a conference call is held to discuss a specific incident or problem, put the Sys ID of the incident or problem record in this value. This Sys ID is stored in the Source column of the NotifyConference Call [notify_conference_call] table and can later be tracked. This parameter is used in conjunction with the data.Table, data.addToWorkNotes, and allowMulticonference parameters.
     * Actions for which this parameter is valid: start 
     * @datatable Table that contains the source record to associate with the conference call. A source record can be any record, such as an "incident" or "problem", that is the topic of discussion in the conference call. This table name is stored in the Table column of the NotifyConference Call [notify_conference_call] table and can be tracked. This parameter is used in conjunction with the data.sysId, data.addToWorkNotes, and allowMulticonference parameters. Actions for which this parameter is valid: start 
     * @example
     * (function (confId) {
     * 	var confUtils = new NotifyConferenceUtils();
     * 	var data = confUtils.getConferenceInputDataTemplate();
     * 	data.table = 'incident';
     * 	data.sysId = '1234';
     * 	data.addToWorkNotes = false;
     * 	data.confId = confId;
     * 	data.message = 'p1 incident has been created';
     * 	data.fromNumber = 'twilio/Telephony driver number';
     * 	data.items.push({ id: 'user3SysId', phoneNumber: '+917799555332' });
     * 	data.items.push({ id: 'user4SysId', email: 'yln99518@gmail.com' });
     * 
     * 	var result = confUtils.doConferenceAction('start', data);
     * 	if (result.status) {
     * 		gs.info('Start conference action succeeded');
     * 	} else
     * 		gs.info('Start conference action failed');
     * 
     * 	result.errorMessages.forEach(function (msg) {
     * 		gs.info(msg);
     * 	});
     * 	result.warnMessages.forEach(function (msg) {
     * 		gs.info(msg);
     * 	});
     * 	result.successMessages.forEach(function (msg) {
     * 		gs.info(msg);
     * 	});
     * })('activeConfSysId');
     * 
     * @returns Results of the conference action.&lt;action&gt;.status: Status of the conference action. Data type: Boolean Valid values: true: Conference action succeeded false: Conference action failed &lt;action&gt;.successMessages: If status is true, success message(s), else empty. Data type: Array of Strings &lt;action&gt;.warnMessages: If status is false, any warning messages thrown during processing. Data type: Array of Strings &lt;action&gt;.errorMessages: If status is false, any error messages thrown during processing. Data type: Array of Strings 
     */
    doConferenceAction(action: String, data: Object, dataaddToWorkNotes: Boolean, dataallowMulticonference: Boolean, dataconfId: String, datafromNumber: String, dataisNewConference: Boolean, dataitems: Array<any>, datamessage: String, dataserviceProvider: String, datasysId: String, datatable: String): Object;

    /**
     * Returns a JSON data template to use with the doConferenceAction() method. Using this template automatically structures the data object so that you don't have to manually create it.Call this method prior to calling the doConferenceAction() method. For the desired conference call action, set the desired parameters within the template, and then pass the template in the doConferenceAction() call. For additional information on the valid parameters for each action, see doConferenceAction().Note: This is a helper method. You can also manually construct this object and pass that object into the doConferenceAction() method and have the same outcome.
     * 
     * @example
     * (function (confId) {
     * 	var confUtils = new NotifyConferenceUtils();
     * 	var data = confUtils.getConferenceInputDataTemplate();
     * 	data.confId = confId;
     * 	var result = confUtils.doConferenceAction('end', data);
     * 	if (result.status) {
     * 		gs.info('Conference call has been ended');
     * 	} else
     * 		gs.info('End conference call action failed');
     * 
     * 	result.errorMessages.forEach(function (msg) {
     * 		gs.info(msg);
     * 	});
     * 	result.warnMessages.forEach(function (msg) {
     * 		gs.info(msg);
     * 	});
     * 	result.successMessages.forEach(function (msg) {
     * 		gs.info(msg);
     * 	});
     * })('activeConfSysId');
     * @returns Information for each participant to include in the conference call. Valid array values: id: Sys ID of user; located in the User [sys_User] table.Valid actions: join, multiJoin, start notifyParticipantId: Sys ID of the Notify participant; located in the Notify Participant [notify_participant] table.Valid actions: join, kick, multiJoin, mute, start, unmute phoneNumber: Phone number of the participant. If this value is passed in conjunction with either the id or notifyParticipantId, this value supersedes the phone numbers in the user/participant record and is used to place the call.Valid actions: join, multiJoin, start email: Email address of the participant.Valid actions: join, multiJoin, start 
     */
    getConferenceInputDataTemplate(): data.items;

    /**
     * Returns the capabilities of all telephony service provider drivers in the instance.Possible capabilities include: archive: archives the conference after it ends beepOnLeave: plays a "beep" tone when a participant leaves the conference call beepOnJoin: plays a "beep" tone when a participant joins the conference call end: ends the identified conference call filesharing: allows file sharing between participants join: adds a participant to a conference call kick: removes a participant from a conference call multiJoin: adds multiple participants to a conference call multiKick: removes multiple participants from a conference call muteOnJoin: mutes a participant when they initially join a conference call multiUnmute: unmutes multiple participants for a conference call record: records conference calls recording: provides an on-screen indicator when the conference call is being recorded screenSharing: allows participant screens to be shared with the group selfJoin: adds the current logged in user to a conference call speaking: provides an on-screen message as to who is currently speaking start: starts the identified conference call unmute: unmutes a participant in a conference call 
     * 
     * @example
     * (function () {
     * 	var confUtils = new NotifyConferenceUtils();
     * 	var providerToCapability = confUtils.getServiceProvidersCapabilites();
     * 	for (var provider in providerToCapability) {
     * 		gs.info('{0} supported capabilities \n\n', provider);
     * 		var capabilities = providerToCapability[provider]
     * 		for (var cap in capabilities)
     * 			if(confUtils.isActionSupported(capabilities[cap].isSupported))
     * 				gs.info('"{0}" action supported', cap);
     * 			else
     * 				gs.info("'{0}' action is not supported by this conference driver", cap);
     * 	}
     * })();
     * 
     * @returns Key-value pairs of the status of each driver capability.Valid values: isSupported = 0: capability is not supported isSupported = 1: capability is supported 
     */
    getServiceProvidersCapabilities(): Object;

    /**
     * Determines whether a Notify conference action is supported by a telephony service provider.To use this method, you must first call the getServiceProviderCapabilities() method. This method returns an object that contains information about the availability of each possible Notify conference action for each service provider configured in your instance.For example:{ "Telephony": { "start": { "isSupported": 1, "meta": {} }, "end": { "isSupported": 1, "meta": {} }, "selfJoin": { "isSupported": 1, "meta": {} }, "join": { "isSupported": 1, "meta": {} }, "multiJoin": { "isSupported": 1, "meta": {} }, "mute": { "isSupported": 1, "meta": {} }, "multiMute": { "isSupported": 1, "meta": {} }, "unmute": { "isSupported": 1, "meta": {} }, "multiUnmute": { "isSupported": 1, "meta": {} }, "kick": { "isSupported": 1, "meta": {} }, "multiKick": { "isSupported": 1, "meta": {} }, "record": { "isSupported": 0, "meta": {} }, "speaking": { "isSupported": 0, "meta": {} }, "recording": { "isSupported": 0, "meta": {} }, "screenSharing": { "isSupported": 0, "meta": {} }, "fileSharing": { "isSupported": 0, "meta": {} }, "archive": { "isSupported": 0, "meta": {} }, "muteOnJoin": { "isSupported": 0, "meta": {} }, "beepOnJoin": { "isSupported": 0, "meta": {} }, "beepOnLeave": { "isSupported": 0, "meta": {} } }
     * }
     * 
     * @action Value of the isSupported parameter returned by the getServiceProvidersCapabilities() method for a specific action and service provider. Note: Although the isSupported value may appear to be a Boolean, it is actually a Number. Do not try and evaluate the capabilities as Boolean values. Use this method as the associated values may be expanded in future versions.
     * @example
     * (function () {
     *   var confUtils = new NotifyConferenceUtils();
     *   var providerToCapability = confUtils.getServiceProvidersCapabilites();
     *     for (var provider in providerToCapability) {
     *       gs.info('{0} supported capabilities \n\n', provider);
     *       var capabilities = providerToCapability[provider]
     *       for (var cap in capabilities)
     *         if (confUtils.isActionSupported(capabilities[cap].isSupported))
     *           gs.info('"{0}" action supported', cap);
     *         else
     *           gs.info("'{0}' action is not supported by this conference driver", cap);
     *     }
     * })();
     * @returns Flag that indicates whether the telephony service provider supports the specified action.Valid values: true: action is supported by the service provider false: action is not supported by the service provider 
     */
    isActionSupported(action: Number): Boolean;

    /**
     * Removes the participant associated with the passed in GlideRecord from the current conference call.
     * 
     * @notifyParticipantGR GlideRecord object of the participant to remove from the conference call. These records are located in the Notify Participant [notify_participant] table.
     * @example
     * (function () {
     *     var confUtils = new NotifyConferenceUtils();
     *     var participantGR = new GlideRecord('notify_participant');  // Participant record contains conf call ID
     *     participantGR.get('validParticipantSysId');
     *     var actionResult = confUtils.kickByParticipantGR(participantGR);
     *     if (actionResult.status)
     *         gs.info('Participant has been kicked out of conference');
     *     else {
     *         gs.info('kick operation failed');
     *         actionResult.warnMessages.forEach(function (msg) {
     *             gs.info(msg);
     *         });
     *         actionResult.errorMessages.forEach(function (msg) {
     *             gs.info(msg);
     *         })
     *     }
     * })()
     * 
     * @returns Results of the conference action.&lt;action&gt;.status: Status of the conference action. Data type: Boolean Valid values: true: Conference action succeeded false: Conference action failed &lt;action&gt;.successMessages: If status is true, success message(s), else empty. Data type: Array of Strings &lt;action&gt;.warnMessages: If status is false, any warning messages thrown during processing. Data type: Array of Strings &lt;action&gt;.errorMessages: If status is false, any error messages thrown during processing. Data type: Array of Strings 
     */
    kickByParticipantGR(notifyParticipantGR: GlideRecord): Object;

    /**
     * Mutes the participant associated with the passed in GlideRecord on the current conference call.
     * 
     * @notifyParticipantGR GlideRecord object of the participant to mute. These records are located in the Notify Participant [notify_participant] table.
     * @example
     * (function () {
     *     var confUtils = new NotifyConferenceUtils();
     *     var participantGR = new GlideRecord('notify_participant');
     *     participantGR.get('validSysId');
     *     var actionResult = confUtils.muteByParticipantGR(participantGR);
     *     if (actionResult.status)
     *         gs.info('Participant has been muted');
     *     else {
     *         gs.info('mute operation failed');
     *         actionResult.warnMessages.forEach(function (msg) {
     *             gs.info(msg);
     *         });
     *         actionResult.errorMessages.forEach(function (msg) {
     *             gs.info(msg);
     *         })
     *     }
     * })()
     * @returns Results of the conference action.&lt;action&gt;.status: Status of the conference action. Data type: Boolean Valid values: true: Conference action succeeded false: Conference action failed &lt;action&gt;.successMessages: If status is true, success message(s), else empty. Data type: Array of Strings &lt;action&gt;.warnMessages: If status is false, any warning messages thrown during processing. Data type: Array of Strings &lt;action&gt;.errorMessages: If status is false, any error messages thrown during processing. Data type: Array of Strings 
     */
    muteByParticipantGR(notifyParticipantGR: Object): Object;

    /**
     * Unmutes the participant associated with the passed in GlideRecord on the current conference call.
     * 
     * @notifyParticipantGR GlideRecord object of the participant to unmute. These records are located in the Notify Participant [notify_participant] table.
     * @example
     * (function () {
     *     var confUtils = new NotifyConferenceUtils();
     *     var participantGR = new GlideRecord('notify_participant');
     *     participantGR.get('validSysId');
     *     var actionResult = confUtils.unmuteByParticipantGR(participantGR);
     *     if (actionResult.status)
     *         gs.info('Participant has been Unmuted');
     *     else {
     *         gs.info('Unmute operation failed');
     *         actionResult.warnMessages.forEach(function (msg) {
     *             gs.info(msg);
     *         });
     *         actionResult.errorMessages.forEach(function (msg) {
     *             gs.info(msg);
     *         })
     *     }
     * })();
     * 
     * @returns Results of the conference action.&lt;action&gt;.status: Status of the conference action. Data type: Boolean Valid values: true: Conference action succeeded false: Conference action failed &lt;action&gt;.successMessages: If status is true, success message(s), else empty. Data type: Array of Strings &lt;action&gt;.warnMessages: If status is false, any warning messages thrown during processing. Data type: Array of Strings &lt;action&gt;.errorMessages: If status is false, any error messages thrown during processing. Data type: Array of Strings 
     */
    unmuteByParticipantGR(notifyParticipantGR: GlideRecord): Object;

}


declare namespace sn_notify {

    /**
     * The Scoped NotifyPhoneNumber API allows you to query information about a Notify phone number. Access the scoped NotifyPhoneNumber API and its associated methods in the sn_notify namespace.
     * 
     * 
     */
    declare class NotifyPhoneNumber {



        /**
         * Returns the international dialing code for a Notify phone number.
         * 
         * @example
         * var numbers = sn_notify.NotifyScoped.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.getDialCode());
         * }
         * @returns International phone code for a country.
         */
        getDialCode(): String;

        /**
         * Returns the ID of this phone number as defined by the telephony provider.
         * 
         * @example
         * var numbers = sn_notify.NotifyScoped.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.getID());
         * }
         * @returns Identifier of the number within the telephony provider.
         */
        getID(): String;

        /**
         * Returns the numerical phone number for the current Notify caller.
         * 
         * @example
         * var numbers = sn_notify.NotifyScoped.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.getNumber());
         * }
         * @returns E.164-compliant phone number.
         */
        getNumber(): String;

        /**
         * Returns the telephony provider associated with this phone number.
         * 
         * @example
         * var numbers = sn_notify.NotifyScoped.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.getOwner());
         * }
         * @returns Telephony provider associated with the number: Twilio.
         */
        getOwner(): String;

        /**
         * Returns the country associated with the phone number.
         * 
         * @example
         * var numbers = sn_notify.NotifyScoped.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.getTerritory());
         * }
         * @returns Name of the country to which the phone number belongs.
         */
        getTerritory(): String;

        /**
         * Determines if the Notify phone number supports conference calls.
         * 
         * @example
         * var numbers = sn_notify.NotifyScoped.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.supportsConferenceCall());
         * }
         * @returns Value that indicates whether the Notify phone number supports conference calling. true: phone number does support conference calling false: phone number does not support conference calling 
         */
        supportsConferenceCall(): Boolean;

        /**
         * Determines if the Notify phone number supports receiving phone calls.
         * 
         * @example
         * var numbers = sn_notify.NotifyScoped.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.supportsIncomingPhoneCall());
         * }
         * @returns Value that indicates whether the Notify phone number supports incoming phone calls. true: phone number does support incoming phone calls false: phone number does not support incoming phone calls 
         */
        supportsIncomingPhoneCall(): Boolean;

        /**
         * Determines if the Notify phone number supports receiving SMS messages.
         * 
         * @example
         * var numbers = sn_notify.NotifyScoped.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.supportsIncomingSMS());
         * }
         * @returns Value that indicates whether the Notify phone number supports incoming SMS messages. true: phone number does support incoming SMS messages false: phone number does not support incoming SMS messages 
         */
        supportsIncomingSMS(): Boolean;

        /**
         * Determines if the Notify phone number supports initiating phone calls.
         * 
         * @example
         * var numbers = sn_notfy.Notify.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.supportsOutgoingPhoneCall());
         * }
         * @returns Value that indicates whether the Notify phone number supports initiating outgoing phone calls. true: phone number does support initiating outgoing phone calls false: phone number does not support initiating outgoing phone calls 
         */
        supportsOutgoingPhoneCall(): Boolean;

        /**
         * Determines if the Notify phone number supports sending SMS messages.
         * 
         * @example
         * var numbers = sn_notify.NotifyScoped.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.supportsOutgoingSMS());
         * }
         * @returns Value that indicates whether the Notify phone number supports sending SMS messages. true: phone number does support sending SMS messages false: phone number does not support sending SMS messages 
         */
        supportsOutgoingSMS(): Boolean;

        /**
         * Determines if the Notify phone number supports recording phone calls.
         * 
         * @example
         * var numbers = sn_notify.Notify.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.supportsRecording());
         * }
         * @returns Value that indicates whether the Notify phone number supports recording phone calls. true: phone number does support recording phone calls false: phone number does not support recording phone calls 
         */
        supportsRecording(): Boolean;

        /**
         * Determines if the Notify phone number supports calls to a browser, such as in a WebRTC implementation.
         * 
         * @example
         * var numbers = sn_notify.Notify.getPhoneNumbers();
         *  
         * // Here numbers is of type List
         * if (numbers.size() &gt; 0) {
         *    var number = numbers.get(0);
         *  
         *    // Here number is of type NotifyPhoneNumber
         *   gs.info(number.supportsWebRTC());
         * }
         * @returns Value that indicates whether the Notify phone number supports browser-to-browser (WebRTC) calls. true: phone number does support browser-to-browser (WebRTC) calls false: phone number does not support browser-to-browser (WebRTC) calls 
         */
        supportsWebRTC(): Boolean;

    }

}
declare namespace sn_sc {

    /**
     * OrderGuide API enables you to initialize and view an order guide details. To use this class in a scoped application, use the sn_sc namespace identifier. The Service Catalog Scoped API plugin (com.glideapp.servicecatalog.scoped.api) that is enabled by default is required to access the OrderGuide API. 
     * 
     * 
     */
    declare class OrderGuide {



        /**
         * Creates an instance of the OrderGuide class with the specified sys_id.
         * 
         * @sys_id sys_id of the OrderGuide.
         * @example
         * var cart=new sn_sc.OrderGuide("6690750f4f7b4200086eeed18110c761");
         */
        constructor(sys_id: String);

        /**
         * Returns the sys_id of the order guide.
         * 
         * @example
         * var cart=new sn_sc.OrderGuide("6690750f4f7b4200086eeed18110c761");	
         * 	console.log(cart.getID());
         * 
         * @returns sys_id of the order guide.
         */
        getID(): String;

        /**
         * Initialises the order guide with the specified catalog items and the variables, and returns the order guide.
         * 
         * @request A JSON object with the Catalog item and variable details.
         * @example
         * var guide = new sn_sc.OrderGuide('6690750f4f7b4200086eeed18110c761');
         *  
         * var map = {};
         * map.variables = {};
         * //map.sysparm_id = '6690750f4f7b4200086eeed18110c761';
         * map.variables['IOce433d0f4f7b4200086eeed18110c74d'] = '221f3db5c6112284009f4becd3039cc9'; //Here ce433d0f4f7b4200086eeed18110c74d is the sys_id of the variable and 221f3db5c6112284009f4becd3039cc9 is its value
         * var includedItems = guide.init(map)
         * @returns A JSON object with the initialised order guide details.
         */
        init(request: Object): Object;

        /**
         * Specifies if the Show Include Toggle (include_items) check box is selected for the specified order guide.Note: The Show Include Toggle field does not appear on the Order guide form by default.
         * 
         * @example
         * var orderGuide=new sn_sc.OrderGuide("6690750f4f7b4200086eeed18110c761");	
         * 	console.log(orderGuide.isIncludeItems());
         * @returns Returns true if the Show Include Toggle check box is selected for the specified order guide. Else, returns false.
         */
        isIncludeItems(): Boolean;

        /**
         * Specifies if the two-step checkout is enabled.
         * 
         * @example
         * var orderGuide=new sn_sc.OrderGuide("6690750f4f7b4200086eeed18110c761");	
         * 	console.log(orderGuide.isTwoStep());
         * @returns Returns true if the two-step checkout is enabled. Else returns false.
         */
        isTwoStep(): Boolean;

        /**
         * Specifies if a separate cart (different from that for catalog items) usage is enabled for a two-step order guide.
         * 
         * @example
         * var orderGuide=new sn_sc.OrderGuide("6690750f4f7b4200086eeed18110c761");	
         * 	console.log (orderGuide.isUseCustomCart());
         * @returns Returns true if a separate cart usage is enabled for a two-step order guide. Else, returns false.
         */
        isUseCustomCart(): Boolean;

        /**
         * Navigates to the catalog items of an order guide.
         * 
         * @itemDetails A JSON object with details of catalog items in the order guide.
         * @example
         * var orderGuide=new sn_sc.OrderGuide.navigateFromMap(itemdetails);
         */
        navigateFromMap(itemDetails: Object);

    }

}/**
 * The PAScorecard API enables you to fetch data about indicators and their associated records, such as breakdowns. 
 * 
 * 
 */
declare class PAScorecard {



    /**
     * Add a query parameter to filter the returned scores.Call this method multiple times on the same PAScorecard object to pass multiple parameters, such as the indicator sys_id and a breakdown sys_id. After specifying all parameters, call query() to run the query.If you query a PAScorecard object with no parameters, the API returns a list of all indicators that are displayed on the Analytics Hub, with their scores.
     * 
     * @uuid Enter a colon-separated list of sys_id values to specify which indicators, breakdowns, aggregates, and domains to query. The parameter follows this format:&lt;indicator sys_id&gt;:&lt;breakdown sys_id&gt;:&lt;element sys_id&gt;:&lt;lvl-2 breakdown sys_id&gt;:&lt;lvl-2 element sys_id&gt;:&lt;aggregate sys_id&gt;:&lt;domain_sys_id&gt;
     * The parameter must begin with the sys_id of an indicator record. Optionally, you can append the sys_id values of a breakdown and breakdown element to group the response based on the breakdown, and the sys_id of an aggregate to apply that aggregate. You can use a breakdown with an aggregate, or use only one.
     * For information about obtaining the sys_id values of records, see Unique record identifier (sys_id). Note: If an indicator is configured to use a Default time series, all Analytics Hub values for that indicator use that time series aggregation.
     * @breakdown Enter the sys_id of a breakdown to return chart information organized as defined by the breakdown. For example, enter the sys_id of a priority breakdown to return separate task chart information for each priority value, such as Number of open incidents / Priority / 2 - High.
     * @breakdown_relation Specify the sys_id of a breakdown relation to break down the returned data using that relation. You can view available breakdown relations by setting the include_available_breakdowns parameter to true.
     * @elements_filter Specify the sys_id of an elements filter to apply that filter to the returned data.
     * @display Set to true to return only indicators that are displayed on the Analytics Hub. Set this parameter to all to return all indicators. This parameter is true by default.
     * @favorites Set to true to return only indicators that are favorites of the querying user.
     * @key Set to true to return results only for key indicators.
     * @target Set to true to return results only for indicators that have a target set on the Analytics Hub.
     * @contains Enter a comma-separated list of names or descriptions to return results only from indicators with a matching value.
     * @tags Enter an indicator group sys_id to return the indicators in that group. Do not use uuid with this parameter.
     * @per_page Enter the maximum number of indicators each query can return on a page. By default this value is 10, and the maximum is 100.
     * @page Specify the page number. For example, when querying 20 Analytics Hubs with the default per_page value (10), specify a page value of 2 to retrieve Analytics Hubs 11-20.
     * @sortby Specify the value to use when sorting results. Valid values for this parameter are value, change, changeperc, gap, gapperc, duedate, name, order, default, group, indicator_group, frequency, target, date, trend, bullet, and direction. By default, queries sort records by value.
     * @sortdir Specify the sort direction, ascending or descending. By default, queries sort records in descending order. Set this parameter to asc to sort in ascending order.
     * @display_value Data retrieval operation for reference and choice fields.Based on this value, the display value and/or the actual value in the database are retrieved. true returns display values for all of the fields. false returns actual values from the database. If a value is not specified, this parameter defaults to false. all returns both actual and display values. 
     * @exclude_reference_link Set to true to hide additional information provided for reference fields, such as the URI to the reference resource.
     * @include_scores Set to true to return indicator scores for the entire time range selected on the Analytics Hub. If a value is not specified, this parameter defaults to false and returns only the most recent score value.To constrain the date range of the scores that are returned, combine this parameter with the from and to parameters.
     * @from Specify the earliest date to return scores from. Only scores from this date or later are returned. The date format must match the ISO-8601 standard.This parameter requires that include_scores is set to true.
     * @to Specify the latest date to return scores from. Only scores from this date or earlier are returned. The date format must match the ISO-8601 standard. This parameter requires that include_scores is set to true.
     * @step Specify a numeric value to skip scores, based on the indicator frequency. For example, specify a value of 3 to return only scores from every third day for a daily indicator, or from every third week for a weekly indicator.
     * @limit Specify the maximum number of scores to return.
     * @include_available_breakdowns Set to true to return all available breakdowns for an indicator. If a value is not specified, this parameter defaults to false and returns no breakdowns.
     * @include_available_aggregates Set to true to return all possible aggregates for an indicator, including aggregates that have already been applied. If a value is not specified, this parameter defaults to false and returns no aggregates.
     * @include_realtime Set this parameter to true to return the realtime_enabled element which indicates if real-time scores are enabled for the indicator, and the realtime_value element which contains the real-time score value. This parameter is not supported for formula indicators.
     * @include_target_color_scheme Set this parameter to true to return the target_color_scheme element that contains the minimum and maximum values, and the color of each section of the target color scheme for the Analytics Hub.
     * @include_forecast_scores Set this parameter to true to return the forecast_scores element that contains an array of date-value pairs that define the forecast data for the Analytics Hub.This paramater requires that the include_scores parameter is also set to true.
     * @include_trendline_scores Set this parameter to true to return the trendline_scores element that contains an array of date-value pairs that define the Analytics Hub trendline.This paramater requires that the include_scores parameter is also set to true.
     * @example
     * var sc = new SNC.PAScorecard(); //in a scoped app, do not use the SNC namespace
     * sc.addParam('uuid', 'fb007202d7130100b96d45a3ce6103b4');       // Number of open incidents
     * sc.addParam('breakdown', '0df47e02d7130100b96d45a3ce610399');  // by Priority
     * var result = sc.query();  // Query results, which are returned as an object
     * for (var i = 0; i &lt; result.length; i++)
     * gs.info(result[i].name + ': ' + result[i].value + ' ' + result[i].unit.display_value);
     * 
     */
    addParam(uuid: String, breakdown: String, breakdown_relation: String, elements_filter: String, display: String, favorites: String, key: String, target: String, contains: String, tags: String, per_page: String, page: String, sortby: String, sortdir: String, display_value: String, exclude_reference_link: String, include_scores: String, from: String, to: String, step: String, limit: String, include_available_breakdowns: String, include_available_aggregates: String, include_realtime: String, include_target_color_scheme: String, include_forecast_scores: String, include_trendline_scores: String);

    /**
     * Perform a query based on the specified parameters and return the results as an object.Before calling this method, configure parameters for the PAScorecard object by calling addParam(String parameter, String value).
     * 
     * @returns The PAScorecard object.
     */
    query(): Object;

    /**
     * Get the last query result as an object.This method does not perform a query. To perform a query before returning the result, use query().This function cannot run in a scope other than global.
     * 
     * @returns The results from the last query, returned as a JS object.
     */
    result(): Object;

}

/**
 * The PASnapshot API enables you to query information about Performance Analytics snapshots. Snapshots are the lists of records (sys_ids) that are collected at the time that the scores for those records are collected. A snapshot is made only for indicators with Collect records selected. You can query information about a snapshot at a certain date using the indicator sys_id and date, and perform comparisons between snapshots for an indicator at different dates.
 * 
 * 
 */
declare class PASnapshot {



    /**
     * Compare records in snapshots for a specified indicator at multiple dates, such as to identify records included in one snapshot but not the other.
     * 
     * @sys_id The indicator sys_id.
     * @date1 The date of the first snapshot, in the format yyyymmdd.
     * @date2 The date of the second snapshot, in the format yyyymmdd.
     * @type Specifies what data to retrieve. Valid values are: all1: all records in the first snapshot all2: all records in the second snapshot shared: records that are in both snapshots movedin: records that are in the second snapshot, but not the first movedout: records that are in the first snapshot, but not the second 
     * @example
     * var snapshot2 = PASnapshot.getCompareIDs('fb007202d7130100b96d45a3ce6103b4', 20160430, 20160531, 'shared');
     * gs.info(snapshot2);
     * @returns A comma-separated list of sys_id values.
     */
    getCompareIDs(sys_id: String, date1: Number, date2: Number, type: String): String;

    /**
     * Get the query used to compare records in snapshots for a specified indicator at multiple dates.
     * 
     * @sys_id The indicator sys_id.
     * @date1 The date of the first snapshot, in the format yyyymmdd.
     * @date2 The date of the second snapshot, in the format yyyymmdd.
     * @type Specifies what data to retrieve. Valid values are: all1: all records in the first snapshot all2: all records in the second snapshot shared: records that are in both snapshots movedin: records that are in the second snapshot, but not the first movedout: records that are in the first snapshot, but not the second 
     * @example
     * var snapshot4 = PASnapshot.getCompareQuery('fb007202d7130100b96d45a3ce6103b4', 20160530, 20160531, 'all1');
     * gs.info(snapshot4);
     * 
     * @returns The table, view, and encoded query as a JSON string.
     */
    getCompareQuery(sys_id: String, date1: Number, date2: Number, type: String): String;

    /**
     * Get the sys_id values for all records contained in the snapshot for a specified indicator at the specified date.
     * 
     * @sys_id The indicator sys_id.
     * @date The date when the snapshot was taken, in the format yyyymmdd.
     * @example
     * var snapshot1 = PASnapshot.getIDs('fb007202d7130100b96d45a3ce6103b4', 20160530);
     * gs.info(snapshot1);
     * @returns A comma-separated list of sys_id values.
     */
    getIDs(sys_id: String, date: Number): String;

    /**
     * Get the query used to generate the snapshot for a specified indicator at the specified date.
     * 
     * @sys_id The indicator sys_id.
     * @date The date when the snapshot was taken, in the format yyyymmdd.
     * @example
     * var snapshot3 = PASnapshot.getQuery('fb007202d7130100b96d45a3ce6103b4', 20160530);
     * gs.info(snapshot3);
     * @returns The table, view, and encoded query as a JSON string.
     */
    getQuery(sys_id: String, date: Number): String;

}


declare namespace sn_connect {

    /**
     * The Queue API allows you to retrieve or join a Connect Support chat queue. To use this class in a scoped application, use the sn_connect namespace identifier. The Connect Scriptable APIs plugin (ID: com.glide.connect.scriptable) should be enabled to access the Queue API.
     * 
     * 
     */
    declare class Queue {



        /**
         * Get an existing chat queue by sys_ID.
         * 
         * @SysID The sysID of a queue from the chat_queue table.
         * @example
         * var queue = sn_connect.Queue.get("ab73be7dc09a4300964f336ee6b74361");
         * @returns Returns a conversation queue object.
         */
        get(SysID: String): Object;

        /**
         * Add the current user to an existing Connect Support chat queue. Use a sysID from the chat_queue table.
         * 
         * @Question Type a question to add to the queue.
         * @example
         * var queue = sn_connect.Queue.get("ab73be7dc09a4300964f336ee6b74361");
         * queue.join("How do I access my email?");
         */
        join(Question: String);

    }

}/**
 * The RenderProperties API provides methods about the current page and is available in Jelly scripts and in UI-action conditions and scripts. Access RenderProperties methods using the static variable RP.
 * 
 * 
 */
declare class RenderProperties {



    /**
     * Returns the encoded query from the URL sent to the page.
     * 
     * @returns Returns the encoded query from the URL sent to the form.
     */
    getEncodedQuery(): String;

    /**
     * Returns the list control object for the page.
     * 
     * @returns The list control object for the page.
     */
    getListControl(): ScopedSysListControlobject;

    /**
     * Returns the value of the specified URL parameter.
     * 
     * @parameterName Name of the parameter passed on the URL.
     * @returns The parameter's value.
     */
    getParameterValue(parameterName: String): String;

    /**
     * Returns the URL where the request originated.
     * 
     * @returns The URL of the page where the request originated.
     */
    getReferringURL(): String;

    /**
     * Returns the name of the view in use.
     * 
     * @returns The name of the view being used.
     */
    getViewName(): String;

    /**
     * Returns the window's properties.
     * 
     * @returns The window's properties
     */
    getWindowProperties(): Object;

    /**
     * Returns true if the page is part of Studio.
     * 
     * @returns Returns true if the page is part of Studio.
     */
    isInDevStudio(): Boolean;

    /**
     * Returns true if this is an interactive session. An interactive session is when a user has logged in as opposed to a REST request.
     * 
     * @returns True if this is an interactive session.
     */
    isInteractive(): Boolean;

    /**
     * Returns true when the sysparm_collection_related_file URL parameter is set.
     * 
     * @returns Returns true when the sysparm_collection_related_file URL parameter is set.
     */
    isManyToMany(): Boolean;

    /**
     * Returns true when the sys_is_related_list URL-parameter is true. Returns false if the parameter is not present.
     * 
     * @returns True if the URL parameter sys_is_related_list is true.
     */
    isRelatedList(): Boolean;

}


declare namespace sn_discovery {

    /**
     * The ReportCiStatusOutputJS methods are getters that return specific object properties for the DiscoveryAPI reportCiIpAddressStatus method and then convert the information into a JSON string. 
     * 
     * 
     */
    declare class ReportCiStatusOutputJS {



        /**
         * Used to return the state of the scanned CI.This is a calculated field based on the last_state field in discovery_device_history table and the state field in the discovery_status table.
         * 
         * @example
         * var ipResultObj = sn_discovery.DiscoveryAPI.reportCiIpAddressStatus(ipAddress, discoveryStatus);
         * gs.info("ipResultObj(CiOperationStatus): " + ipResultObj.getCiOperationStatus());
         * 
         * @returns The three possible states returned by this method are: Processing: Discovery is still processing the request. Successful: A CI was created or updated. NotSuccessful: A CI was not created or updated, and the Discovery status was Completed or Cancelled. 
         */
        getCiOperationStatus(): string;

        /**
         * Used to return the value in the cmdb_ci field from the discovery_device_history table for the CI being scanned.
         * 
         * @example
         * var ipResultObj = sn_discovery.DiscoveryAPI.reportCiIpAddressStatus(ipAddress, discoveryStatus);
         * gs.info("ipResultObj(cmdb): " + ipResultObj.getCmdbCI());
         * 
         * @returns Sys_id of the CI created or updated. This value can be null in the case of intermediate results before a CI is created.
         */
        getCmdbCI(): string;

        /**
         * Used to return the value from the State field in the Discovery Status [discovery_status] table.The values returned by this method are used to calculate the value returned by the getCiOperationStatus() method
         * 
         * @example
         * var ipResultObj = sn_discovery.DiscoveryAPI.reportCiIpAddressStatus(ipAddress, discoveryStatus);
         * gs.info("ipResultObj(discoveryState): " + ipResultObj.getDiscoveryState());
         * 
         * @returns The possible states returned by this method are: Starting Active Complete Cancelled 
         */
        getDiscoveryState(): string;

        /**
         * Used to return the value from the source field in the discovery_device_history table for the CI being scanned.
         * 
         * @example
         * var ipResultObj = sn_discovery.DiscoveryAPI.reportCiIpAddressStatus(ipAddress, discoveryStatus);
         * gs.info("ipResultObj(IpAddress): " + ipResultObj.getIpAddress());
         * @returns The IP address of the CI being scanned.
         */
        getIpAddress(): string;

        /**
         * Used to return the value from the issues field in the discovery_device_history table for the CI being scanned.
         * 
         * @example
         * var ipResultObj = sn_discovery.DiscoveryAPI.reportCiIpAddressStatus(ipAddress, discoveryStatus);
         * gs.info("ipResultObj(issues): " + ipResultObj.getIssues());
         * @returns Number of issues in this Discovery for this CI.
         */
        getIssues(): integer;

        /**
         * Used to return the value from the issues_link field in the discovery_device_history table for the CI being scanned.
         * 
         * @example
         * var ipResultObj = sn_discovery.DiscoveryAPI.reportCiIpAddressStatus(ipAddress, discoveryStatus);
         * gs.info("ipResultObj(issues_link): " + ipResultObj.getIssuesLink());
         * @returns The issues_link field from the discovery_device_history table.This value may be null or an anchor tag defining a hyperlink to a page that provides the list of issues associated with the Discovery Status and CI (IP address).
         */
        getIssuesLink(): string;

        /**
         * Used to serialized the ReportCiStatusOutputJS object.This method throws the IllegalArgumentException exception, Cannot serialize object, e when the method is unable to serialize the object. The e is the exception object, which provides the exception message and trace.
         * 
         * @example
         * var ipResultObj = sn_discovery.DiscoveryAPI.reportCiIpAddressStatus(ipAddress, discoveryStatus);
         * gs.info("ipResultObj(json): " + ipResultObj.toJson());
         * @returns Serialized instance of the ReportCiStatusOutputJS object into a JSON string.
         */
        toJson(): string;

    }

}/**
 * Provides methods for managing response templates. Response templates are reusable messages that agents can copy to case or task forms. They provide quick and consistent messages to users and display standard chat response messages to requesters in Agent Chat. To access the methods in this class, the response templates plugin must be activated. This API is located in the sn_templated_snip namespace. * * For additional information on response templates, see Response templates.
 * 
 * 
 */
declare class ResponseTemplate {



    /**
     * Instantiates a new ResponseTemplate object.
     * 
     * @example
     * new sn_templated_snip.ResponseTemplate().query("incident","ef4225a40a0a0b5700d0b8a790747812", "", 0, 0, true, ""); 
     */
    constructor();

    /**
     * Returns all response templates from a specified table that match the passed in query criteria.
     * 
     * @tableName Name of the table to use to search the sn_templated_snip_note_template table to locate corresponding response templates. For example, incident or sn_hr_core_case.
     * @recordId Sys ID of the record to use to render the variables in the response template.
     * @searchTerm Optional. Text to use to filter the list of matching response templates. The method performs a CONTAINS search of this text on the name and body fields and a STARTS WITH search on the short name field. For example, if the search term is "crash", the method returns any response template that matches the query criteria and has crash in the name or body or the short name starts with crash.
     * Response templates with exact matches on short name appear first in the return results. All other returned response templates are sorted by name.
     * Default: Return all matching response templates.
     * @limit Optional. Maximum number of response templates to return.Default: 50
     * @offset Optional. For pagination, the index at which to start the search.Default: 0
     * @includeEvaluatedBody Optional. Flag that indicates whether to render the template variables.Valid values: false: Do not render the template variables. The response contains the message variables.For example: Please note that your case ${number} has been escalated to ${assignment_group}. true: Renders the template variables and returns evaluated_response in the return results. For example: Please note that your case INC100001 has been escalated to Facilities. Default: false
     * @errorFormat Optional. HTML formatting to use for errors. For example:
     * "&lt;span style='color:#ffff00'&gt;${%s}&lt;/span&gt;"
     * Default: "&lt;span style='color:#ff0000'&gt;${%s}&lt;/span&gt;"
     * @opts Optional. Parameters to pass to the sn_templated_snip.response_template extension point. The format and content of these parameters are dependent on the implementation of the extension point. For additional information on extension points, see Using extension points to extend application functionality.
     * @example
     * query("incident","ef4225a40a0a0b5700d0b8a790747812", "", 0, 0, false, "");
     * @example
     * query("incident","fe4225a40a0a0b5700d0b8a790747812", "", 0, 0, false, "");
     * @returns Array of all templates that match the specified search criteria. Response templates with exact matches on short name appear first in the return results. All other returned response templates are sorted by name.Each node in the Array may contain the following parameters: sys_id: String. Unique identifier of the response template. name: String. Name of the response template. short_name: String. Short name of the response template. body: HTML. Body of the response template. short_name_match: Boolean. Flag that indicates whether an exact match occurred on the short name of the response template. evaluated_response: Array. Results of the template evaluation. success: Boolean. Flag that indicates whether all variables rendered properly. evaluated_body: HTML. Rendered response template body. error: Array. Entry for each evaluation error that occurred. inAccessibleVariables: String. Variables in the response template body that could not be resolved. unEvaluatedVariables: String. Variablesin the response template body that were not evaluated. message: String. Error message. 
     */
    query(tableName: String, recordId: String, searchTerm: String, limit: Number, offset: Number, includeEvaluatedBody: Boolean, errorFormat: String, opts: Object): Object;

    /**
     * Renders the HTML body of a specified response template.During rendering, all variables are resolved using the information from the specified table and record. If variables cannot be resolved, or any other problem occurs during rendering, the method returns an error message in the results.
     * 
     * @templateId Sys ID of the response template to render.
     * @tableName Name of the table to use when rendering the variables on the response template.
     * @recordId Sys ID of the record to use when rendering the variables on the response template. This record must be in the table specified by tableName.
     * @errorFormat Optional. HTML formatting to use for errors. For example:
     * "&lt;span style='color:#ffff00'&gt;${%s}&lt;/span&gt;"
     * Default: "&lt;span style='color:#ff0000'&gt;${%s}&lt;/span&gt;"
     * @opts Optional. Parameters to pass to the sn_templated_snip.response_template extension point. The format and content of these parameters are dependent on the implementation of the extension point. For additional information on extension points, see Using extension points to extend application functionality.
     * @example
     * render("5fc1d65993003300a9bc1d1e867ffb9c","incident","ef4225a40a0a0b5700d0b8a790747812", "")
     * @example
     * render("5fc1d65993003300a9bc1d1e867ffb9c","incident","ef4225a40a0a0b5700d0b8a790747812", "")
     * @returns Results of the render. success: Flag that indicates whether the render was successful. evaluated_body: String. For success, rendered response template body. For error, response template body which includes both rendered and non-renderable variables. error: Object. Error message if render was unsuccessful. unEvaluatedVariables: Variables that could not be rendered. message: Error message. 
     */
    render(templateId: String, tableName: String, recordId: String, errorFormat: String, opts: Object): Object;

}

/**
 * A RESTAPIRequest object allows you to access scripted REST API request details in scripts. Note: You cannot instantiate objects of this type. Objects of this type are created automatically and are accessible only in scripted REST API resource scripts.
 * 
 * 
 */
declare class RESTAPIRequest {

    /** The body of the request. */
    body: RESTAPIRequestBody
    /** All headers from the request. */
    headers: object
    /** The path parameters passed in the request URI. */
    pathParams: Object
    /** The query parameters from the web service request. */
    queryParams: Object
    /** The entire query added to the endpoint URI. */
    queryString: String
    /** The request URI, excluding domain information. */
    uri: String
    /** The entire request URL. */
    url: String


    /**
     * Returns the value of a specific header from the web service request.
     * 
     * @header The name of the header, such as accept or content-type.
     * @example
     * var acceptHeader = request.getHeader('accept');
     * @returns The value of the specified header.
     */
    getHeader(header: String): String;

    /**
     * Get the content types specified in the request Accept header.
     * 
     * @returns An array of string values where each string is a content type, such as application/json.
     */
    getSupportedResponseContentTypes(): Array<any>;

}

/**
 * A RESTAPIRequestBody object allows you to access the body content of a scripted REST API request in scripts. The format of a RESTAPIRequestBody object may be JSON or XML, depending on the content-type header value from the request.Note: You cannot instantiate objects of this type. Objects of this type are created automatically and are accessible only in scripted REST API resource scripts. * * Single entry example-request-body in JSON format. * * Multiple entry example-request-body in JSON format. * * Important: If the request body format is not of a json or xml subtype, use only the request body dataStream field to access the request body. Using request body data, dataString, nextEntry(), or hasNext() with a non-json or non-xml format results in a 500 error response.
 * 
 * 
 */
declare class RESTAPIRequestBody {

    /** The content of the request body. */
    data: ObjectorArray
    /** The content of the request body, as a stream. */
    dataStream: Object
    /** The content of the request body, as a String. */
    dataString: String


    /**
     * Determine if there are additional entries in the request body.Use this method with the nextEntry() method to iterate over multiple request body entries.
     * 
     * @example
     * var requestBody = request.body;
     * requestBody.hasNext(); // returns true if the request contains a single entry or multiple entries
     * 
     * //calling second time
     * requestBody.hasNext(); // returns false if the request contains a single entry, or true if the request contains multiple entries
     * @returns True if there are additional entries available. This method returns true only once if the request contains a single entry.
     */
    hasNext(): boolean;

    /**
     * Retrieve one entry from the request body as a script object.Use this method with the hasNext() method to iterate over multiple request body entries.
     * 
     * @example
     * var requestBody = request.body;
     * var requestEntry = requestBody.nextEntry(); // returns available entry if there is only one entry, or the first entry if there are multiple.
     * var name = requestEntry.name; // ‘user1’
     * 
     * // Calling second time
     * requestEntry = requestBody.nextEntry(); // returns undefined if there is only one entry, or the second entry if there are multiple.
     * @example
     * var requestBody = request.body;
     * while(requestBody.hasNext()){
     * var entry = requestBody.nextEntry();
     * }
     * @returns A single entry from the request body.
     */
    nextEntry(): Object;

}

/**
 * A RESTAPIResponse object allows you to build a RESTful response to a scripted REST API request. Note: You cannot instantiate objects of this type. Objects of this type are created automatically and are accessible only in scripted REST API resource scripts.
 * 
 * 
 */
declare class RESTAPIResponse {



    /**
     * Returns the ResponseStreamWriter for this response, allowing you to write directly to the response stream.Set the content type and status code using the setHeaders and setStatus functions prior to calling the getStreamWriter function.
     * 
     * @example
     * response.setContentType('application/json');
     * response.setStatus(200);
     * var writer = response.getStreamWriter();
     * @returns The ResponseStreamWriter for this response. You can use this object to write directly to the response stream.
     */
    getStreamWriter(): RESTAPIResponseStream;

    /**
     * Sets the body content to send in the web service response.
     * 
     * @body The response body, as a JavaScript object. The body content is automatically serialized to JSON or XML depending on the value of the Accept header passed in the request.
     * @example
     * var body = {};
     * body.name = "incident";
     * body.number = "1234";
     * body.caller = {"id": "user1"};
     * response.setBody(body);
     * 
     * @example
     * var bodyArray = [];
     * var body = {};
     * body.name = "incident";
     * body.number = "1234";
     * body.caller = {"id":"user1"};
     * bodyArray.push(body);
     * response.setBody(bodyArray);
     */
    setBody(body: Object);

    /**
     * Assigns a value to the Content-Type header in the web service response.You must set a response content type before writing the response. The content type is set automatically for string responses, based on the request Accept header value.Setting an invalid content type causes the response to default to JSON. Failing to set a content type results in a status code 500 error when sending a binary response.See the W3 Content-Type header documentation for more information about this header.
     * 
     * @contentType The content type of the response body, such as application/json.
     * @example
     * responseBuilder.setContentType('application/json');
     */
    setContentType(contentType: String);

    /**
     * Configure the response to return an error.
     * 
     * @error An error object.
     */
    setError(error: Object);

    /**
     * Assign a value to a REST service response header.
     * 
     * @header The header you want to set.
     * @value The value to assign the specified header.
     * @example
     * responseBuilder.setHeader("Location","&lt;URI&gt;");
     */
    setHeader(header: String, value: String);

    /**
     * Sets the headers for the web service response.
     * 
     * @headers A JavaScript object listing each header and the value to assign that header.
     * @example
     * var headers = {};
     * headers.X-Total-Count=100;
     * headers.Location=‘https://instance.service-now.com/&lt;endpoint_to_resource&gt;';
     * response.setHeaders(headers);
     */
    setHeaders(headers: Object);

    /**
     * Assigns a value to the Location header in the web service response.See the W3 Location header documentation for more information about this header.
     * 
     */
    setLocation();

    /**
     * Sets the status code number for the web service response.
     * 
     * @status The status code to send in the response, such as 200 to indicate success. Passing a non-numerical value, such as a string, causes the status code to default to 0.
     * @example
     * response.setStatus(200);
     */
    setStatus(status: Number);

}

/**
 * A RESTAPIResponseStream object allows you to write directly to the scripted REST API response stream. Use RESTAPIResponseStream methods to build web service APIs in the Scripted REST APIs feature.Note: You cannot instantiate objects of this type. Objects of this type are created automatically and are accessible only in scripted REST API resource scripts.
 * 
 * 
 */
declare class RESTAPIResponseStream {



    /**
     * Write an input stream to the response stream.You must set the content type and status code before calling the writeStream() method or the response will fail. You cannot modify these values after calling the writeStream() method.Note: It is the responsibility of the script author to obtain the stream from a third-party service. 
     * 
     * @stream An attachment or a response stream from a third-party service.
     * @example
     * (function process(//RESTAPIRequest request, //RESTAPIResponse response) {
     * 
     *     response.setContentType('application/json');
     *     response.setStatus(200);
     * 
     *     var gsa = new GlideSysAttachment();
     *     var attachmentStream = new gsa.getContentStream(&lt;sys_id of attachment&gt;); 
     *     var writer = response.getStreamWriter();
     *     writer.writeStream(attachmentStream);
     * 
     * })(request, response);
     * @example
     * (function process(//RESTAPIRequest request, //RESTAPIResponse response) {
     * 
     *     response.setContentType('application/json');
     *     response.setStatus(200);
     * 
     *     var attachmentStream = new GlideSysAttachmentInputStream(&lt;sys_id of attachment&gt;);
     *     var writer = response.getStreamWriter();
     *     writer.writeStream(attachmentStream);
     * 
     * })(request, response);
     */
    writeStream(stream: Object);

    /**
     * Write string data to the response stream.You must set the content type and status code before calling the writeString() method or the response will fail. You cannot modify these values after calling the writeString() method.
     * 
     * @data The string to add to the response data.
     * @example
     * response.setContentType('application/json');
     * response.setStatus(200);
     * var writer = response.getStreamWriter();
     * var body ={
     *   name:user1,
     *   id: 1234,
     *   roles: [
     *     {
     *       name: admin
     *     },
     *     {
     *       name: itil
     *     }
     *   ]
     * }
     * writer.writeString("{'name':'user','id':'1234'}");
     * writer.writeString(JSON.stringify(body));
     */
    writeString(data: String);

}


declare namespace sn_ws {

    /**
     * The RESTMessageV2 API allows you to send outbound REST messages using JavaScript. Use the RESTResponseV2 API to manage the response returned by the REST provider. * * You can use this API in scoped applications, or within the global scope.
     * 
     * 
     */
    declare class RESTMessageV2 {



        /**
         * Instantiates a RESTMessageV2 object using information from a REST message record.You must have a REST message record defined before you can use this constructor.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @name The name of the REST message record.
         * @methodName The name of the HTTP method to use, such as GET or PUT.
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         */
        constructor(name: String, methodName: String);

        /**
         * Instantiates an empty RESTMessageV2 object.When using an object instantiated this way, you must manually specify an HTTP method and endpoint.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2();
         */
        constructor();

        /**
         * Send the REST message to the endpoint.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.execute(); //Might throw exception if http connection timed out or some issue with sending request itself because of encryption/decryption of password.
         * @returns The response returned by the REST provider.
         */
        execute(): RESTResponse;

        /**
         * Send the REST message to the endpoint asynchronously. The instance does not wait for a response from the web service provider when making asynchronous calls.In the following example, replace REST_message_record with the name of the REST message record from your instance. When using executeAsync, consider processing the response body in a separate business rule to take advantage of the asynchronous call.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.executeAsync(); //Might throw exception if http connection timed out or some issue with sending request itself because of encryption/decryption of password.
         * 
         * @returns The response returned by the REST provider.
         */
        executeAsync(): RESTResponse;

        /**
         * Get the URL of the endpoint for the REST message.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var endpoint = sm.getEndpoint();
         * @returns The URL of the REST web service provider.
         */
        getEndpoint(): String;

        /**
         * Get the content of the REST message body.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var body = sm.getRequestBody();
         * @returns the REST message body.
         */
        getRequestBody(): String;

        /**
         * Get the value for an HTTP header specified in the REST message.By default, this method cannot return the value for a header set automatically by the system. To grant this method access to all headers, set the property glide.http.log_debug to true.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @headerName The request header you want to get the value for.
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var header = sm.getRequestHeader("Accept");
         * @returns The value of the specified header.
         */
        getRequestHeader(headerName: String): String;

        /**
         * Get HTTP headers that were set by the REST client and the associated values.This method does not return headers set automatically by the system. To configure this method to return all headers, set the property glide.http.log_debug to true.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var headers = sm.getRequestHeaders();
         * @returns An Object that maps the name of each header to the associated value.
         */
        getRequestHeaders(): Object;

        /**
         * Configures the REST message to save the returned response body as an attachment record.When you use this function with a REST message that is sent through a MID server, the MID server user must have any roles required to read and write attachment records, as well as any roles required to read and write records on the table specified in the tableName parameter.The response body does not need to be a binary file to be saved as an attachment. Response bodies using text formats, such as JSON or XML can also be saved. If the instance fails to save the attachment, call getErrorMessage() on the related RESTResponseV2 object for error details.
         * 
         * @tableName Specify the table that contains the record you want to attach the saved file to.
         * @recordSysId Specify the sys_id of the record you want to attach the saved file to.
         * @fileName Specify the file name to give to the saved file.
         * @example
         * (function sampleRESTMessageV2() {
         *   try{
         *     var request  = new sn_ws.RESTMessageV2();        
         *     request.setHttpMethod('get');
         * 
         *     var attachment_sys_id  = '&lt;attachment_record_sys_id&gt;', 
         *       tablename = 'incident',
         *       recordSysId = '&lt;incident_sys_id&gt;',            
         *       response,            
         *       httpResponseStatus,             
         *       filename ='&lt;filename&gt;';
         * 
         *     //endpoint - ServiceNow REST Attachment API        
         *     request.setEndpoint('https://&lt;instance_name&gt;.service-now.com/api/now/attachment/' + attachment_sys_id  +'/file');        
         *     request.setBasicAuth('&lt;username&gt;', '&lt;password&gt;');
         * 
         *     //RESTMessageV2 - saveResponseBodyAsAttachment(String tableName, String recordSysId, String fileName)        
         *     request.saveResponseBodyAsAttachment(tablename, recordSysId, filename);        
         * 
         *     response = request.execute();        
         *     httpResponseStatus = response.getStatusCode();  
         *       
         *     gs.print(" http response status_code:  " + httpResponseStatus);    
         *   }
         *   catch(ex){
         *     var message  = ex.getMessage();        
         *     gs.print(message);    
         *   }
         * })();
         */
        saveResponseBodyAsAttachment(tableName: String, recordSysId: String, fileName: String);

        /**
         * Configure the REST message to save the returned response body as an encrypted attachment record.When you use this function with a REST message that is sent through a MID server, the MID server user must have any roles required to read and write attachment records, as well as any roles required to read and write records on the table specified in the tableName parameter.The response body does not need to be a binary file to be saved as an attachment. Response bodies using text formats, such as JSON or XML can also be saved. If the instance fails to save the attachment, call getErrorMessage() on the related RESTResponseV2 object for error details.
         * 
         * @tableName Specify the table that contains the record you want to attach the saved file to.
         * @recordSysId Specify the sys_id of the record you want to attach the saved file to.
         * @fileName Specify the file name to give to the saved file.
         * @encryptContext Specify the sys_id of an encryption context. The saved file is encrypted using this context.
         */
        saveResponseBodyAsAttachment(tableName: String, recordSysId: String, fileName: String, encryptContext: String);

        /**
         * Set the credentials for the REST message using an existing basic auth or OAuth 2.0 profile.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @type The type of authentication profile to use. Valid values are 'basic' to use basic authentication, or 'oauth2' to use OAuth 2.0.
         * @profileId The sys_id of an authentication profile record. When using basic auth, specify the sys_id of a Basic Auth Configuration [sys_auth_profile_basic] record. When using OAuth 2.0, specify the sys_id of a OAuth Entity Profile [oauth_entity_profile] record.
         * @example
         * var requestBody;
         * var responseBody;
         * var status;
         * var sm;
         * try{
         *        // Might throw exception if message doesn't exist or not visible due to scope.
         * 	sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;", "get");  
         * 
         *        //set auth profile to an OAuth 2.0 profile record.
         * 	sm.setAuthenticationProfile('oauth2', '1234adsf123212131123qasdsf'); 
         * 
         * 	sm.setStringParameter("symbol", "NOW");
         * 	sm.setStringParameterNoEscape("xml_data","&lt;data&gt;test&lt;/data&gt;");
         * 
         *        //In milliseconds. Wait at most 10 seconds for response from http request.
         * 	sm.setHttpTimeout(10000); 
         *        //Might throw exception if http connection timed out or some issue 
         *        //with sending request itself because of encryption/decryption of password.
         * 	response = sm.execute();	
         *        responseBody = response.haveError() ? response.getErrorMessage() : response.getBody();
         * 	status = response.getStatusCode();
         * } catch(ex) {
         * 	responseBody = ex.getMessage();
         * 	status = '500';
         * } finally {
         * 	requestBody = sm ? sm.getRequestBody():null;
         * }
         */
        setAuthenticationProfile(type: String, profileId: String);

        /**
         * Sets basic authentication headers for the REST message.Setting security values using this method overrides basic authentication values defined for the REST message record.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @userName The username you want to use to authenticate the REST message.
         * @userPass The password for the specified user.
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setBasicAuth("username","password");
         */
        setBasicAuth(userName: String, userPass: String);

        /**
         * Associate outbound requests and the resulting response record in the ECC queue. This method only applies to REST messages sent through a MID Server.The correlator provided populates the Agent correlator field on the ECC queue record for the response. Provide a unique correlator for each outbound request to associate the correct results in the ECC queue with the request when designing asynchronous automation through a MID Server.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @correlator A unique identifier
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setEccCorrelator("unique_identifier");
         */
        setEccCorrelator(correlator: String);

        /**
         * Override a value from the database by writing to the REST message payload. This method only applies to REST messages sent through a MID Server.Use this method when a value from the REST message in the database is invalid, such as when the endpoint URL is longer than the maximum REST endpoint field length. You can set only the endpoint URL using this method by passing source as the name parameter.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @name The name of the parameter, such as source.
         * @value The value to assign to the specified parameter.
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setEccParameter("source","http://very.long.endpoint.url");
         */
        setEccParameter(name: String, value: String);

        /**
         * Set the endpoint for the REST message.By default, the REST message uses the endpoint specified in the REST message record. Use this method to override this default. You must call this method when using the RESTMessageV2 - RESTMessageV2() constructor with no parameters.
         * 
         * @endpoint The URL of the REST provider you want to interface with.
         * @example
         * var sm = new sn_ws.RESTMessageV2();
         * sm.setEndpoint("http://web.service.endpoint");
         */
        setEndpoint(endpoint: String);

        /**
         * The HTTP method this REST message performs, such as GET or PUT.You must set an HTTP method when using the RESTMessageV2 - RESTMessageV2() constructor with no parameters.
         * 
         * @method The HTTP method to perform.
         * @example
         * var sm = new sn_ws.RESTMessageV2();
         * sm.setHttpMethod("post");
         */
        setHttpMethod(method: String);

        /**
         * Set the amount of time the REST message waits for a response from the web service provider before the request times out.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @timeoutMs The amount of time, in milliseconds, before the call to the REST provider times out.
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setHttpTimeout(6000);
         */
        setHttpTimeout(timeoutMs: Number);

        /**
         * Set the log level for this message and the corresponding response.Setting a log level using the RESTMessageV2 API overrides the log level configured on the REST message record. This log level may not apply if the endpoint domain is blacklisted, or if the property glide.outbound_http_log.override is true. To view outbound web service logs, navigate to System Logs &gt; Outbound HTTP Requests.
         * 
         * @level The log level. Valid values are basic, elevated, and all.
         * @example
         * var rm = new sn_ws.RESTMessageV2();
         * rm.setLogLevel(‘all’);
         */
        setLogLevel(level: String);

        /**
         * Configure the REST message to communicate through a MID Server.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @midServer The name of the MID Server to use. Your instance must have an active MID Server with the specified name.
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setMIDServer("mid_server_name");
         */
        setMIDServer(midServer: String);

        /**
         * Set the mutual authentication protocol profile for the REST message.Setting a protocol profile using this method overrides the protocol profile selected for the REST message record.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @profileName The Name of the protocol profile to use for mutual authentication.
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setMutualAuth("mutual_auth_profile_name");
         */
        setMutualAuth(profileName: String);

        /**
         * Append a parameter to the end of the request URL with the form name=value.For example, the code setQueryParameter("sysparm_query","active=true^ORDERBYnumber^ORDERBYDESCcategory"); appends the text sysparm_query=active=true^ORDERBYnumber^ORDERBYDESCcategory to the request URL.
         * 
         * @name The name of the URL parameter to pass.
         * @value The value to assign the URL parameter.
         * @example
         * var sm = new sn_ws.RESTMessageV2();
         * //Set up message, including endpoint and authentication
         * sm.setQueryParameter("sysparm_query","active=true^ORDERBYnumber^ORDERBYDESCcategory");
         */
        setQueryParameter(name: String, value: String);

        /**
         * Set the body content to send to the web service provider when using PUT or POST HTTP methods.When you set the body content using this method, variables in the body are not substituted for parameters from the REST message function record. You must explicitly define all values within the REST message body.
         * 
         * @body The request body to send.
         * @example
         * var sm = new sn_ws.RESTMessageV2("Update user","post"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var body = "&lt;Message body content&gt;";
         * sm.setRequestBody(body);
         */
        setRequestBody(body: String);

        /**
         * Sets the request body using an existing attachment record.When you use this function with a REST message that is sent through a MID server, the MID server user must have any roles required to read attachment records.
         * 
         * @attachmentSysId The sys_id of the Attachment [sys_attachment] record you want to send in this REST message.
         * @example
         * (function sampleRESTMessageV2() {
         *     try {
         *         var request = new sn_ws.RESTMessageV2();
         *         request.setHttpMethod('post');
         *         request.setEndpoint('&lt;web service endpoint URL&gt;');
         *         request.setRequestBodyFromAttachment('&lt;attachment sys_id&gt;');
         *         
         *         var response = request.execute();
         *         var httpResponseStatus = response.getStatusCode();
         *       
         *         gs.print("http response status_code: " + httpResponseStatus);        
         *     }
         *     catch (ex) {
         *         var message = ex.getMessage();
         *         gs.print(message);
         *     }
         * })();
         */
        setRequestBodyFromAttachment(attachmentSysId: String);

        /**
         * Set the body content of a PUT or POST message using a binary stream.You can use this method to send binary files such as images or archives using REST messages. If the request is not a PUT or POST request, the request body is ignored.
         * 
         * @stream The binary data to send, such as an attachment or a stream from a 3rd-party service.
         */
        setRequestBodyFromStream(stream: Object);

        /**
         * Set an HTTP header in the REST message to the specified value.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @name The name of the header.
         * @value The value to assign to the specified header.
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setRequestHeader("Accept","Application/json");
         */
        setRequestHeader(name: String, value: String);

        /**
         * Override the default requestor profile for the REST message in order to retrieve an OAuth access token associated with a different requestor.This method applies only to REST messages configured to use OAuth 2.0 authentication. This method is optional and is unnecessary in most configurations.
         * 
         * @requestorContext  
         * @requestorId  
         */
        setRequestorProfile(requestorContext: String, requestorId: String);

        /**
         * Set a REST message function variable with the specified name from the REST message record to the specified value.XML reserved characters in the value are converted to the equivalent escaped characters. Use setStringParameterNoEscape to set a variable without escaping XML reserved characters.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @name The name of the REST message variable. This parameter must be defined in the REST message record before you can assign a value to it.
         * @value The value to assign the variable.
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setStringParameter("s","NOW");
         */
        setStringParameter(name: String, value: String);

        /**
         * Set a REST message function variable with the specified name from the REST message record to the specified value.This method is equivalent to setStringParameter but does not escape XML reserved characters.In the following example, replace REST_message_record with the name of the REST message record from your instance.
         * 
         * @name The name of the REST message variable. This parameter must be defined in the REST message record before you can assign a value to it.
         * @value The value to assign the variable.
         * @example
         * var sm = new sn_ws.RESTMessageV2("&lt;REST_message_record&gt;","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setStringParameterNoEscape("s","NOW");
         */
        setStringParameterNoEscape(name: String, value: String);

    }

}
declare namespace sn_ws {

    /**
     * The RESTResponseV2 API allows you to use the data returned by an outbound REST message in JavaScript code. A RESTResponseV2 object is returned by the RESTMessageV2 functions execute() and executeAsync(). * * You can use this API in scoped applications, or within the global scope.
     * 
     * 
     */
    declare class RESTResponseV2 {



        /**
         * Return all headers contained in the response, including any duplicate headers.
         * 
         * @example
         * var r = new sn_ws.RESTMessageV2('&lt;A REST message&gt;', 'get');
         * var response = r.execute();
         * var headers = response.getAllHeaders();
         * for(var i in headers){
         *   gs.print(headers[i].name + ': ' + headers[i].value);
         * }
         * @returns The list of headers contained in the response. Each header is represented as a GlideHTTPHeader object which contains the header name and value.
         */
        getAllHeaders(): List<GlideHTTPHeader>;

        /**
         * Get the content of the REST response body.Use this function when you want to get the request body as text content. Do not use this method when saving the response as a binary attachment. If a RESTMessageV2 object called the saveResponseBodyAsAttachment(...) function, using getBody() on the associated RESTResponseV2 object will cause an error. When saving the response as an attachment, if the outbound REST message fails, call getErrorMessage() on the response to retrieve the body content.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("Yahoo Finance","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.execute();
         * var responseBody = response.getBody();
         * @returns The REST response body.
         */
        getBody(): String;

        /**
         * Returns all cookies included in the response.
         * 
         * @example
         * var cookies = response.getCookies();
         * var i;
         * for(i=0;i&lt;cookies.size();i++) {
         *    gs.print(‘cookie: ‘ + cookies.get(i));
         * }
         * 
         * @returns The list of cookies. Iterate through the list to perform operations on each cookie.
         */
        getCookies(): Object;

        /**
         * Get the numeric error code if there was an error during the REST transaction.This error code is specific to the Now Platform, it is not an HTTP error code. Provide this error code if you require assistance from ServiceNow Customer Support
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("Yahoo Finance","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.execute();
         * var errorCode = response.getErrorCode();
         * @returns The numeric error code, such as 1 for socket timeout.
         */
        getErrorCode(): Number;

        /**
         * Get the error message if there was an error during the REST transaction.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("Yahoo Finance","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.execute();
         * var errorMsg = response.getErrorMessage();
         * @returns The error message.
         */
        getErrorMessage(): String;

        /**
         * Get the value for a specified header.
         * 
         * @name The name of the header that you want the value for, such as Set-Cookie.
         * @example
         * var sm = new sn_ws.RESTMessageV2("Yahoo Finance","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.execute();
         * var headerVal = response.getHeader("Content-Type");
         * @returns The value of the specified header.
         */
        getHeader(name: String): String;

        /**
         * Get all headers returned in the REST response and the associated values.Note: If a header is present more than once in the response, such as a Set-Cookie header, this function returns only the last of the duplicate headers. To return all headers including duplicates, use the getAllHeaders() function.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("Yahoo Finance","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.execute();
         * var headers = response.getHeaders();
         * @returns An Object that maps the name of each header to the associated value.
         */
        getHeaders(): Object;

        /**
         * Get the fully-resolved query sent to the REST endpoint..This query contains the endpoint URL as well as any values assigned to variables in the REST message. Use this method only with responses to direct requests. This method is not supported for requests sent asynchronously, or requests sent using a MID server.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("Yahoo Finance","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.execute();
         * var queryString = response.getQueryString();
         * @returns The fully-resolved query.
         */
        getQueryString(): String;

        /**
         * Get the sys_id value of the attachment created from the response body content.If the RESTMessageV2 object associated with this response called the saveResponseBodyAsAttachment(...) function, use getResponseAttachmentSysid() to get the sys_id of the created attachment record. Use this function when you want to perform additional operations with the new attachment record.
         * 
         * @returns The sys_id of the new attachment record.
         */
        getResponseAttachmentSysid(): String;

        /**
         * Get the numeric HTTP status code returned by the REST provider.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("Yahoo Finance","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.execute();
         * var statusCode = response.getStatusCode();
         * @returns The numeric status code returned by the REST provider, such as 200 for a successful response.
         */
        getStatusCode(): Number;

        /**
         * Indicate if there was an error during the REST transaction.
         * 
         * @example
         * var sm = new sn_ws.RESTMessageV2("Yahoo Finance","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.execute();
         * var error = response.haveError();
         * @returns Returns true if there was an error, false if there was no error.
         */
        haveError(): boolean;

        /**
         * Set the amount of time the instance waits for a response from the web service provider.This method overrides the property glide.rest.outbound.ecc_response.timeout for this REST response.
         * 
         * @timeoutSecs The amount of time, in seconds, to wait for this response.
         * @example
         * var sm = new sn_ws.RESTMessageV2("Yahoo Finance","get"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.executeAsync();
         * response.waitForResponse(60);
         */
        waitForResponse(timeoutSecs: Number);

    }

}
declare namespace sn_nlp_sentiment {

    /**
     * SentimentAnalyser API performs sentiment analysis on a string value. To use this class in a scoped application, use the sn_nlp_sentiment namespace identifier. The Sentiment Analysis plugin ( com.snc.sentiment_analysis) must be enabled to access the SentimentAnalyser API. Sentiment Analysis API should be used in a script that is treated as an admin-executing script. For example, we should use the Sentiment Analysis API in Script Action or Scheduled Job.
     * 
     * 
     */
    declare class SentimentAnalyser {



        /**
         * Creates an instance of the SentimentAnalyser class with the specified connector configuration that is used for sentiment analysis.
         * 
         * @configGR GlideRecord object of a connector configuration
         * @example
         * var sa = new sn_nlp_sentiment.SentimentAnalyser(configGR);
         */
        constructor(configGR: GlideRecord);

        /**
         * Creates an instance of the SentimentAnalyser class with the default connector configuration that is used for sentiment analysis.
         * 
         * @example
         * var sa = new sn_nlp_sentiment.SentimentAnalyser();
         */
        constructor();

        /**
         * Performs sentiment analysis on the specified text.
         * 
         * @inputText Text on which sentiment analysis should be performed.
         * @example
         * 
         *         var sa = new sn_nlp_sentiment.SentimentAnalyser();
         *         var result = sa.analyze ("Example string");
         * @returns Result of the sentiment analysis specifying the status, score, normalised score, sys_id of the relevant connector configuration, and error message.
         */
        analyze(inputText: String): JSONobject;

        /**
         * Performs sentiment analysis on an array of strings.
         * 
         * @inputTextArray Array of text (string) on which sentiment analysis should be performed.
         * @example
         * 
         *         var sa = new sn_nlp_sentiment.SentimentAnalyser();
         *         var result = sa.analyzeMultiple (["Example string1","Example string2"]);
         * @returns An array that gives the result of the sentiment analysis performed on multiple texts specifying the status, score, normalized score, sys_id of the relevant connector configuration, and error message.
         */
        analyzeMultiple(inputTextArray: Array<any>): JSONArray;

        /**
         * Performs sentiment analysis on an array of strings in the specified language.
         * 
         * @inputTextArray Array of text (string) on which sentiment analysis should be performed.
         * @language Language for the input text. This can very for different sentiment services.
         * @example
         * 
         *         var sa = new sn_nlp_sentiment.SentimentAnalyser();
         *         var result = sa.analyzeMultipleWithLanguage (["Example string1","Example string2"], "en");
         * @returns An array with the result of the sentiment analysis performed on multiple texts of the mentioned language, specifying the status, score, normalized score, sys_id of the relevant connector configuration, and error message.
         */
        analyzeMultipleWithLanguage(inputTextArray: Array<any>, language: String): JSONArray;

        /**
         * Performs sentiment analysis on a specified text and language.
         * 
         * @inputText Text on which sentiment analysis should be performed.
         * @language Language for the input text. This can very for different sentiment services.
         * @example
         * 
         *         var sa = new sn_nlp_sentiment.SentimentAnalyser();
         *         var result = sa.analyze ("Example string", "en");
         * @returns Result of the sentiment analysis specifying the status, score, normalized score, sys_id of the relevant connector configuration, and error message.
         */
        analyzeWithLanguage(inputText: String, language: String): JSONobject;

        /**
         * Returns the GlideRecord of the specified connector configuration.
         * 
         * @connectorName Name of the connector configuration.
         * @example
         * 
         *       var sa = new sn_nlp_sentiment.SentimentAnalyser();
         *       var connector = sa.getConnectorByName("xxx");
         * @returns GlideRecord of the specified connector configuration.
         */
        getConnectorByName(connectorName: String): GlideRecordobject;

        /**
         * Returns the GlideRecord of the default connector configuration.
         * 
         * @example
         * 
         *         var sa = new sn_nlp_sentiment.SentimentAnalyser();
         *         var defaultConnector = sa.getDefaultConnector();
         * @returns GlideRecord of the default connector configuration.
         */
        getDefaultConnector(): GlideRecordobject;

    }

}/**
 * Provides utility methods to get or set work item skill data. The SkillDeterminationUtils API requires the Skill Determination (com.snc.skill_determination) plugin and is provided within the sn_skill_rule namespace.
 * 
 * 
 */
declare class SkillDeterminationUtils {



    /**
     * Constructor to create an instance of SkillDeterminationUtils.
     * 
     * @example
     * var util = new sn_skill_rule.SkillDeterminationUtils();
     */
    constructor();

    /**
     * Assigns an array of active skill objects to a work item.
     * 
     * @skills Array of active skill objects to be assigned.
     * @skillskillName Name of the skill.
     * @skillskillSysId Sys ID of the skill.
     * @skillmandatory True if the skill is mandatory, false otherwise.
     * @skillskillLevelName Optional skill level name.
     * @skillskillLevelSysId Optional skill level Sys ID.
     * @gr GlideRecord of the work item on which to assign skills.
     * @example
     * // Create an interaction record
     * var gr = new GlideRecord('interaction');
     * gr.insert();
     * 
     * var util = new sn_skill_rule.SkillDeterminationUtils();
     * 
     * // Get interaction skills interaction 
     * // and specify if any are mandatory
     * var result = util.determineWorkItemSkills(gr);
     * 
     * // Assign skills determined by result and 
     * // assign them to the interaction work item
     * util.assignSkillsToWorkItem(result, gr);
     * @example
     * var gr = new GlideRecord('interaction');
     * gr.insert();
     * 
     * var util = new sn_skill_rule.SkillDeterminationUtils();
     * 
     * var skills = [{"skillSysId":"2eb1c2029f100200a3bc1471367fcfe4", "skillName":"IT", "mandatory":true, "skillLevelName":"", "skillLevelSysId":null}];
     * 
     * util.assignSkillsToWorkItem(skills, gr);
     * @returns  
     */
    assignSkillsToWorkItem(skills: Array<any>, skillskillName: String, skillskillSysId: String, skillmandatory: Boolean, skillskillLevelName: String, skillskillLevelSysId: String, gr: GlideRecord): None;

    /**
     * Gets skills for a specified work item, indicates if the skills are mandatory, and lists any skill levels.
     * 
     * @gr GlideRecord of a work item from any interaction or task table extension.
     * @example
     * // Create an interaction record
     * var gr = new GlideRecord('interaction');
     * gr.insert();
     * 
     * var util = new sn_skill_rule.SkillDeterminationUtils();
     * 
     * var result = util.determineWorkItemSkills(gr);
     * gs.info(JSON.stringify(result));
     * @returns One or more skill objects. skillSysId: String. Sys ID of the skill from the Skills [cmn_skill] table. skillName: String. Name of the skill. mandatory: Boolean. True if mandatory, false otherwise. skillLevelName: If skill exists, name of the skill level. skillLevelSysId: If skill exists, Sys ID of the skill level from the Skill Levels [cmn_skill_level] table. 
     */
    determineWorkItemSkills(gr: GlideRecord): Array<any>;

}

/**
 * The SMSPreferenceHandler API provides methods to manage SMS configurations. This API is implemented as the script include SMSPreferenceHandlerSNC and resides in the sn_sms_pref namespace. To use this API you must install the Notify plugin (com.snc.notify) which requires a separate subscription. You can activate this plugin if you have the admin role.
 * 
 * 
 */
declare class SMSPreferenceHandler {



    /**
     * Instantiates the SMSPreferenceHandler script include object.
     * 
     * @provider Name of the telephony service provider.
     * @example
     * var handler = new sn_sms_pref.SMSPreferenceHandler('TwilioDirect'); // Pass the provider name
     * var config = handler.getConfig();
     */
    constructor(provider: String);

    /**
     * Returns the preferences configuration record for the current telephony service provider.The method queries all preference configuration records from the SMS Preference Configuration [sn_sms_pref_configuration] table for the current telephony service provider, sorts the results by the Order field (lowest to highest), and then returns the first record.
     * 
     * @example
     * var handler = new sn_sms_pref.SMSPreferenceHandler('TwilioDirect'); // Pass the provider name
     * var config = handler.getConfig();
     * @returns Preference configuration record for the current telephony service provider. If no record exists, then null.
     */
    getConfig(): GlideRecord;

}


declare namespace sn_ws {

    /**
     * The SOAPMessageV2 API allows you to send an outbound SOAP message using JavaScript. Use the SOAPResponseV2 API to manage the response returned by the SOAP provider. * * You can use this API in scoped applications, or within the global scope.
     * 
     * 
     */
    declare class SOAPMessageV2 {



        /**
         * Instantiate a SOAPMessageV2 object from a SOAP message record and a function associated with that record.Values such as the endpoint, authentication, or MID Server settings from the SOAP message record apply to this object.
         * 
         * @soapMessage The SOAP message record you want to use as the base for this object.
         * @soapFunction The SOAP function you want to execute. Available SOAP functions depend on the WSDL supplied by the web service provider.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         */
        constructor(soapMessage: String, soapFunction: String);

        /**
         * Instantiates an empty SOAPMessageV2 object.When using an object instantiated this way, you must manually specify a SOAP action and endpoint.
         * 
         * @example
         * var sm = new sn_ws.SOAPMessageV2();
         */
        constructor();

        /**
         * Send the SOAP message to the endpoint.
         * 
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.execute(); //Might throw exception if http connection timed out or some issue with sending request itself because of encryption/decryption of password.
         * @returns The response returned by the SOAP provider.
         */
        execute(): sn_ws.SOAPResponseV2;

        /**
         * Send the SOAP message to the ECC queue.SOAP messages in the ECC queue are processed by the SOAPClient business rule.By default, this business rule does not run asynchronously. To configure this business rule to run asynchronously, set the When value to Async and add current.update() to the end of the Script. The instance does not wait for a response from the web service provider when sending a message through the ECC queue.
         * 
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var response = sm.executeAsync();
         * @returns The response returned by the SOAP provider.Note: Attempting to use the SOAP response object before the response has been processed may result in a timeout error.
         */
        executeAsync(): sn_ws.SOAPResponseV2;

        /**
         * Get the endpoint for the SOAP message.
         * 
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var endpoint = sm.getEndpoint();
         * @returns The URL of the SOAP web service provider.
         */
        getEndpoint(): String;

        /**
         * Get the content of the SOAP message body.
         * 
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.execute();
         * var requestBody = sm.getRequestBody();
         * @returns The SOAP message body.
         */
        getRequestBody(): String;

        /**
         * Get the value for an HTTP header specified by the SOAP client.By default, this method cannot return the value for a header set automatically by the system. To grant this method access to all headers, set the property glide.http.log_debug to true.
         * 
         * @headerName The request header you want to get the value for.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var header = sm.getRequestHeader("Accept");
         * @returns The value of the specified header.
         */
        getRequestHeader(headerName: String): String;

        /**
         * Get HTTP headers that were set by the SOAP client and the associated values.This method does not return headers set automatically by the system. To configure this method to return all headers, set the property glide.http.log_debug to true.
         * 
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var requestHeaders = sm.getRequestHeaders();
         * @returns An Object that maps the name of each header to the associated value.
         */
        getRequestHeaders(): Object;

        /**
         * Set basic authentication headers for the SOAP message.Setting basic authentication headers using this method overrides basic authentication values defined in the SOAP message record.
         * 
         * @userName The username to use when authenticating the SOAP message.
         * @userPass The password for the specified user.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setBasicAuth("username","password");
         */
        setBasicAuth(userName: String, userPass: String);

        /**
         * Associate outbound requests and the resulting response record in the ECC queue.This method only applies to SOAP messages sent through a MID Server. The correlator provided populates the Agent correlator field on the ECC queue record for the response. Provide a unique correlator for each outbound request to associate the correct results in the ECC queue with the request when designing asynchronous automation through a MID Server.
         * 
         * @correlator A unique identifier.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setEccCorrelator("unique_id");
         */
        setEccCorrelator(correlator: String);

        /**
         * Override a value from the database by writing to the SOAP message payload.This method only applies to SOAP messages sent through a MID Server. Use this method when a value from the SOAP message in the database is invalid, such as when the endpoint URL is longer than the maximum SOAP endpoint field length.These are valid values for the name parameter. source: the endpoint URL. name: the SOAP message function to run. 
         * 
         * @name The name of the ECC parameter.
         * @value The value to assign to the specified ECC parameter.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setEccParameter("source","http://very.long.endpoint");
         */
        setEccParameter(name: String, value: String);

        /**
         * Set the endpoint for the SOAP message.By default, the SOAP message uses the endpoint specified in the SOAP message record. Use this method to override the default. You must call this method when using the SOAPMessageV2() constructor with no parameters.
         * 
         * @endpoint The URL of the SOAP web service provider you want to interface with.
         * @example
         * var sm = new sn_ws.SOAPMessageV2();
         * sm.setEndpoint("http://web.service.endpoint");
         */
        setEndpoint(endpoint: String);

        /**
         * Set the amount of time the SOAP message waits for a response from the web service provider before the request times out.
         * 
         * @timeoutMs The amount of time to wait for a response from the web service provider, in milliseconds.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setHttpTimeout(6000);
         */
        setHttpTimeout(timeoutMs: Number);

        /**
         * Sets the log level for this message and the corresponding response.Setting a log level using the SOAPMessageV2 API overrides the log level configured on the SOAP message record. This log level may not apply if the endpoint domain is blacklisted, or if the property glide.outbound_http_log.override is true. To view outbound web service logs, navigate to System Logs &gt; Outbound HTTP Requests.
         * 
         * @level The log level. Valid values are basic, elevated, and all.
         */
        setLogLevel(level: String);

        /**
         * Configure the SOAP message to be sent through a MID Server.By default, the SOAP message uses the MID Server specified in the SOAP message function record. Use this method to override the default.
         * 
         * @midServerName The name of the MID Server you want to send the SOAP message through. Your instance must have an active MID Server with the specified name.
         */
        setMIDServer(midServerName: String);

        /**
         * Set the mutual authentication protocol profile for the SOAP message.Setting a protocol profile using this method overrides the protocol profile selected for the SOAP message record.
         * 
         * @profileName The name of the protocol profile to use for mutual authentication.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setMutualAuth("auth_profile_name");
         */
        setMutualAuth(profileName: String);

        /**
         * Set the body content to send to the web service provider.When you set the body content using this method, variables in the body are not substituted for parameters from the SOAP message function record. You must explicitly define all values within the SOAP message body.
         * 
         * @requestBody The body of the SOAP message.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * var body = "&lt;SOAP message body&gt;";
         * sm.setRequestBody(body);
         */
        setRequestBody(requestBody: String);

        /**
         * Set an HTTP header in the SOAP message to the specified value.
         * 
         * @headerName The name of the header.
         * @headerValue The value to assign to the specified header.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setRequestHeader("Accept","Application/json");
         */
        setRequestHeader(headerName: String, headerValue: String);

        /**
         * Define the SOAP action this SOAP message performs.The WSDL for your web service provider lists SOAP actions you can perform. You must call this method when using the SOAPMessageV2() constructor with no parameters.
         * 
         * @soapAction The SOAP action this SOAP message performs.
         * @example
         * var sm = new sn_ws.SOAPMessageV2();
         * sm.setSOAPAction("GetQuote");
         * //construct SOAP message by specifying endpoint and auth
         * sm.execute();
         */
        setSOAPAction(soapAction: String);

        /**
         * Set a variable with the specified name from the SOAP message record to the specified value.XML reserved characters in the value are converted to the equivalent escaped characters.
         * 
         * @name The name of the SOAP message variable.
         * @value The value to assign to the specified variable.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setStringParameter("symbol","NOW");
         */
        setStringParameter(name: String, value: String);

        /**
         * Set a variable with the specified name from the SOAP message record to the specified value.This method is equivalent to setStringParameter but does not escape XML reserved characters.
         * 
         * @name The name of the SOAP message variable.
         * @value The value to assign to the specified variable.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setStringParameterNoEscape("symbol","NOW");
         */
        setStringParameterNoEscape(name: String, value: String);

        /**
         * Sets web service security values for the SOAP message.Setting security values using this method overwrites web service security values defined for the SOAP message record.
         * 
         * @keystoreId The sys_id of the Java or PKCS12 key store to use.
         * @keystoreAlias The alias that identifies the public and private keys.
         * @keystorePassword The password assigned to the key store record.
         * @certificateId The sys_id of the trusted server certificate.
         * @example
         * var sm = new sn_ws.SOAPMessageV2("StockQuote","GetQuote"); //Might throw exception if message doesn't exist or not visible due to scope.
         * sm.setWSSecurity("70d65e074f3812001f6eac118110c71a","Quote keys","UXr82cqX75Z7MaSa+EyjGA==","ba969a074f3812001f6eac118110c76d");
         */
        setWSSecurity(keystoreId: String, keystoreAlias: String, keystorePassword: String, certificateId: String);

    }

}
declare namespace sn_ws {

    /**
     * The SOAPResponseV2 API allows you to use the data returned by an outbound SOAP message in JavaScript code. A SOAPResponseV2 object is returned by the SOAPMessageV2 functions execute() and executeAsync(). * * You can use this API in scoped applications, or within the global scope.
     * 
     * 
     */
    declare class SOAPResponseV2 {



        /**
         * Return all headers contained in the response, including any duplicate headers.
         * 
         * @example
         * var r = new sn_ws.SOAPMessageV2('&lt;A SOAP message&gt;', 'get');
         * var response = r.execute();
         * var headers = response.getAllHeaders();
         * for(var i in headers){
         *   gs.print(headers[i].name + ': ' + headers[i].value);
         * }
         * @returns The list of headers contained in the response. Each header is represented as a GlideHTTPHeader object which contains the header name and value.
         */
        getAllHeaders(): List<GlideHTTPHeader>;

        /**
         * Get the content of the SOAP response body.
         * 
         * @example
         * var body = response.getBody();
         * @returns The SOAP response body.
         */
        getBody(): String;

        /**
         * Returns all cookies included in the response.
         * 
         * @example
         * var cookies = response.getCookies();
         * var i;
         * for(i=0;i&lt;cookies.size();i++) {
         *    gs.print(‘cookie: ‘ + cookies.get(i));
         * }
         * @returns The list of cookies. Iterate through the list to perform operations on each cookie.
         */
        getCookies(): Object;

        /**
         * Get the numeric error code if there was an error during the SOAP transaction.This error code is specific to the Now Platform, it is not an HTTP error code. Provide this error code if you require assistance from ServiceNow Customer Support.
         * 
         * @example
         * var errorCode = response.getErrorCode();
         * @returns The numeric error code, such as 1 for a socket timeout.
         */
        getErrorCode(): Number;

        /**
         * Get the error message if there was an error during the SOAP transaction.
         * 
         * @example
         * var errorMsg = response.getErrorMessage();
         * @returns The error message.
         */
        getErrorMessage(): String;

        /**
         * Get the value for a specified HTTP header.
         * 
         * @name The name of the header that you want the value for, such as Set-Cookie.
         * @example
         * var headerVal = response.getHeader("Accept");
         * @returns The value of the specified header.
         */
        getHeader(name: String): String;

        /**
         * Get all HTTP headers returned in the SOAP response and the associated values.Note: If a header is present more than once in the response, such as a Set-Cookie header, this function returns only the last of the duplicate headers. To return all headers including duplicates, use the getAllHeaders() function.
         * 
         * @example
         * var headers = response.getHeaders();
         * @returns An Object that maps the name of each header to the associated value.
         */
        getHeaders(): Object;

        /**
         * Get the numeric HTTP status code returned by the SOAP provider.
         * 
         * @example
         * var statusCode = response.getStatusCode();
         * @returns The numeric status code returned by the SOAP provider, such as 200 for a successful response.
         */
        getStatusCode(): Number;

        /**
         * Indicate if there was an error during the SOAP transaction.
         * 
         * @example
         * var error = response.haveError();
         * @returns Returns true if there was an error, false if there was no error.
         */
        haveError(): boolean;

        /**
         * Set the amount of time the instance waits for a response from the web service provider.This method overrides the property glide.soap.outbound.ecc_response.timeout for this SOAP response.
         * 
         * @timeoutSecs The amount of time, in seconds, to wait for this response.
         * @example
         * response.waitForResponse(60);
         */
        waitForResponse(timeoutSecs: Number);

    }

}/**
 * Define facet items, filters, or mapped queries for a facets object. The SPScriptedFacet API can only be used in a facet generation script in a Service Portal search source. The facet generation script is only visible when Is scripted source is selected. * * There is no constructor for this class. Instead, use the createFacet() or createMultiChoiceFacet() methods of the SPScriptedFacetService class to generate a facets object.
 * 
 * 
 */
declare class SPScriptedFacet {



    /**
     * Adds facet items or mapped queries to a facets object.Before adding facet items to a facets object, create the facets object using the createFacet() or createMultiChoiceFacet() methods of the SPScriptedFacetService class.
     * 
     * @label The display label for the facet item or mapped query.
     * @valueObj The facet item or mapped query for the facet. Can only contain types String, Number, Boolean, and Double.
     * @example
     * (function(query, facetService, searchResults, facets) {
     * 	// Calculate your facets here using facetService 
     * 	// var stateFacet = facetService.createFacet('State', 'state'); 
     * 	// stateFacet.addFacetItem('Facet Item Label', '123'); 
     * 
     * 	createCreatedFacet();
     * 	
     * 	function createCreatedFacet() {
     * 		if (!facets.created &amp;&amp; searchResults.length == 0)
     * 			return;
     * 		
     * 		var gr = new GlideAggregate("incident");
     * 		gr.addQuery("123TEXTQUERY321", query);
     * 		if (facets.created) {
     * 			if (facets.created == "today") {	
     * gr.addEncodedQuery("sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()");
     * 			}
     * 			if (facets.created == "before") {
     * 				gr.addEncodedQuery("sys_created_on&lt;javascript:gs.beginningOfToday()");
     * 			}
     * 		}
     * 		gr.query();
     * 		
     * 		var queryMap = {
     * 			today: "Today",
     * 			before: "Before Today"
     * 		};
     * 
     * 		var createdFacet = facetService.createFacet("Created", "created");
     * 		if (facets.created) {
     * 			createdFacet.addFacetItem(queryMap[facets.created], facets.created);
     * 		} else {
     * 			createdFacet.addFacetItem(queryMap.today, "today");
     * 			createdFacet.addFacetItem(queryMap.before, "before");
     * 		}
     * 	}
     * 	
     * })(query, facetService, searchResults, facets);
     * 
     */
    addFacetItem(label: String, valueObj: Object);

}

/**
 * Generate a multi choice or single choice facets object for an advanced search source. The SPScriptedFacetService API can only be used in a facet generation script in a Service Portal search source. The facet generation script is only visible when Is scripted source is selected. * * There is no constructor for this class. Instead, use the createFacet() or createMultiChoiceFacet() methods to generate a facets object.
 * 
 * 
 */
declare class SPScriptedFacetService {



    /**
     * Creates a single choice facets object.After creating the facets object, add facet items or mapped queries to the facet using the addFacetItem() method of the SPScriptedFacet class.
     * 
     * @label Label for the facet.
     * @id ID for the facet.
     * @example
     * var stateFacet = facetService.createFacet("State", "state");
     * @returns Single choice facets object. Returns an error when: A duplicate label or ID is found. A label or ID is not defined. 
     */
    createFacet(label: String, id: String): Object;

    /**
     * Creates a multi choice facets object.After creating the facets object, add facet items or mapped queries to the facet using the addFacetItem() method of the SPScriptedFacet class.
     * 
     * @label Label for the facet.
     * @id ID for the facet.
     * @example
     * var stateFacet = facetService.createMultiChoiceFacet("State", "state");
     * @returns Multi choice facets object. Returns an error when: A duplicate label or ID is found. A label or ID is not defined. 
     */
    createMultiChoiceFacet(label: String, id: String): Object;

}


declare namespace sn_cc {

    /**
     * Use StandardCredentialsProvider API to retrieve credential information. You can use this API in scoped applications, or within the global scope. In scoped scripts, use the sn_cc namespace identifier. * * This function retrieves credential information by sys ID and by given credential attributes. * * 
     * 
     * 
     */
    declare class StandardCredentialsProvider {



        /**
         * Use StardardCredentialsProvider() to retrieve credential information.
         * 
         */
        constructor();

        /**
         * This function retrieves a credential object identified by the given sys ID.
         * 
         * @sysID A string representing the sys ID of the credential record.
         * @example
         * var provider = new sn_cc.StandardCredentialsProvider();
         *          var credentials = provider.getCredentials(["ssh"]);
         *          for (var i = 0; i &lt; credentials.length; i++) {
         *       	var credential = credentials[i];
         *              gs.info(credential.getAttribute("name"));
         *       }
         * 
         * @returns A credential.
         */
        getCredentialByID(sysID: String): StandardCredential;

        /**
         * This function returns an array of all credentials that match the given types and tags.
         * 
         * @types Types is an array of credential type names. For example, ["ssh", "windows"]Note: If types are null or empty, any match returns a credential. If types are specified, the credentials whose type matches one of the types returns.
         * @handles Handles is a comma-separated list of handle names. For example, "ssh,jdbc"
         * @example
         * var provider = new sn_cc.StandardCredentialsProvider();
         *          var credentials = provider.getCredentials(["ssh"]);
         *          for (var i = 0; i &lt; credentials.length; i++) {
         *       	var credential = credentials[i];
         *              gs.info(credential.getAttribute("name"));
         *       }
         * 
         * @returns Information about the ConnInfo...
         */
        getCredentials(types: String, handles: String): StandardCredential;

    }

}
declare namespace sn_fd {

    /**
     * Runs published Flow Designer subflows. The Subflow API can only be used in server scripts. * * Use the sn_fd namespace to access the Subflow API. * * Before interacting with a subflow using the Subflow API, you must first create and publish the subflow in the Flow Designer interface. Because the Subflow API only interacts with pre-built subflows, there is no constructor for the class. * * This API is deprecated and replaced by the FlowAPI.
     * 
     * 
     */
    declare class Subflow {



        /**
         * Runs a published subflow asynchronously.Asynchronous calls are non-blocking, allowing the client to execute other code in the script without having to wait for the subflow to complete.
         * 
         * @scopeNamesubflowName The application scope for the subflow and the internal name of the subflow to run. If scopeName is not included, the scope of the user currently logged in is used. Retrieve the internal name of the subflow using the Internal name column on the Flow Designer landing page.
         * @inputs Name-value pairs that define subflow inputs. If a subflow includes mandatory inputs, they must be included. For inputs of Reference or Document ID field types, use a GlideRecord object as the value.
         * @example
         * //Run a subflow that takes two inputs: user, a sys_user record, and laptop_welcome_message, a string.
         * (function startSubflowAsync() {
         * 
         * 	try {
         * 		var userToProvisionFor = new GlideRecord('sys_user');
         * 		userToProvisionFor.get('62826bf03710200044e0bfc8bcbe5df1');
         * 
         * 		var inputs = {};
         * 		inputs['user'] = userToProvisionFor;
         * 		inputs['laptop_welcome_message'] = 'Welcome Onboard!!';
         * 
         * 		var result = sn_fd.Subflow.startAsync('sn_devstudio.provisionlaptop', inputs);
         * 
         * 		//The Sys ID of a flow execution (contextId)
         * 		var contextId = result.contextId;
         * 
         * 	} catch (ex) {
         * 		var message = ex.getMessage();
         * 		gs.error(message);
         * 	}
         * 
         * })();
         * @returns PlanResponse object containing the following properties: contextId: sys_id of the execution details record for the executed subflow. Access the execution details by navigating to the Flow Executions tab in Flow Designer and filtering by sys_id. An exception occurs when the subflow: Does not exist within the specified application scope, or the subflow or scope name has been misspelled. Is not published. Is passed an input object that does not match the subflow inputs. Exceeds the recursion limit set by the com.glide.hub.flow_engine.indirect_recursion_limit system property. The default value is three. 
         */
        startAsync(scopeNamesubflowName: String, inputs: Object): Object;

    }

}/**
 * Scoped TemplatePrinter handles printing from a mail script to the email message. There is no constructor for the scoped TemplatePrinter API. The methods are called in mail scripts using the template global variable.
 * 
 * 
 */
declare class TemplatePrinter {



    /**
     * Prints the string to the email body.
     * 
     * @string The string to print
     * @example
     * template.print("Incident number - " + current.number + "\n");
     */
    print(string: String);

    /**
     * Adds non-breaking spaces to the email body.
     * 
     * @spaces The number of non-breaking spaces to output to the email body.
     * @example
     * template.space(4);
     */
    space(spaces: Number);

}


declare namespace sn_clotho {

    /**
     * Manipulate time-series data to prepare the data for evaluation and analysis. The Transformer class can be used in scoped and global server scripts. When using the Transformer class, use the sn_clotho namespace identifier. * * The general use case is to determine the period to be evaluated, select the records from the table with the metric field, define the type of transform to run, and then execute the transform. * * This class is part of the MetricBase application.
     * 
     * 
     */
    declare class Transformer {



        /**
         * Create a Transformer object.
         * 
         * @sourceRecords Contains the records for which metrics are to be evaluated. Can be one record or many.
         * @example
         * //where drones is a GlideRecord created from a table with a metric field
         * 	var builder = new sn_clotho.Transformer(drones);
         * 
         */
        constructor(sourceRecords: GlideRecord);

        /**
         * Run the transform.Use the metric() and groupBy() methods before calling execute(). The execute() method can only be called once for each Transformer object.Actions performed as part of the transform do not change the data in the MetricBase database.
         * 
         * @start The beginning of the period to be evaluated.
         * @end The end of the period to be evaluated.
         * @example
         * var minutesAgoStart = 60;
         * 	var end = new GlideDateTime();
         * 	var start = new GlideDateTime(end);
         * 	start.addSeconds(-1 * 60 * minutesAgoStart);
         * 	
         * 	// query subject records
         * 	var grDrone = new GlideRecord('mb_demo_drone');
         * 	grDrone.query();
         * 	
         * 	// building transform; get the average transforms of a metric, grouping by model
         * 	var transformer = new sn_clotho.Transformer(grDrone);
         * 	transformer.groupBy("fleet").metric("mb_demo_mt_altitude").avg().label('avg - %g:fleet:');
         * 
         * 	// execute and return result for visualization
         * 	var tfrmResult = transformer.execute(start, end);
         * @returns The transformed data.
         */
        execute(start: GlideDateTime, end: GlideDateTime): sn_clotho.TransformResult;

        /**
         * Specify a field to be used to group the data.If you are going to use the groupBy() method, it must be called before the execute() method.
         * 
         * @field A field in the table to be used to group the transform results.
         * @example
         * var transformer = new sn_clotho.Transformer(grDrone);
         * 	var trnsfrm = transformer.groupBy("fleet");
         * @returns A TransformPart object that can be used to specify the transform characteristics.
         */
        groupBy(field: String): sn_clotho.TransformPart;

        /**
         * Specify the metric field to be used in the transform.You can specify multiple metrics to be used in the transform. The metric() method cannot be called after the execute() method is called.
         * 
         * @metricName Name of the metric field.
         * @example
         * var transformer = new sn_clotho.Transformer(grDrone);
         * var trnsfrm = transformer.metric("mb_demo_mt_altitude");
         * @returns A TransformPart object that can be used to specify the transform characteristics.
         */
        metric(metricName: String): sn_clotho.TransformPart;

    }

}/**
 * Provides methods to instantiate and manage the TransformerDefinition object, which associates a transformation rules list and record path. The scripted TransformerDefinition API works in conjunction with the Transformer and TransformerRuleList APIs to transform structured JSON/XML content into output such as tabular tables or objects. * * The TransformerRuleList API enables you to create rules that define how to transform the data in a source document into the desired output. For example, if you are transforming JSON data into a tabular table, each rule that you define in the rules list becomes a column within the tabular table. Each node that is processed in the source document, becomes a row in the output table. * * The TransformerDefinition API associates a rule list with a JSON/XML record path to define reusable transform definition objects. You can use an object to transform one or more source documents. * * In addition, this object provides methods that enable you to obtain the record path of the TransformerDefinition object and to validate whether the definition has a valid TransformerRuleList associated with it. * * The Transformer API performs the actual data transformation, one node/row at a time, to create the desired output data. * * You can use the TransformerDefinition class in both scoped and global server scripts. When using this class, use the sn_tfrm namespace identifier. Also, before this API is available in an instance, you must activate the Transformation Service plugin (com.glide.transform).
 * 
 * 
 */
declare class TransformerDefinition {



    /**
     * Instantiates a TransformerDefinition object.
     * 
     * @transformerRuleList TransformerRuleList to associate with this transformer definition.
     * @recordPath Optional. Path (JSONPath for JSON, XPath for XML) that identifies the set of records in the source document to transform. A record is a subset of a document that corresponds to a single row of content.For JSON, this value should be the path to an array or collection of objects to transform.
     * For XML, this value should be the path to the node (collection of child nodes) to transform. If recordPath is unspecified, the entire document is inferred as being a single record. For JSON documents, if the top node is an array and recordPath is unspecified then the top array is the records container, and each of its entries is a record. 
     * @example
     * var stockAPI = new sn_ws.RESTMessageV2('Stock Details', 'Default GET'); 
     * var response = stockAPI.execute(); 
     * var responseBody = response.getBody(); 
     * 
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .addSymbol('ticker', 'quote.symbol') 
     *   .addSymbol('change_percentage', 'quote.change_change') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addSymbol('close_price', 'quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addSymbol('summary') 
     *   .thenConcat('Shares of ') 
     *   .thenConcatSymbol('ticker') 
     *   .thenConcat(' closed at ') 
     *   .thenConcatSymbol('close'); 
     * 
     *  
     * var path = '$.*'; 
     * var transformerDefinition = new sn_tfrm.TransformerDefinition(transformerRuleList, recordPath); 
     * var transformer = new sn_tfrm.Transformer(transformerDefinition, responseBody); 
     * 
     * var results = []; 
     * while (transformer.transform()) { 
     *   results.push(transformer.getRow());
     * }
     */
    constructor(transformerRuleList: Object, recordPath: String);

    /**
     * If set, returns the record path for the source data file associated with the TransformerDefinition object.A record path (JSONPath for JSON, XPath for XML) identifies the set of records in the source document to transform. A record is a subset of a document that corresponds to a single row of content, such as objects in JSON and nodes in XML.
     * 
     * @example
     * var path = '$.records'; 
     * var transformerDefinition = new sn_tfrm.TransformerDefinition(transformerRuleList, recordPath); 
     * var transformer = new sn_tfrm.Transformer(transformerDefinition, responseBody);  
     * .
     * .
     * .
     * 
     * var recordPath = transformerDefinition.recordfPath();
     * 
     * var results = []; 
     * while (transformer.transform()) { 
     *   results.push(transformer.getRow());
     * }
     * @returns If set, the record path associated with the transformer definition. If not set, returns null.
     */
    recordPath(): String;

    /**
     * Validates whether a valid TransformerRuleList is associated with the TransformerDefintion object.
     * 
     * @example
     * var transformerDefinition = new sn_tfrm.TransformerDefinition(transformerRuleList, recordPath);
     * var transformer = new sn_tfrm.Transformer(transformerDefinition, responseBody); 
     * .
     * .
     * .
     * 
     * if (transformerDefinition.validate()) {
     * 
     *   var results = []; 
     *   while (transformer.transform()) { 
     *     results.push(transformer.getRow());
     *   }
     * }
     * @returns Flag that indicates whether a valid TransformerRuleList is associated with the specified TransformerDefintion object.Valid values: true: valid TransformerRuleList associated false: invalid or no TransformerRulList associated 
     */
    validate(): Boolean;

}

/**
 * Creates a rule list for transforming JSON or XML documents into a prescribed output. The scripted TransformerRuleList API works in conjunction with the Transformer and TransformerDefinitionAPIs to transform structured JSON/XML content into output such as tabular tables or objects. * * The TransformerRuleList API enables you to create rules that define how to transform the data in a source document into the desired output. For example, if you are transforming JSON data into a tabular table, each rule that you define in the rules list becomes a column within the tabular table. Each node that is processed in the source document, becomes a row in the output table. * * The TransformerDefinition API associates a rule list with a JSON/XML record path to define reusable transform definition objects. You can use an object to transform one or more source documents. * * The Transformer API performs the actual data transformation, one node/row at a time, to create the desired output data. * * When you instantiate the TransformRuleList object, you must first define whether it describes a JSON or XML source document using the .fromJSON() or .fromXML() methods. For example: * * or var trl = sn_tfrm.TransformerRuleList().fromXML(); * * Then use the addRule() method to define the transformation of elements in the source document to elements in the output. * * Use "adapter methods" to define how to manipulate data elements when the transformation is performed. You can apply one or more adapter methods to each data transformation. Adapter methods enable you to do things such as: Concatenate text or contrived data elements Perform mathematical functions, such as add, subtract, divide, and multiply Round values up or down (round up/down, ceiling/floor) Define whether to use the minimum or maximum value when comparing a source data element to a specified value Apply a currency code Convert between different units of measure Format data elements Apply patterns Replace specified data elements with a specified value Split and rearrange strings * * You can use the TransformerRuleList class in both scoped and global server scripts. When using this class, use the sn_tfrm namespace identifier. Also, before this API is available in an instance, you must activate the Transformation Service plugin (com.glide.transform).
 * 
 * 
 */
declare class TransformerRuleList {



    /**
     * Creates an entry in the associated rules list which defines a field to create in the output.You can create rules for any element in a source node and all its child nodes. For example, .addRule('ticker', '$.quote.symbol') creates the field "ticker" in the output and copies over the value in quote.symbol of the source..addRule('summary') creates the field "summary" in the output but does not correlate to any field in the source. You can then use the adaptor methods thenConcat() and thenConcatSymbol() to modify the contents of this output field.Once you define a rule, you then use adaptor methods, such as thenAdd(), thenReplace(), and thenFloor() to manipulate the rule's output data. You can define as many adaptor methods as needed for a single rule. All adapter methods directly after an addRule() call until the next addRule() call apply to that rule. Adapter methods are cumulative with the result of all adapter methods being the final value saved in the output field.For example, in the following code snippet, thenMultiply() and thenRoundDown() apply to addRule('change_percentage', '$.quote.changePercent'); addRule('close_price', '$.quote.close') starts a new rule. If the value in $.quote.changePercent is .011, then the final output value is "1" ( .011 * 100 rounded down to the ones position). .addRule('change_percentage', '$.quote.changePercent') .thenMultiply('100') .thenRoundDown('0') .addRule('close_price', '$.quote.close') 
     * 
     * @rule Name of the element in the destination output.
     * @path Optional. JSONPath or XPath to the data element in the source document.The adapter methods thenConcat() and thenConcatSymbol() do not require you to define this parameter if no other adapter methods are defined for the rule. All other adapter methods require this parameter.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('summary') 
     *   .thenConcat('Shares of ') 
     *   .thenConcatSymbol('ticker') 
     *   .thenConcat(' closed at ') 
     *   .thenConcatSymbol('close_price'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    addRule(rule: String, path: String): Object;

    /**
     * Defines a name for the associated TransformerRuleList object for logging purposes.
     * 
     * @name Name to use to identify the associated TransformerRuleList object. Although the API does not force this name to be unique, it is helpful if they are unique within an instance.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('summary') 
     *   .thenConcat('Shares of ') 
     *   .thenConcatSymbol('ticker') 
     *   .thenConcat(' closed at ') 
     *   .thenConcatSymbol('close_price'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    setName(name: String): Object;

    /**
     * Adds an adapter to the current rule that ties the specified currency code to the output field defined in the associated addRule() call.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @currencyCode Currency code to tie to the destination data element, such as USD, EUR, and GBP.
     * @outputNumericCurrencyValue Optional. Flag that indicates whether to display the currency code.Valid values: true: do not display the country code; numeric value only false: display the country code Default: false
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('summary') 
     *   .thenConcat('Shares of ') 
     *   .thenConcatSymbol('ticker') 
     *   .thenConcat(' closed at ') 
     *   .thenConcatSymbol('close_price'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenAdaptCurrency(currencyCode: String, outputNumericCurrencyValue: Boolean): Object;

    /**
     * Adds an adapter to the current rule that converts the source field from one unit of measure to another, such as from minutes to seconds or weeks to days.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @inputDuration Current unit of measure of the source field.Valid values: NANOSECOND MICROSECOND MILLISECOND SECOND MINUTE HOUR DAY WEEK 
     * @outputDuration Unit of measure to convert the source field to in the output.Valid values: NANOSECOND MICROSECOND MILLISECOND SECOND MINUTE HOUR DAY WEEK 
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('daily', '$.quote.weekly') 
     *   .thenAdaptDuration('WEEK', 'DAY'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenAdaptDuration(inputDuration: String, outputDuration: String): Object;

    /**
     * Adds an adapter to the current rule that adds the passed in value to the source field.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Value to add to the source field.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList.fromJSON()
     *   .setName('Stock Report 05182019 JSON')
     *   .addSymbol('ticker', '$.symbol') 
     *   .addSymbol('change_percentage', '$.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addSymbol('trade_price', '$.current_price')
     *   .thenAdaptCurrency('USD', false) 
     *   .addMultiply('$.trade_quantity')
     *   .thenAdd('4.5'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenAdd(operand: Number): Object;

    /**
     * Adds an adapter to the current rule that searches the associated source field for a list of strings and replaces them in the output with the specified replacement values.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @map Name/value pairs. name: text to locate in the source data element value: text to replace it with in the output 
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('company_info', '$.quote.company_info') 
     *   .thenApplyMap({'Inc.': 'Incorporated', 'St.': 'Street'});
     * 
     * @returns Current TransformerRuleList object.
     */
    thenApplyMap(map: Object): Object;

    /**
     * Adds an adapter to the current rule that matches a specified regex pattern to content in the source field and then replaces/reformats that content with a second regex pattern and stores that value in the output.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @matchPattern Regex pattern to use to locate the text to replace/reformat.
     * @outputPattern Regex pattern to use to update the located text.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('company', '$.quote.company') 
     *   .thenApplyPattern('(.+)(\\w{3}\\.)', '$1Incorporated');
     * 
     * @returns Current TransformerRuleList object.
     */
    thenApplyPattern(String matchPattern, String outputPattern(matchPattern: String, outputPattern: String): Object;

    /**
     * Adds an action to the current rule to round the source field up at the decimal position specified by the passed in value.Unlike straight rounding where the number is rounded based on the value of the digit in the specified decimal position (0-4 round down, 5-9 round up), ceiling always rounds up. For example, the ceiling value for 2.156 and 2.152 is always 2.16 for the passed in decimal position of 2; whereas for straight rounding the values would be 2.16 and 2.15 respectively. For negative numbers, the ceiling operation makes the number more positive, as in the ceiling value of -2.156 is -2.15; whereas the same number rounded up makes the value more negative, -2.16.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Decimal position to the right of the decimal point at which to round the number up (apply ceiling). For example, if this value is 2 and the source data element is 6.421, the resulting value is 6.43.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Mortgage Rates 05022019 JSON')
     *   .addRule('interest_rate', '$.quote.interest_rate') 
     *   .thenCeiling('2') // Always round the interest rate up to the hundredths place 
     *   .addRule('monthly_payment', '$.quote.total_loan_amount') 
     *   .thenDivideBy('180'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenCeiling(operand: Number): Object;

    /**
     * Adds an adapter to the current rule that concatenates the passed in string to the output field.Unlike other adapter methods, this method does not have to be applied to a source field. You can use this method to create completely new data strings in the output.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @value Text to concatenate to the end of the current data element.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('summary') 
     *   .thenConcat('Shares of ') 
     *   .thenConcatSymbol('ticker') 
     *   .thenConcat(' closed at ') 
     *   .thenConcatSymbol('close_price'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenConcat(value: String): Object;

    /**
     * Adds an adapter to the current rule that concatenates the value of a field previously defined in the rules list to the current output field.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @symbol Name of the rules list element to append to the output field.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('summary') 
     *   .thenConcat('Shares of ') 
     *   .thenConcatSymbol('ticker') 
     *   .thenConcat(' closed at ') 
     *   .thenConcatSymbol('close_price'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenConcatSymbol(symbol: String): Object;

    /**
     * Adds an adapter to the current rule that divides the source field by the passed in value.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Value by which to divide the source field.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('dividend_per_share', '$.quote.total_dividend') 
     *   .thenDivideBy('$.quote.total_shares'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenDivideBy(operand: Number): Object;

    /**
     * Adds an adapter to the current rule that divides the passed in value by the source field.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Value into which to divide the source field.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('dividend_per_share', '$.quote.total_shares') 
     *   .thenDivideInto('$.quote.total_dividends'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenDivideInto(operand: Number): Object;

    /**
     * Adds an adapter to the current rule that rounds the source field down at the decimal position specified by the passed in value and stores it in the output.Unlike straight rounding where the number is rounded based on the value of the digit in the specified decimal position (0-4 round down, 5-9 round up), floor always rounds down. For example, the floor value for 2.156 and 2.152 is always 2.15 for the passed in decimal position of 2; whereas for straight rounding the values would be 2.16 and 2.15 respectively. For negative numbers, the floor operation makes the number more negative, as in the floor value of -2.156 is -2.16; whereas the same number rounded down makes the value more positive, -2.15.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Decimal position to the right of the decimal point at which to round the number down (apply floor). For example, if this value is 2 and the source data element is 6.427, the resulting value is 6.42.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Mortgage Rates 05022019 JSON')
     *   .addRule('interest_rate', '$.quote.interest_rate') 
     *   .thenFloor('2') // Always round the interest rate down to the hundreths place 
     *   .addRule('monthly_payment', '$.quote.total_loan_amount') 
     *   .thenDivideBy('180'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenFloor(operand: Number): Object;

    /**
     * Adds an adapter to the current rule that reformats the content in the source field that matches the specified match pattern, with the specified output pattern.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @matchPattern Pattern to match against the source field.Valid values: @: any character #: decimal digit \: literal escape (\@ for the @ symbol) 
     * @outputPattern Pattern to replace the content with in the output.Valid values: @: any character #: decimal digit \: literal escape (\@ for the @ symbol) 
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('date', '$.quote.date') 
     *   .thenFormat('####/##/##', '#### ##-##'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenFormat(matchPattern: String, outputPattern: String): Object;

    /**
     * Adds an adapter to the current rule that compares the passed in value against the source field and copies the greater of the two values to the output field.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Value to compare to the source field.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Mortgage Rates 05022019 JSON')
     *   .addRule('lowest_interest_rate', '$.quote.interest_rate') 
     *   .thenMax('3.5') // Interest rate cannot be less than 3.5%
     *   .addRule('dividend_per_share', '$.quote.total_shares') 
     *   .thenDivideInto('$.quote.total_dividends'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenMax(operand: Number): Object;

    /**
     * Adds an adapter to the current rule that compares the passed in value against the source field and copies the lower of the two values to the output field.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Value to compare to the source field.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addSymbol('broker_fee_percentage', '$.quote.broker_fee') 
     *   .thenMin('10') // Maximum of 10% broker fee
     *   .addSymbol('dividend_per_share', '$.quote.total_shares') 
     *   .thenDivideInto('$.quote.total_dividends'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenMin(operand: Number): Object;

    /**
     * Adds an adapter to the current rule that multiplies the source field by the passed in value.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Value by which to multiply the source field.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('summary') 
     *   .thenConcat('Shares of ') 
     *   .thenConcatSymbol('ticker') 
     *   .thenConcat(' closed at ') 
     *   .thenConcatSymbol('close_price'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenMultiply(operand: Number): Object;

    /**
     * Adds an adapter to the current rule that finds all text within the source field that matches a specified string and replaces it with an updated string.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @matchString String to match against the source field to identify the text to replace.
     * @replaceString String with which to replace the matching text.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('company', '$.quote.company') 
     *   .thenReplace('Inc.', 'Incorporated');
     * 
     * @returns Current TransformerRuleList object.
     */
    thenReplace(matchString: String, replaceString: String): Object;

    /**
     * Adds an adapter to the current rule that rounds the source data element up at the decimal position specified by the passed in value.For negative numbers, the thenRoundUp() method makes the number more negative; the round up value of -2.156 is -2.16. The thenCeiling() method makes the same number more positive, -2.15.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Decimal position to the right of the decimal point at which to round the number up. For example, if this value is 2 and the source data element is 6.422, the resulting value is 6.43.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Mortgage Rates 05022019 JSON')
     *   .addRule('interest_rate', '$.quote.interest_rate') 
     *   .thenRoundUp('2') // Always round the interest rate up to the hundredths place 
     *   .addRule('monthly_payment', '$.quote.total_loan_amount') 
     *   .thenDivideBy('180'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenRound Up(operand: Number): Object;

    /**
     * Adds an adapter to the current rule that rounds the source field down at the decimal position specified by the passed in value.For negative numbers, the thenRoundDown() method makes the number more positive; the round down value of -2.156 is -2.15. The thenFloor() method makes the same number more negative, -2.16.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Decimal position to the right of the decimal point at which to round the number down. For example, if this value is 2 and the source data element is 6.427, the resulting value is 6.42.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList90
     *   .fromJSON()
     *   .setName('Mortgage Rates 05022019 JSON')
     *   .addRule('interest_rate', '$.quote.interest_rate') 
     *   .thenRoundDown('2') // Always round the interest rate down to the hundredths place 
     *   .addRule('monthly_payment', '$.quote.total_loan_amount') 
     *   .thenDivideBy('180'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenRoundDown(operand: Number): Object;

    /**
     * Adds an adapter to the current rule that splits, reorganizes, and replaces strings within the source field and saves them in the output field.The splitPattern parameter denotes how to divide the source text string into segments. This parameter can be a typical word separator such as a space (' '), comma (','), or semicolon (';'), and can also be any string, such as 'name'. For example, if the source text is "Smith John Michael" and the splitPattern is a space, then the available segments are "Smith", "John", and "Michael". To reference a segment, use $#, where # is the number of the order of the segment in the source text string. For example, if the method call is thenSplit(' ', '$2 $3 $1'), then the output is "John Michael Smith". In addition, you can add constants within the output pattern, such as thenSplit(' ', 'First name: $2 Middle name: $3 Last name: $1').Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @splitPattern String that denotes how to split the text into segments.
     * @replaceString String that defines the output string, including segment references and constants. Not all segments need to be referenced. Reference the segments defined by the splitPattern using $#, where # is the number of the order of the segment in the source data element. Reference the entire source data element using $0.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock Report 05022019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('CEO', '$.quote.CEO') 
     *   .thenSplit(',', '$2 $1');
     * 
     * @returns Current TransformerRuleList object.
     */
    thenSplit(splitPattern: String, replaceString: String): Object;

    /**
     * Adds an adapter to the current rule that subtracts the passed in value from the source field and stores it in the output field.Note: This is an adapter method and cannot be used on its own. Adapter methods work in conjunction with theaddRule() method. They define adaptions to apply to the output field defined by the addRule() method such as formatting, rounding, and applying patterns.
     * 
     * @operand Value to subtract from the source data element.
     * @example
     * var transformerRuleList = new sn_tfrm.TransformerRuleList()
     *   .fromJSON()
     *   .setName('Stock 05182019 JSON')
     *   .addRule('ticker', '$.quote.symbol') 
     *   .addRule('change_percentage', '$.quote.changePercent') 
     *   .thenMultiply('100') 
     *   .thenRoundDown('0') 
     *   .addRule('close_price', '$.quote.close') 
     *   .thenAdaptCurrency('USD', false) 
     *   .addRule('trade_price', '$.quote.current_price') 
     *   .addMultiply('$.quote.trade_quantity')
     *   .thenSubtract('$.quote.discount_dollars'); 
     * 
     * @returns Current TransformerRuleList object.
     */
    thenSubtract(operand: Number): Object;

}


declare namespace sn_clotho {

    /**
     * Use the TransformPart class to specify details of the transform to be done. The TransformPart class can be used in scoped and global server scripts. When using the TransformPart class, use the sn_clotho namespace identifier. * * There is no constructor for this class. TransformPart objects are returned by many Transformer and TransformPart methods. * * The methods of this class define the transforms to be done. The actual transformation is done when the execute() method is called on the Transformer object. * * The order the TransformPart methods are called is important. The metric() method must be called before calling a transform method. You cannot use the metric() or groupBy() methods after calling a transform method. Intermediate transforms are not returned in a result unless the collect() method is called for the intermediate result you want. * * This class is part of the MetricBase application.
     * 
     * 
     */
    declare class TransformPart {



        /**
         * Add the specified number to the value in each time stamp.
         * 
         * @constant The number to add to the value in each time stamp.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        add(constant: Number): sn_clotho.TransformPart;

        /**
         * Aggregate the selected metric series into one series containing the average value for each time stamp.
         * 
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        avg(): sn_clotho.TransformPart;

        /**
         * Create a result set that for each time stamp returns specified number of bottom values. This method results in 'count' number of series. Each value retains the label of its source series.
         * 
         * @count The number of series to return. The series are labeled 0 to count - 1.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        bottom(count: Number): sn_clotho.TransformPart;

        /**
         * Replace the value in any time stamp that is greater than the specified value with the specified value.
         * 
         * @ceiling The maximum allowed value for any time stamp.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        ceil(ceiling: Number): sn_clotho.TransformPart;

        /**
         * Mark this transform for collection.Transforms that are part of a chain, but not the last transform, are by default not collected. A collected transform is returned as part of the transform result.
         * 
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        collect(): sn_clotho.TransformPart;

        /**
         * Aggregate the selected metric series into one series containing the number of values for each time stamp.
         * 
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        count(): sn_clotho.TransformPart;

        /**
         * Divide the value in each time stamp by the specified number.
         * 
         * @constant The number by which to divide the value of each time stamp.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        div(constant: Number): sn_clotho.TransformPart;

        /**
         * Create a series using the specified aggregator for the specified time.
         * 
         * @aggregator Can be: AVG CHISQUARE LAST MAX MEDIAN MIN STDDEV For definitions of these options, see MetricBase transforms. .
         * @duration The time period for doing
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        filter(aggregator: Object, duration: Object): sn_clotho.TransformPart;

        /**
         * Replace the value in any time stamp that is less than the specified value with the specified value.
         * 
         * @floor The minimum value for any time stamp.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        floor(floor: Number): sn_clotho.TransformPart;

        /**
         * Create series made up of the value that the specified percentage of values is below. Returns a series for each fraction in the specified array.The value in a time stamp in a returned series is the value at which the specified fraction of the samples for that time stamp is below. For example, if the fraction is 0.5, then the value in the time stamp is the value where half the values in the input series are below (median).
         * 
         * @fractions The fractions to use on the input series.
         * @example
         * // returns a single series containing the median for each time stamp, which
         * // means that half a time stamp's values are below the returned value 
         * fractiles([.5]) 
         * // returns four series, one series for each of the 25%, 50%, 75%, and 100% quartiles 
         * fractiles([.25, .5, .75, 1])
         * // returns the median, 95% percentile, the max value
         * fractiles([.50, .95, 1]) 
         * @returns A TransformPart object that can be used to specify transform characteristics. Contains one series for each fraction specified.
         */
        fractiles(fractions: Arrayofnumbers): sn_clotho.TransformPart;

        /**
         * Return the part of the result relevant to this transform.The collect() method must be called before the execute() method, and the execute() method must be called before calling the getResult() method.
         * 
         * @example
         * var t = new sn_clotho.Transformer(drones);
         * t.metric("mb_demo_mt_altitude");
         * var avgTform = t.avg();
         * t.execute();
         * var avgTformResult = avgTform.getResult();
         * @returns Contains the transform results associated with this part of the transform.
         */
        getResult(): sn_clotho.TransformResult;

        /**
         * Specify a field to be used to group the data.The groupBy() method cannot be called after a transform has been run.
         * 
         * @field A field in the table to be used to group the transform results.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        groupBy(field: String): sn_clotho.TransformPart;

        /**
         * Create a data value for a NaN data item by interpolating from adjacent data values.
         * 
         * @count Specifies the number of data samples in each direction to check for a non NaN value. If if a non NaN value is not found, NaN is used.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        interpolate(count: Object): sn_clotho.TransformPart;

        /**
         * Perform an Interquartile range transform.Creates a result set of four series. IQR, the median of all entries IQR range, below Q1-1.5IQR, or above Q3+1.5IQR Q1, the median of the smallest half of entries Q3, the median of the largest half of entries 
         * 
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        iqr(): sn_clotho.TransformPart;

        /**
         * Add a label for the resulting series.
         * 
         * @label The label for the transform results.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        label(label: String): sn_clotho.TransformPart;

        /**
         * Returns at most the specified number of values, starting at the most recent non-NaN value.
         * 
         * @count A number of time stamps.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        limit(count: Object): sn_clotho.TransformPart;

        /**
         * Run a logarithm on the value in each time stamp where the result is the log of the specified base for the time stamp value.
         * 
         * @base The base for the logarithm calculation.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        log(base: Number): sn_clotho.TransformPart;

        /**
         * Returns a series with the maximum value for each time stamp.
         * 
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        max(): sn_clotho.TransformPart;

        /**
         * Create a series containing the median of values for each time stamp across a set of series.If there are n series in the TranformPart object, then if n is odd, the (n / 2 + 1) value for a time stamp is the median. If n is even, the average of the (n / 2) and (n / 2 + 1) values for a time stamp is the median.
         * 
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        median(): sn_clotho.TransformPart;

        /**
         * Specify the metric field to be used in the transform.You can specify multiple metrics to be used in the transform. The metric() method cannot be called after the transform has been run.
         * 
         * @metric Name of the metric field.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        metric(metric: String): sn_clotho.TransformPart;

        /**
         * Returns a series with the minimum value for each time stamp.
         * 
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        min(): sn_clotho.TransformPart;

        /**
         * Multiply the value in each time stamp by the specified number.
         * 
         * @constant The number by which to multiply the value of each time stamp.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        mul(constant: Number): sn_clotho.TransformPart;

        /**
         * Partition the series into intervals of the same duration.
         * 
         * @aggregator The aggregator to use. Can be min, max, avg, or last.
         * @duration The interval length.
         * @base The zero offset for partitioning. For example, if you partition by day (24h), then set the base to Monday at midnight in your time zone. If you partition by 30 days, then set the base to 1st day of the most recent month.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        partition(aggregator: String, duration: GlideDateTimeoranISO8601formattedstring, base: GlideDateTimeoranISO8601formattedstring): sn_clotho.TransformPart;

        /**
         * Specify the number of data points to include in the result.Aligns a series with a fixed number of data points in the given range. If the original series has more data points than specified, multiple values are averaged. If the original series has fewer data points than specified, data points are added by interpolating data points between existing data points.You can use the resample() method to reduce the number of samples in the result to more closely match the number of samples you are going to display.
         * 
         * @count The number of samples to include in the result.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        resample(count: Number): sn_clotho.TransformPart;

        /**
         * Specify the minimum and maximum number of samples to include in the result.This method is useful when you are showing series with different time periods (granularities).This method determines the average number of points per series and if that fits between the specified minimum and maximum, each series is resampled to that average number of points. If the calculated average is greater than the maximum specified or smaller than the minimum specified, the specified maximum or minimum is used.
         * 
         * @min The minimum number of samples to include in the result. If not enough samples are available, interpolation is used to create samples.
         * @max The maximum number of samples to include in the result.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        resample(min: Number, max: Number): sn_clotho.TransformPart;

        /**
         * Specify an aggregator to use to create a result set over the specified duration. The aggregator can be LAST, AVG, MIN, or MAX.Resamples the underlying data to the requested period. When the time series is stored at a 1 minute interval and resample(AVG, new GlideDuration("1:00")) is called, the result will have one data point at every hour reflecting the average of the previous 60 values. When the period requested is smaller than the period of the data, interpolation is used to calculate the intervening data points. You can use the resample() method to reduce the number of samples in the result to more closely match the number of samples you are going to display.
         * 
         * @aggregator Can be LAST, AVG, MIN, or MAX.
         * @duration The time period for the result set.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        resample(aggregator: String, duration: GlideDuration): sn_clotho.TransformPart;

        /**
         * Specify an aggregator to use to create a result set of the specified size. The aggregator can be LAST, AVG, MIN, or MAX.You can use the resample() method to reduce the number of samples in the result to more closely match the number of samples you are going to display.
         * 
         * @aggregator Can be LAST, AVG, MIN, or MAX.
         * @numValues The number of samples to include in the result set.When the number of values requested is greater than the number of values in the data for the requested time period, interpolate() is used to add values between existing points to reach the requested number of values.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        resample(aggregator: String, numValues: Number): sn_clotho.TransformPart;

        /**
         * Round the value in each time stamp to the specified precision.Performs this calculation on each value.(v / precision) * precision
         * 
         * @precision The value to be used in the rounding calculation.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        round(precision: Number): sn_clotho.TransformPart;

        /**
         * Create a series containing the standard deviation of values for each time stamp across a set of series.
         * 
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        stddev(): sn_clotho.TransformPart;

        /**
         * Subtract the specified number from the value in each time stamp.
         * 
         * @constant The number to subtract from the value in each time stamp.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        sub(constant: Object): sn_clotho.TransformPart;

        /**
         * Aggregate the selected metric series into one series containing the sum of all values for each time stamp.
         * 
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        sum(): sn_clotho.TransformPart;

        /**
         * Create a result set that for each time stamp returns the specified number of top values. This method results in 'count' number of series. Each value retains the label of its source series.
         * 
         * @count The number of series to return. The series are labeled 0 to count - 1.
         * @returns A TransformPart object that can be used to specify transform characteristics.
         */
        top(count: Number): sn_clotho.TransformPart;

    }

}
declare namespace sn_clotho {

    /**
     * Provides the result of a transformation run on time-series data. The TransformResult class can be used in scoped and global server scripts. When using the Transformer class, use the sn_clotho namespace identifier. * * There is no constructor for this class. TransformResult objects are returned by many TransformPart methods. * * This class is part of the MetricBase application.
     * 
     * 
     */
    declare class TransformResult {



        /**
         * Returns an array of Data objects. Returns an error if no group was specified for the transform.
         * 
         * @returns An array of Data objects, with each object corresponding to a group.
         */
        byGroup(): Array<any>;

        /**
         * Returns the transformed data with the specified label.
         * 
         * @label The label that identifies the data to be retrieved.
         * @returns The Data object with the transform results.
         */
        getByLabel(label: String): sn_clotho.Data;

        /**
         * Returns a single Data object, or null if the result is empty.
         * 
         * @returns The Data object with the transform results.
         */
        getData(): sn_clotho.Data;

        /**
         * Returns the transformed data as an array. This method turns a Data object into an array.
         * 
         * @returns The Data object formatted as an array.
         */
        toArray(): Array<any>;

    }

}
declare namespace sn_uc {

    /**
     * UserCriteria API enables you to create, modify, or delete user criteria records using scripts. To use this class in a scoped application, use the sn_uc namespace identifier. The User Criteria Scoped API plugin (ID: com.glideapp.user_criteria.scoped.api) should be enabled to access the UserCriteria API. 
     * 
     * 
     */
    declare class UserCriteria {



        /**
         * Creates an instance of the UserCriteria class with the specified sys_id.
         * 
         * @sys_id sys_id of the user criteria.
         * @example
         * var uc = new sn_uc.UserCriteria("31bea3d53790200044e0bfc8bcbe5dec");
         */
        constructor(sys_id: String);

        /**
         * Creates an instance of the UserCriteria class.
         * 
         * @example
         * var uc = new sn_uc.UserCriteria();
         */
        constructor();

        /**
         * Creates a user criteria with specified values in the user_criteria table. Values specified in columnValues override the values provided via setters.
         * 
         * @columnValues Key and value pairs for a column and its value.
         * @standardUpdate Set to true to enable the running of engines and workflow.
         * @example
         * 
         * var uc = new sn_uc.UserCriteria(); 
         * uc.setCompanies("31bea3d53790200044e0bfc8bcbe5dec,0c441abbc6112275000025157c651c89”);
         * uc.setActive(true); 
         * uc.setUsers("31bea3d53790200044e0bfc8bcbe5dec,0c441abbc6112275000025157c651c89");
         * var UserCriteriaId = UserCriteria.create();
         * gs.info(UserCriteriaId);
         * 
         * @returns sys_id of the created user criteria.
         */
        create(columnValues: Object, standardUpdate: Boolean): String;

        /**
         * Deletes the current user criteria.
         * 
         * @example
         * var uc = new sn_uc.UserCriteria("31bea3d53790200044e0bfc8bcbe5dec");
         * uc.deleteRecord();
         * @returns If true, the user criteria is deleted.If false, no user criteria is found to delete.
         */
        deleteRecord(): Boolean;

        /**
         * Displays the mapping for the attribute and value pairs of the catalog item.
         * 
         * @columns Array of catalog item attributes.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.read({"name", "applies_to"});
         * @returns Mapping for the attribute and value pairs of the catalog item.
         */
        read(columns: String): Object;

        /**
         * Specifies if the user criteria is active.
         * 
         * @active If true, the user criteria is active. If false, the user criteria is inactive.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setActive(true); 
         * 
         */
        setActive(active: Boolean);

        /**
         * Specifies if the user criteria has an advanced script.
         * 
         * @advanced If true, the user criteria has an advanced script.If false, the user criteria does not have an advanced script.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setAdvanced(true); 
         * 
         */
        setAdvanced(advanced: Boolean);

        /**
         * Sets the company property for the user criteria.
         * 
         * @companies Comma-separated list of the company sys_ids to be set for the user criteria.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setCompanies("31bea3d53790200044e0bfc8bcbe5dec,0c441abbc6112275000025157c651c89"); 
         * 
         */
        setCompanies(companies: String);

        /**
         * Sets the department property for the user criteria.
         * 
         * @departments Comma-separated list of the department sys_ids to be set for the user criteria.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setDepartments("31bea3d53790200044e0bfc8bcbe5dec,0c441abbc6112275000025157c651c89"); 
         * 
         */
        setDepartments(departments: String);

        /**
         * Sets the group property for the user criteria.
         * 
         * @groups Comma-separated list of the group sys_ids to be set for the user criteria.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setGroups("31bea3d53790200044e0bfc8bcbe5dec,0c441abbc6112275000025157c651c89"); 
         * 
         */
        setGroups(groups: String);

        /**
         * Sets the location property for the user criteria.
         * 
         * @locations Comma-separated list of the location sys_ids to be set for the user criteria.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setLocations("31bea3d53790200044e0bfc8bcbe5dec,0c441abbc6112275000025157c651c89"); 
         * 
         */
        setLocations(locations: String);

        /**
         * Sets the match_all property for the user criteria.
         * 
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setMatchAll(true); 
         * 
         */
        setMatchAll();

        /**
         * Sets the name property for the user criteria.
         * 
         * @name Name of the user criteria.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setName("Property1"); 
         * 
         */
        setName(name: String);

        /**
         * Sets the role property for the user criteria.
         * 
         * @roles Comma-separated list of the role sys_ids to be set for the user criteria.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setRoles("31bea3d53790200044e0bfc8bcbe5dec,0c441abbc6112275000025157c651c89"); 
         * 
         */
        setRoles(roles: String);

        /**
         * Sets the script for the user criteria.
         * 
         * @script Script to be set for the advanced user criteria.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setScript("function scriptTest() {
         *   var retVal;
         *   if (gs.getUser().getRecord().getDisplayValue('department') == 'Product Management') {
         *       retVal = true;
         *   } else {
         *       retVal = false;
         *   }
         *   return retVal;
         * }"); 
         * 
         */
        setScript(script: String);

        /**
         * Sets the user property for the user criteria.
         * 
         * @users Comma-separated list of the user sys_ids to be set for the user criteria.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.setUsers("31bea3d53790200044e0bfc8bcbe5dec,0c441abbc6112275000025157c651c89"); 
         * 
         */
        setUsers(users: String);

        /**
         * Updates the current catalog item with the specified values.
         * 
         * @columnValues Mapping for the column name and the value pairs.
         * @reason Reason for updating the catalog item.
         * @example
         * var uc = new sn_uc.UserCriteria();
         * uc.update("name": "Updated name", "The existing name is not relevant. Setting a relevant name"); 
         * 
         * @returns Returns the sys_id of the created user criteria.
         */
        update(columnValues: Object, reason: String): String;

    }

}
declare namespace sn_uc {

    /**
     * UserCriteriaLoader API enables you to get the user criteria associated with a specific user, or a user associated with a specific linkTable. To use this class in a scoped application, use the sn_uc namespace identifier. The User Criteria Scoped API plugin (ID: com.glideapp.user_criteria.scoped.api) should be enabled to access the UserCriteriaLoader API. 
     * 
     * 
     */
    declare class UserCriteriaLoader {



        /**
         * Returns all user criteria associated with the logged in user.
         * 
         * @example
         * var result = new sn_uc.UserCriteriaLoader.getAllUserCriteria();
         * gs.info(result);
         * @returns An array list containing the sys_ids of the user criteria associated with the user.
         */
        getAllUserCriteria(): ArrayList<String>;

        /**
         * Returns all user criteria associated with the specified user.
         * 
         * @userId sys_id of the user.
         * @example
         * var result = new sn_uc.UserCriteriaLoader.getAllUserCriteria('62826bf03710200044e0bfc8bcbe5df1');
         * gs.log(result);
         * @returns An array list containing the sys_ids of the user criteria associated with the specified user.
         */
        getAllUserCriteria(userId: String): ArrayList<String>;

        /**
         * Returns the user criteria associated with the specified linkTable for the logged in user.
         * 
         * @linkTable Mtom link table between the record and the Available For or Not Available For User Criteria.
         * @example
         * var result = new sn_uc.UserCriteriaLoader.getUserCriteria('sc_cat_item_user_criteria_mtom');
         * gs.log(result);
         * @returns An array list containing the sys_id of the user criteria associated with the logged in user for the specified link table.
         */
        getUserCriteria(linkTable: String): ArrayList<String>;

        /**
         * Returns the user criteria of the specified user and the linkTable.
         * 
         * @userId sys_id of the user.
         * @linkTable Mtom link table between the record and the Available For or Not Available For User Criteria.
         * @example
         * var result = new sn_uc.UserCriteriaLoader.getUserCriteria('62826bf03710200044e0bfc8bcbe5df1',             
         * 'sc_cat_item_user_criteria_mtom');
         * gs.log(result);
         * @returns An array list containing the sys_id of the user criteria associated with the specified user and link table.
         */
        getUserCriteria(userId: String, linkTable: String): ArrayList<String>;

    }

}
declare namespace sn_sc {

    /**
     * VariablePoolQuestionSetJS API enables you to use Variable Pool Question Set. To use this class in a scoped application, use the sn_sc namespace identifier. The Service Catalog Scoped API plugin (com.glideapp.servicecatalog.scoped.api) that is enabled by default is required to access the VariablePoolQuestionSetJS API. 
     * 
     * 
     */
    declare class VariablePoolQuestionSetJS {



        /**
         * Creates an instance of the VariablePoolQuestionSet class.
         * 
         * @example
         * var variablePool=new sn_sc.VariablePoolQuestionSetJS();
         */
        constructor();

        /**
         * Returns the array of questions associated with the cart item ids specified.
         * 
         * @example
         * var cart=new sn_sc.VariablePoolQuestionSetJS();	
         * 	cart.setCartID("9bf16afb87110300318d05a888cb0b49");
         * 	cart.load();
         * 	console.log(cart.getFlatQuestions());
         * @returns Object pointing to the current cart details.
         */
        getFlatQuestions(): Object;

        /**
         * Loads the question set.
         * 
         * @example
         * var cart=new sn_sc.VariablePoolQuestionSetJS();	
         * 	cart.load();
         */
        load();

        /**
         * Sets the cart item ids of the variable pool.
         * 
         * @id  
         * @example
         * var cart=new sn_sc.VariablePoolQuestionSetJS();	
         * 	cart.setCartID("9bf16afb87110300318d05a888cb0b49");
         */
        setCartID(id: String);

    }

}/**
 * The scoped Workflow API provides methods that can be used in an activity definition script. There are no constructors for creating an instance of a scoped workflow object. Instead, use the global workflow object available in activity scripts. This workflow object is available in any script location inside a workflow.
 * 
 * 
 */
declare class Workflow {

    /** Returns the workflow variables. */
    inputs: Object
    /** Returns the workflow's result. */
    result: String


    /**
     * Adds a debug message to the log.
     * 
     * @message The message to add to the log.
     * @args Arguments to add to the message.
     * @example
     * var loggedMessage = workflow.debug("All is well");
     * @returns The message added to the log.
     */
    debug(message: String, args: Object): String;

    /**
     * Adds an error message to the log.
     * 
     * @message The message to add to the log.
     * @args Arguments to add to the message.
     * @example
     * var loggedMessage = workflow.error("An error has occurred. ");
     * @returns The logged message
     */
    error(message: String, args: Object): String;

    /**
     * Returns the specified variable's value.
     * 
     * @name The variable name
     * @example
     * var value = workflow.getVariable("task");
     * @returns The variable's value
     */
    getVariable(name: String): Object;

    /**
     * Adds an informational message to the log.
     * 
     * @message The message to add to the log.
     * @args Arguments to add to the message.
     * @example
     * var loggedMessage = workflow.info("All is well");
     * @returns The message that is logged.
     */
    info(message: String, args: Object): String;

    /**
     * Returns the workflow name.
     * 
     * @example
     * var name = workflow.name();
     * @returns The workflow name
     */
    name(): String;

    /**
     * Removes the specified variable from the workflow.
     * 
     * @name The variable name
     * @example
     * var value = workflow.removeVariable("task");
     */
    removeVariable(name: String);

    /**
     * Returns the workflow's scratchpad object.
     * 
     * @example
     * var scratchpad = workflow.scratchpad();
     * @returns The scratchpad object.
     */
    scratchpad(): Object;

    /**
     * Sets the workflow's result.
     * 
     * @result The workflow's result
     * @example
     * workflow.setResult("Success");
     */
    setResult(result: String);

    /**
     * Sets the specified variable to the specified value.
     * 
     * @name The variable name
     * @value The value to be assigned to the variable.
     * @example
     * workflow.setVariable("task", "terrible");
     */
    setVariable(name: String, value: Object);

    /**
     * Adds a warning message to the log.
     * 
     * @message The message to add to the log.
     * @args Arguments to add to the message.
     * @example
     * var loggedMessage = workflow.warn("Check your permissions.");
     * @returns The logged message
     */
    warn(message: String, args: Object): String;

}

/**
 * XMLDocument2 is a JavaScript Object wrapper for parsing and extracting XML data from an XML string. Use this JavaScript class to create an object from an XML string, usually a return value from a web-service invocation, or the XML payload of ECC Queue. Using the XMLDocument2 object in a JavaScript business rule lets you query values from the XML elements and attributes directly. * * An XML string has a tree structure, and the parts of the structure are called nodes. An XMLDocument2 object deals with two node types, element, and document element. An element node is a node with a name and possibly attributes and child nodes. A document-element node is the root node of the XML tree. It is the only node without a parent node.
 * 
 * 
 */
declare class XMLDocument2 {



    /**
     * Creates an XMLDocument2 object.
     * 
     */
    constructor();

    /**
     * Creates an XMLDocument2 object from an attachment stream.
     * 
     * @inputStream The input stream the XMLDocument2 object encapsulates.
     */
    constructor(inputStream: GlideScriptableInputStream);

    /**
     * Creates and adds an element node to the current node. The element name is the string passed in as a parameter. The new element has no text child nodes.
     * 
     * @name The new element's name.
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString); 
     * xmlDoc.createElement("new2"); 
     *  
     * gs.info(xmlDoc);
     * @returns Current XML node.
     */
    createElement(name: String): XMLNode;

    /**
     * Creates and adds an element node with a text child node to the current node.
     * 
     * @name Name of the element to add.
     * @value Element's text value.
     * @example
     * var xmlString = "&lt;test&gt;" +
     *     "  &lt;one&gt;" +
     *     "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *     "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *     "    &lt;two&gt;another&lt;/two&gt;" +
     *     "  &lt;/one&gt;" +
     *     "  &lt;number&gt;1234&lt;/number&gt;" +
     *     "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString); 
     * xmlDoc.createElementWithTextValue("new", "test");
     * gs.info(xmlDoc);
     * @returns Current XML node.
     */
    createElementWithTextValue(name: String, value: String): XMLNode;

    /**
     * Gets the document element node of the XMLdocument2 object. The document element node is the root node.
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * //returns the root node of the document tree.
     * var rootNode = xmlDoc.getDocumentElement();
     * gs.info(rootNode.getTextContent());
     * @returns The document element.
     */
    getDocumentElement(): XMLNode;

    /**
     * Gets the first node in the specified XPATH.
     * 
     * @xPath The XPATH.
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var foo = xmlDoc.getFirstNode('/test/one/two');
     * gs.info(foo.getTextContent());
     * @returns The first node.
     */
    getFirstNode(xPath: String): XMLNode;

    /**
     * Gets the node after the specified node.
     * 
     * @current The current node.
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var foo = xmlDoc. getFirstNode('/test/one/two');
     * var foo2 = xmlDoc.getNextNode(foo);
     * gs.info(foo.getTextContent());
     * gs.info(foo2.getTextContent());
     * @returns The next node.
     */
    getNextNode(current: Object): XMLNode;

    /**
     * Gets the node specified in the xpath.
     * 
     * @xPath XPath of the node to obtain.
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode("/test/one/two");
     * gs.info(node);
     * @returns Current XML node.
     */
    getNode(xPath: String): XMLNode;

    /**
     * Gets all the text child nodes from the node referenced in the specified XPath.
     * 
     * @xPath XPath of the text to obtain.
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString); 
     * gs.info(xmlDoc.getNodeText("//two"));
     * @returns Text children in the XPath.
     */
    getNodeText(xPath: String): String;

    /**
     * Parses the XML string and loads it into the XMLDocument2 object.
     * 
     * @xmlDoc The document to parse.
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString); 
     * var rootNode = xmlDoc.getDocumentElement();
     * @returns Flag that indicates whether the content was parsed.
     */
    parseXML(xmlDoc: String): Boolean;

    /**
     * Makes the node passed in as a parameter the current node.
     * 
     * @element The element node to set as the current node.
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * //returns the root node of the document tree.
     * var rootNode = xmlDoc.getDocumentElement(); //returns org.w3c.dom.Element
     * // sets the root node as the current element
     * xmlDoc.setCurrentElement(rootNode);
     */
    setCurrentElement(element: XMLNode);

    /**
     * When set to true, the XMLDocument2 object processes the document with XML namespaces.If you don't set this, an XML document with namespaces won't be enumerated correctly, and an XPath search would fail. 
     * 
     * @aware When true, the XMLDocument2 object processes the document with XML namespaces.
     */
    setNamespaceAware(aware: Boolean);

    /**
     * Returns a string containing the XML.
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * gs.info(xmlDoc.toString());
     * @returns A string containing the XML.
     */
    toString(): String;

}

/**
 * The scoped XMLNode API allows you to query values from XML nodes. XMLNodes are extracted from XMLDocument2 objects, which contain XML strings. There are no constructors for creating a stand alone instance of an XMLNode object. Instead, use the createElement() method of XMLDocument2, which adds a node to an existing document.
 * 
 * 
 */
declare class XMLNode {



    /**
     * Gets the value of the attribute.
     * 
     * @attribute Name of the attribute.
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode('//two');
     * gs.info(node.getAttribute('att'));
     * @returns The attribute's value.
     */
    getAttribute(attribute: String): String;

    /**
     * Returns an object containing the node's attributes as properties with values.
     * 
     * @returns Contains name-value pairs where the name is the attribute and the value is the attribute's value.
     */
    getAttributes(): Object;

    /**
     * Gets a XMLNodeIterator object that can be used to walk through the list of child nodes.
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode('//one');
     * var iter= node.getChildNodeIterator();
     * gs.info(iter.hasNext());
     * @returns The node iterator object.
     */
    getChildNodeIterator(): XMLNodeIterator;

    /**
     * Gets the node's first child node.
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "&lt;one&gt;" +
     *                 "&lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "&lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "&lt;two&gt;another&lt;/two&gt;" +
     *                 "&lt;/one&gt;" +
     *                 "&lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode('//one');
     * gs.info(node.getFirstChild());
     * @returns The node's first child node.
     */
    getFirstChild(): XMLNode;

    /**
     * Gets the node's last child node.
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "&lt;one&gt;" +
     *                 "&lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "&lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "&lt;two&gt;another&lt;/two&gt;" +
     *                 "&lt;/one&gt;" +
     *                 "&lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode('//one');
     *  
     * gs.info(node.getLastChild());
     * @returns The node's last child.
     */
    getLastChild(): XMLNode;

    /**
     * Gets the node's name. A node's name is determined by the node type. A document-element node's name is #document. A text node's name is #text. An element node's name is the element's name.
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode('//two');
     * gs.info(node.getNodeName());
     * @returns The node's name.
     */
    getNodeName(): String;

    /**
     * Gets the node's value. A node's value is determined by the node type. Element and document-element nodes return null.
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode('//two');
     * gs.info(node.getNodeValue());
     * @returns The node's value.
     */
    getNodeValue(): String;

    /**
     * Gets the text content of the current node. The text content of a node consists of all the node's child text nodes
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmldoc = new XMLDocument2();
     * xmldoc.parseXML(xmlString);
     * var node = xmldoc.getNode('//one/two');
     * gs.info(node.getTextContent());
     * @returns The text content of the current node.
     */
    getTextContent(): String;

    /**
     * Determines if the node has the specified attribute.
     * 
     * @attribute The name of the attribute to check.
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode('//two');
     * gs.info(node.hasAttribute('att'));
     * @returns True if the node has the attribute.
     */
    hasAttribute(attribute: String): Boolean;

    /**
     * Returns the string value of the current node.
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode('//one');
     * gs.info(node.toString());
     * @returns The string value of the current node.
     */
    toString(): String;

}

/**
 * The scoped XMLNodeIterator class allows you to iterate through a node of a XML document. There are no constructors for creating a stand alone instance of a XMLNodeIterator object. To create a XMLNodeIterator object use the getChildNodeIterator() method of the XMLNode object.
 * 
 * 
 */
declare class XMLNodeIterator {



    /**
     * Returns true if the iteration has more elements.
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode('//one');
     * var iter= node.getChildNodeIterator();
     * gs.info(iter.hasNext());
     * @returns True if the iteration has more elements.
     */
    hasNext(): Boolean;

    /**
     * Gets the next element in the iteration. The returned element may be a #text node for the spaces/tabs if XML is "pretty formatted".
     * 
     * @example
     * var xmlString = "&lt;test&gt;" +
     *                 "  &lt;one&gt;" +
     *                 "    &lt;two att=\"xxx\"&gt;abcd1234&lt;/two&gt;" +
     *                 "    &lt;three boo=\"yah\" att=\"yyy\"&gt;1234abcd&lt;/three&gt;" +
     *                 "    &lt;two&gt;another&lt;/two&gt;" +
     *                 "  &lt;/one&gt;" +
     *                 "  &lt;number&gt;1234&lt;/number&gt;" +
     *                 "&lt;/test&gt;";
     * var xmlDoc = new XMLDocument2();
     * xmlDoc.parseXML(xmlString);
     * var node = xmlDoc.getNode('//one');
     * var iter= node.getChildNodeIterator();
     * while(iter.hasNext()) {
     *    var n = iter.next();
     *    gs.info('Node name: ' +  n.getNodeName());
     *    gs.info('Node value: ' +  n.getNodeValue());
     * }
     * @returns The next element in the iteration.
     */
    next(): XMLNode;

}


/**
 * A JSON String of Data will be returned. Recommend logging value to see content.
 */

declare interface JSONString {}
declare class RESTResponse extends sn_ws.RESTResponseV2{}
declare class gs extends GlideSystem{}
declare class SOAPResponse extends sn_ws.SOAPResponseV2{}
declare class $sp extends GlideSPScriptable{}
declare class GlideRecordSecure extends GlideRecord{}