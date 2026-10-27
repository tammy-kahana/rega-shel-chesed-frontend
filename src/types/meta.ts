export interface Option {
    value: string;
    label: string;
}
export interface Meta {
    taskTypes: Option[];
    areas: Option[];
    taskStatuses: Option[];
    userStatuses: Option[];
    roles: Option[];
    signupStatuses: Option[];
    sortOptions: Option[];
}  