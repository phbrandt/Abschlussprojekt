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
        var oTrucks = '';

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

            onConfirmPress: function () {
                var truckList = this.getView().byId("TruckList");
                truckList = this.getView().byId("TruckList").getSelectedItems();
                var Truckstring = '';
                for (var i in truckList) {
                    Truckstring += truckList[i].getTitle() + ',';
                }
                Truckstring = Truckstring.slice(0, -1);
                oTrucks = Object.assign({Fahrzeug: Truckstring});

                this.byId("TruckSelection").close();
                if (Truckstring != '') {
                this.byId("CalcButton").setEnabled(true);
            } else {
                this.byId("CalcButton").setEnabled(false);
            }
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
                    delete createSet.__metadata;
                    createSet = Object.assign(createSet, oTrucks);
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
