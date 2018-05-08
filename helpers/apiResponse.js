class ApiResponse {
    /**
     * @param success <boolean>
     * @param data <any> in case there success is false then data will set ass error
     */
    constructor(success, data){
       this.success = success;
       this.data = undefined;
       if(success){
           this.data = data;
       }else{
           this.error = data;
       }
    }
}

module.exports =  function (success, data) {
    return new ApiResponse(success, data);
};