import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import Editor from '../components/Editor.jsx';
import {
  updateUserInfo,
  changeQuestionTitle,
  changeQuestionDetail,
  createQuestion,
  editQuestion,
  removeQuestion,
  changeQuestionIndex,
  submitPaper,
  setCalendar,
  changeCalendar,
  changeCalendarVisible,
  changeErrMsg,
  publishPaper,
  changePaperSaved,
  changePublishConfirm
} from '../actions';

function mapStateToProps (state) {
  return {
    user: state.user,
    title: state.page.questionTitle,
    detail: state.page.questionDetail,
    questions: state.page.questions,
    calendar: state.page.calendar,
    time: state.page.time,
    saved: state.page.paperSaved,
    publishConfirmOpen: state.page.publishConfirmOpen
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({
      updateUserInfo,
      changeQuestionTitle,
      changeQuestionDetail,
      createQuestion,
      editQuestion,
      removeQuestion,
      changeQuestionIndex,
      submitPaper,
      setCalendar,
      changeCalendar,
      changeCalendarVisible,
      changeErrMsg,
      publishPaper,
      changePaperSaved,
      changePublishConfirm
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
