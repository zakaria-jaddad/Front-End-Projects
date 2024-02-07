import WatchLogo from "/public/icons/settings/watch.svg";
import Input from "../ui/Input";
import SubTitle from "../ui/SubTitle";
import { useState } from "react";
import { useSelector } from "react-redux";
import ToggleSetting from "../ui/ToggleSetting";
import {
  updateAutoStartsBreaks,
  updateAutoStartsPomodoro,
  updateLongBreak,
  updateLongBreakInterval,
  updatePomodoro,
  updateShortBreak,
} from "../../../app/slices/settingsSlice/timerSlice";
import Button from "../ui/Button";

function Timer() {
  const timer = useSelector((state) => state.settings.timer);
  return (
    <div className="pb-[12px] mb-[12px] border-b border-eGray">
      <SubTitle title="Timer">
        <WatchLogo width={25} height={25} strokeWidth="2" />
      </SubTitle>

      {/* Time */}
      <div className="py-[12px]">
        <span className="block text-secondTextColor font-semibold">
          Time minutes
        </span>
        <div className="flex justify-between mt-[10px]">
          <Input
            labelContent="Pomodoro"
            update={updatePomodoro}
            inputValue={timer.pomodoro}
          />
          <Input
            labelContent="Short Break"
            update={updateShortBreak}
            inputValue={timer.shortBreak}
          />
          <Input
            labelContent="Long Break"
            update={updateLongBreak}
            inputValue={timer.longBreak}
          />
        </div>
      </div>

      {/* auto Starts breaks */}
      <ToggleSetting settingsHeader="auto starts breaks">
        <Button
          buttonState={timer.autoStartsBreaks}
          updateButtonState={updateAutoStartsBreaks}
        />
      </ToggleSetting>

      {/* auto Starts Pomodoros */}
      <ToggleSetting settingsHeader="auto starts pomodoros">
        <Button
          buttonState={timer.autoStartsPomodoro}
          updateButtonState={updateAutoStartsPomodoro}
        />
      </ToggleSetting>

      {/* long Break Interval */}
      <ToggleSetting settingsHeader="long break interval">
        <Input
          inputValue={timer.longBreakInterval}
          update={updateLongBreakInterval}
        />
      </ToggleSetting>
    </div>
  );
}

export default Timer;