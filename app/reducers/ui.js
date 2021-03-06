// @flow
import {
  actionTypes,
} from 'actions';
import type {
  Action,
  UiState,
} from 'types';


const initialState: UiState = {
  initializeInProcess: false,
  authorized: false,
  authFormStep: 1,
  loginError: null,
  loginRequestInProcess: false,
  host: null,
  protocol: null,
  isPaidUser: false,

  updateCheckRunning: false,
  updateFetching: false,
  updateAvailable: null,

  sidebarType: 'all',
  issueViewTab: 'Details',
  issueViewWorklogsScrollToIndex: 0,
  issuesSearch: '',
  issuesFilters: {
    type: [],
    status: [],
    assignee: [],
  },

  selectedWorklogId: null,
  deleteWorklogId: null,
  editWorklogId: null,
  worklogFormIssueId: null,
  worklogComment: '',

  selectedIssueId: null,
  issuesSourceType: null,
  issuesSourceId: null,
  issuesSprintId: null,

  screenshotsAllowed: false,
  sidebarFiltersIsOpen: false,
  filterStatusesIsFetched: false,
  commentAdding: false,

  modalState: {
    alert: false,
    confirmDeleteWorklog: false,
    settings: false,
    worklog: false,
  },

  flags: [],
};

export default function ui(
  state: UiState = initialState,
  action: Action,
) {
  switch (action.type) {
    case actionTypes.SET_UI_STATE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    case actionTypes.SET_MODAL_STATE:
      return {
        ...state,
        modalState: {
          ...state.modalState,
          [action.payload.modalName]: action.payload.state,
        },
      };
    case actionTypes.SET_ISSUES_FILTER:
      return {
        ...state,
        issuesFilters: {
          ...state.issuesFilters,
          [action.filterType]: action.value,
        },
      };
    case actionTypes.ADD_FLAG:
      return {
        ...state,
        flags: [action.payload, ...state.flags],
      };
    case actionTypes.DELETE_FLAG: {
      const { id } = action;
      return {
        ...state,
        flags: state.flags.filter(f => f.id !== id),
      };
    }
    case actionTypes.__CLEAR_ALL_REDUCERS__:
      return initialState;
    default:
      return state;
  }
}
