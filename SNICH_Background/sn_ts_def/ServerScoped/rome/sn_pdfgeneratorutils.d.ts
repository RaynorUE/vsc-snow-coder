declare namespace sn_pdfgeneratorutils {

	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.  
	 *   
	 * This API is a component used with the [Document API](dev.do#!/reference/api/rome/server/ "The Document API provides methods to initialize a PDF, add content, and close the PDF. After adding content, the document can be attached to a target record.") to generate a PDF.
	 * 
	 */
	class Cell {
	
		/**
		 *
		 * @param {number} rowspan Number of rows this cell is to occupy.
		 * 
		 * Default: 0
		 * @param {number} colspan Number of columns this cell is to occupy.
		 * 
		 * Default: 0
		 *
		 */
		constructor(rowspan: number, colspan: number)
		
		/**
		 *
		 * Adds an image to a table cell.
		 *
		 * @param {{[fieldName: string]: string}} image Image to add to a table cell.
		 *
		 * @returns {void} 
		 */
		addImage(image: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Adds text to a table cell.
		 *
		 * @param {{[fieldName: string]: string}} paragraph Text to add to a table cell.
		 *
		 * @returns {void} 
		 */
		addParagraph(paragraph: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Applies a predefined style to table cells.
		 *
		 * @param {{[fieldName: string]: string}} style Style to apply to this element.
		 *
		 * @returns {void} 
		 */
		addStyle(style: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Adds a table to a cell.
		 *
		 * @param {{[fieldName: string]: string}} table Table to add to a cell.
		 *
		 * @returns {void} 
		 */
		addTable(table: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Gets the number of the column in which the cell is located.
		 *
		 *
		 * @returns {number} Number of the column position for a cell.
		 */
		getColumn(): number
		
		/**
		 *
		 * Gets the number of rows in which the cell is located.
		 *
		 *
		 * @returns {number} Number of the row position for a cell.
		 */
		getRow(): number
		
		/**
		 *
		 * Specifies a background color for the cell.
		 *
		 * @param {{[fieldName: string]: string}} color Background color.
		 *
		 * @returns {void} 
		 */
		setBackGroundColor(color: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets a border for all four edges of a cell.
		 *
		 * @param {number} width Cell border width in points.
		 *
		 * @returns {void} 
		 */
		setBorder(width: number): void
		
		/**
		 *
		 * Sets a border for the lower limit of a cell.
		 *
		 * @param {number} width Cell border width in points.
		 *
		 * @returns {void} 
		 */
		setBorderBottom(width: number): void
		
		/**
		 *
		 * Sets a border for the left limit of a cell.
		 *
		 * @param {number} width Cell border width in points.
		 *
		 * @returns {void} 
		 */
		setBorderLeft(width: number): void
		
		/**
		 *
		 * Sets a border for the right limit of a cell.
		 *
		 * @param {number} width Cell border width in points.
		 *
		 * @returns {void} 
		 */
		setBorderRight(width: number): void
		
		/**
		 *
		 * Sets a border for the upper limit of a cell.
		 *
		 * @param {number} width Cell border width in points.
		 *
		 * @returns {void} 
		 */
		setBorderTop(width: number): void
		
		/**
		 *
		 * Sets a colored border for all four edges of a cell.
		 *
		 * @param {{[fieldName: string]: string}} color Cell border color.
		 * @param {number} width Cell border width in points.
		 *
		 * @returns {void} 
		 */
		setColoredBorder(color: {[fieldName: string]: string}, width: number): void
		
		/**
		 *
		 * Sets a colored border for the lower limit of a cell.
		 *
		 * @param {{[fieldName: string]: string}} color Cell border color.
		 * @param {number} width Cell border width in points.
		 *
		 * @returns {void} 
		 */
		setColoredBorderBottom(color: {[fieldName: string]: string}, width: number): void
		
		/**
		 *
		 * Sets a colored border for the left limit of a cell.
		 *
		 * @param {{[fieldName: string]: string}} color Cell border color.
		 * @param {number} width Cell border width in points.
		 *
		 * @returns {void} 
		 */
		setColoredBorderLeft(color: {[fieldName: string]: string}, width: number): void
		
		/**
		 *
		 * Sets a colored border for the right limit of a cell.
		 *
		 * @param {{[fieldName: string]: string}} color Cell border color.
		 * @param {number} width Cell border width in points.
		 *
		 * @returns {void} 
		 */
		setColoredBorderRight(color: {[fieldName: string]: string}, width: number): void
		
		/**
		 *
		 * Sets a colored border for the upper limit of a cell.
		 *
		 * @param {{[fieldName: string]: string}} color Cell border color.
		 * @param {number} width Cell border width in points.
		 *
		 * @returns {void} 
		 */
		setColoredBorderTop(color: {[fieldName: string]: string}, width: number): void
		
		/**
		 *
		 * Sets the height of a cell.
		 *
		 * @param {number} value Cell height in points.
		 *
		 * @returns {void} 
		 */
		setHeight(value: number): void
		
		/**
		 *
		 * Sets the horizontal alignment for this cell.
		 *
		 * @param {string} alignment Horizontal alignment setting.
		 * 
		 * Valid values:
		 * 
		 * *   center: Align contents to the center.
		 * *   left: Align contents to the left.
		 * *   right: Align contents to the right.
		 *
		 * @returns {void} 
		 */
		setHorizontalAlignment(alignment: string): void
		
		/**
		 *
		 * Sets the maximum height of a cell.
		 *
		 * @param {number} value Maximum cell height in points.
		 *
		 * @returns {void} 
		 */
		setMaxHeight(value: number): void
		
		/**
		 *
		 * Sets the maximum width of a cell.
		 *
		 * @param {number} value Maximum cell width in points.
		 *
		 * @returns {void} 
		 */
		setMaxWidth(value: number): void
		
		/**
		 *
		 * Sets the minimum height of a cell.
		 *
		 * @param {number} value Minimum cell height in points.
		 *
		 * @returns {void} 
		 */
		setMinHeight(value: number): void
		
		/**
		 *
		 * Sets the minimum width of a cell.
		 *
		 * @param {number} value Minimum cell width in points.
		 *
		 * @returns {void} 
		 */
		setMinWidth(value: number): void
		
		/**
		 *
		 * Sets the opacity of cell content, borders, and background.
		 *
		 * Note: This setting affects all child elements of the cell.
		 *
		 * @param {number} opacity Float decimal value from 0 through 1, in which 0 is transparent and 1 is fully opaque.
		 * 
		 * Default: 0
		 *
		 * @returns {void} 
		 */
		setOpacity(opacity: number): void
		
		/**
		 *
		 * Sets the padding of all four sides of a cell to the same width.
		 *
		 * See also:
		 * 		 * 
		 * 		 * *   [setPaddingBottom()](dev.do#!/reference/api/rome/server/ "Sets the value of the bottom padding width of a cell.")
		 * 		 * *   [setPaddingLeft()](dev.do#!/reference/api/rome/server/ "Sets the value of the left padding width of a cell.")
		 * 		 * *   [setPaddingRight()](dev.do#!/reference/api/rome/server/ "Sets the value of the right padding width of a cell.")
		 * 		 * *   [setPaddingTop()](dev.do#!/reference/api/rome/server/ "Sets the value of the top padding width of a cell.")
		 *
		 * @param {number} padding Padding width in points as a decimal value.
		 *
		 * @returns {void} 
		 */
		setPadding(padding: number): void
		
		/**
		 *
		 * Sets the value of the bottom padding width of a cell.
		 *
		 * See also:
		 * 		 * 
		 * 		 * *   [setPadding()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-setPadding_N "Sets the padding of all four sides of a cell to the same width.")
		 * 		 * *   [setPaddingLeft()](dev.do#!/reference/api/rome/server/ "Sets the value of the left padding width of a cell.")
		 * 		 * *   [setPaddingRight()](dev.do#!/reference/api/rome/server/ "Sets the value of the right padding width of a cell.")
		 * 		 * *   [setPaddingTop()](dev.do#!/reference/api/rome/server/ "Sets the value of the top padding width of a cell.")
		 *
		 * @param {number} padding Padding width in points as a decimal value.
		 *
		 * @returns {void} 
		 */
		setPaddingBottom(padding: number): void
		
		/**
		 *
		 * Sets the value of the left padding width of a cell.
		 *
		 * See also:
		 * 		 * 
		 * 		 * *   [setPadding()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-setPadding_N "Sets the padding of all four sides of a cell to the same width.")
		 * 		 * *   [setPaddingBottom()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-setPaddingBottom_N "Sets the value of the bottom padding width of a cell.")
		 * 		 * *   [setPaddingRight()](dev.do#!/reference/api/rome/server/ "Sets the value of the right padding width of a cell.")
		 * 		 * *   [setPaddingTop()](dev.do#!/reference/api/rome/server/ "Sets the value of the top padding width of a cell.")
		 *
		 * @param {number} padding Padding width in points as a decimal value.
		 *
		 * @returns {void} 
		 */
		setPaddingLeft(padding: number): void
		
		/**
		 *
		 * Sets the value of the right padding width of a cell.
		 *
		 * See also:
		 * 		 * 
		 * 		 * *   [setPadding()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-setPadding_N "Sets the padding of all four sides of a cell to the same width.")
		 * 		 * *   [setPaddingBottom()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-setPaddingBottom_N "Sets the value of the bottom padding width of a cell.")
		 * 		 * *   [setPaddingLeft()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-setPaddingLeft_N "Sets the value of the left padding width of a cell.")
		 * 		 * *   [setPaddingTop()](dev.do#!/reference/api/rome/server/ "Sets the value of the top padding width of a cell.")
		 *
		 * @param {number} padding Padding width in points as a decimal value.
		 *
		 * @returns {void} 
		 */
		setPaddingRight(padding: number): void
		
		/**
		 *
		 * Sets the value of the top padding width of a cell.
		 *
		 * See also:
		 * 		 * 
		 * 		 * *   [setPadding()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-setPadding_N "Sets the padding of all four sides of a cell to the same width.")
		 * 		 * *   [setPaddingBottom()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-setPaddingBottom_N "Sets the value of the bottom padding width of a cell.")
		 * 		 * *   [setPaddingLeft()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-setPaddingLeft_N "Sets the value of the left padding width of a cell.")
		 * 		 * *   [setPaddingRight()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-setPaddingRight_N "Sets the value of the right padding width of a cell.")
		 *
		 * @param {number} padding Padding width in points as a decimal value.
		 *
		 * @returns {void} 
		 */
		setPaddingTop(padding: number): void
		
		/**
		 *
		 * Sets the text alignment of this cell.
		 *
		 * @param {string} alignment Text alignment position.
		 * 
		 * Valid values:
		 * 
		 * *   text-center: Aligns text to the center.
		 * *   text-justified: Modifies the space between characters to completely fill text between the left and right sides. The final line is left-aligned.
		 * *   text-justified-all: Justifies text alignment including the final line.
		 * *   text-left: Align text to the left.
		 * *   text-right: Align text to the right.
		 *
		 * @returns {void} 
		 */
		setTextAlignment(alignment: string): void
		
		/**
		 *
		 * Sets the vertical alignment for this cell.
		 *
		 * @param {string} alignment Vertical alignment setting.
		 * 
		 * Valid values:
		 * 
		 * *   bottom: Aligns contents to the bottom.
		 * *   mid: Aligns contents to the center.
		 * *   top: Aligns contents to the top.
		 *
		 * @returns {void} 
		 */
		setVerticalAlignment(alignment: string): void
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.  
	 *   
	 * This API is a component used with the [Document API](dev.do#!/reference/api/rome/server/ "The Document API provides methods to initialize a PDF, add content, and close the PDF. After adding content, the document can be attached to a target record.") to generate a PDF.
	 * 
	 */
	class Color {
	
		/**
		 *
		 * @param {{[fieldName: string]: string}} colors Three numbers indicating RGB values using a decimal value from 0 through 1. For example, in `[0.1, 0.9, 0.5]`, the value of the first position is red, second is green, and third is blue. Also, `[0, 0, 0]` is solid black, `[0.5, 0.5, 0.5]` is solid gray, and `[1, 1, 1]` is solid white.
		 *
		 */
		constructor(colors: {[fieldName: string]: string})
		
		/**
		 *
		 * Indicates whether the values of two different color objects match.
		 *
		 * @param {{[fieldName: string]: string}} color Color object to check for a match.
		 *
		 * @returns {boolean} Flag that indicates whether the values of two color objects match.
		 * 
		 * Valid values:
		 * 
		 * *   true: The colors match.
		 * *   false: The colors do not match.
		 */
		equals(color: {[fieldName: string]: string}): boolean
		
		/**
		 *
		 * Returns a black, gray, or white color object.
		 *
		 * @param {number} grayScale Decimal value in the range 0 through 1, in which 0 is black and 1 is white.
		 *
		 * @returns {{[fieldName: string]: string}} Color object reflecting the provided grayscale value.
		 */
		getGrayColor(grayScale: number): {[fieldName: string]: string}
		
		/**
		 *
		 * Creates color with given values and enables you to change the values of an existing color. Each of the values must be from 0 through 1.
		 *
		 * @param {{[fieldName: string]: string}} colors Three numbers indicating RGB values using a decimal value from 0 through 1. For example, in `[0.1, 0.9, 0.5]`, the value of the first position is red, second is green, and third is blue. Also, `[0, 0, 0]` is solid black, `[0.5, 0.5, 0.5]` is solid gray, and `[1, 1, 1]` is solid white.
		 *
		 * @returns {void} 
		 */
		setColorValue(colors: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets the level of color opacity.
		 *
		 * @param {{[fieldName: string]: string}} color Floating decimal value from 0 through 1, in which 0 is fully transparent and 1 is fully opaque.
		 *
		 * @returns {void} 
		 */
		setOpacity(color: {[fieldName: string]: string}): void
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.  
	 *   
	 * This API depends on the a suite of classes to build various elements comprising a PDF.
	 * 
	 * *   [Cell](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI "Creates a Cell object as a cell in a table. You can use this API to format the cell and include additional blocks, such as paragraphs and images.") – Creates a Cell object as a cell in a table. You can use this API to format the cell and include additional blocks, such as paragraphs and images.
	 * *   [Color](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/ColorBothAPI "Creates a Color object used to define color attributes that you can apply to elements in a PDF; such as cells, tables, and lines.") – Creates a Color object used to define color attributes that you can apply to elements in a PDF; such as cells, tables, and lines.
	 * *   [Image](dev.do#!/reference/api/rome/server/ "Creates an Image object representing an image and its layout insert in a PDF. Enables defining attributes such as scale, alignment, and border color.") – Creates an Image object representing an image and its layout insert in a PDF. Enables defining attributes such as scale, alignment, and border color.
	 * *   [Line](dev.do#!/reference/api/rome/server/ "Creates a Line object using methods to draw a line in a PDF.") – Creates a Line object using methods to draw a line in a PDF.
	 * *   [Paragraph](dev.do#!/reference/api/rome/server/ "Creates a Paragraph object representing a block of text in a PDF.") – Creates a Paragraph object representing a block of text in a PDF.
	 * *   [PdfPage](dev.do#!/reference/api/rome/server/ "Creates a PdfPage object representing a PDF page and its attributes; such as size, width, and color.") – Creates a PdfPage object representing a PDF page and its attributes; such as size, width, and color.
	 * *   [Style](dev.do#!/reference/api/rome/server/ "Creates a style for defining properties such font size, border, and alignment. You can apply the same style to multiple objects simultaneously.") – Creates a style for defining properties such font size, border, and alignment. You can apply the same style to multiple objects simultaneously.
	 * *   [Table](dev.do#!/reference/api/rome/server/ "Creates a Table object to add to a PDF document. Defines the data to use in each cell and sets styles, margins, and alignment.") – Creates a Table object to add to a PDF document. Defines the data to use in each cell and sets styles, margins, and alignment.
	 * 
	 *   
	 *   
	 * 
	 * The following example shows how to create a basic PDF using the Document API and several components, such as a table, cell, and paragraph. The result is a list of Incidents from the Incident [incident] table listed in a PDF. You can test this example in your instance if you replace `<sys_id>` with the sys_id of an incident record.
	 * 
	 *     var pageSize = new sn_pdfgeneratorutils.PdfPage("A4");
	 *     var document = new sn_pdfgeneratorutils.Document.createDocument(pageSize);
	 *      
	 *     var whiteColor =  sn_pdfgeneratorutils.Color([1,1,1]);
	 *     var greyColor =  sn_pdfgeneratorutils.Color([0.8,0.8,0.8]);
	 *     var headerBgColor = new sn_pdfgeneratorutils.Color([0.4,0.6,0.8]);
	 *      
	 *     // Query the Incident table
	 *     var gr = new GlideRecord("incident");
	 *     gr.query();
	 *      
	 *     // declare table by providing width array and Boolean for large table
	 *     var table = new sn_pdfgeneratorutils.Table([70,200],false);
	 *      
	 *     var headerStyle = new sn_pdfgeneratorutils.Style;
	 *     headerStyle.setBackgroundColor(headerBgColor);
	 *     headerStyle.setTextAlignment("text-center");
	 *     headerStyle.setBold();
	 *     headerStyle.setFontColor(whiteColor);
	 *      
	 *     table.setHeaderStyle(headerStyle);
	 *      
	 *     var nParagraph = new sn_pdfgeneratorutils.Paragraph("Number");
	 *     var sParagraph = new sn_pdfgeneratorutils.Paragraph("Short Description");
	 *      
	 *     var hdrCell1 = new sn_pdfgeneratorutils.Cell;
	 *     var hdrCell2 = new sn_pdfgeneratorutils.Cell;
	 *      
	 *     hdrCell1.addParagraph(nParagraph);
	 *     hdrCell2.addParagraph(sParagraph);
	 *      
	 *     table.addHeaderCell(hdrCell1);
	 *     table.addHeaderCell(hdrCell2);
	 *      
	 *     var row = 0;
	 *      
	 *     while(gr.next()) {
	 *     var numCell = new sn_pdfgeneratorutils.Cell;
	 *     var sdCell = new sn_pdfgeneratorutils.Cell;
	 *      
	 *     var numberParagraph = new sn_pdfgeneratorutils.Paragraph(gr.number);
	 *     var sdParagraph = new sn_pdfgeneratorutils.Paragraph(gr.short_description);
	 *      
	 *     numCell.addParagraph(numberParagraph);
	 *     sdCell.addParagraph(sdParagraph);
	 *      
	 *     if (row % 2 == 1) {
	 *          table.setDefaultbackGroundColor(greyColor);
	 *     } else {
	 *          table.setDefaultbackGroundColor(whiteColor);
	 *     }
	 *      
	 *     table.addCell(numCell);
	 *     table.addCell(sdCell);
	 *      
	 *     row = row + 1;
	 *     }
	 *      
	 *     document.addTable(table);
	 *     document.saveAsAttachment("incident", "<sys_id>", "SampleGenerationTest.pdf");
	 * 
	 * The PDF attachment is listed in the Attachments [sys_attachment] table.
	 * 
	 * ![Example PDF with output as 2-column table listing incident numbers and descriptions.](app_store_portal_api_reference_scoped_rome_app-store_dev_portal_API_reference_DocumentBoth_image_document-api-pdf-output.png)
	 * 
	 */
	class Document {
	
		/**
		 *
		 * @param {{[fieldName: string]: string}} pageSize PDF page size.
		 *
		 */
		constructor(pageSize: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Adds a page to the document by terminating the current page and creating a new one.
		 *
		 * Additional methods for adding a new page in a document:
		 * 		 * 
		 * 		 * *   [addNewPage()](dev.do#!/reference/api/rome/server/ "Adds a new blank page to the document. Use to force a page break to start a new chapter or section in your document.") – Adds a new blank page to the document. Use to force a page break to start a new chapter or section in your document.
		 * 		 * *   [addNewPageAtIndex()](dev.do#!/reference/api/rome/server/ "Adds a new page at the specified index of the document. For example, setting the index to 6 inserts a page six or inserts the page at the position of the existing page six in a document. The original page six becomes page seven.") – Adds a new page at the specified index of the document. For example, setting the index to 6 inserts a page six or inserts the page at the position of the existing page six in a document. The original page six becomes page seven.
		 *
		 *
		 * @returns {void} 
		 */
		addAndStartNewPage(): void
		
		/**
		 *
		 * Adds a name to the author field in PDF document properties.
		 *
		 * @param {string} author Name of the document's author.
		 *
		 * @returns {void} 
		 */
		addAuthor(author: string): void
		
		/**
		 *
		 * Adds an image to a document.
		 *
		 * @param {{[fieldName: string]: string}} image Image to add to a document.
		 *
		 * @returns {void} 
		 */
		addImage(image: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Adds a new empty line to the document.
		 *
		 *
		 * @returns {void} 
		 */
		addNewLine(): void
		
		/**
		 *
		 * Adds a new blank page to the document. Use to force a page break to start a new chapter or section in your document.
		 *
		 * Additional methods for adding a new page in a document:
		 * 		 * 
		 * 		 * *   [addAndStartNewPage()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI#Document-addAndStartNewPage "Adds a page to the document by terminating the current page and creating a new one.") – Adds a page to the document by terminating the current page and creating a new one.
		 * 		 * *   [addNewPageAtIndex()](dev.do#!/reference/api/rome/server/ "Adds a new page at the specified index of the document. For example, setting the index to 6 inserts a page six or inserts the page at the position of the existing page six in a document. The original page six becomes page seven.") – Adds a new page at the specified index of the document. For example, setting the index to 6 inserts a page six or inserts the page at the position of the existing page six in a document. The original page six becomes page seven.
		 *
		 *
		 * @returns {void} 
		 */
		addNewPage(): void
		
		/**
		 *
		 * Adds a new page at the specified index of the document. For example, setting the index to 6 inserts a page six or inserts the page at the position of the existing page six in a document. The original page six becomes page seven.
		 *
		 * Additional methods for adding a new page in a document:
		 * 		 * 
		 * 		 * *   [addAndStartNewPage()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI#Document-addAndStartNewPage "Adds a page to the document by terminating the current page and creating a new one.") – Adds a page to the document by terminating the current page and creating a new one.
		 * 		 * *   [addNewPage()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI#Document-addNewPage "Adds a new blank page to the document. Use to force a page break to start a new chapter or section in your document.") – Adds a new blank page to the document. Use to force a page break to start a new chapter or section in your document.
		 *
		 * @param {number} index Position at which to insert a new page.
		 *
		 * @returns {void} 
		 */
		addNewPageAtIndex(index: number): void
		
		/**
		 *
		 * Adds a paragraph to a document.
		 *
		 * @param {{[fieldName: string]: string}} paragraph Block of text provided as a paragraph object.
		 *
		 * @returns {void} 
		 */
		addParagraph(paragraph: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Adds a table to a document.
		 *
		 * @param {{[fieldName: string]: string}} table Table to be inserted into the document.
		 *
		 * @returns {void} 
		 */
		addTable(table: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Closes a document.
		 *
		 *
		 * @returns {void} 
		 */
		close(): void
		
		/**
		 *
		 * Creates a document with the specified page size.
		 *
		 * @param {{[fieldName: string]: string}} pageSize Document page size.
		 *
		 * @returns {{[fieldName: string]: string}} PDF document.
		 */
		createDocument(pageSize: {[fieldName: string]: string}): {[fieldName: string]: string}
		
		/**
		 *
		 * Gets the number of pages in the document.
		 *
		 *
		 * @returns {number} Number of pages in the document.
		 */
		getPageCount(): number
		
		/**
		 *
		 * Gets the default page size of the document.
		 *
		 *
		 * @returns {string} Value of the default page size set using the [PdfPage](dev.do#!/reference/api/rome/server/ "Creates a PdfPage object representing a PDF page and its attributes; such as size, width, and color.") API.
		 * 
		 * Possible values:
		 * 
		 * *   A4 – 595 x 842 points
		 * *   EXECUTIVE – 522 x 756 points
		 * *   LETTER – 612 x 792 points
		 * *   LEDGER – 792 x 1224 points
		 */
		getPageSize(): string
		
		/**
		 *
		 * Indicates whether a document is closed or open.
		 *
		 *
		 * @returns {void} Flag that indicates whether a document is open or closed.
		 * 
		 * Valid values:
		 * 
		 * *   true: Document is closed.
		 * *   false: Document is open.
		 * 
		 * Default: true
		 */
		isClosed(): void
		
		/**
		 *
		 * Attaches the document file to the specified target table.
		 *
		 * @param {string} tableName Name of the table on which to attach the document.
		 * @param {string} tableSysId Sys_id of the record on which to attach the document.
		 * @param {string} fileName Name of the document to attach.
		 *
		 * @returns {string} Sys_id of the attached document in the Attachments [sys_attachment] table.
		 */
		saveAsAttachment(tableName: string, tableSysId: string, fileName: string): string
		
		/**
		 *
		 * Sets the base text flow direction to reorder from based on character recognition
		 *
		 * @param {string} direction Text flow direction.
		 * 
		 * Valid values:
		 * 
		 * *   LEFT_TO_RIGHT: Order text flow left to right. The text direction is only reordered if left-to-right language characters are detected.
		 * *   RIGHT_TO_LEFT: Order text flow right to left. The text direction is only reordered if right-to-left language characters are detected.
		 * 
		 * Default: LEFT_TO_RIGHT
		 *
		 * @returns {void} 
		 */
		setBaseDirection(direction: string): void
		
		/**
		 *
		 * Sets the page margin sizes in the document.
		 *
		 * @param {number} topMargin Height of the top margin in points.
		 * @param {number} rightMargin Width of the right margin in points.
		 * @param {number} bottomMargin Height of the bottom margin in points.
		 * @param {number} leftMargin Width of the left margin in points.
		 *
		 * @returns {void} 
		 */
		setMargins(topMargin: number, rightMargin: number, bottomMargin: number, leftMargin: number): void
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.  
	 *   
	 * This API is a component used with the [Document API](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI "The Document API provides methods to initialize a PDF, add content, and close the PDF. After adding content, the document can be attached to a target record.") to generate a PDF.  
	 *   
	 * You can add an image to a PDF using one of the following methods:
	 * 
	 * *   [Cell – addImage(Image image)](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-addImage_O "Adds an image to a table cell.") – Adds an image to a table cell
	 * *   [Table – addImageCell(Image image)](dev.do#!/reference/api/rome/server/ "Adds a cell that contains an image to the table.") – Adds a cell that contains an image to a table.
	 * *   [Document – addImage(Image image)](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI#Document-addImage_O "Adds an image to a document.") - Adds an image to a page
	 * 
	 */
	class Image {
	
		/**
		 *
		 * @param {string} attachmentSysId Sys_id of an image in the Attachments [sys_attachment] table.
		 *
		 */
		constructor(attachmentSysId: string)
		
		/**
		 *
		 * Scales an image to absolute width and height sizes. This setting does not preserve the width-height ratio of the image and might result in undesired stretching if settings are not precise.
		 *
		 * To scale to an absolute size that preserves width-height ratio of an image, use the [scaleToFit()](dev.do#!/reference/api/rome/server/ "Scales an image to an absolute size while preserving the width-height ratio.") method.
		 *
		 * @param {number} width Image width in points.
		 * @param {number} height Image height in points.
		 *
		 * @returns {void} 
		 */
		scaleAbsolute(width: number, height: number): void
		
		/**
		 *
		 * Scales an image to an absolute size while preserving the width-height ratio.
		 *
		 * Resulting output varies by image aspect ratio. If the width and height parameter values do not match the image aspect ratio, one value renders smaller in output than the value given.
		 *
		 * @param {number} width Maximum image width in points.
		 * @param {number} height Maximum image height in points.
		 *
		 * @returns {void} 
		 */
		scaleToFit(width: number, height: number): void
		
		/**
		 *
		 * Enables scaling width and height to a page or cell while retaining dimensions.
		 *
		 * @param {boolean} value Flag that indicates whether to automatically scale an image.
		 * 
		 * Valid values:
		 * 
		 * *   true: Automatically scales the image
		 * *   false: Image does not scale
		 * 
		 * Default: false
		 *
		 * @returns {void} 
		 */
		setAutoScale(value: boolean): void
		
		/**
		 *
		 * Sets a border on a PDF in the specified color.
		 *
		 * @param {{[fieldName: string]: string}} color Image border color.
		 * @param {number} width Width of the border in points.
		 *
		 * @returns {void} 
		 */
		setColoredBorder(color: {[fieldName: string]: string}, width: number): void
		
		/**
		 *
		 * Sets the horizontal alignment of the image.
		 *
		 * @param {string} alignment Positions image alignment on a page or block element.
		 * 
		 * Valid values:
		 * 
		 * *   Center
		 * *   Left
		 * *   Right
		 * 
		 * Default: Left
		 *
		 * @returns {void} 
		 */
		setHorizontalAlignment(alignment: string): void
		
		/**
		 *
		 * Sets an image to have no border.
		 *
		 *
		 * @returns {void} 
		 */
		setNoBorder(): void
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.  
	 *   
	 * This API is a component used with the [Document API](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI "The Document API provides methods to initialize a PDF, add content, and close the PDF. After adding content, the document can be attached to a target record.") to generate a PDF.
	 * 
	 */
	class Line {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Places a line on a document page.
		 *
		 * @param {{[fieldName: string]: string}} Document Name of the document object.
		 * @param {number} pageNo Page number on which you want to place the line.
		 * @param {number} xPos X-coordinate area of the page on which to place the line.
		 * @param {number} yPos Y-coordinate area of the page on which to place the line.
		 * @param {number} width Width area of the page in which you want to draw the line. Values are in points.
		 * @param {number} lineWidth Optional. Value of line thickness in points.
		 * 
		 * Default: 1
		 *
		 * @returns {void} 
		 */
		drawLine(Document: {[fieldName: string]: string}, pageNo: number, xPos: number, yPos: number, width: number, lineWidth: number): void
		
		/**
		 *
		 * Sets the color of a line.
		 *
		 * @param {{[fieldName: string]: string}} color Line color.
		 *
		 * @returns {void} 
		 */
		setColor(color: {[fieldName: string]: string}): void
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.  
	 *   
	 * This API is a component used with the [Document API](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI "The Document API provides methods to initialize a PDF, add content, and close the PDF. After adding content, the document can be attached to a target record.") to generate a PDF.
	 * 
	 */
	class Paragraph {
	
		/**
		 *
		 * @param {string} text Paragraph block of text.
		 *
		 */
		constructor(text: string)
		
		/**
		 *
		 * Adds an empty line after a paragraph in a document.
		 *
		 *
		 * @returns {void} 
		 */
		addNewLine(): void
		
		/**
		 *
		 * Adds a paragraph. You can use this method to create a block of paragraphs with automatic line breaks.
		 *
		 * @param {{[fieldName: string]: string}} paragraph Paragraph object.
		 *
		 * @returns {void} 
		 */
		addParagraph(paragraph: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Adds a string of text to a paragraph. This method does not automatically insert a space preceding the content.
		 *
		 * @param {string} content Information to include in a paragraph.
		 *
		 * @returns {void} 
		 */
		addString(content: string): void
		
		/**
		 *
		 * Applies a predefined style to paragraph text.
		 *
		 * @param {{[fieldName: string]: string}} style Style to apply to this element.
		 *
		 * @returns {void} 
		 */
		addStyle(style: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets a paragraph element to a fixed position on the page.
		 *
		 * @param {number} left Indentation from the left side of the PDF page in points.
		 * @param {number} bottom Position from the bottom of the PDF page in points.
		 * @param {number} width Width of the paragraph element in points. This value determines the length at which the line breaks.
		 *
		 * @returns {void} 
		 */
		setFixedPosition(left: number, bottom: number, width: number): void
		
		/**
		 *
		 * Sets each paragraph margin.
		 *
		 * To set all four margins with one or more unique values, use [setMargins()](dev.do#!/reference/api/rome/server/ "Sets a size for each paragraph margin.").
		 *
		 * @param {number} margin Value of the top, right, bottom, and left margins in points.
		 *
		 * @returns {void} 
		 */
		setMargin(margin: number): void
		
		/**
		 *
		 * Sets the bottom margin of a paragraph.
		 *
		 * @param {number} margin Height of the bottom margin in points.
		 *
		 * @returns {void} 
		 */
		setMarginBottom(margin: number): void
		
		/**
		 *
		 * Sets the left margin of a paragraph.
		 *
		 * @param {number} leftMargin Width of the left margin in points.
		 *
		 * @returns {void} 
		 */
		setMarginLeft(leftMargin: number): void
		
		/**
		 *
		 * Sets the right margin of a paragraph.
		 *
		 * @param {number} margin Width of the right margin in points.
		 *
		 * @returns {void} 
		 */
		setMarginRight(margin: number): void
		
		/**
		 *
		 * Sets a size for each paragraph margin.
		 *
		 * To set each margin to the same value, use [setMargin()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/ParagraphBothAPI#Paragraph-setMargin_N "Sets each paragraph margin.").
		 *
		 * @param {number} topMargin Height of the top margin in points.
		 * @param {number} rightMargin Width of the right margin in points.
		 * @param {number} bottomMargin Height of the bottom margin in points.
		 * @param {number} leftMargin Width of the left margin in points.
		 *
		 * @returns {void} 
		 */
		setMargins(topMargin: number, rightMargin: number, bottomMargin: number, leftMargin: number): void
		
		/**
		 *
		 * Sets the top margin of a paragraph.
		 *
		 * @param {number} margin Height of the top margin in points.
		 *
		 * @returns {void} 
		 */
		setMarginTop(margin: number): void
		
		/**
		 *
		 * Sets the text alignment of this paragraph.
		 *
		 * @param {string} alignment Text alignment position.
		 * 
		 * Valid values:
		 * 
		 * *   text-center: Aligns text to the center.
		 * *   text-justified: Modifies the space between characters to completely fill text between the left and right sides. The final line is left-aligned.
		 * *   text-justified-all: Justifies text alignment including the final line.
		 * *   text-left: Align text to the left.
		 * *   text-right: Align text to the right.
		 *
		 * @returns {void} 
		 */
		setTextAlignment(alignment: string): void
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.
	 * 
	 * These methods can also be used for documents created by non-catalog items. The methods in this class enable the following tasks:
	 * 
	 * *   Dynamically generate a PDF from an HTML string and attach it to a record
	 * *   Fill fields in a PDF
	 * *   Sign a PDF
	 * *   Unflattened, flattened, or partially flattened
	 * *   Retrieving PDF field data
	 * 
	 * Related APIs:
	 * 
	 * *   [PdfMergeSignRequestor](dev.do#!/reference/api/rome/server/ "Adds an image representing a signature to a PDF document.")
	 * *   [SVGToPDFConversionAPI](dev.do#!/reference/api/rome/server/ "Enables adding an SVG to a PDF and converting an SVG to PDF.")
	 * 
	 */
	class PDFGenerationAPI {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Converts an HTML string to a PDF document.
		 *
		 * To generate a PDF with header and footer information, such as page numbers, use [convertToPDFWithHeaderFooter()](dev.do#!/reference/api/rome/server/ "Converts an HTML string into a PDF with header and footer content.").
		 *
		 * @param {string} html HTML to convert to a PDF document.
		 * @param {string} targetTable Name of the table on which to attach the converted PDF.
		 * @param {string} targetTableSysId Sys_id of the record on which to attach the converted PDF.
		 * @param {string} pdfName Name to give the PDF.
		 * 
		 * Default: Sys_id of the PDF in the Attachments [sys_attachment] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		convertToPDF(html: string, targetTable: string, targetTableSysId: string, pdfName: string): any
		
		/**
		 *
		 * Converts an HTML string into a PDF with header and footer content.
		 *
		 * Use this method to generate PDFs with page settings:
		 * 		 * 
		 * 		 * *   Header and footer information
		 * 		 * *   Margin sizes
		 * 		 * *   Orientation
		 * 		 * *   Enumeration
		 * 		 * *   Page size
		 *
		 * @param {string} html HTML to convert to a PDF document.
		 * @param {string} targetTable Name of the table on which to attach the converted PDF.
		 * @param {string} targetTableSysId Sys_id of the record on which to attach the converted PDF.
		 * @param {string} pdfName Name to give the PDF.
		 * 
		 * Default: Sys_id of the PDF in the Attachments [sys_attachment] table.
		 * @param {{[fieldName: string]: string}} headerFooterInfo Defines PDF header and footer details.
		 * 
		 *     {
		 *       "FooterImageAlignment": "String",
		 *       "FooterImageAttachmentId": "String",
		 *       "FooterImageHeight": "String",
		 *       "FooterText": "String",
		 *       "FooterTextAlignment": "String",
		 *       "GeneratePageNumber": "String",
		 *       "HeaderImageAlignment": "String",
		 *       "HeaderImageAttachmentId": "String",
		 *       "HeaderImageHeight": "String",
		 *       "LeftOrRightMargin": "String",
		 *       "PageOrientation": "String",
		 *       "PageSize": "String",
		 *       "TopOrBottomMargin": "String"
		 *     }
		 * @param {string} headerFooterInfo.​FooterImageAlignment Sets the image position in the footer.
		 * 
		 * Valid values:
		 * 
		 * *   BOTTOM_CENTER: Position the image in the bottom center of the footer.
		 * *   BOTTOM_LEFT: Position the image in the bottom left area of the
		 * *   BOTTOM_RIGHT: Position the image in the bottom right area of the footer.
		 * *   TOP_CENTER: Position the image in the top center of the footer.
		 * *   TOP_LEFT: Position the image in the top left area of the footer.
		 * *   TOP_RIGHT: Position the image in the top right area of the footer.
		 * @param {string} headerFooterInfo.​FooterImageAttachmentId Sys_id of the footer image in the Attachments [sys_attachment] table. To determine if the file type is supported in your instance, Navigate to System Properties > Security and check if it's listed in List of file extensions (comma-separated) that can be attached field.
		 * @param {string} headerFooterInfo.​FooterImageHeight Height of footer image.
		 * 
		 * Default: 50 points
		 * @param {string} headerFooterInfo.​FooterText Footer text to place at the bottom of each PDF page.
		 * @param {string} headerFooterInfo.​FooterTextAlignment Sets the text position in the footer. Make sure this value does not match or conflict with the area provided in headerFooterInfo.FooterImageAlignment.
		 * 
		 * Valid values:
		 * 
		 * *   BOTTOM_CENTER: Position the text in the bottom center of the footer.
		 * *   BOTTOM_LEFT: Position the text in the bottom left area of the
		 * *   BOTTOM_RIGHT: Position the text in the bottom right area of the footer.
		 * *   TOP_CENTER: Position the text in the top center of the footer.
		 * *   TOP_LEFT: Position the text in the top left area of the footer.
		 * *   TOP_RIGHT: Position the text in the top right area of the footer.
		 * @param {string} headerFooterInfo.​GeneratePageNumber Flag that indicates whether to generate a PDF page number.
		 * 
		 * Valid values:
		 * 
		 * *   true: Generate page numbers.
		 * *   false: Do not generate page numbers.
		 * 
		 * Default: true
		 * @param {string} headerFooterInfo.​HeaderImageAlignment Sets the image position in the header.
		 * 
		 * Valid values:
		 * 
		 * *   center: Position the image in the center of the header.
		 * *   left: Position the image on the left side of the header.
		 * *   right: Position the image on the right side of the header.
		 * @param {string} headerFooterInfo.​HeaderImageAttachmentId Sys_id of the header image in the Attachments [sys_attachment] table. To determine if the file type is supported in your instance, Navigate to System Properties > Security and check if it's listed in List of file extensions (comma-separated) that can be attached field.
		 * @param {string} headerFooterInfo.​HeaderImageHeight Height of the header image.
		 * 
		 * Default: 50 points
		 * @param {string} headerFooterInfo.​LeftOrRightMargin Size of the left and right margins. If positioned in the left or right side of the page, header/footer details are placed within in this area.
		 * 
		 * Default: 36 points
		 * @param {string} headerFooterInfo.​PageOrientation Page orientation.
		 * 
		 * Valid values:
		 * 
		 * *   PORTRAIT
		 * *   LANDSCAPE
		 * 
		 * Default: Portrait
		 * @param {string} headerFooterInfo.​PageSize Document page size.
		 * 
		 * Valid values:
		 * 
		 * *   A4 – 595 × 842 points
		 * *   LETTER – 612 × 792 points
		 * *   LEDGER – 792 x 1224 points
		 * @param {string} headerFooterInfo.​TopOrBottomMargin Size of the top and bottom margins. Header and footer details are placed within in this area.
		 * 
		 * Default: 72 points
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		convertToPDFWithHeaderFooter(html: string, targetTable: string, targetTableSysId: string, pdfName: string, headerFooterInfo: {[fieldName: string]: string}): any
		
		/**
		 *
		 * Fills fields in an editable PDF and attaches it to the provided record.
		 *
		 * Use the following methods to determine if the PDF is fillable and get field information:
		 * 		 * 
		 * 		 * *   [isDocumentFillable()](dev.do#!/reference/api/rome/server/ "Checks if the PDF document contains editable fields.")
		 * 		 * *   [getDocumentFields()](dev.do#!/reference/api/rome/server/ "Gets a list of editable fields in a PDF document. Enables listing editable PDF fields without manually opening the file to check.")
		 * 		 * *   [getDocumentFieldsType()](dev.do#!/reference/api/rome/server/ "Gets the field type of set of editable fields from a PDF document.")
		 * 		 * 
		 * 		 * PDFGenerationAPI provides additional fill methods with different options:
		 * 		 * 
		 * 		 * *   [fillDocumentFieldsAndFlatten()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI#P-fillDocFieldsFlatten_O_S_S_S_S_O "Fills fields in an editable PDF, flattens the data fields, and attaches it to the provided record.") – Fills fields in an editable PDF, flattens the data fields, and attaches it to the provided record.
		 * 		 * *   [fillFieldsAndMergeSignature()](dev.do#!/reference/api/rome/server/ "Fills fields in an editable PDF, adds signature image, flattens the data fields, and attaches it to the provided record.") – Fills fields in an editable PDF, adds signature image, flattens the data fields, and attaches it to the provided record.
		 * 		 * *   [getFilledDocumentWithSignatureAsBase64()](dev.do#!/reference/api/rome/server/ "Fills fields in an editable PDF, creates an image, and converts it to a Base64-encoded PDF.") – Fills fields in an editable PDF, creates an image, and converts it to a Base64-encoded PDF.
		 *
		 * @param {{[fieldName: string]: string}} fieldsMap Optional. Key value map by PDF field name and value to fill. Use the getDocumentFields() method to get the list of available fields.
		 * @param {string} sysId Sys_id of a PDF in the Attachments [sys_attachment] table.
		 * @param {string} tableName Name of the table containing the record to which the PDF is attached. You can find this value in the same row as the attachment listed in the Attachments [sys_attachment] table.
		 * @param {string} tableSysId Sys_id of the record to which the PDF is attached. You can find this value in the same row as the attachment listed in the Attachments [sys_attachment] table.
		 * @param {string} pdfName Name to give the PDF.
		 * 
		 * Default: Sys_id of the PDF in the Attachments [sys_attachment] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		fillDocumentFields(fieldsMap: {[fieldName: string]: string}, sysId: string, tableName: string, tableSysId: string, pdfName: string): any
		
		/**
		 *
		 * Fills fields in an editable PDF, flattens the data fields, and attaches it to the provided record.
		 *
		 * Use the following methods to determine if the PDF is fillable and get field information:
		 * 		 * 
		 * 		 * *   [isDocumentFillable()](dev.do#!/reference/api/rome/server/ "Checks if the PDF document contains editable fields.")
		 * 		 * *   [getDocumentFields()](dev.do#!/reference/api/rome/server/ "Gets a list of editable fields in a PDF document. Enables listing editable PDF fields without manually opening the file to check.")
		 * 		 * *   [getDocumentFieldsType()](dev.do#!/reference/api/rome/server/ "Gets the field type of set of editable fields from a PDF document.")
		 * 		 * 
		 * 		 * PDFGenerationAPI provides additional fill methods with different options:
		 * 		 * 
		 * 		 * *   [fillDocumentFields()](dev.do#!/reference/api/rome/server/ "Fills fields in an editable PDF and attaches it to the provided record.") – Fills fields in an editable PDF and attaches it to the provided record.
		 * 		 * *   [fillFieldsAndMergeSignature()](dev.do#!/reference/api/rome/server/ "Fills fields in an editable PDF, adds signature image, flattens the data fields, and attaches it to the provided record.") – Fills fields in an editable PDF, adds signature image, flattens the data fields, and attaches it to the provided record.
		 * 		 * *   [getFilledDocumentWithSignatureAsBase64()](dev.do#!/reference/api/rome/server/ "Fills fields in an editable PDF, creates an image, and converts it to a Base64-encoded PDF.") – Fills fields in an editable PDF, creates an image, and converts it to a Base64-encoded PDF.
		 *
		 * @param {{[fieldName: string]: string}} fieldsMap Optional. Key value map by PDF field name and value to fill. Use the getDocumentFields() method to get the list of available fields.
		 * @param {string} sysId Sys_id of a PDF in the Attachments [sys_attachment] table.
		 * @param {string} tableName Name of the table containing the record to which the PDF is attached. You can find this value in the same row as the attachment listed in the Attachments [sys_attachment] table.
		 * @param {string} tableSysId Sys_id of the record to which the PDF is attached. You can find this value in the same row as the attachment listed in the Attachments [sys_attachment] table.
		 * @param {string} pdfName Name to give the PDF.
		 * 
		 * Default: Sys_id of the PDF in the Attachments [sys_attachment] table.
		 * @param {{[fieldName: string]: string}} flatten Optional. Flattening fields enable locking the fields so that other users cannot change the information. Specify the key as "FlattenType" and provide a flattening option as a string.
		 * 
		 * Valid values:
		 * 
		 * *   donot_flatten - Do not flatten any fields.
		 * *   partially_flatten - Flatten only the fields which are modified.
		 * *   fully_flatten - Flattens all the fields.
		 * 
		 * Default: fully_flatten
		 * 
		 *     {
		 *       "FlattenType": "String" 
		 *     }
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		fillDocumentFieldsAndFlatten(fieldsMap: {[fieldName: string]: string}, sysId: string, tableName: string, tableSysId: string, pdfName: string, flatten: {[fieldName: string]: string}): any
		
		/**
		 *
		 * Fills fields in an editable PDF, adds signature image, flattens the data fields, and attaches it to the provided record.
		 *
		 * Use the following methods to determine if the PDF is fillable and get field information:
		 * 		 * 
		 * 		 * *   [isDocumentFillable()](dev.do#!/reference/api/rome/server/ "Checks if the PDF document contains editable fields.")
		 * 		 * *   [getDocumentFields()](dev.do#!/reference/api/rome/server/ "Gets a list of editable fields in a PDF document. Enables listing editable PDF fields without manually opening the file to check.")
		 * 		 * *   [getDocumentFieldsType()](dev.do#!/reference/api/rome/server/ "Gets the field type of set of editable fields from a PDF document.")
		 * 		 * 
		 * 		 * PDFGenerationAPI provides additional fill methods with different options:
		 * 		 * 
		 * 		 * *   [fillDocumentFields()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI#P-fillDocumentFields_O_S_S_S_S "Fills fields in an editable PDF and attaches it to the provided record.") – Fills fields in an editable PDF and attaches it to the provided record.
		 * 		 * *   [fillDocumentFieldsAndFlatten()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI#P-fillDocFieldsFlatten_O_S_S_S_S_O "Fills fields in an editable PDF, flattens the data fields, and attaches it to the provided record.") – Fills fields in an editable PDF, flattens the data fields, and attaches it to the provided record.
		 * 		 * *   [getFilledDocumentWithSignatureAsBase64()](dev.do#!/reference/api/rome/server/ "Fills fields in an editable PDF, creates an image, and converts it to a Base64-encoded PDF.") – Fills fields in an editable PDF, creates an image, and converts it to a Base64-encoded PDF.
		 *
		 * @param {{[fieldName: string]: string}} fieldsMap Optional. Key value map by PDF field name and value to fill. Use the getDocumentFields() method to get the list of available fields.
		 * @param {string} sysId Sys_id of a PDF in the Attachments [sys_attachment] table.
		 * @param {string} tableName Name of the table containing the record to which the PDF is attached. You can find this value in the same row as the attachment listed in the Attachments [sys_attachment] table.
		 * @param {string} tableSysId Sys_id of the record to which the PDF is attached. You can find this value in the same row as the attachment listed in the Attachments [sys_attachment] table.
		 * @param {string} pdfName Name to give the PDF.
		 * 
		 * Default: Sys_id of the PDF in the Attachments [sys_attachment] table.
		 * @param {{[fieldName: string]: string}} requestor Signature input returned from pdfMergeSignRequestor.
		 * @param {{[fieldName: string]: string}} flatten Optional. Flattening fields enable locking the fields so that other users cannot change the information. Specify the key as "FlattenType" and provide a flattening option as a string.
		 * 
		 * Valid values:
		 * 
		 * *   donot_flatten - Do not flatten any fields.
		 * *   partially_flatten - Flatten only the fields which are modified.
		 * *   fully_flatten - Flattens all the fields.
		 * 
		 * Default: fully_flatten
		 * 
		 *     {
		 *       "FlattenType": "String" 
		 *     }
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		fillFieldsAndMergeSignature(fieldsMap: {[fieldName: string]: string}, sysId: string, tableName: string, tableSysId: string, pdfName: string, requestor: {[fieldName: string]: string}, flatten: {[fieldName: string]: string}): any
		
		/**
		 *
		 * Gets a list of editable fields in a PDF document. Enables listing editable PDF fields without manually opening the file to check.
		 *
		 * @param {string} sysId Sys_id of a PDF in the Attachments [sys_attachment] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		getDocumentFields(sysId: string): any
		
		/**
		 *
		 * Gets the field type of set of editable fields from a PDF document.
		 *
		 * @param {string} sysId Sys_id of a PDF in the Attachments [sys_attachment] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		getDocumentFieldsType(sysId: string): any
		
		/**
		 *
		 * Fills fields in an editable PDF, creates an image, and converts it to a Base64-encoded PDF.
		 *
		 * Base64 encoding enables you to output a PDF as a string within a text document, such as HTML or JSON, without damaging the binary character syntax.
		 * 		 * 
		 * 		 * Use the following methods to determine if the PDF is fillable and get field information:
		 * 		 * 
		 * 		 * *   [isDocumentFillable()](dev.do#!/reference/api/rome/server/ "Checks if the PDF document contains editable fields.")
		 * 		 * *   [getDocumentFields()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI#P-getDocumentFields_S "Gets a list of editable fields in a PDF document. Enables listing editable PDF fields without manually opening the file to check.")
		 * 		 * *   [getDocumentFieldsType()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI#P-getDocumentFieldsType_S "Gets the field type of set of editable fields from a PDF document.")
		 * 		 * 
		 * 		 * PDFGenerationAPI provides additional fill methods with different options:
		 * 		 * 
		 * 		 * *   [fillDocumentFields()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI#P-fillDocumentFields_O_S_S_S_S "Fills fields in an editable PDF and attaches it to the provided record.") – Fills fields in an editable PDF and attaches it to the provided record.
		 * 		 * *   [fillDocumentFieldsAndFlatten()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI#P-fillDocFieldsFlatten_O_S_S_S_S_O "Fills fields in an editable PDF, flattens the data fields, and attaches it to the provided record.") – Fills fields in an editable PDF, flattens the data fields, and attaches it to the provided record.
		 * 		 * *   [fillFieldsAndMergeSignature()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI#P-fillFieldsMergeSig_O_S_S_S_S_O_O "Fills fields in an editable PDF, adds signature image, flattens the data fields, and attaches it to the provided record.") – Fills fields in an editable PDF, adds signature image, flattens the data fields, and attaches it to the provided record.
		 *
		 * @param {{[fieldName: string]: string}} fieldsMap Optional. Key value map by PDF field name and value to fill. Use the getDocumentFields() method to get the list of available fields.
		 * @param {string} sysId Sys_id of a PDF in the Attachments [sys_attachment] table.
		 * @param {{[fieldName: string]: string}} requestor Signature input returned from pdfMergeSignRequestor.
		 * @param {{[fieldName: string]: string}} flatten Optional. Flattening fields enable locking the fields so that other users cannot change the information. Specify the key as "FlattenType" and provide a flattening option as a string.
		 * 
		 * Valid values:
		 * 
		 * *   donot_flatten - Do not flatten any fields.
		 * *   partially_flatten - Flatten only the fields which are modified.
		 * *   fully_flatten - Flattens all the fields.
		 * 
		 * Default: fully_flatten
		 * 
		 *     {
		 *       "FlattenType": "String" 
		 *     }
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		getFilledDocumentWithSignatureAsBase64(fieldsMap: {[fieldName: string]: string}, sysId: string, requestor: {[fieldName: string]: string}, flatten: {[fieldName: string]: string}): any
		
		/**
		 *
		 * Gets the page size of a PDF document.
		 *
		 * @param {string} sysId Sys_id of a PDF in the Attachments [sys_attachment] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		getPdfPageSizes(sysId: string): any
		
		/**
		 *
		 * Checks if the PDF document contains editable fields.
		 *
		 * @param {string} sysId Sys_id of a PDF in the Attachments [sys_attachment] table.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		isDocumentFillable(sysId: string): any
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.  
	 *   
	 * This method creates a signature object that can be implemented in a PDF using [PDFGenerationAPI](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI "Provides support for PDF conversion and handling PDF fields.").
	 * 
	 */
	class PdfMergeSignRequestor {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Assigns signature size and position requirements in the PDF.
		 *
		 * @param {number} pageNumber Number of the page on which to insert the signature.
		 * @param {number} leftMargin Value in points representing the left margin area of the page at which to insert the signature.
		 * @param {number} topMargin Value in points representing the top margin area of the page at which to insert the signature image.
		 * @param {number} boxWidth Value in points representing width of the box to contain the signature.
		 * @param {number} boxHeight Value in points representing height of the box to contain the signature image.
		 * @param {string} sysId Sys_id of the signature image in the Attachments [sys_attachment] table.
		 *
		 * @returns {void} 
		 */
		addSignatureMapping(pageNumber: number, leftMargin: number, topMargin: number, boxWidth: number, boxHeight: number, sysId: string): void
		
		/**
		 *
		 * Creates a signature request with source and target inputs.
		 *
		 * @param {string} targetSysId Sys_id of a PDF in the Attachments [sys_attachment] table. Use this value as the target PDF on which to add a signature.
		 * @param {string} targetTable Name of the table containing the record to which the PDF is attached. You can find this value in the same row as the attachment listed in the Attachments [sys_attachment] table.
		 * @param {string} tableSysId Sys_id of the record to which the PDF is attached. You can find this value in the same row as the attachment listed in the Attachments [sys_attachment] table.
		 * @param {string} targetFileName Name of the target PDF without extension.
		 *
		 * @returns {void} 
		 */
		createRequest(targetSysId: string, targetTable: string, tableSysId: string, targetFileName: string): void
		
		/**
		 *
		 * Processes requests and adds the signatures.
		 *
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		processRequest(): any
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.  
	 *   
	 * This API is a component used with the [Document API](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI "The Document API provides methods to initialize a PDF, add content, and close the PDF. After adding content, the document can be attached to a target record.") to generate a PDF.
	 * 
	 */
	class PdfPage {
	
		/**
		 *
		 * @param {string} pageSize PDF page size.
		 * 
		 * Valid values:
		 * 
		 * *   A4 – 595 x 842 points
		 * *   EXECUTIVE – 522 x 756 points
		 * *   LETTER – 612 x 792 points
		 * *   LEDGER – 792 x 1224 points
		 * @param {string} orientation Optional. PDF page orientation.
		 * 
		 * Valid values:
		 * 
		 * *   LANDSCAPE
		 * *   PORTRAIT
		 * 
		 * Default: PORTRAIT
		 *
		 */
		constructor(pageSize: string, orientation: string)
		
		/**
		 *
		 * Gets the Y-coordinate of the lower edge of a PDF page.
		 *
		 *
		 * @returns {number} Decimal value of the Y-coordinate at the lower edge of the PDF page.
		 */
		getBottom(): number
		
		/**
		 *
		 * Gets the X-coordinate of the left edge of a PDF page.
		 *
		 *
		 * @returns {number} Decimal value of the X-coordinate on the left edge of the page.
		 */
		getLeft(): number
		
		/**
		 *
		 * Gets the size of a PDF page
		 *
		 *
		 * @returns {void} 
		 */
		getPdfPageSize(): void
		
		/**
		 *
		 * Gets the X-coordinate of the right edge of a PDF page.
		 *
		 *
		 * @returns {number} Decimal value of the X-coordinate on the right edge of the page.
		 */
		getRight(): number
		
		/**
		 *
		 * Gets the Y-coordinate of the upper edge of a PDF page.
		 *
		 *
		 * @returns {number} Decimal value of the Y-coordinate at the upper edge of the PDF page.
		 */
		getTop(): number
		
		/**
		 *
		 * Gets the width of a PDF page.
		 *
		 *
		 * @returns {number} Size of the page width in points.
		 */
		getWidth(): number
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.  
	 *   
	 * This API is a component used with the [Document API](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI "The Document API provides methods to initialize a PDF, add content, and close the PDF. After adding content, the document can be attached to a target record.") to generate a PDF.  
	 *   
	 * You can apply custom styles to the following API elements:
	 * 
	 * *   [Cell](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI#Cell-addStyle_O "Applies a predefined style to table cells.")
	 * *   [Paragraph](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/ParagraphBothAPI#Paragraph-addStyle_O "Applies a predefined style to paragraph text.")
	 * *   [Table](dev.do#!/reference/api/rome/server/ "Sets the default style to apply to the table.")
	 * 
	 */
	class Style {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Specifies a background color of an element.
		 *
		 * @param {{[fieldName: string]: string}} color Background color.
		 *
		 * @returns {void} 
		 */
		setBackgroundColor(color: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets a style to bold font.
		 *
		 *
		 * @returns {void} 
		 */
		setBold(): void
		
		/**
		 *
		 * Sets the style border on all four sides of an element.
		 *
		 * @param {number} width Style border width in points.
		 *
		 * @returns {void} 
		 */
		setBorder(width: number): void
		
		/**
		 *
		 * Sets the style border to the bottom of an element.
		 *
		 * @param {number} width Style border width in points.
		 *
		 * @returns {void} 
		 */
		setBorderBottom(width: number): void
		
		/**
		 *
		 * Sets the style border on the left side of an element.
		 *
		 * @param {number} width Style border width in points.
		 *
		 * @returns {void} 
		 */
		setBorderLeft(width: number): void
		
		/**
		 *
		 * Sets the style border on the right side of an element.
		 *
		 * @param {number} width Style border width in points.
		 *
		 * @returns {void} 
		 */
		setBorderRight(width: number): void
		
		/**
		 *
		 * Sets the style border to the top of an element.
		 *
		 * @param {number} width Style border width in points.
		 *
		 * @returns {void} 
		 */
		setBorderTop(width: number): void
		
		/**
		 *
		 * Sets style border with color on all four sides of an element.
		 *
		 * @param {number} width Style border width in points.
		 * @param {{[fieldName: string]: string}} color Style border color.
		 *
		 * @returns {void} 
		 */
		setColoredBorder(width: number, color: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets style border with color to the bottom side of an element.
		 *
		 * @param {number} width Style border width in points.
		 * @param {{[fieldName: string]: string}} color Style border color.
		 *
		 * @returns {void} 
		 */
		setColoredBorderBottom(width: number, color: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets style border with color on the left side of an element.
		 *
		 * @param {number} width Style border width in points.
		 * @param {{[fieldName: string]: string}} color Style border color.
		 *
		 * @returns {void} 
		 */
		setColoredBorderLeft(width: number, color: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets style border with color on the right side of an element.
		 *
		 * @param {number} width Style border width in points.
		 * @param {{[fieldName: string]: string}} color Style border color.
		 *
		 * @returns {void} 
		 */
		setColoredBorderRight(width: number, color: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets style border with color to the top side of an element.
		 *
		 * @param {number} width Style border width in points.
		 * @param {{[fieldName: string]: string}} color Style border color.
		 *
		 * @returns {void} 
		 */
		setColoredBorderTop(width: number, color: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets a font color.
		 *
		 * @param {{[fieldName: string]: string}} color Font color.
		 *
		 * @returns {void} 
		 */
		setFontColor(color: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets a style font size.
		 *
		 * @param {number} fontSize Font size in points.
		 *
		 * @returns {void} 
		 */
		setFontSize(fontSize: number): void
		
		/**
		 *
		 * Sets the horizontal alignment for a style.
		 *
		 * @param {string} alignment Horizontal alignment setting.
		 * 
		 * Valid values:
		 * 
		 * *   center: Align contents to the center.
		 * *   left: Align contents to the left.
		 * *   right: Align contents to the right.
		 *
		 * @returns {void} 
		 */
		setHorizontalAlignment(alignment: string): void
		
		/**
		 *
		 * Sets a style to italic font.
		 *
		 *
		 * @returns {void} 
		 */
		setItalic(): void
		
		/**
		 *
		 * Sets the padding of all four sides of an element to the same width.
		 *
		 * See also:
		 * 		 * 
		 * 		 * *   [setPaddingBottom()](dev.do#!/reference/api/rome/server/ "Sets the value of the bottom padding width of an element.")
		 * 		 * *   [setPaddingLeft()](dev.do#!/reference/api/rome/server/ "Sets the value of the left padding width of an element.")
		 * 		 * *   [setPaddingRight()](dev.do#!/reference/api/rome/server/ "Sets the value of the right padding width of a style.")
		 * 		 * *   [setPaddingTop()](dev.do#!/reference/api/rome/server/ "Sets the value of the top padding width of an element.")
		 *
		 * @param {number} padding Padding width in points as a decimal value.
		 *
		 * @returns {void} 
		 */
		setPadding(padding: number): void
		
		/**
		 *
		 * Sets the value of the bottom padding width of an element.
		 *
		 * See also:
		 * 		 * 
		 * 		 * *   [setPadding()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI#Style-setPadding_N "Sets the padding of all four sides of an element to the same width.")
		 * 		 * *   [setPaddingLeft()](dev.do#!/reference/api/rome/server/ "Sets the value of the left padding width of an element.")
		 * 		 * *   [setPaddingRight()](dev.do#!/reference/api/rome/server/ "Sets the value of the right padding width of a style.")
		 * 		 * *   [setPaddingTop()](dev.do#!/reference/api/rome/server/ "Sets the value of the top padding width of an element.")
		 *
		 * @param {number} padding Padding width in points as a decimal value.
		 *
		 * @returns {void} 
		 */
		setPaddingBottom(padding: number): void
		
		/**
		 *
		 * Sets the value of the left padding width of an element.
		 *
		 * See also:
		 * 		 * 
		 * 		 * *   [setPadding()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI#Style-setPadding_N "Sets the padding of all four sides of an element to the same width.")
		 * 		 * *   [setPaddingBottom()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI#Style-setPaddingBottom_N "Sets the value of the bottom padding width of an element.")
		 * 		 * *   [setPaddingRight()](dev.do#!/reference/api/rome/server/ "Sets the value of the right padding width of a style.")
		 * 		 * *   [setPaddingTop()](dev.do#!/reference/api/rome/server/ "Sets the value of the top padding width of an element.")
		 *
		 * @param {number} padding Padding width in points as a decimal value.
		 *
		 * @returns {void} 
		 */
		setPaddingLeft(padding: number): void
		
		/**
		 *
		 * Sets the value of the right padding width of a style.
		 *
		 * See also:
		 * 		 * 
		 * 		 * *   [setPadding()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI#Style-setPadding_N "Sets the padding of all four sides of an element to the same width.")
		 * 		 * *   [setPaddingBottom()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI#Style-setPaddingBottom_N "Sets the value of the bottom padding width of an element.")
		 * 		 * *   [setPaddingLeft()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI#Style-setPaddingLeft_N "Sets the value of the left padding width of an element.")
		 * 		 * *   [setPaddingTop()](dev.do#!/reference/api/rome/server/ "Sets the value of the top padding width of an element.")
		 *
		 * @param {number} padding Padding width in points as a decimal value.
		 *
		 * @returns {void} 
		 */
		setPaddingRight(padding: number): void
		
		/**
		 *
		 * Sets the value of the top padding width of an element.
		 *
		 * See also:
		 * 		 * 
		 * 		 * *   [setPadding()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI#Style-setPadding_N "Sets the padding of all four sides of an element to the same width.")
		 * 		 * *   [setPaddingBottom()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI#Style-setPaddingBottom_N "Sets the value of the bottom padding width of an element.")
		 * 		 * *   [setPaddingLeft()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI#Style-setPaddingLeft_N "Sets the value of the left padding width of an element.")
		 * 		 * *   [setPaddingRight()](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI#Style-setPaddingRight_N "Sets the value of the right padding width of a style.")
		 *
		 * @param {number} padding Padding width in points as a decimal value.
		 *
		 * @returns {void} 
		 */
		setPaddingTop(padding: number): void
		
		/**
		 *
		 * Sets the text alignment for a style.
		 *
		 * @param {string} alignment Text alignment position.
		 * 
		 * Valid values:
		 * 
		 * *   text-center: Aligns text to the center.
		 * *   text-justified: Modifies the space between characters to completely fill text between the left and right sides. The final line is left-aligned.
		 * *   text-justified-all: Justifies text alignment including the final line.
		 * *   text-left: Align text to the left.
		 * *   text-right: Align text to the right.
		 *
		 * @returns {void} 
		 */
		setTextAlignment(alignment: string): void
		
		/**
		 *
		 * Sets the vertical alignment for this element.
		 *
		 * @param {string} alignment Vertical alignment setting.
		 * 
		 * Valid values:
		 * 
		 * *   bottom: Aligns contents to the bottom.
		 * *   mid: Aligns contents to the center.
		 * *   top: Aligns contents to the top.
		 *
		 * @returns {void} 
		 */
		setVerticalAlignment(alignment: string): void
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.  
	 *   
	 * See also [PDFGenerationAPI](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/PDFGenerationAPIBothAPI "Provides support for PDF conversion and handling PDF fields.").
	 * 
	 */
	class SVGToPDFConversionAPI {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Adds an SVG image to a PDF on a specified page with image size and location coordinates.
		 *
		 * @param {string} svg SVG to convert to a PDF document.
		 * @param {string} inputPdfSysId Sys_id of the target PDF in which to create a copy of with an SVG. The target PDF is in the Attachments [sys_attachment] table.
		 * @param {string} targetTable Name of the table containing the record to which the PDF is attached. You can find this value in the same row as the attachment listed in the Attachments [sys_attachment] table.
		 * @param {string} targetTableSysId Sys_id of the record to which the PDF is attached. You can find this value in the same row as the attachment listed in the Attachments [sys_attachment] table.
		 * @param {string} targetTable Name of the table on which to attach the converted PDF.
		 * @param {string} targetTableSysId Sys_id of the record on which to attach the converted PDF.
		 * @param {string} pdfName Name to give the PDF.
		 * 
		 * Default: Sys_id of the PDF in the Attachments [sys_attachment] table.
		 * @param {number} pageNo Page number in the attached PDF on which to place the SVG.
		 * @param {number} x Horizontal position of the SVG in the page. Value is in points.
		 * @param {number} y Vertical position of the SVG in the page. Value is in points.
		 * @param {number} svgImgWidth Width of the SVG image in pixels.
		 * @param {number} svgImgHeight Height of the SVG image in pixels.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		addSVGToPDF(svg: string, inputPdfSysId: string, targetTable: string, targetTableSysId: string, targetTable: string, targetTableSysId: string, pdfName: string, pageNo: number, x: number, y: number, svgImgWidth: number, svgImgHeight: number): any
		
		/**
		 *
		 * Converts an SVG provided as string to PDF.
		 *
		 * @param {string} svg SVG to convert to a PDF document.
		 * @param {string} pdfName Name to give the PDF.
		 * 
		 * Default: Sys_id of the PDF in the Attachments [sys_attachment] table.
		 * @param {string} targetTable Name of the table on which to attach the converted PDF.
		 * @param {string} targetTableSysId Sys_id of the record on which to attach the converted PDF.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		convertSVGToPDF(svg: string, pdfName: string, targetTable: string, targetTableSysId: string): any
		
		/**
		 *
		 * Converts an SVG provided as string to PDF with image width and height values.
		 *
		 * @param {string} svg SVG to convert to a PDF document.
		 * @param {string} pdfName Name to give the PDF.
		 * 
		 * Default: Sys_id of the PDF in the Attachments [sys_attachment] table.
		 * @param {string} targetTable Name of the table on which to attach the converted PDF.
		 * @param {string} targetTableSysId Sys_id of the record on which to attach the converted PDF.
		 * @param {number} svgImgWidth Width of the SVG image in pixels.
		 * @param {number} svgImgHeight Height of the SVG image in pixels.
		 *
		 * @returns {any} Status indicating whether the operation is successful.
		 * 
		 * Possible values:
		 * 
		 * *   success - Operation was successful.
		 * *   failure – Operation was not successful. The message provides details.
		 * 
		 * Data type: String
		 */
		convertSVGToPDFWithSize(svg: string, pdfName: string, targetTable: string, targetTableSysId: string, svgImgWidth: number, svgImgHeight: number): any
		
	}
	
	/** 
	 * This API is part of the ServiceNow PDF Generation Utilities plugin (com.snc.apppdfgenerator) and is provided within the sn_pdfgeneratorutils namespace. The plugin is activated by default.
	 * 
	 * This API is a component used with the [Document API](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI "The Document API provides methods to initialize a PDF, add content, and close the PDF. After adding content, the document can be attached to a target record.") to generate a PDF.
	 * 
	 * Build a Table object using the methods in this class. You can use these additional classes to add cells, paragraphs, and styles to your table:
	 * 
	 * [Cell API](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/CellBothAPI "Creates a Cell object as a cell in a table. You can use this API to format the cell and include additional blocks, such as paragraphs and images.")
	 * 
	 * Create a cell using the Cell API. Then, add the cell to your table using one of these methods:
	 * 
	 * *   Table.addCell()
	 * *   Table.addCellWithStyle()
	 * *   Table.addHeaderCell()
	 * *   Table.addImageCell()
	 * *   Table.addParagraphCell()
	 * *   Table.addTextCell()
	 * 
	 * [Paragraph API](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/ParagraphBothAPI "Creates a Paragraph object representing a block of text in a PDF.")
	 * 
	 * Create a paragraph using the Paragraph API. Add the paragraph to a cell in the table using Cell.addParagraph().
	 * 
	 * [Style API](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/StyleBothAPI "Creates a style for defining properties such font size, border, and alignment. You can apply the same style to multiple objects simultaneously.")
	 * 
	 * Set styles, colors, and borders using the Style API. Add the styles to the table using one of these methods:
	 * 
	 * *   Table.setDefaultStyle()
	 * *   Table.setHeaderStyle()
	 * 
	 * You can then apply the Table object to a PDF document using the following class and method.
	 * 
	 * [Document API](dev.do#!/reference/api/rome/server/sn_pdfgeneratorutils-namespace/DocumentBothAPI "The Document API provides methods to initialize a PDF, add content, and close the PDF. After adding content, the document can be attached to a target record.")
	 * 
	 * Use the Document.addTable() method to add your table to a PDF document. You can use the Document.saveAsAttachment() method to attach the document to a record.
	 * 
	 */
	class Table {
	
		/**
		 *
		 * @param {{[fieldName: string]: string}} columnWidths Numbers specifying the width of each column in a table. Sizes are based proportionally. For example, `var columnWidths = [2, 1, 1];` is a three-column table with a first column twice as large as the other two.
		 * 
		 * Default: Each column is equal width.
		 * @param {boolean} largeTable Flag that indicates whether 100% width and fixed layout are set implicitly.
		 * 
		 * Valid values:
		 * 
		 * *   true: Table uses 100% width with a fixed layout. If true, use the complete() method when all content has been added to indicate that the table is complete.
		 * *   false: Automatic table size.
		 * 
		 * Default: false
		 *
		 */
		constructor(columnWidths: {[fieldName: string]: string}, largeTable: boolean)
		
		/**
		 *
		 * Adds a cell element to the table.
		 *
		 * @param {{[fieldName: string]: string}} cell Cell element to add to the table.
		 *
		 * @returns {void} 
		 */
		addCell(cell: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Adds a cell element with an applied style to the table.
		 *
		 * @param {{[fieldName: string]: string}} cell Cell object to add to the table.
		 * @param {{[fieldName: string]: string}} style Style to apply to the cell.
		 *
		 * @returns {void} 
		 */
		addCellWithStyle(cell: {[fieldName: string]: string}, style: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Adds a header Cell object to the table.
		 *
		 * @param {{[fieldName: string]: string}} cell Header cell to add to the table.
		 *
		 * @returns {void} 
		 */
		addHeaderCell(cell: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Adds a cell that contains an image to the table.
		 *
		 * @param {{[fieldName: string]: string}} image Image object to add to the cell.
		 *
		 * @returns {void} 
		 */
		addImageCell(image: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Adds a cell that contains a paragraph to the table.
		 *
		 * @param {{[fieldName: string]: string}} p Paragraph object to add to the cell.
		 *
		 * @returns {void} 
		 */
		addParagraphCell(p: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Adds a cell that contains a string to the table.
		 *
		 * @param {string} text Text to add to the cell.
		 *
		 * @returns {void} 
		 */
		addTextCell(text: string): void
		
		/**
		 *
		 * Indicates that all the intended content has been added to a large table.
		 *
		 * Use with the Table.flush() method to add additional content to a table already added to a document. This method only applies when the largeTable parameter in the constructor is set to true.
		 *
		 *
		 * @returns {void} 
		 */
		complete(): void
		
		/**
		 *
		 * Prevents splitting a row across two pages, when possible.
		 *
		 * @param {boolean} value Flag that indicates whether to split a row across two pages, or move the entire row onto the second page. However, this property does not apply when the row spans more than a single page.
		 * 
		 * Valid values:
		 * 
		 * *   true: If the remaining part of a page is not large enough for the row, adds the entire row to a new page.
		 * *   false: If the remaining part of a page is not large enough for the row, splits the row across two pages.
		 * 
		 * Default: false
		 *
		 * @returns {void} 
		 */
		donotSplitRowOnPageBreak(value: boolean): void
		
		/**
		 *
		 * Adds additional content to a table that is already added to a document.
		 *
		 * Use with the Table.complete() method to indicate that you have added all additional content to the table. This method only applies when the largeTable parameter in the constructor is set to true.
		 *
		 *
		 * @returns {void} 
		 */
		flush(): void
		
		/**
		 *
		 * Returns the default style.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Default style.
		 */
		getDefaultStyle(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the style applied to the table's header.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} Style applied to the table's header.
		 */
		getHeaderStyle(): {[fieldName: string]: string}
		
		/**
		 *
		 * Sets a border of designated width around the outer edges of the table.
		 *
		 * @param {number} width Width of the border.
		 * 
		 * Unit: Points
		 *
		 * @returns {void} 
		 */
		setBorder(width: number): void
		
		/**
		 *
		 * Sets the table's default background color.
		 *
		 * @param {{[fieldName: string]: string}} color Color object used as the default background color for the table.
		 *
		 * @returns {void} 
		 */
		setDefaultbackGroundColor(color: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets the default style to apply to the table.
		 *
		 * @param {{[fieldName: string]: string}} defaultStyle Default style to apply to the table.
		 *
		 * @returns {void} 
		 */
		setDefaultStyle(defaultStyle: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets the table to a fixed position on the page.
		 *
		 * @param {number} pageNumber Number of the page to add the table to.
		 * @param {number} left Number of pixels from the left margin to add the table.
		 * 
		 * Unit: Points
		 * @param {number} bottom Number of pixels from the bottom margin to add the table.
		 * 
		 * Unit: Points
		 * @param {number} width Width of the table.
		 * 
		 * Unit: Points
		 *
		 * @returns {void} 
		 */
		setFixedPosition(pageNumber: number, left: number, bottom: number, width: number): void
		
		/**
		 *
		 * Sets the Style object to apply to the table's header.
		 *
		 * @param {{[fieldName: string]: string}} headerStyle Style object to apply to the table's header.
		 *
		 * @returns {void} 
		 */
		setHeaderStyle(headerStyle: {[fieldName: string]: string}): void
		
		/**
		 *
		 * Sets the horizontal alignment of the table.
		 *
		 * @param {string} alignment Alignment for the table.
		 * 
		 * Valid values:
		 * 
		 * *   center: Align contents to the center.
		 * *   left: Align contents to the left.
		 * *   right: Align contents to the right.
		 *
		 * @returns {void} 
		 */
		setHorizontalAlignment(alignment: string): void
		
		/**
		 *
		 * Sets all margins around the table to the same width.
		 *
		 * @param {number} margin Value of the top, right, bottom, and left margins in points.
		 *
		 * @returns {void} 
		 */
		setMargin(margin: number): void
		
		/**
		 *
		 * Sets the margin at the bottom of the page.
		 *
		 * @param {number} margin Height of the bottom margin in points.
		 *
		 * @returns {void} 
		 */
		setMarginBottom(margin: number): void
		
		/**
		 *
		 * Sets the margin at the left side of the page.
		 *
		 * @param {number} margin Width of the left margin in points.
		 *
		 * @returns {void} 
		 */
		setMarginLeft(margin: number): void
		
		/**
		 *
		 * Sets the margin at the right side of the page.
		 *
		 * @param {number} margin Width of the right margin in points.
		 *
		 * @returns {void} 
		 */
		setMarginRight(margin: number): void
		
		/**
		 *
		 * Sets a margin at the top of the page.
		 *
		 * @param {number} margin Height of the top margin in points.
		 *
		 * @returns {void} 
		 */
		setMarginTop(margin: number): void
		
		/**
		 *
		 * Sets the table's total width.
		 *
		 * @param {number} width Width of the table.
		 * 
		 * Unit: Points
		 *
		 * @returns {void} 
		 */
		setWidth(width: number): void
		
		/**
		 *
		 * Expands the table to use the entire width available on the page.
		 *
		 *
		 * @returns {void} 
		 */
		useAllAvailableWidth(): void
		
	}
	
}