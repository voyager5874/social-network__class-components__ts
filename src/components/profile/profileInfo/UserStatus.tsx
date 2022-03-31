import { ChangeEvent, Component, KeyboardEvent } from 'react';

import classNames from 'classnames/bind';
import { AiFillEdit } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';

import styles from 'components/profile/profileInfo/UserStatus.module.css';
import { Nullable } from 'types';
import { getTrimmedValue } from 'utils';

type UserStatusPropsType = {
  statusText: Nullable<string>;
  updateCurrentUserStatus: (status: string) => void;
  isProfileOwner: boolean;
};

type UserStatusStateType = {
  editMode: boolean;
  showEditIcon: boolean;
  status: Nullable<string>;
};

const css = classNames.bind(styles);

export class UserStatus extends Component<UserStatusPropsType, UserStatusStateType> {
  constructor(props: UserStatusPropsType) {
    super(props);
    this.state = {
      editMode: false,
      showEditIcon: false,
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

  handleEnterKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      this.handleStatusUpdate();
    }
  };

  handleShowIcon = () => {
    if (!this.props.isProfileOwner) return;
    this.setState({ showEditIcon: true });
  };

  handleHideIcon = () => {
    // if (!this.props.isProfileOwner) return;
    this.setState({ showEditIcon: false });
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

  handleInputTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // this.props.updateCurrentUserStatus(event.currentTarget.value);
    this.setState({ status: event.currentTarget.value });
  };

  render() {
    const statusTextStyle = css({
      statusText: true,
      highlightedText: this.state.showEditIcon,
    });
    return (
      <div className={styles.statusContainer}>
        {this.state.editMode ? (
          <TextareaAutosize
            maxLength={300}
            className={styles.statusInput}
            onKeyPress={this.handleEnterKeyPress}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onBlur={this.deactivateEditMode}
            value={this.state.status || ''}
            onChange={this.handleInputTextChange}
          />
        ) : (
          <span
            className={statusTextStyle}
            onDoubleClick={this.activateEditMode}
            onMouseEnter={this.handleShowIcon}
            onMouseLeave={this.handleHideIcon}
          >
            {this.props.statusText}{' '}
            {this.state.showEditIcon && (
              <AiFillEdit className={styles.editIcon} onClick={this.activateEditMode} />
            )}
          </span>
        )}
      </div>
    );
  }
}
