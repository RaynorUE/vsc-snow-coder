import * as vscode from 'vscode';

declare namespace SNICHConfig {
    interface Instance {

        name: string;
        rootPath: vscode.Uri;
        connection: Connection;
        _id: string;

    }


    interface PreferenceMap {
        instance_id: string;
        _id: string;
        name: string;
        filename: string;
        description: string;
        global: boolean;
    }

    interface Connection {
        url: string;
        auth: Auth;
    }

    interface Auth {
        type: authTypes;
        username: string;
        password: string;
        OAuth: OAuthData
    }

    interface OAuthData {
        client_id: string;
        client_secret: string;
        lastRetrieved: number;
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
        _id: string;
        instance_id: string;
        name: string;
        sys_id: string;
        sys_scope: string;
        sys_package: string;
        folderName: string;
        fsPath: string;
    }

    interface File {
        _id: string;
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

    enum authTypes {
        Basic = "Basic",
        OAuth = "oauth-authorization_code",
        None = ""
    }
}
