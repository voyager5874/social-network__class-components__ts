import { ChangeEvent, Component } from 'react';

type UserStatusPropsType = {
  statusText: string;
};

type UserStatusStateType = {
  editMode: boolean;
  status: string;
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
          autoFocus
          onBlur={this.deactivateEditMode}
          value={this.state.status}
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
