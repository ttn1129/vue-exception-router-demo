import UserInterface from '@/models/user'

export default interface ProfileState {
    user?:UserInterface;
    authenticated:boolean;
}