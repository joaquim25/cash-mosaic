interface UserDataState {
    [key: string]: {
        value: string;
        isEditing: boolean;
    };
}

export interface SimplifiedUserData {
    [key: string]: string;
}

export const simplifyUserData = (data: UserDataState): SimplifiedUserData => {
    return Object.keys(data).reduce((acc, key) => {
        acc[key] = data[key].value;
        return acc;
    }, {} as SimplifiedUserData);
};