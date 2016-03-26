/**
 * Created by nadia on 2016-02-23.
 */


var db;

function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ") -- " + error.message);
}
function successTransaction() {
    console.info("Success: Transaction is successful");
}

var DB = {

    nsCreateDatabase: function(){
        var shortName = "nsFeedbackDB";
        var version = "1.0";
        var displayName = "DB for nsFeedback app";
        var dbSize = 2 * 1024 * 1024;

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database creation successful.");
        }
    },

    nsCreateTables: function (){

        function successCreate() {
            console.info("Success: Table created successfully");
        }

        function txFunction(tx) {
            var options = [];

            function successDrop() {
                console.info("Success: Dropping table successful");
            }
            function successInsert() {
                console.info("Success: Insert successful.");
            }

            var sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql,options, successDrop, errorHandler);

            console.info("Creating table: type ...");
            var sql =  "CREATE TABLE IF NOT EXISTS type( " +
                    "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                    "name VARCHAR(20) NOT NULL);";

            tx.executeSql(sql,options,successCreate,errorHandler);

            var sql = "INSERT INTO type(name) " +
                                 "values('Canadian'); "
            tx.executeSql(sql, options, successInsert, errorHandler);

            var sql = "INSERT INTO type(name) " +
                                   "values('Asian'); "
            tx.executeSql(sql, options, successInsert, errorHandler);

            var sql = "INSERT INTO type(name) " +
                                      "values('Other'); "
            tx.executeSql(sql, options, successInsert, errorHandler);

            sql = "CREATE TABLE IF NOT EXISTS review( " +
                    "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                    "businessName VARCHAR(30) NOT NULL," +
                    "typeId INTEGER NOT NULL," +
                    "reviewerEmail VARCHAR(30)," +
                    "reviewerComments TEXT," +
                    "reviewDate DATE," +
                    "hasRating VARCHAR(1)," +
                    "rating1 INTEGER," +
                    "rating2 INTEGER," +
                    "rating3 INTEGER," +
                    "FOREIGN KEY(typeId) REFERENCES type(id));";

            tx.executeSql(sql,options,successCreate,errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    nsDropTables: function(){

        function successDrop() {
            console.info("Success: Dropping review and type tables successful");
        }

        function txFunction(tx) {
            var options = [];
            console.info("Dropping table: type");
            var sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql,options, successDrop, errorHandler);

            console.info("Dropping table: review");
            var sql = "DROP TABLE IF EXISTS review;";
            tx.executeSql(sql,options, successDrop, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};