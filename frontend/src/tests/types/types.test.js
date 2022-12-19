import { types } from "../../types/types";

describe("Prebas en types", () => {
  test("Debe coincidir con el objeto base", () => {
    const baseTypes = {
      uiOpenModal: "[ui] Open modal",
      uiCloseModal: "[ui] Close modal",

      eventSetActive: "[event] Set active",
      eventUnsetActive: "[event] Unset active",
      eventStartAddNew: "[event]Start add New",
      eventAddNew: "[event] Add New",
      eventAddNewSlots: "[event] Add New by Slots",
      eventClearSlots: "[event] Clear Slots",
      eventUpdated: "[event] Event updated",
      eventDeleted: "[event] Event Deleted",
      eventsLoaded: "[event] Loaded events",
      eventLogoutClear: "[event] Logout Clear",

      authCheckingFinish: "[auth] Finish checking login state",
      authLogin: "[auth] Login",
      authLogout: "[auth] Logout",
    };

    expect(types).toEqual(baseTypes);
  });
});
