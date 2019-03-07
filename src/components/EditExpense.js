/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import AlertDialog from './AlertDialog';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalAnswer: false
    };
  }


  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };

  dialogAnswer = (val) => {
    if (val) {
      this.props.startRemoveExpense({ id: this.props.expense.id });      
    }
    this.setState(() => ({ modalOpen: false }));
    this.props.history.push('/');
  };


  openModal = (id) => {
    this.setState(() => ({ modalOpen: true }));
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>

        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
        </div>

        <div className="content-container">
          <button
            className="button button--secondary"
            onClick={this.openModal}
          >
          Remove Expense
          </button>
          <AlertDialog
            modalOpen={this.state.modalOpen}
            dialogTitle="Please confirm"
            dialogText=""
            buttonYes="Yes"
            buttonNo="No"
            answer={this.dialogAnswer}
          />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: data => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
