import {
  CLICK_MENU_OPENER,
  TOGGLE_SETTINGS_VISIBLE,
  CHANGE_MSG_VISIBLE,
  CHANGE_ERR_MSG,
  SET_CALENDAR,
  CHANGE_QUESTION_TITLE,
  CHANGE_QUESTION_DETAIL,
  CREATE_QUESTION,
  EDIT_QUESTION,
  REMOVE_QUESTION,
  CHANGE_QUESTION_INDEX,
  CHANGE_CALENDAR,
  CHANGE_CALENDAR_VISIBLE,
  CHANGE_KEYWORDS,
  CHANGE_SEARCH_STEP,
  CHANGE_PROFILE_TAB_OPEN,
  CHANGE_PROFILE_TAB_INDEX,
  CHANGE_SEARCHED_PAPER_PAGE,
  CHANGE_PUBLISHED_PAGE,
  CHANGE_PAPER_SAVED,
  CHANGE_PUBLISH_CONFIRM,
  CHANGE_ISEDITING,
  START_SUBMIT_PAPER,
  FINISH_SUBMIT_PAPER,
  START_SEARCH_PAPER,
  FINISH_SEARCH_PAPER
} from '../actions';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

const initialState = {
  msgVisible: false,
  errMsg: '',
  menuIsOpen: false,
  settingsVisible: false,
  anchorEl: {},
  questionTitle: '',
  questionDetail: '',
  questions: [],
  calendar: {
    year: year,
    month: month,
    days: []
  },
  time: {
    year: year,
    month: month,
    date: date,
    visible: false
  },
  keywords: '',
  stepIndex: 0,
  profileTabOpen: true,
  profileTabIndex: 0,
  searchedPaperPage: 0,
  publishedPage: 0,
  paperSaved: false,
  publishConfirmOpen: false,
  isEditing: false,
  editorFetching: false,
  searchFetching: false
};

function getDateCount(year, month) {
  let monthSet = new Set([0, 2, 4, 6, 7, 9, 11]);
  if(month == 1) {
      return ((year % 4 == 0 && year % 100 !== 0) || (year % 400 == 0))? 29 : 28;
  } else if (monthSet.has(month)) {
      return 31;
  } else {
      return 30;
  }
}

export default function page (state = initialState, action) {
  switch (action.type) {
    case CLICK_MENU_OPENER:
      let newState = { menuIsOpen: action.isOpen };
      if (action.anchorEl) {
        newState.anchorEl = action.anchorEl;
      }
      return Object.assign({}, state, newState);
    case TOGGLE_SETTINGS_VISIBLE:
      return Object.assign({}, state, { settingsVisible: action.visible });
    case CHANGE_MSG_VISIBLE:
      return Object.assign({}, state, { msgVisible: action.visible });
    case CHANGE_ERR_MSG:
      return Object.assign({}, state, {
        errMsg: action.errMsg,
        msgVisible: action.visible
      });
    case CHANGE_QUESTION_TITLE:
      return Object.assign({}, state, { questionTitle: action.title });
    case CHANGE_QUESTION_DETAIL:
      return Object.assign({}, state, { questionDetail: action.detail });
    case CREATE_QUESTION:
      let createdQuestions = state.questions.concat();
      createdQuestions.push(action.question);
      return Object.assign({}, state, { questions: createdQuestions });
    case EDIT_QUESTION:
      let editedQuestions = state.questions.concat();
      editedQuestions.splice(action.index, 1, action.question);
      return Object.assign({}, state, { questions: editedQuestions });
    case REMOVE_QUESTION:
      let removedQuestions = state.questions.concat();
      if (action.removeAll) {
        removedQuestions = [];
      } else {
        removedQuestions.splice(action.index, 1);
      }
      return Object.assign({}, state, { questions: removedQuestions });
    case CHANGE_QUESTION_INDEX:
      if (action.newIndex < 0 || action.newIndex >= state.questions.length) {
        return state;
      }
      let questions = state.questions.concat();
      let tmp = questions.splice(action.lastIndex, 1)[0];
      questions.splice(action.newIndex, 0, tmp);
      return Object.assign({}, state, { questions: questions });
    case SET_CALENDAR:
      let date = new Date(action.year, action.month - 1);
      let firstDay = date.getDay();
      let dateCount = getDateCount(action.year, action.month - 1);
      let days = [];
      for (let i = 0; i < firstDay; ++i) {
        days.push(0);
      }
      for (let i = 1; i <= dateCount; ++i) {
        days.push(i);
      }
      for (let i = 0, len = (7 - days.length % 7) % 7; i < len; ++i) {
        days.push(0);
      }
      return Object.assign({}, state, {
        calendar: {
          year: action.year,
          month: action.month,
          days: days
        }
      });
    case CHANGE_CALENDAR:
      return Object.assign({}, state, { time: action.time });
    case CHANGE_CALENDAR_VISIBLE:
      let time = Object.assign({}, state.time);
      time.visible = action.visible;
      return Object.assign({}, state, { time: time });
    case CHANGE_KEYWORDS:
      return Object.assign({}, state, { keywords: action.keywords });
    case CHANGE_SEARCH_STEP:
      return Object.assign({}, state, { stepIndex: action.stepIndex });
    case CHANGE_PROFILE_TAB_OPEN:
      return Object.assign({}, state, { profileTabOpen: action.isOpen });
    case CHANGE_PROFILE_TAB_INDEX:
      return Object.assign({}, state, { profileTabIndex: action.index });
    case CHANGE_SEARCHED_PAPER_PAGE:
      return Object.assign({}, state, { searchedPaperPage: action.page });
    case CHANGE_PUBLISHED_PAGE:
      return Object.assign({}, state, { publishedPage: action.page });
    case CHANGE_PAPER_SAVED:
      return Object.assign({}, state, { paperSaved: action.saved });
    case CHANGE_PUBLISH_CONFIRM:
      return Object.assign({}, state, { publishConfirmOpen: action.publishConfirmOpen });
    case CHANGE_ISEDITING:
      return Object.assign({}, state, { isEditing: action.isEditing });
    case START_SUBMIT_PAPER:
    case FINISH_SUBMIT_PAPER:
      return Object.assign({}, state, { editorFetching: action.isFetching });
    case START_SEARCH_PAPER:
    case FINISH_SEARCH_PAPER:
      return Object.assign({}, state, { searchFetching: action.isFetching });
    default:
      return state;
  }
}
