(function () {     
    
    //create namespace in singleton
    this.myApp = this.myApp || {};     
    
    //alias for namespace
    var rootNs = this.myApp;     
    
    //create a subnamespace in singleton
    rootNs.billing = rootNs.billing || {};     
    
    //alis for subnamepace
    var ns = rootNs.billing;  
    
    //private variable
    var taxRate = .05;
    
    //public variable
    ns.Invoice = function () { }; 
}());
