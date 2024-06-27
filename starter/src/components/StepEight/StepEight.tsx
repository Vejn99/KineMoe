import { FormWrapper } from "../FormWrapper/FormWrapper";
import "./step-eight.css";

type UserData = {
  notification: string;
};

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void;
};

const notifiList = [
  "Sign up for Email Notifications",
  "App Push Notifications",
  "No Notifications",
];

export const StepEight = ({ notification, updateFields }: UserFormProps) => {
  return (
    <FormWrapper>
      <div className="steps">
        <h2 className="mt-4 mb-0">Stay in the loop!</h2>
        <p className="step-eight-p">
          <span>7</span>Set your preferences for updates and announcements.
        </p>
        <div className="step-eight">
          {notifiList.map((notif) => (
            <div key={notif} className="check-group">
              <input
                type="radio"
                name="notification"
                value={notif}
                id={notif}
                checked={notification === notif}
                onChange={(e) => updateFields({ notification: e.target.value })}
              />
              <label
                htmlFor={notif}
                className={`custom-radio ${
                  notification === notif ? "checked" : ""
                }`}
              ></label>
              <p>{notif}</p>
            </div>
          ))}
        </div>
      </div>
    </FormWrapper>
  );
};
