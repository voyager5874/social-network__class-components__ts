import { ChangeEvent, Component } from 'react';

import { Nullable } from 'types';

type UserStatusPropsType = {
  statusText: Nullable<string>;
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

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
  };

  handleInputTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ status: event.currentTarget.value });
  };

  render() {
    return this.state.editMode ? (
      <div>
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onBlur={this.deactivateEditMode}
          value={this.state.status || 'nothing shared yet'}
          onChange={this.handleInputTextChange}
        />
      </div>
    ) : (
      <div onDoubleClick={this.activateEditMode}>
        <h3>{this.state.status}</h3>
      </div>
    );
  }
}
