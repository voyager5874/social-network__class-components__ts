import { UserOnServerType } from 'api/types';
import {
  InterlocutorType,
  MessageSimpleType,
  MessageType,
} from 'components/dialogs/types';
import { PostType } from 'components/profile/types';
import { rootReducer } from 'store/store';

export type RootStateType = ReturnType<typeof rootReducer>;
