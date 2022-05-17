import { useState } from 'react';
import { OptionsSideBar } from './OptionsSideBar';
import { SidePanelAnswers } from './SidePanelAnswers';
import { SidePanelQuestions } from './SidePanelQuestions';
import { SidePanelStyles } from './SidePanelStyles';

export const QuizRightSide = (props) => {
  const [activePanel, setActivePanel] = useState(0);

  const setActivePanelHandler = (index) => setActivePanel(index);

  const is = (index) => index === activePanel;

  //! TODO: move to zustand store to not pass it through 2823823 components
  const todo = () => {
    console.log('on select question');
  };

  return (
    <>
      <>
        {is(0) && <SidePanelQuestions onSelectQuestion={todo} />}
        {is(1) && <SidePanelAnswers />}
        {is(2) && <SidePanelStyles />}
      </>
      <OptionsSideBar active={activePanel} onSelect={setActivePanelHandler} />
    </>
  );
};
