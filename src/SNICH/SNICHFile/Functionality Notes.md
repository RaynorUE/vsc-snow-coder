
SNICHFile --- It should be used for all File management to/from SN Instance? As WSFileMan and backfileMan will take care of 
everything local? 

The idea is that SNICHFile will take care of writing to the DB the "list of synced recors/fields as files" which means we need a minimum amount of info about the file..
This will handle all aspects of the file, the filename,the path, etc, and should have the inputs to support doing that dynamically based on the TableConfig

- Instance it belongs to
- SysPackage it belongs to (if applicable) as we'd like to save non package files too
- The table name 
- The SysID
- The column name being saved
- The TableConfig
- The "Synced Field" details
- It should detect if there are multiple synced fields, and append folder paths accordingly.

# saveApplicationFile
- Inputs
    - SNICHInstance
    - SNICHPackage
    - TableConfig
    - TableName
    - SysId
    - ColumnName
    - FileName
    - Content