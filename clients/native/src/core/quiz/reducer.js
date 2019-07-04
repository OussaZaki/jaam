import { getType } from "typesafe-actions";

import * as actions from "./actions";

export default (state = null, action) => {
  switch (action.type) {
    case getType(actions.adaptQuiz):
      return action.payload;

    default:
      return state;
  }
};
