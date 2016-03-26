/**
 * Created by nadia on 2016-02-23.
 */

var Review = {
    nsinsert: function (options){
        function txFunction(tx) {
            var sql = "INSERT INTO review(businessName, typeId," +
                    "reviewerEmail, reviewerComments, reviewDate," +
                    "hasRating, rating1, rating2, rating3) " +
                    "values(?, ?, ?, ?, ?, ?, ?, ?, ?); "

            function successInsert() {
                    alert("New Feedback added.");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    nsselect: function(options, callback){
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    nsselectAll : function(callback){
        var options=[];

        function txFunction(tx) {
            var sql = "SELECT * FROM review;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    nsupdate: function(options){

        function txFunction(tx) {
            var sql = "UPDATE review " +
                "SET businessName=?, typeId=?," +
                "reviewerEmail=?, reviewerComments=?, reviewDate=?," +
                "hasRating=?, rating1=?, rating2=?, rating3=?" +
                "WHERE id=?;";

            function successUpdate() {
                 alert("Feedback updated successfully");
            }
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    nsdelete: function(options){
        function txFunction(tx) {
            var sql = "DELETE FROM review " +
                         "WHERE id=?;";

            function successDelete() {
                alert("Feedback deleted successfully");
            }
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Type = {

    nsselectAll : function(callback){
        var options=[];

        function txFunction(tx) {
            var sql = "SELECT * FROM type;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
