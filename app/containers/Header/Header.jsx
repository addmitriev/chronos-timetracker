// @flow
import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  shell,
} from 'electron';
import {
  getStatus as getResourceStatus,
} from 'redux-resource';

import type {
  StatelessFunctionalComponent,
  Node,
} from 'react';
import type {
  Connector,
} from 'react-redux';
import type {
  User,
  Dispatch,
} from 'types';


import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';

import {
  authActions,
  uiActions,
  settingsActions,
  issuesActions,
} from 'actions';
import {
  getUserData,
  getUiState,
} from 'selectors';
import {
  cogIcon,
  refreshWhite,
} from 'data/svg';
import config from 'config';

import {
  HeaderContainer,
  ProfileContainer,
  IconsContainer,
  ProfileInfo,
  SettingsIcon,
  ProfilePicture,
  ProfileName,
  ProfileTeam,
  DropdownSeparator,
  UpdateAvailableBadge,
  DropdownLogoutItem,
  DropdownUpdateItem,
  RefreshIcon,
} from './styled';


type Props = {
  userData: User,
  host: string,
  updateAvailable: string,
  updateFetching: boolean,
  issuesFetching: boolean,
  dispatch: Dispatch,
};

const Header: StatelessFunctionalComponent<Props> = ({
  userData,
  host,
  updateAvailable,
  updateFetching,
  issuesFetching,
  dispatch,
}: Props): Node =>
  <HeaderContainer className="webkit-drag">
    <ProfileContainer>
      <ProfilePicture
        src={userData.avatarUrls['48x48']}
        alt="User avatar"
      />
      <ProfileInfo>
        <ProfileName>
          {userData.displayName}
        </ProfileName>
        <ProfileTeam>
          {host}
        </ProfileTeam>
      </ProfileInfo>
    </ProfileContainer>

    <IconsContainer>
      <RefreshIcon
        src={refreshWhite}
        onClick={() => {
          if (!issuesFetching) {
            dispatch(issuesActions.refetchIssuesRequest());
          }
        }}
        alt="Refresh"
      />
      {updateAvailable &&
        <UpdateAvailableBadge />
      }
      <DropdownMenu
        triggerType="default"
        position="bottom right"
        trigger={
          <SettingsIcon
            src={cogIcon}
            alt="Settings"
          />
        }
      >
        <DropdownItemGroup>
          <DropdownItem
            onClick={() => {
              dispatch(uiActions.setModalState('settings', true));
            }}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            onClick={() => shell.openExternal(config.supportLink)}
          >
            Support and feedback
          </DropdownItem>
          <DropdownItem
            onClick={() => shell.openExternal(config.githubLink)}
          >
            Github
          </DropdownItem>
          <DropdownSeparator />

          {updateAvailable && !updateFetching && [
            <DropdownUpdateItem
              onClick={() => {
                dispatch(uiActions.setModalState('settings', true));
                dispatch(settingsActions.setSettingsModalTab('Updates'));
              }}
            >
              {updateAvailable} is out! Update now.
            </DropdownUpdateItem>,
            <DropdownSeparator />,
          ]}

          <DropdownLogoutItem
            onClick={() => {
              dispatch(authActions.logoutRequest());
            }}
          >
            Logout
          </DropdownLogoutItem>
        </DropdownItemGroup>
      </DropdownMenu>
    </IconsContainer>
  </HeaderContainer>;


function mapStateToProps(state) {
  return {
    userData: getUserData(state),
    host: getUiState('host')(state),
    updateAvailable: getUiState('updateAvailable')(state),
    updateFetching: getUiState('updateFetching')(state),
    issuesFetching: getResourceStatus(
      state,
      'issues.requests.filterIssues.status',
    ).pending,
  };
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  dispatch => ({ dispatch }),
);

export default connector(Header);
