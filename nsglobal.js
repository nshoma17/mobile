/** Document: nsglobal.js
 * Created by nadia on 2016-02-23.
 */

function rating_change(){
    document.getElementById("txtRatings").value =
        calculateRatings("txtQuality" , "txtService" ,"txtValue");
}

function rating_change1(){
    document.getElementById("txtRatings1").value =
        calculateRatings("txtQuality1" , "txtService1" ,"txtValue1");
}

function chkRatings_click(){
    showOrHide("#chkRate","#div1");
}

function chkRatings1_click(){
    showOrHide("#chkHasRating","#rating_div");
}

function btnSave_click() {
    nsaddFeedback();
}

function btnUpdate_click() {
    nsupdateFeedback();
}

function btnDelete_click() {
    nsdeleteFeedback();
}

function btnDefaultSave_click(){
    doValidate_Email();
}

function pageAddFeedback_show() {
    nsupdateTypesDropdown();
    nsupdateEmail();
}

function init() {
    $("#chkRate").on("click", chkRatings_click);
    $("#txtQuality").on("change", rating_change);
    $("#txtService").on("change", rating_change);
    $("#txtValue").on("change", rating_change);

    $("#chkHasRating").on("click", chkRatings1_click);
    $("#txtQuality1").on("change", rating_change1);
    $("#txtService1").on("change", rating_change1);
    $("#txtValue1").on("change", rating_change1);
    $("#btnSave").on("click", btnSave_click);
    $("#btnUpdate").on("click", btnUpdate_click);
    $("#btnDelete").on("click", btnDelete_click);

    $("#btnDefaultSave").on("click", btnDefaultSave_click);
    $("#btnClearDatabase").on("click",  nsclearDatabase);

    $("#nsAddFeedbackPage").on("pageshow", pageAddFeedback_show);
    $("#nsViewFeedbackPage").on("pageshow", nsgetReviews);
    $("#nsEditFeedbackPage").on("pageshow", nsshowCurrentReview);
}

function initDB() {
    try {
        DB.nsCreateDatabase();
        if (db) {
            DB.nsCreateTables();
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB.");
    }
}

$(document).ready(function () {
    initDB();
    init();
});
