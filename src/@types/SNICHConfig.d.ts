declare namespace SNICHConfig {
    interface Instance {

        name: string;
        rootPath: vscodeUriRaw;
        _id: string | undefined;
        last_selected: number;

    }

    interface PreferenceMap {
        instance_id: string;
        _id: string | undefined;
        name: string;
        filename: string;
        description: string;
        global: boolean;
    }

    interface Connection {
        _id: string | undefined;
        instance_id: string;
        url: string;
        auth: Auth;
    }

    type authTypes = keyof typeof authTypeEnums

    interface Auth {
        type: authTypes;
        writeBasicToDisk: boolean;
        username: string;
        password: string;
        OAuth: OAuthData
    }

    interface OAuthData {
        client_id: string;
        client_secret: string;
        token_expires_on: number;
        token: OAuthToken

    }

    interface OAuthToken {
        access_token: string;
        refresh_token: string;
        scope: string;
        token_type: string;
        expires_in: number;

    }

    interface Package {
        _id: string | undefined;
        instance_id: string;
        name: string;
        sys_id: string;
        sys_class: {
            name: sys_packageSysClassNames,
            label: sys_packageSysClassLabels
        };
        source: string; //if no underscores, make it global, since these will be "global" apps otherwise it will accurately reflect the "Scope prefix"
        scope: string;
        fsPath: string;
    }

    interface File {
        _id: string | undefined;
        instance_id: string;
        package_id: string;
        name: string; //name of the file, handy for re-naming?
        fsPath: string;
        table: string;
        sys_id: string;
        content_field: string;
    }

    interface TableConfig {
        _id: string | undefined,
        instance_id: string;
        version: "1.0.0" | "2.0.0"
        tables: Table[];
    }

    interface Table {
        name: string;
        label: string;
        display_field: string;
        synced_fields: Field[];
        additional_display_fields: string[];
        group_by: undefined | Field;
    }

    interface Field {
        name: string;
        label: string;
        extension: string;
    }

    interface vscodeUriRaw {
        fspath: string,
        path: string
    }

    enum authTypeEnums {
        Basic = "Basic",
        OAuth = "oauth-authorization_code",
        None = ""
    }

    enum sys_package_sys_class_names {
        None = "",
        CustomApplication = "sys_app",
        Application = "sys_scope",
        SysPlugins = "sys_plugins",
        StoreApplication = "sys_store_app"
    }

    enum sys_package_sys_class_labels {
        None = "",
        CustomApplication = "Custom Application",
        Application = "Global",
        SysPlugins = "System Plugin",
        StoreApplication = "Store Application"
    }


}
