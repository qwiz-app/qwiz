import React, { useState } from 'react';
import { OptionsSideBar } from './OptionsSideBar';
import { SidePanelAnswers } from './SidePanelAnswers';
import { SidePanelQuestions } from './SidePanelQuestions';
import { SidePanelStyles } from './SidePanelStyles';
import { SidePanelWrapper } from './SidePanelWrapper';

export const QuizRightSide = (props) => {
  const [activePanel, setActivePanel] = useState(0);

  const setActivePanelHandler = (index) => setActivePanel(index);

  const is = (index) => index === activePanel;

  return (
    <>
      <SidePanelWrapper>
        {is(0) && <SidePanelQuestions />}
        {is(1) && <SidePanelAnswers />}
        {is(2) && <SidePanelStyles />}
      </SidePanelWrapper>
      <OptionsSideBar active={activePanel} onSelect={setActivePanelHandler} />
    </>
  );
};
