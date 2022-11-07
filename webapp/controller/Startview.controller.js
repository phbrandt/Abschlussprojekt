sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, MessageToast) {
        "use strict";

        return Controller.extend("finalproject.controller.Startview", {
            onInit: function () {

                this.getView().byId("DatePicker").setDateValue(new Date());

            },

            onTruckPress: function (evt) {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "finalproject.view.TruckSelectionDialog"
                    });
                }
                this.pDialog.then(function(oDialog) {
                    oDialog.open();
                });
            },

            onCloseDialog: function () {
                this.byId("TruckSelection").close();
            },

            onCalcPress: function (evt) {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("TruckSequence");
            }
        });
    });
