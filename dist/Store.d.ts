export interface user {
    last_name: string;
    first_name: string;
    avatar: string;
    email: string;
    id: number;
}
export declare enum eFilter {
    first_name = "first_name",
    last_name = "last_name"
}
declare class Store {
    users: user[];
    flag: number;
    userForUpdate: number;
    isProfileOpen: boolean;
    userId: number;
    filterAttr: 'first_name' | 'last_name';
    filterValue: string;
    load(): void;
    getAllUsers(): void;
    setUsers(res: user[]): void;
    deleteUser(id: number): void;
    toggleProfile(id?: number): void;
    updateUserInfo(updatedUser: user): void;
    changeFilterAttr(value: 'first_name' | 'last_name'): void;
    changeFilterValue(value: string): void;
    get getFlag(): number;
    get getUsers(): user[];
    getFilterUsers(): user[];
    get getUpdateUser(): user | undefined;
    get getProfileStatus(): boolean;
    Store: void;
}
declare const store: Store;
export default store;
