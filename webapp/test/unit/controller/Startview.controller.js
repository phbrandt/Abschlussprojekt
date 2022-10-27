/*global QUnit*/

sap.ui.define([
	"final_project/controller/Startview.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Startview Controller");

	QUnit.test("I should test the Startview controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
