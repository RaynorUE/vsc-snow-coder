declare namespace sn_clotho {

	/** 
	 * The Client class can be used in scoped and global server scripts. When using the Client class, use the sn_clotho namespace identifier.  
	 *   
	 * This class is part of the MetricBase application.
	 * 
	 */
	class Client {
	
		/**
		 *
		 *
		 */
		constructor()
		
		/**
		 *
		 * Remove the data in the MetricBase database associated with the specified metric in the specified GlideRecord. Use this method for removing test data.
		 *
		 * Note: This method deletes data from the MetricBase database. There is no recovery mechanism.
		 *
		 * @param {GlideRecord} now_GR The records whose time series data for the specified metric is to be deleted.
		 * @param {string} metric The name of the metric.
		 *
		 * @returns {void} Method does not return a value
		 */
		deleteSeries(now_GR: GlideRecord, metric: string): void
		
		/**
		 *
		 * Saves metric data to the MetricBase database.
		 *
		 * @param {{[fieldName: string]: string}} metricData One of the following:
		 * 
		 * *   [DataBuilder](https://docs.servicenow.com/bundle/rome-application-development/page/app-store/dev_portal/API_reference/DataBuilderScoped/concept/DataBuilderScopedAPI.html) object containing metric data.
		 * *   Array of DataBuilder objects containing metric data.
		 *
		 * @returns {void} Method does not return a value
		 */
		put(metricData: {[fieldName: string]: string}): void
		
	}
	
	/** 
	 * Do not use a constructor to create an instance of this class, instead use the object returned by the sn_clotho.Client.transform() method.  
	 *   
	 * The Data class can be used in scoped and global server scripts. When using the Data class, use the sn_clotho namespace identifier.  
	 *   
	 * This class is part of the MetricBase application.
	 * 
	 */
	class Data {
	
		/**
		 *
		 * Returns the end time for data in the Data object.
		 *
		 *
		 * @returns {GlideDateTime} The end of the time period.
		 */
		getEnd(): GlideDateTime
		
		/**
		 *
		 * Returns the label assigned by the sn_clotho.ClothoTransform.label() method.
		 *
		 *
		 * @returns {string} The label assigned to the data.
		 */
		getLabel(): string
		
		/**
		 *
		 * Returns the name of the metric of the data series. Returns null when the data object is associated with multiple data series.
		 *
		 *
		 * @returns {string} Name of the metric field. Returns null when the data object is associated with multiple data series.
		 */
		getMetricName(): string
		
		/**
		 *
		 * Returns the time period in milliseconds.
		 *
		 *
		 * @returns {number} The elapsed time in seconds.
		 */
		getPeriod(): number
		
		/**
		 *
		 * Returns the start time for data in the Data object.
		 *
		 *
		 * @returns {GlideDateTime} The time for the first data point.
		 */
		getStart(): GlideDateTime
		
		/**
		 *
		 * Returns the subject of the data series. Returns null when the data object is associated with multiple data series.
		 *
		 *
		 * @returns {string} The subject field value of the subject GlideRecord. This is generally the sys_id of the subject GlideRecord.
		 */
		getSubject(): string
		
		/**
		 *
		 * Returns the name of the table assigned in the DataSelector class constructor. Returns null when the data object is associated with multiple data series.
		 *
		 *
		 * @returns {string} Table name. Returns null when the data object is associated with multiple data series.
		 */
		getTableName(): string
		
		/**
		 *
		 * Returns an array of values.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} An array of numbers.
		 */
		getValues(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the number of values in the Data object.
		 *
		 *
		 * @returns {number} The number of values in the object.
		 */
		size(): number
		
	}
	
	/** 
	 * The DataBuilder class can be used in scoped and global server scripts. When using the DataBuilder class, use the sn_clotho namespace identifier.  
	 *   
	 * This class is part of the MetricBase application.
	 * 
	 */
	class DataBuilder {
	
		/**
		 *
		 * @param {{[fieldName: string]: string}} glideRecord GlideRecord from which to obtain the domain.
		 * @param {string} subject The sys_id of the GlideRecord associated with this series.
		 * @param {string} metric The field name of the metric.
		 *
		 */
		constructor(glideRecord: {[fieldName: string]: string}, subject: string, metric: string)
		
		/**
		 *
		 * Add a series of data points to the DataBuilder object. Each data point is a time stamp and a value.
		 *
		 * Uses the start parameter and the retention policy collection period to calculate the time stamp for each value in the array. The first value has the start parameter as the time stamp. This method does not save the data in the MetricBase database. Use the sn_clotho.Client.put() method to save the values.
		 *
		 * @param {GlideDateTime} start The time stamp for the first data point. Subsequent time stamps are calculated using the retention policy collection period.
		 * @param {{[fieldName: string]: string}} value An array of numbers.
		 *
		 * @returns {DataBuilder} The same DataBuilder object.
		 */
		add(start: GlideDateTime, value: {[fieldName: string]: string}): DataBuilder
		
		/**
		 *
		 * Add a data point to the DataBuilder object. Each data point is a time stamp and a value. This method does not save the data point in the metric. Use the sn_clotho.Client.put() method to save the values.
		 *
		 * @param {GlideDateTime} start The time stamp for the data point.
		 * @param {number} value The value of the data point.
		 *
		 * @returns {DataBuilder} The DataBuilder object.
		 */
		add(start: GlideDateTime, value: number): DataBuilder
		
	}
	
	/** 
	 * The Transformer class can be used in scoped and global server scripts. When using the Transformer class, use the sn_clotho namespace identifier.  
	 *   
	 * The general use case is to determine the period to be evaluated, select the records from the table with the metric field, define the type of transform to run, and then execute the transform.
	 * 
	 *     // create the start and end time
	 *            var start = new GlideDateTime();
	 *     	start.addSeconds(-1 * 60 * 60); 
	 *     	var end = new GlideDateTime();
	 *     	
	 *     	//mb_demo_drone is a table with metric fields. 
	 *     	var drones = new GlideRecord("mb_demo_drone");
	 *     	drones.addQuery("model", "Kingfisher Phantom");
	 *     	drones.query();
	 *     
	 *     	//build a transform that returns a simple average
	 *     	var builder = new sn_clotho.Transformer(drones);
	 *     	builder.metric("mb_demo_mt_rem_battery").avg().label("Original");
	 *     
	 *     	//execute transform and return result for visualization
	 *     	var result = builder.execute(start,end);
	 * 
	 *   
	 *   
	 * This class is part of the MetricBase application.
	 * 
	 */
	class Transformer {
	
		/**
		 *
		 * @param {GlideRecord} sourceRecords Contains the records for which metrics are to be evaluated. Can be one record or many.
		 *
		 */
		constructor(sourceRecords: GlideRecord)
		
		/**
		 *
		 * Run the transform.
		 *
		 * Use the metric() and groupBy() methods before calling execute(). The execute() method can only be called once for each Transformer object.
		 * 		 * 
		 * 		 * Actions performed as part of the transform do not change the data in the MetricBase database.
		 *
		 * @param {GlideDateTime} start The beginning of the period to be evaluated.
		 * @param {GlideDateTime} end The end of the period to be evaluated.
		 *
		 * @returns {TransformResult} The transformed data.
		 */
		execute(start: GlideDateTime, end: GlideDateTime): TransformResult
		
		/**
		 *
		 * Specify a field to be used to group the data.
		 *
		 * If you are going to use the groupBy() method, it must be called before the execute() method.
		 *
		 * @param {string} field A field in the table to be used to group the transform results.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify the transform characteristics.
		 */
		groupBy(field: string): TransformPart
		
		/**
		 *
		 * Specify the metric field to be used in the transform.
		 *
		 * You can specify multiple metrics to be used in the transform. The metric() method cannot be called after the execute() method is called.
		 *
		 * @param {string} metricName Name of the metric field.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify the transform characteristics.
		 */
		metric(metricName: string): TransformPart
		
	}
	
	/** 
	 * The TransformPart class can be used in scoped and global server scripts. When using the TransformPart class, use the sn_clotho namespace identifier.  
	 *   
	 * There is no constructor for this class. TransformPart objects are returned by many Transformer and TransformPart methods.  
	 *   
	 * The methods of this class define the transforms to be done. The actual transformation is done when the execute() method is called on the Transformer object.  
	 *   
	 * The order the TransformPart methods are called is important.
	 * 
	 * *   You must call the metric() method before calling a transform method.
	 * *   You cannot use the metric() or groupBy() methods after calling a transform method.
	 * *   Intermediate transforms are not returned in a result unless the collect() method is called for the intermediate result you want.
	 *     
	 *         // where tp is a TransformPart object
	 *         // example 1
	 *         tp.avg().add(2);
	 *         var tr = tp.execute(); 
	 *         // tr contains avg+2, but not avg
	 *          
	 *         // example 2
	 *         tp.avg().add(2);
	 *         tp.avg();
	 *         var tr = tp.execute(); 
	 *         // tr contains both avg and avg + 2
	 *         
	 *         // example 3
	 *         tp.avg().collect().add(2);
	 *         var tr = tp.execute(); 
	 *         // tr contains both avg and avg + 2
	 *     
	 * 
	 *   
	 *   
	 * This class is part of the MetricBase application.
	 * 
	 */
	class TransformPart {
	
		/**
		 *
		 * Add the specified number to the value in each time stamp.
		 *
		 * @param {number} constant The number to add to the value in each time stamp.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		add(constant: number): TransformPart
		
		/**
		 *
		 * Aggregate the selected metric series into one series containing the average value for each time stamp.
		 *
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		avg(): TransformPart
		
		/**
		 *
		 * Create a result set that for each time stamp returns specified number of bottom values. This method results in 'count' number of series. Each value retains the label of its source series.
		 *
		 * @param {number} count The number of series to return. The series are labeled 0 to count - 1.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		bottom(count: number): TransformPart
		
		/**
		 *
		 * Replace the value in any time stamp that is greater than the specified value with the specified value.
		 *
		 * @param {number} ceiling The maximum allowed value for any time stamp.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		ceil(ceiling: number): TransformPart
		
		/**
		 *
		 * Mark this transform for collection.
		 *
		 * Transforms that are part of a chain, but not the last transform, are by default not collected. A collected transform is returned as part of the transform result.
		 *
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		collect(): TransformPart
		
		/**
		 *
		 * Aggregate the selected metric series into one series containing the number of values for each time stamp.
		 *
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		count(): TransformPart
		
		/**
		 *
		 * Divide the value in each time stamp by the specified number.
		 *
		 * @param {number} constant The number by which to divide the value of each time stamp.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		div(constant: number): TransformPart
		
		/**
		 *
		 * Create a series using the specified aggregator for the specified time.
		 *
		 * @param {{[fieldName: string]: string}} aggregator Can be:
		 * 
		 * *   AVG
		 * *   CHISQUARE
		 * *   LAST
		 * *   MAX
		 * *   MEDIAN
		 * *   MIN
		 * *   STDDEV
		 * 
		 * For definitions of these options, see [MetricBase transforms](https://docs.servicenow.com/bundle/rome-application-development/page/use/reporting/reference/metricbase-transforms.html).
		 * @param {{[fieldName: string]: string}} duration Time period for the series.
		 *
		 * @returns {TransformPart} TransformPart object that you can use to specify transform characteristics.
		 */
		filter(aggregator: {[fieldName: string]: string}, duration: {[fieldName: string]: string}): TransformPart
		
		/**
		 *
		 * Replace the value in any time stamp that is less than the specified value with the specified value.
		 *
		 * @param {number} floor The minimum value for any time stamp.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		floor(floor: number): TransformPart
		
		/**
		 *
		 * Create series made up of the value that the specified percentage of values is below. Returns a series for each fraction in the specified array.
		 *
		 * The value in a time stamp in a returned series is the value at which the specified fraction of the samples for that time stamp is below. For example, if the fraction is 0.5, then the value in the time stamp is the value where half the values in the input series are below (median).
		 *
		 * @param {{[fieldName: string]: string}} fractions The fractions to use on the input series.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics. Contains one series for each fraction specified.
		 */
		fractiles(fractions: {[fieldName: string]: string}): TransformPart
		
		/**
		 *
		 * Return the part of the result relevant to this transform.
		 *
		 * The collect() method must be called before the execute() method, and the execute() method must be called before calling the getResult() method.
		 *
		 *
		 * @returns {TransformResult} Contains the transform results associated with this part of the transform.
		 */
		getResult(): TransformResult
		
		/**
		 *
		 * Specify a field to be used to group the data.
		 *
		 * The groupBy() method cannot be called after a transform has been run.
		 *
		 * @param {string} field A field in the table to be used to group the transform results.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		groupBy(field: string): TransformPart
		
		/**
		 *
		 * Create a data value for a NaN data item by interpolating from adjacent data values.
		 *
		 * @param {{[fieldName: string]: string}} count Specifies the number of data samples in each direction to check for a non NaN value. If if a non NaN value is not found, NaN is used.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		interpolate(count: {[fieldName: string]: string}): TransformPart
		
		/**
		 *
		 * Perform an Interquartile range transform.
		 *
		 * Creates a result set of four series.
		 * 		 * 
		 * 		 * *   IQR, the median of all entries
		 * 		 * *   IQR range, below Q1-1.5IQR, or above Q3+1.5IQR
		 * 		 * *   Q1, the median of the smallest half of entries
		 * 		 * *   Q3, the median of the largest half of entries
		 *
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		iqr(): TransformPart
		
		/**
		 *
		 * Add a label for the resulting series.
		 *
		 * @param {string} label The label for the transform results.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		label(label: string): TransformPart
		
		/**
		 *
		 * Returns at most the specified number of values, starting at the most recent non-NaN value.
		 *
		 * @param {{[fieldName: string]: string}} count A number of time stamps.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		limit(count: {[fieldName: string]: string}): TransformPart
		
		/**
		 *
		 * Run a logarithm on the value in each time stamp where the result is the log of the specified base for the time stamp value.
		 *
		 * @param {number} base The base for the logarithm calculation.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		log(base: number): TransformPart
		
		/**
		 *
		 * Returns a series with the maximum value for each time stamp.
		 *
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		max(): TransformPart
		
		/**
		 *
		 * Create a series containing the median of values for each time stamp across a set of series.
		 *
		 * If there are n series in the TranformPart object, then if n is odd, the (n / 2 + 1) value for a time stamp is the median. If n is even, the average of the (n / 2) and (n / 2 + 1) values for a time stamp is the median.
		 *
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		median(): TransformPart
		
		/**
		 *
		 * Specify the metric field to be used in the transform.
		 *
		 * You can specify multiple metrics to be used in the transform. The metric() method cannot be called after the transform has been run.
		 *
		 * @param {string} metric Name of the metric field.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		metric(metric: string): TransformPart
		
		/**
		 *
		 * Returns a series with the minimum value for each time stamp.
		 *
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		min(): TransformPart
		
		/**
		 *
		 * Multiply the value in each time stamp by the specified number.
		 *
		 * @param {number} constant The number by which to multiply the value of each time stamp.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		mul(constant: number): TransformPart
		
		/**
		 *
		 * Partition the series into intervals of the same duration.
		 *
		 * @param {string} aggregator The aggregator to use. Can be min, max, avg, or last.
		 * @param {{[fieldName: string]: string}} duration The interval length.
		 * @param {{[fieldName: string]: string}} base The zero offset for partitioning. For example, if you partition by day (24h), then set the base to Monday at midnight in your time zone. If you partition by 30 days, then set the base to 1st day of the most recent month.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		partition(aggregator: string, duration: {[fieldName: string]: string}, base: {[fieldName: string]: string}): TransformPart
		
		/**
		 *
		 * Specify the number of data points to include in the result.
		 *
		 * Aligns a series with a fixed number of data points in the given range. If the original series has more data points than specified, multiple values are averaged. If the original series has fewer data points than specified, data points are added by interpolating data points between existing data points.
		 * 		 * 
		 * 		 * You can use the resample() method to reduce the number of samples in the result to more closely match the number of samples you are going to display.
		 *
		 * @param {number} count The number of samples to include in the result.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		resample(count: number): TransformPart
		
		/**
		 *
		 * Specify the minimum and maximum number of samples to include in the result.
		 *
		 * This method is useful when you are showing series with different time periods (granularities).
		 * 		 * 
		 * 		 * This method determines the average number of points per series and if that fits between the specified minimum and maximum, each series is resampled to that average number of points. If the calculated average is greater than the maximum specified or smaller than the minimum specified, the specified maximum or minimum is used.
		 *
		 * @param {number} min The minimum number of samples to include in the result. If not enough samples are available, interpolation is used to create samples.
		 * @param {number} max The maximum number of samples to include in the result.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		resample(min: number, max: number): TransformPart
		
		/**
		 *
		 * Specify an aggregator to use to create a result set over the specified duration. The aggregator can be LAST, AVG, MIN, or MAX.
		 *
		 * Resamples the underlying data to the requested period.
		 * 		 * 
		 * 		 * *   When the time series is stored at a 1 minute interval and `resample(AVG, new GlideDuration("1:00"))` is called, the result will have one data point at every hour reflecting the average of the previous 60 values.
		 * 		 * *   When the period requested is smaller than the period of the data, interpolation is used to calculate the intervening data points.
		 * 		 * 
		 * 		 * You can use the resample() method to reduce the number of samples in the result to more closely match the number of samples you are going to display.
		 *
		 * @param {string} aggregator Can be LAST, AVG, MIN, or MAX.
		 * @param {GlideDuration} duration The time period for the result set.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		resample(aggregator: string, duration: GlideDuration): TransformPart
		
		/**
		 *
		 * Specify an aggregator to use to create a result set of the specified size. The aggregator can be LAST, AVG, MIN, or MAX.
		 *
		 * You can use the resample() method to reduce the number of samples in the result to more closely match the number of samples you are going to display.
		 *
		 * @param {string} aggregator Can be LAST, AVG, MIN, or MAX.
		 * @param {number} numValues The number of samples to include in the result set.
		 * 
		 * When the number of values requested is greater than the number of values in the data for the requested time period, interpolate() is used to add values between existing points to reach the requested number of values.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		resample(aggregator: string, numValues: number): TransformPart
		
		/**
		 *
		 * Round the value in each time stamp to the specified precision.
		 *
		 * Performs this calculation on each value.
		 * 		 * 
		 * 		 *     (v / precision) * precision
		 *
		 * @param {number} precision The value to be used in the rounding calculation.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		round(precision: number): TransformPart
		
		/**
		 *
		 * Create a series containing the standard deviation of values for each time stamp across a set of series.
		 *
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		stddev(): TransformPart
		
		/**
		 *
		 * Subtract the specified number from the value in each time stamp.
		 *
		 * @param {{[fieldName: string]: string}} constant The number to subtract from the value in each time stamp.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		sub(constant: {[fieldName: string]: string}): TransformPart
		
		/**
		 *
		 * Aggregate the selected metric series into one series containing the sum of all values for each time stamp.
		 *
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		sum(): TransformPart
		
		/**
		 *
		 * Create a result set that for each time stamp returns the specified number of top values. This method results in 'count' number of series. Each value retains the label of its source series.
		 *
		 * @param {number} count The number of series to return. The series are labeled 0 to count - 1.
		 *
		 * @returns {TransformPart} A TransformPart object that can be used to specify transform characteristics.
		 */
		top(count: number): TransformPart
		
	}
	
	/** 
	 * The TransformResult class can be used in scoped and global server scripts. When using the Transformer class, use the sn_clotho namespace identifier.  
	 *   
	 * There is no constructor for this class. TransformResult objects are returned by many TransformPart methods.  
	 *   
	 * This class is part of the MetricBase application.
	 * 
	 */
	class TransformResult {
	
		/**
		 *
		 * Returns an array of Data objects. Returns an error if no group was specified for the transform.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} An array of Data objects, with each object corresponding to a group.
		 */
		byGroup(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the transformed data with the specified label.
		 *
		 * @param {string} label The label that identifies the data to be retrieved.
		 *
		 * @returns {{[fieldName: string]: string}} The Data object with the transform results.
		 */
		getByLabel(label: string): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns a single Data object, or null if the result is empty.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The Data object with the transform results.
		 */
		getData(): {[fieldName: string]: string}
		
		/**
		 *
		 * Returns the transformed data as an array. This method turns a Data object into an array.
		 *
		 *
		 * @returns {{[fieldName: string]: string}} The Data object formatted as an array.
		 */
		toArray(): {[fieldName: string]: string}
		
	}
	
}