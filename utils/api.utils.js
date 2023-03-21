const successResponse = (data) => {
    return{
        succes:true,
        data
    }
}

const errorResponse = (message,details=null) => {
    return{
        succes:false,
        message,
        details
    }
}

class HttpError {
    constructor(status,message,details){
        this.statusCode = status;
        this.message = message;
        this.details = details
    }
}

module.exports = {
    successResponse,
    errorResponse,
    HttpError
}