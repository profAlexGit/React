import {observable, computed, configure, decorate, action} from 'mobx';

configure({enforceActions: 'observed'});

export interface user {
    last_name: string,
    first_name: string,
    avatar: string,
    email: string,
    id: number
}

export enum eFilter {
    first_name = 'first_name',
    last_name = 'last_name',
}

class Store  {
    users!: user[];
    userForUpdate: number = -1;
    isProfileOpen: boolean = false;
    userForAction: user|null = null ;
    filterAttr: 'first_name'|'last_name' = 'first_name';
    filterValue: string = '';

    load() {
         this.getAllUsers();
    }

    getAllUsers(): void {
        fetch(`https://reqres.in/api/users`)
            .then(res => res.json())
            .then(res => {
                if(res.data) {
                    this.setUsers(res.data);
                }
                console.log('users ' ,this.users)
            })
    }

    setUsers(res: user[]): void {
        this.users = res;
        this.filterAttr = 'first_name';
    }

    deleteUser(id:number): void {
        const userId = this.users.findIndex((user: user) => user.id === id);
        this.users.splice(userId,1);
    }

    toggleProfile(user:user): void {
        this.userForAction = user;
        this.toggle();
    }

    toggle() {
        this.isProfileOpen = !this.isProfileOpen;
        if (this.userForAction && !this.isProfileOpen) {
            this.userForAction = null;
        }
        console.log(this.isProfileOpen)
    }

    updateUserInfo(updatedUser:user): void {
        let userFind = this.users.findIndex((user) => user.id===updatedUser.id);
        console.log(userFind)
        if (userFind === -1) {
            this.users.push(updatedUser);
        } else {
            this.users[userFind] = updatedUser;
        }
        this.toggle();
    }

    changeFilterAttr(value: 'first_name'|'last_name'): void {
        this.filterAttr = value;
    }

    changeFilterValue(value: string): void {
        this.filterValue = value;
    }

    get getUsers():user[] {
        if (this.filterValue) {
            return this.getFilterUsers();
        }
        return this.users?this.users:[];
    }

    getFilterUsers():user[] {
        console.log('фильтрую')
        const filter = new RegExp(this.filterValue, 'ig');
        return this.users.filter((user) =>filter.test(user[this.filterAttr]))
    }

    get getProfileStatus():boolean {
        return this.isProfileOpen;
    }

    get getUserForAction():user {
        if (!this.userForAction) {
            const id: number = Date.now();
            let user: user = {
                first_name:  '',
                last_name: '',
                avatar: '',
                email: '',
                id: id
            };
            return user;
        }
        return this.userForAction
    }


    Store = decorate(Store, {
        users: observable,
        filterAttr: observable,
        filterValue: observable,
        isProfileOpen: observable,
        load: action.bound,
        updateUserInfo: action.bound,
        toggleProfile: action.bound,
        getAllUsers: action.bound,
        setUsers: action.bound,
        deleteUser: action.bound,
        changeFilterAttr: action.bound,
        changeFilterValue: action.bound,
        toggle: action.bound,
        getUsers: computed,
        getProfileStatus:computed,
        getUserForAction: computed
    })

}

const store = new Store();
export default store;