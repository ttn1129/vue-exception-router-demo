import AuthorizationError from './AuthorizationError';
import ServerError from './ServerError';
import ValidationError from './ValidationError';
import store from '@/store/store'

export default class ErrorHandler 
{
    static __instance__:ErrorHandler;
    static getInstance():ErrorHandler 
    {
        return (this.__instance__ && this.__instance__ instanceof ErrorHandler)
                    ? this.__instance__
                    : this.__instance__ = new ErrorHandler();
    }
    static handleAndGetPathOnError(error:Error) : string|null
    {
        this.handle(error);
        return this.pathOnError(error);
    }

    static handle(error:Error):void 
    {
        this.getInstance().handleError(error);
    }

    static pathOnError(error:Error):string|null
    {
        return this.getInstance().getPathOnError(error);
    }

    private serverErrorMessage:string = 'InternalServerError';

    private handleError(error:Error):void 
    {
        console.log('handle error ->' + error);
        if (error instanceof ValidationError
            || error instanceof AuthorizationError) 
        {
            this.setErrorMessageToGlobalMessage(error);
            return;
        }
        if (error instanceof ServerError) 
        {
            console.log(error.message);
            store.commit('setApplicationMessage',this.serverErrorMessage);
            return;
        }
    }

    private getPathOnError(error:Error):string|null
    {
        if (error instanceof ValidationError)
        {
            return null;
        }
        if(error instanceof AuthorizationError) 
        {
            return '/';
        }
        if (error instanceof ServerError) 
        {
            return '/errror';
        }
        
        return '/errror';
    }
    
    private setErrorMessageToGlobalMessage(error:Error):void
    {
        const message = error.message;
        store.commit('setApplicationMessage',message);
    }
}