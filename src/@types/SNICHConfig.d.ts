declare namespace SNICHConfig {
    interface Instance {

        name: string;
        rootPath: vscodeUriRaw;
        _id: string | undefined;

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

    interface Application {
        _id: string | undefined;
        instance_id: string;
        name: string;
        sys_id: string;
        sys_scope: string;
        sys_package: string;
        folderName: string;
        fsPath: string;
    }

    interface File {
        _id: string | undefined;
        instance_id: string;
        application_id: string;
        fsPath: string;
        table: string;
        sys_id: string;
        content_field: string;
        sys_scope: string;
        sys_package: string;
        sys_app: string;
    }

    interface Table {
        _id: string;
        instance_id: string;
        name: string;
        label: string;
        display_field: string;
        fields: Field[];
        super_class: string;
        additional_display_fields: string[];
    }

    interface Field {
        table: string;
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
}
