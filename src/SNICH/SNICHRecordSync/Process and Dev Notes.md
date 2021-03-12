## Pull New Record(s)
- Select Instance
- Load "Configured Tables for instance" and ask to "Select table"
- Then make HTTP Call for records on that table
- Present list to select "many" files
    - Sorted by updated of course...
- After selecting, make a paralellel call for all those records
- Paralell write files to disk, and to DB, where we are looking in the DB if the file exists or not
- If one file only was synced, open that file

## Pull All Records (Package)
- Select Instance
- Get list of packages from instance
- Upon selection...
- Load all tables for instance
- Show Progress Message... 
- for each table, build all the getRecords calls
- Promise.allSettled those
- For each grouping of records...
- Build new promise array of all records data
- Paralell write to disk, checking Upserting to DB
- Update progress message completed...


## Watch File for Save
- onWillSave
  - Make a copy of the file ".old" (into the .snich/temp folder) to compare on server (We do not compare here, since this is limited to 1 second or will be aborted by vscode);
- onDidSave
    - Look in packagefile DB we need to find this file by flatted file path
    - This will give us.. instance_id
    - Load instance from found file instance_id
    - Make a call to get current record content for field
    - Hash ".old" file content, to compare with content on server
    - If content is the same, proceed with save
    - If content is different, prompt for "Overwrite local, overwrite remote, compare window"
    - Based on action, do the thing... 


## Watch File for Delete


## Watch 