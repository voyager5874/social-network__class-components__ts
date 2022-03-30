import { ChangeEvent, Component, KeyboardEvent } from 'react';

import styles from './UserStatus.module.css';

import { Nullable } from 'types';
import { getTrimmedValue } from 'utils';

type UserStatusPropsType = {
  statusText: Nullable<string>;
  updateCurrentUserStatus: (status: string) => void;
  isProfileOwner: boolean;
};

type UserStatusStateType = {
  editMode: boolean;
  status: Nullable<string>;
};

export class UserStatus extends Component<UserStatusPropsType, UserStatusStateType> {
  constructor(props: UserStatusPropsType) {
    super(props);
    this.state = {
      editMode: false,
      status: this.props.statusText,
    };
  }

  componentDidUpdate(
    previousProps: UserStatusPropsType,
    previousState: UserStatusStateType,
  ) {
    if (previousProps.statusText !== this.props.statusText) {
      this.setState({
        status: this.props.statusText,
      });
    }
  }

  handleStatusUpdate = () => {
    if (this.state.status === null || this.state.status === this.props.statusText) return;
    if (this.state.status !== null) {
      const trimmedString = getTrimmedValue(this.state.status);
      if (trimmedString) this.props.updateCurrentUserStatus(this.state.status);
      if (!trimmedString) this.setState({ status: this.props.statusText });
    }
  };

  handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleStatusUpdate();
    }
  };

  activateEditMode = () => {
    if (!this.props.isProfileOwner) return;
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.handleStatusUpdate();
  };

  handleInputTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    // this.props.updateCurrentUserStatus(event.currentTarget.value);
    this.setState({ status: event.currentTarget.value });
  };

  render() {
    return this.state.editMode ? (
      <div>
        <input
          onKeyPress={this.handleEnterKeyPress}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onBlur={this.deactivateEditMode}
          value={this.state.status || ''}
          onChange={this.handleInputTextChange}
        />
      </div>
    ) : (
      <div onDoubleClick={this.activateEditMode}>
        <p className={styles.statusText}>{this.props.statusText}</p>
      </div>
    );
  }
}
