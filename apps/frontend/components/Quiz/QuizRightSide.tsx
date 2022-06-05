import { useState } from 'react';
import { OptionsSideBar } from './OptionsSideBar';
import { SidePanelQuestions } from './SidePanelQuestions';
import { SidePanelSelectedQuestion } from './SidePanelSelectedQuestion';
import { SidePanelSettings } from './SidePanelSettings';

export const QuizRightSide = (props) => {
  const [activePanel, setActivePanel] = useState(0);

  const setActivePanelHandler = (index) => setActivePanel(index);

  const is = (index) => index === activePanel;

  return (
    <>
      <>
        {is(0) && <SidePanelQuestions />}
        {is(1) && <SidePanelSelectedQuestion />}
        {is(2) && <SidePanelSettings />}
      </>
      <OptionsSideBar active={activePanel} onSelect={setActivePanelHandler} />
    </>
  );
};
