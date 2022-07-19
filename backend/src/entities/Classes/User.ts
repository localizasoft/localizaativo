export class User {
    public id: string;
    public email: string;
    public password_hash: string;
    public created_at: Date;

    constructor(props: User){
        this.id = props.id;
        this.email = props.email;
        this.password_hash = props.password_hash;
        this.created_at = props.created_at
    }
}