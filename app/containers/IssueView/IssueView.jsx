// @flow
import React from 'react';
import {
  connect,
} from 'react-redux';

import type {
  StatelessFunctionalComponent,
  Node,
} from 'react';
import type {
  Connector,
} from 'react-redux';
import type {
  Id,
  Dispatch,
} from 'types';

import {
  getUiState,
  getTimerState,
} from 'selectors';
import {
  IssueViewPlaceholder,
} from 'components';
import {
  uiActions,
} from 'actions';

import {
  IssueViewContainer,
  IssueContainer,
  IssueViewTabContainer,
} from './styled';

import IssueDetails from './IssueDetails';
import IssueComments from './IssueComments';
import IssueWorklogs from './IssueWorklogs';
import IssueReport from './IssueReport';
import TrackingBar from './TrackingBar';
import IssueViewHeader from '../IssueView/IssueViewHeader';
import IssueViewTabs from './IssueViewTabs';


type Props = {
  selectedIssueId: Id | null,
  currentTab: string,
  timerRunning: boolean,
  dispatch: Dispatch,
};

const tabs = [
  'Details',
  'Comments',
  'Worklogs',
  'Report',
];

const IssueView: StatelessFunctionalComponent<Props> = ({
  selectedIssueId,
  currentTab,
  timerRunning,
  dispatch,
}: Props): Node => (selectedIssueId
  ? (
    <IssueViewContainer column>
      {timerRunning &&
        <TrackingBar />
      }
      <IssueContainer>
        <IssueViewHeader />
        <IssueViewTabs
          onTabClick={(tab) => {
            dispatch(uiActions.setUiState('issueViewTab', tab));
          }}
          currentTab={currentTab}
          tabs={tabs}
        />
        <IssueViewTabContainer>
          {(() => {
            switch (currentTab) {
              case 'Details':
                return <IssueDetails />;
              case 'Comments':
                return <IssueComments />;
              case 'Worklogs':
                return <IssueWorklogs />;
              case 'Reports':
                return <IssueWorklogs />;
              default:
                return <IssueReport />;
            }
          })()}
        </IssueViewTabContainer>
      </IssueContainer>
    </IssueViewContainer>
  )
  : <IssueViewPlaceholder />);

function mapStateToProps(state) {
  return {
    selectedIssueId: getUiState('selectedIssueId')(state),
    currentTab: getUiState('issueViewTab')(state),
    timerRunning: getTimerState('running')(state),
  };
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  dispatch => ({ dispatch }),
);

export default connector(IssueView);
