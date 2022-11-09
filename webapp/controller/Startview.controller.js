sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/odata/v2/ODataModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, ODataModel) {
        "use strict";

        return Controller.extend("finalproject.controller.Startview", {
            onInit: function () {

            },

            onTruckPress: function (evt) {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "finalproject.view.TruckSelectionDialog"
                    });
                }
                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            onCloseDialog: function () {
                this.byId("TruckSelection").close();
            },

            onCalcPress: function (evt) {
                var oData = this.getView().getModel();
                var oSelectedIndex = this.getView().byId("OrderTable").getTable().getSelectedIndices();
                var oTable = this.getView().byId("OrderTable").getTable();
                var oRows = oTable.getRows();
                for (var i of oSelectedIndex) {
                    var createSet = oRows[i].getBindingContext().getObject();
                    delete createSet.__metadata
                    oData.create("/ZPB_TripsSet", createSet);
                };

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("TruckSequence");
                this.getView().getModel().refresh(true);
            },

            onChange: function (oControlEvent) {
                var sDate = oControlEvent.getParameters().value;

            }
        });
    });
